package game

import (
	"common/myWebSocket"
	"fmt"
	//"strings"
	"strconv"
	"math"
	"time"
	"common"
)

 /**
	* 回复消息解析 
	* 0: 消息id
	* 1：消息长度
	* 2：sessionid
	* 3：nodex x坐标正负标记
	* 4：nodex x坐标值
	* 5：nodey y坐标正负标记
	* 6：nodey y坐标值 
*/

func saveAndupdatePos(sess *myWebSocket.WebSession, msgid int, data []uint32) (error, bool) {
	var (
		pos = &Pos{}
	)
	if uint32(Pos_Right) != data[0] {
		pos.Nodex -= int(data[1])
	}else{
		pos.Nodex = int(data[1])
	}

	if uint32(Pos_Right) != data[2] {
		pos.Nodey -= int(data[3])
	}else{
		pos.Nodey = int(data[3])
	}
	
	fmt.Printf("update pos, RemoteAddr: %v, Nodex: %v, Nodey: %v.\n", sess.RemoteAddr, pos.Nodex, pos.Nodey)
	//保存个体怪物数据
	moster := GetPurpleMonsterByID(data[4])
	if moster != nil {
		moster.SetPos(pos)
		moster.UpdateCache()
	}else{
		fmt.Println("can not get moster info, id: ", data[4])
	}

	//broadcast data to others.
	var (
		dstmsg = []uint32{}
	)
	dstmsg = append(dstmsg, data...)
	myWebSocket.BroadCastMsgExceptSession(sess, false, msgid, dstmsg)
	return nil, true
}

/*
	注册
*/

func Register(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc Register message ... ", time.Now().Unix())
	defer common.ExceptionStack()
	
	sname := strconv.Itoa(int(data[0]))
	spwd := strconv.Itoa(int(data[1]))
	moster, succ := NewMoster(sname, spwd) 
	if !succ{
		return registerfail(sess)
	}

	sess.SetId(moster.ID)
	return registerSucc(sess)
}

func registerfail(sess *myWebSocket.WebSession)(error, bool) {
	var (
		dstmsg = []uint32{}
	)
	dstmsg = append(dstmsg, 0)
	myWebSocket.SendMsg(sess, myWebSocket.MID_Register, dstmsg)
	return nil, true
}

func registerSucc(sess *myWebSocket.WebSession)(error, bool) {
	var (
		dstmsg = []uint32{}
	)
	dstmsg = append(dstmsg, 1)
	myWebSocket.SendMsg(sess, myWebSocket.MID_Register, dstmsg)
	return nil, true
}

/*
	上线响应
*/
func Login(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc login message ... ", time.Now().Unix())
	defer common.ExceptionStack()

	sname := strconv.Itoa(int(data[0]))
	spwd := strconv.Itoa(int(data[1]))

	moster, err := GetExistMonster(sname, spwd)
	if err != nil {
		//不存在
		return loginfail(sess)
	}

	sess.SetId(moster.ID)
	gmonsters := GetGlobalPurpleMonsters()
	gmonsters.Online(moster.ID)
	gmonsters.UpdateCache()
	// 发送获取自身id
	return loginSucc(sess, moster)
}

func loginfail(sess *myWebSocket.WebSession) (error, bool) {
	fmt.Println("login fail ... ", time.Now().Unix())
	var (
		loginmsg = []uint32{}
	)
	loginmsg = append(loginmsg, 0)
	myWebSocket.SendMsg(sess, myWebSocket.MID_login, loginmsg)
	return nil, true
}

func loginSucc(sess *myWebSocket.WebSession, moster *PurpleMonster) (error, bool) {
	var (
		loginmsg = []uint32{}
		monsterXflag = uint32(Pos_Right)
		monsterYflag = uint32(Pos_Right)

		monsterX = uint32(0)
		monsterY = uint32(0)
	)

	id := moster.ID
	pos := moster.Mypos
	score := moster.Score
	loginmsg = append(loginmsg, 1)
	loginmsg = append(loginmsg, id)
	monsterX = uint32(pos.Nodex)
	if pos.Nodex < 0 {
		monsterXflag = uint32(Pos_Left)
		monsterX = uint32(0 - pos.Nodex)
	}

	loginmsg = append(loginmsg, monsterXflag )
	loginmsg = append(loginmsg, monsterX )
	monsterY = uint32(pos.Nodey)
	if pos.Nodey < 0 {
		monsterYflag = uint32(Pos_Left)
		monsterY = uint32(0 - pos.Nodey)
	}
	loginmsg = append(loginmsg, monsterYflag )
	loginmsg = append(loginmsg, monsterY )
	loginmsg = append(loginmsg, score )
	fmt.Println("login message succ: ", id, monsterX, monsterY, time.Now().Unix())
	myWebSocket.SendMsg(sess, myWebSocket.MID_login, loginmsg)
	return nil, true
}

/*
	位置同步响应
	此时当前作为小场景可以全部广播，如果到了地图上，则需要分块视野范围内才能同步
*/
func SyncPos(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc SyncPos message ... ", time.Now().Unix())
	defer common.ExceptionStack()

	//检查星星生成
	SyncStarPos(sess)
	//广播我的位置给其他人
	saveAndupdatePos(sess, myWebSocket.MID_Online4Other, data)
	//广播其他人的位置给我
	BroadcastOtherMosterInfo2Me(sess, data[4], myWebSocket.MID_Online4Other)
	return nil, true
}

/*
	离线响应
*/
func Logout(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc logout message ... ", time.Now().Unix())
	
	gmonsters := GetGlobalPurpleMonsters()
	gmonsters.Offline(data[0])
	gmonsters.UpdateCache()

	//broadcast data to others.
	var (
		msg = []uint32{}
	)

	msg = append(msg, data[0])
	myWebSocket.BroadCastMsgExceptSession(sess, false, myWebSocket.MID_logout, msg)
	return nil, true
}

/*
	运动实体移动相应
*/
func Move(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc move message ... ", time.Now().Unix())
	//广播自己移动位置给别人
	return saveAndupdatePos(sess, myWebSocket.MID_move, data)
}

/*
	撞击响应
	请求消息结构：
		0: 消息ID
		1：消息长度 8
		2: 小球x坐标正负标志
		3: 小球x坐标
		4：小球y坐标正负标志
		5：小球y坐标
		6: 星星x坐标正负标志
		7: 星星x坐标
		8：星星y坐标正负标志
		9：星星y坐标

	回复消息结构：
		0: 消息ID
		1：消息长度
		2: 成功失败标志 (失败则只需要前三个字段)
		3: 星星x坐标正负标志
		4: 星星x坐标
		5：星星y坐标正负标志
		6：星星y坐标
*/
func Bump(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc Bump message ... ", time.Now().Unix())
	defer common.ExceptionStack()

	//1.判断是否撞击成功（两点间距离）
	var (
		PurpleMonsterPosX float64
		PurpleMonsterPosY float64

		EntityPosX float64
		EntityPosY float64
	)
	PurpleMonsterPosX = float64(data[1])
	if data[0] != uint32(Pos_Right) {
		PurpleMonsterPosX = 0.0 - PurpleMonsterPosX
	}
	PurpleMonsterPosY = float64(data[3])
	if data[2] != uint32(Pos_Right) {
		PurpleMonsterPosY = 0.0 - PurpleMonsterPosY
	}
	EntityPosX = float64(data[5])
	if data[4] != uint32(Pos_Right) {
		EntityPosX = 0.0 - EntityPosX
	}
	EntityPosY = float64(data[7])
	if data[6] != uint32(Pos_Right) {
		EntityPosY = 0.0 - EntityPosY
	}
	result := math.Sqrt(math.Pow(PurpleMonsterPosX-EntityPosX,2) + math.Pow(PurpleMonsterPosY-EntityPosY,2))
	if result > float64(60) { //小于此值则碰撞成功
		return bumpfail(sess)
	}

	//分值记录
	moster := GetPurpleMonsterByID(data[8])
	if moster != nil {
		moster.SetPos(&Pos{
			Nodex: int(PurpleMonsterPosX),
			Nodey: int(PurpleMonsterPosY),
		})
		score := moster.AddScore()
		moster.UpdateCache()
		//同步信息
		syncMonsterInfo(sess, data[8], score)
	}else{
		fmt.Println("can not get moster info, id: ", data[4])
	}

	originPos := &Pos{
		Nodex: int(data[5]),
		Nodey: int(data[7]),
	}

	//2.则重新放置星星位置
	entity,_ := GetEntity()
	newPos := entity.RandEntityPos(originPos)
	//3.广播给所有玩家
	bumpsucc(sess, newPos, data[8])
	return nil, true
}

func syncMonsterInfo(sess *myWebSocket.WebSession, id, score uint32){
	var (
		msg = []uint32{}
	)

	msg = append(msg, id)
	msg = append(msg, score)
	myWebSocket.SendMsg(sess, myWebSocket.MID_MonsterInfo, msg)
}

func bumpsucc(sess *myWebSocket.WebSession, newpos *Pos, monsterId uint32)(error, bool){
	fmt.Println("bump succ: ", sess.RemoteAddr, newpos.Nodex, newpos.Nodey, time.Now().Unix())
	var (
		succmsg = []uint32{}

		starXflag = uint32(Pos_Right)
		starYflag = uint32(Pos_Right)

		starX = uint32(0)
		starY = uint32(0)
	)
	starX = uint32(newpos.Nodex)
	succmsg = append(succmsg, 1)
	if newpos.Nodex < 0 {
		starXflag = uint32(Pos_Left)
		starX = uint32(0 - newpos.Nodex)
	}
	succmsg = append(succmsg, starXflag )
	succmsg = append(succmsg, starX )
	starY = uint32(newpos.Nodey)
	if newpos.Nodey < 0 {
		starYflag = uint32(Pos_Left)
		starY = uint32(0 - newpos.Nodey)
	}
	succmsg = append(succmsg, starYflag )
	succmsg = append(succmsg, starY )
	succmsg = append(succmsg, monsterId)
	myWebSocket.BroadCastMsgExceptSession(sess, true, myWebSocket.MID_Bump, succmsg)
	return nil, true
}

func bumpfail(sess *myWebSocket.WebSession)(error, bool){
	fmt.Println("bump fail: ", sess.RemoteAddr)
	var (
		failmsg = make([]uint32, 1)
	)

	failmsg = append(failmsg, 0)
	myWebSocket.SendMsg(sess, myWebSocket.MID_Bump, failmsg)
	return nil, true
}

func Reg(){
	fmt.Println("reg proc msg.")
	myWebSocket.MsgRegister(myWebSocket.MID_Register, Register)
	myWebSocket.MsgRegister(myWebSocket.MID_login, Login)
	myWebSocket.MsgRegister(myWebSocket.MID_SyncPos, SyncPos)
	myWebSocket.MsgRegister(myWebSocket.MID_logout, Logout)
	myWebSocket.MsgRegister(myWebSocket.MID_move, Move)
	myWebSocket.MsgRegister(myWebSocket.MID_Bump, Bump)
	myWebSocket.MsgRegister(myWebSocket.MID_GM, MainGM)
}
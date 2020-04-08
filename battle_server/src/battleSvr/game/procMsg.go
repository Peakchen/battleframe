package game

import (
	"common/myWebSocket"
	"fmt"
	"strings"
	"strconv"
	"math"
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

func saveAndupdatePos(sess *myWebSocket.WebSession, sessid, msgid int, data []uint32) (error, bool) {
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
	GetPlayer().Save(sessid, pos)
	//broadcast data to others.
	var (
		dstmsg = []uint32{}
	)
	dstmsg = append(dstmsg, uint32(sessid))
	dstmsg = append(dstmsg, data...)
	myWebSocket.BroadCastMsg(sess, false, msgid, dstmsg)
	return nil, true
}

/*
	上限响应
*/
func Login(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc login message ... ")
	//检查星星生成
	checkNewStarPos(sess)
	//广播我的位置给其他人
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}
	saveAndupdatePos(sess, sessid, myWebSocket.MID_login, data)
	//广播其他人的位置给我
	allplayers := GetPlayer().GetAll()
	var (
		dstmsg = []uint32{}
	)
	for key, pos := range allplayers{
		//不把自己的信息发给自己
		if key == sessid{
			continue
		}

		posXflag := Pos_Right
		posX := pos.Nodex
		if pos.Nodex < 0 {
			posXflag = Pos_Left
			posX = 0 - posX
		}
		posYflag := Pos_Right
		posY := pos.Nodey
		if pos.Nodey < 0 {
			posYflag = Pos_Left
			posY = 0 - posY
		}
		
		dstmsg = append(dstmsg, uint32(key))
		dstmsg = append(dstmsg, uint32(posXflag))
		dstmsg = append(dstmsg, uint32(posX))
		dstmsg = append(dstmsg, uint32(posYflag))
		dstmsg = append(dstmsg, uint32(posY))
		myWebSocket.SendMsg(sess, myWebSocket.MID_login, dstmsg)
		dstmsg = []uint32{}
	}
	return nil, true
}

/*
	离线响应
*/
func Logout(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc logout message ... ")
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}

	GetPlayer().Remove(sessid)
	//broadcast data to others.
	myWebSocket.BroadCastMsg(sess, false, myWebSocket.MID_logout, []uint32{uint32(sessid)})
	return nil, true
}

/*
	运动实体移动相应
*/
func Move(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc move message ... ")
	//广播自己移动位置给别人
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}
	return saveAndupdatePos(sess, sessid, myWebSocket.MID_move, data)
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
	fmt.Println("proc Bump message ... ")
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

	originPos := &Pos{
		Nodex: int(data[5]),
		Nodey: int(data[7]),
	}

	//2.则重新放置星星位置
	newPos := GetEntity().RandEntityPos(originPos)
	//3.广播给所有玩家
	bumpsucc(sess, newPos)
	
	return nil, true
}

func bumpsucc(sess *myWebSocket.WebSession, newpos *Pos)(error, bool){
	fmt.Println("bump succ: ", sess.RemoteAddr, newpos.Nodex, newpos.Nodey)
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
	myWebSocket.BroadCastMsg(sess, true, myWebSocket.MID_Bump, succmsg)
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
	myWebSocket.MsgRegister(myWebSocket.MID_login, Login)
	myWebSocket.MsgRegister(myWebSocket.MID_logout, Logout)
	myWebSocket.MsgRegister(myWebSocket.MID_move, Move)
	myWebSocket.MsgRegister(myWebSocket.MID_Bump, Bump)
}
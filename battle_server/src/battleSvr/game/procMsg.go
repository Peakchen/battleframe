package game

import (
	"common/myWebSocket"
	"fmt"
	"strings"
	"strconv"
)

 /**
	* 消息解析 
	* 0: 消息id
	* 1：消息长度
	* 2：sessionid
	* 3：nodex x坐标正负标记
	* 4：nodex x坐标值
	* 5：nodey y坐标正负标记
	* 6：nodey y坐标值 
*/

func updatePos(sess *myWebSocket.WebSession, sessid, msgid int, data []uint32) (error, bool) {
	var (
		pos = &Pos{}
	)
	if uint32(Pos_Right) != data[0] {
		pos.nodex -= int(data[1])
	}else{
		pos.nodex = int(data[1])
	}

	if uint32(Pos_Right) != data[2] {
		pos.nodey -= int(data[3])
	}else{
		pos.nodey = int(data[3])
	}
	
	fmt.Printf("update pos, RemoteAddr: %v, nodex: %v, nodey: %v.\n", sess.RemoteAddr, pos.nodex, pos.nodey)
	GetPlayer().Save(sessid, pos)
	//broadcast data to others.
	var (
		dstmsg = []uint32{}
	)
	dstmsg = append(dstmsg, uint32(sessid))
	dstmsg = append(dstmsg, data...)
	myWebSocket.BroadCastMsg(sess, msgid, dstmsg)
	return nil, true
}

func Login(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc login message ... ")
	//广播我的位置给其他人
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}
	updatePos(sess, sessid, myWebSocket.MID_login, data)
	//广播其他人的位置给我
	allplayers := GetPlayer().GetAll()
	var (
		dstmsg = make([]uint32, 5)
	)
	for key, pos := range allplayers{
		//不把自己的信息发给自己
		if key == sessid{
			continue
		}

		posXflag := Pos_Right
		posX := pos.nodex
		if pos.nodex < 0 {
			posXflag = Pos_Left
			posX = 0 - posX
		}
		posYflag := Pos_Right
		posY := pos.nodey
		if pos.nodey < 0 {
			posYflag = Pos_Left
			posY = 0 - posY
		}
		
		dstmsg = append(dstmsg, uint32(key))
		dstmsg = append(dstmsg, uint32(posXflag))
		dstmsg = append(dstmsg, uint32(posX))
		dstmsg = append(dstmsg, uint32(posYflag))
		dstmsg = append(dstmsg, uint32(posY))
		myWebSocket.BroadCastMsg(sess, myWebSocket.MID_login, dstmsg)
		dstmsg = []uint32{}
	}
	return nil, true
}

func Logout(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc logout message ... ")
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}

	GetPlayer().Remove(sessid)
	//broadcast data to others.
	myWebSocket.BroadCastMsg(sess, myWebSocket.MID_logout, []uint32{uint32(sessid)})
	return nil, true
}

func Move(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc move message ... ")
	//广播自己移动位置给别人
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}
	return updatePos(sess, sessid, myWebSocket.MID_move, data)
}

func Reg(){
	fmt.Println("reg proc msg.")
	myWebSocket.MsgRegister(myWebSocket.MID_login, Login)
	myWebSocket.MsgRegister(myWebSocket.MID_logout, Logout)
	myWebSocket.MsgRegister(myWebSocket.MID_move, Move)
}
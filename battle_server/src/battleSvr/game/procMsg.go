package game

import (
	"common/myWebSocket"
	"fmt"
	"strings"
	"strconv"
)

func updatePos(sess *myWebSocket.WebSession, msgid int, data []uint32) (error, bool) {
	arrAddr := strings.Split(sess.RemoteAddr, ":")
	sessid, err := strconv.Atoi(arrAddr[1])
	if err != nil {
		panic(err)
	}
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
	return updatePos(sess, myWebSocket.MID_login, data)
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
	return updatePos(sess, myWebSocket.MID_move, data)
}

func Reg(){
	fmt.Println("reg proc msg.")
	myWebSocket.MsgRegister(myWebSocket.MID_login, Login)
	myWebSocket.MsgRegister(myWebSocket.MID_logout, Logout)
	myWebSocket.MsgRegister(myWebSocket.MID_move, Move)
}
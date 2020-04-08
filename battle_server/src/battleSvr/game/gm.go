package game

import (
	"common/myWebSocket"
	"fmt"
)

const (
	GMID_resetStarPos = 1
)

var (
	_gm = map[int]myWebSocket.WsCallback {
		GMID_resetStarPos: resetStarPos,
	}
)

func GetGMFunc(gmid int)myWebSocket.WsCallback{
	return _gm[gmid]
}

func resetStarPos(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc resetStarPos ... ")
	entityptr, _ := GetEntity()
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
	entityptr.SetPos(pos)
	SyncStarPos(sess)
	return nil, true
}
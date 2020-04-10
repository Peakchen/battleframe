package main

import (
	"net/http"
	//"common/tcpNet"
	"common/myWebSocket"
	"battleSvr/game"
	"common/AsyncLock"
)

func init(){
	http.HandleFunc("/BattleStart", BeginBattleHandler)
	http.HandleFunc("/UpdateStarPos", UpdateStarPosHandler)
	http.HandleFunc("/Attack", AttackHandler)
}

func main(){
	game.Reg()
	AsyncLock.NewZKLock([]string{"127.0.0.1:2181"})
	ws := myWebSocket.NewWebsocketSvr(":13001")
	ws.Run()
	http.ListenAndServe(":13001", nil)	
}


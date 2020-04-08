package main

import (
	"net/http"
	//"common/tcpNet"
	"common/myWebSocket"
	"battleSvr/game"
	//"battleSvr/gametest"
)

func init(){
	http.HandleFunc("/BattleStart", BeginBattleHandler)
	http.HandleFunc("/UpdateStarPos", UpdateStarPosHandler)
	http.HandleFunc("/Attack", AttackHandler)
}

func main(){
	game.Reg()
	ws := myWebSocket.NewWebsocketSvr(":13001")
	ws.Run()
	http.ListenAndServe(":13001", nil)	
}


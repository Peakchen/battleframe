package main

import (
	"net/http"
	//"common/tcpNet"
	"common/myWebSocket"
)

func main(){
	http.HandleFunc("/BattleStart", BeginBattleHandler)
	http.HandleFunc("/UpdateStarPos", UpdateStarPosHandler)
	http.HandleFunc("/Attack", AttackHandler)
	ws := myWebSocket.NewWebsocketSvr(":13001")
	ws.Run()
	http.ListenAndServe(":13001", nil)	
}


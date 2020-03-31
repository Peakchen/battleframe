package main

import (
	"net/http"
)

func main(){
	http.HandleFunc("/BattleStart", BeginBattleHandler)
	http.HandleFunc("/UpdateStarPos", UpdateStarPosHandler)
	http.HandleFunc("/Attack", AttackHandler)
	http.ListenAndServe(":13001", nil)
}
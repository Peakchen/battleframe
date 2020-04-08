package game

import (
	"common/myWebSocket"
	"fmt"
)

func MainGM(sess *myWebSocket.WebSession, data []uint32) (error, bool) {
	fmt.Println("proc MainGM message ... ")
	gmid := int(data[0])
	if cb := GetGMFunc(gmid); cb != nil {
		cb(sess, data[1:])
	}
	return nil, true
}

func init(){
	
}
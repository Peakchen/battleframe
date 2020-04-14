package game

/*
	快读、慢写

	服务器主动同步客户端操作状态，则不会因为单个客户端而断开影响。
	帧同步服务器，是以固定间隔把frame进行广播，某一个玩家卡了或者挂了，对于其他玩家是完全不可见，也是无影响的

	1s=10帧左右 保证客户端收到，考虑网络波动，故设置为70ms (100-200其实也可以，要结合实际客户端的需要)
*/

import (
	"time"
	"common/myWebSocket"
	"fmt"
)

type LogicFrame struct {
	
}

var (
	GLogicFrame *LogicFrame = &LogicFrame{}
)

func (this *LogicFrame) Run(){
	go this.loopFrame()
}

/*
	取得全服玩家数据进行广播（带上帧数）
*/
func (this *LogicFrame) loopFrame(){
	tick := time.NewTicker( time.Duration( 70*time.Millisecond ))
	for {
		<-tick.C
		BroadcastAllMosterInfo()
	}
}

/*
	服务器逻辑帧驱动广播
*/
func BroadcastAllMosterInfo(){
	allplayers := GetGlobalPurpleMonsters().GetAll()
	if len(allplayers) == 0 {
		return
	}

	var (
		dstmsg = []uint32{}
	)
	for id, state := range allplayers{
		if state == MosterState_Offline {
			continue
		}
		
		moster := GetPurpleMonsterByID(id)
		if moster.Mypos == nil {
			continue
		}

		posXflag := Pos_Right
		posX := moster.Mypos.Nodex
		if moster.Mypos.Nodex < 0 {
			posXflag = Pos_Left
			posX = 0 - posX
		}
		posYflag := Pos_Right
		posY := moster.Mypos.Nodey
		if moster.Mypos.Nodey < 0 {
			posYflag = Pos_Left
			posY = 0 - posY
		}
		
		dstmsg = append(dstmsg, uint32(posXflag))
		dstmsg = append(dstmsg, uint32(posX))
		dstmsg = append(dstmsg, uint32(posYflag))
		dstmsg = append(dstmsg, uint32(posY))
		dstmsg = append(dstmsg, uint32(id))
		
		myWebSocket.BroadCastMsgExceptID(id, false, myWebSocket.MID_LogicFrameSync, dstmsg)
		dstmsg = []uint32{}
	}
}

/*
	广播其他人的位置给我
 	客户端消息驱动
 */
func BroadcastOtherMosterInfo2Me(sess *myWebSocket.WebSession, myId uint32, msgid int){
	allplayers := GetGlobalPurpleMonsters().GetAll()
	var (
		dstmsg = []uint32{}
	)
	for id, state := range allplayers{
		if state == MosterState_Offline {
			continue
		}
		
		moster := GetPurpleMonsterByID(id)
		if moster.Mypos == nil {
			continue
		}

		//不把自己的信息发给自己
		if id == myId{
			continue
		}

		posXflag := Pos_Right
		posX := moster.Mypos.Nodex
		if moster.Mypos.Nodex < 0 {
			posXflag = Pos_Left
			posX = 0 - posX
		}
		posYflag := Pos_Right
		posY := moster.Mypos.Nodey
		if moster.Mypos.Nodey < 0 {
			posYflag = Pos_Left
			posY = 0 - posY
		}
		
		dstmsg = append(dstmsg, uint32(posXflag))
		dstmsg = append(dstmsg, uint32(posX))
		dstmsg = append(dstmsg, uint32(posYflag))
		dstmsg = append(dstmsg, uint32(posY))
		dstmsg = append(dstmsg, uint32(id))

		fmt.Println("sync other pos: ", id, posXflag, posX, posYflag, posY)
		myWebSocket.SendMsg(sess, msgid, dstmsg)
		dstmsg = []uint32{}
	}
}
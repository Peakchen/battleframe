package myWebSocket

import (
	"encoding/binary"
	"github.com/gorilla/websocket"
)

type wsCallback func (ws *WebSession, data []uint32) (error, bool)

var (
	msgs = map[int]wsCallback{}
)

func MsgRegister(id int, cb wsCallback) {
	msgs[id] = cb
}

func GetProcMsg(id int) wsCallback{
	return msgs[id]
}

//广播消息
func BroadCastMsg(selfsess *WebSession, msgid int, msgparams []uint32) {

	if len(msgparams) == 0 {
		panic("invalid  broadcast msg content.")
	}

	var (
		msg = make([]byte, 4*(len(msgparams)+2))
	)

	//消息ID
	var pos int
	binary.LittleEndian.PutUint32(msg[pos:], uint32(msgid))
	pos+=4
	
	//消息长度
	binary.LittleEndian.PutUint32(msg[pos:], uint32(len(msgparams)))
	pos+=4

	//消息内容
	for i:=0; i<len(msgparams); i++{
		binary.LittleEndian.PutUint32(msg[pos:], msgparams[i])
		pos+=4
	}

	sesses := GwebSessionMgr.GetSessions()
	sesses.Range(func (k, v interface{}) bool{
		if v != nil {
			sess := v.(*WebSession)
			if sess.RemoteAddr == selfsess.RemoteAddr {
				return true
			}
			sess.Write(websocket.BinaryMessage, msg)
		}
		
		return true
	})
}
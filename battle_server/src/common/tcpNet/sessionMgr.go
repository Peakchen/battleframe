package tcpNet

import (
	"sync"
)

type ClientSession struct {
	sessMap sync.Map
}

var (
	GSessionMgr *ClientSession
)

func (this *ClientSession) AddSession(sess *Session){
	this.sessMap.Store(sess.RemoteAddr, sess)
}

func (this *ClientSession) GetSession(addr string) (sess *Session){
	val, exist := this.sessMap.Load(addr)
	if exist {
		sess = val.(*Session)
	}
	return 
}

func (this *ClientSession) RemoveSession(addr string) {
	this.sessMap.Delete(addr)
}

func init(){
	GSessionMgr = &ClientSession{}
}
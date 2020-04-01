package tcpNet

import (
	"github.com/xtaci/kcp-go"
	"fmt"
	"sync"
)

type KcpNetServer struct {
	Addr string
	offch chan *Session
}

func NewNetServer(addr string) (*KcpNetServer){
	return &KcpNetServer{
		Addr: addr,
		offch: make(chan *Session, 1024),
	}
}

func (this *KcpNetServer) Run() {
	var wg sync.WaitGroup
	wg.Add(2)
	go this.listenConn(&wg)
	go this.disconnloop(&wg)
	wg.Wait()
}

func (this *KcpNetServer) listenConn(wg *sync.WaitGroup){
	defer wg.Done()
	
	kcplisten, err := kcp.ListenWithOptions(this.Addr, nil, 10, 3)
	if err != nil {
		panic(err)
	}

	for {
		conn, AcceptErr := kcplisten.AcceptKCP()
		if AcceptErr != nil {
			panic(AcceptErr)
		}

		fmt.Println("conn remoteAddr: ", conn.RemoteAddr().String())
		sess := NewSession(conn, this.offch)
		sess.Handle()
		GSessionMgr.AddSession(sess)
	}
}

func (this *KcpNetServer) disconnloop(wg *sync.WaitGroup){
	defer wg.Done()
	for {
		select {
		case sess := <-this.offch:
			GSessionMgr.RemoveSession(sess.RemoteAddr)
		}
	}
}
package tcpNet

import (
	"net"
	"io"
	"fmt"
)

type Session struct {
	conn net.Conn
	offch chan *Session
	RemoteAddr string
	sendch chan []byte
}

func NewSession(newconn net.Conn, off chan *Session) *Session{
	return &Session{
		conn: newconn,
		offch: off,
		RemoteAddr: newconn.RemoteAddr().String(),
		sendch: make(chan []byte, 1024),
	}
}

func (this *Session) Handle() {
	go this.reconnect()
	go this.read()
	go this.write()
}

func (this *Session) reconnect(){

}

func (this *Session) read(){
	var buffer = make([]byte, 1024)
	for {
		n, readErr := this.conn.Read(buffer)
		if readErr != nil {
			if readErr == io.EOF {
				break
			}
			fmt.Println(readErr)
			break
		}

		fmt.Println("receive from client:", buffer[:n])
		//判断是否广播
		
	}
}

func (this *Session) write(){
	for {
		data := <-this.sendch
		_, err := this.conn.Write(data)
		if err != nil {
			fmt.Println("send data fail, err: ", err)
		}
	}
}

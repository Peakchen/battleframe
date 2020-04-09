package myWebSocket

import (
	"time"
	"github.com/gorilla/websocket"
	"fmt"
	//"encoding/binary"
	//"io"
	"strings"
)

type wsMessage struct {
    messageType int //消息类型 TextMessage/BinaryMessage/CloseMessage/PingMessage/PongMessage
    data        []byte //消息内容
}

type WebSession struct {
	wsconn *websocket.Conn  
	offch 	chan *WebSession	//离线通道
	RemoteAddr string
	writeCh chan *wsMessage //写通道
	readCh  chan *wsMessage //读通道
}

func NewWebSession(conn *websocket.Conn, off chan *WebSession) *WebSession{
	return &WebSession{
		wsconn: conn,
		offch: off,
		RemoteAddr: conn.RemoteAddr().String(),
		writeCh: make(chan *wsMessage, maxWriteMsgSize),
		readCh: make(chan *wsMessage, maxWriteMsgSize),
	}
}

func (this *WebSession) Handle(){
	go this.readloop()
	go this.writeloop()
}

func (this *WebSession) exit(){
	this.wsconn.Close()

	this.offch <-this

	if _, noclosed := <-this.writeCh; !noclosed {
		time.Sleep(1*time.Second)
		close(this.writeCh)
	} 
	
	if _, noclosed := <-this.readCh; !noclosed {
		time.Sleep(1*time.Second)
		close(this.readCh)
	}
}

func (this *WebSession) readloop(){

	defer func(){
		this.exit()
	}()

	this.wsconn.SetReadLimit(maxMessageSize)
	this.wsconn.SetReadDeadline(time.Now().Add(pongWait))
	
	for {
        msgType, data, err := this.wsconn.ReadMessage()
        if err != nil {
            websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure)
			if strings.EqualFold(err.Error(), "unexpected EOF") {
				fmt.Println("client close connection, err: ", err.Error(), time.Now().Unix())
			}else if strings.EqualFold(err.Error(), "use of closed network connection") {
				fmt.Println("server close connection, err: ", err.Error(), time.Now().Unix())
			}else{
				fmt.Println("other info msg read fail, err: ", err.Error(), time.Now().Unix())
			}
            return
		}
		
        msg := &wsMessage{
            messageType: msgType,
            data: data,
		}
		
		this.read(msg)
	}
}

func (this *WebSession) read(msg *wsMessage){
	fmt.Println("read messageType: ", msg.messageType, len(msg.data), time.Now().Unix())
	if handler := GetMessageHandler(msg.messageType); handler != nil {
		handler(this, msg)
	}else{
		panic(fmt.Errorf("invalid message type: %v.", msg.messageType))
	}
}

func (this *WebSession) writeloop(){
	ticker := time.NewTicker(pingPeriod)
    defer func() {
		ticker.Stop()
		this.exit()
	}()
	
	for {
		select {
			case msg := <-this.writeCh:
				if err := this.wsconn.WriteMessage(msg.messageType, msg.data); err != nil {
					fmt.Println("send msg fail, err: ", err.Error(), time.Now().Unix())
					return
				}
			case <-ticker.C:
				this.wsconn.SetWriteDeadline(time.Now().Add(writeWait))
				if err := this.wsconn.WriteMessage(websocket.PingMessage, nil); err != nil {
					fmt.Println("send msg over time, err: ", err.Error(), time.Now().Unix())
					return
				}
			}
	}
}

func (this *WebSession) Write(msgtype int, data []byte) {
	fmt.Println("session writed channel data len: ", len(this.writeCh), time.Now().Unix())
	if len(this.writeCh) >= maxWriteMsgSize{
		time.AfterFunc(time.Duration(5*time.Second), func (){
			this.writeCh <- &wsMessage{
				messageType: msgtype,
				data: data,
			}
		})
	}else{
		this.writeCh <- &wsMessage{
			messageType: msgtype,
			data: data,
		}
	}
}

func (this *WebSession) broadcast(msgtype int, data []byte) {
	sesses := GwebSessionMgr.GetSessions()
	sesses.Range(func (k, v interface{}) bool{
		if v != nil {
			sess := v.(*WebSession)
			sess.Write(msgtype, data)
		}
		
		return true
	})
}


package myWebSocket

import (
	"time"
	"github.com/gorilla/websocket"
	"fmt"
	"encoding/binary"
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
		writeCh: make(chan *wsMessage, 1000),
		readCh: make(chan *wsMessage, 1000),
	}
}

func (this *WebSession) Handle(){
	go this.readloop()
	go this.writeloop()
}

func (this *WebSession) exit(){
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
	//this.wsconn.SetReadDeadline(time.Now().Add(pongWait))
	
	for {
        msgType, data, err := this.wsconn.ReadMessage()
        if err != nil {
            websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure)
            fmt.Println("msg read fail, err: ", err.Error())
            this.wsconn.Close()
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
	fmt.Println("read messageType: ", msg.messageType)
	switch msg.messageType {
		case websocket.TextMessage:
			{
				fmt.Println("read TextMessage data: ", string(msg.data))
				this.Write(websocket.TextMessage, []byte("TextMessage hello,too!"))
			}
		case websocket.BinaryMessage:
			{
				var pos int
				msgid := binary.LittleEndian.Uint32(msg.data[pos:])	//消息id
				pos+=4

				datalen := binary.LittleEndian.Uint32(msg.data[pos:]) //消息长度
				pos+=4

				// sendType := binary.LittleEndian.Uint32(msg.data[pos:]) //消息发送类型
				// pos+=2

				var (
					params = []uint32{}	
				)
				for i := uint32(0); i < datalen; i++ {
					param := binary.LittleEndian.Uint32(msg.data[pos:])
					pos+=4

					params = append(params, param)
				}

				if len(params) <= 0 {
					fmt.Println("invalid params: ", params)
					return
				}
				
				if proc := GetProcMsg(int(msgid)); proc != nil {
					err, _ := proc(this, params)
					if err != nil {
						fmt.Println("proc msg err: ", err)
					}
				}else{
					fmt.Println("invalid msg id: ", msgid)
				}

			}
		case websocket.CloseMessage:
			{
				this.offch <-this
			}
		case websocket.PingMessage:
			{

			}
		case websocket.PongMessage:
			{

			}
		default:
			fmt.Println("invalid msg type: ", msg.messageType)
	}
}

func (this *WebSession) writeloop(){
	//ticker := time.NewTicker(pingPeriod)
    defer func() {
		//ticker.Stop()
		this.exit()
	}()
	
	for {
		select {
			case msg := <-this.writeCh:
				if err := this.wsconn.WriteMessage(msg.messageType, msg.data); err != nil {
					fmt.Println("send msg fail, err: ", err.Error())
					this.wsconn.Close()
					return
				}
			// case <-ticker.C:
			// 	this.wsconn.SetWriteDeadline(time.Now().Add(writeWait))
			// 	if err := this.wsconn.WriteMessage(websocket.PingMessage, nil); err != nil {
			// 		fmt.Println("send msg over time, err: ", err.Error())
			// 		this.wsconn.Close()
			// 		return
			// 	}
			}
	}
}

func (this *WebSession) Write(msgtype int, data []byte) {
	this.writeCh <- &wsMessage{
		messageType: msgtype,
		data: data,
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


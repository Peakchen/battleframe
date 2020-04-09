/**
 * websocket 
 */

let Global = require("common")

//心跳检测
var HeartCheck = {
    timeout: 60000, //60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    disconnectioned: false,
    reconnectTimeoutobj: null,

    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },

    startHeartBeat: function() {
        var self = this;
        this.timeoutObj = setTimeout(function() {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
            cc.log("send heart beat...")
            if (Global.ws == null) {
                return
            } 

            var buff = new ArrayBuffer(12)
            var data = new Uint32Array(buff)
    
            data[0] = Global.MID_HeartBeat //消息ID
            data[1] = 1 //消息长度
            data[2] = 0 //anything 随意填充一个数

            Global.ws.send(data);
            self.serverTimeoutObj = setTimeout(function() { //心跳超时主动断开
                cc.log("close connection...")
                if (Global.ws == null) {
                    return
                } 
                Global.ws.close();
                self.disconnectioned = true
            }, self.timeout)
        }, this.timeout)
    },

    hasDisconnected: function(){
        return this.disconnectioned
    },

    stopReconnectTimer: function(){
        //cc.log("close reconnectTimeout...")
        clearTimeout(this.reconnectTimeoutobj);
    }
}

cc.Class({
    //extends: cc.Component,

    /*
    readyState:
        CONNECTING 0
        OPEN       1
        CLOSING    2
        CLOSED     3
    */
   
    CanSendMsg: function(){
        if (Global.ws == null){
            return false
        }

        return (Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN)
    }, 

    swConnect: function(){
        if (Global.ws != null) {
            //return
            //cc.log("readyState: ", Global.ws.readyState)
            if (Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN) { //已经连上就不必再连
                return
            }
        }

        var self = this;
        cc.log("addr: ", Global.wsAddr, Global.ws == null)
        var ws = new WebSocket(Global.wsAddr);
        ws.onopen = function(e) {
            cc.log("ws open: ", ws.readyState)
            //发送心跳
            HeartCheck.reset().startHeartBeat()
        }

        ws.onmessage = function(e) {
            /**
             * 消息解析 
             * 0: 消息id
             * 1：消息长度
             * 2：sessionid
             * 3：nodex x坐标正负标记
             * 4：nodex x坐标值
             * 5：nodey y坐标正负标记
             * 6：nodey y坐标值 
             */

            var data = new Uint32Array(e.data)
            var msgid = data[0] 
            switch (msgid) {
                case Global.MID_login:
                    cc.log("ws message MID_login: ", data[1], data[2], data[3], data[4], data[5], data[6])
                    var key = data[2].toString()
                    var nodex = data[4]
                    var nodey = data[6]
                    if (data[3] == 2){
                        nodex = 0 - nodex
                    }
                    if (data[5] == 2){
                        nodey = 0 - nodey
                    }
                    var playerProp = {
                        sessionId: data[2],
                        nodex: nodex,
                        nodey: nodey
                    }
                    if (Global.PlayerSessionMap.has(key) == false) {
                        Global.PlayerSessionMap.set(key, playerProp)
                    }
                    Global.NewplayerMap.set(key, playerProp)
                    Global.newPlayerIds.push(key)
                    //cc.log("ws message MID_login: ", Global.newPlayerIds.length, key, Global.NewplayerMap.has(key))
                    break;
                case Global.MID_logout:
                    var key = data[2].toString()
                    cc.log("ws message MID_logout, sessionid: ", key)
                    Global.DelPlayerIds.push(key)
                    Global.PlayerSessionMap.delete(key)
                    break;
                case Global.MID_move:
                    //cc.log("ws message MID_move: ", data[1], data[2], data[3], data[4], data[5], data[6])
                    var key = data[2].toString()
                    var nodex = data[4]
                    var nodey = data[6]
                    if (data[3] == 2){
                        nodex = 0 - nodex
                    }
                    if (data[5] == 2){
                        nodey = 0 - nodey
                    }
                    var playerProp = {
                        sessionId: data[2],
                        nodex: nodex,
                        nodey: nodey
                    }
                    if (Global.PlayerSessionMap.has(key) == false) {
                        Global.PlayerSessionMap.set(key, playerProp)
                    }
                    Global.NewplayerMap.set(key, playerProp)
                    Global.newPlayerIds.push(key)
                    //cc.log("MID_move purple monsters: ", Global.newPlayerIds.length, key, Global.NewplayerMap.has(key))
                    break;
                case Global.MID_Bump:
                    //cc.log("ws message MID_Bump: ", data[1], data[2], data[3], data[4], data[5], data[6])
                    /**
                     *  0: 消息ID
                        1：消息长度
                        2: 成功失败标志 (失败则只需要前三个字段)
                        3: 星星x坐标正负标志
                        4: 星星x坐标
                        5：星星y坐标正负标志
                        6：星星y坐标
                     */

                    if (data[2] == 0){ //失败
                        cc.log("ws message MID_Bump fail ... ")
                        break
                    }
                    
                    var nodex = data[4]
                    var nodey = data[6]
                    if (data[3] == 2){
                        nodex = 0 - nodex
                    }
                    if (data[5] == 2){
                        nodey = 0 - nodey
                    }
                    var starProp = {
                        nodex: nodex,
                        nodey: nodey
                    }
                    Global.newStarPos.set(Global.newStarKey, starProp)
                    break
                case Global.MID_HeartBeat:
                    cc.log("ws message MID_HeartBeat: ", msgid)
                    break
                case Global.MID_StarBorn:
                    cc.log("ws message MID_StarBorn: ", data[2], data[3], data[4], data[5])
                    /**
                     *  0: 消息ID
                        1：消息长度
                        2: 星星x坐标正负标志
                        3: 星星x坐标
                        4：星星y坐标正负标志
                        5：星星y坐标
                     */
                    var nodex = data[3]
                    var nodey = data[5]
                    if (data[2] == 2){
                        nodex = 0 - nodex
                    }
                    if (data[4] == 2){
                        nodey = 0 - nodey
                    }
                    var starProp = {
                        nodex: nodex,
                        nodey: nodey
                    }
                    Global.newStarPos.set(Global.newStarKey, starProp)
                    break
                case Global.MID_GM:
                    cc.log("ws message MID_GM...")
                    break
                default:
                    cc.log("未知 消息id: ", msgid)
            }

            //发送心跳
            HeartCheck.reset().startHeartBeat()
        }

        ws.onerror = function (e) {
            cc.log("ws error: ", ws.readyState)
            //Global.ws = null
            if (HeartCheck.hasDisconnected() == false) {
                HeartCheck.stopReconnectTimer()
                HeartCheck.reconnectTimeoutobj = setTimeout(function() {
                    self.swConnect();
                }, 1000)
            }else{
                HeartCheck.stopReconnectTimer()
            }
        }

        ws.onclose = function (e) {
            cc.log("ws close: ", ws.readyState)
            //Global.ws = null
            if (HeartCheck.hasDisconnected() == false) {
                HeartCheck.stopReconnectTimer()
                HeartCheck.reconnectTimeoutobj = setTimeout(function() {
                    self.swConnect();
                }, 1000)
            }else{
                HeartCheck.stopReconnectTimer()
            }
        }

        cc.log("global ws init, state: ", ws.readyState)
        Global.ws = ws
    },

    /**
     * 
     * @param {*} data  具体数据, 1：长度，2：是否广播，3：... 具体消息数据
     */
    sendwsmessage: function(data){
        
        if (Global.ws == null) {
            return
        }

        if (Global.ws != null) {
            if (Global.ws.readyState == WebSocket.CLOSED || Global.ws.readyState == WebSocket.CLOSING) { //正在断开或者已经断开，则不能发送消息
                return
            }
        }

        //cc.log("ws sendwsmessage: ", Global.ws.readyState)
        Global.ws.send(data)
    }
})
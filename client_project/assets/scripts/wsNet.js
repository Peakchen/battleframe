/**
 * websocket 
 */

let Global = require("common")

cc.Class({
    extends: cc.Component,

    /*
    readyState:
        CONNECTING 0
        OPEN       1
        CLOSING    2
        CLOSED     3
    */
    swConnect: function(){
        if (Global.ws != null) {
            cc.log("readyState: ", Global.ws.readyState)
            if (Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN) { //已经连上就不必再连
                return
            }
        }

        cc.log("addr: ", Global.wsAddr, Global.ws == null)
        ws = new WebSocket(Global.wsAddr);
        ws.onopen = function(e) {
            cc.log("ws open: ", ws.readyState)
        }

        ws.onmessage = function(e) {
            cc.log("ws message: ", e.data)
        }

        ws.onerror = function (e) {
            cc.log("ws error: ", ws.readyState)
        }

        ws.onclose = function (e) {
            cc.log("ws close: ", ws.readyState)
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

        cc.log("ws sendwsmessage.")
        Global.ws.send(data)
    }
})
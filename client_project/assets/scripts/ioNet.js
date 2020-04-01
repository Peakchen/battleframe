/*
    客户端socket.on()监听的事件：
        connect：           连接成功
        connecting：        正在连接
        disconnect：        断开连接
        connect_failed：    连接失败
        error：             错误发生，并且无法被其他事件类型所处理
        message：           同服务器端message事件
        anything：          同服务器端anything事件
        reconnect_failed：  重连失败
        reconnect：         成功重连
        reconnecting：      正在重连

    当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
*/

let Global = require("common")

cc.Class({
    extends: cc.Component,

    ioConnect: function (){
        var iosocket = io.connect(Global.wsAddr)    
        
        iosocket.on("connect", function(){
            cc.log("ionet connect.")
        });

        iosocket.on("message", function(data){
            cc.log("ionet message: ", data)
        });

        iosocket.on("connecting", function(){
            cc.log("ionet connecting.")
        });

        iosocket.on("disconnect", function(){
            cc.log("ionet disconnect.")
        });

        iosocket.on("reconnecting", function(){
            cc.log("ionet reconnecting.")
        });

        iosocket.on("connecting", function(){
            cc.log("ionet connecting.")
        });

        iosocket.on("reconnect", function(){
            cc.log("ionet reconnect.")
        });

        iosocket.on("error", function(){
            cc.log("ionet error.")
        });

        Global.ioSocket = iosocket
    }
})
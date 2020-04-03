let Api = require("api")
let Global = require("common")

cc.Class({
    extends: cc.Component,

    //
    getApi: function(){
        return new Api()
    },

    //获取地址端口
    getHost: function() {
        return Global.Addr;
    },

    //获取随机数
    getRandNumber: function(number){
        if (Global.randseed == 0) {
            return number
        }
        return this.getApi().Rand(number, Global.randseed);
    },

    getRandOne: function(randseed){
        if (randseed == 0) {
            randseed = Global.randseed
        }
        return this.getApi().RandOne(randseed);
    },

    //发送更新star位置更新信息
    postUpdateStarPosMsg: function(maxX){
        //cc.log("begin send battle start message.")
        var request = cc.loader.getXMLHttpRequest();
        var url = this.getHost() + "/UpdateStarPos"
        request.open("POST", url, true)
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.responseType = "arraybuffer";
        request.onreadystatechange = function(){
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                cc.log("UpdateStarPos response: ", request.response)
                var data = new Uint32Array(request.response)
                cc.log("UpdateStarPos data: ", data)
                Global.starPosRandseed = data[0]
                Global.starPosRandN = data[1]
                return 
            }
        } 

        request.send(new Uint16Array([1, maxX]))
    },

    //发送战斗开始请求
    postBattleStartMsg: function() {
        if (Global.randseed > 0) {
            return
        }

        //cc.log("begin send battle start message.")
        var request = cc.loader.getXMLHttpRequest();
        var url = this.getHost() + "/BattleStart"
        request.open("POST", url, true)
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.onreadystatechange = function(){
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                Global.randseed = parseInt(request.responseText)
                cc.log("BattleStart response: ", request.responseText)
            }
        } 

        request.send(new Uint16Array([1])) //param 1: 数据长度，param ...: 具体数据
    },

    //发送攻击请求
    postAttackMsg: function(frame, dist) {
        //cc.log("begin send Attack message.", Global.randseed)
        var request = cc.loader.getXMLHttpRequest();
        var url = this.getHost() + "/Attack"
        request.open("POST", url, true)
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.onreadystatechange = function(){
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                cc.log("Attack response: ", request.responseText)
            }
        } 

        var randn = this.getRandNumber(dist)
        request.send(new Uint16Array([3, frame, dist, randn])) //param 1: 数据长度，param ...: 具体数据
    }
})



let wsNet = require("wsNet")
let Global = require("common")

// gm id列表
var GMID = {
    resetStarPos: 1,
}

cc.Class({

    getwsNetObj: function() {
        return new wsNet();
    },

    sendResetStarPos: function(){
        cc.log("reset star pos...")
        var buff = new ArrayBuffer(28)
        var data = new Uint32Array(buff)

        data[0] = Global.MID_GM         //消息ID
        data[1] = 5                     //消息长度
        data[2] = GMID.resetStarPos     //gm 子命令id
        
        var nodexflag = 1
        var nodex = 0.0
        if (nodex < 0.0) {
            nodexflag = 2
            nodex = 0.0 - nodex
        }

        data[3] = nodexflag             //x坐标正负
        data[4] = parseInt(nodex)       //x坐标
        var nodeyflag = 1
        var nodey = -88 
        if (nodey < 0.0) {
            nodeyflag = 2
            nodey = 0.0 - nodey
        }

        data[5] = nodeyflag             //y坐标正负
        data[6] = parseInt(nodey)       //y坐标

        this.getwsNetObj().sendwsmessage(data)
    }
})
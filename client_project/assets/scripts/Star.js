let Battle = require("battle")
let wsNet = require("wsNet")
let Global = require("common")
cc.Class({
    extends: cc.Component,
    
    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
    },

    getBattleObj: function() {
        return new Battle();
    },

    getwsNetObj: function() {
        return new wsNet();
    },

    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onLoad: function() {
        this.updateFrame = 0
    },

    onPicked: function() {
        if (Global.newStarPos.has(Global.newStarKey) == false && Global.BumpedPlayerId == null) {
            return
        }

        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        var data = Global.newStarPos.get(Global.newStarKey)
        Global.newStarPos.delete(Global.newStarKey)
        var nodex = data.nodex
        var nodey = data.nodey
        //cc.log("update star pos: ", data.nodex, data.nodey)
        this.game.spawnNewStar(nodex, nodey);
        Global.syncStarPos = true
        // 然后销毁当前星星节点
        this.node.destroy();
        Global.Bumped = 1
    },

    /*
	撞击响应
	请求消息结构：
		0: 消息ID
		1：消息长度 8
		2: 小球x坐标正负标志
		3: 小球x坐标
		4：小球y坐标正负标志
		5：小球y坐标
		6: 星星x坐标正负标志
		7: 星星x坐标
		8：星星y坐标正负标志
        9：星星y坐标
    */
    sendBumpMsg: function(){
        var buff = new ArrayBuffer(44)
        var data = new Uint32Array(buff)

        data[0] = Global.MID_Bump //消息ID
        data[1] = 9 //消息长度

        //小球信息
        var playerPos = this.game.player.getPosition();
        var playerX = playerPos.x;
        var playerXflag = 1
        if (playerX < 0.0) {
            playerXflag = 2
            playerX = 0.0 - playerX
        }

        var playerY = playerPos.y;
        var playerYflag = 1
        if (playerY < 0.0) {
            playerYflag = 2
            playerY = 0.0 - playerY
        }

        data[2] = playerXflag
        data[3] = parseInt(playerX)
        data[4] = playerYflag
        data[5] = parseInt(playerY)

        //星星信息
        var starPos = this.node.getPosition();
        var starX = starPos.x;
        var starXflag = 1
        if (starX < 0.0) {
            starXflag = 2
            starX = 0.0 - starX
        }

        var starY = starPos.y;
        var starYflag = 1
        if (starY < 0.0) {
            starYflag = 2
            starY = 0.0 - starY
        }

        data[6] = starXflag
        data[7] = parseInt(starX)
        data[8] = starYflag
        data[9] = parseInt(starY)
        data[10] = Global.mySessionId
        cc.log("send bump star: ", data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])
        this.getwsNetObj().sendwsmessage(data)
    },

    update: function (dt) {
        //cc.log("star dt: ", this.updateFrame)
        // 每帧判断和主角之间的距离是否小于收集距离

        if (this.updateFrame >= 1.0 && this.getPlayerDistance() < this.pickRadius) {
            this.updateFrame = 0
            // 调用收集行为
            if (dt <= 1.0) {
                dt *= 100.0
            }
            var frame = parseInt(dt)
            var dist = parseInt(this.getPlayerDistance())
            // 发送撞击星星事件
            //this.getBattleObj().postAttackMsg(frame, dist);
            //cc.log("star info: ", dt, frame, dist)
            this.sendBumpMsg()
            return;
        }

        if (Global.newStarPos.has(Global.newStarKey)){
            this.onPicked();
        }
        
        this.updateFrame += dt
        // 根据 Game 脚本中的计时器更新星星的透明度
        //var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        //var minOpacity = 50;
        //this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});

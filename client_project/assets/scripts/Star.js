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

    onPicked: function(frame, dist) {
        //碰撞后发送一个消息
        // var buff = new ArrayBuffer(12)
        // var data = new Uint32Array(buff)
        // data[0] = 4
        // data[1] = 1 //单纯给服务器发消息
        // for (var i = 2; i <= data.length-1; i++) {
        //     data[i] = i + 1
        // }
        Global.Bumped = 1
        // this.getwsNetObj().sendwsmessage(data)
        // 发送撞击星星事件
        this.getBattleObj().postAttackMsg(frame, dist);
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },

    update: function (dt) {
        //cc.log("star dt: ", dt)
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            if (dt <= 1.0) {
                dt *= 100.0
            }
            var frame = parseInt(dt)
            var dist = parseInt(this.getPlayerDistance())
            //cc.log("star info: ", dt, frame, dist)
            this.onPicked(frame, dist);
            return;
        }
        
        // 根据 Game 脚本中的计时器更新星星的透明度
        //var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        //var minOpacity = 50;
        //this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});

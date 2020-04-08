let Battle = require("battle")
let Global = require("common")
let wsNet = require("wsNet")
let PlayerData = require("playerdata")

cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    getBattleObj: function() {
        return new Battle();
    },

    getwsNetObj: function() {
        return new wsNet();
    },

    onLoad: function () {

        //this.getwsNetObj().sendwsmessage("hello")
        Global.PlayerSessionMap = new Map();
        Global.NewplayerMap = new Map();
        Global.newPlayerIds = new Array();
        Global.DelPlayerIds = new Array();

        //发起战斗开始请求
        this.getBattleObj().postBattleStartMsg();

        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar(0.0, 0.0);
        // 初始化计分
        this.score = 0;
    },

    spawnNewStar: function(x, y) {
        //cc.log("new star pos: ", x, y)
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        if (x != 0.0 || y != 0.0 ){
            //var maxX = this.node.width/2;
           // var newx = (x - 0.5) * 2 * maxX;
            newStar.setPosition(cc.v2(x, y));
        }else{
            newStar.setPosition(this.getNewStarPosition());
        }
        
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        var randY = -100
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        //var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        this.getBattleObj().postUpdateStarPosMsg(maxX)
        randX = (Math.random() - 0.5) * 2 * maxX;
        if (randX >= this.node.width/2) {
            randX = this.node.width/3
        }

        if (randX <= (0-this.node.width/2)){
            randX = (0-this.node.width/3)
        }

        //服务器给的坐标，客户端随便检验看看是否一致
        // var randN = this.getBattleObj().getRandOne(Global.starPosRandseed)
        // if (parseInt(randN*10000) != Global.starPosRandN) {
        //     cc.log("invalid rand number: ", randN, Global.starPosRandN)
        //     return cc.v2(randX, randY); 
        // }
        //cc.log("star randX: ", randX)
        //randX = (this.getBattleObj().getRandNumber(4)*Math.random() - 2.0) * maxX;
        // 返回星星坐标
        
        return cc.v2(randX, randY);
    },

    //检查创建新小球
    checkNewPlayer: function(){
        var playeridsLen = Global.newPlayerIds.length
        if (playeridsLen == 0 ) {
            return
        }

        cc.log("create purple monsters.")
        var self = this;
        var url = "PurpleMonster"
        for (;playeridsLen > 0;){
            var playerid = Global.newPlayerIds.pop() //弹出数据
            if (Global.NewplayerMap.has(playerid) == false) {
                continue
            }

            var data = Global.NewplayerMap.get(playerid) //节点数据坐标
            var child = self.node.getChildByName(playerid.toString())
            if (child != null){
                self.node.removeChild(child)
            }

            //创建精灵
            //cc.log("new player pos: ", playerid, data.nodex, data.nodey)
            cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame){
                cc.loader.setAutoRelease(url, true);
                var node = new cc.Node(playerid.toString())
                node.position = cc.v2(data.nodex, data.nodey);
                const sprite = node.addComponent(cc.Sprite)
                sprite.spriteFrame = spriteFrame
                self.node.addChild(node, 0, playerid.toString()) //https://blog.csdn.net/zhang431705/article/details/21650727
            })

            //剩余长度检查
            Global.NewplayerMap.delete(playerid) //取出即删除
            playeridsLen = Global.newPlayerIds.length

            //间隔多久消失
            // this.scheduleOnce(function(){
            //     var child = self.node.getChildByName(playerid.toString())
            //     self.node.removeChild(child)
            //  },5);
        }
    },

    checklogout: function(){
        var logoutlen = Global.DelPlayerIds.length
        var self = this;
        for(;logoutlen > 0;) {
            var playerid = Global.DelPlayerIds.pop()
            var child = self.node.getChildByName(playerid)
            if (child != null){
                self.node.removeChild(child)
            }
            logoutlen = Global.DelPlayerIds.length
        }
    },

    testcreateplayer: function(){
        if (Global.test == 1) {
            return
        }

        Global.test = 1
        var playerid = 1122
        Global.newPlayerIds.push(playerid)
        var nodex = 100.0
        var nodey = -88.0
        var playerProp = {
            sessionId: playerid,
            nodex: nodex,
            nodey: nodey
        }
        Global.NewplayerMap.set(playerid, playerProp)
        //cc.log("new player pos: ", playerid, Global.NewplayerMap.has(playerid))
        this.checkNewPlayer()
    },

    update: function (dt) {
        //cc.log("game dt: ", dt)
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        //this.testcreateplayer()
        
        //检查上线或者移动玩家小球
        this.checkNewPlayer()
        //检查下线小球
        this.checklogout()
        // if (this.timer > this.starDuration) {
        //     cc.log("game over: ", this.timer, this.starDuration)
        //     this.gameOver();
        //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
        //     return;
        // }

        this.timer += dt;
        return
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        // 播放得分音效
        //cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        //this.player.stopAllActions(); //停止 player 节点的跳跃动作
        //cc.director.loadScene('game');
    }
});

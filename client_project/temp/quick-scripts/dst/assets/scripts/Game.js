
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

var Battle = require("battle");

var Global = require("common");

var wsNet = require("wsNet");

var PlayerData = require("playerdata");

cc.Class({
  "extends": cc.Component,
  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      "default": null,
      type: cc.Node
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      "default": null,
      type: cc.Node
    },
    // score label 的引用
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    // 得分音效资源
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  getBattleObj: function getBattleObj() {
    return new Battle();
  },
  getwsNetObj: function getwsNetObj() {
    return new wsNet();
  },
  onLoad: function onLoad() {
    //this.getwsNetObj().sendwsmessage("hello")
    Global.PlayerSessionMap = new Map();
    Global.NewplayerMap = new Map();
    Global.newPlayerIds = new Array();
    Global.DelPlayerIds = new Array(); //发起战斗开始请求

    this.getBattleObj().postBattleStartMsg(); // 获取地平面的 y 轴坐标

    this.groundY = this.ground.y + this.ground.height / 2; // 初始化计时器

    this.timer = 0;
    this.starDuration = 0; // 生成一个新的星星

    this.spawnNewStar(0.0, 0.0); // 初始化计分

    this.score = 0;
  },
  spawnNewStar: function spawnNewStar(x, y) {
    //cc.log("new star pos: ", x, y)
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newStar); // 为星星设置一个随机位置

    if (x != 0.0 || y != 0.0) {
      //var maxX = this.node.width/2;
      // var newx = (x - 0.5) * 2 * maxX;
      newStar.setPosition(cc.v2(x, y));
    } else {
      newStar.setPosition(this.getNewStarPosition());
    } // 在星星组件上暂存 Game 对象的引用


    newStar.getComponent('Star').game = this; // 重置计时器，根据消失时间范围随机取一个值

    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0;
    var randY = -100; // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    //var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
    // 根据屏幕宽度，随机得到一个星星 x 坐标

    var maxX = this.node.width / 2;
    this.getBattleObj().postUpdateStarPosMsg(maxX);
    randX = (Math.random() - 0.5) * 2 * maxX;

    if (randX >= this.node.width / 2) {
      randX = this.node.width / 3;
    }

    if (randX <= 0 - this.node.width / 2) {
      randX = 0 - this.node.width / 3;
    } //服务器给的坐标，客户端随便检验看看是否一致
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
  checkNewPlayer: function checkNewPlayer() {
    var playeridsLen = Global.newPlayerIds.length;

    if (playeridsLen == 0) {
      return;
    }

    cc.log("create purple monsters.");
    var self = this;
    var url = "PurpleMonster";

    for (; playeridsLen > 0;) {
      var playerid = Global.newPlayerIds.pop(); //弹出数据

      if (Global.NewplayerMap.has(playerid) == false) {
        continue;
      }

      var data = Global.NewplayerMap.get(playerid); //节点数据坐标

      var child = self.node.getChildByName(playerid.toString());

      if (child != null) {
        self.node.removeChild(child);
      } //创建精灵
      //cc.log("new player pos: ", playerid, data.nodex, data.nodey)


      cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        cc.loader.setAutoRelease(url, true);
        var node = new cc.Node(playerid.toString());
        node.position = cc.v2(data.nodex, data.nodey);
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        self.node.addChild(node, 0, playerid.toString()); //https://blog.csdn.net/zhang431705/article/details/21650727
      }); //剩余长度检查

      Global.NewplayerMap["delete"](playerid); //取出即删除

      playeridsLen = Global.newPlayerIds.length; //间隔多久消失
      // this.scheduleOnce(function(){
      //     var child = self.node.getChildByName(playerid.toString())
      //     self.node.removeChild(child)
      //  },5);
    }
  },
  checklogout: function checklogout() {
    var logoutlen = Global.DelPlayerIds.length;
    var self = this;

    for (; logoutlen > 0;) {
      var playerid = Global.DelPlayerIds.pop();
      var child = self.node.getChildByName(playerid);

      if (child != null) {
        self.node.removeChild(child);
      }

      logoutlen = Global.DelPlayerIds.length;
    }
  },
  testcreateplayer: function testcreateplayer() {
    if (Global.test == 1) {
      return;
    }

    Global.test = 1;
    var playerid = 1122;
    Global.newPlayerIds.push(playerid);
    var nodex = 100.0;
    var nodey = -88.0;
    var playerProp = {
      sessionId: playerid,
      nodex: nodex,
      nodey: nodey
    };
    Global.NewplayerMap.set(playerid, playerProp); //cc.log("new player pos: ", playerid, Global.NewplayerMap.has(playerid))

    this.checkNewPlayer();
  },
  update: function update(dt) {
    //cc.log("game dt: ", dt)
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    //this.testcreateplayer()
    //检查上线或者移动玩家小球
    this.checkNewPlayer(); //检查下线小球

    this.checklogout(); // if (this.timer > this.starDuration) {
    //     cc.log("game over: ", this.timer, this.starDuration)
    //     this.gameOver();
    //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
    //     return;
    // }

    this.timer += dt;
    return;
  },
  gainScore: function gainScore() {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score; // 播放得分音效
    //cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {//this.player.stopAllActions(); //停止 player 节点的跳跃动作
    //cc.director.loadScene('game');
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsIlBsYXllclNlc3Npb25NYXAiLCJNYXAiLCJOZXdwbGF5ZXJNYXAiLCJuZXdQbGF5ZXJJZHMiLCJBcnJheSIsIkRlbFBsYXllcklkcyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIngiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInYyIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJjaGVja05ld1BsYXllciIsInBsYXllcmlkc0xlbiIsImxlbmd0aCIsImxvZyIsInNlbGYiLCJ1cmwiLCJwbGF5ZXJpZCIsInBvcCIsImhhcyIsImRhdGEiLCJnZXQiLCJjaGlsZCIsImdldENoaWxkQnlOYW1lIiwidG9TdHJpbmciLCJyZW1vdmVDaGlsZCIsImxvYWRlciIsImxvYWRSZXMiLCJTcHJpdGVGcmFtZSIsImVyciIsInNwcml0ZUZyYW1lIiwic2V0QXV0b1JlbGVhc2UiLCJwb3NpdGlvbiIsIm5vZGV4Iiwibm9kZXkiLCJzcHJpdGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJjaGVja2xvZ291dCIsImxvZ291dGxlbiIsInRlc3RjcmVhdGVwbGF5ZXIiLCJ0ZXN0IiwicHVzaCIsInBsYXllclByb3AiLCJzZXNzaW9uSWQiLCJzZXQiLCJ1cGRhdGUiLCJkdCIsImdhaW5TY29yZSIsInN0cmluZyIsImdhbWVPdmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlHLFVBQVUsR0FBR0gsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBRUFJLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FGSjtBQU1SO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxDQVBUO0FBUVJDLElBQUFBLGVBQWUsRUFBRSxDQVJUO0FBU1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQVZBO0FBY1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKTixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQWZBO0FBbUJSO0FBQ0FFLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkMsS0FwQk47QUF3QlI7QUFDQUMsSUFBQUEsVUFBVSxFQUFF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QWhNSTtBQWtNTG1DLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxTQUFLcEMsY0FBTCxHQVBrQixDQVFsQjs7QUFDQSxTQUFLMkIsV0FBTCxHQVRrQixDQVVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBS2hELEtBQUwsSUFBY3lELEVBQWQ7QUFDQTtBQUNILEdBck5JO0FBdU5MQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsU0FBS3ZELEtBQUwsSUFBYyxDQUFkLENBRG1CLENBRW5COztBQUNBLFNBQUtwQixZQUFMLENBQWtCNEUsTUFBbEIsR0FBMkIsWUFBWSxLQUFLeEQsS0FBNUMsQ0FIbUIsQ0FJbkI7QUFDQTtBQUNILEdBN05JO0FBK05MeUQsRUFBQUEsUUFBUSxFQUFFLG9CQUFZLENBQ2xCO0FBQ0E7QUFDSDtBQWxPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQmF0dGxlID0gcmVxdWlyZShcImJhdHRsZVwiKVxubGV0IEdsb2JhbCA9IHJlcXVpcmUoXCJjb21tb25cIilcbmxldCB3c05ldCA9IHJlcXVpcmUoXCJ3c05ldFwiKVxubGV0IFBsYXllckRhdGEgPSByZXF1aXJlKFwicGxheWVyZGF0YVwiKVxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDov5nkuKrlsZ7mgKflvJXnlKjkuobmmJ/mmJ/pooTliLbotYTmupBcbiAgICAgICAgc3RhclByZWZhYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICAvLyDmmJ/mmJ/kuqfnlJ/lkI7mtojlpLHml7bpl7TnmoTpmo/mnLrojIPlm7RcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuICAgICAgICBncm91bmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHBsYXllciDoioLngrnvvIznlKjkuo7ojrflj5bkuLvop5LlvLnot7PnmoTpq5jluqbvvIzlkozmjqfliLbkuLvop5LooYzliqjlvIDlhbNcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBzY29yZSBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgc2NvcmVEaXNwbGF5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5b6X5YiG6Z+z5pWI6LWE5rqQXG4gICAgICAgIHNjb3JlQXVkaW86IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgZ2V0QmF0dGxlT2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXR0bGUoKTtcbiAgICB9LFxuXG4gICAgZ2V0d3NOZXRPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IHdzTmV0KCk7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vdGhpcy5nZXR3c05ldE9iaigpLnNlbmR3c21lc3NhZ2UoXCJoZWxsb1wiKVxuICAgICAgICBHbG9iYWwuUGxheWVyU2Vzc2lvbk1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgR2xvYmFsLk5ld3BsYXllck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgR2xvYmFsLm5ld1BsYXllcklkcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBHbG9iYWwuRGVsUGxheWVySWRzID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgLy/lj5HotbfmiJjmlpflvIDlp4vor7fmsYJcbiAgICAgICAgdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0QmF0dGxlU3RhcnRNc2coKTtcblxuICAgICAgICAvLyDojrflj5blnLDlubPpnaLnmoQgeSDovbTlnZDmoIdcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodC8yO1xuICAgICAgICAvLyDliJ3lp4vljJborqHml7blmahcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcbiAgICAgICAgLy8g55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKDAuMCwgMC4wKTtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5YiGXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgLy9jYy5sb2coXCJuZXcgc3RhciBwb3M6IFwiLCB4LCB5KVxuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIOS4uuaYn+aYn+iuvue9ruS4gOS4qumaj+acuuS9jee9rlxuICAgICAgICBpZiAoeCAhPSAwLjAgfHwgeSAhPSAwLjAgKXtcbiAgICAgICAgICAgIC8vdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgICAgLy8gdmFyIG5ld3ggPSAoeCAtIDAuNSkgKiAyICogbWF4WDtcbiAgICAgICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24oY2MudjIoeCwgeSkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24odGhpcy5nZXROZXdTdGFyUG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOWcqOaYn+aYn+e7hOS7tuS4iuaaguWtmCBHYW1lIOWvueixoeeahOW8leeUqFxuICAgICAgICBuZXdTdGFyLmdldENvbXBvbmVudCgnU3RhcicpLmdhbWUgPSB0aGlzO1xuICAgICAgICAvLyDph43nva7orqHml7blmajvvIzmoLnmja7mtojlpLHml7bpl7TojIPlm7Tpmo/mnLrlj5bkuIDkuKrlgLxcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSB0aGlzLm1pblN0YXJEdXJhdGlvbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhTdGFyRHVyYXRpb24gLSB0aGlzLm1pblN0YXJEdXJhdGlvbik7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgIH0sXG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcbiAgICAgICAgdmFyIHJhbmRZID0gLTEwMFxuICAgICAgICAvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcbiAgICAgICAgLy92YXIgcmFuZFkgPSB0aGlzLmdyb3VuZFkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKS5qdW1wSGVpZ2h0ICsgNTA7XG4gICAgICAgIC8vIOagueaNruWxj+W5leWuveW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYnyB4IOWdkOagh1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RVcGRhdGVTdGFyUG9zTXNnKG1heFgpXG4gICAgICAgIHJhbmRYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgIGlmIChyYW5kWCA+PSB0aGlzLm5vZGUud2lkdGgvMikge1xuICAgICAgICAgICAgcmFuZFggPSB0aGlzLm5vZGUud2lkdGgvM1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhbmRYIDw9ICgwLXRoaXMubm9kZS53aWR0aC8yKSl7XG4gICAgICAgICAgICByYW5kWCA9ICgwLXRoaXMubm9kZS53aWR0aC8zKVxuICAgICAgICB9XG5cbiAgICAgICAgLy/mnI3liqHlmajnu5nnmoTlnZDmoIfvvIzlrqLmiLfnq6/pmo/kvr/mo4DpqoznnIvnnIvmmK/lkKbkuIDoh7RcbiAgICAgICAgLy8gdmFyIHJhbmROID0gdGhpcy5nZXRCYXR0bGVPYmooKS5nZXRSYW5kT25lKEdsb2JhbC5zdGFyUG9zUmFuZHNlZWQpXG4gICAgICAgIC8vIGlmIChwYXJzZUludChyYW5kTioxMDAwMCkgIT0gR2xvYmFsLnN0YXJQb3NSYW5kTikge1xuICAgICAgICAvLyAgICAgY2MubG9nKFwiaW52YWxpZCByYW5kIG51bWJlcjogXCIsIHJhbmROLCBHbG9iYWwuc3RhclBvc1JhbmROKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7IFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vY2MubG9nKFwic3RhciByYW5kWDogXCIsIHJhbmRYKVxuICAgICAgICAvL3JhbmRYID0gKHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE51bWJlcig0KSpNYXRoLnJhbmRvbSgpIC0gMi4wKSAqIG1heFg7XG4gICAgICAgIC8vIOi/lOWbnuaYn+aYn+WdkOagh1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIC8v5qOA5p+l5Yib5bu65paw5bCP55CDXG4gICAgY2hlY2tOZXdQbGF5ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuICAgICAgICBpZiAocGxheWVyaWRzTGVuID09IDAgKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZSBwdXJwbGUgbW9uc3RlcnMuXCIpXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHVybCA9IFwiUHVycGxlTW9uc3RlclwiXG4gICAgICAgIGZvciAoO3BsYXllcmlkc0xlbiA+IDA7KXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJpZCA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMucG9wKCkgLy/lvLnlh7rmlbDmja5cbiAgICAgICAgICAgIGlmIChHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEdsb2JhbC5OZXdwbGF5ZXJNYXAuZ2V0KHBsYXllcmlkKSAvL+iKgueCueaVsOaNruWdkOagh1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHBsYXllcmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+WIm+W7uueyvueBtVxuICAgICAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KVxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24oZXJyLCBzcHJpdGVGcmFtZSl7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLnNldEF1dG9SZWxlYXNlKHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52MihkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQobm9kZSwgMCwgcGxheWVyaWQudG9TdHJpbmcoKSkgLy9odHRwczovL2Jsb2cuY3Nkbi5uZXQvemhhbmc0MzE3MDUvYXJ0aWNsZS9kZXRhaWxzLzIxNjUwNzI3XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL+WJqeS9memVv+W6puajgOafpVxuICAgICAgICAgICAgR2xvYmFsLk5ld3BsYXllck1hcC5kZWxldGUocGxheWVyaWQpIC8v5Y+W5Ye65Y2z5Yig6ZmkXG4gICAgICAgICAgICBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuXG4gICAgICAgICAgICAvL+mXtOmalOWkmuS5hea2iOWksVxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC8vICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICAvLyAgfSw1KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja2xvZ291dDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yKDtsb2dvdXRsZW4gPiAwOykge1xuICAgICAgICAgICAgdmFyIHBsYXllcmlkID0gR2xvYmFsLkRlbFBsYXllcklkcy5wb3AoKVxuICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHBsYXllcmlkKVxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVzdGNyZWF0ZXBsYXllcjogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKEdsb2JhbC50ZXN0ID09IDEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgR2xvYmFsLnRlc3QgPSAxXG4gICAgICAgIHZhciBwbGF5ZXJpZCA9IDExMjJcbiAgICAgICAgR2xvYmFsLm5ld1BsYXllcklkcy5wdXNoKHBsYXllcmlkKVxuICAgICAgICB2YXIgbm9kZXggPSAxMDAuMFxuICAgICAgICB2YXIgbm9kZXkgPSAtODguMFxuICAgICAgICB2YXIgcGxheWVyUHJvcCA9IHtcbiAgICAgICAgICAgIHNlc3Npb25JZDogcGxheWVyaWQsXG4gICAgICAgICAgICBub2RleDogbm9kZXgsXG4gICAgICAgICAgICBub2RleTogbm9kZXlcbiAgICAgICAgfVxuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLnNldChwbGF5ZXJpZCwgcGxheWVyUHJvcClcbiAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkpXG4gICAgICAgIHRoaXMuY2hlY2tOZXdQbGF5ZXIoKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcImdhbWUgZHQ6IFwiLCBkdClcbiAgICAgICAgLy8g5q+P5bin5pu05paw6K6h5pe25Zmo77yM6LaF6L+H6ZmQ5bqm6L+Y5rKh5pyJ55Sf5oiQ5paw55qE5pif5pifXG4gICAgICAgIC8vIOWwseS8muiwg+eUqOa4uOaIj+Wksei0pemAu+i+kVxuICAgICAgICAvL3RoaXMudGVzdGNyZWF0ZXBsYXllcigpXG4gICAgICAgIFxuICAgICAgICAvL+ajgOafpeS4iue6v+aIluiAheenu+WKqOeOqeWutuWwj+eQg1xuICAgICAgICB0aGlzLmNoZWNrTmV3UGxheWVyKClcbiAgICAgICAgLy/mo4Dmn6XkuIvnur/lsI/nkINcbiAgICAgICAgdGhpcy5jaGVja2xvZ291dCgpXG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImdhbWUgb3ZlcjogXCIsIHRoaXMudGltZXIsIHRoaXMuc3RhckR1cmF0aW9uKVxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAvLyAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7ICAgLy8gZGlzYWJsZSBnYW1lT3ZlciBsb2dpYyB0byBhdm9pZCBsb2FkIHNjZW5lIHJlcGVhdGVkbHlcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgICAgIHJldHVyblxuICAgIH0sXG5cbiAgICBnYWluU2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgICAgICAvLyDmm7TmlrAgc2NvcmVEaXNwbGF5IExhYmVsIOeahOaWh+Wtl1xuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xuICAgICAgICAvLyDmkq3mlL7lvpfliIbpn7PmlYhcbiAgICAgICAgLy9jYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9XG59KTtcbiJdfQ==
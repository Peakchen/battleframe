
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

    var maxX = this.node.width / 2; //cc.log("star pos maxX: ", maxX)

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
    } //cc.log("create purple monsters.")


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsIlBsYXllclNlc3Npb25NYXAiLCJNYXAiLCJOZXdwbGF5ZXJNYXAiLCJuZXdQbGF5ZXJJZHMiLCJBcnJheSIsIkRlbFBsYXllcklkcyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIngiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInYyIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJjaGVja05ld1BsYXllciIsInBsYXllcmlkc0xlbiIsImxlbmd0aCIsInNlbGYiLCJ1cmwiLCJwbGF5ZXJpZCIsInBvcCIsImhhcyIsImRhdGEiLCJnZXQiLCJjaGlsZCIsImdldENoaWxkQnlOYW1lIiwidG9TdHJpbmciLCJyZW1vdmVDaGlsZCIsImxvYWRlciIsImxvYWRSZXMiLCJTcHJpdGVGcmFtZSIsImVyciIsInNwcml0ZUZyYW1lIiwic2V0QXV0b1JlbGVhc2UiLCJwb3NpdGlvbiIsIm5vZGV4Iiwibm9kZXkiLCJzcHJpdGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJjaGVja2xvZ291dCIsImxvZ291dGxlbiIsInRlc3RjcmVhdGVwbGF5ZXIiLCJ0ZXN0IiwicHVzaCIsInBsYXllclByb3AiLCJzZXNzaW9uSWQiLCJzZXQiLCJ1cGRhdGUiLCJkdCIsImdhaW5TY29yZSIsInN0cmluZyIsImdhbWVPdmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlHLFVBQVUsR0FBR0gsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBRUFJLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FGSjtBQU1SO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxDQVBUO0FBUVJDLElBQUFBLGVBQWUsRUFBRSxDQVJUO0FBU1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQVZBO0FBY1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKTixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQWZBO0FBbUJSO0FBQ0FFLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkMsS0FwQk47QUF3QlI7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBQ1Is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QUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsU0FBS25DLGNBQUwsR0FQa0IsQ0FRbEI7O0FBQ0EsU0FBSzBCLFdBQUwsR0FUa0IsQ0FVbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQUsvQyxLQUFMLElBQWN3RCxFQUFkO0FBQ0E7QUFDSCxHQXROSTtBQXdOTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUt0RCxLQUFMLElBQWMsQ0FBZCxDQURtQixDQUVuQjs7QUFDQSxTQUFLcEIsWUFBTCxDQUFrQjJFLE1BQWxCLEdBQTJCLFlBQVksS0FBS3ZELEtBQTVDLENBSG1CLENBSW5CO0FBQ0E7QUFDSCxHQTlOSTtBQWdPTHdELEVBQUFBLFFBQVEsRUFBRSxvQkFBWSxDQUNsQjtBQUNBO0FBQ0g7QUFuT0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcbmxldCBQbGF5ZXJEYXRhID0gcmVxdWlyZShcInBsYXllcmRhdGFcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g6L+Z5Liq5bGe5oCn5byV55So5LqG5pif5pif6aKE5Yi26LWE5rqQXG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2NvcmUgbGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvL3RoaXMuZ2V0d3NOZXRPYmooKS5zZW5kd3NtZXNzYWdlKFwiaGVsbG9cIilcbiAgICAgICAgR2xvYmFsLlBsYXllclNlc3Npb25NYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIEdsb2JhbC5OZXdwbGF5ZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIEdsb2JhbC5uZXdQbGF5ZXJJZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgR2xvYmFsLkRlbFBsYXllcklkcyA9IG5ldyBBcnJheSgpO1xuXG4gICAgICAgIC8v5Y+R6LW35oiY5paX5byA5aeL6K+35rGCXG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdEJhdHRsZVN0YXJ0TXNnKCk7XG5cbiAgICAgICAgLy8g6I635Y+W5Zyw5bmz6Z2i55qEIHkg6L205Z2Q5qCHXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQvMjtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIC8vIOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigwLjAsIDAuMCk7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB9LFxuXG4gICAgc3Bhd25OZXdTdGFyOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIC8vY2MubG9nKFwibmV3IHN0YXIgcG9zOiBcIiwgeCwgeSlcbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAvLyDkuLrmmJ/mmJ/orr7nva7kuIDkuKrpmo/mnLrkvY3nva5cbiAgICAgICAgaWYgKHggIT0gMC4wIHx8IHkgIT0gMC4wICl7XG4gICAgICAgICAgICAvL3ZhciBtYXhYID0gdGhpcy5ub2RlLndpZHRoLzI7XG4gICAgICAgICAgIC8vIHZhciBuZXd4ID0gKHggLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgLy8g6YeN572u6K6h5pe25Zmo77yM5qC55o2u5raI5aSx5pe26Ze06IyD5Zu06ZqP5py65Y+W5LiA5Liq5YC8XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9LFxuXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIHZhciByYW5kWSA9IC0xMDBcbiAgICAgICAgLy8g5qC55o2u5Zyw5bmz6Z2i5L2N572u5ZKM5Li76KeS6Lez6LeD6auY5bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEIHkg5Z2Q5qCHXG4gICAgICAgIC8vdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgLy9jYy5sb2coXCJzdGFyIHBvcyBtYXhYOiBcIiwgbWF4WClcbiAgICAgICAgdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0VXBkYXRlU3RhclBvc01zZyhtYXhYKVxuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICBpZiAocmFuZFggPj0gdGhpcy5ub2RlLndpZHRoLzIpIHtcbiAgICAgICAgICAgIHJhbmRYID0gdGhpcy5ub2RlLndpZHRoLzNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyYW5kWCA8PSAoMC10aGlzLm5vZGUud2lkdGgvMikpe1xuICAgICAgICAgICAgcmFuZFggPSAoMC10aGlzLm5vZGUud2lkdGgvMylcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pyN5Yqh5Zmo57uZ55qE5Z2Q5qCH77yM5a6i5oi356uv6ZqP5L6/5qOA6aqM55yL55yL5piv5ZCm5LiA6Ie0XG4gICAgICAgIC8vIHZhciByYW5kTiA9IHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE9uZShHbG9iYWwuc3RhclBvc1JhbmRzZWVkKVxuICAgICAgICAvLyBpZiAocGFyc2VJbnQocmFuZE4qMTAwMDApICE9IEdsb2JhbC5zdGFyUG9zUmFuZE4pIHtcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImludmFsaWQgcmFuZCBudW1iZXI6IFwiLCByYW5kTiwgR2xvYmFsLnN0YXJQb3NSYW5kTilcbiAgICAgICAgLy8gICAgIHJldHVybiBjYy52MihyYW5kWCwgcmFuZFkpOyBcbiAgICAgICAgLy8gfVxuICAgICAgICAvL2NjLmxvZyhcInN0YXIgcmFuZFg6IFwiLCByYW5kWClcbiAgICAgICAgLy9yYW5kWCA9ICh0aGlzLmdldEJhdHRsZU9iaigpLmdldFJhbmROdW1iZXIoNCkqTWF0aC5yYW5kb20oKSAtIDIuMCkgKiBtYXhYO1xuICAgICAgICAvLyDov5Tlm57mmJ/mmJ/lnZDmoIdcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjYy52MihyYW5kWCwgcmFuZFkpO1xuICAgIH0sXG5cbiAgICAvL+ajgOafpeWIm+W7uuaWsOWwj+eQg1xuICAgIGNoZWNrTmV3UGxheWVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcGxheWVyaWRzTGVuID0gR2xvYmFsLm5ld1BsYXllcklkcy5sZW5ndGhcbiAgICAgICAgaWYgKHBsYXllcmlkc0xlbiA9PSAwICkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvL2NjLmxvZyhcImNyZWF0ZSBwdXJwbGUgbW9uc3RlcnMuXCIpXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHVybCA9IFwiUHVycGxlTW9uc3RlclwiXG4gICAgICAgIGZvciAoO3BsYXllcmlkc0xlbiA+IDA7KXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJpZCA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMucG9wKCkgLy/lvLnlh7rmlbDmja5cbiAgICAgICAgICAgIGlmIChHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEdsb2JhbC5OZXdwbGF5ZXJNYXAuZ2V0KHBsYXllcmlkKSAvL+iKgueCueaVsOaNruWdkOagh1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHBsYXllcmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+WIm+W7uueyvueBtVxuICAgICAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KVxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24oZXJyLCBzcHJpdGVGcmFtZSl7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLnNldEF1dG9SZWxlYXNlKHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52MihkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQobm9kZSwgMCwgcGxheWVyaWQudG9TdHJpbmcoKSkgLy9odHRwczovL2Jsb2cuY3Nkbi5uZXQvemhhbmc0MzE3MDUvYXJ0aWNsZS9kZXRhaWxzLzIxNjUwNzI3XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL+WJqeS9memVv+W6puajgOafpVxuICAgICAgICAgICAgR2xvYmFsLk5ld3BsYXllck1hcC5kZWxldGUocGxheWVyaWQpIC8v5Y+W5Ye65Y2z5Yig6ZmkXG4gICAgICAgICAgICBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuXG4gICAgICAgICAgICAvL+mXtOmalOWkmuS5hea2iOWksVxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC8vICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICAvLyAgfSw1KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja2xvZ291dDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yKDtsb2dvdXRsZW4gPiAwOykge1xuICAgICAgICAgICAgdmFyIHBsYXllcmlkID0gR2xvYmFsLkRlbFBsYXllcklkcy5wb3AoKVxuICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHBsYXllcmlkKVxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVzdGNyZWF0ZXBsYXllcjogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKEdsb2JhbC50ZXN0ID09IDEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgR2xvYmFsLnRlc3QgPSAxXG4gICAgICAgIHZhciBwbGF5ZXJpZCA9IDExMjJcbiAgICAgICAgR2xvYmFsLm5ld1BsYXllcklkcy5wdXNoKHBsYXllcmlkKVxuICAgICAgICB2YXIgbm9kZXggPSAxMDAuMFxuICAgICAgICB2YXIgbm9kZXkgPSAtODguMFxuICAgICAgICB2YXIgcGxheWVyUHJvcCA9IHtcbiAgICAgICAgICAgIHNlc3Npb25JZDogcGxheWVyaWQsXG4gICAgICAgICAgICBub2RleDogbm9kZXgsXG4gICAgICAgICAgICBub2RleTogbm9kZXlcbiAgICAgICAgfVxuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLnNldChwbGF5ZXJpZCwgcGxheWVyUHJvcClcbiAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkpXG4gICAgICAgIHRoaXMuY2hlY2tOZXdQbGF5ZXIoKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcImdhbWUgZHQ6IFwiLCBkdClcbiAgICAgICAgLy8g5q+P5bin5pu05paw6K6h5pe25Zmo77yM6LaF6L+H6ZmQ5bqm6L+Y5rKh5pyJ55Sf5oiQ5paw55qE5pif5pifXG4gICAgICAgIC8vIOWwseS8muiwg+eUqOa4uOaIj+Wksei0pemAu+i+kVxuICAgICAgICAvL3RoaXMudGVzdGNyZWF0ZXBsYXllcigpXG4gICAgICAgIFxuICAgICAgICAvL+ajgOafpeS4iue6v+aIluiAheenu+WKqOeOqeWutuWwj+eQg1xuICAgICAgICB0aGlzLmNoZWNrTmV3UGxheWVyKClcbiAgICAgICAgLy/mo4Dmn6XkuIvnur/lsI/nkINcbiAgICAgICAgdGhpcy5jaGVja2xvZ291dCgpXG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImdhbWUgb3ZlcjogXCIsIHRoaXMudGltZXIsIHRoaXMuc3RhckR1cmF0aW9uKVxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAvLyAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7ICAgLy8gZGlzYWJsZSBnYW1lT3ZlciBsb2dpYyB0byBhdm9pZCBsb2FkIHNjZW5lIHJlcGVhdGVkbHlcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgICAgIHJldHVyblxuICAgIH0sXG5cbiAgICBnYWluU2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgICAgICAvLyDmm7TmlrAgc2NvcmVEaXNwbGF5IExhYmVsIOeahOaWh+Wtl1xuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xuICAgICAgICAvLyDmkq3mlL7lvpfliIbpn7PmlYhcbiAgICAgICAgLy9jYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9XG59KTtcbiJdfQ==
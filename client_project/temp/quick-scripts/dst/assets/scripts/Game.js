
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
    cc.log("star pos maxX: ", maxX);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsIlBsYXllclNlc3Npb25NYXAiLCJNYXAiLCJOZXdwbGF5ZXJNYXAiLCJuZXdQbGF5ZXJJZHMiLCJBcnJheSIsIkRlbFBsYXllcklkcyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIngiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInYyIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwibG9nIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJjaGVja05ld1BsYXllciIsInBsYXllcmlkc0xlbiIsImxlbmd0aCIsInNlbGYiLCJ1cmwiLCJwbGF5ZXJpZCIsInBvcCIsImhhcyIsImRhdGEiLCJnZXQiLCJjaGlsZCIsImdldENoaWxkQnlOYW1lIiwidG9TdHJpbmciLCJyZW1vdmVDaGlsZCIsImxvYWRlciIsImxvYWRSZXMiLCJTcHJpdGVGcmFtZSIsImVyciIsInNwcml0ZUZyYW1lIiwic2V0QXV0b1JlbGVhc2UiLCJwb3NpdGlvbiIsIm5vZGV4Iiwibm9kZXkiLCJzcHJpdGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJjaGVja2xvZ291dCIsImxvZ291dGxlbiIsInRlc3RjcmVhdGVwbGF5ZXIiLCJ0ZXN0IiwicHVzaCIsInBsYXllclByb3AiLCJzZXNzaW9uSWQiLCJzZXQiLCJ1cGRhdGUiLCJkdCIsImdhaW5TY29yZSIsInN0cmluZyIsImdhbWVPdmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlHLFVBQVUsR0FBR0gsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBRUFJLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FGSjtBQU1SO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxDQVBUO0FBUVJDLElBQUFBLGVBQWUsRUFBRSxDQVJUO0FBU1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQVZBO0FBY1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKTixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQWZBO0FBbUJSO0FBQ0FFLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVlAsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkMsS0FwQk47QUF3QlI7QUFDQUMsSUFBQUEsVUFBVSxFQUFF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QXhCLEVBQWtDMEIsVUFBbEMsRUFmd0IsQ0FnQnhCOztBQUNBLFNBQUsvQixjQUFMO0FBQ0gsR0FqTUk7QUFtTUxrQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsU0FBS25DLGNBQUwsR0FQa0IsQ0FRbEI7O0FBQ0EsU0FBSzBCLFdBQUwsR0FUa0IsQ0FVbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQUtoRCxLQUFMLElBQWN5RCxFQUFkO0FBQ0E7QUFDSCxHQXROSTtBQXdOTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUt2RCxLQUFMLElBQWMsQ0FBZCxDQURtQixDQUVuQjs7QUFDQSxTQUFLcEIsWUFBTCxDQUFrQjRFLE1BQWxCLEdBQTJCLFlBQVksS0FBS3hELEtBQTVDLENBSG1CLENBSW5CO0FBQ0E7QUFDSCxHQTlOSTtBQWdPTHlELEVBQUFBLFFBQVEsRUFBRSxvQkFBWSxDQUNsQjtBQUNBO0FBQ0g7QUFuT0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcbmxldCBQbGF5ZXJEYXRhID0gcmVxdWlyZShcInBsYXllcmRhdGFcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g6L+Z5Liq5bGe5oCn5byV55So5LqG5pif5pif6aKE5Yi26LWE5rqQXG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2NvcmUgbGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvL3RoaXMuZ2V0d3NOZXRPYmooKS5zZW5kd3NtZXNzYWdlKFwiaGVsbG9cIilcbiAgICAgICAgR2xvYmFsLlBsYXllclNlc3Npb25NYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIEdsb2JhbC5OZXdwbGF5ZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIEdsb2JhbC5uZXdQbGF5ZXJJZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgR2xvYmFsLkRlbFBsYXllcklkcyA9IG5ldyBBcnJheSgpO1xuXG4gICAgICAgIC8v5Y+R6LW35oiY5paX5byA5aeL6K+35rGCXG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdEJhdHRsZVN0YXJ0TXNnKCk7XG5cbiAgICAgICAgLy8g6I635Y+W5Zyw5bmz6Z2i55qEIHkg6L205Z2Q5qCHXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQvMjtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIC8vIOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigwLjAsIDAuMCk7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB9LFxuXG4gICAgc3Bhd25OZXdTdGFyOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIC8vY2MubG9nKFwibmV3IHN0YXIgcG9zOiBcIiwgeCwgeSlcbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAvLyDkuLrmmJ/mmJ/orr7nva7kuIDkuKrpmo/mnLrkvY3nva5cbiAgICAgICAgaWYgKHggIT0gMC4wIHx8IHkgIT0gMC4wICl7XG4gICAgICAgICAgICAvL3ZhciBtYXhYID0gdGhpcy5ub2RlLndpZHRoLzI7XG4gICAgICAgICAgIC8vIHZhciBuZXd4ID0gKHggLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgLy8g6YeN572u6K6h5pe25Zmo77yM5qC55o2u5raI5aSx5pe26Ze06IyD5Zu06ZqP5py65Y+W5LiA5Liq5YC8XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9LFxuXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIHZhciByYW5kWSA9IC0xMDBcbiAgICAgICAgLy8g5qC55o2u5Zyw5bmz6Z2i5L2N572u5ZKM5Li76KeS6Lez6LeD6auY5bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEIHkg5Z2Q5qCHXG4gICAgICAgIC8vdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgY2MubG9nKFwic3RhciBwb3MgbWF4WDogXCIsIG1heFgpXG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdFVwZGF0ZVN0YXJQb3NNc2cobWF4WClcbiAgICAgICAgcmFuZFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyICogbWF4WDtcbiAgICAgICAgaWYgKHJhbmRYID49IHRoaXMubm9kZS53aWR0aC8yKSB7XG4gICAgICAgICAgICByYW5kWCA9IHRoaXMubm9kZS53aWR0aC8zXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmFuZFggPD0gKDAtdGhpcy5ub2RlLndpZHRoLzIpKXtcbiAgICAgICAgICAgIHJhbmRYID0gKDAtdGhpcy5ub2RlLndpZHRoLzMpXG4gICAgICAgIH1cblxuICAgICAgICAvL+acjeWKoeWZqOe7meeahOWdkOagh++8jOWuouaIt+err+maj+S+v+ajgOmqjOeci+eci+aYr+WQpuS4gOiHtFxuICAgICAgICAvLyB2YXIgcmFuZE4gPSB0aGlzLmdldEJhdHRsZU9iaigpLmdldFJhbmRPbmUoR2xvYmFsLnN0YXJQb3NSYW5kc2VlZClcbiAgICAgICAgLy8gaWYgKHBhcnNlSW50KHJhbmROKjEwMDAwKSAhPSBHbG9iYWwuc3RhclBvc1JhbmROKSB7XG4gICAgICAgIC8vICAgICBjYy5sb2coXCJpbnZhbGlkIHJhbmQgbnVtYmVyOiBcIiwgcmFuZE4sIEdsb2JhbC5zdGFyUG9zUmFuZE4pXG4gICAgICAgIC8vICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTsgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9jYy5sb2coXCJzdGFyIHJhbmRYOiBcIiwgcmFuZFgpXG4gICAgICAgIC8vcmFuZFggPSAodGhpcy5nZXRCYXR0bGVPYmooKS5nZXRSYW5kTnVtYmVyKDQpKk1hdGgucmFuZG9tKCkgLSAyLjApICogbWF4WDtcbiAgICAgICAgLy8g6L+U5Zue5pif5pif5Z2Q5qCHXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTtcbiAgICB9LFxuXG4gICAgLy/mo4Dmn6XliJvlu7rmlrDlsI/nkINcbiAgICBjaGVja05ld1BsYXllcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHBsYXllcmlkc0xlbiA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIGlmIChwbGF5ZXJpZHNMZW4gPT0gMCApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY2MubG9nKFwiY3JlYXRlIHB1cnBsZSBtb25zdGVycy5cIilcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXJsID0gXCJQdXJwbGVNb25zdGVyXCJcbiAgICAgICAgZm9yICg7cGxheWVyaWRzTGVuID4gMDspe1xuICAgICAgICAgICAgdmFyIHBsYXllcmlkID0gR2xvYmFsLm5ld1BsYXllcklkcy5wb3AoKSAvL+W8ueWHuuaVsOaNrlxuICAgICAgICAgICAgaWYgKEdsb2JhbC5OZXdwbGF5ZXJNYXAuaGFzKHBsYXllcmlkKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gR2xvYmFsLk5ld3BsYXllck1hcC5nZXQocGxheWVyaWQpIC8v6IqC54K55pWw5o2u5Z2Q5qCHXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5Yib5bu657K+54G1XG4gICAgICAgICAgICAvL2NjLmxvZyhcIm5ldyBwbGF5ZXIgcG9zOiBcIiwgcGxheWVyaWQsIGRhdGEubm9kZXgsIGRhdGEubm9kZXkpXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbihlcnIsIHNwcml0ZUZyYW1lKXtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2UodXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKHBsYXllcmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLnYyKGRhdGEubm9kZXgsIGRhdGEubm9kZXkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChub2RlLCAwLCBwbGF5ZXJpZC50b1N0cmluZygpKSAvL2h0dHBzOi8vYmxvZy5jc2RuLm5ldC96aGFuZzQzMTcwNS9hcnRpY2xlL2RldGFpbHMvMjE2NTA3MjdcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8v5Ymp5L2Z6ZW/5bqm5qOA5p+lXG4gICAgICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLmRlbGV0ZShwbGF5ZXJpZCkgLy/lj5blh7rljbPliKDpmaRcbiAgICAgICAgICAgIHBsYXllcmlkc0xlbiA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMubGVuZ3RoXG5cbiAgICAgICAgICAgIC8v6Ze06ZqU5aSa5LmF5raI5aSxXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIHZhciBjaGlsZCA9IHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgLy8gICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIC8vICB9LDUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbG9nb3V0bGVuID0gR2xvYmFsLkRlbFBsYXllcklkcy5sZW5ndGhcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IoO2xvZ291dGxlbiA+IDA7KSB7XG4gICAgICAgICAgICB2YXIgcGxheWVyaWQgPSBHbG9iYWwuRGVsUGxheWVySWRzLnBvcCgpXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQpXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nb3V0bGVuID0gR2xvYmFsLkRlbFBsYXllcklkcy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZXN0Y3JlYXRlcGxheWVyOiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoR2xvYmFsLnRlc3QgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBHbG9iYWwudGVzdCA9IDFcbiAgICAgICAgdmFyIHBsYXllcmlkID0gMTEyMlxuICAgICAgICBHbG9iYWwubmV3UGxheWVySWRzLnB1c2gocGxheWVyaWQpXG4gICAgICAgIHZhciBub2RleCA9IDEwMC4wXG4gICAgICAgIHZhciBub2RleSA9IC04OC4wXG4gICAgICAgIHZhciBwbGF5ZXJQcm9wID0ge1xuICAgICAgICAgICAgc2Vzc2lvbklkOiBwbGF5ZXJpZCxcbiAgICAgICAgICAgIG5vZGV4OiBub2RleCxcbiAgICAgICAgICAgIG5vZGV5OiBub2RleVxuICAgICAgICB9XG4gICAgICAgIEdsb2JhbC5OZXdwbGF5ZXJNYXAuc2V0KHBsYXllcmlkLCBwbGF5ZXJQcm9wKVxuICAgICAgICAvL2NjLmxvZyhcIm5ldyBwbGF5ZXIgcG9zOiBcIiwgcGxheWVyaWQsIEdsb2JhbC5OZXdwbGF5ZXJNYXAuaGFzKHBsYXllcmlkKSlcbiAgICAgICAgdGhpcy5jaGVja05ld1BsYXllcigpXG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vY2MubG9nKFwiZ2FtZSBkdDogXCIsIGR0KVxuICAgICAgICAvLyDmr4/luKfmm7TmlrDorqHml7blmajvvIzotoXov4fpmZDluqbov5jmsqHmnInnlJ/miJDmlrDnmoTmmJ/mmJ9cbiAgICAgICAgLy8g5bCx5Lya6LCD55So5ri45oiP5aSx6LSl6YC76L6RXG4gICAgICAgIC8vdGhpcy50ZXN0Y3JlYXRlcGxheWVyKClcbiAgICAgICAgXG4gICAgICAgIC8v5qOA5p+l5LiK57q/5oiW6ICF56e75Yqo546p5a625bCP55CDXG4gICAgICAgIHRoaXMuY2hlY2tOZXdQbGF5ZXIoKVxuICAgICAgICAvL+ajgOafpeS4i+e6v+Wwj+eQg1xuICAgICAgICB0aGlzLmNoZWNrbG9nb3V0KClcbiAgICAgICAgLy8gaWYgKHRoaXMudGltZXIgPiB0aGlzLnN0YXJEdXJhdGlvbikge1xuICAgICAgICAvLyAgICAgY2MubG9nKFwiZ2FtZSBvdmVyOiBcIiwgdGhpcy50aW1lciwgdGhpcy5zdGFyRHVyYXRpb24pXG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgIC8vICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTsgICAvLyBkaXNhYmxlIGdhbWVPdmVyIGxvZ2ljIHRvIGF2b2lkIGxvYWQgc2NlbmUgcmVwZWF0ZWRseVxuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgcmV0dXJuXG4gICAgfSxcblxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIC8vIOabtOaWsCBzY29yZURpc3BsYXkgTGFiZWwg55qE5paH5a2XXG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XG4gICAgICAgIC8vIOaSreaUvuW+l+WIhumfs+aViFxuICAgICAgICAvL2NjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZUF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vdGhpcy5wbGF5ZXIuc3RvcEFsbEFjdGlvbnMoKTsgLy/lgZzmraIgcGxheWVyIOiKgueCueeahOi3s+i3g+WKqOS9nFxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgIH1cbn0pO1xuIl19

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
    cc.log("game on load init..."); //this.getwsNetObj().sendwsmessage("hello")

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
    var needCreate = false;

    for (; playeridsLen > 0;) {
      var playerid = Global.newPlayerIds.pop(); //弹出数据

      if (Global.NewplayerMap.has(playerid) == false) {
        cc.log("NewplayerMap not find, playerid: ", playerid);
        break;
      }

      var data = Global.NewplayerMap.get(playerid); //节点数据坐标

      var child = self.node.getChildByName(playerid.toString());

      if (child != null) {
        if (child.x != data.nodex || data.nodey != child.y) {
          //位置相同就不用频繁刷新了
          self.node.removeChild(child);
          needCreate = true;
        }
      } else {
        needCreate = true;
      }

      if (needCreate) {
        //创建精灵
        //cc.log("new player pos: ", playerid, data.nodex, data.nodey)
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
          cc.loader.setAutoRelease(url, true);
          var node = new cc.Node(playerid.toString());
          node.position = cc.v2(data.nodex, data.nodey);
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = spriteFrame;
          self.node.addChild(node, 0, playerid.toString()); //https://blog.csdn.net/zhang431705/article/details/21650727
        });
        needCreate = false;
      } //剩余长度检查


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
      cc.log("checklogout...");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsImxvZyIsIlBsYXllclNlc3Npb25NYXAiLCJNYXAiLCJOZXdwbGF5ZXJNYXAiLCJuZXdQbGF5ZXJJZHMiLCJBcnJheSIsIkRlbFBsYXllcklkcyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIngiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInYyIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJjaGVja05ld1BsYXllciIsInBsYXllcmlkc0xlbiIsImxlbmd0aCIsInNlbGYiLCJ1cmwiLCJuZWVkQ3JlYXRlIiwicGxheWVyaWQiLCJwb3AiLCJoYXMiLCJkYXRhIiwiZ2V0IiwiY2hpbGQiLCJnZXRDaGlsZEJ5TmFtZSIsInRvU3RyaW5nIiwibm9kZXgiLCJub2RleSIsInJlbW92ZUNoaWxkIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJzZXRBdXRvUmVsZWFzZSIsInBvc2l0aW9uIiwic3ByaXRlIiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwiY2hlY2tsb2dvdXQiLCJsb2dvdXRsZW4iLCJ0ZXN0Y3JlYXRlcGxheWVyIiwidGVzdCIsInB1c2giLCJwbGF5ZXJQcm9wIiwic2Vzc2lvbklkIiwic2V0IiwidXBkYXRlIiwiZHQiLCJnYWluU2NvcmUiLCJzdHJpbmciLCJnYW1lT3ZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRyxVQUFVLEdBQUdILE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUVBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBRko7QUFNUjtBQUNBQyxJQUFBQSxlQUFlLEVBQUUsQ0FQVDtBQVFSQyxJQUFBQSxlQUFlLEVBQUUsQ0FSVDtBQVNSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSkosTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNVO0FBRkwsS0FWQTtBQWNSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNVO0FBRkwsS0FmQTtBQW1CUjtBQUNBRSxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDYTtBQUZDLEtBcEJOO0FBd0JSO0FBQ0FDLElB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OztBQUVEcEYsSUFBQUEsTUFBTSxDQUFDb0YsSUFBUCxHQUFjLENBQWQ7QUFDQSxRQUFJeEIsUUFBUSxHQUFHLElBQWY7QUFDQTVELElBQUFBLE1BQU0sQ0FBQzBCLFlBQVAsQ0FBb0IyRCxJQUFwQixDQUF5QnpCLFFBQXpCO0FBQ0EsUUFBSVEsS0FBSyxHQUFHLEtBQVo7QUFDQSxRQUFJQyxLQUFLLEdBQUcsQ0FBQyxJQUFiO0FBQ0EsUUFBSWlCLFVBQVUsR0FBRztBQUNiQyxNQUFBQSxTQUFTLEVBQUUzQixRQURFO0FBRWJRLE1BQUFBLEtBQUssRUFBRUEsS0FGTTtBQUdiQyxNQUFBQSxLQUFLLEVBQUVBO0FBSE0sS0FBakI7QUFLQXJFLElBQUFBLE1BQU0sQ0FBQ3lCLFlBQVAsQ0FBb0IrRCxHQUFwQixDQUF3QjVCLFFBQXhCLEVBQWtDMEIsVUFBbEMsRUFmd0IsQ0FnQnhCOztBQUNBLFNBQUtoQyxjQUFMO0FBQ0gsR0E3TUk7QUErTUxtQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsU0FBS3BDLGNBQUwsR0FQa0IsQ0FRbEI7O0FBQ0EsU0FBSzJCLFdBQUwsR0FUa0IsQ0FVbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQUtoRCxLQUFMLElBQWN5RCxFQUFkO0FBQ0E7QUFDSCxHQWxPSTtBQW9PTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUt2RCxLQUFMLElBQWMsQ0FBZCxDQURtQixDQUVuQjs7QUFDQSxTQUFLckIsWUFBTCxDQUFrQjZFLE1BQWxCLEdBQTJCLFlBQVksS0FBS3hELEtBQTVDLENBSG1CLENBSW5CO0FBQ0E7QUFDSCxHQTFPSTtBQTRPTHlELEVBQUFBLFFBQVEsRUFBRSxvQkFBWSxDQUNsQjtBQUNBO0FBQ0g7QUEvT0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcbmxldCBQbGF5ZXJEYXRhID0gcmVxdWlyZShcInBsYXllcmRhdGFcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g6L+Z5Liq5bGe5oCn5byV55So5LqG5pif5pif6aKE5Yi26LWE5rqQXG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2NvcmUgbGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nKFwiZ2FtZSBvbiBsb2FkIGluaXQuLi5cIilcbiAgICAgICAgLy90aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShcImhlbGxvXCIpXG4gICAgICAgIEdsb2JhbC5QbGF5ZXJTZXNzaW9uTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBHbG9iYWwubmV3UGxheWVySWRzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIEdsb2JhbC5EZWxQbGF5ZXJJZHMgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICAvL+WPkei1t+aImOaWl+W8gOWni+ivt+axglxuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RCYXR0bGVTdGFydE1zZygpO1xuXG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0LzI7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeaXtuWZqFxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSAwO1xuICAgICAgICAvLyDnlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5zcGF3bk5ld1N0YXIoMC4wLCAwLjApO1xuICAgICAgICAvLyDliJ3lp4vljJborqHliIZcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgfSxcblxuICAgIHNwYXduTmV3U3RhcjogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAvL2NjLmxvZyhcIm5ldyBzdGFyIHBvczogXCIsIHgsIHkpXG4gICAgICAgIC8vIOS9v+eUqOe7meWumueahOaooeadv+WcqOWcuuaZr+S4reeUn+aIkOS4gOS4quaWsOiKgueCuVxuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy8g5Li65pif5pif6K6+572u5LiA5Liq6ZqP5py65L2N572uXG4gICAgICAgIGlmICh4ICE9IDAuMCB8fCB5ICE9IDAuMCApe1xuICAgICAgICAgICAgLy92YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICAgICAvLyB2YXIgbmV3eCA9ICh4IC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbihjYy52Mih4LCB5KSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g5Zyo5pif5pif57uE5Lu25LiK5pqC5a2YIEdhbWUg5a+56LGh55qE5byV55SoXG4gICAgICAgIG5ld1N0YXIuZ2V0Q29tcG9uZW50KCdTdGFyJykuZ2FtZSA9IHRoaXM7XG4gICAgICAgIC8vIOmHjee9ruiuoeaXtuWZqO+8jOagueaNrua2iOWkseaXtumXtOiMg+WbtOmaj+acuuWPluS4gOS4quWAvFxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IHRoaXMubWluU3RhckR1cmF0aW9uICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFN0YXJEdXJhdGlvbiAtIHRoaXMubWluU3RhckR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgfSxcblxuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZFggPSAwO1xuICAgICAgICB2YXIgcmFuZFkgPSAtMTAwXG4gICAgICAgIC8vIOagueaNruWcsOW5s+mdouS9jee9ruWSjOS4u+inkui3s+i3g+mrmOW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYn+eahCB5IOWdkOagh1xuICAgICAgICAvL3ZhciByYW5kWSA9IHRoaXMuZ3JvdW5kWSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci5nZXRDb21wb25lbnQoJ1BsYXllcicpLmp1bXBIZWlnaHQgKyA1MDtcbiAgICAgICAgLy8g5qC55o2u5bGP5bmV5a695bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pifIHgg5Z2Q5qCHXG4gICAgICAgIHZhciBtYXhYID0gdGhpcy5ub2RlLndpZHRoLzI7XG4gICAgICAgIC8vY2MubG9nKFwic3RhciBwb3MgbWF4WDogXCIsIG1heFgpXG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdFVwZGF0ZVN0YXJQb3NNc2cobWF4WClcbiAgICAgICAgcmFuZFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyICogbWF4WDtcbiAgICAgICAgaWYgKHJhbmRYID49IHRoaXMubm9kZS53aWR0aC8yKSB7XG4gICAgICAgICAgICByYW5kWCA9IHRoaXMubm9kZS53aWR0aC8zXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmFuZFggPD0gKDAtdGhpcy5ub2RlLndpZHRoLzIpKXtcbiAgICAgICAgICAgIHJhbmRYID0gKDAtdGhpcy5ub2RlLndpZHRoLzMpXG4gICAgICAgIH1cblxuICAgICAgICAvL+acjeWKoeWZqOe7meeahOWdkOagh++8jOWuouaIt+err+maj+S+v+ajgOmqjOeci+eci+aYr+WQpuS4gOiHtFxuICAgICAgICAvLyB2YXIgcmFuZE4gPSB0aGlzLmdldEJhdHRsZU9iaigpLmdldFJhbmRPbmUoR2xvYmFsLnN0YXJQb3NSYW5kc2VlZClcbiAgICAgICAgLy8gaWYgKHBhcnNlSW50KHJhbmROKjEwMDAwKSAhPSBHbG9iYWwuc3RhclBvc1JhbmROKSB7XG4gICAgICAgIC8vICAgICBjYy5sb2coXCJpbnZhbGlkIHJhbmQgbnVtYmVyOiBcIiwgcmFuZE4sIEdsb2JhbC5zdGFyUG9zUmFuZE4pXG4gICAgICAgIC8vICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTsgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9jYy5sb2coXCJzdGFyIHJhbmRYOiBcIiwgcmFuZFgpXG4gICAgICAgIC8vcmFuZFggPSAodGhpcy5nZXRCYXR0bGVPYmooKS5nZXRSYW5kTnVtYmVyKDQpKk1hdGgucmFuZG9tKCkgLSAyLjApICogbWF4WDtcbiAgICAgICAgLy8g6L+U5Zue5pif5pif5Z2Q5qCHXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTtcbiAgICB9LFxuXG4gICAgLy/mo4Dmn6XliJvlu7rmlrDlsI/nkINcbiAgICBjaGVja05ld1BsYXllcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHBsYXllcmlkc0xlbiA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIGlmIChwbGF5ZXJpZHNMZW4gPT0gMCApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy9jYy5sb2coXCJjcmVhdGUgcHVycGxlIG1vbnN0ZXJzLlwiKVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cmwgPSBcIlB1cnBsZU1vbnN0ZXJcIlxuICAgICAgICB2YXIgbmVlZENyZWF0ZSA9IGZhbHNlXG4gICAgICAgIGZvciAoO3BsYXllcmlkc0xlbiA+IDA7KXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJpZCA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMucG9wKCkgLy/lvLnlh7rmlbDmja5cbiAgICAgICAgICAgIGlmIChHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJOZXdwbGF5ZXJNYXAgbm90IGZpbmQsIHBsYXllcmlkOiBcIiwgcGxheWVyaWQpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGEgPSBHbG9iYWwuTmV3cGxheWVyTWFwLmdldChwbGF5ZXJpZCkgLy/oioLngrnmlbDmja7lnZDmoIdcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC54ICE9IGRhdGEubm9kZXggfHwgZGF0YS5ub2RleSAhPSBjaGlsZC55KSB7ICAgLy/kvY3nva7nm7jlkIzlsLHkuI3nlKjpopHnuYHliLfmlrDkuoZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBuZWVkQ3JlYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5lZWRDcmVhdGUgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZWVkQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgLy/liJvlu7rnsr7ngbVcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhcIm5ldyBwbGF5ZXIgcG9zOiBcIiwgcGxheWVyaWQsIGRhdGEubm9kZXgsIGRhdGEubm9kZXkpXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24oZXJyLCBzcHJpdGVGcmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5zZXRBdXRvUmVsZWFzZSh1cmwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKHBsYXllcmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52MihkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKVxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQobm9kZSwgMCwgcGxheWVyaWQudG9TdHJpbmcoKSkgLy9odHRwczovL2Jsb2cuY3Nkbi5uZXQvemhhbmc0MzE3MDUvYXJ0aWNsZS9kZXRhaWxzLzIxNjUwNzI3XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIG5lZWRDcmVhdGUgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIC8v5Ymp5L2Z6ZW/5bqm5qOA5p+lXG4gICAgICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLmRlbGV0ZShwbGF5ZXJpZCkgLy/lj5blh7rljbPliKDpmaRcbiAgICAgICAgICAgIHBsYXllcmlkc0xlbiA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMubGVuZ3RoXG5cbiAgICAgICAgICAgIC8v6Ze06ZqU5aSa5LmF5raI5aSxXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIHZhciBjaGlsZCA9IHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgLy8gICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIC8vICB9LDUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbG9nb3V0bGVuID0gR2xvYmFsLkRlbFBsYXllcklkcy5sZW5ndGhcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IoO2xvZ291dGxlbiA+IDA7KSB7XG4gICAgICAgICAgICBjYy5sb2coXCJjaGVja2xvZ291dC4uLlwiKVxuICAgICAgICAgICAgdmFyIHBsYXllcmlkID0gR2xvYmFsLkRlbFBsYXllcklkcy5wb3AoKVxuICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHBsYXllcmlkKVxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVzdGNyZWF0ZXBsYXllcjogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKEdsb2JhbC50ZXN0ID09IDEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgR2xvYmFsLnRlc3QgPSAxXG4gICAgICAgIHZhciBwbGF5ZXJpZCA9IDExMjJcbiAgICAgICAgR2xvYmFsLm5ld1BsYXllcklkcy5wdXNoKHBsYXllcmlkKVxuICAgICAgICB2YXIgbm9kZXggPSAxMDAuMFxuICAgICAgICB2YXIgbm9kZXkgPSAtODguMFxuICAgICAgICB2YXIgcGxheWVyUHJvcCA9IHtcbiAgICAgICAgICAgIHNlc3Npb25JZDogcGxheWVyaWQsXG4gICAgICAgICAgICBub2RleDogbm9kZXgsXG4gICAgICAgICAgICBub2RleTogbm9kZXlcbiAgICAgICAgfVxuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLnNldChwbGF5ZXJpZCwgcGxheWVyUHJvcClcbiAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCkpXG4gICAgICAgIHRoaXMuY2hlY2tOZXdQbGF5ZXIoKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcImdhbWUgZHQ6IFwiLCBkdClcbiAgICAgICAgLy8g5q+P5bin5pu05paw6K6h5pe25Zmo77yM6LaF6L+H6ZmQ5bqm6L+Y5rKh5pyJ55Sf5oiQ5paw55qE5pif5pifXG4gICAgICAgIC8vIOWwseS8muiwg+eUqOa4uOaIj+Wksei0pemAu+i+kVxuICAgICAgICAvL3RoaXMudGVzdGNyZWF0ZXBsYXllcigpXG4gICAgICAgIFxuICAgICAgICAvL+ajgOafpeS4iue6v+aIluiAheenu+WKqOeOqeWutuWwj+eQg1xuICAgICAgICB0aGlzLmNoZWNrTmV3UGxheWVyKClcbiAgICAgICAgLy/mo4Dmn6XkuIvnur/lsI/nkINcbiAgICAgICAgdGhpcy5jaGVja2xvZ291dCgpXG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImdhbWUgb3ZlcjogXCIsIHRoaXMudGltZXIsIHRoaXMuc3RhckR1cmF0aW9uKVxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAvLyAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7ICAgLy8gZGlzYWJsZSBnYW1lT3ZlciBsb2dpYyB0byBhdm9pZCBsb2FkIHNjZW5lIHJlcGVhdGVkbHlcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgICAgIHJldHVyblxuICAgIH0sXG5cbiAgICBnYWluU2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgICAgICAvLyDmm7TmlrAgc2NvcmVEaXNwbGF5IExhYmVsIOeahOaWh+Wtl1xuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xuICAgICAgICAvLyDmkq3mlL7lvpfliIbpn7PmlYhcbiAgICAgICAgLy9jYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9XG59KTtcbiJdfQ==
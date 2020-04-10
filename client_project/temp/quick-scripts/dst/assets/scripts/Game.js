
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
    //发起战斗开始请求

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsImxvZyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIngiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsInYyIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJjaGVja05ld1BsYXllciIsInBsYXllcmlkc0xlbiIsIm5ld1BsYXllcklkcyIsImxlbmd0aCIsInNlbGYiLCJ1cmwiLCJuZWVkQ3JlYXRlIiwicGxheWVyaWQiLCJwb3AiLCJOZXdwbGF5ZXJNYXAiLCJoYXMiLCJkYXRhIiwiZ2V0IiwiY2hpbGQiLCJnZXRDaGlsZEJ5TmFtZSIsInRvU3RyaW5nIiwibm9kZXgiLCJub2RleSIsInJlbW92ZUNoaWxkIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJzZXRBdXRvUmVsZWFzZSIsInBvc2l0aW9uIiwic3ByaXRlIiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwiY2hlY2tsb2dvdXQiLCJsb2dvdXRsZW4iLCJEZWxQbGF5ZXJJZHMiLCJ0ZXN0Y3JlYXRlcGxheWVyIiwidGVzdCIsInB1c2giLCJwbGF5ZXJQcm9wIiwic2Vzc2lvbklkIiwic2V0IiwidXBkYXRlIiwiZHQiLCJnYWluU2NvcmUiLCJzdHJpbmciLCJnYW1lT3ZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRyxVQUFVLEdBQUdILE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUVBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBRko7QUFNUjtBQUNBQyxJQUFBQSxlQUFlLEVBQUUsQ0FQVDtBQVFSQyxJQUFBQSxlQUFlLEVBQUUsQ0FSVDtBQVNSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSkosTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNVO0FBRkwsS0FWQTtBQWNSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNVO0FBRkwsS0FmQTtBQW1CUjtBQUNBRSxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDYTtBQUZDLEtBcEJOO0FBd0JSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFF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QyxNQUFBQSxLQUFLLEVBQUVBO0FBSE0sS0FBakI7QUFLQWpFLElBQUFBLE1BQU0sQ0FBQ3lELFlBQVAsQ0FBb0I0QixHQUFwQixDQUF3QjlCLFFBQXhCLEVBQWtDNEIsVUFBbEMsRUFmd0IsQ0FnQnhCOztBQUNBLFNBQUtuQyxjQUFMO0FBQ0gsR0ExTUk7QUE0TUxzQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsU0FBS3ZDLGNBQUwsR0FQa0IsQ0FRbEI7O0FBQ0EsU0FBSzZCLFdBQUwsR0FUa0IsQ0FVbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQUtsRCxLQUFMLElBQWM0RCxFQUFkO0FBQ0E7QUFDSCxHQS9OSTtBQWlPTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUsxRCxLQUFMLElBQWMsQ0FBZCxDQURtQixDQUVuQjs7QUFDQSxTQUFLZixZQUFMLENBQWtCMEUsTUFBbEIsR0FBMkIsWUFBWSxLQUFLM0QsS0FBNUMsQ0FIbUIsQ0FJbkI7QUFDQTtBQUNILEdBdk9JO0FBeU9MNEQsRUFBQUEsUUFBUSxFQUFFLG9CQUFZLENBQ2xCO0FBQ0E7QUFDSDtBQTVPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmxldCBCYXR0bGUgPSByZXF1aXJlKFwiYmF0dGxlXCIpXG5sZXQgR2xvYmFsID0gcmVxdWlyZShcImNvbW1vblwiKVxubGV0IHdzTmV0ID0gcmVxdWlyZShcIndzTmV0XCIpXG5sZXQgUGxheWVyRGF0YSA9IHJlcXVpcmUoXCJwbGF5ZXJkYXRhXCIpXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOaYn+aYn+S6p+eUn+WQjua2iOWkseaXtumXtOeahOmaj+acuuiMg+WbtFxuICAgICAgICBtYXhTdGFyRHVyYXRpb246IDAsXG4gICAgICAgIG1pblN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgLy8g5Zyw6Z2i6IqC54K577yM55So5LqO56Gu5a6a5pif5pif55Sf5oiQ55qE6auY5bqmXG4gICAgICAgIGdyb3VuZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gcGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNjb3JlIGxhYmVsIOeahOW8leeUqFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvLyDlvpfliIbpn7PmlYjotYTmupBcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBnZXRCYXR0bGVPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJhdHRsZSgpO1xuICAgIH0sXG5cbiAgICBnZXR3c05ldE9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmxvZyhcImdhbWUgb24gbG9hZCBpbml0Li4uXCIpXG5cbiAgICAgICAgLy90aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShcImhlbGxvXCIpXG4gICAgICAgIC8v5Y+R6LW35oiY5paX5byA5aeL6K+35rGCXG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdEJhdHRsZVN0YXJ0TXNnKCk7XG5cbiAgICAgICAgLy8g6I635Y+W5Zyw5bmz6Z2i55qEIHkg6L205Z2Q5qCHXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQvMjtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIC8vIOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigwLjAsIDAuMCk7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgIFxuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgLy9jYy5sb2coXCJuZXcgc3RhciBwb3M6IFwiLCB4LCB5KVxuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIOS4uuaYn+aYn+iuvue9ruS4gOS4qumaj+acuuS9jee9rlxuICAgICAgICBpZiAoeCAhPSAwLjAgfHwgeSAhPSAwLjAgKXtcbiAgICAgICAgICAgIC8vdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgICAgLy8gdmFyIG5ld3ggPSAoeCAtIDAuNSkgKiAyICogbWF4WDtcbiAgICAgICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24oY2MudjIoeCwgeSkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24odGhpcy5nZXROZXdTdGFyUG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOWcqOaYn+aYn+e7hOS7tuS4iuaaguWtmCBHYW1lIOWvueixoeeahOW8leeUqFxuICAgICAgICBuZXdTdGFyLmdldENvbXBvbmVudCgnU3RhcicpLmdhbWUgPSB0aGlzO1xuICAgICAgICAvLyDph43nva7orqHml7blmajvvIzmoLnmja7mtojlpLHml7bpl7TojIPlm7Tpmo/mnLrlj5bkuIDkuKrlgLxcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSB0aGlzLm1pblN0YXJEdXJhdGlvbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhTdGFyRHVyYXRpb24gLSB0aGlzLm1pblN0YXJEdXJhdGlvbik7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgIH0sXG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcbiAgICAgICAgdmFyIHJhbmRZID0gLTEwMFxuICAgICAgICAvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcbiAgICAgICAgLy92YXIgcmFuZFkgPSB0aGlzLmdyb3VuZFkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKS5qdW1wSGVpZ2h0ICsgNTA7XG4gICAgICAgIC8vIOagueaNruWxj+W5leWuveW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYnyB4IOWdkOagh1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICAvL2NjLmxvZyhcInN0YXIgcG9zIG1heFg6IFwiLCBtYXhYKVxuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RVcGRhdGVTdGFyUG9zTXNnKG1heFgpXG4gICAgICAgIHJhbmRYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgIGlmIChyYW5kWCA+PSB0aGlzLm5vZGUud2lkdGgvMikge1xuICAgICAgICAgICAgcmFuZFggPSB0aGlzLm5vZGUud2lkdGgvM1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhbmRYIDw9ICgwLXRoaXMubm9kZS53aWR0aC8yKSl7XG4gICAgICAgICAgICByYW5kWCA9ICgwLXRoaXMubm9kZS53aWR0aC8zKVxuICAgICAgICB9XG5cbiAgICAgICAgLy/mnI3liqHlmajnu5nnmoTlnZDmoIfvvIzlrqLmiLfnq6/pmo/kvr/mo4DpqoznnIvnnIvmmK/lkKbkuIDoh7RcbiAgICAgICAgLy8gdmFyIHJhbmROID0gdGhpcy5nZXRCYXR0bGVPYmooKS5nZXRSYW5kT25lKEdsb2JhbC5zdGFyUG9zUmFuZHNlZWQpXG4gICAgICAgIC8vIGlmIChwYXJzZUludChyYW5kTioxMDAwMCkgIT0gR2xvYmFsLnN0YXJQb3NSYW5kTikge1xuICAgICAgICAvLyAgICAgY2MubG9nKFwiaW52YWxpZCByYW5kIG51bWJlcjogXCIsIHJhbmROLCBHbG9iYWwuc3RhclBvc1JhbmROKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7IFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vY2MubG9nKFwic3RhciByYW5kWDogXCIsIHJhbmRYKVxuICAgICAgICAvL3JhbmRYID0gKHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE51bWJlcig0KSpNYXRoLnJhbmRvbSgpIC0gMi4wKSAqIG1heFg7XG4gICAgICAgIC8vIOi/lOWbnuaYn+aYn+WdkOagh1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIC8v5qOA5p+l5Yib5bu65paw5bCP55CDXG4gICAgY2hlY2tOZXdQbGF5ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuICAgICAgICBpZiAocGxheWVyaWRzTGVuID09IDAgKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2MubG9nKFwiY3JlYXRlIHB1cnBsZSBtb25zdGVycy5cIilcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXJsID0gXCJQdXJwbGVNb25zdGVyXCJcbiAgICAgICAgdmFyIG5lZWRDcmVhdGUgPSBmYWxzZVxuICAgICAgICBmb3IgKDtwbGF5ZXJpZHNMZW4gPiAwOyl7XG4gICAgICAgICAgICB2YXIgcGxheWVyaWQgPSBHbG9iYWwubmV3UGxheWVySWRzLnBvcCgpIC8v5by55Ye65pWw5o2uXG4gICAgICAgICAgICBpZiAoR2xvYmFsLk5ld3BsYXllck1hcC5oYXMocGxheWVyaWQpID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwiTmV3cGxheWVyTWFwIG5vdCBmaW5kLCBwbGF5ZXJpZDogXCIsIHBsYXllcmlkKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gR2xvYmFsLk5ld3BsYXllck1hcC5nZXQocGxheWVyaWQpIC8v6IqC54K55pWw5o2u5Z2Q5qCHXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQueCAhPSBkYXRhLm5vZGV4IHx8IGRhdGEubm9kZXkgIT0gY2hpbGQueSkgeyAgIC8v5L2N572u55u45ZCM5bCx5LiN55So6aKR57mB5Yi35paw5LqGXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgbmVlZENyZWF0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBuZWVkQ3JlYXRlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmVlZENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIC8v5Yib5bu657K+54G1XG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KVxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uKGVyciwgc3ByaXRlRnJhbWUpe1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2UodXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjIoZGF0YS5ub2RleCwgZGF0YS5ub2RleSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKG5vZGUsIDAsIHBsYXllcmlkLnRvU3RyaW5nKCkpIC8vaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW5nNDMxNzA1L2FydGljbGUvZGV0YWlscy8yMTY1MDcyN1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBuZWVkQ3JlYXRlID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICAvL+WJqeS9memVv+W6puajgOafpVxuICAgICAgICAgICAgR2xvYmFsLk5ld3BsYXllck1hcC5kZWxldGUocGxheWVyaWQpIC8v5Y+W5Ye65Y2z5Yig6ZmkXG4gICAgICAgICAgICBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuXG4gICAgICAgICAgICAvL+mXtOmalOWkmuS5hea2iOWksVxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC8vICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICAvLyAgfSw1KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja2xvZ291dDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxvZ291dGxlbiA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMubGVuZ3RoXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yKDtsb2dvdXRsZW4gPiAwOykge1xuICAgICAgICAgICAgY2MubG9nKFwiY2hlY2tsb2dvdXQuLi5cIilcbiAgICAgICAgICAgIHZhciBwbGF5ZXJpZCA9IEdsb2JhbC5EZWxQbGF5ZXJJZHMucG9wKClcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShwbGF5ZXJpZClcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dvdXRsZW4gPSBHbG9iYWwuRGVsUGxheWVySWRzLmxlbmd0aFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRlc3RjcmVhdGVwbGF5ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChHbG9iYWwudGVzdCA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIEdsb2JhbC50ZXN0ID0gMVxuICAgICAgICB2YXIgcGxheWVyaWQgPSAxMTIyXG4gICAgICAgIEdsb2JhbC5uZXdQbGF5ZXJJZHMucHVzaChwbGF5ZXJpZClcbiAgICAgICAgdmFyIG5vZGV4ID0gMTAwLjBcbiAgICAgICAgdmFyIG5vZGV5ID0gLTg4LjBcbiAgICAgICAgdmFyIHBsYXllclByb3AgPSB7XG4gICAgICAgICAgICBzZXNzaW9uSWQ6IHBsYXllcmlkLFxuICAgICAgICAgICAgbm9kZXg6IG5vZGV4LFxuICAgICAgICAgICAgbm9kZXk6IG5vZGV5XG4gICAgICAgIH1cbiAgICAgICAgR2xvYmFsLk5ld3BsYXllck1hcC5zZXQocGxheWVyaWQsIHBsYXllclByb3ApXG4gICAgICAgIC8vY2MubG9nKFwibmV3IHBsYXllciBwb3M6IFwiLCBwbGF5ZXJpZCwgR2xvYmFsLk5ld3BsYXllck1hcC5oYXMocGxheWVyaWQpKVxuICAgICAgICB0aGlzLmNoZWNrTmV3UGxheWVyKClcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgLy9jYy5sb2coXCJnYW1lIGR0OiBcIiwgZHQpXG4gICAgICAgIC8vIOavj+W4p+abtOaWsOiuoeaXtuWZqO+8jOi2hei/h+mZkOW6pui/mOayoeacieeUn+aIkOaWsOeahOaYn+aYn1xuICAgICAgICAvLyDlsLHkvJrosIPnlKjmuLjmiI/lpLHotKXpgLvovpFcbiAgICAgICAgLy90aGlzLnRlc3RjcmVhdGVwbGF5ZXIoKVxuICAgICAgICBcbiAgICAgICAgLy/mo4Dmn6XkuIrnur/miJbogIXnp7vliqjnjqnlrrblsI/nkINcbiAgICAgICAgdGhpcy5jaGVja05ld1BsYXllcigpXG4gICAgICAgIC8v5qOA5p+l5LiL57q/5bCP55CDXG4gICAgICAgIHRoaXMuY2hlY2tsb2dvdXQoKVxuICAgICAgICAvLyBpZiAodGhpcy50aW1lciA+IHRoaXMuc3RhckR1cmF0aW9uKSB7XG4gICAgICAgIC8vICAgICBjYy5sb2coXCJnYW1lIG92ZXI6IFwiLCB0aGlzLnRpbWVyLCB0aGlzLnN0YXJEdXJhdGlvbilcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlOyAgIC8vIGRpc2FibGUgZ2FtZU92ZXIgbG9naWMgdG8gYXZvaWQgbG9hZCBzY2VuZSByZXBlYXRlZGx5XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cblxuICAgICAgICB0aGlzLnRpbWVyICs9IGR0O1xuICAgICAgICByZXR1cm5cbiAgICB9LFxuXG4gICAgZ2FpblNjb3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTtcbiAgICAgICAgLy8g5pu05pawIHNjb3JlRGlzcGxheSBMYWJlbCDnmoTmloflrZdcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZTtcbiAgICAgICAgLy8g5pKt5pS+5b6X5YiG6Z+z5pWIXG4gICAgICAgIC8vY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy90aGlzLnBsYXllci5zdG9wQWxsQWN0aW9ucygpOyAvL+WBnOatoiBwbGF5ZXIg6IqC54K555qE6Lez6LeD5Yqo5L2cXG4gICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgfVxufSk7XG4iXX0=
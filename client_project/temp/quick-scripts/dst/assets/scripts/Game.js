
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

    this.spawnNewStar(); // 初始化计分

    this.score = 0;
  },
  spawnNewStar: function spawnNewStar() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newStar); // 为星星设置一个随机位置

    newStar.setPosition(this.getNewStarPosition()); // 在星星组件上暂存 Game 对象的引用

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
    randX = (Math.random() - 0.5) * 2 * maxX; //服务器给的坐标，客户端随便检验看看是否一致
    // var randN = this.getBattleObj().getRandOne(Global.starPosRandseed)
    // if (parseInt(randN*10000) != Global.starPosRandN) {
    //     cc.log("invalid rand number: ", randN, Global.starPosRandN)
    //     return cc.v2(randX, randY); 
    // }

    randX = (Math.random() - 0.5) * 2 * maxX; //cc.log("star randX: ", randX)
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

      var data = Global.NewplayerMap.get(playerid); //节点数据坐标

      var child = self.node.getChildByName(playerid.toString());

      if (child != null) {
        self.node.removeChild(child);
      } //创建精灵


      cc.log("new player pos: ", playerid, Global.NewplayerMap.has(playerid), data.nodex, data.nodey);
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

    cc.audioEngine.playEffect(this.scoreAudio, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwid3NOZXQiLCJQbGF5ZXJEYXRhIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsIm9uTG9hZCIsIlBsYXllclNlc3Npb25NYXAiLCJNYXAiLCJOZXdwbGF5ZXJNYXAiLCJuZXdQbGF5ZXJJZHMiLCJBcnJheSIsIkRlbFBsYXllcklkcyIsInBvc3RCYXR0bGVTdGFydE1zZyIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIm5ld1N0YXIiLCJpbnN0YW50aWF0ZSIsIm5vZGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwibWF4WCIsIndpZHRoIiwicG9zdFVwZGF0ZVN0YXJQb3NNc2ciLCJ2MiIsImNoZWNrTmV3UGxheWVyIiwicGxheWVyaWRzTGVuIiwibGVuZ3RoIiwibG9nIiwic2VsZiIsInVybCIsInBsYXllcmlkIiwicG9wIiwiZGF0YSIsImdldCIsImNoaWxkIiwiZ2V0Q2hpbGRCeU5hbWUiLCJ0b1N0cmluZyIsInJlbW92ZUNoaWxkIiwiaGFzIiwibm9kZXgiLCJub2RleSIsImxvYWRlciIsImxvYWRSZXMiLCJTcHJpdGVGcmFtZSIsImVyciIsInNwcml0ZUZyYW1lIiwic2V0QXV0b1JlbGVhc2UiLCJwb3NpdGlvbiIsInNwcml0ZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsImNoZWNrbG9nb3V0IiwibG9nb3V0bGVuIiwidGVzdGNyZWF0ZXBsYXllciIsInRlc3QiLCJwdXNoIiwicGxheWVyUHJvcCIsInNlc3Npb25JZCIsInNldCIsInVwZGF0ZSIsImR0IiwiZ2FpblNjb3JlIiwic3RyaW5nIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0IiwiZ2FtZU92ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLEtBQUssR0FBR0YsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUcsVUFBVSxHQUFHSCxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFFQUksRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRCxLQUZKO0FBTVI7QUFDQUMsSUFBQUEsZUFBZSxFQUFFLENBUFQ7QUFRUkMsSUFBQUEsZUFBZSxFQUFFLENBUlQ7QUFTUjtBQUNBQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpKLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZMLEtBVkE7QUFjUjtBQUNBQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpOLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZMLEtBZkE7QUFtQlI7QUFDQUUsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWUCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ2E7QUFGQyxLQXBCTjtBQXdCUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJULE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDZTtBQUZEO0FBekJKLEdBSFA7QUFrQ0xDLEVBQUFBLFlBQVksRUFBRSx3QkFBVztBQUNyQixXQUFPLElBQUlyQixNQUFKLEVBQVA7QUFDSCxHQXBDSTtBQXNDTHNCLEVBQUFBLFdBQVcsRUFBRSx1QkFBVztBQUNwQixXQUFPLElBQUluQixLQUFKLEVBQVA7QUFDSCxHQXhDSTtBQTBDTG9CLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUVoQjtBQUNBckIsSUFBQUEsTUFBTSxDQUFDc0IsZ0JBQVAsR0FBMEIsSUFBSUMsR0FBSixFQUExQjtBQUNBdkIsSUFBQUEsTUFBTSxDQUFDd0IsWUFBUCxHQUFzQixJQUFJRCxHQUFKLEVBQXRCO0FBQ0F2QixJQUFBQSxNQUFNLENBQUN5QixZQUFQLEdBQXNCLElBQUlDLEtBQUosRUFBdEI7QUFDQTFCLElBQUFBLE1BQU0sQ0FBQzJCLFlBQVAsR0FBc0IsSUFBSUQsS0FBSixFQUF0QixDQU5nQixDQVFoQjs7QUFDQSxTQUFLUCxZQUFMLEdBQW9CUyxrQkFBcEIsR0FUZ0IsQ0FXaEI7O0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQUtqQixNQUFMLENBQVlrQixDQUFaLEdBQWdCLEtBQUtsQixNQUFMLENBQVltQixNQUFaLEdBQW1CLENBQWxELENBWmdCLENBYWhCOztBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixDQUFwQixDQWZnQixDQWdCaEI7O0FBQ0EsU0FBS0MsWUFBTCxHQWpCZ0IsQ0FrQmhCOztBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0gsR0E5REk7QUFnRUxELEVBQUFBLFlBQVksRUFBRSx3QkFBVztBQUNyQjtBQUNBLFFBQUlFLE9BQU8sR0FBR2pDLEVBQUUsQ0FBQ2tDLFdBQUgsQ0FBZSxLQUFLOUIsVUFBcEIsQ0FBZCxDQUZxQixDQUdyQjs7QUFDQSxTQUFLK0IsSUFBTCxDQUFVQyxRQUFWLENBQW1CSCxPQUFuQixFQUpxQixDQUtyQjs7QUFDQUEsSUFBQUEsT0FBTyxDQUFDSSxXQUFSLENBQW9CLEtBQUtDLGtCQUFMLEVBQXBCLEVBTnFCLENBT3JCOztBQUNBTCxJQUFBQSxPQUFPLENBQUNNLFlBQVIsQ0FBcUIsTUFBckIsRUFBNkJDLElBQTdCLEdBQW9DLElBQXBDLENBUnFCLENBU3JCOztBQUNBLFNBQUtWLFlBQUwsR0FBb0IsS0FBS3RCLGVBQUwsR0FBdUJpQyxJQUFJLENBQUNDLE1BQUwsTUFBaUIsS0FBS25DLGVBQUwsR0FBdUIsS0FBS0MsZUFBN0MsQ0FBM0M7QUFDQSxTQUFLcUIsS0FBTCxHQUFhLENBQWI7QUFDSCxHQTVFSTtBQThFTFMsRUFBQUEsa0JBQWtCLEVBQUUsOEJBQVk7QUFDNUIsUUFBSUssS0FBSyxHQUFHLENBQVo7QUFDQSxRQUFJQyxLQUFLLEdBQUcsQ0FBQyxHQUFiLENBRjRCLENBRzVCO0FBQ0E7QUFDQTs7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS1YsSUFBTCxDQUFVVyxLQUFWLEdBQWdCLENBQTNCO0FBQ0EsU0FBSzlCLFlBQUwsR0FBb0IrQixvQkFBcEIsQ0FBeUNGLElBQXpDO0FBQ0FGLElBQUFBLEtBQUssR0FBRyxDQUFDRixJQUFJLENBQUNDLE1BQUwsS0FBZ0IsR0FBakIsSUFBd0IsQ0FBeEIsR0FBNEJHLElBQXBDLENBUjRCLENBVTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUYsSUFBQUEsS0FBSyxHQUFHLENBQUNGLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixHQUFqQixJQUF3QixDQUF4QixHQUE0QkcsSUFBcEMsQ0FqQjRCLENBa0I1QjtBQUNBO0FBQ0E7O0FBRUEsV0FBTzdDLEVBQUUsQ0FBQ2dELEVBQUgsQ0FBTUwsS0FBTixFQUFhQyxLQUFiLENBQVA7QUFDSCxHQXJHSTtBQXVHTDtBQUNBSyxFQUFBQSxjQUFjLEVBQUUsMEJBQVU7QUFDdEIsUUFBSUMsWUFBWSxHQUFHckQsTUFBTSxDQUFDeUIsWUFBUCxDQUFvQjZCLE1BQXZDOztBQUNBLFFBQUlELFlBQVksSUFBSSxDQUFwQixFQUF3QjtBQUNwQjtBQUNIOztBQUVEbEQsSUFBQUEsRUFBRSxDQUFDb0QsR0FBSCxDQUFPLHlCQUFQO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQSxRQUFJQyxHQUFHLEdBQUcsZUFBVjs7QUFDQSxXQUFNSixZQUFZLEdBQUcsQ0FBckIsR0FBd0I7QUFDcEIsVUFBSUssUUFBUSxHQUFHMUQsTUFBTSxDQUFDeUIsWUFBUCxDQUFvQmtDLEdBQXBCLEVBQWYsQ0FEb0IsQ0FDcUI7O0FBQ3pDLFVBQUlDLElBQUksR0FBRzVELE1BQU0sQ0FBQ3dCLFlBQVAsQ0FBb0JxQyxHQUFwQixDQUF3QkgsUUFBeEIsQ0FBWCxDQUZvQixDQUV5Qjs7QUFDN0MsVUFBSUksS0FBSyxHQUFHTixJQUFJLENBQUNsQixJQUFMLENBQVV5QixjQUFWLENBQXlCTCxRQUFRLENBQUNNLFFBQVQsRUFBekIsQ0FBWjs7QUFDQSxVQUFJRixLQUFLLElBQUksSUFBYixFQUFrQjtBQUNkTixRQUFBQSxJQUFJLENBQUNsQixJQUFMLENBQVUyQixXQUFWLENBQXNCSCxLQUF0QjtBQUNILE9BTm1CLENBUXBCOzs7QUFDQTNELE1BQUFBLEVBQUUsQ0FBQ29ELEdBQUgsQ0FBTyxrQkFBUCxFQUEyQkcsUUFBM0IsRUFBcUMxRCxNQUFNLENBQUN3QixZQUFQLENBQW9CMEMsR0FBcEIsQ0FBd0JSLFFBQXhCLENBQXJDLEVBQXdFRSxJQUFJLENBQUNPLEtBQTdFLEVBQW9GUCxJQUFJLENBQUNRLEtBQXpGO0FBQ0FqRSxNQUFBQSxFQUFFLENBQUNrRSxNQUFILENBQVVDLE9BQVYsQ0FBa0JiLEdBQWxCLEVBQXVCdEQsRUFBRSxDQUFDb0UsV0FBMUIsRUFBdUMsVUFBU0MsR0FBVCxFQUFjQyxXQUFkLEVBQTBCO0FBQzdEdEUsUUFBQUEsRUFBRSxDQUFDa0UsTUFBSCxDQUFVSyxjQUFWLENBQXlCakIsR0FBekIsRUFBOEIsSUFBOUI7QUFDQSxZQUFJbkIsSUFBSSxHQUFHLElBQUluQyxFQUFFLENBQUNVLElBQVAsQ0FBWTZDLFFBQVEsQ0FBQ00sUUFBVCxFQUFaLENBQVg7QUFDQTFCLFFBQUFBLElBQUksQ0FBQ3FDLFFBQUwsR0FBZ0J4RSxFQUFFLENBQUNnRCxFQUFILENBQU1TLElBQUksQ0FBQ08sS0FBWCxFQUFrQlAsSUFBSSxDQUFDUSxLQUF2QixDQUFoQjtBQUNBLFlBQU1RLE1BQU0sR0FBR3RDLElBQUksQ0FBQ3VDLFlBQUwsQ0FBa0IxRSxFQUFFLENBQUMyRSxNQUFyQixDQUFmO0FBQ0FGLFFBQUFBLE1BQU0sQ0FBQ0gsV0FBUCxHQUFxQkEsV0FBckI7QUFDQWpCLFFBQUFBLElBQUksQ0FBQ2xCLElBQUwsQ0FBVUMsUUFBVixDQUFtQkQsSUFBbkIsRUFBeUIsQ0FBekIsRUFBNEJvQixRQUFRLENBQUNNLFFBQVQsRUFBNUIsRUFONkQsQ0FNWjtBQUNwRCxPQVBELEVBVm9CLENBbUJwQjs7QUFDQWhFLE1BQUFBLE1BQU0sQ0FBQ3dCLFlBQVAsV0FBMkJrQyxRQUEzQixFQXBCb0IsQ0FvQmlCOztBQUNyQ0wsTUFBQUEsWUFBWSxHQUFHckQsTUFBTSxDQUFDeUIsWUFBUCxDQUFvQjZCLE1BQW5DLENBckJvQixDQXVCcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0osR0E5SUk7QUFnSkx5QixFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDbkIsUUFBSUMsU0FBUyxHQUFHaEYsTUFBTSxDQUFDMkIsWUFBUCxDQUFvQjJCLE1BQXBDO0FBQ0EsUUFBSUUsSUFBSSxHQUFHLElBQVg7O0FBQ0EsV0FBS3dCLFNBQVMsR0FBRyxDQUFqQixHQUFxQjtBQUNqQixVQUFJdEIsUUFBUSxHQUFHMUQsTUFBTSxDQUFDMkIsWUFBUCxDQUFvQmdDLEdBQXBCLEVBQWY7QUFDQSxVQUFJRyxLQUFLLEdBQUdOLElBQUksQ0FBQ2xCLElBQUwsQ0FBVXlCLGNBQVYsQ0FBeUJMLFFBQXpCLENBQVo7O0FBQ0EsVUFBSUksS0FBSyxJQUFJLElBQWIsRUFBa0I7QUFDZE4sUUFBQUEsSUFBSSxDQUFDbEIsSUFBTCxDQUFVMkIsV0FBVixDQUFzQkgsS0FBdEI7QUFDSDs7QUFDRGtCLE1BQUFBLFNBQVMsR0FBR2hGLE1BQU0sQ0FBQzJCLFlBQVAsQ0FBb0IyQixNQUFoQztBQUNIO0FBQ0osR0EzSkk7QUE2SkwyQixFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBVTtBQUN4QixRQUFJakYsTUFBTSxDQUFDa0YsSUFBUCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCO0FBQ0g7O0FBRURsRixJQUFBQSxNQUFNLENBQUNrRixJQUFQLEdBQWMsQ0FBZDtBQUNBLFFBQUl4QixRQUFRLEdBQUcsSUFBZjtBQUNBMUQsSUFBQUEsTUFBTSxDQUFDeUIsWUFBUCxDQUFvQjBELElBQXBCLENBQXlCekIsUUFBekI7QUFDQSxRQUFJUyxLQUFLLEdBQUcsS0FBWjtBQUNBLFFBQUlDLEtBQUssR0FBRyxDQUFDLElBQWI7QUFDQSxRQUFJZ0IsVUFBVSxHQUFHO0FBQ2JDLE1BQUFBLFNBQVMsRUFBRTNCLFFBREU7QUFFYlMsTUFBQUEsS0FBSyxFQUFFQSxLQUZNO0FBR2JDLE1BQUFBLEtBQUssRUFBRUE7QUFITSxLQUFqQjtBQUtBcEUsSUFBQUEsTUFBTSxDQUFDd0IsWUFBUCxDQUFvQjhELEdBQXBCLENBQXdCNUIsUUFBeEIsRUFBa0MwQixVQUFsQyxFQWZ3QixDQWdCeEI7O0FBQ0EsU0FBS2hDLGNBQUw7QUFDSCxHQS9LSTtBQWlMTG1DLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxTQUFLcEMsY0FBTCxHQVBrQixDQVFsQjs7QUFDQSxTQUFLMkIsV0FBTCxHQVRrQixDQVVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBSy9DLEtBQUwsSUFBY3dELEVBQWQ7QUFDQTtBQUNILEdBcE1JO0FBc01MQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsU0FBS3RELEtBQUwsSUFBYyxDQUFkLENBRG1CLENBRW5COztBQUNBLFNBQUtwQixZQUFMLENBQWtCMkUsTUFBbEIsR0FBMkIsWUFBWSxLQUFLdkQsS0FBNUMsQ0FIbUIsQ0FJbkI7O0FBQ0FoQyxJQUFBQSxFQUFFLENBQUN3RixXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBSzNFLFVBQS9CLEVBQTJDLEtBQTNDO0FBQ0gsR0E1TUk7QUE4TUw0RSxFQUFBQSxRQUFRLEVBQUUsb0JBQVksQ0FDbEI7QUFDQTtBQUNIO0FBak5JLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBCYXR0bGUgPSByZXF1aXJlKFwiYmF0dGxlXCIpXG5sZXQgR2xvYmFsID0gcmVxdWlyZShcImNvbW1vblwiKVxubGV0IHdzTmV0ID0gcmVxdWlyZShcIndzTmV0XCIpXG5sZXQgUGxheWVyRGF0YSA9IHJlcXVpcmUoXCJwbGF5ZXJkYXRhXCIpXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOaYn+aYn+S6p+eUn+WQjua2iOWkseaXtumXtOeahOmaj+acuuiMg+WbtFxuICAgICAgICBtYXhTdGFyRHVyYXRpb246IDAsXG4gICAgICAgIG1pblN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgLy8g5Zyw6Z2i6IqC54K577yM55So5LqO56Gu5a6a5pif5pif55Sf5oiQ55qE6auY5bqmXG4gICAgICAgIGdyb3VuZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gcGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNjb3JlIGxhYmVsIOeahOW8leeUqFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvLyDlvpfliIbpn7PmlYjotYTmupBcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBnZXRCYXR0bGVPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJhdHRsZSgpO1xuICAgIH0sXG5cbiAgICBnZXR3c05ldE9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy90aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShcImhlbGxvXCIpXG4gICAgICAgIEdsb2JhbC5QbGF5ZXJTZXNzaW9uTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBHbG9iYWwubmV3UGxheWVySWRzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIEdsb2JhbC5EZWxQbGF5ZXJJZHMgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICAvL+WPkei1t+aImOaWl+W8gOWni+ivt+axglxuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RCYXR0bGVTdGFydE1zZygpO1xuXG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0LzI7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeaXtuWZqFxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSAwO1xuICAgICAgICAvLyDnlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5zcGF3bk5ld1N0YXIoKTtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5YiGXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIOS4uuaYn+aYn+iuvue9ruS4gOS4qumaj+acuuS9jee9rlxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICAvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgLy8g6YeN572u6K6h5pe25Zmo77yM5qC55o2u5raI5aSx5pe26Ze06IyD5Zu06ZqP5py65Y+W5LiA5Liq5YC8XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9LFxuXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIHZhciByYW5kWSA9IC0xMDBcbiAgICAgICAgLy8g5qC55o2u5Zyw5bmz6Z2i5L2N572u5ZKM5Li76KeS6Lez6LeD6auY5bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEIHkg5Z2Q5qCHXG4gICAgICAgIC8vdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0VXBkYXRlU3RhclBvc01zZyhtYXhYKVxuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuXG4gICAgICAgIC8v5pyN5Yqh5Zmo57uZ55qE5Z2Q5qCH77yM5a6i5oi356uv6ZqP5L6/5qOA6aqM55yL55yL5piv5ZCm5LiA6Ie0XG4gICAgICAgIC8vIHZhciByYW5kTiA9IHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE9uZShHbG9iYWwuc3RhclBvc1JhbmRzZWVkKVxuICAgICAgICAvLyBpZiAocGFyc2VJbnQocmFuZE4qMTAwMDApICE9IEdsb2JhbC5zdGFyUG9zUmFuZE4pIHtcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImludmFsaWQgcmFuZCBudW1iZXI6IFwiLCByYW5kTiwgR2xvYmFsLnN0YXJQb3NSYW5kTilcbiAgICAgICAgLy8gICAgIHJldHVybiBjYy52MihyYW5kWCwgcmFuZFkpOyBcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJhbmRYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgIC8vY2MubG9nKFwic3RhciByYW5kWDogXCIsIHJhbmRYKVxuICAgICAgICAvL3JhbmRYID0gKHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE51bWJlcig0KSpNYXRoLnJhbmRvbSgpIC0gMi4wKSAqIG1heFg7XG4gICAgICAgIC8vIOi/lOWbnuaYn+aYn+WdkOagh1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIC8v5qOA5p+l5Yib5bu65paw5bCP55CDXG4gICAgY2hlY2tOZXdQbGF5ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwbGF5ZXJpZHNMZW4gPSBHbG9iYWwubmV3UGxheWVySWRzLmxlbmd0aFxuICAgICAgICBpZiAocGxheWVyaWRzTGVuID09IDAgKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZSBwdXJwbGUgbW9uc3RlcnMuXCIpXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHVybCA9IFwiUHVycGxlTW9uc3RlclwiXG4gICAgICAgIGZvciAoO3BsYXllcmlkc0xlbiA+IDA7KXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJpZCA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMucG9wKCkgLy/lvLnlh7rmlbDmja5cbiAgICAgICAgICAgIHZhciBkYXRhID0gR2xvYmFsLk5ld3BsYXllck1hcC5nZXQocGxheWVyaWQpIC8v6IqC54K55pWw5o2u5Z2Q5qCHXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5Yib5bu657K+54G1XG4gICAgICAgICAgICBjYy5sb2coXCJuZXcgcGxheWVyIHBvczogXCIsIHBsYXllcmlkLCBHbG9iYWwuTmV3cGxheWVyTWFwLmhhcyhwbGF5ZXJpZCksIGRhdGEubm9kZXgsIGRhdGEubm9kZXkpXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbihlcnIsIHNwcml0ZUZyYW1lKXtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2UodXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKHBsYXllcmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLnYyKGRhdGEubm9kZXgsIGRhdGEubm9kZXkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChub2RlLCAwLCBwbGF5ZXJpZC50b1N0cmluZygpKSAvL2h0dHBzOi8vYmxvZy5jc2RuLm5ldC96aGFuZzQzMTcwNS9hcnRpY2xlL2RldGFpbHMvMjE2NTA3MjdcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8v5Ymp5L2Z6ZW/5bqm5qOA5p+lXG4gICAgICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwLmRlbGV0ZShwbGF5ZXJpZCkgLy/lj5blh7rljbPliKDpmaRcbiAgICAgICAgICAgIHBsYXllcmlkc0xlbiA9IEdsb2JhbC5uZXdQbGF5ZXJJZHMubGVuZ3RoXG5cbiAgICAgICAgICAgIC8v6Ze06ZqU5aSa5LmF5raI5aSxXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIHZhciBjaGlsZCA9IHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShwbGF5ZXJpZC50b1N0cmluZygpKVxuICAgICAgICAgICAgLy8gICAgIHNlbGYubm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgIC8vICB9LDUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbG9nb3V0bGVuID0gR2xvYmFsLkRlbFBsYXllcklkcy5sZW5ndGhcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IoO2xvZ291dGxlbiA+IDA7KSB7XG4gICAgICAgICAgICB2YXIgcGxheWVyaWQgPSBHbG9iYWwuRGVsUGxheWVySWRzLnBvcCgpXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUocGxheWVyaWQpXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nb3V0bGVuID0gR2xvYmFsLkRlbFBsYXllcklkcy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZXN0Y3JlYXRlcGxheWVyOiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoR2xvYmFsLnRlc3QgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBHbG9iYWwudGVzdCA9IDFcbiAgICAgICAgdmFyIHBsYXllcmlkID0gMTEyMlxuICAgICAgICBHbG9iYWwubmV3UGxheWVySWRzLnB1c2gocGxheWVyaWQpXG4gICAgICAgIHZhciBub2RleCA9IDEwMC4wXG4gICAgICAgIHZhciBub2RleSA9IC04OC4wXG4gICAgICAgIHZhciBwbGF5ZXJQcm9wID0ge1xuICAgICAgICAgICAgc2Vzc2lvbklkOiBwbGF5ZXJpZCxcbiAgICAgICAgICAgIG5vZGV4OiBub2RleCxcbiAgICAgICAgICAgIG5vZGV5OiBub2RleVxuICAgICAgICB9XG4gICAgICAgIEdsb2JhbC5OZXdwbGF5ZXJNYXAuc2V0KHBsYXllcmlkLCBwbGF5ZXJQcm9wKVxuICAgICAgICAvL2NjLmxvZyhcIm5ldyBwbGF5ZXIgcG9zOiBcIiwgcGxheWVyaWQsIEdsb2JhbC5OZXdwbGF5ZXJNYXAuaGFzKHBsYXllcmlkKSlcbiAgICAgICAgdGhpcy5jaGVja05ld1BsYXllcigpXG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vY2MubG9nKFwiZ2FtZSBkdDogXCIsIGR0KVxuICAgICAgICAvLyDmr4/luKfmm7TmlrDorqHml7blmajvvIzotoXov4fpmZDluqbov5jmsqHmnInnlJ/miJDmlrDnmoTmmJ/mmJ9cbiAgICAgICAgLy8g5bCx5Lya6LCD55So5ri45oiP5aSx6LSl6YC76L6RXG4gICAgICAgIC8vdGhpcy50ZXN0Y3JlYXRlcGxheWVyKClcbiAgICAgICAgXG4gICAgICAgIC8v5qOA5p+l5LiK57q/5oiW6ICF56e75Yqo546p5a625bCP55CDXG4gICAgICAgIHRoaXMuY2hlY2tOZXdQbGF5ZXIoKVxuICAgICAgICAvL+ajgOafpeS4i+e6v+Wwj+eQg1xuICAgICAgICB0aGlzLmNoZWNrbG9nb3V0KClcbiAgICAgICAgLy8gaWYgKHRoaXMudGltZXIgPiB0aGlzLnN0YXJEdXJhdGlvbikge1xuICAgICAgICAvLyAgICAgY2MubG9nKFwiZ2FtZSBvdmVyOiBcIiwgdGhpcy50aW1lciwgdGhpcy5zdGFyRHVyYXRpb24pXG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgIC8vICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTsgICAvLyBkaXNhYmxlIGdhbWVPdmVyIGxvZ2ljIHRvIGF2b2lkIGxvYWQgc2NlbmUgcmVwZWF0ZWRseVxuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgcmV0dXJuXG4gICAgfSxcblxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIC8vIOabtOaWsCBzY29yZURpc3BsYXkgTGFiZWwg55qE5paH5a2XXG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XG4gICAgICAgIC8vIOaSreaUvuW+l+WIhumfs+aViFxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9XG59KTtcbiJdfQ==
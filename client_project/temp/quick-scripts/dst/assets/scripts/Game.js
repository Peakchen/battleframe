
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
  onLoad: function onLoad() {
    //发起战斗开始请求
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
    this.getBattleObj().postUpdateStarPosMsg(maxX); //randX = (Math.random() - 0.5) * 2 * maxX;

    var randN = this.getBattleObj().getRandOne(Global.starPosRandseed);

    if (parseInt(randN * 10000) != Global.starPosRandN) {
      cc.log("invalid rand number: ", randN, Global.starPosRandN);
      return cc.v2(randX, randY);
    }

    randX = (randN - 0.5) * 2 * maxX;
    cc.log("star randX: ", randN, randX); //randX = (this.getBattleObj().getRandNumber(4)*Math.random() - 2.0) * maxX;
    // 返回星星坐标

    return cc.v2(randX, randY);
  },
  update: function update(dt) {
    //cc.log("game dt: ", dt)
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      cc.log("game over: ", this.timer, this.starDuration);
      this.gameOver();
      this.enabled = false; // disable gameOver logic to avoid load scene repeatedly

      return;
    }

    this.timer += dt;
    return;
  },
  gainScore: function gainScore() {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score; // 播放得分音效

    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {
    this.player.stopAllActions(); //停止 player 节点的跳跃动作

    cc.director.loadScene('game');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiR2xvYmFsIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJnZXRCYXR0bGVPYmoiLCJvbkxvYWQiLCJwb3N0QmF0dGxlU3RhcnRNc2ciLCJncm91bmRZIiwieSIsImhlaWdodCIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwic3Bhd25OZXdTdGFyIiwic2NvcmUiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsImdldE5ld1N0YXJQb3NpdGlvbiIsImdldENvbXBvbmVudCIsImdhbWUiLCJNYXRoIiwicmFuZG9tIiwicmFuZFgiLCJyYW5kWSIsIm1heFgiLCJ3aWR0aCIsInBvc3RVcGRhdGVTdGFyUG9zTXNnIiwicmFuZE4iLCJnZXRSYW5kT25lIiwic3RhclBvc1JhbmRzZWVkIiwicGFyc2VJbnQiLCJzdGFyUG9zUmFuZE4iLCJsb2ciLCJ2MiIsInVwZGF0ZSIsImR0IiwiZ2FtZU92ZXIiLCJlbmFibGVkIiwiZ2FpblNjb3JlIiwic3RyaW5nIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0Iiwic3RvcEFsbEFjdGlvbnMiLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFB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QUEsRUFBRSxDQUFDeUQsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0g7QUF0SEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDov5nkuKrlsZ7mgKflvJXnlKjkuobmmJ/mmJ/pooTliLbotYTmupBcbiAgICAgICAgc3RhclByZWZhYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICAvLyDmmJ/mmJ/kuqfnlJ/lkI7mtojlpLHml7bpl7TnmoTpmo/mnLrojIPlm7RcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuICAgICAgICBncm91bmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHBsYXllciDoioLngrnvvIznlKjkuo7ojrflj5bkuLvop5LlvLnot7PnmoTpq5jluqbvvIzlkozmjqfliLbkuLvop5LooYzliqjlvIDlhbNcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBzY29yZSBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgc2NvcmVEaXNwbGF5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5b6X5YiG6Z+z5pWI6LWE5rqQXG4gICAgICAgIHNjb3JlQXVkaW86IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgZ2V0QmF0dGxlT2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXR0bGUoKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICAvL+WPkei1t+aImOaWl+W8gOWni+ivt+axglxuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RCYXR0bGVTdGFydE1zZygpO1xuXG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0LzI7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeaXtuWZqFxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSAwO1xuICAgICAgICAvLyDnlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5zcGF3bk5ld1N0YXIoKTtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5YiGXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIOS4uuaYn+aYn+iuvue9ruS4gOS4qumaj+acuuS9jee9rlxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICAvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgLy8g6YeN572u6K6h5pe25Zmo77yM5qC55o2u5raI5aSx5pe26Ze06IyD5Zu06ZqP5py65Y+W5LiA5Liq5YC8XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9LFxuXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIHZhciByYW5kWSA9IC0xMDBcbiAgICAgICAgLy8g5qC55o2u5Zyw5bmz6Z2i5L2N572u5ZKM5Li76KeS6Lez6LeD6auY5bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEIHkg5Z2Q5qCHXG4gICAgICAgIC8vdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0VXBkYXRlU3RhclBvc01zZyhtYXhYKVxuICAgICAgICAvL3JhbmRYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIG1heFg7XG4gICAgICAgIHZhciByYW5kTiA9IHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE9uZShHbG9iYWwuc3RhclBvc1JhbmRzZWVkKVxuICAgICAgICBpZiAocGFyc2VJbnQocmFuZE4qMTAwMDApICE9IEdsb2JhbC5zdGFyUG9zUmFuZE4pIHtcbiAgICAgICAgICAgIGNjLmxvZyhcImludmFsaWQgcmFuZCBudW1iZXI6IFwiLCByYW5kTiwgR2xvYmFsLnN0YXJQb3NSYW5kTilcbiAgICAgICAgICAgIHJldHVybiBjYy52MihyYW5kWCwgcmFuZFkpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHJhbmRYID0gKHJhbmROIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICBjYy5sb2coXCJzdGFyIHJhbmRYOiBcIiwgcmFuZE4sIHJhbmRYKVxuICAgICAgICAvL3JhbmRYID0gKHRoaXMuZ2V0QmF0dGxlT2JqKCkuZ2V0UmFuZE51bWJlcig0KSpNYXRoLnJhbmRvbSgpIC0gMi4wKSAqIG1heFg7XG4gICAgICAgIC8vIOi/lOWbnuaYn+aYn+WdkOagh1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vY2MubG9nKFwiZ2FtZSBkdDogXCIsIGR0KVxuICAgICAgICAvLyDmr4/luKfmm7TmlrDorqHml7blmajvvIzotoXov4fpmZDluqbov5jmsqHmnInnlJ/miJDmlrDnmoTmmJ/mmJ9cbiAgICAgICAgLy8g5bCx5Lya6LCD55So5ri45oiP5aSx6LSl6YC76L6RXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy50aW1lciA+IHRoaXMuc3RhckR1cmF0aW9uKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJnYW1lIG92ZXI6IFwiLCB0aGlzLnRpbWVyLCB0aGlzLnN0YXJEdXJhdGlvbilcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlOyAgIC8vIGRpc2FibGUgZ2FtZU92ZXIgbG9naWMgdG8gYXZvaWQgbG9hZCBzY2VuZSByZXBlYXRlZGx5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVyICs9IGR0O1xuICAgICAgICByZXR1cm5cbiAgICB9LFxuXG4gICAgZ2FpblNjb3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTtcbiAgICAgICAgLy8g5pu05pawIHNjb3JlRGlzcGxheSBMYWJlbCDnmoTmloflrZdcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZTtcbiAgICAgICAgLy8g5pKt5pS+5b6X5YiG6Z+z5pWIXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZUF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgfVxufSk7XG4iXX0=
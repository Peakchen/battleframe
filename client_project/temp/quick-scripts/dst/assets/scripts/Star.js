
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Star');
// scripts/Star.js

"use strict";

var Battle = require("battle");

var wsNet = require("wsNet");

var Global = require("common");

cc.Class({
  "extends": cc.Component,
  properties: {
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    pickRadius: 0
  },
  getBattleObj: function getBattleObj() {
    return new Battle();
  },
  getwsNetObj: function getwsNetObj() {
    return new wsNet();
  },
  getPlayerDistance: function getPlayerDistance() {
    // 根据 player 节点位置判断距离
    var playerPos = this.game.player.getPosition(); // 根据两点位置计算两点之间距离

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onLoad: function onLoad() {
    this.updateFrame = 0;
  },
  onPicked: function onPicked() {
    if (Global.newStarPos.has(Global.newStarKey) == false && Global.BumpedPlayerId == null) {
      return;
    } // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星


    var data = Global.newStarPos.get(Global.newStarKey);
    Global.newStarPos["delete"](Global.newStarKey);
    var nodex = data.nodex;
    var nodey = data.nodey; //cc.log("update star pos: ", data.nodex, data.nodey)

    this.game.spawnNewStar(nodex, nodey); // 然后销毁当前星星节点

    this.node.destroy();
    Global.Bumped = 1;
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
  sendBumpMsg: function sendBumpMsg() {
    var buff = new ArrayBuffer(44);
    var data = new Uint32Array(buff);
    data[0] = Global.MID_Bump; //消息ID

    data[1] = 9; //消息长度
    //小球信息

    var playerPos = this.game.player.getPosition();
    var playerX = playerPos.x;
    var playerXflag = 1;

    if (playerX < 0.0) {
      playerXflag = 2;
      playerX = 0.0 - playerX;
    }

    var playerY = playerPos.y;
    var playerYflag = 1;

    if (playerY < 0.0) {
      playerYflag = 2;
      playerY = 0.0 - playerY;
    }

    data[2] = playerXflag;
    data[3] = parseInt(playerX);
    data[4] = playerYflag;
    data[5] = parseInt(playerY); //星星信息

    var starPos = this.node.getPosition();
    var starX = starPos.x;
    var starXflag = 1;

    if (starX < 0.0) {
      starXflag = 2;
      starX = 0.0 - starX;
    }

    var starY = starPos.y;
    var starYflag = 1;

    if (starY < 0.0) {
      starYflag = 2;
      starY = 0.0 - starY;
    }

    data[6] = starXflag;
    data[7] = parseInt(starX);
    data[8] = starYflag;
    data[9] = parseInt(starY);
    data[10] = Global.mySessionId; //cc.log("send bump star: ", data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])

    this.getwsNetObj().sendwsmessage(data);
  },
  update: function update(dt) {
    //cc.log("star dt: ", this.updateFrame)
    // 每帧判断和主角之间的距离是否小于收集距离
    if (this.updateFrame >= 1.0 && this.getPlayerDistance() < this.pickRadius) {
      this.updateFrame = 0; // 调用收集行为

      if (dt <= 1.0) {
        dt *= 100.0;
      }

      var frame = parseInt(dt);
      var dist = parseInt(this.getPlayerDistance()); // 发送撞击星星事件
      //this.getBattleObj().postAttackMsg(frame, dist);
      //cc.log("star info: ", dt, frame, dist)

      this.sendBumpMsg();
      return;
    }

    if (Global.newStarPos.has(Global.newStarKey)) {
      this.onPicked();
    }

    this.updateFrame += dt; // 根据 Game 脚本中的计时器更新星星的透明度
    //var opacityRatio = 1 - this.game.timer/this.game.starDuration;
    //var minOpacity = 50;
    //this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uTG9hZCIsInVwZGF0ZUZyYW1lIiwib25QaWNrZWQiLCJuZXdTdGFyUG9zIiwiaGFzIiwibmV3U3RhcktleSIsIkJ1bXBlZFBsYXllcklkIiwiZGF0YSIsImdldCIsIm5vZGV4Iiwibm9kZXkiLCJzcGF3bk5ld1N0YXIiLCJkZXN0cm95IiwiQnVtcGVkIiwic2VuZEJ1bXBNc2ciLCJidWZmIiwiQXJyYXlCdWZmZXIiLCJVaW50MzJBcnJheSIsIk1JRF9CdW1wIiwicGxheWVyWCIsIngiLCJwbGF5ZXJYZmxhZyIsInBsYXllclkiLCJ5IiwicGxheWVyWWZsYWciLCJwYXJzZUludCIsInN0YXJQb3MiLCJzdGFyWCIsInN0YXJYZmxhZyIsInN0YXJZIiwic3RhcllmbGFnIiwibXlTZXNzaW9uSWQiLCJzZW5kd3NtZXNzYWdlIiwidXBkYXRlIiwiZHQiLCJmcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLEtBQUssR0FBR0QsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUUsTUFBTSxHQUFHRixPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBRkosR0FIUDtBQVFMQyxFQUFBQSxZQUFZLEVBQUUsd0JBQVc7QUFDckIsV0FBTyxJQUFJVCxNQUFKLEVBQVA7QUFDSCxHQVZJO0FBWUxVLEVBQUFBLFdBQVcsRUFBRSx1QkFBVztBQUNwQixXQUFPLElBQUlSLEtBQUosRUFBUDtBQUNILEdBZEk7QUFnQkxTLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsV0FBakIsRUFBaEIsQ0FGMkIsQ0FHM0I7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsR0FBbkIsQ0FBdUJQLFNBQXZCLEVBQWtDUSxHQUFsQyxFQUFYO0FBQ0EsV0FBT0osSUFBUDtBQUNILEdBdEJJO0FBd0JMSyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0gsR0ExQkk7QUE0QkxDLEVBQUFBLFFBQVEsRUFBRSxvQkFBVztBQUNqQixRQUFJcEIsTUFBTSxDQUFDcUIsVUFBUCxDQUFrQkMsR0FBbEIsQ0FBc0J0QixNQUFNLENBQUN1QixVQUE3QixLQUE0QyxLQUE1QyxJQUFxRHZCLE1BQU0sQ0FBQ3dCLGNBQVAsSUFBeUIsSUFBbEYsRUFBd0Y7QUFDcEY7QUFDSCxLQUhnQixDQUtqQjs7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHekIsTUFBTSxDQUFDcUIsVUFBUCxDQUFrQkssR0FBbEIsQ0FBc0IxQixNQUFNLENBQUN1QixVQUE3QixDQUFYO0FBQ0F2QixJQUFBQSxNQUFNLENBQUNxQixVQUFQLFdBQXlCckIsTUFBTSxDQUFDdUIsVUFBaEM7QUFDQSxRQUFJSSxLQUFLLEdBQUdGLElBQUksQ0FBQ0UsS0FBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUdILElBQUksQ0FBQ0csS0FBakIsQ0FUaUIsQ0FVakI7O0FBQ0EsU0FBS2xCLElBQUwsQ0FBVW1CLFlBQVYsQ0FBdUJGLEtBQXZCLEVBQThCQyxLQUE5QixFQVhpQixDQWFqQjs7QUFDQSxTQUFLZCxJQUFMLENBQVVnQixPQUFWO0FBQ0E5QixJQUFBQSxNQUFNLENBQUMrQixNQUFQLEdBQWdCLENBQWhCO0FBQ0gsR0E1Q0k7O0FBOENMOzs7Ozs7Ozs7Ozs7OztBQWNBQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDbkIsUUFBSUMsSUFBSSxHQUFHLElBQUlDLFdBQUosQ0FBZ0IsRUFBaEIsQ0FBWDtBQUNBLFFBQUlULElBQUksR0FBRyxJQUFJVSxXQUFKLENBQWdCRixJQUFoQixDQUFYO0FBRUFSLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXpCLE1BQU0sQ0FBQ29DLFFBQWpCLENBSm1CLENBSU87O0FBQzFCWCxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVUsQ0FBVixDQUxtQixDQUtQO0FBRVo7O0FBQ0EsUUFBSWhCLFNBQVMsR0FBRyxLQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFdBQWpCLEVBQWhCO0FBQ0EsUUFBSXlCLE9BQU8sR0FBRzVCLFNBQVMsQ0FBQzZCLENBQXhCO0FBQ0EsUUFBSUMsV0FBVyxHQUFHLENBQWxCOztBQUNBLFFBQUlGLE9BQU8sR0FBRyxHQUFkLEVBQW1CO0FBQ2ZFLE1BQUFBLFdBQVcsR0FBRyxDQUFkO0FBQ0FGLE1BQUFBLE9BQU8sR0FBRyxNQUFNQSxPQUFoQjtBQUNIOztBQUVELFFBQUlHLE9BQU8sR0FBRy9CLFNBQVMsQ0FBQ2dDLENBQXhCO0FBQ0EsUUFBSUMsV0FBVyxHQUFHLENBQWxCOztBQUNBLFFBQUlGLE9BQU8sR0FBRyxHQUFkLEVBQW1CO0FBQ2ZFLE1BQUFBLFdBQVcsR0FBRyxDQUFkO0FBQ0FGLE1BQUFBLE9BQU8sR0FBRyxNQUFNQSxPQUFoQjtBQUNIOztBQUVEZixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVjLFdBQVY7QUFDQWQsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVa0IsUUFBUSxDQUFDTixPQUFELENBQWxCO0FBQ0FaLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVWlCLFdBQVY7QUFDQWpCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVWtCLFFBQVEsQ0FBQ0gsT0FBRCxDQUFsQixDQTFCbUIsQ0E0Qm5COztBQUNBLFFBQUlJLE9BQU8sR0FBRyxLQUFLOUIsSUFBTCxDQUFVRixXQUFWLEVBQWQ7QUFDQSxRQUFJaUMsS0FBSyxHQUFHRCxPQUFPLENBQUNOLENBQXBCO0FBQ0EsUUFBSVEsU0FBUyxHQUFHLENBQWhCOztBQUNBLFFBQUlELEtBQUssR0FBRyxHQUFaLEVBQWlCO0FBQ2JDLE1BQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0FELE1BQUFBLEtBQUssR0FBRyxNQUFNQSxLQUFkO0FBQ0g7O0FBRUQsUUFBSUUsS0FBSyxHQUFHSCxPQUFPLENBQUNILENBQXBCO0FBQ0EsUUFBSU8sU0FBUyxHQUFHLENBQWhCOztBQUNBLFFBQUlELEtBQUssR0FBRyxHQUFaLEVBQWlCO0FBQ2JDLE1BQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0FELE1BQUFBLEtBQUssR0FBRyxNQUFNQSxLQUFkO0FBQ0g7O0FBRUR0QixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVxQixTQUFWO0FBQ0FyQixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVrQixRQUFRLENBQUNFLEtBQUQsQ0FBbEI7QUFDQXBCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVXVCLFNBQVY7QUFDQXZCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVWtCLFFBQVEsQ0FBQ0ksS0FBRCxDQUFsQjtBQUNBdEIsSUFBQUEsSUFBSSxDQUFDLEVBQUQsQ0FBSixHQUFXekIsTUFBTSxDQUFDaUQsV0FBbEIsQ0FoRG1CLENBaURuQjs7QUFDQSxTQUFLMUMsV0FBTCxHQUFtQjJDLGFBQW5CLENBQWlDekIsSUFBakM7QUFDSCxHQS9HSTtBQWlITDBCLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCO0FBQ0E7QUFFQSxRQUFJLEtBQUtqQyxXQUFMLElBQW9CLEdBQXBCLElBQTJCLEtBQUtYLGlCQUFMLEtBQTJCLEtBQUtILFVBQS9ELEVBQTJFO0FBQ3ZFLFdBQUtjLFdBQUwsR0FBbUIsQ0FBbkIsQ0FEdUUsQ0FFdkU7O0FBQ0EsVUFBSWlDLEVBQUUsSUFBSSxHQUFWLEVBQWU7QUFDWEEsUUFBQUEsRUFBRSxJQUFJLEtBQU47QUFDSDs7QUFDRCxVQUFJQyxLQUFLLEdBQUdWLFFBQVEsQ0FBQ1MsRUFBRCxDQUFwQjtBQUNBLFVBQUl2QyxJQUFJLEdBQUc4QixRQUFRLENBQUMsS0FBS25DLGlCQUFMLEVBQUQsQ0FBbkIsQ0FQdUUsQ0FRdkU7QUFDQTtBQUNBOztBQUNBLFdBQUt3QixXQUFMO0FBQ0E7QUFDSDs7QUFFRCxRQUFJaEMsTUFBTSxDQUFDcUIsVUFBUCxDQUFrQkMsR0FBbEIsQ0FBc0J0QixNQUFNLENBQUN1QixVQUE3QixDQUFKLEVBQTZDO0FBQ3pDLFdBQUtILFFBQUw7QUFDSDs7QUFFRCxTQUFLRCxXQUFMLElBQW9CaUMsRUFBcEIsQ0F2QmtCLENBd0JsQjtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBN0lJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBCYXR0bGUgPSByZXF1aXJlKFwiYmF0dGxlXCIpXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5pif5pif5ZKM5Li76KeS5LmL6Ze055qE6Led56a75bCP5LqO6L+Z5Liq5pWw5YC85pe277yM5bCx5Lya5a6M5oiQ5pS26ZuGXG4gICAgICAgIHBpY2tSYWRpdXM6IDAsXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDmoLnmja4gcGxheWVyIOiKgueCueS9jee9ruWIpOaWrei3neemu1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAvLyDmoLnmja7kuKTngrnkvY3nva7orqHnrpfkuKTngrnkuYvpl7Tot53nprtcbiAgICAgICAgdmFyIGRpc3QgPSB0aGlzLm5vZGUucG9zaXRpb24uc3ViKHBsYXllclBvcykubWFnKCk7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZyYW1lID0gMFxuICAgIH0sXG5cbiAgICBvblBpY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChHbG9iYWwubmV3U3RhclBvcy5oYXMoR2xvYmFsLm5ld1N0YXJLZXkpID09IGZhbHNlICYmIEdsb2JhbC5CdW1wZWRQbGF5ZXJJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOW9k+aYn+aYn+iiq+aUtumbhuaXtu+8jOiwg+eUqCBHYW1lIOiEmuacrOS4reeahOaOpeWPo++8jOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB2YXIgZGF0YSA9IEdsb2JhbC5uZXdTdGFyUG9zLmdldChHbG9iYWwubmV3U3RhcktleSlcbiAgICAgICAgR2xvYmFsLm5ld1N0YXJQb3MuZGVsZXRlKEdsb2JhbC5uZXdTdGFyS2V5KVxuICAgICAgICB2YXIgbm9kZXggPSBkYXRhLm5vZGV4XG4gICAgICAgIHZhciBub2RleSA9IGRhdGEubm9kZXlcbiAgICAgICAgLy9jYy5sb2coXCJ1cGRhdGUgc3RhciBwb3M6IFwiLCBkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KVxuICAgICAgICB0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKG5vZGV4LCBub2RleSk7XG5cbiAgICAgICAgLy8g54S25ZCO6ZSA5q+B5b2T5YmN5pif5pif6IqC54K5XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIEdsb2JhbC5CdW1wZWQgPSAxXG4gICAgfSxcblxuICAgIC8qXG5cdOaSnuWHu+WTjeW6lFxuXHTor7fmsYLmtojmga/nu5PmnoTvvJpcblx0XHQwOiDmtojmga9JRFxuXHRcdDHvvJrmtojmga/plb/luqYgOFxuXHRcdDI6IOWwj+eQg3jlnZDmoIfmraPotJ/moIflv5dcblx0XHQzOiDlsI/nkIN45Z2Q5qCHXG5cdFx0NO+8muWwj+eQg3nlnZDmoIfmraPotJ/moIflv5dcblx0XHQ177ya5bCP55CDeeWdkOagh1xuXHRcdDY6IOaYn+aYn3jlnZDmoIfmraPotJ/moIflv5dcblx0XHQ3OiDmmJ/mmJ945Z2Q5qCHXG5cdFx0OO+8muaYn+aYn3nlnZDmoIfmraPotJ/moIflv5dcbiAgICAgICAgOe+8muaYn+aYn3nlnZDmoIdcbiAgICAqL1xuICAgIHNlbmRCdW1wTXNnOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYnVmZiA9IG5ldyBBcnJheUJ1ZmZlcig0NClcbiAgICAgICAgdmFyIGRhdGEgPSBuZXcgVWludDMyQXJyYXkoYnVmZilcblxuICAgICAgICBkYXRhWzBdID0gR2xvYmFsLk1JRF9CdW1wIC8v5raI5oGvSURcbiAgICAgICAgZGF0YVsxXSA9IDkgLy/mtojmga/plb/luqZcblxuICAgICAgICAvL+Wwj+eQg+S/oeaBr1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcGxheWVyWCA9IHBsYXllclBvcy54O1xuICAgICAgICB2YXIgcGxheWVyWGZsYWcgPSAxXG4gICAgICAgIGlmIChwbGF5ZXJYIDwgMC4wKSB7XG4gICAgICAgICAgICBwbGF5ZXJYZmxhZyA9IDJcbiAgICAgICAgICAgIHBsYXllclggPSAwLjAgLSBwbGF5ZXJYXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxheWVyWSA9IHBsYXllclBvcy55O1xuICAgICAgICB2YXIgcGxheWVyWWZsYWcgPSAxXG4gICAgICAgIGlmIChwbGF5ZXJZIDwgMC4wKSB7XG4gICAgICAgICAgICBwbGF5ZXJZZmxhZyA9IDJcbiAgICAgICAgICAgIHBsYXllclkgPSAwLjAgLSBwbGF5ZXJZXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhWzJdID0gcGxheWVyWGZsYWdcbiAgICAgICAgZGF0YVszXSA9IHBhcnNlSW50KHBsYXllclgpXG4gICAgICAgIGRhdGFbNF0gPSBwbGF5ZXJZZmxhZ1xuICAgICAgICBkYXRhWzVdID0gcGFyc2VJbnQocGxheWVyWSlcblxuICAgICAgICAvL+aYn+aYn+S/oeaBr1xuICAgICAgICB2YXIgc3RhclBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc3RhclggPSBzdGFyUG9zLng7XG4gICAgICAgIHZhciBzdGFyWGZsYWcgPSAxXG4gICAgICAgIGlmIChzdGFyWCA8IDAuMCkge1xuICAgICAgICAgICAgc3RhclhmbGFnID0gMlxuICAgICAgICAgICAgc3RhclggPSAwLjAgLSBzdGFyWFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJZID0gc3RhclBvcy55O1xuICAgICAgICB2YXIgc3RhcllmbGFnID0gMVxuICAgICAgICBpZiAoc3RhclkgPCAwLjApIHtcbiAgICAgICAgICAgIHN0YXJZZmxhZyA9IDJcbiAgICAgICAgICAgIHN0YXJZID0gMC4wIC0gc3RhcllcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbNl0gPSBzdGFyWGZsYWdcbiAgICAgICAgZGF0YVs3XSA9IHBhcnNlSW50KHN0YXJYKVxuICAgICAgICBkYXRhWzhdID0gc3RhcllmbGFnXG4gICAgICAgIGRhdGFbOV0gPSBwYXJzZUludChzdGFyWSlcbiAgICAgICAgZGF0YVsxMF0gPSBHbG9iYWwubXlTZXNzaW9uSWRcbiAgICAgICAgLy9jYy5sb2coXCJzZW5kIGJ1bXAgc3RhcjogXCIsIGRhdGFbMl0sIGRhdGFbM10sIGRhdGFbNF0sIGRhdGFbNV0sIGRhdGFbNl0sIGRhdGFbN10sIGRhdGFbOF0sIGRhdGFbOV0pXG4gICAgICAgIHRoaXMuZ2V0d3NOZXRPYmooKS5zZW5kd3NtZXNzYWdlKGRhdGEpXG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vY2MubG9nKFwic3RhciBkdDogXCIsIHRoaXMudXBkYXRlRnJhbWUpXG4gICAgICAgIC8vIOavj+W4p+WIpOaWreWSjOS4u+inkuS5i+mXtOeahOi3neemu+aYr+WQpuWwj+S6juaUtumbhui3neemu1xuXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUZyYW1lID49IDEuMCAmJiB0aGlzLmdldFBsYXllckRpc3RhbmNlKCkgPCB0aGlzLnBpY2tSYWRpdXMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJhbWUgPSAwXG4gICAgICAgICAgICAvLyDosIPnlKjmlLbpm4booYzkuLpcbiAgICAgICAgICAgIGlmIChkdCA8PSAxLjApIHtcbiAgICAgICAgICAgICAgICBkdCAqPSAxMDAuMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZyYW1lID0gcGFyc2VJbnQoZHQpXG4gICAgICAgICAgICB2YXIgZGlzdCA9IHBhcnNlSW50KHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSlcbiAgICAgICAgICAgIC8vIOWPkemAgeaSnuWHu+aYn+aYn+S6i+S7tlxuICAgICAgICAgICAgLy90aGlzLmdldEJhdHRsZU9iaigpLnBvc3RBdHRhY2tNc2coZnJhbWUsIGRpc3QpO1xuICAgICAgICAgICAgLy9jYy5sb2coXCJzdGFyIGluZm86IFwiLCBkdCwgZnJhbWUsIGRpc3QpXG4gICAgICAgICAgICB0aGlzLnNlbmRCdW1wTXNnKClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChHbG9iYWwubmV3U3RhclBvcy5oYXMoR2xvYmFsLm5ld1N0YXJLZXkpKXtcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy51cGRhdGVGcmFtZSArPSBkdFxuICAgICAgICAvLyDmoLnmja4gR2FtZSDohJrmnKzkuK3nmoTorqHml7blmajmm7TmlrDmmJ/mmJ/nmoTpgI/mmI7luqZcbiAgICAgICAgLy92YXIgb3BhY2l0eVJhdGlvID0gMSAtIHRoaXMuZ2FtZS50aW1lci90aGlzLmdhbWUuc3RhckR1cmF0aW9uO1xuICAgICAgICAvL3ZhciBtaW5PcGFjaXR5ID0gNTA7XG4gICAgICAgIC8vdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH0sXG59KTtcbiJdfQ==

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

    this.game.spawnNewStar(nodex, nodey);
    Global.syncStarPos = true; // 然后销毁当前星星节点

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uTG9hZCIsInVwZGF0ZUZyYW1lIiwib25QaWNrZWQiLCJuZXdTdGFyUG9zIiwiaGFzIiwibmV3U3RhcktleSIsIkJ1bXBlZFBsYXllcklkIiwiZGF0YSIsImdldCIsIm5vZGV4Iiwibm9kZXkiLCJzcGF3bk5ld1N0YXIiLCJzeW5jU3RhclBvcyIsImRlc3Ryb3kiLCJCdW1wZWQiLCJzZW5kQnVtcE1zZyIsImJ1ZmYiLCJBcnJheUJ1ZmZlciIsIlVpbnQzMkFycmF5IiwiTUlEX0J1bXAiLCJwbGF5ZXJYIiwieCIsInBsYXllclhmbGFnIiwicGxheWVyWSIsInkiLCJwbGF5ZXJZZmxhZyIsInBhcnNlSW50Iiwic3RhclBvcyIsInN0YXJYIiwic3RhclhmbGFnIiwic3RhclkiLCJzdGFyWWZsYWciLCJteVNlc3Npb25JZCIsInNlbmR3c21lc3NhZ2UiLCJ1cGRhdGUiLCJkdCIsImZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRSxNQUFNLEdBQUdGLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVB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QUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBRUEsUUFBSSxLQUFLbEMsV0FBTCxJQUFvQixHQUFwQixJQUEyQixLQUFLWCxpQkFBTCxLQUEyQixLQUFLSCxVQUEvRCxFQUEyRTtBQUN2RSxXQUFLYyxXQUFMLEdBQW1CLENBQW5CLENBRHVFLENBRXZFOztBQUNBLFVBQUlrQyxFQUFFLElBQUksR0FBVixFQUFlO0FBQ1hBLFFBQUFBLEVBQUUsSUFBSSxLQUFOO0FBQ0g7O0FBQ0QsVUFBSUMsS0FBSyxHQUFHVixRQUFRLENBQUNTLEVBQUQsQ0FBcEI7QUFDQSxVQUFJeEMsSUFBSSxHQUFHK0IsUUFBUSxDQUFDLEtBQUtwQyxpQkFBTCxFQUFELENBQW5CLENBUHVFLENBUXZFO0FBQ0E7QUFDQTs7QUFDQSxXQUFLeUIsV0FBTDtBQUNBO0FBQ0g7O0FBRUQsUUFBSWpDLE1BQU0sQ0FBQ3FCLFVBQVAsQ0FBa0JDLEdBQWxCLENBQXNCdEIsTUFBTSxDQUFDdUIsVUFBN0IsQ0FBSixFQUE2QztBQUN6QyxXQUFLSCxRQUFMO0FBQ0g7O0FBRUQsU0FBS0QsV0FBTCxJQUFvQmtDLEVBQXBCLENBdkJrQixDQXdCbEI7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQTdJSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQmF0dGxlID0gcmVxdWlyZShcImJhdHRsZVwiKVxubGV0IHdzTmV0ID0gcmVxdWlyZShcIndzTmV0XCIpXG5sZXQgR2xvYmFsID0gcmVxdWlyZShcImNvbW1vblwiKVxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOaYn+aYn+WSjOS4u+inkuS5i+mXtOeahOi3neemu+Wwj+S6jui/meS4quaVsOWAvOaXtu+8jOWwseS8muWujOaIkOaUtumbhlxuICAgICAgICBwaWNrUmFkaXVzOiAwLFxuICAgIH0sXG5cbiAgICBnZXRCYXR0bGVPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJhdHRsZSgpO1xuICAgIH0sXG5cbiAgICBnZXR3c05ldE9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcbiAgICB9LFxuXG4gICAgZ2V0UGxheWVyRGlzdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g5qC55o2uIHBsYXllciDoioLngrnkvY3nva7liKTmlq3ot53nprtcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8g5qC55o2u5Lik54K55L2N572u6K6h566X5Lik54K55LmL6Ze06Led56a7XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGcmFtZSA9IDBcbiAgICB9LFxuXG4gICAgb25QaWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoR2xvYmFsLm5ld1N0YXJQb3MuaGFzKEdsb2JhbC5uZXdTdGFyS2V5KSA9PSBmYWxzZSAmJiBHbG9iYWwuQnVtcGVkUGxheWVySWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDlvZPmmJ/mmJ/ooqvmlLbpm4bml7bvvIzosIPnlKggR2FtZSDohJrmnKzkuK3nmoTmjqXlj6PvvIznlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdmFyIGRhdGEgPSBHbG9iYWwubmV3U3RhclBvcy5nZXQoR2xvYmFsLm5ld1N0YXJLZXkpXG4gICAgICAgIEdsb2JhbC5uZXdTdGFyUG9zLmRlbGV0ZShHbG9iYWwubmV3U3RhcktleSlcbiAgICAgICAgdmFyIG5vZGV4ID0gZGF0YS5ub2RleFxuICAgICAgICB2YXIgbm9kZXkgPSBkYXRhLm5vZGV5XG4gICAgICAgIC8vY2MubG9nKFwidXBkYXRlIHN0YXIgcG9zOiBcIiwgZGF0YS5ub2RleCwgZGF0YS5ub2RleSlcbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3Rhcihub2RleCwgbm9kZXkpO1xuICAgICAgICBHbG9iYWwuc3luY1N0YXJQb3MgPSB0cnVlXG4gICAgICAgIC8vIOeEtuWQjumUgOavgeW9k+WJjeaYn+aYn+iKgueCuVxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICBHbG9iYWwuQnVtcGVkID0gMVxuICAgIH0sXG5cbiAgICAvKlxuXHTmkp7lh7vlk43lupRcblx06K+35rGC5raI5oGv57uT5p6E77yaXG5cdFx0MDog5raI5oGvSURcblx0XHQx77ya5raI5oGv6ZW/5bqmIDhcblx0XHQyOiDlsI/nkIN45Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Mzog5bCP55CDeOWdkOagh1xuXHRcdDTvvJrlsI/nkIN55Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Ne+8muWwj+eQg3nlnZDmoIdcblx0XHQ2OiDmmJ/mmJ945Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Nzog5pif5pifeOWdkOagh1xuXHRcdDjvvJrmmJ/mmJ955Z2Q5qCH5q2j6LSf5qCH5b+XXG4gICAgICAgIDnvvJrmmJ/mmJ955Z2Q5qCHXG4gICAgKi9cbiAgICBzZW5kQnVtcE1zZzogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoNDQpXG4gICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXG5cbiAgICAgICAgZGF0YVswXSA9IEdsb2JhbC5NSURfQnVtcCAvL+a2iOaBr0lEXG4gICAgICAgIGRhdGFbMV0gPSA5IC8v5raI5oGv6ZW/5bqmXG5cbiAgICAgICAgLy/lsI/nkIPkv6Hmga9cbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHBsYXllclggPSBwbGF5ZXJQb3MueDtcbiAgICAgICAgdmFyIHBsYXllclhmbGFnID0gMVxuICAgICAgICBpZiAocGxheWVyWCA8IDAuMCkge1xuICAgICAgICAgICAgcGxheWVyWGZsYWcgPSAyXG4gICAgICAgICAgICBwbGF5ZXJYID0gMC4wIC0gcGxheWVyWFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYXllclkgPSBwbGF5ZXJQb3MueTtcbiAgICAgICAgdmFyIHBsYXllcllmbGFnID0gMVxuICAgICAgICBpZiAocGxheWVyWSA8IDAuMCkge1xuICAgICAgICAgICAgcGxheWVyWWZsYWcgPSAyXG4gICAgICAgICAgICBwbGF5ZXJZID0gMC4wIC0gcGxheWVyWVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YVsyXSA9IHBsYXllclhmbGFnXG4gICAgICAgIGRhdGFbM10gPSBwYXJzZUludChwbGF5ZXJYKVxuICAgICAgICBkYXRhWzRdID0gcGxheWVyWWZsYWdcbiAgICAgICAgZGF0YVs1XSA9IHBhcnNlSW50KHBsYXllclkpXG5cbiAgICAgICAgLy/mmJ/mmJ/kv6Hmga9cbiAgICAgICAgdmFyIHN0YXJQb3MgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHN0YXJYID0gc3RhclBvcy54O1xuICAgICAgICB2YXIgc3RhclhmbGFnID0gMVxuICAgICAgICBpZiAoc3RhclggPCAwLjApIHtcbiAgICAgICAgICAgIHN0YXJYZmxhZyA9IDJcbiAgICAgICAgICAgIHN0YXJYID0gMC4wIC0gc3RhclhcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFyWSA9IHN0YXJQb3MueTtcbiAgICAgICAgdmFyIHN0YXJZZmxhZyA9IDFcbiAgICAgICAgaWYgKHN0YXJZIDwgMC4wKSB7XG4gICAgICAgICAgICBzdGFyWWZsYWcgPSAyXG4gICAgICAgICAgICBzdGFyWSA9IDAuMCAtIHN0YXJZXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhWzZdID0gc3RhclhmbGFnXG4gICAgICAgIGRhdGFbN10gPSBwYXJzZUludChzdGFyWClcbiAgICAgICAgZGF0YVs4XSA9IHN0YXJZZmxhZ1xuICAgICAgICBkYXRhWzldID0gcGFyc2VJbnQoc3RhclkpXG4gICAgICAgIGRhdGFbMTBdID0gR2xvYmFsLm15U2Vzc2lvbklkXG4gICAgICAgIC8vY2MubG9nKFwic2VuZCBidW1wIHN0YXI6IFwiLCBkYXRhWzJdLCBkYXRhWzNdLCBkYXRhWzRdLCBkYXRhWzVdLCBkYXRhWzZdLCBkYXRhWzddLCBkYXRhWzhdLCBkYXRhWzldKVxuICAgICAgICB0aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShkYXRhKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcInN0YXIgZHQ6IFwiLCB0aGlzLnVwZGF0ZUZyYW1lKVxuICAgICAgICAvLyDmr4/luKfliKTmlq3lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcblxuICAgICAgICBpZiAodGhpcy51cGRhdGVGcmFtZSA+PSAxLjAgJiYgdGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpIDwgdGhpcy5waWNrUmFkaXVzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyYW1lID0gMFxuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICBpZiAoZHQgPD0gMS4wKSB7XG4gICAgICAgICAgICAgICAgZHQgKj0gMTAwLjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmcmFtZSA9IHBhcnNlSW50KGR0KVxuICAgICAgICAgICAgdmFyIGRpc3QgPSBwYXJzZUludCh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkpXG4gICAgICAgICAgICAvLyDlj5HpgIHmkp7lh7vmmJ/mmJ/kuovku7ZcbiAgICAgICAgICAgIC8vdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0QXR0YWNrTXNnKGZyYW1lLCBkaXN0KTtcbiAgICAgICAgICAgIC8vY2MubG9nKFwic3RhciBpbmZvOiBcIiwgZHQsIGZyYW1lLCBkaXN0KVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVtcE1zZygpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoR2xvYmFsLm5ld1N0YXJQb3MuaGFzKEdsb2JhbC5uZXdTdGFyS2V5KSl7XG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlRnJhbWUgKz0gZHRcbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIC8vdmFyIG9wYWNpdHlSYXRpbyA9IDEgLSB0aGlzLmdhbWUudGltZXIvdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgLy92YXIgbWluT3BhY2l0eSA9IDUwO1xuICAgICAgICAvL3RoaXMubm9kZS5vcGFjaXR5ID0gbWluT3BhY2l0eSArIE1hdGguZmxvb3Iob3BhY2l0eVJhdGlvICogKDI1NSAtIG1pbk9wYWNpdHkpKTtcbiAgICB9LFxufSk7XG4iXX0=
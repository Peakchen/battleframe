
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
    cc.log("star load init.");
    this.updateFrame = 0;
  },
  onPicked: function onPicked() {
    //碰撞后发送一个消息
    // var buff = new ArrayBuffer(12)
    // var data = new Uint32Array(buff)
    // data[0] = 4
    // data[1] = 1 //单纯给服务器发消息
    // for (var i = 2; i <= data.length-1; i++) {
    //     data[i] = i + 1
    // }
    if (Global.newStarPos.has(Global.newStarKey) == false) {
      return;
    } // this.getwsNetObj().sendwsmessage(data)
    // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星


    var data = Global.newStarPos.get(Global.newStarKey);
    Global.newStarPos["delete"](Global.newStarKey);
    var nodex = data.nodex;
    var nodey = data.nodey; //cc.log("update star pos: ", data.nodex, data.nodey)

    this.game.spawnNewStar(nodex, nodey); // 调用 Game 脚本的得分方法

    this.game.gainScore(); // 然后销毁当前星星节点

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
    var buff = new ArrayBuffer(40);
    var data = new Uint32Array(buff);
    data[0] = Global.MID_Bump; //消息ID

    data[1] = 8; //消息长度
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
    data[9] = parseInt(starY); //cc.log("send bump star: ", data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uTG9hZCIsImxvZyIsInVwZGF0ZUZyYW1lIiwib25QaWNrZWQiLCJuZXdTdGFyUG9zIiwiaGFzIiwibmV3U3RhcktleSIsImRhdGEiLCJnZXQiLCJub2RleCIsIm5vZGV5Iiwic3Bhd25OZXdTdGFyIiwiZ2FpblNjb3JlIiwiZGVzdHJveSIsIkJ1bXBlZCIsInNlbmRCdW1wTXNnIiwiYnVmZiIsIkFycmF5QnVmZmVyIiwiVWludDMyQXJyYXkiLCJNSURfQnVtcCIsInBsYXllclgiLCJ4IiwicGxheWVyWGZsYWciLCJwbGF5ZXJZIiwieSIsInBsYXllcllmbGFnIiwicGFyc2VJbnQiLCJzdGFyUG9zIiwic3RhclgiLCJzdGFyWGZsYWciLCJzdGFyWSIsInN0YXJZZmxhZyIsInNlbmR3c21lc3NhZ2UiLCJ1cGRhdGUiLCJkdCIsImZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRSxNQUFNLEdBQUdGLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVB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YztBQUNsQjtBQUNBO0FBRUEsUUFBSSxLQUFLaEMsV0FBTCxJQUFvQixHQUFwQixJQUEyQixLQUFLWixpQkFBTCxLQUEyQixLQUFLSCxVQUEvRCxFQUEyRTtBQUN2RSxXQUFLZSxXQUFMLEdBQW1CLENBQW5CLENBRHVFLENBRXZFOztBQUNBLFVBQUlnQyxFQUFFLElBQUksR0FBVixFQUFlO0FBQ1hBLFFBQUFBLEVBQUUsSUFBSSxLQUFOO0FBQ0g7O0FBQ0QsVUFBSUMsS0FBSyxHQUFHVCxRQUFRLENBQUNRLEVBQUQsQ0FBcEI7QUFDQSxVQUFJdkMsSUFBSSxHQUFHK0IsUUFBUSxDQUFDLEtBQUtwQyxpQkFBTCxFQUFELENBQW5CLENBUHVFLENBUXZFO0FBQ0E7QUFDQTs7QUFDQSxXQUFLeUIsV0FBTDtBQUNBO0FBQ0g7O0FBRUQsUUFBSWpDLE1BQU0sQ0FBQ3NCLFVBQVAsQ0FBa0JDLEdBQWxCLENBQXNCdkIsTUFBTSxDQUFDd0IsVUFBN0IsQ0FBSixFQUE2QztBQUN6QyxXQUFLSCxRQUFMO0FBQ0g7O0FBRUQsU0FBS0QsV0FBTCxJQUFvQmdDLEVBQXBCLENBdkJrQixDQXdCbEI7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQXpKSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQmF0dGxlID0gcmVxdWlyZShcImJhdHRsZVwiKVxubGV0IHdzTmV0ID0gcmVxdWlyZShcIndzTmV0XCIpXG5sZXQgR2xvYmFsID0gcmVxdWlyZShcImNvbW1vblwiKVxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOaYn+aYn+WSjOS4u+inkuS5i+mXtOeahOi3neemu+Wwj+S6jui/meS4quaVsOWAvOaXtu+8jOWwseS8muWujOaIkOaUtumbhlxuICAgICAgICBwaWNrUmFkaXVzOiAwLFxuICAgIH0sXG5cbiAgICBnZXRCYXR0bGVPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJhdHRsZSgpO1xuICAgIH0sXG5cbiAgICBnZXR3c05ldE9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcbiAgICB9LFxuXG4gICAgZ2V0UGxheWVyRGlzdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g5qC55o2uIHBsYXllciDoioLngrnkvY3nva7liKTmlq3ot53nprtcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8g5qC55o2u5Lik54K55L2N572u6K6h566X5Lik54K55LmL6Ze06Led56a7XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2MubG9nKFwic3RhciBsb2FkIGluaXQuXCIpXG4gICAgICAgIHRoaXMudXBkYXRlRnJhbWUgPSAwXG4gICAgfSxcblxuICAgIG9uUGlja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy/norDmkp7lkI7lj5HpgIHkuIDkuKrmtojmga9cbiAgICAgICAgLy8gdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoMTIpXG4gICAgICAgIC8vIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXG4gICAgICAgIC8vIGRhdGFbMF0gPSA0XG4gICAgICAgIC8vIGRhdGFbMV0gPSAxIC8v5Y2V57qv57uZ5pyN5Yqh5Zmo5Y+R5raI5oGvXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAyOyBpIDw9IGRhdGEubGVuZ3RoLTE7IGkrKykge1xuICAgICAgICAvLyAgICAgZGF0YVtpXSA9IGkgKyAxXG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAoR2xvYmFsLm5ld1N0YXJQb3MuaGFzKEdsb2JhbC5uZXdTdGFyS2V5KSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShkYXRhKVxuICAgICAgICAvLyDlvZPmmJ/mmJ/ooqvmlLbpm4bml7bvvIzosIPnlKggR2FtZSDohJrmnKzkuK3nmoTmjqXlj6PvvIznlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdmFyIGRhdGEgPSBHbG9iYWwubmV3U3RhclBvcy5nZXQoR2xvYmFsLm5ld1N0YXJLZXkpXG4gICAgICAgIEdsb2JhbC5uZXdTdGFyUG9zLmRlbGV0ZShHbG9iYWwubmV3U3RhcktleSlcbiAgICAgICAgdmFyIG5vZGV4ID0gZGF0YS5ub2RleFxuICAgICAgICB2YXIgbm9kZXkgPSBkYXRhLm5vZGV5XG4gICAgICAgIC8vY2MubG9nKFwidXBkYXRlIHN0YXIgcG9zOiBcIiwgZGF0YS5ub2RleCwgZGF0YS5ub2RleSlcbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3Rhcihub2RleCwgbm9kZXkpO1xuICAgICAgICAvLyDosIPnlKggR2FtZSDohJrmnKznmoTlvpfliIbmlrnms5VcbiAgICAgICAgdGhpcy5nYW1lLmdhaW5TY29yZSgpO1xuICAgICAgICAvLyDnhLblkI7plIDmr4HlvZPliY3mmJ/mmJ/oioLngrlcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgR2xvYmFsLkJ1bXBlZCA9IDFcbiAgICB9LFxuXG4gICAgLypcblx05pKe5Ye75ZON5bqUXG5cdOivt+axgua2iOaBr+e7k+aehO+8mlxuXHRcdDA6IOa2iOaBr0lEXG5cdFx0Me+8mua2iOaBr+mVv+W6piA4XG5cdFx0Mjog5bCP55CDeOWdkOagh+ato+i0n+agh+W/l1xuXHRcdDM6IOWwj+eQg3jlnZDmoIdcblx0XHQ077ya5bCP55CDeeWdkOagh+ato+i0n+agh+W/l1xuXHRcdDXvvJrlsI/nkIN55Z2Q5qCHXG5cdFx0Njog5pif5pifeOWdkOagh+ato+i0n+agh+W/l1xuXHRcdDc6IOaYn+aYn3jlnZDmoIdcblx0XHQ477ya5pif5pifeeWdkOagh+ato+i0n+agh+W/l1xuICAgICAgICA577ya5pif5pifeeWdkOagh1xuICAgICovXG4gICAgc2VuZEJ1bXBNc2c6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBidWZmID0gbmV3IEFycmF5QnVmZmVyKDQwKVxuICAgICAgICB2YXIgZGF0YSA9IG5ldyBVaW50MzJBcnJheShidWZmKVxuXG4gICAgICAgIGRhdGFbMF0gPSBHbG9iYWwuTUlEX0J1bXAgLy/mtojmga9JRFxuICAgICAgICBkYXRhWzFdID0gOCAvL+a2iOaBr+mVv+W6plxuXG4gICAgICAgIC8v5bCP55CD5L+h5oGvXG4gICAgICAgIHZhciBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwbGF5ZXJYID0gcGxheWVyUG9zLng7XG4gICAgICAgIHZhciBwbGF5ZXJYZmxhZyA9IDFcbiAgICAgICAgaWYgKHBsYXllclggPCAwLjApIHtcbiAgICAgICAgICAgIHBsYXllclhmbGFnID0gMlxuICAgICAgICAgICAgcGxheWVyWCA9IDAuMCAtIHBsYXllclhcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGF5ZXJZID0gcGxheWVyUG9zLnk7XG4gICAgICAgIHZhciBwbGF5ZXJZZmxhZyA9IDFcbiAgICAgICAgaWYgKHBsYXllclkgPCAwLjApIHtcbiAgICAgICAgICAgIHBsYXllcllmbGFnID0gMlxuICAgICAgICAgICAgcGxheWVyWSA9IDAuMCAtIHBsYXllcllcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbMl0gPSBwbGF5ZXJYZmxhZ1xuICAgICAgICBkYXRhWzNdID0gcGFyc2VJbnQocGxheWVyWClcbiAgICAgICAgZGF0YVs0XSA9IHBsYXllcllmbGFnXG4gICAgICAgIGRhdGFbNV0gPSBwYXJzZUludChwbGF5ZXJZKVxuXG4gICAgICAgIC8v5pif5pif5L+h5oGvXG4gICAgICAgIHZhciBzdGFyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBzdGFyWCA9IHN0YXJQb3MueDtcbiAgICAgICAgdmFyIHN0YXJYZmxhZyA9IDFcbiAgICAgICAgaWYgKHN0YXJYIDwgMC4wKSB7XG4gICAgICAgICAgICBzdGFyWGZsYWcgPSAyXG4gICAgICAgICAgICBzdGFyWCA9IDAuMCAtIHN0YXJYXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhclkgPSBzdGFyUG9zLnk7XG4gICAgICAgIHZhciBzdGFyWWZsYWcgPSAxXG4gICAgICAgIGlmIChzdGFyWSA8IDAuMCkge1xuICAgICAgICAgICAgc3RhcllmbGFnID0gMlxuICAgICAgICAgICAgc3RhclkgPSAwLjAgLSBzdGFyWVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YVs2XSA9IHN0YXJYZmxhZ1xuICAgICAgICBkYXRhWzddID0gcGFyc2VJbnQoc3RhclgpXG4gICAgICAgIGRhdGFbOF0gPSBzdGFyWWZsYWdcbiAgICAgICAgZGF0YVs5XSA9IHBhcnNlSW50KHN0YXJZKVxuXG4gICAgICAgIC8vY2MubG9nKFwic2VuZCBidW1wIHN0YXI6IFwiLCBkYXRhWzJdLCBkYXRhWzNdLCBkYXRhWzRdLCBkYXRhWzVdLCBkYXRhWzZdLCBkYXRhWzddLCBkYXRhWzhdLCBkYXRhWzldKVxuICAgICAgICB0aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShkYXRhKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcInN0YXIgZHQ6IFwiLCB0aGlzLnVwZGF0ZUZyYW1lKVxuICAgICAgICAvLyDmr4/luKfliKTmlq3lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcblxuICAgICAgICBpZiAodGhpcy51cGRhdGVGcmFtZSA+PSAxLjAgJiYgdGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpIDwgdGhpcy5waWNrUmFkaXVzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyYW1lID0gMFxuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICBpZiAoZHQgPD0gMS4wKSB7XG4gICAgICAgICAgICAgICAgZHQgKj0gMTAwLjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmcmFtZSA9IHBhcnNlSW50KGR0KVxuICAgICAgICAgICAgdmFyIGRpc3QgPSBwYXJzZUludCh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkpXG4gICAgICAgICAgICAvLyDlj5HpgIHmkp7lh7vmmJ/mmJ/kuovku7ZcbiAgICAgICAgICAgIC8vdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0QXR0YWNrTXNnKGZyYW1lLCBkaXN0KTtcbiAgICAgICAgICAgIC8vY2MubG9nKFwic3RhciBpbmZvOiBcIiwgZHQsIGZyYW1lLCBkaXN0KVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVtcE1zZygpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoR2xvYmFsLm5ld1N0YXJQb3MuaGFzKEdsb2JhbC5uZXdTdGFyS2V5KSl7XG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlRnJhbWUgKz0gZHRcbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIC8vdmFyIG9wYWNpdHlSYXRpbyA9IDEgLSB0aGlzLmdhbWUudGltZXIvdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgLy92YXIgbWluT3BhY2l0eSA9IDUwO1xuICAgICAgICAvL3RoaXMubm9kZS5vcGFjaXR5ID0gbWluT3BhY2l0eSArIE1hdGguZmxvb3Iob3BhY2l0eVJhdGlvICogKDI1NSAtIG1pbk9wYWNpdHkpKTtcbiAgICB9LFxufSk7XG4iXX0=
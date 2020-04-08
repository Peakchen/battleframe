
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
  getAnyPlayerDistance: function getAnyPlayerDistance() {},
  onPicked: function onPicked() {
    //碰撞后发送一个消息
    // var buff = new ArrayBuffer(12)
    // var data = new Uint32Array(buff)
    // data[0] = 4
    // data[1] = 1 //单纯给服务器发消息
    // for (var i = 2; i <= data.length-1; i++) {
    //     data[i] = i + 1
    // }
    Global.Bumped = 1; // this.getwsNetObj().sendwsmessage(data)
    // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星

    var data = Global.newStarPos.get(Global.newStarKey);
    var nodex = data.nodex;
    var nodey = data.nodey; //cc.log("update star pos: ", data.nodex, data.nodey)

    this.game.spawnNewStar(nodex, nodey); // 调用 Game 脚本的得分方法

    this.game.gainScore(); // 然后销毁当前星星节点

    this.node.destroy();
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
    data[0] = 4; //消息ID

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
    //cc.log("star dt: ", dt)
    // 每帧判断和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集行为
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
      Global.newStarPos["delete"](Global.newStarKey);
    } // 根据 Game 脚本中的计时器更新星星的透明度
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsImdldEFueVBsYXllckRpc3RhbmNlIiwib25QaWNrZWQiLCJCdW1wZWQiLCJkYXRhIiwibmV3U3RhclBvcyIsImdldCIsIm5ld1N0YXJLZXkiLCJub2RleCIsIm5vZGV5Iiwic3Bhd25OZXdTdGFyIiwiZ2FpblNjb3JlIiwiZGVzdHJveSIsInNlbmRCdW1wTXNnIiwiYnVmZiIsIkFycmF5QnVmZmVyIiwiVWludDMyQXJyYXkiLCJwbGF5ZXJYIiwieCIsInBsYXllclhmbGFnIiwicGxheWVyWSIsInkiLCJwbGF5ZXJZZmxhZyIsInBhcnNlSW50Iiwic3RhclBvcyIsInN0YXJYIiwic3RhclhmbGFnIiwic3RhclkiLCJzdGFyWWZsYWciLCJzZW5kd3NtZXNzYWdlIiwidXBkYXRlIiwiZHQiLCJmcmFtZSIsImhhcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLEtBQUssR0FBR0QsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUUsTUFBTSxHQUFHRixPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBRkosR0FIUDtBQVFM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Q0EsV0FBS3NCLFdBQUw7QUFDQTtBQUNIOztBQUVELFFBQUk5QixNQUFNLENBQUNzQixVQUFQLENBQWtCNEIsR0FBbEIsQ0FBc0JsRCxNQUFNLENBQUN3QixVQUE3QixDQUFKLEVBQTZDO0FBQ3pDLFdBQUtMLFFBQUw7QUFDQW5CLE1BQUFBLE1BQU0sQ0FBQ3NCLFVBQVAsV0FBeUJ0QixNQUFNLENBQUN3QixVQUFoQztBQUNILEtBcEJpQixDQXNCbEI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0g7QUFoSkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCB3c05ldCA9IHJlcXVpcmUoXCJ3c05ldFwiKVxubGV0IEdsb2JhbCA9IHJlcXVpcmUoXCJjb21tb25cIilcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDmmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvlsI/kuo7ov5nkuKrmlbDlgLzml7bvvIzlsLHkvJrlrozmiJDmlLbpm4ZcbiAgICAgICAgcGlja1JhZGl1czogMCxcbiAgICB9LFxuXG4gICAgZ2V0QmF0dGxlT2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXR0bGUoKTtcbiAgICB9LFxuXG4gICAgZ2V0d3NOZXRPYmo6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IHdzTmV0KCk7XG4gICAgfSxcblxuICAgIGdldFBsYXllckRpc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIOagueaNriBwbGF5ZXIg6IqC54K55L2N572u5Yik5pat6Led56a7XG4gICAgICAgIHZhciBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIC8vIOagueaNruS4pOeCueS9jee9ruiuoeeul+S4pOeCueS5i+mXtOi3neemu1xuICAgICAgICB2YXIgZGlzdCA9IHRoaXMubm9kZS5wb3NpdGlvbi5zdWIocGxheWVyUG9zKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIGRpc3Q7XG4gICAgfSxcblxuICAgIGdldEFueVBsYXllckRpc3RhbmNlOiBmdW5jdGlvbigpe1xuXG4gICAgfSxcblxuICAgIG9uUGlja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy/norDmkp7lkI7lj5HpgIHkuIDkuKrmtojmga9cbiAgICAgICAgLy8gdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoMTIpXG4gICAgICAgIC8vIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXG4gICAgICAgIC8vIGRhdGFbMF0gPSA0XG4gICAgICAgIC8vIGRhdGFbMV0gPSAxIC8v5Y2V57qv57uZ5pyN5Yqh5Zmo5Y+R5raI5oGvXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAyOyBpIDw9IGRhdGEubGVuZ3RoLTE7IGkrKykge1xuICAgICAgICAvLyAgICAgZGF0YVtpXSA9IGkgKyAxXG4gICAgICAgIC8vIH1cbiAgICAgICAgR2xvYmFsLkJ1bXBlZCA9IDFcbiAgICAgICAgLy8gdGhpcy5nZXR3c05ldE9iaigpLnNlbmR3c21lc3NhZ2UoZGF0YSlcbiAgICAgICAgLy8g5b2T5pif5pif6KKr5pS26ZuG5pe277yM6LCD55SoIEdhbWUg6ISa5pys5Lit55qE5o6l5Y+j77yM55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXG4gICAgICAgIHZhciBkYXRhID0gR2xvYmFsLm5ld1N0YXJQb3MuZ2V0KEdsb2JhbC5uZXdTdGFyS2V5KVxuICAgICAgICB2YXIgbm9kZXggPSBkYXRhLm5vZGV4XG4gICAgICAgIHZhciBub2RleSA9IGRhdGEubm9kZXlcbiAgICAgICAgLy9jYy5sb2coXCJ1cGRhdGUgc3RhciBwb3M6IFwiLCBkYXRhLm5vZGV4LCBkYXRhLm5vZGV5KVxuICAgICAgICB0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKG5vZGV4LCBub2RleSk7XG4gICAgICAgIC8vIOiwg+eUqCBHYW1lIOiEmuacrOeahOW+l+WIhuaWueazlVxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XG4gICAgICAgIC8vIOeEtuWQjumUgOavgeW9k+WJjeaYn+aYn+iKgueCuVxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvKlxuXHTmkp7lh7vlk43lupRcblx06K+35rGC5raI5oGv57uT5p6E77yaXG5cdFx0MDog5raI5oGvSURcblx0XHQx77ya5raI5oGv6ZW/5bqmIDhcblx0XHQyOiDlsI/nkIN45Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Mzog5bCP55CDeOWdkOagh1xuXHRcdDTvvJrlsI/nkIN55Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Ne+8muWwj+eQg3nlnZDmoIdcblx0XHQ2OiDmmJ/mmJ945Z2Q5qCH5q2j6LSf5qCH5b+XXG5cdFx0Nzog5pif5pifeOWdkOagh1xuXHRcdDjvvJrmmJ/mmJ955Z2Q5qCH5q2j6LSf5qCH5b+XXG4gICAgICAgIDnvvJrmmJ/mmJ955Z2Q5qCHXG4gICAgKi9cbiAgICBzZW5kQnVtcE1zZzogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoNDApXG4gICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXG5cbiAgICAgICAgZGF0YVswXSA9IDQgLy/mtojmga9JRFxuICAgICAgICBkYXRhWzFdID0gOCAvL+a2iOaBr+mVv+W6plxuXG4gICAgICAgIC8v5bCP55CD5L+h5oGvXG4gICAgICAgIHZhciBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwbGF5ZXJYID0gcGxheWVyUG9zLng7XG4gICAgICAgIHZhciBwbGF5ZXJYZmxhZyA9IDFcbiAgICAgICAgaWYgKHBsYXllclggPCAwLjApIHtcbiAgICAgICAgICAgIHBsYXllclhmbGFnID0gMlxuICAgICAgICAgICAgcGxheWVyWCA9IDAuMCAtIHBsYXllclhcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGF5ZXJZID0gcGxheWVyUG9zLnk7XG4gICAgICAgIHZhciBwbGF5ZXJZZmxhZyA9IDFcbiAgICAgICAgaWYgKHBsYXllclkgPCAwLjApIHtcbiAgICAgICAgICAgIHBsYXllcllmbGFnID0gMlxuICAgICAgICAgICAgcGxheWVyWSA9IDAuMCAtIHBsYXllcllcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbMl0gPSBwbGF5ZXJYZmxhZ1xuICAgICAgICBkYXRhWzNdID0gcGFyc2VJbnQocGxheWVyWClcbiAgICAgICAgZGF0YVs0XSA9IHBsYXllcllmbGFnXG4gICAgICAgIGRhdGFbNV0gPSBwYXJzZUludChwbGF5ZXJZKVxuXG4gICAgICAgIC8v5pif5pif5L+h5oGvXG4gICAgICAgIHZhciBzdGFyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBzdGFyWCA9IHN0YXJQb3MueDtcbiAgICAgICAgdmFyIHN0YXJYZmxhZyA9IDFcbiAgICAgICAgaWYgKHN0YXJYIDwgMC4wKSB7XG4gICAgICAgICAgICBzdGFyWGZsYWcgPSAyXG4gICAgICAgICAgICBzdGFyWCA9IDAuMCAtIHN0YXJYXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhclkgPSBzdGFyUG9zLnk7XG4gICAgICAgIHZhciBzdGFyWWZsYWcgPSAxXG4gICAgICAgIGlmIChzdGFyWSA8IDAuMCkge1xuICAgICAgICAgICAgc3RhcllmbGFnID0gMlxuICAgICAgICAgICAgc3RhclkgPSAwLjAgLSBzdGFyWVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YVs2XSA9IHN0YXJYZmxhZ1xuICAgICAgICBkYXRhWzddID0gcGFyc2VJbnQoc3RhclgpXG4gICAgICAgIGRhdGFbOF0gPSBzdGFyWWZsYWdcbiAgICAgICAgZGF0YVs5XSA9IHBhcnNlSW50KHN0YXJZKVxuXG4gICAgICAgIC8vY2MubG9nKFwic2VuZCBidW1wIHN0YXI6IFwiLCBkYXRhWzJdLCBkYXRhWzNdLCBkYXRhWzRdLCBkYXRhWzVdLCBkYXRhWzZdLCBkYXRhWzddLCBkYXRhWzhdLCBkYXRhWzldKVxuICAgICAgICB0aGlzLmdldHdzTmV0T2JqKCkuc2VuZHdzbWVzc2FnZShkYXRhKVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcInN0YXIgZHQ6IFwiLCBkdClcbiAgICAgICAgLy8g5q+P5bin5Yik5pat5ZKM5Li76KeS5LmL6Ze055qE6Led56a75piv5ZCm5bCP5LqO5pS26ZuG6Led56a7XG4gICAgICAgIGlmICh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkgPCB0aGlzLnBpY2tSYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIOiwg+eUqOaUtumbhuihjOS4ulxuICAgICAgICAgICAgaWYgKGR0IDw9IDEuMCkge1xuICAgICAgICAgICAgICAgIGR0ICo9IDEwMC4wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZnJhbWUgPSBwYXJzZUludChkdClcbiAgICAgICAgICAgIHZhciBkaXN0ID0gcGFyc2VJbnQodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpKVxuICAgICAgICAgICAgLy8g5Y+R6YCB5pKe5Ye75pif5pif5LqL5Lu2XG4gICAgICAgICAgICAvL3RoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdEF0dGFja01zZyhmcmFtZSwgZGlzdCk7XG4gICAgICAgICAgICAvL2NjLmxvZyhcInN0YXIgaW5mbzogXCIsIGR0LCBmcmFtZSwgZGlzdClcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1bXBNc2coKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEdsb2JhbC5uZXdTdGFyUG9zLmhhcyhHbG9iYWwubmV3U3RhcktleSkpe1xuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCgpO1xuICAgICAgICAgICAgR2xvYmFsLm5ld1N0YXJQb3MuZGVsZXRlKEdsb2JhbC5uZXdTdGFyS2V5KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDmoLnmja4gR2FtZSDohJrmnKzkuK3nmoTorqHml7blmajmm7TmlrDmmJ/mmJ/nmoTpgI/mmI7luqZcbiAgICAgICAgLy92YXIgb3BhY2l0eVJhdGlvID0gMSAtIHRoaXMuZ2FtZS50aW1lci90aGlzLmdhbWUuc3RhckR1cmF0aW9uO1xuICAgICAgICAvL3ZhciBtaW5PcGFjaXR5ID0gNTA7XG4gICAgICAgIC8vdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH0sXG59KTtcbiJdfQ==
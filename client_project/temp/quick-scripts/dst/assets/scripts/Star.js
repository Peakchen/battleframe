
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
  onPicked: function onPicked(frame, dist) {
    //碰撞后发送一个消息
    // var buff = new ArrayBuffer(12)
    // var data = new Uint32Array(buff)
    // data[0] = 4
    // data[1] = 1 //单纯给服务器发消息
    // for (var i = 2; i <= data.length-1; i++) {
    //     data[i] = i + 1
    // }
    Global.Bumped = 1; // this.getwsNetObj().sendwsmessage(data)
    // 发送撞击星星事件

    this.getBattleObj().postAttackMsg(frame, dist); // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星

    this.game.spawnNewStar(); // 调用 Game 脚本的得分方法

    this.game.gainScore(); // 然后销毁当前星星节点

    this.node.destroy();
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
      var dist = parseInt(this.getPlayerDistance()); //cc.log("star info: ", dt, frame, dist)

      this.onPicked(frame, dist);
      return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uUGlja2VkIiwiZnJhbWUiLCJCdW1wZWQiLCJwb3N0QXR0YWNrTXNnIiwic3Bhd25OZXdTdGFyIiwiZ2FpblNjb3JlIiwiZGVzdHJveSIsInVwZGF0ZSIsImR0IiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlFLE1BQU0sR0FBR0YsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUZKLEdBSFA7QUFRTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFdBQU8sSUFBSVQsTUFBSixFQUFQO0FBQ0gsR0FWSTtBQVlMVSxFQUFBQSxXQUFXLEVBQUUsdUJBQVc7QUFDcEIsV0FBTyxJQUFJUixLQUFKLEVBQVA7QUFDSCxHQWRJO0FBZ0JMUyxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBWTtBQUMzQjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxLQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFdBQWpCLEVBQWhCLENBRjJCLENBRzNCOztBQUNBLFFBQUlDLElBQUksR0FBRyxLQUFLQyxJQUFMLENBQVVDLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCUCxTQUF2QixFQUFrQ1EsR0FBbEMsRUFBWDtBQUNBLFdBQU9KLElBQVA7QUFDSCxHQXRCSTtBQXdCTEssRUFBQUEsUUFBUSxFQUFFLGtCQUFTQyxLQUFULEVBQWdCTixJQUFoQixFQUFzQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FiLElBQUFBLE1BQU0sQ0FBQ29CLE1BQVAsR0FBZ0IsQ0FBaEIsQ0FUNEIsQ0FVNUI7QUFDQTs7QUFDQSxTQUFLZCxZQUFMLEdBQW9CZSxhQUFwQixDQUFrQ0YsS0FBbEMsRUFBeUNOLElBQXpDLEVBWjRCLENBYTVCOztBQUNBLFNBQUtILElBQUwsQ0FBVVksWUFBVixHQWQ0QixDQWU1Qjs7QUFDQSxTQUFLWixJQUFMLENBQVVhLFNBQVYsR0FoQjRCLENBaUI1Qjs7QUFDQSxTQUFLVCxJQUFMLENBQVVVLE9BQVY7QUFDSCxHQTNDSTtBQTZDTEMsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEI7QUFDQTtBQUNBLFFBQUksS0FBS2xCLGlCQUFMLEtBQTJCLEtBQUtILFVBQXBDLEVBQWdEO0FBQzVDO0FBQ0EsVUFBSXFCLEVBQUUsSUFBSSxHQUFWLEVBQWU7QUFDWEEsUUFBQUEsRUFBRSxJQUFJLEtBQU47QUFDSDs7QUFDRCxVQUFJUCxLQUFLLEdBQUdRLFFBQVEsQ0FBQ0QsRUFBRCxDQUFwQjtBQUNBLFVBQUliLElBQUksR0FBR2MsUUFBUSxDQUFDLEtBQUtuQixpQkFBTCxFQUFELENBQW5CLENBTjRDLENBTzVDOztBQUNBLFdBQUtVLFFBQUwsQ0FBY0MsS0FBZCxFQUFxQk4sSUFBckI7QUFDQTtBQUNILEtBYmlCLENBZWxCO0FBQ0E7QUFDQTtBQUNBOztBQUNIO0FBaEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBCYXR0bGUgPSByZXF1aXJlKFwiYmF0dGxlXCIpXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5pif5pif5ZKM5Li76KeS5LmL6Ze055qE6Led56a75bCP5LqO6L+Z5Liq5pWw5YC85pe277yM5bCx5Lya5a6M5oiQ5pS26ZuGXG4gICAgICAgIHBpY2tSYWRpdXM6IDAsXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDmoLnmja4gcGxheWVyIOiKgueCueS9jee9ruWIpOaWrei3neemu1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAvLyDmoLnmja7kuKTngrnkvY3nva7orqHnrpfkuKTngrnkuYvpl7Tot53nprtcbiAgICAgICAgdmFyIGRpc3QgPSB0aGlzLm5vZGUucG9zaXRpb24uc3ViKHBsYXllclBvcykubWFnKCk7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH0sXG5cbiAgICBvblBpY2tlZDogZnVuY3Rpb24oZnJhbWUsIGRpc3QpIHtcbiAgICAgICAgLy/norDmkp7lkI7lj5HpgIHkuIDkuKrmtojmga9cbiAgICAgICAgLy8gdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoMTIpXG4gICAgICAgIC8vIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXG4gICAgICAgIC8vIGRhdGFbMF0gPSA0XG4gICAgICAgIC8vIGRhdGFbMV0gPSAxIC8v5Y2V57qv57uZ5pyN5Yqh5Zmo5Y+R5raI5oGvXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAyOyBpIDw9IGRhdGEubGVuZ3RoLTE7IGkrKykge1xuICAgICAgICAvLyAgICAgZGF0YVtpXSA9IGkgKyAxXG4gICAgICAgIC8vIH1cbiAgICAgICAgR2xvYmFsLkJ1bXBlZCA9IDFcbiAgICAgICAgLy8gdGhpcy5nZXR3c05ldE9iaigpLnNlbmR3c21lc3NhZ2UoZGF0YSlcbiAgICAgICAgLy8g5Y+R6YCB5pKe5Ye75pif5pif5LqL5Lu2XG4gICAgICAgIHRoaXMuZ2V0QmF0dGxlT2JqKCkucG9zdEF0dGFja01zZyhmcmFtZSwgZGlzdCk7XG4gICAgICAgIC8vIOW9k+aYn+aYn+iiq+aUtumbhuaXtu+8jOiwg+eUqCBHYW1lIOiEmuacrOS4reeahOaOpeWPo++8jOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKCk7XG4gICAgICAgIC8vIOiwg+eUqCBHYW1lIOiEmuacrOeahOW+l+WIhuaWueazlVxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XG4gICAgICAgIC8vIOeEtuWQjumUgOavgeW9k+WJjeaYn+aYn+iKgueCuVxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL2NjLmxvZyhcInN0YXIgZHQ6IFwiLCBkdClcbiAgICAgICAgLy8g5q+P5bin5Yik5pat5ZKM5Li76KeS5LmL6Ze055qE6Led56a75piv5ZCm5bCP5LqO5pS26ZuG6Led56a7XG4gICAgICAgIGlmICh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkgPCB0aGlzLnBpY2tSYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIOiwg+eUqOaUtumbhuihjOS4ulxuICAgICAgICAgICAgaWYgKGR0IDw9IDEuMCkge1xuICAgICAgICAgICAgICAgIGR0ICo9IDEwMC4wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZnJhbWUgPSBwYXJzZUludChkdClcbiAgICAgICAgICAgIHZhciBkaXN0ID0gcGFyc2VJbnQodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpKVxuICAgICAgICAgICAgLy9jYy5sb2coXCJzdGFyIGluZm86IFwiLCBkdCwgZnJhbWUsIGRpc3QpXG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKGZyYW1lLCBkaXN0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIC8vdmFyIG9wYWNpdHlSYXRpbyA9IDEgLSB0aGlzLmdhbWUudGltZXIvdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgLy92YXIgbWluT3BhY2l0eSA9IDUwO1xuICAgICAgICAvL3RoaXMubm9kZS5vcGFjaXR5ID0gbWluT3BhY2l0eSArIE1hdGguZmxvb3Iob3BhY2l0eVJhdGlvICogKDI1NSAtIG1pbk9wYWNpdHkpKTtcbiAgICB9LFxufSk7XG4iXX0=
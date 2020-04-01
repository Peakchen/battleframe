
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
    var buff = new ArrayBuffer(10);
    var data = new Uint16Array(buff);
    data[0] = 4;

    for (var i = 1; i <= data.length - 1; i++) {
      data[i] = i + 1;
    }

    this.getwsNetObj().sendwsmessage(data); // 发送撞击星星事件

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
      var dist = parseInt(this.getPlayerDistance());
      cc.log("star info: ", dt, frame, dist);
      this.onPicked(frame, dist);
      return;
    } // 根据 Game 脚本中的计时器更新星星的透明度


    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwid3NOZXQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRCYXR0bGVPYmoiLCJnZXR3c05ldE9iaiIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uUGlja2VkIiwiZnJhbWUiLCJidWZmIiwiQXJyYXlCdWZmZXIiLCJkYXRhIiwiVWludDE2QXJyYXkiLCJpIiwibGVuZ3RoIiwic2VuZHdzbWVzc2FnZSIsInBvc3RBdHRhY2tNc2ciLCJzcGF3bk5ld1N0YXIiLCJnYWluU2NvcmUiLCJkZXN0cm95IiwidXBkYXRlIiwiZHQiLCJwYXJzZUludCIsImxvZyIsIm9wYWNpdHlSYXRpbyIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwibWluT3BhY2l0eSIsIm9wYWNpdHkiLCJNYXRoIiwiZmxvb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFGSixHQUhQO0FBUUxDLEVBQUFBLFlBQVksRUFBRSx3QkFBVztBQUNyQixXQUFPLElBQUlSLE1BQUosRUFBUDtBQUNILEdBVkk7QUFZTFMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFdBQU8sSUFBSVAsS0FBSixFQUFQO0FBQ0gsR0FkSTtBQWdCTFEsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVk7QUFDM0I7QUFDQSxRQUFJQyxTQUFTLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxXQUFqQixFQUFoQixDQUYyQixDQUczQjs7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CQyxHQUFuQixDQUF1QlAsU0FBdkIsRUFBa0NRLEdBQWxDLEVBQVg7QUFDQSxXQUFPSixJQUFQO0FBQ0gsR0F0Qkk7QUF3QkxLLEVBQUFBLFFBQVEsRUFBRSxrQkFBU0MsS0FBVCxFQUFnQk4sSUFBaEIsRUFBc0I7QUFDNUI7QUFDQSxRQUFJTyxJQUFJLEdBQUcsSUFBSUMsV0FBSixDQUFnQixFQUFoQixDQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLElBQUlDLFdBQUosQ0FBZ0JILElBQWhCLENBQVg7QUFDQUUsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVLENBQVY7O0FBQ0EsU0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJRixJQUFJLENBQUNHLE1BQUwsR0FBWSxDQUFqQyxFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQ0YsTUFBQUEsSUFBSSxDQUFDRSxDQUFELENBQUosR0FBVUEsQ0FBQyxHQUFHLENBQWQ7QUFDSDs7QUFDRCxTQUFLakIsV0FBTCxHQUFtQm1CLGFBQW5CLENBQWlDSixJQUFqQyxFQVI0QixDQVU1Qjs7QUFDQSxTQUFLaEIsWUFBTCxHQUFvQnFCLGFBQXBCLENBQWtDUixLQUFsQyxFQUF5Q04sSUFBekMsRUFYNEIsQ0FZNUI7O0FBQ0EsU0FBS0gsSUFBTCxDQUFVa0IsWUFBVixHQWI0QixDQWM1Qjs7QUFDQSxTQUFLbEIsSUFBTCxDQUFVbUIsU0FBVixHQWY0QixDQWdCNUI7O0FBQ0EsU0FBS2YsSUFBTCxDQUFVZ0IsT0FBVjtBQUNILEdBMUNJO0FBNENMQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0EsUUFBSSxLQUFLeEIsaUJBQUwsS0FBMkIsS0FBS0gsVUFBcEMsRUFBZ0Q7QUFDNUM7QUFDQSxVQUFJMkIsRUFBRSxJQUFJLEdBQVYsRUFBZTtBQUNYQSxRQUFBQSxFQUFFLElBQUksS0FBTjtBQUNIOztBQUNELFVBQUliLEtBQUssR0FBR2MsUUFBUSxDQUFDRCxFQUFELENBQXBCO0FBQ0EsVUFBSW5CLElBQUksR0FBR29CLFFBQVEsQ0FBQyxLQUFLekIsaUJBQUwsRUFBRCxDQUFuQjtBQUNBUCxNQUFBQSxFQUFFLENBQUNpQyxHQUFILENBQU8sYUFBUCxFQUFzQkYsRUFBdEIsRUFBMEJiLEtBQTFCLEVBQWlDTixJQUFqQztBQUNBLFdBQUtLLFFBQUwsQ0FBY0MsS0FBZCxFQUFxQk4sSUFBckI7QUFDQTtBQUNILEtBYmlCLENBZWxCOzs7QUFDQSxRQUFJc0IsWUFBWSxHQUFHLElBQUksS0FBS3pCLElBQUwsQ0FBVTBCLEtBQVYsR0FBZ0IsS0FBSzFCLElBQUwsQ0FBVTJCLFlBQWpEO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsU0FBS3hCLElBQUwsQ0FBVXlCLE9BQVYsR0FBb0JELFVBQVUsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdOLFlBQVksSUFBSSxNQUFNRyxVQUFWLENBQXZCLENBQWpDO0FBQ0g7QUEvREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmxldCB3c05ldCA9IHJlcXVpcmUoXCJ3c05ldFwiKVxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5pif5pif5ZKM5Li76KeS5LmL6Ze055qE6Led56a75bCP5LqO6L+Z5Liq5pWw5YC85pe277yM5bCx5Lya5a6M5oiQ5pS26ZuGXG4gICAgICAgIHBpY2tSYWRpdXM6IDAsXG4gICAgfSxcblxuICAgIGdldEJhdHRsZU9iajogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmF0dGxlKCk7XG4gICAgfSxcblxuICAgIGdldHdzTmV0T2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3c05ldCgpO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDmoLnmja4gcGxheWVyIOiKgueCueS9jee9ruWIpOaWrei3neemu1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAvLyDmoLnmja7kuKTngrnkvY3nva7orqHnrpfkuKTngrnkuYvpl7Tot53nprtcbiAgICAgICAgdmFyIGRpc3QgPSB0aGlzLm5vZGUucG9zaXRpb24uc3ViKHBsYXllclBvcykubWFnKCk7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH0sXG5cbiAgICBvblBpY2tlZDogZnVuY3Rpb24oZnJhbWUsIGRpc3QpIHtcbiAgICAgICAgLy/norDmkp7lkI7lj5HpgIHkuIDkuKrmtojmga9cbiAgICAgICAgdmFyIGJ1ZmYgPSBuZXcgQXJyYXlCdWZmZXIoMTApXG4gICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmYpXG4gICAgICAgIGRhdGFbMF0gPSA0XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGRhdGEubGVuZ3RoLTE7IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9IGkgKyAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXR3c05ldE9iaigpLnNlbmR3c21lc3NhZ2UoZGF0YSlcblxuICAgICAgICAvLyDlj5HpgIHmkp7lh7vmmJ/mmJ/kuovku7ZcbiAgICAgICAgdGhpcy5nZXRCYXR0bGVPYmooKS5wb3N0QXR0YWNrTXNnKGZyYW1lLCBkaXN0KTtcbiAgICAgICAgLy8g5b2T5pif5pif6KKr5pS26ZuG5pe277yM6LCD55SoIEdhbWUg6ISa5pys5Lit55qE5o6l5Y+j77yM55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXG4gICAgICAgIHRoaXMuZ2FtZS5zcGF3bk5ld1N0YXIoKTtcbiAgICAgICAgLy8g6LCD55SoIEdhbWUg6ISa5pys55qE5b6X5YiG5pa55rOVXG4gICAgICAgIHRoaXMuZ2FtZS5nYWluU2NvcmUoKTtcbiAgICAgICAgLy8g54S25ZCO6ZSA5q+B5b2T5YmN5pif5pif6IqC54K5XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vY2MubG9nKFwic3RhciBkdDogXCIsIGR0KVxuICAgICAgICAvLyDmr4/luKfliKTmlq3lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICBpZiAoZHQgPD0gMS4wKSB7XG4gICAgICAgICAgICAgICAgZHQgKj0gMTAwLjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmcmFtZSA9IHBhcnNlSW50KGR0KVxuICAgICAgICAgICAgdmFyIGRpc3QgPSBwYXJzZUludCh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkpXG4gICAgICAgICAgICBjYy5sb2coXCJzdGFyIGluZm86IFwiLCBkdCwgZnJhbWUsIGRpc3QpXG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKGZyYW1lLCBkaXN0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyL3RoaXMuZ2FtZS5zdGFyRHVyYXRpb247XG4gICAgICAgIHZhciBtaW5PcGFjaXR5ID0gNTA7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gbWluT3BhY2l0eSArIE1hdGguZmxvb3Iob3BhY2l0eVJhdGlvICogKDI1NSAtIG1pbk9wYWNpdHkpKTtcbiAgICB9LFxufSk7XG4iXX0=
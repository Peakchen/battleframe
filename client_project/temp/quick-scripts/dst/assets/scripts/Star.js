
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

cc.Class({
  "extends": cc.Component,
  properties: {
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    pickRadius: 0
  },
  getBattleObj: function getBattleObj() {
    return new Battle();
  },
  getPlayerDistance: function getPlayerDistance() {
    // 根据 player 节点位置判断距离
    var playerPos = this.game.player.getPosition(); // 根据两点位置计算两点之间距离

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked(frame, dist) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJCYXR0bGUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwaWNrUmFkaXVzIiwiZ2V0QmF0dGxlT2JqIiwiZ2V0UGxheWVyRGlzdGFuY2UiLCJwbGF5ZXJQb3MiLCJnYW1lIiwicGxheWVyIiwiZ2V0UG9zaXRpb24iLCJkaXN0Iiwibm9kZSIsInBvc2l0aW9uIiwic3ViIiwibWFnIiwib25QaWNrZWQiLCJmcmFtZSIsInBvc3RBdHRhY2tNc2ciLCJzcGF3bk5ld1N0YXIiLCJnYWluU2NvcmUiLCJkZXN0cm95IiwidXBkYXRlIiwiZHQiLCJwYXJzZUludCIsImxvZyIsIm9wYWNpdHlSYXRpbyIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwibWluT3BhY2l0eSIsIm9wYWNpdHkiLCJNYXRoIiwiZmxvb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBRkosR0FIUDtBQVFMQyxFQUFBQSxZQUFZLEVBQUUsd0JBQVc7QUFDckIsV0FBTyxJQUFJUCxNQUFKLEVBQVA7QUFDSCxHQVZJO0FBWUxRLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsV0FBakIsRUFBaEIsQ0FGMkIsQ0FHM0I7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsR0FBbkIsQ0FBdUJQLFNBQXZCLEVBQWtDUSxHQUFsQyxFQUFYO0FBQ0EsV0FBT0osSUFBUDtBQUNILEdBbEJJO0FBb0JMSyxFQUFBQSxRQUFRLEVBQUUsa0JBQVNDLEtBQVQsRUFBZ0JOLElBQWhCLEVBQXNCO0FBQzVCO0FBQ0EsU0FBS04sWUFBTCxHQUFvQmEsYUFBcEIsQ0FBa0NELEtBQWxDLEVBQXlDTixJQUF6QyxFQUY0QixDQUc1Qjs7QUFDQSxTQUFLSCxJQUFMLENBQVVXLFlBQVYsR0FKNEIsQ0FLNUI7O0FBQ0EsU0FBS1gsSUFBTCxDQUFVWSxTQUFWLEdBTjRCLENBTzVCOztBQUNBLFNBQUtSLElBQUwsQ0FBVVMsT0FBVjtBQUNILEdBN0JJO0FBK0JMQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0EsUUFBSSxLQUFLakIsaUJBQUwsS0FBMkIsS0FBS0YsVUFBcEMsRUFBZ0Q7QUFDNUM7QUFDQSxVQUFJbUIsRUFBRSxJQUFJLEdBQVYsRUFBZTtBQUNYQSxRQUFBQSxFQUFFLElBQUksS0FBTjtBQUNIOztBQUNELFVBQUlOLEtBQUssR0FBR08sUUFBUSxDQUFDRCxFQUFELENBQXBCO0FBQ0EsVUFBSVosSUFBSSxHQUFHYSxRQUFRLENBQUMsS0FBS2xCLGlCQUFMLEVBQUQsQ0FBbkI7QUFDQU4sTUFBQUEsRUFBRSxDQUFDeUIsR0FBSCxDQUFPLGFBQVAsRUFBc0JGLEVBQXRCLEVBQTBCTixLQUExQixFQUFpQ04sSUFBakM7QUFDQSxXQUFLSyxRQUFMLENBQWNDLEtBQWQsRUFBcUJOLElBQXJCO0FBQ0E7QUFDSCxLQWJpQixDQWVsQjs7O0FBQ0EsUUFBSWUsWUFBWSxHQUFHLElBQUksS0FBS2xCLElBQUwsQ0FBVW1CLEtBQVYsR0FBZ0IsS0FBS25CLElBQUwsQ0FBVW9CLFlBQWpEO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsU0FBS2pCLElBQUwsQ0FBVWtCLE9BQVYsR0FBb0JELFVBQVUsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdOLFlBQVksSUFBSSxNQUFNRyxVQUFWLENBQXZCLENBQWpDO0FBQ0g7QUFsREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEJhdHRsZSA9IHJlcXVpcmUoXCJiYXR0bGVcIilcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDmmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvlsI/kuo7ov5nkuKrmlbDlgLzml7bvvIzlsLHkvJrlrozmiJDmlLbpm4ZcbiAgICAgICAgcGlja1JhZGl1czogMCxcbiAgICB9LFxuXG4gICAgZ2V0QmF0dGxlT2JqOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXR0bGUoKTtcbiAgICB9LFxuXG4gICAgZ2V0UGxheWVyRGlzdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g5qC55o2uIHBsYXllciDoioLngrnkvY3nva7liKTmlq3ot53nprtcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8g5qC55o2u5Lik54K55L2N572u6K6h566X5Lik54K55LmL6Ze06Led56a7XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9LFxuXG4gICAgb25QaWNrZWQ6IGZ1bmN0aW9uKGZyYW1lLCBkaXN0KSB7XG4gICAgICAgIC8vIOWPkemAgeaSnuWHu+aYn+aYn+S6i+S7tlxuICAgICAgICB0aGlzLmdldEJhdHRsZU9iaigpLnBvc3RBdHRhY2tNc2coZnJhbWUsIGRpc3QpO1xuICAgICAgICAvLyDlvZPmmJ/mmJ/ooqvmlLbpm4bml7bvvIzosIPnlKggR2FtZSDohJrmnKzkuK3nmoTmjqXlj6PvvIznlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3RhcigpO1xuICAgICAgICAvLyDosIPnlKggR2FtZSDohJrmnKznmoTlvpfliIbmlrnms5VcbiAgICAgICAgdGhpcy5nYW1lLmdhaW5TY29yZSgpO1xuICAgICAgICAvLyDnhLblkI7plIDmr4HlvZPliY3mmJ/mmJ/oioLngrlcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgLy9jYy5sb2coXCJzdGFyIGR0OiBcIiwgZHQpXG4gICAgICAgIC8vIOavj+W4p+WIpOaWreWSjOS4u+inkuS5i+mXtOeahOi3neemu+aYr+WQpuWwj+S6juaUtumbhui3neemu1xuICAgICAgICBpZiAodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpIDwgdGhpcy5waWNrUmFkaXVzKSB7XG4gICAgICAgICAgICAvLyDosIPnlKjmlLbpm4booYzkuLpcbiAgICAgICAgICAgIGlmIChkdCA8PSAxLjApIHtcbiAgICAgICAgICAgICAgICBkdCAqPSAxMDAuMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZyYW1lID0gcGFyc2VJbnQoZHQpXG4gICAgICAgICAgICB2YXIgZGlzdCA9IHBhcnNlSW50KHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSlcbiAgICAgICAgICAgIGNjLmxvZyhcInN0YXIgaW5mbzogXCIsIGR0LCBmcmFtZSwgZGlzdClcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQoZnJhbWUsIGRpc3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDmoLnmja4gR2FtZSDohJrmnKzkuK3nmoTorqHml7blmajmm7TmlrDmmJ/mmJ/nmoTpgI/mmI7luqZcbiAgICAgICAgdmFyIG9wYWNpdHlSYXRpbyA9IDEgLSB0aGlzLmdhbWUudGltZXIvdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgdmFyIG1pbk9wYWNpdHkgPSA1MDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH0sXG59KTtcbiJdfQ==
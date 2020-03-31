
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/api.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd36e5DJLYRPSYxoKddtNFw3', 'api');
// scripts/api.js

"use strict";

cc.Class({
  "extends": cc.Component,
  realrnd: function realrnd(seed) {
    seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数: https://www.zhihu.com/question/22818104

    return seed / 233280.0;
  },
  Rand: function Rand(number, seed) {
    //today = new Date(); 
    //seed = today.getTime();
    return Math.ceil(this.realrnd(seed) * number);
  },
  // is samed to Math.random
  RandOne: function RandOne(seed) {
    return Math.ceil(this.realrnd(seed) * 9999.0) / 10000.0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYXBpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJyZWFscm5kIiwic2VlZCIsIlJhbmQiLCJudW1iZXIiLCJNYXRoIiwiY2VpbCIsIlJhbmRPbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLE9BQU8sRUFBRSxpQkFBVUMsSUFBVixFQUFnQjtBQUNyQkEsSUFBQUEsSUFBSSxHQUFHLENBQUVBLElBQUksR0FBRyxJQUFQLEdBQWMsS0FBaEIsSUFBMEIsTUFBakMsQ0FEcUIsQ0FDb0I7O0FBQ3pDLFdBQU9BLElBQUksR0FBSyxRQUFoQjtBQUNILEdBTkk7QUFRTEMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLE1BQVYsRUFBa0JGLElBQWxCLEVBQXdCO0FBQzFCO0FBQ0E7QUFDQSxXQUFPRyxJQUFJLENBQUNDLElBQUwsQ0FBVyxLQUFLTCxPQUFMLENBQWNDLElBQWQsSUFBdUJFLE1BQWxDLENBQVA7QUFDSCxHQVpJO0FBY0w7QUFDQUcsRUFBQUEsT0FBTyxFQUFFLGlCQUFTTCxJQUFULEVBQWU7QUFDcEIsV0FBT0csSUFBSSxDQUFDQyxJQUFMLENBQVcsS0FBS0wsT0FBTCxDQUFjQyxJQUFkLElBQXVCLE1BQWxDLElBQTJDLE9BQWxEO0FBQ0g7QUFqQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHJlYWxybmQ6IGZ1bmN0aW9uKCBzZWVkICl7XHJcbiAgICAgICAgc2VlZCA9ICggc2VlZCAqIDkzMDEgKyA0OTI5NyApICUgMjMzMjgwOyAvL+S4uuS9leS9v+eUqOi/meS4ieS4quaVsDogaHR0cHM6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIyODE4MTA0XHJcbiAgICAgICAgcmV0dXJuIHNlZWQgLyAoIDIzMzI4MC4wICk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhbmQ6IGZ1bmN0aW9uKCBudW1iZXIsIHNlZWQgKXtcclxuICAgICAgICAvL3RvZGF5ID0gbmV3IERhdGUoKTsgXHJcbiAgICAgICAgLy9zZWVkID0gdG9kYXkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoIHRoaXMucmVhbHJuZCggc2VlZCApICogbnVtYmVyICk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGlzIHNhbWVkIHRvIE1hdGgucmFuZG9tXHJcbiAgICBSYW5kT25lOiBmdW5jdGlvbihzZWVkKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCggdGhpcy5yZWFscm5kKCBzZWVkICkgKiA5OTk5LjAgKS8xMDAwMC4wO1xyXG4gICAgfVxyXG59KSJdfQ==
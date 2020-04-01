
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '134b45CQE9DKqR6yRMNUY1V', 'common');
// scripts/common.js

"use strict";

module.exports = {
  Addr: "localhost:13001",
  wsAddr: "ws://localhost:13001/ws",
  randseed: null,
  starPosRandseed: null,
  starPosRandN: null,
  ws: null,
  ioSocket: null
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFFYkMsRUFBQUEsSUFBSSxFQUFFLGlCQUZPO0FBR2JDLEVBQUFBLE1BQU0sRUFBRSx5QkFISztBQUliQyxFQUFBQSxRQUFRLEVBQUcsSUFKRTtBQU1iQyxFQUFBQSxlQUFlLEVBQUUsSUFOSjtBQU9iQyxFQUFBQSxZQUFZLEVBQUUsSUFQRDtBQVNiQyxFQUFBQSxFQUFFLEVBQUUsSUFUUztBQVViQyxFQUFBQSxRQUFRLEVBQUU7QUFWRyxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgQWRkcjogXCJsb2NhbGhvc3Q6MTMwMDFcIixcclxuICAgIHdzQWRkcjogXCJ3czovL2xvY2FsaG9zdDoxMzAwMS93c1wiLFxyXG4gICAgcmFuZHNlZWQgOiBudWxsLFxyXG5cclxuICAgIHN0YXJQb3NSYW5kc2VlZDogbnVsbCxcclxuICAgIHN0YXJQb3NSYW5kTjogbnVsbCxcclxuXHJcbiAgICB3czogbnVsbCxcclxuICAgIGlvU29ja2V0OiBudWxsXHJcbn07Il19
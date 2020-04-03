
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
  // addr
  Addr: "localhost:13001",
  wsAddr: "ws://localhost:13001/ws",
  //rand
  randseed: null,
  starPosRandseed: null,
  starPosRandN: null,
  //socket
  ws: null,
  ioSocket: null,
  //player data
  PlayerMap: null,
  // 
  FirstLogin: null,
  //1:表示首次
  // messag define
  MID_login: 1,
  MID_logout: 2,
  MID_move: 3,
  // 
  Bumped: null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyTWFwIiwiRmlyc3RMb2dpbiIsIk1JRF9sb2dpbiIsIk1JRF9sb2dvdXQiLCJNSURfbW92ZSIsIkJ1bXBlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGlCQUZPO0FBR2JDLEVBQUFBLE1BQU0sRUFBRSx5QkFISztBQUtiO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRyxJQU5FO0FBT2JDLEVBQUFBLGVBQWUsRUFBRSxJQVBKO0FBUWJDLEVBQUFBLFlBQVksRUFBRSxJQVJEO0FBVWI7QUFDQUMsRUFBQUEsRUFBRSxFQUFFLElBWFM7QUFZYkMsRUFBQUEsUUFBUSxFQUFFLElBWkc7QUFjYjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsSUFmRTtBQWlCYjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsSUFsQkM7QUFrQks7QUFFbEI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBckJFO0FBc0JiQyxFQUFBQSxVQUFVLEVBQUUsQ0F0QkM7QUF1QmJDLEVBQUFBLFFBQVEsRUFBRSxDQXZCRztBQXlCYjtBQUNBQyxFQUFBQSxNQUFNLEVBQUU7QUExQkssQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gYWRkclxyXG4gICAgQWRkcjogXCJsb2NhbGhvc3Q6MTMwMDFcIixcclxuICAgIHdzQWRkcjogXCJ3czovL2xvY2FsaG9zdDoxMzAwMS93c1wiLFxyXG5cclxuICAgIC8vcmFuZFxyXG4gICAgcmFuZHNlZWQgOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmRzZWVkOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmROOiBudWxsLFxyXG5cclxuICAgIC8vc29ja2V0XHJcbiAgICB3czogbnVsbCxcclxuICAgIGlvU29ja2V0OiBudWxsLFxyXG5cclxuICAgIC8vcGxheWVyIGRhdGFcclxuICAgIFBsYXllck1hcDogbnVsbCxcclxuICAgIFxyXG4gICAgLy8gXHJcbiAgICBGaXJzdExvZ2luOiBudWxsLCAvLzE66KGo56S66aaW5qyhXHJcblxyXG4gICAgLy8gbWVzc2FnIGRlZmluZVxyXG4gICAgTUlEX2xvZ2luOiAxLFxyXG4gICAgTUlEX2xvZ291dDogMixcclxuICAgIE1JRF9tb3ZlOiAzLFxyXG5cclxuICAgIC8vIFxyXG4gICAgQnVtcGVkOiBudWxsXHJcbn07Il19

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
  PlayerSessionMap: null,
  NewplayerMap: null,
  //同屏玩家具体数据
  newPlayerIds: null,
  //同屏玩家session id
  DelPlayerIds: null,
  //同屏下限玩家
  // 
  FirstLogin: null,
  //1:表示首次
  // messag define
  MID_login: 1,
  MID_logout: 2,
  MID_move: 3,
  MID_Bump: 4,
  MID_HeartBeat: 5,
  MID_StarBorn: 6,
  MID_GM: 7,
  //是否碰撞 
  Bumped: null,
  //星星数据
  newStarKey: "Star",
  newStarPos: null,
  //测试
  test: null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIkZpcnN0TG9naW4iLCJNSURfbG9naW4iLCJNSURfbG9nb3V0IiwiTUlEX21vdmUiLCJNSURfQnVtcCIsIk1JRF9IZWFydEJlYXQiLCJNSURfU3RhckJvcm4iLCJNSURfR00iLCJCdW1wZWQiLCJuZXdTdGFyS2V5IiwibmV3U3RhclBvcyIsInRlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxpQkFGTztBQUdiQyxFQUFBQSxNQUFNLEVBQUUseUJBSEs7QUFLYjtBQUNBQyxFQUFBQSxRQUFRLEVBQUcsSUFORTtBQU9iQyxFQUFBQSxlQUFlLEVBQUUsSUFQSjtBQVFiQyxFQUFBQSxZQUFZLEVBQUUsSUFSRDtBQVViO0FBQ0FDLEVBQUFBLEVBQUUsRUFBRSxJQVhTO0FBWWJDLEVBQUFBLFFBQVEsRUFBRSxJQVpHO0FBY2I7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFmTDtBQWdCYkMsRUFBQUEsWUFBWSxFQUFFLElBaEJEO0FBZ0JPO0FBQ3BCQyxFQUFBQSxZQUFZLEVBQUUsSUFqQkQ7QUFpQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWxCRDtBQWtCTztBQUVwQjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsSUFyQkM7QUFxQks7QUFFbEI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBeEJFO0FBeUJiQyxFQUFBQSxVQUFVLEVBQUUsQ0F6QkM7QUEwQmJDLEVBQUFBLFFBQVEsRUFBRSxDQTFCRztBQTJCYkMsRUFBQUEsUUFBUSxFQUFFLENBM0JHO0FBNEJiQyxFQUFBQSxhQUFhLEVBQUUsQ0E1QkY7QUE2QmJDLEVBQUFBLFlBQVksRUFBRSxDQTdCRDtBQThCYkMsRUFBQUEsTUFBTSxFQUFFLENBOUJLO0FBZ0NiO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxJQWpDSztBQW1DYjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsTUFwQ0M7QUFxQ2JDLEVBQUFBLFVBQVUsRUFBRSxJQXJDQztBQXVDYjtBQUNBQyxFQUFBQSxJQUFJLEVBQUU7QUF4Q08sQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gYWRkclxyXG4gICAgQWRkcjogXCJsb2NhbGhvc3Q6MTMwMDFcIixcclxuICAgIHdzQWRkcjogXCJ3czovL2xvY2FsaG9zdDoxMzAwMS93c1wiLFxyXG5cclxuICAgIC8vcmFuZFxyXG4gICAgcmFuZHNlZWQgOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmRzZWVkOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmROOiBudWxsLFxyXG5cclxuICAgIC8vc29ja2V0XHJcbiAgICB3czogbnVsbCxcclxuICAgIGlvU29ja2V0OiBudWxsLFxyXG5cclxuICAgIC8vcGxheWVyIGRhdGFcclxuICAgIFBsYXllclNlc3Npb25NYXA6IG51bGwsXHJcbiAgICBOZXdwbGF5ZXJNYXA6IG51bGwsIC8v5ZCM5bGP546p5a625YW35L2T5pWw5o2uXHJcbiAgICBuZXdQbGF5ZXJJZHM6IG51bGwsIC8v5ZCM5bGP546p5a62c2Vzc2lvbiBpZFxyXG4gICAgRGVsUGxheWVySWRzOiBudWxsLCAvL+WQjOWxj+S4i+mZkOeOqeWutlxyXG5cclxuICAgIC8vIFxyXG4gICAgRmlyc3RMb2dpbjogbnVsbCwgLy8xOuihqOekuummluasoVxyXG5cclxuICAgIC8vIG1lc3NhZyBkZWZpbmVcclxuICAgIE1JRF9sb2dpbjogMSxcclxuICAgIE1JRF9sb2dvdXQ6IDIsXHJcbiAgICBNSURfbW92ZTogMyxcclxuICAgIE1JRF9CdW1wOiA0LFxyXG4gICAgTUlEX0hlYXJ0QmVhdDogNSxcclxuICAgIE1JRF9TdGFyQm9ybjogNixcclxuICAgIE1JRF9HTTogNyxcclxuXHJcbiAgICAvL+aYr+WQpueisOaSniBcclxuICAgIEJ1bXBlZDogbnVsbCxcclxuXHJcbiAgICAvL+aYn+aYn+aVsOaNrlxyXG4gICAgbmV3U3RhcktleTogXCJTdGFyXCIsXHJcbiAgICBuZXdTdGFyUG9zOiBudWxsLFxyXG5cclxuICAgIC8v5rWL6K+VXHJcbiAgICB0ZXN0OiBudWxsXHJcbn07Il19
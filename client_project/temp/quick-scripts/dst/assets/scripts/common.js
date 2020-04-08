
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIkZpcnN0TG9naW4iLCJNSURfbG9naW4iLCJNSURfbG9nb3V0IiwiTUlEX21vdmUiLCJNSURfQnVtcCIsIk1JRF9IZWFydEJlYXQiLCJCdW1wZWQiLCJuZXdTdGFyS2V5IiwibmV3U3RhclBvcyIsInRlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxpQkFGTztBQUdiQyxFQUFBQSxNQUFNLEVBQUUseUJBSEs7QUFLYjtBQUNBQyxFQUFBQSxRQUFRLEVBQUcsSUFORTtBQU9iQyxFQUFBQSxlQUFlLEVBQUUsSUFQSjtBQVFiQyxFQUFBQSxZQUFZLEVBQUUsSUFSRDtBQVViO0FBQ0FDLEVBQUFBLEVBQUUsRUFBRSxJQVhTO0FBWWJDLEVBQUFBLFFBQVEsRUFBRSxJQVpHO0FBY2I7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFmTDtBQWdCYkMsRUFBQUEsWUFBWSxFQUFFLElBaEJEO0FBZ0JPO0FBQ3BCQyxFQUFBQSxZQUFZLEVBQUUsSUFqQkQ7QUFpQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWxCRDtBQWtCTztBQUVwQjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsSUFyQkM7QUFxQks7QUFFbEI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBeEJFO0FBeUJiQyxFQUFBQSxVQUFVLEVBQUUsQ0F6QkM7QUEwQmJDLEVBQUFBLFFBQVEsRUFBRSxDQTFCRztBQTJCYkMsRUFBQUEsUUFBUSxFQUFFLENBM0JHO0FBNEJiQyxFQUFBQSxhQUFhLEVBQUUsQ0E1QkY7QUE4QmI7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLElBL0JLO0FBaUNiO0FBQ0FDLEVBQUFBLFVBQVUsRUFBRSxNQWxDQztBQW1DYkMsRUFBQUEsVUFBVSxFQUFFLElBbkNDO0FBcUNiO0FBQ0FDLEVBQUFBLElBQUksRUFBRTtBQXRDTyxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyBhZGRyXHJcbiAgICBBZGRyOiBcImxvY2FsaG9zdDoxMzAwMVwiLFxyXG4gICAgd3NBZGRyOiBcIndzOi8vbG9jYWxob3N0OjEzMDAxL3dzXCIsXHJcblxyXG4gICAgLy9yYW5kXHJcbiAgICByYW5kc2VlZCA6IG51bGwsXHJcbiAgICBzdGFyUG9zUmFuZHNlZWQ6IG51bGwsXHJcbiAgICBzdGFyUG9zUmFuZE46IG51bGwsXHJcblxyXG4gICAgLy9zb2NrZXRcclxuICAgIHdzOiBudWxsLFxyXG4gICAgaW9Tb2NrZXQ6IG51bGwsXHJcblxyXG4gICAgLy9wbGF5ZXIgZGF0YVxyXG4gICAgUGxheWVyU2Vzc2lvbk1hcDogbnVsbCxcclxuICAgIE5ld3BsYXllck1hcDogbnVsbCwgLy/lkIzlsY/njqnlrrblhbfkvZPmlbDmja5cclxuICAgIG5ld1BsYXllcklkczogbnVsbCwgLy/lkIzlsY/njqnlrrZzZXNzaW9uIGlkXHJcbiAgICBEZWxQbGF5ZXJJZHM6IG51bGwsIC8v5ZCM5bGP5LiL6ZmQ546p5a62XHJcblxyXG4gICAgLy8gXHJcbiAgICBGaXJzdExvZ2luOiBudWxsLCAvLzE66KGo56S66aaW5qyhXHJcblxyXG4gICAgLy8gbWVzc2FnIGRlZmluZVxyXG4gICAgTUlEX2xvZ2luOiAxLFxyXG4gICAgTUlEX2xvZ291dDogMixcclxuICAgIE1JRF9tb3ZlOiAzLFxyXG4gICAgTUlEX0J1bXA6IDQsXHJcbiAgICBNSURfSGVhcnRCZWF0OiA1LFxyXG5cclxuICAgIC8v5piv5ZCm56Kw5pKeIFxyXG4gICAgQnVtcGVkOiBudWxsLFxyXG5cclxuICAgIC8v5pif5pif5pWw5o2uXHJcbiAgICBuZXdTdGFyS2V5OiBcIlN0YXJcIixcclxuICAgIG5ld1N0YXJQb3M6IG51bGwsXHJcblxyXG4gICAgLy/mtYvor5VcclxuICAgIHRlc3Q6IG51bGxcclxufTsiXX0=
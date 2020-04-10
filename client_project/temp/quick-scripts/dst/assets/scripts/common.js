
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
  mySessionId: null,
  //当前客户端id
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
  MID_Online4Other: 8,
  MID_Register: 9,
  MID_SyncPos: 10,
  //是否碰撞 
  Bumped: null,
  //星星数据
  newStarKey: "Star",
  newStarPos: null,
  //用户数据
  AccountName: null,
  AccountPwd: null,
  DoRegisterAction: null,
  RegisterSucc: null,
  DoLoginAction: null,
  LoginSucc: null,
  maxDigital: 2100000000,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIm15U2Vzc2lvbklkIiwiRmlyc3RMb2dpbiIsIk1JRF9sb2dpbiIsIk1JRF9sb2dvdXQiLCJNSURfbW92ZSIsIk1JRF9CdW1wIiwiTUlEX0hlYXJ0QmVhdCIsIk1JRF9TdGFyQm9ybiIsIk1JRF9HTSIsIk1JRF9PbmxpbmU0T3RoZXIiLCJNSURfUmVnaXN0ZXIiLCJNSURfU3luY1BvcyIsIkJ1bXBlZCIsIm5ld1N0YXJLZXkiLCJuZXdTdGFyUG9zIiwiQWNjb3VudE5hbWUiLCJBY2NvdW50UHdkIiwiRG9SZWdpc3RlckFjdGlvbiIsIlJlZ2lzdGVyU3VjYyIsIkRvTG9naW5BY3Rpb24iLCJMb2dpblN1Y2MiLCJtYXhEaWdpdGFsIiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGlCQUZPO0FBR2JDLEVBQUFBLE1BQU0sRUFBRSx5QkFISztBQUtiO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRyxJQU5FO0FBT2JDLEVBQUFBLGVBQWUsRUFBRSxJQVBKO0FBUWJDLEVBQUFBLFlBQVksRUFBRSxJQVJEO0FBVWI7QUFDQUMsRUFBQUEsRUFBRSxFQUFFLElBWFM7QUFZYkMsRUFBQUEsUUFBUSxFQUFFLElBWkc7QUFjYjtBQUNBQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWZMO0FBZ0JiQyxFQUFBQSxZQUFZLEVBQUUsSUFoQkQ7QUFnQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWpCRDtBQWlCTztBQUNwQkMsRUFBQUEsWUFBWSxFQUFFLElBbEJEO0FBa0JPO0FBQ3BCQyxFQUFBQSxXQUFXLEVBQUUsSUFuQkE7QUFtQk87QUFFcEI7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLElBdEJDO0FBc0JLO0FBRWxCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQXpCRTtBQTBCYkMsRUFBQUEsVUFBVSxFQUFFLENBMUJDO0FBMkJiQyxFQUFBQSxRQUFRLEVBQUUsQ0EzQkc7QUE0QmJDLEVBQUFBLFFBQVEsRUFBRSxDQTVCRztBQTZCYkMsRUFBQUEsYUFBYSxFQUFFLENBN0JGO0FBOEJiQyxFQUFBQSxZQUFZLEVBQUUsQ0E5QkQ7QUErQmJDLEVBQUFBLE1BQU0sRUFBRSxDQS9CSztBQWdDYkMsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FoQ0w7QUFpQ2JDLEVBQUFBLFlBQVksRUFBRSxDQWpDRDtBQWtDYkMsRUFBQUEsV0FBVyxFQUFFLEVBbENBO0FBb0NiO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxJQXJDSztBQXVDYjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsTUF4Q0M7QUF5Q2JDLEVBQUFBLFVBQVUsRUFBRSxJQXpDQztBQTJDYjtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsSUE1Q0E7QUE2Q2JDLEVBQUFBLFVBQVUsRUFBRSxJQTdDQztBQThDYkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUE5Q0w7QUErQ2JDLEVBQUFBLFlBQVksRUFBRSxJQS9DRDtBQWdEYkMsRUFBQUEsYUFBYSxFQUFFLElBaERGO0FBaURiQyxFQUFBQSxTQUFTLEVBQUUsSUFqREU7QUFrRGJDLEVBQUFBLFVBQVUsRUFBRSxVQWxEQztBQW9EYjtBQUNBQyxFQUFBQSxJQUFJLEVBQUU7QUFyRE8sQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gYWRkclxyXG4gICAgQWRkcjogXCJsb2NhbGhvc3Q6MTMwMDFcIixcclxuICAgIHdzQWRkcjogXCJ3czovL2xvY2FsaG9zdDoxMzAwMS93c1wiLFxyXG5cclxuICAgIC8vcmFuZFxyXG4gICAgcmFuZHNlZWQgOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmRzZWVkOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmROOiBudWxsLFxyXG5cclxuICAgIC8vc29ja2V0XHJcbiAgICB3czogbnVsbCxcclxuICAgIGlvU29ja2V0OiBudWxsLFxyXG5cclxuICAgIC8vcGxheWVyIGRhdGFcclxuICAgIFBsYXllclNlc3Npb25NYXA6IG51bGwsXHJcbiAgICBOZXdwbGF5ZXJNYXA6IG51bGwsIC8v5ZCM5bGP546p5a625YW35L2T5pWw5o2uXHJcbiAgICBuZXdQbGF5ZXJJZHM6IG51bGwsIC8v5ZCM5bGP546p5a62c2Vzc2lvbiBpZFxyXG4gICAgRGVsUGxheWVySWRzOiBudWxsLCAvL+WQjOWxj+S4i+mZkOeOqeWutlxyXG4gICAgbXlTZXNzaW9uSWQ6IG51bGwsICAvL+W9k+WJjeWuouaIt+err2lkXHJcblxyXG4gICAgLy8gXHJcbiAgICBGaXJzdExvZ2luOiBudWxsLCAvLzE66KGo56S66aaW5qyhXHJcblxyXG4gICAgLy8gbWVzc2FnIGRlZmluZVxyXG4gICAgTUlEX2xvZ2luOiAxLFxyXG4gICAgTUlEX2xvZ291dDogMixcclxuICAgIE1JRF9tb3ZlOiAzLFxyXG4gICAgTUlEX0J1bXA6IDQsXHJcbiAgICBNSURfSGVhcnRCZWF0OiA1LFxyXG4gICAgTUlEX1N0YXJCb3JuOiA2LFxyXG4gICAgTUlEX0dNOiA3LFxyXG4gICAgTUlEX09ubGluZTRPdGhlcjogOCxcclxuICAgIE1JRF9SZWdpc3RlcjogOSxcclxuICAgIE1JRF9TeW5jUG9zOiAxMCxcclxuXHJcbiAgICAvL+aYr+WQpueisOaSniBcclxuICAgIEJ1bXBlZDogbnVsbCxcclxuXHJcbiAgICAvL+aYn+aYn+aVsOaNrlxyXG4gICAgbmV3U3RhcktleTogXCJTdGFyXCIsXHJcbiAgICBuZXdTdGFyUG9zOiBudWxsLFxyXG5cclxuICAgIC8v55So5oi35pWw5o2uXHJcbiAgICBBY2NvdW50TmFtZTogbnVsbCxcclxuICAgIEFjY291bnRQd2Q6IG51bGwsXHJcbiAgICBEb1JlZ2lzdGVyQWN0aW9uOiBudWxsLFxyXG4gICAgUmVnaXN0ZXJTdWNjOiBudWxsLFxyXG4gICAgRG9Mb2dpbkFjdGlvbjogbnVsbCxcclxuICAgIExvZ2luU3VjYzogbnVsbCxcclxuICAgIG1heERpZ2l0YWw6IDIxMDAwMDAwMDAsXHJcblxyXG4gICAgLy/mtYvor5VcclxuICAgIHRlc3Q6IG51bGxcclxufTsiXX0=
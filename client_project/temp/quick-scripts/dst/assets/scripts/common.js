
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
  MID_MonsterInfo: 11,
  //是否碰撞 
  Bumped: null,
  BumpedPlayerId: null,
  //星星数据
  newStarKey: "Star",
  newStarPos: null,
  syncStarPos: false,
  syncOnline4Other: false,
  //用户数据
  AccountName: null,
  AccountPwd: null,
  DoRegisterAction: null,
  RegisterSucc: null,
  DoLoginAction: null,
  LoginSucc: null,
  maxDigital: 2100000000,
  MonsterScore: null,
  MosterPosX: 0,
  MosterPosY: 0,
  EnterUpdateMoster: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIm15U2Vzc2lvbklkIiwiRmlyc3RMb2dpbiIsIk1JRF9sb2dpbiIsIk1JRF9sb2dvdXQiLCJNSURfbW92ZSIsIk1JRF9CdW1wIiwiTUlEX0hlYXJ0QmVhdCIsIk1JRF9TdGFyQm9ybiIsIk1JRF9HTSIsIk1JRF9PbmxpbmU0T3RoZXIiLCJNSURfUmVnaXN0ZXIiLCJNSURfU3luY1BvcyIsIk1JRF9Nb25zdGVySW5mbyIsIkJ1bXBlZCIsIkJ1bXBlZFBsYXllcklkIiwibmV3U3RhcktleSIsIm5ld1N0YXJQb3MiLCJzeW5jU3RhclBvcyIsInN5bmNPbmxpbmU0T3RoZXIiLCJBY2NvdW50TmFtZSIsIkFjY291bnRQd2QiLCJEb1JlZ2lzdGVyQWN0aW9uIiwiUmVnaXN0ZXJTdWNjIiwiRG9Mb2dpbkFjdGlvbiIsIkxvZ2luU3VjYyIsIm1heERpZ2l0YWwiLCJNb25zdGVyU2NvcmUiLCJNb3N0ZXJQb3NYIiwiTW9zdGVyUG9zWSIsIkVudGVyVXBkYXRlTW9zdGVyIiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGlCQUZPO0FBR2JDLEVBQUFBLE1BQU0sRUFBRSx5QkFISztBQUtiO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRyxJQU5FO0FBT2JDLEVBQUFBLGVBQWUsRUFBRSxJQVBKO0FBUWJDLEVBQUFBLFlBQVksRUFBRSxJQVJEO0FBVWI7QUFDQUMsRUFBQUEsRUFBRSxFQUFFLElBWFM7QUFZYkMsRUFBQUEsUUFBUSxFQUFFLElBWkc7QUFjYjtBQUNBQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWZMO0FBZ0JiQyxFQUFBQSxZQUFZLEVBQUUsSUFoQkQ7QUFnQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWpCRDtBQWlCTztBQUNwQkMsRUFBQUEsWUFBWSxFQUFFLElBbEJEO0FBa0JPO0FBQ3BCQyxFQUFBQSxXQUFXLEVBQUUsSUFuQkE7QUFtQk87QUFFcEI7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLElBdEJDO0FBc0JLO0FBRWxCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQXpCRTtBQTBCYkMsRUFBQUEsVUFBVSxFQUFFLENBMUJDO0FBMkJiQyxFQUFBQSxRQUFRLEVBQUUsQ0EzQkc7QUE0QmJDLEVBQUFBLFFBQVEsRUFBRSxDQTVCRztBQTZCYkMsRUFBQUEsYUFBYSxFQUFFLENBN0JGO0FBOEJiQyxFQUFBQSxZQUFZLEVBQUUsQ0E5QkQ7QUErQmJDLEVBQUFBLE1BQU0sRUFBRSxDQS9CSztBQWdDYkMsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FoQ0w7QUFpQ2JDLEVBQUFBLFlBQVksRUFBRSxDQWpDRDtBQWtDYkMsRUFBQUEsV0FBVyxFQUFFLEVBbENBO0FBbUNiQyxFQUFBQSxlQUFlLEVBQUUsRUFuQ0o7QUFxQ2I7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLElBdENLO0FBdUNiQyxFQUFBQSxjQUFjLEVBQUUsSUF2Q0g7QUF3Q2I7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLE1BekNDO0FBMENiQyxFQUFBQSxVQUFVLEVBQUUsSUExQ0M7QUEyQ2JDLEVBQUFBLFdBQVcsRUFBRSxLQTNDQTtBQTZDYkMsRUFBQUEsZ0JBQWdCLEVBQUUsS0E3Q0w7QUErQ2I7QUFDQUMsRUFBQUEsV0FBVyxFQUFFLElBaERBO0FBaURiQyxFQUFBQSxVQUFVLEVBQUUsSUFqREM7QUFrRGJDLEVBQUFBLGdCQUFnQixFQUFFLElBbERMO0FBbURiQyxFQUFBQSxZQUFZLEVBQUUsSUFuREQ7QUFvRGJDLEVBQUFBLGFBQWEsRUFBRSxJQXBERjtBQXFEYkMsRUFBQUEsU0FBUyxFQUFFLElBckRFO0FBc0RiQyxFQUFBQSxVQUFVLEVBQUUsVUF0REM7QUF1RGJDLEVBQUFBLFlBQVksRUFBRSxJQXZERDtBQXdEYkMsRUFBQUEsVUFBVSxFQUFFLENBeERDO0FBeURiQyxFQUFBQSxVQUFVLEVBQUUsQ0F6REM7QUEwRGJDLEVBQUFBLGlCQUFpQixFQUFFLEtBMUROO0FBNERiO0FBQ0FDLEVBQUFBLElBQUksRUFBRTtBQTdETyxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyBhZGRyXHJcbiAgICBBZGRyOiBcImxvY2FsaG9zdDoxMzAwMVwiLFxyXG4gICAgd3NBZGRyOiBcIndzOi8vbG9jYWxob3N0OjEzMDAxL3dzXCIsXHJcblxyXG4gICAgLy9yYW5kXHJcbiAgICByYW5kc2VlZCA6IG51bGwsXHJcbiAgICBzdGFyUG9zUmFuZHNlZWQ6IG51bGwsXHJcbiAgICBzdGFyUG9zUmFuZE46IG51bGwsXHJcblxyXG4gICAgLy9zb2NrZXRcclxuICAgIHdzOiBudWxsLFxyXG4gICAgaW9Tb2NrZXQ6IG51bGwsXHJcblxyXG4gICAgLy9wbGF5ZXIgZGF0YVxyXG4gICAgUGxheWVyU2Vzc2lvbk1hcDogbnVsbCxcclxuICAgIE5ld3BsYXllck1hcDogbnVsbCwgLy/lkIzlsY/njqnlrrblhbfkvZPmlbDmja5cclxuICAgIG5ld1BsYXllcklkczogbnVsbCwgLy/lkIzlsY/njqnlrrZzZXNzaW9uIGlkXHJcbiAgICBEZWxQbGF5ZXJJZHM6IG51bGwsIC8v5ZCM5bGP5LiL6ZmQ546p5a62XHJcbiAgICBteVNlc3Npb25JZDogbnVsbCwgIC8v5b2T5YmN5a6i5oi356uvaWRcclxuXHJcbiAgICAvLyBcclxuICAgIEZpcnN0TG9naW46IG51bGwsIC8vMTrooajnpLrpppbmrKFcclxuXHJcbiAgICAvLyBtZXNzYWcgZGVmaW5lXHJcbiAgICBNSURfbG9naW46IDEsXHJcbiAgICBNSURfbG9nb3V0OiAyLFxyXG4gICAgTUlEX21vdmU6IDMsXHJcbiAgICBNSURfQnVtcDogNCxcclxuICAgIE1JRF9IZWFydEJlYXQ6IDUsXHJcbiAgICBNSURfU3RhckJvcm46IDYsXHJcbiAgICBNSURfR006IDcsXHJcbiAgICBNSURfT25saW5lNE90aGVyOiA4LFxyXG4gICAgTUlEX1JlZ2lzdGVyOiA5LFxyXG4gICAgTUlEX1N5bmNQb3M6IDEwLFxyXG4gICAgTUlEX01vbnN0ZXJJbmZvOiAxMSxcclxuXHJcbiAgICAvL+aYr+WQpueisOaSniBcclxuICAgIEJ1bXBlZDogbnVsbCxcclxuICAgIEJ1bXBlZFBsYXllcklkOiBudWxsLFxyXG4gICAgLy/mmJ/mmJ/mlbDmja5cclxuICAgIG5ld1N0YXJLZXk6IFwiU3RhclwiLFxyXG4gICAgbmV3U3RhclBvczogbnVsbCxcclxuICAgIHN5bmNTdGFyUG9zOiBmYWxzZSxcclxuXHJcbiAgICBzeW5jT25saW5lNE90aGVyOiBmYWxzZSxcclxuXHJcbiAgICAvL+eUqOaIt+aVsOaNrlxyXG4gICAgQWNjb3VudE5hbWU6IG51bGwsXHJcbiAgICBBY2NvdW50UHdkOiBudWxsLFxyXG4gICAgRG9SZWdpc3RlckFjdGlvbjogbnVsbCxcclxuICAgIFJlZ2lzdGVyU3VjYzogbnVsbCxcclxuICAgIERvTG9naW5BY3Rpb246IG51bGwsXHJcbiAgICBMb2dpblN1Y2M6IG51bGwsXHJcbiAgICBtYXhEaWdpdGFsOiAyMTAwMDAwMDAwLFxyXG4gICAgTW9uc3RlclNjb3JlOiBudWxsLFxyXG4gICAgTW9zdGVyUG9zWDogMCxcclxuICAgIE1vc3RlclBvc1k6IDAsXHJcbiAgICBFbnRlclVwZGF0ZU1vc3RlcjogZmFsc2UsXHJcblxyXG4gICAgLy/mtYvor5VcclxuICAgIHRlc3Q6IG51bGxcclxufTsiXX0=
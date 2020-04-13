
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
  MID_LogicFrameSync: 12,
  //逻辑帧同步其他客户端moster信息
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIm15U2Vzc2lvbklkIiwiRmlyc3RMb2dpbiIsIk1JRF9sb2dpbiIsIk1JRF9sb2dvdXQiLCJNSURfbW92ZSIsIk1JRF9CdW1wIiwiTUlEX0hlYXJ0QmVhdCIsIk1JRF9TdGFyQm9ybiIsIk1JRF9HTSIsIk1JRF9PbmxpbmU0T3RoZXIiLCJNSURfUmVnaXN0ZXIiLCJNSURfU3luY1BvcyIsIk1JRF9Nb25zdGVySW5mbyIsIk1JRF9Mb2dpY0ZyYW1lU3luYyIsIkJ1bXBlZCIsIkJ1bXBlZFBsYXllcklkIiwibmV3U3RhcktleSIsIm5ld1N0YXJQb3MiLCJzeW5jU3RhclBvcyIsInN5bmNPbmxpbmU0T3RoZXIiLCJBY2NvdW50TmFtZSIsIkFjY291bnRQd2QiLCJEb1JlZ2lzdGVyQWN0aW9uIiwiUmVnaXN0ZXJTdWNjIiwiRG9Mb2dpbkFjdGlvbiIsIkxvZ2luU3VjYyIsIm1heERpZ2l0YWwiLCJNb25zdGVyU2NvcmUiLCJNb3N0ZXJQb3NYIiwiTW9zdGVyUG9zWSIsIkVudGVyVXBkYXRlTW9zdGVyIiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGlCQUZPO0FBR2JDLEVBQUFBLE1BQU0sRUFBRSx5QkFISztBQUtiO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRyxJQU5FO0FBT2JDLEVBQUFBLGVBQWUsRUFBRSxJQVBKO0FBUWJDLEVBQUFBLFlBQVksRUFBRSxJQVJEO0FBVWI7QUFDQUMsRUFBQUEsRUFBRSxFQUFFLElBWFM7QUFZYkMsRUFBQUEsUUFBUSxFQUFFLElBWkc7QUFjYjtBQUNBQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWZMO0FBZ0JiQyxFQUFBQSxZQUFZLEVBQUUsSUFoQkQ7QUFnQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWpCRDtBQWlCTztBQUNwQkMsRUFBQUEsWUFBWSxFQUFFLElBbEJEO0FBa0JPO0FBQ3BCQyxFQUFBQSxXQUFXLEVBQUUsSUFuQkE7QUFtQk87QUFFcEI7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLElBdEJDO0FBc0JLO0FBRWxCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQXpCRTtBQTBCYkMsRUFBQUEsVUFBVSxFQUFFLENBMUJDO0FBMkJiQyxFQUFBQSxRQUFRLEVBQUUsQ0EzQkc7QUE0QmJDLEVBQUFBLFFBQVEsRUFBRSxDQTVCRztBQTZCYkMsRUFBQUEsYUFBYSxFQUFFLENBN0JGO0FBOEJiQyxFQUFBQSxZQUFZLEVBQUUsQ0E5QkQ7QUErQmJDLEVBQUFBLE1BQU0sRUFBRSxDQS9CSztBQWdDYkMsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FoQ0w7QUFpQ2JDLEVBQUFBLFlBQVksRUFBRSxDQWpDRDtBQWtDYkMsRUFBQUEsV0FBVyxFQUFFLEVBbENBO0FBbUNiQyxFQUFBQSxlQUFlLEVBQUUsRUFuQ0o7QUFvQ2JDLEVBQUFBLGtCQUFrQixFQUFFLEVBcENQO0FBb0NZO0FBRXpCO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxJQXZDSztBQXdDYkMsRUFBQUEsY0FBYyxFQUFFLElBeENIO0FBeUNiO0FBQ0FDLEVBQUFBLFVBQVUsRUFBRSxNQTFDQztBQTJDYkMsRUFBQUEsVUFBVSxFQUFFLElBM0NDO0FBNENiQyxFQUFBQSxXQUFXLEVBQUUsS0E1Q0E7QUE4Q2JDLEVBQUFBLGdCQUFnQixFQUFFLEtBOUNMO0FBZ0RiO0FBQ0FDLEVBQUFBLFdBQVcsRUFBRSxJQWpEQTtBQWtEYkMsRUFBQUEsVUFBVSxFQUFFLElBbERDO0FBbURiQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQW5ETDtBQW9EYkMsRUFBQUEsWUFBWSxFQUFFLElBcEREO0FBcURiQyxFQUFBQSxhQUFhLEVBQUUsSUFyREY7QUFzRGJDLEVBQUFBLFNBQVMsRUFBRSxJQXRERTtBQXVEYkMsRUFBQUEsVUFBVSxFQUFFLFVBdkRDO0FBd0RiQyxFQUFBQSxZQUFZLEVBQUUsSUF4REQ7QUF5RGJDLEVBQUFBLFVBQVUsRUFBRSxDQXpEQztBQTBEYkMsRUFBQUEsVUFBVSxFQUFFLENBMURDO0FBMkRiQyxFQUFBQSxpQkFBaUIsRUFBRSxLQTNETjtBQTZEYjtBQUNBQyxFQUFBQSxJQUFJLEVBQUU7QUE5RE8sQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gYWRkclxyXG4gICAgQWRkcjogXCJsb2NhbGhvc3Q6MTMwMDFcIixcclxuICAgIHdzQWRkcjogXCJ3czovL2xvY2FsaG9zdDoxMzAwMS93c1wiLFxyXG5cclxuICAgIC8vcmFuZFxyXG4gICAgcmFuZHNlZWQgOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmRzZWVkOiBudWxsLFxyXG4gICAgc3RhclBvc1JhbmROOiBudWxsLFxyXG5cclxuICAgIC8vc29ja2V0XHJcbiAgICB3czogbnVsbCxcclxuICAgIGlvU29ja2V0OiBudWxsLFxyXG5cclxuICAgIC8vcGxheWVyIGRhdGFcclxuICAgIFBsYXllclNlc3Npb25NYXA6IG51bGwsXHJcbiAgICBOZXdwbGF5ZXJNYXA6IG51bGwsIC8v5ZCM5bGP546p5a625YW35L2T5pWw5o2uXHJcbiAgICBuZXdQbGF5ZXJJZHM6IG51bGwsIC8v5ZCM5bGP546p5a62c2Vzc2lvbiBpZFxyXG4gICAgRGVsUGxheWVySWRzOiBudWxsLCAvL+WQjOWxj+S4i+mZkOeOqeWutlxyXG4gICAgbXlTZXNzaW9uSWQ6IG51bGwsICAvL+W9k+WJjeWuouaIt+err2lkXHJcblxyXG4gICAgLy8gXHJcbiAgICBGaXJzdExvZ2luOiBudWxsLCAvLzE66KGo56S66aaW5qyhXHJcblxyXG4gICAgLy8gbWVzc2FnIGRlZmluZVxyXG4gICAgTUlEX2xvZ2luOiAxLFxyXG4gICAgTUlEX2xvZ291dDogMixcclxuICAgIE1JRF9tb3ZlOiAzLFxyXG4gICAgTUlEX0J1bXA6IDQsXHJcbiAgICBNSURfSGVhcnRCZWF0OiA1LFxyXG4gICAgTUlEX1N0YXJCb3JuOiA2LFxyXG4gICAgTUlEX0dNOiA3LFxyXG4gICAgTUlEX09ubGluZTRPdGhlcjogOCxcclxuICAgIE1JRF9SZWdpc3RlcjogOSxcclxuICAgIE1JRF9TeW5jUG9zOiAxMCxcclxuICAgIE1JRF9Nb25zdGVySW5mbzogMTEsXHJcbiAgICBNSURfTG9naWNGcmFtZVN5bmM6IDEyLCAgLy/pgLvovpHluKflkIzmraXlhbbku5blrqLmiLfnq69tb3N0ZXLkv6Hmga9cclxuXHJcbiAgICAvL+aYr+WQpueisOaSniBcclxuICAgIEJ1bXBlZDogbnVsbCxcclxuICAgIEJ1bXBlZFBsYXllcklkOiBudWxsLFxyXG4gICAgLy/mmJ/mmJ/mlbDmja5cclxuICAgIG5ld1N0YXJLZXk6IFwiU3RhclwiLFxyXG4gICAgbmV3U3RhclBvczogbnVsbCxcclxuICAgIHN5bmNTdGFyUG9zOiBmYWxzZSxcclxuXHJcbiAgICBzeW5jT25saW5lNE90aGVyOiBmYWxzZSxcclxuXHJcbiAgICAvL+eUqOaIt+aVsOaNrlxyXG4gICAgQWNjb3VudE5hbWU6IG51bGwsXHJcbiAgICBBY2NvdW50UHdkOiBudWxsLFxyXG4gICAgRG9SZWdpc3RlckFjdGlvbjogbnVsbCxcclxuICAgIFJlZ2lzdGVyU3VjYzogbnVsbCxcclxuICAgIERvTG9naW5BY3Rpb246IG51bGwsXHJcbiAgICBMb2dpblN1Y2M6IG51bGwsXHJcbiAgICBtYXhEaWdpdGFsOiAyMTAwMDAwMDAwLFxyXG4gICAgTW9uc3RlclNjb3JlOiBudWxsLFxyXG4gICAgTW9zdGVyUG9zWDogMCxcclxuICAgIE1vc3RlclBvc1k6IDAsXHJcbiAgICBFbnRlclVwZGF0ZU1vc3RlcjogZmFsc2UsXHJcblxyXG4gICAgLy/mtYvor5VcclxuICAgIHRlc3Q6IG51bGxcclxufTsiXX0=
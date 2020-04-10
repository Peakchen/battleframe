
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
  BumpedPlayerId: null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIm15U2Vzc2lvbklkIiwiRmlyc3RMb2dpbiIsIk1JRF9sb2dpbiIsIk1JRF9sb2dvdXQiLCJNSURfbW92ZSIsIk1JRF9CdW1wIiwiTUlEX0hlYXJ0QmVhdCIsIk1JRF9TdGFyQm9ybiIsIk1JRF9HTSIsIk1JRF9PbmxpbmU0T3RoZXIiLCJNSURfUmVnaXN0ZXIiLCJNSURfU3luY1BvcyIsIkJ1bXBlZCIsIkJ1bXBlZFBsYXllcklkIiwibmV3U3RhcktleSIsIm5ld1N0YXJQb3MiLCJBY2NvdW50TmFtZSIsIkFjY291bnRQd2QiLCJEb1JlZ2lzdGVyQWN0aW9uIiwiUmVnaXN0ZXJTdWNjIiwiRG9Mb2dpbkFjdGlvbiIsIkxvZ2luU3VjYyIsIm1heERpZ2l0YWwiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYjtBQUNBQyxFQUFBQSxJQUFJLEVBQUUsaUJBRk87QUFHYkMsRUFBQUEsTUFBTSxFQUFFLHlCQUhLO0FBS2I7QUFDQUMsRUFBQUEsUUFBUSxFQUFHLElBTkU7QUFPYkMsRUFBQUEsZUFBZSxFQUFFLElBUEo7QUFRYkMsRUFBQUEsWUFBWSxFQUFFLElBUkQ7QUFVYjtBQUNBQyxFQUFBQSxFQUFFLEVBQUUsSUFYUztBQVliQyxFQUFBQSxRQUFRLEVBQUUsSUFaRztBQWNiO0FBQ0FDLEVBQUFBLGdCQUFnQixFQUFFLElBZkw7QUFnQmJDLEVBQUFBLFlBQVksRUFBRSxJQWhCRDtBQWdCTztBQUNwQkMsRUFBQUEsWUFBWSxFQUFFLElBakJEO0FBaUJPO0FBQ3BCQyxFQUFBQSxZQUFZLEVBQUUsSUFsQkQ7QUFrQk87QUFDcEJDLEVBQUFBLFdBQVcsRUFBRSxJQW5CQTtBQW1CTztBQUVwQjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsSUF0QkM7QUFzQks7QUFFbEI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBekJFO0FBMEJiQyxFQUFBQSxVQUFVLEVBQUUsQ0ExQkM7QUEyQmJDLEVBQUFBLFFBQVEsRUFBRSxDQTNCRztBQTRCYkMsRUFBQUEsUUFBUSxFQUFFLENBNUJHO0FBNkJiQyxFQUFBQSxhQUFhLEVBQUUsQ0E3QkY7QUE4QmJDLEVBQUFBLFlBQVksRUFBRSxDQTlCRDtBQStCYkMsRUFBQUEsTUFBTSxFQUFFLENBL0JLO0FBZ0NiQyxFQUFBQSxnQkFBZ0IsRUFBRSxDQWhDTDtBQWlDYkMsRUFBQUEsWUFBWSxFQUFFLENBakNEO0FBa0NiQyxFQUFBQSxXQUFXLEVBQUUsRUFsQ0E7QUFvQ2I7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLElBckNLO0FBc0NiQyxFQUFBQSxjQUFjLEVBQUUsSUF0Q0g7QUF1Q2I7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLE1BeENDO0FBeUNiQyxFQUFBQSxVQUFVLEVBQUUsSUF6Q0M7QUEyQ2I7QUFDQUMsRUFBQUEsV0FBVyxFQUFFLElBNUNBO0FBNkNiQyxFQUFBQSxVQUFVLEVBQUUsSUE3Q0M7QUE4Q2JDLEVBQUFBLGdCQUFnQixFQUFFLElBOUNMO0FBK0NiQyxFQUFBQSxZQUFZLEVBQUUsSUEvQ0Q7QUFnRGJDLEVBQUFBLGFBQWEsRUFBRSxJQWhERjtBQWlEYkMsRUFBQUEsU0FBUyxFQUFFLElBakRFO0FBa0RiQyxFQUFBQSxVQUFVLEVBQUUsVUFsREM7QUFvRGI7QUFDQUMsRUFBQUEsSUFBSSxFQUFFO0FBckRPLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8vIGFkZHJcclxuICAgIEFkZHI6IFwibG9jYWxob3N0OjEzMDAxXCIsXHJcbiAgICB3c0FkZHI6IFwid3M6Ly9sb2NhbGhvc3Q6MTMwMDEvd3NcIixcclxuXHJcbiAgICAvL3JhbmRcclxuICAgIHJhbmRzZWVkIDogbnVsbCxcclxuICAgIHN0YXJQb3NSYW5kc2VlZDogbnVsbCxcclxuICAgIHN0YXJQb3NSYW5kTjogbnVsbCxcclxuXHJcbiAgICAvL3NvY2tldFxyXG4gICAgd3M6IG51bGwsXHJcbiAgICBpb1NvY2tldDogbnVsbCxcclxuXHJcbiAgICAvL3BsYXllciBkYXRhXHJcbiAgICBQbGF5ZXJTZXNzaW9uTWFwOiBudWxsLFxyXG4gICAgTmV3cGxheWVyTWFwOiBudWxsLCAvL+WQjOWxj+eOqeWutuWFt+S9k+aVsOaNrlxyXG4gICAgbmV3UGxheWVySWRzOiBudWxsLCAvL+WQjOWxj+eOqeWutnNlc3Npb24gaWRcclxuICAgIERlbFBsYXllcklkczogbnVsbCwgLy/lkIzlsY/kuIvpmZDnjqnlrrZcclxuICAgIG15U2Vzc2lvbklkOiBudWxsLCAgLy/lvZPliY3lrqLmiLfnq69pZFxyXG5cclxuICAgIC8vIFxyXG4gICAgRmlyc3RMb2dpbjogbnVsbCwgLy8xOuihqOekuummluasoVxyXG5cclxuICAgIC8vIG1lc3NhZyBkZWZpbmVcclxuICAgIE1JRF9sb2dpbjogMSxcclxuICAgIE1JRF9sb2dvdXQ6IDIsXHJcbiAgICBNSURfbW92ZTogMyxcclxuICAgIE1JRF9CdW1wOiA0LFxyXG4gICAgTUlEX0hlYXJ0QmVhdDogNSxcclxuICAgIE1JRF9TdGFyQm9ybjogNixcclxuICAgIE1JRF9HTTogNyxcclxuICAgIE1JRF9PbmxpbmU0T3RoZXI6IDgsXHJcbiAgICBNSURfUmVnaXN0ZXI6IDksXHJcbiAgICBNSURfU3luY1BvczogMTAsXHJcblxyXG4gICAgLy/mmK/lkKbnorDmkp4gXHJcbiAgICBCdW1wZWQ6IG51bGwsXHJcbiAgICBCdW1wZWRQbGF5ZXJJZDogbnVsbCxcclxuICAgIC8v5pif5pif5pWw5o2uXHJcbiAgICBuZXdTdGFyS2V5OiBcIlN0YXJcIixcclxuICAgIG5ld1N0YXJQb3M6IG51bGwsXHJcblxyXG4gICAgLy/nlKjmiLfmlbDmja5cclxuICAgIEFjY291bnROYW1lOiBudWxsLFxyXG4gICAgQWNjb3VudFB3ZDogbnVsbCxcclxuICAgIERvUmVnaXN0ZXJBY3Rpb246IG51bGwsXHJcbiAgICBSZWdpc3RlclN1Y2M6IG51bGwsXHJcbiAgICBEb0xvZ2luQWN0aW9uOiBudWxsLFxyXG4gICAgTG9naW5TdWNjOiBudWxsLFxyXG4gICAgbWF4RGlnaXRhbDogMjEwMDAwMDAwMCxcclxuXHJcbiAgICAvL+a1i+ivlVxyXG4gICAgdGVzdDogbnVsbFxyXG59OyJdfQ==
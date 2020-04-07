
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
  //是否碰撞 
  Bumped: null,
  //创建精灵数据
  newplayerCreated: null,
  newplayerPosx: null,
  newplayerPosy: null,
  newPlayerId: null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJBZGRyIiwid3NBZGRyIiwicmFuZHNlZWQiLCJzdGFyUG9zUmFuZHNlZWQiLCJzdGFyUG9zUmFuZE4iLCJ3cyIsImlvU29ja2V0IiwiUGxheWVyU2Vzc2lvbk1hcCIsIk5ld3BsYXllck1hcCIsIm5ld1BsYXllcklkcyIsIkRlbFBsYXllcklkcyIsIkZpcnN0TG9naW4iLCJNSURfbG9naW4iLCJNSURfbG9nb3V0IiwiTUlEX21vdmUiLCJCdW1wZWQiLCJuZXdwbGF5ZXJDcmVhdGVkIiwibmV3cGxheWVyUG9zeCIsIm5ld3BsYXllclBvc3kiLCJuZXdQbGF5ZXJJZCIsInRlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxpQkFGTztBQUdiQyxFQUFBQSxNQUFNLEVBQUUseUJBSEs7QUFLYjtBQUNBQyxFQUFBQSxRQUFRLEVBQUcsSUFORTtBQU9iQyxFQUFBQSxlQUFlLEVBQUUsSUFQSjtBQVFiQyxFQUFBQSxZQUFZLEVBQUUsSUFSRDtBQVViO0FBQ0FDLEVBQUFBLEVBQUUsRUFBRSxJQVhTO0FBWWJDLEVBQUFBLFFBQVEsRUFBRSxJQVpHO0FBY2I7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFmTDtBQWdCYkMsRUFBQUEsWUFBWSxFQUFFLElBaEJEO0FBZ0JPO0FBQ3BCQyxFQUFBQSxZQUFZLEVBQUUsSUFqQkQ7QUFpQk87QUFDcEJDLEVBQUFBLFlBQVksRUFBRSxJQWxCRDtBQWtCTztBQUVwQjtBQUNBQyxFQUFBQSxVQUFVLEVBQUUsSUFyQkM7QUFxQks7QUFFbEI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLENBeEJFO0FBeUJiQyxFQUFBQSxVQUFVLEVBQUUsQ0F6QkM7QUEwQmJDLEVBQUFBLFFBQVEsRUFBRSxDQTFCRztBQTRCYjtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsSUE3Qks7QUErQmI7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFoQ0w7QUFpQ2JDLEVBQUFBLGFBQWEsRUFBRSxJQWpDRjtBQWtDYkMsRUFBQUEsYUFBYSxFQUFFLElBbENGO0FBbUNiQyxFQUFBQSxXQUFXLEVBQUUsSUFuQ0E7QUFxQ2I7QUFDQUMsRUFBQUEsSUFBSSxFQUFFO0FBdENPLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8vIGFkZHJcclxuICAgIEFkZHI6IFwibG9jYWxob3N0OjEzMDAxXCIsXHJcbiAgICB3c0FkZHI6IFwid3M6Ly9sb2NhbGhvc3Q6MTMwMDEvd3NcIixcclxuXHJcbiAgICAvL3JhbmRcclxuICAgIHJhbmRzZWVkIDogbnVsbCxcclxuICAgIHN0YXJQb3NSYW5kc2VlZDogbnVsbCxcclxuICAgIHN0YXJQb3NSYW5kTjogbnVsbCxcclxuXHJcbiAgICAvL3NvY2tldFxyXG4gICAgd3M6IG51bGwsXHJcbiAgICBpb1NvY2tldDogbnVsbCxcclxuXHJcbiAgICAvL3BsYXllciBkYXRhXHJcbiAgICBQbGF5ZXJTZXNzaW9uTWFwOiBudWxsLFxyXG4gICAgTmV3cGxheWVyTWFwOiBudWxsLCAvL+WQjOWxj+eOqeWutuWFt+S9k+aVsOaNrlxyXG4gICAgbmV3UGxheWVySWRzOiBudWxsLCAvL+WQjOWxj+eOqeWutnNlc3Npb24gaWRcclxuICAgIERlbFBsYXllcklkczogbnVsbCwgLy/lkIzlsY/kuIvpmZDnjqnlrrZcclxuXHJcbiAgICAvLyBcclxuICAgIEZpcnN0TG9naW46IG51bGwsIC8vMTrooajnpLrpppbmrKFcclxuXHJcbiAgICAvLyBtZXNzYWcgZGVmaW5lXHJcbiAgICBNSURfbG9naW46IDEsXHJcbiAgICBNSURfbG9nb3V0OiAyLFxyXG4gICAgTUlEX21vdmU6IDMsXHJcblxyXG4gICAgLy/mmK/lkKbnorDmkp4gXHJcbiAgICBCdW1wZWQ6IG51bGwsXHJcblxyXG4gICAgLy/liJvlu7rnsr7ngbXmlbDmja5cclxuICAgIG5ld3BsYXllckNyZWF0ZWQ6IG51bGwsXHJcbiAgICBuZXdwbGF5ZXJQb3N4OiBudWxsLFxyXG4gICAgbmV3cGxheWVyUG9zeTogbnVsbCxcclxuICAgIG5ld1BsYXllcklkOiBudWxsLFxyXG5cclxuICAgIC8v5rWL6K+VXHJcbiAgICB0ZXN0OiBudWxsXHJcbn07Il19
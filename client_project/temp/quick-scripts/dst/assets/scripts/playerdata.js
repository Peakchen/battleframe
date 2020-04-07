
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/playerdata.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee2a6wFRAZDzLnGbuzH7dEf', 'playerdata');
// scripts/playerdata.js

"use strict";

var player = cc.Class({
  name: 'player',
  properties: {
    sessionId: null,
    nodex: null,
    nodey: null
  }
});
var playerManager = cc.Class({
  properties: {
    playerMap: [player]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xccGxheWVyZGF0YS5qcyJdLCJuYW1lcyI6WyJwbGF5ZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJzZXNzaW9uSWQiLCJub2RleCIsIm5vZGV5IiwicGxheWVyTWFuYWdlciIsInBsYXllck1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2xCQyxFQUFBQSxJQUFJLEVBQUUsUUFEWTtBQUVsQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRSxJQURIO0FBRVJDLElBQUFBLEtBQUssRUFBRSxJQUZDO0FBR1JDLElBQUFBLEtBQUssRUFBRTtBQUhDO0FBRk0sQ0FBVCxDQUFiO0FBU0EsSUFBSUMsYUFBYSxHQUFHUCxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN6QkUsRUFBQUEsVUFBVSxFQUFFO0FBQ1JLLElBQUFBLFNBQVMsRUFBRSxDQUFDVCxNQUFEO0FBREg7QUFEYSxDQUFULENBQXBCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGxheWVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ3BsYXllcicsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2Vzc2lvbklkOiBudWxsLFxyXG4gICAgICAgIG5vZGV4OiBudWxsLFxyXG4gICAgICAgIG5vZGV5OiBudWxsLFxyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBwbGF5ZXJNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBsYXllck1hcDogW3BsYXllcl0sXHJcbiAgICB9LFxyXG59KTsiXX0=
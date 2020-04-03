
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/battle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c75160onE1L85aAYcU40taO', 'battle');
// scripts/battle.js

"use strict";

var Api = require("api");

var Global = require("common");

cc.Class({
  "extends": cc.Component,
  //
  getApi: function getApi() {
    return new Api();
  },
  //获取地址端口
  getHost: function getHost() {
    return Global.Addr;
  },
  //获取随机数
  getRandNumber: function getRandNumber(number) {
    if (Global.randseed == 0) {
      return number;
    }

    return this.getApi().Rand(number, Global.randseed);
  },
  getRandOne: function getRandOne(randseed) {
    if (randseed == 0) {
      randseed = Global.randseed;
    }

    return this.getApi().RandOne(randseed);
  },
  //发送更新star位置更新信息
  postUpdateStarPosMsg: function postUpdateStarPosMsg(maxX) {
    //cc.log("begin send battle start message.")
    var request = cc.loader.getXMLHttpRequest();
    var url = this.getHost() + "/UpdateStarPos";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.responseType = "arraybuffer";

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status >= 200 && request.status < 300) {
        cc.log("UpdateStarPos response: ", request.response);
        var data = new Uint32Array(request.response);
        cc.log("UpdateStarPos data: ", data);
        Global.starPosRandseed = data[0];
        Global.starPosRandN = data[1];
        return;
      }
    };

    request.send(new Uint16Array([1, maxX]));
  },
  //发送战斗开始请求
  postBattleStartMsg: function postBattleStartMsg() {
    if (Global.randseed > 0) {
      return;
    } //cc.log("begin send battle start message.")


    var request = cc.loader.getXMLHttpRequest();
    var url = this.getHost() + "/BattleStart";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status >= 200 && request.status < 300) {
        Global.randseed = parseInt(request.responseText);
        cc.log("BattleStart response: ", request.responseText);
      }
    };

    request.send(new Uint16Array([1])); //param 1: 数据长度，param ...: 具体数据
  },
  //发送攻击请求
  postAttackMsg: function postAttackMsg(frame, dist) {
    //cc.log("begin send Attack message.", Global.randseed)
    var request = cc.loader.getXMLHttpRequest();
    var url = this.getHost() + "/Attack";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status >= 200 && request.status < 300) {
        cc.log("Attack response: ", request.responseText);
      }
    };

    var randn = this.getRandNumber(dist);
    request.send(new Uint16Array([3, frame, dist, randn])); //param 1: 数据长度，param ...: 具体数据
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYmF0dGxlLmpzIl0sIm5hbWVzIjpbIkFwaSIsInJlcXVpcmUiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiZ2V0QXBpIiwiZ2V0SG9zdCIsIkFkZHIiLCJnZXRSYW5kTnVtYmVyIiwibnVtYmVyIiwicmFuZHNlZWQiLCJSYW5kIiwiZ2V0UmFuZE9uZSIsIlJhbmRPbmUiLCJwb3N0VXBkYXRlU3RhclBvc01zZyIsIm1heFgiLCJyZXF1ZXN0IiwibG9hZGVyIiwiZ2V0WE1MSHR0cFJlcXVlc3QiLCJ1cmwiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJsb2ciLCJyZXNwb25zZSIsImRhdGEiLCJVaW50MzJBcnJheSIsInN0YXJQb3NSYW5kc2VlZCIsInN0YXJQb3NSYW5kTiIsInNlbmQiLCJVaW50MTZBcnJheSIsInBvc3RCYXR0bGVTdGFydE1zZyIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwicG9zdEF0dGFja01zZyIsImZyYW1lIiwiZGlzdCIsInJhbmRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEdBQUcsR0FBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTDtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVU7QUFDZCxXQUFPLElBQUlOLEdBQUosRUFBUDtBQUNILEdBTkk7QUFRTDtBQUNBTyxFQUFBQSxPQUFPLEVBQUUsbUJBQVc7QUFDaEIsV0FBT0wsTUFBTSxDQUFDTSxJQUFkO0FBQ0gsR0FYSTtBQWFMO0FBQ0FDLEVBQUFBLGFBQWEsRUFBRSx1QkFBU0MsTUFBVCxFQUFnQjtB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dCBBcGkgPSByZXF1aXJlKFwiYXBpXCIpXHJcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgLy9cclxuICAgIGdldEFwaTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbmV3IEFwaSgpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W5Zyw5Z2A56uv5Y+jXHJcbiAgICBnZXRIb3N0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLkFkZHI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W6ZqP5py65pWwXHJcbiAgICBnZXRSYW5kTnVtYmVyOiBmdW5jdGlvbihudW1iZXIpe1xyXG4gICAgICAgIGlmIChHbG9iYWwucmFuZHNlZWQgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLlJhbmQobnVtYmVyLCBHbG9iYWwucmFuZHNlZWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kT25lOiBmdW5jdGlvbihyYW5kc2VlZCl7XHJcbiAgICAgICAgaWYgKHJhbmRzZWVkID09IDApIHtcclxuICAgICAgICAgICAgcmFuZHNlZWQgPSBHbG9iYWwucmFuZHNlZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkuUmFuZE9uZShyYW5kc2VlZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Y+R6YCB5pu05pawc3RhcuS9jee9ruabtOaWsOS/oeaBr1xyXG4gICAgcG9zdFVwZGF0ZVN0YXJQb3NNc2c6IGZ1bmN0aW9uKG1heFgpe1xyXG4gICAgICAgIC8vY2MubG9nKFwiYmVnaW4gc2VuZCBiYXR0bGUgc3RhcnQgbWVzc2FnZS5cIilcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEhvc3QoKSArIFwiL1VwZGF0ZVN0YXJQb3NcIlxyXG4gICAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKVxyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgMzAwKSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiVXBkYXRlU3RhclBvcyByZXNwb25zZTogXCIsIHJlcXVlc3QucmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBVaW50MzJBcnJheShyZXF1ZXN0LnJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiVXBkYXRlU3RhclBvcyBkYXRhOiBcIiwgZGF0YSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5zdGFyUG9zUmFuZHNlZWQgPSBkYXRhWzBdXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuc3RhclBvc1JhbmROID0gZGF0YVsxXVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKG5ldyBVaW50MTZBcnJheShbMSwgbWF4WF0pKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPkemAgeaImOaWl+W8gOWni+ivt+axglxyXG4gICAgcG9zdEJhdHRsZVN0YXJ0TXNnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLnJhbmRzZWVkID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2MubG9nKFwiYmVnaW4gc2VuZCBiYXR0bGUgc3RhcnQgbWVzc2FnZS5cIilcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEhvc3QoKSArIFwiL0JhdHRsZVN0YXJ0XCJcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSlcclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDMwMCkpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5yYW5kc2VlZCA9IHBhcnNlSW50KHJlcXVlc3QucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiQmF0dGxlU3RhcnQgcmVzcG9uc2U6IFwiLCByZXF1ZXN0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHJlcXVlc3Quc2VuZChuZXcgVWludDE2QXJyYXkoWzFdKSkgLy9wYXJhbSAxOiDmlbDmja7plb/luqbvvIxwYXJhbSAuLi46IOWFt+S9k+aVsOaNrlxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPkemAgeaUu+WHu+ivt+axglxyXG4gICAgcG9zdEF0dGFja01zZzogZnVuY3Rpb24oZnJhbWUsIGRpc3QpIHtcclxuICAgICAgICAvL2NjLmxvZyhcImJlZ2luIHNlbmQgQXR0YWNrIG1lc3NhZ2UuXCIsIEdsb2JhbC5yYW5kc2VlZClcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEhvc3QoKSArIFwiL0F0dGFja1wiXHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpXHJcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCAzMDApKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJBdHRhY2sgcmVzcG9uc2U6IFwiLCByZXF1ZXN0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHZhciByYW5kbiA9IHRoaXMuZ2V0UmFuZE51bWJlcihkaXN0KVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZChuZXcgVWludDE2QXJyYXkoWzMsIGZyYW1lLCBkaXN0LCByYW5kbl0pKSAvL3BhcmFtIDE6IOaVsOaNrumVv+W6pu+8jHBhcmFtIC4uLjog5YW35L2T5pWw5o2uXHJcbiAgICB9XHJcbn0pXHJcblxyXG4iXX0=
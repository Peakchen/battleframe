
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
    return "127.0.0.1:13001";
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
    cc.log("begin send battle start message.");
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
    }

    cc.log("begin send battle start message.");
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
    cc.log("begin send Attack message.", Global.randseed);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYmF0dGxlLmpzIl0sIm5hbWVzIjpbIkFwaSIsInJlcXVpcmUiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiZ2V0QXBpIiwiZ2V0SG9zdCIsImdldFJhbmROdW1iZXIiLCJudW1iZXIiLCJyYW5kc2VlZCIsIlJhbmQiLCJnZXRSYW5kT25lIiwiUmFuZE9uZSIsInBvc3RVcGRhdGVTdGFyUG9zTXNnIiwibWF4WCIsImxvZyIsInJlcXVlc3QiLCJsb2FkZXIiLCJnZXRYTUxIdHRwUmVxdWVzdCIsInVybCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2VUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiZGF0YSIsIlVpbnQzMkFycmF5Iiwic3RhclBvc1JhbmRzZWVkIiwic3RhclBvc1JhbmROIiwic2VuZCIsIlVpbnQxNkFycmF5IiwicG9zdEJhdHRsZVN0YXJ0TXNnIiwicGFyc2VJbnQiLCJyZXNwb25zZVRleHQiLCJwb3N0QXR0YWNrTXNnIiwiZnJhbWUiLCJkaXN0IiwicmFuZG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsR0FBRyxHQUFHQyxPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVTtBQUNkLFdBQU8sSUFBSU4sR0FBSixFQUFQO0FBQ0gsR0FOSTtBQVFMO0FBQ0FPLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixXQUFPLGlCQUFQO0FBQ0gsR0FYSTtBQWFMO0FBQ0FDLEVBQUFBLGFBQWEsRUFBRSx1QkFBU0MsTUFBVCxFQUFnQjtBQUMzQixRQUFJUCxNQUFNLENB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LEVBQWlCQyxLQUFqQixDQUFoQixDQUFiLEVBYmlDLENBYXNCO0FBQzFEO0FBdEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBBcGkgPSByZXF1aXJlKFwiYXBpXCIpXHJcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgLy9cclxuICAgIGdldEFwaTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbmV3IEFwaSgpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W5Zyw5Z2A56uv5Y+jXHJcbiAgICBnZXRIb3N0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gXCIxMjcuMC4wLjE6MTMwMDFcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5bpmo/mnLrmlbBcclxuICAgIGdldFJhbmROdW1iZXI6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5yYW5kc2VlZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkuUmFuZChudW1iZXIsIEdsb2JhbC5yYW5kc2VlZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRPbmU6IGZ1bmN0aW9uKHJhbmRzZWVkKXtcclxuICAgICAgICBpZiAocmFuZHNlZWQgPT0gMCkge1xyXG4gICAgICAgICAgICByYW5kc2VlZCA9IEdsb2JhbC5yYW5kc2VlZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcGkoKS5SYW5kT25lKHJhbmRzZWVkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5HpgIHmm7TmlrBzdGFy5L2N572u5pu05paw5L+h5oGvXHJcbiAgICBwb3N0VXBkYXRlU3RhclBvc01zZzogZnVuY3Rpb24obWF4WCl7XHJcbiAgICAgICAgY2MubG9nKFwiYmVnaW4gc2VuZCBiYXR0bGUgc3RhcnQgbWVzc2FnZS5cIilcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEhvc3QoKSArIFwiL1VwZGF0ZVN0YXJQb3NcIlxyXG4gICAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKVxyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgMzAwKSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiVXBkYXRlU3RhclBvcyByZXNwb25zZTogXCIsIHJlcXVlc3QucmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBVaW50MzJBcnJheShyZXF1ZXN0LnJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiVXBkYXRlU3RhclBvcyBkYXRhOiBcIiwgZGF0YSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5zdGFyUG9zUmFuZHNlZWQgPSBkYXRhWzBdXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuc3RhclBvc1JhbmROID0gZGF0YVsxXVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKG5ldyBVaW50MTZBcnJheShbMSwgbWF4WF0pKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPkemAgeaImOaWl+W8gOWni+ivt+axglxyXG4gICAgcG9zdEJhdHRsZVN0YXJ0TXNnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLnJhbmRzZWVkID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLmxvZyhcImJlZ2luIHNlbmQgYmF0dGxlIHN0YXJ0IG1lc3NhZ2UuXCIpXHJcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRIb3N0KCkgKyBcIi9CYXR0bGVTdGFydFwiXHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpXHJcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCAzMDApKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwucmFuZHNlZWQgPSBwYXJzZUludChyZXF1ZXN0LnJlc3BvbnNlVGV4dClcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkJhdHRsZVN0YXJ0IHJlc3BvbnNlOiBcIiwgcmVxdWVzdC5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICByZXF1ZXN0LnNlbmQobmV3IFVpbnQxNkFycmF5KFsxXSkpIC8vcGFyYW0gMTog5pWw5o2u6ZW/5bqm77yMcGFyYW0gLi4uOiDlhbfkvZPmlbDmja5cclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5HpgIHmlLvlh7vor7fmsYJcclxuICAgIHBvc3RBdHRhY2tNc2c6IGZ1bmN0aW9uKGZyYW1lLCBkaXN0KSB7XHJcbiAgICAgICAgY2MubG9nKFwiYmVnaW4gc2VuZCBBdHRhY2sgbWVzc2FnZS5cIiwgR2xvYmFsLnJhbmRzZWVkKVxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0SG9zdCgpICsgXCIvQXR0YWNrXCJcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSlcclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDMwMCkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkF0dGFjayByZXNwb25zZTogXCIsIHJlcXVlc3QucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgdmFyIHJhbmRuID0gdGhpcy5nZXRSYW5kTnVtYmVyKGRpc3QpXHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKG5ldyBVaW50MTZBcnJheShbMywgZnJhbWUsIGRpc3QsIHJhbmRuXSkpIC8vcGFyYW0gMTog5pWw5o2u6ZW/5bqm77yMcGFyYW0gLi4uOiDlhbfkvZPmlbDmja5cclxuICAgIH1cclxufSlcclxuXHJcbiJdfQ==
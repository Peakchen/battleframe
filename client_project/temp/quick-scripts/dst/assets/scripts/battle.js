
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
      if (request.readyState == 4 && request.status >= 200 && request.status < 300) {//cc.log("Attack response: ", request.responseText)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYmF0dGxlLmpzIl0sIm5hbWVzIjpbIkFwaSIsInJlcXVpcmUiLCJHbG9iYWwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiZ2V0QXBpIiwiZ2V0SG9zdCIsIkFkZHIiLCJnZXRSYW5kTnVtYmVyIiwibnVtYmVyIiwicmFuZHNlZWQiLCJSYW5kIiwiZ2V0UmFuZE9uZSIsIlJhbmRPbmUiLCJwb3N0VXBkYXRlU3RhclBvc01zZyIsIm1heFgiLCJyZXF1ZXN0IiwibG9hZGVyIiwiZ2V0WE1MSHR0cFJlcXVlc3QiLCJ1cmwiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJsb2ciLCJyZXNwb25zZSIsImRhdGEiLCJVaW50MzJBcnJheSIsInN0YXJQb3NSYW5kc2VlZCIsInN0YXJQb3NSYW5kTiIsInNlbmQiLCJVaW50MTZBcnJheSIsInBvc3RCYXR0bGVTdGFydE1zZyIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwicG9zdEF0dGFja01zZyIsImZyYW1lIiwiZGlzdCIsInJhbmRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEdBQUcsR0FBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTDtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVU7QUFDZCxXQUFPLElBQUlOLEdBQUosRUFBUDtBQUNILEdBTkk7QUFRTDtBQUNBTyxFQUFBQSxPQUFPLEVBQUUsbUJBQVc7QUFDaEIsV0FBT0wsTUFBTSxDQUFDTSxJQUFkO0FBQ0gsR0FYSTtBQWFMO0FBQ0FDLEVBQUFBLGFBQWEsRUFBRSx1QkFBU0MsTUFBVCxFQUFnQjtB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Q0FBTyx3QkFBUCxFQUFpQ1YsT0FBTyxDQUFDb0IsWUFBekM7QUFDSDtBQUNKLEtBTEQ7O0FBT0FwQixJQUFBQSxPQUFPLENBQUNnQixJQUFSLENBQWEsSUFBSUMsV0FBSixDQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBYixFQWpCMkIsQ0FpQlE7QUFDdEMsR0FyRUk7QUF1RUw7QUFDQUksRUFBQUEsYUFBYSxFQUFFLHVCQUFTQyxLQUFULEVBQWdCQyxJQUFoQixFQUFzQjtBQUNqQztBQUNBLFFBQUl2QixPQUFPLEdBQUdkLEVBQUUsQ0FBQ2UsTUFBSCxDQUFVQyxpQkFBVixFQUFkO0FBQ0EsUUFBSUMsR0FBRyxHQUFHLEtBQUtiLE9BQUwsS0FBaUIsU0FBM0I7QUFDQVUsSUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsTUFBYixFQUFxQkQsR0FBckIsRUFBMEIsSUFBMUI7QUFDQUgsSUFBQUEsT0FBTyxDQUFDSyxnQkFBUixDQUF5QixjQUF6QixFQUF5QywwQkFBekM7O0FBQ0FMLElBQUFBLE9BQU8sQ0FBQ08sa0JBQVIsR0FBNkIsWUFBVTtBQUNuQyxVQUFJUCxPQUFPLENBQUNRLFVBQVIsSUFBc0IsQ0FBdEIsSUFBNEJSLE9BQU8sQ0FBQ1MsTUFBUixJQUFrQixHQUFsQixJQUF5QlQsT0FBTyxDQUFDUyxNQUFSLEdBQWlCLEdBQTFFLEVBQWdGLENBQzVFO0FBQ0g7QUFDSixLQUpEOztBQU1BLFFBQUllLEtBQUssR0FBRyxLQUFLaEMsYUFBTCxDQUFtQitCLElBQW5CLENBQVo7QUFDQXZCLElBQUFBLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYSxJQUFJQyxXQUFKLENBQWdCLENBQUMsQ0FBRCxFQUFJSyxLQUFKLEVBQVdDLElBQVgsRUFBaUJDLEtBQWpCLENBQWhCLENBQWIsRUFiaUMsQ0Fhc0I7QUFDMUQ7QUF0RkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEFwaSA9IHJlcXVpcmUoXCJhcGlcIilcclxubGV0IEdsb2JhbCA9IHJlcXVpcmUoXCJjb21tb25cIilcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICAvL1xyXG4gICAgZ2V0QXBpOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgQXBpKClcclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5blnLDlnYDnq6/lj6NcclxuICAgIGdldEhvc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuQWRkcjtcclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5bpmo/mnLrmlbBcclxuICAgIGdldFJhbmROdW1iZXI6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5yYW5kc2VlZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkuUmFuZChudW1iZXIsIEdsb2JhbC5yYW5kc2VlZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRPbmU6IGZ1bmN0aW9uKHJhbmRzZWVkKXtcclxuICAgICAgICBpZiAocmFuZHNlZWQgPT0gMCkge1xyXG4gICAgICAgICAgICByYW5kc2VlZCA9IEdsb2JhbC5yYW5kc2VlZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcGkoKS5SYW5kT25lKHJhbmRzZWVkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5HpgIHmm7TmlrBzdGFy5L2N572u5pu05paw5L+h5oGvXHJcbiAgICBwb3N0VXBkYXRlU3RhclBvc01zZzogZnVuY3Rpb24obWF4WCl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJiZWdpbiBzZW5kIGJhdHRsZSBzdGFydCBtZXNzYWdlLlwiKVxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0SG9zdCgpICsgXCIvVXBkYXRlU3RhclBvc1wiXHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpXHJcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCAzMDApKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJVcGRhdGVTdGFyUG9zIHJlc3BvbnNlOiBcIiwgcmVxdWVzdC5yZXNwb25zZSlcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KHJlcXVlc3QucmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJVcGRhdGVTdGFyUG9zIGRhdGE6IFwiLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLnN0YXJQb3NSYW5kc2VlZCA9IGRhdGFbMF1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5zdGFyUG9zUmFuZE4gPSBkYXRhWzFdXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICByZXF1ZXN0LnNlbmQobmV3IFVpbnQxNkFycmF5KFsxLCBtYXhYXSkpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Y+R6YCB5oiY5paX5byA5aeL6K+35rGCXHJcbiAgICBwb3N0QmF0dGxlU3RhcnRNc2c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwucmFuZHNlZWQgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYy5sb2coXCJiZWdpbiBzZW5kIGJhdHRsZSBzdGFydCBtZXNzYWdlLlwiKVxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0SG9zdCgpICsgXCIvQmF0dGxlU3RhcnRcIlxyXG4gICAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKVxyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgMzAwKSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLnJhbmRzZWVkID0gcGFyc2VJbnQocmVxdWVzdC5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJCYXR0bGVTdGFydCByZXNwb25zZTogXCIsIHJlcXVlc3QucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKG5ldyBVaW50MTZBcnJheShbMV0pKSAvL3BhcmFtIDE6IOaVsOaNrumVv+W6pu+8jHBhcmFtIC4uLjog5YW35L2T5pWw5o2uXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Y+R6YCB5pS75Ye76K+35rGCXHJcbiAgICBwb3N0QXR0YWNrTXNnOiBmdW5jdGlvbihmcmFtZSwgZGlzdCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiYmVnaW4gc2VuZCBBdHRhY2sgbWVzc2FnZS5cIiwgR2xvYmFsLnJhbmRzZWVkKVxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0SG9zdCgpICsgXCIvQXR0YWNrXCJcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSlcclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDMwMCkpIHtcclxuICAgICAgICAgICAgICAgIC8vY2MubG9nKFwiQXR0YWNrIHJlc3BvbnNlOiBcIiwgcmVxdWVzdC5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICB2YXIgcmFuZG4gPSB0aGlzLmdldFJhbmROdW1iZXIoZGlzdClcclxuICAgICAgICByZXF1ZXN0LnNlbmQobmV3IFVpbnQxNkFycmF5KFszLCBmcmFtZSwgZGlzdCwgcmFuZG5dKSkgLy9wYXJhbSAxOiDmlbDmja7plb/luqbvvIxwYXJhbSAuLi46IOWFt+S9k+aVsOaNrlxyXG4gICAgfVxyXG59KVxyXG5cclxuIl19
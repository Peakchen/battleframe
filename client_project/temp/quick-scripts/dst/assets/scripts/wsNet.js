
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/wsNet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5f02ULtVhD47PNH08lZ5uR', 'wsNet');
// scripts/wsNet.js

"use strict";

/**
 * websocket 
 */
var Global = require("common");

cc.Class({
  "extends": cc.Component,

  /*
  readyState:
      CONNECTING 0
      OPEN       1
      CLOSING    2
      CLOSED     3
  */
  swConnect: function swConnect() {
    if (Global.ws != null) {
      cc.log("readyState: ", Global.ws.readyState);

      if (Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN) {
        //已经连上就不必再连
        return;
      }
    }

    cc.log("addr: ", Global.wsAddr, Global.ws == null);
    ws = new WebSocket(Global.wsAddr);

    ws.onopen = function (e) {
      cc.log("ws open: ", ws.readyState);
    };

    ws.onmessage = function (e) {
      cc.log("ws message: ", e.data);
    };

    ws.onerror = function (e) {
      cc.log("ws error: ", ws.readyState);
    };

    ws.onclose = function (e) {
      cc.log("ws close: ", ws.readyState);
    };

    cc.log("global ws init, state: ", ws.readyState);
    Global.ws = ws;
  },

  /**
   * 
   * @param {*} data  具体数据, 1：长度，2：是否广播，3：... 具体消息数据
   */
  sendwsmessage: function sendwsmessage(data) {
    if (Global.ws == null) {
      return;
    }

    if (Global.ws != null) {
      if (Global.ws.readyState == WebSocket.CLOSED || Global.ws.readyState == WebSocket.CLOSING) {
        //正在断开或者已经断开，则不能发送消息
        return;
      }
    }

    cc.log("ws sendwsmessage.");
    Global.ws.send(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcd3NOZXQuanMiXSwibmFtZXMiOlsiR2xvYmFsIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJzd0Nvbm5lY3QiLCJ3cyIsImxvZyIsInJlYWR5U3RhdGUiLCJXZWJTb2NrZXQiLCJDT05ORUNUSU5HIiwiT1BFTiIsIndzQWRkciIsIm9ub3BlbiIsImUiLCJvbm1lc3NhZ2UiLCJkYXRhIiwib25lcnJvciIsIm9uY2xvc2UiLCJzZW5kd3NtZXNzYWdlIiwiQ0xPU0VEIiwiQ0xPU0lORyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUlBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQOztBQUdMOzs7Ozs7O0FBT0FDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVTtBQUNqQixRQUFJTCxNQUFNLENBQUNNLEVBQVAsSUFBYSxJQUFqQixFQUF1QjtBQUNuQkosTUFBQUEsRUFBRSxDQUFDSyxHQUFILENBQU8sY0FBUCxFQUF1QlAsTUFBTSxDQUFDTSxFQUFQLENBQVVFLFVBQWpDOztBQUNBLFVBQUlSLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRSxVQUFWLElBQXdCQyxTQUFTLENBQUNDLFVBQWxDLElBQWdEVixNQUFNLENBQUNNLEVBQVAsQ0FBVUUsVUFBVixJQUF3QkMsU0FBUyxDQUFDRSxJQUF0RixFQUE0RjtBQUFFO0FBQzFGO0FBQ0g7QUFDSjs7QUFFRFQsSUFBQUEsRUFBRSxDQUFDSyxHQUFILENBQU8sUUFBUCxFQUFpQlAsTUFBTSxDQUFDWSxNQUF4QixFQUFnQ1osTUFBTSxDQUFDTSxFQUFQLElBQWEsSUFBN0M7QUFDQUEsSUFBQUEsRUFBRSxHQUFHLElBQUlHLFNBQUosQ0FBY1QsTUFBTSxDQUFDWSxNQUFyQixDQUFMOztBQUNBTixJQUFBQSxFQUFFLENBQUNPLE1BQUgsR0FBWSxVQUFTQyxDQUFULEVBQVk7QUFDcEJaLE1BQUFBLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPLFdBQVAsRUFBb0JELEVBQUUsQ0FBQ0UsVUFBdkI7QUFDSCxLQUZEOztBQUlBRixJQUFBQSxFQUFFLENBQUNTLFNBQUgsR0FBZSxVQUFTRCxDQUFULEVBQVk7QUFDdkJaLE1BQUFBLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPLGNBQVAsRUFBdUJPLENBQUMsQ0FBQ0UsSUFBekI7QUFDSCxLQUZEOztBQUlBVixJQUFBQSxFQUFFLENBQUNXLE9BQUgsR0FBYSxVQUFVSCxDQUFWLEVBQWE7QUFDdEJaLE1BQUFBLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPLFlBQVAsRUFBcUJELEVBQUUsQ0FBQ0UsVUFBeEI7QUFDSCxLQUZEOztBQUlBRixJQUFBQSxFQUFFLENBQUNZLE9BQUgsR0FBYSxVQUFVSixDQUFWLEVBQWE7QUFDdEJaLE1BQUFBLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPLFlBQVAsRUFBcUJELEVBQUUsQ0FBQ0UsVUFBeEI7QUFDSCxLQUZEOztBQUlBTixJQUFBQSxFQUFFLENBQUNLLEdBQUgsQ0FBTyx5QkFBUCxFQUFrQ0QsRUFBRSxDQUFDRSxVQUFyQztBQUNBUixJQUFBQSxNQUFNLENBQUNNLEVBQVAsR0FBWUEsRUFBWjtBQUNILEdBdENJOztBQXdDTDs7OztBQUlBYSxFQUFBQSxhQUFhLEVBQUUsdUJBQVNILElBQVQsRUFBYztBQUV6QixRQUFJaEIsTUFBTSxDQUFDTSxFQUFQLElBQWEsSUFBakIsRUFBdUI7QUFDbkI7QUFDSDs7QUFFRCxRQUFJTixNQUFNLENBQUNNLEVBQVAsSUFBYSxJQUFqQixFQUF1QjtBQUNuQixVQUFJTixNQUFNLENBQUNNLEVBQVAsQ0FBVUUsVUFBVixJQUF3QkMsU0FBUyxDQUFDVyxNQUFsQyxJQUE0Q3BCLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRSxVQUFWLElBQXdCQyxTQUFTLENBQUNZLE9BQWxGLEVBQTJGO0FBQUU7QUFDekY7QUFDSDtBQUNKOztBQUVEbkIsSUFBQUEsRUFBRSxDQUFDSyxHQUFILENBQU8sbUJBQVA7QUFDQVAsSUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVnQixJQUFWLENBQWVOLElBQWY7QUFDSDtBQTFESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogd2Vic29ja2V0IFxyXG4gKi9cclxuXHJcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgLypcclxuICAgIHJlYWR5U3RhdGU6XHJcbiAgICAgICAgQ09OTkVDVElORyAwXHJcbiAgICAgICAgT1BFTiAgICAgICAxXHJcbiAgICAgICAgQ0xPU0lORyAgICAyXHJcbiAgICAgICAgQ0xPU0VEICAgICAzXHJcbiAgICAqL1xyXG4gICAgc3dDb25uZWN0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmIChHbG9iYWwud3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJyZWFkeVN0YXRlOiBcIiwgR2xvYmFsLndzLnJlYWR5U3RhdGUpXHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuQ09OTkVDVElORyB8fCBHbG9iYWwud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuT1BFTikgeyAvL+W3sue7j+i/nuS4iuWwseS4jeW/heWGjei/nlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLmxvZyhcImFkZHI6IFwiLCBHbG9iYWwud3NBZGRyLCBHbG9iYWwud3MgPT0gbnVsbClcclxuICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQoR2xvYmFsLndzQWRkcik7XHJcbiAgICAgICAgd3Mub25vcGVuID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJ3cyBvcGVuOiBcIiwgd3MucmVhZHlTdGF0ZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwid3MgbWVzc2FnZTogXCIsIGUuZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJ3cyBlcnJvcjogXCIsIHdzLnJlYWR5U3RhdGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3cy5vbmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwid3MgY2xvc2U6IFwiLCB3cy5yZWFkeVN0YXRlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MubG9nKFwiZ2xvYmFsIHdzIGluaXQsIHN0YXRlOiBcIiwgd3MucmVhZHlTdGF0ZSlcclxuICAgICAgICBHbG9iYWwud3MgPSB3c1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhICDlhbfkvZPmlbDmja4sIDHvvJrplb/luqbvvIwy77ya5piv5ZCm5bm/5pKt77yMM++8mi4uLiDlhbfkvZPmtojmga/mlbDmja5cclxuICAgICAqL1xyXG4gICAgc2VuZHdzbWVzc2FnZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdsb2JhbC53cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKEdsb2JhbC53cyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuQ0xPU0VEIHx8IEdsb2JhbC53cy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DTE9TSU5HKSB7IC8v5q2j5Zyo5pat5byA5oiW6ICF5bey57uP5pat5byA77yM5YiZ5LiN6IO95Y+R6YCB5raI5oGvXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MubG9nKFwid3Mgc2VuZHdzbWVzc2FnZS5cIilcclxuICAgICAgICBHbG9iYWwud3Muc2VuZChkYXRhKVxyXG4gICAgfVxyXG59KSJdfQ==
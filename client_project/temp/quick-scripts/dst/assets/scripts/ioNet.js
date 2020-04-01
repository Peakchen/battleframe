
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ioNet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b591fCkMpNAoTBTiEzeldr', 'ioNet');
// scripts/ioNet.js

"use strict";

/*
    客户端socket.on()监听的事件：
        connect：           连接成功
        connecting：        正在连接
        disconnect：        断开连接
        connect_failed：    连接失败
        error：             错误发生，并且无法被其他事件类型所处理
        message：           同服务器端message事件
        anything：          同服务器端anything事件
        reconnect_failed：  重连失败
        reconnect：         成功重连
        reconnecting：      正在重连

    当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
*/
var Global = require("common");

cc.Class({
  "extends": cc.Component,
  ioConnect: function ioConnect() {
    var iosocket = io.connect(Global.wsAddr);
    iosocket.on("connect", function () {
      cc.log("ionet connect.");
    });
    iosocket.on("message", function (data) {
      cc.log("ionet message: ", data);
    });
    iosocket.on("connecting", function () {
      cc.log("ionet connecting.");
    });
    iosocket.on("disconnect", function () {
      cc.log("ionet disconnect.");
    });
    iosocket.on("reconnecting", function () {
      cc.log("ionet reconnecting.");
    });
    iosocket.on("connecting", function () {
      cc.log("ionet connecting.");
    });
    iosocket.on("reconnect", function () {
      cc.log("ionet reconnect.");
    });
    iosocket.on("error", function () {
      cc.log("ionet error.");
    });
    Global.ioSocket = iosocket;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcaW9OZXQuanMiXSwibmFtZXMiOlsiR2xvYmFsIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJpb0Nvbm5lY3QiLCJpb3NvY2tldCIsImlvIiwiY29ubmVjdCIsIndzQWRkciIsIm9uIiwibG9nIiwiZGF0YSIsImlvU29ja2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFFBQUlDLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxPQUFILENBQVdSLE1BQU0sQ0FBQ1MsTUFBbEIsQ0FBZjtBQUVBSCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxTQUFaLEVBQXVCLFlBQVU7QUFDN0JSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLGdCQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxTQUFaLEVBQXVCLFVBQVNFLElBQVQsRUFBYztBQUNqQ1YsTUFBQUEsRUFBRSxDQUFDUyxHQUFILENBQU8saUJBQVAsRUFBMEJDLElBQTFCO0FBQ0gsS0FGRDtBQUlBTixJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxZQUFaLEVBQTBCLFlBQVU7QUFDaENSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLG1CQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxZQUFaLEVBQTBCLFlBQVU7QUFDaENSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLG1CQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxjQUFaLEVBQTRCLFlBQVU7QUFDbENSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLHFCQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxZQUFaLEVBQTBCLFlBQVU7QUFDaENSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLG1CQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFlBQVU7QUFDL0JSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLGtCQUFQO0FBQ0gsS0FGRDtBQUlBTCxJQUFBQSxRQUFRLENBQUNJLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVU7QUFDM0JSLE1BQUFBLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPLGNBQVA7QUFDSCxLQUZEO0FBSUFYLElBQUFBLE1BQU0sQ0FBQ2EsUUFBUCxHQUFrQlAsUUFBbEI7QUFDSDtBQXZDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gICAg5a6i5oi356uvc29ja2V0Lm9uKCnnm5HlkKznmoTkuovku7bvvJpcclxuICAgICAgICBjb25uZWN077yaICAgICAgICAgICDov57mjqXmiJDlip9cclxuICAgICAgICBjb25uZWN0aW5n77yaICAgICAgICDmraPlnKjov57mjqVcclxuICAgICAgICBkaXNjb25uZWN077yaICAgICAgICDmlq3lvIDov57mjqVcclxuICAgICAgICBjb25uZWN0X2ZhaWxlZO+8miAgICDov57mjqXlpLHotKVcclxuICAgICAgICBlcnJvcu+8miAgICAgICAgICAgICDplJnor6/lj5HnlJ/vvIzlubbkuJTml6Dms5Xooqvlhbbku5bkuovku7bnsbvlnovmiYDlpITnkIZcclxuICAgICAgICBtZXNzYWdl77yaICAgICAgICAgICDlkIzmnI3liqHlmajnq69tZXNzYWdl5LqL5Lu2XHJcbiAgICAgICAgYW55dGhpbmfvvJogICAgICAgICAg5ZCM5pyN5Yqh5Zmo56uvYW55dGhpbmfkuovku7ZcclxuICAgICAgICByZWNvbm5lY3RfZmFpbGVk77yaICDph43ov57lpLHotKVcclxuICAgICAgICByZWNvbm5lY3TvvJogICAgICAgICDmiJDlip/ph43ov55cclxuICAgICAgICByZWNvbm5lY3RpbmfvvJogICAgICDmraPlnKjph43ov55cclxuXHJcbiAgICDlvZPnrKzkuIDmrKHov57mjqXml7bvvIzkuovku7bop6blj5Hpobrluo/kuLrvvJpjb25uZWN0aW5nLT5jb25uZWN077yb5b2T5aSx5Y676L+e5o6l5pe277yM5LqL5Lu26Kem5Y+R6aG65bqP5Li677yaZGlzY29ubmVjdC0+cmVjb25uZWN0aW5n77yI5Y+v6IO96L+b6KGM5aSa5qyh77yJLT5jb25uZWN0aW5nLT5yZWNvbm5lY3QtPmNvbm5lY3TjgIJcclxuKi9cclxuXHJcbmxldCBHbG9iYWwgPSByZXF1aXJlKFwiY29tbW9uXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgaW9Db25uZWN0OiBmdW5jdGlvbiAoKXtcclxuICAgICAgICB2YXIgaW9zb2NrZXQgPSBpby5jb25uZWN0KEdsb2JhbC53c0FkZHIpICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlvc29ja2V0Lm9uKFwiY29ubmVjdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJpb25ldCBjb25uZWN0LlwiKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpb3NvY2tldC5vbihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImlvbmV0IG1lc3NhZ2U6IFwiLCBkYXRhKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpb3NvY2tldC5vbihcImNvbm5lY3RpbmdcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2MubG9nKFwiaW9uZXQgY29ubmVjdGluZy5cIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW9zb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImlvbmV0IGRpc2Nvbm5lY3QuXCIpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlvc29ja2V0Lm9uKFwicmVjb25uZWN0aW5nXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImlvbmV0IHJlY29ubmVjdGluZy5cIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW9zb2NrZXQub24oXCJjb25uZWN0aW5nXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImlvbmV0IGNvbm5lY3RpbmcuXCIpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlvc29ja2V0Lm9uKFwicmVjb25uZWN0XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImlvbmV0IHJlY29ubmVjdC5cIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW9zb2NrZXQub24oXCJlcnJvclwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJpb25ldCBlcnJvci5cIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgR2xvYmFsLmlvU29ja2V0ID0gaW9zb2NrZXRcclxuICAgIH1cclxufSkiXX0=
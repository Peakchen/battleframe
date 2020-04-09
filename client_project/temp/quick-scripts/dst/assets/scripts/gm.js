
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/gm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2b4382aBhFPO6s4qV0x0VrN', 'gm');
// scripts/gm.js

"use strict";

var wsNet = require("wsNet");

var Global = require("common"); // gm id列表


var GMID = {
  resetStarPos: 1
};
cc.Class({
  getwsNetObj: function getwsNetObj() {
    return new wsNet();
  },
  sendResetStarPos: function sendResetStarPos() {
    cc.log("reset star pos...");
    var buff = new ArrayBuffer(28);
    var data = new Uint32Array(buff);
    data[0] = Global.MID_GM; //消息ID

    data[1] = 5; //消息长度

    data[2] = GMID.resetStarPos; //gm 子命令id

    var nodexflag = 1;
    var nodex = 0.0;

    if (nodex < 0.0) {
      nodexflag = 2;
      nodex = 0.0 - nodex;
    }

    data[3] = nodexflag; //x坐标正负

    data[4] = parseInt(nodex); //x坐标

    var nodeyflag = 1;
    var nodey = -88;

    if (nodey < 0.0) {
      nodeyflag = 2;
      nodey = 0.0 - nodey;
    }

    data[5] = nodeyflag; //y坐标正负

    data[6] = parseInt(nodey); //y坐标

    this.getwsNetObj().sendwsmessage(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ20uanMiXSwibmFtZXMiOlsid3NOZXQiLCJyZXF1aXJlIiwiR2xvYmFsIiwiR01JRCIsInJlc2V0U3RhclBvcyIsImNjIiwiQ2xhc3MiLCJnZXR3c05ldE9iaiIsInNlbmRSZXNldFN0YXJQb3MiLCJsb2ciLCJidWZmIiwiQXJyYXlCdWZmZXIiLCJkYXRhIiwiVWludDMyQXJyYXkiLCJNSURfR00iLCJub2RleGZsYWciLCJub2RleCIsInBhcnNlSW50Iiwibm9kZXlmbGFnIiwibm9kZXkiLCJzZW5kd3NtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQixFQUVBOzs7QUFDQSxJQUFJRSxJQUFJLEdBQUc7QUFDUEMsRUFBQUEsWUFBWSxFQUFFO0FBRFAsQ0FBWDtBQUlBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUVMQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVc7QUFDcEIsV0FBTyxJQUFJUCxLQUFKLEVBQVA7QUFDSCxHQUpJO0FBTUxRLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFVO0FBQ3hCSCxJQUFBQSxFQUFFLENBQUNJLEdBQUgsQ0FBTyxtQkFBUDtBQUNBLFFBQUlDLElBQUksR0FBRyxJQUFJQyxXQUFKLENBQWdCLEVBQWhCLENBQVg7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBSUMsV0FBSixDQUFnQkgsSUFBaEIsQ0FBWDtBQUVBRSxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVWLE1BQU0sQ0FBQ1ksTUFBakIsQ0FMd0IsQ0FLUTs7QUFDaENGLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxDQUFWLENBTndCLENBTVE7O0FBQ2hDQSxJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVULElBQUksQ0FBQ0MsWUFBZixDQVB3QixDQU9ROztBQUVoQyxRQUFJVyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsR0FBWjs7QUFDQSxRQUFJQSxLQUFLLEdBQUcsR0FBWixFQUFpQjtBQUNiRCxNQUFBQSxTQUFTLEdBQUcsQ0FBWjtBQUNBQyxNQUFBQSxLQUFLLEdBQUcsTUFBTUEsS0FBZDtBQUNIOztBQUVESixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVHLFNBQVYsQ0FoQndCLENBZ0JROztBQUNoQ0gsSUFBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVSyxRQUFRLENBQUNELEtBQUQsQ0FBbEIsQ0FqQndCLENBaUJROztBQUNoQyxRQUFJRSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsQ0FBQyxFQUFiOztBQUNBLFFBQUlBLEtBQUssR0FBRyxHQUFaLEVBQWlCO0FBQ2JELE1BQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0FDLE1BQUFBLEtBQUssR0FBRyxNQUFNQSxLQUFkO0FBQ0g7O0FBRURQLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVU0sU0FBVixDQXpCd0IsQ0F5QlE7O0FBQ2hDTixJQUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVVLLFFBQVEsQ0FBQ0UsS0FBRCxDQUFsQixDQTFCd0IsQ0EwQlE7O0FBRWhDLFNBQUtaLFdBQUwsR0FBbUJhLGFBQW5CLENBQWlDUixJQUFqQztBQUNIO0FBbkNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcclxubGV0IEdsb2JhbCA9IHJlcXVpcmUoXCJjb21tb25cIilcclxuXHJcbi8vIGdtIGlk5YiX6KGoXHJcbnZhciBHTUlEID0ge1xyXG4gICAgcmVzZXRTdGFyUG9zOiAxLFxyXG59XHJcblxyXG5jYy5DbGFzcyh7XHJcblxyXG4gICAgZ2V0d3NOZXRPYmo6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJlc2V0U3RhclBvczogZnVuY3Rpb24oKXtcclxuICAgICAgICBjYy5sb2coXCJyZXNldCBzdGFyIHBvcy4uLlwiKVxyXG4gICAgICAgIHZhciBidWZmID0gbmV3IEFycmF5QnVmZmVyKDI4KVxyXG4gICAgICAgIHZhciBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmYpXHJcblxyXG4gICAgICAgIGRhdGFbMF0gPSBHbG9iYWwuTUlEX0dNICAgICAgICAgLy/mtojmga9JRFxyXG4gICAgICAgIGRhdGFbMV0gPSA1ICAgICAgICAgICAgICAgICAgICAgLy/mtojmga/plb/luqZcclxuICAgICAgICBkYXRhWzJdID0gR01JRC5yZXNldFN0YXJQb3MgICAgIC8vZ20g5a2Q5ZG95LukaWRcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbm9kZXhmbGFnID0gMVxyXG4gICAgICAgIHZhciBub2RleCA9IDAuMFxyXG4gICAgICAgIGlmIChub2RleCA8IDAuMCkge1xyXG4gICAgICAgICAgICBub2RleGZsYWcgPSAyXHJcbiAgICAgICAgICAgIG5vZGV4ID0gMC4wIC0gbm9kZXhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGFbM10gPSBub2RleGZsYWcgICAgICAgICAgICAgLy945Z2Q5qCH5q2j6LSfXHJcbiAgICAgICAgZGF0YVs0XSA9IHBhcnNlSW50KG5vZGV4KSAgICAgICAvL3jlnZDmoIdcclxuICAgICAgICB2YXIgbm9kZXlmbGFnID0gMVxyXG4gICAgICAgIHZhciBub2RleSA9IC04OCBcclxuICAgICAgICBpZiAobm9kZXkgPCAwLjApIHtcclxuICAgICAgICAgICAgbm9kZXlmbGFnID0gMlxyXG4gICAgICAgICAgICBub2RleSA9IDAuMCAtIG5vZGV5XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhWzVdID0gbm9kZXlmbGFnICAgICAgICAgICAgIC8veeWdkOagh+ato+i0n1xyXG4gICAgICAgIGRhdGFbNl0gPSBwYXJzZUludChub2RleSkgICAgICAgLy955Z2Q5qCHXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0d3NOZXRPYmooKS5zZW5kd3NtZXNzYWdlKGRhdGEpXHJcbiAgICB9XHJcbn0pIl19
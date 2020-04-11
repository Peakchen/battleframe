
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85d2af0NxdLsYumGChyxxL/', 'login');
// scripts/login.js

"use strict";

var Game = require("Game");

var Global = require("common");

var wsNet = require("wsNet");

cc.Class({
  "extends": cc.Component,
  properties: {
    //注册
    registerBtn: {
      "default": null,
      type: cc.Button
    },
    //登陆
    loginBtn: {
      "default": null,
      type: cc.Button
    },
    //用户名
    nameBox: {
      "default": null,
      type: cc.EditBox
    },
    //密码
    pwdBox: {
      "default": null,
      type: cc.EditBox
    },
    //提示信息显示
    tip_info: {
      "default": null,
      type: cc.Label
    }
  },
  getGameObj: function getGameObj() {
    return new Game();
  },
  getwsNetObj: function getwsNetObj() {
    return new wsNet();
  },
  onLoad: function onLoad() {
    cc.log("login init...");
    this.getwsNetObj().swConnect();
    Global.PlayerSessionMap = new Map();
    Global.NewplayerMap = new Map();
    Global.newPlayerIds = new Array();
    Global.DelPlayerIds = new Array();
    this.registerBtn.interactable = false;
    this.loginBtn.interactable = false;
    this.registerBtn.node.on("click", this.onRegister, this);
    this.loginBtn.node.on("click", this.onLogin, this);
    this.nameBox.node.on("text-changed", this.onName, this);
    this.pwdBox.node.on("text-changed", this.onPwd, this);
  },
  // Eventobj.detail 获得组件对象
  onRegister: function onRegister(Eventobj) {
    cc.log("click register...");

    if (this.getwsNetObj().CanSendMsg()) {
      this.sendAccountMessage(Global.MID_Register);
      if (Global.FirstLogin == null) Global.FirstLogin = 1;
      Global.DoRegisterAction = 1;
    }
  },
  onLogin: function onLogin(Eventobj) {
    cc.log("click login...");

    if (this.getwsNetObj().CanSendMsg()) {
      this.sendAccountMessage(Global.MID_login);
      Global.DoLoginAction = 1;
      if (Global.FirstLogin == null) Global.FirstLogin = 1;
    }
  },
  sendAccountMessage: function sendAccountMessage(id) {
    var buffer = new ArrayBuffer(16);
    var msg = new Uint32Array(buffer);
    msg[0] = id;
    msg[1] = 2;
    msg[2] = parseInt(Global.AccountName);
    msg[3] = parseInt(Global.AccountPwd);
    this.getwsNetObj().sendwsmessage(msg);
  },
  onName: function onName(Eventobj) {
    cc.log("edit name: ", Eventobj.string);
    Global.AccountName = Eventobj.string;
    this.checkInputContent();
  },
  onPwd: function onPwd(Eventobj) {
    cc.log("edit pwd: ", Eventobj.string);
    Global.AccountPwd = Eventobj.string;
    this.checkInputContent();
  },
  //切换到主场景
  change2GameMain: function change2GameMain() {
    cc.director.loadScene('game');
  },
  //检查注册结果
  checkRegisterActionResult: function checkRegisterActionResult() {
    if (Global.DoRegisterAction == 1) {
      cc.log("RegisterSucc: ", Global.RegisterSucc);

      if (Global.RegisterSucc == 0) {
        this.tip_info.string = "用户名和密码重复或者错误";
      } else {
        this.tip_info.string = "注册成功";
      }

      Global.DoRegisterAction = 0;
    }
  },
  //检查登陆结果
  checkLoginActionResult: function checkLoginActionResult() {
    if (Global.DoLoginAction == 1 && Global.mySessionId != null) {
      //等到回复消息正常取值
      this.scheduleOnce(function () {
        cc.log("LoginSucc: ", Global.LoginSucc);

        if (Global.LoginSucc == 0) {
          this.tip_info.string = "用户名和密码重复或者错误";
        } else {
          this.tip_info.string = "登陆成功";
          cc.log("玩家登陆成功, id：", Global.mySessionId); // 切换场景

          this.change2GameMain();
        }

        Global.DoLoginAction = 0;
      }, 2);
    } else if (Global.LoginSucc == 0) {
      this.tip_info.string = "登陆失败";
      this.onLogin(null);
    }
  },
  //是否都是数字
  containDigital: function containDigital(str) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(str);
  },
  //检查输入框内容是否可用
  checkInputContent: function checkInputContent() {
    var disableShow = true;

    if (Global.AccountName == "" || Global.AccountPwd == "") {
      this.tip_info.string = "用户名或者密码不能为空！！！";
    } else if (this.containDigital(Global.AccountName) == false && this.containDigital(Global.AccountPwd) == false) {
      this.tip_info.string = "用户名或者密码不为数字！！！";
    } else if (parseInt(Global.AccountName) > Global.maxDigital || parseInt(Global.AccountPwd) > Global.maxDigital) {
      this.tip_info.string = "用户名或者密码长度超了！！！";
    } else {
      disableShow = false;
    }

    if (!disableShow) {
      this.registerBtn.interactable = true;
      this.loginBtn.interactable = true;
    }
  },
  update: function update(dt) {
    //cc.log("login update...")
    this.checkRegisterActionResult();
    this.checkLoginActionResult();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbG9naW4uanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJHbG9iYWwiLCJ3c05ldCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicmVnaXN0ZXJCdG4iLCJ0eXBlIiwiQnV0dG9uIiwibG9naW5CdG4iLCJuYW1lQm94IiwiRWRpdEJveCIsInB3ZEJveCIsInRpcF9pbmZvIiwiTGFiZWwiLCJnZXRHYW1lT2JqIiwiZ2V0d3NOZXRPYmoiLCJvbkxvYWQiLCJsb2ciLCJzd0Nvbm5lY3QiLCJQbGF5ZXJTZXNzaW9uTWFwIiwiTWFwIiwiTmV3cGxheWVyTWFwIiwibmV3UGxheWVySWRzIiwiQXJyYXkiLCJEZWxQbGF5ZXJJZHMiLCJpbnRlcmFjdGFibGUiLCJub2RlIiwib24iLCJvblJlZ2lzdGVyIiwib25Mb2dpbiIsIm9uTmFtZSIsIm9uUHdkIiwiRXZlbnRvYmoiLCJDYW5TZW5kTXNnIiwic2VuZEFjY291bnRNZXNzYWdlIiwiTUlEX1JlZ2lzdGVyIiwiRmlyc3RMb2dpbiIsIkRvUmVnaXN0ZXJBY3Rpb24iLCJNSURfbG9naW4iLCJEb0xvZ2luQWN0aW9uIiwiaWQiLCJidWZmZXIiLCJBcnJheUJ1ZmZlciIsIm1zZyIsIlVpbnQzMkFycmF5IiwicGFyc2VJbnQiLCJBY2NvdW50TmFtZSIsIkFjY291bnRQd2QiLCJzZW5kd3NtZXNzYWdlIiwic3RyaW5nIiwiY2hlY2tJbnB1dENvbnRlbnQiLCJjaGFuZ2UyR2FtZU1haW4iLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImNoZWNrUmVnaXN0ZXJBY3Rpb25SZXN1bHQiLCJSZWdpc3RlclN1Y2MiLCJjaGVja0xvZ2luQWN0aW9uUmVzdWx0IiwibXlTZXNzaW9uSWQiLCJzY2hlZHVsZU9uY2UiLCJMb2dpblN1Y2MiLCJjb250YWluRGlnaXRhbCIsInN0ciIsInJlZyIsIlJlZ0V4cCIsInRlc3QiLCJkaXNhYmxlU2hvdyIsIm1heERpZ2l0YWwiLCJ1cGRh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VyxjQUFMLENBQW9CN0QsTUFBTSxDQUFDK0MsV0FBM0IsS0FBMkMsS0FBM0MsSUFBb0QsS0FBS2MsY0FBTCxDQUFvQjdELE1BQU0sQ0FBQ2dELFVBQTNCLEtBQTBDLEtBQWxHLEVBQXlHO0FBQzNHLFdBQUtuQyxRQUFMLENBQWNxQyxNQUFkLEdBQXVCLGdCQUF2QjtBQUNILEtBRkssTUFFQSxJQUFLSixRQUFRLENBQUM5QyxNQUFNLENBQUMrQyxXQUFSLENBQVIsR0FBK0IvQyxNQUFNLENBQUNtRSxVQUF2QyxJQUF1RHJCLFFBQVEsQ0FBQzlDLE1BQU0sQ0FBQ2dELFVBQVIsQ0FBUixHQUE4QmhELE1BQU0sQ0FBQ21FLFVBQWhHLEVBQTZHO0FBQy9HLFdBQUt0RCxRQUFMLENBQWNxQyxNQUFkLEdBQXVCLGdCQUF2QjtBQUNILEtBRkssTUFFRDtBQUNEZ0IsTUFBQUEsV0FBVyxHQUFHLEtBQWQ7QUFDSDs7QUFFRCxRQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDZCxXQUFLNUQsV0FBTCxDQUFpQm9CLFlBQWpCLEdBQWdDLElBQWhDO0FBQ0EsV0FBS2pCLFFBQUwsQ0FBY2lCLFlBQWQsR0FBNkIsSUFBN0I7QUFDSDtBQUNKLEdBektJO0FBMktMMEMsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEI7QUFDQSxTQUFLZCx5QkFBTDtBQUNBLFNBQUtFLHNCQUFMO0FBQ0g7QUEvS0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEdhbWUgPSByZXF1aXJlKFwiR2FtZVwiKVxyXG5sZXQgR2xvYmFsID0gcmVxdWlyZShcImNvbW1vblwiKVxyXG5sZXQgd3NOZXQgPSByZXF1aXJlKFwid3NOZXRcIilcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy/ms6jlhoxcclxuICAgICAgICByZWdpc3RlckJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+eZu+mZhlxyXG4gICAgICAgIGxvZ2luQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v55So5oi35ZCNXHJcbiAgICAgICAgbmFtZUJveDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lr4bnoIFcclxuICAgICAgICBwd2RCb3g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5o+Q56S65L+h5oGv5pi+56S6XHJcbiAgICAgICAgdGlwX2luZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdhbWVPYmo6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lKCk7XHJcbiAgICB9LCAgXHJcblxyXG4gICAgZ2V0d3NOZXRPYmo6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgd3NOZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJsb2dpbiBpbml0Li4uXCIpXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0d3NOZXRPYmooKS5zd0Nvbm5lY3QoKVxyXG5cclxuICAgICAgICBHbG9iYWwuUGxheWVyU2Vzc2lvbk1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBHbG9iYWwuTmV3cGxheWVyTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIEdsb2JhbC5uZXdQbGF5ZXJJZHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBHbG9iYWwuRGVsUGxheWVySWRzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJCdG4uaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmxvZ2luQnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJCdG4ubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25SZWdpc3RlciwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkxvZ2luLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lQm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbk5hbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucHdkQm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vblB3ZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEV2ZW50b2JqLmRldGFpbCDojrflvpfnu4Tku7blr7nosaFcclxuICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKEV2ZW50b2JqKXtcclxuICAgICAgICBjYy5sb2coXCJjbGljayByZWdpc3Rlci4uLlwiKVxyXG4gICAgICAgIGlmICh0aGlzLmdldHdzTmV0T2JqKCkuQ2FuU2VuZE1zZygpKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQWNjb3VudE1lc3NhZ2UoR2xvYmFsLk1JRF9SZWdpc3RlcilcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5GaXJzdExvZ2luID09IG51bGwgKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkZpcnN0TG9naW4gPSAxXHJcbiAgICAgICAgICAgIEdsb2JhbC5Eb1JlZ2lzdGVyQWN0aW9uID0gMVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2dpbjogZnVuY3Rpb24oRXZlbnRvYmope1xyXG4gICAgICAgIGNjLmxvZyhcImNsaWNrIGxvZ2luLi4uXCIpXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0d3NOZXRPYmooKS5DYW5TZW5kTXNnKCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRBY2NvdW50TWVzc2FnZShHbG9iYWwuTUlEX2xvZ2luKVxyXG4gICAgICAgICAgICBHbG9iYWwuRG9Mb2dpbkFjdGlvbiA9IDFcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5GaXJzdExvZ2luID09IG51bGwgKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkZpcnN0TG9naW4gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kQWNjb3VudE1lc3NhZ2U6IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcclxuICAgICAgICB2YXIgbXNnID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XHJcbiAgICAgICAgbXNnWzBdID0gaWRcclxuICAgICAgICBtc2dbMV0gPSAyXHJcbiAgICAgICAgbXNnWzJdID0gcGFyc2VJbnQoR2xvYmFsLkFjY291bnROYW1lKVxyXG4gICAgICAgIG1zZ1szXSA9IHBhcnNlSW50KEdsb2JhbC5BY2NvdW50UHdkKVxyXG4gICAgICAgIHRoaXMuZ2V0d3NOZXRPYmooKS5zZW5kd3NtZXNzYWdlKG1zZylcclxuICAgIH0sXHJcblxyXG4gICAgb25OYW1lOiBmdW5jdGlvbihFdmVudG9iail7XHJcbiAgICAgICAgY2MubG9nKFwiZWRpdCBuYW1lOiBcIiwgRXZlbnRvYmouc3RyaW5nKVxyXG4gICAgICAgIEdsb2JhbC5BY2NvdW50TmFtZSA9IEV2ZW50b2JqLnN0cmluZ1xyXG4gICAgICAgIHRoaXMuY2hlY2tJbnB1dENvbnRlbnQoKVxyXG4gICAgfSxcclxuXHJcbiAgICBvblB3ZDogZnVuY3Rpb24oRXZlbnRvYmope1xyXG4gICAgICAgIGNjLmxvZyhcImVkaXQgcHdkOiBcIiwgRXZlbnRvYmouc3RyaW5nKVxyXG4gICAgICAgIEdsb2JhbC5BY2NvdW50UHdkID0gRXZlbnRvYmouc3RyaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja0lucHV0Q29udGVudCgpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YiH5o2i5Yiw5Li75Zy65pmvXHJcbiAgICBjaGFuZ2UyR2FtZU1haW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4Dmn6Xms6jlhoznu5PmnpxcclxuICAgIGNoZWNrUmVnaXN0ZXJBY3Rpb25SZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5Eb1JlZ2lzdGVyQWN0aW9uID09IDEpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiUmVnaXN0ZXJTdWNjOiBcIiwgR2xvYmFsLlJlZ2lzdGVyU3VjYylcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5SZWdpc3RlclN1Y2MgPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwX2luZm8uc3RyaW5nID0gXCLnlKjmiLflkI3lkozlr4bnoIHph43lpI3miJbogIXplJnor69cIlxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwX2luZm8uc3RyaW5nID0gXCLms6jlhozmiJDlip9cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5Eb1JlZ2lzdGVyQWN0aW9uID0gMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4Dmn6XnmbvpmYbnu5PmnpxcclxuICAgIGNoZWNrTG9naW5BY3Rpb25SZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5Eb0xvZ2luQWN0aW9uID09IDEgJiYgR2xvYmFsLm15U2Vzc2lvbklkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy/nrYnliLDlm57lpI3mtojmga/mraPluLjlj5blgLxcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIkxvZ2luU3VjYzogXCIsIEdsb2JhbC5Mb2dpblN1Y2MpXHJcbiAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLkxvZ2luU3VjYyA9PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwX2luZm8uc3RyaW5nID0gXCLnlKjmiLflkI3lkozlr4bnoIHph43lpI3miJbogIXplJnor69cIlxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBfaW5mby5zdHJpbmcgPSBcIueZu+mZhuaIkOWKn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi546p5a6255m76ZmG5oiQ5YqfLCBpZO+8mlwiLCBHbG9iYWwubXlTZXNzaW9uSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5YiH5o2i5Zy65pmvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2UyR2FtZU1haW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkRvTG9naW5BY3Rpb24gPSAwXHJcbiAgICAgICAgICAgICB9LDIpO1xyXG4gICAgICAgIH1lbHNlIGlmIChHbG9iYWwuTG9naW5TdWNjID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9pbmZvLnN0cmluZyA9IFwi55m76ZmG5aSx6LSlXCJcclxuICAgICAgICAgICAgdGhpcy5vbkxvZ2luKG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aYr+WQpumDveaYr+aVsOWtl1xyXG4gICAgY29udGFpbkRpZ2l0YWw6IGZ1bmN0aW9uKHN0cil7XHJcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJeWzAtOV0qJFwiKVxyXG4gICAgICAgIHJldHVybiByZWcudGVzdChzdHIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5qOA5p+l6L6T5YWl5qGG5YaF5a655piv5ZCm5Y+v55SoXHJcbiAgICBjaGVja0lucHV0Q29udGVudDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZGlzYWJsZVNob3cgPSB0cnVlXHJcbiAgICAgICAgaWYgKEdsb2JhbC5BY2NvdW50TmFtZSA9PSBcIlwiIHx8IEdsb2JhbC5BY2NvdW50UHdkID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50aXBfaW5mby5zdHJpbmcgPSBcIueUqOaIt+WQjeaIluiAheWvhueggeS4jeiDveS4uuepuu+8ge+8ge+8gVwiXHJcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuY29udGFpbkRpZ2l0YWwoR2xvYmFsLkFjY291bnROYW1lKSA9PSBmYWxzZSAmJiB0aGlzLmNvbnRhaW5EaWdpdGFsKEdsb2JhbC5BY2NvdW50UHdkKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9pbmZvLnN0cmluZyA9IFwi55So5oi35ZCN5oiW6ICF5a+G56CB5LiN5Li65pWw5a2X77yB77yB77yBXCJcclxuICAgICAgICB9ZWxzZSBpZiAoKHBhcnNlSW50KEdsb2JhbC5BY2NvdW50TmFtZSkgPiBHbG9iYWwubWF4RGlnaXRhbCkgfHwgKHBhcnNlSW50KEdsb2JhbC5BY2NvdW50UHdkKSA+IEdsb2JhbC5tYXhEaWdpdGFsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9pbmZvLnN0cmluZyA9IFwi55So5oi35ZCN5oiW6ICF5a+G56CB6ZW/5bqm6LaF5LqG77yB77yB77yBXCJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGlzYWJsZVNob3cgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkaXNhYmxlU2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQnRuLmludGVyYWN0YWJsZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwibG9naW4gdXBkYXRlLi4uXCIpXHJcbiAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyQWN0aW9uUmVzdWx0KClcclxuICAgICAgICB0aGlzLmNoZWNrTG9naW5BY3Rpb25SZXN1bHQoKVxyXG4gICAgfVxyXG59KSJdfQ==
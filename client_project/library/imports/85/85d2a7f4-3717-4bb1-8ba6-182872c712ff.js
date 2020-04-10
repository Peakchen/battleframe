"use strict";
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
    if (Global.DoLoginAction == 1) {
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
      }, 1);
    }
  },
  //是否都是数字
  containDigital: function containDigital(str) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(str);
  },
  //检查输入框内容是否可用
  checkInputContent: function checkInputContent() {
    // if (Global.DoRegisterAction == 0 || Global.DoLoginAction == 0 ){
    //     return
    // }
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
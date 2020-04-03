"use strict";
cc._RF.push(module, '6c688v72QdOKamCGCT+xaAd', 'Player');
// scripts/Player.js

"use strict";

var Global = require("common");

var wsNet = require("wsNet");

cc.Class({
  "extends": cc.Component,
  properties: {
    // 主角跳跃高度
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 最大移动速度
    maxMoveSpeed: 0,
    // 加速度
    accel: 0,
    // 跳跃音效资源
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
    },
    //
    accDirection: 0
  },
  getwsNetObj: function getwsNetObj() {
    return new wsNet();
  },
  setJumpAction: function setJumpAction() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()); // 下落

    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()); // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法

    var callback = cc.callFunc(this.playJumpSound, this); // 不断重复，而且每次完成落地动作后调用回调来播放声音

    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
  },
  playJumpSound: function playJumpSound() {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  onKeyDown: function onKeyDown(event) {
    // set a flag when key pressed
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;

      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    // unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },
  onLoad: function onLoad() {
    cc.game.setFrameRate(100);
    this.getwsNetObj().swConnect();
    Global.FirstLogin = null; // 初始化跳跃动作
    //this.jumpAction = this.setJumpAction();
    //this.node.runAction(this.jumpAction);
    // 加速度方向开关

    this.accLeft = false;
    this.accRight = false; // 主角当前水平方向速度

    this.xSpeed = (Math.random() - 0.5) * 2 * 10; // 初始化键盘输入监听

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); //初始化小球位置

    this.randPlayerPos();
  },
  onDestroy: function onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  //初始化随机小球所在位置，然后广播给其他人
  randPlayerPos: function randPlayerPos() {
    this.node.x = this.xSpeed * (this.node.width / 2);
    this.xSpeed = 0; //this.sendPlayerPos(Global.MID_login)
    //cc.log("randPlayerPos player pos: ", this.node.x, this.node.y)
  },
  stop: function stop() {
    this.xSpeed = 0;
  },
  sendPlayerPos: function sendPlayerPos(msgid) {
    cc.log("send player pos: ", msgid);
    var buff = new ArrayBuffer(24);
    var data = new Uint32Array(buff);
    data[0] = msgid; //消息ID

    data[1] = 4; //消息长度
    //data[2] = 2 //广播消息

    var nodexflag = 1;
    var nodex = this.node.x;

    if (this.node.x < 0.0) {
      nodexflag = 2;
    }

    if (nodex < 0.0) {
      nodex = 0.0 - nodex;
    }

    data[2] = nodexflag; //x坐标正负

    data[3] = parseInt(nodex); //x坐标

    var nodeyflag = 1;

    if (this.node.y < 0.0) {
      nodeyflag = 2;
    }

    var nodey = this.node.y;

    if (nodey < 0.0) {
      nodey = 0.0 - nodey;
    }

    data[4] = nodeyflag; //y坐标正负

    data[5] = parseInt(nodey); //y坐标

    this.getwsNetObj().sendwsmessage(data);
  },
  update: function update(dt) {
    //cc.log("player dt: ", this.accDirection, this.xSpeed)
    //第一次连线广播所在位置，然后获取其他小球所在位置然后进行展示
    if (Global.FirstLogin == null && this.getwsNetObj().CanSendMsg()) {
      this.sendPlayerPos(Global.MID_login); //this.scheduleOnce(function(){ this.sendPlayerPos(Global.MID_login); },2);

      Global.FirstLogin = 1;
    } // 根据当前加速度方向每帧更新速度


    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    } // 限制主角的速度不能超过最大值


    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // if speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    } // 根据当前速度更新主角的位置

    /**
     * 超过边界则自动滚回场景内
     */


    if (this.node.x <= -595.0) {
      //this.xSpeed += this.accel * dt;
      this.xSpeed = 0;
      this.node.x = -595.0 + 20;
    } else if (this.node.x >= 595.0) {
      //this.xSpeed -= this.accel * dt;
      this.node.x = 595.0 - 20;
      this.xSpeed = 0;
    } else {
      this.node.x += this.xSpeed * dt;
    }

    if (Global.Bumped == 1) {
      this.xSpeed = 0;
      Global.Bumped = null; //移动广播所在位置，然后获取其他小球所在位置然后进行展示

      this.sendPlayerPos(Global.MID_move);
    } //cc.log("player pos: ", this.node.x, this.node.y)

  }
});

cc._RF.pop();
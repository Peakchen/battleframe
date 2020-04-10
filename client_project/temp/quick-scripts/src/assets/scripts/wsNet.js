"use strict";
cc._RF.push(module, 'f5f02ULtVhD47PNH08lZ5uR', 'wsNet');
// scripts/wsNet.js

"use strict";

/**
 * websocket 
 */
var Global = require("common"); //心跳检测


var HeartCheck = {
  timeout: 60000,
  //60秒
  timeoutObj: null,
  serverTimeoutObj: null,
  disconnectioned: false,
  reconnectTimeoutobj: null,
  reset: function reset() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  startHeartBeat: function startHeartBeat() {
    var self = this;
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
      cc.log("send heart beat...");

      if (Global.ws == null) {
        return;
      }

      var buff = new ArrayBuffer(12);
      var data = new Uint32Array(buff);
      data[0] = Global.MID_HeartBeat; //消息ID

      data[1] = 1; //消息长度

      data[2] = 0; //anything 随意填充一个数

      Global.ws.send(data);
      self.serverTimeoutObj = setTimeout(function () {
        //心跳超时主动断开
        cc.log("close connection...");

        if (Global.ws == null) {
          return;
        }

        Global.ws.close();
        self.disconnectioned = true;
      }, self.timeout);
    }, this.timeout);
  },
  hasDisconnected: function hasDisconnected() {
    return this.disconnectioned;
  },
  stopReconnectTimer: function stopReconnectTimer() {
    //cc.log("close reconnectTimeout...")
    clearTimeout(this.reconnectTimeoutobj);
  }
};
/**
 * 消息回复处理
 */

var MessageStateFunc = {
  /**
   * 消息解析 
   * 0: 消息id
   * 1：消息长度
   * 2：sessionid
   * 3：nodex x坐标正负标记
   * 4：nodex x坐标值
   * 5：nodey y坐标正负标记
   * 6：nodey y坐标值 
   */
  onlogin: function onlogin(data) {
    cc.log("ws message MID_login: ", data[2], data[3]);

    if (data[2] == 1) {
      Global.mySessionId = data[3];
    }

    Global.LoginSucc = data[2];
  },
  onlogout: function onlogout(data) {
    var key = data[2].toString();
    cc.log("ws message MID_logout, sessionid: ", key);
    Global.DelPlayerIds.push(key);
    Global.PlayerSessionMap["delete"](key);
  },
  onmove: function onmove(data) {
    //cc.log("ws message MID_move: ", data[1], data[2], data[3], data[4], data[5], data[6])
    var key = data[2].toString();
    var nodex = data[4];
    var nodey = data[6];

    if (data[3] == 2) {
      nodex = 0 - nodex;
    }

    if (data[5] == 2) {
      nodey = 0 - nodey;
    }

    var playerProp = {
      sessionId: data[2],
      nodex: nodex,
      nodey: nodey
    };

    if (Global.PlayerSessionMap.has(key) == false) {
      Global.PlayerSessionMap.set(key, playerProp);
    }

    Global.NewplayerMap.set(key, playerProp);
    Global.newPlayerIds.push(key); //cc.log("MID_move purple monsters: ", Global.newPlayerIds.length, key, Global.NewplayerMap.has(key))
  },
  onBump: function onBump(data) {
    /**
     *  0: 消息ID
        1：消息长度
        2: 成功失败标志 (失败则只需要前三个字段)
        3: 星星x坐标正负标志
        4: 星星x坐标
        5：星星y坐标正负标志
        6：星星y坐标
        */
    if (data[2] == 0) {
      //失败
      cc.log("ws message MID_Bump fail ... ");
      return;
    }

    cc.log("ws message MID_Bump: ", data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
    var nodex = data[4];
    var nodey = data[6];

    if (data[3] == 2) {
      nodex = 0 - nodex;
    }

    if (data[5] == 2) {
      nodey = 0 - nodey;
    }

    Global.BumpedPlayerId = data[7];
    var starProp = {
      nodex: nodex,
      nodey: nodey
    };
    Global.newStarPos.set(Global.newStarKey, starProp);
  },
  onHeartBeat: function onHeartBeat(data) {
    cc.log("ws message MID_HeartBeat: ", msgid);
  },
  onStarBorn: function onStarBorn(data) {
    cc.log("ws message MID_StarBorn: ", data[2], data[3], data[4], data[5]);
    /**
     *  0: 消息ID
        1：消息长度
        2: 星星x坐标正负标志
        3: 星星x坐标
        4：星星y坐标正负标志
        5：星星y坐标
     */

    var nodex = data[3];
    var nodey = data[5];

    if (data[2] == 2) {
      nodex = 0 - nodex;
    }

    if (data[4] == 2) {
      nodey = 0 - nodey;
    }

    var starProp = {
      nodex: nodex,
      nodey: nodey
    };
    Global.newStarPos.set(Global.newStarKey, starProp);
  },
  onGM: function onGM(data) {
    cc.log("ws message MID_GM...");
  },
  Online4Other: function Online4Other(data) {
    cc.log("ws message MID_Online4Other: ", data[1], data[2], data[3], data[4], data[5], data[6]);
    var key = data[2].toString();
    var nodex = data[4];
    var nodey = data[6];

    if (data[3] == 2) {
      nodex = 0 - nodex;
    }

    if (data[5] == 2) {
      nodey = 0 - nodey;
    }

    var playerProp = {
      sessionId: data[2],
      nodex: nodex,
      nodey: nodey
    };

    if (Global.PlayerSessionMap.has(key) == false) {
      Global.PlayerSessionMap.set(key, playerProp);
    }

    Global.NewplayerMap.set(key, playerProp);
    Global.newPlayerIds.push(key);
  },
  onRegister: function onRegister(data) {
    cc.log("ws message MID_Register: ", data[2]);
    Global.RegisterSucc = data[2];
  }
};
cc.Class({
  //extends: cc.Component,

  /*
  readyState:
      CONNECTING 0
      OPEN       1
      CLOSING    2
      CLOSED     3
  */
  CanSendMsg: function CanSendMsg() {
    if (Global.ws == null) {
      return false;
    }

    return Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN;
  },
  swConnect: function swConnect() {
    if (Global.ws != null) {
      //return
      //cc.log("readyState: ", Global.ws.readyState)
      if (Global.ws.readyState == WebSocket.CONNECTING || Global.ws.readyState == WebSocket.OPEN) {
        //已经连上就不必再连
        return;
      }
    }

    var self = this;
    cc.log("addr: ", Global.wsAddr, Global.ws == null);
    var ws = new WebSocket(Global.wsAddr);

    ws.onopen = function (e) {
      cc.log("ws open: ", ws.readyState); //发送心跳

      HeartCheck.reset().startHeartBeat();
    };

    ws.onmessage = function (e) {
      var data = new Uint32Array(e.data);
      var msgid = data[0];

      switch (msgid) {
        case Global.MID_login:
          MessageStateFunc.onlogin(data);
          break;

        case Global.MID_logout:
          MessageStateFunc.onlogout(data);
          break;

        case Global.MID_move:
          MessageStateFunc.onmove(data);
          break;

        case Global.MID_Bump:
          MessageStateFunc.onBump(data);
          break;

        case Global.MID_HeartBeat:
          MessageStateFunc.onHeartBeat(data);
          break;

        case Global.MID_StarBorn:
          MessageStateFunc.onStarBorn(data);
          break;

        case Global.MID_GM:
          MessageStateFunc.onGM(data);
          break;

        case Global.MID_Online4Other:
          MessageStateFunc.Online4Other(data);
          break;

        case Global.MID_Register:
          MessageStateFunc.onRegister(data);
          break;

        default:
          cc.log("未知 消息id: ", msgid);
      } //发送心跳


      HeartCheck.reset().startHeartBeat();
    };

    ws.onerror = function (e) {
      cc.log("ws error: ", ws.readyState); //Global.ws = null

      if (HeartCheck.hasDisconnected() == false) {
        HeartCheck.stopReconnectTimer();
        HeartCheck.reconnectTimeoutobj = setTimeout(function () {
          self.swConnect();
        }, 1000);
      } else {
        HeartCheck.stopReconnectTimer();
      }
    };

    ws.onclose = function (e) {
      cc.log("ws close: ", ws.readyState); //Global.ws = null

      if (HeartCheck.hasDisconnected() == false) {
        HeartCheck.stopReconnectTimer();
        HeartCheck.reconnectTimeoutobj = setTimeout(function () {
          self.swConnect();
        }, 1000);
      } else {
        HeartCheck.stopReconnectTimer();
      }
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
    } //cc.log("ws sendwsmessage: ", Global.ws.readyState)


    Global.ws.send(data);
  }
});

cc._RF.pop();
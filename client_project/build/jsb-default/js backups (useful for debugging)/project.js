window.__require = function t(e, n, s) {
function o(a, i) {
if (!n[a]) {
if (!e[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!e[r]) {
var u = "function" == typeof __require && __require;
if (!i && u) return u(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var d = n[a] = {
exports: {}
};
e[a][0].call(d.exports, function(t) {
return o(e[a][1][t] || t);
}, d, d.exports, t, e, n, s);
}
return n[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < s.length; a++) o(s[a]);
return o;
}({
Game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4e12fLSQu1L+KV6QmxDiavU", "Game");
var s = t("battle"), o = t("common"), c = t("wsNet");
cc.Class({
extends: cc.Component,
properties: {
starPrefab: {
default: null,
type: cc.Prefab
},
maxStarDuration: 0,
minStarDuration: 0,
ground: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
},
scoreDisplay: {
default: null,
type: cc.Label
},
scoreAudio: {
default: null,
type: cc.AudioClip
}
},
getBattleObj: function() {
return new s();
},
getwsNetObj: function() {
return new c();
},
onLoad: function() {
o.PlayerMap = new Map();
this.getBattleObj().postBattleStartMsg();
this.groundY = this.ground.y + this.ground.height / 2;
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar();
this.score = 0;
},
spawnNewStar: function() {
var t = cc.instantiate(this.starPrefab);
this.node.addChild(t);
t.setPosition(this.getNewStarPosition());
t.getComponent("Star").game = this;
this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var t, e = this.node.width / 2;
this.getBattleObj().postUpdateStarPosMsg(e);
2 * (Math.random() - .5) * e;
t = 2 * (Math.random() - .5) * e;
return cc.v2(t, -100);
},
update: function(t) {
if (this.timer > this.starDuration) {
this.gameOver();
this.enabled = !1;
} else this.timer += t;
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score;
cc.audioEngine.playEffect(this.scoreAudio, !1);
},
gameOver: function() {}
});
cc._RF.pop();
}, {
battle: "battle",
common: "common",
wsNet: "wsNet"
} ],
Player: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6c688v72QdOKamCGCT+xaAd", "Player");
var s = t("common"), o = t("wsNet");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
maxMoveSpeed: 0,
accel: 0,
jumpAudio: {
default: null,
type: cc.AudioClip
},
accDirection: 0
},
getwsNetObj: function() {
return new o();
},
setJumpAction: function() {
var t = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), e = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()), n = cc.callFunc(this.playJumpSound, this);
return cc.repeatForever(cc.sequence(t, e, n));
},
playJumpSound: function() {
cc.audioEngine.playEffect(this.jumpAudio, !1);
},
onKeyDown: function(t) {
switch (t.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !0;
break;

case cc.macro.KEY.d:
this.accRight = !0;
}
},
onKeyUp: function(t) {
switch (t.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !1;
break;

case cc.macro.KEY.d:
this.accRight = !1;
}
},
onLoad: function() {
cc.game.setFrameRate(100);
this.getwsNetObj().swConnect();
s.FirstLogin = null;
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 2 * (Math.random() - .5) * 10;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
this.randPlayerPos();
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
randPlayerPos: function() {
this.node.x = this.xSpeed * (this.node.width / 2);
this.xSpeed = 0;
},
stop: function() {
this.xSpeed = 0;
},
sendPlayerPos: function(t) {
cc.log("send player pos: ", t);
var e = new ArrayBuffer(24), n = new Uint32Array(e);
n[0] = t;
n[1] = 4;
var s = 1, o = this.node.x;
this.node.x < 0 && (s = 2);
o < 0 && (o = 0 - o);
n[2] = s;
n[3] = parseInt(o);
var c = 1;
this.node.y < 0 && (c = 2);
var a = this.node.y;
a < 0 && (a = 0 - a);
n[4] = c;
n[5] = parseInt(a);
this.getwsNetObj().sendwsmessage(n);
},
update: function(t) {
if (null == s.FirstLogin && this.getwsNetObj().CanSendMsg()) {
this.sendPlayerPos(s.MID_login);
s.FirstLogin = 1;
}
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
if (this.node.x <= -595) {
this.xSpeed = 0;
this.node.x = -575;
} else if (this.node.x >= 595) {
this.node.x = 575;
this.xSpeed = 0;
} else this.node.x += this.xSpeed * t;
if (1 == s.Bumped) {
this.xSpeed = 0;
s.Bumped = null;
this.sendPlayerPos(s.MID_move);
}
}
});
cc._RF.pop();
}, {
common: "common",
wsNet: "wsNet"
} ],
Star: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4644f0m2WtABYRy+pn6dOaG", "Star");
var s = t("battle"), o = t("wsNet"), c = t("common");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
getBattleObj: function() {
return new s();
},
getwsNetObj: function() {
return new o();
},
getPlayerDistance: function() {
var t = this.game.player.getPosition();
return this.node.position.sub(t).mag();
},
onPicked: function(t, e) {
c.Bumped = 1;
this.getBattleObj().postAttackMsg(t, e);
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
},
update: function(t) {
if (this.getPlayerDistance() < this.pickRadius) {
t <= 1 && (t *= 100);
var e = parseInt(t), n = parseInt(this.getPlayerDistance());
this.onPicked(e, n);
} else ;
}
});
cc._RF.pop();
}, {
battle: "battle",
common: "common",
wsNet: "wsNet"
} ],
api: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "d36e5DJLYRPSYxoKddtNFw3", "api");
cc.Class({
extends: cc.Component,
realrnd: function(t) {
return (t = (9301 * t + 49297) % 233280) / 233280;
},
Rand: function(t, e) {
return Math.ceil(this.realrnd(e) * t);
},
RandOne: function(t) {
return Math.ceil(9999 * this.realrnd(t)) / 1e4;
}
});
cc._RF.pop();
}, {} ],
battle: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "c75160onE1L85aAYcU40taO", "battle");
var s = t("api"), o = t("common");
cc.Class({
extends: cc.Component,
getApi: function() {
return new s();
},
getHost: function() {
return o.Addr;
},
getRandNumber: function(t) {
return 0 == o.randseed ? t : this.getApi().Rand(t, o.randseed);
},
getRandOne: function(t) {
0 == t && (t = o.randseed);
return this.getApi().RandOne(t);
},
postUpdateStarPosMsg: function(t) {
var e = cc.loader.getXMLHttpRequest(), n = this.getHost() + "/UpdateStarPos";
e.open("POST", n, !0);
e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
e.responseType = "arraybuffer";
e.onreadystatechange = function() {
if (4 == e.readyState && e.status >= 200 && e.status < 300) {
cc.log("UpdateStarPos response: ", e.response);
var t = new Uint32Array(e.response);
cc.log("UpdateStarPos data: ", t);
o.starPosRandseed = t[0];
o.starPosRandN = t[1];
} else ;
};
e.send(new Uint16Array([ 1, t ]));
},
postBattleStartMsg: function() {
if (!(o.randseed > 0)) {
var t = cc.loader.getXMLHttpRequest(), e = this.getHost() + "/BattleStart";
t.open("POST", e, !0);
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status < 300) {
o.randseed = parseInt(t.responseText);
cc.log("BattleStart response: ", t.responseText);
}
};
t.send(new Uint16Array([ 1 ]));
}
},
postAttackMsg: function(t, e) {
var n = cc.loader.getXMLHttpRequest(), s = this.getHost() + "/Attack";
n.open("POST", s, !0);
n.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
n.onreadystatechange = function() {
4 == n.readyState && n.status >= 200 && n.status < 300 && cc.log("Attack response: ", n.responseText);
};
var o = this.getRandNumber(e);
n.send(new Uint16Array([ 3, t, e, o ]));
}
});
cc._RF.pop();
}, {
api: "api",
common: "common"
} ],
common: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "134b45CQE9DKqR6yRMNUY1V", "common");
e.exports = {
Addr: "localhost:13001",
wsAddr: "ws://localhost:13001/ws",
randseed: null,
starPosRandseed: null,
starPosRandN: null,
ws: null,
ioSocket: null,
PlayerMap: null,
FirstLogin: null,
MID_login: 1,
MID_logout: 2,
MID_move: 3,
Bumped: null
};
cc._RF.pop();
}, {} ],
ioNet: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5b591fCkMpNAoTBTiEzeldr", "ioNet");
var s = t("common");
cc.Class({
extends: cc.Component,
ioConnect: function() {
var t = io.connect(s.wsAddr);
t.on("connect", function() {
cc.log("ionet connect.");
});
t.on("message", function(t) {
cc.log("ionet message: ", t);
});
t.on("connecting", function() {
cc.log("ionet connecting.");
});
t.on("disconnect", function() {
cc.log("ionet disconnect.");
});
t.on("reconnecting", function() {
cc.log("ionet reconnecting.");
});
t.on("connecting", function() {
cc.log("ionet connecting.");
});
t.on("reconnect", function() {
cc.log("ionet reconnect.");
});
t.on("error", function() {
cc.log("ionet error.");
});
s.ioSocket = t;
}
});
cc._RF.pop();
}, {
common: "common"
} ],
"use_v2.0.x_cc.Toggle_event": [ function(t, e, n) {
"use strict";
cc._RF.push(e, "742a89MzNxJxb/9He3sfN/S", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ],
wsNet: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f5f02ULtVhD47PNH08lZ5uR", "wsNet");
var s = t("common");
cc.Class({
CanSendMsg: function() {
return null != s.ws && (s.ws.readyState == WebSocket.CONNECTING || s.ws.readyState == WebSocket.OPEN);
},
swConnect: function() {
if (null == s.ws) {
cc.log("addr: ", s.wsAddr, null == s.ws);
var t = new WebSocket(s.wsAddr);
t.onopen = function(e) {
cc.log("ws open: ", t.readyState);
};
t.onmessage = function(t) {
var e = new Uint32Array(t.data), n = e[0];
switch (n) {
case s.MID_login:
cc.log("ws message MID_login: ", e[1], e[2], e[3], e[4], e[5], e[6]);
var o = e[2].toString();
s.PlayerMap.set(o, e[2]);
break;

case s.MID_logout:
o = e[2].toString();
cc.log("ws message MID_logout, sessionid: ", o);
s.PlayerMap.delete(o);
break;

case s.MID_move:
cc.log("ws message MID_move: ", e[1], e[2], e[3], e[4], e[5], e[6]);
o = e[2].toString();
s.PlayerMap.set(o, e[2]);
break;

default:
cc.log("未知 消息id: ", n);
}
};
t.onerror = function(e) {
cc.log("ws error: ", t.readyState);
s.ws = null;
};
t.onclose = function(e) {
cc.log("ws close: ", t.readyState);
s.ws = null;
};
cc.log("global ws init, state: ", t.readyState);
s.ws = t;
}
},
sendwsmessage: function(t) {
if (null != s.ws && (null == s.ws || s.ws.readyState != WebSocket.CLOSED && s.ws.readyState != WebSocket.CLOSING)) {
cc.log("ws sendwsmessage: ", s.ws.readyState);
s.ws.send(t);
}
}
});
cc._RF.pop();
}, {
common: "common"
} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "ioNet", "wsNet" ]);
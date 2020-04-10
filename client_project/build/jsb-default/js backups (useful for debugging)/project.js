window.__require = function e(t, n, o) {
function s(a, i) {
if (!n[a]) {
if (!t[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!t[r]) {
var u = "function" == typeof __require && __require;
if (!i && u) return u(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var l = n[a] = {
exports: {}
};
t[a][0].call(l.exports, function(e) {
return s(t[a][1][e] || e);
}, l, l.exports, e, t, n, o);
}
return n[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < o.length; a++) s(o[a]);
return s;
}({
Game: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e12fLSQu1L+KV6QmxDiavU", "Game");
var o = e("battle"), s = e("common"), c = e("wsNet");
e("playerdata");
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
return new o();
},
getwsNetObj: function() {
return new c();
},
onLoad: function() {
cc.log("game on load init...");
s.PlayerSessionMap = new Map();
s.NewplayerMap = new Map();
s.newPlayerIds = new Array();
s.DelPlayerIds = new Array();
this.getBattleObj().postBattleStartMsg();
this.groundY = this.ground.y + this.ground.height / 2;
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar(0, 0);
this.score = 0;
},
spawnNewStar: function(e, t) {
var n = cc.instantiate(this.starPrefab);
this.node.addChild(n);
0 != e || 0 != t ? n.setPosition(cc.v2(e, t)) : n.setPosition(this.getNewStarPosition());
n.getComponent("Star").game = this;
this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var e = 0, t = this.node.width / 2;
this.getBattleObj().postUpdateStarPosMsg(t);
(e = 2 * (Math.random() - .5) * t) >= this.node.width / 2 && (e = this.node.width / 3);
e <= 0 - this.node.width / 2 && (e = 0 - this.node.width / 3);
return cc.v2(e, -100);
},
checkNewPlayer: function() {
var e = s.newPlayerIds.length;
if (0 != e) for (var t = this, n = "PurpleMonster", o = !1; e > 0; ) {
var c = s.newPlayerIds.pop();
if (0 == s.NewplayerMap.has(c)) {
cc.log("NewplayerMap not find, playerid: ", c);
break;
}
var a = s.NewplayerMap.get(c), i = t.node.getChildByName(c.toString());
if (null != i) {
if (i.x != a.nodex || a.nodey != i.y) {
t.node.removeChild(i);
o = !0;
}
} else o = !0;
if (o) {
cc.loader.loadRes(n, cc.SpriteFrame, function(e, o) {
cc.loader.setAutoRelease(n, !0);
var s = new cc.Node(c.toString());
s.position = cc.v2(a.nodex, a.nodey);
s.addComponent(cc.Sprite).spriteFrame = o;
t.node.addChild(s, 0, c.toString());
});
o = !1;
}
s.NewplayerMap.delete(c);
e = s.newPlayerIds.length;
}
},
checklogout: function() {
for (var e = s.DelPlayerIds.length; e > 0; ) {
cc.log("checklogout...");
var t = s.DelPlayerIds.pop(), n = this.node.getChildByName(t);
null != n && this.node.removeChild(n);
e = s.DelPlayerIds.length;
}
},
testcreateplayer: function() {
if (1 != s.test) {
s.test = 1;
s.newPlayerIds.push(1122);
var e = {
sessionId: 1122,
nodex: 100,
nodey: -88
};
s.NewplayerMap.set(1122, e);
this.checkNewPlayer();
}
},
update: function(e) {
this.checkNewPlayer();
this.checklogout();
this.timer += e;
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score;
},
gameOver: function() {}
});
cc._RF.pop();
}, {
battle: "battle",
common: "common",
playerdata: "playerdata",
wsNet: "wsNet"
} ],
Player: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6c688v72QdOKamCGCT+xaAd", "Player");
var o = e("common"), s = e("wsNet"), c = e("gm");
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
return new s();
},
getGMObj: function() {
return new c();
},
setJumpAction: function() {
var e = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), t = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()), n = cc.callFunc(this.playJumpSound, this);
return cc.repeatForever(cc.sequence(e, t, n));
},
playJumpSound: function() {
cc.audioEngine.playEffect(this.jumpAudio, !1);
},
onKeyDown: function(e) {
switch (e.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !0;
break;

case cc.macro.KEY.d:
this.accRight = !0;
}
},
onKeyUp: function(e) {
switch (e.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !1;
break;

case cc.macro.KEY.d:
this.accRight = !1;
}
},
onLoad: function() {
cc.game.setFrameRate(10);
this.getwsNetObj().swConnect();
o.FirstLogin = null;
o.newStarPos = new Map();
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 2 * (Math.random() - .5) * 10;
this.TickFrame = 0;
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
sendPlayerPos: function(e) {
var t = new ArrayBuffer(24), n = new Uint32Array(t);
n[0] = e;
n[1] = 4;
var o = 1, s = this.node.x;
if (s < 0) {
o = 2;
s = 0 - s;
}
n[2] = o;
n[3] = parseInt(s);
var c = 1, a = -88;
if (a < 0) {
c = 2;
a = 0 - a;
}
n[4] = c;
n[5] = parseInt(a);
this.getwsNetObj().sendwsmessage(n);
},
update: function(e) {
if (null == o.FirstLogin && this.getwsNetObj().CanSendMsg()) {
this.sendPlayerPos(o.MID_login);
o.FirstLogin = 1;
}
if (0 == this.accLeft && 0 == this.accRight) {
this.xSpeed -= .1;
this.xSpeed < 0 && (this.xSpeed = 0);
}
this.accLeft ? this.xSpeed -= this.accel * e : this.accRight && (this.xSpeed += this.accel * e);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
if (this.node.x <= -595) {
this.xSpeed = 0;
this.node.x = -575;
} else if (this.node.x >= 595) {
this.node.x = 575;
this.xSpeed = 0;
} else this.node.x += this.xSpeed * e;
if (1 == o.Bumped) {
o.Bumped = null;
this.sendPlayerPos(o.MID_move);
}
this.TickFrame += e;
if (this.TickFrame > 5) {
this.sendPlayerPos(o.MID_move);
this.TickFrame = 0;
}
}
});
cc._RF.pop();
}, {
common: "common",
gm: "gm",
wsNet: "wsNet"
} ],
Star: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4644f0m2WtABYRy+pn6dOaG", "Star");
var o = e("battle"), s = e("wsNet"), c = e("common");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
getBattleObj: function() {
return new o();
},
getwsNetObj: function() {
return new s();
},
getPlayerDistance: function() {
var e = this.game.player.getPosition();
return this.node.position.sub(e).mag();
},
onLoad: function() {
cc.log("star load init.");
this.updateFrame = 0;
},
onPicked: function() {
if (0 != c.newStarPos.has(c.newStarKey)) {
var e = c.newStarPos.get(c.newStarKey);
c.newStarPos.delete(c.newStarKey);
var t = e.nodex, n = e.nodey;
this.game.spawnNewStar(t, n);
this.game.gainScore();
this.node.destroy();
c.Bumped = 1;
}
},
sendBumpMsg: function() {
var e = new ArrayBuffer(40), t = new Uint32Array(e);
t[0] = c.MID_Bump;
t[1] = 8;
var n = this.game.player.getPosition(), o = n.x, s = 1;
if (o < 0) {
s = 2;
o = 0 - o;
}
var a = n.y, i = 1;
if (a < 0) {
i = 2;
a = 0 - a;
}
t[2] = s;
t[3] = parseInt(o);
t[4] = i;
t[5] = parseInt(a);
var r = this.node.getPosition(), u = r.x, l = 1;
if (u < 0) {
l = 2;
u = 0 - u;
}
var d = r.y, p = 1;
if (d < 0) {
p = 2;
d = 0 - d;
}
t[6] = l;
t[7] = parseInt(u);
t[8] = p;
t[9] = parseInt(d);
this.getwsNetObj().sendwsmessage(t);
},
update: function(e) {
if (this.updateFrame >= 1 && this.getPlayerDistance() < this.pickRadius) {
this.updateFrame = 0;
e <= 1 && (e *= 100);
parseInt(e), parseInt(this.getPlayerDistance());
this.sendBumpMsg();
} else {
c.newStarPos.has(c.newStarKey) && this.onPicked();
this.updateFrame += e;
}
}
});
cc._RF.pop();
}, {
battle: "battle",
common: "common",
wsNet: "wsNet"
} ],
api: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d36e5DJLYRPSYxoKddtNFw3", "api");
cc.Class({
extends: cc.Component,
realrnd: function(e) {
return (e = (9301 * e + 49297) % 233280) / 233280;
},
Rand: function(e, t) {
return Math.ceil(this.realrnd(t) * e);
},
RandOne: function(e) {
return Math.ceil(9999 * this.realrnd(e)) / 1e4;
}
});
cc._RF.pop();
}, {} ],
battle: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c75160onE1L85aAYcU40taO", "battle");
var o = e("api"), s = e("common");
cc.Class({
extends: cc.Component,
getApi: function() {
return new o();
},
getHost: function() {
return s.Addr;
},
getRandNumber: function(e) {
return 0 == s.randseed ? e : this.getApi().Rand(e, s.randseed);
},
getRandOne: function(e) {
0 == e && (e = s.randseed);
return this.getApi().RandOne(e);
},
postUpdateStarPosMsg: function(e) {
var t = cc.loader.getXMLHttpRequest(), n = this.getHost() + "/UpdateStarPos";
t.open("POST", n, !0);
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.responseType = "arraybuffer";
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status < 300) {
var e = new Uint32Array(t.response);
s.starPosRandseed = e[0];
s.starPosRandN = e[1];
} else ;
};
t.send(new Uint16Array([ 1, e ]));
},
postBattleStartMsg: function() {
if (!(s.randseed > 0)) {
var e = cc.loader.getXMLHttpRequest(), t = this.getHost() + "/BattleStart";
e.open("POST", t, !0);
e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
e.onreadystatechange = function() {
4 == e.readyState && e.status >= 200 && e.status < 300 && (s.randseed = parseInt(e.responseText));
};
e.send(new Uint16Array([ 1 ]));
}
},
postAttackMsg: function(e, t) {
var n = cc.loader.getXMLHttpRequest(), o = this.getHost() + "/Attack";
n.open("POST", o, !0);
n.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
n.onreadystatechange = function() {
4 == n.readyState && n.status >= 200 && n.status;
};
var s = this.getRandNumber(t);
n.send(new Uint16Array([ 3, e, t, s ]));
}
});
cc._RF.pop();
}, {
api: "api",
common: "common"
} ],
common: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "134b45CQE9DKqR6yRMNUY1V", "common");
t.exports = {
Addr: "localhost:13001",
wsAddr: "ws://localhost:13001/ws",
randseed: null,
starPosRandseed: null,
starPosRandN: null,
ws: null,
ioSocket: null,
PlayerSessionMap: null,
NewplayerMap: null,
newPlayerIds: null,
DelPlayerIds: null,
mySessionId: null,
FirstLogin: null,
MID_login: 1,
MID_logout: 2,
MID_move: 3,
MID_Bump: 4,
MID_HeartBeat: 5,
MID_StarBorn: 6,
MID_GM: 7,
MID_Online4Other: 8,
Bumped: null,
newStarKey: "Star",
newStarPos: null,
test: null
};
cc._RF.pop();
}, {} ],
gm: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2b4382aBhFPO6s4qV0x0VrN", "gm");
var o = e("wsNet"), s = e("common"), c = 1;
cc.Class({
getwsNetObj: function() {
return new o();
},
sendResetStarPos: function() {
cc.log("reset star pos...");
var e = new ArrayBuffer(28), t = new Uint32Array(e);
t[0] = s.MID_GM;
t[1] = 5;
t[2] = c;
var n = 1, o = 0;
if (o < 0) {
n = 2;
o = 0 - o;
}
t[3] = n;
t[4] = parseInt(o);
var a = 1, i = -88;
if (i < 0) {
a = 2;
i = 0 - i;
}
t[5] = a;
t[6] = parseInt(i);
this.getwsNetObj().sendwsmessage(t);
}
});
cc._RF.pop();
}, {
common: "common",
wsNet: "wsNet"
} ],
ioNet: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5b591fCkMpNAoTBTiEzeldr", "ioNet");
var o = e("common");
cc.Class({
extends: cc.Component,
ioConnect: function() {
var e = io.connect(o.wsAddr);
e.on("connect", function() {
cc.log("ionet connect.");
});
e.on("message", function(e) {
cc.log("ionet message: ", e);
});
e.on("connecting", function() {
cc.log("ionet connecting.");
});
e.on("disconnect", function() {
cc.log("ionet disconnect.");
});
e.on("reconnecting", function() {
cc.log("ionet reconnecting.");
});
e.on("connecting", function() {
cc.log("ionet connecting.");
});
e.on("reconnect", function() {
cc.log("ionet reconnect.");
});
e.on("error", function() {
cc.log("ionet error.");
});
o.ioSocket = e;
}
});
cc._RF.pop();
}, {
common: "common"
} ],
login: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "85d2af0NxdLsYumGChyxxL/", "login");
var o = e("Game");
cc.Class({
extends: cc.Component,
properties: {
registerBtn: {
default: null,
type: cc.Button
},
loginBtn: {
default: null,
type: cc.Button
},
nameBox: {
default: null,
type: cc.EditBox
},
pwdBox: {
default: null,
type: cc.EditBox
}
},
getGameObj: function() {
return new o();
},
onLoad: function() {
cc.log("login init...");
this.registerBtn.node.on("click", this.onRegister, this);
this.loginBtn.node.on("click", this.onLogin, this);
this.nameBox.node.on("editbox", this.onName, this);
this.pwdBox.node.on("editbox", this.onPwd, this);
},
onRegister: function(e) {
cc.log("click register...");
e.detail;
},
onLogin: function(e) {
cc.log("click login...");
e.detail;
},
onName: function(e) {
cc.log("edit name...");
e.detail;
},
onPwd: function(e) {
cc.log("edit pwd...");
e.detail;
},
change2GameMain: function() {
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {
Game: "Game"
} ],
playerdata: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee2a6wFRAZDzLnGbuzH7dEf", "playerdata");
var o = cc.Class({
name: "player",
properties: {
sessionId: null,
nodex: null,
nodey: null
}
});
cc.Class({
properties: {
playerMap: [ o ]
}
});
cc._RF.pop();
}, {} ],
"use_v2.0.x_cc.Toggle_event": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "742a89MzNxJxb/9He3sfN/S", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ],
wsNet: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f5f02ULtVhD47PNH08lZ5uR", "wsNet");
var o = e("common"), s = {
timeout: 6e4,
timeoutObj: null,
serverTimeoutObj: null,
disconnectioned: !1,
reconnectTimeoutobj: null,
reset: function() {
clearTimeout(this.timeoutObj);
clearTimeout(this.serverTimeoutObj);
return this;
},
startHeartBeat: function() {
var e = this;
this.timeoutObj = setTimeout(function() {
cc.log("send heart beat...");
if (null != o.ws) {
var t = new ArrayBuffer(12), n = new Uint32Array(t);
n[0] = o.MID_HeartBeat;
n[1] = 1;
n[2] = 0;
o.ws.send(n);
e.serverTimeoutObj = setTimeout(function() {
cc.log("close connection...");
if (null != o.ws) {
o.ws.close();
e.disconnectioned = !0;
}
}, e.timeout);
}
}, this.timeout);
},
hasDisconnected: function() {
return this.disconnectioned;
},
stopReconnectTimer: function() {
clearTimeout(this.reconnectTimeoutobj);
}
}, c = function(e) {
cc.log("ws message MID_login: ", e[1], e[2]);
o.mySessionId = e[2];
}, a = function(e) {
var t = e[2].toString();
cc.log("ws message MID_logout, sessionid: ", t);
o.DelPlayerIds.push(t);
o.PlayerSessionMap.delete(t);
}, i = function(e) {
var t = e[2].toString(), n = e[4], s = e[6];
2 == e[3] && (n = 0 - n);
2 == e[5] && (s = 0 - s);
var c = {
sessionId: e[2],
nodex: n,
nodey: s
};
0 == o.PlayerSessionMap.has(t) && o.PlayerSessionMap.set(t, c);
o.NewplayerMap.set(t, c);
o.newPlayerIds.push(t);
}, r = function(e) {
cc.log("ws message MID_Bump: ", e[1], e[2], e[3], e[4], e[5], e[6]);
if (0 != e[2]) {
var t = e[4], n = e[6];
2 == e[3] && (t = 0 - t);
2 == e[5] && (n = 0 - n);
var s = {
nodex: t,
nodey: n
};
o.newStarPos.set(o.newStarKey, s);
} else cc.log("ws message MID_Bump fail ... ");
}, u = function(e) {
cc.log("ws message MID_HeartBeat: ", msgid);
}, l = function(e) {
cc.log("ws message MID_StarBorn: ", e[2], e[3], e[4], e[5]);
var t = e[3], n = e[5];
2 == e[2] && (t = 0 - t);
2 == e[4] && (n = 0 - n);
var s = {
nodex: t,
nodey: n
};
o.newStarPos.set(o.newStarKey, s);
}, d = function(e) {
cc.log("ws message MID_GM...");
}, p = function(e) {
cc.log("ws message MID_Online4Other: ", e[1], e[2], e[3], e[4], e[5], e[6]);
var t = e[2].toString(), n = e[4], s = e[6];
2 == e[3] && (n = 0 - n);
2 == e[5] && (s = 0 - s);
var c = {
sessionId: e[2],
nodex: n,
nodey: s
};
0 == o.PlayerSessionMap.has(t) && o.PlayerSessionMap.set(t, c);
o.NewplayerMap.set(t, c);
o.newPlayerIds.push(t);
};
cc.Class({
CanSendMsg: function() {
return null != o.ws && (o.ws.readyState == WebSocket.CONNECTING || o.ws.readyState == WebSocket.OPEN);
},
swConnect: function() {
if (null == o.ws || o.ws.readyState != WebSocket.CONNECTING && o.ws.readyState != WebSocket.OPEN) {
var e = this;
cc.log("addr: ", o.wsAddr, null == o.ws);
var t = new WebSocket(o.wsAddr);
t.onopen = function(e) {
cc.log("ws open: ", t.readyState);
s.reset().startHeartBeat();
};
t.onmessage = function(e) {
var t = new Uint32Array(e.data), n = t[0];
switch (n) {
case o.MID_login:
c(t);
break;

case o.MID_logout:
a(t);
break;

case o.MID_move:
i(t);
break;

case o.MID_Bump:
r(t);
break;

case o.MID_HeartBeat:
u(t);
break;

case o.MID_StarBorn:
l(t);
break;

case o.MID_GM:
d(t);
break;

case o.MID_Online4Other:
p(t);
break;

default:
cc.log("未知 消息id: ", n);
}
s.reset().startHeartBeat();
};
t.onerror = function(n) {
cc.log("ws error: ", t.readyState);
if (0 == s.hasDisconnected()) {
s.stopReconnectTimer();
s.reconnectTimeoutobj = setTimeout(function() {
e.swConnect();
}, 1e3);
} else s.stopReconnectTimer();
};
t.onclose = function(n) {
cc.log("ws close: ", t.readyState);
if (0 == s.hasDisconnected()) {
s.stopReconnectTimer();
s.reconnectTimeoutobj = setTimeout(function() {
e.swConnect();
}, 1e3);
} else s.stopReconnectTimer();
};
cc.log("global ws init, state: ", t.readyState);
o.ws = t;
}
},
sendwsmessage: function(e) {
null != o.ws && (null == o.ws || o.ws.readyState != WebSocket.CLOSED && o.ws.readyState != WebSocket.CLOSING) && o.ws.send(e);
}
});
cc._RF.pop();
}, {
common: "common"
} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "gm", "ioNet", "login", "playerdata", "wsNet" ]);
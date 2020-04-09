window.__require = function e(t, n, s) {
function o(c, i) {
if (!n[c]) {
if (!t[c]) {
var r = c.split("/");
r = r[r.length - 1];
if (!t[r]) {
var l = "function" == typeof __require && __require;
if (!i && l) return l(r, !0);
if (a) return a(r, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = r;
}
var u = n[c] = {
exports: {}
};
t[c][0].call(u.exports, function(e) {
return o(t[c][1][e] || e);
}, u, u.exports, e, t, n, s);
}
return n[c].exports;
}
for (var a = "function" == typeof __require && __require, c = 0; c < s.length; c++) o(s[c]);
return o;
}({
Game: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e12fLSQu1L+KV6QmxDiavU", "Game");
var s = e("battle"), o = e("common"), a = e("wsNet");
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
return new s();
},
getwsNetObj: function() {
return new a();
},
onLoad: function() {
cc.log("game on load init...");
o.PlayerSessionMap = new Map();
o.NewplayerMap = new Map();
o.newPlayerIds = new Array();
o.DelPlayerIds = new Array();
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
var e = o.newPlayerIds.length;
if (0 != e) for (var t = this, n = "PurpleMonster", s = !1; e > 0; ) {
var a = o.newPlayerIds.pop();
if (0 == o.NewplayerMap.has(a)) {
cc.log("NewplayerMap not find, playerid: ", a);
break;
}
var c = o.NewplayerMap.get(a), i = t.node.getChildByName(a.toString());
if (null != i) {
cc.log("child pos: ", i.x, i.y);
if (i.x != c.nodex || c.nodey != i.y) {
t.node.removeChild(i);
s = !0;
}
} else s = !0;
if (s) {
cc.loader.loadRes(n, cc.SpriteFrame, function(e, s) {
cc.loader.setAutoRelease(n, !0);
var o = new cc.Node(a.toString());
o.position = cc.v2(c.nodex, c.nodey);
o.addComponent(cc.Sprite).spriteFrame = s;
t.node.addChild(o, 0, a.toString());
});
s = !1;
}
o.NewplayerMap.delete(a);
e = o.newPlayerIds.length;
}
},
checklogout: function() {
for (var e = o.DelPlayerIds.length; e > 0; ) {
cc.log("checklogout...");
var t = o.DelPlayerIds.pop(), n = this.node.getChildByName(t);
null != n && this.node.removeChild(n);
e = o.DelPlayerIds.length;
}
},
testcreateplayer: function() {
if (1 != o.test) {
o.test = 1;
o.newPlayerIds.push(1122);
var e = {
sessionId: 1122,
nodex: 100,
nodey: -88
};
o.NewplayerMap.set(1122, e);
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
var s = e("common"), o = e("wsNet"), a = e("gm");
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
getGMObj: function() {
return new a();
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
cc.game.setFrameRate(50);
this.getwsNetObj().swConnect();
s.FirstLogin = null;
s.newStarPos = new Map();
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
var s = 1, o = this.node.x;
if (o < 0) {
s = 2;
o = 0 - o;
}
n[2] = s;
n[3] = parseInt(o);
var a = 1, c = -88;
if (c < 0) {
a = 2;
c = 0 - c;
}
n[4] = a;
n[5] = parseInt(c);
this.getwsNetObj().sendwsmessage(n);
},
update: function(e) {
if (null == s.FirstLogin && this.getwsNetObj().CanSendMsg()) {
this.sendPlayerPos(s.MID_login);
s.FirstLogin = 1;
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
if (1 == s.Bumped) {
this.xSpeed = 0;
s.Bumped = null;
this.sendPlayerPos(s.MID_move);
}
this.TickFrame += e;
if (this.TickFrame > 5) {
this.sendPlayerPos(s.MID_move);
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
var s = e("battle"), o = e("wsNet"), a = e("common");
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
var e = this.game.player.getPosition();
return this.node.position.sub(e).mag();
},
getAnyPlayerDistance: function() {},
onPicked: function() {
a.Bumped = 1;
var e = a.newStarPos.get(a.newStarKey), t = e.nodex, n = e.nodey;
this.game.spawnNewStar(t, n);
this.game.gainScore();
this.node.destroy();
},
sendBumpMsg: function() {
var e = new ArrayBuffer(40), t = new Uint32Array(e);
t[0] = 4;
t[1] = 8;
var n = this.game.player.getPosition(), s = n.x, o = 1;
if (s < 0) {
o = 2;
s = 0 - s;
}
var a = n.y, c = 1;
if (a < 0) {
c = 2;
a = 0 - a;
}
t[2] = o;
t[3] = parseInt(s);
t[4] = c;
t[5] = parseInt(a);
var i = this.node.getPosition(), r = i.x, l = 1;
if (r < 0) {
l = 2;
r = 0 - r;
}
var u = i.y, d = 1;
if (u < 0) {
d = 2;
u = 0 - u;
}
t[6] = l;
t[7] = parseInt(r);
t[8] = d;
t[9] = parseInt(u);
this.getwsNetObj().sendwsmessage(t);
},
update: function(e) {
if (this.getPlayerDistance() < this.pickRadius) {
e <= 1 && (e *= 100);
parseInt(e), parseInt(this.getPlayerDistance());
this.sendBumpMsg();
} else if (a.newStarPos.has(a.newStarKey)) {
this.onPicked();
a.newStarPos.delete(a.newStarKey);
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
var s = e("api"), o = e("common");
cc.Class({
extends: cc.Component,
getApi: function() {
return new s();
},
getHost: function() {
return o.Addr;
},
getRandNumber: function(e) {
return 0 == o.randseed ? e : this.getApi().Rand(e, o.randseed);
},
getRandOne: function(e) {
0 == e && (e = o.randseed);
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
o.starPosRandseed = e[0];
o.starPosRandN = e[1];
} else ;
};
t.send(new Uint16Array([ 1, e ]));
},
postBattleStartMsg: function() {
if (!(o.randseed > 0)) {
var e = cc.loader.getXMLHttpRequest(), t = this.getHost() + "/BattleStart";
e.open("POST", t, !0);
e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
e.onreadystatechange = function() {
4 == e.readyState && e.status >= 200 && e.status < 300 && (o.randseed = parseInt(e.responseText));
};
e.send(new Uint16Array([ 1 ]));
}
},
postAttackMsg: function(e, t) {
var n = cc.loader.getXMLHttpRequest(), s = this.getHost() + "/Attack";
n.open("POST", s, !0);
n.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
n.onreadystatechange = function() {
4 == n.readyState && n.status >= 200 && n.status;
};
var o = this.getRandNumber(t);
n.send(new Uint16Array([ 3, e, t, o ]));
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
FirstLogin: null,
MID_login: 1,
MID_logout: 2,
MID_move: 3,
MID_Bump: 4,
MID_HeartBeat: 5,
MID_StarBorn: 6,
MID_GM: 7,
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
var s = e("wsNet"), o = e("common"), a = 1;
cc.Class({
getwsNetObj: function() {
return new s();
},
sendResetStarPos: function() {
cc.log("reset star pos...");
var e = new ArrayBuffer(28), t = new Uint32Array(e);
t[0] = o.MID_GM;
t[1] = 5;
t[2] = a;
var n = 1, s = 0;
if (s < 0) {
n = 2;
s = 0 - s;
}
t[3] = n;
t[4] = parseInt(s);
var c = 1, i = -88;
if (i < 0) {
c = 2;
i = 0 - i;
}
t[5] = c;
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
var s = e("common");
cc.Class({
extends: cc.Component,
ioConnect: function() {
var e = io.connect(s.wsAddr);
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
s.ioSocket = e;
}
});
cc._RF.pop();
}, {
common: "common"
} ],
playerdata: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee2a6wFRAZDzLnGbuzH7dEf", "playerdata");
var s = cc.Class({
name: "player",
properties: {
sessionId: null,
nodex: null,
nodey: null
}
});
cc.Class({
properties: {
playerMap: [ s ]
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
var s = e("common"), o = {
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
if (null != s.ws) {
var t = new ArrayBuffer(12), n = new Uint32Array(t);
n[0] = s.MID_HeartBeat;
n[1] = 1;
n[2] = 0;
s.ws.send(n);
e.serverTimeoutObj = setTimeout(function() {
cc.log("close connection...");
if (null != s.ws) {
s.ws.close();
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
};
cc.Class({
CanSendMsg: function() {
return null != s.ws && (s.ws.readyState == WebSocket.CONNECTING || s.ws.readyState == WebSocket.OPEN);
},
swConnect: function() {
if (null == s.ws || s.ws.readyState != WebSocket.CONNECTING && s.ws.readyState != WebSocket.OPEN) {
var e = this;
cc.log("addr: ", s.wsAddr, null == s.ws);
var t = new WebSocket(s.wsAddr);
t.onopen = function(e) {
cc.log("ws open: ", t.readyState);
o.reset().startHeartBeat();
};
t.onmessage = function(e) {
var t = new Uint32Array(e.data), n = t[0];
switch (n) {
case s.MID_login:
cc.log("ws message MID_login: ", t[1], t[2], t[3], t[4], t[5], t[6]);
var a = t[2].toString(), c = t[4], i = t[6];
2 == t[3] && (c = 0 - c);
2 == t[5] && (i = 0 - i);
var r = {
sessionId: t[2],
nodex: c,
nodey: i
};
0 == s.PlayerSessionMap.has(a) && s.PlayerSessionMap.set(a, r);
s.NewplayerMap.set(a, r);
s.newPlayerIds.push(a);
cc.log("ws message MID_login: ", s.newPlayerIds.length, a, s.NewplayerMap.has(a));
break;

case s.MID_logout:
a = t[2].toString();
cc.log("ws message MID_logout, sessionid: ", a);
s.DelPlayerIds.push(a);
s.PlayerSessionMap.delete(a);
break;

case s.MID_move:
a = t[2].toString(), c = t[4], i = t[6];
2 == t[3] && (c = 0 - c);
2 == t[5] && (i = 0 - i);
r = {
sessionId: t[2],
nodex: c,
nodey: i
};
0 == s.PlayerSessionMap.has(a) && s.PlayerSessionMap.set(a, r);
s.NewplayerMap.set(a, r);
s.newPlayerIds.push(a);
cc.log("MID_move purple monsters: ", s.newPlayerIds.length, a, s.NewplayerMap.has(a));
break;

case s.MID_Bump:
if (0 == t[2]) {
cc.log("ws message MID_Bump fail ... ");
break;
}
c = t[4], i = t[6];
2 == t[3] && (c = 0 - c);
2 == t[5] && (i = 0 - i);
var l = {
nodex: c,
nodey: i
};
s.newStarPos.set(s.newStarKey, l);
break;

case s.MID_HeartBeat:
cc.log("ws message MID_HeartBeat: ", n);
break;

case s.MID_StarBorn:
cc.log("ws message MID_StarBorn: ", t[2], t[3], t[4], t[5]);
c = t[3], i = t[5];
2 == t[2] && (c = 0 - c);
2 == t[4] && (i = 0 - i);
l = {
nodex: c,
nodey: i
};
s.newStarPos.set(s.newStarKey, l);
break;

case s.MID_GM:
cc.log("ws message MID_GM...");
break;

default:
cc.log("未知 消息id: ", n);
}
o.reset().startHeartBeat();
};
t.onerror = function(n) {
cc.log("ws error: ", t.readyState);
if (0 == o.hasDisconnected()) {
o.stopReconnectTimer();
o.reconnectTimeoutobj = setTimeout(function() {
e.swConnect();
}, 1e3);
} else o.stopReconnectTimer();
};
t.onclose = function(n) {
cc.log("ws close: ", t.readyState);
if (0 == o.hasDisconnected()) {
o.stopReconnectTimer();
o.reconnectTimeoutobj = setTimeout(function() {
e.swConnect();
}, 1e3);
} else o.stopReconnectTimer();
};
cc.log("global ws init, state: ", t.readyState);
s.ws = t;
}
},
sendwsmessage: function(e) {
null != s.ws && (null == s.ws || s.ws.readyState != WebSocket.CLOSED && s.ws.readyState != WebSocket.CLOSING) && s.ws.send(e);
}
});
cc._RF.pop();
}, {
common: "common"
} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "gm", "ioNet", "playerdata", "wsNet" ]);
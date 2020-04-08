window.__require = function e(t, n, s) {
function o(c, r) {
if (!n[c]) {
if (!t[c]) {
var i = c.split("/");
i = i[i.length - 1];
if (!t[i]) {
var l = "function" == typeof __require && __require;
if (!r && l) return l(i, !0);
if (a) return a(i, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = i;
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
o.PlayerSessionMap = new Map();
o.NewplayerMap = new Map();
o.newPlayerIds = new Array();
o.DelPlayerIds = new Array();
this.getBattleObj().postBattleStartMsg();
this.groundY = this.ground.y + this.ground.height / 2;
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar();
this.score = 0;
},
spawnNewStar: function() {
var e = cc.instantiate(this.starPrefab);
this.node.addChild(e);
e.setPosition(this.getNewStarPosition());
e.getComponent("Star").game = this;
this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var e, t = this.node.width / 2;
this.getBattleObj().postUpdateStarPosMsg(t);
2 * (Math.random() - .5) * t;
e = 2 * (Math.random() - .5) * t;
return cc.v2(e, -100);
},
checkNewPlayer: function() {
var e = o.newPlayerIds.length;
if (0 != e) {
cc.log("create purple monsters.");
for (var t = this, n = "PurpleMonster"; e > 0; ) {
var s = o.newPlayerIds.pop();
if (0 != o.NewplayerMap.has(s)) {
var a = o.NewplayerMap.get(s), c = t.node.getChildByName(s.toString());
null != c && t.node.removeChild(c);
cc.loader.loadRes(n, cc.SpriteFrame, function(e, o) {
cc.loader.setAutoRelease(n, !0);
var c = new cc.Node(s.toString());
c.position = cc.v2(a.nodex, a.nodey);
c.addComponent(cc.Sprite).spriteFrame = o;
t.node.addChild(c, 0, s.toString());
});
o.NewplayerMap.delete(s);
e = o.newPlayerIds.length;
}
}
}
},
checklogout: function() {
for (var e = o.DelPlayerIds.length; e > 0; ) {
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
cc.audioEngine.playEffect(this.scoreAudio, !1);
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
var s = e("common"), o = e("wsNet");
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
cc.game.setFrameRate(100);
this.getwsNetObj().swConnect();
s.FirstLogin = null;
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
cc.log("send player pos: ", e, this.TickFrame, this.node.x, this.node.y);
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
if (this.TickFrame > 1) {
this.sendPlayerPos(s.MID_move);
this.TickFrame = 0;
}
}
});
cc._RF.pop();
}, {
common: "common",
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
onPicked: function(e, t) {
a.Bumped = 1;
this.getBattleObj().postAttackMsg(e, t);
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
},
update: function(e) {
if (this.getPlayerDistance() < this.pickRadius) {
e <= 1 && (e *= 100);
var t = parseInt(e), n = parseInt(this.getPlayerDistance());
this.onPicked(t, n);
} else ;
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
cc.log("UpdateStarPos response: ", t.response);
var e = new Uint32Array(t.response);
cc.log("UpdateStarPos data: ", e);
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
if (4 == e.readyState && e.status >= 200 && e.status < 300) {
o.randseed = parseInt(e.responseText);
cc.log("BattleStart response: ", e.responseText);
}
};
e.send(new Uint16Array([ 1 ]));
}
},
postAttackMsg: function(e, t) {
var n = cc.loader.getXMLHttpRequest(), s = this.getHost() + "/Attack";
n.open("POST", s, !0);
n.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
n.onreadystatechange = function() {
4 == n.readyState && n.status >= 200 && n.status < 300 && cc.log("Attack response: ", n.responseText);
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
Bumped: null,
newplayerCreated: null,
newplayerPosx: null,
newplayerPosy: null,
newPlayerId: null,
test: null
};
cc._RF.pop();
}, {} ],
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
var s = e("common");
cc.Class({
CanSendMsg: function() {
return null != s.ws && (s.ws.readyState == WebSocket.CONNECTING || s.ws.readyState == WebSocket.OPEN);
},
newPlayer: function(e) {
s.newplayerCreated = 1;
s.newplayerPosx = e[4];
2 == e[3] && (s.newplayerPosx = 0 - s.newplayerPosx);
s.newplayerPosy = e[6];
2 == e[5] && (s.newplayerPosy = 0 - s.newplayerPosy);
},
swConnect: function() {
if (null == s.ws) {
cc.log("addr: ", s.wsAddr, null == s.ws);
var e = new WebSocket(s.wsAddr);
e.onopen = function(t) {
cc.log("ws open: ", e.readyState);
};
e.onmessage = function(e) {
var t = new Uint32Array(e.data), n = t[0];
switch (n) {
case s.MID_login:
cc.log("ws message MID_login: ", t[1], t[2], t[3], t[4], t[5], t[6]);
var o = t[2].toString(), a = t[4], c = t[6];
2 == t[3] && (a = 0 - a);
2 == t[5] && (c = 0 - c);
var r = {
sessionId: t[2],
nodex: a,
nodey: c
};
0 == s.PlayerSessionMap.has(o) && s.PlayerSessionMap.set(o, r);
s.NewplayerMap.set(o, r);
s.newPlayerIds.push(o);
break;

case s.MID_logout:
o = t[2].toString();
cc.log("ws message MID_logout, sessionid: ", o);
s.DelPlayerIds.push(o);
s.PlayerSessionMap.delete(o);
break;

case s.MID_move:
cc.log("ws message MID_move: ", t[1], t[2], t[3], t[4], t[5], t[6]);
o = t[2].toString(), a = t[4], c = t[6];
2 == t[3] && (a = 0 - a);
2 == t[5] && (c = 0 - c);
r = {
sessionId: t[2],
nodex: a,
nodey: c
};
0 == s.PlayerSessionMap.has(o) && s.PlayerSessionMap.set(o, r);
s.NewplayerMap.set(o, r);
s.newPlayerIds.push(o);
cc.log("MID_move purple monsters: ", s.newPlayerIds.length);
break;

default:
cc.log("未知 消息id: ", n);
}
};
e.onerror = function(t) {
cc.log("ws error: ", e.readyState);
s.ws = null;
};
e.onclose = function(t) {
cc.log("ws close: ", e.readyState);
s.ws = null;
};
cc.log("global ws init, state: ", e.readyState);
s.ws = e;
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
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "ioNet", "playerdata", "wsNet" ]);
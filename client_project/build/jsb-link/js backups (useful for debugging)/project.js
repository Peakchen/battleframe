window.__require = function t(e, n, c) {
function s(a, i) {
if (!n[a]) {
if (!e[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!e[r]) {
var u = "function" == typeof __require && __require;
if (!i && u) return u(r, !0);
if (o) return o(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var d = n[a] = {
exports: {}
};
e[a][0].call(d.exports, function(t) {
return s(e[a][1][t] || t);
}, d, d.exports, t, e, n, c);
}
return n[a].exports;
}
for (var o = "function" == typeof __require && __require, a = 0; a < c.length; a++) s(c[a]);
return s;
}({
Game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4e12fLSQu1L+KV6QmxDiavU", "Game");
var c = t("battle"), s = (t("common"), t("wsNet"));
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
return new c();
},
getwsNetObj: function() {
return new s();
},
onLoad: function() {
this.getwsNetObj().swConnect();
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
cc.log("game over: ", this.timer, this.starDuration);
this.gameOver();
this.enabled = !1;
} else this.timer += t;
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score;
cc.audioEngine.playEffect(this.scoreAudio, !1);
},
gameOver: function() {
this.player.stopAllActions();
cc.director.loadScene("game");
}
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
}
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
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
update: function(t) {
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
this.node.x += this.xSpeed * t;
}
});
cc._RF.pop();
}, {} ],
Star: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4644f0m2WtABYRy+pn6dOaG", "Star");
var c = t("battle"), s = t("wsNet");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
getBattleObj: function() {
return new c();
},
getwsNetObj: function() {
return new s();
},
getPlayerDistance: function() {
var t = this.game.player.getPosition();
return this.node.position.sub(t).mag();
},
onPicked: function(t, e) {
var n = new ArrayBuffer(10), c = new Uint16Array(n);
c[0] = 4;
for (var s = 1; s <= c.length - 1; s++) c[s] = s + 1;
this.getwsNetObj().sendwsmessage(c);
this.getBattleObj().postAttackMsg(t, e);
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
},
update: function(t) {
if (this.getPlayerDistance() < this.pickRadius) {
t <= 1 && (t *= 100);
var e = parseInt(t), n = parseInt(this.getPlayerDistance());
cc.log("star info: ", t, e, n);
this.onPicked(e, n);
} else {
var c = 1 - this.game.timer / this.game.starDuration;
this.node.opacity = 50 + Math.floor(205 * c);
}
}
});
cc._RF.pop();
}, {
battle: "battle",
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
var c = t("api"), s = t("common");
cc.Class({
extends: cc.Component,
getApi: function() {
return new c();
},
getHost: function() {
return s.Addr;
},
getRandNumber: function(t) {
return 0 == s.randseed ? t : this.getApi().Rand(t, s.randseed);
},
getRandOne: function(t) {
0 == t && (t = s.randseed);
return this.getApi().RandOne(t);
},
postUpdateStarPosMsg: function(t) {
cc.log("begin send battle start message.");
var e = cc.loader.getXMLHttpRequest(), n = this.getHost() + "/UpdateStarPos";
e.open("POST", n, !0);
e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
e.responseType = "arraybuffer";
e.onreadystatechange = function() {
if (4 == e.readyState && e.status >= 200 && e.status < 300) {
cc.log("UpdateStarPos response: ", e.response);
var t = new Uint32Array(e.response);
cc.log("UpdateStarPos data: ", t);
s.starPosRandseed = t[0];
s.starPosRandN = t[1];
} else ;
};
e.send(new Uint16Array([ 1, t ]));
},
postBattleStartMsg: function() {
if (!(s.randseed > 0)) {
cc.log("begin send battle start message.");
var t = cc.loader.getXMLHttpRequest(), e = this.getHost() + "/BattleStart";
t.open("POST", e, !0);
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status < 300) {
s.randseed = parseInt(t.responseText);
cc.log("BattleStart response: ", t.responseText);
}
};
t.send(new Uint16Array([ 1 ]));
}
},
postAttackMsg: function(t, e) {
cc.log("begin send Attack message.", s.randseed);
var n = cc.loader.getXMLHttpRequest(), c = this.getHost() + "/Attack";
n.open("POST", c, !0);
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
ioSocket: null
};
cc._RF.pop();
}, {} ],
ioNet: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5b591fCkMpNAoTBTiEzeldr", "ioNet");
var c = t("common");
cc.Class({
extends: cc.Component,
ioConnect: function() {
var t = io.connect(c.wsAddr);
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
c.ioSocket = t;
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
var c = t("common");
cc.Class({
extends: cc.Component,
swConnect: function() {
if (null != c.ws) {
cc.log("readyState: ", c.ws.readyState);
if (c.ws.readyState == WebSocket.CONNECTING || c.ws.readyState == WebSocket.OPEN) return;
}
cc.log("addr: ", c.wsAddr, null == c.ws);
ws = new WebSocket(c.wsAddr);
ws.onopen = function(t) {
cc.log("ws open: ", ws.readyState);
};
ws.onmessage = function(t) {
cc.log("ws message: ", t.data);
};
ws.onerror = function(t) {
cc.log("ws error: ", ws.readyState);
};
ws.onclose = function(t) {
cc.log("ws close: ", ws.readyState);
};
cc.log("global ws init, state: ", ws.readyState);
c.ws = ws;
},
sendwsmessage: function(t) {
if (null != c.ws && (null == c.ws || c.ws.readyState != WebSocket.CLOSED && c.ws.readyState != WebSocket.CLOSING)) {
cc.log("ws sendwsmessage.");
c.ws.send(t);
}
}
});
cc._RF.pop();
}, {
common: "common"
} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "ioNet", "wsNet" ]);
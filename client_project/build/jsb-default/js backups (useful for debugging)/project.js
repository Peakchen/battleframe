window.__require = function e(t, n, s) {
function o(i, a) {
if (!n[i]) {
if (!t[i]) {
var r = i.split("/");
r = r[r.length - 1];
if (!t[r]) {
var u = "function" == typeof __require && __require;
if (!a && u) return u(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = r;
}
var l = n[i] = {
exports: {}
};
t[i][0].call(l.exports, function(e) {
return o(t[i][1][e] || e);
}, l, l.exports, e, t, n, s);
}
return n[i].exports;
}
for (var c = "function" == typeof __require && __require, i = 0; i < s.length; i++) o(s[i]);
return o;
}({
Game: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e12fLSQu1L+KV6QmxDiavU", "Game");
var s = e("battle"), o = e("common"), c = e("wsNet");
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
return new c();
},
onLoad: function() {
cc.log("game on load init...");
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
var c = o.newPlayerIds.pop();
if (0 == o.NewplayerMap.has(c)) {
cc.log("NewplayerMap not find, playerid: ", c);
break;
}
var i = o.NewplayerMap.get(c), a = t.node.getChildByName(c.toString());
if (null != a) {
if (a.x != i.nodex || i.nodey != a.y) {
t.node.removeChild(a);
s = !0;
}
} else s = !0;
if (s) {
cc.loader.loadRes(n, cc.SpriteFrame, function(e, s) {
cc.loader.setAutoRelease(n, !0);
var o = new cc.Node(c.toString());
o.position = cc.v2(i.nodex, i.nodey);
o.addComponent(cc.Sprite).spriteFrame = s;
t.node.addChild(o, 0, c.toString());
});
s = !1;
}
o.NewplayerMap.delete(c);
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
var s = e("common"), o = e("wsNet"), c = e("gm");
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
s.FirstLogin = null;
s.newStarPos = new Map();
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 2 * (Math.random() - .5) * 10;
this.TickFrame = 0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
this.randPlayerPos();
this.getwsNetObj().CanSendMsg() && this.sendPlayerPos(s.MID_SyncPos);
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
if (null != s.mySessionId) {
var t = new ArrayBuffer(28), n = new Uint32Array(t);
n[0] = e;
n[1] = 5;
var o = 1, c = this.node.x;
if (c < 0) {
o = 2;
c = 0 - c;
}
n[2] = o;
n[3] = parseInt(c);
var i = 1, a = -88;
if (a < 0) {
i = 2;
a = 0 - a;
}
n[4] = i;
n[5] = parseInt(a);
n[6] = s.mySessionId;
this.getwsNetObj().sendwsmessage(n);
}
},
update: function(e) {
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
var s = e("battle"), o = e("wsNet"), c = e("common");
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
onLoad: function() {
this.updateFrame = 0;
},
onPicked: function() {
if (0 != c.newStarPos.has(c.newStarKey) || null != c.BumpedPlayerId) {
var e = c.newStarPos.get(c.newStarKey);
c.newStarPos.delete(c.newStarKey);
var t = e.nodex, n = e.nodey;
this.game.spawnNewStar(t, n);
c.mySessionId == c.BumpedPlayerId && this.game.gainScore();
this.node.destroy();
c.Bumped = 1;
}
},
sendBumpMsg: function() {
var e = new ArrayBuffer(44), t = new Uint32Array(e);
t[0] = c.MID_Bump;
t[1] = 9;
var n = this.game.player.getPosition(), s = n.x, o = 1;
if (s < 0) {
o = 2;
s = 0 - s;
}
var i = n.y, a = 1;
if (i < 0) {
a = 2;
i = 0 - i;
}
t[2] = o;
t[3] = parseInt(s);
t[4] = a;
t[5] = parseInt(i);
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
t[10] = c.mySessionId;
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
MID_Register: 9,
MID_SyncPos: 10,
Bumped: null,
BumpedPlayerId: null,
newStarKey: "Star",
newStarPos: null,
AccountName: null,
AccountPwd: null,
DoRegisterAction: null,
RegisterSucc: null,
DoLoginAction: null,
LoginSucc: null,
maxDigital: 21e8,
test: null
};
cc._RF.pop();
}, {} ],
gm: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2b4382aBhFPO6s4qV0x0VrN", "gm");
var s = e("wsNet"), o = e("common"), c = 1;
cc.Class({
getwsNetObj: function() {
return new s();
},
sendResetStarPos: function() {
cc.log("reset star pos...");
var e = new ArrayBuffer(28), t = new Uint32Array(e);
t[0] = o.MID_GM;
t[1] = 5;
t[2] = c;
var n = 1, s = 0;
if (s < 0) {
n = 2;
s = 0 - s;
}
t[3] = n;
t[4] = parseInt(s);
var i = 1, a = -88;
if (a < 0) {
i = 2;
a = 0 - a;
}
t[5] = i;
t[6] = parseInt(a);
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
login: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "85d2af0NxdLsYumGChyxxL/", "login");
var s = e("Game"), o = e("common"), c = e("wsNet");
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
},
tip_info: {
default: null,
type: cc.Label
}
},
getGameObj: function() {
return new s();
},
getwsNetObj: function() {
return new c();
},
onLoad: function() {
cc.log("login init...");
this.getwsNetObj().swConnect();
o.PlayerSessionMap = new Map();
o.NewplayerMap = new Map();
o.newPlayerIds = new Array();
o.DelPlayerIds = new Array();
this.registerBtn.interactable = !1;
this.loginBtn.interactable = !1;
this.registerBtn.node.on("click", this.onRegister, this);
this.loginBtn.node.on("click", this.onLogin, this);
this.nameBox.node.on("text-changed", this.onName, this);
this.pwdBox.node.on("text-changed", this.onPwd, this);
},
onRegister: function(e) {
cc.log("click register...");
if (this.getwsNetObj().CanSendMsg()) {
this.sendAccountMessage(o.MID_Register);
null == o.FirstLogin && (o.FirstLogin = 1);
o.DoRegisterAction = 1;
}
},
onLogin: function(e) {
cc.log("click login...");
if (this.getwsNetObj().CanSendMsg()) {
this.sendAccountMessage(o.MID_login);
o.DoLoginAction = 1;
null == o.FirstLogin && (o.FirstLogin = 1);
}
},
sendAccountMessage: function(e) {
var t = new ArrayBuffer(16), n = new Uint32Array(t);
n[0] = e;
n[1] = 2;
n[2] = parseInt(o.AccountName);
n[3] = parseInt(o.AccountPwd);
this.getwsNetObj().sendwsmessage(n);
},
onName: function(e) {
cc.log("edit name: ", e.string);
o.AccountName = e.string;
this.checkInputContent();
},
onPwd: function(e) {
cc.log("edit pwd: ", e.string);
o.AccountPwd = e.string;
this.checkInputContent();
},
change2GameMain: function() {
cc.director.loadScene("game");
},
checkRegisterActionResult: function() {
if (1 == o.DoRegisterAction) {
cc.log("RegisterSucc: ", o.RegisterSucc);
0 == o.RegisterSucc ? this.tip_info.string = "用户名和密码重复或者错误" : this.tip_info.string = "注册成功";
o.DoRegisterAction = 0;
}
},
checkLoginActionResult: function() {
1 == o.DoLoginAction && this.scheduleOnce(function() {
cc.log("LoginSucc: ", o.LoginSucc);
if (0 == o.LoginSucc) this.tip_info.string = "用户名和密码重复或者错误"; else {
this.tip_info.string = "登陆成功";
cc.log("玩家登陆成功, id：", o.mySessionId);
this.change2GameMain();
}
o.DoLoginAction = 0;
}, 2);
},
containDigital: function(e) {
return new RegExp("^[0-9]*$").test(e);
},
checkInputContent: function() {
var e = !0;
"" == o.AccountName || "" == o.AccountPwd ? this.tip_info.string = "用户名或者密码不能为空！！！" : 0 == this.containDigital(o.AccountName) && 0 == this.containDigital(o.AccountPwd) ? this.tip_info.string = "用户名或者密码不为数字！！！" : parseInt(o.AccountName) > o.maxDigital || parseInt(o.AccountPwd) > o.maxDigital ? this.tip_info.string = "用户名或者密码长度超了！！！" : e = !1;
if (!e) {
this.registerBtn.interactable = !0;
this.loginBtn.interactable = !0;
}
},
update: function(e) {
this.checkRegisterActionResult();
this.checkLoginActionResult();
}
});
cc._RF.pop();
}, {
Game: "Game",
common: "common",
wsNet: "wsNet"
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
}, c = function(e) {
cc.log("ws message MID_login: ", e[2], e[3]);
1 == e[2] && (s.mySessionId = e[3]);
s.LoginSucc = e[2];
}, i = function(e) {
var t = e[2].toString();
cc.log("ws message MID_logout, sessionid: ", t);
s.DelPlayerIds.push(t);
s.PlayerSessionMap.delete(t);
}, a = function(e) {
cc.log("ws message MID_move: ", e[1], e[2], e[3], e[4], e[5], e[6]);
var t = e[6].toString(), n = e[3], o = e[5];
2 == e[2] && (n = 0 - n);
2 == e[4] && (o = 0 - o);
var c = {
sessionId: e[6],
nodex: n,
nodey: o
};
0 == s.PlayerSessionMap.has(t) && s.PlayerSessionMap.set(t, c);
s.NewplayerMap.set(t, c);
s.newPlayerIds.push(t);
}, r = function(e) {
if (0 != e[2]) {
cc.log("ws message MID_Bump: ", e[1], e[2], e[3], e[4], e[5], e[6], e[7]);
var t = e[4], n = e[6];
2 == e[3] && (t = 0 - t);
2 == e[5] && (n = 0 - n);
s.BumpedPlayerId = e[7];
var o = {
nodex: t,
nodey: n
};
s.newStarPos.set(s.newStarKey, o);
} else cc.log("ws message MID_Bump fail ... ");
}, u = function(e) {
cc.log("ws message MID_HeartBeat: ", msgid);
}, l = function(e) {
cc.log("ws message MID_StarBorn: ", e[2], e[3], e[4], e[5]);
var t = e[3], n = e[5];
2 == e[2] && (t = 0 - t);
2 == e[4] && (n = 0 - n);
var o = {
nodex: t,
nodey: n
};
s.newStarPos.set(s.newStarKey, o);
}, d = function(e) {
cc.log("ws message MID_GM...");
}, p = function(e) {
cc.log("ws message MID_Online4Other: ", e[1], e[2], e[3], e[4], e[5], e[6]);
var t = e[2].toString(), n = e[4], o = e[6];
2 == e[3] && (n = 0 - n);
2 == e[5] && (o = 0 - o);
var c = {
sessionId: e[2],
nodex: n,
nodey: o
};
0 == s.PlayerSessionMap.has(t) && s.PlayerSessionMap.set(t, c);
s.NewplayerMap.set(t, c);
s.newPlayerIds.push(t);
}, g = function(e) {
cc.log("ws message MID_Register: ", e[2]);
s.RegisterSucc = e[2];
}, h = function(e) {
cc.log("ws message MID_SyncPos: ", e[1], e[2], e[3], e[4], e[5], e[6]);
var t = e[6].toString(), n = e[3], o = e[5];
2 == e[2] && (n = 0 - n);
2 == e[4] && (o = 0 - o);
var c = {
sessionId: e[6],
nodex: n,
nodey: o
};
0 == s.PlayerSessionMap.has(t) && s.PlayerSessionMap.set(t, c);
s.NewplayerMap.set(t, c);
s.newPlayerIds.push(t);
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
c(t);
break;

case s.MID_logout:
i(t);
break;

case s.MID_move:
a(t);
break;

case s.MID_Bump:
r(t);
break;

case s.MID_HeartBeat:
u(t);
break;

case s.MID_StarBorn:
l(t);
break;

case s.MID_GM:
d(t);
break;

case s.MID_Online4Other:
p(t);
break;

case s.MID_Register:
g(t);
break;

case s.MID_SyncPos:
h(t);
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
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "Player", "Star", "api", "battle", "common", "gm", "ioNet", "login", "playerdata", "wsNet" ]);
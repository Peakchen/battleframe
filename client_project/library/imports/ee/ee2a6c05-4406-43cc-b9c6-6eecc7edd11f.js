"use strict";
cc._RF.push(module, 'ee2a6wFRAZDzLnGbuzH7dEf', 'playerdata');
// scripts/playerdata.js

"use strict";

var player = cc.Class({
  name: 'player',
  properties: {
    sessionId: null,
    nodex: null,
    nodey: null
  }
});
var playerManager = cc.Class({
  properties: {
    playerMap: [player]
  }
});

cc._RF.pop();
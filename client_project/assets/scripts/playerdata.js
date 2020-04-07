var player = cc.Class({
    name: 'player',
    properties: {
        sessionId: null,
        nodex: null,
        nodey: null,
    }
});

var playerManager = cc.Class({
    properties: {
        playerMap: [player],
    },
});
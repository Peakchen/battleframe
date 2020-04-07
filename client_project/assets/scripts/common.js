module.exports = {
    // addr
    Addr: "localhost:13001",
    wsAddr: "ws://localhost:13001/ws",

    //rand
    randseed : null,
    starPosRandseed: null,
    starPosRandN: null,

    //socket
    ws: null,
    ioSocket: null,

    //player data
    PlayerSessionMap: null,
    NewplayerMap: null, //同屏玩家具体数据
    newPlayerIds: null, //同屏玩家session id
    DelPlayerIds: null, //同屏下限玩家

    // 
    FirstLogin: null, //1:表示首次

    // messag define
    MID_login: 1,
    MID_logout: 2,
    MID_move: 3,

    //是否碰撞 
    Bumped: null,

    //创建精灵数据
    newplayerCreated: null,
    newplayerPosx: null,
    newplayerPosy: null,
    newPlayerId: null,

    //测试
    test: null
};
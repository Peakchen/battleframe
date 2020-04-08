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
    MID_Bump: 4,
    MID_HeartBeat: 5,
    MID_StarBorn: 6,
    MID_GM: 7,

    //是否碰撞 
    Bumped: null,

    //星星数据
    newStarKey: "Star",
    newStarPos: null,

    //测试
    test: null
};
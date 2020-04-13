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
    mySessionId: null,  //当前客户端id

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
    MID_Online4Other: 8,
    MID_Register: 9,
    MID_SyncPos: 10,
    MID_MonsterInfo: 11,
    MID_LogicFrameSync: 12,  //逻辑帧同步其他客户端moster信息

    //是否碰撞 
    Bumped: null,
    BumpedPlayerId: null,
    //星星数据
    newStarKey: "Star",
    newStarPos: null,
    syncStarPos: false,

    syncOnline4Other: false,

    //用户数据
    AccountName: null,
    AccountPwd: null,
    DoRegisterAction: null,
    RegisterSucc: null,
    DoLoginAction: null,
    LoginSucc: null,
    maxDigital: 2100000000,
    MonsterScore: null,
    MosterPosX: 0,
    MosterPosY: 0,
    EnterUpdateMoster: false,

    //测试
    test: null
};
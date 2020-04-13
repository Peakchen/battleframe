package game

/*
	bump entity 撞击实体
*/

import (
	"common"
	"time"
	"math"
	"common/myWebSocket"
	//"sync"
	"fmt"
	"common/AsyncLock"
	//"github.com/globalsign/mgo/bson"
)

type Entity struct {
	common.IDBModule

	Epos *Pos
}

const (
	module_entity = string("EntityStar")
)

func (this *Entity) Identify() string{
	return module_entity
}

func GetEntity()(this *Entity, new bool){
	this = &Entity{}
	this.StrIdentify = module_entity
	err, succ := common.GetRedisDecodeCache(this)
	if !succ {
		panic(err)
	}

	if err != nil {
		this = &Entity{
			Epos: &Pos{
				Nodex: 0,
				Nodey: -88,
			},
		}

		err := common.SetRedisEncodeCache(this)
		if err != nil {
			panic(err)
		}
		new = true
	}
	return
}

func (this *Entity) rand1(timeRandSeed int){
	randX := common.RandOne(timeRandSeed)
	this.Epos.Nodex = int(float64(randX - 0.2)*float64(maxWidth))
	if this.Epos.Nodex > (maxWidth/2) {
		this.Epos.Nodex = (maxWidth/2)
	}

	if this.Epos.Nodex < (0 - maxWidth/2) {
		this.Epos.Nodex = (0 - maxWidth/2)
	}
}

func (this *Entity) rand2(origin *Pos){
	var (
		hasEqual bool	//是否存在相同的
		dstNoEnough bool
		maxloop = 100	//最大循环次数
		loopcount int	
		timeRandSeed = int(time.Now().Unix())
	)

	PurpleMonsters := GetGlobalPurpleMonsters().GetAll()
	for {
		this.rand1(timeRandSeed)
		if origin != nil {
			//调整上一次和最新位置距离，太小了会帖在一起相当于没动一样
			if math.Abs(math.Abs(float64(origin.Nodex)) - float64(this.Epos.Nodex)) < float64(100) {
				timeRandSeed = int(time.Now().Unix()) + 1
				continue
			}
		}

		for id, state := range PurpleMonsters {
			if state == MosterState_Offline {
				continue
			}

			moster := GetPurpleMonsterByID(id)
			if moster.Mypos == nil {
				continue
			}

			if this.Epos.Nodex == moster.Mypos.Nodex{
				hasEqual = true
				break
			}
			
			//判断离上一次球间距，不得小于60
			result := math.Sqrt(math.Pow(float64(moster.Mypos.Nodex - this.Epos.Nodex),2) + math.Pow(float64(moster.Mypos.Nodey - this.Epos.Nodey),2))
			if result <= float64(100) { //小于此值则碰撞了
				timeRandSeed = int(time.Now().Unix()) + 1
				dstNoEnough = true
				break
			}
		}

		loopcount++
		if !hasEqual && !dstNoEnough{
			break
		}

		hasEqual = false
		dstNoEnough = false
		if loopcount >= maxloop {
			break
		}

		if timeRandSeed == int(time.Now().Unix()) {
			timeRandSeed = int(time.Now().Unix()) + 1
		}
	}
}

func (this *Entity) RandEntityPos(origin *Pos)*Pos{

	//多协程处理数据
	AsyncLock.AddZKLock("global", module_entity)
	defer AsyncLock.ReleaseZKLock("global", module_entity)

	if this.Epos == nil {
		panic("invalid Epos.")
		return nil
	}

	this.rand1(int(time.Now().Unix()))
	err := common.SetRedisEncodeCache(this)
	if err != nil {
		panic(err)
	}
	return this.Epos
}

func (this *Entity) IsFirstCreate()bool{
	return this.Epos.Nodey == 0
}

func (this *Entity) SetPos(newpos *Pos){
	this.Epos = newpos
	err := common.SetRedisEncodeCache(this)
	if err != nil {
		panic(err)
	}
}

func SyncStarPos(sess *myWebSocket.WebSession){
	var (
		dstmsg = []uint32{}
		starpos *Pos
	) 

	entityptr, bnew := GetEntity()
	if bnew {
		starpos = entityptr.RandEntityPos(nil)
	}else{
		starpos = entityptr.Epos
	}

	if starpos == nil {
		panic("invalid pos.")
	}

	fmt.Println("begin star pos: ", starpos.Nodex, starpos.Nodey)
	posXflag := Pos_Right
	posX := starpos.Nodex
	if starpos.Nodex < 0 {
		posXflag = Pos_Left
		posX = 0 - posX
	}

	posYflag := Pos_Right
	posY := starpos.Nodey
	if starpos.Nodey < 0 {
		posYflag = Pos_Left
		posY = 0 - posY
	}

	dstmsg = append(dstmsg, uint32(posXflag))
	dstmsg = append(dstmsg, uint32(posX))
	dstmsg = append(dstmsg, uint32(posYflag))
	dstmsg = append(dstmsg, uint32(posY))
	myWebSocket.SendMsg(sess, myWebSocket.MID_StarBorn, dstmsg)
}
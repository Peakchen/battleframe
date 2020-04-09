package game

/*
	bump entity 撞击实体
*/

import (
	"common"
	"time"
	"math"
	"common/myWebSocket"
	"sync"
	"fmt"
	//"github.com/globalsign/mgo/bson"
)

type Entity struct {
	common.IDBModule
	sync.Mutex

	Epos *Pos
}

func (this *Entity) Identify() string{
	return this.StrIdentify
}

func GetEntity()(_entity *Entity, new bool){
	_entity = &Entity{}
	_entity.StrIdentify = "5e0d59f70753bf030c3646ec"
	common.GetDecodeCache(_entity)
	if _entity.Epos == nil {
		_entity = &Entity{
			Epos: &Pos{
				Nodex: 0,
				Nodey: -88,
			},
		}

		common.SetEncodeCache(_entity)
		new = true
	}
	return
}

const (
	maxWidth = 960
)

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

	playersPos := GetPlayers().GetAll()
	for {
		this.rand1(timeRandSeed)
		if origin != nil {
			//调整上一次和最新位置距离，太小了会帖在一起相当于没动一样
			if math.Abs(math.Abs(float64(origin.Nodex)) - float64(this.Epos.Nodex)) < float64(100) {
				timeRandSeed = int(time.Now().Unix()) + 1
				continue
			}
		}

		for _, pos := range playersPos {
			if this.Epos.Nodex == pos.Nodex{
				hasEqual = true
				break
			}

			//判断离上一次球间距，不得小于60
			result := math.Sqrt(math.Pow(float64(pos.Nodex - this.Epos.Nodex),2) + math.Pow(float64(pos.Nodey - this.Epos.Nodey),2))
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
	this.Lock()
	defer this.Unlock()

	if this.Epos == nil {
		panic("invalid Epos.")
		return nil
	}

	this.rand1(int(time.Now().Unix()))
	
	// timeRandSeed := int(time.Now().Unix())
	// randX := common.RandOne(timeRandSeed)
	// this.Epos.Nodex = int(float64(randX - 0.5)*float64(595.0))
	common.SetEncodeCache(this)
	return this.Epos
}

func (this *Entity) IsFirstCreate()bool{
	return this.Epos.Nodey == 0
}

func (this *Entity) SetPos(newpos *Pos){
	this.Epos = newpos
	common.SetEncodeCache(this)
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
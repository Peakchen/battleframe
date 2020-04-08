package game

/*
	bump entity 撞击实体
*/

import (
	"common"
	"time"
	//"math"
)

type Entity struct {
	Epos *Pos
}

var (
	_entity *Entity
)

func GetEntity()*Entity{
	if _entity == nil {
		_entity = &Entity{
			Epos: &Pos{
				nodex: 0,
				nodey: -88,
			},
		}
	}

	return _entity
}

func (this *Entity) RandEntityPos(origin *Pos)*Pos{
	
	
	// var (
	// 	hasEqual bool	//是否存在相同的
	// 	maxloop = 100	//最大循环次数
	// 	loopcount int	
	// 	timeRandSeed = int(time.Now().Unix())
	// )

	//playersPos := GetPlayer().GetAll()
	// for {
	// 	randX := common.RandOne(timeRandSeed)
	// 	this.Epos.nodex = int(float64(randX - 0.5)*float64(595.0))
	// 	//调整上一次和最新位置距离，太小了会帖在一起相当于没动一样
	// 	if math.Abs(math.Abs(float64(origin.nodex)) - float64(this.Epos.nodex)) < float64(100) {
	// 		timeRandSeed = int(time.Now().Unix())
	// 		continue
	// 	}

	// 	for _, pos := range playersPos {
	// 		if this.Epos.nodex == pos.nodex{
	// 			hasEqual = true
	// 			break
	// 		}
	// 	}

	// 	loopcount++
	// 	if !hasEqual {
	// 		break
	// 	}

	// 	if loopcount >= maxloop {
	// 		break
	// 	}
	// 	timeRandSeed = int(time.Now().Unix())
	// }
	
	timeRandSeed := int(time.Now().Unix())
	randX := common.RandOne(timeRandSeed)
	this.Epos.nodex = int(float64(randX - 0.5)*float64(595.0))
	flag := common.RandInt(2, timeRandSeed)
	if flag == int(Pos_Left) {
		this.Epos.nodex = 0 - this.Epos.nodex
	}
	return this.Epos
}
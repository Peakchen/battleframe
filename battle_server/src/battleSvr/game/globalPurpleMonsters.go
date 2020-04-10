package game

/*
	运动小球实体集合
*/

import (
	"common"
	//"sync"
	"common/AsyncLock"
)

type GlobalPurpleMonsters struct {
	common.IDBModule

	MapPos map[int]*Pos
}

const (
	module_GlobalPurpleMonsters = string("GlobalPurpleMonsters")
)

func (this *GlobalPurpleMonsters) Identify() string{
	return module_GlobalPurpleMonsters
}

func GetGlobalPurpleMonsters()(this *GlobalPurpleMonsters){
	this = &GlobalPurpleMonsters{}
	this.StrIdentify = module_GlobalPurpleMonsters
	err, succ := common.GetDecodeCache(this)
	if !succ {
		panic(err)
	}

	if err != nil {
		this = &GlobalPurpleMonsters{
			MapPos: map[int]*Pos{},
		}

		err := common.SetEncodeCache(this)
		if err != nil {
			panic(err)
		}
	}

	return
}

func (this *GlobalPurpleMonsters) GetAll()map[int]*Pos{
	return this.MapPos
}

func (this *GlobalPurpleMonsters) Save(port int, pos *Pos) {
	AsyncLock.AddZKLock("global", module_GlobalPurpleMonsters)
	defer AsyncLock.ReleaseZKLock("global", module_GlobalPurpleMonsters)

	this.MapPos[port] = pos
	//新增后广播给其他小球客户端...
}

func (this *GlobalPurpleMonsters) Remove(port int) {
	AsyncLock.AddZKLock("global", module_GlobalPurpleMonsters)
	defer AsyncLock.ReleaseZKLock("global", module_GlobalPurpleMonsters)

	delete(this.MapPos, port)

	//删掉后广播给其他小球客户端...
} 


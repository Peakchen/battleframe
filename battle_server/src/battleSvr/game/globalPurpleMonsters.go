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

	Monsters []uint32
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
			Monsters: []uint32{},
		}

		err := common.SetEncodeCache(this)
		if err != nil {
			panic(err)
		}
	}

	return
}

func (this *GlobalPurpleMonsters) GetAll()[]uint32{
	return this.Monsters
}

func (this *GlobalPurpleMonsters) Insert(id uint32) {
	AsyncLock.AddZKLock("global", module_GlobalPurpleMonsters)
	defer AsyncLock.ReleaseZKLock("global", module_GlobalPurpleMonsters)

	this.Monsters = append(this.Monsters, id)
}

func (this *GlobalPurpleMonsters) Remove(id uint32) {
	AsyncLock.AddZKLock("global", module_GlobalPurpleMonsters)
	defer AsyncLock.ReleaseZKLock("global", module_GlobalPurpleMonsters)

	for i:=0;i<len(this.Monsters);i++{
		if this.Monsters[i] == id {
			this.Monsters = append(this.Monsters[:i], this.Monsters[i+1:]...)
			break
		}
	}
} 


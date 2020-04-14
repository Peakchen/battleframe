package game

import (
	//"common"
	//"sync"
	"common/AsyncLock"
	"common/rediscache"
	"common/cache"
)

type GlobalMonsterIdx struct {
	rediscache.IDBModule

	MonsterIdx uint32
}

const (
	module_GlobalMonsterIdx = string("GlobalMonsterIdx")
)

func (this *GlobalMonsterIdx) Identify() string{
	return module_GlobalMonsterIdx
}

func GetGlobalMonsterIdx()uint32{
	AsyncLock.AddZKLock("global", module_GlobalMonsterIdx)
	defer AsyncLock.ReleaseZKLock("global", module_GlobalMonsterIdx)

	this := &GlobalMonsterIdx{}
	this.StrIdentify = module_GlobalMonsterIdx
	err, succ := cache.GetDecodeCache(this.Identify(),this)
	if !succ {
		panic(err)
	}

	this.StrIdentify = module_GlobalMonsterIdx
	this.MonsterIdx++
	err = cache.SetEncodeCache(this.Identify(),this)
	if err != nil {
		panic(err)
	}

	
	return this.MonsterIdx
}


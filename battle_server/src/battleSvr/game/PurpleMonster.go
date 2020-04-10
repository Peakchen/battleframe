package game

/*
	运动小球实体个体
*/

import (
	"common"
)

type PurpleMonster struct {
	common.IDBModule

	Mypos *Pos
	ID 	  uint32
}

func (this *PurpleMonster) Identify() string{
	return this.StrIdentify
}

func NewMoster(name, pwd string)(succ bool){
	src := "n:" + name + "p:" + pwd
	md5code := common.GetMd5String(src)
	this := &PurpleMonster{}
	this.StrIdentify = md5code
	err, succ := common.GetDecodeCache(this)
	if !succ {
		panic(err)
	}

	if err == nil {	//已存在相同的数据
		return
	}

	this.ID = GetGlobalMonsterIdx()
	//this.Mypos  给个出生点坐标？
	common.SetEncodeCache(this)
	succ = true
	return
}

func GetPurpleMonster(Identify string)(this *PurpleMonster){
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	err, succ := common.GetDecodeCache(this)
	if !succ || err != nil{
		panic(err)
	}

	return
}

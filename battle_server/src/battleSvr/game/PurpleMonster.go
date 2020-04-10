package game

/*
	运动小球实体个体
*/

import (
	"common"
	"strconv"
	"fmt"
)

type PurpleMonster struct {
	common.IDBModule

	Mypos *Pos
	ID 	  uint32
}

func (this *PurpleMonster) Identify() string{
	return this.StrIdentify
}

func NewMoster(name, pwd string)(this *PurpleMonster, newsucc bool){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	err, succ := common.GetDecodeCache(this)
	if !succ {
		panic(err)
	}

	if err == nil {	//已存在相同的数据
		return
	}

	this.ID = GetGlobalMonsterIdx()
	//this.Mypos  给个出生点坐标？
	common.SetCache(strconv.Itoa(int(this.ID)), Identify)
	common.SetEncodeCache(this)
	newsucc = true
	return
}

func GetExistMonster(name, pwd string) (this *PurpleMonster, err error){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	var succ bool
	err, succ = common.GetDecodeCache(this)
	if !succ {
		panic(err)
	}

	return
}

func GetPurpleMonsterByID(id uint32)(this *PurpleMonster){
	data, err := common.GetCache(strconv.Itoa(int(id)))
	if err != nil {
		panic(err)
		return
	}else if data == nil {
		fmt.Println("get data empty.")
		return
	}

	this = &PurpleMonster{}
	this.StrIdentify = data.(string)
	err, succ := common.GetDecodeCache(this)
	if !succ || err != nil{
		panic(err)
	}

	return
}

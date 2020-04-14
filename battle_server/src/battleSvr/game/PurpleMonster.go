package game

/*
	运动小球实体个体
*/

import (
	"common"
	"strconv"
	"fmt"
	"time"
	"common/rediscache"
	"common/cache"
	"reflect"
)

type PurpleMonster struct {
	rediscache.IDBModule

	Mypos *Pos
	ID 	  uint32
	Score uint32
}

func (this *PurpleMonster) Identify() string{
	return this.StrIdentify
}

func (this *PurpleMonster) SetPos(pos *Pos) {
	this.Mypos = pos
}

func (this *PurpleMonster) AddScore()uint32{
	this.Score++
	return this.Score
}

func (this *PurpleMonster) UpdateCache(){
	err := cache.SetEncodeCache(this.Identify(), this)
	if err != nil {
		panic(err)
	}
}

func NewMoster(name, pwd string)(this *PurpleMonster, newsucc bool){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	err, succ := cache.GetDecodeCache(this.Identify(), this)
	if !succ {
		panic(err)
	}

	if err == nil {	//已存在相同的数据
		return
	}

	this.ID = GetGlobalMonsterIdx()
	//this.Mypos  给个出生点坐标？
	randX := common.RandOne(int(time.Now().Unix()))
	this.Mypos = &Pos{
		Nodex: int(float64(randX - 0.2)*float64(maxWidth)),
		Nodey: -120,
	}

	this.StrIdentify = Identify
	cache.SetCache(strconv.Itoa(int(this.ID)), Identify)
	this.UpdateCache()
	newsucc = true
	return
}

func GetExistMonster(name, pwd string) (this *PurpleMonster, err error){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	var succ bool
	err, succ = cache.GetDecodeCache(this.Identify(), this)
	if !succ {
		panic(err)
	}

	cache.SetCache(strconv.Itoa(int(this.ID)), Identify)
	return
}

func GetPurpleMonsterByID(id uint32)(this *PurpleMonster){
	data, err := cache.GetCache(strconv.Itoa(int(id)))
	if err != nil {
		panic(err)
		return
	}else if data == nil {
		fmt.Println("get data empty.")
		return
	}

	this = &PurpleMonster{}
	if reflect.ValueOf(data).Kind() == reflect.String {
		this.StrIdentify = data.(string)
	}else {
		this.StrIdentify = string(data.([]uint8))
		cache.SetCache(strconv.Itoa(int(id)), this.StrIdentify)
	}

	err, succ := cache.GetDecodeCache(this.Identify(), this)
	if !succ || err != nil{
		panic(err)
	}

	return
}

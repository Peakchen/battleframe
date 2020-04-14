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
	err := rediscache.SetRedisEncodeCache(this)
	if err != nil {
		panic(err)
	}
}

func NewMoster(name, pwd string)(this *PurpleMonster, newsucc bool){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	err, succ := rediscache.GetRedisDecodeCache(this)
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
	rediscache.SetRedisCache(strconv.Itoa(int(this.ID)), Identify)
	this.StrIdentify = Identify
	rediscache.SetRedisEncodeCache(this)
	newsucc = true
	return
}

func GetExistMonster(name, pwd string) (this *PurpleMonster, err error){
	src := "n:" + name + "p:" + pwd
	Identify := common.GetMd5String(src)
	this = &PurpleMonster{}
	this.StrIdentify = Identify
	var succ bool
	err, succ = rediscache.GetRedisDecodeCache(this)
	if !succ {
		panic(err)
	}

	return
}

func GetPurpleMonsterByID(id uint32)(this *PurpleMonster){
	data, err := rediscache.GetRedisCache(strconv.Itoa(int(id)))
	if err != nil {
		panic(err)
		return
	}else if data == nil {
		fmt.Println("get data empty.")
		return
	}

	this = &PurpleMonster{}
	this.StrIdentify = string(data.([]uint8))
	err, succ := rediscache.GetRedisDecodeCache(this)
	if !succ || err != nil{
		panic(err)
	}

	return
}

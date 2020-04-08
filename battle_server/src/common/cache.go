package common

import (
	"github.com/gomodule/redigo/redis"
	"fmt"
	"time"
	"github.com/globalsign/mgo/bson"
)

const (
	Addr string = ":6379"
)

type IDBModule struct {
	StrIdentify string `bson:"_id" json:"_id"`
}

type IDBCache interface{
	Identify() string
}

func DialDefaultServer() (redis.Conn, error) {
	c, err := redis.Dial("tcp", Addr, redis.DialReadTimeout(1*time.Second), redis.DialWriteTimeout(1*time.Second))
	if err != nil {
		return nil, err
	}
	//c.Do("FLUSHDB")
	return c, nil
}

func SetEncodeCache(src IDBCache){
	data, err := bson.Marshal(src)
	if err != nil {
		err = fmt.Errorf("bson.Marshal err: %v.\n", err)
		panic(err)
		return
	}

	SetCache(src.Identify(), data)
}

func GetDecodeCache(out IDBCache){
	data, err := GetCache(out.Identify())
	if err != nil {
		panic(err)
	}

	err = bson.Unmarshal(data.([]byte), out)
	if err != nil {
		ret := fmt.Errorf("get data fail, key: %v, err: %v.\n", out.Identify(), err)
		panic(ret)
		return
	}
}

func SetCache(key string, val interface{})(succ bool){
	c, err := DialDefaultServer()
	if err != nil {
		fmt.Println("connect database err: %v.", err)
		return
	}

	defer c.Close()
	_, err = c.Do("SET", key, val)
	if err != nil {
		fmt.Println("Do(SET, key, test003) returned errror %v, expected nil.", err)
		return
	}

	succ = true
	return
}

func GetCache(key string) (val interface{}, err error){
	val = nil

	c, err := DialDefaultServer()
	if err != nil {
		fmt.Println("connect database err: %v.", err)
		return
	}

	return c.Do("GET", key)
}




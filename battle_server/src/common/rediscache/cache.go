package rediscache

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

func SetRedisEncodeCache(src IDBCache)(err error){
	var data []byte = nil
	data, err = bson.Marshal(src)
	if err != nil {
		return
	}

	SetRedisCache(src.Identify(), data)
	return
}

func GetRedisDecodeCache(out IDBCache)(err error, succ bool){
	var data interface{} = nil
	data, err = GetRedisCache(out.Identify())
	if err != nil {
		return
	}

	if data == nil {
		err = fmt.Errorf("data is empty.")
		succ = true
		return
	}

	err = bson.Unmarshal(data.([]byte), out)
	succ = true
	return
}

func SetRedisCache(key string, val interface{})(succ bool){
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

func GetRedisCache(key string) (val interface{}, err error){
	val = nil

	c, err := DialDefaultServer()
	if err != nil {
		fmt.Println("connect database err: %v.", err)
		return
	}

	return c.Do("GET", key)
}



package main

import (
	"github.com/gomodule/redigo/redis"
	"fmt"
	"time"
)

const (
	Addr string = ":6379"
)

func DialDefaultServer() (redis.Conn, error) {
	c, err := redis.Dial("tcp", Addr, redis.DialReadTimeout(1*time.Second), redis.DialWriteTimeout(1*time.Second))
	if err != nil {
		return nil, err
	}
	//c.Do("FLUSHDB")
	return c, nil
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




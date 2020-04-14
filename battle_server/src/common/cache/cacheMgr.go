package cache

import (
	//"reflect"
	"fmt"
	"github.com/globalsign/mgo/bson"
)

/*
	--------------------加密数据部分缓存----------------------
*/
func GetDecodeCache(identify string, v interface{}) (err error) {
	data := GMemCache.Get(identify)
	if data == nil {
		err = fmt.Errorf("mem cache not data.")
		return
	}

	err = bson.Unmarshal(data.([]byte), v)
	return
}	

func SetEncodeCache(identify string, v interface{})(err error){
	data, err := bson.Marshal(v)
	if err != nil {
		err = fmt.Errorf("bson marshal err, key: ", identify)
		return
	}

	GMemCache.Set(identify, true, data)
	err = nil
	return
}

/* 
	---------------------非数据加密部分-----------------
*/
func GetCache(identify string) (v interface{}){
	v = GMemCache.Get(identify)
	return
}

func SetCache(identify string, v interface{}) {
	GMemCache.Set(identify, false, v)
}
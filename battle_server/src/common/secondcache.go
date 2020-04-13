package common

import (
	"sync"
	"time"
)

//key + 
type DetailData struct {
	t int64
	val interface{}
}

type SecondCache struct {
	data sync.Map
}

var (
	GSecondCache *SecondCache = &SecondCache{}
) 

func (this *SecondCache) Run(){
	go this.loopcheck()
}

func (this *SecondCache) SetCache(key string, v interface{}){
	this.data.Store(key, &DetailData{
		val: v,
		t: time.Now().Unix(),
	})
}

func (this *SecondCache) GetCache(key string)(v interface{}){
	valInterface, existed := this.data.Load(key)
	if !existed {
		v = nil
	}else{
		originval := valInterface.(*DetailData)
		v = originval.val
	}

	return
}

func (this *SecondCache) loopcheck(){
	deadlineTick := time.NewTicker( time.Duration( 60*time.Second ))
	for {
		<-deadlineTick.C
		// 到期时间清理数据
		nowt := time.Now().Unix()
		this.data.Range(func (k, v interface{}) bool{
			originval := v.(*DetailData)
			if nowt - originval.t >= 60 {
				this.data.Delete(k)
			}
			return true
		})
	}
}
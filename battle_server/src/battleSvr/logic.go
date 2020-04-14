package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"encoding/binary"
	//"math/rand"
	"time"
	"strconv"
	//"github.com/gomodule/redigo/redis"
	"common"
)

func init(){
	
}

var (
	_RandN int
	_StarRandN int
	cstRandNumber = string("RandNumber")
)

func init(){

}

func BeginBattleHandler(rsp http.ResponseWriter, req *http.Request){
	_RandN = int(time.Now().Unix())
	//SetCache(cstRandNumber, _RandN)
	sranN := strconv.Itoa(_RandN)
	//sranN := strconv.FormatInt(_RandN, 10)
	//fmt.Println("rand number: ", sranN)
	_, err := rsp.Write([]byte(sranN))
	if err != nil {
		fmt.Println("write post fail.")
	}
}

func AttackHandler(rsp http.ResponseWriter, req *http.Request){
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(fmt.Errorf("read http request fail, err: %v.", err))
		return
	}

	var pos int
	datalen := binary.LittleEndian.Uint16(data[pos:])
	pos+=2

	var (
		params = []uint16{}	
	)
	for i:=uint16(0); i < datalen; i++ {
		param := binary.LittleEndian.Uint16(data[pos:])
		pos+=2

		params = append(params, param)
	}

	if len(params) < 3 {
		fmt.Println("invalid params: ", params)
		return
	}
	
	// _RandN, err = redis.Int(GetCache(cstRandNumber))
	// if err != nil {
	// 	fmt.Println("redis get fail, err: ", err)
	// 	return
	// }

	//fmt.Println("receive data: ", params, ", svr check randN: ",common.RandInt(int(params[1]), _RandN), common.RandOne(_RandN))
	_, err = rsp.Write([]byte("reacive ok."))
	if err != nil {
		fmt.Println("write post fail.")
	}
}

func UpdateStarPosHandler(rsp http.ResponseWriter, req *http.Request){
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(fmt.Errorf("read http request fail, err: %v.", err))
		return
	}

	var pos int
	datalen := binary.LittleEndian.Uint16(data[pos:])
	pos+=2

	var (
		params = []uint16{}	
	)
	for i:=uint16(0); i < datalen; i++ {
		param := binary.LittleEndian.Uint16(data[pos:])
		pos+=2

		params = append(params, param)
	}

	if len(params) < 1 {
		fmt.Println("invalid params: ", params)
		return
	}

	//starHelfWidth := params[0]
	//fmt.Println("starHelfWidth: ", starHelfWidth)
	_StarRandint64 := time.Now().Unix()
	_StarRandN = int(_StarRandint64)
	ranN := common.RandOne(_StarRandN)
	// sranN := strconv.FormatFloat(RandOne(_StarRandN), 'g', 1, 64)
	// starRanN := strconv.FormatInt(_StarRandint64, 10)
	var (
		sendmsg = make([]byte, 8)
	)

	//fmt.Println("rand data: ", _StarRandN, ranN)
	pos = 0
	binary.LittleEndian.PutUint32(sendmsg[pos:], uint32(_StarRandint64))
	pos += 4

	binary.LittleEndian.PutUint32(sendmsg[pos:], uint32(ranN*10000))
	pos += 4

	//fmt.Println("starHelfWidth: ", sendmsg)
	rsp.Header().Set("Content-Type", "application/octet-stream")
	_, err = rsp.Write(sendmsg)
	if err != nil {
		fmt.Println("write post fail.")
	}
}
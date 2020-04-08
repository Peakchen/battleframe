package gametest

import (
	//"testing"
	"fmt"
	"common"
	"time"
)

func TestRand() {
	fmt.Println("test rand.")
	randseed := int(time.Now().Unix())
	for i:=0; i<1000; i++ {
		randN := common.RandOne(randseed)
		fmt.Println("rand val: ", randN)
		randseed++
	}
}
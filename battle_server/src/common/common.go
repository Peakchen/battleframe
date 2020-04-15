package common

import (
	"runtime/debug"
	"fmt"
)

func ExceptionStack(){
	if r := recover(); r != nil {
		fmt.Println("catch recover: ", r, string(debug.Stack()))
	}
}
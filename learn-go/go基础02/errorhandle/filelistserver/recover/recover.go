package main

import (
	"errors"
	"fmt"
)

func tryRecover() {
	// 匿名自执行函数
	defer func() {
		// 返回任何类型
		r := recover()
		if err, ok := r.(error); ok {
			fmt.Println("Error Occurred:", err)
		} else {
			panic(r)
		}
	}()
	panic(errors.New("this is an error!"))
}
func main() {
	tryRecover()
}

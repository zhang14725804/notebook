package main

import (
	"fmt"
)
// 循环语句它只有 for 循环，平时我们在其它语言用的 while 语句、do while 语句、loop 语句它是没有的。分支语句只有 if 和 switch，也没有三元操作符。
func main() {
	fmt.Println(sign(3),prize(77))
	// for循环到底需不需要括号
	for i := 0; i < 3; i++ {
        	fmt.Println("hello world!")
    	}
}
func sign(a int) int{
	if(a>0){
		return 1
	}else if(a<0){
		return -1
	}else {
		return 0
	}
}

func prize(score int) string{
	switch{
		case score<60:
			return "差"
		case score >90:
			return "优"
		default:
			return "良"
	}
}


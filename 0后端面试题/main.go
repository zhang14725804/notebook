package main

import (
	. "fmt"
)

func main() {
	var ch chan int
	Println(ch)
	// 未初始化的channel读写造成死锁
	// all goroutines are asleep - deadlock!
	// goroutine 1 [chan receive (nil chan)]
	// ch <- 123
	<-ch
	Println(ch)
}

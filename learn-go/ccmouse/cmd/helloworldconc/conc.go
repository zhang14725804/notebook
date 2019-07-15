package main

import "fmt"

// 并发编程
func main() {
	// Channel是Go中的一个核心类型，你可以把它看成一个管道，通过它并发核心单元就可以发送或者接收数据进行通讯
	ch := make(chan string)
	for i := 0; i < 500; i++ {
		// go开启一个goroutine
		go helloworld(i, ch)
	}
	for {
		// 从Channel ch中接收数据，并将数据赋值给msg
		msg := <-ch
		fmt.Printf(msg)
	}
}

func helloworld(i int, ch chan string) {
	// 死循环
	for {
		// 发送值到Channel ch中
		ch <- fmt.Sprintf("hello world %d!\n", i)
	}
}

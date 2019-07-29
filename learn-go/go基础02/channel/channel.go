package main

import (
	"fmt"
	"time"
)

func chanDemo() {
	//定义channel c==nil
	// var c chan int
	// 创建channel
	// c := make(chan int)
	// 接受数据的goroutine
	// go worker(0, c)
	// 向channel发数据
	// c <- 1
	// c <- 2
	// time.Sleep(time.Millisecond)
	// channel作为数组类型
	// var channels [10]chan int
	var channels [10]chan<- int
	for i := 0; i < 10; i++ {
		// channels[i] = make(chan int)
		// go worker(i, channels[i])
		// 返回channel
		channels[i] = createWorker(i)
	}
	for i := 0; i < 10; i++ {
		channels[i] <- 'a' + i
	}
	for i := 0; i < 10; i++ {
		channels[i] <- 'A' + i
	}
	for i := 0; i < 10; i++ {
		channels[i] <- '!' + i
	}
	time.Sleep(time.Millisecond)
}

// channel作为参数
func worker(id int, c chan int) {
	for {
		// 收数据
		// n := <-c
		// fmt.Println(n)
		// Printf之间是io操作，goroutine会调度，所以导致乱序
		fmt.Printf("Worker %d receive %c\n", id, <-c)
	}
}

// channel作为返回值
// chan<-：：：send-only type channel
// <-chan：：：get-only type channel
func createWorker(id int) chan<- int {
	c := make(chan int)
	// 创建goroutine
	go worker3(id, c)
	return c
}

// 并发执行
func worker3(id int, c chan int) {
	for {
		// Printf之间是io操作，goroutine会调度，所以导致乱序
		fmt.Printf("Worker %d receive %c\n", id, <-c)
	}
}
func bufferedChannel() {
	// 加入缓冲区,提升性能
	c := make(chan int, 3)
	go worker3(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	time.Sleep(time.Millisecond)
}

// 判断channel关闭
func worker4(id int, c chan int) {
	// 方法1
	// for {
	// 	n, ok := <-c
	// 	if !ok {
	// 		break
	// 	}
	// 	// Printf之间是io操作，goroutine会调度，所以导致乱序
	// 	fmt.Printf("Worker %d receive %d\n", id, n)
	// }
	// 方法2
	for n := range c {
		fmt.Printf("Worker %d receive %d\n", id, n)
	}
}

// 发送方close
func channelClose() {
	c := make(chan int)
	go worker4(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	time.Sleep(time.Millisecond)
}
func main() {
	// chanDemo()
	// bufferedChannel()
	channelClose()
}

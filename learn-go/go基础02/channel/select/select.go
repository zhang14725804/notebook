package main

import (
	"fmt"
	"math/rand"
	"time"
)

func generator() chan int {
	out := make(chan int)
	go func() {
		i := 0
		for {
			time.Sleep(time.Duration(rand.Intn(1500)) * time.Millisecond)
			out <- i
			i++
		}
	}()
	return out
}
func worker(id int, c chan int) {
	for n := range c {
		time.Sleep(time.Second)
		fmt.Printf("Worker %d receive %d\n", id, n)
	}
}
func createWorker(id int) chan<- int {
	c := make(chan int)
	// 创建goroutine
	go worker(id, c)
	return c
}
func main() {
	var c1, c2 = generator(), generator()
	// 利用nil channel的性质，当数据还没有准备好的时候将channel置为nil
	var worker = createWorker(0)
	// 生成数据的速度和消耗数据的速度有可能不一致
	// 把收到的数据存起来排队
	var values []int
	// 运行一段时间时间结束程序，time.After返回channel time
	tm := time.After(10 * time.Second)
	// 定时查看队列长度
	tick := time.Tick(time.Second) //每隔一段时间返回一个值
	for {
		// 这里不懂了
		var activeWorker chan<- int
		var activeValue int
		// 有值才进行初始化
		if len(values) > 0 {
			activeWorker = worker
			activeValue = values[0]
		}
		// select进行任务分发，两个任务速度不一样快
		select {
		case n := <-c1:
			values = append(values, n)
		case n := <-c2:
			values = append(values, n)
		case activeWorker <- activeValue:
			values = values[1:]
		case <-tick:
			fmt.Println("Queue len =", len(values))
		case <-time.After(800 * time.Millisecond):
			// 每两次生成数据时间差
			fmt.Println("连接超时")
		case <-tm:
			fmt.Println("打完，收工")
			return
		}
	}
}

package main

import (
	"fmt"
	"time"
)

func Running(taskId, sleeptime, timeout int, ch chan string) {
	run := make(chan string)
	go handle(taskId, sleeptime, run)
	// 通过select + time.After 进行超时检查
	select {
	case re := <-run:
		ch <- re
	case <-time.After(time.Duration(timeout) * time.Second):
		re := fmt.Sprintf("task id %d, timeout", taskId)
		ch <- re
	}
}

func handle(taskId, sleeptime int, ch chan string) {
	time.Sleep(time.Duration(sleeptime) * time.Second)
	ch <- fmt.Sprintf("task id %d, sleep %d second", taskId, sleeptime)
	return
}

func main() {
	nums := []int{3, 2, 1}
	timeout := 2
	chs := make([]chan string, len(nums))
	limit := make(chan bool, 1) // 带缓冲的channel
	// 限制并发数量
	limitFunc := func(limit chan bool, ch chan string, taskId, sleeptime, timeout int) {
		Running(taskId, sleeptime, timeout, ch)
		<-limit
	}
	start := time.Now()
	fmt.Println("Concurrent start!")
	for i, sleeptime := range nums {
		chs[i] = make(chan string, 1) // 为什么这里需要带缓冲的channel（todo）
		limit <- true
		go limitFunc(limit, chs[i], i, sleeptime, timeout)
	}

	// 按照任务执行的顺序依次返回数据
	for _, ch := range chs {
		fmt.Println(<-ch)
	}

	end := time.Now()
	fmt.Printf("Concurrent end! Process time id %s, number of task id %d", end.Sub(start), len(nums))
}

/*
	带缓冲channel和无缓冲channel

	ch :=make(chan string) // 无缓冲的 channel。执行到 ch<-"123",这个 goroutine 就阻塞
	ch<-"123"
	fmt.Println(<-ch) // all goroutines are asleep - deadlock!


	ch :=make(chan string,1) // 带缓冲的channel
	ch<-"123"
	fmt.Println(ch) // channel地址
	fmt.Println(<-ch)

	ch :=make(chan string,1) //
	ch<-"123"
	ch<-"123"	// 读取了两次 channel，但是程序还是会死锁，因为缓冲区满了，goroutine 阻塞挂起
	fmt.Println(<-ch)
	fmt.Println(<-ch)


	// Timer和Ticker 两个关于时间的channel
	timer是一个定时器，代表未来的一个单一事件
	ticker是一个定时触发的计时器，它会以一个间隔(interval)往Channel发送一个事件(当前时间

	timer1 := time.NewTimer(time.Second * 2)
	<-timer1.C
	fmt.Println("Timer 1 expired")
*/

package main

import (
	"fmt"
	"time"
)

func Running3(taskId, sleeptime, timeout int, ch chan string) {
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

func handle3(taskId, sleeptime int, ch chan string) {
	time.Sleep(time.Duration(sleeptime) * time.Second)
	ch <- fmt.Sprintf("task id %d, sleep %d second", taskId, sleeptime)
	return
}

func main3() {
	nums := []int{3, 2, 1}
	timeout := 2
	chs := make([]chan string, len(nums))
	start := time.Now()
	fmt.Println("Concurrent start!")
	for i, sleeptime := range nums {
		chs[i] = make(chan string) // 无缓冲，这里为什么可以执行（todo）
		//
		go Running(i, sleeptime, timeout, chs[i])
	}

	// 按照任务执行的顺序依次返回数据
	for _, ch := range chs {
		fmt.Println(<-ch)
	}

	end := time.Now()
	fmt.Printf("Concurrent end! Process time id %s, number of task id %d", end.Sub(start), len(nums))
}

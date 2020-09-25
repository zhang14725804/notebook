package main

import (
	"fmt"
	"time"
)

func handle1(taskId, sleeptime int, ch chan string) {
	time.Sleep(time.Duration(sleeptime) * time.Second)
	ch <- fmt.Sprintf("task id %d, sleep %d second", taskId, sleeptime)
	return
}

func main1() {
	nums := []int{3, 2, 1}
	// 无缓冲的channel
	ch := make(chan string)
	start := time.Now()
	fmt.Println("Concurrent start!")
	for i, sleeptime := range nums {
		// 并发执行
		go handle(i, sleeptime, ch)
	}

	// 按照执行的快慢返回
	for range nums {
		// ch <- xxx // 向 channel 写入数据
		// <- ch // 从 channel 中读取数据
		fmt.Println(<-ch)
	}

	end := time.Now()
	fmt.Printf("Concurrent end! Process time id %s, number of task id %d", end.Sub(start), len(nums))
}

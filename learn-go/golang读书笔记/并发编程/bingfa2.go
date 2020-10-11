package main

import (
	"fmt"
	"time"
)

func handle2(taskId, sleeptime int, ch chan string) {
	time.Sleep(time.Duration(sleeptime) * time.Second)
	ch <- fmt.Sprintf("task id %d, sleep %d second", taskId, sleeptime)
	return
}

func main2() {
	nums := []int{3, 2, 1}
	//
	chs := make([]chan string, len(nums))
	start := time.Now()
	fmt.Println("Concurrent start!")
	for i, sleeptime := range nums {
		chs[i] = make(chan string) // 这里还需要初始化一次😅
		//
		go handle(i, sleeptime, chs[i])
	}

	// 按照任务执行的顺序依次返回数据
	for _, ch := range chs {
		fmt.Println(<-ch)
	}

	end := time.Now()
	fmt.Printf("Concurrent end! Process time id %s, number of task id %d", end.Sub(start), len(nums))
}

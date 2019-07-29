package main

import (
	"fmt"
	"sync"
)

type worker struct {
	in   chan int
	done chan bool
}

func createWorker(id int) worker {
	w := worker{
		in:   make(chan int),
		done: make(chan bool),
	}
	// 创建goroutine
	go doWork(id, w.in, w.done)
	return w
}

// all goroutines are asleep - deadlock! 循环等待的问题
func chanDemo() {
	var workers [10]worker
	for i := 0; i < 10; i++ {
		// 返回channel
		workers[i] = createWorker(i)
	}
	for i := 0; i < 10; i++ {
		workers[i].in <- 'a' + i
		// 从channel接收数据(这样写是同步执行)
		// <-workers[i].done
	}
	for i, worker := range workers {
		worker.in <- 'A' + i
	}
	for i, worker := range workers {
		worker.in <- '!' + i
	}
	for _, worker := range workers {
		<-worker.done
		<-worker.done
		<-worker.done
	}
}

// 并发执行,通过通信共享内存
func doWork(id int, c chan int, done chan bool) {
	for {
		// Printf之间是io操作，goroutine会调度，所以导致乱序
		fmt.Printf("doWork %d receive %c\n", id, <-c)
		// 通知完成，没有接收者导致all goroutines are asleep - deadlock!
		// done <- true
		go func() { done <- true }()
	}
}

// 用sync.WaitGroup解决：：等待多人完成任务的问题
type workerSync struct {
	in chan int
	// 这里需要指针
	// wg *sync.WaitGroup
	done func()
}

func createWorkerSync(id int, wg *sync.WaitGroup) workerSync {
	w := workerSync{
		in: make(chan int),
		// wg: wg,
		done: func() {
			wg.Done()
		},
	}
	// 创建goroutine
	go doWorkSync(id, w)
	return w
}
func doWorkSync(id int, w workerSync) {
	for n := range w.in {
		// Printf之间是io操作，goroutine会调度，所以导致乱序
		fmt.Printf("doWorkSync %d receive %c\n", id, n)
		w.done()
	}
}

// 等待多人完成任务
func chanDemoSync() {
	var workers [10]workerSync
	// 生成WaitGroup
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		// 返回channel
		workers[i] = createWorkerSync(i, &wg)
	}
	// 添加任务
	wg.Add(30)
	for i := 0; i < 10; i++ {
		workers[i].in <- 'a' + i
	}
	for i, worker := range workers {
		worker.in <- 'A' + i
	}
	for i, worker := range workers {
		worker.in <- '!' + i
	}
	// // 等待任务
	wg.Wait()
}

func main() {
	chanDemo()
	chanDemoSync()
}

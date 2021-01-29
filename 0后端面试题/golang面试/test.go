package main

import (
	// . "fmt"
	"sync"
)

// 嵌入字段的方式枷锁
type Counter struct {
	sync.Mutex
	count int
}

func main() {
	var counter Counter
	counter.Lock()
	defer counter.Unlock()
	counter.count++
	fn(counter)
}
func fn(c Counter) {
	c.Lock()
	defer c.Unlock()
	c.count++
}

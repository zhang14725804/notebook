package main

import (
	"fmt"
	"time"
)

/*
	Context makes it possible to manage a chain of calls within the same call path by signaling context’s Done channel.
	参考：：https://rakyll.org/leakingctx/
*/
func main() {
	for n := range gen() {
		fmt.Println(n)
		if n == 5 {
			break
		}
	}
	time.Sleep(1 * time.Minute)
}

func gen() <-chan int {
	ch := make(chan int)
	go func() {
		var n int
		for {
			ch <- n
			n++
		}
	}()
	return ch
}

package main

import (
	"context"
	"fmt"
	"time"
)

/*
	TODOS::不知道这里干了个什么
*/
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	for n := range gen(ctx) {
		fmt.Println(n)
		if n == 5 {
			cancel()
			break
		}
	}
	time.Sleep(1 * time.Minute)
}

/*
	goroutine不懂
*/
func gen(ctx context.Context) <-chan int {
	ch := make(chan int)
	go func() {
		var n int
		for {
			select {
			// avoid leaking of this goroutine when ctx is done.
			case <-ctx.Done():
				return
			case ch <- n:
				n++
			}
		}
	}()
	return ch
}

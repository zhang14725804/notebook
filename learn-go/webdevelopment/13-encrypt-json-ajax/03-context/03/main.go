package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

/*
	http://localhost:8080/
	todos：：这是个什么鬼
	context deadline exceeded
*/
func main() {
	http.HandleFunc("/", foo)
	http.HandleFunc("/bar", bar)
	http.Handle("/favicon.ico", http.NotFoundHandler())
	http.ListenAndServe(":8080", nil)
}

func foo(w http.ResponseWriter, req *http.Request) {
	// Context returns the request's context
	ctx := req.Context()
	// WithValue returns a copy of parent in which the value associated with key is val
	ctx = context.WithValue(ctx, "userID", 777)
	ctx = context.WithValue(ctx, "fname", "Bond")

	results, err := dbAccess(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusRequestTimeout)
		return
	}
	fmt.Fprintln(w, results)
}

func dbAccess(ctx context.Context) (int, error) {
	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()
	/*
		int is not a type
		func dbAccess(ctx context.Context) (int error)
	*/
	// todos：：这里开始有点不懂
	ch := make(chan int)

	go func() {
		uid := ctx.Value("userID").(int)
		time.Sleep(10 * time.Second)

		if ctx.Err() != nil {
			return
		}

		ch <- uid
	}()

	select {
	case <-ctx.Done():
		return 0, ctx.Err()
	case i := <-ch:
		return i, nil
	}
}

func bar(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	log.Println(ctx)
	fmt.Fprintln(w, ctx)
}

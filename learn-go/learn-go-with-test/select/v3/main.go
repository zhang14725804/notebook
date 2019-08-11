package main

import (
	"fmt"
	"net/http"
	"time"
)

func Racer(a, b string) (winner string, err error) {
	/*
		select 则允许你同时在 多个 channel 等待。第一个发送值的 channel「胜出」，case 中的代码会被执行。
	*/
	select {
	case <-ping(a):
		return a, nil
	case <-ping(b):
		return b, nil
	case <-time.After(10 * time.Second):
		return "", fmt.Errorf("timed out waiting for %s and %s", a, b)
	}
}

func ping(url string) chan bool {
	ch := make(chan bool)
	go func() {
		/*
			这样不妥，只是发出去了请求
		*/
		http.Get(url)
		/*
			通过 myVar := <-ch 来等待值发送给 channel。这是一个 阻塞 的调用，因为你需要等待值返回
		*/
		ch <- true
	}()
	return ch
}

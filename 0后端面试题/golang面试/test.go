package main

import (
	. "fmt"
)

func main() {
	var m = make(map[int]int, 10)
	Println(m)
	go func() {
		for {
			m[1] = 1
		}
	}()
	go func() {
		for {
			_ = m[2]
		}
	}()
	select {}
}

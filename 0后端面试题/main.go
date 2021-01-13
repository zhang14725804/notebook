package main

import (
	. "fmt"
)

func main() {
	defer func() {
		if err := recover(); err != nil {
			Println(err)
		} else {
			Println("fatal")
		}
	}()
	defer func() {
		panic("defer panic")
	}()
	panic("panic")
}

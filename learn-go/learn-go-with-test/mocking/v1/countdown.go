package main

import (
	"fmt"
	"io"
	"time"
)

/*
	从 3 开始依次向下，当到 0 时打印 「GO!」 并退出，要求每次打印从新的一行开始且打印间隔一秒的停顿
*/
const finalWord = "Go!"
const countDownStart = 3

func Countdown(out io.Writer) {
	for i := countDownStart; i > 0; i-- {
		time.Sleep(1 * time.Second)
		fmt.Fprintln(out, i)
	}
	time.Sleep(1 * time.Second)
	fmt.Fprintln(out, finalWord)
}

package main

import (
	"fmt"
	"io"
	"os"
	"time"
)

/*
	有些晦涩
*/
/*
	Countdown 函数将不会负责 sleep 的时间长度
*/
type Sleeper interface {
	Sleep()
}

/*
	调用次数
*/
type SpySleeper struct {
	Calls int
}

/*
	指针
*/
func (s *SpySleeper) Sleep() {
	s.Calls++
}

type ConfigurableSleeper struct {
	duration time.Duration
}

func (o *ConfigurableSleeper) Sleep() {
	time.Sleep(o.duration)
}

/*
	从 3 开始依次向下，当到 0 时打印 「GO!」 并退出，要求每次打印从新的一行开始且打印间隔一秒的停顿
*/
const finalWord = "Go!"
const countDownStart = 3

func Countdown(out io.Writer, sleeper Sleeper) {
	for i := countDownStart; i > 0; i-- {
		/*
			依赖注入的方式
		*/
		sleeper.Sleep()
		fmt.Fprintln(out, i)
	}
	sleeper.Sleep()
	fmt.Fprintln(out, finalWord)
}

func main() {
	sleeper := &ConfigurableSleeper{1 * time.Second}
	Countdown(os.Stdout, sleeper)
}

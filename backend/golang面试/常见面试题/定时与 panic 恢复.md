```golang
// question  😅😅😅😅😅😅 要求每秒钟调用一次proc并保证程序不退出
func main() {
	go func() {
		// 考察点
		// 定时执行执行任务
		// 捕获 panic 错误
		t := time.NewTicker(time.Second * 1)
		for {
			select {
			case <-t.C:
				go func() {
					defer func() {
						if err := recover(); err != nil {
							fmt.Println(err)
						}
					}()
					proc()
				}()
			}
		}
	}()
	// 这个select什么作用
	select {}
}

func proc() {
	panic("OK")
}
```
## 为 sync.WaitGroup 中Wait函数支持 WaitTimeout 功能


```golang
// TODO question 不懂😅😅😅😅😅😅
// 首先 sync.WaitGroup 对象的 Wait 函数本身是阻塞的，同时，超时用到的time.Timer 对象也需要阻塞的读。
// 同时阻塞的两个对象肯定要每个启动一个协程,每个协程去处理一个阻塞，难点在于怎么知道哪个阻塞先完成。
// 目前我用的方式是声明一个没有缓冲的chan，谁先完成谁优先向管道中写入数据。
func main() {
	wg := sync.WaitGroup{}
	// question 这个channel什么作用呢
	c := make(chan struct{})
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(num int, close <-chan struct{}) {
			defer wg.Done()
			<-close
			fmt.Println(num)
		}(i, c)
	}
	if WaitTimeout(&wg, time.Second*5) {
		close(c)
		fmt.Println("timeout exit!")
	}
	time.Sleep(time.Second * 10)
}

// question 根本看不懂 😅😅😅😅😅😅
func WaitTimeout(wg *sync.WaitGroup, timeout time.Duration) bool {
	ch := make(chan bool, 1)
	go time.AfterFunc(timeout, func() {
		ch <- true
	})
	go func() {
		wg.Wait()
		ch <- false
	}()
	return <-ch
}
```
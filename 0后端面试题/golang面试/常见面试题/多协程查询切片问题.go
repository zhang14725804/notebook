/*
	假设有一个超长的切片，切片的元素类型为int，切片中的元素为乱序排序。限时5秒，使用多个goroutine查找切片中是否存在给定的值，【在查找到目标值或者超时后立刻结束所有goroutine的执行】。
	比如，切片 [23,32,78,43,76,65,345,762,......915,86]，查找目标值为 345 ，如果切片中存在，则目标值输出"Found it!"并立即取消仍在执行查询任务的goroutine。
	如果在超时时间未查到目标值程序，则输出"Timeout！Not Found"，同时立即取消仍在执行的查找任务的goroutine。

	TODO 😅😅😅😅😅😅
	[并发题解&Go语言调度器](https://mp.weixin.qq.com/s/GhC2WDw3VHP91DrrFVCnag)
	[协程和线城的区别](https://stackoverflow.com/questions/1934715/difference-between-a-coroutine-and-a-thread)
	[Ardan Labs goroutine scheduling 🔥🔥🔥](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html)
*/
func main() {
	timer := time.NewTimer(time.Second * 5)
	data := []int{1, 2, 3, 10, 999, 8, 345, 7, 98, 33, 66, 77, 88, 68, 96}
	dataLen := len(data)
	size := 3
	target := 345
	// 用context.WithCancel创建一个上下文对象传递给每个执行任务的goroutine
	ctx, cancel := context.WithCancel(context.Background())
	resultChan := make(chan bool)

	for i := 0; i < dataLen; i += size {
		end := i + size
		if end >= dataLen {
			end = dataLen - 1
		}
		go searchTarget(ctx, data[i:end], target, resultChan)
	}
	select {
	case <-timer.C:
		fmt.Fprintln(os.Stderr, "Timeout! Not Found")
		cancel()
	case <-resultChan:
		fmt.Fprintln(os.Stdout, "Found it")
		cancel()
	}
	time.Sleep(time.Second * 2)
}

func searchTarget(ctx context.Context, data []int, target int, resultChan chan bool) {
	for _, v := range data {
		select {
		// 找到目标值 通过调用上下文的取消函数来通知所有goroutine停止工作
		// 在执行查找任务的goroutine里接收上下文的取消信号，为了不阻塞查找任务，使用了select语句加default的组合
		case <-ctx.Done():
			fmt.Fprintln(os.Stdout, "Task canceled!")
			return
		default:
		}
		// 模拟一个耗时查找，这里只是比对值，真实开发中可以是其他操作
		fmt.Fprintf(os.Stdout, "v: %d\n", v)
		time.Sleep(time.Millisecond * 1500)
		// 找到目标值，通知外部等待任务执行的主goroutine
		if target == v {
			resultChan <- true
			return
		}
	}
}
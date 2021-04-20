/*
	使用两个 goroutine 交替打印序列，一个 goroutine 打印数字， 另外一个 goroutine 打印字母， 最终效果如下：
	12AB34CD56EF78GH910IJ1112KL1314MN1516OP1718QR1920ST2122UV2324WX2526YZ2728

	考察知识点WaitGroup 😄😄😄😄😄😄
	WaitGroup 的描述是：一个 WaitGroup 对象可以等待一组协程结束
	(1) main协程通过调用 wg.Add(delta int) 设置worker协程的个数，然后创建worker协程；
	(2) worker协程执行结束以后，都要调用 wg.Done()；
	(3) main协程调用 wg.Wait() 且被block，直到所有worker协程全部执行结束后返回。
*/
func PrintAlternately() {
	letterSignal, numberSignal := make(chan bool), make(chan bool)
	wait := sync.WaitGroup{}

	go func() {
		i := 1
		for {
			select {
			case <-numberSignal:
				fmt.Print(i)
				i++
				fmt.Print(i)
				i++
				letterSignal <- true
				break
			default:
				break
			}
		}
	}()
	wait.Add(1) // 设置worker协程的个数
	go func() {
		i := 'A'
		for {
			select {
			case <-letterSignal:
				if i >= 'Z' {
					wait.Done()
					return
				}
				fmt.Print(string(i))
				i++
				fmt.Print(string(i))
				i++
				numberSignal <- true
			default:
				break
			}
		}
	}()
	numberSignal <- true
	wait.Wait() // 调用 wg.Wait() 且被block，直到所有worker协程全部执行结束后返回。
}
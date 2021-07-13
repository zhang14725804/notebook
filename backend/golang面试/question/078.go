/*
	go fmt.Println(<-ch1) 语句中的 <-ch1 是在 main goroutine 中求值的。
	这相当于一个无缓冲的 chan，发送和接收操作都在一个 goroutine 中（main goroutine）进行，因此造成【死锁】
*/
func main() {
	ch1 := make(chan int)
	// fatal error: all goroutines are asleep - deadlock!
	go fmt.Println(<-ch1)
	ch1 <- 5
	time.Sleep(1 * time.Second)
}

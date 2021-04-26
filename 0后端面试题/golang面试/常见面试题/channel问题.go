/*
	问题：对已经关闭的的 chan 进行读写，会怎么样？为什么？
	😅😅😅
	为什么写已经关闭的 chan 就会 panic 呢（源码）
	为什么读已关闭的 chan 会一直能读到值（源码）

*/
// 读 已经关闭的chan
func readFromCloseChan() {
	numChan := make(chan int, 3)
	numChan <- 1
	close(numChan)
	num, ok := <-numChan
	// 1 true
	fmt.Println(num, ok)
	num1, ok1 := <-numChan
	// 0 false
	fmt.Println(num1, ok1)
}

// 写 已经关闭的chan
func writeToCloseChan() {
	c := make(chan int, 3)
	close(c)
	// panic: send on closed channel
	c <- 1
}
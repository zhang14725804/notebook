/*
	内存泄漏问题（😅）

	虽然执行了 6 次循环，而且每次都没有执行 Body.Close() ,就是因为执行了ioutil.ReadAll()把内容都读出来了，
	连接得以复用，因此只泄漏了一个读goroutine和一个写goroutine，最后加上main goroutine，所以答案就是3个goroutine。

	从另外一个角度说，正常情况下我们的代码都会执行 ioutil.ReadAll()，但如果此时忘了 resp.Body.Close()，确实会导致泄漏。
	但如果你调用的【域名一直是同一个】的话，那么只会泄漏一个 读goroutine 和一个写goroutine，这就是为什么代码明明不规范但却看不到明显内存泄漏的原因
*/
func main() {
	num := 6
	for index := 0; index < num; index++ {
		resp, err := http.Get("https://www.baidu.com")
		fmt.Println(err)
		_, _ = ioutil.ReadAll(resp.Body)
	}
	// 此时goroutine个数= 3
	fmt.Printf("此时goroutine个数= %d\n", runtime.NumGoroutine())
}

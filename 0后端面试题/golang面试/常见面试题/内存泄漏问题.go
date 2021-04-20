/*
	😄😄😄 错误的答案
	不进行resp.Body.Close()，泄漏是一定的。但是泄漏的goroutine个数就让我迷糊了。
	由于执行了6遍，每次泄漏一个读和写goroutine，就是12个goroutine，加上main函数本身也是一个goroutine，所以答案是13

	😄😄😄
	虽然执行了 6 次循环，而且每次都没有执行 Body.Close() ,就是因为执行了ioutil.ReadAll()把内容都读出来了，连接得以复用，
	因此只泄漏了一个读goroutine和一个写goroutine，最后加上main goroutine，所以答案就是3个goroutine。

	从另外一个角度说，正常情况下我们的代码都会执行 ioutil.ReadAll()，但如果此时忘了 resp.Body.Close()，确实会导致泄漏。
	但如果你调用的域名一直是同一个的话，那么只会泄漏一个 读goroutine 和一个写goroutine，这就是为什么代码明明不规范但却看不到明显内存泄漏的原因。
*/
func memoryLeak() {
	num := 6
	for i := 0; i < num; i++ {
		res, _ := http.Get("https://www.baidu.com")
		_, _ = ioutil.ReadAll(res.Body)
	}
	fmt.Println("goroutine个数 = ", runtime.NumGoroutine())
}
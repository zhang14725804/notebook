package concurrency

import (
	"testing"
	"time"
)

/*

	下划线“_”,在函数定义中省略带名的参数
*/
func slowStubWebsiteChecker(_ string) bool {
	time.Sleep(20 * time.Millisecond)
	return true
}

/*
	对 CheckWebsites 做一个基准测试
*/
func BenchmarkCheckWebsites(b *testing.B) {
	urls := make([]string, 100)
	for i := 0; i < len(urls); i++ {
		urls[i] = "a url"
	}
	for i := 0; i < b.N; i++ {
		CheckWebsites(slowStubWebsiteChecker, urls)
	}
}

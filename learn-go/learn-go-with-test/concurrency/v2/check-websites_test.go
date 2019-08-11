package concurrency

import (
	"reflect"
	"testing"
)

func mockWebsiteChecker(url string) bool {
	if url == "waat://furhurterwe.geds" {
		return false
	}
	return true
}

/*
	测试速度并没有像实例中的那么快
*/
func TestCheckWebsites(t *testing.T) {
	websites := []string{
		"https://www.mi.com",
		"https://www.baidu.com",
		"https://www.163.com/",
	}

	want := map[string]bool{
		"https://www.mi.com":    true,
		"https://www.baidu.com": true,
		"https://www.163.com/":  true,
	}

	got := CheckWebsites(mockWebsiteChecker, websites)

	/*
		比较map是否相等
	*/
	if !reflect.DeepEqual(want, got) {
		t.Fatalf("Wanted %v, got %v", want, got)
	}
}

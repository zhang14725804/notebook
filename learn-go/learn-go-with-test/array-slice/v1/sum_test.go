package v1_test

import "testing"

/*
	TDD思想(测试驱动开发)：在明确要开发某个功能后，在开发功能代码之前，先编写测试代码，
	然后编写功能代码并用测试代码进行验证，如此循环直到完成全部功能的开发
*/
func TestSum(t *testing.T) {
	/*
		数组有一个有趣的属性，它的大小也属于类型的一部分
		数组需要指定大小！！！！
	*/
	numbers := [5]int{1, 2, 3, 4}
	got := Sum(numbers)
	want := 15
	if got != want {
		t.Errorf("got %d want %d given %v", got, want, numbers)
	}
}

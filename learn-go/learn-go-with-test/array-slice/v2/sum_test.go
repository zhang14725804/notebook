package main

import "testing"

/*
	TDD思想(测试驱动开发)：在明确要开发某个功能后，在开发功能代码之前，先编写测试代码，
	然后编写功能代码并用测试代码进行验证，如此循环直到完成全部功能的开发
*/
/*
	go test -cover 查看测试覆盖率
*/
func TestSum(t *testing.T) {
	t.Run("collection of 5 numbers", func(t *testing.T) {
		numbers := []int{1, 2, 3, 4, 5}
		got := Sum(numbers)
		want := 15
		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})
	t.Run("collection of any size", func(t *testing.T) {
		numbers := []int{1, 2, 3}

		got := Sum(numbers)
		want := 6

		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})
}

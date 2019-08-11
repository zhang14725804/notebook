package main

import "testing"

/*
	表格驱动测试
	表格驱动测试在我们要创建一系列相同测试方式的测试用例时很有用
*/
func TestArea(t *testing.T) {
	// 创建了一个匿名的结构体。我们用含有两个域 shape 和 want 的 []struct 声明了一个结构体切片
	areaTests := []struct {
		shape Shape
		want  float64
	}{
		{Rectangle{12, 6}, 72.0},
		{Triangle{12, 6}, 36.0},
		{Circle{10}, 314.1592653589793},
	}
	for _, tt := range areaTests {
		got := tt.shape.Area()
		if got != tt.want {
			t.Errorf("got %.2f want %.2f", got, tt.want)
		}
	}
}

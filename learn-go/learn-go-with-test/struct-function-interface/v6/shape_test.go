package main

import "testing"

/*
	表格驱动测试
	表格驱动测试在我们要创建一系列相同测试方式的测试用例时很有用

	改进我们的错误输出为 "%#v got %.2f want %.2f. %#v"，这样会打印结构体中域的值。这样开发人员能一眼看出被测试的属性。
	列表驱动测试让断言更清晰，这样可以使测试文件更易于扩展和维护
*/
func TestArea(t *testing.T) {
	// 创建了一个匿名的结构体。我们用含有两个域 shape 和 want 的 []struct 声明了一个结构体切片
	areaTests := []struct {
		shape   Shape
		name    string
		hasArea float64
	}{
		{name: "Rectangle", shape: Rectangle{12, 6}, hasArea: 72.0},
		{name: "Triangle", shape: Triangle{12, 6}, hasArea: 36.0},
		{name: "Circle", shape: Circle{10}, hasArea: 314.1592653589793},
	}
	for _, tt := range areaTests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.shape.Area()
			if got != tt.hasArea {
				t.Errorf("%#v got %.2f want %.2f", tt.shape, got, tt.hasArea)
			}
		})
	}
}

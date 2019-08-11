package main

/*
	struct 来定义自己的类型。一个通过 struct 定义出来的类型是一些已命名的域的集合，这些域用来保存数据
*/
type Rectangle struct {
	Width  float64
	Height float64
}

/*
	计算一个给定高和宽的长方形的周长
*/
func Perimeter(rectangle Rectangle) float64 {
	return 2 * (rectangle.Width + rectangle.Height)
}

/*
	计算一个给定高和宽的长方形的面积
*/
func Area(rectangle Rectangle) float64 {
	return rectangle.Width * rectangle.Height
}

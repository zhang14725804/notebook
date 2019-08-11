package main

import "math"

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
	声明方法的语法跟函数差不多，因为他们本身就很相似。唯一的不同是方法接收者的语法
	func(receiverName ReceiverType) MethodName(args)
*/
/*
	计算一个给定高和宽的长方形的面积
*/
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

type Circle struct {
	Radius float64
}

/*
	方法和函数很相似但是方法是通过一个特定类型的实例调用的。函数可以随时被调用，比如 Area(rectangle)。
	不像方法需要在某个事物上调用。
*/
func (r Circle) Area() float64 {
	return math.Pi * r.Radius * r.Radius
}

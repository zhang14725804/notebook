package main

import "math"

/*
	声明结构体以创建我们自己的类型，让我们把数据集合在一起并达到简化代码的目地

	struct 来定义自己的类型。一个通过 struct 定义出来的类型是一些已命名的域的集合，这些域用来保存数据
	Rectangle 有一个返回值类型为 float64 的方法 Area，所以它满足接口 Shape
*/
type Rectangle struct {
	Width  float64
	Height float64
}

/*
	在自己的数据类型中添加方法以实现接口

	声明方法的语法跟函数差不多，因为他们本身就很相似。唯一的不同是方法接收者的语法
	func(receiverName ReceiverType) MethodName(args)
*/
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

/*
	Circle 有一个返回值类型为 float64 的方法 Area，所以它满足接口 Shape
*/
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

/*
	三角形
*/
type Triangle struct {
	Base   float64
	Height float64
}

func (t Triangle) Area() float64 {
	return (t.Base * t.Height) * 0.5
}

/*

	声明接口，这样我们可以定义适合不同参数类型的函数（参数多态）


	我们想做的是给定一些几何形状，调用 Area() 方法并检查结果。
	我们想写一个这样的函数 CheckArea，其参数是任何类型的几何形状。如果参数不是几何形状的类型，那么编译应该报错。
	Go 语言中我们可以通过接口实现这一目的。
	接口在 Go 这种静态类型语言中是一种非常强有力的概念。因为接口可以让函数接受不同类型的参数并能创造类型安全且高解耦的代码
*/
type Shape interface {
	Area() float64
}

package main

import "fmt"

// 返回一个函数
func adder() func(int) int {
	sum := 0
	// 闭包
	return func(v int) int {
		sum += v
		return sum
	}
}

// 正统的函数式编程：不能有状态，只有函数和常量
type iAdder func(int) (int, iAdder)

func adder2(base int) iAdder {
	return func(v int) (int, iAdder) {
		return base + v, adder2(base + v)
	}
}
func main() {
	a := adder()
	for i := 0; i < 10; i++ {
		fmt.Println(a(i))
	}
	b := adder2(0)
	for i := 0; i < 10; i++ {
		var s int
		s, b = b(i)
		fmt.Println(s)
	}
}

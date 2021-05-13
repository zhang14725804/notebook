package main

import "fmt"

// slice 声明方法
func main() {
	var s1 []int
	s2 := make([]int, 0)
	s3 := make([]int, 10, 20)
	s4 := []int{1, 2, 3}
	s5 := new([]int) // s5 本身是一个地址, slice的内容与s1一样。

	fmt.Printf("s1 地址：%p\n", &s1)
	println("s1:", s1) // [0/0]0x0 中的内容是[len/cap]array
	fmt.Printf("s2 地址：%p\n", &s2)
	println("s2:", s2) // [0/0]0x16e19c0
	fmt.Printf("s3 地址：%p\n", &s3)
	println("s3:", s3) // [10/20]0xc000214000
	fmt.Printf("s4 地址：%p\n", &s4)
	println("s4:", s4) // [3/3]0xc00020c060
	fmt.Printf("s5 地址：%p\n", s5)
	println("s5:", *s5) // [0/0]0x0
}

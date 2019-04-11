package main

import "fmt"

func main() {
	// 可读性最强;如果一个变量很重要，建议使用第一种显式声明类型的方式来定义
	var s1 int = 42
	fmt.Println(s1)
	// 
	var s2 = 43
	fmt.Println(s2)
	// 写起来最方便;如果要使用一个不那么重要的局部变量
	s3 := 44
	fmt.Println(s3)
	
	for i:=0;i<3;i++ {
		fmt.Println(i)
	}
	// 无法将 var 关键字直接写进循环条件中的初始化语句中，而必须提前声明变量
	var j = 0
	for ; j<3;j++{
		fmt.Println(j)
	}
	// 如果在第一种声明变量的时候不赋初值，编译器就会自动赋予相应类型的默认值
	var str string
	fmt.Println(str)
	
	var boolean bool
	fmt.Println(boolean)
	
	var ints int
	fmt.Println(ints)
}

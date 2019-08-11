package main

import "reflect"

/*
	编写函数 walk(x interface{}, fn func(string))，参数为结构体 x，并对 x 中的所有字符串字段调用 fn 函数

	计算中的反射提供了程序检查自身结构体的能力，特别是通过类型，这是元编程的一种形式
*/
func Walk(x interface{}, fn func(input string)) {
	/*
		反射包有一个函数 ValueOf，该函数值返回一个给定变量的 Value
	*/
	val := reflect.ValueOf(x)
	/*
		value 有一个方法 NumField，它返回值中的字段数
	*/
	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fn(field.String())
	}
}

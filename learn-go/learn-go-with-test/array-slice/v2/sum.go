package main

// Go 的切片（slice）类型不会将集合的长度保存在类型中，因此它的尺寸可以是不固定的
func Sum(numbers []int) int {
	sum := 0
	for _, num := range numbers {
		sum += num
	}
	return sum
}

package main

func Sum(numbers []int) int {
	sum := 0
	for _, number := range numbers {
		sum += number
	}
	return sum
}

/*
	接受多个切片，并返回由每个切片元素的总和组成的新切片
*/
func sumAll(numbersToSum ...[]int) []int {
	// 创建空切片
	var sums []int
	// 遍历每个slice
	for _, numbers := range numbersToSum {
		sums = append(sums, Sum(numbers))
	}
	return sums
}

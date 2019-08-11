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
func sumAll(numbersToSum ...[]int) (sums []int) {
	lengthOfNumbers := len(numbersToSum)
	// 创建切片
	sums = make([]int, lengthOfNumbers)
	// 遍历每个slice
	for i, numbers := range numbersToSum {
		sums[i] = Sum(numbers)
	}
	return
}

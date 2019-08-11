package main

func Sum(numbers []int) int {
	sum := 0
	for _, number := range numbers {
		sum += number
	}
	return sum
}

/*
	接受多个切片，每个切片的尾部元素想连，组成新的切片（尾部的意思就是出去第一个元素以外的其他元素）
*/
func sumAll(numbersToSum ...[]int) []int {
	// 创建空切片
	var sums []int
	// 遍历每个slice
	for _, numbers := range numbersToSum {
		if len(numbers) == 0 {
			sums = append(sums, 0)
		} else {
			tail := numbers[1:]
			sums = append(sums, Sum(tail))
		}

	}
	return sums
}

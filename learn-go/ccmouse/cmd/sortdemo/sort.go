package main

import "sort"
import "fmt"

func main() {
	a := []int{1, 4, 7, 2, 5, 8, 3, 6, 9}
	sort.Ints(a)

	for i, v := range a {
		fmt.Println(i, v)
	}
	for _, v := range a {
		fmt.Println(v)
	}
}

// 用堆进行K路归并排序

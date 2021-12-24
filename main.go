package main

import "fmt"

func main() {
	slice := []int{0, 1, 2, 3}
	for _, value := range slice {
		if value == 1 {
			value = 100
		}
	}
	for k, v := range slice {
		fmt.Printf("%d ==> %d\n", k, v)
	}
}

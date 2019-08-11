package main

import (
	"reflect"
	"testing"
)

/*
	在 Go 中不能对切片使用等号运算符。你可以写一个函数迭代每个元素来检查它们的值。但是一种比较简单的办法是使用 reflect.DeepEqual
*/
func TestSum(t *testing.T) {
	got := sumAll([]int{1, 2}, []int{0, 9})
	want := []int{3, 9}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v want %v", got, want)
	}
}

package main

/*
	计算一个给定高和宽的长方形的周长
*/
func Perimeter(width float64, height float64) float64 {
	return 2 * (width + height)
}

func Area(width float64, height float64) float64 {
	return width * height
}

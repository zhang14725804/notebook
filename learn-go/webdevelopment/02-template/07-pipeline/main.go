package main

import (
	"html/template"
	"log"
	"math"
	"os"
	"time"
)

// 指针
var tpl *template.Template

var fm = template.FuncMap{
	"fdbl":  double,
	"fsq":   square,
	"fsqrt": sqRoot,
}

func double(x int) int {
	return x + x
}
func square(x int) float64 {
	return math.Pow(float64(x), 2)
}
func sqRoot(x float64) float64 {
	return math.Sqrt(x)
}

/*
	https://godoc.org/time
*/
func monthDayYear(t time.Time) string {
	return t.Format("01-02-2006")
}
func init() {
	// TODOS：： 都不知道这一行是做什么的
	tpl = template.Must(template.New("").Funcs(fm).ParseFiles("tpl.gohtml"))
}
func main() {
	// TODOS::这里是解析template？
	err := tpl.ExecuteTemplate(os.Stdout, "tpl.gohtml", 3)
	if err != nil {
		log.Fatal(err)
	}
}

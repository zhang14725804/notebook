package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

type person struct {
	Name string
	Age  int
}

// 方法名要大写(大写：public，小写private)
func (p person) GetAge() int {
	return p.Age
}
func (p person) AgeDouble() int {
	return p.Age * 2
}
func (p person) TakeArg(x int) int {
	return x * 2
}
func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	p1 := person{
		Name: "Iris",
		Age:  5,
	}
	err := tpl.Execute(os.Stdout, p1)
	if err != nil {
		log.Fatalln(err)
	}
}

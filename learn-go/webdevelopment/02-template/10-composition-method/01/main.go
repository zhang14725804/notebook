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
type doubleZero struct {
	person
	LicenseToKill bool
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	p1 := doubleZero{
		person{
			Name: "James Bond",
			Age:  43,
		},
		false,
	}
	err := tpl.Execute(os.Stdout, p1)
	if err != nil {
		log.Fatalln(err)
	}
}

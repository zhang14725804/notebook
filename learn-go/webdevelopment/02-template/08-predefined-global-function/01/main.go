package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	xs := []string{"zero", "one", "two", "three", "four", "five"}
	err := tpl.Execute(os.Stdout, xs)
	if err != nil {
		log.Fatal(err)
	}
}

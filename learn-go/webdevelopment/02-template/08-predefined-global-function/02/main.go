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
	data := struct {
		Words []string
		Lname string
	}{
		xs,
		"Mcleod",
	}

	err := tpl.Execute(os.Stdout, data)
	if err != nil {
		log.Fatal(err)
	}
}

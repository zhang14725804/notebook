package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

type sage struct {
	Name  string
	Motto string
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	buddha := sage{
		Name:  "Buddha",
		Motto: "The belief",
	}
	err := tpl.Execute(os.Stdout, buddha)
	if err != nil {
		log.Fatal(err)
	}
}

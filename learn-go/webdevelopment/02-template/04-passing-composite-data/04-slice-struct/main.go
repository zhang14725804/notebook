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
	buddha1 := sage{
		Name:  "Buddha1",
		Motto: "The belief1",
	}
	buddha2 := sage{
		Name:  "Buddha2",
		Motto: "The belief2",
	}
	buddha3 := sage{
		Name:  "Buddha3",
		Motto: "The belief3",
	}

	sages := []sage{buddha1, buddha2, buddha3}

	err := tpl.Execute(os.Stdout, sages)
	if err != nil {
		log.Fatal(err)
	}
}

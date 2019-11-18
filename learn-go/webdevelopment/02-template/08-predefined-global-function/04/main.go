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
	g1 := struct {
		Score1 int
		Score2 int
	}{
		4,
		7,
	}

	err := tpl.Execute(os.Stdout, g1)
	if err != nil {
		log.Fatal(err)
	}
}

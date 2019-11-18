package main

import (
	"html/template"
	"log"
	"os"
)

// Passing data into tempalte
var tpl *template.Template

// init 会自动执行？
func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	err := tpl.ExecuteTemplate(os.Stdout, "tpl.gohtml", 5)
	if err != nil {
		log.Fatalln(err)
	}
}

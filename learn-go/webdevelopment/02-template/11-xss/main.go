package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

type Page struct {
	Title   string
	Heading string
	Content string
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	home := Page{
		Title:   "Escaped",
		Heading: "Escaped with text/template",
		Content: `<script>alert("ho!")</script>`,
	}

	err := tpl.ExecuteTemplate(os.Stdout, "tpl.gohtml", home)
	if err != nil {
		log.Fatalln(err)
	}
}

package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

type user struct {
	Name  string
	Motto string
	Admin bool
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	u1 := user{
		Name:  "Gandhi1",
		Motto: "Be the change1",
		Admin: true,
	}
	u2 := user{
		Name:  "Gandhi2",
		Motto: "Be the change2",
		Admin: false,
	}
	u3 := user{
		Name:  "Gandhi3",
		Motto: "Be the change3",
		Admin: true,
	}
	users := []user{u1, u2, u3}

	err := tpl.Execute(os.Stdout, users)
	if err != nil {
		log.Fatal(err)
	}
}

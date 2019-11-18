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
type car struct {
	Model string
	Doors string
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	sage1 := sage{
		Name:  "Buddha1",
		Motto: "The belief1",
	}
	sage2 := sage{
		Name:  "Buddha2",
		Motto: "The belief2",
	}

	car1 := car{
		Model: "F150",
		Doors: "4",
	}
	car2 := car{
		Model: "Corolla",
		Doors: "6",
	}
	sages := []sage{sage1, sage2}
	cars := []car{car1, car2}

	// 匿名结构
	data := struct {
		Wisdom    []sage
		Transport []car
	}{
		sages,
		cars,
	}
	err := tpl.Execute(os.Stdout, data)
	if err != nil {
		log.Fatal(err)
	}
}

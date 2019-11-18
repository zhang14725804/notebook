package main

import (
	"log"
	"os"
	"strings"
	"text/template"
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

/*
	type FuncMap map[string]interface{}
	interface{} 任意类型

	create a FuncMap to register functions.
	"uc" is what the func will be called in the template
	"uc" is the ToUpper func from package strings
	"ft" is a func I declared
	"ft" slices a string, returning the first three characters
*/
var fm = template.FuncMap{
	"uc": strings.ToUpper,
	"ft": firstThree,
}

func firstThree(s string) string {
	s = strings.TrimSpace(s)
	s = s[:3]
	return s
}

func init() {
	tpl = template.Must(template.New("").Funcs(fm).ParseFiles("tpl.gohtml"))
}
func main() {
	sage1 := sage{
		Name:  "sage1",
		Motto: "The belief1",
	}
	sage2 := sage{
		Name:  "sage2",
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

	// 匿名
	data := struct {
		Wisdom    []sage
		Transport []car
	}{
		sages,
		cars,
	}
	err := tpl.ExecuteTemplate(os.Stdout, "tpl.gohtml", data)
	if err != nil {
		log.Fatal(err)
	}
}

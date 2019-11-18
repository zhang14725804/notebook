package main

import (
	"html/template"
	"log"
	"os"
)

var tpl *template.Template

type course struct {
	Number, Name, Units string
}
type semester struct {
	Term    string
	Courses []course
}
type year struct {
	Fall, Spring, Sumber semester
}

func init() {
	tpl = template.Must(template.ParseFiles("tpl.gohtml"))
}
func main() {
	y1 := year{
		Fall: semester{
			Term: "Fall",
			Courses: []course{
				course{"CSCI-40", "Introduction to Programming in Go", "4"},
				course{"CSCI-130", "Introduction to Web Programming with Go", "4"},
				course{"CSCI-140", "Mobile Apps Using Go", "4"},
			},
		},
		Spring: semester{
			Term: "Spring",
			Courses: []course{
				course{"CSCI-50", "Advanced Go", "5"},
				course{"CSCI-190", "Advanced Web Programming with Go", "5"},
				course{"CSCI-191", "Advanced Mobile Apps With Go", "5"},
			},
		},
	}
	err := tpl.Execute(os.Stdout, y1)
	if err != nil {
		log.Fatalln(err)
	}
}

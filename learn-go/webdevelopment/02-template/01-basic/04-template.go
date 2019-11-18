package main

import (
	"log"
	"os"
	"text/template"
)

/*
	godoc(官方文档)
	https://godoc.org/html/template#pkg-index

	有点跳跃，代码衔接不上(Must\ParseGlob\Execute)
	understanding package texttemplate parsing & executing template
*/

func main() {
	tpl, err := template.ParseFiles("tpl.gohtml")
	if err != nil {
		log.Fatalln(err)
	}

	nf, err := os.Create("index.html")
	if err != nil {
		log.Fatal("error creating file ", err)
	}
	defer nf.Close()

	err = tpl.Execute(nf, nil)
	if err != nil {
		log.Fatalln(err)
	}
}

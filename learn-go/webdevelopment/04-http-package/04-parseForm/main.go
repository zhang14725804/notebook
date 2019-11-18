package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
)

type hotdog int

var tpl *template.Template

/*
	req.ParseForm
	req.Form
	http.Request文档：：https://godoc.org/net/http#Request
*/
func (m hotdog) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(req.Form)
	tpl.ExecuteTemplate(w, "index.gohtml", req.Form)
}

func init() {
	tpl = template.Must(template.ParseFiles("index.gohtml"))
}

/*
	TODOS：：interface和struct如何应用
*/
func main() {
	var d hotdog
	http.ListenAndServe(":8080", d)
}

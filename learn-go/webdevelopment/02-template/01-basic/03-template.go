package main

import (
	"log"
	"os"
	"text/template"
)

/*
	godoc
	https://godoc.org/html/template#pkg-index
*/

func main() {
	tpl, err := template.ParseFiles("tpl.gohtml")
	if err != nil {
		log.Fatalln(err)
	}

	// Execute applies a parsed template to the specified data object,
	// and writes the output to wr.
	// If an error occurs executing the template or writing its output,
	// execution stops, but partial results may already have been written to
	// the output writer.
	// A template may be executed safely in parallel, although if parallel
	// executions share a Writer the output may be interleaved.
	//
	// If data is a reflect.Value, the template applies to the concrete
	// value that the reflect.Value holds, as in fmt.Print.
	err = tpl.Execute(os.Stdout, nil)
	if err != nil {
		log.Fatalln(err)
	}
}

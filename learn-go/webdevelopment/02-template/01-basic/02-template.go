package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

/*
	在命令行运行 go run 02-02-template.go Todd
*/

func main() {
	name := os.Args[1]
	fmt.Println(os.Args[0])
	fmt.Println(os.Args[1])

	str := `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Hello world</title>
			</head>
			<body>
				<h1>` + name + `</h1>
			</body>
		</html>
	`
	nf, err := os.Create("index.html")
	if err != nil {
		log.Fatal("error creating file ", err)
	}
	defer nf.Close()
	io.Copy(nf, strings.NewReader(str))
}

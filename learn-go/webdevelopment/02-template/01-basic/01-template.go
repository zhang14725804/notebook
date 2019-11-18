package main

import "fmt"

// 运行 go run 02-template.go > index.html 将内容输出到文件
func main() {
	name := "Todd Mcleod"

	tpl := `
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
	fmt.Println(tpl)
}

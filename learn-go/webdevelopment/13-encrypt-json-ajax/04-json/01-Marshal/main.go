package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type model struct {
	State    bool
	Pictures []string
}

// 默认初始值
func main() {
	m := model{}
	// {false []}
	fmt.Println(m)

	bs, err := json.Marshal(m)
	if err != nil {
		log.Fatalln(err)
	}
	// {"State":false,"Pictures":null}
	fmt.Println(string(bs))

	fmt.Println("===================")
	m = model{
		State: true,
		Pictures: []string{
			"one.jpg",
			"two.jpg",
			"three.jpg",
		},
	}

	bs, err = json.Marshal(m)
	if err != nil {
		fmt.Println("error: ", err)
	}

	os.Stdout.Write(bs)
}

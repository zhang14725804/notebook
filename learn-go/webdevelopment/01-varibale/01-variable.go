package main

import "fmt"

type person struct {
	Fname string
	Lname string
}

type secretAgent struct {
	person
	licenseToKill bool
}

func main() {
	sliceMapStruct()
	fmt.Println("==============")
	p1 := person{
		"Steve",
		"Jobs",
	}
	p1.speak()

	sa1 := secretAgent{
		person{
			"Mikol",
			"Jordan",
		},
		true,
	}

	// TODOS::为什么这两种情况都是对的，第一种难道不是错了么
	sa1.speak()
	sa1.person.speak()
}

func (p person) speak() {
	fmt.Println(p.Fname, p.Lname, `says, Hello world!`)
}

func sliceMapStruct() {
	// slice
	xi := []int{2, 4, 6, 8, 9}
	fmt.Println(xi)

	//map
	m := map[string]int{
		"James": 34,
		"Love":  29,
	}
	fmt.Println(m)

	p1 := person{
		"Steve",
		"Jobs",
	}
	fmt.Println(p1)
}

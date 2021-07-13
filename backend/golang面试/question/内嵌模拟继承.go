package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// 不导出字段的情况下进行序列化
type PersonPrivate struct {
	name  string
	hobby string
}

func (p PersonPrivate) MarshalJSON() []byte {
	return []byte(`{"name":"` + p.name + `","hobby":"` + p.hobby + `"}`)
}

// 导出字段的情况下，json.Marshal序列化
type Person struct {
	Name  string `json:"name"`
	Hobby string
}

func main() {
	// part1
	person := Person{Name: "polarisxu", Hobby: "Golang"}
	m, _ := json.Marshal(person)
	fmt.Printf("%s", m)
	// part2
	person = Person{"James", "Rose"}
	m, _ = json.Marshal(person)
	fmt.Printf("%s", m)
	// part3
	personp := PersonPrivate{name: "polarisxu", hobby: "Golang"}
	fmt.Println(string(personp.MarshalJSON()))

	// part4
	// 正是因为内嵌，t 的方法集包括了 time.Time 的方法集，所以，t 自动实现了 Marshaler 接口
	t := struct {
		time.Time     // 通过内嵌来模拟继承的功能
		N         int // question 直接忽略了这个字段 😅
	}{
		time.Date(2020, 12, 20, 0, 0, 0, 0, time.UTC),
		5,
	}
	m, _ = json.Marshal(t)
	fmt.Printf("%s", m)

}

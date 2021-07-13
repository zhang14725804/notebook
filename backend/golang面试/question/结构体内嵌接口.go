package main

import (
	"fmt"
)

// 接口也是一种类型
type worker interface {
	work()
}

// person类型默认实现worker接口
// question: 嵌入接口有什么实际用途(sort包Interface接口)
type person struct {
	name string
	worker
}

// 搞这个student出来干啥，为什么不用person实现work方法，非要再搞个student
type student struct {
	name string
}

func (s student) work() {
	fmt.Println("I am ", s.name, ", I am learning")
}
func main() {
	var w worker = person{worker: student{"Tom"}}
	fmt.Println(w)
	w.work()

}

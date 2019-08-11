package main

import "fmt"

type Wallet struct {
	/*
		在 Go 中，如果一个符号（例如变量、类型、函数等）是以小写符号开头，那么它在 定义它的包之外 就是私有的
	*/
	balance int
}

/*
	用 指针 来解决这个问题。指针让我们 指向 某个值，然后修改它
*/
func (w *Wallet) Deposit(amount int) {
	fmt.Println("address of balance in Deposit is", &w.balance)
	//我们只想让自己的方法修改这个值，而其他的不可以
	w.balance += amount
}
func (w *Wallet) Balance() int {
	return w.balance
}

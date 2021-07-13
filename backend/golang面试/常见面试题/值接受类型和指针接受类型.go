/*
	[一文吃透 Go 语言解密之接口interface --煎鱼 ](https://mp.weixin.qq.com/s/vSgV_9bfoifnh2LEX0Y7cQ)
*/
type Human interface {
	Say(s string)
	Eat(s string)
}

type Person struct{}

func (p Person) Say(s string) {
	fmt.Printf("值接受类型：%s\n", s)
}
func (p *Person) Eat(s string) {
	fmt.Printf("指针接受类型：%s\n", s)
}

func main() {
	var h Human = &Person{}
	h.Say("甘蔗")
	h.Eat("西瓜")
	// cannot use Person literal (type Person) as type Human in assignment:
	// Person does not implement Human (Eat method has pointer receiver)
	var h2 Human = Person{}
	h2.Say("甘蔗")
	h2.Eat("西瓜")
}

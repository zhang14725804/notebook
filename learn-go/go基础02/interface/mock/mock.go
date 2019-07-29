package mock

type Retriever struct {
	Contents string
}

// 实现接口并不需要特别声明，只需要实现接口的方法
// 址传递需要改变原数据
func (r *Retriever) Get(url string) string {
	return r.Contents
}

// 实现poster接口
func (r *Retriever) Post(url string, form map[string]string) string {
	r.Contents = form["contents"]
	return "ok"
}

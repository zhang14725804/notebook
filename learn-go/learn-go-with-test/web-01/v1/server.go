package main

import (
	"fmt"
	"net/http"
)

func PlayerServer(w http.ResponseWriter, r *http.Request) {
	/*
		在依赖注入章节中，我们通过 Greet 函数接触到了 HTTP 服务器。
		我们知道了 net/http 的 ResponseWriter 也实现了 io Writer，
		所以我们可以用 fmt.Fprint 发送字符串来作为 HTTP 应答
	*/
	fmt.Fprint(w, "20")
}

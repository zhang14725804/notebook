package real

import (
	"net/http"
	"net/http/httputil"
	"time"
)

// 接口的实现是隐式的
// 实现者不需要指定实现哪个接口，只要实现接口里的方法
type Retriever struct {
	UserAgent string
	TimeOut   time.Duration
}

func (r Retriever) Get(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	result, err := httputil.DumpResponse(resp, true)
	resp.Body.Close()
	if err != nil {
		panic(err)
	}
	return string(result)
}

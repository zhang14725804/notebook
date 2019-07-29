package main

import (
	"errorhandle/filelistserver/handler"
	"log"
	"net/http"
	"os"
)

type appHandler func(writer http.ResponseWriter, request *http.Request) error

// 返回一个函数
func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		// recover
		defer func() {
			if r := recover(); r != nil {
				log.Printf("Panic: %v", r)
				http.Error(writer, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			}
		}()
		err := handler(writer, request)
		if err != nil {
			log.Printf("Error Handling request: %s", err.Error())
			// 返回需要暴露给用户的错误信息
			// Type assertion(err.(userError))
			if userErr, ok := err.(userError); ok {
				http.Error(writer, userErr.Message(), http.StatusBadRequest)
				return
			}
			code := http.StatusOK
			switch {
			case os.IsNotExist(err):
				code = http.StatusNotFound
				// http.Error(writer, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			default:
				code = http.StatusInternalServerError
			}
			http.Error(writer, http.StatusText(code), code)
		}
	}
}

// 暴露给用户的错误信息
type userError interface {
	// 给系统提示
	error
	// 给用户提示
	Message() string
}

// url输入文件地址，根据文件地址，显示文件内容
func main() {
	http.HandleFunc("/", errWrapper(handler.HandleFileList))
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		panic(err)
	}
}

package handler

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

const targeturi = "/list/"

type userError string

// 接口
func (e userError) Error() string {
	return e.Message()
}
func (e userError) Message() string {
	return string(e)
}

// 统一出错处理
func HandleFileList(writer http.ResponseWriter, request *http.Request) error {
	fmt.Println(strings.Index(request.URL.Path, targeturi))
	if strings.Index(request.URL.Path, targeturi) != 0 {
		return userError("Path must start with " + targeturi)
	}
	path := request.URL.Path[len(targeturi):]
	file, err := os.Open(path)
	if err != nil {
		// 错误处理
		// http.Error(writer, err.Error(), http.StatusInternalServerError)
		return err
	}
	defer file.Close()
	all, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}
	writer.Write(all)
	return nil
}

package main

import (
	"crypto/sha1"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	uuid "github.com/satori/go.uuid"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("templates/*"))
}

func main() {
	http.HandleFunc("/", index)
	// 展示图片
	http.Handle("/public/", http.StripPrefix("/public", http.FileServer(http.Dir("./public"))))
	http.Handle("/favicon.ico", http.NotFoundHandler())
	http.ListenAndServe(":8080", nil)
}

func index(w http.ResponseWriter, req *http.Request) {
	c := getCookie(w, req)
	// c = appendValue(w, c)
	fmt.Println("cookie:::::", c)

	if req.Method == http.MethodPost {
		/*
			FormFile returns the first file for the provided form key
			返回地址和二进制流？
		*/
		mf, fh, err := req.FormFile("nf")
		checkError(err)
		defer mf.Close()
		// 文件后缀名
		ext := strings.Split(fh.Filename, ".")[1]
		// create sha for the file name
		h := sha1.New()
		io.Copy(h, mf)
		fname := fmt.Sprintf("%x", h.Sum(nil)) + "." + ext
		//create new file
		wd, err := os.Getwd()
		fmt.Println("===============")
		checkError(err)
		path := filepath.Join(wd, "public", "pics", fname)
		nf, err := os.Create(path)
		checkError(err)
		defer nf.Close()

		//copy
		mf.Seek(0, 0)
		io.Copy(nf, mf)
		// add filename to this user's cookie
		c = appendValue(w, c, fname)
	}

	xs := strings.Split(c.Value, "|")
	fmt.Println("xs:::::", xs)
	tpl.ExecuteTemplate(w, "index.gohtml", xs)
}

func getCookie(w http.ResponseWriter, req *http.Request) *http.Cookie {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
		http.SetCookie(w, c)
	}
	return c
}

func appendValue(w http.ResponseWriter, c *http.Cookie, fname string) *http.Cookie {
	s := c.Value
	if !strings.Contains(s, fname) {
		s += "|" + fname
	}
	c.Value = s
	http.SetCookie(w, c)
	return c
}

func checkError(err error) {
	if err != nil {
		fmt.Println("***********错误*************")
		fmt.Println(err)
	}
}

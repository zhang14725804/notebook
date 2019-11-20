package main

import (
	"database/sql"
	"fmt"
	"io"
	"net/http"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

//Db数据库连接池
var db *sql.DB
var err error

const (
	userName = "root"
	password = "123456"
	ip       = "127.0.0.1"
	port     = "3306"
	dbName   = "goDB1113"
)

/*
	TODOS：：怎么不需要启动mysql也可以链接？
	但是后台确实运行着mysql
*/
func main() {
	// 构建连接："用户名:密码@tcp(IP:端口)/数据库?charset=utf8"
	// root:123456@tcp(127.0.0.1:3306)/goDB1113?charset=utf8
	path := strings.Join([]string{userName, ":", password, "@tcp(", ip, ":", port, ")/", dbName, "?charset=utf8"}, "")
	fmt.Println(path)
	//打开数据库,前者是驱动名，所以要导入： _ "github.com/go-sql-driver/mysql"
	db, err = sql.Open("mysql", path)
	checkError(err)
	defer db.Close()
	//建立链接
	err = db.Ping()
	checkError(err)

	http.HandleFunc("/", index)
	http.Handle("/favicon.ico", http.NotFoundHandler())
	err := http.ListenAndServe(":8080", nil)
	checkError(err)

}

func index(w http.ResponseWriter, req *http.Request) {
	_, err := io.WriteString(w, "链接成功！")
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

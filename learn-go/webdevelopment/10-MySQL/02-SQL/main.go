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
	//构建连接："用户名:密码@tcp(IP:端口)/数据库?charset=utf8"
	path := strings.Join([]string{userName, ":", password, "@tcp(", ip, ":", port, ")/", dbName, "?charset=utf8"}, "")
	fmt.Println(path)
	/*
		func Open(driverName, dataSourceName string) (*DB, error)
		打开数据库,前者是驱动名，所以要导入： _ "github.com/go-sql-driver/mysql"
	*/
	db, err = sql.Open("mysql", path)
	checkError(err)
	defer db.Close()
	//建立链接
	err = db.Ping()
	checkError(err)

	http.HandleFunc("/", index)
	http.HandleFunc("/create", create)
	http.HandleFunc("/insert", insert)
	http.HandleFunc("/read", read)
	http.HandleFunc("/update", update)
	http.HandleFunc("/del", del)
	http.HandleFunc("/drop", drop)
	http.Handle("/favicon.ico", http.NotFoundHandler())
	err := http.ListenAndServe(":8080", nil)
	checkError(err)

}

func index(w http.ResponseWriter, req *http.Request) {
	_, err := io.WriteString(w, "链接成功！")
	checkError(err)
}

/*
	两个错误
	dial tcp 127.0.0.1:3306: connectex: No connection could be made because the target machine actively refused it.
	2019/11/14 11:49:51 http: panic serving [::1]:8003: runtime error: invalid memory address or nil pointer dereference
	原因：没有启动mysql服务
	Unknown database 'godb1113'
	原因：没有创建database
*/
func create(w http.ResponseWriter, req *http.Request) {
	/*
		Prepare creates a prepared statement for later queries or executions.
	*/
	stmt, err := db.Prepare(`CREATE TABLE customer (name VARCHAR(20));`)
	checkError(err)
	defer stmt.Close()

	/*
		Exec executes a prepared statement with the given arguments and
		returns a Result summarizing the effect of the statement.
	*/
	r, err := stmt.Exec()
	checkError(err)

	/*
		RowsAffected returns the number of rows affected by an
		update, insert, or delete. Not every database or database driver may support this.
	*/
	n, err := r.RowsAffected()
	checkError(err)

	fmt.Fprintln(w, "创建表 customer", n)
}

func insert(w http.ResponseWriter, req *http.Request) {
	stmt, err := db.Prepare(`INSERT INTO customer VALUES ("James");`)
	checkError(err)
	defer stmt.Close()

	r, err := stmt.Exec()
	checkError(err)

	n, err := r.RowsAffected()
	checkError(err)

	fmt.Fprintln(w, "插入记录！", n)
}

func read(w http.ResponseWriter, req *http.Request) {
	/*
		Query executes a query that returns rows, typically a SELECT.
		The args are for any placeholder parameters in the query
	*/
	rows, err := db.Query("SELECT * FROM customer")
	checkError(err)
	defer rows.Close()

	var name string
	for rows.Next() {
		err = rows.Scan(&name)
		checkError(err)
		fmt.Fprintln(w, "查询结果:", name)
	}
}

func update(w http.ResponseWriter, req *http.Request) {
	stmt, err := db.Prepare(`UPDATE customer SET name="Jimmy" WHERE name="James";`)
	checkError(err)
	defer stmt.Close()

	r, err := stmt.Exec()
	checkError(err)

	n, err := r.RowsAffected()
	checkError(err)

	fmt.Fprintln(w, "更新记录！", n)
}

func del(w http.ResponseWriter, req *http.Request) {
	stmt, err := db.Prepare(`DELETE FROM customer WHERE name="Jimmy";`)
	checkError(err)
	defer stmt.Close()

	r, err := stmt.Exec()
	checkError(err)

	n, err := r.RowsAffected()
	checkError(err)

	fmt.Fprintln(w, "删除记录！", n)
}

func drop(w http.ResponseWriter, req *http.Request) {
	stmt, err := db.Prepare(`DROP TABLE customer;`)
	checkError(err)
	defer stmt.Close()

	_, err = stmt.Exec()
	checkError(err)

	fmt.Fprintln(w, "删除表customer！")
}

func checkError(err error) {
	if err != nil {
		fmt.Println("**************有错误啦*****************8")
		fmt.Println(err)
	}
}

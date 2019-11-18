package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"webdevelopment/14-mvc/models"

	"github.com/julienschmidt/httprouter"
)

/*
	http://localhost:8080/user/1
*/
func main() {
	r := httprouter.New()
	r.GET("/", index)
	r.GET("/user/:id", getUser)
	http.ListenAndServe(":8080", r)
}

func getUser(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	u := models.User{
		Name:   "James Bond",
		Gender: "male",
		Age:    32,
		Id:     p.ByName("id"),
	}

	uj, err := json.Marshal(u)
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s\n", uj)
}

func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	s := `<!DOCTYPE html>
		<html lang="en">
		<head>
		<meta charset="UTF-8">
		<title>Index</title>
		</head>
		<body>
		<a href="/user/9872309847">GO TO: http://localhost:8080/user/9872309847</a>
		</body>
		</html>
	`
	w.Header().Set("Content-Type", "text/html;charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(s))
}

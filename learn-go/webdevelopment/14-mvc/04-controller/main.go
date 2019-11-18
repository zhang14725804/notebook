package main

import (
	"net/http"
	"webdevelopment/14-mvc/controllers"

	"github.com/julienschmidt/httprouter"
)

/*
	大写方法代表public

	getUser
	http://localhost:8080/user/1

	createUser
	curl -X POST -H "Content-Type: application/json" -d '{"Name":"James Bond","Gender":"male","Age":32,"Id":"777"}' http://localhost:8080/user
*/
func main() {
	r := httprouter.New()
	uc := controllers.NewUserController()
	r.GET("/user/:id", uc.GetUser)
	r.POST("/user", uc.CreateUser)
	r.DELETE("/user/:id", uc.DeleteUser)
	http.ListenAndServe(":8080", r)
}

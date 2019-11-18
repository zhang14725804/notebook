package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"webdevelopment/14-mvc/models"

	"github.com/julienschmidt/httprouter"
)

type UserContoller struct{}

func NewUserController() *UserContoller {
	return &UserContoller{}
}

func (uc UserContoller) CreateUser(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	u := models.User{}
	// encode/decode for sending/receiving JSON to/from a stream
	json.NewDecoder(r.Body).Decode(&u)
	u.Id = "007"
	uj, _ := json.Marshal(u)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) //201
	fmt.Fprintf(w, "%s\n", uj)
}

func (uc UserContoller) DeleteUser(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	// TODOS: write code to delete user
	w.WriteHeader(http.StatusOK) // 200
	fmt.Fprint(w, "Write code to delete user\n")
}

func (uc UserContoller) GetUser(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	u := models.User{
		Name:   "James Bond",
		Gender: "male",
		Age:    32,
		// 获取url参数
		Id: p.ByName("id"),
	}

	uj, err := json.Marshal(u)
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s\n", uj)
}

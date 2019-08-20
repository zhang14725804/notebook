package main

import (
	"fmt"
	"net/http"
)

/*
	存储用户相关数据
	PlayerStore stores score information about players
*/
type PlayerStore interface {
	GetPlayerScore(name string) int
	RecordWin(name string)
}

/*
	获取用户信息接口
*/
type PlayerServer struct {
	store PlayerStore
}

/*
	用 http.HandlerFunc 把普通函数转化为 http.Handler
*/
func (p *PlayerServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	player := r.URL.Path[len("/players/"):]

	switch r.Method {
	case http.MethodPost:
		p.processWin(w, player)
	case http.MethodGet:
		p.showScore(w, player)
	}
}

func (p *PlayerServer) showScore(w http.ResponseWriter, player string) {
	score := p.store.GetPlayerScore(player)
	if score == 0 {
		w.WriteHeader(http.StatusNotFound)
	}
	fmt.Fprint(w, score)
}
func (p *PlayerServer) processWin(w http.ResponseWriter, player string) {
	p.store.RecordWin(player)
	w.WriteHeader(http.StatusAccepted)
}

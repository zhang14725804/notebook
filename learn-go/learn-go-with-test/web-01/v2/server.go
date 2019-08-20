package main

import (
	"fmt"
	"net/http"
)

/*
	把得分计算从 handler 移到函数 GetPlayerScore 中
	存储用户相关数据
*/
type PlayerStore interface {
	GetPlayerStore(name string) int
}

/*
	struct 的用途是用于存储数据
	为了让 PlayerServer 能够使用 PlayerStore，它需要一个引用
	获取用户信息接口
*/
type PlayerServer struct {
	store PlayerStore
}

/*
	通过给这个 struct 添加一个方法来实现 Handler 接口，并把它放到已有的 handler 中
*/
func (p *PlayerServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	player := r.URL.Path[len("/player/"):]
	score := p.store.GetPlayerStore(player)
	if score == 0 {
		w.WriteHeader(http.StatusNotFound)
	}
	fmt.Fprint(w, score)
}

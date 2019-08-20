package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

/*
	PlayerStore stores score information about players
*/
type PlayerStore interface {
	GetPlayerScore(name string) int
	RecordWin(name string)
	GetLeague() []Player
}

type Player struct {
	Name string
	Wins int
}

/*
	PlayerServer is a HTTP interface for player information
*/
type PlayerServer struct {
	store PlayerStore
	/*
		ServeHTTP(ResponseWriter, *Request)
	*/
	http.Handler
}

func NewPlayerServer(store PlayerStore) *PlayerServer {
	// 创建对象？
	p := new(PlayerServer)
	p.store = store

	router := http.NewServeMux()
	router.Handle("/league", http.HandlerFunc(p.leagueHandler))
	router.Handle("/player/", http.HandlerFunc(p.playerHandler))
	p.Handler = router
	return p
}

/*
	增加content-type
*/
const jsonContentType = "application/json"

func (p *PlayerServer) leagueHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", jsonContentType)
	/*对信息编码*/
	json.NewEncoder(w).Encode(p.store.GetLeague())
}

func (p *PlayerServer) playerHandler(w http.ResponseWriter, r *http.Request) {
	player := r.URL.Path[len("/player/"):]
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

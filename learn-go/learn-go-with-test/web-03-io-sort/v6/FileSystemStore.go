package main

import (
	"encoding/json"
	"io"
)

/*
	FileSystemPlayerStore stores players in the filesystem
	io.ReadSeeker 这个类型的作用是什么
	ReadSeeker is the interface that groups the basic Read and Seek methods.
	ReadWriteSeeker is the interface that groups the basic Read, Write and Seek methods.
*/
type FileSystemPlayerStore struct {
	database io.ReadWriteSeeker
	league   League
}

/*
	NewFileSystemPlayerStore creates a FileSystemPlayerStore
*/
func NewFileSystemPlayerStore(database io.ReadWriteSeeker) *FileSystemPlayerStore {
	database.Seek(0, 0)
	league, _ := NewLeague(database)

	return &FileSystemPlayerStore{
		database: database,
		league:   league,
	}
}

/*
	GetLeague returns the scores of all the players
	FileSystemPlayerStore添加方法
*/
func (f *FileSystemPlayerStore) GetLeague() League {
	return f.league
}

/*
	GetPlayerScore retrieves a player's score
	player属性名首字母大写
*/
func (f *FileSystemPlayerStore) GetPlayerScore(name string) int {
	player := f.league.Find(name)
	if player != nil {
		return player.Wins
	}
	return 0
}

/*
 RecordWin will store a win for a player, incrementing wins if already known
*/

func (f *FileSystemPlayerStore) RecordWin(name string) {
	player := f.league.Find(name)

	if player != nil {
		player.Wins++
	} else {
		f.league = append(f.league, Player{name, 1})
	}
	f.database.Seek(0, 0)
	/*
		io.ReadWriteSeeker::
		cannot use f.database (type io.ReadSeeker) as type io.Writer in argument to json.NewEncoder:
		io.ReadSeeker does not implement io.Writer (missing Write method)
	*/
	json.NewEncoder(f.database).Encode(f.league)
}

package main

import "io"

/*
	FileSystemPlayerStore stores players in the filesystem
	io.ReadSeeker 这个类型的作用是什么
	ReadSeeker is the interface that groups the basic Read and Seek methods.
*/
type FileSystemPlayerStore struct {
	database io.ReadSeeker
}

/*
	GetLeague returns the scores of all the players
	FileSystemPlayerStore添加方法
*/
func (f *FileSystemPlayerStore) GetLeague() []Player {
	f.database.Seek(0, 0)
	league, _ := NewLeague(f.database)
	return league
}

/*
	GetPlayerScore retrieves a player's score
	player属性名首字母大写
*/
func (f *FileSystemPlayerStore) GetPlayerScore(name string) int {
	var wins int
	for _, player := range f.GetLeague() {
		if player.Name == name {
			wins = player.Wins
			break
		}
	}
	return wins
}

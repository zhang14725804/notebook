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
	FileSystemPlayerStore添加方法
*/
func (f *FileSystemPlayerStore) GetLeague() []Player {
	f.database.Seek(0, 0)
	league, _ := NewLeague(f.database)
	return league
}

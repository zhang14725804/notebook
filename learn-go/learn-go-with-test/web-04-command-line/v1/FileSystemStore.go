package poker

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
)

/*
	FileSystemPlayerStore stores players in the filesystem
	io.ReadSeeker 这个类型的作用是什么
	ReadSeeker is the interface that groups the basic Read and Seek methods.
	ReadWriteSeeker is the interface that groups the basic Read, Write and Seek methods.
*/
type FileSystemPlayerStore struct {
	database *json.Encoder
	league   League
}

/*
	NewFileSystemPlayerStore creates a FileSystemPlayerStore
*/
func NewFileSystemPlayerStore(file *os.File) (*FileSystemPlayerStore, error) {
	// 初始化
	err := initialisePlayerDBFile(file)
	if err != nil {
		return nil, fmt.Errorf("problem initialising player db file, %v", err)
	}

	league, err := NewLeague(file)
	if err != nil {
		return nil, fmt.Errorf("problem loading player store from file %s, %v", file.Name(), err)
	}

	return &FileSystemPlayerStore{
		database: json.NewEncoder(&tape{file}),
		league:   league,
	}, nil
}

/*
	初始化
*/
func initialisePlayerDBFile(file *os.File) error {
	file.Seek(0, 0)
	info, err := file.Stat()

	if err != nil {
		return fmt.Errorf("problem getting file info from file %s, %v", file.Name(), err)
	}

	if info.Size() == 0 {
		file.Write([]byte("[]"))
		file.Seek(0, 0)
	}

	return nil
}

/*
	GetLeague returns the scores of all the players
	FileSystemPlayerStore添加方法
	排序
*/
func (f *FileSystemPlayerStore) GetLeague() League {
	sort.Slice(f.league, func(i, j int) bool {
		return f.league[i].Wins > f.league[j].Wins
	})
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
	f.database.Encode(f.league)
}

package main

/*NewInMemoryPlayerStore initialises an empty player store*/
func NewInMemoryPlayerStore() *InMemoryPlayerStore {
	return &InMemoryPlayerStore{map[string]int{}}
}

/*
	我们需要存储数据，所以我在 InMemoryPlayerStore 结构中添加了 map[string]int
	InMemoryPlayerStore collects data about players in memory
*/
type InMemoryPlayerStore struct {
	store map[string]int
}

/*
	RecordWin will record a player's win
*/
func (i *InMemoryPlayerStore) RecordWin(name string) {
	i.store[name]++
}

/*GetPlayerScore retrieves scores for a given player*/
func (i *InMemoryPlayerStore) GetPlayerScore(name string) int {
	return i.store[name]
}

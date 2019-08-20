package poker

import (
	"encoding/json"
	"fmt"
	"io"
)

/*
	League stores a collection of players
*/
type League []Player

/*
	什么时候用地址什么时候用指针
*/
func (league League) Find(name string) *Player {
	for i, p := range league {
		if p.Name == name {
			return &league[i]
		}
	}
	return nil
}

/*
 NewLeague creates a league from JSON
*/
func NewLeague(rdr io.Reader) (League, error) {
	var league []Player
	err := json.NewDecoder(rdr).Decode(&league)
	if err != nil {
		err = fmt.Errorf("problem parsing league, %v", err)
	}
	return league, err
}

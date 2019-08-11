package main

import "errors"

type Dictionary map[string]string

var ErrNotFound = errors.New("could not find the word you were looking for")

func (d Dictionary) Search(word string) (string, error) {
	defination, of := d[word]
	if !of {
		return "", ErrNotFound
	}
	return defination, nil
}

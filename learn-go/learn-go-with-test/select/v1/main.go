package main

import (
	"fmt"
	"net/http"
	"time"
)

func Racer(a, b string) (winner string) {
	startA := time.Now()
	http.Get(a)
	aDuration := time.Since(startA)

	startB := time.Now()
	http.Get(b)
	bDuration := time.Since(startB)
	if aDuration < bDuration {
		return a
	}
	return b
}

func main() {
	aURL := "http://www.facebook.com"
	bURL := "http://www.quii.co.uk"
	got := Racer(aURL, bURL)
	fmt.Println(got)
}

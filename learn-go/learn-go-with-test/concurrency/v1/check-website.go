package concurrency

import "net/http"

func CheckWebsite(url string) bool {
	response, err := http.Head(url)
	if err != nil {
		return false
	}
	if response.StatusCode != http.StatusOK {
		return false
	}
	return true
}

package main

import (
	"bytes"
	"testing"
)

func TestGreet(t *testing.T) {
	/*
		bytes 包中的 buffer 类型实现了 Writer 接口
		用它来作为 Writer
	*/
	buffer := bytes.Buffer{}
	Greet(&buffer, "Chris")

	got := buffer.String()
	want := "Hello, Chris"
	if got != want {
		t.Errorf("got '%s', want '%s'", got, want)
	}
}

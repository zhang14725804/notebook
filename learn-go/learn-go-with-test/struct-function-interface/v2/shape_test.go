package main

import "testing"

func TestPreimeter(t *testing.T) {
	rectangle := Rectangle{12, 6}
	got := Perimeter(rectangle)
	want := 36.0
	if got != want {
		t.Errorf("got %.2f want %.2f", got, want)
	}
}

func TestArea(t *testing.T) {
	rectangle := Rectangle{12, 6}
	got := Area(rectangle)
	want := 72.0
	if got != want {
		t.Errorf("got %.2f want %.2f", got, want)
	}
}

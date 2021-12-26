### slice 和 map 分别作为函数参数时有什么区别？

question 最后一句没看懂，不是明明改变了么，到底怎么回事

makemap返回的结果：*hmap，它是一个指针， makeslice 函数返回的是 Slice 结构体：

```go
func makemap(t *maptype, hint int64, h *hmap, bucket unsafe.Pointer) *hmap
func makeslice(et *_type, len, cap int) slice
```

makemap 和 makeslice 的区别，带来一个不同点：当 map 和 slice 作为函数参数时，在函数参数内部对 map 的操作会影响 map 自身；而对 slice 却不会（之前讲 slice 的文章里有讲过）。

主要原因：一个是指针（*hmap），一个是结构体（slice）。Go 语言中的函数传参都是值传递，在函数内部，参数会被 copy 到本地。*hmap指针 copy 完之后，仍然指向同一个 map，因此函数内部对 map 的操作会影响实参。而 slice 被 copy 后，会成为一个新的 slice，对它进行的操作不会影响到实参。




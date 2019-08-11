package main

type Dictionary map[string]string
type DictionaryErr string

func (e DictionaryErr) Error() string {
	return string(e)
}

var (
	ErrNotFound   = DictionaryErr("could not find the word you were looking for")
	ErrWordExists = DictionaryErr("cannot add word because it already exists")
)

func (d Dictionary) Search(word string) (string, error) {
	defination, of := d[word]
	if !of {
		return "", ErrNotFound
	}
	return defination, nil
}

/*
	Map 有一个有趣的特性，不使用指针传递你就可以修改它们。这是因为 map 是引用类型。
	这意味着它拥有对底层数据结构的引用，就像指针一样。它底层的数据结构是 hash table 或 hash map


	初始化空 map(两种方法都可以创建一个空的 hash map 并指向 dictionary。这确保永远不会获得 nil 指针异常)
	dictionary = map[string]string{}
		OR
	dictionary = make(map[string]string)
*/
func (d Dictionary) Add(word, defination string) error {
	_, err := d.Search(word)
	switch err {
	case ErrNotFound:
		d[word] = defination
	case nil:
		return ErrWordExists
	default:
		return err
	}
	return nil

}

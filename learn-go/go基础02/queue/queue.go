package queue

// int类型
// type Queue []int
// 任何类型
type Queue []interface{}

// 模拟队列
func (q *Queue) Push(v interface{}) {
	// 因为入队出队影响到队列本身，所以这里使用指针
	*q = append(*q, v.(int))
}

// （pop返回删除的元素）
func (q *Queue) Pop() interface{} {
	head := (*q)[0]
	*q = (*q)[1:]
	// 限制只有int类型可以pop，强制类型转换
	return head.(int)
}

func (q *Queue) IsEmpty() bool {
	return len(*q) == 0
}

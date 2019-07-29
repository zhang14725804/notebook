package tree

import "fmt"

type TreeNode struct {
	Value       int
	Left, Right *TreeNode
}

func (node TreeNode) Print() {
	fmt.Print(node.Value, "")
}
func (node *TreeNode) SetValue(value int) {
	if node == nil {
		fmt.Println("node 为 nil")
		return
	}
	node.Value = value
}

// 遍历树（中序遍历：先访问左子树，在访问中间在访问右子树）
func (node *TreeNode) Traverse() {
	if node == nil {
		return
	}
	node.Left.Traverse()
	node.Print()
	node.Right.Traverse()
}

// 这里用指针
func CreateNode(value int) *TreeNode {
	return &TreeNode{Value: value}
}

// 统计节点个数
func (node *TreeNode) TraverseFunc(f func(*TreeNode)) {
	if node == nil {
		return
	}
	node.Left.TraverseFunc(f)
	f(node)
	node.Right.TraverseFunc(f)
}

// 使用channel遍历树
func (node *TreeNode) TraverseWithChannel() chan *TreeNode {
	out := make(chan *TreeNode)
	go func() {
		node.TraverseFunc(func(node *TreeNode) {
			out <- node
		})
		close(out)
	}()
	return out
}

package main

import (
	"fmt"
	"tree"
)

/*
	树的结构大概是这样
		 3
		* *
	   *   *
	  0     5
	   *   *
	   2   0
*/

// struct和包的用法实例
func main() {
	var root tree.TreeNode
	root = tree.TreeNode{Value: 3}
	root.Left = &tree.TreeNode{}
	root.Right = &tree.TreeNode{Value: 5, Left: nil, Right: nil}
	root.Right.Left = new(tree.TreeNode)
	root.Left.Right = tree.CreateNode(2)
	root.Right.Left.SetValue(4)
	root.Traverse()
	fmt.Println()
	myRoot := myTreeNode{&root}
	myRoot.postOrder()
	nodeCount := 0
	root.TraverseFunc(func(node *tree.TreeNode) {
		nodeCount++
	})
	fmt.Println("TreeNode count:", nodeCount)

	// 返回最大的节点值
	c := root.TraverseWithChannel()
	maxNode := 0
	for node := range c {
		if node.Value > maxNode {
			maxNode = node.Value
		}
	}
	fmt.Println("Max node value:", maxNode)
}

// 组合的方式扩展原有类型（变为后序遍历）
type myTreeNode struct {
	node *tree.TreeNode
}

func (myNode *myTreeNode) postOrder() {
	if myNode == nil || myNode.node == nil {
		return
	}
	left := myTreeNode{myNode.node.Left}
	left.postOrder()
	right := myTreeNode{myNode.node.Right}
	right.postOrder()
	myNode.node.Print()
}

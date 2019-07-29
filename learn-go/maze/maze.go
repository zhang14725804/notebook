package main

import (
	"fmt"
	"os"
)

func readMaze(filename string) [][]int {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	// 行列
	var row, col int
	// 从文件读取内容
	fmt.Fscanf(file, "%d %d", &row, &col)
	fmt.Printf("row==%d,col==%d", row, col)
	fmt.Println()
	// 几行几列
	maze := make([][]int, row)
	// 每一行
	for i := range maze {
		// 每一列
		maze[i] = make([]int, col)
		for j := range maze[i] {
			fmt.Fscanf(file, "%d", &maze[i][j])
		}
	}
	return maze
}

// 每个点
type point struct {
	i, j int
}

// 四个方向(上左下右)
var dirs = [4]point{{-1, 0}, {0, -1}, {1, 0}, {0, 1}}

// 两个点坐标相加,,,(p point)相当于this
func (p point) add(r point) point {
	return point{p.i + r.i, p.j + r.j}
}

func (p point) at(grid [][]int) (int, bool) {
	if p.i < 0 || p.i >= len(grid) {
		return 0, false
	}
	if p.j < 0 || p.j >= len(grid[p.i]) {
		return 0, false
	}
	return grid[p.i][p.j], true
}

func walk(maze [][]int, start, end point) [][]int {
	// 二维数组
	steps := make([][]int, len(maze))
	for i := range steps {
		steps[i] = make([]int, len(maze[i]))
	}
	Q := []point{start}
	// 推出条件::终点或者队列为空(死路)
	for len(Q) > 0 {
		// 对头
		cur := Q[0]
		// 去掉对头
		Q = Q[1:]
		// 退出时机
		if cur == end {
			break
		}
		for _, dir := range dirs {
			// 新发现的节点
			next := cur.add(dir)
			// 下个节点是0,下一个steps的next也是0,next不是start
			val, ok := next.at(maze)
			// val ==1撞墙
			if !ok || val == 1 {
				// 下一个点
				continue
			}
			val, ok = next.at(steps)
			if !ok || val != 0 {
				continue
			}
			if next == start {
				continue
			}
			curSteps, _ := cur.at(steps)
			steps[next.i][next.j] = curSteps + 1
			Q = append(Q, next)
		}
	}
	return steps
}
func main() {
	// 用循环创建二维slice
	maze := readMaze("./maze.in")
	for _, row := range maze {
		for _, val := range row {
			fmt.Printf("%d ", val)
		}
		fmt.Println()
	}
	fmt.Println("================result===================")
	steps := walk(maze, point{0, 0}, point{len(maze) - 1, len(maze[0]) - 1})
	for _, row := range steps {
		for _, val := range row {
			fmt.Printf("%3d ", val)
		}
		fmt.Println()
	}
}

### 需要处理的情况

    节点更新
    节点新增或减少
    节点位置变化

同级多个节点的Diff，一定属于以上三种情况中的一种或多种。

### Diff思路

React团队发现，在日常开发中，相较于【新增】和【删除】，【更新】组件发生的频率更高。所以Diff会优先判断当前节点是否属于【更新】。

基于以上原因，Diff算法的整体逻辑会经历两轮遍历：

    第一轮遍历：处理更新的节点。
    第二轮遍历：处理剩下的不属于更新的节点

### 第一轮遍历

(1) let i = 0，遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。

(2) 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。

(3) 如果不可复用，分两种情况：

    key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。
    key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历

(4) 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

### 第二轮遍历
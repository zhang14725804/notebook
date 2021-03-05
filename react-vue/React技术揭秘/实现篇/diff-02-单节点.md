### 单个节点，会进入reconcileSingleElement

React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。
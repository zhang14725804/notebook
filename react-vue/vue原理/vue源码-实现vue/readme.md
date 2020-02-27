来源：：https://github.com/bison1994/vue-for-learning
### stage-1
- 用虚拟dom呈现真实dom
- 挂在虚拟dom到真实dom
**知识点：vnode createElm**

### stage-2
- 将之前的代码为Vue风格
- 为下一步做准备
**知识点：proxy**

### stage-3
- 改变数据生成新的虚拟dom树
- 新旧虚拟dom做diff
- 将diffs patch到真实dom节点
**知识点：diff，patch**

### stage-4
- 响应式数据
**知识点：Dep, Watcher, Getter, Setter, Subscribe/Publish**

参考：
    https://juejin.im/post/5b28f54be51d45587f49fd41#heading-8
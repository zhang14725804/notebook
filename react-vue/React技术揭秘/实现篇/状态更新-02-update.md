【状态更新】流程开始后首先会创建【Update对象】

### Update的分类

将可以触发更新的方法所隶属的组件分类：

    ReactDOM.render —— HostRoot
    this.setState —— ClassComponent
    this.forceUpdate —— ClassComponent
    useState —— FunctionComponent
    useReducer —— FunctionComponent

可以看到，一共三种组件（HostRoot | ClassComponent | FunctionComponent）可以触发更新。

由于不同类型组件工作方式不同，所以存在两种不同结构的Update，其中ClassComponent与HostRoot共用一套Update结构，FunctionComponent单独使用一种Update结构。

### Update结构

ClassComponent与HostRoot（即rootFiber.tag对应类型）共用同一种Update结构

```javascript
const update: Update<*> = {
    eventTime,
    lane,
    suspenseConfig,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
};
```

### Update与Fiber的联系

从双缓存机制中，Fiber节点组成Fiber树，页面中最多同时存在两棵Fiber树：

    代表当前页面状态的current Fiber树
    代表正在render阶段的workInProgress Fiber树


类似Fiber节点组成Fiber树，Fiber节点上的多个Update会组成链表并被包含在fiber.updateQueue中

Fiber节点最多同时存在两个updateQueue：

    current fiber保存的updateQueue即【current updateQueue】
    workInProgress fiber保存的updateQueue即workInProgress updateQueue

在commit阶段完成页面渲染后，workInProgress Fiber树变为current Fiber树，workInProgress Fiber树内Fiber节点的updateQueue就变成【current updateQueue】

### updateQueue

### 例子（🔥🔥🔥）
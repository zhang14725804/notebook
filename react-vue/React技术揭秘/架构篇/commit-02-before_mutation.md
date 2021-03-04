### Renderer工作的阶段被称为commit阶段。commit阶段可以分为三个子阶段：

    before mutation阶段（执行DOM操作前）
    mutation阶段（执行DOM操作）
    layout阶段（执行DOM操作后）

本节看看before mutation阶段（执行DOM操作前）都做了什么

### 概览

在before mutation阶段，会遍历effectList，依次执行：

    处理DOM节点渲染/删除后的 autoFocus、blur逻辑
    调用getSnapshotBeforeUpdate生命周期钩子
    调度useEffect

### commitBeforeMutationEffects

### getSnapshotBeforeUpdate

从Reactv16开始，componentWillXXX钩子前增加了UNSAFE_前缀。

究其原因，是因为Stack Reconciler重构为Fiber Reconciler后，render阶段的任务可能中断/重新开始，对应的组件在render阶段的生命周期钩子（即componentWillXXX）可能触发多次。

这种行为和Reactv15不一致，所以标记为UNSAFE_

为此，React提供了替代的生命周期钩子getSnapshotBeforeUpdate。

我们可以看见，getSnapshotBeforeUpdate是在commit阶段内的before mutation阶段调用的，由于commit阶段是同步的，所以不会遇到多次调用的问题。

### 调度useEffect

useEffect如何被异步调度，以及为什么要异步（而不是同步）调度


### 为什么需要异步调用

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染
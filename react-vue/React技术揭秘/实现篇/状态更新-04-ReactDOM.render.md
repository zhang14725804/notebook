这一节走通ReactDOM.render完成页面渲染的整个流程

### 创建Fiber

### 创建update

### 流程概览

    （1）创建fiberRootNode、rootFiber、updateQueue（`legacyCreateRootFromDOMContainer`）
    （2）创建Update对象（`updateContainer`）
    （3）从fiber到root（`markUpdateLaneFromFiberToRoot`）
    （4）调度更新（`ensureRootIsScheduled`）
    （5）render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）
    （6）commit阶段（`commitRoot`）

### React的其他入口函数

当前React共有三种模式：

    legacy，这是当前React使用的方式。当前没有计划删除本模式，但是这个模式可能不支持一些新功能。
    blocking，开启部分concurrent模式特性的中间模式。目前正在实验中。作为迁移到concurrent模式的第一个步骤。
    concurrent，面向未来的开发模式。我们之前讲的任务中断/任务优先级都是针对concurrent模式
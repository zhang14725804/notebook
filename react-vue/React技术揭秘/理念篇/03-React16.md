### React16架构可以分为三层：

    Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
    Reconciler（协调器）—— 负责找出变化的组件
    Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。类似于requestIdleCallback

requestIdleCallback缺点

    浏览器兼容性
    触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低


基于以上原因，React实现了功能更完备的requestIdleCallback polyfill，这就是Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置

### Reconciler（协调器）

更新工作从【递归】变成了【可中断的循环】过程。每次循环都会调用shouldYield判断当前是否有剩余时间。

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记。

整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

### Renderer（渲染器）

Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作

其中【Scheduler】和【Reconciler】步骤随时可能由于以下原因被中断：

    有其他更高优任务需要先更新
    当前帧没有剩余时间

由于【Scheduler】和【Reconciler】都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM
### React15架构可以分为两层：

    Reconciler（协调器）：diff算法—— 负责找出变化的组件
    Renderer（渲染器）：ReactDOM—— 负责将变化的组件渲染到页面上


### Reconciler（协调器）

在React中可以通过this.setState、this.forceUpdate、ReactDOM.render等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

    调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
    将虚拟DOM和上次更新时的虚拟DOM对比
    通过对比找出本次更新中变化的虚拟DOM
    通知Renderer将变化的虚拟DOM渲染到页面上


### Renderer（渲染器）

在每次更新发生时，Renderer接到Reconciler通知，将变化的组件渲染在当前宿主环境


### React15架构的缺点

在Reconciler中，mount的组件会调用mountComponent，update的组件会调用updateComponent。这两个方法都会【递归更新】子组件。

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

不支持【异步更新】，更不支持【可中断的异步更新】


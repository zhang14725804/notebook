### Fiber架构的心智模型

- 代数效应

代数效应是函数式编程中的一个概念，用于将副作用从函数调用中分离。

- 代数效应与Generator

浏览器原生就支持类似的实现，这就是【Generator】

从React15到React16，协调器（Reconciler）重构的一大目的是：将老的【同步更新】的架构变为【异步可中断更新】。

【异步可中断更新】可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

- 代数效应与Fiber

可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

### Fiber架构的实现原理

- Fiber起源

在React15及以前，Reconciler采用【递归】的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，React16将递归的【无法中断的更新】重构为【异步的可中断更新】，由于曾经用于递归的虚拟DOM数据结构已经无法满足需要。Fiber架构应运而生

- Fiber的含义（三层）

作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为【stack Reconciler】。React16的Reconciler基于Fiber节点实现，被称为【Fiber Reconciler】。

作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

- Fiber的结构（按照三层含义来看）

    （1）架构层面
    （2）静态数据结构层面
    （3）动态的工作单元层面

为什么父级指针叫做return而不是parent或者father呢？因为作为一个工作单元，return指节点执行完completeWork（本章后面会介绍）后会返回的下一个节点。子Fiber节点及其兄弟节点完成工作后会返回其父级节点，所以用return指代父级节点。

### Fiber架构工作原理

- 双缓存

【在内存中构建并直接替换】的技术叫做双缓存

- 双缓存Fiber树

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为【current Fiber树】，正在内存中构建的Fiber树称为【workInProgress Fiber树】。

current Fiber树中的Fiber节点被称为current fiber，workInProgress Fiber树中的Fiber节点被称为workInProgress fiber，他们通过alternate属性连接（为什么要相连？question）

React应用的根节点通过【current】指针在不同Fiber树的rootFiber间切换来实现Fiber树的切换。

当workInProgress Fiber树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向workInProgress Fiber树，此时workInProgress Fiber树就变为current Fiber树。（之前的current Fiber呢？废弃掉了？）

每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。

- mount（TODO）

- update（TODO）
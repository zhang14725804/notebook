### 一个DOM节点在某一时刻最多会有4个节点和他相关

（1）current Fiber。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点

（2）workInProgress Fiber。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点

（3）DOM节点本身。

（4）JSX对象。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。


    Diff算法的本质是对比1和4，生成2


### Diff的瓶颈以及React如何应对

为了降低算法复杂度，React的diff会预设三个限制：

    只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
    两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
    开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

### Diff算法如何实现

Diff的入口函数【reconcileChildFibers】出发，该函数会根据【newChild（即JSX对象）】类型调用不同的处理函数

可以从同级的节点数量将Diff分为两类：

    当newChild类型为object、number、string，代表同级只有一个节点
    当newChild类型为Array，同级有多个节点
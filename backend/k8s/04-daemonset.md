### DaemonSet特征

1. 这个 Pod 运行在 Kubernetes 集群里的每一个节点（Node）上；
2. 每个节点上只有一个这样的 Pod 实例；
3. 当有新的节点加入 Kubernetes 集群后，该 Pod 会自动地在新节点上被创建出来；而当旧节点被删除后，它上面的 Pod 也相应地会被回收掉。

### DaemonSet应用场景

1. 网络组件
2. 存储组件
3. 日志和监控组件

### DaemonSet原理

1. DaemonSet 又是如何保证每个 Node 上有且只有一个被管理的 Pod 呢？（典型的“控制器模型”）
2. 如何在指定的 Node 上创建新 Pod 呢？nodeAffinity
3. tolerations
4. DaemonSet 其实是一个非常简单的控制器。在它的控制循环中，只需要遍历所有节点，然后根据节点上是否有被管理 Pod 的情况，来决定是否要创建或者删除一个 Pod。
5. DaemonSet 控制器操作的直接就是 Pod，不可能有 ReplicaSet 这样的对象参与其中。那么，它的这些版本又是如何维护的呢？（ ControllerRevision ）
6. DaemonSet 只管理 Pod 对象，然后通过 nodeAffinity 和 Toleration 这两个调度器的小功能，保证了每个节点上有且只有一个 Pod
### 拓扑状态

1. StatefulSet 如何保证应用实例之间“拓扑状态”的稳定性
2. StatefulSet 使用 Pod 模板创建 Pod 的时候，对它们进行编号，并且按照编号顺序逐一完成创建工作。
3. 通过 Headless Service 的方式，StatefulSet 为每个 Pod 创建了一个固定并且稳定的 DNS 记录，来作为它的访问入口

### 存储状态

1. Persistent Volume Claim（接口）
2. Persistent Volume（实现）
3. volumeClaimTemplates
4. StatefulSet 其实就是一种特殊的 Deployment，而其独特之处在于，它的每个 Pod 都被编号了。而且，这个编号会体现在 Pod 的名字和 hostname 等标识信息上，这不仅代表了 Pod 的创建顺序，也是 Pod 的重要网络标识
5. StatefulSet 的工作原理

- 首先，StatefulSet 的控制器直接管理的是 Pod
- 其次，Kubernetes 通过 Headless Service，为这些有编号的 Pod，在 DNS 服务器中生成带有同样编号的 DNS 记录
- 最后，StatefulSet 还为每一个 Pod 分配并创建一个同样编号的 PVC
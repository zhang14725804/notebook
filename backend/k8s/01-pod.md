### 容器化应用入门

1. 使用一种 API 对象（Deployment）管理另一种 API 对象（Pod）的方法，在 Kubernetes 中，叫作“控制器”模式（controller pattern）
2. kubectl describe
3. Volume,volumes,volumeMounts
4. metadata,spec


### Pod

1. Pod，是 Kubernetes 项目的原子调度单位
2. Namespace 做隔离，Cgroups 做限制，rootfs 做文件系统
3. 容器就像【进程】，Kubernetes就像【操作系统】
4. 容器的“单进程模型”，并不是指容器里只能运行“一个”进程，而是指容器没有管理多个进程的能力。
5. 成组调度的方式：资源囤积；乐观调度处理冲突

### Pod实现原理

1. pod只是一个逻辑概念
2. Kubernetes 真正处理的，还是宿主机操作系统上 Linux 容器的 Namespace 和 Cgroups，而并不存在一个所谓的 Pod 的边界或者隔离环境。
3. Pod，其实是一组共享了某些资源的容器。
4. Pod 里的所有容器，共享的是同一个 Network Namespace，并且可以声明共享同一个 Volume。
5. Infra容器
6. 在 Pod 中，所有 Init Container 定义的容器，都会比 spec.containers 定义的用户容器先启动。
7. sidecar
8. Pod，实际上是在扮演传统基础设施里“虚拟机”的角色；而容器，则是这个虚拟机里运行的用户程序。

### pod基本概念

1. Pod，而不是容器，才是 Kubernetes 项目中的最小编排单位
2. 到底哪些属性属于 Pod 对象，而又有哪些属性属于 Container 呢
3. Pod 扮演的是传统部署环境里“虚拟机”的角色。
4. 把 Pod 看成传统环境里的“机器”；把容器看作是运行在这个“机器”里的“用户程序”
5. 凡是调度、网络、存储，以及安全相关的属性，基本上是 Pod 级别的。例如：网卡，磁盘，防火墙，pod调度
6. Pod属性：nodeSelector，nodeName，hostAliases；shareProcessNamespace；hostNetwork,hostIPC,hostPID;
7. container属性: image,command,workingdir,ports,volumeMounts;ImagePullPolicy,Lifecycle
8. Pod 对象在 Kubernetes 中的生命周期: 【pending】,【Running】,【Succeeded】,【Failed】,【unknown】
9. pod.status.phase; Pod 对象的 Status 字段; Conditions
10. Pod 状态是 Ready，实际上不能提供服务的情况

### pod使用进阶

1. 有几种特殊的 Volume，它们存在的意义不是为了存放容器里的数据，也不是用来进行容器和宿主机之间的数据交换。这些特殊 Volume 的作用，是为容器提供预先定义好的数据。
2. Secret和ConfigMap，ConfigMap 保存的是不需要加密的、应用所需的配置信息
3. Downward API：让 Pod 里的容器能够直接获取到这个 Pod API 对象本身的信息。Downward API 能够获取到的信息，一定是 Pod 里的容器进程启动之前就能够确定下来的信息；想要获取 Pod 容器运行后才会出现的信息，需要定义sidecar
4. ServiceAccountToken
5. 容器健康检查livenessProbe
6. 容器恢复机制restartPolicy
7. PodPreset
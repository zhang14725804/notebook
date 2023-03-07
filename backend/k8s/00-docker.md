### docker & k8s历史

1. IaaS、PaaS缺点
2. Docker 镜像是直接由一个完整操作系统的所有文件和目录构成的，所以这个压缩包里的内容跟你本地开发和测试环境用的操作系统是完全一样的
3. docker其实只打包了文件系统，不包括操作系统内核
4. k8s由来

### docker

1. Namespace实现隔离
2. Cgroups做限制
3. Mount namespace+chroot
4. rootfs 只是一个操作系统所包含的文件、配置和目录，并不包括操作系统内核。
5. rootfs+UnionFS
6. 文件系统和操作系统什么关系呢，一个操作系统对应一个文件系统，同一镜像不能在不同内核宿主机中工作

Linux 容器的核心实现原理：**Linux Namespace 的隔离能力、Linux Cgroups 的限制能力，以及基于 rootfs 的文件系统**

### Dockerfile

1. FROM
2. WORKDIR
3. ADD
4. RUN
5. EXPOSE
6. ENV
7. COPY
8. ENTRYPOINT

### docker exec 是怎么做到进入容器里的呢？

一个进程，可以选择加入到某个进程已有的 Namespace 当中，从而达到“进入”这个进程所在容器的目的，这正是 docker exec 的实现原理。

### Volume（数据卷）

1. 容器里进程新建的文件，怎么才能让宿主机获取到？
2. 宿主机上的文件和目录，怎么才能让容器里的进程访问到？

Volume 机制，允许你将宿主机上指定的目录或者文件，挂载到容器里面进行读取和修改操作。

3. Docker 又是如何做到把一个宿主机上的目录或者文件，挂载到容器里面去呢？


## Kubernetes本质

### 何为容器

1. 容器本质：由 Linux Namespace、Linux Cgroups 和 rootfs 三种技术构建出来的进程的隔离环境
2. 正在运行的Linux容器分为：静态视图（一组联合挂载在 /var/lib/docker/aufs/mnt 上的 rootfs）和动态视图（由 Namespace+Cgroups 构成的隔离环境）两部分。

### k8s架构

1. Master：kube-apiserver、kube-scheduler、kube-controller-manager
2. Etcd
3. Node节点

### kubelet

1. kubelet 主要负责同容器运行时（比如 Docker 项目）打交道。依赖 CRI（Container Runtime Interface）
2. kubelet 通过 gRPC 协议同一个叫作 Device Plugin 的插件进行交互
3. kubelet 调用网络插件（CNI（Container Networking Interface））和存储插件（CSI（Container Storage Interface））为容器配置网络和持久化存储。

### k8s解决的痛点

1. 运行在大规模集群中的各种任务之间，实际上存在着各种各样的关系。这些关系的处理，才是作业编排和管理系统最困难的地方。
2. 应用运行的形态

### k8s核心设计理念

1. 首先，通过一个“编排对象”，比如 Pod、Job、CronJob 等，来描述你试图管理的应用；
2. 然后，再为它定义一些“服务对象”，比如 Service、Secret、Horizontal Pod Autoscaler（自动水平扩展器）等。

这些对象，会负责具体的平台级功能。这种使用方法，就是所谓的“声明式 API”。这种 API 对应的“编排对象”和“服务对象”，都是 Kubernetes 项目中的 API 对象（API Object）。
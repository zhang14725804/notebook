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
### Job

1. restartPolicy 在 Job 对象里只允许被设置为 Never 和 OnFailure；而在 Deployment 对象里，restartPolicy 则只允许被设置为 Always
2. 如果这个离线作业失败了要怎么办？ backoffLimit
3. 定义的 restartPolicy=OnFailure，那么离线作业失败后，Job Controller 就不会去尝试创建新的 Pod。但是，它会不断地尝试重启 Pod 里的容器
4. activeDeadlineSeconds

### Batch Job

1. parallelism
2. completions

### 使用 Job 对象的方法

1. 外部管理器 +Job 模板
2. 拥有固定任务数目的并行 Job
3. 指定并行度（parallelism），但不设置固定的 completions 的值

### CronJob

1. CronJob 是一个 Job 对象的控制器（Controller）
2. concurrencyPolicy，处理“某个 Job 还没有执行完，另外一个新 Job 就产生了”这种情况
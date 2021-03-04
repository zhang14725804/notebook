### 概览

### commitMutationEffects

commitMutationEffects会遍历effectList，对每个Fiber节点执行如下三个操作：

    根据ContentReset effectTag重置文字节点
    更新ref
    根据effectTag分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)


### Placement effect

### Update effect

- FunctionComponent mutation
- HostComponent mutation

### Deletion effect

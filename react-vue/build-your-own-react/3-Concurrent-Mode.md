此递归调用存在问题。

开始渲染后，直到渲染完完整的元素树后，我们才会停止。 如果元素树很大，则可能会阻塞主线程太长时间。 而且，如果浏览器需要执行诸如处理用户输入或使动画保持平滑等高优先级的工作，则它必须等到渲染完成为止。

因此，我们将工作分成几个小单元，在完成每个单元后，如果需要执行其他任何操作，我们将让浏览器中断渲染。

```bash
let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```
我们使用requestIdleCallback进行循环。 您可以将requestIdleCallback视为setTimeout，但浏览器将在主线程空闲时运行回调，而不是告诉我们何时运行。

requestIdleCallback还为我们提供了截止日期参数。 我们可以使用它来检查我们有多少时间，直到浏览器需要再次控制。

要开始使用循环，我们需要设置第一个工作单元，然后编写一个performUnitOfWork函数，该函数不仅执行工作，还返回下一个工作单元。
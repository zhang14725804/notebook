We are adding a new node to the dom each time we work on an element. And, remember, the browser could interrupt our work before we finish rendering the whole tree. In that case, the user will see an incomplete UI. And we don’t want that.

如何处理浏览器中断渲染的情况

Instead, we’ll keep track of the root of the fiber tree. We call it the work in progress root or wipRoot.
```bash
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  }
  // 
  nextUnitOfWork = wipRoot
}
​
let nextUnitOfWork = null
let wipRoot = null
```
And once we finish all the work (we know it because there isn’t a next unit of work) we commit the whole fiber tree to the dom.
```bash
function commitRoot() {
    // TODO add nodes to dom
}​
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
    }
    nextUnitOfWork = wipRoot
}​
let nextUnitOfWork = null
let wipRoot = null​
function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }​
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }​
    requestIdleCallback(workLoop)
}​
requestIdleCallback(workLoop)
```
We do it in the commitRoot function. Here we recursively append all the nodes to the dom.
```bash
function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}
​
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
```
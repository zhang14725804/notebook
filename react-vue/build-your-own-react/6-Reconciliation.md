So far we only added stuff to the dom, but what about updating or deleting nodes?

That’s what we are going to do now, we need to compare the elements we receive on the render function to the last fiber tree we commited to the dom.

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
So we need to save a reference to that “last fiber tree we commited to the dom” after we finish the commit. We call it currentRoot.

We also add the alternate property to every fiber. This property is a link to the old fiber, the fiber that we commited to the dom in the previous commit phase.
```bash
function performUnitOfWork(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }​
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null​
    while (index < elements.length) {
        const element = elements[index]​
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }​
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }​
        prevSibling = newFiber
        index++
    }​
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}
```

Here we will reconcile the old fibers with the new elements.
```bash
function reconcileChildren(wipFiber, elements) {
    let index = 0
    let prevSibling = null​
    while (index < elements.length) {
        const element = elements[index]​
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: wipFiber,
            dom: null,
        }​
        if (index === 0) {
            wipFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }​
        prevSibling = newFiber
        index++
    }
}
```

We iterate at the same time over the children of the old fiber (wipFiber.alternate) and the array of elements we want to reconcile.

If we ignore all the boilerplate needed to iterate over an array and a linked list at the same time, we are left with what matters most inside this while: oldFiber and element. **The element is the thing we want to render to the dom and the oldFiber is what we rendered the last time.**

We need to compare them to see if there’s any change we need to apply to the dom.

To compare them we use the type:

    if the old fiber and the new element have the same type, we can keep the dom node and just update it with the new props

    if the type is different and there is a new element, it means we need to create a new dom node

    and if the types are different and there is an old fiber, we need to remove the old node

Here React also uses keys, that makes a better reconciliation. For example, it detects when children change places in the element array.
```bash
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type
​
    if (sameType) {
      // TODO update the node
    }
    if (element && !sameType) {
      // TODO add this node
    }
    if (oldFiber && !sameType) {
      // TODO delete the oldFiber's node
    }
```

When the old fiber and the element have the same type, we create a new fiber keeping the dom node from the old fiber and the props from the element.

We also add a new property to the fiber: the effectTag. We’ll use this property later, during the commit phase.
```bash
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type
​
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
```

Then for the case where the element needs a new dom node we tag the new fiber with the PLACEMENT effect tag.
```bash
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }
```
And for the case where we need to delete the node, we don’t have a new fiber so we add the effect tag to the old fiber.

But when we commit the fiber tree to the dom we do it from the work in progress root, which doesn’t have the old fibers.
```bash
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
```
So we need an array to keep track of the nodes we want to remove.
```bash
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }
  deletions = []
  nextUnitOfWork = wipRoot
}
​
let nextUnitOfWork = null
let currentRoot = null
let wipRoot = null
let deletions = null
```
And then, when we are commiting the changes to the dom, we also use the fibers from that array.
```bash
function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}
```
Now, let’s change the commitWork function to handle the new effectTags.
```bash
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
If the fiber has a PLACEMENT effect tag we do the same as before, append the dom node to the node from the parent fiber.
```bash
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  }
```
If it’s a DELETION, we do the opposite, remove the child.
```bash
  if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)
  }
```
And if it’s an UPDATE, we need to update the existing dom node with the props that changed.
```bash
  if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  }
```
We’ll do it in this updateDom function.
```bash
function updateDom(dom, prevProps, nextProps) {
  // TODO
}
```
We compare the props from the old fiber to the props of the new fiber, remove the props that are gone, and set the props that are new or changed.

```bash
const isProperty = key => key !== "children"
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
​
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}
```
One special kind of prop that we need to update are event listeners, so if the prop name starts with the “on” prefix we’ll handle them differently.
```bash
const isEvent = key => key.startsWith("on")
const isProperty = key =>
  key !== "children" && !isEvent(key)
```
If the event handler changed we remove it from the node.
```bash
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })
```
And then we add the new handler.
```bash
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
```
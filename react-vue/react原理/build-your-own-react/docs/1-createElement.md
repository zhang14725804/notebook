#### createElement

```bash
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}
```


For example, createElement("div") returns:
```bash
{
  "type": "div",
  "props": { "children": [] }
}
```

createElement("div", null, a) returns:
```bash
{
  "type": "div",
  "props": { "children": [a] }
}
```
and createElement("div", null, a, b) returns:
```bash
{
  "type": "div",
  "props": { "children": [a, b] }
}
```

```bash
children: children.map(child =>
    typeof child === "object"
    ? child
    : createTextElement(child)
)
```

```bash
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
```
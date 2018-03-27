##组件和数据绑定

props可以添加类型验证 和 React中的PropsType类似

##slots

假如我们有一个程序实例，使用相同的组件 <app-child> 两次。在每个子组件内部，我们需要一些相同的内容以及不同的内容。对于要保持一致的内容，我们使用一个标准的 p 标签，而对于要切换的内容，我们放在空的 <slot></slot> 标签中

* slots 中也可以有默认内容。如果要在 slot 中写内容，而不是写 <slot></slot>，你可以这样填充：
```
<slot>I am some default text</slot>
```

* 你也可以使用具名 slot 。如果一个组件中有两个 slot， 可以通过添加 name 属性区分它们
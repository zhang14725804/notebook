一、初始化项目

1、构建项目

	create-react-app redux-secret
	cd redux-secret && cnpm install
	npm start

2、src目录下新建Header.js（头）、Content.js（内容）、ThemeSwitch.js（切换按钮）文件，修改index.js文件

二、结合 context 和 store

- 创建createStore和reducer用来生成store
- context如何使用
- 观察者模式subscribe，监听数据变化
- componentWillMount生命周期负责获取数据，监听变化
- 派发事件更改数据
	

三、connect 和 mapStateToProps

之前的问题

- 有大量重复的逻辑（高阶组件）
- 对 context 依赖性过强（Pure Component）

高阶组件起名字叫 connect，因为它把（Pure Component）组件和 context 连接（connect）起来

- Connect充当context和（Pure Component）组件之间的代理
- mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件

四、mapDispatchToProps

themeSwitch 除了需要 store 里面的数据以外，还需要 store 来 dispatch，，所以要改进connect

- 既然可以通过给 connect 函数传入 mapStateToProps 来告诉它如何获取、整合状态，我们也可以想到，可以给它传入另外一个参数来告诉它我们的组件需要如何触发 dispatch。我们把这个参数叫 mapDispatchToProps
- 和 mapStateToProps 一样，它返回一个对象，这个对象内容会同样被 connect 当作是 props 参数传给被包装的组件。不一样的是，这个函数不是接受 state 作为参数，而是 dispatch，你可以在返回的对象内部定义一些函数，这些函数会用到 dispatch 来触发特定的 action

五、Provider

我们要把 context 相关的代码从所有业务组件中清除出去，现在的代码里面还有一个地方是被污染的。那就是 src/index.js 里面的 Index

其实它要用 context 就是因为要把 store 存放到里面，好让子组件 connect 的时候能够取到 store。我们可以额外构建一个组件来做这种脏活，然后让这个组件成为组件树的根节点，那么它的子组件都可以获取到 context 了


这样做的意义是什么
**const {store} =this.context**

Header中this.state==null，什么原因，，改如何调试

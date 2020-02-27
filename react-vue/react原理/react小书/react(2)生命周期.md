1、挂载阶段（这是一个从无到有的过程）

	ReactDOM.render(
	 <Header />, 
	  document.getElementById('root')
	)

	//编译为
	ReactDOM.render(
	  React.createElement(Header, null), 
	  document.getElementById('root')
	)

	//具体过程
	// React.createElement 中实例化一个 Header
	const header = new Header(props, children)
	// React.createElement 中调用 header.render 方法渲染组件的内容
	const headerJsxObject = header.render()
	
	// ReactDOM 用渲染后的 JavaScript 对象来来构建真正的 DOM 元素
	const headerDOM = createDOMFromObject(headerJsxObject)
	// ReactDOM 把 DOM 元素塞到页面上
	document.getElementById('root').appendChild(headerDOM)

**React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载**

组件的挂载过程

	-> constructor()
	-> componentWillMount()
	-> render()
	// 然后构造 DOM 元素插入页面
	-> componentDidMount()
	// 即将从页面中删除
	-> componentWillUnmount()
	// 从页面中删除


2、挂载阶段方法的作用

一般来说，所有关于组件自身的状态的初始化工作都会放在 constructor 里面去做

一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 componentWillMount 里面进行

componentWillUnmount作用就是在组件销毁的时候，做这种清场的工作。例如清除该组件的定时器和其他的数据清理工作


3、更新阶段

就是 setState 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，这是一个组件的变化过程

- shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
- componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
- componentWillUpdate()：组件开始重新渲染之前调用。
- componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。
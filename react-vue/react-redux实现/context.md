context（相当于全局共享的状态）

1、为什么会有context

状态提升（就是vue中的$emit），子组件复杂的情况不好维护

特点：组件的 context 只有它的子组件能够访问，它的父组件是不能访问到的

- 如何使用

(1)如果你要给组件设置 context，那么 childContextTypes 是必写的

childContextTypes的作用其实 propsType 验证组件 props 参数的作用类似。不过它是验证 getChildContext 返回的对象

	  static childContextTypes = {
	    themeColor: PropTypes.string
	  }
	
	  constructor () {
	    super()
	    this.state = { themeColor: 'red' }
	  }
	  //设置 context 的过程，它返回的对象就是 context
	  getChildContext () {
	    return { themeColor: this.state.themeColor }
	  }

context::所有的子组件都可以访问到这个对象。我们用 this.state.themeColor 来设置了 context 里面的 themeColor

(2)子组件中

	  static contextTypes = {
	    themeColor: PropTypes.string
	  }

子组件要获取 context 里面的内容的话，就必须写 contextTypes 来声明和验证你需要获取的状态的类型，它也是必写的，如果你不写就无法获取 context 里面的状态

**总结**

一个组件可以通过 **getChildContext** 方法返回一个对象，这个对象就是子树的 context，提供 context 的组件必须提供 **childContextTypes** 作为 context 的声明和验证。

如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，它就像这个组件为根的子树的全局变量。任意深度的子组件都可以通过 **contextTypes** 来声明你想要的 context 里面的哪些状态，然后可以通过 **this.context** 访问到那些状态。

context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，每个组件都能够改 context 里面的内容会导致程序的运行不可预料
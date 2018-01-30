1、React.js 不是一个框架，它只是一个库。它只提供 UI （view）层面的解决方案。在实际的项目当中，它并不能解决我们所有的问题，需要结合其它的库，例如 Redux、React-router 等来协助提供完整的解决方法

**什么样的问题导致了我们需要前端页面进行组件化，前端页面的组件化需要解决什么样的问题**

- 一个组件的显示形态由多个状态决定的情况非常常见。代码中混杂着对 DOM 的操作其实是一种不好的实践，手动管理数据和 DOM 之间的关系会导致代码可维护性变差、容易出错。所以我们的例子这里还有优化的空间：如何尽量减少这种手动 DOM 操作

解决方案：一旦状态发生改变，就重新调用 render 方法，构建一个新的 DOM 元素(你只要调用 setState，组件就会重新渲染)。。然而，还要重新插入新的 DOM 元素，这个组件外面，你需要知道这个组件发生了改变，并且把新的 DOM 元素更新到页面当中

    setState (state) {
		this.state = state
   		this.el = this.render()
	}

    setState (state) {
      const oldEl = this.el
      this.state = state
      this.el = this.render()
      if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }
	//使用组件的时候
	const likeButton = new LikeButton()
	wrapper.appendChild(likeButton.render()) // 第一次插入 DOM 元素
	likeButton.onStateChange = (oldEl, newEl) => {
	  wrapper.insertBefore(newEl, oldEl) // 插入新的元素
	  wrapper.removeChild(oldEl) // 删除旧的元素
	}

这里每次 setState 都会调用 onStateChange 方法，而这个方法是实例化以后时候被设置的，所以你可以自定义 onStateChange 的行为。这里做的事是，每当 setState 中构造完新的 DOM 元素以后，就会通过 onStateChange 告知外部插入新的 DOM 元素，然后删除旧的元素，页面就更新了。这里已经做到了进一步的优化了：现在不需要再手动更新页面了

如果我要重新另外做一个新组件，譬如说评论组件，那么里面的这些 setState 方法要重新写一遍，其实这些东西都可以抽出来，变成一个通用的模式

    class Component {
	    setState (state) {
	      const oldEl = this.el
	      this.state = state
	      this._renderDOM()
	      if (this.onStateChange) this.onStateChange(oldEl, this.el)
	    }
	
	    _renderDOM () {
	      this.el = createDOMFromString(this.render())
	      if (this.onClick) {
	        this.el.addEventListener('click', this.onClick.bind(this), false)
	      }
	      return this.el
	    }
  	}
这个是一个组件父类 Component，所有的组件都可以继承这个父类来构建。它定义的两个方法，一个是我们已经很熟悉的 setState；一个是私有方法 _renderDOM。**_renderDOM 方法会调用 this.render 来构建 DOM 元素并且监听 onClick 事件**。所以，组件子类继承的时候只需要实现一个返回 HTML 字符串的 render 方法就可以了。

还有一个额外的 mount 的方法，其实就是把组件的 DOM 元素插入页面，并且在 setState 的时候更新页面

    const mount = (component, wrapper) => {
		wrapper.appendChild(component._renderDOM())
	    component.onStateChange = (oldEl, newEl) => {
	      wrapper.insertBefore(newEl, oldEl)
	      wrapper.removeChild(oldEl)
	    }
	 }

在实际开发当中，你可能需要给组件传入一些自定义的配置数据。例如说想配置一下点赞按钮的背景颜色，如果我给它传入一个参数，告诉它怎么设置自己的颜色。那么这个按钮的定制性就更强了。所以我们可以给组件类和它的子类都传入一个参数 props，作为组件的配置参数。修改 Component 的构造函数为

    constructor (props = {}) {
      this.props = props
    }

继承的时候通过 super(props) 把 props 传给父类，这样就可以通过 this.props 获取到配置参数


组件化的目的：：

组件化可以帮助我们解决前端结构的复用性问题，整个页面可以由这样的不同的组件组合、嵌套构成。

一个组件有自己的显示形态（上面的 HTML 结构和内容）行为，组件的显示形态和行为可以由数据状态（state）和配置参数（props）共同决定。数据状态和配置参数的改变都会影响到这个组件的显示形态。

当数据变化的时候，组件的显示需要更新。所以如果组件化的模式能提供一种高效的方式自动化地帮助我们更新页面，那也就可以大大地降低我们代码的复杂度，带来更好的可维护性。
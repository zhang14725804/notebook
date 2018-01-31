**connect 和 mapStateToProps**

之前代码存在的问题

- 有大量重复的逻辑：它们基本的逻辑都是，取出 context，取出里面的 store，然后用里面的状态设置自己的状态，这些代码逻辑其实都是相同的。
- 对 context 依赖性过强：这些组件都要依赖 context 来取数据，使得这个组件复用性基本为零。想一下，如果别人需要用到里面的 ThemeSwitch 组件，但是他们的组件树并没有 context 也没有 store，他们没法用这个组件了。

1、重复逻辑问题：可以把一些可复用的逻辑放在高阶组件当中，高阶组件包装的新组件和原来组件之间通过 props 传递信息，减少代码的重复程度

2、如果一个组件的渲染只依赖于外界传进去的 props 和自己的 state，而并不依赖于其他的外界的任何数据，也就是说像纯函数一样，给它什么，它就吐出（渲染）什么出来。这种组件的复用性是最强的，别人使用的时候根本不用担心任何事情，只要看看 PropTypes 它能接受什么参数，然后把参数传进去控制它就行了

我们把这种组件叫做 Pure Component，因为它就像纯函数一样，可预测性非常强，对参数（props）以外的数据零依赖，也不产生副作用。这种组件也叫 Dumb Component，因为它们呆呆的，让它干啥就干啥。写组件的时候尽量写 Dumb Component 会提高我们的组件的可复用性。

我们需要高阶组件帮助我们从 context 取数据，我们也需要写 Dumb 组件帮助我们提高组件的复用性。所以我们尽量多地写 Dumb 组件，然后用高阶组件把它们包装一层，高阶组件和 context 打交道，把里面数据取出来通过 props 传给 Dumb 组件

我们把这个高阶组件起名字叫 connect，因为它把 Dumb 组件和 context 连接（connect）起来了

	export connect = (WrappedComponent) => {
	  class Connect extends Component {
	    static contextTypes = {
	      store: PropTypes.object
	    }
	
	    // TODO: 如何从 store 取数据？
	
	    render () {
	      return <WrappedComponent />
	    }
	  }
	
	  return Connect
	}

connect 函数接受一个组件 WrappedComponent 作为参数，把这个组件包含在一个新的组件 Connect 里面，Connect 会去 context 里面取出 store。现在要把 store 里面的数据取出来通过 props 传给 WrappedComponent。

但是每个传进去的组件需要 store 里面的数据都不一样的，所以除了给高阶组件传入 Dumb 组件以外，还需要告诉高级组件我们需要什么数据，高阶组件才能正确地去取数据。为了解决这个问题，我们可以给高阶组件传入类似下面这样的函数：

	const mapStateToProps = (state) => {
	  return {
	    themeColor: state.themeColor,
	    themeName: state.themeName,
	    fullName: `${state.firstName} ${state.lastName}`
	    ...
	  }
	}

这个函数会接受 store.getState() 的结果作为参数，然后返回一个对象，这个对象是根据 state 生成的。mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件

	export const connect = (mapStateToProps) => (WrappedComponent) => {
	  class Connect extends Component {
	    static contextTypes = {
	      store: PropTypes.object
	    }
	
	    render () {
	      const { store } = this.context
	      let stateProps = mapStateToProps(store.getState())
	      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
	      return <WrappedComponent {...stateProps} />
	    }
	  }
	
	  return Connect
	}

connect 现在是接受一个参数 mapStateToProps，然后返回一个函数，这个返回的函数才是高阶组件。它会接受一个组件作为参数，然后用 Connect 把组件包装以后再返回。 connect 的用法是：
	
	const mapStateToProps = (state) => {
	  return {
	    themeColor: state.themeColor
	  }
	}
	Header = connect(mapStateToProps)(Header)

为什么不直接 const connect = (mapStateToProps, WrappedComponent)，而是要额外返回一个函数

	class Header extends Component {
	  static propTypes = {
	    themeColor: PropTypes.string
	  }
	
	  render () {
	    return (
	      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
	    )
	  }
	}
	
	const mapStateToProps = (state) => {
	  return {
	    themeColor: state.themeColor
	  }
	}
	Header = connect(mapStateToProps)(Header)
	
	export default Header

可以看到 Header 删掉了大部分关于 context 的代码，它除了 props 什么也不依赖，它是一个 Pure Component，然后通过 connect 取得数据。我们不需要知道 connect 是怎么和 context 打交道的，只要传一个 mapStateToProps 告诉它应该怎么取数据就可以了

onnect 还没有监听数据变化然后重新渲染，所以现在点击按钮只有按钮会变颜色。我们给 connect 的高阶组件增加监听数据变化重新渲染的逻辑，稍微重构一下 connect

	export const connect = (mapStateToProps) => (WrappedComponent) => {
	  class Connect extends Component {
	    static contextTypes = {
	      store: PropTypes.object
	    }
	
	    constructor () {
	      super()
	      this.state = { allProps: {} }
	    }
	
	    componentWillMount () {
	      const { store } = this.context
	      this._updateProps()
	      store.subscribe(() => this._updateProps())
	    }
	
	    _updateProps () {
	      const { store } = this.context
	      let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
	      this.setState({
	        allProps: { // 整合普通的 props 和从 state 生成的 props
	          ...stateProps,
	          ...this.props
	        }
	      })
	    }
	
	    render () {
	      return <WrappedComponent {...this.state.allProps} />
	    }
	  }
	
	  return Connect
	}

我们在 Connect 组件的 constructor 里面初始化了 state.allProps，它是一个对象，用来保存需要传给被包装组件的所有的参数。生命周期 componentWillMount 会调用调用 _updateProps 进行初始化，然后通过 store.subscribe 监听数据变化重新调用 _updateProps。

为了让 connect 返回新组件和被包装的组件使用参数保持一致，我们会把所有传给 Connect 的 props 原封不动地传给 WrappedComponent。所以在 _updateProps 里面会把 stateProps 和 this.props 合并到 this.state.allProps 里面，再通过 render 方法把所有参数都传给 WrappedComponent。

mapStateToProps 也发生点变化，它现在可以接受两个参数了，我们会把传给 Connect 组件的 props 参数也传给它，那么它生成的对象配置性就更强了，我们可以根据 store 里面的 state 和外界传入的 props 生成我们想传给被包装组件的参数。
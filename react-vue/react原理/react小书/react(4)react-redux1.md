1、状态提升

前端中应用的状态存在的问题：一个状态可能被多个组件依赖或者影响，而 React.js 并没有提供好的解决方案，我们只能把状态提升到依赖或者影响这个状态的所有组件的公共父组件上，我们把这种行为叫做状态提升。但是需求不停变化，共享状态没完没了地提升也不是办法。

2、context

我们可用把共享状态放到父组件的 context 上，这个父组件下所有的组件都可以从 context 中直接获取到状态而不需要一层层地进行传递了。但是直接从 context 里面存放、获取数据增强了组件的耦合性；并且所有组件都可以修改 context 里面的状态就像谁都可以修改共享状态一样，导致程序运行的不可预料

3、结合store和context

把 context 和 store 结合起来？毕竟 store 的数据不是谁都能修改，而是约定只能通过 dispatch 来进行修改，这样的话每个组件既可以去 context 里面获取 store 从而获取状态，又不用担心它们乱改数据了

themeReducer 定义了一个表示主题色的状态 themeColor，并且规定了一种操作 CHNAGE_COLOR，只能通过这种操作修改颜色。现在我们把 store 放到 Index 的 context 里面，这样每个子组件都可以获取到 store 了

	//store.js
	function createStore (reducer) {
	  let state = null
	  const listeners = []
	  const subscribe = (listener) => listeners.push(listener)
	  const getState = () => state
	  const dispatch = (action) => {
	    state = reducer(state, action)
	    listeners.forEach((listener) => listener())
	  }
	  dispatch({}) // 初始化 state
	  return { getState, dispatch, subscribe }
	}
	
	const themeReducer = (state, action) => {
	  if (!state) return {
	    themeColor: 'red'
	  }
	  switch (action.type) {
	    case 'CHANGE_COLOR':
	      return { ...state, themeColor: action.themeColor }
	    default:
	      return state
	  }
	}
	
	const store = createStore(themeReducer)

	
	//index.js
	class Index extends Component {
	  static childContextTypes = {
	    store: PropTypes.object
	  }
	
	  getChildContext () {
	    return { store }
	  }
	
	  render () {
	    return (
	      <div>
	        <Header />
	        <Content />
	      </div>
	    )
	  }
	}


	//ThemeSwitch.js
	class ThemeSwitch extends Component {
	  static contextTypes = {
	    store: PropTypes.object
	  }
	
	  constructor () {
	    super()
	    this.state = { themeColor: '' }
	  }
	
	  componentWillMount () {
	    const { store } = this.context
    	this._updateThemeColor()
    	store.subscribe(() => this._updateThemeColor())
	  }
	
	  _updateThemeColor () {
	    const { store } = this.context
		//监听数据变化重新渲染
	    const state = store.getState()
	    this.setState({ themeColor: state.themeColor })
	  }
	
	  // dispatch action 去改变颜色
	  handleSwitchColor (color) {
	    const { store } = this.context
	    store.dispatch({
	      type: 'CHANGE_COLOR',
	      themeColor: color
	    })
	  }
	
	  render () {
	    return (
	      <div>
	        <button
	          style={{ color: this.state.themeColor }}
	          onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
	        <button
	          style={{ color: this.state.themeColor }}
	          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
	      </div>
	    )
	  }
	}

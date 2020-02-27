**reducer**

合并appState 和 stateChanger

	function stateChanger (state, action) {
	  if (!state) {
	    return {
	      title: {
	        text: 'React.js 小书',
	        color: 'red',
	      },
	      content: {
	        text: 'React.js 小书内容',
	        color: 'blue'
	      }
	    }
	  }
	  switch (action.type) {
	    case 'UPDATE_TITLE_TEXT':
	      return {
	        ...state,
	        title: {
	          ...state.title,
	          text: action.text
	        }
	      }
	    case 'UPDATE_TITLE_COLOR':
	      return {
	        ...state,
	        title: {
	          ...state.title,
	          color: action.color
	        }
	      }
	    default:
	      return state
	  }
	}

stateChanger 现在既充当了获取初始化数据的功能，也充当了生成更新数据的功能。如果有传入 state 就生成更新数据，否则就是初始化数据。这样我们可以优化 createStore 成一个参数，因为 state 和 stateChanger 合并到一起了

	function createStore (stateChanger) {
	  let state = null
	  const listeners = []
	  const subscribe = (listener) => listeners.push(listener)
	  const getState = () => state
	  const dispatch = (action) => {
	    state = stateChanger(state, action)
	    listeners.forEach((listener) => listener())
	  }
	  dispatch({}) // 初始化 state
	  return { getState, dispatch, subscribe }
	}

createStore 内部的 state 不再通过参数传入，而是一个局部变量 let state = null。createStore 的最后会手动调用一次 dispatch({})，dispatch 内部会调用 stateChanger，这时候的 state 是 null，所以这次的 dispatch 其实就是初始化数据了。createStore 内部第一次的 dispatch 导致 state 初始化完成，后续外部的 dispatch 就是修改数据的行为了

**stateChanger有一个通用的名字：reducer**

createStore 接受一个叫 reducer 的函数作为参数，这个函数规定是一个纯函数，它接受两个参数，一个是 state，一个是 action。

如果没有传入 state 或者 state 是 null，那么它就会返回一个初始化的数据。如果有传入 state 的话，就会根据 action 来“修改“数据，但其实它没有、也规定不能修改 state，而是要通过上节所说的把修改路径的对象都复制一遍，然后产生一个新的对象返回。如果它不能识别你的 action，它就不会产生新的数据，而是（在 default 内部）把 state 原封不动地返回。

reducer 是不允许有副作用的。你不能在里面操作 DOM，也不能发 Ajax 请求，更不能直接修改 state，它要做的仅仅是 —— 初始化和计算新的 state。

现在我们可以用这个 createStore 来构建不同的 store 了，只要给它传入符合上述的定义的 reducer

	function themeReducer (state, action) {
	  if (!state) return {
	    themeName: 'Red Theme',
	    themeColor: 'red'
	  }
	  switch (action.type) {
	    case 'UPATE_THEME_NAME':
	      return { ...state, themeName: action.themeName }
	    case 'UPATE_THEME_COLOR':
	      return { ...state, themeColor: action.themeColor }
	    default:
	      return state
	  }
	}
	
	const store = createStore(themeReducer)
**reducer**

 appState 和 stateChanger 可以合并到一起去

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

- 我们给 stateChanger 这个玩意起一个通用的名字：reducer
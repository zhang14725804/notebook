**“模块（组件）之间需要共享数据”，和“数据可能被任意修改导致不可预料的结果”之间的矛盾。**

一、appState共享数据，dispatch函数负责数据修改

所有对数据的操作必须通过 dispatch 函数。它接受一个参数 action，这个 action 是一个普通的 JavaScript 对象，里面必须包含一个 type 字段来声明你到底想干什么。dispatch 在 swtich 里面会识别这个 type 字段，能够识别出来的操作才会执行对 appState 的修改

二、抽离 store 和监控数据变化

（1）抽离出 store

把appState和dispatch集中到一个地方，给这个地方起个名字叫做 store，然后构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合，这样别的 App 也可以用这种模式了

	let appState = {
	  title: {
	    text: 'React.js 小书',
	    color: 'red',
	  },
	  content: {
	    text: 'React.js 小书内容',
	    color: 'blue'
	  }
	}
	
	function stateChanger (state, action) {
	  switch (action.type) {
	    case 'UPDATE_TITLE_TEXT':
	      state.title.text = action.text
	      break
	    case 'UPDATE_TITLE_COLOR':
	      state.title.color = action.color
	      break
	    default:
	      break
	  }
	}
	
	function createStore (state, stateChanger) {
	  const getState = () => state
	  const dispatch = (action) => stateChanger(state, action)
	  return { getState, dispatch }
	}

createStore 接受两个参数，一个是表示应用程序状态的 state；另外一个是 stateChanger，它来描述应用程序状态会根据 action 发生什么变化，其实就是相当于本节开头的 dispatch 代码里面的内容。

createStore 会返回一个对象，这个对象包含两个方法 getState 和 dispatch。getState 用于获取 state 数据，其实就是简单地把 state 参数返回。

dispatch 用于修改数据，和以前一样会接受 action，然后它会把 state 和 action 一并传给 stateChanger，那么 stateChanger 就可以根据 action 来修改 state 了。

（2）监控数据变化（观察者模式）

每次通过 dispatch 修改数据的时候，其实只是数据发生了变化，如果我们不手动调用 renderApp，页面上的内容是不会发生变化的。但是我们总不能每次 dispatch 的时候都手动调用一下 renderApp，我们肯定希望数据变化的时候程序能够智能一点地自动重新渲染数据，而不是手动调用

	function createStore (state, stateChanger) {
	  const listeners = []
	  const subscribe = (listener) => listeners.push(listener)
	  const getState = () => state
	  const dispatch = (action) => {
	    stateChanger(state, action)
	    listeners.forEach((listener) => listener())
	  }
	  return { getState, dispatch, subscribe }
	}


我们在 createStore 里面定义了一个数组 listeners，还有一个新的方法 subscribe，可以通过 store.subscribe(listener) 的方式给 subscribe 传入一个监听函数，这个函数会被 push 到数组当中。

我们修改了 dispatch，每次当它被调用的时候，除了会调用 stateChanger 进行数据的修改，还会遍历 listeners 数组里面的函数，然后一个个地去调用。相当于我们可以通过 subscribe 传入数据变化的监听函数，每当 dispatch 的时候，监听函数就会被调用，这样我们就可以在每当数据变化时候进行重新渲染

	const store = createStore(appState, stateChanger)
	store.subscribe(() => renderApp(store.getState()))
	
	renderApp(store.getState()) // 首次渲染页面
	store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
	store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
	// ...后面不管如何 store.dispatch，都不需要重新调用 renderApp

我们只需要 subscribe 一次，后面不管如何 dispatch 进行修改数据，renderApp 函数都会被重新调用，页面就会被重新渲染。这样的订阅模式还有好处就是，以后我们还可以拿同一块数据来渲染别的页面，这时 dispatch 导致的变化也会让每个页面都重新渲染
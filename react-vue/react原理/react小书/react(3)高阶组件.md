1、什么是高阶组件（类似于vue中的mixin）：：装饰者模式

**高阶组件就是一个函数，传给它一个组件，它返回一个新的组件**

2、高阶组件的作用

高阶组件的作用其实不言而喻，其实就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。高阶组件内部的包装组件和被包装组件之间通过 props 传递数据

	//wrapWithLoadData.js
	export default (WrappedComponent, name) => {
	  class NewComponent extends Component {
	    constructor () {
	      super()
	      this.state = { data: null }
	    }
	
	    componentWillMount () {
	      let data = localStorage.getItem(name)
	      this.setState({ data })
	    }
	
	    render () {
	      return <WrappedComponent data={this.state.data} />
	    }
	  }
	  return NewComponent
	}
	
	//如何使用
	import wrapWithLoadData from './wrapWithLoadData'

	class InputWithUserName extends Component {
	  render () {
	    return <input value={this.props.data} />
	  }
	}
	
	InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
	export default InputWithUserName

对于 InputWithUserName 和 TextareaWithContent 这两个组件来说，它们的需求有着这么一个相同的逻辑：“挂载阶段从 LocalStorage 中加载特定字段数据”。

如果按照之前的做法，我们需要给它们两个都加上 componentWillMount 生命周期，然后在里面调用 LocalStorage。要是有第三个组件也有这样的加载逻辑，我又得写一遍这样的逻辑。但有了 wrapWithLoadData 高阶组件，我们把这样的逻辑用一个组件包裹了起来，并且通过给高阶组件传入 name 来达到不同字段的数据加载。充分复用了逻辑代码

3、多层高阶组件

假如现在需求有变化了：我们需要先从 LocalStorage 中加载数据，再用这个数据去服务器取数据

	import wrapWithLoadData from './wrapWithLoadData'
	import wrapWithAjaxData from './wrapWithAjaxData'
	
	class InputWithUserName extends Component {
	  render () {
	    return <input value={this.props.data} />
	  }
	}
	
	InputWithUserName = wrapWithAjaxData(InputWithUserName)
	InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
	export default InputWithUserName
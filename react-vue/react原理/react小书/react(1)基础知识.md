1、一个helloworld

    import React, { Component } from 'react'
	import ReactDOM from 'react-dom'
	import './index.css'
	
	class Header extends Component {
	  render () {
	    return (
	      <div>
	        <h1>React 小书</h1>
	      </div>
	    )
	  }
	}
	
	ReactDOM.render(
	  <Header />,
	  document.getElementById('root')
	)

- 为什么不把ReactDOM包含在 react 包当中呢

2、JSX原理

每个 DOM 元素的结构都可以用 JavaScript 的对象来表示。一个 DOM 元素包含的信息其实只有三个：**标签名，属性，子元素**

    <div class='box' id='content'>
	  <div class='title'>Hello</div>
	  <button>Click</button>
	</div>
	//用javascript表示为
	{
	  tag: 'div',
	  attrs: { className: 'box', id: 'content'},
	  children: [
	    {
	      tag: 'div',
	      arrts: { className: 'title' },
	      children: ['Hello']
	    },
	    {
	      tag: 'button',
	      attrs: null,
	      children: ['Click']
	    }
	  ]
	}

用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构
	
	//helloworld编译之后
    class Header extends Component {
	  render () {
	    return (
	     React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "h1",
	          { className: 'title' },
	          "React 小书"
	        )
	      )
	    )
	  }
	}

React.createElement 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的 JavaScript 代码了。所以使用 React 和 JSX 的时候一定要经过编译的过程

**所谓的 JSX 其实就是 JavaScript 对象**

- 为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？

第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。

第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。


3、render方法

一个组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素。但这里要注意的是，必须要用一个外层的 JSX 元素把所有内容包裹起来

- 表达式插入

在 JSX 当中你可以插入 JavaScript 的表达式，表达式返回的结果会相应地渲染到页面上。表达式用 {} 包裹。{} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等

直接使用 class 在 React.js 的元素上添加类名如 <div class=“xxx”> 这种方式是不合法的。因为 class 是 JavaScript 的关键字，所以 React.js 中定义了一种新的方式：className 来帮助我们给元素添加类名

还有一个特例就是 for 属性，例如 <label for='male'>Male</label>，因为 for 也是 JavaScript 的关键字，所以在 JSX 用 htmlFor 替代，即 <label htmlFor='male'>Male</label>。而其他的 HTML 属性例如 style 、data-* 等就可以像普通的 HTML 属性那样直接添加上去

如果你在表达式插入里面返回 null ，那么 React.js 会什么都不显示，相当于忽略了该表达式插入。结合条件返回的话，我们就做到显示或者隐藏某些元素

	//条件渲染
    render () {
	  const isGoodWord = true
	  return (
	    <div>
	      <h1>
	        React 小书
	        {isGoodWord
	          ? <strong> is good</strong>
	          : <span> is not good</span>
	        }
	      </h1>
	    </div>
	  )
	}
	//隐藏元素
	render () {
	  const isGoodWord = true
	  return (
	    <div>
	      <h1>
	        React 小书
	        {isGoodWord
	          ? <strong> is good</strong>
	          : null
	        }
	      </h1>
	    </div>
	  )
	}

- JSX 元素变量

同样的，如果你能理解 JSX 元素就是 JavaScript 对象。那么你就可以联想到，JSX 元素其实可以像 JavaScript 对象那样自由地赋值给变量，或者作为函数参数传递、或者作为函数的返回值
	
	//这个用的精妙
    renderGoodWord (goodWord, badWord) {
	  const isGoodWord = true
	  return isGoodWord ? goodWord : badWord
	}
	
	render () {
	  return (
	    <div>
	      <h1>
	        React 小书
	        {this.renderGoodWord(
	          <strong> is good</strong>,
	          <span> is not good</span>
	        )}
	      </h1>
	    </div>
	  )
	}
- 这里我们定义了一个 renderGoodWord 函数，这个函数接受两个 JSX 元素作为参数，并且随机返回其中一个。在 render 方法中，我们把上面例子的两个 JSX 元素传入 renderGoodWord 当中，通过表达式插入把该函数返回的 JSX 元素插入到页面上（条件渲染）


4、组件的组合、嵌套和组件树

- 理解组件树的概念对后面理解数据是如何在组件树内自上往下流动过程很重要


5、事件监听

给需要监听事件的元素加上属性类似于 onClick、onKeyDown 这样的属性

在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听

- 事件属性名都必须要用驼峰命名法
- 这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上

（1）event对象

React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性。这个 event 对象是符合 W3C 标准（ W3C UI Events ）的，它具有类似于event.stopPropagation、event.preventDefault 这种常用的方法

（2）事件中的this

如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js（React.js 的事件监听方法需要手动 bind 到当前实例）


6、state和setState

- state

组件的显示形态是可以由它数据状态和配置参数决定的。一个组件可以拥有自己的状态。state用来存储这种可变化的状态

- setState（接受对象参数和函数参数）

当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上

当我们要改变组件的状态的时候，不能直接用 this.state = xxx 这种方式来修改，如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面。所以，一定要使用 React.js 提供的 setState 方法，它接受一个对象或者函数作为参数

- 当调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新（为什么要这样呢）

React.js 的 setState 把你的传进来的状态缓存起来，稍后才会帮你更新到 state 上，
所以如果你想在 setState 之后使用新的 state 来做后续运算就做不到了

setState可以接受一个函数作为参数。React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象


	handleClickOnLikeButton () {
	    this.setState((prevState) => {
	    	return { count: 0 }
	    })
	    this.setState((prevState) => {
	        // 上一个 setState 的返回是 count 为 0，当前返回 1
			return { count: prevState.count + 1 } 
	    })
	    this.setState((prevState) => {
			// 上一个 setState 的返回是 count 为 1，当前返回 3
	    	return { count: prevState.count + 2 } 
	    })
	}

这样就可以达到上述的利用上一次 setState 结果进行运算的效果

上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件

7、props

组件是相互独立、可复用的单元，一个组件可能在不同地方被用到。但是在不同的场景下对这个组件的需求可能会根据情况有所不同。React.js 的 props 就可以帮助我们达到这个效果

    class LikeButton extends Component {
	  constructor () {
	    super()
	    this.state = { isLiked: false }
	  }
	
	  handleClickOnLikeButton () {
	    this.setState({
	      isLiked: !this.state.isLiked
	    })
	  }
	
	  render () {
	    const likedText = this.props.likedText || '取消'
	    const unlikedText = this.props.unlikedText || '点赞'
	    return (
	      <button onClick={this.handleClickOnLikeButton.bind(this)}>
	        {this.state.isLiked ? likedText : unlikedText} 👍
	      </button>
	    )
	  }
	}

组件内部是通过 this.props 的方式获取到组件的参数的，如果 this.props 里面有需要的属性我们就采用相应的属性，没有的话就用默认的属性。

（1）那么怎么把 props 传进去呢？在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值

（2）前面说过，JSX 的表达式插入可以在标签属性上使用。所以其实可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等

	<LikeButton wordings={{likedText: '已赞', unlikedText: '赞'}} />

甚至可以往组件内部传入函数作为参数

    class Index extends Component {
	  render () {
	    return (
	      <div>
	        <LikeButton
	          wordings={{likedText: '已赞', unlikedText: '赞'}}
	          onClick={() => console.log('Click on like button!')}/>
	      </div>
	    )
	  }
	}
这样可以通过 this.props.onClick 获取到这个传进去的函数

（3）设置defaultProps

	static defaultProps = {
	    likedText: '取消',
	    unlikedText: '点赞'
	}
defaultProps 作为点赞按钮组件的类属性，里面是对 props 中各个属性的默认配置。这样我们就不需要判断配置属性是否传进来了：如果没有传进来，会直接使用 defaultProps 中的默认属性。 所以可以看到，在 render 函数中，我们会直接使用 this.props 而不需要再做判断

（4）props不可变（props 一旦传入进来就不能改变）

Cannot assign to read only property 'likedText' of object '#<Object>'

不能改变一个组件被渲染的时候传进来的 props。React.js 希望一个组件在输入确定的 props 的时候，能够输出确定的 UI 显示形态。如果 props 渲染过程中可以被修改，那么就会导致这个组件显示形态和行为变得不可预测，这样会可能会给组件使用者带来困惑

但这并不意味着由 props 决定的显示形态不能被修改。组件的使用者可以主动地通过重新渲染的方式把新的 props 传入组件当中，这样这个组件中由 props 决定的显示形态也会得到相应的改变

    class Index extends Component {
	  constructor () {
	    super()
	    this.state = {
	      likedText: '已赞',
	      unlikedText: '赞'
	    }
	  }
	
	  handleClickOnChange () {
	    this.setState({
	      likedText: '取消',
	      unlikedText: '点赞'
	    })
	  }
	
	  render () {
	    return (
	      <div>
	        <LikeButton
	          likedText={this.state.likedText}
	          unlikedText={this.state.unlikedText} />
	        <div>
	          <button onClick={this.handleClickOnChange.bind(this)}>
	            修改 wordings
	          </button>
	        </div>
	      </div>
	    )
	  }
	}
在这里，我们把 Index 的 state 中的 likedText 和 unlikedText 传给 LikeButton 。Index 还有另外一个按钮，点击这个按钮会通过 setState 修改 Index 的 state 中的两个属性。

由于 setState 会导致 Index 重新渲染，所以 LikedButton 会接收到新的 props，并且重新渲染，于是它的显示形态也会得到更新。这就是通过重新渲染的方式来传入新的 props 从而达到修改 LikedButton 显示形态的效果

- props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果

8、state和props

**state 是让组件控制自己的状态，props 是让外部对组件自己进行配置**

没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性

函数式组件

	const HelloWorld = (props) => {
	  const sayHi = (event) => alert('Hello World')
	  return (
	    <div onClick={sayHi}>Hello World</div>
	  )
	}


9、渲染列表数据

（1）渲染存放 JSX 元素的数组

	const users = [
	  { username: 'Jerry', age: 21, gender: 'male' },
	  { username: 'Tomy', age: 22, gender: 'male' },
	  { username: 'Lily', age: 19, gender: 'female' },
	  { username: 'Lucy', age: 20, gender: 'female' }
	]
现在要把这个数组里面的数据渲染页面上要怎么做？开始之前要补充一个知识。之前说过 JSX 的表达式插入 {} 里面可以放任何数据，如果我们往 {} 里面放一个存放 JSX 元素的数组会怎么样。。如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来

（2）使用 map 渲染列表数据

循环上面用户数组里面的每一个用户，为每个用户数据构建一个 JSX，然后把 JSX 放到一个新的数组里面，再把新的数组插入 render 方法的 JSX 里面

	const users = [
	  { username: 'Jerry', age: 21, gender: 'male' },
	  { username: 'Tomy', age: 22, gender: 'male' },
	  { username: 'Lily', age: 19, gender: 'female' },
	  { username: 'Lucy', age: 20, gender: 'female' }
	]
	
	class User extends Component {
	  render () {
	    const { user } = this.props
	    return (
	      <div>
	        <div>姓名：{user.username}</div>
	        <div>年龄：{user.age}</div>
	        <div>性别：{user.gender}</div>
	        <hr />
	      </div>
	    )
	  }
	}
	
	class Index extends Component {
	  render () {
	    return (
	      <div>
	        {users.map((user) => <User user={user} />)}
	      </div>
	    )
	  }
	}
	
	ReactDOM.render(
	  <Index />,
	  document.getElementById('root')
	)

- 对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识

React.js 的是非常高效的，它高效依赖于所谓的 Virtual-DOM 策略。简单来说，能复用的话 React.js 就会尽量复用，没有必要的话绝对不碰 DOM。对于列表元素来说也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在一个列表中改变位置，这就是key的作用

10、DOM操作和ref（Vue中的ref，获取的时候$.refs.name）

	class AutoFocusInput extends Component {
	  componentDidMount () {
	    this.input.focus()
	  }
	
	  render () {
	    return (
	      <input ref={(input) => this.input = input} />
	    )
	  }
	}
	
	ReactDOM.render(
	  <AutoFocusInput />,
	  document.getElementById('root')
	)


11、props.children 和容器类组件（类似于vue中的slot插槽）

12、dangerouslySetHTML（类似于vue中的v-html）：：设置 innerHTML 可能会导致跨站脚本攻击

	dangerouslySetInnerHTML={{__html: this.state.content}}


13、PropTypes 和组件参数验证，给组件的配置参数加上类型验证（类似于java中的泛型吧）

可以通过 isRequired 关键字来强制组件某个参数必须传入

	static propTypes = {
	  comment: PropTypes.object.isRequired
	}
propTypes 帮我们指定了参数类型，但是并没有说这个参数一定要传入，事实上，这些参数默认都是可选的。可选参数我们可以通过配置 defaultProps，让它在不传入的时候有默认值。但是我们这里并没有配置 defaultProps，所以如果直接用 <Comment /> 而不传入任何参数的话，comment 就会是 undefined
	
	//一些数据类型
	PropTypes.array
	PropTypes.bool
	PropTypes.func
	PropTypes.number
	PropTypes.object
	PropTypes.string
	PropTypes.node
	PropTypes.element


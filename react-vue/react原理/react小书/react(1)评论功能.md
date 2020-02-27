## 评论功能 ##

1、组件划分，搭建骨架

CommentApp：评论功能的整体用一个叫 CommentApp 的组件包含起来。CommentApp 包含上部和下部两部分。

CommentInput：上面部分是负责用户输入可操作的输入区域，包括输入评论的用户名、评论内容和发布按钮，这一部分功能划分到一个单独的组件 CommentInput 中。

CommentList：下面部分是评论列表，用一个叫 CommentList 的组件负责列表的展示。

Comment：每个评论列表项由独立的组件 Comment 负责显示，这个组件被 CommentList 所使用。

所以这个评论功能划分成四种组件，CommentApp、CommentInput、CommentList、Comment

（我会划分两个部分：input、list）

- 我们遵循一个原则：如果一个文件导出的是一个类，那么这个文件名就用大写开头（是这样么）


2、react处理用户输入

类似于 input、select、textarea 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法

	constructor () {
	    super()
	    this.state = {
	      username: '',
	      content: ''
	    }
	  }
	<div className='comment-field-input'>
      <input
        value={this.state.username}
        onChange={this.handleUsernameChange.bind(this)} />
    </div>
	handleUsernameChange (event) {
	    this.setState({
	      username: event.target.value
	    })
	  }

3、向父组件传值

当用户点击发布按钮的时候，我们就将 CommentInput 的 state 当中最新的评论数据传递给父组件 CommentApp ，然后让父组件把这个数据传递给 CommentList 进行渲染

CommentInput 如何向 CommentApp 传递的数据？父组件 CommentApp 只需要通过 props 给子组件 CommentInput 传入一个回调函数。当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可

	//子组件
	<div className='comment-field-button'>
        <button
          onClick={this.handleSubmit.bind(this)}>
          发布
        </button>
      </div>
	 handleSubmit () {
	    if (this.props.onSubmit) {
	      const { username, content } = this.state
	      this.props.onSubmit({username, content})
	    }
	    this.setState({ content: '' })
	  }

	//父组件
	class CommentApp extends Component {
	  handleSubmitComment (comment) {
	    console.log(comment)
	  }
	
	  render() {
	    return (
	      <div className='wrapper'>
	        <CommentInput
	          onSubmit={this.handleSubmitComment.bind(this)} />
	        <CommentList />
	      </div>
	    )
	  }
	}

4、评论列表

我们给 CommentList 加上 defaultProps 防止 comments 不传入的情况

	class CommentList extends Component {
	  static defaultProps = {
	    comments: []
	  }

	//在 CommentApp 的 state 中初始化一个数组，来保存所有的评论数据，并且通过 props 把它传递给 CommentList
	class CommentApp extends Component {
	  constructor () {
	    super()
	    this.state = {
	      comments: []
	    }
	  }
	  //每当用户发布评论的时候，就把评论数据插入 this.state.comments 中，然后通过 setState 把数据更新到页面上
	  handleSubmitComment (comment) {
	    this.state.comments.push(comment)
	    this.setState({
	      comments: this.state.comments
	    })
	  }
	
	  render() {
	    return (
	      <div className='wrapper'>
	        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
	        <CommentList comments={this.state.comments}/>
	      </div>
	    )
	  }
	}

- 这里的代码直接往 state.comments 数组里面插入数据其实违反了 React.js 的 state 不可直接修改的原则 。但其实这个原则是为了 shouldComponentUpdate 的优化和变化的跟踪，而这种目的在使用 React-redux 的时候其实会自然而然达到，我们很少直接手动地优化，这时候这个原则就会显得有点鸡肋(这是几个意思)
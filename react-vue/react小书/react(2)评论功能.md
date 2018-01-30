- 页面加载完成自动聚焦到评论输入框。
- 把用户名持久化，存放到浏览器的 LocalStorage 中。页面加载时会把用户名加载出来显示到输入框，用户就不需要重新输入用户名了。
- 把已经发布的评论持久化，存放到浏览器的 LocalStorage 中。页面加载时会把已经保存的评论加载出来，显示到页面的评论列表上。
- 评论显示发布日期，如“1 秒前”，”30 分钟前”，并且会每隔 5 秒更新发布日期。（这个）
- 评论可以被删除。
- 类似 Markdown 的行内代码块显示功能，用户输入的用 `` 包含起来的内容都会被处理成用 <code> 元素包含。例如输入 `console.log` 就会处理成 <code>console.log</code> 再显示到页面上（这个）

1、自动聚焦到评论框

ref获取dom，componentDidMount之后focus

2、用propTypes 进行参数验证（prop-types库）

3、用户名持久化

	  componentDidMount () {
	    this.textarea.focus()
	  }
	  //不依赖 DOM 操作的组件启动的操作都可以放在 componentWillMount 中进行	
	  componentWillMount () {
	    this._loadUsername()
	  }
	
	  _saveUsername (username) {
	    localStorage.setItem('username', username)
	  }
	
	  handleUsernameBlur (event) {
	    this._saveUsername(event.target.value)
	  }
	  
	  _loadUsername () {
	    const username = localStorage.getItem('username')
	    if (username) {
	      this.setState({ username })
	    }
	  }
	
组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头

组件的内容编写顺序如下：

- static 开头的类属性，如 defaultProps、propTypes。
- 构造函数，constructor。
- getter/setter（还不了解的同学可以暂时忽略）。
- 组件生命周期。
- 开头的私有方法。
- 事件监听方法，handle*。
- render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 - render* 开头。
- render() 方法。

4、持久化评论

	constructor () {
	    super()
	    this.state = {
	      comments: []
	    }
	  }
	
	  componentWillMount () {
	    this._loadComments()
	  }
	
	  _loadComments () {
	    let comments = localStorage.getItem('comments')
	    if (comments) {
	      comments = JSON.parse(comments)
	      this.setState({ comments })
	    }
	  }
	
	  _saveComments (comments) {
	    localStorage.setItem('comments', JSON.stringify(comments))
	  }
	
	  handleSubmitComment (comment) {
	    if (!comment) return
	    if (!comment.username) return alert('请输入用户名')
	    if (!comment.content) return alert('请输入评论内容')
	    const comments = this.state.comments
	    comments.push(comment)
	    this.setState({ comments })
	    this._saveComments(comments)
	  }

5、显示评论发布时间
	
	_updateTimeString () {
	    const comment = this.props.comment
	    const duration = (+Date.now() - comment.createdTime) / 1000
	    this.setState({
	      timeString: duration > 60
	        ? `${Math.round(duration / 60)} 分钟前`
	        : `${Math.round(Math.max(duration, 1))} 秒前`
	    })
	  }

componentWillMount 中启动一个定时器，每隔 5 秒调用一下 _updateTimeString，让它去通过 setState 更新 timeString

	componentWillMount () {
	    this._updateTimeString()
	    this._timer = setInterval(
	      this._updateTimeString.bind(this),
	      5000
	    )
	  }


6、删除评论（子组件和父组件通信）

	//使用 Comment 的时候，可以传入 onDeleteComment 和 index 两个参数
	class Comment extends Component {
	  static propTypes = {
	    comment: PropTypes.object.isRequired,
	    onDeleteComment: PropTypes.func,
	    index: PropTypes.number
	  }
	  handleDeleteComment () {
	    if (this.props.onDeleteComment) {
	      this.props.onDeleteComment(this.props.index)
	    }
	  }
	
	  render () {
	        <span
	          onClick={this.handleDeleteComment.bind(this)}
	          className='comment-delete'>
	          删除
	        </span>
	      </div>
	    )
	  }

	//父组件
	render() {
	    return (
	      <div>
	        {this.props.comments.map((comment, i) =>
	          <Comment
	            comment={comment}
	            key={i}
	            index={i}
	            onDeleteComment={this.handleDeleteComment.bind(this)} />
	        )}
	      </div>
	    )
	  }
onDeleteComment方法要一级一级向下传递（确实不方便）

记得要清理定时器

	componentWillUnmount () {
	    clearInterval(this._timer)
	  }

6、显示代码块（dangerouslySetInnerHTML）

	<p dangerouslySetInnerHTML={{
	  __html: this._getProcessedContent(comment.content)
	}} />
	//防止 XSS 漏洞，用户可以输入任意的 HTML 标签，用 <script> 执行任意的 JavaScript 代码。所以在替换代码之前，我们要手动地把这些 HTML 标签进行转义
	_getProcessedContent (content) {
	    return content
	      .replace(/&/g, "&amp;")
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;")
	      .replace(/"/g, "&quot;")
	      .replace(/'/g, "&#039;")
	      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
	

	
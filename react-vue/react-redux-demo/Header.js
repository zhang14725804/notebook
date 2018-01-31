import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends React.Component{
  //注意contextTypes后面的s
  static propTypes={
    themeColor:PropTypes.string
  }
  
  render(){
    return (<h2 style={{ color: this.props.themeColor }}>react-redux原理</h2>)
  }
}

//每个传进去的组件需要 store 里面的数据都不一样的
//除了给高阶组件传入Pure Component组件以外，还需要告诉高级组件我们需要什么数据
//mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件
const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}

Header=connect(mapStateToProps)(Header)

export default Header
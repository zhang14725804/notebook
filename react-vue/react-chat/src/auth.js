//用户认证
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import {login,getUserData} from './authReducer'

@connect(
  state=>state.authReducer,
  {login,getUserData}
)
class Auth extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state={
  //     data:{}
  //   }
  // }
  // //获取数据
  componentDidMount(){
    this.props.getUserData()
    // axios.get("/data").then(res=>{
    //   if(res.status===200){
    //     this.setState({
    //       data:res.data
    //     })
    //   }
    // })
  }
  render(){
    return (
      <div>
        {/* <h2 >姓名：{this.state.data.name}</h2> */}
        <h2 >姓名：{this.props.name}，年龄：{this.props.age}</h2>
        {this.props.isAuth ? <Redirect to="/associate/"></Redirect> : null}
        <div>需要登录</div>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth
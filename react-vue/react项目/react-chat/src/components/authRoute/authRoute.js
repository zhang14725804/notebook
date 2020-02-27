//验证登录组件
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadData} from '../../store/userRedux'
import {withRouter} from 'react-router-dom'
@connect(
  null,
  {loadData}
)
@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList=['/login','/register']
    //当前路由(如果已经在登录注册页了，直接返回)
    const pathname=this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }

    //获取用户信息
    axios.get('/user/info')
      .then(res=>{
        if(res.status===200){
          if(res.data.code===0){
            //已经登录(从redux中获取数据)
            this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
        }
      })
  }
  render(){
    return null
  }
}

export default AuthRoute
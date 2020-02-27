import React from 'react'
import {List,InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../store/userRedux'
import Logo from '../../components/logo/logo'
import formHOC from '../../components/formHOC/formHOC'
//高阶组件(第一讲)
// function hello(){
//   console.log('say hello!')
// }
// function wrapHello(fn){
//   //这里返回函数(为什么呢)
//   return function(){
//     console.log('before hello')
//     fn()
//     console.log('after hello')
//   }
// }
// hello=wrapHello(hello)
// hello()

//高阶组件*（第二讲）
// function WrapGoodby(Comp){
//   class WrapComp extends Comp{
//     //反向继承
//     componentDidMount(){
//       console.log('HOC 新增生命周期 加载完成')
//     }
//     render(){
//       return <Comp/>
//     }
//   }
  //属性代理
  // class WrapComp extends React.Component{
  //   render(){
  //     return(
  //       <div>
  //         <p>HOC高阶组件特有元素</p>
  //         <Comp name='text' {...this.props}/>
  //       </div>
  //     )
  //   }
  // }
//   return WrapComp
// }
// @WrapGoodby   
// class Goodby extends React.Component{
//   render(){
//     return <div>goodby Vue I love react</div>
//   }
// }
//@WrapGoodby   相当于下面这一句
//Goodby=WrapGoodby(Goodby)


@connect(
  state=>state.user,
  {login}
)
@formHOC
class Login extends React.Component{
  constructor(props){
    super(props)
    // this.state={
    //   name:'',
    //   pwd:'',
    // }
    this.register=this.register.bind(this)
    this.handlerLogin=this.handlerLogin.bind(this)
  }
  //放在高阶组件当中去
  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }
  //跳转到注册页
  register(){
    console.log(this.props)
    this.props.history.push("/register")
  }
  //登录操作
  handlerLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return(
      <div>
        {/* <Goodby/> */}
        <Logo/>
        {(this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo} />:null}
        {this.props.message?<p style={{color:'red'}}>{this.props.message}</p>:null}
        <List>
          <InputItem onChange={v=>this.props.handleChange('name',v)}>账号</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
        </List>
        <WingBlank>
          <Button type="primary" onClick={this.handlerLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register}  type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
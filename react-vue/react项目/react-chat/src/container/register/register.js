import React from 'react'
import {InputItem,Radio,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' 

import {register} from '../../store/userRedux'
import Logo from '../../components/logo/logo'

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:'',
      pwd:'',
      rpwd:'',
      type:'genius'
    }
    this.handleRegister=this.handleRegister.bind(this)
  }
  //为什么这里不需要绑定this(箭头函数)
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render(){
    const RadioItem=Radio.RadioItem
    return(
      <div>
        <Logo/>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        {this.props.message?<p style={{color:'red'}}>{this.props.message}</p>:null}
        <InputItem onChange={v=>this.handleChange('name',v)}>账户名</InputItem>
        <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
        <InputItem type='password' onChange={v=>this.handleChange('rpwd',v)}>确认密码</InputItem>
        <RadioItem onChange={v=>this.handleChange('type','genius')} checked={this.state.type==='genius'}>大牛</RadioItem>
        <RadioItem onChange={v=>this.handleChange('type','boss')} checked={this.state.type==='boss'}>BOSS</RadioItem>
        <Button onClick={this.handleRegister}  type="primary">注册</Button>
      </div>
    )
  }
}

export default Register
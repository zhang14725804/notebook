import React from 'react'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navLinkBar/navLinkBar'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Message from '../message/message'
import {getMsgList,receiveMessage} from '../../store/chatRedux'

@connect(
  state=>state,
  {getMsgList,receiveMessage}
)
class DashBoard extends React.Component{
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.receiveMessage()
    }
  }
  render(){
    //获取当前路径
    let {pathname}=this.props.location
    const user=this.props.user
    const navList=[{
      path:"/boss",
      text:"牛人",
      icon:'boss',
      title:'牛人列表',
      component:Boss,
      hide:user.type==='genius'
    },{
      path:"/genius",
      text:"boss",
      icon:'jobs',
      title:'Boss列表',
      component:Genius,
      hide:user.type==='boss'
    },{
      path:"/message",
      text:"消息",
      icon:'message',
      title:'消息列表',
      component:Message
    },{
      path:"/me",
      text:"我",
      icon:'boss',
      title:'个人中心',
      component:User
    }]

    return(
      <div>
        <NavBar className="fixed-header" mode="card" >{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(<Route key={v.path} path={v.path} component={v.component}></Route>))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default DashBoard
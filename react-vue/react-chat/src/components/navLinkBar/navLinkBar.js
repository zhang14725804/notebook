import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
  state=>state.chat
)
class NavLinkBar extends React.Component{
  static propTypes={
    data:PropTypes.array.isRequired
  }
  render(){
    const navList=this.props.data.filter(v=>!v.hide)
    const {pathname}=this.props.location
    
    return (
      <TabBar>
        {navList.map((v,index)=>(
          <TabBar.Item 
            badge={v.path==='/message'?this.props.unread:0}
            key={index} 
            path={v.path} 
            icon={{uri:require(`./icon/${v.icon}.png`)}} 
            selectedIcon={{uri:require(`./icon/${v.icon}-active.png`)}} 
            selected={pathname===v.path}
            onPress={()=>this.props.history.push(v.path)}
            title={v.text}>
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar
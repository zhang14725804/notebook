import React from 'react'
import PropTypes from 'prop-types'
import {Card,WingBlank ,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  static propTypes={
    userList:PropTypes.array.isRequired
  }
  handlerClick(user){
    this.props.history.push(`/chat/${user._id}`)
  }
  render(){
    const Header=Card.Header
    const Body=Card.Body
    return(
      <WingBlank >
        <WhiteSpace/>
        {this.props.userList.map(user=>(
          user.avatar?(
          <Card key={user._id} onClick={()=>this.handlerClick(user)}>
            <Header 
            title={user.name} 
            thumbStyle={{width:20,height:20}}
            thumb={require(`../images/${user.avatar}`)} 
            extra={<span>{user.title}</span>}>
            </Header>
            <Body>
              {user.type==='boss'?<div>公司：{user.company}</div>:null}
              {user.desc}
              {user.type==='boss'?<div>薪资：{user.money}</div>:null}
            </Body>
          </Card>):null
        ))}
      </WingBlank >
    )
  }
}

export default UserCard
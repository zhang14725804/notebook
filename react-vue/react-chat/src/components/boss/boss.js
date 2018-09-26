import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../store/chatUserRedux'
import UserCard from '../userCard/userCard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return(
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Boss
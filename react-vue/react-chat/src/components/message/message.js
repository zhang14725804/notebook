import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)
class Message extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item=List.Item
    const Brief=Item.Brief
    //console.log(this.props)
    //根据chatid，对聊天进行分组
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[]
      msgGroup[v.chatid].push(v)
    })
    //根据发送时间排序
    const chatList=Object.values(msgGroup).sort((a,b)=>{
      const aLast=this.getLast(a).create_time
      const bLast=this.getLast(b).create_time
      return bLast-aLast
    })
    chatList
    const userid=this.props.user._id//当前登录用户的id
    const chatUsers=this.props.chat.users
    
    return(
      <div>
        {chatList.map((v,index)=>{
          const lastItem=this.getLast(v)
          const targetID=userid===v[0].from?v[0].to:v[0].from
          const username=chatUsers[targetID]&&chatUsers[targetID].name
          const unreadNum=v.filter(v=>!v.read&&v.to===userid).length
          return (
            <List  key={index} >
              <Item thumb={require(`../images/${chatUsers[targetID].avatar}`)} 
                arrow="horizontal" onClick={()=>{this.props.history.push(`/chat/${targetID}`)}}
                extra={<Badge text={unreadNum} ></Badge>}>
                {lastItem.content}
                <Brief>{username}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Message
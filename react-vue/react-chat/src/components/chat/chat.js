import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {getChatId} from '../../utils'
// import io from 'socket.io-client'
// const socket =io('ws://localhost:9093')

import {connect} from 'react-redux'
import {sendMessage,getMsgList,receiveMessage,readMsg} from '../../store/chatRedux'

@connect(
  state=>state,
  {sendMessage,getMsgList,receiveMessage,readMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={text:'',message:[]}
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.receiveMessage()//开始接受聊天信息
    }
  }
  componentWillUnmount(){
    const to=this.props.match.params.name
    this.props.readMsg(to)//通知后端，已经读取消息，标记消息状态为已读
  }
  fixCarousel(){
    //解决grid组件显示问题
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handlerSubmit(){
    //发送者
    console.log(this.props)
    const from =this.props.user._id
    //接受者
    const to =this.props.match.params.name
    console.log("to===from::"+to===from)
    const msg=this.state.text
    this.props.sendMessage({from,to,msg})
    this.setState({
      text:'',
      showEmoji:false
    })
  }
  render(){
    //表情
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
          .split(' ').filter(v=>v).map(v=>({text:v}))
    //当前聊天的人
    const name =this.props.match.params.name
    const Item =List.Item
    const users=this.props.chat.users
    const chatid=getChatId(name,this.props.user._id)
    const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    if(!users[name]){
      return null
    }
    //console.log(this.props.match)
    return (
      <div id="chat-page">
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>
          {users[name].name}
        </NavBar>
        {chatmsgs.map((v,index)=>{
          const avatar=require(`../images/${users[v.from].avatar}`)
          return v.from===name?(
            <List key={index}>
              <Item thumb={avatar}>对方：{v.content}</Item>
            </List>
          ):(
            <List key={index}>
              <Item extra={<img alt='' src={avatar}/>} className="chat-me">我：{v.content}</Item>
            </List>
          )
        })}
        <div className="sticky-footer">
          <List>
            <InputItem placeholder='请输入' value={this.state.text} onChange={v=>this.setState({text:v})}
              extra={
              <div>
                <span style={{marginRight:15}} onClick={()=>{
                  this.setState({showEmoji:!this.state.showEmoji})
                  this.fixCarousel()
                }}>😃</span>
                <span onClick={()=>this.handlerSubmit()}>发送</span>
              </div>
            }></InputItem>
          </List>
          {this.state.showEmoji?<Grid onClick={el=>this.setState({
            text:this.state.text+el.text
          })} data={emoji} columnNum={9}  isCarousel={true} carouselMaxRow={4}/>:null}
        </div>
      </div>
    )
  }
}

export default Chat
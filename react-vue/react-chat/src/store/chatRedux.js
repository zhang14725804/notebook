import axios from 'axios'
import io from 'socket.io-client'
const socket =io('ws://localhost:9093')

//消息列表
const MSG_LIST="MSG_LIST"
//读取信息
const MSG_RECE="MSG_RECE"
//标记已读未读
const MSG_READ="MSG_READ"

const initState={
  chatmsg:[],
  users:{},
  unread:0
}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST: 
      return {...state,users:action.payload.users,chatmsg:action.payload.messages,unread:action.payload.messages.filter(v=>!v.read && v.to===action.payload.userid).length}
    case MSG_RECE: 
      const num=action.payload.to===action.userid?1:0
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+num}
    //case MSG_READ: return {...state,unread:state.unread-action.payload.num,chatmsg:state.chatmsg.map(v=>{v.read=true; return v})}
    case MSG_READ: 
      const {from}=action.payload
      return {...state,unread:state.unread-action.payload.num,chatmsg:state.chatmsg.map(v=>({...v,read:(from===v.from?true:v.read)}))}
    default: return state
  }
} 
function msgList(messages,users,userid){
  return {type:MSG_LIST,payload:{messages,users,userid}}
}
//发送消息
export function sendMessage({from,to,msg}) {
  return dispatch=>{
    socket.emit('sendMessage',{from,to,msg})
  }
}
//来自谁的消息，发给谁的消息，更新tabbar的unread
function msgRead({from,userid,num}) {
  return {type:MSG_READ,payload:{from,userid,num}}
}
//标记消息状态为已读
export function readMsg(from) {
  //getState当前redux对象
  return (dispatch,getState)=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        //当前登录的用户id
        const userid=getState().user._id
        if(res.status===200 && res.data.code===0){
          dispatch(msgRead({from,userid,num:res.data.num}))
        }
      })
  }
}
//接收消息
function msgReceive(messages,userid){
  return {type:MSG_RECE,payload:messages,userid}
} 
export function receiveMessage() {
  return (dispatch,getState)=>{
    socket.on('receiveMessage',function(data){
      const userid=getState().user._id
      dispatch(msgReceive(data,userid))
    })
  }
}
export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          //当前登录的用户id
          const userid=getState().user._id
          dispatch(msgList(res.data.messages,res.data.users,userid))
        }
      })
  }
}
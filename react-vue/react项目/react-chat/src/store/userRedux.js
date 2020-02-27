import axios from 'axios'
import {getRedirectPath} from '../utils'
const ERR_MSG="ERR_MSG"
// const REGISTER_SUCCESS="REGISTER_SUCCESS"
// const LOGIN_SUCCESS="LOGIN_SUCCESS"
const AUTH_SUCCESS="AUTH_SUCCESS"
const LOAD_DATA="LOAD_DATA"
const LOGOUT="LOGOUT"

const initState={
  //注册或者跳转成功之后的跳转地址
  redirectTo:'',
  message:'',
  name:'',
  type:'',
  //pwd:'',
  //isAuth:'',
}
//reducer
export function user(state=initState,action){
  switch(action.type){
    // case REGISTER_SUCCESS: return{...state,redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload} 
    // case LOGIN_SUCCESS: return{...state,redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload} 
    case AUTH_SUCCESS: return{...state,redirectTo:getRedirectPath(action.payload),...action.payload} 
    
    case LOAD_DATA:return {...state,...action.payload}
    
    case LOGOUT:return {...initState,redirectTo:'/login'}

    case ERR_MSG: return{...state,isAuth:false,message:action.message} 
    
    default: return state
  }
}
//更新用户信息
export function update(data){
  return dispatch=>{
    axios.post("/user/update",data)
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errMsg(res.data.message))
        }
      })
  }
}
//注册
export function register({name,pwd,rpwd,type}){
  if(!name||!pwd){
    return errMsg('用户名或密码不能为空')
  }
  if(pwd!==rpwd){
    return errMsg('两次密码输入不同')
  }
  //注册 处理异步请求
  return dispatch=>{
    axios.post("/user/register",{name,pwd,type})
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          dispatch(authSuccess({name,pwd,type}))
        }else{
          //后端反悔的信息（message）
          dispatch(errMsg(res.data.message))
        }
      })
  }
}
//登录
export function login({name,pwd}){
  if(!name||!pwd){
    return errMsg('用户名或密码不能为空')
  }
  //注册 处理异步请求
  return dispatch=>{
    axios.post("/user/login",{name,pwd})
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          //dispatch(registerSuccess({name,pwd,type}))
          dispatch(authSuccess(res.data.data))
        }else{
          //后端反悔的信息（message）
          dispatch(errMsg(res.data.message))
        }
      })
  }
}
//错误信息
function errMsg(message){
  return {message,type:ERR_MSG}
}
function authSuccess(obj){
  //过滤redux中的data
  const {pwd,...data}=obj
  return {type:AUTH_SUCCESS,payload:data}
}

export function loadData(userinfo){
  return {type:LOAD_DATA,payload:userinfo}
}

export function logoutSubmit(){
  return {type:LOGOUT}
}

// function registerSuccess(data){
//   return {type:REGISTER_SUCCESS,payload:data}
// }
// function loginSuccess(data){
//   return {type:LOGIN_SUCCESS,payload:data}
// }

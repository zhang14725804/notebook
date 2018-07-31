import axios from 'axios'
//登录授权reducer
const LOGIN="LOGIN"
const LOGOUT="LOGOUT"
const USER_DATA="USER_DATA"

let initState={
  isAuth:false,
  name:'大锤',
  age:33
}
// export function authReducer(state={isAuth:false,user:'大锤'},action){
export function authReducer(state=initState,action){
  console.log(state,action)
  console.log(action.payload)
  switch(action.type){
    case "LOGIN": return {...state,isAuth:true}
    case "LOGOUT":return {...state,isAuth:false}
    case "USER_DATA":return {...state,...action.payload}
    default: return state
  }
}

//action 
export function  login(){
  return {type:LOGIN}
}
export function  logout(){
  return {type:LOGOUT}
}

//获取异步数据
export function  getUserData(){
  //dispatch用来通知数据修改
  return dispatch=>{
    axios.get("/data").then(res=>{
      if(res.status===200){
        dispatch(userData(res.data))
      }
    })
  }
}

export function userData(data){
  //payload是数据
  return {type:USER_DATA,payload:data}
}
import http from 'libs/http'
import {getAvatar} from 'libs/common'
import storage from 'good-storage'
const FETCH_USER_DATA="FETCH_USER_DATA"
//用户角色
const USER_ROLE='USER_ROLE'
const initUser={
    alias: "",
    avatar: "",
    cloudUserId: undefined,
    enterpriseName:'',
    userRole:''
}

export function userReducer(state=initUser,action){
    switch(action.type){
        case FETCH_USER_DATA:
            return {...state,...action.payload}
        case USER_ROLE:
            return {...state,...action.payload}
        default:
            return state
    }
}
//选择当前登录角色
export function selectRole(role){
    //用户角色数据持久化
    const loginUser=storage.get('loginUser')
    loginUser.userRole=role
    storage.set('loginUser',loginUser)
    
    return {type:USER_ROLE,payload:{userRole:role}}
}
function pushUserData(data){
    return {type:FETCH_USER_DATA,payload:data}
}
//获取用户数据(用户刷新浏览器redux会清空数据，需要本地缓存数据)
export function fetchUserData(){
    return dispatch=>{
        if(!storage.get('loginUser')){
            http.get('enterprise/employees/getCurrentAccountInfo').then(res=>{
                if(res && res.status===200){
                    const loginUser=res.data
                    loginUser.avatar=getAvatar(loginUser.cloudUserId)
                    storage.set('loginUser',loginUser)
                    dispatch(pushUserData(loginUser))
                }
            })
        }else{
            const loginUser=storage.get('loginUser')
            dispatch(pushUserData(loginUser))
        }
        
    }
}
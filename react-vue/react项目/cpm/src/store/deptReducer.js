import http from 'libs/http'
import storage from 'good-storage'
import {authTimeout} from 'libs/common'
const DEPT_DATA='DEPT_DATA'
const CURRENT_DEPT='CURRENT_DEPT'
//部门列表
const initState={
    deptList:null,
    currentDept:null
}

export function deptReducer(state=initState,action){
    switch(action.type){
        case DEPT_DATA:
            return {...state,deptList:action.payload}
        case CURRENT_DEPT:
            return {...state,...action.payload}
        default:
            return state
    }
}

function getdepts(list){
    return {type:DEPT_DATA,payload:list}
}
//缓存当前选中的部门
export function setCurrentDept(dept){
    return {type:CURRENT_DEPT,payload:{currentDept:dept}}
}
//获取部门列表
export function getDeptList(params){
    return dispatch=>{
        http.get('enterprise/getDepartments',params).then(res=>{
            if(res && res.status===200){
                dispatch(getdepts(res.data))
                //选择部门管理员登录(但是没有任何部门)
                if(res.data && res.data.length===0 && storage.get('loginUser').userRole==='department'){
                    authTimeout()
                }
            }
        })
    }
}
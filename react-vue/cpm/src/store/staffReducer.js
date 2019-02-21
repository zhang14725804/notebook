import http from 'libs/http'

//员工列表
const STAFF_DATA ='STAFF_DATA'
const M_EMPLOYEE ='M_EMPLOYEE'

//选中的员工列表
const SELECTED_STAFF_LIST='SELECTED_STAFF_LIST'
//当前选中的员工和是否展示员工详情
const ACTIVE_PERSONAL='ACTIVE_PERSONAL'
//员工总数
const ENTERPRISE_TOTAL='ENTERPRISE_TOTAL'

const initStaff={
    //员工数据（包括total，currentPage）
    staffData:[],
    selectedStaffList:[],
    activePerson:null,
    //模态框用到的用户列表
    mEmployee:null,
    enterpriseTotal:0
}
export function staffReducer(state=initStaff,action){
    switch(action.type){
        case STAFF_DATA:
            return {...state,staffData:action.payload}
        case M_EMPLOYEE:
            return {...state,mEmployee:action.payload}
        case ENTERPRISE_TOTAL:
            return {...state,enterpriseTotal:action.payload}
        case SELECTED_STAFF_LIST:
            return {...state,...action.payload}
        case ACTIVE_PERSONAL:
            return {...state,...action.payload}
        default:
            return state
    }
}

//点击选择员工,sl:staffData
export function selectedStaff(sl){
    return {type:SELECTED_STAFF_LIST,payload:{selectedStaffList:sl}}
}
//显示或隐藏员工详情
export function togglePersonal(ap){
    return ap?{type:ACTIVE_PERSONAL,payload:{activePerson:ap}}:{type:ACTIVE_PERSONAL,payload:{activePerson:null}}
}
//所有员工
function _staffData(obj){
    return {type:STAFF_DATA,payload:obj}
}
function getEnterpriseTotal(total){
    return {type:ENTERPRISE_TOTAL,payload:total}
}
export function getStaffList(cp){
    let p={
        isAllocation:'',//已分配未分配
        page:1,
        limit:30,
        searchName:'',
        deptId:0,
    }
    let params=cp?Object.assign(p,cp):p
    return dispatch=>{
        http.get('enterprise/getEmployees',params).then(res=>{
            if(res && res.status===200){
                dispatch(_staffData(res.data))
                if(params.isAllocation==='' && params.searchName==='' && params.deptId===0){
                    dispatch(getEnterpriseTotal(res.data.total))
                }
            }
        })
    }
}
//modal employee function(这里要获取所有员工，为了避免和之前员工列表的数据冲突)
function mef(obj){
    return {type:M_EMPLOYEE,payload:obj}
}

//get modal employee list(cp: custom params)
export function getMEL(cp){
    let p={
        isAllocation:'',//已分配未分配
        page:1,
        limit:30,
        searchName:'',
        deptId:0,
    }
    let params=cp?Object.assign(p,cp):p
    return dispatch=>{
        http.get('enterprise/getEmployees',params).then(res=>{
            if(res && res.status===200){
                dispatch(mef(res.data))
            }
        })
    }
}
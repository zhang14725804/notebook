
//创建部门
const CREATE_DEPT_MODAL_VISIBALE='CREATE_DEPT_MODAL_VISIBALE'
//指定部门主管(或者移除)
const SET_DEPT_DIR_MODAL_VISIBALE='SET_DEPT_DIR_MODAL_VISIBALE'
//指定部门管理员(或者移除)
const SET_DEPT_MANAGER_MODAL_VISIBALE='SET_DEPT_MANAGER_MODAL_VISIBALE'
//指定企业管理员(或者移除)
const SET_BUS_MANAGER_MODAL_VISIBALE='SET_BUS_MANAGER_MODAL_VISIBALE'
//移除部门主管
const REMOVE_DEPT_MANAGER_MODAL_VISIBALE='REMOVE_DEPT_MANAGER_MODAL_VISIBALE'
//删除部门
const DELETE_DEPT_MODAL_VISIBALE='DELETE_DEPT_MODAL_VISIBALE'
//指定部门
const SET_DEPT_MODAL_VISIBALE='SET_DEPT_MODAL_VISIBALE'
//添加员工
const ADD_STAFF_MODAL_VISIBALE='ADD_STAFF_MODAL_VISIBALE'
//删除员工
const DEL_STAFF_MODAL_VISIBALE='DEL_STAFF_MODAL_VISIBALE'
//选择角色登录
const SELECT_ROLE_MODAL_VISIBALE='SELECT_ROLE_MODAL_VISIBALE'
//修改部门名称
const UPDATE_DEPT_NAME_MODAL_VISIBALE='UPDATE_DEPT_NAME_MODAL_VISIBALE'
//员工详情
const STAFF_DETAIL='STAFF_DETAIL'
//权限移交（部门主管）
const TRANSFER_D_RIGHT_MODAL_VISIBALE='TRANSFER_D_RIGHT_MODAL_VISIBALE'
//权限移交（企业管理员）
const TRANSFER_B_RIGHT_MODAL_VISIBALE='TRANSFER_B_RIGHT_MODAL_VISIBALE'
//初始化modal状态
const DEFAULT_MODAL_VISIBALE='DEFAULT_MODAL_VISIBALE'

const initState={
    updateDeptNameModalVisible:false,
    staffDetailModalVisible:false,
    selectRoleModalVisible:false,
    createDeptModalVisible:false,
    setDeptManagerModalVisible:false,
    setDeptDirModalVisible:false,
    setBusManagerModalVisible:false,
    removeDeptManagerModalVisible:false,
    deleteDeptModalVisible:false,
    setDeptModalVisible:false,
    addStaffModalVisible:false,
    delStaffModalVisible:false,
    transferDRightModalVisible:false,
    transferBRightModalVisible:false,
}

export function employeeModalReducer(state=initState,action){
    switch(action.type){
        case CREATE_DEPT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case UPDATE_DEPT_NAME_MODAL_VISIBALE:
            return {...state,...action.payload}
        case SET_DEPT_DIR_MODAL_VISIBALE:
            return {...state,...action.payload}
        case SET_DEPT_MANAGER_MODAL_VISIBALE:
            return {...state,...action.payload}
        case SET_BUS_MANAGER_MODAL_VISIBALE:
            return {...state,...action.payload}
        case REMOVE_DEPT_MANAGER_MODAL_VISIBALE:
            return {...state,...action.payload}
        case SET_DEPT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case SELECT_ROLE_MODAL_VISIBALE:
            return {...state,...action.payload}
        case STAFF_DETAIL:
            return {...state,...action.payload}
        case DELETE_DEPT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case ADD_STAFF_MODAL_VISIBALE:
            return {...state,...action.payload}
        case DEL_STAFF_MODAL_VISIBALE:
            return {...state,...action.payload}
        case TRANSFER_B_RIGHT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case TRANSFER_D_RIGHT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case DEFAULT_MODAL_VISIBALE:
            return {...state,...action.payload}
        default:
            return state 
    }
} 

//改变显示状态
export function toggleModalState(type,bool){
    switch(type){
        case 'CREATE_DEPT':
            return {type:CREATE_DEPT_MODAL_VISIBALE,payload:{createDeptModalVisible:bool}}
        case 'UPDATE_DEPT_NAME':
            return {type:UPDATE_DEPT_NAME_MODAL_VISIBALE,payload:{updateDeptNameModalVisible:bool}}
        case 'SET_DEPT':
            return {type:SET_DEPT_MODAL_VISIBALE,payload:{setDeptModalVisible:bool}}
        case 'STAFF_DETAIL':
            return {type:STAFF_DETAIL,payload:{staffDetailModalVisible:bool}}
        case 'SELECT_ROLE':
            return {type:SELECT_ROLE_MODAL_VISIBALE,payload:{selectRoleModalVisible:bool}}
        case 'SET_DEPT_DIR':
            return {type:SET_DEPT_DIR_MODAL_VISIBALE,payload:{setDeptDirModalVisible:bool}} 
        case 'SET_DEPT_MANAGER':
            return {type:SET_DEPT_MANAGER_MODAL_VISIBALE,payload:{setDeptManagerModalVisible:bool}}
        case 'SET_BUS_MANAGER':
            return {type:SET_BUS_MANAGER_MODAL_VISIBALE,payload:{setBusManagerModalVisible:bool}}
        case 'REMOVE_DEPT_MANAGER':
            return {type:REMOVE_DEPT_MANAGER_MODAL_VISIBALE,payload:{removeDeptManagerModalVisible:bool}}
        case 'DELETE_DEPT':
            return {type:DELETE_DEPT_MODAL_VISIBALE,payload:{deleteDeptModalVisible:bool}}
        case 'ADD_STAFF':
            return {type:ADD_STAFF_MODAL_VISIBALE,payload:{addStaffModalVisible:bool}}
        case 'DEL_STAFF':
            return {type:DEL_STAFF_MODAL_VISIBALE,payload:{delStaffModalVisible:bool}}
        case 'TRANSFER_B_RIGHT':
            return {type:TRANSFER_B_RIGHT_MODAL_VISIBALE,payload:{transferBRightModalVisible:bool}}
        case 'TRANSFER_D_RIGHT':
            return {type:TRANSFER_D_RIGHT_MODAL_VISIBALE,payload:{transferDRightModalVisible:bool}}
        case 'DEFAULT':
            return {type:DEFAULT_MODAL_VISIBALE,payload:initState}
        default:
            return initState
    }
}
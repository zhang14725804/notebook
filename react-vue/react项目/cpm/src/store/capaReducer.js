import http from 'libs/http'
//修改企业文库容量
const UPDATE_LIBS_CAPA_MODAL_SHOW="UPDATE_LIBS_CAPA_MODAL_SHOW"
//修改部门容量
const UPDATE_DEPT_CAPA_MODAL_SHOW="UPDATE_DEPT_CAPA_MODAL_SHOW"
//设置员工人均容量
const SET_EVERY_CAPA_MODAL_SHOW="SET_EVERY_CAPA_MODAL_SHOW"
//修改员工容量
const SET_EMP_CAPA_MODAL_SHOW="SET_EMP_CAPA_MODAL_SHOW"
//修改单个员工容量
const SET_ONE_CAPA_MODAL_SHOW="SET_ONE_CAPA_MODAL_SHOW"
const DEFAULT_MODAL_VISIBALE='DEFAULT_MODAL_VISIBALE'
const GET_AUMARY_CAPACITY='GET_AUMARY_CAPACITY'

//选中的部门（修改部门容量的时候需要）
const SELECTED_DEPT='SELECTED_DEPT'

const initState={
    updateLibsCapaModalShow:false,
    updateDeptCapaModalShow:false,
    setEveryCapaModalShow:false,
    setEmpCapaModalShow:false,
    setOneCapaModalShow:false,
    selectedDept:null,
    sumaryCapacity:null

}
export function capaReducer(state=initState,action){
    switch(action.type){
        case UPDATE_LIBS_CAPA_MODAL_SHOW:
            return {...state,...action.payload}
        case UPDATE_DEPT_CAPA_MODAL_SHOW:
            return {...state,...action.payload}
        case SET_EVERY_CAPA_MODAL_SHOW:
            return {...state,...action.payload}
        case SET_EMP_CAPA_MODAL_SHOW:
            return {...state,...action.payload}
        case SET_ONE_CAPA_MODAL_SHOW:
            return {...state,...action.payload}
        case DEFAULT_MODAL_VISIBALE:
            return {...state,...action.payload}
        case GET_AUMARY_CAPACITY:
            return {...state,...action.payload}
        case SELECTED_DEPT:
            return {...state,...action.payload}
        default:
            return state
    }
}

export function toggleCapaModalState(type,bool){
    switch(type){
        case "UPDATE_LIBS_CAPA":
            return {type:UPDATE_LIBS_CAPA_MODAL_SHOW,payload:{updateLibsCapaModalShow:bool}}
        case "UPDATE_DEPT_CAPA":
            return {type:UPDATE_DEPT_CAPA_MODAL_SHOW,payload:{updateDeptCapaModalShow:bool}}
        case "SET_EVERY_CAPA":
            return {type:SET_EVERY_CAPA_MODAL_SHOW,payload:{setEveryCapaModalShow:bool}}
        case "SET_EMP_CAPA":
            return {type:SET_EMP_CAPA_MODAL_SHOW,payload:{setEmpCapaModalShow:bool}}
        case "SET_ONE_CAPA":
            return {type:SET_ONE_CAPA_MODAL_SHOW,payload:{setOneCapaModalShow:bool}}
        case 'DEFAULT':
            return {type:DEFAULT_MODAL_VISIBALE,payload:initState}
        default:
            return initState
    }
}
//选择部门
export function selectDeptfn(dept){
    return {type:SELECTED_DEPT,payload:{selectedDept:dept}}
}
function getsum(data){
    return {type:GET_AUMARY_CAPACITY,payload:{sumaryCapacity:data}}
}
//获取容量使用概况
export function searchAll(){
    return dispatch=>{
        http.get("enterprise/spaceQu/searchAll",null).then(res=>{
            dispatch(getsum(res.data))
        })
    }
}
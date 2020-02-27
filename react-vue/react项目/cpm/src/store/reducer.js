import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {deptReducer} from './deptReducer'
import {staffReducer} from './staffReducer'
import {capaReducer} from './capaReducer'
import {employeeModalReducer} from './employeeModalReducer'
export default combineReducers({userReducer,deptReducer,staffReducer,employeeModalReducer,capaReducer})
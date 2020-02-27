import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
import {authReducer} from './authReducer'

//state中存在对象

export default combineReducers({counterReducer,authReducer})
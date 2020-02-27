import {combineReducers} from 'redux'

import {user} from './store/userRedux'
import {chatuser} from './store/chatUserRedux'
import {chat} from './store/chatRedux'

//state中存在对象
export default combineReducers({user,chatuser,chat})
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux'
//redux-thunk可以在action中返回一个函数（不仅仅是对象），使用dispath提交action
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import reducer from './reducer'
import './index.css'
import './config'

import AuthRoute from './components/authRoute/authRoute'
import DashBoard from './components/dashBoard/dashBoard'
import Chat from './components/chat/chat'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Login from './container/login/login'
import Register from './container/register/register'

const store=createStore(reducer,applyMiddleware(thunk))

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute/>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:name" component={Chat}></Route>
          {/*路由没有命中其他路由，显示DashBoard*/}
          {/*如果没有switch，每个页面都会嵌套DashBoard*/}
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux'
//redux-thunk可以在action中返回一个函数（不仅仅是对象），使用dispath提交action
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import axios from 'axios'

import reducer from './reducer'
import Auth from './auth'
import Associate from './associate'
import './config'
import 'antd-mobile/dist/antd-mobile.css';

const store=createStore(reducer,applyMiddleware(thunk))

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
    {/* 顶级路由，登录router和登陆之后的router */}
      <Switch>
        <Route path='/login' exact component={Auth}></Route>
        <Route path='/associate' component={Associate}></Route>
        <Redirect to='/associate'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),document.getElementById('root')
)

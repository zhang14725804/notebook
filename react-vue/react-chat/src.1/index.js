import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import App from './app'
import {counter,increase_NUM,decrease_NUM,increase_NUM_async} from './store'

const store=createStore(counter,applyMiddleware(thunk))

function render(){
  ReactDOM.render(<App store={store} increase_NUM={increase_NUM} increase_NUM_async={increase_NUM_async} decrease_NUM={decrease_NUM}/>,document.getElementById('root'))
}

render()
//状态改变触发渲染
store.subscribe(render)
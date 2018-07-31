import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux'
//redux-thunk可以在action中返回一个函数（不仅仅是对象），使用dispath提交action
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import App from './app'
import {counter} from './store'

const store=createStore(counter,applyMiddleware(thunk))


ReactDOM.render((
<Provider store={store}>
    <App/>
  </Provider>),document.getElementById('root')
)

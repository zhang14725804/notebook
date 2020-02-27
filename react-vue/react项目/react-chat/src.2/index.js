import React from 'react'
import ReactDOM from 'react-dom'
//import {createStore,applyMiddleware} from 'redux'
import {createStore} from './simpleRedux'
//redux-thunk可以在action中返回一个函数（不仅仅是对象），使用dispath提交action
import thunk from 'redux-thunk'
//import {Provider} from 'react-redux'
import {Provider} from './simpleReactRedux'

import App from './app'
import {counter} from './store'

//const store=createStore(counter,applyMiddleware(thunk))
const store=createStore(counter)


ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>),document.getElementById('root')
)

// //两层箭头函数
// const add=x=>y=>x+y+3
// const res=add(3)(2)
// console.log("res::"+res)
// //遍历对象key
// const tObject={name:'bigo',age:'woniu'}
// console.log(Object.keys(tObject))
// //遍历对象key

// for(let k in tObject){
//   console.log(k)
// }
// //...展开符号 (返回数组)
// function cArgs(...args){
//   console.log(args)
// }
// cArgs('React','Vue','webpack')
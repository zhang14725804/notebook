import {createStore} from 'redux'

//reducer,根据state和action，生成 state
function counter(state=0,action){
  switch(action.type){
    case 'increase':
      return state+1
    case 'decrease':
      return state-1
    default:
      return 10
  }
}
//新建store 
const store=createStore(counter)

//初始值
const init=store.getState()

//渲染数据
function listener(){
  console.log(`现在的人数${store.getState()}`)
}
//订阅事件
store.subscribe(listener)
console.log(init)

//派发事件，传递action
//这里dispatch action(有点小冉)
store.dispatch({type:'increase'})
store.dispatch({type:'increase'})
store.dispatch({type:'decrease'})


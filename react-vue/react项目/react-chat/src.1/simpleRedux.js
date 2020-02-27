
//迷你redux
export function createStore(reducer){
  let currentState={}
  let currentListener=[]
  function getState(){
    return currentState
  }
  function subscribe(listener){
    currentListener.push(listener)
  }
  function dispatch(action){
    //reducer返回一个新的state
    currentState= reducer(currentState,action)
    currentListener.forEach(v=>v())
    return action
  }
  //初始化
  //默认执行一次(action特殊化，用户之间不能重复)
  //只命中reducer中的default state
  dispatch({type:'sgrsthht'})
  return {getState,subscribe,dispatch}
}
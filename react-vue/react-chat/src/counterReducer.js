const INCREASE_NUM='INCREASE'
const DECREASE_NUM='DECREASE'

//reducer,根据state和action，生成 state
export function counterReducer(state=0,action){
  switch(action.type){
    case INCREASE_NUM:
      return state+1
    case DECREASE_NUM:
      return state-1
    default:
      return 10
  }
}
//action creator(返回一个对象)
//用了react-thunk之后可以返回函数
export function increase_NUM(){
  return {type:INCREASE_NUM}
}
export function decrease_NUM(){
  return {type:DECREASE_NUM}
}
//异步数据
export function increase_NUM_async(){
  return dispatch=>{
    setTimeout(() => {
      dispatch(increase_NUM())
    }, 2000);
  }
}
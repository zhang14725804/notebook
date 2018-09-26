
//迷你redux
export function createStore(reducer,enhancer){
  //增强器（中间件）
  // if(enhancer){
  //   //两层函数
  //   return enhancer(createStore)(reducer)
  // }
  let currentState={} //状态树
  let currentListener=[]

  function getState(){
    return currentState
  }

  function subscribe(listener){
    currentListener.push(listener)
  }

  //发起修改
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

//中间件
// export function applyMiddlerWare(){
//   return createStore=>(...args)=>{

//   }
// } 

//dispatch(increase_NUM())
//用dispatch包装传进来的函数
function bindActionCreator(creator,dispatch){
  //透传属性
  return (...args)=>dispatch(creator(...args))
}
//creators操作函数
//{increase_NUM,decrease_NUM,increase_NUM_async}
export function bindActionCreators(creators,dispatch){
  // let bind={}
  // Object.keys(creators).forEach(v=>{
  //   let creator=creators[v]
  //   bind[v]=bindActionCreator(creator,dispatch)
  // })
  // return bind

  //reduce写法
  return Object.keys(creators).reduce((ret,item)=>{
    ret[item]=bindActionCreator(creators[item],dispatch)
    return ret
  },{})
}
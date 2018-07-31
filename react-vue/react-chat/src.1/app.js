import React from 'react'
export default class App extends React.Component{
  // constructor(props){
  //   super(props)
  // }

  render(){
    const store=this.props.store
    const num=store.getState()
    const increase_NUM=this.props.increase_NUM
    const decrease_NUM=this.props.decrease_NUM
    const increase_NUM_async=this.props.increase_NUM_async
    return(
      <div>
        <h4>现在有{num}个人</h4>
        <button onClick={()=>store.dispatch(increase_NUM())}>招募</button>
        <button onClick={()=>store.dispatch(decrease_NUM())}>裁员</button>
        <button onClick={()=>store.dispatch(increase_NUM_async())}>几个月之后</button>
      </div>
    )
  }
}
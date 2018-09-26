import React from 'react'
//import {connect} from 'react-redux'
import {connect} from './simpleReactRedux'

import {increase_NUM,decrease_NUM,increase_NUM_async} from './store'

//state映射到props，名称已经很明显了
// const mapStateToProps=(state)=>{
//   return {num:state}
// }
// const actionCreator={increase_NUM,decrease_NUM,increase_NUM_async}
//将action映射到props中
//App=connect(mapStateToProps,actionCreator)(App)

//代替上面的代码
@connect(
  //映射属性
  state=>({num:state}),
  //映射方法。自动dispatch
  {increase_NUM,decrease_NUM,increase_NUM_async}
)

class App extends React.Component{
  // constructor(props){
  //   super(props)
  // }

  render(){
    return(
      <div>
        <h4>现在有{this.props.num}个人</h4>
        <button onClick={this.props.increase_NUM}>招募</button>
        <button onClick={this.props.decrease_NUM}>裁员</button>
        <button onClick={this.props.increase_NUM_async}>几个月之后</button>
      </div>
    )
  }
}


export default  App
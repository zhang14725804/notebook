//react-redux
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './simpleRedux';
//连接组件，获取redux中的数据，存在组建的props中
//1.接受组件，将state存入，然后返回一个组件 mapStateToProps
//2.通知组件数据变化 mapDispatchToProps
export const connect=(mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComp)=>{
  return class ConnectComp extends React.Component{
    static contextTypes={
      store:PropTypes.object
    }
    constructor(props,context){
      super(props,context)
      this.state={props:{}}
    }
    componentDidMount(){
      const {store}=this.context
      //每次数据变化(dispatch)，通知组件
      store.subscribe(()=>this.update())
      this.update()
    }
    //获取mapStateToProps和mapDispatchToProps，存入this.props
    update(){
      const {store}=this.context
      const stateProps=mapStateToProps(store.getState())
      const dispatchProps=bindActionCreators(mapDispatchToProps,store.dispatch)
      this.setState({
        props:{
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render(){
      return <WrapComp {...this.state.props}></WrapComp>
    }
  }
}
//把store中的数据放到context中，所有子元素可以获取数据
//context(上下文?)概念
export class Provider extends React.Component{
  static childContextTypes={
    store:PropTypes.object
  }

  getChildContext(){
    return {store:this.store}
  }

  constructor(props,context){
    super(props,context)
    this.store=props.store
  }

  render(){
    return this.props.children
  }
}
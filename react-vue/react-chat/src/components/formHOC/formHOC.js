//表单高阶组件
import React from 'react'

export default function formHOC(Comp){
  return class WrapComp extends React.Component{
    constructor(props){
      super(props)
      this.state={}
      this.handleChange=this.handleChange.bind(this)
    }
    handleChange(key,val){
      this.setState({
        [key]:val
      })
    }
    render(){
      {/*属性穿透*/}
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}
//react-redux
import React from 'react'
import PropTypes from 'prop-types'
//连接组件，获取redux中的数据，存在组建的props中
export function connect(){

}
//把store中的数据放到context中，所有子元素可以获取数据
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
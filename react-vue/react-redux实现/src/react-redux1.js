import React from 'react'
import PropTypes from 'prop-types'

export const Connect=(mapStateToProps)=>(WrapperComponent)=>{
  class Connect extends React.Component{
    //去 context 里面取出 store
    static contextTypes={
      store:PropTypes.object
    }

    constructor(){
      super()
      this.state={allProps:{}}
    }

    componentWillMount(){
      const {store}=this.context
      this._updateProps()
      store.subscribe(()=>this._updateProps())
    }

    _updateProps (){
      console.log(this.context)
      const {store} =this.context
      //额外传入 props，让获取数据更加灵活方便
      let stateProps=mapStateToProps(store.getState(),this.props)
      this.setState({
        allProps:{
          ...stateProps,
          ...this.props
        }
      })
    }
    render(){
      const {store} = this.context
      //把 store 里面的数据取出来通过 props 传给 WrappedComponent
      let stateProps=mapStateToProps(store.getState())
      return <WrapperComponent {...stateProps}/>
    }
  }
  return Connect
}
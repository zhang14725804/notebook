import React from 'react'
import PropTypes from 'prop-types'

export const connect=(mapStateToProps,mapDispatchToProps)=>(WrapperComponent)=>{
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
      console.log("this.context")
      console.log(this.context)
      //为什么要这么声明
      const {store} =this.context
      console.log(store)
      //额外传入 props，让获取数据更加灵活方便
      // 防止 mapStateToProps 没有传入
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
        // 防止 mapDispatchToProps 没有传入
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch,this.props):{}
      this.setState({
        allProps:{
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render(){
      return <WrapperComponent {...this.state.allProps}/>
    }
  }
  return Connect
}

export class Provider extends React.Component{
  static propTypes={
    store:PropTypes.object,
    children:PropTypes.any
  }

  static childContextTypes={
    store:PropTypes.object
  }

  getChildContext(){
    console.log(this.props)
    return {
      store:this.props.store
    }
  }

  render(){
    return <div>{this.props.children}</div>
  }
}
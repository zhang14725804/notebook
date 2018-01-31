import React from 'react'
import PropTypes from 'prop-types'

export default class ThemeSwitch extends React.Component {
  //注意contextTypes后面的s
  static contextTypes = {
    store: PropTypes.object
  }

  //初始化themeColor 状态
  constructor() {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount() {
    this._updateThemeColor()
    //监听数据变化重新渲染
    const {store} =this.context
    store.subscribe(()=>this._updateThemeColor())
  }

  //从 context 里面把 store 取出来，然后通过 store.getState() 获取状态对象
  _updateThemeColor() {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  //点击事件 dispatch action 去改变颜色
  handleSwitchColor(color){
    const {store} =this.context
    store.dispatch({
      type:'CHANGE_COLOR',
      themeColor:color
    })
  }

  render() {
    return (<div>
      <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
      <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
    </div>)
  }
}
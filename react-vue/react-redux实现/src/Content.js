import React from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'

export default class Content extends React.Component {
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
    const { store } = this.context
    store.subscribe(() => this._updateThemeColor())
  }

  //从 context 里面把 store 取出来，然后通过 store.getState() 获取状态对象
  _updateThemeColor() {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }
  render() {
    return (<div>
      <p style={{ color: this.state.themeColor }}> 内容区域</p>
      <ThemeSwitch/>
    </div>)
  }
}
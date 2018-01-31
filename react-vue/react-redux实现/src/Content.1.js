import React from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import Connect from './react-redux'
class Content extends React.Component {
  //注意contextTypes后面的s
  static propTypes = {
    store: PropTypes.string
  }

  render() {
    return (<div>
      <p style={{ color: this.state.themeColor }}> 内容区域</p>
      <ThemeSwitch/>
    </div>)
  }
}

const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}

Content = Connect(mapStateToProps)(Content)

export default Content
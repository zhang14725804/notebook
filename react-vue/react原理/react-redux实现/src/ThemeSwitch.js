import React from 'react'
import PropTypes from 'prop-types'
import { connect} from './react-redux'

class ThemeSwitch extends React.Component {
  //注意contextTypes后面的s
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor:PropTypes.func
  }

  //点击事件 dispatch action 去改变颜色
  handleSwitchColor(color){
    if(this.props.onSwitchColor){
      this.props.onSwitchColor(color)
    }
  }

  render() {
    return (<div>
      <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
      <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
    </div>)
  }
}

const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onSwitchColor:(color)=>{
      dispatch({type:'CHANGE_COLOR',themeColor:color})
    }
  }
}

ThemeSwitch = connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch)

export default ThemeSwitch
import React from "react";
import './index.less'
export default class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  state={
    cardname: ['白卡', '红卡', '黑卡'],
    cardindex: this.props.cardindex
  }
  render() {
    return <ul className="time-horizontal">
        {this.state.cardname.map((_val)=>(
          this.state.cardname[this.props.cardindex] === _val  ? <li key={_val}><b style={{ background: '#D1A34F' }} />{_val}</li> : <li key={_val}><b />{_val}</li>
        ))}
    </ul>
  }
  shouldComponentUpdate(nextProps){
    return true
  }
}
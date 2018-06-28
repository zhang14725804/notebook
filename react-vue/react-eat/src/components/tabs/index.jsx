import React from 'react';

export default class Tabs extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tabsIndex: this.props.tabsIndex
    }
  }

  render(){
    let activeClass = { display: "inline-block", fontSize: "0.28rem", lineHeight: "0.8rem", color: "#D42A1D", borderBottom: "solid 2px #D42A1D" }
    let normalClass = { display: "inline-block", fontSize: "0.28rem", lineHeight: "0.8rem", color: "#333333" }
    return <div style={{ display: "flex", justifyContent: "space-around", background: "#FFFFFF"}}>
      {this.props.tabs.map((value, index) => (
        <span style={this.state.tabsIndex === index ? activeClass : normalClass} key={index} onClick={this.chooseTab.bind(this, index)}>{value.title}({value.totle})</span>
      ))}
    </div>
  }
  chooseTab(dataIndex){
    this.setState({
      tabsIndex:dataIndex
    })
  }
  shouldComponentUpdate(nextProps,nextState){
    return true
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      tabsIndex: nextProps.tabsIndex
    })
  }
}
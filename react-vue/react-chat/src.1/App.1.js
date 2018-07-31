import React, { Component } from 'react';


class App extends Component {
  render() {
    const language="Rust"
    return (
      <div >
        <p>最有前景的语言{language}</p>
        <Platform plat='browser'/>
        <Saving getting='17k'/>
      </div>
    );
  }
}
//函数式组件
function Saving(props){
  return <p>get in m {props.getting}</p>
}
//类组件
class Platform extends Component{
  constructor(props){
    super(props)
    this.state={
      solders:['大锤','二蛋','柱子']
    }
    //修改this指向(方法1:constructor中绑定，2：箭头函数)
    //this.addSolder=this.addSolder.bind(this)
  }
  addSolder(){
    console.log(this)
    this.setState({
      solders:[...this.state.solders,'新人'+Math.random()]
    })
  }
  render(){
    return (
      <div>
        <p>最佳平台{this.props.plat}</p>
        <ul>
          {/* <button onClick={this.addSolder}>添加新成员</button> */}
          <button onClick={()=>this.addSolder()}>添加新成员</button>
          {this.state.solders.map((solder)=>{
            return <li key={solder}>{solder}</li>
          })}
        </ul>
      </div>
    )
  }
}
export default App;

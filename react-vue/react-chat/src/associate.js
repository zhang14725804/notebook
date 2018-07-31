import React from 'react'
import {connect} from 'react-redux'
import {Link,Route,Redirect} from 'react-router-dom'

import App from './app'
import {logout} from './authReducer'

function Erpai(){
  return <h2>二排</h2>
}
function Sanpai(){
  return <h2>三排</h2>
}

@connect(
  state=>state.authReducer,
  {logout}
)
class Associate extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const match=this.props.match
    console.log(match)
    const redirectToLogin=<Redirect to="/login"></Redirect>
    const app=(
      <div>
        {this.props.isAuth? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          {/* <li><Link to="/associate/">一排</Link></li>
          <li><Link to="/associate/erpai">二排</Link></li>
          <li><Link to="/associate/sanpai">三排</Link></li> */}
          <li><Link to={`${match.url}/`}>一排</Link></li>
          <li><Link to={`${match.url}/erpai`} >二排</Link></li>
          <li><Link to={`${match.url}/sanpai`}>三排</Link></li>
        </ul>
        {/* <Route path='/associate/' exact exact component={App}></Route>
        <Route path='/associate/erpai' component={Erpai}></Route>
        <Route path='/associate/sanpai' component={Sanpai}></Route> */}

        <Route path={`${match.url}/`} exact exact component={App}></Route>
        <Route path={`${match.url}/erpai`} component={Erpai}></Route>
        <Route path={`${match.url}/sanpai`} component={Sanpai}></Route>
      </div>
    )
    return this.props.isAuth? app : redirectToLogin
  }
}

export default Associate
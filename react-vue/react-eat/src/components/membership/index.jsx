import React from "react";
import './index.less'
export default class Membership extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
  render(){
    return <div class="membership-wrapper">
      <div class="membership-content" >
        <div class="number">13164649878</div>
        <div class="type">Business Enter</div>
        <div class="name"><i class="icon"></i><span>会员种类</span></div>
        <div class="ifcode">
          <img width="49px" height="49px" src="../my/memberCode.png"/>
          <div class="text">会员码</div>
        </div>
        <div class="ifmember">13164649878</div>
      </div>
      <div class="background">
        <img width="100%" height="100%" src={this.props.imgUrl}/>
      </div>
    </div>
  }
}
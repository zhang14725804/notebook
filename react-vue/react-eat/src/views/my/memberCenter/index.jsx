import React from "react";
import { Carousel } from 'antd-mobile'
import Header from 'components/header'
import Membership from 'components/membership'
import Benefits from 'components/benefits'
import Timeline from 'components/timeline'
export default class MemberCenter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    imgUrl: ['beWhiteCard', 'beRedCard', 'beBlackCard'],
    cardindex: 1
  }
  render() {
    return <div style={{
      position: "relative",
      height: "inherit",
      backgroundColor: "#000000"}}>
      <Header title={"我的会员卡"}/>
      <Carousel autoplay={false}
        dots={false} afterChange={index => this.setState({ cardindex: index })}
        selectedIndex={1}>
        {this.state.imgUrl.map((val,index) => (
            <div key={index}>
            <div style={{ fontSize: "0.36rem",lineHeight: "0.5rem",color:"#D1A34F",textAlign: "center"}}>开通Family会员享超级权益</div>
              <Membership imgUrl={`./my/${val}@1x.png`} />
              <Benefits/>
            </div>
          ))}
      </Carousel>
      <Timeline cardindex={this.state.cardindex}/>
    </div>
  }
}
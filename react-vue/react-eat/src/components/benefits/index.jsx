import React from "react";
import { Grid} from 'antd-mobile'
export default class MemberCenter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    const dataItem=[
      {
        icon: './benefits/benefits1.png',
        benefit: '最高返2500/年',
        benefitTitle:'年终返现'
      },
      {
        icon: './benefits/benefits2.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
      {
        icon: './benefits/benefits3.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
      {
        icon: './benefits/benefits4.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
      {
        icon: './benefits/benefits5.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
      {
        icon: './benefits/benefits6.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
      {
        icon: './benefits/benefits7.png',
        benefit: '最高返2500/年',
        benefitTitle: '年终返现'
      },
    ]

    return <div style={{
                  boxSizing: "border-box",
                  width: "95%",
                  margin: "0 auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.25rem",
                  padding: "26% 2.5% 0 2.5%",
                  marginTop: "-15vh"}}>
      <div className="benefits-wrapper">
        <div style={{ lineHeight: "0.8rem", borderBottom: "#D1A34F solid 1px"}}>优享权益</div>
        <div className="">
          <Grid data={dataItem} renderItem={(dataItem)=>(
            <div style={{ padding: '12.5px' }}>
              <img src={dataItem.icon} style={{ width: '0.45rem', height: '0.5rem' }} alt="" />
              <div style={{ color: '#D5AC5F', fontSize: '0.24rem', lineHeight: '0.33rem' }}>
                <span>{dataItem.benefit}</span>
              </div>
              <div style={{ color: '#0E0E0E', fontSize: '0.26rem', lineHeight: '0.37rem' }}>
                <span>{dataItem.benefitTitle}</span>
              </div>
            </div>
          )} columnNum="3" hasLine="false" square={false} className="not-square-grid" />
        </div>
      </div>
    </div>
  }
}
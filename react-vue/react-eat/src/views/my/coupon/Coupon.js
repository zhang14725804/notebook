import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Header from 'components/header';
import Tabs from 'components/tabs';
import {Carousel} from 'antd-mobile';
import * as Actions from 'actions/Ac_Coupon'

//礼券使用情况 1:未使用 2:已使用 3:过期
const useStatus = {
    "usable": 1,
    "used": 2,
    "pastDue": 3
}
//礼券大类型 1:商品 2:现金 3:运费
const couponType = {
    "merchandise_type": 1,
    "cash_type": 2,
    "freight_type": 3
}
class Coupon extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tabs:[
                { index: 1, title: "未使用", tabType: 1, totle: 10 },
                { index: 2, title: "已使用", tabType: 2, totle: 0},
                { index: 3, title: "已过期", tabType: 3, totle: 21 }
            ],
            loading: false,
            coupons: null,
            tabsIndex: 1
        }
    }
    componentWillMount(){
        this._fetchCoupon()
    }
    _fetchCoupon(){
        
    }
    render() {

        return <div style={{ height: 'inherit', width: '100%', backgroundColor: "#FFFFFF"}}>
            <Header title={'优惠券'}  iconRight={'icon-yiwen'} {...this.props}/>
            <Tabs {...this.state}/>
            <Carousel autoplay={false} dots={false} afterChange={index => this.setState({ tabsIndex: index })}>
                {this.state.tabs.map((value,index)=>(
                    value.totle !== 0 ? <Acoupon key={index} tabType={value.tabType} /> : <div key={index} style={{ textAlign: "center" }}><img width="100%" height="auto" src="../coupon/empty.png" /><img width="60%" height="auto" src="../coupon/zi.png" /></div>
                ))}
            </Carousel>
        </div>
    }
    shouldComponentUpdate(nextState) {
        return true
    }
}
//单个优惠券
class Acoupon extends React.Component {
    constructor(props) {
        super(props);
        this.state = { descShow: false };
    }
    render(){
        return <div>
            <div style={{ boxSizing: "border-box", width: "94%", margin: "0 auto", marginTop: "4%", overflow: "hidden", padding: "2% 8% 1.5% 4%", backgroundImage: `url(./coupon/coupon${this.props.tabType}.png)`,backgroundSize:"cover",display:"flex",position:"relative"}}>
                <div style={{ display: "flex",flexDirection:"column" }}>
                    <div style={{ color: "#333333",fontWeight:"bold", fontSize: "0.28rem", lineHeight: "1rem" }}>
                        EAT VIP礼券 <span style={{ border: "1px solid #D42A1D", borderRadius: "6px", color: "#D42A1D", fontSize: "0.18rem" }}>满减</span>
                    </div>
                    <div style={{ color: "#333333", fontSize: "0.24rem", lineHeight: "0.32rem" }}>只限于购买生鲜食品专场使用</div>
                    <div style={{ color: "#666666", fontSize: "0.22rem", lineHeight: "0.3rem" }}>2017.07.10-2017.07.30</div>
                    <div onClick={this.handleClick.bind(this, this.state.descShow)} style={{ color: "#666666", fontSize: "0.22rem", lineHeight: "0.45rem" }}>
                        礼券说明 <span style={{ border: "1px solid #333333",padding:"0.04rem 0.2rem", borderRadius: "100px", color: "#333333" }}>立即使用</span>
                    </div>
                </div>
                <div style={{ width: "1.9rem", height: "1.9rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexDirection: "column", backgroundImage: `url(./coupon/coupon${this.props.tabType}-${this.props.tabType}.png)`, backgroundSize: "cover",position:"absolute",right:"0.6rem",top:"0.25rem"}}>
                    <div>
                        <span style={{ color: "#D42A1D", fontSize: "0.72rem", fontWeight: "bold", lineHeight: "1rem" }}>20</span>
                        <span style={{ color: "#000000", fontSize: "0.2rem", lineHeight: "0.28rem" }}>元</span>
                    </div>
                    <p style={{ margin: "0", color: "#D42A1D", fontSize: "0.22rem", lineHeight: "0.3rem", marginTop: "-0.15rem"}}>满100元可用</p>
                </div>
                <div style={{ position: "absolute", top: "0.3rem", right: "-0.3rem", color: "#FFFFFF", letterSpacing: "1.64px", fontSize: "0.18rem", lineHeight: "0.25rem", backgroundColor: "#F56023",padding:"0 0.3rem 0 0.3rem", transform:"rotate(46deg)"}}>即将到期</div>
            </div>
            { this.state.descShow ? <DescList/> : null}
        </div>
    }
    handleClick(descShow){
        this.setState({descShow:!this.state.descShow})
    }
}
//使用说明详情
class DescList extends React.Component{
    render(){
        return <ul style={{paddingLeft:"0.2rem", width: "88%", margin: "0 auto", listStyle: "none", backgroundColor: "#EFE4C3", border: "1px solid #F0DFCF", color: "#666666", fontSize: "0.22rem", lineHeight: "0.36rem", borderRadius: "6px" }}>
            <li>1、不可用于团购商品、积分兑换商品</li>
            <li>2、不可用于团购商品、积分兑换商品</li>
            <li>3、不可用于团购商品、积分兑换商品</li>
        </ul>
    }
}

Coupon.propTypes = {
    coupons: PropTypes.array,
    loading: PropTypes.bool,
    fetchType: PropTypes.number
}

function mapStateToProps(state){
    return {
        coupons:state.Rd_Coupon.coupons,
        couponType: state.Rd_Coupon.couponType
    }
}
function mapDispatchToProps(dispatch) {
    return {
        netCoupon:bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupon)
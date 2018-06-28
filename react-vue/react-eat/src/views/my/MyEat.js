import React from 'react'
import {Flex, Button, Grid} from 'antd-mobile'
import {Link} from 'react-router-dom';

import CK from './../../utils/CK';
import Card from './member/card/Card';
import Net from './../../utils/Net';
import Mapi from './../../config/Mapi';
import UserInfo from './eat/UserInfo';
import Strings from 'strings';

import './MyEat.css'

export default class MyEat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const that = this;
        console.log(that.props);

        return <div style={{backgroundColor: '#f4f4f4', height: 'inherit'}}>
            <div style={{backgroundColor: '#000000', height: '35%'}}></div>
            <div style={{
                position: 'fixed', top: '0px',
                width: '100%',
                height: '100%',
                overflow: 'scroll'
            }}>
                <Flex direction='column' style={{width: '100%', paddingBottom: '1.5rem'}}>
                    {<LoginInEat {...that.props}/>}
                    {<OrderInEat {...that.props}/>}
                    {<MemberInEat{...that.props}/>}
                    {<EntryInEat {...that.props}/>}
                </Flex>
            </div>

        </div>
    }
}


class LoginInEat extends React.Component {

    handleLoginClick() {
        const that = this;
        if (window.User.isLogin()) {

        } else {
            that.props.history.push('/login');
        }
    }

    render() {

        let isLogin = window.User.isLogin();
        const that = this;

        console.log(isLogin);

        return isLogin ? <UserInfo {...that.props}/> : <Flex.Item>
            <div style={{
                backgroundColor: "#00000000",
                color: "#ffffff",
                fontSize: "0.32rem",
                marginTop: "1.3rem"
            }} onClick={that.handleLoginClick.bind(that)}>{"登录 / 注册"}
            </div>
        </Flex.Item>
    }
}


class CardInOrder extends React.Component {
    render() {

        const that = this;
        const props = that.props;
        let img = '../my/personal_unpay.png';
        let txt = '';
        if (props.txt) {
            txt = props.txt;
        }

        if (props.img) {
            img = props.img;
        }

        return <div style={{
            height: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }} onClick={that.props.onClick}>
            <img src={img}/>
            <div style={{textAlign: 'center', color: '#333333', fontSize: '0.24rem'}}>{txt}</div>
        </div>
    }
}

class OrderInEat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fresh: false
        }
    }

    handleItemClick(orderIndex) {
        const that = this;
        var path = {
            // pathname: `/orderlist/${orderIndex}`,
            pathname: "/orderlist",
            state: {indexTabSelect: orderIndex},
            passProps: function (obj) {
                that.setState({fresh: true});
            }
        }
        this.props.history.push(path);
    }

    render() {

        const that = this;
        return <div className="order-bg">
            <Flex direction="column" style={{height: '100%'}}>
                <div style={{
                    height: '1.01rem',
                    lineHeight: '1.01rem',
                    float: 'left',
                    width: '96%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <span style={{color: '#333333', fontSize: '0.28rem'}}>我的订单</span>
                    <span style={{color: '#333333', fontSize: '0.24rem'}} onClick={that.handleItemClick.bind(that, 0)}>查看全部订单<img
                        style={{marginLeft: '0.1rem'}}
                        src='../arrow_right.png'/></span>
                </div>

                <div style={{backgroundColor: '#e9e9e9', height: '0.01rem', width: '96%'}}></div>

                <div className="order-items-bg">
                    <CardInOrder img={'../my/personal_unpay.png'} txt={'未付款'}
                                 onClick={that.handleItemClick.bind(that, 1)}/>
                    <CardInOrder img={'../my/personal_unsend.png'} txt={'未发货'}
                                 onClick={that.handleItemClick.bind(that, 2)}/>
                    <CardInOrder img={'../my/personal_unrecv.png'} txt={'待收货'}
                                 onClick={that.handleItemClick.bind(that, 3)}/>
                    <CardInOrder img={'../my/personal_returns.png'} txt={'退换货'}
                                 onClick={that.handleItemClick.bind(that, 4)}/>
                </div>
            </Flex>
        </div>
    }
}

class MemberInEat extends React.Component {

    render() {

        const that = this;

        return <div className="mmb-in-eat-bg">
            <div style={{fontSize: '0.28rem', color: '#333333'}}>会员中心</div>
            <div className="mmb-in-eat-card-bg">
                <Flex direction="row" style={{width: '100%', overflowX: 'scroll'}}>
                    <Link to="memberCenter"><img src="./../../my/personal_member_1_s.png"/></Link>
                    <Link to="memberCenter"><img src="./../../my/personal_member_2_s.png"/></Link>
                    <Link to="memberCenter"><img src="./../../my/personal_member_3_s.png"/></Link>
                </Flex>
            </div>
        </div>
    }
}


class EntryInEat extends React.Component {

    constructor(props) {
        super(props);
        this.clickData = [
            {imgSrc: "../my/personal_coupon.png", title: Strings.title_coupon, path: "/coupon"},
            {imgSrc: "../my/personal_addrs.png", title: Strings.title_myaddress, path: "/myaddress"},
            {imgSrc: "../my/personal_points.png", title: Strings.title_points, path: "/points"},
            {imgSrc: "../my/personal_invoice.png", title: Strings.title_invoice, path: "/invoice"},
            {imgSrc: "../my/personal_customer.png", title: Strings.title_customer, path: "/customer"}
        ];
    }

    handleItemClick(path, event) {
        const {history} = this.props;
        event.stopPropagation();
        history.push(path);
    }

    render() {
        const that = this;
        let entry = that.clickData.map(function (value, index) {
            return <CardInOrder key={index} img={value.imgSrc} txt={value.title}
                                onClick={that.handleItemClick.bind(that, value.path)} {...that.props}/>
        })
        return <div className="entry-in-eat-bg">
            {entry}
        </div>
    }
}

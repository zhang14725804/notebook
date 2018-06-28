import React from 'react';
import {Carousel} from 'antd-mobile'

import Header from 'components/header';
import List from './List';

import './OrderList.css';
import './List.css';


export default class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateState: null,
            listCards: [
                {index: 0, title: "全部", orderType: 5},
                {index: 1, title: "待付款", orderType: 0},
                {index: 2, title: "待发货", orderType: 1},
                {index: 3, title: "待收货", orderType: 2}
            ],
            indexTabSelect: 0
        };
        this.handleItemClick.bind(this);
    }

    backTip(history) {
        // alert('确定退出');
        // history.goBack();
        var that = this;
        // var update = that.props.location.passProps;
        history.goBack();
        // update({fresh: true})
        // var path = {
        //     pathname:'/',
        //     state:{fresh: true},
        // }
        // history.action='pop';
        // history.push(path);
    }

    componentWillMount() {
        const {location} = this.props;
        const {indexTabSelect} = location.state;
        this.setState({indexTabSelect: indexTabSelect});
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }

    handleItemClick(index) {
        if (index !== this.state.indexTabSelect) {
            this.setState({indexTabSelect: index});
        }
    }

    render() {
        const that = this;
        const selectIndex = that.state.indexTabSelect;
        let cards = that.state.listCards.map(function (value, index) {
            return <List key={index} index={index} selectIndex={selectIndex}
                         orderType={value.orderType} {...that.props}/>
        })
        let tabs = that.state.listCards.map(function (value, index) {
            return <ListTab key={index} title={value.title} index={index}
                            selectIndex={selectIndex}
                            clzDef="order-list-tab-bg-def"
                            clzSlt="order-list-tab-bg-slt"
                            itemClick={that.handleItemClick.bind(that)}/>
        })
        let slides = that.state.listCards.map(function (value, index) {
            return <ListTab key={index} index={index}
                            selectIndex={selectIndex}
                            clzDef="order-list-slide-bg-def"
                            clzSlt="order-list-slide-bg-slt"
                            itemClick={that.handleItemClick.bind(that)}/>
        })
        return <div className='order-list-bg'>
            {<Header {...this.props} preback={that.backTip.bind(that)} title={'我的订单'}/>}
            <div className='order-list-tabs-bg'>
                {tabs}
            </div>
            <div className='order-list-slides-bg'>
                {slides}
            </div>
            <Carousel className="list-swipe-bg" selectedIndex={selectIndex} dots={false}
                      afterChange={that.handleItemClick.bind(that)}>
                {cards}
            </Carousel>
        </div>
    }
}

class ListTab extends React.Component {

    constructor(props) {
        super(props);
        this.handleTabClick.bind(this);
    }

    handleTabClick() {
        const {itemClick, index} = this.props;
        itemClick(index);
    }

    render() {
        const that = this;
        const {index, selectIndex, title, clzDef, clzSlt} = this.props;
        let clz = clzDef;
        if (index === selectIndex) {
            clz = clzSlt;
        }
        let txt = "";
        if (title !== undefined && title !== "") {
            txt = title;
        }

        return <div className={clz} onClick={that.handleTabClick.bind(that)}>{title}</div>
    }
}







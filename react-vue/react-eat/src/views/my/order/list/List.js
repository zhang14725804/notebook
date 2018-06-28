import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';

import Strings from 'strings';
import * as Actions from 'actions/Ac_OrderList';
import Empty from 'components/empty/Empty';

import ListItem from './ListItem';

import './List.css';
import './OrderList.css';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orders: null,
        }
        this.isInited = false
        this.isFetched = false;
    }

    componentDidMount() {
        this.getOrderList();
        console.log("list componentDidMount index" + this.props.index);
    }

    getOrderList() {
        const {index, selectIndex, netOrderList, orderType, orders} = this.props;
        if (index === selectIndex) {
            this.isFetched = true;
            this.isInited = true;
            // let top = sessionStorage.getItem("list-index-" + index);
            // $(this.refs.ref_list).scrollTop(top);
            netOrderList.fetchOrderList(orderType, 20, 1);
        }
    }

    handleScroll(event) {
        const that = this;
        var target = event.target;
        console.log('clientHeight: ' + target.clientHeight);
        console.log('scrollTop: ' + target.scrollTop);
        console.log('scrollHeight: ' + target.scrollHeight);

        if (target.scrollTop === 0) {
            console.log('到顶了');
        }

        if ((target.clientHeight + target.scrollTop) === target.scrollHeight) {
            console.log('到低了');
        }
        console.log("###############-------------------------------------------############################");
    }

    componentWillReceiveProps(nextProps) {
        console.log("list componentWillReceiveProps index" + this.props.index);
        const {index, selectIndex, netOrderList, orderType} = this.props;
        const orders = this.state.orders;
        const isInited = this.isInited;
        const isFetched = this.isFetched;

        if (nextProps.index === nextProps.selectIndex && (nextProps.selectIndex !== selectIndex || !isInited
                || orders === undefined || orders === null || orders.length === 0)) {
            if (!isInited) {
                this.isInited = true;
                this.isFetched = true;
                netOrderList.fetchOrderList(orderType, 20, 1);
            } else if (orders === null || orders.length === 0) {
                if (!isFetched) {
                    this.isFetched = true;
                    netOrderList.fetchOrderList(orderType, 20, 1);
                } else if (nextProps.orders !== null && (isInited || isFetched)) {
                    this.setState({orders: nextProps.orders});
                }
                console.log("list componentWillReceiveProps show new fetch:" + nextProps.selectIndex);
            }
            // else if (nextProps.orders !== null && (isInited || isFetched)) {
            //     //(orders === undefined || orders === null || orders.length === 0) &&
            //     this.setState({orders: nextProps.orders});
            // }
            // else {
            //     if (!isFetched) {
            //         this.isFetched = true;
            //         netOrderList.fetchOrderList(orderType, 5, 1);
            //         console.log("list componentWillReceiveProps show new fetch:" + nextProps.selectIndex);
            //     }
            // }
            console.log("list componentWillReceiveProps show new select:" + nextProps.selectIndex);
            // if (isInited && isFetched && (orders === undefined || orders === null || orders.length === 0)) {
            //     // netOrderList.fetchOrderList(orderType, 5, 1);
            // } else if ((orders === undefined || orders === null) && nextProps.orders !== null && isFetched) {
            //     console.log("list componentWillReceiveProps show new setState orders:" + nextProps.selectIndex);
            //     this.setState({orders: nextProps.orders});
            //     if (!isInited) {
            //         this.setState({isInited: true});
            //     }
            // } else {
            //     // netOrderList.resetOrderList();
            //     if (!isFetched) {
            //         this.isFetched = true;
            //         netOrderList.fetchOrderList(orderType, 5, 1);
            //         console.log("list componentWillReceiveProps show new fetch:" + nextProps.selectIndex);
            //     }
            // }
        } else {
            this.isFetched = false;
        }
        // netOrderList.resetOrderList(orderType);
        // if (orders === undefined || orders === null) {
        //     this.getOrderList();
        // } else {
        //     netOrderList.resetOrderList(orderType);
        // }
        // this.getOrderList();
    }

    componentWillUnmount() {
        let {index, selectIndex} = this.props;
        // if (index === selectIndex) {
        //     let top = $(this.refs.ref_list).scrollTop;
        //     sessionStorage.setItem("list-index-" + index, top);
        // }
        console.log("list componentWillUnmount index :" + index);
    }

    componentDidUpdate() {
        // const {index, selectIndex, netOrderList, orderType} = this.props;
        // if (index === selectIndex) {
        //     let top = sessionStorage.getItem("list-index-" + index);
        //     $(this.refs.ref_list).scrollTop(top);
        //     netOrderList.fetchOrderList(orderType, 5, 1);
        // }
        console.log("list componentDidUpdate index:" + this.props.index);
    }

    handleLoad() {
        // $(this.refs.ref_list).scrollTop(1000);
    }

    handleTouchMove(event) {
        const that = this;
        console.log("touch move");
        var target = event.target;
        if (target.scrollTop === 0) {
            console.log('下拉刷新');
            that.fresh = true;
        }

        if (that.fresh) {
            // var loading = that.refs.ref_loading;
            // loading.style.display = "";
        }
    }

    handleEmptyClick() {
        const {history} = this.props;
        history.push("/");
    }

    renderList(items) {
        return <div ref='ref_list' id='list_scroll'
                    style={{overflow: 'scroll', width: '100%', flex: 1, height: "auto", textAlign: 'center'}}>
            <div ref='ref_loading'
                 style={{
                     height: '1rem',
                     lineHeight: '1rem',
                     display: 'none',
                     textAlign: 'center',
                     fontSize: '0.28rem'
                 }}>
                正在刷新...
            </div>
            {items}
        </div>
    }

    renderEmpty() {
        const that = this;
        return <Empty imgSrc={"../my/no_pic_order.png"} imgSubSrc={"../my/no_pic_order_sub.png"} imgTop={"0.7rem"}
                      imgSubTop={"0.8rem"} textTop={"1rem"} text={Strings.go_shopping}
                      btnClick={that.handleEmptyClick.bind(that)}/>;
    }

    render() {
        console.log("list render index:" + this.props.index);
        const that = this;
        const orders = this.state.orders;
        let items = [];
        if (orders !== undefined && orders !== null) {
            items = orders.map(function (value, index) {
                return <ListItem key={index} item={value} {...that.props}/>
            })
        }

        let child;
        if (items.length === 0) {
            child = that.renderEmpty();
        } else {
            child = that.renderList(items);
        }
        return <div className='list-bg'>{child}</div>
    }
}


List.propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    isLoadMore: PropTypes.bool,
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
    totalCount: PropTypes.number,
    fetchType: PropTypes.number
}

function mapStateToProps(state) {
    return {
        orders: state.Rd_OrderList.orders,
        loading: state.Rd_OrderList.loading,
        fetchType: state.Rd_OrderList.fetchType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netOrderList: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);



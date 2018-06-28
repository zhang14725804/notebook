import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'components/header';
import Empty from 'components/empty/Empty';
import Loading from 'components/loading/Loading';
import Strings from 'strings';
import * as Actions from 'actions/Ac_AddressList';
import {ENTEY_TYPE_ADDNEW, ENTEY_TYPE_EDIT} from './edit/EditAddr';

import './MyAddress.less';


class MyAddress extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {netAddressList} = this.props;
        netAddressList.fetchAddressList();
    }

    handleAddNewClick(event) {
        const {history} = this.props;
        history.push('/editaddr', {
            entryType: ENTEY_TYPE_ADDNEW
        })
        event.stopPropagation();
    }

    renderTip() {
        return <div className='addr-tip-bg'>选择不同的收货地址，商品信息可能会发生改变</div>
    }

    renderAddnew() {
        return <div className='addr-add-new' onClick={this.handleAddNewClick.bind(this)}>
            <img src='../my/addr_add_new.png'/>
            <span style={{marginLeft: '0.1rem'}}>新增收货地址</span>
        </div>
    }

    renderContent() {
        const that = this;
        const {addressList} = this.props;
        let divs = addressList.map(function (value, index) {
            return <AddrItem key={index} addr={value} {...that.props}/>
        })
        return <div className='addr-scroll-bg'>
            {divs}
        </div>;
    }

    render() {
        const that = this;
        const {addressList} = that.props;
        let divs;
        let add;
        if (addressList === undefined || addressList === null || addressList.length === 0) {
            divs = <Empty/>;
        } else {
            divs = that.renderContent();
            add = that.renderAddnew();
        }

        return <div className='my-address-bg'>
            <Header title={Strings.title_myaddress} {...that.props}/>
            {that.renderTip()}
            {divs}
            {add}
        </div>
    }

}

class AddrItem extends React.Component {


    getAddrStr() {
        const {addr} = this.props;
        return addr.provinceName + addr.cityName + addr.areaName + addr.building + addr.address;
    }

    handleEditClick() {
        const {history, addr} = this.props;
        history.push('/editaddr', {
            entryType: ENTEY_TYPE_EDIT,
            addr: addr
        })
    }

    render() {

        const {addr} = this.props;

        return <div className='addr-item-bg'>
            <div className='addr-item-left'>
                <div className='addr-item-name'>{addr.consigneeName}</div>
                <div className='addr-item-tag'>{addr.addressLabel}</div>
            </div>
            <div className='addr-item-middle'>
                <span className='addr-item-phone'>{addr.consigneeMobile}</span>
                <span className='addr-item-addrstr'>{this.getAddrStr()}</span>
            </div>
            <div className='addr-item-right' onClick={this.handleEditClick.bind(this)}>
                <img src='edit_icon.png'/>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        addressList: state.Rd_AddressList.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netAddressList: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
import React from 'react';
import {Switch, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'components/header';
import Toast from 'components/toast/ToastUtil';
import Strings from 'constants/Strings';
import * as Actions from 'actions/Ac_AddressList';

import './EditAddr.less';

const Alert = Modal.alert;
export const ENTEY_TYPE_ADDNEW = 0;
export const ENTEY_TYPE_EDIT = 1;

class EditAddr extends React.Component {

    constructor(props) {
        super(props);
        const locState = props.location.state;
        this.state = {
            addr: (locState === undefined || locState === null) ? null : locState.addr,
            curTag: (locState === undefined || locState === null) ? null :
                (locState.addr === undefined || locState.addr === null) ? null : locState.addr.addressLabel
        };
        this.tagArr = [
            {text: "家"},
            {text: "公司"},
            {text: "学校"},
            {text: "其他"}
        ];
    }

    handlePreback(history) {
        const {location} = this.props;
        const {entryType} = location.state;
        if (entryType === ENTEY_TYPE_ADDNEW) {
            Alert('', "您还没保存地址，确定退出吗？", [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        history.goBack()
                    }
                },
            ]);
        } else {
            history.goBack();
        }
    }

    handleTagClick(value, event) {
        this.setState({curTag: value});
        event.stopPropagation();
    }

    handleSaveClick() {
        const {location, netEdit} = this.props;
        const {entryType} = location.state;
        if (entryType === ENTEY_TYPE_ADDNEW) {
            let obj = this.getAddrObj();
            netEdit.fetchAddnewAddr(obj);
        } else {
            // net.putAddr();
        }
    }

    handleRightClick() {
        console.log("handleRightClick");
        const {addr} = this.state;
        const {netEdit} = this.props;
        netEdit.fetchDelAddr(addr.id);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const {location, history} = this.props;
        const {entryType} = location.state;
        const {addNewSucc, type} = nextProps;
        if (this.props !== nextProps) {
            if (addNewSucc && type === "add" && entryType === ENTEY_TYPE_ADDNEW) {
                Toast.show(Strings.add_addr_succ);
                history.goBack();
            } else if (addNewSucc && type === "del" && entryType === ENTEY_TYPE_EDIT) {
                Toast.show(Strings.del_addr_succ);
                history.goBack();
            }
        }
    }

    getAddrObj() {
        let name = this.refs.ref_input_name;
        let phone = this.refs.ref_input_phone;
        let city = this.refs.ref_input_city;
        let building = this.refs.ref_input_building;
        let address = this.refs.ref_input_address;
        let tag = this.state.curTag;
        let isDefault = false;


        let obj = {
            "country": 86,
            "province": "310000",
            "city": "310100",
            "area": "310104",
            "addressLabel": "公司",
            "address": "sedsd",
            "building": "保利.时光里",
            "longitude": "121.46255",
            "latitude": "31.188499",
            "consigneeName": "doing",
            "consigneeMobile": "18392184857",
            "isDefault": 0
        }

        return obj;
    }

    getCityStr(addr) {
        return addr.provinceName + " " + addr.cityName + " " + addr.areaName;
    }

    getIconRight() {
        const {location, history} = this.props;
        const {entryType} = location.state;
        let clz;
        if (entryType === ENTEY_TYPE_EDIT) {
            clz = 'addr-delete-bg';
        }
        return clz;
    }

    getRightHandle() {
        const {location, history} = this.props;
        const {entryType} = location.state;
        return entryType === ENTEY_TYPE_EDIT ? this.handleRightClick.bind(this) : null;
    }

    renderTags() {
        const {curTag} = this.state;
        const that = this;
        let divs = this.tagArr.map(function (value, index) {
            let clz = 'addr-tag-bg';
            if (curTag !== undefined && curTag !== null && curTag === value.text) {
                clz = 'addr-tag-slt-bg';
            }
            return <div key={index} className={clz}
                        onClick={that.handleTagClick.bind(that, value.text)}>{value.text}</div>
        })
        return divs;
    }

    renderLine() {
        return <div style={{height: '0.01rem', width: '100%', backgroundColor: '#f4f4f4'}}/>;
    }

    render() {
        const {addr} = this.state;
        const that = this;
        let line = this.renderLine();
        let tagDivs = this.renderTags();
        let iconRight = this.getIconRight();

        return <div className='edit-addr-bg'>
            <Header title={Strings.title_editaddr} {...this.props} preback={that.handlePreback.bind(this)}
                    iconRight={iconRight}
                    rightClick={that.getRightHandle()}/>
            <div className='edit-input-bg'>
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg'>收货人</span>
                    <input ref={'ref_input_name'} className='edit-input-value-bg' placeholder="姓名"
                           defaultValue={(addr === undefined || addr === null) ? "" : addr.consigneeName}/>
                </div>
                {line}
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg'>手机号</span>
                    <input ref={'ref_input_phone'} className='edit-input-value-bg' placeholder="收货人电话"
                           defaultValue={(addr === undefined || addr === null) ? "" : addr.consigneeMobile}/>
                </div>
            </div>

            <div className='edit-input-bg edit-top'>
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg'>所在城市</span>
                    <input ref={'ref_input_city'} className='edit-input-value-bg' placeholder="请选择您所在的城市"
                           defaultValue={(addr === undefined || addr === null) ? "" : this.getCityStr(addr)}/>
                </div>
                {line}
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg'>收货地址</span>
                    <input ref={'ref_input_building'} className='edit-input-value-bg' placeholder="小区／写字楼／学校"
                           defaultValue={(addr === undefined || addr === null) ? "" : addr.building}/>
                </div>
                {line}
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg' style={{visibility: 'hidden'}}>收货地址</span>
                    <input ref={'ref_input_address'} className='edit-input-value-bg' placeholder="（街道／单元／门牌号）"
                           defaultValue={(addr === undefined || addr === null) ? "" : addr.address}/>
                </div>
                {line}
                <div className='edit-line-bg'>
                    <span className='edit-input-title-tag-bg'>标签</span>
                    {tagDivs}
                </div>
                {line}
                <div className='edit-line-bg'>
                    <span className='edit-input-title-bg'>设置默认地址</span>
                    <Switch disabled={false} checked={false}/>
                </div>
            </div>

            <div className='addr-save-bg' onClick={that.handleSaveClick.bind(that)}>保存收货地址</div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        addNewSucc: state.Rd_EditAddr.succ,
        type: state.Rd_EditAddr.type
    }
}

function mapPropsToDispatch(dispatch) {
    return {
        netEdit: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(EditAddr);
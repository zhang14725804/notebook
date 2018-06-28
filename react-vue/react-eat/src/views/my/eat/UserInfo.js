import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'

import Card from '../member/card/Card';
import CK from 'utils/CK';

import * as Actions from "actions/Ac_UserInfo";

class UserInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.isFisrReq = true;
    }

    renderLevel0(ui) {
        return <div style={{
            width: '90%',
            height: "auto",
            marginTop: "1rem",
            color: "#ffffff",
        }}>
            <div style={{fontSize: '0.36rem'}}>{ui.userName}</div>
            <div style={{marginTop: '0.17rem', height: '0.3rem', lineHeight: '0.3rem'}}>
                <img src='./../my/p_level_tag.png' style={{verticalAlign: 'center'}} alt=""/>
                <span style={{fontSize: "0.24rem", marginLeft: '0.1rem'}}>{ui.levelName}</span>
            </div>
        </div>
    }


    renderLevelGt0(ui) {
        return <Card/>;
    }

    renderReal(userinfo) {

        if (userinfo.level === 0) {
            return this.renderLevel0(userinfo);
        }

        return this.renderLevelGt0(userinfo);
    }

    componentDidMount() {
        let userInfo = this.state.userInfo;
        if (userInfo === undefined || userInfo === null) {
            this.getUserInfo();
        }
    }

    getUserInfo() {
        let json = CK.get("userinfo_json");
        console.log(json);
        const _userInfo = JSON.parse(CK.get("userinfo_json"));
        const {netUser} = this.props;
        const that = this;
        if (_userInfo !== undefined && _userInfo !== null && _userInfo !== "" && _userInfo !== "null") {
            that.setState({userInfo: _userInfo});
            return;
        }

        if (this.isFisrReq) {
            this.isFisrReq = false;
            netUser.fetchUserinfo();
            // Net.request(Mapi.my.baseinfo.path)
            //     .then(function (rep) {
            //         CK.set("userinfo_json", JSON.stringify(rep.data), "240h");
            //         that.setState({userInfo: rep.data});
            //     })
            //     .catch(function (err) {
            //
            //     })
        }
    }

    render() {
        const that = this;
        const userInfo = that.state.userInfo || that.props.userInfo;
        return userInfo == null ? <div/> : this.renderReal(userInfo);
    }
}

UserInfo.propTypes = {
    loading: PropTypes.bool,
    userInfo: PropTypes.object,
    status: PropTypes.object,
    errMsg: PropTypes.string
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        netUser: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
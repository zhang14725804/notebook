import React from 'react'
import Toast from '../../../components/toast/ToastUtil';
import './Login.less'
import net from '../../../utils/Net';
import CK from '../../../utils/CK';
import Mapi from '../../../config/Mapi';
import 'whatwg-fetch'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mark: true,
        };
        this.countdown = 60;
        this.timer = null;
    }

    back() {
        this.props.history.goBack();
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {

        var that = this;
        return <div className="login-box">
            <img style={{
                marginLeft: '0.5rem',
                marginTop: '0.5rem',
                top: '0',
                position: 'fixed',
                alignSelf: 'flex-start'
            }}
                 src='../my/back_round_bg.png' onClick={that.back.bind(this)}/>

            <div className='login-input-bg'>
                <img src='../my/login_input_bg.png' style={{width: '100%', height: 'auto'}}></img>
                <input ref='ref_input_phone' type='text' className='login-input' placeholder='请输入手机号'/>
            </div>

            <div className='login-input-bg' style={{marginTop: '0.2rem'}}>
                <img src='../my/login_input_bg.png' style={{width: '100%'}}></img>
                <input type='text' ref="ref_input_code" className='login-input' placeholder='请输入验证码'/>
                <span ref="verifyCode" onClick={this.state.mark ? this.getVerifyCode.bind(this) : null}> 获取验证码</span>
                {/*<input style={{}}/>*/}A
            </div>

            <div className='login-submit-bg' onClick={that.submit.bind(that)}>
                <img src='../my/login_submit_text.png'/>
                <div className='login-submit'>登录</div>
            </div>
        </div>
    }

    getVerifyCode() {

        var ref_phone = this.refs.ref_input_phone;
        var phone = ref_phone.value;
        if (phone === undefined || phone === "") {
            Toast.show("请您输入正确的手机号");
            return;
        }


        if (this.state.mark) {
            this.getCodeReal(phone);
        }
        let _this = this;
        let obj = _this.refs.verifyCode;
        if (_this.countdown === 0) {
            obj.innerText = "获取验证码";
            _this.countdown = 60;
            _this.setState({mark: true});

            return;
        } else {
            obj.innerText = this.countdown + "s后重新发送";
            _this.countdown--;
            _this.setState({mark: false});
        }
        this.timer = setTimeout(function () {
                _this.getVerifyCode()
            }
            , 1000)
    }

    getCodeReal(phone) {
        net.request(Mapi.my.getcode.path + "?mobile=" + phone)
            .then(function (rep) {
                let sessionId = CK.get("sessionId");
                if (sessionId == undefined || sessionId === null || sessionId === "" || sessionId === "null") {
                    CK.set("sessionId", rep.sessionId, "240h");
                }
                if (rep.code === 0) {
                    Toast.show("获取验证码成功");
                }
            })
            .catch(function (err) {
                console.log('request failed', err)
                Toast.show(err);
            })
    }

    submit() {

        let that = this;
        let ref_phone = this.refs.ref_input_phone;
        let phone = ref_phone.value;
        if (phone === undefined || phone === "") {
            Toast.show("请您输入正确的手机号");
            return;
        }

        let ref_code = this.refs.ref_input_code;
        let code = ref_code.value;
        if (code === undefined || code === "") {
            Toast.show("请您输入正确的验证码");
            return;
        }

        let body = {
            "mobile": phone,
            "verifyCode": code,
            "mergeType": '0',
            "backURL": "",
            "unionId": "",
            "appChannel": ""
        };

        let data = "mobile=" + phone + "&verifyCode=" + code + "&mergeType=" + 0 + "&backURL=" + "&unionId=&appChannel=";

        let init = {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json, text/javascript, */*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };

        net.request(Mapi.my.login.path, init)
            .then(function (reps) {
                let rep = reps.response;
                if (rep.data != null && rep.code === 0) {
                    Toast.show("登录成功");
                    CK.set("token", rep.data.token, "240h");
                    CK.set("sessionId", rep.sessionId, "240h");
                    if (that.timer) {
                        clearTimeout(that.timer);
                    }
                    that.back();
                } else {
                    Toast.show(net.errMsg(rep));
                }
            })
            .catch(function (err) {
                console.log('request failed', err.response);
            })
    }
}
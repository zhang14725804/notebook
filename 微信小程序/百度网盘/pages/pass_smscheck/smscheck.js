var t = require("../../pass_utils/sendSmsbtnFn"), e = require("../../pass_utils/clearInputFn"), n = require("../../pass_utils/switchBtnFn"), s = require("../../pass_requestapi/getSmsCodeFn"), i = require("../../pass_requestapi/getLoginInfo"), a = require("../../pass_requestapi/checkSmsCodeFn");

Page({
    data: {
        inputValue: "",
        textContent: "重新获取验证码",
        flag: !1,
        count: 60
    },
    onLoad: function(t) {
        this.setData({
            telnum: t.telnum,
            vcodestr: t.vcodestr,
            notRegist: t.notRegist
        });
    },
    onReady: function() {
        t.sendSmsBtnFn(this, this.data.count);
    },
    smsCodeInput: function(t) {
        var e = t.detail.value;
        return n.changeBtnColorFn(e, this, "inputValue"), /^\d+$/.test(e) ? void 0 : e.substring(0, e.length - 1);
    },
    submitSmsCode: function() {
        this.data.inputValue.length > 0 && (1 == this.data.notRegist ? a.checkSmsCode(this) : i.getLoginInfo(this));
    },
    reSendCode: function() {
        this.data.flag || (t.sendSmsBtnFn(this, this.data.count), this.setData({
            reget: 1
        }), s.getSmsCodeFn(this));
    },
    clearInput: function() {
        e.clearInputFn(this, "inputValue");
    }
});
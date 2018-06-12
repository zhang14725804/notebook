var t = require("../../pass_utils/addTelSpaceFn"), e = require("../../pass_utils/toastFn"), n = require("../../pass_utils/switchBtnFn"), a = require("../../pass_utils/clearInputFn"), s = require("../../pass_requestapi/getPhoneStatus");

Page({
    data: {
        telnum: "",
        toasttxt: ""
    },
    onLoad: function() {},
    onReady: function() {
        var t = getCurrentPages();
        try {
            wx.setStorageSync("pageStackLength", t.length);
        } catch (t) {
            console.log(t);
        }
    },
    phoneInput: function(e) {
        var a = e.detail.value, s = this;
        n.changeBtnColorFn(a, s, "telnum"), s.setData({
            telnum: t.addTelSpace(a)
        });
    },
    clearValue: function() {
        a.clearInputFn(this, "telnum");
    },
    loginbtn: function() {
        var t = this, n = t.data.telnum.replace(/[ ]/g, "");
        n.length > 0 && (/^\d{11}$/.test(n) ? s.getPhoneStatusFn(n, t) : e.toastFn(t, "手机号码格式错误"));
    }
});
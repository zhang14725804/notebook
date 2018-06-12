var t = require("../../pass_requestapi/regNamePwd"), e = require("../../pass_utils/toastFn");

Page({
    data: {
        inputType: "password",
        openEye: !1,
        eyeIcon: "none",
        eyeStateInit: !1,
        password: ""
    },
    onLoad: function(t) {
        this.setData({
            telnum: t.telnum,
            smsCode: t.smsCode,
            notRegist: t.notRegist,
            ignoreBtn: t.showIgnoreBtn ? "block" : "none",
            errNo: t.errNo ? t.errNo : ""
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    passwordInput: function(t) {
        var e = t.detail.value;
        return e.length > 0 && this.setData({
            eyeIcon: "block",
            btnColor: "#fff",
            showType: !1,
            password: e
        }), 0 == e.length && this.setData({
            eyeIcon: "none",
            btnColor: "",
            showType: e
        }), e.substring(0, 14);
    },
    eyeShowEvent: function() {
        var t = !this.data.eyeStateInit;
        this.setData({
            openEye: t,
            inputType: t ? "text" : "password",
            eyeStateInit: t
        });
    },
    submitPassWord: function() {
        var n = /^.{6,14}$/.test(this.data.password);
        this.data.password.length > 0 && (n ? t.regNamePwd(this) : e.toastFn(this, "密码为6-14位英文、数字和下划线"));
    },
    ignoreSetinfo: function() {
        var t = void 0, e = getCurrentPages();
        try {
            (t = wx.getStorageSync("pageStackLength")) && wx.navigateBack({
                delta: e.length - t + 1
            });
        } catch (t) {
            console.log(t);
        }
    }
});
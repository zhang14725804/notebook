var e = require("../../pass_requestapi/regUser"), t = require("../../pass_utils/clearInputFn"), n = require("../../pass_utils/toastFn"), a = require("../../pass_utils/regValidate");

Page({
    data: {
        inputType: "password",
        eyeStateInit: !1,
        ignoreBtn: "none",
        user_name: "",
        password: ""
    },
    onLoad: function(e) {
        this.setData({
            telnum: e.telnum,
            smsCode: e.smsCode,
            notRegist: e.notRegist,
            ignoreBtn: e.showIgnoreBtn ? "block" : "none",
            errNo: e.errNo ? e.errNo : ""
        });
    },
    userNameInput: function(e) {
        var t = e.detail.value, n = this.data.password, a = {
            user_name: t
        };
        return t.length > 0 && (a.clearIcon = "block"), 0 == t.length && (a.clearIcon = "none", 
        a.btnColor = ""), t.length > 0 && n.length > 0 && this.setData({
            btnColor: "#fff"
        }), t.length > 14 ? t.substring(0, 14) : void this.setData(a);
    },
    passwordInput: function(e) {
        var t = e.detail.value, n = this.data.user_name, a = {};
        return t.length > 0 && (n && (a = {
            btnColor: "#fff"
        }), a.eyeIcon = "block", a.showType = !1, a.password = t, this.setData(a)), 0 == t.length && this.setData({
            eyeIcon: "none",
            btnColor: "",
            showType: this.eyeStateInit
        }), t.length > 14 ? t.substring(0, 14) : void 0;
    },
    eyeShowEvent: function() {
        var e = !this.data.eyeStateInit;
        this.setData({
            openEye: e,
            inputType: e ? "text" : "password",
            eyeStateInit: e
        });
    },
    clearInput: function() {
        t.clearInputFn(this, "user_name");
    },
    regUserBtn: function() {
        var t = this.data.user_name, s = this.data.password;
        if (t.length > 0 && s.length > 0) {
            if (!a.regValidateFunc(t, "username")) return void n.toastFn(this, "用户名最长14个字符,支持中英文、数字或下划线");
            if (!a.regValidateFunc(s, "password")) return void n.toastFn(this, "密码为6-14位英文、数字和下划线");
            e.regUser(this);
        }
    },
    ignoreSetinfo: function() {
        var e = void 0, t = getCurrentPages();
        try {
            (e = wx.getStorageSync("pageStackLength")) && wx.navigateBack({
                delta: t.length - e + 1
            });
        } catch (e) {
            console.log(e);
        }
    }
});
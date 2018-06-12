function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/api.js")), a = (require("../../utils/util.js"), e(require("../../libs/lodash.core.min.js")), 
e(require("../../libs/es6-promise.min")), require("../wetoast/wetoast.js"), getApp());

Component({
    properties: {
        showPopup: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        confirmText: "手动填写",
        writeByself: !1,
        isImgCaptchError: !1,
        captchImgUrl: "",
        smsCaptchText: "",
        getCode: "获取验证码",
        phoneNumber: "",
        count: 60,
        captchCode: "",
        scrollTop: 0,
        userLogin: !1,
        myuuid: "",
        phoneIcon: "../../resource/images/inquiry/icon-phone.png",
        autoInModalImage: "../../resource/images/index/auto.png"
    },
    ready: function() {
        new a.WeToast();
    },
    methods: {
        toggleDialog: function(e) {
            var t = this;
            wx.getNetworkType({
                success: function(e) {
                    "none" != e.networkType ? t.setData({
                        showPopup: !t.data.showPopup,
                        writeByself: !1,
                        confirmText: "手动填写"
                    }) : wx.showModal({
                        title: "网络出现故障",
                        content: "请更换良好的网络环境再进行尝试。",
                        showCancel: !1
                    });
                }
            });
        },
        manualInput: function() {
            this.setData({
                writeByself: !this.data.writeByself,
                confirmText: "自动获取" == this.data.confirmText ? "手动填写" : "自动获取",
                captchaFocus: !1
            }), this.resetForm();
        },
        resetForm: function() {
            this.setData({
                captchCode: "",
                phoneNumber: "",
                captchImgUrl: "",
                count: 60,
                getCode: "获取验证码"
            }), clearInterval(a.verifyTimer);
        },
        getPhoneNumberInPopup: function(e) {
            a.getPhoneNumber(e, this.getPhoneSuccessInModal.bind(this), this.getPhoneFailedInModal.bind(this));
        },
        getPhoneSuccessInModal: function(e) {
            this.loginAutoFunc(e);
        },
        getPhoneFailedInModal: function() {},
        loginAutoFunc: function(e) {
            var o = this, n = e.detail.encryptedData, s = e.detail.iv;
            o.data.showPopup && o.setData({
                showPopup: !o.data.showPopup
            }), a.postLongTimeToast(t.default.getWeixinBindPhone, {
                encryptedData: n,
                iv: s
            }, function(e, t, n) {
                t && 0 == t.code && (o.setData({
                    phoneNumber: t.data.phoneNumber,
                    userPhone: t.data.phoneNumber,
                    userLogin: !0
                }, function() {
                    o.checkMessageCodeSuccess();
                }), a.saveCache("user-phone-info", {
                    phone: t.data.phoneNumber
                }), o.autoGetPhoneNmuberSuccess(t));
            }), wx.hideToast();
        },
        handleOnTapCaptcha: function() {
            "获取验证码" == this.data.getCode && (/^1[34578]\d{9}$/.test(this.data.phoneNumber) ? (this.setCaptchUrl(), 
            this.setData({
                "ui.showCaptchaPopup": !0
            })) : wx.showToast({
                title: "请填写正确手机号",
                icon: "none",
                duration: 700
            }));
        },
        setCaptchUrl: function() {
            var e = this;
            a.fetch(t.default.fetchCaptchUrl, {}, function(t, a, o) {
                "success" !== o && o || e.setData({
                    captchImgUrl: a.data
                });
            });
        },
        beginTimer: function() {
            var e = this;
            a.verifyTimer = setInterval(function() {
                var t = e.data.count - 1;
                e.setData({
                    count: t,
                    getCode: t
                }), t < 1 && (clearInterval(a.verifyTimer), e.setData({
                    count: 60,
                    getCode: "获取验证码"
                }));
            }, 1e3);
        },
        handleOnPhoneNumberInput: function(e) {
            this.setData({
                phoneNumber: e.detail.value
            });
        },
        handleOnCaptchCodeInput: function(e) {
            this.setData({
                captchCode: e.detail.value
            }), 4 == this.data.captchCode.length && this.checkImgCaptchSubmit();
        },
        checkImgCaptchSubmit: function(e) {
            var o = this, n = this, s = n.data.captchCode;
            if ("string" == typeof s && s.trim().length > 3) if (/^\d{4}$/.test(s)) {
                n.data.phoneNumber;
                a.fetch(t.default.fetchSmsCaptcha, {
                    type: "Login",
                    mobile: n.data.phoneNumber,
                    imgCaptcha: s
                }, function(e, t, a) {
                    400 != parseInt(t.code) ? "img-captch-error" === a ? (n.setData({
                        isImgCaptchError: !0
                    }), wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 700
                    }), n.setCaptchUrl()) : (o.setData({
                        "ui.showCaptchaPopup": !1,
                        isImgCaptchError: !1,
                        captchaFocus: !0
                    }), wx.showToast({
                        title: "发送成功",
                        icon: "success",
                        duration: 700
                    }), n.beginTimer()) : wx.showToast({
                        title: "获取验证码过于频繁，请稍后再试",
                        icon: "none",
                        duration: 700
                    });
                });
            } else n.setData({
                isImgCaptchError: !0
            });
        },
        handleOnFormSubmit: function(e) {
            var o = this;
            o.setData({
                smsCaptchText: e.detail.value.smsCaptcha
            }), a.fetch(t.default.fetchUser, {}, function(e, n, s) {
                n.data && n.data.mobile === o.data.phoneNumber || a.post(t.default.ahsUserLogin, {
                    mobile: o.data.phoneNumber,
                    smsCaptcha: o.data.smsCaptchText
                }, function(e, t, n) {
                    0 == t.code ? (o.setData({
                        showPopup: !1,
                        userPhone: o.data.phoneNumber,
                        userLogin: !0
                    }), a.saveCache("user-phone-info", {
                        phone: o.data.phoneNumber
                    }), o.checkMessageCodeSuccess()) : wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 700
                    });
                });
            });
        },
        checkMessageCodeSuccess: function() {
            var e = this, t = {
                data: {
                    purePhoneNumber: e.data.phoneNumber
                }
            }, a = {};
            e.triggerEvent("checkMessageloginSuccess", t, a);
        },
        checkMessageCodeFail: function() {
            var e = this, t = {
                data: {
                    purePhoneNumber: e.data.phoneNumber
                }
            }, a = {};
            e.triggerEvent("checkMessageloginFail", t, a);
        },
        autoGetPhoneNmuberSuccess: function() {
            var e = this, t = {
                data: {
                    purePhoneNumber: e.data.phoneNumber
                }
            }, a = {};
            e.triggerEvent("autoGetloginSuccess", t, a);
        },
        autoGetPhoneNmuberFail: function() {
            var e = this, t = {
                data: {
                    purePhoneNumber: e.data.phoneNumber
                }
            }, a = {};
            e.triggerEvent("autoGetloginFail", t, a);
        }
    }
});
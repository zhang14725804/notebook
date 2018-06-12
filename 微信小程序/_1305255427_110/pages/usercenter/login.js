function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/api.js")), a = (require("../../utils/util.js"), t(require("../../libs/lodash.core.min.js")), 
t(require("../../libs/es6-promise.min")), require("../../components/wetoast/wetoast.js"), 
getApp());

Page({
    data: {
        phoneNumber: "",
        isPhoneFinish: !1,
        isSmsCodeFinish: !1,
        isSendingCode: !1,
        smsCode: "",
        getCode: "获取验证码",
        verifyTimer: null,
        count: 60,
        isShowCaptchPopup: !1,
        isImgCaptchError: !1,
        imgCaptchText: "",
        captchImgUrl: "",
        piwikSource: "",
        successRedirectUrl: null
    },
    onLoad: function(t) {
        if (t.url) {
            var e = decodeURIComponent(t.url);
            this.setData({
                successRedirectUrl: e
            });
        }
    },
    handleOnPhoneNumberInput: function(t) {
        var e = t.detail.value;
        /^1\d{10}$/.test(e) ? this.setData({
            isPhoneFinish: !0
        }) : this.setData({
            isPhoneFinish: !1
        }), this.setData({
            phoneNumber: e
        });
    },
    clearAll: function() {
        this.setData({
            phoneNumber: "",
            isPhoneFinish: !1
        });
    },
    handleOnSmsCodeInput: function(t) {
        var e = t.detail.value;
        /^\d{6}$/.test(e) ? this.setData({
            isSmsCodeFinish: !0
        }) : this.setData({
            isSmsCodeFinish: !1
        }), this.setData({
            smsCode: e
        });
    },
    handleOnTapCaptcha: function() {
        var t = this, s = this.data, i = s.isPhoneFinish, n = s.isSendingCode, o = s.phoneNumber, c = s.imgCaptchText, h = this;
        i && !n && a.fetch(e.default.getSmsCode, {
            type: "Login",
            mobile: o,
            imgCaptcha: c
        }, function(e, a, s) {
            if (0 == a.code) {
                t.setData({
                    isShowCaptchPopup: !1,
                    isImgCaptchError: !1
                }), wx.showToast({
                    title: "验证码发送成功",
                    icon: "success",
                    duration: 3e3
                });
                var i = setInterval(function() {
                    var e = t.data.count - 1;
                    t.setData({
                        count: e,
                        getCode: e + "s后重新获取",
                        isSendingCode: !0
                    }), e < 1 && (clearInterval(i), h.setData({
                        count: 60,
                        getCode: "重新获取",
                        isSendingCode: !1
                    }));
                }, 1e3);
            } else {
                if (3001 == a.code) return void t.setData({
                    isShowCaptchPopup: !0,
                    captchImgUrl: a.data.captchaUrl,
                    imgCaptchText: ""
                });
                if (3002 == a.code) return void t.setData({
                    isImgCaptchError: !0,
                    captchImgUrl: a.data.captchaUrl,
                    imgCaptchText: ""
                });
            }
        });
    },
    handleOnFormSubmit: function() {
        var t = this.data, s = t.phoneNumber, i = t.smsCode, n = t.successRedirectUrl;
        a.post(e.default.ahsUserLogin, {
            mobile: s,
            smsCaptcha: i
        }, function(t, e, i) {
            0 == e.code ? (a.saveCache("user-phone-info", {
                phone: s
            }), n && n.length ? wx.redirectTo({
                url: n
            }) : wx.redirectTo({
                url: "./index"
            })) : wx.showToast({
                title: e.message,
                icon: "none",
                duration: 700
            });
        });
    },
    checkCaptchSubmit: function(t) {
        var e = t.detail.value.captch;
        /^\d{4}$/.test(e) ? (this.setData({
            imgCaptchText: e
        }), this.handleOnTapCaptcha()) : this.setData({
            isImgCaptchError: !0
        });
    },
    setCaptchUrl: function() {
        var t = this;
        a.fetch(e.default.fetchCaptchUrl, {}, function(e, a, s) {
            "success" !== s && s || t.setData({
                captchImgUrl: a.data
            });
        });
    }
});
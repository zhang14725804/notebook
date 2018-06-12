var t = getApp(), a = require("../../../api/index.js"), e = require("../../../utils/util.js");

Page({
    data: {
        avatarUrl: "https://cdn-ssl.meb.com/wxa/v1/default-avatar.png",
        form: {
            mobilePhone: "",
            mobileCode: ""
        },
        button: {
            loading: !1,
            disabled: !1,
            text: "获取验证码"
        },
        submit: {
            loading: !1,
            disabled: !1
        },
        interval: void 0,
        time: 30
    },
    onLoad: function() {},
    inputMobile: function(t) {
        this.data.form.mobilePhone = t.detail.value;
    },
    inputCode: function(t) {
        this.data.form.mobileCode = t.detail.value;
    },
    sendCode: function() {
        var t = this;
        /^1[34578]\d{9}$/.test(this.data.form.mobilePhone) ? (this.setData({
            button: {
                loading: !0,
                disabled: !0,
                text: "发送中"
            }
        }), a.signIn.getCode({
            mobile: this.data.form.mobilePhone
        }).then(function(a) {
            0 == a.data.messageId ? (t.setData({
                button: {
                    loading: !1,
                    disabled: !0,
                    text: "已发送"
                },
                avatarUrl: a.data.message
            }), t.loopTime()) : t.setData({
                button: {
                    loading: !1,
                    disabled: !1,
                    text: "获取验证码"
                }
            });
        })) : wx.showToast({
            title: "手机号码错误",
            icon: "none",
            duration: 1500
        });
    },
    loopTime: function() {
        var t = this, a = this.data.interval, e = this.data.button, i = this.data.time;
        a = setInterval(function() {
            i <= 30 && (i--, e.text = i + " s"), 0 == i && (i = 30, e = {
                loading: !1,
                disabled: !1,
                text: "获取验证码"
            }, clearInterval(a)), t.setData({
                button: e,
                time: i
            });
        }, 1e3);
    },
    signIn: function() {
        var i = this;
        /^1[34578]\d{9}$/.test(this.data.form.mobilePhone) ? "" != this.data.form.mobileCode ? (this.setData({
            submit: {
                loading: !0,
                disabled: !0
            }
        }), a.signIn.login({
            mobile: this.data.form.mobilePhone,
            code: this.data.form.mobileCode
        }).then(function(a) {
            0 == a.data.messageId ? e.storage.set("token", a.data.result.accessToken).then(function() {
                t.globalData.authToken = a.data.result.accessToken;
                var i = {
                    headImage: a.data.result.headImage,
                    nickname: a.data.result.nickname,
                    userId: a.data.result.userId
                };
                e.storage.set("userinfo", i).then(function() {
                    t.globalData.userInfo = i, wx.navigateBack({
                        delta: 2
                    });
                });
            }) : (wx.showToast({
                title: a.data.message,
                icon: "none",
                duration: 1500
            }), i.setData({
                submit: {
                    loading: !1,
                    disabled: !1
                }
            }));
        })) : wx.showToast({
            title: "验证码错误",
            icon: "none",
            duration: 1500
        }) : wx.showToast({
            title: "手机号码错误",
            icon: "none",
            duration: 1500
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/index/index"
        };
    }
});
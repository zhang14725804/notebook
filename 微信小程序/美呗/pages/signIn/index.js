var t = getApp(), e = require("../../api/index.js"), n = require("../../utils/util.js");

Page({
    data: {
        isAuth: !1,
        authentication: !0
    },
    onLoad: function() {
        var t = this;
        this.data.authentication && wx.checkSession({
            success: function(e) {
                n.storage.get("session_key").then(function(e) {
                    t.setData({
                        isAuth: !0
                    });
                }).catch(function(e) {
                    t.getCode();
                });
            },
            fail: function() {
                t.getCode();
            }
        });
    },
    getCode: function() {
        var t = this;
        wx.login({
            success: function(a) {
                a.code && e.signIn.getSession({
                    code: a.code,
                    type: 1
                }).then(function(e) {
                    t.setData({
                        isAuth: !0
                    }), n.storage.set("session_key", e.data.session_key);
                }).catch(function(e) {
                    t.setData({
                        isAuth: !1
                    });
                });
            },
            fail: function() {
                t.setData({
                    isAuth: !1
                });
            }
        });
    },
    getPhoneNumber: function(a) {
        var i = a.detail;
        this.data.isAuth && (wx.showLoading({
            title: "正在登陆"
        }), n.storage.get("session_key").then(function(a) {
            e.signIn.getUserMobile({
                inputdata: i.encryptedData,
                sessionkey: a,
                iv: i.iv
            }).then(function(a) {
                e.signIn.logint({
                    mobile: a.data.phoneNumber
                }).then(function(e) {
                    if (0 != e.data.messageId) return wx.showToast({
                        title: "登录失败",
                        icon: "none",
                        duration: 1500
                    });
                    var a = e.data.result;
                    n.storage.set("token", a.accessToken).then(function() {
                        t.globalData.authToken = a.accessToken;
                        var e = {
                            headImage: a.headImage,
                            nickname: a.nickname,
                            userId: a.userId
                        };
                        n.storage.set("userinfo", e).then(function() {
                            t.globalData.userInfo = e, wx.hideLoading(), wx.navigateBack({
                                delta: 1
                            });
                        });
                    });
                });
            });
        }));
    },
    toLogin: function() {
        wx.navigateTo({
            url: "../../pages/signIn/input/index"
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/index/index"
        };
    }
});
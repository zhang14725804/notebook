var e = require("../../user/milogin/util/util"), a = require("../../user/milogin/util/md5"), t = (require("../../util/util"), 
require("../../util/conf.js"), getApp()), o = require("../../util/tracker.js");

Page({
    data: {
        err: "",
        checkTipsHidden: !0,
        changeTypeHide: !1,
        sendBtnTitle: "获取验证码",
        sendBtnDisabled: !1,
        checkStatus: -1,
        maxlength: 11,
        maxtest: 6,
        loginName: "用户名登录",
        phoneFocus: !0,
        passFocus: !1,
        loginType: "phone"
    },
    loginData: {
        phone: null,
        code: null
    },
    sendData: {},
    conf: {
        callbackUrl: "",
        COUNTTIMES: 60,
        loginType: t.conf.loginType,
        smsLogin: {
            usrInput: "number",
            pwdInput: "number",
            usrPlaceholder: "手机号码",
            pwdPlaceholder: "短信验证码",
            getSMSCodeHide: !1,
            maxlength: 11,
            maxtest: 6,
            loginName: "用户名登录",
            phoneFocus: !0,
            passFocus: !1,
            openeye: !1,
            loginType: "phone"
        },
        pwdLogin: {
            usrInput: "text",
            pwdInput: "password",
            usrPlaceholder: "邮箱/手机号码/小米ID",
            pwdPlaceholder: "密码",
            getSMSCodeHide: !0,
            maxlength: -1,
            maxtest: -1,
            loginName: "短信登录",
            phoneFocus: !0,
            passFocus: !1,
            openeye: !1,
            loginType: "pass"
        }
    },
    phoneInput: function(e) {
        var a = this;
        a.loginData.phone = e.detail.value, "smsLogin" === a.conf.loginType && 11 === e.detail.value.length && a.setData({
            passFocus: !0,
            phoneFocus: !1
        });
    },
    smsInput: function(e) {
        this.loginData.code = e.detail.value;
    },
    clearInput: function(e) {
        var a = this;
        a.loginData.phone = "", a.setData({
            phone: ""
        });
    },
    wxPhoneLogin: function(a) {
        var n = this;
        a.detail.iv && a.detail.encryptedData && e.getWXUserInfo(function(i, s) {
            if (s) console.error(s); else {
                var r = {
                    sid: t.appInfo.sid,
                    wxSToken: t.storageData.wxSToken,
                    appid: t.appInfo.appid,
                    callback: t.appInfo.callback,
                    authType: t.appInfo.authType,
                    userInfo: i,
                    phoneIV: a.detail.iv,
                    phoneData: a.detail.encryptedData
                };
                e.smslogin(r, function(e, a) {
                    if (a) return n.setData({
                        err: a
                    }), void o.push({
                        logCode: "wx#bid=3076643.3&page=milogin",
                        clue: "smsLogin",
                        analyse: "tap"
                    });
                    if (0 === e.code) a = "", t.storageData.location = e.location || "", t.storageData.userId = e.userId, 
                    t.storageData.vid ? n.mergeAccount(e.userId, t.storageData.vid, function() {
                        t.storageData.serviceToken = e.serviceToken || "", t.storageData.vid = "", t.storageData.vToken = "", 
                        t.storageData.loginEnd = !0, wx.setStorage({
                            key: "loginInfo",
                            data: t.storageData
                        }), wx.navigateBack({
                            delta: 1
                        });
                    }) : (t.storageData.serviceToken = e.serviceToken || "", t.storageData.loginEnd = !0, 
                    wx.setStorage({
                        key: "loginInfo",
                        data: t.storageData
                    }), wx.navigateBack({
                        delta: 1
                    })); else if (70013 === e.code) return void n.checkPwd();
                    n.setData({
                        err: a
                    });
                });
            }
        });
    },
    getSMSCode: function() {
        var a = this, o = "";
        if (a.loginData.phone ? e.validatePhone(a.loginData.phone) || (o = "手机号格式错误") : o = "请输入手机号", 
        o) a.setData({
            err: o
        }); else {
            var n, i = {
                phone: a.loginData.phone,
                sid: t.appInfo.sid,
                wxSToken: t.storageData.wxSToken
            }, s = i.phone, r = a.sendData;
            r[s] || (r[s] = {}), (n = r[s]).isSending || (n.hasInitQuota ? a.sendSMS(i) : e.checkSMSQuota(s, function(e, t) {
                t ? a.setData({
                    err: t
                }) : 0 === e.code ? (n.left = parseInt(e.info), n.times = 0, n.hasInitQuota = !0, 
                a.sendSMS(i)) : (o = "系统错误", a.sendFail(o), a.setData({
                    err: o
                }));
            }));
        }
    },
    sendSMS: function(a) {
        var t, o = this, n = {};
        if (o.sendData[o.loginData.phone]) {
            if (0 === (n = o.sendData[o.loginData.phone]).left) return t = "您今天已经发送太多短信，请换个时间或改用其他验证方式", 
            o.sendFail(t), void o.setData({
                err: t
            });
            n.left <= 2 && n.left > 0 && (t = "您今天还能发送" + n.left + "条短信", o.setData({
                err: t
            }));
        }
        e.sendTicket(a, function(e, a) {
            if (a) return o.setData({
                err: a.errMsg
            }), void o.sendFail(t);
            0 === e.code && (n.left = Math.max(n.left - 1, 0), n.countdown = (n.times += 1) * o.conf.COUNTTIMES, 
            o.sendSuccess());
        });
    },
    sendFail: function(e) {
        this.setData({
            sendBtnTitle: "重新发送",
            smsDisabled: !1,
            err: e
        });
    },
    sendSuccess: function() {
        var e, a, t = this, o = {}, n = !1;
        t.sendData[t.loginData.phone] && (o = t.sendData[t.loginData.phone]);
        clearTimeout(e), function i() {
            o.countdown--, a = "重新发送(" + o.countdown + ")", o.countdown >= 1 ? (n = !0, e = setTimeout(function() {
                i();
            }, 980)) : (n = !1, a = "重新发送"), t.setData({
                sendBtnTitle: a,
                smsDisabled: n,
                passFocus: !0,
                phoneFocus: !1
            });
        }();
    },
    changeLoginType: function() {
        var e = this;
        "smsLogin" === e.conf.loginType ? e.conf.loginType = "pwdLogin" : e.conf.loginType = "smsLogin", 
        e.loginData.phone = /^1(2|3|4|5|7|8)\d{9}$/.test(e.loginData.phone) ? e.loginData.phone : "", 
        e.loginData.code = "", e.setData(e.conf[e.conf.loginType]), e.setData({
            phone: e.loginData.phone,
            code: "",
            err: ""
        });
    },
    getPhoneNumber: function(e) {
        console.log(e.detail.errMsg), console.log(e.detail.iv), console.log(e.detail.encryptedData);
    },
    submitLogin: function() {
        var e = this;
        "smsLogin" === e.conf.loginType ? e.smsLogin() : e.pwdLogin(), e.setData({
            phoneFocus: !1,
            passFocus: !1
        });
    },
    smsLogin: function() {
        var a = this, n = "";
        a.loginData.phone ? e.validatePhone(a.loginData.phone) ? a.loginData.code ? /^\d{3,}$/.test(a.loginData.code) ? e.getWXUserInfo(function(n, i) {
            if (i) console.error(i); else {
                var s = {
                    phone: a.loginData.phone,
                    sid: t.appInfo.sid,
                    wxSToken: t.storageData.wxSToken,
                    appid: t.appInfo.appid,
                    callback: "",
                    ticket: a.loginData.code,
                    authType: t.appInfo.authType,
                    userInfo: n
                };
                e.smslogin(s, function(e, n) {
                    if (n) return a.setData({
                        err: n
                    }), void o.push({
                        logCode: "wx#bid=3076643.3&page=milogin",
                        clue: "smsLogin",
                        analyse: "tap"
                    });
                    if (0 === e.code) n = "", t.storageData.location = e.location || "", t.storageData.userId = e.userId, 
                    t.storageData.vid ? a.mergeAccount(e.userId, t.storageData.vid, function() {
                        t.storageData.serviceToken = e.serviceToken || "", t.storageData.vid = "", t.storageData.vToken = "", 
                        t.storageData.loginEnd = !0, wx.setStorage({
                            key: "loginInfo",
                            data: t.storageData
                        }), wx.navigateBack({
                            delta: 1
                        });
                    }) : (t.storageData.serviceToken = e.serviceToken || "", t.storageData.loginEnd = !0, 
                    wx.setStorage({
                        key: "loginInfo",
                        data: t.storageData
                    }), wx.navigateBack({
                        delta: 1
                    })); else if (70013 === e.code) return void a.checkPwd();
                    a.setData({
                        err: n
                    });
                });
            }
        }) : n = "短信验证码错误" : n = "请输入短信验证码" : n = "手机号格式错误" : n = "请输入手机号", a.setData({
            err: n
        });
    },
    checkPwd: function() {
        var e = this;
        e.changeLoginType("pwdLogin"), e.setData({
            checkTipsHidden: !1,
            changeTypeHide: !0
        });
    },
    pwdLogin: function() {
        var n = this, i = "";
        n.loginData.phone ? e.validateUser(n.loginData.phone) ? n.loginData.code ? e.getWXUserInfo(function(i) {
            var s = {
                user: n.loginData.phone,
                sid: t.appInfo.sid,
                wxSToken: t.storageData.wxSToken,
                appid: t.appInfo.appid,
                callback: "",
                password: n.loginData.code,
                hash: a.hash(n.loginData.code),
                authType: t.appInfo.authType,
                userInfo: i
            };
            e.pwdlogin(s, function(e, a) {
                if (a) return n.setData({
                    err: a
                }), void o.push({
                    logCode: "wx#bid=3076643.2&page=milogin",
                    clue: "pwdLogin",
                    analyse: "tap"
                });
                0 === e.code && (a = "", t.storageData.location = e.location || "", t.storageData.userId = e.userId, 
                t.storageData.vid ? n.mergeAccount(e.userId, t.storageData.vid, function() {
                    t.storageData.serviceToken = e.serviceToken || "", t.storageData.vid = "", t.storageData.vToken = "", 
                    t.storageData.loginEnd = !0, wx.setStorage({
                        key: "loginInfo",
                        data: t.storageData
                    }), wx.navigateBack({
                        delta: 1
                    });
                }) : (t.storageData.serviceToken = e.serviceToken || "", t.storageData.loginEnd = !0, 
                wx.setStorage({
                    key: "loginInfo",
                    data: t.storageData
                }), wx.navigateBack({
                    delta: 1
                })));
            });
        }) : i = "请输入密码" : i = "用户名错误" : i = "请输入用户名", n.setData({
            err: i
        });
    },
    onLoad: function(e) {
        var a = this;
        if (a.setData(a.conf[a.conf.loginType]), t && !t.storageData.serviceToken) return t.doLogin().then(function(e) {}), 
        void a.setData({
            checkStatus: 0
        });
        a.setData({
            checkStatus: 0
        });
    },
    mergeAccount: function(a, o, n) {
        wx.setStorageSync("timestampOfChangeingVirtualAccount", new Date().getTime()), e.getWXUserInfo(function(e, i) {
            if (!i) {
                var s = e.encryptedData, r = e.iv;
                t.request("user/bindVisitor", {
                    vid: o,
                    encrypted_data: s,
                    user_id: a,
                    iv: r
                }, function(e, a) {
                    n();
                });
            }
        });
    },
    openEye: function() {
        console.log(1);
        var e = this;
        this.setData({
            openeye: !0,
            pwdInput: "text",
            code: e.loginData.code
        });
    },
    closeEye: function() {
        console.log(2);
        var e = this;
        this.setData({
            openeye: !1,
            pwdInput: "password",
            code: e.loginData.code
        });
    }
});
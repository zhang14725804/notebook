var e = getApp(), t = require("../../util/util.js"), s = require("../../util/conf.js"), a = require("../../util/md5.js"), o = require("../../util/base64.js").Base64, i = require("../../util/tracker.js");

Page({
    data: {
        check_status: 0,
        msgTxt: "发送验证码",
        focus: !0,
        telErr: !1,
        tel: "",
        yzm: "",
        pswd: "",
        yzmDis: !0,
        deviceId: "",
        sns_profile: "",
        ticketToken: "",
        xm_wechat_session_key: "",
        msgTime: 0,
        msgCount: 0,
        step: 0,
        pwdfocus: !1,
        mobileInputFocus: !0,
        vcodeInputFocus: !1,
        verifyDisable: !1,
        sendDisable: !1
    },
    onShow: function(e) {
        i.push();
    },
    onLoad: function(s) {
        var a = this;
        e.storageData.vid ? (a.setData({
            loading: !0
        }), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4
        }), e.request("user/checkbind", {}, function(e, s) {
            if (s) return t.hideLoading(), a.setData({
                loading: !1
            }), void (10121003 == s.code ? a.setData({
                check_status: 1
            }) : 10121004 == s.code ? a.setData({
                check_status: 2
            }) : t.showError("服务异常请稍后再试,或下载小米商城APP"));
            a.ssoLogin();
        })) : wx.navigateBack({
            delta: 1
        });
    },
    inputTel: function(e) {
        var t = e.detail.value;
        t && t.length >= 11 ? this.setData({
            tel: e.detail.value,
            telErr: !1,
            focus: !1
        }) : this.setData({
            tel: e.detail.value,
            telErr: !1
        });
    },
    inputYzm: function(e) {
        this.setData({
            yzm: e.detail.value,
            telErr: !1
        });
    },
    inputpwd: function(e) {
        this.setData({
            pswd: e.detail.value
        });
    },
    tapTel: function(e) {
        var s = this;
        return s.data.tel.length < 0 ? (t.showError("请输入手机号"), void s.setData({
            telErr: !0
        })) : /^1\d{10}$/.test(s.data.tel) ? void (s.data.msgTime > 0 || (s.setData({
            telErr: !1,
            yzmDis: !1
        }), s.sendMsg())) : (t.showError("请输入正确的手机号"), void s.setData({
            telErr: !0
        }));
    },
    sendMsg: function() {
        var s = this;
        s.setData({
            msgTime: 60 * (s.data.msgCount + 1),
            msgCount: s.data.msgCount + 1
        });
        setInterval(function() {
            s.setData({
                msgTime: s.data.msgTime - 1
            });
        }, 1e3);
        t.showLoading(), e.request("pass/sendticket", {
            phone: s.data.tel,
            sns_profile: s.data.sns_profile,
            deviceId: s.data.deviceId,
            session_key: s.data.xm_wechat_session_key
        }, function(e, s) {
            t.hideLoading(), s && (70008 == s.code ? t.showError("输入的手机号格式不正确请检查后重新输入") : 70022 == s.code ? t.showError("抱歉，手机验证码服务已经超出限制请明天再试或下载小米商城App") : t.showError("登录授权服务异常，请稍后再试或者下载小米商城App"));
        });
    },
    tapverifyPhoneTicket: function() {
        var s = this;
        s.data.yzm ? (s.setData({
            verifyDisable: !0
        }), t.showLoading(), e.request("pass/loginticket", {
            phone: s.data.tel,
            sns_profile: s.data.sns_profile,
            deviceId: s.data.deviceId,
            ticket: s.data.yzm,
            session_key: s.data.xm_wechat_session_key
        }, function(e, a) {
            if (t.hideLoading(), s.setData({
                verifyDisable: !1
            }), a) 20003 == a.code ? s.bind(encodeURIComponent(s.getValueInArr(a.data, "serviceToken")), s.getValueInArr(a.data, "userId")) : 70014 == a.code ? t.showError("验证码错误，请重新尝试") : 70013 == a.code ? s.setData({
                ticketToken: s.getValueInArr(a.data, "ticketToken"),
                step: 3
            }) : t.showError("登录授权服务异常，请稍后再试或者下载小米商城App"); else {
                var o = e.data || {};
                s.bind(encodeURIComponent(s.getValueInArr(o, "serviceToken")), s.getValueInArr(o, "userId"));
            }
        })) : t.showError("请输入验证码");
    },
    bind: function(s, a) {
        var o = this;
        o.setData({
            step: 1
        }), wx.showToast({
            title: "绑定中",
            icon: "loading",
            duration: 1e4
        }), o.wxLogin(function(o, i) {
            var n = o.code, r = i.encryptedData, d = i.iv;
            e.request("user/bindVisitor", {
                user_id: a,
                encrypted_data: r,
                iv: d,
                code: n
            }, function(o, i) {
                t.hideLoading(), i ? t.showError("服务异常请稍后再试,或下载小米商城APP") : (e.storageData.serviceToken = s, 
                e.storageData.userId = a, e.storageData.vToken = "", e.storageData.vid = "", wx.setStorage({
                    key: "loginInfo",
                    data: e.storageData
                }), wx.showToast({
                    title: "绑定成功",
                    icon: "success",
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }));
            });
        });
    },
    tapSendPwd: function() {
        var s = this;
        s.data.pswd ? (s.setData({
            sendDisable: !0
        }), t.showLoading(), e.request("pass/loginpwd", {
            hash: a.md5(s.data.pswd).toUpperCase(),
            phone: s.data.tel,
            sns_profile: s.data.sns_profile,
            ticketToken: s.data.ticketToken,
            deviceId: s.data.deviceId,
            session_key: s.data.xm_wechat_session_key
        }, function(e, a) {
            if (t.hideLoading(), s.setData({
                sendDisable: !1
            }), a) 70016 == a.code ? t.showError("密码不正确，请重新输入") : 24013 == a.code ? t.showError(a.description || "和已经绑定的社交帐号冲突") : t.showError("登录服务器异常，请稍后重试，或下载小米商城App"); else {
                var o = e.data || {};
                s.bind(encodeURIComponent(s.getValueInArr(o, "serviceToken")), s.getValueInArr(o, "userId"));
            }
        })) : t.showError("请输入密码");
    },
    getValueInArr: function(e, t) {
        for (var s = 0, a = e.length; s < a; s++) if (e[s].name == t) return e[s].value;
    },
    wxLogin: function(e) {
        wx.login({
            success: function(s) {
                s.code ? wx.getUserInfo({
                    success: function(t) {
                        e(s, t);
                    },
                    fail: function(e) {
                        t.showTipsSwitchTab("不授权无法完成购买,返回继续浏览商品", "/pages/index/index");
                    }
                }) : t.showTipsSwitchTab("用户授权失败", "/pages/index/index");
            },
            fail: function(e) {
                t.showTipsSwitchTab("不授权无法完成购买,返回继续浏览商品", "/pages/index/index");
            }
        });
    },
    ssoLogin: function() {
        var a = this;
        a.wxLogin(function(i, n) {
            i.code, s.sid, s.appid;
            e.request("pass/logincode", {
                code: i.code,
                userInfo: o.encode(JSON.stringify(n))
            }, function(e, s) {
                if (t.hideLoading(), a.setData({
                    loading: !1
                }), s) if (20003 == s.code) {
                    var o = a.getValueInArr(s.data, "deviceId"), i = a.getValueInArr(s.data, "sns_profile"), n = a.getValueInArr(s.data, "xm_wechat_session_key");
                    a.setData({
                        deviceId: o,
                        sns_profile: i,
                        xm_wechat_session_key: n,
                        step: 2
                    });
                } else t.showError("登录授权服务异常，请稍后再试或者下载小米商城App"); else {
                    var r = e.data || [], d = encodeURIComponent(a.getValueInArr(r, "serviceToken")), c = a.getValueInArr(r, "userId");
                    a.bind(d, c);
                }
            });
        });
    },
    mobileInputFocus: function() {
        this.setData({
            mobileInputFocus: !0,
            vcodeInputFocus: !1
        });
    },
    mobileInputBlur: function() {
        this.setData({
            mobileInputFocus: !1
        });
    },
    vcodeInputFocus: function() {
        this.setData({
            vcodeInputFocus: !0,
            mobileInputFocus: !1
        });
    },
    vcodeInputBlur: function() {
        this.setData({
            vcodeInputFocus: !1
        });
    },
    pwdFocus: function() {
        this.setData({
            pwdFocus: !0
        });
    },
    pwdBlur: function() {
        this.setData({
            pwdFocus: !1
        });
    }
});
function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../api/Ptag/Ptag_utils.js")), s = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("../../api/Ptag/Ptag_constants")), o = require("../../bases/component.js"), i = (require("../../common/navigator.js").goto, 
require("../../models/my/accountData.js")), r = require("../../common/base64/base64.js"), n = require("../../common/rsa/rsa"), p = require("../../models/my/assetsData.js"), u = require("../../common/cookie-v2/cookie.js"), d = require("../../common/toast/toast"), c = require("../../api/Ptag/report_manager"), l = 0, g = 521293285;

new o({
    properties: {
        options: {
            type: Object,
            value: {}
        }
    },
    data: {
        popup: {
            show: 0,
            type: 0,
            title: "",
            content: "",
            accountType: 0,
            pin: "",
            inputValue: {},
            errObj: {},
            codeType: 0
        },
        msgCode: {
            checkType: 0
        },
        rsaObj: {}
    },
    attached: function() {
        var t = getCurrentPages();
        this.page = t[t.length - 1], this.getRsaInfo(1);
        var e = this;
        i.getCurPinInfo({}, function(t, a) {
            if (1 != a.accountType && 2 != a.accountType && 3 != a.accountType) d.show({
                icon: d.ICON.SUCCESS,
                content: "您的京东账号已关联微信账号，请继续购物",
                page: e
            }); else {
                var s = {
                    type: 3 == a.accountType ? 1 : 3,
                    title: "登录京东商城",
                    accountType: a.accountType,
                    pin: a.base.curPin,
                    rurl: e.page.route,
                    show: 1
                }, o = Object.assign(e.data.popup, s);
                e.setPopUpData(o);
                var i = 3 == a.accountType ? "7414.12.1" : "7414.12.2";
                c.addPtagExposure(i);
            }
        }), g = this.data.options.sceneid;
    },
    methods: {
        toLoginPage: function() {
            this.data.popup;
            this.showLoginPage(this), a.default.addPtag("7414.12.3");
        },
        showLoginPage: function(t, e) {
            i.getImgCode(function(a, s) {
                if (0 == a) {
                    var o = {
                        type: 2,
                        title: "登录京东账号",
                        picCode: "https:" + s.url,
                        cid: s.cid,
                        tel: ""
                    };
                    Object.assign(o, e), t.setPopUpData(o);
                }
            });
        },
        tocompletePage: function() {
            this.data.popup;
            var t = {
                title: "补全账号信息",
                type: 3
            };
            this.setPopUpData(t), a.default.addPtag("7414.12.4");
        },
        closePopUp: function(t) {
            var e = {
                show: 0
            };
            this.setPopUpData(e, 2), this.triggerEvent("setBindPopUpStatus", t);
        },
        toDone: function(t) {
            this.data.options.rurl ? (this.data.options.rurl.indexOf("/"), this.data.options.rurl) : this.data.popup.rurl && (this.data.popup.rurl.indexOf("/"), 
            this.data.popup.rurl);
            var e = {
                show: 0
            };
            this.setPopUpData(e, 2), u.removeCookie([ "wq_uin", "wq_skey" ]), this.triggerEvent("setUserInfo", t), 
            this.triggerEvent("setBindPopUpStatus", t);
        },
        judgeTel: function(t) {
            this.getTelValidator(t);
            var e = 3 == this.data.popup.accountType ? "7414.12.5" : "7414.12.8";
            a.default.addPtag(e);
        },
        inputBlur: function(e) {
            var a = "delete" + e.target.dataset.sign + "Value", s = "input" + e.target.dataset.sign + "Focus", o = t({
                inputValue: Object.assign(this.data.popup.inputValue, t({}, a, e.detail.value))
            }, s, 0);
            this.setPopUpData(o, 2);
        },
        inputFocus: function(e) {
            var a, s = "delete" + e.target.dataset.sign + "Value", o = "input" + e.target.dataset.sign + "Focus", i = (a = {
                inputValue: Object.assign(this.data.popup.inputValue, t({}, s, e.detail.value))
            }, t(a, o, 1), t(a, "errObj", {}), a);
            this.setPopUpData(i, 2);
        },
        deleteVal: function(e) {
            var a, s = "delete" + e.target.dataset.sign, o = "delete" + e.target.dataset.sign + "Value", i = (a = {}, 
            t(a, s, 1), t(a, "inputValue", t({}, o, "")), a);
            this.setPopUpData(i, 2);
        },
        seeOrno: function(t) {
            var e = {};
            e = 1 == this.data.popup.seeSign ? {
                seeSign: 0
            } : {
                seeSign: 1
            }, this.setPopUpData(e, 2);
        },
        setPopUpData: function(t, e) {
            var a = this.data.popup;
            if (t.inputValue && 3 != e && (t.inputValue = Object.assign(a.inputValue, t.inputValue)), 
            Object.assign(a, t), this.setData({
                popup: a
            }), 0 == l || 1 == e) {
                var s = this;
                wx.removeStorage({
                    key: "backInfo",
                    success: function(t) {
                        console.log(t.data), 3 != e && 2 != e && (l++, s.setStorage(a));
                    }
                });
            } else 3 != e && 2 != e && (l++, this.setStorage(a));
        },
        setStorage: function(t) {
            wx.getStorage({
                key: "backInfo",
                success: function(e) {
                    console.log(e.data), t.inputValue = {}, t.errObj = {};
                    var a = e.data || [];
                    if (a && a.split("|") && a.split("|")[l - 1]) {
                        var s = a.split("|");
                        s[l - 1] = JSON.stringify(t), a = s.join("|");
                    } else a = (a || "") + "|" + JSON.stringify(t);
                    wx.setStorage({
                        key: "backInfo",
                        data: a
                    });
                },
                fail: function() {
                    wx.setStorage({
                        key: "backInfo",
                        data: JSON.stringify(t)
                    });
                }
            });
        },
        showAccountTips: function() {
            var t = this.data.popup, e = {
                accountTipsShow: 1,
                show: 0
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        closeAccountTips: function() {
            var t = this.data.popup, e = {
                accountTipsShow: 0,
                show: 1
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        toBack: function() {
            var t = this;
            wx.getStorage({
                key: "backInfo",
                success: function(a) {
                    console.log(a.data);
                    var s = a.data;
                    if (s && s.split("|") && s.split("|")[l - 2]) s.split("|")[l - 2].type, t.setPopUpData(JSON.parse(s.split("|")[l - 2]), 3), 
                    l -= 1; else {
                        var o = {
                            show: 0
                        };
                        t.setPopUpData(o, 3);
                    }
                    clearInterval(e);
                }
            });
        },
        getPicCode: function() {
            var t = this.data.popup, e = this;
            i.getImgCode(function(a, s) {
                if (0 == a) {
                    var o = {
                        picCode: "https:" + s.url,
                        cid: s.cid
                    };
                    Object.assign(t, o), e.setData({
                        popup: t
                    });
                }
            });
        },
        sendMsgCode: function() {
            var t = this.data.msgCode;
            if (1 == t.sendStatus && 0 == t.sendSign) return !0;
            this.getMsgCode(t.tel, this);
        },
        unbindTel: function() {
            var t = this.data.popup, e = {
                unbindTipsShow: 1,
                show: 0
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        closeUnbindTips: function() {
            var t = this.data.popup, e = {
                unbindTipsShow: 0,
                show: 1
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        toUnbindTel: function() {
            var t = {};
            t.rurl = encodeURIComponent(this.data.popup.rurl), t.tel = this.data.popup.tel ? r.base64encode(this.data.popup.tel) : "", 
            t.sceneid = g, a.default.addPtag("7414.12.12");
            var e = "//wqs.jd.com/my/unbindtel.shtml?rurl=" + t.rurl + "&tel=" + t.tel + "&sceneid=" + t.sceneid;
            this.$goto("/pages/h5/index", {
                url: e
            });
        },
        forgetPsw: function() {
            a.default.addPtag("7414.12.11");
            var t = "//plogin.m.jd.com/cgi-bin/m/mfindpwd?appid=300&returnurl=" + decodeURIComponent("https://wqs.jd.com/" + this.data.popup.rurl);
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        toBind: function(t) {
            var e = {
                sceneid: g,
                username: this.getRsaInfo(2, 3 == this.data.popup.accountType ? this.data.popup.tel ? this.data.popup.tel : this.toTrim(t.detail.value.username) : this.data.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(t.detail.value.password)),
                picid: this.data.popup.cid,
                piccode: this.toTrim(t.detail.value.verifyCode),
                rurl: this.data.popup.rurl,
                index: this.data.rsaObj.keyIndex,
                atk: 9
            }, s = this, o = s.data.popup;
            this.getValidator(1, t, function(t) {
                if (!t) return !1;
                i.bind(e, function(t, e) {
                    0 == e.retcode && s.showResult(1), 1 == e.isUpdateCode && i.getImgCode(function(t, e) {
                        if (0 == t) {
                            var a = {
                                picCode: "https:" + e.url,
                                cid: e.cid
                            };
                            Object.assign(o, a), s.setData({
                                popup: o
                            });
                        }
                    });
                    var a = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(o, a), s.setData({
                        popup: o
                    });
                });
            });
            var r = 3 == o.accountType ? "7414.12.7" : "7414.12.9";
            a.default.addPtag(r);
        },
        toComplete: function(t) {
            var e = {
                sceneid: g,
                mobile: this.getRsaInfo(2, this.data.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(t.detail.value.password)),
                smscode: this.toTrim(t.detail.value.msgcode),
                rurl: this.data.popup.rurl,
                index: this.data.rsaObj.keyIndex,
                atk: 9
            }, s = this.data.popup.accountType, o = this, r = this.data.popup;
            this.getValidator(2, t, function(t) {
                if (!t) return !1;
                3 == s && i.complete(e, function(t, e) {
                    0 == e.retcode && o.showResult(2);
                    var a = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(r, a), o.setData({
                        popup: r
                    });
                }), 1 != s && 2 != s || i.register(e, function(t, e) {
                    0 == e.retcode && o.showResult(2);
                    var a = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(r, a), o.setData({
                        popup: r
                    });
                });
            });
            var n = 3 == s ? "7414.12.6" : "7414.12.9";
            a.default.addPtag(n);
        },
        showResult: function(t) {
            var e = this.data.options.bindactiveid ? this.data.options.bindactiveid : "", a = this.data.options.bindlevel ? this.data.options.bindlevel : -1, s = {}, o = this;
            "" == e || -1 == a ? (s = {
                type: 5,
                resultTips: 1 == t ? "登录成功" : "补全信息成功",
                drawTips: ""
            }, this.setPopUpData(s), u.removeCookie([ "wq_uin", "wq_skey" ])) : p.drawCoupon(e, a, function(e) {
                s = 0 == e.ret && 0 == e.bingo.bingoret && 0 != e.bingo.bingolevel ? {
                    type: 5,
                    resultTips: 1 == t ? "登录成功" : "补全信息成功",
                    drawTips: "恭喜获得" + e.award.awardcode + "元优惠券"
                } : {
                    type: 5,
                    resultTips: 1 == t ? "登录成功" : "补全信息成功",
                    drawTips: "抱歉，优惠券已发完"
                }, o.setPopUpData(s), 3 == o.data.accountType ? o.data.otherPin && u.removeCookie([ "wq_uin", "wq_skey" ]) : u.removeCookie([ "wq_uin", "wq_skey" ]);
            }), 3 == this.data.accountType && p.queryOtherPinAssets(function(t) {
                if (0 == t.errcode) {
                    for (var e = 0; e < t.anotherpin.length; e++) if (1 == t.pintype[e]) {
                        t.jbean = t.jbeannum[e], t.jdcoupon = t.jdcouponnum[e];
                        break;
                    }
                    var a = t.anotherpin.length > 0 && (t.jbean > 0 || t.jdcoupon > 0) ? 1 : 0, i = t.anotherpin.length > 0 ? t.anotherpin[0] : "", r = t.jdcoupon, n = t.jbean;
                    s = {
                        hasAssets: a,
                        otherPin: i,
                        otherPinCoupon: r,
                        otherPinJbean: n
                    }, o.setPopUpData(s);
                }
                o.data.resultTips && u.removeCookie([ "wq_uin", "wq_skey" ]);
            });
        },
        getValidator: function(t, e, a) {
            var s = {
                errObj: {
                    usernameError: 0,
                    passwordError: 0,
                    verifyCodeError: 0,
                    telError: 0
                },
                hasbind: 0
            }, o = Object.assign(this.data.popup, s);
            if (this.setData({
                popup: o
            }), 1 == t) {
                var i = this.toTrim(3 == this.data.popup.accountType ? this.data.popup.tel ? this.data.popup.tel : e.detail.value.username : this.data.popup.bindaccount), r = this.toTrim(e.detail.value.password), n = this.toTrim(e.detail.value.verifyCode);
                if ("" == i || "" == r || "" == n) {
                    var p = "" == i ? "请输入用户名/邮箱/手机号" : "" == r ? "请输入密码" : "请输入验证码";
                    s = {
                        errObj: "" == i ? {
                            usernameError: 1,
                            errMsg: p
                        } : "" == r ? {
                            passwordError: 1,
                            errMsg: p
                        } : {
                            verifyCodeError: 1,
                            errMsg: p
                        }
                    };
                    var u = Object.assign(this.data.popup, s);
                    return this.setData({
                        popup: u
                    }), void a(0);
                }
                a(1);
            }
            if (2 == t) {
                var d = this.toTrim(e.detail.value.password), c = this.toTrim(e.detail.value.msgcode), l = "";
                if ("" == d || "" == c) {
                    l = "" == c ? "请输入验证码" : "请输入密码", s = {
                        errObj: "" == c ? {
                            verifyCodeError: 1,
                            errMsg: l
                        } : {
                            passwordError: 1,
                            errMsg: l
                        }
                    };
                    var g = Object.assign(this.data.popup, s);
                    return this.setData({
                        popup: g
                    }), void a(0);
                }
                var h = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(d), f = /^\d+$/.test(d), v = /^[a-zA-Z]+$/.test(d);
                if (!h || f || v) {
                    s = {
                        errObj: {
                            passwordError: 1,
                            errMsg: l = "6-20个字符（字母、数字和符号），建议至少使用2种组合"
                        }
                    };
                    var b = Object.assign(this.data.popup, s);
                    return this.setData({
                        popup: b
                    }), void a(0);
                }
                a(1);
            }
        },
        toTrim: function(t) {
            return t.replace(/(^\s+)|(\s+$)/g, "");
        },
        getTelValidator: function(t) {
            var e = this.toTrim(t.detail.value.tel), a = this.data.popup.accountType;
            if ("" == e) {
                var s = {
                    errObj: {
                        telError: 1,
                        errMsg: 3 == a ? "请输入手机号" : "请输入手机号/邮箱/账户名"
                    }
                }, o = Object.assign(this.data.popup, s);
                return this.setData({
                    popup: o
                }), !1;
            }
            if (3 == this.data.popup.accountType && !/^1\d{10}$/.test(e)) {
                var r = {
                    errObj: {
                        telError: 1,
                        errMsg: "手机号码输入有误，请重新输入。目前暂不支持非大陆手机号码。"
                    }
                }, n = Object.assign(this.data.popup, r);
                return this.setData({
                    popup: n
                }), !1;
            }
            if (/^1\d{10}$/.test(e)) {
                var p = this;
                i.judge(e, function(t, s) {
                    if (0 == s.ret) {
                        if (1 == s.type) {
                            var o = {
                                errObj: {
                                    telError: 1,
                                    errMsg: "该手机注册的京东账号已关联其他微信账号，请解除关联后重新登录并绑定。"
                                },
                                hasbind: 1,
                                tel: e,
                                bindaccount: e
                            }, i = Object.assign(p.data.popup, o);
                            p.setData({
                                popup: i
                            });
                        }
                        if (2 == s.type) {
                            var r = {
                                tel: e,
                                bindaccount: e,
                                type: 2,
                                isTel: 1
                            };
                            p.showLoginPage(p, r);
                        }
                        if (3 == s.type) {
                            var n = {
                                title: 3 != a ? "登录京东账号" : "补全账号信息",
                                type: 4,
                                tel: e,
                                bindaccount: e
                            };
                            p.setPopUpData(n);
                            var u = {
                                sendSign: 1,
                                sendTips: "请发送验证码至",
                                msgTips: "发送验证码",
                                tel: e,
                                bindaccount: e,
                                codeType: 0
                            };
                            p.setData({
                                msgCode: u
                            });
                        }
                    }
                });
            } else {
                var u = {
                    tel: e,
                    bindaccount: e
                };
                this.showLoginPage(this, u);
            }
        },
        getRsaInfo: function(t, e) {
            var a = this;
            if (1 == t && i.GetRsaKeyModulus().then(function(t) {
                if (0 == t.retcode) {
                    var e = a.data.rsaObj;
                    e.key = t.modulus, e.keyIndex = t.index, e.isGary = !0;
                }
            }).catch(function(t) {}), 2 == t) {
                e = r.base64encode(encodeURIComponent(e));
                var s = this.data.rsaObj.key;
                n.setMaxDigits(131);
                var o = new n.RSAKeyPair("3", "10001", s, 1024);
                return r.base64encode(n.encryptedString(o, e, "PKCS1Padding", "RawEncoding"));
            }
        },
        getMsgCode: function(t, a) {
            var s = 0;
            i.GetRsaKeyModulus().then(function(o) {
                if (0 == o.retcode) {
                    var p = o.modulus, u = o.index, d = r.base64encode(encodeURIComponent(t));
                    n.setMaxDigits(131);
                    var c = new n.RSAKeyPair("3", "10001", p, 1024), l = r.base64encode(n.encryptedString(c, d, "PKCS1Padding", "RawEncoding"));
                    i.judgeIsCalled(l, u).then(function(o) {
                        s = o.checktype;
                        a.data.popup.accountType;
                        i.getMsgCode(t, s, function(o, i) {
                            var r = 0 == i.retcode || 2 == i.retcode || 4 == i.retcode ? 0 : 7 == i.retcode ? 1 : 2, n = 0 == r ? 1 == s ? "您将收到028/010/12590/95/0592/0598/0874开头的来电，请输入来电中听到的数字验证码" : "验证码已发送至" : 1 == r ? "手机号格式错误，请返回重新输入" : "验证码将发送至";
                            if (Object.assign(a.data.msgCode, {
                                sendSign: r,
                                sendTips: n,
                                codeType: s,
                                bindaccount: t
                            }), a.setData({
                                msgCode: a.data.msgCode
                            }), 0 == r) {
                                var p = {
                                    sendStatus: 1,
                                    msgTips: "110秒"
                                };
                                Object.assign(a.data.popup, p), a.setData({
                                    popup: a.data.popup
                                });
                                var u = 110;
                                e = setInterval(function() {
                                    --u < 0 ? (clearInterval(e), p = {
                                        sendStatus: 0,
                                        msgTips: "重新发送"
                                    }) : p = {
                                        sendStatus: 1,
                                        msgTips: u + "秒"
                                    }, Object.assign(a.data.msgCode, p), a.setData({
                                        msgCode: a.data.msgCode
                                    });
                                }, 1e3);
                            }
                        });
                    });
                }
            });
        },
        hide: function() {
            this.page.setData({
                popup: {}
            });
        },
        getPhoneNumber: function(t) {
            var e = this, o = {
                errObj: {}
            };
            Object.assign(e.data.popup, o), e.setData({
                popup: e.data.popup
            });
            var r = s.BINDPOPUP_BIND_TEL;
            a.default.addPtag(r), wx.login({
                success: function(a) {
                    var s = {
                        code: a.code,
                        encrytData: t.detail.encryptedData,
                        iv: t.detail.iv
                    };
                    i.getPhoneNum(s, function(t, a) {
                        0 == a.retCode ? (s = {
                            inputValue: {
                                delete4Value: a.phoneNum
                            }
                        }, Object.assign(e.data.popup, s), e.setData({
                            popup: e.data.popup
                        })) : e.toast.show({
                            icon: d.ICON.INFO,
                            content: "获取微信授权手机号失败，请手动输入~",
                            page: e
                        });
                    });
                },
                fail: function(t) {
                    e.toast.show({
                        icon: d.ICON.INFO,
                        content: "获取微信授权手机号失败，请手动输入~",
                        page: e
                    });
                }
            });
        }
    }
});
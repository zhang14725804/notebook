var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.ids = [ 0 ], exports.modules = [ function(t, n, a) {
    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function i(e, t) {
        var n = this;
        return function() {
            "function" == typeof e && e.call(n), "function" == typeof n.__yzLog__ && n.__yzLog__({
                et: "click",
                ei: "share_result",
                en: "分享结果",
                params: {
                    share_result: t
                }
            });
        };
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }), n.extendApp = void 0;
    var r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    };
    n.default = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        var a = y.apply(void 0, [ {
            data: {
                pageWindowLock: !1
            },
            onLoad: function(e) {
                var t = this, n = getApp(), a = n.globalData.isYouzanApp ? "public" : "wsc";
                this.setData({
                    wscpage: {},
                    themeClass: n.themeClass,
                    deviceType: n.deviceType || "",
                    appType: a,
                    isTabPage: !0
                }), n.isSwitchTab().then(function(e) {
                    t.setData({
                        isTabPage: e
                    });
                }), this.__query__ = e, n.on("app:token:fail", function() {
                    wx.showModal({
                        title: "登录失败",
                        content: "登录失败可能导致应用无法使用，你可以再试试或退出小程序",
                        confirmText: "再试试",
                        showCancel: !1,
                        success: function() {
                            n.login(function() {
                                n.globalData.hasToken && wx.showToast({
                                    title: "登录成功"
                                });
                            });
                        }
                    });
                });
            }
        }, _ ].concat(t, [ l.default, g.default, p.default, f.default, d.default, m.default, h.default ]));
        if (a.onShareAppMessage) {
            var o = a.onShareAppMessage;
            a.onShareAppMessage = function() {
                "function" == typeof this.__yzLog__ && this.__yzLog__({
                    et: "click",
                    ei: "share",
                    en: "转发"
                });
                var e = getApp(), t = o.call(this), n = t.path || "/pages/home/dashboard/index", a = {
                    is_share: 1
                };
                c.default.getAll(n).kdt_id || (a.kdt_id = e.getKdtId() || "");
                var s = ("object" === r(e.logger) && "function" == typeof e.logger.getGlobal ? e.logger.getGlobal() : {}).context || {};
                return s.dc_ps && (a.dc_ps = s.dc_ps || ""), e.globalData.shopInfo.isMultiStore && (n = c.default.add(n, {
                    offlineId: e.getOfflineId()
                })), n = c.default.add(n, a), Object.assign({}, t, {
                    path: n,
                    success: i.call(this, t.success, "success"),
                    fail: i.call(this, t.fail, "fail")
                });
            };
        }
        return Page(a);
    };
    var s = o(a(41)), c = o(a(9)), u = a(345), l = o(u), d = o(a(344)), p = o(a(343)), f = o(a(341)), h = o(a(339)), g = o(a(338)), m = o(a(67)), _ = a(337), v = (0, 
    s.default)({
        life: [ "onLaunch", "onShow", "onHide", "onError" ]
    });
    n.extendApp = function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return v.apply(void 0, [ {} ].concat(t, [ u.appConfig ]));
    };
    var y = (0, s.default)();
}, function(e, t, n) {
    t.Actionsheet = n(332), t.Dialog = n(331), t.Field = n(330), t.NoticeBar = n(329), 
    t.Select = n(66), t.Stepper = n(328), t.Switch = n(327), t.Tab = n(326), t.Toast = n(65), 
    t.TopTips = n(325), t.CheckLabel = n(66);
    var a = n(21).extend;
    t.extend = a;
}, function(e, t, n) {
    var a = n(335);
    e.exports = function(e, t) {
        return a(e, t, {
            imgcdn: "https://img.yzcdn.cn"
        });
    };
}, function(e, t, n) {
    function a() {
        return o && o.globalData ? o : o = getApp();
    }
    var o = getApp();
    e.exports = {
        navigate: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (getCurrentPages() || []).length >= 10 ? this.redirect(e) : wx.navigateTo(e);
        },
        redirect: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            wx.redirectTo(e);
        },
        switchTab: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (a().globalData.isYouzanApp) {
                var t = getCurrentPages() || [], n = t.length, o = t.findIndex(function(t) {
                    var n = t.route || "";
                    return n === e.url || "/" + n === e.url;
                });
                return o > -1 ? (wx.navigateBack({
                    delta: n - o - 1
                }), void console.log(o)) : void this.navigate(e);
            }
            wx.switchTab(e);
        }
    };
}, function(e, t, n) {
    var a = n(13), o = n(68), i = n(9), r = n(342), s = n(40), c = o({}), u = {
        prefix: "__ZANLOG__",
        apiBase: "https://tj.youzan.com/1.gif",
        enterScene: "",
        enterPage: "",
        referPage: "",
        currentPage: "",
        bizInfo: ""
    }, l = {
        getDeviceInfo: function() {
            if (!u.deviceInfo) {
                var e = wx.getSystemInfoSync();
                u.deviceInfo = {}, u.deviceInfo.brand = e.brand, u.deviceInfo.device = e.model, 
                u.deviceInfo.system = e.system, u.deviceInfo.wxversion = e.version, u.deviceInfo.platform = "weapp";
            }
            return u.deviceInfo;
        },
        request: function(e) {
            var t = {
                link: u.currentPage,
                scene: u.enterScene,
                time: new Date().getTime(),
                spm: s.getSpm()
            }, n = c.get("logv2:from");
            u.bizInfo && (t = Object.assign({}, t, u.bizInfo)), u.referPage && (t.refer_url = u.referPage), 
            wx.request({
                url: u.apiBase,
                data: Object.assign(e, n, t, l.getDeviceInfo(), r.getADids() || {}, {
                    has_track: 3
                }),
                method: "get"
            });
        }
    }, d = {
        app: {
            show: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                t.path && (u.enterPage = t.path), t.scene && (u.enterScene = t.scene);
                var a = t.query || {};
                a.dc_ps && (console.log("=== set dc_ps ===", a.dc_ps), c.set("logv2:dc_ps", a.dc_ps, {
                    expire: .125
                })), a.yz_tj_from_source && c.set("logv2:from", {
                    from_source: a.yz_tj_from_source,
                    from_module: a.yz_tj_from_module
                }, {
                    expire: 1
                }), n.biz && (u.biz = n.biz), setTimeout(function() {
                    var a = getApp(), o = a.onHide;
                    a.onHide = function() {
                        o.apply(e, [ t, n ]);
                    };
                }, 0);
            }
        },
        page: {
            show: function(e) {
                var t = getCurrentPages(), n = t[t.length - 1];
                r.setADids(e), u.referPage = u.currentPage, u.currentPage = n.route, l.request({
                    fm: "display",
                    uuid: d.getUUID(),
                    dc_ps: d.getDCPS()
                });
            },
            processShareData: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = getApp(), n = d.getDCPS(), a = i.getAll(r), o = {}, r = e.path || "/pages/home/dashboard/index";
                return a.kdt_id || (o.kdt_id = t.getKdtId()), n && (o.dc_ps = n), t.globalData.shopInfo.isMultiStore && (r = i.add(r, {
                    offlineId: t.getOfflineId()
                })), r = i.add(r, o), Object.assign({}, e, {
                    path: r
                });
            }
        },
        track: function(e) {
            l.request(Object.assign({
                fm: "click",
                uuid: this.getUUID(),
                dc_ps: this.getDCPS()
            }, e || {}));
        },
        setBizInfo: function(e) {
            u.bizInfo = e || {};
        },
        getLogConfig: function() {
            return u;
        },
        getDCPS: function() {
            return c.get("logv2:dc_ps") || "";
        },
        getUUID: function() {
            var e = "";
            try {
                e = wx.getStorageSync("logv2:uuid");
            } catch (e) {}
            return e || (e = a.makeRandomString(15) + Date.now(), wx.setStorage({
                key: "logv2:uuid",
                data: e
            })), e;
        }
    };
    e.exports = d;
}, function(e, t, n) {
    var a = function(e, t) {
        return hasOwnProperty.call(e, t);
    };
    e.exports = function(e, t, n) {
        if (null != e) if (e.length === +e.length) for (var o = 0, i = e.length; o < i; o++) t.call(n, e[o], o, e); else {
            var r = function(e) {
                if (e !== Object(e)) throw new TypeError("Invalid object");
                var t = [];
                for (var n in e) a(e, n) && t.push(n);
                return t;
            }(e);
            for (o = 0, i = r.length; o < i; o++) t.call(n, e[r[o]], r[o], e);
        }
    };
}, function(e, t, n) {
    function a(e) {
        this.money = e;
    }
    var o = n(16);
    a.prototype = o(a.prototype, {
        toCent: function() {
            return parseInt(Math.round(100 * this.money), 10) || 0;
        },
        toYuan: function() {
            return this.adjustFixed(parseFloat(this.money / 100) || 0, 2);
        },
        adjustFixed: function(e, t) {
            return (Math.round(e * Math.pow(10, t)) / Math.pow(10, t)).toFixed(t);
        }
    }), e.exports = function(e) {
        return new a(e);
    };
}, function(e, t, n) {
    function a(e) {
        return e > 9 ? "" + e : "0" + e;
    }
    e.exports = {
        moment: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY:MM:DD";
            if (e || 0 === e || (e = new Date()), "Invalid Date" === (e = new Date(e)).toString()) throw new Error("Invalid Date");
            var n = function(e) {
                return ("00" + e).slice(-2);
            }, a = {
                "YYYY|yyyy": e.getFullYear(),
                "YY|yy": e.getFullYear().toString().substr(2),
                MM: n(e.getMonth() + 1),
                M: e.getMonth() + 1,
                "DD|dd": n(e.getDate()),
                "D|d": e.getDate(),
                "HH|hh": n(e.getHours()),
                "H|h": e.getHours(),
                mm: n(e.getMinutes()),
                m: e.getMinutes(),
                ss: n(e.getSeconds()),
                s: e.getSeconds()
            };
            return Object.keys(a).forEach(function(e) {
                t = t.replace(new RegExp(e), a[e]);
            }), t;
        },
        format: function(e) {
            e = e > 0 ? e : 0;
            var t = Math.floor(e / 1e3), n = t, o = Math.floor(n / 86400);
            n = t - 86400 * o;
            var i = Math.floor(n / 3600);
            n -= 3600 * i;
            var r = Math.floor(n / 60), s = n -= 60 * r;
            return {
                data: {
                    day: o,
                    hour: i,
                    minute: r,
                    second: s
                },
                strData: {
                    day: o + "",
                    hour: a(i),
                    minute: a(r),
                    second: a(s)
                }
            };
        },
        formatMonthWithZero: function(e) {
            return e = e + 1 < 10 ? "0" + (e + 1) : e + 1;
        },
        formatDayWithZero: function(e) {
            return e = e < 10 ? "0" + e : e;
        }
    };
}, function(e, t, n) {
    var a = n(65), o = n(27), i = getApp(), r = {
        zanAccount: {
            shouldShowLogin: !1,
            phoneNumber: "",
            showPhoneRedNotice: !1,
            showCodeRedNotice: !1,
            captcha: {
                code: "",
                times: 1,
                countdown: 60,
                text: "获取验证码",
                textStyle: "acc-code__btn--enabled",
                btnStyle: "acc-code--enabled",
                timer: null
            },
            couponTitle: ""
        }
    }, s = {
        bindZanAccount: function() {
            this.setData({
                zanAccount: r.zanAccount
            }), i.getBuyerId() ? this.onZanAccountBinded() : this.onShowLoginView();
        },
        onZanAccountBinded: function() {},
        onShowLoginView: function() {
            this._clearCaptchaTimer(), this.setData({
                "zanAccount.shouldShowLogin": !0,
                "zanAccount.message": "",
                "zanAccount.captcha.countdown": 60,
                "zanAccount.captcha.times": 1,
                "zanAccount.captcha.btnStyle": "acc-code--enabled",
                "zanAccount.captcha.textStyle": "acc-code__btn--enabled",
                "zanAccount.captcha.text": "获取验证码"
            });
        },
        onHideLoginView: function() {
            this._clearCaptchaTimer(), this.setData({
                "zanAccount.shouldShowLogin": !1
            });
        },
        onZanAccountLogin: function() {
            var e = this;
            setTimeout(function() {
                var t = e.data.zanAccount.phoneNumber, n = e.data.zanAccount.captcha.code;
                return t && 11 == t.length ? (e._updateRedNotice(!1, !1), n && 6 == n.length ? (e._updateRedNotice(!1, !1), 
                void o.codeLogin(t, n, function(t) {
                    0 == +t.data.code ? (wx.showToast({
                        title: "绑定成功",
                        icon: "success",
                        mask: !1
                    }), e.onHideLoginView(), t.data.data && t.data.data.buyer_id && i.login(function() {
                        e.onZanAccountBinded(), e._updateRedNotice(!1, !1);
                    })) : (e.showZanToast(t.data.msg), e._updateRedNotice(!0, !0));
                }, function(t) {
                    if (135000024 === t.code) return i.login(function() {
                        return e.onZanAccountLogin();
                    });
                    e.showZanToast(t.msg), e._updateRedNotice(!0, !0);
                })) : (e.showZanToast("请输入正确验证码"), void e._updateRedNotice(!1, !0))) : (e.showZanToast("请输入正确的手机号"), 
                void e._updateRedNotice(!0, !1));
            }, 100);
        },
        onSendCaptchaCode: function(e) {
            var t = this;
            60 == this.data.zanAccount.captcha.countdown && setTimeout(function() {
                if (!t.data.zanAccount.phoneNumber || 11 != t.data.zanAccount.phoneNumber.length) return t.showZanToast("请输入正确的手机号"), 
                void t._updateRedNotice(!0, !1);
                t._updateRedNotice(!1, !1);
                var e = t.data.zanAccount.captcha.times, n = t;
                o.fetchCode(t.data.zanAccount.phoneNumber, e, function() {
                    t._updateRedNotice(!1, !1), t._countDownForCaptchaCode(), n.setData({
                        "zanAccount.captcha.btnStyle": "acc-code--disabled",
                        "zanAccount.captcha.textStyle": "acc-code__btn--disabled",
                        "zanAccount.captcha.times": e
                    });
                }, function(e) {
                    t._updateRedNotice(!0, !1), t.showZanToast(e.msg);
                });
            }, 100);
        },
        onInputPhoneNumber: function(e) {
            this.setData({
                "zanAccount.phoneNumber": e.detail.value
            });
        },
        onInputCaptchaCode: function(e) {
            this.setData({
                "zanAccount.captcha.code": e.detail.value
            });
        },
        ignoreAction: function() {}
    }, c = {
        _clearCaptchaTimer: function() {
            var e = this.data.zanAccount.captcha.timer;
            null != e && (clearTimeout(e), this.setData({
                "zanAccount.captcha.timer": null
            }));
        },
        _countDownForCaptchaCode: function() {
            var e = this, t = this.data.zanAccount.captcha.countdown;
            0 !== t ? (t--, this.setData({
                "zanAccount.captcha.countdown": t,
                "zanAccount.captcha.text": "已发送(" + t + "s)"
            }), this.data.zanAccount.captcha.timer = setTimeout(function() {
                e._countDownForCaptchaCode();
            }, 1e3)) : this.setData({
                "zanAccount.captcha.countdown": 60,
                "zanAccount.captcha.text": "获取验证码",
                "zanAccount.captcha.btnStyle": "acc-code--enabled",
                "zanAccount.captcha.textStyle": "acc-code__btn--enabled"
            });
        },
        _updateRedNotice: function(e, t) {
            this.setData({
                "zanAccount.showPhoneRedNotice": e,
                "zanAccount.showCodeRedNotice": t
            });
        },
        _upadateTitle: function(e) {
            r.zanAccount.couponTitle = e;
        }
    };
    e.exports = Object.assign({}, s, c, a);
}, function(e, t, n) {
    function a() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split("#")[0].split("?"), t = {};
        return e[1] && e[1].split("&").forEach(function(e) {
            var n = e.split("=");
            t[n[0]] = n.slice(1).join("=");
        }), t;
    }
    var o = function(e) {
        var t = "";
        for (var n in e) "" !== e[n] && (t += n.trim() + "=" + e[n] + "&");
        return t ? "?" + t.slice(0, t.length - 1) : "";
    };
    e.exports = {
        add: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!e || 0 === e.length || 0 === e.trim().indexOf("javascript")) return "";
            var i = e.split("#"), r = i[0].split("?"), s = a(e);
            return Object.keys(t).forEach(function(e) {
                s[e.trim()] = n ? encodeURIComponent(t[e]) : t[e];
            }), e = r[0] + o(s), i[1] ? e += "#" + i[1] : e;
        },
        getAll: a
    };
}, function(e, t, n) {
    var a = n(53), o = n(52), i = {
        method: "GET",
        header: {
            "content-type": "application/json"
        }
    };
    e.exports = function(e) {
        return function(t) {
            return t = Object.assign({}, i, t), new Promise(function(n, i) {
                var r = function() {
                    var r = {
                        access_token: e.getAccessToken()
                    };
                    r.store_id || delete r.store_id;
                    var s = {
                        urlData: {
                            origin: t.origin || "h5",
                            pathname: t.path,
                            query: Object.assign(r, t.query),
                            config: t.config
                        },
                        method: t.method,
                        data: t.data,
                        header: Object.assign({
                            "Extra-Data": JSON.stringify({
                                is_weapp: 1,
                                sid: e.getSessionId(),
                                version: e.getVersion()
                            })
                        }, t.header)
                    };
                    return console.info("[h5:request]", t.path), a(e, s).catch(function(e) {
                        return t.fail && t.fail(e), o.requestError({
                            alert: "warn",
                            message: t.path + " invoke fail",
                            response: e,
                            request: {
                                options: s
                            }
                        }), i({
                            code: -9999,
                            msg: e.errMsg || "请求失败，请稍后重试",
                            res: e
                        });
                    }).then(function(a) {
                        if (0 === a.code) {
                            console.info("[h5:success]", a.data);
                            try {
                                t.success && t.success(a.data);
                            } catch (e) {
                                return i(e), o.appError({
                                    alert: "warn",
                                    message: t.path + " invoke success fail",
                                    response: a,
                                    error: e,
                                    request: {
                                        options: s
                                    }
                                }), t.fail && t.fail(e);
                            }
                            return n(a.data);
                        }
                        try {
                            return -1 === a.code ? (console.info("[h5:40010] AccessToken不存在或已过期, 正在重新登录..."), 
                            e.globalData.hasToken = !1, e.request(t).then(function(e) {
                                return n(e);
                            }).catch(function(e) {
                                return i(e);
                            }), void e.login()) : (a && a.code > 1e3 ? o.requestError({
                                message: t.path + " has a bad response",
                                response: a,
                                request: {
                                    options: s
                                }
                            }) : o.requestError({
                                alert: "warn",
                                message: t.path + " has a bad code response",
                                response: a,
                                request: {
                                    options: s
                                }
                            }), i({
                                code: a.code,
                                msg: a.msg
                            }));
                        } catch (e) {
                            return o.appError({
                                alert: "warn",
                                message: t.path + " try auto call app.login fail",
                                response: a,
                                error: e,
                                request: {
                                    options: s
                                }
                            }), i({
                                code: -9999,
                                msg: a.msg || "服务器错误，请稍后重试"
                            });
                        }
                    });
                };
                return e.globalData.hasToken && e.globalData.fetchedShop ? r() : e.globalData.hasToken && t.config && t.config.skipShopInfo ? r() : !e.globalData.hasToken && t.config && t.config.skipShopInfo ? e.once("app:token:success", r) : (e.once("app:fetchshopinfo:success", r), 
                void e.once("app:fetchshopinfo:fail", r));
            });
        };
    };
}, function(e, t, n) {
    function a(e, t) {
        var n = "", a = !1, o = t.extra_data || {};
        if ("goods" === e && t.alias) n = "/pages/goods/detail/index?alias=" + t.alias; else if ("tag" === e && t.alias) n = "/packages/shop/goods/group/index?alias=" + t.alias + "&title=" + t.link_title; else if ("weappfeature" === e) n = "/pages/home/feature/index?id=" + t.link_id + "&title=" + t.link_title; else if ("feature" === e && t.alias) n = "/pages/home/feature/index?alias=" + t.alias; else if ("homepage" === e) a = !0, 
        n = "/pages/home/dashboard/index"; else if ("cart" === e) a = !0, n = "/pages/goods/cart/index"; else if ("usercenter" === e) a = !0, 
        n = "/pages/usercenter/dashboard/index"; else if ("allgoods" === e) n = "/packages/shop/goods/all/index"; else if ("pointsstore" === e) n = "/packages/ump/integral-store/index"; else if ("coupon" === e) n = "/packages/user/coupon/detail/index?id=" + t.link_id + (7 === t.coupon_type ? "&type=promocard" : ""); else if ("seckill" === e) n = "/pages/goods/seckill/index?alias=" + t.alias; else if ("weapplink" === e && o.link_type === r) {
            var i = (s.globalData.nav || []).map(function(e) {
                return e.page_path;
            });
            "/" !== (n = o.my_weapp_link)[0] && (n = "/" + n), a = i.reduce(function(e, t) {
                return e || RegExp("^/" + t + "(\\?.*)?$").test(n);
            }, !1);
        } else "paidcolumn" === e ? n = "/pages/paidcontent/column/index?alias=" + t.alias : "paidcontent" === e ? n = "/pages/paidcontent/content/index?alias=" + t.alias : "mypaidcontent" === e && (n = "/pages/paidcontent/list/index");
        return {
            url: n,
            isTab: a
        };
    }
    var o = n(3), i = n(310), r = "1", s = getApp();
    e.exports = {
        getThemeType: function(e) {
            return (i.types || {})[e] || "";
        },
        getRedirectData: a,
        jumpToLink: function(e, t) {
            var n = t.extra_data || {};
            if ("weapplink" !== e || "2" !== n.link_type) {
                var i = a(e, t), r = i.url, s = i.isTab;
                r && (s ? o.switchTab({
                    url: r
                }) : r && o.navigate({
                    url: r
                }));
            } else wx.navigateToMiniProgram({
                appId: n.other_weapp_appid,
                path: n.other_weapp_link
            });
        },
        parsePrice: function(e) {
            var t = (String(e) || "").split("");
            return t.length < 3 && (t = new Array(3 - t.length).fill("0").concat(t)), t.splice(-2, 0, "."), 
            t.join("");
        },
        parseTime: function(e, t) {
            if (!e) return "";
            var n = new Date(e), a = n.getFullYear(), o = n.getMonth() + 1, i = n.getDate(), r = (o < 10 ? "0" + o : o) + "-" + (i < 10 ? "0" + i : i);
            return t ? a + "-" + r : r;
        },
        LINK_TYPE_LIST: [ "weapplink", "goods", "tag", "weappfeature", "feature", "homepage", "usercenter", "cart", "allgoods", "chat", "pointsstore", "coupon", "seckill", "paidcolumn", "paidcontent", "mypaidcontent" ]
    };
}, function(e, t, n) {
    function a(e, t) {
        var n = e, a = t, o = Math.sqrt(n * n + a * a) + 2e-5 * Math.sin(a * Math.PI), i = Math.atan2(a, n) + 3e-6 * Math.cos(n * Math.PI);
        return {
            lng: e = o * Math.cos(i) + .0065,
            lat: t = o * Math.sin(i) + .006
        };
    }
    function o(e) {
        return e * Math.PI / 180;
    }
    e.exports = {
        tryLocation: function(e, t, n) {
            wx.getLocation({
                type: "gcj02",
                success: function(t) {
                    var n = t.latitude, o = t.longitude, i = a(o, n), r = i.lng, s = i.lat;
                    e({
                        lng: r,
                        lat: s
                    }, {
                        latitude: n,
                        longitude: o
                    });
                },
                fail: n ? n(e, t) : t
            });
        },
        parseDistance: function(e) {
            return e ? e = (e = +e || 0) > 1e4 ? "> 10km" : e > 1e3 ? (e / 1e3).toFixed(2) + "km" : e < 100 ? "< 100m" : e.toFixed(2) + "m" : 0;
        },
        calcDistance: function(e, t) {
            var n = o(+e.lat), a = o(+t.lat), i = n - a, r = o(+e.lng) - o(+t.lng), s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(n) * Math.cos(a) * Math.pow(Math.sin(r / 2), 2)));
            return s *= 6378.137, s = Math.round(1e4 * s) / 1e4;
        },
        baiduToGcj: function(e, t) {
            var n = e - .0065, a = t - .006, o = Math.sqrt(n * n + a * a) - 2e-5 * Math.sin(a * Math.PI), i = Math.atan2(a, n) - 3e-6 * Math.cos(n * Math.PI);
            return {
                lng: e = o * Math.cos(i),
                lat: t = o * Math.sin(i)
            };
        },
        gcjToBaidu: a
    };
}, function(e, t, n) {
    e.exports = {
        makeRandomString: function(e) {
            var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            e = e || 10;
            for (var a = 0; a < e; a++) t += n.charAt(Math.floor(Math.random() * n.length));
            return t;
        }
    };
}, function(e, t, n) {
    var a = n(247), o = n(3), i = n(1), r = n(16), s = n(36), c = n(246), u = n(245), l = u.validateInput, d = u.parse, p = u.getDialogGoodsImage, f = u.recordSelectedSku, h = u.getOrderData, g = u.getSelectedSKUKey, m = n(4), _ = getApp();
    e.exports = r({}, i.Stepper, i.TopTips, i.Toast, c, {
        showComponentSKU: function(e) {
            var t = this, n = e.alias || "", a = e.btns || [], o = e.needFetch || !1;
            if (this.setData({
                componentSKU: {
                    isSetShoppingCart: !0
                },
                isGroupon: e.isGroupon || !1,
                createGroupon: e.createGroupon || "",
                activityAlias: e.activityAlias || "",
                skuCallback: e.callback || {}
            }), _.getShopConfigData().then(function(e) {
                var n = 1 == +e.show_buy_btn, o = a.indexOf("buy");
                a.length > 1 && !n && o > -1 && a.splice(o, 1), t.setData({
                    "componentSKU.btns": a
                });
            }).catch(function() {
                t.setData({
                    "componentSKU.btns": a
                });
            }), o) this._fetchComponentSKUGoodsData(n, function() {
                t._showComponentSKUDialog();
            }); else {
                var i = e.goods;
                this._parseComponentSKUOriginData({
                    alias: n,
                    components: i.components,
                    brief: i.brief,
                    sku: i.sku,
                    activity: i.activity,
                    use_ump: i.use_ump,
                    use_origin_quota: e.use_origin_quota
                }), this._showComponentSKUDialog();
            }
            e.selectedSKU && !e.needClean && this.setData({
                "componentSKU.selectedSKU": e.selectedSKU
            });
        },
        handleZanStepperChange: function(e) {
            this.setData({
                "componentSKU.stepperData.stepper": e.stepper
            });
        },
        _handleComponentSKUDialogImageTap: function() {
            var e = this.data.componentSKU || {};
            wx.previewImage({
                urls: [ p(e.skuImages, e.goods.goods, e.selectedSKU, !0) ]
            });
        },
        _hideComponentSKUDialog: function() {
            this.setData({
                "componentSKU.show": !1
            });
        },
        _handleComponentSKUValueTap: function(e) {
            var t = e.currentTarget.dataset;
            if (!t.disabled) {
                var n = this.data.componentSKU || {}, a = n.selectedSKU;
                a[t.skuKey] == t.skuValueId ? a[t.skuKey] = 0 : a[t.skuKey] = t.skuValueId;
                var o = f(n);
                this.setData({
                    componentSKU: Object.assign({}, n, o, {
                        dialogGoodsImage: p(n.skuImages, n.goods.goods, n.selectedSKU)
                    })
                }), _.trigger("component:sku:change", {
                    selectedSKU: this.data.componentSKU.selectedSKU
                });
            }
        },
        _catchComponentSKUTouch: function() {},
        _handleComponentSKUAddCart: function() {
            var e = this, t = this.data, n = t.skuCallback, a = t.componentSKU;
            if (!this._validateComponentSKUData()) {
                var o = a.btns;
                0 === o.length && "buyPoints" === o[0] && (a.activity.type = "points");
                var i = h(a);
                if (console.log("order ===========>", i), n && n.fn) return n.fn.call(n.context, i), 
                void this._hideComponentSKUDialog();
                _.carmen({
                    api: "youzan.trade.cart/3.0.0/add",
                    data: s.toSnakeCase({
                        skuId: i.skuId,
                        num: i.num,
                        message: i.message,
                        kdtId: i.kdtId,
                        itemId: i.goodsId,
                        bizTracePointExt: i.bizTracePointExt,
                        activityAlias: i.activityAlias,
                        activityId: i.activityId,
                        activityType: i.activityType
                    }),
                    success: function() {
                        m.track({
                            act_name: "add_cart"
                        }), "function" == typeof e.__yzLog__ && e.__yzLog__({
                            et: "click",
                            ei: "add_cart",
                            en: "添加购物车"
                        }), e._hideComponentSKUDialog(), _.trigger("component:sku:cart", {
                            type: "add"
                        });
                    },
                    fail: function(t) {
                        e.showZanToast(t.msg);
                    }
                });
            }
        },
        _handleComponentSKUBuy: function() {
            function e() {
                var e = _.db.set({
                    type: "goods",
                    goods_list: [ t ],
                    isGroupon: n.data.isGroupon,
                    createGroupon: n.data.createGroupon,
                    activityAlias: n.data.activityAlias
                });
                m.track({
                    act_name: "buy"
                }), "function" == typeof n.__yzLog__ && n.__yzLog__({
                    et: "click",
                    ei: "buy",
                    en: "购买",
                    si: _.getKdtId()
                }), o.navigate({
                    url: "/pages/trade/buy/index?dbid=" + e
                });
            }
            if (!this._validateComponentSKUData()) {
                var t = h(this.data.componentSKU), n = this;
                return 5 === t.activityType ? _.getPoints().then(function(n) {
                    var a = n.current_points;
                    if (t.pointsPrice > a) return wx.showModal({
                        content: "积分余额不足，无法兑换。你有" + a + "积分可用",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                    e();
                }).catch(function(e) {
                    console.log(e);
                }) : e();
            }
        },
        _showComponentSKUDialog: function() {
            this._resolveComponentSKUBtns(), this._resolveComponentQuota(), this.setData({
                "componentSKU.show": !0
            });
        },
        _resolveComponentSKUBtns: function() {
            var e = this.data.componentSKU.goods.supportShoppingCart, t = this.data.componentSKU.btns || [], n = t.indexOf("cart");
            n > -1 && !e && t.splice(n, 1), this.setData({
                "componentSKU.btns": t
            });
        },
        _resolveComponentQuota: function() {
            var e = this.data.componentSKU.goods.goods || {};
            e.quota > 0 && e.quota === e.quotaUsed && (this.showZanToast("该商品每人限购" + e.quota + "件，您之前已经购买过" + e.quota + "件！"), 
            this.setData({
                "componentSKU.buyButtonDisabled": !0
            }));
        },
        _fetchComponentSKUGoodsData: function(e, t) {
            var n = this;
            wx.showToast({
                title: "加载中",
                mask: !0,
                icon: "loading"
            }), a.getSkuData(e).then(function(a) {
                var o = a.activity.goods_preference && "timelimitedDiscount" === a.activity.goods_preference.type && a.activity.goods_preference.is_started;
                n._parseComponentSKUOriginData({
                    alias: e,
                    use_ump: o,
                    components: a.components,
                    brief: a.brief,
                    sku: a.sku,
                    activity: a.activity,
                    isPresale: a.brief.presale || 0
                }), t();
            }).catch(function(e) {
                n.showZanToast(e);
            }).then(function() {
                wx.hideToast();
            });
        },
        _parseComponentSKUOriginData: function(e) {
            var t = this, n = !1;
            try {
                if (e.activity.goods_preference && "customerDiscount" === e.activity.goods_preference.type) {
                    n = !0, e.sku.originPrice = e.sku.price, e.sku.price = e.activity.goods_preference.show_price;
                    var a = e.activity.goods_preference.skus;
                    e.sku.list.forEach(function(e) {
                        e.originPrice = e.price, e.price = a[e.id].price || e.price;
                    });
                }
            } catch (e) {
                console.log(e);
            }
            this.setData({
                "componentSKU.buyButtonDisabled": !e.activity.goods_preference || !e.activity.goods_preference.is_started
            });
            var o = d({
                components: e.components,
                brief: e.brief,
                sku: e.sku,
                activity: e.activity,
                use_ump: e.use_ump,
                use_origin_quota: e.use_origin_quota
            });
            this.setData({
                componentSKU: Object.assign({
                    show: !0,
                    isMember: n,
                    btns: 1 == e.isPresale ? [ "buy" ] : this.data.componentSKU.btns,
                    alias: e.alias
                }, o)
            }), _.getShopStatus(function(e) {
                t.setData({
                    "componentSKU.isSetShoppingCart": 1 == e.is_set_shopping_cart
                });
            });
        },
        _validateComponentSKUData: function() {
            var e = this.data.componentSKU, t = e.goods, n = t.sku, a = [];
            if (!n.none_sku && !n.mapList[g(e.selectedSKU)]) {
                for (var o = 1; o <= n.tree.length; o++) e.selectedSKU["s" + o] || a.push(n.tree[o - 1].k);
                return this.showZanTopTips("请选择: " + a.join(" ")), !0;
            }
            var i = t.messages;
            if (i.length) for (var r = 0; r < i.length; r++) {
                var s = i[r];
                if (s.value) {
                    var c = l(s.type, s.value);
                    if (!c.success) return this.showZanTopTips(c.msg), !0;
                } else if (+s.required) {
                    var u = "image" === s.type ? "请上传: " : "请填写: ";
                    return this.showZanTopTips(u + s.name), !0;
                }
            }
        }
    });
}, function(e, t, n) {
    function a(e, t) {
        this.tid = null, this.leftTime = 0;
        var n = Date.now();
        t = t || {}, this.isTimeList = Array.isArray(e), this.leftTime = e, this.options = t, 
        this.isTimeList ? this._walkTimeList(n, this.leftTime) : this._walkTime(n, this.leftTime);
    }
    var o = n(7);
    a.prototype = {
        stop: function() {
            clearTimeout(this.tid), this.tid = null, this.stopped = !0;
        },
        start: function() {
            if (!this.tid) {
                this.stopped = !1;
                var e = Date.now();
                this.isTimeList ? this._walkTimeList(e, this.leftTime) : this._walkTime(e, this.leftTime);
            }
        },
        setTime: function(e) {
            this.stop(), this.leftTime = e, this.isTimeList = Array.isArray(e), this.start();
        },
        _walkTime: function(e, t) {
            var n = this;
            t <= 0 ? this.options.onEnd && this.options.onEnd() : this.stopped || (this.tid = setTimeout(function() {
                var a = Date.now(), i = t - (a - e), r = o.format(i);
                n.options.onChange && n.options.onChange(r.data, r.strData), n.leftTime = i, n._walkTime(a, n.leftTime);
            }, this.options.timeout || 500));
        },
        _walkTimeList: function(e, t) {
            var n = this;
            if (t.forEach(function(e, a) {
                "number" == typeof e && e <= 0 && ("function" == typeof n.options.onEnd && n.options.onEnd(a), 
                t[a] = void 0);
            }), t.reduce(function(e, t) {
                return e && void 0 === t;
            }, !0)) return this.stop();
            this.stopped || (this.tid = setTimeout(function() {
                var a = Date.now(), i = t.map(function(t) {
                    return void 0 === t ? t : t - (a - e);
                }), r = i.map(function(e) {
                    return void 0 === e ? {} : o.format(e);
                });
                "function" == typeof n.options.onChange && n.options.onChange(r.map(function(e) {
                    return e.data;
                }), r.map(function(e) {
                    return e.strData;
                })), n.leftTime = i, n._walkTimeList(a, n.leftTime);
            }, this.options.timeout || 500));
        }
    }, e.exports = a;
}, function(e, t, n) {
    e.exports = function(e) {
        return ([].slice.call(arguments, 1) || []).forEach(function(t) {
            if (t) for (var n in t) e[n] = t[n];
        }), e;
    };
}, function(e, t, n) {
    e.exports = {
        parseTime: function(e, t) {
            if (!e) return "";
            var n = new Date(e), a = n.getFullYear(), o = n.getMonth() + 1, i = n.getDate(), r = (o < 10 ? "0" + o : o) + "-" + (i < 10 ? "0" + i : i);
            return t ? a + "-" + r : r;
        },
        parsePrice: function(e) {
            var t = (String(e) || "").split("");
            return t.length < 3 && (t = new Array(3 - t.length).fill("0").concat(t)), t.splice(-2, 0, "."), 
            t.join("");
        },
        REFRESH_KEY: "__paid_content_refresh__"
    };
}, function(e, t, n) {
    e.exports = function(e) {
        return new Promise(function(t, n) {
            wx.getSetting({
                success: function(a) {
                    a.authSetting[e] ? t() : wx.authorize({
                        scope: e,
                        success: t,
                        fail: n
                    });
                },
                fail: n
            });
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function(e) {
        return "[object Object]" === Object.prototype.toString.call(e);
    }, o = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
    t.mapKeysToCamelCase = function e(t) {
        if (null === t) return null;
        if (t != t) return NaN;
        if (a(t)) {
            var n = {};
            for (var i in t) {
                var r = i.replace(/\_+[a-zA-Z0-9]/g, function(e, t) {
                    return t ? e.substr(-1).toUpperCase() : e;
                }), s = t[i];
                n[r] = e(s);
            }
            return n;
        }
        if (o(t)) {
            var c = [];
            return t.forEach(function(t, n) {
                return c[n] = e(t);
            }), c;
        }
        return t;
    }, t.isUndefined = function(e) {
        return "[object Undefined]" === Object.prototype.toString.call(e);
    }, t.isObject = a, t.isArray = o, t.isNumber = function(e) {
        return "[object Number]" === Object.prototype.toString.call(e);
    }, t.isString = function(e) {
        return "[object String]" === Object.prototype.toString.call(e);
    }, t.defaultConverter = function(e) {
        return e;
    };
}, function(e, t, n) {
    var a = n(313), o = n(312), i = n(311), r = n(248), s = n(14), c = n(5), u = getApp();
    e.exports = Object.assign({}, a, o, i, s, {
        showShowcaseComponents: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments[2], a = r.themes[t] || "";
            switch ([ "default", "takeAway" ].indexOf(a) < 0 && (a = "feature"), this.setData({
                type: a
            }), a) {
              case "default":
                this.fetchDefaultThemeDataSuccess(e, n);
                break;

              case "takeAway":
                this.fetchTakeAwayThemeDataSuccess(e, n);
                break;

              case "feature":
                this.fetchFeatureThemeDataSuccess(e, n);
            }
        },
        fetchGoodsByTagAlias: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments[2];
            u.carmen({
                api: "weapp.wsc.tag.items/1.0.0/get",
                query: {
                    alias: e,
                    page_size: n.page_size || 20,
                    page_no: t
                },
                success: function(e) {
                    c(e.items, function(e) {
                        e.pic_url || (e.pic_url = "/upload_files/no_pic.png");
                    }), n.success && n.success(e);
                },
                fail: function(e) {
                    n.fail && n.fail(e);
                },
                complete: function() {
                    n.complete && n.complete();
                }
            });
        },
        showcaseHandleGoodsBuy: function(e) {
            this.showComponentSKU({
                alias: e.currentTarget.dataset.alias,
                needFetch: !0,
                btns: [ "cart", "buy" ]
            });
        },
        handleZanTabChange: function(e) {
            switch (this.data.type) {
              case "default":
                this.handleDefaultThemeZuiTabChange(e);
                break;

              case "feature":
                this.handleFeatureThemeZuiTabChange(e);
            }
        }
    });
}, function(e, t, n) {
    var a = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll" ], o = function(e) {
        return "__$" + e;
    };
    e.exports = {
        extractComponentId: function() {
            return ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).currentTarget || {}).dataset.componentId;
        },
        extend: Object.assign,
        extendCreator: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.life, n = void 0 === t ? a : t, i = e.exclude, r = void 0 === i ? [] : i, s = r.concat(a.map(o));
            if (!Array.isArray(n) || !Array.isArray(r)) throw new Error("Invalid Extend Config");
            var c = n.filter(function(e) {
                return a.indexOf(e) >= 0;
            });
            return function(e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
                return n.forEach(function(t) {
                    t && Object.keys(t).forEach(function(n) {
                        var a = t[n];
                        if (!(s.indexOf(n) >= 0)) if (c.indexOf(n) >= 0 && "function" == typeof a) {
                            var i, r = o(n);
                            e[r] || (e[r] = [], e[n] && e[r].push(e[n]), e[n] = function() {
                                for (var t = this, n = arguments.length, a = Array(n), o = 0; o < n; o++) a[o] = arguments[o];
                                e[r].forEach(function(e) {
                                    return e.apply(t, a);
                                });
                            }), t[r] ? (i = e[r]).push.apply(i, function(e) {
                                if (Array.isArray(e)) {
                                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                    return n;
                                }
                                return Array.from(e);
                            }(t[r])) : e[r].push(a);
                        } else e[n] = a;
                    });
                }), e;
            };
        }
    };
}, function(e, t, n) {
    var a = n(56);
    e.exports = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        !function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!(t.length <= 0)) {
                var o = t.shift();
                a({
                    file: o.src,
                    success: function(a) {
                        n.afterUploadSuccess && n.afterUploadSuccess(a.attachment_full_url, o), e(t, n);
                    },
                    fail: function() {
                        n.afterUploadFail && n.afterUploadFail(o), e(t, n);
                    }
                });
            }
        }(e.slice(0), t);
    };
}, function(e, t, n) {
    var a = getApp().globalData.serviceRegistry;
    e.exports = {
        registerService: function(e, t, n) {
            a[e] = a[e] || {}, a[e][t] = n;
        },
        getService: function(e, t) {
            return (a[e] || {})[t];
        },
        removeAllServiceInDomain: function(e) {
            delete a[e];
        }
    };
}, function(e, t, n) {
    e.exports = {
        GOODS_HEIGHT: 80,
        NAV_HEIGHT: 45,
        TITLE_HEIGHT: 30,
        EMPTY_CONTAINER: 54,
        MAX_PAGE: 100,
        INIT_GOODS_ITEM: {
            img: "",
            title: "",
            price: "",
            status: "",
            alias: ""
        },
        NAV_STATE: {
            NORMAL: 0,
            FIXED: 1,
            BOTTOM: 2
        },
        EMPTY: "",
        NAV_OFFSET: 240,
        LOAD_OFFSET: 800
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o, i, r = n(3), s = getApp(), c = n(1), u = (o = {
        goods_id: "1233",
        goods_alias: "2orj383nf5rr3",
        goods_name: "商品"
    }, a(o, "goods_alias", "12ewadqwd"), a(o, "price", "1.00"), a(o, "pic_url", "https://img.yzcdn.cn/dasdsadsd"), 
    i = {
        goods_id: "1233",
        goods_alias: "2orj383nf5rr3",
        goods_name: "商品"
    }, a(i, "goods_alias", "12ewadqwd"), a(i, "price", "1.00"), a(i, "pic_url", "https://img.yzcdn.cn/dasdsadsd"), 
    {
        handleCouponData: function(e) {
            var t = e.group ? Object.assign({}, e.group, e) : e;
            delete t.group;
            var n = t;
            if (n.show_more_desc = !1, n.disable_button = e.disable_button || !1, n.disable_charge = e.disable_charge || !1, 
            n.component = {}, n.component.name = t.name, n.component.type = 9 == t.group_type || 10 == t.group_type ? "code" : "card", 
            1 == t.preferential_type || "code" == n.component.type) {
                var a = t.value.split("."), o = a[0], i = 2 == a.length ? a[1] : null;
                i = "00" == i ? null : i, n.component.yuan = o, n.component.cent = i;
            } else if (2 == t.preferential_type) {
                var r = t.discount.split(".");
                2 == r.length ? n.component.discount = 0 == r[1] ? r[0] : t.discount : n.component.discount = r[0];
            }
            var s = void 0;
            if (s = null == t.originCondition ? 100 * parseFloat(t.at_least) : t.originCondition, 
            n.component.condition = s > 0 ? "满" + s / 100 + "元可用" : "无使用门槛", t.valid_start_at && t.expire_at) {
                var c = t.valid_start_at.substring(0, 10).replace(/-/g, "."), u = t.expire_at.substring(0, 10).replace(/-/g, ".");
                n.component.valid_time = c + " - " + u;
            } else if (1 == t.date_type || "code" == n.component.type) {
                var l = t.start_at.substring(0, 10).replace(/-/g, "."), d = t.end_at.substring(0, 10).replace(/-/g, ".");
                n.component.valid_time = l + " - " + d;
            } else 2 == t.date_type && (n.component.valid_time = "领到券" + (0 == t.fixed_begin_term ? "当日" : "次日") + "开始" + t.fixed_term + "天内有效");
            n.component.desclist = t.instructions.split("\n");
            var p = "valid", f = "", h = "";
            return 1 == t.is_invalid ? (p = "invalid", f = "已失效") : 1 == t.is_used ? (p = "invalid", 
            f = "已使用") : 0 == t.stock ? (p = "invalid", f = "已抢完") : t.buyer_taked_limit ? (p = "invalid", 
            f = "已领取") : h = "立即领取", n.component.status = e.status || p, n.component.invalid_content = f, 
            n.component.valid_content = e.valid_content || h, n;
        }
    }), l = {
        _onMoredescTaped: function(e) {
            var t = e.currentTarget.dataset.coupon, n = e.currentTarget.dataset.index;
            t.show_more_desc = !t.show_more_desc, this.onMoredescTaped && this.onMoredescTaped(t, n);
        },
        _onCouponButtonTaped: function(e) {
            var t = this, n = e.currentTarget.dataset.coupon, a = e.currentTarget.dataset.index, o = n.component.valid_content;
            if ("立即领取" == o) wx.showLoading({
                title: "领取中"
            }), s.carmen({
                api: "youzan.ump.coupon/1.0.0/fetch",
                query: {
                    id: n.id,
                    mobile: s.getMobile()
                },
                success: function(e) {
                    t.showZanToast("领取成功"), n.component.valid_content = "立即使用", t.onCouponObtainedSuccess && t.onCouponObtainedSuccess(n, a);
                },
                fail: function(e) {
                    t.showZanToast(e.msg || "领取失败");
                },
                complete: function() {
                    wx.hideLoading();
                }
            }); else if ("立即使用" == o) if ("all" == n.range_type) r.switchTab({
                url: "/pages/home/dashboard/index"
            }); else {
                if (0 == (n.range_value || []).length) return void r.switchTab({
                    url: "/pages/home/dashboard/index"
                });
                r.navigate({
                    url: "/packages/shop/goods/group/index?pageType=coupon&group_id=" + (n.coupon_group_id || n.id)
                });
            }
        },
        _onCouponCellTaped: function(e) {
            var t = e.currentTarget.dataset.coupon;
            "invalid" != t.component.status && this.onCouponCellTaped && this.onCouponCellTaped(t, e.currentTarget.dataset.index);
        }
    };
    e.exports = Object.assign({}, l, u, c.Toast);
}, function(t, n, a) {
    var o, i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, s = getApp(), c = a(1), u = a(20), l = a(244).default.wap2weapp, d = (a(4), a(5)), p = a(55), f = a(41)(), h = {
        data: {
            id: 0,
            alias: "",
            themeClass: s.themeClass,
            fetching: !0,
            type: "default",
            banner: {
                logo: "",
                title: ""
            },
            tags: {
                list: [],
                selectedId: 0,
                scroll: !1,
                choosedNum: []
            },
            pageBgColor: "",
            goods: {},
            systemInfo: {},
            scrollIntoView: "",
            scrollTop: 0,
            success: !0,
            showSelfFetchPopup: !0,
            visitGift: {}
        }
    }, g = {
        onLoad: function(e) {
            var t = this;
            this.options = e, this.__fetchPromise = new Promise(function() {});
            var n = s.globalData.isYouzanApp, a = this.route;
            if ("pages/home/tab/one" == a || "pages/home/tab/two" == a) {
                for (var o = getApp().globalData.nav || [], i = 0, r = "", c = 0; c < o.length; c++) {
                    var u = o[c];
                    if (a == u.page_path) {
                        i = u.id || 0, r = u.alias;
                        break;
                    }
                }
                i > 0 || r ? this.setData({
                    isHomePage: !1,
                    needExtraFixSpace: n,
                    id: i,
                    alias: r
                }) : this.setData({
                    needExtraFixSpace: n,
                    isHomePage: !0
                });
            } else e.id || e.alias ? this.setData({
                isHomePage: !1,
                id: e.id,
                alias: e.alias,
                title: e.title
            }) : this.setData({
                needExtraFixSpace: n,
                isHomePage: !0
            });
            var l = s.getSystemInfoSync();
            this.setData({
                systemInfo: l
            }), s.on("app:offlineId:change", function(e) {
                t.onPullDownRefresh(function() {
                    e && e();
                });
            });
        },
        __featureFirstLoad: !0,
        onUnload: function() {
            s.off(null, null, this);
        },
        onShow: function() {
            var e = this;
            s.getAppId() || wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试"
            }), this.__featureFirstLoad && (this.__fetchPromise = this.fetchHomepage()), setTimeout(function() {
                e.setData({
                    copyright: s.globalData.copyright,
                    is_big_shop: s.globalData.is_big_shop
                });
            }, 3e3);
        },
        onReady: function() {
            this.__featureFirstLoad = !1, this.__fetchPromise.then(function() {
                wx.setNavigationBarTitle({
                    title: o || " "
                });
            });
        },
        onPullDownRefresh: function(e) {
            this.fetchHomepage(!0, "function" == typeof e ? e : ""), this.trigger("home:refresh"), 
            s.fetchShopInfo();
        },
        onShareAppMessage: function() {
            var e = this.route, t = [];
            return d(this.options || {}, function(e, n) {
                t.push(n + "=" + e);
            }), {
                title: this.data.isHomePage ? s.globalData.shopName || "" : o,
                path: e + "?" + t.join("&")
            };
        },
        closeVisitGift: function() {
            this.setData({
                "visitGift.show": !1
            });
        }
    }, m = {
        fetchHomepage: function(e, t) {
            var n = this;
            return new Promise(function(a, c) {
                if (!s.getAppId()) return c();
                e || wx.showLoading({
                    title: "加载中"
                });
                var u = {
                    api: n.data.isHomePage ? "weapp.wsc.homepage/1.0.0/get" : "weapp.wsc.feature/1.0.0/getbyalias",
                    query: {}
                };
                n.data.alias ? u.query.alias = n.data.isHomePage ? "" : n.data.alias : n.data.id && !n.data.isHomePage && (u.query.id = n.data.id, 
                u.api = "weapp.wsc.feature/1.0.0/get"), s.carmen(r({}, u, {
                    config: {
                        skipKdtId: n.data.alias && !n.data.isHomePage
                    },
                    success: function(r) {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3), s.globalData.shopName = r.team_name, s.globalData.shopLogo = r.team_logo, 
                        n.data.isHomePage ? (o = r.team_name || "", wx.setStorageSync("is_secured_transactions", r.is_secured_transactions)) : (o = r.title || "", 
                        r.bgColor && n.setData({
                            pageBgColor: r.bgColor || ""
                        })), function(e) {
                            return e && "object" === (void 0 === e ? "undefined" : i(e)) ? e.type && "config" === e.type && e.template && "take_away" === e.template : this.showZanToast("页面配置不存在，请重新关联该页面");
                        }.call(n, r.data[0]) ? r = l(r) : (n.data.alias || void 0 === r.type) && (r.type = 3), 
                        n.showShowcaseComponents(r.data, r.type, e), n.setData({
                            fetching: !1,
                            id: r.id
                        }, function() {
                            n.trigger("feature:loaded", n.data.isHomePage ? s.getKdtId() : r.id);
                        }), t && t(), a();
                    },
                    fail: function(e) {
                        console.log(e), wx.hideLoading(), 60501 === e.code ? (n.showZanToast("小程序和有赞店铺信息不匹配"), 
                        s.storage.remove("app:token")) : n.showZanToast("获取信息失败"), c();
                    },
                    complete: function() {
                        e && wx.stopPullDownRefresh();
                    }
                }));
            });
        }
    };
    t.exports = f({}, h, p, m, g, c.Tab, c.Toast, u);
}, function(e, t, n) {
    var a = getApp(), o = n(323), i = n(38), r = "uic_login_without_password";
    e.exports = {
        fetchCode: function(e, t, n, i) {
            new Promise(function(e, t) {
                a.carmen({
                    api: "kdt.utility.time/1.0.0/get",
                    method: "GET",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(t) {
                        e(t);
                    },
                    fail: function(e) {
                        t(e);
                    }
                });
            }).then(function() {
                var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                a.carmen({
                    api: "kdt.auth.sms/1.0.0/send",
                    method: "POST",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    data: {
                        sms_token: function(e, t, n) {
                            var a = new Date(t);
                            a.setTime(a.getTime() + 288e5);
                            var i = a.getUTCMonth();
                            i = i + 1 > 9 ? (i + 1).toString() : "0" + (i + 1);
                            var r = a.getUTCDate(), s = r > 9 ? r.toString() : "0" + r, c = a.getUTCHours();
                            c = c > 9 ? c.toString() : "0" + c;
                            var u = a.getUTCMinutes();
                            u = u > 9 ? u.toString() : "0" + u;
                            var l = "" + a.getUTCFullYear() + i + s + c + u;
                            return console.log(l, t), o([ "youzan_app_iphone6", l, e, "uic_login_without_password" ].join(""));
                        }(e, s.stamp_millisecond),
                        send_times: t,
                        mobile: e,
                        countryCode: "",
                        biz: r
                    },
                    success: function(e) {
                        e.is_success ? n && n() : i(e);
                    },
                    fail: i
                });
            }).catch(i);
        },
        codeLogin: function(e, t, n, o) {
            var r = a.globalData.token;
            wx.request({
                url: i({
                    origin: "uic",
                    pathname: "/sso/wx/codeLogin"
                }),
                method: "POST",
                config: {
                    skipKdtId: !0,
                    skipShopInfo: !0
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    mobile: e,
                    countryCode: "+86",
                    verifyCode: t,
                    sessionId: r.session_id
                },
                success: function(e) {
                    e.data && 0 === e.data.code ? n && n(e) : o(e.data);
                },
                fail: o
            });
        },
        checkUserHasBindPhone: function(e, t, n) {
            var o = a.globalData.token;
            wx.request({
                url: i({
                    origin: "uic",
                    pathname: "/sso/wx/kdt/confirm"
                }),
                method: "POST",
                config: {
                    skipKdtId: !0,
                    skipShopInfo: !0
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    mobile: e,
                    countryCode: "+86",
                    sessionId: o.session_id
                },
                success: function(e) {
                    var a = e.data;
                    0 === a.code || 200 === a.code ? t(a) : n(a);
                },
                fail: n
            });
        },
        setPassword: function(e, t, n) {
            var o = a.globalData.token;
            wx.request({
                url: i({
                    origin: "uic",
                    pathname: "/sso/wx/updatePasswd"
                }),
                method: "POST",
                config: {
                    skipKdtId: !0,
                    skipShopInfo: !0
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    password: e,
                    sessionId: o.session_id
                },
                success: function(e) {
                    var a = e.data;
                    0 === a.code || 200 === a.code ? t(a) : n(a);
                },
                fail: n
            });
        }
    };
}, , , function(e, t, n) {
    e.exports = {
        mobile: function(e) {
            return /^((\+86)|(86))?(1)\d{10}$/.test(e = "" + e) || /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1|)-?\d{1,14}$/.test(e);
        },
        phone: function(e) {
            return /^0[0-9\-]{10,13}$/.test(e = "" + e);
        },
        chinaMobile: function(e) {
            return /^((\+86)|(86))?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(e);
        },
        number: function(e) {
            return /^\d+$/.test(e);
        },
        email: function(e) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e);
        },
        postalCode: function(e) {
            return /^\d{6}$/.test(e = "" + e);
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e ? "" + e.slice(0, 6) + new Array(e.length - 9).join("*") + e.slice(-4) : "";
    }
    function o(e, t) {
        return (e = e + 1 < 10 ? "0" + (e + 1) : e + 1) + "-" + (t = t < 10 ? "0" + t : t);
    }
    var i = n(5), r = n(35), s = n(2), c = n(6), u = n(213), l = getApp();
    e.exports = {
        getBriefGoodsData: function(e) {
            return e.map(function(e) {
                return {
                    sku_id: e.skuId,
                    goods_id: e.goodsId,
                    goods_type: e.goodsType,
                    price: e.price,
                    pay_price: e.payPrice,
                    num: e.num
                };
            });
        },
        parseOrderData: function(e, t) {
            var n = e.shopResultList[0], l = n.orderItemList || [], d = (n.activityResult || {}).activityNameList || [], p = e.canSelfFetch, f = e.showDescResult.showExpressTab, h = !0, g = !1, m = !1;
            p && f || (m = !0, h = f, g = p), t.order_no && (e.orderAddress ? (g = !1, h = !0) : e.selfFetchAddress && (g = !0, 
            h = !1));
            var _ = n.postageResult, v = +_.currentExpressType, y = _.postageItems || [], b = {
                postage: 0,
                expressType: -1,
                postageTitle: "",
                postageDesc: ""
            };
            y.forEach(function(e) {
                +e.expressType === v && (b = e), e.postageStr = c(e.postage).toYuan();
            }), 1 == b.expressType && (g = !0, h = !1);
            var w = "", x = 0;
            l = l.map(function(e) {
                x += e.pointsPrice, e.imgUrl = s(e.imgUrl, "!200x200.jpg"), e.activityType = n.activityType, 
                e.sku = JSON.parse(e.sku);
                var t = "";
                e.sku.forEach(function(e) {
                    t += e.v + " ";
                }), e.skuStr = t;
                try {
                    var a = JSON.parse(e.message), r = [];
                    i(a, function(e, t) {
                        r.push({
                            name: t,
                            value: e
                        });
                    }), e.message = r;
                } catch (t) {
                    e.message = [];
                }
                if (e.isPresale) if (0 == e.presaleTimeType) {
                    var u = new Date(1e3 * e.presaleStartTime), l = u.getFullYear(), d = u.getMonth(), p = u.getDate();
                    w = l + "-" + o(d, p);
                } else if (1 == e.presaleTimeType) {
                    var f = new Date(new Date().getTime() + 1e3 * (e.presaleStartTimeAfterPay + 1) * 24 * 60 * 60), h = f.getFullYear(), g = f.getMonth(), m = f.getDate();
                    w = h + "-" + o(g, m);
                }
                return e.payPriceStr = c(e.payPrice).toYuan(), e;
            });
            var S = {
                showDetail: !1
            }, T = [];
            (n.unavailableItemList || []).forEach(function(e) {
                var t = "";
                JSON.parse(e.sku || "[]").forEach(function(e) {
                    t += e.v + " ";
                });
                var n = {
                    goodsId: e.goodsId,
                    skuId: e.skuId,
                    imgUrl: s(e.imgUrl, "!200x200.jpg"),
                    priceStr: c(e.price).toYuan(),
                    title: e.title,
                    num: e.num,
                    unavailableDesc: e.unavailableDesc,
                    skuStr: t
                };
                T.push(n);
            }), S.list = T;
            var k = (n.groupInfo || {}).receiveState, D = void 0 === k ? 0 : k, C = 0 != D, A = 2 == D, I = 2 == D || t.isLeaderSelected, P = !!n.groupInfo, O = u.getSteps(3, g, P), L = n.orderPayment, M = n.chargePriceChangeResult || null, E = {
                realPay: L.realPay,
                goodsPay: L.itemPay,
                postage: L.postage,
                activity: L.decrease,
                points: x,
                changePrice: M
            }, F = this.parsePaymentData(E), j = !1;
            l.forEach(function(e) {
                if (e.isPresale) if (j = !0, 0 === e.presaleTimeType) {
                    var t = new Date(1e3 * e.presaleStartTime);
                    new Date().getFullYear() != t.getFullYear() ? e.preSaleInfo = r.getDateStrFix2(t) + " 开始发货" : e.preSaleInfo = r.getMonthDayfix2Str(t) + " 开始发货";
                } else 1 === e.presaleTimeType && (e.preSaleInfo = "付款 " + e.presaleStartTimeAfterPay + " 天后发货");
            });
            var z = n.coreDeliveryCheckResult, B = void 0 === z ? {} : z;
            return {
                canSelfFetch: p,
                showSelfFetch: g,
                showExpress: h,
                showDescResult: e.showDescResult,
                "localDeliveryInfo.settings.prepareTime": B.prepareTime,
                "localDeliveryInfo.showLocalDeliveryTime": e.showDescResult.showLocalDeliveryTime,
                "localDeliveryInfo.showLocalDeliveryScope": e.showDescResult.showLocalDeliveryScope,
                hideSegmentOnlySelfFetch: m,
                shop: Object.assign(t.shop, {
                    needIdCardNo: n.hasOverseaGoods,
                    umpActivity: d,
                    postage: L.postage,
                    realPay: L.realPay,
                    pay: L.pay,
                    shopName: n.shopName,
                    buyer_msg: n.buyerMsg || "",
                    postageStr: c(L.postage).toYuan(),
                    itemPayStr: c(L.itemPay).toYuan(),
                    itemPointsStr: x
                }),
                postageInfo: {
                    selected: b,
                    list: y
                },
                coupons: Object.assign(t.coupons, {
                    list: n.chargeCoupon || [],
                    inValid: n.unavailableCoupon || []
                }),
                idCardNo: t.order_no ? a(n.idCardNumber) : n.idCardNumber || "",
                is_virtual: e.isVirtual || e.hasVirtualGoods,
                goods_list: l,
                hasPresale: j,
                unavailable_goods: S,
                showGroupCollect: C,
                forceEnableGroupCollect: A,
                isLeaderSelected: I,
                steps: O,
                payment: E,
                payment_strs: F,
                goodsPresaleStartTime: w,
                includeFx: l.find(function(e) {
                    return 10 === e.goodsType;
                })
            };
        },
        parsePaymentData: function(e) {
            return {
                realPayStr: c(e.realPay).toYuan(),
                goodsPay: c(e.goodsPay).toYuan(),
                postage: c(e.postage).toYuan(),
                activity: c(e.activity).toYuan(),
                points: e.points,
                changePrice: e.changePrice ? c(e.changePrice.newPay - e.changePrice.originPay).toYuan() : null
            };
        },
        parseOrderAddressData: function(e) {
            return {
                address_detail: e.addressDetail,
                id: e.addressId,
                area_code: e.areaCode,
                city: e.city,
                community: e.community,
                county: e.county,
                postal_code: e.postalCode,
                province: e.province,
                tel: e.tel,
                user_name: e.userName
            };
        },
        formatCouponCodeData: function(e) {
            var t = e.coupons.code;
            return {
                kdt_id: l.getKdtId(),
                item_pay: e.payment.goodsPay,
                postage: e.payment.postage,
                fans_type: l.getFansType(),
                item_list: JSON.stringify(this.getBriefGoodsData(e.goods_list)),
                code: t
            };
        },
        formatOrderShowData: function(e, t) {
            var n = {}, a = {}, o = wx.getStorageSync("selectDetailModel"), r = e.isGroupon, s = e.postageInfo;
            if (e.isFirst) ; else if (e.showSelfFetch && null != o) {
                var c = {
                    id: o.id,
                    kdt_id: l.getKdtId(),
                    name: o.name,
                    province: o.province,
                    city: o.city,
                    tel: o.tel,
                    county: o.county || o.area,
                    address_detail: o.address,
                    address: o.address,
                    dfcode: o.city_code,
                    postal_code: o.city_code,
                    user_name: e.fetchUserName,
                    user_tel: e.fetchPhoneNumber,
                    user_time: e.fetchTime,
                    is_optional_self_fetch_time: o.is_optional_self_fetch_time
                };
                a = r ? {
                    expressType: 1,
                    selfFetch: JSON.stringify(c),
                    groupIsHeader: e.isLeader,
                    groupCollectServiceChosen: e.isLeaderSelected
                } : {
                    expressType: 1,
                    selfFetch: JSON.stringify(c)
                };
            } else e.showExpress && e.address && e.address.user_name && ((a = r ? {
                addressDetail: e.address.address_detail,
                addressId: e.address.id,
                areaCode: e.address.area_code,
                city: e.address.city,
                community: e.address.community || "",
                county: e.address.county,
                expressType: 0,
                expressTypeChosen: s.selected.expressType,
                postalCode: e.address.postal_code,
                province: e.address.province,
                tel: e.address.tel,
                userName: e.address.user_name,
                groupIsHeader: e.isLeader,
                groupCollectServiceChosen: e.isLeaderSelected
            } : {
                addressDetail: e.address.address_detail,
                addressId: e.address.id,
                areaCode: e.address.area_code,
                city: e.address.city,
                community: e.address.community || "",
                county: e.address.county,
                expressType: 0,
                expressTypeChosen: s.selected.expressType,
                postalCode: e.address.postal_code,
                province: e.address.province,
                tel: e.address.tel,
                userName: e.address.user_name
            }).lat = e.address.lat, a.lon = e.address.lon);
            if (e.is_virtual && (a = {}), 3 === e.is_virtual && (a.userName = e.customer.user_name, 
            a.tel = e.customer.telephone), 2 == s.selected.expressType) {
                var u = e.localDeliveryInfo;
                a.deliveryEndTime = u.selected.end, a.deliveryStartTime = u.selected.start, a.deliveryTimeSpan = u.selected.timeSpan;
            }
            a.idCardNumber = e.idCardNo, Object.keys(a).length > 0 && (n.billAddress = a), n.billCustomer = {};
            var d = e.origin_goods_list;
            if (t) {
                var p = e.unavailable_goods.list || [];
                d = d.filter(function(e) {
                    return !p.some(function(t) {
                        return t.goodsId = e.goodsId && t.skuId == e.skuId;
                    });
                });
            }
            n.billGoodsList = d.map(function(t) {
                var n;
                return t = Object.assign({}, t), "cart" != e.orderFrom ? (n = [], i(t.message, function(e) {
                    n.push(e);
                })) : n = t.message || {}, t.message = JSON.stringify(n), r && null != e.activityAlias && (t.activityAlias = e.activityAlias), 
                t;
            });
            var f = e.coupons.selected || {};
            return n.billShopList = [ {
                buyWay: 0,
                buyerMsg: e.shop.buyer_msg,
                couponId: f.id || "0",
                couponType: f.type || "0",
                currency: 1,
                isForbidUmp: !1,
                isPinjian: 0,
                isPoints: 0,
                kdtId: l.getKdtId(),
                orderType: 0,
                storeId: l.getOfflineId() || 0
            } ], n.billSource = {
                isNewTrade: 1,
                bookKey: e.book_key,
                channel: "",
                clientIp: "127.0.0.1",
                hasUnvalidGoods: 0,
                isReceiveMsg: e.sms || 0,
                kdtId: l.getKdtId(),
                orderFrom: e.orderFrom || "",
                platform: "weixin",
                seller: "",
                source: "",
                track: "",
                orderMark: l.globalData.isYouzanApp ? "weapp_youzan" : "wx_shop",
                weAppFormId: e.formId
            }, n;
        },
        formatOrderPaymentData: function(e) {
            var t = {}, n = l.globalData.token || {};
            return t.customer = {
                buyerPhone: n.mobile || ""
            }, t.order = {
                buyWay: function(e) {
                    var t = 1;
                    return 0 == (e.payment || {}).realPay && (t = 16), t;
                }(e),
                kdtId: l.getKdtId(),
                orderNo: e.order_no
            }, t.payExtra = {
                clientIp: "127.0.0.1",
                forceWxShareKdtId: !1,
                forceWxpayBigunsign: !1,
                openId: n.openId,
                originClientIp: "127.0.0.1",
                userAgent: ""
            }, t;
        },
        desensitizationIdNo: a
    };
}, function(e, t, n) {
    function a(e, t, n) {
        var a = i.formatOrderShowData(e);
        r.carmen({
            api: "kdt.trade.bill/1.0.0/show",
            data: {
                billContext: JSON.stringify(a)
            },
            method: "POST",
            success: function(e) {
                200 == e.code ? t && t(e) : n(e.message, e);
            },
            fail: function(e) {
                n && n(e.msg, e);
            }
        });
    }
    function o(e, t, n) {
        var a = {
            orderNo: e.order_no,
            kdtId: r.getKdtId()
        };
        r.carmen({
            api: "kdt.trade.bill/1.0.0/showPay",
            data: {
                billShowPayParam: JSON.stringify(a)
            },
            method: "GET",
            success: function(e) {
                200 == e.code ? t && t(e) : n(e.message, e);
            },
            fail: function(e) {
                n && n(e.msg, e);
            }
        });
    }
    var i = n(31), r = getApp(), s = n(4);
    e.exports = {
        fetchOrderData: function(e, t, n) {
            var i;
            i = e.order_no ? o : a, console.log("Error dta: ", e), i(e, function(e) {
                t(e);
            }, function(e, t) {
                n && n(e, t);
            });
        },
        validCouponCode: function(e, t, n) {
            var a = this;
            r.carmen({
                api: "kdt.ump.coupon.take/1.0.0/takecode",
                data: Object.assign({}, {
                    fans_type: r.getFansType(),
                    kdt_id: getApp().getKdtId()
                }, e),
                method: "POST",
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    n && n(e);
                },
                complete: function() {
                    a.isFetching = !1;
                }
            });
        },
        createOrder: function(e, t, n) {
            var a = this, o = i.formatOrderShowData(e, !0);
            r.request({
                path: "wsctrade/order/buy/weappbill.json",
                data: o,
                method: "POST"
            }).then(function(e) {
                var n = e.bill_data || {};
                s.track({
                    fm: "orderCreate",
                    act_name: "normal",
                    order_no: n.order_no || ""
                }), "function" == typeof a.__yzLog__ && a.__yzLog__({
                    et: "click",
                    ei: "orderCreate",
                    en: "下单",
                    params: {
                        order_no: n.order_no || ""
                    }
                }), t(n, e);
            }).catch(function(e) {
                n && n(e.msg);
            });
        },
        payOrder: function(e, t, n) {
            r.carmen({
                api: "kdt.trade.bill/1.0.0/pay",
                data: {
                    billPayParam: JSON.stringify(e)
                },
                method: "POST",
                success: function(e) {
                    if (200 === e.code) {
                        var a = (e.data || {}).payData || {};
                        t(a, e);
                    } else n && n(e.message);
                },
                fail: function(e) {
                    n(e.msg);
                }
            });
        },
        requestCOD: function(e, t, n) {
            var a = {
                orderNoList: [ e.order_no ],
                payType: "CASH_ON_DELIVERY"
            };
            r.carmen({
                api: "youzan.trade.core.paytype/3.0.0/decide",
                data: {
                    request: JSON.stringify(a)
                },
                method: "POST",
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    n && n(e.msg, e);
                }
            });
        },
        fetchCustomService: function(e) {
            r.carmen({
                api: "weapp.wsc.shop.returnaddress/1.0.0/get",
                success: function(t) {
                    var n = "";
                    +t.show_notice_mobile && (t.notice_phone2 ? (n = t.notice_phone2, t.notice_phone1 && (n = t.notice_phone1 + "-" + n)) : t.notice_mobile && (n = t.notice_mobile)), 
                    e(n);
                }
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, o = (a = n(63)) && a.__esModule ? a : {
        default: a
    }, i = {
        $cashierMaskClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, a = n.componentId;
            n.closeOnClickOverlay && this.resolveCancelClick.call(this, {
                componentId: a
            });
        },
        $cashierCancelBtnClick: function(e) {
            var t = (e.currentTarget || {}).dataset.componentId;
            this.resolveCancelClick.call(this, {
                componentId: t
            });
        },
        $cashierBtnClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, a = n.enable, o = n.payChannel, i = n.payChannelName, r = n.valueCardNo;
            a && ("function" == typeof this.$cashierClick ? this.$cashierClick({
                pay_channel: o,
                pay_channel_name: i
            }, {
                value_card_no: r
            }) : console.warn("页面缺少 $cashierClick({ componentId, index }) 回调函数"));
        },
        resolveCancelClick: function(e) {
            var t = e.componentId;
            console.info("[cashier:actionsheet:cancel]"), "function" == typeof this.$cashierCancel ? this.$cashierCancel({
                componentId: t
            }) : console.warn("页面缺少 $cashierCancel({ componentId }) 回调函数");
        },
        $cashierClosePassword: function() {
            this.setData({
                "$cashier.showPassword": !1
            });
        },
        $cashierECardPasswordPay: function() {
            var e = o.default.encrypt(this.data.$cashier.password);
            "function" == typeof this.$cashierClick ? this.$cashierClick({
                pay_channel: "ECARD"
            }, {
                password: e
            }) : console.warn("页面缺少 $cashierClick({ }) 回调函数");
        },
        onPasswordInputBlur: function(e) {
            var t = e.detail.value;
            this.setData({
                "$cashier.password": t
            });
        }
    };
    t.default = i;
}, function(e, t, n) {
    var a = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                Object.defineProperty(e, a.key, a);
            }
        }
        return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
        };
    }(), o = n(36), i = n(217), r = getApp(), s = {
        available_status: "AVALIABLE",
        pay_channel_name: "微信支付",
        balance: "",
        should_wrap: !1,
        value_card_no: "",
        available: !0,
        pay_channel: "WX_APPLET",
        available_desc: "",
        channel_type: "THIRD_PAY"
    };
    e.exports = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.cashierData, a = t.acquireNo;
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e), this.payData = {}, this.isCashierCreating = !1, this.isOrderCreated = !1, 
            this.isPayProcessing = !1, this.isFetchedPayWays = !1, this.payWays = [], this.isPrepay = !0, 
            this.setCashierData(n, a);
        }
        return a(e, [ {
            key: "createCashierOrder",
            value: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise(function(n, a) {
                    var i = o.toSnakeCase(t) || {};
                    if (e.isPrepay) return e.payData.cashierData = i, e.isOrderCreated = !0, e.isFetchedPayWays = !1, 
                    void n({});
                    e.isCashierCreating ? a({
                        msg: "收单已在创建中..."
                    }) : (e.isCashierCreating = !0, wx.showToast({
                        title: "支付提交中",
                        icon: "loading",
                        duration: 1e4
                    }), e.payData.cashierData = Object.assign({}, i, {
                        currency_code: i.currency_codel
                    }), r.carmen({
                        api: "youzan.pay.unified/1.0.0/create",
                        data: i,
                        method: "POST",
                        success: function(t) {
                            var o = t.acquire_no || "";
                            o ? (e.payData.acquireNo = o, e.isOrderCreated = !0, n(t)) : a({
                                msg: "收单失败"
                            });
                        },
                        fail: function(e) {
                            a(e);
                        },
                        complete: function() {
                            e.isCashierCreating = !1, wx.hideToast();
                        }
                    }));
                });
            }
        }, {
            key: "getPayWays",
            value: function(e) {
                var t = this;
                return new Promise(function(n, a) {
                    t.isFetchedPayWays ? n(t.payWays) : t.isPrepay ? r.request({
                        path: "wsctrade/order/buy/payChannels.json",
                        data: e,
                        method: "POST"
                    }).then(function(e) {
                        t.isFetchedPayWays = !0;
                        var a = e.pay_channels || [];
                        a && 0 === a.length ? (t.payWays = [], n(t.payWays)) : t.payWays = a, n(t.payWays);
                    }).catch(function(e) {
                        console.error(e), t.isFetchedPayWays = !1, a(e);
                    }) : (t.payWays = [ s ], n(t.payWays));
                });
            }
        }, {
            key: "doPayAction",
            value: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    pay_channel: "WX_APPLET"
                }, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return console.warn(t), new Promise(function(a, o) {
                    if (!e.isOrderCreated) return o({
                        msg: "未完成收单无法支付"
                    });
                    if (e.isPayProcessing) return o({
                        msg: "支付进行中，请稍候"
                    });
                    e.isPayProcessing = !0, wx.showToast({
                        title: "支付提交中",
                        icon: "loading",
                        duration: 1e4
                    });
                    var i = r.globalData.token || {}, s = e.payData.cashierData || {}, c = void 0;
                    try {
                        var u = JSON.parse(s.biz_ext);
                        u.appId = r.getAppId(), c = JSON.stringify(u);
                    } catch (e) {
                        c = s.biz_ext;
                    }
                    var l = function() {
                        wx.hideToast(), e.isPayProcessing = !1;
                    };
                    if (s.prepay_id) {
                        var d = Object.assign({}, {
                            partner_id: s.partner_id,
                            prepay_id: s.prepay_id,
                            cashier_salt: s.cashier_salt,
                            cashier_sign: s.cashier_sign,
                            pay_tool: t.pay_channel,
                            wx_sub_open_id: i.openId,
                            pay_token: n.password,
                            accept_price: n.accept_price || 0,
                            new_price: n.new_price || -1,
                            value_card_no: n.value_card_no,
                            out_biz_ctx: c
                        }, n);
                        e._doPreorderPay(d, a, o, l);
                    } else {
                        var p = Object.assign({}, s, {
                            goods_desc: s.trade_desc,
                            out_biz_ctx: c,
                            wx_sub_open_id: i.openId,
                            acquire_no: e.payData.acquireNo,
                            pay_tool: t.pay_channel
                        }, n);
                        e._doPay(p, a, o, l);
                    }
                });
            }
        }, {
            key: "_doPay",
            value: function(e, t, n, a) {
                r.carmen({
                    api: "youzan.pay.unified/1.0.0/multipay",
                    data: e,
                    method: "POST",
                    success: function(a) {
                        var r = a.pay_detail_result, s = r[0].deep_link_info || {};
                        r[0].deep_link_info = o.toCamelCase(s), i.doPay(e.pay_tool, r[0]).then(t).catch(n);
                    },
                    fail: function(e) {
                        n({
                            msg: e.msg || "支付请求失败，请稍后再试"
                        });
                    },
                    complete: function() {
                        a && a();
                    }
                });
            }
        }, {
            key: "_doPreorderPay",
            value: function(e, t, n, a) {
                var o = this;
                r.request({
                    path: "wsctrade/order/buy/preorderPay.json",
                    data: e,
                    method: "POST"
                }).then(function(r) {
                    if ("ADJUST_PRICE" === r.operation && r.new_price) wx.showModal({
                        title: "改价提醒",
                        content: "商家已将交易金额修改为" + (r.new_price / 100).toFixed(2) + "元，是否继续支付？",
                        confirmText: "确认",
                        cancelText: "取消",
                        success: function(i) {
                            i.confirm ? o._doPreorderPay(Object.assign(e, {
                                accept_price: 1,
                                new_price: r.new_price
                            }), t, n, a) : n({
                                msg: "不同意改价",
                                type: "adjust_price"
                            });
                        }
                    }); else {
                        var s = r.deep_link_info || "";
                        if (s) try {
                            r.deep_link_info = JSON.parse(s);
                        } catch (e) {
                            console.error(e);
                        }
                        i.doPay(e.pay_tool, r).then(function() {
                            t(r);
                        }).catch(n);
                    }
                }).catch(function(e) {
                    var t = "";
                    117700511 === e.code && (t = "need_password"), n({
                        type: t,
                        msg: e.msg || "支付请求失败，请稍后再试"
                    });
                }).then(function() {
                    a && a();
                });
            }
        }, {
            key: "doCODPay",
            value: function(e) {
                var t = this, n = (e.pay_channel, e.pay_channel_name), a = void 0 === n ? "" : n;
                return new Promise(function(e, n) {
                    wx.showModal({
                        title: "下单提醒",
                        confirmText: "确认",
                        content: t._getCODMessage(a),
                        success: function(t) {
                            t.confirm ? e() : t.cancel && n();
                        },
                        fail: function() {
                            n();
                        }
                    });
                });
            }
        }, {
            key: "_getCODMessage",
            value: function(e) {
                var t = "";
                switch (e) {
                  case "到店付款":
                    t = "您正在选择到店付款，下单后请自行到店领取并付款。";
                    break;

                  default:
                    t = "您正在选择货到付款，下单后由商家发货，送货上门并收款。";
                }
                return t;
            }
        }, {
            key: "setCashierData",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments[2], a = o.toSnakeCase(e) || {};
                this.payData.cashierData = a, t && (this.isOrderCreated = !0, this.payData.acquireNo = t), 
                n && (this.isOrderCreated = !0);
            }
        }, {
            key: "setPrepayMode",
            value: function(e) {
                this.isPrepay = e;
            }
        } ]), e;
    }();
}, function(e, t, n) {
    function a(e) {
        return "[object String]" == Object.prototype.toString.call(e) ? new Date(e.replace(/-/g, "/")) : new Date(e);
    }
    function o(e) {
        var t = e.split(":");
        return 60 * parseInt(t[0], 10) + parseInt(t[1], 10);
    }
    function i(e) {
        return e ? e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() : "";
    }
    function r(e) {
        return e ? e.getFullYear() + "-" + c(e.getMonth() + 1) + "-" + c(e.getDate()) : "";
    }
    function s(e) {
        return c(e.getHours()) + ":" + c(e.getMinutes());
    }
    function c(e) {
        return e < 10 ? "0" + e : e;
    }
    function u(e, t) {
        var n = l(e), a = l(t);
        return n.getTime() - a.getTime();
    }
    function l(e) {
        var t = a(e);
        return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t;
    }
    var d = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
    e.exports = {
        isToday: function(e) {
            var t = new Date(), n = a(e);
            return t.getFullYear() == n.getFullYear() && t.getMonth() == n.getMonth() && t.getDate() == n.getDate();
        },
        formatDateTime: function(e) {
            return i(e) + " " + s(e);
        },
        formatDateTimeFix2: function(e) {
            return e ? r(e) + " " + s(e) + ":00" : "";
        },
        newDate: a,
        getMinuteHHmm: o,
        getMinuteDate: function(e) {
            return 60 * e.getHours() + e.getMinutes();
        },
        getTimeUnitInMS: function(e) {
            if (!e || !e.type) return 0;
            if ("none" == e.type) return 0;
            if ("minute" == e.type) return 60 * parseInt(e.value, 10) * 1e3;
            if ("hour" == e.type) return 60 * parseInt(e.value, 10) * 60 * 1e3;
            if ("day" == e.type) {
                var t = new Date(), n = this.setHourMinSec0(t);
                return n.setDate(n.getDate() + parseInt(e.value, 10)), n.getTime() - t.getTime();
            }
            return 0;
        },
        getDateStr: i,
        getDateStrFix2: r,
        getTimeFix2Str: s,
        createTimeStrFix2FromHourMinute: function(e, t) {
            return c(e) + ":" + c(t);
        },
        compareTime: function(e, t) {
            return e === t ? 0 : o(e) - o(t);
        },
        computeTimePiecesCount: function(e, t, n) {
            var a = o(e), i = o(t) - a;
            return Math.ceil(i / n);
        },
        generateNextSlotStart: function(e, t, n, a) {
            var i = o(e), r = 60 * t + n + a;
            return r > i && (r = i), {
                hour: Math.floor(r / 60),
                minute: r % 60
            };
        },
        isTheSameDay: function(e, t) {
            return 0 == u(e, t);
        },
        computeDayCount: function(e, t) {
            var n = l(e), a = l(t);
            return Math.floor((a.getTime() - n.getTime()) / 864e5) + 1;
        },
        compareDay: u,
        setHourMinSec0: l,
        getMonthDayfix2Str: function(e) {
            var t = e.getMonth() + 1;
            t = 1 === t.toString().length ? "0" + t : t;
            var n = e.getDate();
            return t + "月" + (n = 1 === n.toString().length ? "0" + n : n) + "日";
        },
        getMonthInterval: function(e, t) {
            var n = a(e), o = a(t);
            return 12 * (o.getFullYear() - n.getFullYear()) + (o.getMonth() - n.getMonth()) + 1;
        },
        getDateDescription: function(e) {
            var t = new Date(), n = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1), a = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 2), o = i(e);
            return o === i(t) ? "今天" : o === i(n) ? "明天" : o === i(a) ? "后天" : d[e.getDay()];
        }
    };
}, function(t, n, a) {
    function o(e) {
        return /^\d+$/.test(e) ? e : e.replace(/[A-Z]/g, function(e) {
            return "_" + e.toLowerCase();
        });
    }
    function i(e) {
        return /^\d+$/.test(e) ? e : e.replace(/\_[a-z]/g, function(e) {
            return e[1].toUpperCase();
        });
    }
    var r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, s = a(5);
    t.exports = {
        toSnakeCase: function e(t) {
            if ("string" == typeof t) return o(t);
            if ("object" === (void 0 === t ? "undefined" : r(t))) {
                var n = {};
                return t instanceof Array && (n = []), s(t, function(t, a) {
                    "object" === (void 0 === t ? "undefined" : r(t)) ? n[o(a)] = e(t) : n[o(a)] = t;
                }), n;
            }
            return t;
        },
        toCamelCase: function e(t) {
            if ("string" == typeof t) return i(t);
            if ("object" === (void 0 === t ? "undefined" : r(t))) {
                var n = {};
                return t instanceof Array && (n = []), s(t, function(t, a) {
                    "object" === (void 0 === t ? "undefined" : r(t)) ? n[i(a)] = e(t) : n[i(a)] = t;
                }), n;
            }
            return t;
        }
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(300)), i = a(n(299)), r = a(n(298));
    t.default = {
        new2captain: o.default,
        old2new: i.default,
        newPolyFill: r.default
    };
}, function(e, t, n) {
    var a = n(16), o = n(9), i = {
        uic: "https://uic.youzan.com",
        carmen: "https://open.youzan.com",
        h5: "https://h5.youzan.com",
        trade: "https://trade.youzan.com",
        qiniu: "https://img.yzcdn.cn"
    }, r = {
        origin: "carmen",
        pathname: "",
        query: {}
    };
    e.exports = function(e) {
        var t = ((e = a({}, r, e)).pathname || "").startsWith("/"), n = i[e.origin] + (t ? "" : "/") + e.pathname;
        return o.add(n, e.query);
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = {
        weapp_youzan: {
            clientId: "c44bfbda4cb0fb1c34",
            clientSecret: "217853e0393ffddbc027b32411d60b3d"
        },
        wx_shop: {
            clientId: "4d65249d377b2c3ed8",
            clientSecret: "1cdc05151d64f3a4a6ebd0e9de64422a"
        },
        common: {
            yzLogo: "https://img.yzcdn.cn/public_files/2018/01/19/609c5f6e2ce07e86ee27dedb8e05b31c.png"
        }
    };
}, function(e, t, n) {
    var a = {
        "pages/home/dashboard/index": "h",
        "pages/home/tab/one": "f",
        "pages/home/tab/two": "f",
        "pages/home/feature/index": "f",
        "packages/shop/goods/group/index": "ag",
        "pages/usercenter/dashboard/index": "uc",
        "pages/goods/detail/index": "g",
        "pages/goods/seckill/index": "seckg",
        "pages/goods/cart/index": "cart",
        "packages/trade/order/result/index": "od",
        "packages/trade/order/list/index": "ol",
        "pages/trade/buy/index": "trade",
        "pages-youzan/dashboard/home/index": "yzh",
        "pages-youzan/usercenter/dashboard/index": "uc",
        "pages-youzan/mars/index": "yzc",
        "pages-youzan/shop/new/index": "yzoc",
        "pages-youzan/shop/create-user/step-1/index": "yzom",
        "pages-youzan/shop/create-user/step-2/index": "yzov",
        "pages-youzan/shop/create-user/step-3/index": "yzop",
        "pages-youzan/shop/status/index": "yzo"
    }, o = {
        enter: "",
        refer: "",
        current: "",
        prefix: "__SPM__",
        enterKey: "enter",
        referrerKey: "referrer",
        currentKey: "current"
    }, i = [];
    e.exports = {
        initSpm: function() {
            i = [];
        },
        setCurrentSpm: function(e, t) {
            var n, r = getCurrentPages(), s = e || r[r.length - 1].route, c = t || "function" == typeof (n = getApp()).getKdtId && n.getKdtId() || "0";
            o.current = s;
            var u = (a[s] || "fake") + c, l = wx.getStorageSync(o.prefix + o.currentKey);
            l && wx.setStorageSync(o.prefix + o.referrerKey, l), wx.setStorageSync(o.prefix + o.currentKey, u), 
            i.length >= 3 && i.splice(1, i.length - 3 + 1), 0 === i.length && wx.setStorageSync(o.prefix + o.enterKey, u), 
            i.push(s);
        },
        getSpm: function() {
            var e = [], t = wx.getStorageSync(o.prefix + o.enterKey), n = wx.getStorageSync(o.prefix + o.referrerKey), a = wx.getStorageSync(o.prefix + o.currentKey);
            return t && e.push(t), i.length > 2 && n && e.push(n), i.length > 1 && a && e.push(a), 
            e.join("_");
        },
        removePageSpm: function() {
            wx.removeStorage({
                key: o.prefix + o.currentKey,
                success: function() {}
            }), wx.removeStorage({
                key: o.prefix + o.enterKey,
                success: function() {}
            }), wx.removeStorage({
                key: o.prefix + o.referrerKey,
                success: function() {}
            });
        }
    };
}, function(e, t, n) {
    var a = n(346), o = [ "onLaunch", "onLoad", "onReady", "onShow", "onHide", "onError", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll" ], i = function(e) {
        return "__$" + e;
    };
    e.exports = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.life, n = void 0 === t ? o : t, r = e.exclude, s = void 0 === r ? [] : r, c = s.concat(o.map(i));
        if (!Array.isArray(n) || !Array.isArray(s)) throw new Error("Invalid Extend Config");
        var u = n.filter(function(e) {
            return o.indexOf(e) >= 0;
        });
        return function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
            return n.forEach(function(t) {
                t && Object.keys(t).forEach(function(n) {
                    var o = t[n];
                    if (!(c.indexOf(n) >= 0)) if (u.indexOf(n) >= 0 && "function" == typeof o) {
                        var r, s = i(n);
                        e[s] || (e[s] = [], e[n] && e[s].push(e[n]), e[n] = function(t) {
                            var o = this;
                            "onLaunch" === n || "onShow" === n && t ? t.query = a(t.query) : "onLoad" === n && (t = a(t)), 
                            e[s].forEach(function(e) {
                                return e.apply(o, [ t ]);
                            });
                        }), t[s] ? (r = e[s]).push.apply(r, function(e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                return n;
                            }
                            return Array.from(e);
                        }(t[s])) : e[s].push(o);
                    } else e[n] = o;
                });
            }), e;
        };
    };
}, function(e, t, n) {
    var a = {
        laterReceive: function(e, t) {
            o.carmen({
                api: "trade.order.state/1.0.0/orderLaterReceive",
                data: e,
                success: function() {
                    t.success && t.success();
                }
            });
        },
        confirmReceive: function(e, t) {
            o.carmen({
                api: "trade.order.state/1.0.0/confirmReceive",
                data: e,
                success: function() {
                    t.success && t.success();
                }
            });
        }
    }, o = getApp();
    e.exports = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = a[e];
        o && o(t, n);
    };
}, function(e, t, n) {
    function a(e) {
        for (var t = {}, n = e.split(","), a = 0; a < n.length; a++) t[n[a]] = !0;
        return t;
    }
    var o = "", i = "", r = {}, s = n(161), c = n(160), u = (a("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
    a("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), l = a("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), d = a("a,abbr,b,blockquote,br,code,col,colgroup,dd,del,div,dl,dt,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,ul"), p = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
    a("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
    a("wxxxcode-style,script,style,view,scroll-view,block"), e.exports = {
        html2json: function(e, t) {
            e = function(e) {
                return e.replace(/\r?\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<");
            }(e = function(e) {
                return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
            }(e)), e = s.strDiscode(e);
            var n = [], a = {
                node: t,
                nodes: [],
                images: [],
                imageUrls: []
            }, f = 0;
            return c(e, {
                start: function(e, o, i) {
                    d[e] || (e = u[e] ? "div" : "span");
                    var r, c = {
                        tag: e,
                        node: "element"
                    };
                    if (0 === n.length ? (c.index = f.toString(), f += 1) : (void 0 === (r = n[0]).nodes && (r.nodes = []), 
                    c.index = r.index + "." + r.nodes.length), u[e] ? c.tagType = "block" : l[e] ? c.tagType = "inline" : p[e] && (c.tagType = "closeSelf"), 
                    0 !== o.length && (c.attr = o.reduce(function(e, t) {
                        var n = t.name, a = t.value;
                        return "class" == n && (c.classStr = a), "style" == n && (c.styleStr = a), e[n] ? Array.isArray(e[n]) ? e[n].push(a) : e[n] = [ e[n], a ] : e[n] = a, 
                        e;
                    }, {})), "img" === c.tag) {
                        c.imgIndex = a.images.length;
                        var h = c.attr.src || "";
                        "" == h[0] && h.splice(0, 1), h = s.urlToHttpUrl(h, "https"), c.attr.src = h, c.from = t, 
                        a.images.push(c), a.imageUrls.push(h);
                    }
                    if ("font" === c.tag) {
                        var g = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], m = {
                            color: "color",
                            face: "font-family",
                            size: "font-size"
                        };
                        for (var _ in c.attr.style || (c.attr.style = []), c.styleStr || (c.styleStr = ""), 
                        m) if (c.attr[_]) {
                            var v = "size" === _ ? g[c.attr[_] - 1] : c.attr[_];
                            c.attr.style.push(m[_]), c.attr.style.push(v), c.styleStr += m[_] + ": " + v + ";";
                        }
                    }
                    "source" === c.tag && (a.source = c.attr.src), i ? (void 0 === (r = n[0] || a).nodes && (r.nodes = []), 
                    r.nodes.push(c)) : n.unshift(c);
                },
                end: function(e) {
                    var t = n.shift();
                    if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && a.source && (t.attr.src = a.source, 
                    delete a.source), 0 === n.length) a.nodes.push(t); else {
                        var o = n[0];
                        void 0 === o.nodes && (o.nodes = []), o.nodes.push(t);
                    }
                },
                chars: function(e) {
                    var t = {
                        node: "text",
                        text: e,
                        textArray: function(e) {
                            var t = [];
                            if (0 == o.length || !r) return (u = {
                                node: "text"
                            }).text = e, a = [ u ];
                            e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
                            for (var n = new RegExp("[:]"), a = e.split(n), s = 0; s < a.length; s++) {
                                var c = a[s], u = {};
                                r[c] ? (u.node = "element", u.tag = "emoji", u.text = r[c], u.baseSrc = i) : (u.node = "text", 
                                u.text = c), t.push(u);
                            }
                            return t;
                        }(e)
                    };
                    if (0 === n.length) t.index = f.toString(), f += 1, a.nodes.push(t); else {
                        var s = n[0];
                        void 0 === s.nodes && (s.nodes = []), t.index = s.index + "." + s.nodes.length, 
                        s.nodes.push(t);
                    }
                },
                comment: function(e) {}
            }), a;
        },
        emojisInit: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", n = arguments[2];
            o = e, i = t, r = n;
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e) {
        var t = e.target.dataset.src, n = e.target.dataset.from, a = s(this.data, n) || {};
        void 0 !== n && n.length > 0 && wx.previewImage({
            current: t,
            urls: a.imageUrls || []
        });
    }
    function i(e) {
        var t = e.target.dataset.from, n = e.target.dataset.idx;
        void 0 !== t && t.length > 0 && function(e, t, n, o) {
            var i, c = s(n.data, o);
            if (c && 0 != c.images.length) {
                var u = c.images, l = r(e.detail.width, e.detail.height, c), d = e.target.dataset.src;
                p[d] = {
                    width: e.detail.width,
                    height: e.detail.height
                };
                var f = u[t].index, h = "" + o, g = !0, m = !1, _ = void 0;
                try {
                    for (var v, y = f.split(".")[Symbol.iterator](); !(g = (v = y.next()).done); g = !0) h += ".nodes[" + v.value + "]";
                } catch (e) {
                    m = !0, _ = e;
                } finally {
                    try {
                        !g && y.return && y.return();
                    } finally {
                        if (m) throw _;
                    }
                }
                var b = h + ".width", w = h + ".height";
                n.setData((a(i = {}, b, l.imageWidth), a(i, w, l.imageheight), a(i, "" + h.showImg, !0), 
                i));
            }
        }(e, n, this, t);
    }
    function r(e, t) {
        var n, a = 0, o = 0, i = {}, r = ((arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).view || {}).imagePadding || 0;
        return e > (n = l - 2 * r) ? (o = (a = n) * t / e, i.imageWidth = a, i.imageheight = o) : (i.imageWidth = e, 
        i.imageheight = t), i;
    }
    function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (!t) return null;
        "." === t[0] && (t = t.slice(1));
        for (var n = t.split("."), a = e, o = 0; o < n.length && (a = a[n[o]]); o++) ;
        return a;
    }
    var c = n(162), u = n(43), l = 0, d = 0;
    wx.getSystemInfo({
        success: function(e) {
            l = e.windowWidth, d = e.windowHeight;
        }
    });
    var p = {};
    e.exports = {
        wxParse: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', a = arguments[3], l = arguments[4], d = a, f = {};
            if ("html" == t) f = u.html2json(n, e); else if ("md" == t || "markdown" == t) {
                var h = new c.Converter().makeHtml(n);
                f = u.html2json(h, e);
            }
            f.view = {}, f.view.imagePadding = 0, void 0 !== l && (f.view.imagePadding = l), 
            function(e, t, n) {
                var a = e.images;
                a && a.forEach(function(t, n) {
                    if (p[t.attr.src]) {
                        var a = "", o = !0, i = !1, c = void 0;
                        try {
                            for (var u, l = t.index.split(".")[Symbol.iterator](); !(o = (u = l.next()).done); o = !0) a += ".nodes." + u.value;
                        } catch (e) {
                            i = !0, c = e;
                        } finally {
                            try {
                                !o && l.return && l.return();
                            } finally {
                                if (i) throw c;
                            }
                        }
                        var d = p[t.attr.src], f = s(e, a) || {}, h = r(d.width, d.height, e);
                        f.width = h.imageWidth, f.height = h.imageheight, f.showImg = !0;
                    }
                });
            }(f);
            var g = {};
            g[e] = f, d.setData(g), d.wxParseImgLoad = i, d.wxParseImgTap = o;
        },
        wxParseTemArray: function(e, t, n, a) {
            for (var o = [], i = a.data, r = null, s = 0; s < n; s++) {
                var c = i[t + s].nodes;
                o.push(c);
            }
            e = e || "wxParseTemArray", (r = JSON.parse('{"' + e + '":""}'))[e] = o, a.setData(r);
        },
        emojisInit: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", n = arguments[2];
            u.emojisInit(e, t, n);
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope." + e]) return t();
                n();
            },
            fail: n
        });
    }
    var o = function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t;
    }(n(3)), i = n(12), r = i.tryLocation, s = i.parseDistance;
    e.exports = {
        tryLocationAgain: function(e, t) {
            var n = getApp();
            a("userLocation", function() {
                return t;
            }, function() {
                wx.showModal({
                    content: '打开"' + n.globalData.shopInfo.shop_name + '"的地理位置权限，为你推荐最近的门店，是否去打开',
                    success: function(n) {
                        n.cancel || wx.openSetting({
                            success: function(n) {
                                n.authSetting["scope.userLocation"] && r(e, t);
                            }
                        });
                    }
                });
            });
        },
        checkScope: a,
        fetchShops: function(e) {
            var t = this, n = getApp();
            1 === e.page && (this.data.list = []), this.setData({
                loading: !0
            }), n.carmen({
                api: "weapp.multistore.offline/1.0.0/getrecommendlist",
                query: e,
                success: function(n) {
                    var a = n.list || [];
                    a = a.map(function(e) {
                        return e.distance = s(e.distance), e;
                    }), t.setData({
                        list: t.data.list.concat(a),
                        loading: !1,
                        nodata: 0 === t.data.list.length && 0 === a.length && !t.data.isUsedLocation,
                        nomore: a.length < e.page_size
                    });
                },
                fail: function(e) {
                    t.setData({
                        loading: !1
                    }), console.log(e), t.showZanToast(e.msg || "获取店铺列表失败");
                }
            });
        },
        saveStoreAndJumpBack: function(e) {
            var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, a = getApp(), i = getCurrentPages();
            if (i.length - 1 - n < 0) return a.trigger("page:chooseoffline:finish", e), o.switchTab({
                url: "/pages/home/dashboard/index"
            });
            var r = i[i.length - 1 - n], s = this.redirectto || "/" + r.route, c = a.isSwitchTab(this.redirectto || r.route), u = /packages\/shop\/multi-store/.test(s), l = /pages\/home\/(dashboard|feature|tab)/.test(s);
            a.setShopInfo({
                offlineId: e.id
            }), a.getStore().then(function(e) {
                return t.redirectto ? (a.trigger("page:chooseoffline:finish", e), c.then && c.then(function(e) {
                    return e ? o.switchTab({
                        url: t.redirectto
                    }) : wx.redirectTo({
                        url: t.redirectto
                    });
                })) : u ? (a.trigger("page:chooseoffline:finish", e), o.switchTab({
                    url: "/pages/home/dashboard/index"
                })) : void (l ? a.trigger("page:chooseoffline:finish", e, function() {
                    wx.navigateBack({
                        delta: n
                    });
                }) : (a.trigger("page:chooseoffline:finish", e), wx.navigateBack({
                    delta: n
                })));
            });
        },
        saveLocation: function(e) {
            getApp().carmen({
                api: "weapp.multistore.offline/1.0.0/setlastlocation",
                query: e,
                success: function() {},
                fail: function() {}
            });
        }
    };
}, function(e, t, n) {
    var a = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                Object.defineProperty(e, a.key, a);
            }
        }
        return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
        };
    }(), o = "请求参数信息有误", i = 1e3, r = {
        location2query: function(e) {
            if ("string" == typeof e) return e;
            for (var t = "", n = 0; n < e.length; n++) {
                var a = e[n];
                t && (t += ";"), a.location && (t = t + a.location.lat + "," + a.location.lng), 
                a.latitude && a.longitude && (t = t + a.latitude + "," + a.longitude);
            }
            return t;
        },
        getWXLocation: function(e, t, n) {
            wx.getLocation({
                type: "gcj02",
                success: e,
                fail: t,
                complete: n
            });
        },
        getLocationParam: function(e) {
            return "string" == typeof e && (e = 2 === e.split(",").length ? {
                latitude: e.split(",")[0],
                longitude: e.split(",")[1]
            } : {}), e;
        },
        polyfillParam: function(e) {
            e.success = e.success || function() {}, e.fail = e.fail || function() {}, e.complete = e.complete || function() {};
        },
        checkParamKeyEmpty: function(e, t) {
            if (!e[t]) {
                var n = this.buildErrorConfig(310, o + t + "参数格式有误");
                return e.fail(n), e.complete(n), !0;
            }
            return !1;
        },
        checkKeyword: function(e) {
            return !this.checkParamKeyEmpty(e, "keyword");
        },
        checkLocation: function(e) {
            var t = this.getLocationParam(e.location);
            if (!t || !t.latitude || !t.longitude) {
                var n = this.buildErrorConfig(310, o + " location参数格式有误");
                return e.fail(n), e.complete(n), !1;
            }
            return !0;
        },
        buildErrorConfig: function(e, t) {
            return {
                status: e,
                message: t
            };
        },
        buildWxRequestConfig: function(e, t) {
            var n = this;
            return t.header = {
                "content-type": "application/json"
            }, t.method = "GET", t.success = function(t) {
                var n = t.data;
                0 === n.status ? e.success(n) : e.fail(n);
            }, t.fail = function(t) {
                t.statusCode = i, e.fail(n.buildErrorConfig(i, result.errMsg));
            }, t.complete = function(t) {
                switch (+t.statusCode) {
                  case i:
                    e.complete(n.buildErrorConfig(i, t.errMsg));
                    break;

                  case 200:
                    var a = t.data;
                    0 === a.status ? e.complete(a) : e.complete(n.buildErrorConfig(a.status, a.message));
                    break;

                  default:
                    e.complete(n.buildErrorConfig(600, "系统错误"));
                }
            }, t;
        },
        locationProcess: function(e, t, n, a) {
            var o = this;
            n = n || function(t) {
                t.statusCode = i, e.fail(o.buildErrorConfig(i, t.errMsg));
            }, a = a || function(t) {
                t.statusCode == i && e.complete(o.buildErrorConfig(i, t.errMsg));
            }, e.location ? o.checkLocation(e) && t(r.getLocationParam(e.location)) : o.getWXLocation(t, n, a);
        }
    }, s = function() {
        function e(t) {
            if (function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e), !t.key) throw Error("key值不能为空");
            this.key = t.key;
        }
        return a(e, [ {
            key: "search",
            value: function(e) {
                if (e = e || {}, r.polyfillParam(e), r.checkKeyword(e)) {
                    var t = {
                        keyword: e.keyword,
                        orderby: e.orderby || "_distance",
                        page_size: e.page_size || 10,
                        page_index: e.page_index || 1,
                        output: "json",
                        key: this.key
                    };
                    e.address_format && (t.address_format = e.address_format), e.filter && (t.filter = e.filter);
                    var n = e.distance || "1000", a = e.auto_extend || 1;
                    r.locationProcess(e, function(o) {
                        t.boundary = "nearby(" + o.latitude + "," + o.longitude + "," + n + "," + a + ")", 
                        wx.request(r.buildWxRequestConfig(e, {
                            url: "https://apis.map.qq.com/ws/place/v1/search",
                            data: t
                        }));
                    });
                }
            }
        }, {
            key: "getSuggestion",
            value: function(e) {
                if (e = e || {}, r.polyfillParam(e), r.checkKeyword(e)) {
                    var t = {
                        keyword: e.keyword,
                        region: e.region || "全国",
                        region_fix: e.region_fix || 0,
                        policy: e.policy || 0,
                        output: "json",
                        key: this.key
                    };
                    wx.request(r.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/place/v1/suggestion",
                        data: t
                    }));
                }
            }
        }, {
            key: "reverseGeocoder",
            value: function(e) {
                e = e || {}, r.polyfillParam(e);
                var t = {
                    coord_type: e.coord_type || 5,
                    get_poi: e.get_poi || 0,
                    output: "json",
                    key: this.key
                };
                e.poi_options && (t.poi_options = e.poi_options), r.locationProcess(e, function(n) {
                    t.location = n.latitude + "," + n.longitude, wx.request(r.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/geocoder/v1/",
                        data: t
                    }));
                });
            }
        }, {
            key: "geocoder",
            value: function(e) {
                if (e = e || {}, r.polyfillParam(e), !r.checkParamKeyEmpty(e, "address")) {
                    var t = {
                        address: e.address,
                        output: "json",
                        key: this.key
                    };
                    wx.request(r.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/geocoder/v1/",
                        data: t
                    }));
                }
            }
        }, {
            key: "getCityList",
            value: function(e) {
                e = e || {}, r.polyfillParam(e);
                var t = {
                    output: "json",
                    key: this.key
                };
                wx.request(r.buildWxRequestConfig(e, {
                    url: "https://apis.map.qq.com/ws/district/v1/list",
                    data: t
                }));
            }
        }, {
            key: "getDistrictByCityId",
            value: function(e) {
                if (e = e || {}, r.polyfillParam(e), !r.checkParamKeyEmpty(e, "id")) {
                    var t = {
                        id: e.id || "",
                        output: "json",
                        key: this.key
                    };
                    wx.request(r.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/district/v1/getchildren",
                        data: t
                    }));
                }
            }
        }, {
            key: "calculateDistance",
            value: function(e) {
                if (e = e || {}, r.polyfillParam(e), !r.checkParamKeyEmpty(e, "to")) {
                    var t = {
                        mode: e.mode || "walking",
                        to: r.location2query(e.to),
                        output: "json",
                        key: this.key
                    };
                    e.from && (e.location = e.from), r.locationProcess(e, function(n) {
                        t.from = n.latitude + "," + n.longitude, wx.request(r.buildWxRequestConfig(e, {
                            url: "https://apis.map.qq.com/ws/distance/v1/",
                            data: t
                        }));
                    });
                }
            }
        } ]), e;
    }();
    e.exports = s;
}, function(e, t, n) {
    var a = n(5), o = function(e, t, n) {
        var o = [];
        return n && o.push({
            text: n,
            code: e
        }), a(t, function(t, n) {
            e && 0 !== n.indexOf(e) || o.push({
                text: t,
                code: n
            });
        }), o;
    };
    e.exports = {
        formatAreaData: function(e, t) {
            var n = {}, a = e.toString().slice(0, 2) || -1, i = e.toString().slice(0, 4) || -1;
            return n.province = o(0, t.province, "省份"), n.city = o(a, t.city, "城市"), n.county = o(i, t.county, "区县"), 
            n;
        },
        findSelectedAddressIndex: function(e, t) {
            var n = e.toString().slice(0, 2) + "0000", a = e.toString().slice(0, 4) + "00", o = 0, i = 0, r = 0;
            return e ? {
                provinceIndex: o = t.province.findIndex(function(e) {
                    return e.code == n;
                }),
                cityIndex: i = t.city.findIndex(function(e) {
                    return e.code == a;
                }),
                countyIndex: r = t.county.findIndex(function(t) {
                    return t.code == e;
                })
            } : {
                provinceIndex: o,
                cityIndex: i,
                countyIndex: r
            };
        }
    };
}, function(e, t, n) {
    var a = {
        _searchBegin: function(e) {
            console.log("begin search"), this.setData({
                beginSearch: !0
            }), this.searchBegin && this.searchBegin();
        },
        _searchInput: function(e) {
            if (null == e) this.setData({
                inputvalue: ""
            }); else {
                var t = e.detail.value;
                this.setData({
                    isShowClearButton: t.length > 0
                }), this.searchInput && this.searchInput();
            }
        },
        _searchBlur: function(e) {
            0 == e.detail.value.length && this.setData({
                beginSearch: !1
            }), this.searchBlur && this.searchBlur();
        },
        _searchDone: function(e) {
            console.log("search done" + e.detail.value), this.searchDone && this.searchDone({
                value: e.detail.value
            });
        },
        _searchContentClear: function(e) {
            this._searchInput(null), this.setData({
                beginSearch: !0,
                isShowClearButton: !1,
                isfocus: !0
            }), this.searchContentClear && this.searchContentClear();
        },
        _searchCancel: function(e) {
            this.searchCancel && this.searchCancel();
        }
    };
    e.exports = a;
}, function(e, t, n) {
    var a = n(7);
    e.exports = {
        parse: function(e) {
            var t = a.format(e).data, n = [];
            return t.day && n.push({
                value: t.day,
                unit: "天"
            }), n.push({
                value: a.formatDayWithZero(t.hour),
                unit: "时"
            }), n.push({
                value: a.formatDayWithZero(t.minute),
                unit: "分"
            }), n.push({
                value: a.formatDayWithZero(t.second),
                unit: "秒"
            }), n;
        }
    };
}, function(e, t, n) {
    var a = n(3);
    e.exports = {
        shopInfo__handleShopClick: function() {
            a.switchTab({
                url: "/pages/home/dashboard/index"
            });
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        if ("day" == n) return i.getMonthDayfix2Str(e);
        if ("meal" == n) {
            var a = i.getMonthDayfix2Str(e) + " ";
            return i.getMinuteDate(e) < 720 ? a + "上午" : i.getMinuteDate(e) < 1080 ? a + "下午" : a + "晚上";
        }
        return i.getMonthDayfix2Str(e) + " " + i.getTimeFix2Str(e) + "-" + i.getTimeFix2Str(t);
    }
    var o = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                Object.defineProperty(e, a.key, a);
            }
        }
        return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
        };
    }(), i = n(35), r = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], s = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ], c = function() {
        function e(t) {
            var n = t.localDeliverySetting, a = t.selectedValue, o = void 0 === a ? {
                start: "",
                end: ""
            } : a, i = t.selectCallback;
            switch (function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e), this.configure = n, this.timespan = n.timeSpan, this.timespan) {
              case "halfhour":
                this.timeslot = 30;
                break;

              case "quarter":
                this.timeslot = 15;
                break;

              default:
                this.timeslot = 60;
            }
            this.businessHours = n.timeBucket, this.businessHours.forEach(function(e) {
                if (e.switchs) {
                    for (var t = e.switchs, n = [], a = 0; a < 7; a++) "1" == t[a] && n.push(s[a]);
                    e.weekdays = n;
                }
            }), this.aheadMin = {
                type: n.aheadMinType,
                value: n.aheadMin
            }, this.aheadMax = {
                value: n.aheadMax,
                type: n.aheadMaxType
            }, this.nearestBusniessDateTime = this.calcNearestBusinessDateTime(), this.latestBusniessDateTime = this.calcLatestBusinessDateTime(), 
            this.selectCallback = i, this.setSelectedSlot(o);
        }
        return o(e, [ {
            key: "setSelectedSlot",
            value: function(e) {
                this.selectedValue = {}, e && e.start && e.end ? (this.selectedValue.start = i.newDate(e.start), 
                this.selectedValue.end = i.newDate(e.end)) : this.selectedValue = e;
            }
        }, {
            key: "setSelectCallback",
            value: function(e) {
                this.selectCallback = e;
            }
        }, {
            key: "calcFirstSlot",
            value: function() {
                if ("day" != this.timespan) return "meal" == this.timespan ? this._calcFirstHalfDay() : this._calcFirstTimeslot();
                var e = i.newDate(this.nearestBusniessDateTime);
                e.setHours(0), e.setMinutes(0);
                var t = i.newDate(this.nearestBusniessDateTime);
                t.setHours(23), t.setMinutes(59);
                var n = i.getDateStr(e);
                return this.isSlotDisabled(n, "00:00", "23:59") ? void 0 : {
                    start: i.formatDateTime(e),
                    end: i.formatDateTime(t)
                };
            }
        }, {
            key: "_calcFirstHalfDay",
            value: function() {
                var e = i.getDateStr(this.nearestBusniessDateTime);
                return this.isSlotDisabled(e, "00:00", "11:59") ? this.isSlotDisabled(e, "12:00", "17:59") ? this.isSlotDisabled(e, "18:00", "23:59") ? void 0 : {
                    start: e + " 18:00",
                    end: e + " 23:59"
                } : {
                    start: e + " 12:00",
                    end: e + " 18:00"
                } : {
                    start: e + " 00:00",
                    end: e + " 12:00"
                };
            }
        }, {
            key: "_calcFirstTimeslot",
            value: function() {
                var e = this._getBusinessTime(this.nearestBusniessDateTime);
                if (e) for (var t = i.getDateStr(this.nearestBusniessDateTime), n = i.computeTimePiecesCount(e.startTime, e.endTime, this.timeslot), a = e.startTime.split(":"), o = +a[0], r = +a[1], s = 0; s < n; s++) {
                    var c = i.createTimeStrFix2FromHourMinute(o, r), u = i.generateNextSlotStart(e.endTime, o, r, this.timeslot);
                    o = u.hour, r = u.minute;
                    var l = i.createTimeStrFix2FromHourMinute(o, r);
                    if (!this.isSlotDisabled(t, c, l)) return {
                        start: t + " " + c,
                        end: t + " " + l
                    };
                }
            }
        }, {
            key: "calcNearestBusinessDateTime",
            value: function() {
                for (var e = new Date(), t = this.configure.prepareTime, n = void 0 === t ? 0 : t, a = new Date(e.getTime() + i.getTimeUnitInMS(this.aheadMin) + n), o = 0; o <= 40; o++) {
                    if (this._getBusinessTime(a)) return a;
                    a.setDate(a.getDate() + 1), a.setHours(0), a.setMinutes(0);
                }
                return a;
            }
        }, {
            key: "calcLatestBusinessDateTime",
            value: function() {
                var e = i.getTimeUnitInMS(this.aheadMax), t = new Date();
                if (!e || 0 == e) return t.setMinutes(59), t.setHours(23), t;
                if ("day" == this.aheadMax.type) {
                    t.setDate(t.getDate() + parseInt(this.aheadMax.value, 10) - 1);
                    for (var n = 0; n <= 40; n++) {
                        if (this._getBusinessTime(t)) return t;
                        t.setDate(t.getDate() - 1), t.setHours(0), t.setMinutes(0);
                    }
                    return t;
                }
            }
        }, {
            key: "_getBusinessTime",
            value: function(e) {
                if (e = i.newDate(e), this.nearestBusniessDateTime && i.compareDay(this.nearestBusniessDateTime, e) > 0) return !1;
                if (this.latestBusniessDateTime && i.compareDay(this.latestBusniessDateTime, e) < 0) return !1;
                for (var t = r[e.getDay()], n = this.businessHours.length, a = void 0, o = !i.isToday(e), s = 0; s < n; s++) if (-1 !== (a = this.businessHours[s]).weekdays.indexOf(t) && (i.getMinuteHHmm(a.endTime) >= i.getMinuteDate(e) || o)) return {
                    startTime: a.startTime,
                    endTime: a.endTime
                };
                return !1;
            }
        }, {
            key: "formatSlot",
            value: function(e) {
                if (!(e && e.start && e.end)) return e;
                var t = this._getBusinessTime(e.start);
                if (t) {
                    var n = i.newDate(e.start), o = i.newDate(e.end), r = i.newDate(i.getDateStr(n) + " " + t.startTime), s = i.newDate(i.getDateStr(n) + " " + t.endTime);
                    return n.getTime() < r.getTime() && (n = r), o.getTime() > s.getTime() && (o = s), 
                    {
                        start: i.formatDateTimeFix2(n),
                        end: i.formatDateTimeFix2(o),
                        timeSpan: this.timespan,
                        show: a(n, o, this.timespan)
                    };
                }
            }
        }, {
            key: "_timeObjShow",
            value: function(e, t) {
                if ("day" == this.timespan) return i.getMonthDayfix2Str(e);
                if ("meal" == this.timespan) {
                    var n = i.getMonthDayfix2Str(e) + " ";
                    return i.getMinuteDate(e) < 720 ? n + "上午" : i.getMinuteDate(e) < 1080 ? n + "下午" : n + "晚上";
                }
                return i.getMonthDayfix2Str(e) + " " + i.getTimeFix2Str(e) + "-" + i.getTimeFix2Str(t);
            }
        }, {
            key: "isSlotDisabled",
            value: function(e, t, n) {
                var a = i.newDate(e);
                a = i.setHourMinSec0(a);
                var o = this._getBusinessTime(a);
                if (!o) return !0;
                var r = i.getMinuteHHmm(o.startTime), s = i.getMinuteHHmm(o.endTime), c = i.getMinuteHHmm(t), u = i.getMinuteHHmm(n);
                if (i.isTheSameDay(a, this.nearestBusniessDateTime)) {
                    var l = i.getMinuteDate(this.nearestBusniessDateTime);
                    l > r && (r = l);
                }
                return c >= s || u <= r;
            }
        }, {
            key: "isSlotSelected",
            value: function(e, t, n) {
                if (!(this.selectedValue && this.selectedValue.start && this.selectedValue.end)) return !1;
                var a = i.newDate(e + " " + t).getTime(), o = i.newDate(e + " " + n).getTime();
                return a <= this.selectedValue.start.getTime() && o >= this.selectedValue.end.getTime();
            }
        }, {
            key: "getShowType",
            value: function() {
                return "day" == this.timespan ? "day" : "meal" == this.timespan ? "halfDay" : "timeSlot";
            }
        }, {
            key: "getShowData",
            value: function() {
                return "day" == this.timespan ? {
                    type: "day",
                    start: i.formatDateTime(this.nearestBusniessDateTime),
                    end: i.formatDateTime(this.latestBusniessDateTime),
                    selected: this.selectedValue.start ? i.getDateStr(this.selectedValue.start) : ""
                } : "meal" == this.timespan ? this._getHalfDaySlot() : {
                    type: "timeSlot",
                    start: i.formatDateTime(this.nearestBusniessDateTime),
                    end: i.formatDateTime(this.latestBusniessDateTime),
                    selected: this.selectedValue.start ? i.getDateStr(this.selectedValue.start) : ""
                };
            }
        }, {
            key: "_getHalfDaySlot",
            value: function() {
                for (var e = [], t = i.computeDayCount(this.nearestBusniessDateTime, this.latestBusniessDateTime), n = new Date(this.nearestBusniessDateTime.getTime()), a = !1, o = 0; o < t; o++) {
                    var r = i.getDateStr(n), s = !this.isSlotDisabled(r, "00:00", "11:59"), c = !this.isSlotDisabled(r, "12:00", "17:59"), u = !this.isSlotDisabled(r, "18:00", "23:59");
                    a = a || u, e.push({
                        type: "data",
                        description: i.getDateDescription(n),
                        date: r,
                        MMdd: i.getMonthDayfix2Str(n),
                        morning: {
                            selected: this.isSlotSelected(r, "00:00", "11:59"),
                            enabled: s
                        },
                        afternoon: {
                            selected: this.isSlotSelected(r, "12:00", "17:59"),
                            enabled: c
                        },
                        night: {
                            selected: this.isSlotSelected(r, "18:00", "23:59"),
                            enabled: u
                        },
                        allDisabled: !s && !c && !u
                    }), n.setDate(n.getDate() + 1);
                }
                return {
                    type: "halfDay",
                    dayList: e,
                    allNightDisabled: !a
                };
            }
        }, {
            key: "getTimeSlotNavigator",
            value: function(e, t) {
                for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 4, a = i.newDate(e), o = i.newDate(t), r = [], s = 0; s < n; s++) {
                    var c = this.isDayDisabled(a), u = i.isTheSameDay(a, o);
                    r.push({
                        date: i.getDateStr(a),
                        description: i.getDateDescription(a),
                        dataShow: i.getMonthDayfix2Str(a),
                        disabled: c,
                        selected: u
                    }), a.setDate(a.getDate() + 1);
                }
                return r;
            }
        }, {
            key: "getTimeSlotOfDay",
            value: function(e) {
                e = i.newDate(e);
                var t = i.getDateStr(e), n = [], a = this._getBusinessTime(e);
                if (!a) return [];
                var o = a.startTime, r = a.endTime;
                return i.compareTime(o, r) >= 0 ? [] : (i.compareTime(o, "12:00") < 0 ? (n.push({
                    type: "seperator",
                    description: "12:00 前"
                }), i.compareTime(r, "12:00") <= 0 ? n = n.concat(this._createTimeSlot(t, o, r)) : i.compareTime(r, "18:00") <= 0 ? ((n = n.concat(this._createTimeSlot(t, o, "12:00"))).push({
                    type: "seperator",
                    description: "12:00－18:00"
                }), n = n.concat(this._createTimeSlot(t, "12:00", r))) : ((n = n.concat(this._createTimeSlot(t, o, "12:00"))).push({
                    type: "seperator",
                    description: "12:00－18:00"
                }), (n = n.concat(this._createTimeSlot(t, "12:00", "18:00"))).push({
                    type: "seperator",
                    description: "18:00 后"
                }), n = n.concat(this._createTimeSlot(t, "18:00", r)))) : i.compareTime(o, "18:00") < 0 ? (n.push({
                    type: "seperator",
                    description: "12:00－18:00"
                }), i.compareTime(r, "18:00") <= 0 ? n = n.concat(this._createTimeSlot(t, o, r)) : ((n = n.concat(this._createTimeSlot(t, o, "18:00"))).push({
                    type: "seperator",
                    description: "18:00 后"
                }), n = n.concat(this._createTimeSlot(t, "18:00", r)))) : (n.push({
                    type: "seperator",
                    description: "18:00 后"
                }), n = n.concat(this._createTimeSlot(t, o, r))), n);
            }
        }, {
            key: "_createTimeSlot",
            value: function(e, t, n) {
                for (var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 4, o = [], r = t.split(":"), s = +r[0], c = +r[1], u = void 0, l = i.computeTimePiecesCount(t, n, this.timeslot), d = 0; d < l; d++) {
                    u || (u = {
                        type: "data",
                        slots: []
                    });
                    var p = i.createTimeStrFix2FromHourMinute(s, c), f = i.generateNextSlotStart(n, s, c, this.timeslot);
                    s = f.hour, c = f.minute;
                    var h = i.createTimeStrFix2FromHourMinute(s, c), g = !0, m = !1;
                    this.isSlotDisabled(e, p, h) && (g = !1), this.isSlotSelected(e, p, h) && (m = !0), 
                    u.slots.push({
                        fake: !1,
                        start: e + " " + p,
                        end: e + " " + h,
                        show: p + "-" + h,
                        enabled: g,
                        selected: m
                    }), (d + 1) % a == 0 && (o.push(u), u = null);
                }
                if (u) {
                    for (var _ = u.slots.length; _ < a; _++) u.slots.push({
                        fake: !0
                    });
                    o.push(u);
                }
                return o;
            }
        }, {
            key: "isDaySelected",
            value: function(e) {
                var t = i.newDate(e), n = i.getDateStr(t);
                return this.isSlotSelected(n, "00:00", "23:59");
            }
        }, {
            key: "isDayDisabled",
            value: function(e) {
                return this.isSlotDisabled(e, "00:00", "23:59");
            }
        }, {
            key: "getDaysInOneMonth",
            value: function(e, t) {
                for (var n = i.newDate(e), a = t ? i.newDate(t) : null, o = new Date(n.getFullYear(), n.getMonth(), 1), r = new Date(n.getFullYear(), n.getMonth() + 1, 0), s = [], c = o.getDay(), u = [], l = 0; l < c; l++) u.push({
                    fake: !0
                });
                for (var d = o, p = 1; p <= r.getDate(); p++) u || (u = []), u.push({
                    fake: !1,
                    date: i.getDateStr(d),
                    enabled: !this.isDayDisabled(d),
                    selected: a ? i.isTheSameDay(d, a) : this.isDaySelected(d),
                    description: i.isToday(d) ? "今天" : d.getDate(),
                    isToday: i.isToday(d)
                }), d.setDate(d.getDate() + 1), 7 == u.length && (s.push(u), u = null);
                if (u) {
                    for (var f = u.length; f < 7; f++) u.push({
                        fake: !0
                    });
                    s.push(u);
                }
                return s;
            }
        }, {
            key: "selectSlot",
            value: function(e, t) {
                var n = this.formatSlot({
                    start: e,
                    end: t
                });
                console.log(n), this.selectCallback && this.selectCallback(n);
            }
        } ]), e;
    }();
    c.formatDeliveryTimeToShow = a, e.exports = c;
}, function(e, t, n) {
    e.exports = {
        appError: function(e) {
            var t = getApp(), n = getCurrentPages(), a = {
                name: e.name || "app-error",
                alert: e.alert,
                message: e.message
            };
            delete e.alert, a.detail = e.detail || Object.assign({}, e), a.detail.pages = n.map(function(e) {
                return {
                    options: e.options,
                    route: e.route
                };
            }), t.onError(a);
        },
        requestError: function(t) {
            var n = {
                name: "request-error",
                alert: t.alert
            };
            n.message = t.message, n.detail = t, delete t.message, delete t.alert, wx.getNetworkType({
                complete: function(t) {
                    n.detail.network = t, e.exports.appError(n);
                }
            });
        }
    };
}, function(e, t, n) {
    function a(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = t.query || {};
        return a = Object.assign(a, {
            app_id: e.getAppId()
        }, n), t.query = a, i(t);
    }
    var o = n(16), i = n(38), r = {
        method: "GET",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        }
    };
    e.exports = function(e, t) {
        return t = o({}, r, t), new Promise(function(n, o) {
            (function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Promise(function(n) {
                    var o = t.config || {}, i = {}, r = e.getOfflineId();
                    r && !o.noStoreId && (i.store_id = r), o.skipKdtId ? n(a(e, t, i)) : function(e) {
                        return new Promise(function(t) {
                            var n = e.getKdtId();
                            n ? t(n) : e.once("app:kdt_id:success", function(e) {
                                t(e);
                            });
                        });
                    }(e).then(function(o) {
                        n(a(e, t, Object.assign({
                            kdt_id: o
                        }, i)));
                    });
                });
            })(e, t.urlData).then(function(e) {
                var a = {
                    url: e,
                    method: t.method,
                    data: t.data,
                    header: t.header,
                    success: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        n(e.data);
                    },
                    fail: function(e) {
                        console.log("request failed", e), o(e);
                    }
                };
                wx.request(a);
            });
        });
    };
}, function(e, t, n) {
    var a = n(10), o = getApp(), i = {
        getVisitGift: function() {
            var e = this;
            a(o)({
                path: "/wscump/targeted-marketing/visit-gift/get.json"
            }).then(function(t) {
                var n = o.getMobile();
                t && t.status < 4 ? e.setData({
                    pageWindowLock: !0,
                    visitGift: {
                        show: !0,
                        status: t.status,
                        couponList: t.coupon_list || [],
                        mobile: n
                    }
                }) : e.setData({
                    visitGift: {
                        show: !1,
                        status: 4,
                        couponList: [],
                        mobile: n
                    }
                });
            }).catch(function(e) {});
        },
        closeVisitGift: function() {
            this.setData({
                pageWindowLock: !1,
                "visitGift.show": !1
            });
        }
    };
    e.exports = Object.assign({}, i);
}, function(t, n, a) {
    function o(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
        }
        return Array.from(e);
    }
    var i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, r = /\s+/, s = function(e, t, n, a) {
        if (!n) return !0;
        if ("object" === (void 0 === n ? "undefined" : i(n))) {
            for (var s in n) e[t].apply(e, o([ s, n[s] ].concat(a)));
            return !1;
        }
        if (r.test(n)) {
            for (var c = n.split(r), u = 0, l = c.length; u < l; u++) e[t].apply(e, o([ c[u] ].concat(a)));
            return !1;
        }
        return !0;
    }, c = function(e, t) {
        var n, a = -1, o = e.length, i = t[0], r = t[1], s = t[2];
        switch (t.length) {
          case 0:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx);
            return;

          case 1:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, i);
            return;

          case 2:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, i, r);
            return;

          case 3:
            for (;++a < o; ) (n = e[a]).callback.call(n.ctx, i, r, s);
            return;

          default:
            for (;++a < o; ) (n = e[a]).callback.apply(n.ctx, t);
        }
    }, u = {
        on: function(e, t, n) {
            return s(this, "on", e, [ t, n ]) && t ? (this._events || (this._events = {}), (this._events[e] || (this._events[e] = [])).push({
                callback: t,
                context: n,
                ctx: n || this
            }), this) : this;
        },
        once: function(e, t, n) {
            if (!s(this, "once", e, [ t, n ]) || !t) return this;
            var a, o, i, r = this, c = (a = function() {
                r.off(e, c), t.apply(this, arguments);
            }, i = !1, function() {
                return i ? o : (i = !0, o = a.apply(this, arguments), a = null, o);
            });
            return c._callback = t, this.on(e, c, n);
        },
        off: function(e, t, n) {
            var a, o, i, r, c, u, l, d;
            if (!this._events || !s(this, "off", e, [ t, n ])) return this;
            if (!e && !t && !n) return this._events = {}, this;
            for (c = 0, u = (r = e ? [ e ] : Object.keys(this._events)).length; c < u; c++) if (e = r[c], 
            i = this._events[e]) {
                if (this._events[e] = a = [], t || n) for (l = 0, d = i.length; l < d; l++) o = i[l], 
                (t && t !== o.callback && t !== o.callback._callback || n && n !== o.context) && a.push(o);
                a.length || delete this._events[e];
            }
            return this;
        },
        trigger: function(e) {
            if (!this._events) return this;
            var t = [].slice.call(arguments, 1);
            if (!s(this, "trigger", e, t)) return this;
            var n = this._events[e], a = this._events.all;
            return n && c(n, t), a && c(a, arguments), this;
        }
    };
    t.exports = u;
}, function(e, t, n) {
    function a() {}
    var o = getApp();
    e.exports = function(e) {
        var t = e.file, n = e.success || a, i = e.fail || a;
        !function(e) {
            var t = e.success || a, n = e.fail || a;
            o.carmen({
                api: "weapp.wsc.picture.uploadtoken/1.0.0/get",
                query: {
                    scope_id: 0
                },
                success: function(e) {
                    t(e.upload_token);
                },
                fail: function(e) {
                    n(e);
                }
            });
        }({
            success: function(e) {
                wx.uploadFile({
                    url: "https://up.yzcdn.cn/",
                    filePath: t,
                    name: "file",
                    formData: {
                        token: e,
                        "x:skip_save": 1
                    },
                    success: function(e) {
                        try {
                            e = JSON.parse(e.data);
                        } catch (e) {
                            i({
                                type: "yz:uploadFile",
                                code: -99999,
                                msg: "JSON解析错误"
                            });
                        }
                        0 == +e.code ? n(e.data) : i({
                            type: "yz:uploadFile",
                            code: e.code,
                            msg: e.msg
                        });
                    },
                    fail: function(e) {
                        i({
                            type: "wx:uploadFile",
                            code: -99999,
                            msg: e.errMsg
                        });
                    }
                });
            },
            fail: function(e) {
                i(e);
            }
        });
    };
}, function(e, t, n) {
    function a(e) {
        return new Promise(function(t, n) {
            wx.request({
                url: e + "?avinfo",
                success: function(e) {
                    t(e.data);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }
    function o(e) {
        return Math.floor(+e.format.duration);
    }
    var i = n(2);
    e.exports = {
        getAudioInfo: function(e) {
            var t = i(function(e) {
                return e.split("?")[0];
            }(e), "", !1), n = t + "@64k.mp3";
            return a(n).then(function(e) {
                return {
                    url: n,
                    duration: o(e)
                };
            }).catch(function() {
                return a(t).then(function(e) {
                    return {
                        url: (n = t, a = "", /\.amr$/i.test(n) && (a = "?avthumb/mp3/ab/64k/writeXing/0"), 
                        n + a),
                        duration: o(e)
                    };
                    var n, a;
                });
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.DiscountEnum = {
        DISCOUNT: 2,
        AMOUNT: 3
    }, t.ActivityStatus = {
        notStart: 0,
        started: 1,
        ended: 2
    };
}, function(e, t, n) {
    var a = n(24), o = a.GOODS_HEIGHT, i = a.TITLE_HEIGHT, r = a.EMPTY_CONTAINER;
    e.exports = {
        setNavRange: function(e, t, n) {
            var a = 0, s = e.number ? e.number * o : r;
            return t && (a = n[t - 1].range[1]), e.range = [ a, a + i + s ], e;
        }
    };
}, function(e, t, n) {
    e.exports = function(e, t, n) {
        function a() {
            r = this, i = arguments, s = Date.now();
            var a = n && !o;
            return o || (o = setTimeout(u, t)), a && (c = e.apply(r, i), r = i = null), c;
        }
        var o, i, r, s, c, u = function a() {
            var u = Date.now() - s;
            u < t && u >= 0 ? o = setTimeout(a, t - u) : (o = null, n || (c = e.apply(r, i), 
            o || (r = i = null)));
        };
        return a.cancel = function() {
            clearTimeout(o), o = null;
        }, a;
    };
}, function(t, n, a) {
    var o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, i = a(60);
    t.exports = function(e, t, n) {
        var a = !0, r = !0;
        if ("function" != typeof e) throw new TypeError(FUNC_ERROR_TEXT);
        return "object" === (void 0 === n ? "undefined" : o(n)) && (a = "leading" in n ? !!n.leading : a, 
        r = "trailing" in n ? !!n.trailing : r), i(e, t, {
            leading: a,
            maxWait: t,
            trailing: r
        });
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = n(37).default, i = o.old2new, r = o.new2captain, s = o.newPolyFill, c = n(2);
    e.exports = {
        type: "goods",
        data: function(e, t) {
            var n = this, o = r(s(i(e))), u = o.layout;
            return (o.list || []).map(function(e, t) {
                var n = 0 === u || 2 === u && t % 3 == 0, a = [ 5, 6 ].indexOf(u) > -1, o = "!400x0.jpg";
                return n ? o = "!730x0.jpg" : a && (o = "!250x0.jpg"), e.image_url = c(e.image_url, o), 
                e;
            }), o.tag = e.tag, o.moreUrl = e.more_url, setTimeout(function() {
                var e;
                (e = t, new Promise(function(t, n) {
                    wx.createSelectorQuery().select("#sc-goods--" + e).boundingClientRect(function(e) {
                        if (!e) return n();
                        t(e.width);
                    }).exec();
                })).then(function(e) {
                    n.setData(a({}, "theme.feature[" + t + "].imageWidth", e));
                });
            }, 1500), Object.assign({
                imageWidth: 0
            }, o);
        },
        goods__handleImageLoaded: function(e) {
            var t = e.currentTarget.dataset, n = t.alias, o = t.componentIndex, i = t.width, r = t.height, s = this.data.theme.feature[o], c = s.sizeType, u = s.layout;
            if (!(i && r || [ 3, 5, 6 ].indexOf(u) > -1 || 1 === u && 1 !== c)) {
                var l = e.detail.width, d = e.detail.height;
                this.setData(a({}, "theme.extra.goodsRectData." + n, {
                    width: l,
                    height: d
                }));
            }
        }
    };
}, function(e, t, n) {
    var a;
    void 0 === (a = function(e) {
        var t = n(317), a = t.enc.Utf8.parse("youzan.com.aesiv"), o = t.enc.Utf8.parse("youzan.com._key_");
        return {
            encrypt: function(e) {
                return e = t.enc.Utf8.parse(e), t.AES.encrypt(e, o, {
                    mode: t.mode.CBC,
                    padding: t.pad.Iso10126,
                    iv: a
                }).toString();
            },
            decrypt: function(e) {
                var n = t.AES.decrypt(e, o, {
                    mode: t.mode.CBC,
                    padding: t.pad.Iso10126,
                    iv: a
                });
                return t.enc.Utf8.stringify(n);
            }
        };
    }.call(t, n, t, e)) || (e.exports = a);
}, function(e, t, n) {
    var a = n(27);
    getApp(), e.exports = {
        checkPhoneAndDoNext: function(e, t, n) {
            a.checkUserHasBindPhone(e, function() {
                t ? t() : wx.switchTab({
                    url: "/pages-youzan/shop/status/index"
                });
            }, function(e) {
                return n && n(e);
            });
        }
    };
}, function(t, n, a) {
    function o(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return "object" === (void 0 === e ? "undefined" : i(e)) ? e : {
            title: e,
            timeout: t
        };
    }
    var i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.exports = {
        showZanToast: function(e, t) {
            var n = this, a = o(e, t), i = (this.data.zanToast || {}).timer;
            clearTimeout(void 0 === i ? 0 : i);
            var r = {
                show: !0,
                icon: a.icon,
                image: a.image,
                title: a.title
            };
            if (this.setData({
                zanToast: r
            }), !(t < 0)) {
                var s = setTimeout(function() {
                    n.clearZanToast();
                }, t || 3e3);
                this.setData({
                    "zanToast.timer": s
                });
            }
        },
        clearZanToast: function() {
            var e = (this.data.zanToast || {}).timer;
            clearTimeout(void 0 === e ? 0 : e), this.setData({
                "zanToast.show": !1
            });
        },
        showZanLoading: function(e) {
            var t = o(e);
            this.showZanToast(r({}, t, {
                icon: "loading"
            }));
        }
    };
}, function(e, t, n) {
    function a(e) {
        var t = o(e), n = e.detail.value;
        (function(e, t) {
            var n = {
                componentId: e,
                value: t
            };
            console.info("[zan:Select:change]", n), this.handleZanSelectChange ? this.handleZanSelectChange(n) : console.warn("页面缺少 handleZanSelectChange 回调函数");
        }).call(this, t, n);
    }
    var o = n(21).extractComponentId;
    e.exports = {
        _handleZanSelectChange: function(e) {
            a.call(this, e);
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = {
        copyright__longpress: function() {
            var e = getApp(), t = this.__query__;
            wx.getExtConfig && wx.getExtConfig({
                success: function(n) {
                    var a = n.extConfig, o = void 0 === a ? {} : a, i = getCurrentPages().pop().route, r = t && JSON.stringify(t), s = [ "小程序版本号：" + (o.userVersion || ""), "页面路径", i ];
                    r && "{}" !== r && s.push("页面参数", r), o.kdtId = e.getKdtId(), o.page = i, o.query = t, 
                    o.userId = (e.globalData.token.buyerId || e.globalData.token.userId || 0).toString(4), 
                    wx.showModal({
                        title: "小程序信息",
                        content: s.join("\n"),
                        confirmText: "确定",
                        showCancel: !1,
                        success: function() {
                            wx.setClipboardData({
                                data: JSON.stringify(o)
                            });
                        }
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    };
}, function(e, t, n) {
    e.exports = function(e) {
        return {
            set: function(t, n, a) {
                var o = (a = a || {}).expire || 7;
                try {
                    wx.setStorageSync(t, {
                        value: n,
                        version: e.VERSION,
                        expire: Date.now() + 24 * o * 3600 * 1e3
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            get: function(e) {
                try {
                    var t = wx.getStorageSync(e);
                    if (t.expire > Date.now()) return t.value;
                    console.log("==== remove ====", e, t.expire, Date.now()), wx.removeStorage({
                        key: e
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            remove: function(e) {
                try {
                    wx.removeStorageSync(e);
                } catch (e) {
                    console.error(e);
                }
            },
            clear: function() {
                try {
                    wx.clearStorageSync();
                } catch (e) {
                    console.error(e);
                }
            }
        };
    };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    function a(e) {
        for (var t = {}, n = e.split(","), a = 0; a < n.length; a++) t[n[a]] = !0;
        return t;
    }
    var o = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, i = /^<\/([-A-Za-z0-9_]+)[^>]*>/, r = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, s = a("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), c = a("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), u = a("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), d = a("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), p = a("wxxxcode-style,script,style,view,scroll-view,block");
    e.exports = function(e, t) {
        function n(e, n) {
            if (n) for (n = n.toLowerCase(), a = g.length - 1; a >= 0 && g[a] != n; a--) ; else var a = 0;
            if (a >= 0) {
                for (var o = g.length - 1; o >= a; o--) t.end && t.end(g[o]);
                g.length = a;
            }
        }
        var a, f, h, g = [], m = e;
        for (g.last = function() {
            return this[this.length - 1];
        }; e; ) {
            if (f = !0, g.last() && p[g.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + g.last() + "[^>]*>"), function(e, n) {
                return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), 
                "";
            }), n(0, g.last()); else if (0 == e.indexOf("\x3c!--") ? (a = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, a)), 
            e = e.substring(a + 3), f = !1) : 0 == e.indexOf("</") ? (h = e.match(i)) && (e = e.substring(h[0].length), 
            h[0].replace(i, n), f = !1) : 0 == e.indexOf("<") && (h = e.match(o)) && (e = e.substring(h[0].length), 
            h[0].replace(o, function(e, a, o, i) {
                if (a = a.toLowerCase(), c[a]) for (;g.last() && u[g.last()]; ) n(0, g.last());
                if (l[a] && g.last() == a && n(0, a), (i = s[a] || !!i) || g.push(a), t.start) {
                    var p = [];
                    o.replace(r, function(e, t) {
                        var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : d[t] ? t : "";
                        p.push({
                            name: t,
                            value: n,
                            escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
                        });
                    }), t.start && t.start(a, p, i);
                }
            }), f = !1), f) {
                a = e.indexOf("<");
                for (var _ = ""; 0 === a; ) _ += "<", a = (e = e.substring(1)).indexOf("<");
                _ += a < 0 ? e : e.substring(0, a), e = a < 0 ? "" : e.substring(a), t.chars && t.chars(_);
            }
            if (e == m) throw "Parse Error: " + e;
            m = e;
        }
        n();
    };
}, function(e, t, n) {
    e.exports = {
        strDiscode: function(e) {
            return e = function(e) {
                return e = (e = (e = e.replace(/\r\n/g, "")).replace(/\n/g, "")).replace(/code/g, "wxxxcode-style");
            }(e = function(e) {
                return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&OElig;/g, "Œ")).replace(/&oelig;/g, "œ")).replace(/&Scaron;/g, "Š")).replace(/&scaron;/g, "š")).replace(/&Yuml;/g, "Ÿ")).replace(/&fnof;/g, "ƒ")).replace(/&circ;/g, "ˆ")).replace(/&tilde;/g, "˜")).replace(/&ensp;/g, "")).replace(/&emsp;/g, "")).replace(/&thinsp;/g, "")).replace(/&zwnj;/g, "")).replace(/&zwj;/g, "")).replace(/&lrm;/g, "")).replace(/&rlm;/g, "")).replace(/&ndash;/g, "–")).replace(/&mdash;/g, "—")).replace(/&lsquo;/g, "‘")).replace(/&rsquo;/g, "’")).replace(/&sbquo;/g, "‚")).replace(/&ldquo;/g, "“")).replace(/&rdquo;/g, "”")).replace(/&bdquo;/g, "„")).replace(/&dagger;/g, "†")).replace(/&Dagger;/g, "‡")).replace(/&bull;/g, "•")).replace(/&hellip;/g, "…")).replace(/&permil;/g, "‰")).replace(/&prime;/g, "′")).replace(/&Prime;/g, "″")).replace(/&lsaquo;/g, "‹")).replace(/&rsaquo;/g, "›")).replace(/&oline;/g, "‾")).replace(/&euro;/g, "€")).replace(/&trade;/g, "™")).replace(/&larr;/g, "←")).replace(/&uarr;/g, "↑")).replace(/&rarr;/g, "→")).replace(/&darr;/g, "↓")).replace(/&harr;/g, "↔")).replace(/&crarr;/g, "↵")).replace(/&lceil;/g, "⌈")).replace(/&rceil;/g, "⌉")).replace(/&lfloor;/g, "⌊")).replace(/&rfloor;/g, "⌋")).replace(/&loz;/g, "◊")).replace(/&spades;/g, "♠")).replace(/&clubs;/g, "♣")).replace(/&hearts;/g, "♥")).replace(/&diams;/g, "♦")).replace(/&#39;/g, "'");
            }(e = function(e) {
                return e = (e = (e = (e = (e = (e = e.replace(/&nbsp;/g, " ")).replace(/&quot;/g, "'")).replace(/&amp;/g, "&")).replace(/&lt;/g, "<")).replace(/&gt;/g, ">")).replace(/&#8226;/g, "•");
            }(e = function(e) {
                return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&Alpha;/g, "Α")).replace(/&Beta;/g, "Β")).replace(/&Gamma;/g, "Γ")).replace(/&Delta;/g, "Δ")).replace(/&Epsilon;/g, "Ε")).replace(/&Zeta;/g, "Ζ")).replace(/&Eta;/g, "Η")).replace(/&Theta;/g, "Θ")).replace(/&Iota;/g, "Ι")).replace(/&Kappa;/g, "Κ")).replace(/&Lambda;/g, "Λ")).replace(/&Mu;/g, "Μ")).replace(/&Nu;/g, "Ν")).replace(/&Xi;/g, "Ν")).replace(/&Omicron;/g, "Ο")).replace(/&Pi;/g, "Π")).replace(/&Rho;/g, "Ρ")).replace(/&Sigma;/g, "Σ")).replace(/&Tau;/g, "Τ")).replace(/&Upsilon;/g, "Υ")).replace(/&Phi;/g, "Φ")).replace(/&Chi;/g, "Χ")).replace(/&Psi;/g, "Ψ")).replace(/&Omega;/g, "Ω")).replace(/&alpha;/g, "α")).replace(/&beta;/g, "β")).replace(/&gamma;/g, "γ")).replace(/&delta;/g, "δ")).replace(/&epsilon;/g, "ε")).replace(/&zeta;/g, "ζ")).replace(/&eta;/g, "η")).replace(/&theta;/g, "θ")).replace(/&iota;/g, "ι")).replace(/&kappa;/g, "κ")).replace(/&lambda;/g, "λ")).replace(/&mu;/g, "μ")).replace(/&nu;/g, "ν")).replace(/&xi;/g, "ξ")).replace(/&omicron;/g, "ο")).replace(/&pi;/g, "π")).replace(/&rho;/g, "ρ")).replace(/&sigmaf;/g, "ς")).replace(/&sigma;/g, "σ")).replace(/&tau;/g, "τ")).replace(/&upsilon;/g, "υ")).replace(/&phi;/g, "φ")).replace(/&chi;/g, "χ")).replace(/&psi;/g, "ψ")).replace(/&omega;/g, "ω")).replace(/&thetasym;/g, "ϑ")).replace(/&upsih;/g, "ϒ")).replace(/&piv;/g, "ϖ")).replace(/&middot;/g, "·");
            }(e = function(e) {
                return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/&forall;/g, "∀")).replace(/&part;/g, "∂")).replace(/&exists;/g, "∃")).replace(/&empty;/g, "∅")).replace(/&nabla;/g, "∇")).replace(/&isin;/g, "∈")).replace(/&notin;/g, "∉")).replace(/&ni;/g, "∋")).replace(/&prod;/g, "∏")).replace(/&sum;/g, "∑")).replace(/&minus;/g, "−")).replace(/&lowast;/g, "∗")).replace(/&radic;/g, "√")).replace(/&prop;/g, "∝")).replace(/&infin;/g, "∞")).replace(/&ang;/g, "∠")).replace(/&and;/g, "∧")).replace(/&or;/g, "∨")).replace(/&cap;/g, "∩")).replace(/&cap;/g, "∪")).replace(/&int;/g, "∫")).replace(/&there4;/g, "∴")).replace(/&sim;/g, "∼")).replace(/&cong;/g, "≅")).replace(/&asymp;/g, "≈")).replace(/&ne;/g, "≠")).replace(/&le;/g, "≤")).replace(/&ge;/g, "≥")).replace(/&sub;/g, "⊂")).replace(/&sup;/g, "⊃")).replace(/&nsub;/g, "⊄")).replace(/&sube;/g, "⊆")).replace(/&supe;/g, "⊇")).replace(/&oplus;/g, "⊕")).replace(/&otimes;/g, "⊗")).replace(/&perp;/g, "⊥")).replace(/&sdot;/g, "⋅");
            }(e)))));
        },
        urlToHttpUrl: function(e, t) {
            return new RegExp("^//").test(e) && (e = t + ":" + e), e;
        }
    };
}, function(t, n, a) {
    function o(e) {
        var t = {
            omitExtraWLInCodeBlocks: {
                defaultValue: !1,
                describe: "Omit the default extra whiteline added to code blocks",
                type: "boolean"
            },
            noHeaderId: {
                defaultValue: !1,
                describe: "Turn on/off generated header id",
                type: "boolean"
            },
            prefixHeaderId: {
                defaultValue: !1,
                describe: "Specify a prefix to generated header ids",
                type: "string"
            },
            headerLevelStart: {
                defaultValue: !1,
                describe: "The header blocks level start",
                type: "integer"
            },
            parseImgDimensions: {
                defaultValue: !1,
                describe: "Turn on/off image dimension parsing",
                type: "boolean"
            },
            simplifiedAutoLink: {
                defaultValue: !1,
                describe: "Turn on/off GFM autolink style",
                type: "boolean"
            },
            literalMidWordUnderscores: {
                defaultValue: !1,
                describe: "Parse midword underscores as literal underscores",
                type: "boolean"
            },
            strikethrough: {
                defaultValue: !1,
                describe: "Turn on/off strikethrough support",
                type: "boolean"
            },
            tables: {
                defaultValue: !1,
                describe: "Turn on/off tables support",
                type: "boolean"
            },
            tablesHeaderId: {
                defaultValue: !1,
                describe: "Add an id to table headers",
                type: "boolean"
            },
            ghCodeBlocks: {
                defaultValue: !0,
                describe: "Turn on/off GFM fenced code blocks support",
                type: "boolean"
            },
            tasklists: {
                defaultValue: !1,
                describe: "Turn on/off GFM tasklist support",
                type: "boolean"
            },
            smoothLivePreview: {
                defaultValue: !1,
                describe: "Prevents weird effects in live previews due to incomplete input",
                type: "boolean"
            },
            smartIndentationFix: {
                defaultValue: !1,
                description: "Tries to smartly fix identation in es6 strings",
                type: "boolean"
            }
        };
        if (!1 === e) return JSON.parse(JSON.stringify(t));
        var n = {};
        for (var a in t) t.hasOwnProperty(a) && (n[a] = t[a].defaultValue);
        return n;
    }
    function i(e, t) {
        var n = t ? "Error in " + t + " extension->" : "Error in unnamed extension", a = {
            valid: !0,
            error: ""
        };
        c.helper.isArray(e) || (e = [ e ]);
        for (var o = 0; o < e.length; ++o) {
            var i = n + " sub-extension " + o + ": ", r = e[o];
            if ("object" !== (void 0 === r ? "undefined" : s(r))) return a.valid = !1, a.error = i + "must be an object, but " + (void 0 === r ? "undefined" : s(r)) + " given", 
            a;
            if (!c.helper.isString(r.type)) return a.valid = !1, a.error = i + 'property "type" must be a string, but ' + s(r.type) + " given", 
            a;
            var u = r.type = r.type.toLowerCase();
            if ("language" === u && (u = r.type = "lang"), "html" === u && (u = r.type = "output"), 
            "lang" !== u && "output" !== u && "listener" !== u) return a.valid = !1, a.error = i + "type " + u + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
            a;
            if ("listener" === u) {
                if (c.helper.isUndefined(r.listeners)) return a.valid = !1, a.error = i + '. Extensions of type "listener" must have a property called "listeners"', 
                a;
            } else if (c.helper.isUndefined(r.filter) && c.helper.isUndefined(r.regex)) return a.valid = !1, 
            a.error = i + u + ' extensions must define either a "regex" property or a "filter" method', 
            a;
            if (r.listeners) {
                if ("object" !== s(r.listeners)) return a.valid = !1, a.error = i + '"listeners" property must be an object but ' + s(r.listeners) + " given", 
                a;
                for (var l in r.listeners) if (r.listeners.hasOwnProperty(l) && "function" != typeof r.listeners[l]) return a.valid = !1, 
                a.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + l + " must be a function but " + s(r.listeners[l]) + " given", 
                a;
            }
            if (r.filter) {
                if ("function" != typeof r.filter) return a.valid = !1, a.error = i + '"filter" must be a function, but ' + s(r.filter) + " given", 
                a;
            } else if (r.regex) {
                if (c.helper.isString(r.regex) && (r.regex = new RegExp(r.regex, "g")), !r.regex instanceof RegExp) return a.valid = !1, 
                a.error = i + '"regex" property must either be a string or a RegExp object, but ' + s(r.regex) + " given", 
                a;
                if (c.helper.isUndefined(r.replace)) return a.valid = !1, a.error = i + '"regex" extensions must implement a replace string or function', 
                a;
            }
        }
        return a;
    }
    function r(e, t) {
        return "~E" + t.charCodeAt(0) + "E";
    }
    var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, c = {}, u = {}, l = {}, d = o(!0), p = {
        github: {
            omitExtraWLInCodeBlocks: !0,
            prefixHeaderId: "user-content-",
            simplifiedAutoLink: !0,
            literalMidWordUnderscores: !0,
            strikethrough: !0,
            tables: !0,
            tablesHeaderId: !0,
            ghCodeBlocks: !0,
            tasklists: !0
        },
        vanilla: o(!0)
    };
    c.helper = {}, c.extensions = {}, c.setOption = function(e, t) {
        return d[e] = t, this;
    }, c.getOption = function(e) {
        return d[e];
    }, c.getOptions = function() {
        return d;
    }, c.resetOptions = function() {
        d = o(!0);
    }, c.setFlavor = function(e) {
        if (p.hasOwnProperty(e)) {
            var t = p[e];
            for (var n in t) t.hasOwnProperty(n) && (d[n] = t[n]);
        }
    }, c.getDefaultOptions = function(e) {
        return o(e);
    }, c.subParser = function(e, t) {
        if (c.helper.isString(e)) {
            if (void 0 === t) {
                if (u.hasOwnProperty(e)) return u[e];
                throw Error("SubParser named " + e + " not registered!");
            }
            u[e] = t;
        }
    }, c.extension = function(e, t) {
        if (!c.helper.isString(e)) throw Error("Extension 'name' must be a string");
        if (e = c.helper.stdExtName(e), c.helper.isUndefined(t)) {
            if (!l.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
            return l[e];
        }
        "function" == typeof t && (t = t()), c.helper.isArray(t) || (t = [ t ]);
        var n = i(t, e);
        if (!n.valid) throw Error(n.error);
        l[e] = t;
    }, c.getAllExtensions = function() {
        return l;
    }, c.removeExtension = function(e) {
        delete l[e];
    }, c.resetExtensions = function() {
        l = {};
    }, c.validateExtension = function(e) {
        var t = i(e, null);
        return !!t.valid || (console.warn(t.error), !1);
    }, c.hasOwnProperty("helper") || (c.helper = {}), c.helper.isString = function(e) {
        return "string" == typeof e || e instanceof String;
    }, c.helper.isFunction = function(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }, c.helper.forEach = function(e, t) {
        if ("function" == typeof e.forEach) e.forEach(t); else for (var n = 0; n < e.length; n++) t(e[n], n, e);
    }, c.helper.isArray = function(e) {
        return e.constructor === Array;
    }, c.helper.isUndefined = function(e) {
        return void 0 === e;
    }, c.helper.stdExtName = function(e) {
        return e.replace(/[_-]||\s/g, "").toLowerCase();
    }, c.helper.escapeCharactersCallback = r, c.helper.escapeCharacters = function(e, t, n) {
        var a = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
        n && (a = "\\\\" + a);
        var o = new RegExp(a, "g");
        return e = e.replace(o, r);
    };
    var f = function(e, t, n, a) {
        var o, i, r, s, c, u = a || "", l = u.indexOf("g") > -1, d = new RegExp(t + "|" + n, "g" + u.replace(/g/g, "")), p = new RegExp(t, u.replace(/g/g, "")), f = [];
        do {
            for (o = 0; r = d.exec(e); ) if (p.test(r[0])) o++ || (s = (i = d.lastIndex) - r[0].length); else if (o && !--o) {
                c = r.index + r[0].length;
                var h = {
                    left: {
                        start: s,
                        end: i
                    },
                    match: {
                        start: i,
                        end: r.index
                    },
                    right: {
                        start: r.index,
                        end: c
                    },
                    wholeMatch: {
                        start: s,
                        end: c
                    }
                };
                if (f.push(h), !l) return f;
            }
        } while (o && (d.lastIndex = i));
        return f;
    };
    c.helper.matchRecursiveRegExp = function(e, t, n, a) {
        for (var o = f(e, t, n, a), i = [], r = 0; r < o.length; ++r) i.push([ e.slice(o[r].wholeMatch.start, o[r].wholeMatch.end), e.slice(o[r].match.start, o[r].match.end), e.slice(o[r].left.start, o[r].left.end), e.slice(o[r].right.start, o[r].right.end) ]);
        return i;
    }, c.helper.replaceRecursiveRegExp = function(e, t, n, a, o) {
        if (!c.helper.isFunction(t)) {
            var i = t;
            t = function() {
                return i;
            };
        }
        var r = f(e, n, a, o), s = e, u = r.length;
        if (u > 0) {
            var l = [];
            0 !== r[0].wholeMatch.start && l.push(e.slice(0, r[0].wholeMatch.start));
            for (var d = 0; d < u; ++d) l.push(t(e.slice(r[d].wholeMatch.start, r[d].wholeMatch.end), e.slice(r[d].match.start, r[d].match.end), e.slice(r[d].left.start, r[d].left.end), e.slice(r[d].right.start, r[d].right.end))), 
            d < u - 1 && l.push(e.slice(r[d].wholeMatch.end, r[d + 1].wholeMatch.start));
            r[u - 1].wholeMatch.end < e.length && l.push(e.slice(r[u - 1].wholeMatch.end)), 
            s = l.join("");
        }
        return s;
    }, c.helper.isUndefined(console) && (console = {
        warn: function(e) {
            alert(e);
        },
        log: function(e) {
            alert(e);
        },
        error: function(e) {
            throw e;
        }
    }), c.Converter = function(e) {
        function t(e, t) {
            if (t = t || null, c.helper.isString(e)) {
                if (t = e = c.helper.stdExtName(e), c.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
                void function(e, t) {
                    "function" == typeof e && (e = e(new c.Converter())), c.helper.isArray(e) || (e = [ e ]);
                    var n = i(e, t);
                    if (!n.valid) throw Error(n.error);
                    for (var a = 0; a < e.length; ++a) switch (e[a].type) {
                      case "lang":
                        o.push(e[a]);
                        break;

                      case "output":
                        r.push(e[a]);
                        break;

                      default:
                        throw Error("Extension loader error: Type unrecognized!!!");
                    }
                }(c.extensions[e], e);
                if (c.helper.isUndefined(l[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
                e = l[e];
            }
            "function" == typeof e && (e = e()), c.helper.isArray(e) || (e = [ e ]);
            var a = i(e, t);
            if (!a.valid) throw Error(a.error);
            for (var s = 0; s < e.length; ++s) {
                switch (e[s].type) {
                  case "lang":
                    o.push(e[s]);
                    break;

                  case "output":
                    r.push(e[s]);
                }
                if (e[s].hasOwnProperty(u)) for (var d in e[s].listeners) e[s].listeners.hasOwnProperty(d) && n(d, e[s].listeners[d]);
            }
        }
        function n(e, t) {
            if (!c.helper.isString(e)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (void 0 === e ? "undefined" : s(e)) + " given");
            if ("function" != typeof t) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (void 0 === t ? "undefined" : s(t)) + " given");
            u.hasOwnProperty(e) || (u[e] = []), u[e].push(t);
        }
        var a = {}, o = [], r = [], u = {};
        !function() {
            for (var n in e = e || {}, d) d.hasOwnProperty(n) && (a[n] = d[n]);
            if ("object" !== (void 0 === e ? "undefined" : s(e))) throw Error("Converter expects the passed parameter to be an object, but " + (void 0 === e ? "undefined" : s(e)) + " was passed instead.");
            for (var o in e) e.hasOwnProperty(o) && (a[o] = e[o]);
            a.extensions && c.helper.forEach(a.extensions, t);
        }(), this._dispatch = function(e, t, n, a) {
            if (u.hasOwnProperty(e)) for (var o = 0; o < u[e].length; ++o) {
                var i = u[e][o](e, t, this, n, a);
                i && void 0 !== i && (t = i);
            }
            return t;
        }, this.listen = function(e, t) {
            return n(e, t), this;
        }, this.makeHtml = function(e) {
            if (!e) return e;
            var t = {
                gHtmlBlocks: [],
                gHtmlMdBlocks: [],
                gHtmlSpans: [],
                gUrls: {},
                gTitles: {},
                gDimensions: {},
                gListLevel: 0,
                hashLinkCounts: {},
                langExtensions: o,
                outputModifiers: r,
                converter: this,
                ghCodeBlocks: []
            };
            return e = (e = (e = (e = e.replace(/~/g, "~T")).replace(/\$/g, "~D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n"), 
            a.smartIndentationFix && (e = function(e) {
                var t = e.match(/^\s*/)[0].length, n = new RegExp("^\\s{0," + t + "}", "gm");
                return e.replace(n, "");
            }(e)), e = e, e = c.subParser("detab")(e, a, t), e = c.subParser("stripBlankLines")(e, a, t), 
            c.helper.forEach(o, function(n) {
                e = c.subParser("runExtension")(n, e, a, t);
            }), e = c.subParser("hashPreCodeTags")(e, a, t), e = c.subParser("githubCodeBlocks")(e, a, t), 
            e = c.subParser("hashHTMLBlocks")(e, a, t), e = c.subParser("hashHTMLSpans")(e, a, t), 
            e = c.subParser("stripLinkDefinitions")(e, a, t), e = c.subParser("blockGamut")(e, a, t), 
            e = c.subParser("unhashHTMLSpans")(e, a, t), e = (e = (e = c.subParser("unescapeSpecialChars")(e, a, t)).replace(/~D/g, "$$")).replace(/~T/g, "~"), 
            c.helper.forEach(r, function(n) {
                e = c.subParser("runExtension")(n, e, a, t);
            }), e;
        }, this.setOption = function(e, t) {
            a[e] = t;
        }, this.getOption = function(e) {
            return a[e];
        }, this.getOptions = function() {
            return a;
        }, this.addExtension = function(e, n) {
            t(e, n = n || null);
        }, this.useExtension = function(e) {
            t(e);
        }, this.setFlavor = function(e) {
            if (p.hasOwnProperty(e)) {
                var t = p[e];
                for (var n in t) t.hasOwnProperty(n) && (a[n] = t[n]);
            }
        }, this.removeExtension = function(e) {
            c.helper.isArray(e) || (e = [ e ]);
            for (var t = 0; t < e.length; ++t) {
                for (var n = e[t], a = 0; a < o.length; ++a) o[a] === n && o[a].splice(a, 1);
                for (;0 < r.length; ++a) r[0] === n && r[0].splice(a, 1);
            }
        }, this.getAllExtensions = function() {
            return {
                language: o,
                output: r
            };
        };
    }, c.subParser("anchors", function(e, t, n) {
        var a = function(e, t, a, o, i, r, s, u) {
            c.helper.isUndefined(u) && (u = ""), e = t;
            var l = a, d = o.toLowerCase(), p = i, f = u;
            if (!p) if (d || (d = l.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + d, c.helper.isUndefined(n.gUrls[d])) {
                if (!(e.search(/\(\s*\)$/m) > -1)) return e;
                p = "";
            } else p = n.gUrls[d], c.helper.isUndefined(n.gTitles[d]) || (f = n.gTitles[d]);
            var h = '<a href="' + (p = c.helper.escapeCharacters(p, "*_", !1)) + '"';
            return "" !== f && null !== f && (f = f.replace(/"/g, "&quot;"), h += ' title="' + (f = c.helper.escapeCharacters(f, "*_", !1)) + '"'), 
            h += ">" + l + "</a>";
        };
        return e = (e = (e = (e = n.converter._dispatch("anchors.before", e, t, n)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, a)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, a)).replace(/(\[([^\[\]]+)])()()()()()/g, a), 
        e = n.converter._dispatch("anchors.after", e, t, n);
    }), c.subParser("autoLinks", function(e, t, n) {
        function a(e, t) {
            var n = t;
            return /^www\./i.test(t) && (t = t.replace(/^www\./i, "http://www.")), '<a href="' + t + '">' + n + "</a>";
        }
        function o(e, t) {
            var n = c.subParser("unescapeSpecialChars")(t);
            return c.subParser("encodeEmailAddress")(n);
        }
        return e = (e = (e = n.converter._dispatch("autoLinks.before", e, t, n)).replace(/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, a)).replace(/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, o), 
        t.simplifiedAutoLink && (e = (e = e.replace(/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, a)).replace(/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, o)), 
        e = n.converter._dispatch("autoLinks.after", e, t, n);
    }), c.subParser("blockGamut", function(e, t, n) {
        e = n.converter._dispatch("blockGamut.before", e, t, n), e = c.subParser("blockQuotes")(e, t, n), 
        e = c.subParser("headers")(e, t, n);
        var a = c.subParser("hashBlock")("<hr />", t, n);
        return e = (e = (e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, a), 
        e = c.subParser("lists")(e, t, n), e = c.subParser("codeBlocks")(e, t, n), e = c.subParser("tables")(e, t, n), 
        e = c.subParser("hashHTMLBlocks")(e, t, n), e = c.subParser("paragraphs")(e, t, n), 
        e = n.converter._dispatch("blockGamut.after", e, t, n);
    }), c.subParser("blockQuotes", function(e, t, n) {
        return e = (e = n.converter._dispatch("blockQuotes.before", e, t, n)).replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, a) {
            var o = a;
            return o = (o = (o = o.replace(/^[ \t]*>[ \t]?/gm, "~0")).replace(/~0/g, "")).replace(/^[ \t]+$/gm, ""), 
            o = c.subParser("githubCodeBlocks")(o, t, n), o = (o = (o = c.subParser("blockGamut")(o, t, n)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
                var n = t;
                return n = (n = n.replace(/^  /gm, "~0")).replace(/~0/g, "");
            }), c.subParser("hashBlock")("<blockquote>\n" + o + "\n</blockquote>", t, n);
        }), e = n.converter._dispatch("blockQuotes.after", e, t, n);
    }), c.subParser("codeBlocks", function(e, t, n) {
        return e = n.converter._dispatch("codeBlocks.before", e, t, n), e = (e = (e += "~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, a, o) {
            var i = a, r = o, s = "\n";
            return i = c.subParser("outdent")(i), i = c.subParser("encodeCode")(i), i = (i = (i = c.subParser("detab")(i)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
            t.omitExtraWLInCodeBlocks && (s = ""), i = "<pre><code>" + i + s + "</code></pre>", 
            c.subParser("hashBlock")(i, t, n) + r;
        })).replace(/~0/, ""), e = n.converter._dispatch("codeBlocks.after", e, t, n);
    }), c.subParser("codeSpans", function(e, t, n) {
        return void 0 === (e = n.converter._dispatch("codeSpans.before", e, t, n)) && (e = ""), 
        e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, a) {
            var o = a;
            return o = (o = o.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), t + "<code>" + (o = c.subParser("encodeCode")(o)) + "</code>";
        }), e = n.converter._dispatch("codeSpans.after", e, t, n);
    }), c.subParser("detab", function(e) {
        return e = (e = (e = (e = (e = e.replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "~A~B")).replace(/~B(.+?)~A/g, function(e, t) {
            for (var n = t, a = 4 - n.length % 4, o = 0; o < a; o++) n += " ";
            return n;
        })).replace(/~A/g, "    ")).replace(/~B/g, "");
    }), c.subParser("encodeAmpsAndAngles", function(e) {
        return e = (e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?\$!])/gi, "&lt;");
    }), c.subParser("encodeBackslashEscapes", function(e) {
        return e = (e = e.replace(/\\(\\)/g, c.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+-.!])/g, c.helper.escapeCharactersCallback);
    }), c.subParser("encodeCode", function(e) {
        return e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), 
        e = c.helper.escapeCharacters(e, "*_{}[]\\", !1);
    }), c.subParser("encodeEmailAddress", function(e) {
        var t = [ function(e) {
            return "&#" + e.charCodeAt(0) + ";";
        }, function(e) {
            return "&#x" + e.charCodeAt(0).toString(16) + ";";
        }, function(e) {
            return e;
        } ];
        return e = (e = '<a href="' + (e = (e = "mailto:" + e).replace(/./g, function(e) {
            if ("@" === e) e = t[Math.floor(2 * Math.random())](e); else if (":" !== e) {
                var n = Math.random();
                e = n > .9 ? t[2](e) : n > .45 ? t[1](e) : t[0](e);
            }
            return e;
        })) + '">' + e + "</a>").replace(/">.+:/g, '">');
    }), c.subParser("escapeSpecialCharsWithinTagAttributes", function(e) {
        return e = e.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi, function(e) {
            var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
            return t = c.helper.escapeCharacters(t, "\\`*_", !1);
        });
    }), c.subParser("githubCodeBlocks", function(e, t, n) {
        return t.ghCodeBlocks ? (e = n.converter._dispatch("githubCodeBlocks.before", e, t, n), 
        e = (e = (e += "~0").replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, a, o) {
            var i = t.omitExtraWLInCodeBlocks ? "" : "\n";
            return o = c.subParser("encodeCode")(o), o = "<pre><code" + (a ? ' class="' + a + " language-" + a + '"' : "") + ">" + (o = (o = (o = c.subParser("detab")(o)).replace(/^\n+/g, "")).replace(/\n+$/g, "")) + i + "</code></pre>", 
            o = c.subParser("hashBlock")(o, t, n), "\n\n~G" + (n.ghCodeBlocks.push({
                text: e,
                codeblock: o
            }) - 1) + "G\n\n";
        })).replace(/~0/, ""), n.converter._dispatch("githubCodeBlocks.after", e, t, n)) : e;
    }), c.subParser("hashBlock", function(e, t, n) {
        return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (n.gHtmlBlocks.push(e) - 1) + "K\n\n";
    }), c.subParser("hashElement", function(e, t, n) {
        return function(e, t) {
            var a = t;
            return a = (a = (a = a.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), 
            a = "\n\n~K" + (n.gHtmlBlocks.push(a) - 1) + "K\n\n";
        };
    }), c.subParser("hashHTMLBlocks", function(e, t, n) {
        for (var a = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], o = 0; o < a.length; ++o) e = c.helper.replaceRecursiveRegExp(e, function(e, t, a, o) {
            var i = e;
            return -1 !== a.search(/\bmarkdown\b/) && (i = a + n.converter.makeHtml(t) + o), 
            "\n\n~K" + (n.gHtmlBlocks.push(i) - 1) + "K\n\n";
        }, "^(?: |\\t){0,3}<" + a[o] + "\\b[^>]*>", "</" + a[o] + ">", "gim");
        return e = (e = (e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, c.subParser("hashElement")(e, t, n))).replace(/(<!--[\s\S]*?-->)/g, c.subParser("hashElement")(e, t, n))).replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, c.subParser("hashElement")(e, t, n));
    }), c.subParser("hashHTMLSpans", function(e, t, n) {
        for (var a = c.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), o = 0; o < a.length; ++o) e = e.replace(a[o][0], "~L" + (n.gHtmlSpans.push(a[o][0]) - 1) + "L");
        return e;
    }), c.subParser("unhashHTMLSpans", function(e, t, n) {
        for (var a = 0; a < n.gHtmlSpans.length; ++a) e = e.replace("~L" + a + "L", n.gHtmlSpans[a]);
        return e;
    }), c.subParser("hashPreCodeTags", function(e, t, n) {
        return e = c.helper.replaceRecursiveRegExp(e, function(e, t, a, o) {
            var i = a + c.subParser("encodeCode")(t) + o;
            return "\n\n~G" + (n.ghCodeBlocks.push({
                text: e,
                codeblock: i
            }) - 1) + "G\n\n";
        }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
    }), c.subParser("headers", function(e, t, n) {
        function a(e) {
            var t, a = e.replace(/[^\w]/g, "").toLowerCase();
            return n.hashLinkCounts[a] ? t = a + "-" + n.hashLinkCounts[a]++ : (t = a, n.hashLinkCounts[a] = 1), 
            !0 === o && (o = "section"), c.helper.isString(o) ? o + t : t;
        }
        e = n.converter._dispatch("headers.before", e, t, n);
        var o = t.prefixHeaderId, i = isNaN(parseInt(t.headerLevelStart)) ? 1 : parseInt(t.headerLevelStart), r = t.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, s = t.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
        return e = (e = (e = e.replace(r, function(e, o) {
            var r = c.subParser("spanGamut")(o, t, n), s = t.noHeaderId ? "" : ' id="' + a(o) + '"', u = "<h" + i + s + ">" + r + "</h" + i + ">";
            return c.subParser("hashBlock")(u, t, n);
        })).replace(s, function(e, o) {
            var r = c.subParser("spanGamut")(o, t, n), s = t.noHeaderId ? "" : ' id="' + a(o) + '"', u = i + 1, l = "<h" + u + s + ">" + r + "</h" + u + ">";
            return c.subParser("hashBlock")(l, t, n);
        })).replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(e, o, r) {
            var s = c.subParser("spanGamut")(r, t, n), u = t.noHeaderId ? "" : ' id="' + a(r) + '"', l = i - 1 + o.length, d = "<h" + l + u + ">" + s + "</h" + l + ">";
            return c.subParser("hashBlock")(d, t, n);
        }), e = n.converter._dispatch("headers.after", e, t, n);
    }), c.subParser("images", function(e, t, n) {
        function a(e, t, a, o, i, r, s, u) {
            var l = n.gUrls, d = n.gTitles, p = n.gDimensions;
            if (a = a.toLowerCase(), u || (u = ""), "" === o || null === o) {
                if ("" !== a && null !== a || (a = t.toLowerCase().replace(/ ?\n/g, " ")), o = "#" + a, 
                c.helper.isUndefined(l[a])) return e;
                o = l[a], c.helper.isUndefined(d[a]) || (u = d[a]), c.helper.isUndefined(p[a]) || (i = p[a].width, 
                r = p[a].height);
            }
            t = t.replace(/"/g, "&quot;"), t = c.helper.escapeCharacters(t, "*_", !1);
            var f = '<img src="' + (o = c.helper.escapeCharacters(o, "*_", !1)) + '" alt="' + t + '"';
            return u && (u = u.replace(/"/g, "&quot;"), f += ' title="' + (u = c.helper.escapeCharacters(u, "*_", !1)) + '"'), 
            i && r && (f += ' width="' + (i = "*" === i ? "auto" : i) + '"', f += ' height="' + (r = "*" === r ? "auto" : r) + '"'), 
            f += " />";
        }
        return e = (e = (e = n.converter._dispatch("images.before", e, t, n)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g, a)).replace(/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, a), 
        e = n.converter._dispatch("images.after", e, t, n);
    }), c.subParser("italicsAndBold", function(e, t, n) {
        return e = n.converter._dispatch("italicsAndBold.before", e, t, n), e = t.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"), 
        e = n.converter._dispatch("italicsAndBold.after", e, t, n);
    }), c.subParser("lists", function(e, t, n) {
        function a(e, a) {
            n.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
            var o = /\n[ \t]*\n(?!~0)/.test(e += "~0");
            return e = (e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(e, a, i, r, s, u, l) {
                l = l && "" !== l.trim();
                var d = c.subParser("outdent")(s, t, n), p = "";
                return u && t.tasklists && (p = ' class="task-list-item" style="list-style-type: none;"', 
                d = d.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                    var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                    return l && (e += " checked"), e += ">";
                })), a || d.search(/\n{2,}/) > -1 ? (d = c.subParser("githubCodeBlocks")(d, t, n), 
                d = c.subParser("blockGamut")(d, t, n)) : (d = (d = c.subParser("lists")(d, t, n)).replace(/\n$/, ""), 
                d = o ? c.subParser("paragraphs")(d, t, n) : c.subParser("spanGamut")(d, t, n)), 
                d = "\n<li" + p + ">" + d + "</li>\n";
            })).replace(/~0/g, ""), n.gListLevel--, a && (e = e.replace(/\s+$/, "")), e;
        }
        function o(e, t, n) {
            var o = "ul" === t ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, i = [], r = "";
            if (-1 !== e.search(o)) {
                !function e(i) {
                    var s = i.search(o);
                    -1 !== s ? (r += "\n\n<" + t + ">" + a(i.slice(0, s), !!n) + "</" + t + ">\n\n", 
                    o = "ul" == (t = "ul" === t ? "ol" : "ul") ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                    e(i.slice(s))) : r += "\n\n<" + t + ">" + a(i, !!n) + "</" + t + ">\n\n";
                }(e);
                for (var s = 0; s < i.length; ++s) ;
            } else r = "\n\n<" + t + ">" + a(e, !!n) + "</" + t + ">\n\n";
            return r;
        }
        e = n.converter._dispatch("lists.before", e, t, n), e += "~0";
        var i = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
        return n.gListLevel ? e = e.replace(i, function(e, t, n) {
            return o(t, n.search(/[*+-]/g) > -1 ? "ul" : "ol", !0);
        }) : (i = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
        e = e.replace(i, function(e, t, n, a) {
            return o(n, a.search(/[*+-]/g) > -1 ? "ul" : "ol");
        })), e = e.replace(/~0/, ""), e = n.converter._dispatch("lists.after", e, t, n);
    }), c.subParser("outdent", function(e) {
        return e = (e = e.replace(/^(\t|[ ]{1,4})/gm, "~0")).replace(/~0/g, "");
    }), c.subParser("paragraphs", function(e, t, n) {
        for (var a = (e = (e = (e = n.converter._dispatch("paragraphs.before", e, t, n)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), o = [], i = a.length, r = 0; r < i; r++) {
            var s = a[r];
            s.search(/~(K|G)(\d+)\1/g) >= 0 ? o.push(s) : (s = (s = c.subParser("spanGamut")(s, t, n)).replace(/^([ \t]*)/g, "<p>"), 
            s += "</p>", o.push(s));
        }
        for (i = o.length, r = 0; r < i; r++) {
            for (var u = "", l = o[r], d = !1; l.search(/~(K|G)(\d+)\1/) >= 0; ) {
                var p = RegExp.$1, f = RegExp.$2;
                u = (u = "K" === p ? n.gHtmlBlocks[f] : d ? c.subParser("encodeCode")(n.ghCodeBlocks[f].text) : n.ghCodeBlocks[f].codeblock).replace(/\$/g, "$$$$"), 
                l = l.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, u), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l) && (d = !0);
            }
            o[r] = l;
        }
        return e = (e = (e = o.join("\n\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
        n.converter._dispatch("paragraphs.after", e, t, n);
    }), c.subParser("runExtension", function(e, t, n, a) {
        if (e.filter) t = e.filter(t, a.converter, n); else if (e.regex) {
            var o = e.regex;
            !o instanceof RegExp && (o = new RegExp(o, "g")), t = t.replace(o, e.replace);
        }
        return t;
    }), c.subParser("spanGamut", function(e, t, n) {
        return e = n.converter._dispatch("spanGamut.before", e, t, n), e = c.subParser("codeSpans")(e, t, n), 
        e = c.subParser("escapeSpecialCharsWithinTagAttributes")(e, t, n), e = c.subParser("encodeBackslashEscapes")(e, t, n), 
        e = c.subParser("images")(e, t, n), e = c.subParser("anchors")(e, t, n), e = c.subParser("autoLinks")(e, t, n), 
        e = c.subParser("encodeAmpsAndAngles")(e, t, n), e = c.subParser("italicsAndBold")(e, t, n), 
        e = (e = c.subParser("strikethrough")(e, t, n)).replace(/  +\n/g, " <br />\n"), 
        e = n.converter._dispatch("spanGamut.after", e, t, n);
    }), c.subParser("strikethrough", function(e, t, n) {
        return t.strikethrough && (e = (e = n.converter._dispatch("strikethrough.before", e, t, n)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), 
        e = n.converter._dispatch("strikethrough.after", e, t, n)), e;
    }), c.subParser("stripBlankLines", function(e) {
        return e.replace(/^[ \t]+$/gm, "");
    }), c.subParser("stripLinkDefinitions", function(e, t, n) {
        return e = (e = (e += "~0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm, function(e, a, o, i, r, s, u) {
            return a = a.toLowerCase(), n.gUrls[a] = c.subParser("encodeAmpsAndAngles")(o), 
            s ? s + u : (u && (n.gTitles[a] = u.replace(/"|'/g, "&quot;")), t.parseImgDimensions && i && r && (n.gDimensions[a] = {
                width: i,
                height: r
            }), "");
        })).replace(/~0/, "");
    }), c.subParser("tables", function(e, t, n) {
        function a(e, a) {
            return "<td" + a + ">" + c.subParser("spanGamut")(e, t, n) + "</td>\n";
        }
        return t.tables ? (e = (e = n.converter._dispatch("tables.before", e, t, n)).replace(/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm, function(e) {
            var o, i = e.split("\n");
            for (o = 0; o < i.length; ++o) /^[ \t]{0,3}\|/.test(i[o]) && (i[o] = i[o].replace(/^[ \t]{0,3}\|/, "")), 
            /\|[ \t]*$/.test(i[o]) && (i[o] = i[o].replace(/\|[ \t]*$/, ""));
            var r, s, u, l, d = i[0].split("|").map(function(e) {
                return e.trim();
            }), p = i[1].split("|").map(function(e) {
                return e.trim();
            }), f = [], h = [], g = [], m = [];
            for (i.shift(), i.shift(), o = 0; o < i.length; ++o) "" !== i[o].trim() && f.push(i[o].split("|").map(function(e) {
                return e.trim();
            }));
            if (d.length < p.length) return e;
            for (o = 0; o < p.length; ++o) g.push((r = p[o], /^:[ \t]*--*$/.test(r) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(r) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(r) ? ' style="text-align:center;"' : ""));
            for (o = 0; o < d.length; ++o) c.helper.isUndefined(g[o]) && (g[o] = ""), h.push((s = d[o], 
            u = g[o], l = void 0, l = "", s = s.trim(), t.tableHeaderId && (l = ' id="' + s.replace(/ /g, "_").toLowerCase() + '"'), 
            "<th" + l + u + ">" + (s = c.subParser("spanGamut")(s, t, n)) + "</th>\n"));
            for (o = 0; o < f.length; ++o) {
                for (var _ = [], v = 0; v < h.length; ++v) c.helper.isUndefined(f[o][v]), _.push(a(f[o][v], g[v]));
                m.push(_);
            }
            return function(e, t) {
                for (var n = "<table>\n<thead>\n<tr>\n", a = e.length, o = 0; o < a; ++o) n += e[o];
                for (n += "</tr>\n</thead>\n<tbody>\n", o = 0; o < t.length; ++o) {
                    n += "<tr>\n";
                    for (var i = 0; i < a; ++i) n += t[o][i];
                    n += "</tr>\n";
                }
                return n += "</tbody>\n</table>\n";
            }(h, m);
        }), e = n.converter._dispatch("tables.after", e, t, n)) : e;
    }), c.subParser("unescapeSpecialChars", function(e) {
        return e = e.replace(/~E(\d+)E/g, function(e, t) {
            var n = parseInt(t);
            return String.fromCharCode(n);
        });
    }), t.exports = c;
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    e.exports = {
        getSteps: function(e, t, n) {
            var a = [];
            switch (e) {
              case 3:
              case 4:
                a = t ? n ? [ {
                    done: !1,
                    current: !0,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !0,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !1,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 50:
                n && (a = [ {
                    done: !0,
                    current: !0,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ]);
                break;

              case 5:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !0,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !0,
                    text: "买家付款"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 6:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !0,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !0,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !0,
                    text: "商家发货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ];
                break;

              case 8:
              case 100:
                a = t ? n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !0,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : n ? [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ] : [ {
                    done: !0,
                    current: !1,
                    text: "买家付款"
                }, {
                    done: !0,
                    current: !1,
                    text: "商家发货"
                }, {
                    done: !0,
                    current: !0,
                    text: "交易完成"
                } ];
                break;

              default:
                t && (a = n ? [ {
                    done: !1,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "已成团"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ] : [ {
                    done: !1,
                    current: !1,
                    text: "买家下单"
                }, {
                    done: !1,
                    current: !1,
                    text: "商家接单"
                }, {
                    done: !1,
                    current: !1,
                    text: "买家提货"
                }, {
                    done: !1,
                    current: !1,
                    text: "交易完成"
                } ]);
            }
            return a;
        }
    };
}, , , , function(e, t, n) {
    e.exports = {
        doPay: function(e, t) {
            switch (e) {
              case "WX_APPLET":
                return this.doWXPay(e, t);

              case "ECARD":
              case "PREPAID_PAY":
              case "VALUE_CARD":
              case "GIFT_CARD":
              case "ENCHASHMENT_GIFT_CARD":
                return this._defaultPay(e, t);

              case "CREDIT_CARD":
                return this.doCreditCardPay();

              default:
                return Promise.reject({
                    msg: "暂不支持该支付方式"
                });
            }
        },
        doWXPay: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return new Promise(function(e, n) {
                if (t.deep_link_info && 0 !== Object.keys(t.deep_link_info).length) {
                    var a = t.deep_link_info || {};
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: a.signType,
                        paySign: a.paySign,
                        success: function(t) {
                            e({
                                res: t
                            });
                        },
                        fail: function(e) {
                            var t = "fail";
                            "requestPayment:fail cancel" === e.errMsg && (t = "cancel"), n({
                                res: e,
                                type: t,
                                msg: e.errMsg
                            });
                        }
                    });
                } else n({
                    msg: "支付失败，请稍后重试!"
                });
            });
        },
        doECardPay: function() {
            return new Promise(function(e) {
                e({});
            });
        },
        doCreditCardPay: function() {
            return new Promise(function(e) {
                e({});
            });
        },
        _defaultPay: function() {
            return new Promise(function(e) {
                e({});
            });
        }
    };
}, , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [], a = !0, o = !1, i = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                !t || n.length !== t); a = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
    t.default = function(e) {
        var t = e.data, n = o(t, 2)[1];
        return a({}, e, {
            type: 1,
            templateId: 3,
            data: [ [].concat(function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n;
                }
                return Array.from(e);
            }(n)) ]
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        return e;
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(243)), i = a(n(242));
    t.default = {
        weapp2wap: o.default,
        wap2weapp: i.default
    };
}, function(t, n, a) {
    function o(e, t, n, a) {
        var o = e[n.s1] || t.originPicture[0];
        return f(o, a ? "!730x0.jpg" : "!160x160.jpg");
    }
    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = function(e) {
            return (e.price > 0 ? "¥" + e.price + "+" : "") + e.points_price + "积分";
        };
        return !t || t.points_price && e.points_price === t.points_price && e.price === t.price ? n(e) : n(t) + " ~ " + n(e);
    }
    function r(e) {
        var t = e;
        return [ t.s1, t.s2, t.s3 ].join("-");
    }
    function s(e) {
        var t, n = e.sku, a = e.quota, o = e.quotaUsed, i = e.stepper, s = 0;
        a = 0 == a ? 1 / 0 : Math.max(0, a - o);
        var c = n.mapList[r(e.selectedSKU)];
        return s = c ? +c.stock_num : +n.stock_num, i > (t = Math.min(s, a)) && (i = t), 
        {
            stepper: i,
            maxQuantity: t
        };
    }
    function c(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.tree, a = e.list, o = {}, i = 1; i <= n.length; i++) {
            var r = "s" + i;
            a.filter(function(e) {
                return !("s1" != r && t.s1 && e.s1 != t.s1 || "s2" != r && t.s2 && e.s2 != t.s2 || "s3" != r && t.s3 && e.s3 != t.s3);
            }).forEach(function(e) {
                var t = o[e[r]] || 0;
                o[e[r]] = +e.stock_num + t;
            });
        }
        return o;
    }
    function u(e, t) {
        var n = t.mapList[r(e)] || {};
        return e.price = n.price || null, e.originPrice = n.originPrice || null, e.points = n.points || null, 
        e.stockNum = n.stock_num || 0 == n.stock_num ? n.stock_num : null, e.skuId = n.id || null, 
        e;
    }
    var l = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, d = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, p = a(5), f = a(2), h = a(6), g = getApp();
    t.exports = {
        getDialogGoodsImage: o,
        recordSelectedSku: function(e) {
            var t = e.goods.sku, n = u(e.selectedSKU, t);
            return {
                selectedSKU: n,
                skuValueMap: c(t, n),
                stepperData: s({
                    selectedSKU: n,
                    sku: t,
                    quota: e.goods.goods.quota,
                    quotaUsed: e.goods.goods.quotaUsed,
                    stepper: 1
                })
            };
        },
        getOrderData: function(e) {
            var t = e.goods, n = e.stepperData, a = t.goods, o = t.sku, i = {};
            if (console.log("allData", e), p(t.messages, function(e) {
                i[e.name] = e.value;
            }), e.use_ump) {
                var s = e.activity.activity_id || 0, c = e.activity.type || 0;
                "groupOn" == c && (s = parseInt(s, 10), c = 4), "timelimitedDiscount" == c && (s = 0, 
                c = 0), "seckill" === c && (s = parseInt(e.activity.id, 10), c = 6), "buyPoints" !== e.btns[0] && "pointsGoods" !== c || (s = parseInt(s, 10), 
                c = 5);
            }
            var u = "object" === d(g.logger) && "function" == typeof g.logger.getGlobal ? g.logger.getGlobal() : {}, f = u.user || {}, m = u.context || {}, _ = l({}, m, {
                platform: "weapp",
                uuid: f.uuid,
                userId: f.li || ""
            }), v = {
                message: i,
                activityAlias: "",
                activityId: s || 0,
                activityType: c || 0,
                num: n.stepper,
                stockNum: 0,
                price: 0,
                skuId: null,
                skuName: [],
                alias: e.alias,
                goodsId: a.id,
                goodsName: a.title,
                kdtId: g.getKdtId(),
                bizTracePointExt: JSON.stringify(_)
            };
            if (o.none_sku) v.noneSku = !0, v.stockNum = o.stock_num, v.skuId = o.collection_id, 
            v.price = a.price.desc, v.pointsPrice = 5 === c && e.activity.points_price_range.max.points_price || 0; else {
                var y = o.mapList[r(e.selectedSKU)] || {};
                v.stockNum = y.stock_num, v.skuId = y.id, v.skuName = function(e, t) {
                    return [ "s1", "s2", "s3" ].reduce(function(n, a) {
                        var o = e[a];
                        if (0 != +o) {
                            var i = (t.find(function(e) {
                                return e.k_s === a;
                            }) || {
                                v: []
                            }).v.find(function(e) {
                                return +e.id == +o;
                            }) || {};
                            n.push(i.name);
                        }
                        return n;
                    }, []);
                }(e.selectedSKU, o.tree), v.price = y.price, v.pointsPrice = y.points_price;
            }
            return v.price = h(v.price).toCent(), v;
        },
        getSelectedSKUKey: r,
        parse: function(e) {
            var t = {}, n = e.components[0], a = e.brief, r = function(e, t, n) {
                var a = t.goods_preference;
                if (a && a.is_started && n) {
                    if (e.origin = e.price, e.price = a.show_price, e.min_price = (a.price_range.min || 0) + "", 
                    e.max_price = (a.price_range.max || 0) + "", a.points_price_range) {
                        var o = a.points_price_range, r = o.max, s = o.min;
                        e.points_price = i(r, s);
                    }
                    var c = Object.keys(a.skus || {});
                    e.list = e.list.filter(function(e) {
                        return -1 !== c.indexOf(e.id + "");
                    }), p(e.list, function(e) {
                        a.skus[e.id] && (e.price = a.skus[e.id].price, e.points_price = a.skus[e.id].points_price, 
                        e.points = i(a.skus[e.id]));
                    });
                }
                return e.mapList = {}, p(e.list, function(t) {
                    e.mapList[[ t.s1, t.s2, t.s3 ].join("-")] = t;
                }), e.mapTree = {}, p(e.tree, function(t) {
                    p(t.v, function(t) {
                        e.mapTree[t.id] = t;
                    });
                }), e;
            }(e.sku, e.activity, e.use_ump), l = n.messages || [];
            t.id = a.item_id, t.title = a.title, t.price = function(e) {
                return e.price += "", e.min_price += "", e.max_price += "", e.none_sku || e.min_price == e.max_price ? {
                    desc: e.price,
                    yuan: e.price.split(".")[0],
                    fen: e.price.split(".")[1],
                    isRange: !1
                } : {
                    desc: e.price,
                    isRange: !0,
                    min: {
                        desc: e.min_price,
                        yuan: e.min_price.split(".")[0],
                        fen: e.min_price.split(".")[1]
                    },
                    max: {
                        desc: e.max_price,
                        yuan: e.max_price.split(".")[0],
                        fen: e.max_price.split(".")[1]
                    }
                };
            }(r), t.quota = e.use_origin_quota ? +n.quota : +a.quota, t.quotaUsed = +a.quota_used, 
            t.presale = +a.presale;
            var d = a.presale_info;
            t.presale && d && (0 === d.etd_type ? t.presaleDesc = d.etd_start.replace(/-/g, ".") + "开始发货" : 1 === d.etd_type && (t.presaleDesc = "付款" + d.etd_days + "天后发货")), 
            !r.none_sku && r.origin ? t.origin = r.origin : t.origin = a.origin, t.originPicture = [], 
            p(a.picture, function(e) {
                t.originPicture.push(e.url);
            }), l = l.map(function(e) {
                return "image" === e.type && (e.uploading = !1, e.formatedUrl = ""), e.value = "", 
                e;
            });
            var f = function(e) {
                var t = {
                    s1: 0,
                    s2: 0,
                    s3: 0,
                    price: e.price || e.origin,
                    points: e.points_price,
                    stockNum: null,
                    skuId: null
                };
                return p(e.tree, function(e) {
                    e.v && 1 === e.v.length && (t[e.k_s] = e.v[0].id);
                }), t = u(t, e);
            }(r), h = function(e) {
                var t = {};
                return e.none_sku || p(e.tree[0].v, function(e) {
                    t[e.id] = e.imgUrl;
                }), t;
            }(r), g = e.activity.goods_preference || {}, m = e.use_ump;
            return "pointsGoods" === g.type && (t.quota = e.use_origin_quota ? t.quota : g.quota || 0, 
            t.quotaUsed = g.quota_used || 0), {
                goods: {
                    sku: r,
                    goods: t,
                    messages: l,
                    supportShoppingCart: 0 == a.is_virtual
                },
                use_ump: m,
                activity: g,
                selectedSKU: f,
                skuValueMap: c(r, f),
                skuImages: h,
                stepperData: s({
                    selectedSKU: f,
                    sku: r,
                    quota: t.quota,
                    quotaUsed: t.quotaUsed,
                    stepper: 1
                }),
                dialogGoodsImage: o(h, t, f),
                show_stock: 0 == n.hide_stock
            };
        },
        validateInput: function(e, t) {
            var n = {
                mobile: /^\d{6,20}$/,
                email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                tel: /^\d+$/,
                id_no: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            };
            return n[e] ? n[e].test(t) ? {
                success: !0
            } : {
                success: !1,
                msg: {
                    mobile: "手机号请填写6-20位的数字",
                    email: "请填写正确的邮箱",
                    tel: "请填写数字",
                    id_no: "请填写正确的身份证"
                }[e]
            } : {
                success: !0
            };
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = n(2), i = n(56);
    e.exports = {
        handleComponentSKUMessageValueChange: function(e) {
            var t = e.currentTarget.dataset.index, n = e.detail.value, a = this.data.componentSKU.goods.messages;
            a[t].value = n, console.log(n), this.setData({
                "componentSKU.goods.messages": a
            });
        },
        handleComponentSKUDateTimeMessageValueChange: function(e) {
            var t = e.detail.value, n = t.slice(0, 3), a = t.slice(3);
            e.detail.value = n.join("/") + " " + a.join(":"), this.handleComponentSKUMessageValueChange(e);
        },
        handleComponentSKUMessageUploadImageTap: function(e) {
            var t = this, n = e.currentTarget.dataset.index;
            wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    t.setData(a({}, "componentSKU.goods.messages[" + n + "].uploading", !0)), i({
                        file: e.tempFilePaths[0],
                        success: function(e) {
                            var i, r = e.attachment_url;
                            t.setData((a(i = {}, "componentSKU.goods.messages[" + n + "].value", o(r)), a(i, "componentSKU.goods.messages[" + n + "].formatedValue", o(r, "!120x120.jpg")), 
                            a(i, "componentSKU.goods.messages[" + n + "].uploading", !1), i));
                        },
                        fail: function(e) {
                            t.showZanToast(e.msg), t.setData(a({}, "componentSKU.goods.messages[" + n + "].uploading", !1));
                        }
                    });
                },
                fail: function() {
                    t.showZanToast("选择图片失败");
                }
            });
        }
    };
}, function(e, t, n) {
    var a = getApp(), o = !1;
    e.exports = {
        getSkuData: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return new Promise(function(n, i) {
                o && t || (o = !0, a.carmen({
                    api: "weapp.wsc.item.detail/1.0.0/get",
                    query: {
                        alias: e,
                        fans_type: a.getFansType()
                    },
                    success: function(e) {
                        o = !1, n(e);
                    },
                    fail: function(e) {
                        o = !1, i(e.msg || "获取商品信息失败");
                    }
                }));
            });
        }
    };
}, function(e, t, n) {
    e.exports = {
        themes: [ "default", "takeAway", "convenienceStore", "feature" ]
    };
}, function(e, t, n) {
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(11), i = o.parsePrice, r = o.parseTime;
    e.exports = {
        type: "content",
        data: function(e) {
            return {
                itemType: "content",
                title: e.title || "",
                showTitle: !!e.show_title,
                list: e.sub_entry.map(function(e) {
                    return a({}, e, {
                        price: i(e.price),
                        subCount: +e.subscriptions_count,
                        mediaType: +e.media_type,
                        time: r(e.publish_at, !0),
                        isFree: Boolean(e.is_free && e.column_alias)
                    });
                })
            };
        },
        goToAllContent: function() {
            wx.navigateTo({
                url: "/packages/paidcontent/list/index?type=content"
            });
        }
    };
}, function(e, t, n) {
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(11).parsePrice;
    e.exports = {
        type: "column",
        data: function(e) {
            return {
                itemType: "column",
                title: e.title || "",
                showTitle: !!e.show_title,
                list: e.sub_entry.map(function(e) {
                    return a({}, e, {
                        price: o(e.price),
                        count: +e.contents_count,
                        subCount: +e.subscriptions_count
                    });
                })
            };
        },
        goToAllColumn: function() {
            wx.navigateTo({
                url: "/packages/paidcontent/list/index?type=column"
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(19);
    t.default = function(e) {
        var t = e.size, n = void 0 === t ? "0" : t, i = e.buy_btn_type, r = void 0 === i ? "1" : i, s = e.show_title, c = void 0 === s ? "1" : s, u = e.show_buy_btn, l = void 0 === u ? "1" : u, d = e.show_count_down, p = void 0 === d ? "1" : d, f = e.show_stock_num, h = void 0 === f ? "1" : f, g = e.image_fill_style, m = void 0 === g ? "2" : g, _ = e.ratio, v = void 0 === _ ? "1,1" : _, y = e.hide_goods_end, b = void 0 === y ? "1" : y, w = e.hide_goods_sold, x = void 0 === w ? "1" : w, S = e.goods_end_type, T = void 0 === S ? "1" : S, k = e.activity_id, D = e.activity_ids, C = function(e, t) {
            var n = {};
            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
            return n;
        }(e, [ "size", "buy_btn_type", "show_title", "show_buy_btn", "show_count_down", "show_stock_num", "image_fill_style", "ratio", "hide_goods_end", "hide_goods_sold", "goods_end_type", "activity_id", "activity_ids" ]), A = C.goods || [];
        return A = (0, o.isNumber)(k) ? [ {
            id: k,
            thumb_url: C.image_url,
            image_url: C.image_url,
            title: C.goods_title,
            activity_price: 5999,
            goods_price: 7999
        } ] : A.map(function(e) {
            var t = e.thumb_url || e.image_url, n = e.total_current_stock || e.current_stock, o = e.seckill_sku_price || e.activity_price, i = e.goods_sku_price || e.goods_price;
            return a({}, e, {
                thumb_url: t,
                current_stock: n,
                activity_price: o,
                goods_price: i
            });
        }), !D && k && (D = [ k ]), a({}, C, {
            activity_ids: D,
            goods: A,
            size: n,
            buy_btn_type: r,
            show_buy_btn: l,
            show_title: c,
            show_count_down: p,
            show_stock_num: h,
            image_fill_style: m,
            ratio: v,
            hide_goods_end: b,
            hide_goods_sold: x,
            goods_end_type: T
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ACTIVITY_STATUS = {
        notStart: 0,
        started: 1,
        ended: 2
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(19), i = n(252), r = function(e) {
        return (0, o.isString)(e) ? 100 * +e : e;
    }, s = function(e) {
        return (0, o.isString)(e) ? +new Date(e) : 1e3 * e;
    };
    t.default = function(e) {
        var t = e.type, n = e.goods, c = void 0 === n ? [] : n, u = e.size, l = void 0 === u ? "0" : u, d = e.buy_btn_type, p = void 0 === d ? "1" : d, f = e.show_title, h = void 0 === f ? "1" : f, g = e.show_buy_btn, m = void 0 === g ? "1" : g, _ = e.show_count_down, v = void 0 === _ ? "1" : _, y = e.show_stock_num, b = void 0 === y ? "1" : y, w = e.image_fill_style, x = void 0 === w ? "2" : w, S = e.ratio, T = void 0 === S ? "1,1" : S;
        return {
            type: t,
            size: +l,
            buyBtnType: +p,
            showTitle: +h,
            showBuyBtn: +m,
            showCountDown: +v,
            showStockNum: +b,
            imageFillStyle: +x,
            isPreview: e.is_preview,
            ratio: T,
            goodsList: c.map(function(e) {
                var t = (0, o.mapKeysToCamelCase)(e), n = t.status, c = t.beginAt, u = t.endAt, l = t.current, d = t.activityPrice, p = t.goodsPrice, f = n, h = l ? 1e3 * l : Date.now(), g = s(c);
                return u = s(u), d = r(d), p = r(p), (0, o.isUndefined)(f) && (f = h < g ? i.ACTIVITY_STATUS.notStart : h >= g && h < u ? i.ACTIVITY_STATUS.started : i.ACTIVITY_STATUS.ended), 
                a({}, t, {
                    startAt: g,
                    endAt: u,
                    activityPrice: d,
                    goodsPrice: p,
                    activityStatus: f
                });
            })
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(253)), i = a(n(251));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    e.exports = {
        SIZE: {
            BIG: 0,
            SMALL: 1,
            LIST: 2
        },
        SIZE_MAP: {
            0: "big",
            1: "small",
            2: "list"
        },
        DISCOUNT_TYPE: {
            DISCOUNT: 2,
            AMOUNT: 3
        },
        ACTIVITY_STATUS: {
            NOT_START: 0,
            START: 1,
            END: 2
        },
        ACTIVITY_STATUS_MAP: {
            0: "NOT_START",
            1: "START",
            2: "END"
        },
        TIME_SEPARATOR: [ "天", "时", "分", "秒" ],
        IMAGE_FILL_STYLE: {
            COVER: 1,
            CONTAIN: 2
        }
    };
}, function(t, n, a) {
    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function i(e) {
        var t = e._size, n = e._isEnd, a = e._isNotStart, o = e._hasStock;
        return t === l.SIZE.LIST && a && !n && o;
    }
    function r(e) {
        var t = e._size, n = e._leftDay;
        return e._isNotStart ? "距开秒还有" : t === l.SIZE.LIST ? n ? "" : "仅剩" : t === l.SIZE.SMALL && n ? "仅剩" : "距结束仅剩";
    }
    var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, c = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, u = function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [], a = !0, o = !1, i = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                !t || n.length !== t); a = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }, l = a(255), d = o(a(15)), p = o(a(2)), f = o(a(254)).default.new2captain, h = getApp(), g = function(e) {
        var t = e.size, n = e.ratio, a = e.showStockNum, o = e.imageFillStyle;
        return function(e) {
            var s, c, d, f, h, g, m = e.status, _ = t === l.SIZE.BIG ? "!730x0.jpg" : "!320x0.jpg";
            return e.thumbUrl = (0, p.default)(e.thumbUrl, _), e._isCover = (s = o, l.IMAGE_FILL_STYLE.COVER === s), 
            e._size = +t, e._ratio = n, e._showStockNum = a, e._isNotStart = m === l.ACTIVITY_STATUS.NOT_START, 
            e._isEnd = m === l.ACTIVITY_STATUS.END, e._hasStock = e.currentStock > 0, e._price = function(e) {
                var t = (e.activityPrice / 100).toFixed(2).match(/(\d+)(\.\d+)/), n = u(t, 3);
                return {
                    yuan: n[1],
                    cent: n[2]
                };
            }(e), e._originPrice = (c = e.goodsPrice, Number(c / 100).toFixed(2)), e._discount = function(e) {
                var t = e.goodsPrice, n = e.activityPrice;
                return Number((t - n) / 100).toFixed(2);
            }(e), e._countdownText = r(e), e._isShowCountdown = (f = (d = e)._size, h = d._isEnd, 
            g = d._hasStock, !i({
                _size: f,
                _isEnd: h,
                _hasStock: g,
                _isNotStart: d._isNotStart
            }) && (f === l.SIZE.BIG || g && !h && f !== l.SIZE.BIG)), e._isShowMicroCountdown = i(e), 
            e._isShowMicroStockNum = function(e) {
                var t = e._size, n = e._showStockNum;
                return t === l.SIZE.SMALL && !!n;
            }(e), e._isShowActivityTag = e._size === l.SIZE.BIG, e._limitText = e._isNotStart ? "限量" : "仅剩", 
            e._btnText = function(e) {
                var t = e.isCheckRight, n = e._isEnd, a = e._isNotStart, o = e._hasStock;
                return n || !o ? "去看看" : a ? t ? "马上预约" : "即将开秒" : "马上秒";
            }(e), e._imgWrapStyle = function(e) {
                var t = e._size, n = e._ratio, a = void 0;
                if (t !== l.SIZE.BIG) a = "100%"; else {
                    var o = n.split(","), i = u(o, 2), r = i[0];
                    a = +i[1] / +r * 100 + "%";
                }
                return "padding-top: " + a;
            }(e), e._countdown = e._countdown || {
                day: "00",
                hour: "00",
                minute: "00",
                second: "00"
            }, e._leftDay = e._leftDay || !0, e;
        };
    };
    t.exports = {
        type: "ump_seckill",
        data: function(e, t) {
            var n = f(e), a = n.size;
            return this._umpSeckillfetchGoodsDetail(e, t), this._umpSeckillDataList.push({
                data: e,
                compIndex: t
            }), c({}, n, {
                _timeSeparator: l.TIME_SEPARATOR,
                _sizeName: l.SIZE_MAP[a],
                _originPriceText: a === l.SIZE.BIG ? "" : "活动结束价",
                _priceText: a === l.SIZE.BIG ? "秒杀价：" : "秒杀价",
                goodsList: []
            });
        },
        _umpSeckillDataList: [],
        _umpSeckillCounterList: [],
        onShow: function() {
            var e = this;
            !this.__featureFirstLoad && this._umpSeckillDataList.forEach(function(t) {
                e._umpSeckillfetchGoodsDetail(t.data, t.compIndex);
            });
        },
        onHide: function() {
            this._umpSeckillClearTimeout();
        },
        onPullDownRefresh: function() {
            this._umpSeckillDataList = [], this._umpSeckillClearTimeout();
        },
        onUnload: function() {
            this._umpSeckillDataList = [];
        },
        _umpSeckillClearTimeout: function() {
            for (var e = this._umpSeckillCounterList.length - 1; e >= 0; e--) {
                var t = this._umpSeckillCounterList[e];
                t && "object" === (void 0 === t ? "undefined" : s(t)) && "function" == typeof t.stop && (t.stop(), 
                this._umpSeckillCounterList.splice(e, 1));
            }
        },
        _umpSeckillfetchGoodsDetail: function(e, t) {
            var n = this;
            h.carmen({
                api: "youzan.ump.seckill.feature/1.0.0/gets",
                query: {
                    seckill_ids: (e.activity_ids || []).join(","),
                    kdt_id: h.getKdtId(),
                    hide_goods_sold: +e.hide_goods_sold,
                    hide_goods_end: +e.hide_goods_end,
                    goods_end_type: +e.goods_end_type
                },
                success: function(a) {
                    n._umpSeckillSetGoodsDetail({
                        list: a,
                        originData: e,
                        compIndex: t
                    });
                },
                fail: function(e) {
                    console.warn("获取秒杀商品列表详情失败：", e), n._umpSeckillUpdateGoodsList(t, []);
                }
            });
        },
        _umpSeckillSetGoodsDetail: function(e) {
            var t = this, n = e.list, a = e.originData, o = e.compIndex, i = f(Object.assign({}, a, {
                goods: n
            })), r = i.goodsList, s = i.size, u = i.ratio, p = i.showStockNum, h = i.imageFillStyle, m = g({
                size: s,
                ratio: u,
                showStockNum: p,
                imageFillStyle: h
            });
            this._umpSeckillUpdateGoodsList(o, r.map(m));
            var _ = r.map(function(e) {
                var t = e.remainTime, n = e.startTime, a = e.activityStatus;
                return a === l.ACTIVITY_STATUS.NOT_START ? 1e3 * n : a === l.ACTIVITY_STATUS.END ? 0 : 1e3 * t;
            }), v = new d.default(_, {
                timeout: 1e3,
                onChange: function(e, n) {
                    t._umpSeckillCountdownUpdateList({
                        strDataList: n,
                        compIndex: o
                    });
                },
                onEnd: function(e) {
                    var n = r[e];
                    if (n.status === l.ACTIVITY_STATUS.NOT_START) {
                        var a = n.endAt - Date.now(), i = [].slice.call(t.data.theme.feature[o].goodsList || []);
                        i[e] = m(c({}, n, {
                            status: l.ACTIVITY_STATUS.START
                        })), t._umpSeckillUpdateGoodsList(o, i);
                        var s = new d.default(a, {
                            onChange: function(n, a) {
                                t._umpSeckillCountdownUpdate({
                                    strData: a,
                                    index: e,
                                    compIndex: o
                                });
                            }
                        });
                        t._umpSeckillCounterList.push(s);
                    } else {
                        var u = [].slice.call(t.data.theme.feature[o].goodsList || []);
                        u[e] = m(c({}, n, {
                            status: l.ACTIVITY_STATUS.END
                        })), t._umpSeckillUpdateGoodsList(o, u);
                    }
                }
            });
            this._umpSeckillCounterList.push(v);
        },
        _umpSeckillCountdownUpdate: function(e) {
            var t = e.strData, n = e.index, a = e.compIndex, o = this.data.theme.feature[a].goodsList || [];
            o[n] = this._umpSeckillGetCountdownData(o[n], t), this._umpSeckillUpdateGoodsList(a, o);
        },
        _umpSeckillCountdownUpdateList: function(e) {
            var t = this, n = e.strDataList, a = e.compIndex, o = this.data.theme.feature[a].goodsList || [];
            this._umpSeckillUpdateGoodsList(a, o.map(function(e, a) {
                return t._umpSeckillGetCountdownData(e, n[a]);
            }));
        },
        _umpSeckillUpdateGoodsList: function(e, t) {
            var n, a, o;
            this.setData((o = t, (a = "theme.feature[" + e + "].goodsList") in (n = {}) ? Object.defineProperty(n, a, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : n[a] = o, n));
        },
        _umpSeckillGetCountdownData: function(e, t) {
            var n = t || {}, a = n.day, o = void 0 === a ? "00" : a, i = n.hour, s = void 0 === i ? "00" : i, c = n.minute, u = void 0 === c ? "00" : c, l = n.second, d = void 0 === l ? "00" : l;
            return e._countdown = {
                day: o,
                hour: s,
                minute: u,
                second: d
            }, e._leftDay = o, e._countdownText = r(e), e;
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e) {
        return e < 10 ? "0" + e : "" + e;
    }
    function i(e) {
        var t = parseInt(e / 60, 10), n = parseInt(e % 60, 10);
        return o(t) + ":" + o(n);
    }
    var r = n(57);
    e.exports = {
        type: "audio",
        onHide: function() {},
        onUnload: function() {
            this.audio__clearAudios();
        },
        onPullDownRefresh: function() {
            this.audio__clearAudios();
        },
        audio__indexList: [],
        audio__durationMap: {},
        audio__currentTimeMap: {},
        audio__backgroundAudio: "",
        audio__currentId: "",
        data: function(e, t) {
            var n = this, o = e.audio, i = e.bubble, s = e.style, c = e.avatar, u = e.title, l = e.loop, d = e.reload, p = e.teamLogo, f = 0 == +s, h = "https://b.yzcdn.cn/v2/image/wap/audio/" + ("left" === i ? "player" : "green_player") + ".gif", g = c || p;
            return r.getAudioInfo(o).then(function(e) {
                var o = e.url;
                n.setData(a({}, "theme.feature[" + t + "].src", o));
            }), this.audio__indexList.push(t), {
                index: t,
                isWeixinStyle: f,
                title: u,
                loadingIcon: "https://b.yzcdn.cn/v2/image/wap/common/loading.gif",
                playerImg: h,
                logo: g,
                bubble: i,
                src: "",
                percentage: 0,
                loop: 1 == +l,
                reload: 1 == +d,
                status: 0,
                isLoaded: !1,
                isLoading: !1,
                currentTime: 0,
                formatedCurrentTime: "00:00",
                formatedDuration: "00:00",
                canPlay: !1
            };
        },
        audio__clearAudios: function() {
            this.audio__backgroundAudio && (this.audio__backgroundAudio.stop(), this.audio__backgroundAudio = void 0), 
            this.audio__indexList = [], this.audio__currentId = "", this.audio__currentTimeMap = {}, 
            this.audio__durationMap = {};
        },
        audio__updateProgress: function(e) {
            var t = e.currentTarget.dataset.index, n = e.detail;
            if (t === this.audio__currentId) {
                var a = this.audio__backgroundAudio;
                if (!a) return;
                a.seek(parseInt(a.duration * n / 100, 10));
            }
        },
        audio__resetProgress: function(e) {
            var t;
            this.setData((a(t = {}, "theme.feature[" + e + "].status", 0), a(t, "theme.feature[" + e + "].formatedCurrentTime", "00:00"), 
            a(t, "theme.feature[" + e + "].currentTime", 0), a(t, "theme.feature[" + e + "].percentage", 0), 
            t));
        },
        audio__initBackgroundAudio: function() {
            var e = this;
            this.audio__backgroundAudio = wx.getBackgroundAudioManager();
            var t = this.audio__backgroundAudio;
            return t.onPlay(function() {
                e.audio__currentId && e.setData(a({}, "theme.feature[" + e.audio__currentId + "].status", 1));
            }), t.onPause(function() {
                e.audio__currentId && e.setData(a({}, "theme.feature[" + e.audio__currentId + "].status", 2));
            }), t.onStop(function() {
                e.audio__currentId && e.setData(a({}, "theme.feature[" + e.audio__currentId + "].status", 0));
            }), t.onEnded(function() {
                e.audio__currentId && e.audio__resetProgress(e.audio__currentId);
            }), t.onTimeUpdate(function() {
                var n;
                if (e.audio__currentId) {
                    if (e.audio__currentTimeMap[e.audio__currentId]) return t.seek(e.audio__currentTimeMap[e.audio__currentId]), 
                    void (e.audio__currentTimeMap[e.audio__currentId] = 0);
                    var o = t.currentTime, r = t.duration, s = (a(n = {}, "theme.feature[" + e.audio__currentId + "].formatedCurrentTime", i(o)), 
                    a(n, "theme.feature[" + e.audio__currentId + "].currentTime", o), a(n, "theme.feature[" + e.audio__currentId + "].percentage", o / r * 100), 
                    a(n, "theme.feature[" + e.audio__currentId + "].isLoading", !1), a(n, "theme.feature[" + e.audio__currentId + "].isLoaded", !0), 
                    n);
                    e.audio__durationMap[e.audio__currentId] || (e.audio__durationMap[e.audio__currentId] = r, 
                    s["theme.feature[" + e.audio__currentId + "].formatedDuration"] = i(r), s["theme.feature[" + e.audio__currentId + "].canPlay"] = !0), 
                    e.setData(s);
                }
            }), t.onCanplay(function() {
                var t;
                e.audio__currentId && e.setData((a(t = {}, "theme.feature[" + e.audio__currentId + "].canPlay", !0), 
                a(t, "theme.feature[" + e.audio__currentId + "].isLoading", !1), t));
            }), t.onPrev(function() {
                var t = e.audio__currentId;
                e.audio__triggerPrev(), e.audio__resetProgress(t);
            }), t.onNext(function() {
                var t = e.audio__currentId;
                e.audio__triggerNext(), e.audio__resetProgress(t);
            }), t.onWaiting(function() {
                e.audio__currentId && e.setData(a({}, "theme.feature[" + e.audio__currentId + "].isLoading", !0));
            }), t;
        },
        audio__setBackgroundAudioInfo: function(e) {
            if (this.audio__backgroundAudio) {
                var t = this.data.theme.feature[e] || {}, n = this.audio__backgroundAudio;
                n.title = t.title || " ", n.coverImgUrl = t.logo, n.loop = t.loop, n.epname = " ", 
                n.singer = " ", n.src = t.src;
            }
        },
        audio__triggerNext: function() {
            var e = this.audio__indexList.length;
            if (!(e <= 1)) {
                var t = this.audio__indexList.indexOf(this.audio__currentId);
                this.audio__triggerWithIndex((t + 1) % e);
            }
        },
        audio__triggerPrev: function() {
            var e = this.audio__indexList.length;
            if (!(e <= 1)) {
                var t = this.audio__indexList.indexOf(this.audio__currentId);
                this.audio__triggerWithIndex((t + e - 1) % e);
            }
        },
        audio__triggerWithIndex: function(e) {
            var t = this.audio__indexList[e];
            this.audio__currentTimeMap[t] = 0, this.audio__currentId = t, this.audio__setBackgroundAudioInfo(t);
        },
        audio__trigger: function(e) {
            var t = e.currentTarget.dataset, n = t.src, o = t.index, i = t.reload;
            if (n) {
                var r = (this.data.theme.feature[o] || {}).status, s = !1, c = this.audio__backgroundAudio;
                c && !this.audio__backgroundChanged || (s = !0, this.audio__currentId = o, c = this.audio__initBackgroundAudio()), 
                o !== this.audio__currentId && ("" !== this.audio__currentId && (this.audio__currentTimeMap[this.audio__currentId] = this.audio__backgroundAudio.currentTime, 
                this.audio__backgroundAudio.pause(), this.setData(a({}, "theme.feature[" + this.audio__currentId + "].status", 2))), 
                s = !0), 1 !== r ? s ? (this.audio__setBackgroundAudioInfo(o), this.audio__currentId = o) : c.play() : i ? (c.stop(), 
                this.audio__resetProgress(o), this.audio__backgroundAudio = "") : c.pause();
            }
        }
    };
}, function(e, t, n) {
    var a = n(3), o = getApp();
    e.exports = {
        type: "unicashier",
        data: function(e) {
            return {
                qrcodeId: e.qrcodeId,
                activity: ""
            };
        },
        beforeUpdate: function(e, t) {
            var n = this;
            o.carmen({
                api: "youzan.ump.scanreduce.byqrcode/1.0.0/get",
                data: {
                    qrcode_id: e.qrcodeId
                },
                success: function(e) {
                    var a, o, i;
                    n.setData((a = {}, o = "theme.feature[" + t + "].activity", i = e.desc, o in a ? Object.defineProperty(a, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : a[o] = i, a));
                }
            });
        },
        unicashier__handleClick: function(e) {
            var t = (e.currentTarget.dataset || {}).id;
            a.navigate({
                url: "/pages/pay/unicashier/index?qrcode_id=" + t
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SIZE_MAP = {
        0: "big",
        1: "small",
        2: "list"
    }, t.IMG_SIZE_MAP = {
        0: "!730x0.jpg",
        1: "!520x0.jpg",
        2: "!290x0.jpg"
    }, t.ACTIVITY_STATUS_MAP = {
        0: "notStart",
        1: "start",
        2: "end"
    }, t.SIZE = {
        big: 0,
        small: 1,
        list: 2
    }, t.DISCOUNT_TYPE = {
        discount: 2,
        amount: 3
    }, t.ACTIVITY_STATUS = {
        notStart: 0,
        start: 1,
        end: 2
    }, t.IMAGE_STYLE = {
        cover: 1,
        contain: 2
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    n(58), t.default = function(e) {
        var t = e.image_fill_style, n = e.goods, o = void 0 === n ? [] : n, i = e.size, r = void 0 === i ? "0" : i, s = e.buy_btn_type, c = void 0 === s ? "0" : s, u = e.show_title, l = void 0 === u ? "1" : u, d = e.show_count_down, p = void 0 === d ? "1" : d, f = e.show_time_limit, h = void 0 === f ? "1" : f, g = e.show_stock_num, m = void 0 === g ? "1" : g, _ = e.show_buy_btn, v = void 0 === _ ? "1" : _, y = e.ratio, b = void 0 === y ? "1,1" : y, w = function(e, t) {
            var n = {};
            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
            return n;
        }(e, [ "image_fill_style", "goods", "size", "buy_btn_type", "show_title", "show_count_down", "show_time_limit", "show_stock_num", "show_buy_btn", "ratio" ]);
        o = o.map(function(e) {
            return e.price ? e : a({}, e, {
                discount_type: 3,
                discount_price: "59.99",
                price: "79.99",
                discount_value: 2e3,
                total_sold_num: 0,
                stock_num: 0
            });
        });
        var x = w.activity ? w.activity : {
            id: w.activity_id,
            name: w.title
        };
        return a({}, w, {
            activity: x,
            goods: o,
            size: r,
            buy_btn_type: c,
            show_title: l,
            show_count_down: p,
            show_time_limit: h,
            show_stock_num: m,
            show_buy_btn: v,
            image_fill_style: t,
            ratio: b
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(19), i = n(58);
    t.default = function(e) {
        var t = e.type, n = e.goods, r = void 0 === n ? [] : n, s = e.size, c = void 0 === s ? "0" : s, u = e.buy_btn_type, l = void 0 === u ? "1" : u, d = e.show_title, p = void 0 === d ? "1" : d, f = e.show_count_down, h = void 0 === f ? "1" : f, g = e.show_time_limit, m = void 0 === g ? "1" : g, _ = e.show_stock_num, v = void 0 === _ ? "1" : _, y = e.show_buy_btn, b = void 0 === y ? "1" : y, w = e.image_fill_style, x = void 0 === w ? "2" : w, S = e.ratio, T = void 0 === S ? "1,1" : S, k = e.is_preview, D = e.is_start, C = e.is_expired, A = r.map(function(e) {
            var t = (0, o.mapKeysToCamelCase)(e);
            return a({}, t, {
                startAt: 1e3 * t.startAt,
                endAt: 1e3 * t.endAt
            });
        }), I = e.activity_status;
        return (0, o.isUndefined)(I) && (I = D || C ? C ? i.ActivityStatus.ended : i.ActivityStatus.started : i.ActivityStatus.notStart), 
        {
            type: t,
            size: +c,
            buyBtnType: +l,
            showTitle: +p,
            showTimeLimit: +m,
            showCountdown: +h,
            showStockNum: +v,
            showBuyBtn: +b,
            imageFillStyle: +x,
            isPreview: k,
            activityStatus: I,
            ratio: T,
            goodsList: A
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(261)), i = a(n(260));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, i = function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [], a = !0, o = !1, i = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                !t || n.length !== t); a = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }, r = n(262).default, s = n(11).getRedirectData, c = n(2), u = n(15), l = n(259), d = l.SIZE, p = l.DISCOUNT_TYPE, f = l.ACTIVITY_STATUS, h = l.SIZE_MAP, g = l.IMG_SIZE_MAP, m = l.IMAGE_STYLE, _ = r.new2captain, v = function(e) {
        var t = e.isNotStart, n = e.isEnd, a = e.size, o = e.ratio, r = e.showCountDown, u = e.showStockNum, l = e.showTimeLimit;
        return function(e) {
            return e.map(function(e) {
                var f, h, m, _, v, y, b, w, x, S, T, k = e.stockNum > 0;
                return e.hasStock = k, e.showMask = !k || n, e.isShowMicroCountdown = r && a === d.list && t, 
                e.isShowCountdown = r && !e.isShowMicroCountdown && (a === d.big || k && !n && a !== d.big), 
                e.isShowActivityTag = a === d.big, e.isShowSalesDetail = a !== d.small && !t && !n && k && l, 
                e.isShowStockNum = u && a === d.small, e.goodsClass = (h = "cap-ump-limitdiscount-goods", 
                (f = {
                    hasStock: k,
                    isEnd: n,
                    isNotStart: t
                }).hasStock || (h += " cap-ump-limitdiscount-goods--soldout"), f.isEnd && (h += " cap-ump-limitdiscount-goods--end"), 
                f.isNotStart && (h += " cap-ump-limitdiscount-goods--not-start"), h), e.url = s("goods", {
                    alias: e.alias
                }).url, e.imageUrl = function(e) {
                    var t = e.imageUrl, n = e.size, a = g[n] || "!730x0.jpg";
                    return c(t, a);
                }(e), e.paddingTop = function(e) {
                    var t = e.size, n = e.ratio, a = void 0;
                    if (t !== d.big) a = "100%"; else {
                        var o = n.split(","), r = i(o, 2), s = r[0];
                        a = +r[1] / +s * 100 + "%";
                    }
                    return a;
                }({
                    size: a,
                    ratio: o
                }), e.activityPriceObj = (m = e.discountPrice, _ = String(m).match(/(\d+)(\.\d+)/), 
                {
                    yuan: (v = i(_, 3))[1],
                    cent: v[2]
                }), e.discount = (b = (y = e).discountType, w = y.discountValue, +b === p.discount ? w + "折" : +b === p.amount ? "减" + w + "元" : void 0), 
                e.salePercent = (S = (x = e).totalSoldNum, T = x.stockNum, Math.ceil(S / (S + T) * 100)), 
                e.btnText = function(e) {
                    var t = e.isNotStart, n = e.isEnd, a = e.hasStock;
                    return t ? "即将开抢" : n || !a ? "去看看" : "立即抢购";
                }({
                    isNotStart: t,
                    isEnd: n,
                    hasStock: k
                }), e;
            });
        };
    };
    e.exports = {
        type: "ump_limitdiscount",
        _umpLimitDiscountInited: !1,
        _umpLimitDiscountCountdown: null,
        _umpLimitDiscountCountdownDataArr: [],
        _umpLimitDiscountCountdownRemains: [],
        data: function(e, t) {
            var n, a = _(e), i = a.goodsList, r = a.size, s = a.buyBtnType, c = a.ratio, u = a.activityStatus, l = a.showCountdown, d = a.showStockNum, p = a.showTimeLimit, g = a.imageFillStyle, y = function(e, t) {
                var n = {};
                for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
                return n;
            }(a, [ "goodsList", "size", "buyBtnType", "ratio", "activityStatus", "showCountdown", "showStockNum", "showTimeLimit", "imageFillStyle" ]), b = u === f.notStart, w = u === f.end, x = [ "cap-ump-limitdiscount", "cap-ump-limitdiscount--" + (n = {
                sizeType: h[r],
                buyBtnType: s
            }).sizeType, "cap-ump-limitdiscount--btn-" + n.buyBtnType ].join(" ");
            if (i.length) {
                var S = i[0].startAt, T = i[0].endAt, k = this.ump_limitdiscount__getRemain({
                    startAt: S,
                    endAt: T,
                    isNotStart: b,
                    isEnd: w
                });
                k && (this._umpLimitDiscountCountdownRemains.push(k), this._umpLimitDiscountCountdownDataArr.push({
                    featureIndex: t,
                    startAt: S,
                    endAt: T,
                    isNotStart: b,
                    isEnd: w,
                    size: r
                }));
            }
            var D = v({
                isNotStart: b,
                isEnd: w,
                size: r,
                ratio: c,
                showCountDown: l,
                showStockNum: d,
                showTimeLimit: p
            })(i);
            return o({}, y, {
                size: r,
                ratio: c,
                buyBtnType: s,
                showStockNum: d,
                fillImage: g === m.cover,
                containerClass: x,
                countdownText: "",
                countdown: {},
                showCountDownTemp: !1,
                goodsList: D
            });
        },
        beforeUpdate: function() {
            var e = this;
            this._umpLimitDiscountInited || 0 !== this._umpLimitDiscountCountdownRemains.length && (this._umpLimitDiscountInited = !0, 
            setTimeout(function() {
                e.ump_limitdiscount__runCountdown();
            }, 500));
        },
        onShow: function() {
            var e = this;
            this.__featureFirstLoad || (this._umpLimitDiscountCountdownRemains = this._umpLimitDiscountCountdownDataArr.map(function(t) {
                return e.ump_limitdiscount__getRemain(t);
            }), this.ump_limitdiscount__runCountdown());
        },
        onHide: function() {
            this._umpLimitDiscountCountdown && this._umpLimitDiscountCountdown.stop();
        },
        onUnload: function() {
            this.ump_limitdiscount__clearTimeoutList();
        },
        onPullDownRefresh: function() {
            this.ump_limitdiscount__clearTimeoutList();
        },
        ump_limitdiscount__getRemain: function(e) {
            var t = e.startAt, n = e.endAt, a = e.isNotStart, o = e.isEnd;
            return a ? t - new Date() : o ? 0 : n - new Date();
        },
        ump_limitdiscount__runCountdown: function() {
            var e = this;
            this._umpLimitDiscountCountdown = new u(this._umpLimitDiscountCountdownRemains, {
                timeout: 1e3,
                onChange: function(t, n) {
                    e.ump_limitdiscount__handleTimeChange(n);
                }
            });
        },
        ump_limitdiscount__clearTimeoutList: function() {
            this._umpLimitDiscountCountdown && this._umpLimitDiscountCountdown.stop(), this._umpLimitDiscountInited = !1, 
            this._umpLimitDiscountCountdownRemains = [], this._umpLimitDiscountCountdownDataArr = [];
        },
        ump_limitdiscount__handleTimeChange: function(e) {
            var t = this, n = e.reduce(function(e, n, a) {
                return o({}, e, t.ump_limitdiscount__getCountdownUpdateData(o({}, t._umpLimitDiscountCountdownDataArr[a], {
                    strData: n
                })));
            }, {});
            this.setData(n);
        },
        ump_limitdiscount__getCountdownUpdateData: function(e) {
            var t, n = e.strData, o = e.featureIndex, i = e.isNotStart, r = e.isEnd, s = e.size, c = n.day, u = n.hour, l = n.minute, p = n.second, f = "theme.feature[" + o + "]", h = function(e) {
                var t = e.isNotStart, n = e.isEnd, a = e.size, o = e.leftDay, i = "";
                return t ? i = "距开抢还剩：" : n || (i = [ d.list, d.small ].indexOf(a) > -1 ? 0 === o ? "仅剩" : "" : "距结束仅剩："), 
                i;
            }({
                isNotStart: i,
                isEnd: r,
                size: s,
                leftDay: +c
            });
            return a(t = {}, f + ".showCountDownTemp", !0), a(t, f + ".countdownText", h), a(t, f + ".countdown", {
                day: c,
                hour: u,
                minute: l,
                second: p
            }), t;
        }
    };
}, function(e, t, n) {
    var a = n(11).getRedirectData;
    e.exports = {
        type: "link",
        data: function(e) {
            return {
                links: function(e) {
                    return (e.link_arr || []).filter(function(e) {
                        var t = e.link_type;
                        return [ "goods", "feature" ].indexOf(t) >= 0;
                    }).map(function(e) {
                        var t = "";
                        return t = e.alias || "feature" !== e.link_type ? a(e.link_type, e).url : "/pages/home/feature/index?alias=" + e.link_url.replace(/.*\?alias=(.*)/, "$1"), 
                        {
                            linkTitle: e.link_title,
                            linkUrl: t
                        };
                    });
                }(e)
            };
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o, i, r = n(11).jumpToLink, s = (a(o = {}, 0, "tradition"), a(o, 1, "weixin"), 
    o), c = (a(i = {}, 0, "left"), a(i, 1, "center"), a(i, 2, "right"), i), u = function(e) {
        return e;
    }, l = function(e) {
        var t = e.title_template, n = void 0 === t ? 0 : t, a = e.title, o = void 0 === a ? "" : a, i = e.sub_title, r = void 0 === i ? "" : i, u = e.show_method, l = void 0 === u ? 0 : u, d = e.color, p = void 0 === d ? "#fff" : d, f = e.wx_title_date, h = void 0 === f ? "" : f, g = e.wx_title_link, m = void 0 === g ? "" : g, _ = e.wx_title_author, v = void 0 === _ ? "" : _, y = e.wx_link, b = void 0 === y ? {} : y, w = e.sub_entry, x = (void 0 === w ? [ {} ] : w)[0] || {}, S = "";
        return (1 == +n || [ "#fff", "#ffffff" ].indexOf(p) > -1) && (S = "sc-title--no-line"), 
        {
            title: o,
            color: p,
            titleClass: S,
            linkData: x,
            wxLinkData: b,
            templateType: s[+n] || s[0],
            showMethod: c[l] || c[0],
            linkTitle: x.title,
            subTitle: r,
            wxTitleDate: h,
            wxTitleAuthor: v,
            wxTitle: m
        };
    };
    e.exports = {
        type: "title",
        data: function(e) {
            return function(e) {
                return l(u(e));
            }(e);
        },
        title__handleClick: function(e) {
            var t = e.currentTarget.dataset, n = t.componentIndex, a = t.type, o = this.data.theme.feature[n], i = o.linkData, s = o.wxLinkData, c = "wx" === a ? s : i;
            r(c.link_type, c);
        }
    };
}, function(e, t, n) {
    var a = [ "pages/home/dashboard/index", "pages/home/tab/one", "pages/home/tab/two" ], o = getApp();
    e.exports = {
        type: "contact_us",
        data: function(e, t) {
            var n = this, i = this.route, r = a.indexOf(i) > -1 && !o.globalData.isYouzanApp;
            return o.getImData().then(function(e) {
                var a, o, i;
                n.setData((a = {}, o = "theme.feature[" + t + "].businessId", i = e.businessId || "", 
                o in a ? Object.defineProperty(a, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : a[o] = i, a));
            }), {
                inTabPage: r,
                content: e.content
            };
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e) {
        return (e = e || []).map(function(e) {
            return i(e, "!730x0.jpg");
        });
    }
    var i = n(2), r = n(12).baiduToGcj, s = {
        0: "left",
        1: "center",
        2: "right"
    }, c = getApp();
    e.exports = {
        type: "offline_shop_info",
        data: function(e) {
            var t = e.store || {};
            return {
                imgUrls: o(t.image),
                logoUrl: i(e.teamLogo, "!125x125.jpg"),
                logoStyleClass: s[e.logo_style] || "left",
                name: t.name,
                id: t.id,
                tel: "",
                address: "",
                time: "",
                lat: "",
                lng: ""
            };
        },
        beforeUpdate: function(e, t) {
            var n = this, i = "theme.feature[" + t + "]", r = {
                id: e.id
            };
            c.carmen({
                api: "weapp.multistore.offline/1.0.0/get",
                query: r,
                success: function(e) {
                    var t, r = e.phone1, s = e.phone2, c = e.name, u = e.image, l = e.address, d = e.province, p = e.city, f = e.area, h = e.business_hours_advanced_text, g = e.lat, m = e.lng, _ = r ? r + "-" + s : s, v = o(u);
                    n.setData((a(t = {}, i + ".name", c), a(t, i + ".imgUrls", v), a(t, i + ".tel", _), 
                    a(t, i + ".address", d + p + f + l), a(t, i + ".time", h), a(t, i + ".lat", g), 
                    a(t, i + ".lng", m), t));
                },
                fail: function(e) {
                    n.showZanToast(e.msg || "线下门店数据获取失败");
                }
            });
        },
        offline_shop_info__callShop: function(e) {
            var t = e.currentTarget.dataset.tel;
            t && wx.makePhoneCall({
                phoneNumber: t
            });
        },
        offline_shop_info__previewImage: function(e) {
            var t = e.currentTarget.dataset, n = t.current, a = t.images;
            wx.previewImage({
                current: a[n],
                urls: a
            });
        },
        offline_shop_info__openLocation: function(e) {
            var t = e.currentTarget.dataset, n = t.lat, a = t.lng, o = t.name, i = t.address;
            if (n && a) {
                var s = r(a, n);
                wx.openLocation({
                    latitude: s.lat,
                    longitude: s.lng,
                    name: o,
                    address: i
                });
            }
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        var t = e;
        return "text_nav" === e.type && (t = e.sub_entry.map(function(e) {
            return {
                type: "text",
                show_method: "0",
                font_size: "14",
                color: "#000",
                bg_color: "#fff",
                text: e.title || "",
                alias: e.alias || "",
                link_id: e.link_id || "",
                link_type: e.link_type || "",
                link_title: e.link_title || "",
                link_url: e.link_url || ""
            };
        })), t;
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.default = function(e) {
        var t = e.type, n = e.show_method, a = e.text, o = e.font_size, i = e.color, r = void 0 === i ? "#333" : i, s = e.bg_color, c = void 0 === s ? "#fff" : s, u = e.show_split_line, l = void 0 === u ? 0 : u, d = e.link_id, p = e.link_type, f = e.link_title, h = e.link_url, g = e.alias, m = void 0;
        switch (n) {
          case "0":
            m = "left";
            break;

          case "1":
            m = "center";
            break;

          case "2":
            m = "right";
            break;

          default:
            m = "left";
        }
        return {
            type: t,
            alias: g,
            color: r,
            text: a,
            textAlign: m,
            linkUrl: h,
            linkType: p,
            linkId: d,
            linkTitle: f,
            fontSize: o,
            bgColor: c,
            showSplitLine: 1 == +l
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(269)), i = a(n(268));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    var a = n(11), o = a.jumpToLink, i = a.LINK_TYPE_LIST, r = n(270).default, s = r.old2new, c = r.new2captain, u = i.concat("");
    e.exports = {
        type: "texts",
        data: function(e) {
            var t = function(e) {
                var t = c(s(e));
                return t.extraData = e.extra_data, t;
            }(e);
            return u.indexOf(t.linkType) >= 0 ? t : {
                itemType: ""
            };
        },
        texts__handleClick: function(e) {
            var t = e.currentTarget.dataset.componentIndex, n = this.data.theme.feature[t], a = n.linkType, i = n.extraData, r = n.alias, s = n.linkTitle, c = n.linkId;
            o(a, {
                alias: r,
                extra_data: i,
                link_title: s,
                link_id: c
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function(e) {
        return a({}, e, {
            type: "tag_list_left"
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        return {
            tags: e.sub_entry.filter(function(e) {
                return e.title;
            }).map(function(e) {
                return {
                    loading: !0,
                    title: e.tag_name || e.title,
                    alias: e.alias,
                    number: e.goods_num_display
                };
            }),
            type: e.type,
            imageFillStyle: e.image_fill_style
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(273)), i = a(n(272));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function(e) {
        return Array.isArray(e.sub_entry) && (e.sub_entry = e.sub_entry.filter(function(e) {
            return e.alias;
        })), "tag_list_weapp" === e.type ? function(e) {
            var t = e.sub_entry || [];
            return e.goods_number_v2 && (t = e.sub_entry.map(function(t) {
                return a({}, t, {
                    goods_number: e.goods_number_v2
                });
            })), {
                type: "tag_list_top",
                sticky: "0",
                size: "3",
                size_type: "2",
                buy_btn: "1",
                buy_btn_type: "1",
                buy_btn_express: "0",
                display_scale: "0",
                default_image_url: "",
                price: "1",
                title: "1",
                show_sub_title: "0",
                nav_style: e.nav_style,
                image_fill_style: e.image_fill_style,
                sub_entry: t
            };
        }(e) : a({
            nav_style: "0"
        }, i.default.newPolyFill(e), {
            type: "tag_list_top"
        });
    };
    var o, i = (o = n(37)) && o.__esModule ? o : {
        default: o
    };
}, function(e, t, n) {
    function a(e, t) {
        var n = {};
        return t.forEach(function(t) {
            n[t] = e[t];
        }), n;
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        var t = a(e, [ "type", "buy_btn", "buy_btn_type", "buy_btn_express", "button_text", "cart", "price", "show_sub_title", "show_union_goods", "show_wish_btn", "goods", "goods_form", "size", "size_type", "title", "wish_btn_type", "show_corner_mark", "corner_mark_type", "corner_mark_image", "display_scale", "image_fill_style", "wrap" ]), n = a(e, [ "nav_style", "sticky" ]), o = e.sub_entry;
        return o.forEach(function(e) {
            e.goods_number = +e.goods_number, e.title = e.tag_name || e.title, (0 === e.goods_number || isNaN(e.goods_number)) && (e.goods_number = Number.MAX_VALUE);
        }), {
            tabs: o,
            tagsConfig: n,
            goodsListConfig: t
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(276)), i = a(n(275));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    var a = n(277).default, o = n(274).default, i = n(37).default, r = n(24), s = r.INIT_GOODS_ITEM, c = r.NAV_HEIGHT, u = r.MAX_PAGE, l = n(59).setNavRange, d = a.old2new, p = a.new2captain, f = i.old2new, h = i.new2captain, g = o.old2new, m = o.new2captain, _ = getApp();
    e.exports = {
        type: "taglist",
        data: function(e) {
            var t = void 0 !== e.nav_style;
            if ("tag_list" === e.type ? t = !1 : "tag_list_left" === e.type ? t = !1 : "tag_list_top" === e.type ? t = !0 : "tags" === e.type && (t = !0), 
            !e.sub_entry || 0 === e.sub_entry.length) return {
                itemType: "null"
            };
            if (!t) {
                var n = m(g(e)), a = (n.tags[0] || {}).alias;
                return {
                    itemType: "taglist-left",
                    maxNavHeight: _.getSystemInfoSync().windowHeight,
                    list: n.tags.map(function(e) {
                        var t = e.number;
                        return e.dataList = t > 0 ? new Array(t).fill(s) : [], e.loading = !1, e.nodata = !1, 
                        e.loaded = !1, e.tabRange = [], e.navScrollTop = 0, e.goods_number = e.goods_number > u ? u : e.goods_number, 
                        e;
                    }).map(l) || [],
                    selectedGroup: a,
                    contentScrollTop: 0,
                    isFixed: !1,
                    shouldCheck: !1
                };
            }
            var o, i, r = p(d(e)), v = r.goodsListConfig, y = r.tabs, b = void 0 === y ? [] : y, w = r.tagsConfig;
            o = h(f(v)), i = 1 == +w.sticky;
            var x = {
                list: b.map(function(e, t) {
                    return e.goods_id = e.id, e.id = t, e.loading = !1, e.nodata = !1, e.loaded = !1, 
                    e.p = 0, e.dataList = [], e;
                }),
                scroll: b.length > 4,
                height: c - 1,
                selectedId: 0
            };
            return x.selectedGroup = x.list[0].goods_id, {
                tags: x,
                nav_style: w.nav_style,
                goods: {},
                goodsList: o,
                itemType: "taglist-top",
                imageWidth: 0,
                height: c - 1,
                isSticky: i,
                isFixed: !1
            };
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e, t, n) {
        var o = this, s = (((this.data.theme.feature || [])[t] || {}).tags || {}).list[e];
        if (s) {
            var c = s.goods_number, u = s.alias;
            s.loading || s.nodata || s.nomore || (s.loading = !0, this.setData(a({}, "theme.feature[" + t + "].tags.list[" + e + "]", s)), 
            this.fetchGoodsByTagAlias(u, ++s.p, {
                page_size: p,
                success: function(n) {
                    s.dataList = s.dataList.concat(n.items.map(function(e) {
                        return i({}, e, {
                            image_url: r(e.pic_url, "!730x0.jpg")
                        });
                    }) || []), 0 === s.dataList.length ? s.nodata = !0 : (s.dataList.length >= c || 0 === n.items.length || n.items.length < p) && (s.nomore = !0, 
                    s.dataList.splice(c)), s.loading = !1, o.setData(a({}, "theme.feature[" + t + "].tags.list[" + e + "]", s)), 
                    !o.data.theme.feature[t].imageWidth && setTimeout(function() {
                        (function(e) {
                            return new Promise(function(t, n) {
                                wx.createSelectorQuery().select("#sc-goods--" + e).boundingClientRect(function(e) {
                                    if (!e) return n();
                                    t(e.width);
                                }).exec();
                            });
                        })(t).then(function(e) {
                            o.setData(a({}, "theme.feature[" + t + "].imageWidth", e));
                        });
                    }, 1500);
                },
                fail: function(n) {
                    s.loading = !1, 5e4 === n.code && (s.nodata = !0), o.setData(a({}, "theme.feature[" + t + "].tags.list[" + e + "]", s));
                },
                complete: function() {
                    "function" == typeof n && n();
                }
            }));
        }
    }
    var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, r = n(2), s = n(61), c = n(24), u = c.NAV_HEIGHT, l = c.LOAD_OFFSET, d = n(62).goods__handleImageLoaded, p = 18, f = getApp();
    e.exports = {
        type: "taglist-top",
        taglistTop__fixedId: "",
        taglistTop__stickyList: [],
        goods__handleImageLoaded: d,
        beforeUpdate: function(e, t) {
            var n = e.tags || {};
            e.isSticky && this.taglistTop__stickyList.push(t), this.taglistTop__changeSelectedNav(n.selectedId, t, !0);
        },
        onPullDownRefresh: function() {
            this.taglistTop__clearSubscribe();
        },
        onPageScroll: function() {
            this.taglistTop__stickyCheck(), this.taglistTop__lazyloadCheck();
        },
        taglistTop__clearSubscribe: function() {
            this.taglistTop__stickyList = [];
        },
        taglistTop__handleZuiTabChange: function(e, t) {
            var n = t.selectedId, a = t.componentId;
            this.taglistTop__changeSelectedNav(n, a);
        },
        taglistTop__changeSelectedNav: function(e, t, n) {
            var i = this.data.theme.feature[t] || {
                tags: {}
            }, r = i.tags.list[e], s = r.goods_id;
            i.tags.selectedId = e, i.tags.selectedGroup = s, this.setData(a({}, "theme.feature[" + t + "]", i)), 
            !n && this.taglistTop__scrollToTop(t), (r.dataList || []).length < 6 && o.call(this, e, t, this.taglistTop__stickyCheck.bind(this));
        },
        taglistTop__scrollToTop: function(e) {
            var t = this;
            wx.createSelectorQuery().in(this).select(".feature-page__top-hook").boundingClientRect(function(n) {
                n && wx.createSelectorQuery().in(t).select("#taglist-top--" + e).boundingClientRect(function(e) {
                    var t = Math.abs(n.top) + e.top;
                    wx.pageScrollTo({
                        scrollTop: t
                    });
                }).exec();
            }).exec();
        },
        taglistTop__lazyloadCheck: function() {
            this.__taglistTop__lazyloadCheckFunc || function() {
                var e = this;
                this.__taglistTop__lazyloadCheckFunc || (this.__taglistTop__lazyloadCheckFunc = s(function() {
                    var t = f.globalData.systemInfo.windowHeight, n = wx.createSelectorQuery().in(e).selectAll(".theme-taglist-top .zan-tab-container"), a = wx.createSelectorQuery().in(e).selectAll(".theme-taglist-top .theme-goods");
                    n.boundingClientRect(function(n) {
                        n.length && a.boundingClientRect(function(a) {
                            if (a.length) for (var i = 0; i < n.length; i++) {
                                var r = n[i], s = r.dataset.id, c = a[i], u = e.data.theme.feature[s].tags.selectedId;
                                r.top <= 0 && c.bottom > 0 && c.bottom <= t + l && o.call(e, u, s);
                            }
                        }).exec();
                    }).exec();
                }, 50));
            }.call(this), this.__taglistTop__lazyloadCheckFunc();
        },
        taglistTop__stickyCheck: function() {
            this.__taglistTop__stickyCheckFunc || function() {
                var e = this;
                this.__taglistTop__stickyCheckFunc || (this.__taglistTop__stickyCheckFunc = s(function() {
                    if (e.taglistTop__stickyList.length) {
                        var t = wx.createSelectorQuery().in(e).selectAll(".zan-tab-container--sticky"), n = wx.createSelectorQuery().in(e).selectAll(".tag-list-container--sticky");
                        t.boundingClientRect(function(t) {
                            var o = t.length;
                            o && n.boundingClientRect(function(n) {
                                for (var i = "", r = {}, s = 0; s < o && "break" !== function(e) {
                                    var a = t[e], o = a.dataset.id, r = n.find(function(e) {
                                        return e.dataset.id === o;
                                    });
                                    if (a.top <= 0 && r && r.bottom >= u) return i = o, "break";
                                }(s); s++) ;
                                "" !== i ? ("" !== e.taglistTop__fixedId && (r["theme.feature[" + e.taglistTop__fixedId + "].isFixed"] = !1), 
                                e.taglistTop__fixedId !== i && (r["theme.feature[" + i + "].isFixed"] = !0, e.setData(r))) : "" !== e.taglistTop__fixedId && e.setData(a({}, "theme.feature[" + e.taglistTop__fixedId + "].isFixed", !1)), 
                                e.taglistTop__fixedId = i;
                            }).exec();
                        }).exec();
                    }
                }, 50));
            }.call(this), this.__taglistTop__stickyCheckFunc();
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e, t, n) {
        var a = 0, o = e.height;
        return t && (a = n[t - 1].range[1]), e.range = [ a, a + o ], e;
    }
    var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, r = function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [], a = !0, o = !1, i = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                !t || n.length !== t); a = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }, s = n(2), c = n(61), u = n(24), l = u.NAV_STATE, d = u.EMPTY, p = u.NAV_OFFSET, f = u.LOAD_OFFSET, h = n(59).setNavRange, g = getApp();
    e.exports = {
        type: "taglist-left",
        taglistLeft__leftList: [],
        taglistLeft__fixedId: d,
        taglistLeft__tabPositionInit: !1,
        beforeUpdate: function(e, t) {
            this.taglistLeft__leftList.push(t);
        },
        onShow: function() {
            var e = this;
            setTimeout(function() {
                e.taglistLeft__leftScrollCheck();
            }, 1500);
        },
        onPullDownRefresh: function() {
            var e = this;
            this.taglistLeft__clearSubscribe(), setTimeout(function() {
                e.taglistLeft__leftScrollCheck();
            }, 1500);
        },
        onPageScroll: function() {
            this.taglistLeft__leftScrollCheck();
        },
        taglistLeft__handleGoodsListScroll: function(e) {
            var t = e.detail, n = t.scrollTop, o = t.deltaY, i = e.target.dataset.featureIndex, s = this.taglistLeft__getData(i);
            this.taglistLeft__leftScrollCheck(n);
            var u = s.list.find(function(e) {
                var t = r(e.range, 2), a = t[0], o = t[1];
                return n >= a && n < o;
            });
            u && u.alias !== s.selectedGroup && s.shouldCheck && this.setData(a({}, "theme.feature[" + i + "].selectedGroup", u.alias)), 
            this.__taglistLeft__throttleScroll2Top || function() {
                var e = this;
                this.__taglistLeft__throttleScroll2Top || (this.__taglistLeft__throttleScroll2Top = c(function(t, n) {
                    Math.abs(n) > 20 && e.taglistLeft__scroll2Top(t);
                }, 50));
            }.call(this), this.__taglistLeft__throttleScroll2Top(i, o);
        },
        taglistLeft__scroll2Top: function(e) {
            var t = this;
            wx.createSelectorQuery().in(this).select(".feature-page__top-hook").boundingClientRect(function(n) {
                n && wx.createSelectorQuery().in(t).select("#taglist-left--" + e).fields({
                    size: !0,
                    rect: !0,
                    scrollOffset: !0
                }, function(e) {
                    e && wx.pageScrollTo({
                        scrollTop: Math.abs(n.top) + e.top,
                        duration: 0
                    });
                }).exec();
            }).exec();
        },
        taglistLeft__handleToUpper: function(e) {
            var t = this, n = e.target.dataset.featureIndex;
            wx.createSelectorQuery().in(this).select(".feature-page__top-hook").boundingClientRect(function(e) {
                e && wx.createSelectorQuery().in(t).select("#taglist-left--" + n).fields({
                    size: !0,
                    rect: !0,
                    scrollOffset: !0
                }, function(t) {
                    if (t) {
                        var n = g.globalData.systemInfo.windowHeight;
                        wx.pageScrollTo({
                            scrollTop: Math.abs(e.top) - n / 4
                        });
                    }
                }).exec();
            }).exec();
        },
        taglistLeft__handleToLower: function(e) {
            var t = this, n = e.target.dataset.featureIndex;
            wx.createSelectorQuery().in(this).select(".feature-page__top-hook").boundingClientRect(function(e) {
                e && wx.createSelectorQuery().in(t).select("#taglist-left--" + n).fields({
                    size: !0,
                    rect: !0,
                    scrollOffset: !0
                }, function(t) {
                    t && (g.globalData.systemInfo.windowHeight, wx.pageScrollTo({
                        scrollTop: Math.abs(e.top) + 100
                    }));
                }).exec();
            }).exec();
        },
        taglistLeft__handleGoodsListTouchStart: function(e) {
            var t = e.currentTarget.dataset.featureIndex;
            this.setData(a({}, "theme.feature[" + t + "].shouldCheck", !0));
        },
        taglistLeft__handleNavScroll: function(e) {
            var t = e.detail.deltaY, n = e.target.dataset.featureIndex;
            Math.abs(t) < 20 || this.taglistLeft__scroll2Top(n);
        },
        taglistLeft__getData: function(e) {
            return this.data.theme.feature[e] || {};
        },
        taglistLeft__tabPositionInitialize: function(e) {
            var t = this;
            e.forEach(function(e) {
                var n = e.dataset.id, a = {};
                wx.createSelectorQuery().in(t).selectAll("#taglist-left__scroll--" + n + " .taglist-left__nav-tab").boundingClientRect(function(e) {
                    e.map(o).forEach(function(e, t) {
                        a["theme.feature[" + n + "].list[" + t + "].tabRange"] = e.range;
                    }), t.setData(a);
                }).exec();
            }), this.taglistLeft__tabPositionInit = !0;
        },
        taglistLeft__clearSubscribe: function() {
            this.taglistLeft__leftList = [];
        },
        taglistLeft__leftScrollCheck: function(e) {
            this.__taglistLeft__scrollCheckFunc || function() {
                var e = this;
                this.__taglistLeft__scrollCheckFunc || (this.__taglistLeft__scrollCheckFunc = c(function(t) {
                    var n = g.globalData.systemInfo.windowHeight;
                    e.taglistLeft__leftList.length && wx.createSelectorQuery().in(e).selectAll(".taglist-left__nav").boundingClientRect(function(a) {
                        l.NORMAL, !e.taglistLeft__tabPositionInit && e.taglistLeft__tabPositionInitialize(a), 
                        a.filter(function(e) {
                            return e.top <= n + f && e.bottom >= -f;
                        }).forEach(function(n) {
                            e.taglistLeft__loadCheck(n, t);
                        });
                    }).exec();
                }, 50));
            }.call(this), this.__taglistLeft__scrollCheckFunc(e);
        },
        taglistLeft__currentNavCheck: function(e, t) {
            var n = this.taglistLeft__getData(e);
            if (n && t) {
                var o = Math.abs(t.top), i = void 0, s = n.list.find(function(e, t) {
                    var n = r(e.range, 2), a = n[0], s = n[1];
                    return o >= a && o < s && (i = t, !0);
                });
                s && s.alias !== n.selectedGroup && (this.setData(a({}, "theme.feature[" + e + "].selectedGroup", s.alias)), 
                this.taglistLeft__currentNavPositionFix(e, i));
            }
        },
        taglistLeft__loadCheck: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = e.dataset.id, a = g.getSystemInfoSync().windowHeight, o = this.taglistLeft__getData(n).list.filter(function(e) {
                var n = r(e.range, 2), o = n[0], i = !0;
                return (n[1] - t < -f || o - t > f + a) && (i = !1), i && !e.loaded && !e.loading && !e.nodata && e.number;
            });
            this.taglistLeft__queryData(n, o);
        },
        taglistLeft__queryData: function(e, t) {
            var n = this;
            t.forEach(function(t) {
                return function(e, t) {
                    var n = this, o = this.taglistLeft__getData(t).list || [], r = o.findIndex(function(t) {
                        return t.alias == e;
                    });
                    if (!(r < 0)) {
                        var c = o[r];
                        c.loading || c.nodata || !c.number || c.loaded || (c.loading = !0, this.setData(a({}, "theme.feature[" + t + "].list[" + r + "]", c)), 
                        this.fetchGoodsByTagAlias(e, 1, {
                            page_size: c.number,
                            success: function(e) {
                                c.dataList = e.items.map(function(e) {
                                    return i({}, e, {
                                        img: s(e.pic_url, "!730x0.jpg")
                                    });
                                }), 0 === e.items.length && (c.nodata = !0), e.items.length !== c.number && n.taglistLeft__reCalcTabRange(t, r, e.items.length), 
                                n.setData(a({}, "theme.feature[" + t + "].list[" + r + "]", i({}, c, {
                                    loading: !1,
                                    loaded: !0
                                })));
                            },
                            fail: function(e) {
                                5e4 === e.code && (c.nodata = !0), n.setData(a({}, "theme.feature[" + t + "].list[" + r + "]", i({}, c, {
                                    loading: !1
                                })));
                            }
                        }));
                    }
                }.call(n, t.alias, e);
            });
        },
        taglistLeft__currentNavPositionFix: function(e, t) {
            var n = this;
            wx.createSelectorQuery().in(this).select("#taglist-left__scroll--" + e).fields({
                size: !0,
                rect: !0,
                scrollOffset: !0
            }, function(o) {
                o && wx.createSelectorQuery().in(n).select(".taglist-left__tab--" + t).boundingClientRect(function(o) {
                    if (o && (o.top <= 0 || o.top > p)) {
                        var i = n.taglistLeft__getData(e).list[t].tabRange[0];
                        n.setData(a({}, "theme.feature[" + e + "].navScrollTop", i - p));
                    }
                }).exec();
            }).exec();
        },
        taglistLeft__handleNavChange: function(e) {
            var t;
            if (e && e.currentTarget) {
                var n = e.currentTarget.dataset, o = n.alias, i = n.componentId;
                this.setData((a(t = {}, "theme.feature[" + i + "].selectedGroup", o), a(t, "theme.feature[" + i + "].shouldCheck", !1), 
                t)), this.taglistLeft__scrollToTargetGroup(i, o);
            }
        },
        taglistLeft__scrollToTargetGroup: function(e, t) {
            var n = this;
            wx.createSelectorQuery().in(this).select(".feature-page__top-hook").boundingClientRect(function(o) {
                o && wx.createSelectorQuery().in(n).select("#taglist-left--" + e).fields({
                    size: !0,
                    rect: !0,
                    scrollOffset: !0
                }, function(o) {
                    var i = n.taglistLeft__getData(e).list.find(function(e) {
                        return e.alias === t;
                    });
                    if (i && o) {
                        var r = i.range[0];
                        n.setData(a({}, "theme.feature[" + e + "].contentScrollTop", r), function() {
                            n.taglistLeft__leftScrollCheck(r);
                        });
                    }
                }).exec();
            }).exec();
        },
        taglistLeft__clickCart: function(e) {
            if (e && e.currentTarget && e.currentTarget.dataset.alias) return this.showcaseHandleGoodsBuy(e);
        },
        taglistLeft__reCalcTabRange: function(e, t, n) {
            var o = this.data.theme.feature[e].list;
            o[t].number = n, this.setData(a({}, "theme.feature[" + e + "].list", o.map(h)));
        }
    };
}, function(e, t, n) {
    var a = n(280), o = n(279), i = n(278);
    e.exports = {
        taglist: i,
        taglistTop: o,
        taglistLeft: a
    };
}, function(e, t, n) {
    e.exports = {
        formatNumberWithUnit: function(e) {
            return "string" == typeof e && (e = parseInt(e)), isNaN(e) ? 0 : e < 1e4 ? e + "" : e > 1e4 ? Math.floor(e / 1e4) + "W" : void 0;
        }
    };
}, function(e, t, n) {
    var a = n(2), o = n(282);
    e.exports = {
        type: "storeinfo",
        data: function(e) {
            var t = function(e) {
                var t = "", n = "", a = {
                    promotion_type: t,
                    promotion_str: n
                }, o = e.meet_reduce;
                if (null == o) return a;
                var i = o.reward_detail;
                if (null == i) return a;
                t = i.type || "";
                var r = i.content || [];
                if (r.length >= 0) {
                    var s = [];
                    r.forEach(function(e) {
                        e.forEach(function(e) {
                            s.push(e.title);
                        });
                    }), n += s.join("，");
                }
                return a.promotion_type = t, a.promotion_str = n, a;
            }(e);
            return {
                itemType: e.itemType,
                bg_img: a(e.background_image, "!730x0.jpg"),
                logo_img: e.teamLogo,
                store_name: e.teamName,
                goods_total: o.formatNumberWithUnit(e.goods_total),
                goods_new: o.formatNumberWithUnit(e.goods_new),
                goods_sales_volume: o.formatNumberWithUnit(e.goods_sales_volume),
                promotion_type: "满减" == t.promotion_type ? 0 : 1,
                promotion_desc: t.promotion_str,
                config: {
                    store_info_style: e.store_info_style
                }
            };
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return a({}, e, {
            action_text: e.action_text || "进入店铺"
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return {
            type: e.type,
            label: e.label || "",
            actionText: e.action_text
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(285)), i = a(n(284));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    var a = n(286).default, o = n(3), i = a.old2new, r = a.new2captain;
    e.exports = {
        type: "store",
        data: function(e) {
            return Object.assign({}, r(i(e)), {
                url: ""
            });
        },
        store__handleClick: function() {
            "pages/home/dashboard/index" !== this.route ? o.switchTab({
                url: "/pages/home/dashboard/index"
            }) : this.showZanToast("您已经在店铺首页了");
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    e.exports = {
        type: "search",
        _searchCurrentIndex: -1,
        data: function(e, t) {
            return {
                featureIndex: t,
                itemType: e.type,
                searchbg: e.color,
                hotSearchKeys: e.hot_search_keys || [],
                showSearch: !1,
                focus: !1,
                searchText: "",
                placeholder: e.hot_search_keys ? e.hot_search_keys[0] : "搜索商品"
            };
        },
        search_handleSearchBarTap: function(e) {
            var t = e.currentTarget.dataset.featureIndex;
            this._searchCurrentIndex = t, this.setData(a({}, "theme.feature[" + this._searchCurrentIndex + "].showSearch", !0));
        },
        search_handleInput: function(e) {
            var t = e.detail.value;
            this.setData(a({}, "theme.feature[" + this._searchCurrentIndex + "].searchText", t));
        },
        search_handleItemTap: function(e) {
            var t = e.target.dataset.text;
            this.setData(a({}, "theme.feature[" + this._searchCurrentIndex + "].searchText", t)), 
            this.search_handleSearch();
        },
        search_handleCancelTap: function() {
            var e;
            this.setData((a(e = {}, "theme.feature[" + this._searchCurrentIndex + "].searchText", ""), 
            a(e, "theme.feature[" + this._searchCurrentIndex + "].showSearch", !1), e));
        },
        search_handleSearch: function() {
            var e = this.data.theme.feature[this._searchCurrentIndex].searchText, t = this.data.theme.feature[this._searchCurrentIndex].hotSearchKeys[0], n = this;
            if (e) {
                if (e.length > 100) return void wx.showToast({
                    title: "搜索关键字不能超过100字",
                    icon: "none"
                });
            } else {
                if (!t) return void wx.showToast({
                    title: "搜索关键字不能为空",
                    icon: "none"
                });
                this.setData(a({}, "theme.feature[" + this._searchCurrentIndex + "].searchText", t));
            }
            wx.navigateTo({
                url: "/packages/shop/goods/search/index?q=" + (e || t),
                success: function() {
                    setTimeout(function() {
                        var e;
                        n.setData((a(e = {}, "theme.feature[" + n._searchCurrentIndex + "].searchText", ""), 
                        a(e, "theme.feature[" + n._searchCurrentIndex + "].showSearch", !1), e));
                    }, 1e3);
                }
            });
        }
    };
}, function(e, t, n) {
    e.exports = {
        type: "rich_text",
        data: function(e) {
            return {
                html: e.content,
                bgColor: e.color,
                fullscreen: +e.fullscreen,
                itemType: e.itemType
            };
        }
    };
}, function(e, t, n) {
    var a = n(2);
    e.exports = {
        type: "nav",
        data: function(e) {
            var t = e.display_num || e.sub_entry.length, n = 750 / t, o = 0;
            return e.sub_entry.forEach(function(e) {
                var i = Math.floor(n * e.image_height / e.image_width);
                e.actual_height = i, o = Math.max(o, i);
                var r = t > 1 ? "!500x0.jpg" : "!730x0.jpg";
                e.full_image_url = a(e.image_url, r);
            }), e.maxHeight = o, e;
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        return void 0 === e.border_width && (6 == +e.show_method ? e.border_width = 2 : e.border_width = 0), 
        e;
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, o = (a = n(291)) && a.__esModule ? a : {
        default: a
    };
    t.default = {
        old2new: o.default
    };
}, function(e, t, n) {
    var a = n(11), o = a.jumpToLink, i = a.LINK_TYPE_LIST, r = n(292).default.old2new, s = i.concat([ void 0, "", "hotarea" ]), c = n(2);
    e.exports = {
        type: "image",
        data: function(e, t) {
            if (e.sub_entry = (e.sub_entry || []).filter(function(e) {
                return s.indexOf(e.link_type) >= 0;
            }), !e.sub_entry.length) return {
                itemType: "null"
            };
            var n = "swipe";
            switch (+e.show_method) {
              case 0:
                n = "swipe";
                break;

              case 1:
                n = "slide";
                break;

              case 5:
                n = "swipe";
                break;

              case 6:
                n = "slide";
                break;

              case 7:
                n = "top2end";
                break;

              case 8:
                n = "image_nav";
                break;

              case 9:
                n = "text_nav";
                break;

              default:
                n = "swipe";
            }
            var a = 3;
            switch (+e.size) {
              case 0:
                a = 2;
                break;

              case 1:
                a = 3;
                break;

              case 2:
                a = e.count || 3;
                break;

              default:
                a = 2;
            }
            var o = e.sub_entry || [], i = e.height || 320, u = 320;
            o.length > 0 && (i = o[0].image_height || 320, u = o[0].image_width || 320);
            var l = 0, d = 0;
            "slide" == n && (l = Math.floor((750 - 2 * (a - 1)) / (a - .8) * (i / u)), d = 2 * a - 2);
            var p = 0 == +e.slide_setting, f = p ? 0 : .8, h = e.count;
            p && (h = (e.sub_entry || []).length);
            var g = 0, m = 0;
            "image_nav" == n && (m = Math.ceil(750 / (h - f)), g = Math.floor(m * (i / u)));
            var _ = 0;
            "text_nav" == n && (_ = Math.ceil(750 / (h - f))), (e.sub_entry || []).forEach(function(e) {
                e.full_image_url = c(e.image_url, "!730x0.jpg");
            }), e = r(e);
            var v = !1, y = !1;
            o.forEach(function(e) {
                "top2end" == n ? (e.showHeight = Math.ceil(e.image_height * (750 / e.image_width)), 
                e.showWidth = 750) : "slide" == n ? (e.showHeight = l, e.showWidth = Math.floor(l * (e.image_width / e.image_height)), 
                d += e.showWidth) : "image_nav" == n && (e.showWidth = m, e.showHeight = g), "hotarea" === e.link_type && (y = !0), 
                v || (v = !!e.title);
            }), v && o.forEach(function(e) {
                e.title = e.title || " ";
            });
            var b = Math.ceil(i / u * 750);
            return {
                imageFillStyle: "2" == e.image_fill_style ? "aspectFit" : "aspectFill",
                swipeHeight: b,
                slideHeight: l,
                slideTotalWidth: d,
                slideShowCnt: a,
                fixedMode: p,
                backgroundColor: e.background_color,
                color: e.color,
                textNavShowWidth: _,
                list: o,
                hasHotArea: y,
                itemType: e.itemType,
                componentIndex: t,
                showType: n,
                borderWidth: e.border_width
            };
        },
        image__imgClick: function(e) {
            if (wx.createSelectorQuery) {
                var t = e.target.dataset, n = t.component_index, a = t.img_index, i = this.data.theme.feature[n].list[a], r = i.link_type;
                if ("hotarea" == r) {
                    var s = wx.createSelectorQuery().in(this);
                    s.select("#img-ad-" + n + "-" + a).boundingClientRect(), s.exec(function(t) {
                        var n = function(e, t) {
                            if (t) return t.find(function(t) {
                                return e.x >= t.start_x && e.x <= t.end_x && e.y >= t.start_y && e.y <= t.end_y;
                            });
                        }(function(e, t, n) {
                            var a = n.top, o = n.left, i = n.height, r = n.width, s = t.touches[0], c = e.image_width, u = e.image_height;
                            return {
                                x: c * ((s.clientX - o) / r),
                                y: u * ((s.clientY - a) / i)
                            };
                        }(i, e, t[0]), i.hot_areas);
                        n && o(n.link_type, n);
                    });
                } else r && o(r, i);
            }
        },
        image__jumpLink: function(e) {
            var t = e.currentTarget.dataset, n = t.componentIndex, a = t.imgIndex, i = this.data.theme.feature[n].list[a], r = i.link_type;
            o(r, i);
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(19), i = function(e) {
        return (0, o.isObject)(e) ? e : {
            0: e
        };
    };
    t.default = function(e) {
        var t = e.goods, n = void 0 === t ? [] : t, o = e.ratio, r = void 0 === o ? "1,1" : o, s = e.image_fill_style, c = void 0 === s ? "2" : s, u = e.goods_limit, l = function(e, t) {
            var n = {};
            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
            return n;
        }(e, [ "goods", "ratio", "image_fill_style", "goods_limit" ]);
        return n = n.map(function(e) {
            var t = i(e.origin_price), n = i(e.min_sku_price);
            return a({
                origin_sku_price: t,
                sku_prices: n,
                thumb_url: e.image_url,
                group_nums: e.group_nums || 5
            }, e);
        }), a({
            goods: n,
            ratio: r,
            image_fill_style: c,
            show_all_btn: +u > 0 ? "1" : "0"
        }, l);
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = n(19), i = function(e) {
        return (0, o.isNumber)(e) ? {
            0: e
        } : e;
    };
    t.default = function(e) {
        var t = e.type, n = e.size, r = e.list, s = e.ratio, c = void 0 === s ? "1,1" : s, u = e.show_buy_btn, l = e.buy_btn_type, d = e.show_title, p = e.show_groupon_num, f = e.show_all_btn, h = e.is_preview, g = e.image_fill_style, m = void 0 === g ? "2" : g, _ = [ "", "https://b.yzcdn.cn/public_files/2018/05/21/0536940edd0270d116a601a5cd72c638.png", "https://b.yzcdn.cn/public_files/2018/05/21/6ebaf97d92343c8e3cd586491f0e3b45.png", "https://b.yzcdn.cn/public_files/2018/05/21/d1cfe347e3a93b58abd9477e40437fcf.png" ], v = (r || []).map(function(e) {
            var t = (0, o.mapKeysToCamelCase)(e);
            return a({
                thumbUrl: t.thumbUrl || t.imageUrl,
                imageIcon: _[t.owl ? t.owl.mediaType : 0],
                originSkuPrice: i(t.originSkuPrice || t.originPrice),
                skuPrices: i(t.skuPrices || t.minSkuPrice)
            }, t);
        }), y = e.source || e.goods_source;
        return {
            type: t,
            grouponGoodsList: v,
            ratio: c,
            isPreview: h,
            isShowViewMore: !!+f && 0 == +y,
            size: +n,
            showBuyBtn: +u,
            buyBtnType: +l,
            showTitle: +d,
            showGrouponNum: +p,
            imageFillStyle: +m
        };
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(295)), i = a(n(294));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = n(3), i = n(296).default, r = n(2), s = n(6), c = i.old2new, u = i.new2captain, l = getApp();
    e.exports = {
        type: "groupon",
        data: function(e) {
            var t = u(c(e));
            return Object.assign({}, t, {
                grouponGoodsList: e.grouponGoodsList || [],
                skipFetch: e.skipFetch,
                loading: !0,
                activity_ids: e.activity_ids,
                goods_source: e.goods_source,
                goods_ids: e.goods_ids,
                hide_goods_sold: e.hide_goods_sold || 0,
                goods_num: e.goods_num,
                order_rule: e.order_rule
            });
        },
        beforeUpdate: function(e, t) {
            var n = this;
            if (e.skipFetch) this.setData(a({}, "theme.feature[" + t + "].loading", !1)); else {
                var o = e.goods_source, i = {};
                i.hide_goodssold = +e.hide_goods_sold || 0, i.goods_source = o, i.page = 1, 1 == o ? (i.activity_ids = e.activity_ids.join(",") || [], 
                i.goods_ids = e.goods_ids.join(",") || [], i.sort_rule = 0, i.page_size = 0) : (i.page_size = e.goods_num, 
                i.sort_rule = e.order_rule), l.carmen({
                    api: "youzan.weapp.grouponlist/1.0.0/get",
                    query: i,
                    success: function(e) {
                        var o, i = e.map(function(e) {
                            return {
                                alias: e.alias,
                                title: e.goodTitle,
                                groupNums: e.groupPersonNum,
                                conditionNum: e.conditionNum,
                                isEnd: e.isEnd,
                                goodsInfo: {
                                    totalStock: e.totalStock
                                },
                                thumbUrl: r(e.imageUrl, "!730x0.jpg"),
                                minActivityPrice: s(e.grouponPrice).toYuan(),
                                minOriginPrice: s(e.price).toYuan()
                            };
                        });
                        n.setData((a(o = {}, "theme.feature[" + t + "].grouponGoodsList", i), a(o, "theme.feature[" + t + "].loading", !1), 
                        o));
                    },
                    fail: function(e) {
                        n.showZanToast(e.msg || "拼团活动获取失败"), n.setData(a({}, "theme.feature[" + t + "].loading", !1));
                    }
                });
            }
        },
        groupon__handleLookMore: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset, a = (void 0 === n ? {} : n).componentIndex, i = this.data.theme.feature[a], r = {
                goods_source: i.goods_source,
                activity_ids: i.activity_ids,
                goods_ids: i.goods_ids,
                page_num: i.page_num,
                hide_goods_sold: i.hide_goods_sold,
                order_rule: i.order_rule
            };
            o.navigate({
                url: "/packages/shop/goods/group/index?pageType=groupon&component=" + JSON.stringify(r)
            });
        },
        groupon__handleGoodsTapped: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset, a = (void 0 === n ? {} : n).alias;
            o.navigate({
                url: "/pages/goods/detail/index?alias=" + a
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function(e) {
        var t = e.size, n = e.wrap, o = function(e, t) {
            var n = {};
            for (var a in e) t.indexOf(a) >= 0 || Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
            return n;
        }(e, [ "size", "wrap" ]);
        return 5 == +t && n && 0 == +n && (t = "6"), a({
            size: t
        }, o);
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function(e) {
        return "goods_list" === e.type ? (e.goods_from = "1", e.goods_list = e.goods || {}, 
        e.goods = e.goods instanceof Array ? e.goods : [], e.goods_number_v2 = e.goods_number) : "goods" !== e.type || e.hasOwnProperty("goods_from") || (e.goods_from = "0"), 
        a({}, e, {
            type: "goods"
        });
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        var t = e.type, n = e.size, a = e.size_type, o = e.buy_btn, i = e.buy_btn_type, r = e.buy_btn_express, s = e.title, c = e.show_sub_title, u = e.price, l = e.goods, d = e.goods_from, p = e.show_corner_mark, f = e.corner_mark_type, h = e.corner_mark_image, g = e.display_scale;
        return {
            type: t,
            goodsFrom: d,
            buttonText: e.button_text,
            cornerMarkImage: h,
            list: l || [],
            layout: n ? +n : 0,
            sizeType: a ? +a : 0,
            showTitle: 1 == +s,
            showSubTitle: 1 == +c,
            showPrice: 1 == +u,
            showBuyButton: 1 == +o,
            buyButtonType: i ? +i : 1,
            buyBtnExpress: 1 == +r,
            showCornerMark: 1 == +p,
            cornerMarkType: f ? +f : 0,
            imageRatio: g ? +g : void 0,
            imageFillStyle: +e.image_fill_style || 2
        };
    };
}, function(e, t, n) {
    e.exports = {
        type: "emptyspace",
        data: function(e) {
            return {
                itemType: e.itemType,
                space_height: e.height
            };
        }
    };
}, function(e, t, n) {
    e.exports = {
        type: "divider",
        data: function(e) {
            return {
                itemType: e.itemType,
                divider_color: e.color,
                divider_padding: e.hasPadding,
                divider_type: e.lineType
            };
        }
    };
}, function(e, t, n) {
    var a = n(11).jumpToLink, o = n(2);
    e.exports = {
        type: "cube",
        data: function(e) {
            var t = e.border_width || 0, n = wx.getSystemInfoSync().windowWidth + t, a = Math.ceil(n / e.layout_width), i = a;
            if (1 == e.layout_height && e.sub_entry) {
                var r = e.sub_entry[0];
                if (r) {
                    var s = a * r.width / r.image_width;
                    i = Math.ceil(r.image_height * s);
                }
            }
            var c = e.sub_entry || [];
            return c.forEach(function(e) {
                e.full_image_url = o(e.image_url, "!730x0.jpg"), e.showWidth = a * e.width - t, 
                e.showHeight = i * e.height - t, e.showLeft = a * e.x, e.showTop = i * e.y, e.linkType = e.link_type;
            }), {
                height: i * e.layout_height,
                list: c,
                borderWidth: t
            };
        },
        cube__handleClick: function(e) {
            var t = e.currentTarget.dataset, n = t.componentIndex, o = t.itemIndex, i = this.data.theme.feature[n].list[o], r = i.link_type;
            a(r, i);
        }
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = n(3), i = n(25), r = getApp();
    e.exports = {
        type: "coupon",
        beforeUpdate: function(e, t) {
            var n = this, o = e.coupon || [], s = o.length || e.coupon_num, c = o.map(function(e) {
                return e.id;
            });
            c.length > 6 && (c = c.slice(0, 6));
            var u = {
                page: 1,
                include_understock: +(0 == e.hide_empty_coupon),
                perpage: s > 6 || 0 === s ? 6 : s,
                disable_unshare: e.hide_unshared_coupon || 0,
                with_user_status: 0,
                types: "7",
                ids: c.join(",")
            };
            r.getBuyerId() && (u.buyer_id = r.getBuyerId(), u.with_user_status = 1), r.carmen({
                api: "youzan.ump.coupon/1.0.0/search",
                query: u,
                success: function(o) {
                    var r = function(e) {
                        var t = [];
                        return (o.list || []).forEach(function(e, n) {
                            if (!(n > 4)) {
                                var a = i.handleCouponData(e);
                                t.push(a);
                            }
                        }), t;
                    }(), s = o.list.length > 5 ? 34 : -30, c = {
                        list: r,
                        size: r.length > 2 ? "small" : 2 == r.length ? "medium" : "large",
                        itemType: "coupon",
                        width: r.length > 3 ? 280 * r.length + s : 690,
                        lookMore: o.list.length > 5
                    };
                    n.setData(a({}, "theme.feature[" + t + "]", Object.assign(e, c)));
                },
                fail: function(e) {
                    n.showZanToast(e.msg || "优惠券获取失败");
                }
            });
        },
        coupon__handleItemTapped: function(e) {
            var t = this, n = e.currentTarget.dataset.coupon, o = e.currentTarget.dataset.componentid, i = e.currentTarget.dataset.index;
            "invalid" != n.component.status && r.carmen({
                api: "youzan.ump.coupon/1.0.0/fetch",
                query: {
                    id: n.id
                },
                success: function() {
                    wx.showToast({
                        title: "领取成功"
                    });
                    var e = t.data.theme.feature[o].list[i];
                    e.component.status = "invalid", e.component.invalid_content = "已领取", t.setData(a({}, "theme.feature[" + o + "].list[" + i + "]", e));
                },
                fail: function(e) {
                    t.showZanToast(e.msg || "领取失败");
                }
            });
        },
        coupon__onLookmoreTapped: function(e) {
            var t = e.currentTarget.dataset.component, n = [];
            t.coupon.forEach(function(e) {
                n.push(e.id);
            });
            var a = {
                coupon_source: t.coupon_source,
                list: n,
                coupon_num: t.coupon_num,
                hide_unshared_coupon: t.hide_unshared_coupon,
                hide_empty_coupon: t.hide_empty_coupon
            };
            o.navigate({
                url: "/packages/shop/home/coupon/index?component=" + JSON.stringify(a)
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    };
    t.default = function(e) {
        return a({
            color: o,
            bg_color: i
        }, e);
    };
    var o = "#f60", i = "#fff7cc";
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        return e;
    };
}, function(e, t, n) {
    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = a(n(306)), i = a(n(305));
    t.default = {
        new2captain: o.default,
        old2new: i.default
    };
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, i = n(307).default, r = i.old2new, s = i.new2captain, c = getApp();
    e.exports = {
        type: "broadcast",
        data: function(e) {
            return o({}, s(r(e)), {
                showAnimation: !1
            });
        },
        beforeUpdate: function(e, t) {
            var n, o = c.globalData.systemInfo || {}, i = 24 * e.content.length / 2;
            i + 80 >= (o.windowWidth || 320) && this.setData((a(n = {}, "theme.feature[" + t + "].showAnimation", !0), 
            a(n, "theme.feature[" + t + "].animationTime", 40 * i / 1800), n));
        }
    };
}, function(e, t, n) {
    var a = n(41)({
        life: [ "onShow", "onHide", "onPullDownRefresh", "onPageScroll", "onUnload" ],
        exclude: [ "type", "data", "beforeUpdate" ]
    });
    e.exports = function(e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
        return n.forEach(function(t) {
            t && Object.keys(t).forEach(function(n) {
                "type" !== n && ("data" !== n ? "beforeUpdate" === n && function(e, t) {
                    e.beforeUpdateFuncMap || (e.beforeUpdateFuncMap = {}), e.beforeUpdateFuncMap[t.type] || (e.beforeUpdateFuncMap[t.type] = t.beforeUpdate);
                }(e, t) : function(e, t) {
                    e.parseDataFuncMap || (e.parseDataFuncMap = {}), e.parseDataFuncMap[t.type] || (e.parseDataFuncMap[t.type] = t.data);
                }(e, t));
            });
        }), a.apply(void 0, [ e ].concat(n));
    };
}, function(e, t, n) {
    e.exports = {
        types: {
            image_text_nav: "image",
            image_ad: "image",
            goods: "goods",
            goods_list_weapp: "goods",
            goods_weapp: "goods",
            goods_list: "goods",
            groupon_weapp: "groupon",
            tags: "taglist",
            tag_list: "taglist",
            tag_list_weapp: "taglist",
            tag_list_left: "taglist",
            tag_list_top: "taglist",
            nav_weapp: "nav",
            search: "search",
            shop_banner_weapp: "storeinfo",
            rich_text_weapp: "rich_text",
            text_weapp: "texts",
            text: "texts",
            line: "divider",
            line_weapp: "divider",
            white: "emptyspace",
            white_weapp: "emptyspace",
            notice: "broadcast",
            notice_weapp: "broadcast",
            coupon_weapp: "coupon",
            store: "store",
            cube_v3: "cube",
            paid_content: "content",
            paid_column: "column"
        },
        themes: [ "default", "takeAway", "convenienceStore", "feature" ]
    };
}, function(e, t, n) {
    var a = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, o = function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [], a = !0, o = !1, i = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                !t || n.length !== t); a = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }, i = getApp(), r = n(11), s = n(309), c = n(308), u = n(304), l = n(303), d = n(302), p = n(301), f = n(62), h = n(297), g = n(293), m = n(290), _ = n(289), v = n(288), y = n(287), b = n(283), w = n(281), x = w.taglist, S = w.taglistTop, T = w.taglistLeft, k = n(271), D = n(267), C = n(266), A = n(265), I = n(264), P = n(263), O = n(258), L = n(257), M = n(256), E = n(250), F = n(249), j = function(e) {
        return e;
    }, z = i.getSystemInfoSync().windowHeight, B = z;
    e.exports = s({}, L, c, u, l, F, E, d, p, f, h, g, m, _, v, y, b, x, S, T, k, D, C, A, I, P, M, O, {
        fetchFeatureThemeDataSuccess: function(e) {
            var t = this;
            if (Array.isArray(e)) {
                if (Array.isArray(e) && e.length >= 1 && "config" === e[0].type) {
                    var n = e.splice(0, 1), a = o(n, 1)[0];
                    this._setFeaturePageConfigData(a);
                }
                var i = e.findIndex(function(e) {
                    return "contact_us" === e.type;
                });
                if (i > -1) {
                    var r = e.splice(i, 1), s = o(r, 1)[0];
                    e.unshift(s);
                }
                this.__featureComponents = e, this._featureThemeThrottleFunc = null;
                var c = (this.data.theme || {}).extra || {};
                c.totalComponentsCount = e.length, c.currentComponentCount = 0, c.showLoading = !0, 
                this.setData({
                    "theme.extra": c,
                    "theme.featureComponentsAllLoaded": !1,
                    "theme.feature": []
                }), this._loadMoreFeatureThemeComponents().then(function() {
                    var e = wx.createIntersectionObserver();
                    e.relativeToViewport({
                        bottom: B
                    }).observe("#theme-feature__content-end-hook", function(n) {
                        console.warn("near bottom", n), n.intersectionRatio && t._loadMoreFeatureThemeComponents().then(function(t) {
                            t && t.finished && e.disconnect();
                        });
                    });
                });
            }
        },
        _checkIsFeatureBottomVisible: function() {
            var e = this;
            return new Promise(function(t, n) {
                wx.createSelectorQuery().in(e).select("#theme-feature__content-end-hook").boundingClientRect(function(e) {
                    return e ? (e.top || 0) > z ? n() : void t() : n();
                }).exec();
            });
        },
        handleFeatureThemeZuiTabChange: function(e) {
            var t = (this.data.theme.feature || [])[e.componentId] || {};
            switch (t.itemType) {
              case "taglist-top":
                this.taglistTop__handleZuiTabChange(t, e);
            }
        },
        _loadMoreFeatureThemeComponents: function() {
            var e = this, t = this.__featureComponents || [], n = this.data.theme.extra || {}, a = n.currentComponentCount || 0;
            if (a >= t.length) {
                var o = {
                    "theme.featureComponentsAllLoaded": !0
                };
                return n.showLoading && (o["theme.extra.showLoading"] = !1), this.setData(o), Promise.resolve({
                    finished: !0
                });
            }
            return this._showFeatureThemeComponents(t.slice(a, a + 10), a).then(function() {
                setTimeout(function() {
                    e._checkIsFeatureBottomVisible().then(e._loadMoreFeatureThemeComponents);
                }, 500);
            });
        },
        _showFeatureThemeComponents: function(e) {
            var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return new Promise(function(o) {
                for (var s = e.map(function(e, a) {
                    var o = r.getThemeType(e.type);
                    return e.itemType = o || e.type, e.teamLogo = i.globalData.shopLogo || "", e.teamName = i.globalData.shopName || "", 
                    e = Object.assign({
                        itemType: e.itemType,
                        teamLogo: e.teamLogo,
                        teamName: e.teamName
                    }, (t.parseDataFuncMap[e.itemType] || j).call(t, e, n + a));
                }), c = {}, u = 0; u < s.length; u++) c["theme.feature[" + (u + n) + "]"] = s[u];
                t.setData(a({}, c, {
                    "theme.extra.currentComponentCount": n + 10
                }), function() {
                    o();
                }), t.data.theme.feature.forEach(function(e, a) {
                    a < n || (t.beforeUpdateFuncMap[e.itemType] || j).call(t, e, a);
                }), t.__featureListenerInited || (t.__featureListenerInited = !0, i.on("component:sku:cart", function(e) {
                    "add" == e.type && "feature" == t.data.type && t.showZanToast("添加购物车成功~");
                }, t));
            });
        },
        _setFeaturePageConfigData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            "1" === e.is_global_setting ? this._fetchShopGlobalSetting() : this.setData({
                pageBgColor: e.color || ""
            });
        },
        _fetchShopGlobalSetting: function() {
            var e = this;
            i.getShopConfigData().then(function(t) {
                e.setData({
                    pageBgColor: t.background_color || ""
                });
            });
        }
    });
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, i = n(3), r = getApp(), s = n(2);
    e.exports = {
        fetchTakeAwayThemeDataSuccess: function(e, t) {
            var n = this;
            e[0] && "config" === e[0].type && e[0].is_global_setting && e.shift();
            var a = e[0], o = a[0], i = (o.meet_reduce.reward_detail || {}).content || [], c = "";
            if (i.length > 0) {
                c = "在线支付";
                var u = [];
                i.forEach(function(e) {
                    e.forEach(function(e) {
                        u.push(e.title);
                    });
                }), c += u.join("，");
            }
            var l = this.data.CURRENT_GLOBAL_SHOP || {}, d = {
                logo: s(l.image || o.team_logo, "!730x0.jpg"),
                title: l.name || o.team_name || "",
                preference: c
            }, p = a[1] || {};
            d.notice = p.content || "";
            var f = a[2].sub_entry || [], h = [];
            (f = f.filter(function(e) {
                return e.alias && e.title;
            })).forEach(function() {
                h.push(0);
            });
            var g = {
                list: f,
                scroll: f.length > 3,
                choosedNum: h
            }, m = this.data.tags.selectedId, _ = g.list.find(function(e) {
                return e.id == m;
            });
            _ ? g.selectedId = _.id : g.list.length && (g.selectedId = g.list[0].id), this.fetchTakeAwayStartFee(), 
            t ? (this.setData({
                banner: d,
                tags: g
            }), this.fetchTakeAwayThemeGoods(!0)) : (this.setData({
                banner: d,
                tags: g,
                goods: {}
            }), this.fetchTakeAwayThemeGoods());
            var v = (f[0] || {}).id || "";
            this.setData({
                "theme.takeAway.tagtaped": !1,
                "theme.takeAway.selectedTagId": v,
                "theme.takeAway.fetchToTargetIndex": 0,
                "theme.takeAway.currentScrollOffset": 0,
                "theme.takeAway.goodsListIntoView": "",
                "theme.takeAway.showAnimation": !1,
                "theme.takeAway.MAX_VALUE": Number.MAX_VALUE,
                "theme.takeAway.takeoutCartData": [],
                "theme.takeAway.choosedGoods": {},
                "theme.takeAway.showTakeoutCart": !1,
                "theme.takeAway.allChoosedPrice": 0,
                "theme.takeAway.allChoosedNum": 0
            }), r.on("component:sku:cart", function(e) {
                "add" == e.type && "takeAway" == n.data.type && n.showZanToast("添加购物车成功~");
            }, this);
        },
        fetchTakeAwayStartFee: function() {
            var e = this;
            r.request({
                path: "v2/showcase/tplStartFee/startfee.json",
                query: {
                    offline_id: r.getOfflineId() || 0
                }
            }).then(function(t) {
                e.setData({
                    "theme.takeAway.takeAwayStartFee": t
                });
            });
        },
        fetchTakeAwayThemeGoods: function(e) {
            var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = this.data.goods, i = this.data.tags.list[n] || {}, r = i.id, c = i.alias;
            e && (o = {}), o[r] || (o[r] = {
                list: e && (this.data.goods[r] || {}).list || [],
                p: 0,
                loading: !1,
                nomore: !1,
                nodata: !1
            });
            var u = o[r];
            u.nomore || u.nodata || u.loading ? setTimeout(function() {
                return t.setData({
                    "theme.takeAway.tagtaped": !1
                });
            }, 300) : (u.loading = !0, this.setData({
                goods: o
            }), this.fetchGoodsByTagAlias(c, 1, {
                page_size: 100,
                success: function(n) {
                    var i = n.items || [];
                    i.forEach(function(e) {
                        e.pic_url = s(e.pic_url, "!300x300.jpg");
                    }), u.list = e ? i : u.list.concat(i || []), 0 === i.length && (u.nodata = !0), 
                    u.nomore = !0, u.loading = !1;
                    var r = t.data.theme.takeAway.choosedGoods;
                    if (u.list.forEach(function(e) {
                        r[e.alias] || (r[e.alias] = {
                            noneSku: !1,
                            stockNum: 0,
                            num: 0,
                            added: !1
                        });
                    }), t.setData({
                        goods: o,
                        "theme.takeAway.choosedGoods": r
                    }, function() {
                        console.log("choose set", r);
                    }), t.data.theme.takeAway.tagtaped) {
                        var c = t.data.theme.takeAway.selectedTagId;
                        t.setData({
                            "theme.takeAway.goodsListIntoView": "tag-goods-" + c
                        });
                    }
                    a.success ? a.success(i, u) : t.ThemeTakeAwayFetchNextPage();
                },
                fail: function(e) {
                    5e4 === e.code && (u.nodata = !0), u.loading = !1, t.setData({
                        goods: o
                    });
                }
            }));
        },
        handleThemeTakeAwayTagTap: function(e) {
            var t = e.currentTarget.dataset.tagId, n = e.currentTarget.dataset.tagIndex;
            console.log(this.data), this.setData({
                "theme.takeAway.tagtaped": !0,
                "theme.takeAway.selectedTagId": t,
                "theme.takeAway.goodsListIntoView": "tag-goods-" + t
            }), this.fetchTakeAwayThemeGoods(!1, n);
        },
        handleThemeTakeAwayGoodsListScroll: function(e) {
            this.setData({
                "theme.takeAway.currentScrollOffset": e.detail.scrollTop
            }), this.ThemeTakeAwayCalculateActiveTag(e.detail.scrollTop), this.ThemeTakeAwayFetchNextPage();
        },
        handleThemeTakeAwayGoodsNumChange: function(e) {
            var t = e.detail, n = t.num, a = t.key, o = t.type, i = this.data.theme.takeAway, r = i.takeoutCartData, s = i.choosedGoods, c = a.split("-")[0], u = s[c], l = r.findIndex(function(e) {
                return e.key === a;
            }), d = "minus" === o ? u.num - 1 : u.num + 1;
            this.updateTakeAwayChoosedGoods(c, d), this.updateTakeAwayCartData(l, a, n);
        },
        toggleThemeTakeAwayBannerDialog: function() {
            this.setData({
                "banner.showDialog": !this.data.banner.showDialog
            });
        },
        toggleThemeTakeAwayCart: function(e) {
            var t = !this.data.theme.takeAway.showTakeoutCart;
            void 0 !== e.detail && (t = e.detail), this.setData({
                "theme.takeAway.showTakeoutCart": t
            });
        },
        clearThemeTakeAwayCart: function() {
            var e = this.data.theme.takeAway.choosedGoods;
            for (var t in e) e[t] = {
                num: 0,
                stockNum: 0,
                noneSku: !1,
                added: !1
            };
            this.setData({
                "theme.takeAway.takeoutCartData": [],
                "theme.takeAway.choosedGoods": e,
                "theme.takeAway.allChoosedPrice": 0,
                "theme.takeAway.allChoosedNum": 0
            }), this.updateTakeAwayTagChoosed();
        },
        ThemeTakeAwayFetchNextPage: function() {
            var e = this, t = this.data.theme.takeAway.currentScrollOffset || 0;
            if (this.ThemeTakeAwayGetAllGoodsHeight() - t - this.data.systemInfo.windowHeight > 300) setTimeout(function() {
                return e.setData({
                    "theme.takeAway.tagtaped": !1
                });
            }, 300); else {
                var n = this.ThemeTakeAwayGetNextTag().currentTagIndex;
                n < 0 || this.fetchTakeAwayThemeGoods(!1, n);
            }
        },
        ThemeTakeAwayGetAllGoodsHeight: function() {
            for (var e = this.data.tags.list, t = this.data.goods, n = 0, a = 0; a < e.length; a++) {
                var o = t[e[a].id] || {};
                if (o.nodata) return void (n += 81);
                if (n += 76 * (o.list || []).length, !o.nomore) break;
            }
            return n;
        },
        ThemeTakeAwayGetNextTag: function() {
            var e = this.data.tags.list, t = this.data.goods, n = e.findIndex(function(e) {
                var n = e.id, a = t[n];
                return !a || !a.nomore && !a.nodata;
            });
            return {
                currentTagIndex: n,
                tag: e[n]
            };
        },
        ThemeTakeAwayCalculateActiveTag: function(e) {
            if (!this.data.theme.takeAway.tagtaped) {
                for (var t = this.data.tags.list || [], n = this.data.goods || {}, a = 0, o = 0; a < e + 1 && o < t.length; ) {
                    var i = n[t[o].id] || {
                        list: []
                    };
                    a += 27 + (i.nodata ? 54 : 76 * i.list.length), o++;
                }
                this.setData({
                    "theme.takeAway.selectedTagId": t[o - 1].id
                });
            }
        },
        ThemeTakeAwayHandleShowGoodsDetail: function(e) {
            var t = e.currentTarget.dataset.alias;
            i.navigate({
                url: "/pages/goods/detail/index?alias=" + t
            });
        },
        ThemeTakeAwayhandleGoodsBuy: function(e) {
            var t = e.detail.value, n = e.currentTarget.dataset.alias, a = this.data.theme.takeAway, o = a.choosedGoods, i = a.takeoutCartData, r = o[n];
            if (r && r.added && r.noneSku) {
                var s = n + "-empty", c = i.findIndex(function(e) {
                    return e.key === s;
                });
                return this.updateTakeAwayChoosedGoods(n, t), void this.updateTakeAwayCartData(c, s, t);
            }
            this.showComponentSKU({
                alias: n,
                needFetch: !0,
                btns: [ "cart" ],
                callback: {
                    fn: this.ThemeTakeAwayhandleSkuSelected,
                    context: this
                }
            });
        },
        ThemeTakeAwayhandleGoodsOverlimit: function(e) {
            "minus" === e.detail.type && wx.showToast({
                title: "多规格商品请到购物车中删除",
                icon: "none"
            });
        },
        ThemeTakeAwayGetSkuKey: function(e) {
            var t = e.alias, n = e.skuId, a = e.noneSku;
            return t + "-" + (void 0 !== a && a ? "empty" : n);
        },
        ThemeTakeAwayhandleSkuSelected: function(e) {
            var t = e.alias, n = e.num;
            console.log("selected ======", e);
            var a = this.ThemeTakeAwayGetSkuKey(e), o = this.data.theme.takeAway.takeoutCartData, i = o.findIndex(function(e) {
                return e.key === a;
            });
            if (i < 0) this.addTakeAwayCartData(e); else {
                var r = o[i], s = r.num + n;
                if (!(r.stockNum >= s)) return void wx.showToast({
                    title: "库存不足",
                    icon: "none"
                });
                this.updateTakeAwayCartData(i, a, s);
            }
            var c = this.data.theme.takeAway.choosedGoods[t];
            if (c && c.added) {
                var u = c.num + n;
                this.updateTakeAwayChoosedGoods(t, u);
            } else this.addTakeAwayChoosedGoods(e);
        },
        updateTakeAwayChoosedGoods: function(e, t) {
            var n = this.data.theme.takeAway.choosedGoods;
            0 === t ? (n[e] = {
                num: 0,
                stockNum: 0,
                noneSku: !1,
                added: !1
            }, this.setData({
                "theme.takeAway.choosedGoods": n
            })) : this.setData(a({}, "theme.takeAway.choosedGoods." + e, o({}, n[e], {
                num: t
            })));
        },
        addTakeAwayChoosedGoods: function(e) {
            var t = e.num, n = e.noneSku, o = void 0 !== n && n, i = e.alias, r = {
                num: t,
                noneSku: o,
                stockNum: e.stockNum,
                added: !0
            };
            this.setData(a({}, "theme.takeAway.choosedGoods." + i, r));
        },
        updateTakeAwayCartData: function(e, t, n) {
            var i = this.data.theme.takeAway.takeoutCartData;
            0 === n ? (i.splice(e, 1), this.setData({
                "theme.takeAway.takeoutCartData": i
            }, this.updateTakeAwayAllChoosed)) : this.setData(a({}, "theme.takeAway.takeoutCartData[" + e + "]", o({}, i[e], {
                num: n
            })), this.updateTakeAwayAllChoosed);
        },
        addTakeAwayCartData: function(e) {
            var t = this.data.theme.takeAway.takeoutCartData;
            e.key = this.ThemeTakeAwayGetSkuKey(e), e.skuName = e.skuName.length ? e.skuName.join(" ") : "", 
            t.push(e), this.setData({
                "theme.takeAway.takeoutCartData": t
            }, this.updateTakeAwayAllChoosed);
        },
        updateTakeAwayAllChoosed: function() {
            var e = 0, t = 0;
            this.data.theme.takeAway.takeoutCartData.forEach(function(n) {
                e += n.num, t += n.price * n.num;
            }), this.setData({
                "theme.takeAway.allChoosedNum": e,
                "theme.takeAway.allChoosedPrice": t
            }), this.updateTakeAwayTagChoosed();
        },
        updateTakeAwayTagChoosed: function() {
            var e = this.data, t = e.tags, n = e.goods, a = e.theme.takeAway.choosedGoods, i = [];
            t.list.forEach(function(e) {
                var t = e.id;
                if (n[t]) {
                    var o = 0;
                    n[t].list.forEach(function(e) {
                        var t = e.alias;
                        o += a[t].num;
                    }), i.push(o);
                } else i.push(0);
            }), this.setData({
                tags: o({}, t, {
                    choosedNum: i
                })
            });
        }
    };
}, function(e, t, n) {
    var a = n(2), o = getApp();
    e.exports = {
        fetchDefaultThemeDataSuccess: function(e, t) {
            e[0] && "config" === e[0].type && e[0].is_global_setting && e.shift();
            var n = e[0] || {};
            "config" !== n.type && (n = e.reduce(function(e, t) {
                return Object.assign(e, t);
            }, {}));
            var a = {
                logo: n.logo || o.globalData.shopLogo
            }, i = {
                list: n.tags || [],
                scroll: (n.tags || []).length > 3,
                height: 45
            }, r = this.data.tags.selectedId, s = i.list.find(function(e) {
                return e.id == r;
            });
            i.selectedId = s ? s.id : (i.list[0] || {}).id, t ? (this.setData({
                banner: a,
                tags: i
            }), this.fetchDefaultThemeGoods(!0)) : (this.setData({
                banner: a,
                tags: i,
                goods: {}
            }), this.fetchDefaultThemeGoods());
        },
        fetchDefaultThemeGoods: function(e) {
            var t = this, n = this.data.goods, o = this.data.tags.selectedId;
            e && (n = {}), n[o] || (n[o] = {
                list: e && (this.data.goods[o] || {}).list || [],
                p: 0,
                loading: !1,
                nomore: !1,
                nodata: !1
            });
            var i = n[o];
            i.nomore || i.nodata || (i.loading = !0, this.setData({
                goods: n
            }), this.fetchGoodsByTagAlias(this.getDefaultThemeTagByTagId(o).alias, ++i.p, {
                success: function(o) {
                    var r = o.items || [];
                    r.forEach(function(e) {
                        e.pic_url = a(e.pic_url, "!300x300.jpg");
                    }), i.list = e ? r : i.list.concat(r || []), 0 === r.length && 1 === i.p ? i.nodata = !0 : r.length < 20 && (i.nomore = !0), 
                    t.setData({
                        goods: n
                    });
                },
                fail: function(e) {
                    5e4 === e.code && (i.nodata = !0, t.setData({
                        goods: n
                    }));
                },
                complete: function() {
                    i.loading = !1, t.setData({
                        goods: n
                    });
                }
            }));
        },
        getDefaultThemeTagByTagId: function(e) {
            return (this.data.tags.list || []).find(function(t) {
                return t.id == e;
            }) || {};
        },
        handleDefaultThemeScroll: function(e) {
            var t = e.detail.scrollTop, n = Math.floor(345 * o.getSystemInfoSync().windowWidth / 750);
            this.setData({
                fixedGoodsTag: n <= t
            }), this.data.scrollTop = t;
        },
        handleDefaultThemeScrollToUpper: function() {
            this.setData({
                fixedGoodsTag: !1
            });
        },
        handleDefaultThemeScrollToLower: function() {
            var e = this.data.goods[this.data.tags.selectedId];
            e.loading || e.nomore || e.nodata || this.fetchDefaultThemeGoods();
        },
        handleDefaultThemeZuiTabChange: function(e) {
            var t = this, n = e.selectedId, a = this.data, i = a.goods[n];
            this.setData({
                "tags.selectedId": n
            });
            var r = Math.floor(345 * o.getSystemInfoSync().windowWidth / 750);
            a.scrollTop > r && (this.setData({
                scrollIntoView: "tags"
            }), setTimeout(function() {
                t.setData({
                    scrollIntoView: ""
                });
            }, 100)), i || this.fetchDefaultThemeGoods();
        }
    };
}, , , , function(e, t, n) {
    var a;
    void 0 === (a = function(e, t, n) {
        var a, o, i = i || function(e, t) {
            var n = {}, a = n.lib = {}, o = function() {}, i = a.Base = {
                extend: function(e) {
                    o.prototype = this;
                    var t = new o();
                    return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function() {
                        t.$super.init.apply(this, arguments);
                    }), t.init.prototype = t, t.$super = this, t;
                },
                create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e;
                },
                init: function() {},
                mixIn: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            }, r = a.WordArray = i.extend({
                init: function(e, t) {
                    e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;
                },
                toString: function(e) {
                    return (e || c).stringify(this);
                },
                concat: function(e) {
                    var t = this.words, n = e.words, a = this.sigBytes;
                    if (e = e.sigBytes, this.clamp(), a % 4) for (var o = 0; o < e; o++) t[a + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (a + o) % 4 * 8; else if (65535 < n.length) for (o = 0; o < e; o += 4) t[a + o >>> 2] = n[o >>> 2]; else t.push.apply(t, n);
                    return this.sigBytes += e, this;
                },
                clamp: function() {
                    var t = this.words, n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e.words = this.words.slice(0), e;
                },
                random: function(t) {
                    for (var n = [], a = 0; a < t; a += 4) n.push(4294967296 * e.random() | 0);
                    return new r.init(n, t);
                }
            }), s = n.enc = {}, c = s.Hex = {
                stringify: function(e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var n = [], a = 0; a < e; a++) {
                        var o = t[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                        n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));
                    }
                    return n.join("");
                },
                parse: function(e) {
                    for (var t = e.length, n = [], a = 0; a < t; a += 2) n[a >>> 3] |= parseInt(e.substr(a, 2), 16) << 24 - a % 8 * 4;
                    return new r.init(n, t / 2);
                }
            }, u = s.Latin1 = {
                stringify: function(e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var n = [], a = 0; a < e; a++) n.push(String.fromCharCode(t[a >>> 2] >>> 24 - a % 4 * 8 & 255));
                    return n.join("");
                },
                parse: function(e) {
                    for (var t = e.length, n = [], a = 0; a < t; a++) n[a >>> 2] |= (255 & e.charCodeAt(a)) << 24 - a % 4 * 8;
                    return new r.init(n, t);
                }
            }, l = s.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(u.stringify(e)));
                    } catch (e) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function(e) {
                    return u.parse(unescape(encodeURIComponent(e)));
                }
            }, d = a.BufferedBlockAlgorithm = i.extend({
                reset: function() {
                    this._data = new r.init(), this._nDataBytes = 0;
                },
                _append: function(e) {
                    "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
                },
                _process: function(t) {
                    var n = this._data, a = n.words, o = n.sigBytes, i = this.blockSize, s = o / (4 * i);
                    if (t = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i, o = e.min(4 * t, o), 
                    t) {
                        for (var c = 0; c < t; c += i) this._doProcessBlock(a, c);
                        c = a.splice(0, t), n.sigBytes -= o;
                    }
                    return new r.init(c, o);
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._data = this._data.clone(), e;
                },
                _minBufferSize: 0
            });
            a.Hasher = d.extend({
                cfg: i.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e), this.reset();
                },
                reset: function() {
                    d.reset.call(this), this._doReset();
                },
                update: function(e) {
                    return this._append(e), this._process(), this;
                },
                finalize: function(e) {
                    return e && this._append(e), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, n) {
                        return new e.init(n).finalize(t);
                    };
                },
                _createHmacHelper: function(e) {
                    return function(t, n) {
                        return new p.HMAC.init(e, n).finalize(t);
                    };
                }
            });
            var p = n.algo = {};
            return n;
        }(Math);
        o = (a = i).lib.WordArray, a.enc.Base64 = {
            stringify: function(e) {
                var t = e.words, n = e.sigBytes, a = this._map;
                e.clamp(), e = [];
                for (var o = 0; o < n; o += 3) for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, r = 0; 4 > r && o + .75 * r < n; r++) e.push(a.charAt(i >>> 6 * (3 - r) & 63));
                if (t = a.charAt(64)) for (;e.length % 4; ) e.push(t);
                return e.join("");
            },
            parse: function(e) {
                var t = e.length, n = this._map;
                (a = n.charAt(64)) && -1 != (a = e.indexOf(a)) && (t = a);
                for (var a = [], i = 0, r = 0; r < t; r++) if (r % 4) {
                    var s = n.indexOf(e.charAt(r - 1)) << r % 4 * 2, c = n.indexOf(e.charAt(r)) >>> 6 - r % 4 * 2;
                    a[i >>> 2] |= (s | c) << 24 - i % 4 * 8, i++;
                }
                return o.create(a, i);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }, function(e) {
            function t(e, t, n, a, o, i, r) {
                return ((e = e + (t & n | ~t & a) + o + r) << i | e >>> 32 - i) + t;
            }
            function n(e, t, n, a, o, i, r) {
                return ((e = e + (t & a | n & ~a) + o + r) << i | e >>> 32 - i) + t;
            }
            function a(e, t, n, a, o, i, r) {
                return ((e = e + (t ^ n ^ a) + o + r) << i | e >>> 32 - i) + t;
            }
            function o(e, t, n, a, o, i, r) {
                return ((e = e + (n ^ (t | ~a)) + o + r) << i | e >>> 32 - i) + t;
            }
            for (var r = i, s = (u = r.lib).WordArray, c = u.Hasher, u = r.algo, l = [], d = 0; 64 > d; d++) l[d] = 4294967296 * e.abs(e.sin(d + 1)) | 0;
            u = u.MD5 = c.extend({
                _doReset: function() {
                    this._hash = new s.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
                },
                _doProcessBlock: function(e, i) {
                    for (var r = 0; 16 > r; r++) {
                        var s = e[d = i + r];
                        e[d] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
                    }
                    r = this._hash.words;
                    var c, u, d = e[i + 0], p = (s = e[i + 1], e[i + 2]), f = e[i + 3], h = e[i + 4], g = e[i + 5], m = e[i + 6], _ = e[i + 7], v = e[i + 8], y = e[i + 9], b = e[i + 10], w = e[i + 11], x = e[i + 12], S = e[i + 13], T = e[i + 14], k = e[i + 15], D = r[0], C = o(C = o(C = o(C = o(C = a(C = a(C = a(C = a(C = n(C = n(C = n(C = n(C = t(C = t(C = t(C = t(C = r[1], u = t(u = r[2], c = t(c = r[3], D = t(D, C, u, c, d, 7, l[0]), C, u, s, 12, l[1]), D, C, p, 17, l[2]), c, D, f, 22, l[3]), u = t(u, c = t(c, D = t(D, C, u, c, h, 7, l[4]), C, u, g, 12, l[5]), D, C, m, 17, l[6]), c, D, _, 22, l[7]), u = t(u, c = t(c, D = t(D, C, u, c, v, 7, l[8]), C, u, y, 12, l[9]), D, C, b, 17, l[10]), c, D, w, 22, l[11]), u = t(u, c = t(c, D = t(D, C, u, c, x, 7, l[12]), C, u, S, 12, l[13]), D, C, T, 17, l[14]), c, D, k, 22, l[15]), u = n(u, c = n(c, D = n(D, C, u, c, s, 5, l[16]), C, u, m, 9, l[17]), D, C, w, 14, l[18]), c, D, d, 20, l[19]), u = n(u, c = n(c, D = n(D, C, u, c, g, 5, l[20]), C, u, b, 9, l[21]), D, C, k, 14, l[22]), c, D, h, 20, l[23]), u = n(u, c = n(c, D = n(D, C, u, c, y, 5, l[24]), C, u, T, 9, l[25]), D, C, f, 14, l[26]), c, D, v, 20, l[27]), u = n(u, c = n(c, D = n(D, C, u, c, S, 5, l[28]), C, u, p, 9, l[29]), D, C, _, 14, l[30]), c, D, x, 20, l[31]), u = a(u, c = a(c, D = a(D, C, u, c, g, 4, l[32]), C, u, v, 11, l[33]), D, C, w, 16, l[34]), c, D, T, 23, l[35]), u = a(u, c = a(c, D = a(D, C, u, c, s, 4, l[36]), C, u, h, 11, l[37]), D, C, _, 16, l[38]), c, D, b, 23, l[39]), u = a(u, c = a(c, D = a(D, C, u, c, S, 4, l[40]), C, u, d, 11, l[41]), D, C, f, 16, l[42]), c, D, m, 23, l[43]), u = a(u, c = a(c, D = a(D, C, u, c, y, 4, l[44]), C, u, x, 11, l[45]), D, C, k, 16, l[46]), c, D, p, 23, l[47]), u = o(u, c = o(c, D = o(D, C, u, c, d, 6, l[48]), C, u, _, 10, l[49]), D, C, T, 15, l[50]), c, D, g, 21, l[51]), u = o(u, c = o(c, D = o(D, C, u, c, x, 6, l[52]), C, u, f, 10, l[53]), D, C, b, 15, l[54]), c, D, s, 21, l[55]), u = o(u, c = o(c, D = o(D, C, u, c, v, 6, l[56]), C, u, k, 10, l[57]), D, C, m, 15, l[58]), c, D, S, 21, l[59]), u = o(u, c = o(c, D = o(D, C, u, c, h, 6, l[60]), C, u, w, 10, l[61]), D, C, p, 15, l[62]), c, D, y, 21, l[63]);
                    r[0] = r[0] + D | 0, r[1] = r[1] + C | 0, r[2] = r[2] + u | 0, r[3] = r[3] + c | 0;
                },
                _doFinalize: function() {
                    var t = this._data, n = t.words, a = 8 * this._nDataBytes, o = 8 * t.sigBytes;
                    n[o >>> 5] |= 128 << 24 - o % 32;
                    var i = e.floor(a / 4294967296);
                    for (n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), 
                    n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), 
                    t.sigBytes = 4 * (n.length + 1), this._process(), n = (t = this._hash).words, a = 0; 4 > a; a++) o = n[a], 
                    n[a] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
                    return t;
                },
                clone: function() {
                    var e = c.clone.call(this);
                    return e._hash = this._hash.clone(), e;
                }
            }), r.MD5 = c._createHelper(u), r.HmacMD5 = c._createHmacHelper(u);
        }(Math), function() {
            var e, t = i, n = (e = t.lib).Base, a = e.WordArray, o = (e = t.algo).EvpKDF = n.extend({
                cfg: n.extend({
                    keySize: 4,
                    hasher: e.MD5,
                    iterations: 1
                }),
                init: function(e) {
                    this.cfg = this.cfg.extend(e);
                },
                compute: function(e, t) {
                    for (var n = (s = this.cfg).hasher.create(), o = a.create(), i = o.words, r = s.keySize, s = s.iterations; i.length < r; ) {
                        c && n.update(c);
                        var c = n.update(e).finalize(t);
                        n.reset();
                        for (var u = 1; u < s; u++) c = n.finalize(c), n.reset();
                        o.concat(c);
                    }
                    return o.sigBytes = 4 * r, o;
                }
            });
            t.EvpKDF = function(e, t, n) {
                return o.create(n).compute(e, t);
            };
        }(), i.lib.Cipher || function(e) {
            var t = (h = i).lib, n = t.Base, a = t.WordArray, o = t.BufferedBlockAlgorithm, r = h.enc.Base64, s = h.algo.EvpKDF, c = t.Cipher = o.extend({
                cfg: n.extend(),
                createEncryptor: function(e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t);
                },
                createDecryptor: function(e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t);
                },
                init: function(e, t, n) {
                    this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset();
                },
                reset: function() {
                    o.reset.call(this), this._doReset();
                },
                process: function(e) {
                    return this._append(e), this._process();
                },
                finalize: function(e) {
                    return e && this._append(e), this._doFinalize();
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: function(e) {
                    return {
                        encrypt: function(t, n, a) {
                            return ("string" == typeof n ? g : f).encrypt(e, t, n, a);
                        },
                        decrypt: function(t, n, a) {
                            return ("string" == typeof n ? g : f).decrypt(e, t, n, a);
                        }
                    };
                }
            });
            t.StreamCipher = c.extend({
                _doFinalize: function() {
                    return this._process(!0);
                },
                blockSize: 1
            });
            var u = h.mode = {}, l = function(e, t, n) {
                var a = this._iv;
                a ? this._iv = void 0 : a = this._prevBlock;
                for (var o = 0; o < n; o++) e[t + o] ^= a[o];
            }, d = (t.BlockCipherMode = n.extend({
                createEncryptor: function(e, t) {
                    return this.Encryptor.create(e, t);
                },
                createDecryptor: function(e, t) {
                    return this.Decryptor.create(e, t);
                },
                init: function(e, t) {
                    this._cipher = e, this._iv = t;
                }
            })).extend();
            d.Encryptor = d.extend({
                processBlock: function(e, t) {
                    var n = this._cipher, a = n.blockSize;
                    l.call(this, e, t, a), n.encryptBlock(e, t), this._prevBlock = e.slice(t, t + a);
                }
            }), d.Decryptor = d.extend({
                processBlock: function(e, t) {
                    var n = this._cipher, a = n.blockSize, o = e.slice(t, t + a);
                    n.decryptBlock(e, t), l.call(this, e, t, a), this._prevBlock = o;
                }
            }), u = u.CBC = d, d = (h.pad = {}).Pkcs7 = {
                pad: function(e, t) {
                    for (var n, o = (n = (n = 4 * t) - e.sigBytes % n) << 24 | n << 16 | n << 8 | n, i = [], r = 0; r < n; r += 4) i.push(o);
                    n = a.create(i, n), e.concat(n);
                },
                unpad: function(e) {
                    e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2];
                }
            }, t.BlockCipher = c.extend({
                cfg: c.cfg.extend({
                    mode: u,
                    padding: d
                }),
                reset: function() {
                    c.reset.call(this);
                    var e = (t = this.cfg).iv, t = t.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) var n = t.createEncryptor; else n = t.createDecryptor, 
                    this._minBufferSize = 1;
                    this._mode = n.call(t, this, e && e.words);
                },
                _doProcessBlock: function(e, t) {
                    this._mode.processBlock(e, t);
                },
                _doFinalize: function() {
                    var e = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        e.pad(this._data, this.blockSize);
                        var t = this._process(!0);
                    } else t = this._process(!0), e.unpad(t);
                    return t;
                },
                blockSize: 4
            });
            var p = t.CipherParams = n.extend({
                init: function(e) {
                    this.mixIn(e);
                },
                toString: function(e) {
                    return (e || this.formatter).stringify(this);
                }
            }), f = (u = (h.format = {}).OpenSSL = {
                stringify: function(e) {
                    var t = e.ciphertext;
                    return ((e = e.salt) ? a.create([ 1398893684, 1701076831 ]).concat(e).concat(t) : t).toString(r);
                },
                parse: function(e) {
                    var t = (e = r.parse(e)).words;
                    if (1398893684 == t[0] && 1701076831 == t[1]) {
                        var n = a.create(t.slice(2, 4));
                        t.splice(0, 4), e.sigBytes -= 16;
                    }
                    return p.create({
                        ciphertext: e,
                        salt: n
                    });
                }
            }, t.SerializableCipher = n.extend({
                cfg: n.extend({
                    format: u
                }),
                encrypt: function(e, t, n, a) {
                    a = this.cfg.extend(a);
                    var o = e.createEncryptor(n, a);
                    return t = o.finalize(t), o = o.cfg, p.create({
                        ciphertext: t,
                        key: n,
                        iv: o.iv,
                        algorithm: e,
                        mode: o.mode,
                        padding: o.padding,
                        blockSize: e.blockSize,
                        formatter: a.format
                    });
                },
                decrypt: function(e, t, n, a) {
                    return a = this.cfg.extend(a), t = this._parse(t, a.format), e.createDecryptor(n, a).finalize(t.ciphertext);
                },
                _parse: function(e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e;
                }
            })), h = (h.kdf = {}).OpenSSL = {
                execute: function(e, t, n, o) {
                    return o || (o = a.random(8)), e = s.create({
                        keySize: t + n
                    }).compute(e, o), n = a.create(e.words.slice(t), 4 * n), e.sigBytes = 4 * t, p.create({
                        key: e,
                        iv: n,
                        salt: o
                    });
                }
            }, g = t.PasswordBasedCipher = f.extend({
                cfg: f.cfg.extend({
                    kdf: h
                }),
                encrypt: function(e, t, n, a) {
                    return n = (a = this.cfg.extend(a)).kdf.execute(n, e.keySize, e.ivSize), a.iv = n.iv, 
                    (e = f.encrypt.call(this, e, t, n.key, a)).mixIn(n), e;
                },
                decrypt: function(e, t, n, a) {
                    return a = this.cfg.extend(a), t = this._parse(t, a.format), n = a.kdf.execute(n, e.keySize, e.ivSize, t.salt), 
                    a.iv = n.iv, f.decrypt.call(this, e, t, n.key, a);
                }
            });
        }(), function() {
            for (var e = i, t = e.lib.BlockCipher, n = e.algo, a = [], o = [], r = [], s = [], c = [], u = [], l = [], d = [], p = [], f = [], h = [], g = 0; 256 > g; g++) h[g] = 128 > g ? g << 1 : g << 1 ^ 283;
            var m = 0, _ = 0;
            for (g = 0; 256 > g; g++) {
                var v = (v = _ ^ _ << 1 ^ _ << 2 ^ _ << 3 ^ _ << 4) >>> 8 ^ 255 & v ^ 99;
                a[m] = v, o[v] = m;
                var y = h[m], b = h[y], w = h[b], x = 257 * h[v] ^ 16843008 * v;
                r[m] = x << 24 | x >>> 8, s[m] = x << 16 | x >>> 16, c[m] = x << 8 | x >>> 24, u[m] = x, 
                x = 16843009 * w ^ 65537 * b ^ 257 * y ^ 16843008 * m, l[v] = x << 24 | x >>> 8, 
                d[v] = x << 16 | x >>> 16, p[v] = x << 8 | x >>> 24, f[v] = x, m ? (m = y ^ h[h[h[w ^ y]]], 
                _ ^= h[h[_]]) : m = _ = 1;
            }
            var S = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
            n = n.AES = t.extend({
                _doReset: function() {
                    for (var e = (n = this._key).words, t = n.sigBytes / 4, n = 4 * ((this._nRounds = t + 6) + 1), o = this._keySchedule = [], i = 0; i < n; i++) if (i < t) o[i] = e[i]; else {
                        var r = o[i - 1];
                        i % t ? 6 < t && 4 == i % t && (r = a[r >>> 24] << 24 | a[r >>> 16 & 255] << 16 | a[r >>> 8 & 255] << 8 | a[255 & r]) : (r = a[(r = r << 8 | r >>> 24) >>> 24] << 24 | a[r >>> 16 & 255] << 16 | a[r >>> 8 & 255] << 8 | a[255 & r], 
                        r ^= S[i / t | 0] << 24), o[i] = o[i - t] ^ r;
                    }
                    for (e = this._invKeySchedule = [], t = 0; t < n; t++) i = n - t, r = t % 4 ? o[i] : o[i - 4], 
                    e[t] = 4 > t || 4 >= i ? r : l[a[r >>> 24]] ^ d[a[r >>> 16 & 255]] ^ p[a[r >>> 8 & 255]] ^ f[a[255 & r]];
                },
                encryptBlock: function(e, t) {
                    this._doCryptBlock(e, t, this._keySchedule, r, s, c, u, a);
                },
                decryptBlock: function(e, t) {
                    var n = e[t + 1];
                    e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, l, d, p, f, o), 
                    n = e[t + 1], e[t + 1] = e[t + 3], e[t + 3] = n;
                },
                _doCryptBlock: function(e, t, n, a, o, i, r, s) {
                    for (var c = this._nRounds, u = e[t] ^ n[0], l = e[t + 1] ^ n[1], d = e[t + 2] ^ n[2], p = e[t + 3] ^ n[3], f = 4, h = 1; h < c; h++) {
                        var g = a[u >>> 24] ^ o[l >>> 16 & 255] ^ i[d >>> 8 & 255] ^ r[255 & p] ^ n[f++], m = a[l >>> 24] ^ o[d >>> 16 & 255] ^ i[p >>> 8 & 255] ^ r[255 & u] ^ n[f++], _ = a[d >>> 24] ^ o[p >>> 16 & 255] ^ i[u >>> 8 & 255] ^ r[255 & l] ^ n[f++];
                        p = a[p >>> 24] ^ o[u >>> 16 & 255] ^ i[l >>> 8 & 255] ^ r[255 & d] ^ n[f++], u = g, 
                        l = m, d = _;
                    }
                    g = (s[u >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[255 & p]) ^ n[f++], 
                    m = (s[l >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[p >>> 8 & 255] << 8 | s[255 & u]) ^ n[f++], 
                    _ = (s[d >>> 24] << 24 | s[p >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & l]) ^ n[f++], 
                    p = (s[p >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & d]) ^ n[f++], 
                    e[t] = g, e[t + 1] = m, e[t + 2] = _, e[t + 3] = p;
                },
                keySize: 8
            }), e.AES = t._createHelper(n);
        }(), i.pad.Iso10126 = {
            pad: function(e, t) {
                var n = (n = 4 * t) - e.sigBytes % n;
                e.concat(i.lib.WordArray.random(n - 1)).concat(i.lib.WordArray.create([ n << 24 ], 1));
            },
            unpad: function(e) {
                e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2];
            }
        }, n.exports = i;
    }.call(t, n, t, e)) || (e.exports = a);
}, , , , , , function(e, t, n) {
    var a;
    "function" == typeof Symbol && Symbol.iterator, function(o) {
        function i(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        function r(e, t, n, a, o, r) {
            return i((s = i(i(t, e), i(a, r))) << (c = o) | s >>> 32 - c, n);
            var s, c;
        }
        function s(e, t, n, a, o, i, s) {
            return r(t & n | ~t & a, e, t, o, i, s);
        }
        function c(e, t, n, a, o, i, s) {
            return r(t & a | n & ~a, e, t, o, i, s);
        }
        function u(e, t, n, a, o, i, s) {
            return r(t ^ n ^ a, e, t, o, i, s);
        }
        function l(e, t, n, a, o, i, s) {
            return r(n ^ (t | ~a), e, t, o, i, s);
        }
        function d(e, t) {
            var n, a, o, r, d;
            e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
            var p = 1732584193, f = -271733879, h = -1732584194, g = 271733878;
            for (n = 0; n < e.length; n += 16) a = p, o = f, r = h, d = g, f = l(f = l(f = l(f = l(f = u(f = u(f = u(f = u(f = c(f = c(f = c(f = c(f = s(f = s(f = s(f = s(f, h = s(h, g = s(g, p = s(p, f, h, g, e[n], 7, -680876936), f, h, e[n + 1], 12, -389564586), p, f, e[n + 2], 17, 606105819), g, p, e[n + 3], 22, -1044525330), h = s(h, g = s(g, p = s(p, f, h, g, e[n + 4], 7, -176418897), f, h, e[n + 5], 12, 1200080426), p, f, e[n + 6], 17, -1473231341), g, p, e[n + 7], 22, -45705983), h = s(h, g = s(g, p = s(p, f, h, g, e[n + 8], 7, 1770035416), f, h, e[n + 9], 12, -1958414417), p, f, e[n + 10], 17, -42063), g, p, e[n + 11], 22, -1990404162), h = s(h, g = s(g, p = s(p, f, h, g, e[n + 12], 7, 1804603682), f, h, e[n + 13], 12, -40341101), p, f, e[n + 14], 17, -1502002290), g, p, e[n + 15], 22, 1236535329), h = c(h, g = c(g, p = c(p, f, h, g, e[n + 1], 5, -165796510), f, h, e[n + 6], 9, -1069501632), p, f, e[n + 11], 14, 643717713), g, p, e[n], 20, -373897302), h = c(h, g = c(g, p = c(p, f, h, g, e[n + 5], 5, -701558691), f, h, e[n + 10], 9, 38016083), p, f, e[n + 15], 14, -660478335), g, p, e[n + 4], 20, -405537848), h = c(h, g = c(g, p = c(p, f, h, g, e[n + 9], 5, 568446438), f, h, e[n + 14], 9, -1019803690), p, f, e[n + 3], 14, -187363961), g, p, e[n + 8], 20, 1163531501), h = c(h, g = c(g, p = c(p, f, h, g, e[n + 13], 5, -1444681467), f, h, e[n + 2], 9, -51403784), p, f, e[n + 7], 14, 1735328473), g, p, e[n + 12], 20, -1926607734), h = u(h, g = u(g, p = u(p, f, h, g, e[n + 5], 4, -378558), f, h, e[n + 8], 11, -2022574463), p, f, e[n + 11], 16, 1839030562), g, p, e[n + 14], 23, -35309556), h = u(h, g = u(g, p = u(p, f, h, g, e[n + 1], 4, -1530992060), f, h, e[n + 4], 11, 1272893353), p, f, e[n + 7], 16, -155497632), g, p, e[n + 10], 23, -1094730640), h = u(h, g = u(g, p = u(p, f, h, g, e[n + 13], 4, 681279174), f, h, e[n], 11, -358537222), p, f, e[n + 3], 16, -722521979), g, p, e[n + 6], 23, 76029189), h = u(h, g = u(g, p = u(p, f, h, g, e[n + 9], 4, -640364487), f, h, e[n + 12], 11, -421815835), p, f, e[n + 15], 16, 530742520), g, p, e[n + 2], 23, -995338651), h = l(h, g = l(g, p = l(p, f, h, g, e[n], 6, -198630844), f, h, e[n + 7], 10, 1126891415), p, f, e[n + 14], 15, -1416354905), g, p, e[n + 5], 21, -57434055), h = l(h, g = l(g, p = l(p, f, h, g, e[n + 12], 6, 1700485571), f, h, e[n + 3], 10, -1894986606), p, f, e[n + 10], 15, -1051523), g, p, e[n + 1], 21, -2054922799), h = l(h, g = l(g, p = l(p, f, h, g, e[n + 8], 6, 1873313359), f, h, e[n + 15], 10, -30611744), p, f, e[n + 6], 15, -1560198380), g, p, e[n + 13], 21, 1309151649), h = l(h, g = l(g, p = l(p, f, h, g, e[n + 4], 6, -145523070), f, h, e[n + 11], 10, -1120210379), p, f, e[n + 2], 15, 718787259), g, p, e[n + 9], 21, -343485551), 
            p = i(p, a), f = i(f, o), h = i(h, r), g = i(g, d);
            return [ p, f, h, g ];
        }
        function p(e) {
            var t, n = "", a = 32 * e.length;
            for (t = 0; t < a; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
            return n;
        }
        function f(e) {
            var t, n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
            var a = 8 * e.length;
            for (t = 0; t < a; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
        }
        function h(e) {
            var t, n, a = "";
            for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), a += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
            return a;
        }
        function g(e) {
            return unescape(encodeURIComponent(e));
        }
        function m(e) {
            return function(e) {
                return p(d(f(e), 8 * e.length));
            }(g(e));
        }
        function _(e, t) {
            return function(e, t) {
                var n, a, o = f(e), i = [], r = [];
                for (i[15] = r[15] = void 0, o.length > 16 && (o = d(o, 8 * e.length)), n = 0; n < 16; n += 1) i[n] = 909522486 ^ o[n], 
                r[n] = 1549556828 ^ o[n];
                return a = d(i.concat(f(t)), 512 + 8 * t.length), p(d(r.concat(a), 640));
            }(g(e), g(t));
        }
        function v(e, t, n) {
            return t ? n ? _(t, e) : h(_(t, e)) : n ? m(e) : h(m(e));
        }
        void 0 === (a = function() {
            return v;
        }.call(t, n, t, e)) || (e.exports = a);
    }();
}, , function(e, t, n) {
    e.exports = {
        showZanTopTips: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = this.data.zanTopTips || {};
            a.timer && (clearTimeout(a.timer), a.timer = 0), "number" == typeof n && (n = {
                duration: n
            }), n = Object.assign({
                duration: 3e3
            }, n);
            var o = setTimeout(function() {
                e.setData({
                    "zanTopTips.show": !1,
                    "zanTopTips.timer": 0
                });
            }, n.duration);
            this.setData({
                zanTopTips: {
                    show: !0,
                    content: t,
                    options: n,
                    timer: o
                }
            });
        }
    };
}, function(e, t, n) {
    var a = n(21).extractComponentId, o = {
        _handleZanTabChange: function(e) {
            var t = {
                componentId: a(e),
                selectedId: e.currentTarget.dataset.itemId
            };
            console.info("[zan:tab:change]", t), this.handleZanTabChange ? this.handleZanTabChange(t) : console.warn("页面缺少 handleZanTabChange 回调函数");
        }
    };
    e.exports = o;
}, function(e, t, n) {
    var a = {
        _handleZanSwitchChange: function(e) {
            var t = e.currentTarget.dataset, n = !t.checked, a = t.loading, o = t.disabled, i = t.componentId;
            a || o || (console.info("[zan:switch:change]", {
                checked: n,
                componentId: i
            }), this.handleZanSwitchChange ? this.handleZanSwitchChange({
                checked: n,
                componentId: i
            }) : console.warn("页面缺少 handleZanSwitchChange 回调函数"));
        }
    };
    e.exports = a;
}, function(e, t, n) {
    function a(e, t) {
        var n = e.currentTarget.dataset, a = n.componentId, i = n.disabled, r = +n.stepper;
        if (i) return null;
        o.call(this, a, r + t);
    }
    function o(e, t) {
        var n = {
            componentId: e,
            stepper: t = +t
        };
        console.info("[zan:stepper:change]", n), this.handleZanStepperChange ? this.handleZanStepperChange(n) : console.warn("页面缺少 handleZanStepperChange 回调函数");
    }
    var i = {
        _handleZanStepperMinus: function(e) {
            a.call(this, e, -1);
        },
        _handleZanStepperPlus: function(e) {
            a.call(this, e, 1);
        },
        _handleZanStepperBlur: function(e) {
            var t = this, n = e.currentTarget.dataset, a = n.componentId, i = +n.max, r = +n.min, s = e.detail.value;
            return s ? ((s = +s) > i ? s = i : s < r && (s = r), o.call(this, a, s), "" + s) : (setTimeout(function() {
                o.call(t, a, r);
            }, 16), o.call(this, a, s), "" + s);
        }
    };
    e.exports = i;
}, function(e, t, n) {
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    var o = {
        initZanNoticeBarScroll: function(e) {
            var t = this;
            this.zanNoticeBarNode = this.zanNoticeBarNode || {}, this.zanNoticeBarNode["" + e] = {
                width: void 0,
                wrapWidth: void 0,
                animation: null,
                resetAnimation: null
            };
            var n = this.zanNoticeBarNode["" + e];
            wx.createSelectorQuery().in(this).select("#" + e + "__content").boundingClientRect(function(a) {
                a && a.width ? (n.width = a.width, wx.createSelectorQuery().in(t).select("#" + e + "__content-wrap").boundingClientRect(function(a) {
                    if (a && a.width && (n.wrapWidth = a.width, n.wrapWidth < n.width)) {
                        var o = n.width / 40 * 1e3;
                        n.animation = wx.createAnimation({
                            duration: o,
                            timingFunction: "linear"
                        }), n.resetAnimation = wx.createAnimation({
                            duration: 0,
                            timingFunction: "linear"
                        }), t.scrollZanNoticeBar(e, o);
                    }
                }).exec()) : console.warn("页面缺少 noticebar 元素");
            }).exec();
        },
        scrollZanNoticeBar: function(e, t) {
            var n = this, o = this.zanNoticeBarNode["" + e], i = o.resetAnimation.translateX(o.wrapWidth).step();
            this.setData(a({}, e + ".animationData", i.export()));
            var r = o.animation.translateX(40 * -t / 1e3).step();
            setTimeout(function() {
                n.setData(a({}, e + ".animationData", r.export()));
            }, 100), setTimeout(function() {
                n.scrollZanNoticeBar(e, t);
            }, t);
        }
    };
    e.exports = o;
}, function(e, t, n) {
    var a = n(21).extractComponentId;
    e.exports = {
        _handleZanFieldChange: function(e) {
            var t = a(e);
            if (e.componentId = t, console.info("[zan:field:change]", e), this.handleZanFieldChange) return this.handleZanFieldChange(e);
            console.warn("页面缺少 handleZanFieldChange 回调函数");
        },
        _handleZanFieldFocus: function(e) {
            var t = a(e);
            if (e.componentId = t, console.info("[zan:field:focus]", e), this.handleZanFieldFocus) return this.handleZanFieldFocus(e);
            console.warn("页面缺少 handleZanFieldFocus 回调函数");
        },
        _handleZanFieldBlur: function(e) {
            var t = a(e);
            if (e.componentId = t, console.info("[zan:field:blur]", e), this.handleZanFieldBlur) return this.handleZanFieldBlur(e);
            console.warn("页面缺少 handleZanFieldBlur 回调函数");
        }
    };
}, function(e, t, n) {
    var a = function() {};
    e.exports = {
        showZanDialog: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.buttons, a = void 0 === n ? [] : n, o = t.title, i = void 0 === o ? "" : o, r = t.content, s = void 0 === r ? " " : r, c = t.buttonsShowVertical, u = void 0 !== c && c, l = t.showConfirm, d = void 0 === l || l, p = t.confirmText, f = void 0 === p ? "确定" : p, h = t.confirmColor, g = void 0 === h ? "#3CC51F" : h, m = t.showCancel, _ = void 0 !== m && m, v = t.cancelText, y = void 0 === v ? "取消" : v, b = t.cancelColor, w = void 0 === b ? "#333" : b, x = !1;
            if (0 === a.length) {
                if (d && a.push({
                    type: "confirm",
                    text: f,
                    color: g
                }), _) {
                    var S = {
                        type: "cancel",
                        text: y,
                        color: w
                    };
                    u ? a.push(S) : a.unshift(S);
                }
            } else x = !0;
            return new Promise(function(t, n) {
                e.setData({
                    zanDialog: {
                        show: !0,
                        showCustomBtns: x,
                        buttons: a,
                        title: i,
                        content: s,
                        buttonsShowVertical: u,
                        showConfirm: d,
                        confirmText: f,
                        confirmColor: g,
                        showCancel: _,
                        cancelText: y,
                        cancelColor: w,
                        resolve: t,
                        reject: n
                    }
                });
            });
        },
        _handleZanDialogButtonClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset, o = void 0 === n ? {} : n, i = this.data.zanDialog || {}, r = i.resolve, s = void 0 === r ? a : r, c = i.reject, u = void 0 === c ? a : c;
            this.setData({
                zanDialog: {
                    show: !1
                }
            }), i.showCustomBtns ? s({
                type: o.type
            }) : "confirm" === o.type ? s({
                type: "confirm"
            }) : u({
                type: "cancel"
            });
        }
    };
}, function(e, t, n) {
    function a(e) {
        var t = e.componentId;
        console.info("[zan:actionsheet:cancel]"), this.handleZanActionsheetCancel ? this.handleZanActionsheetCancel({
            componentId: t
        }) : console.warn("页面缺少 handleZanActionsheetCancel 回调函数");
    }
    var o = n(21).extractComponentId;
    e.exports = {
        _handleZanActionsheetMaskClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, o = n.componentId;
            n.closeOnClickOverlay && a.call(this, {
                componentId: o
            });
        },
        _handleZanActionsheetCancelBtnClick: function(e) {
            var t = o(e);
            a.call(this, {
                componentId: t
            });
        },
        _handleZanActionsheetBtnClick: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset || {}, a = n.componentId, o = n.index;
            this.handleZanActionsheetClick ? this.handleZanActionsheetClick({
                componentId: a,
                index: o
            }) : console.warn("页面缺少 handleZanActionsheetClick 回调函数");
        }
    };
}, function(e, t, n) {
    var a, o, i;
    o = [ e, t ], void 0 === (i = "function" == typeof (a = function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n, a, o = (n = new Date(), a = +n, function(e, t) {
            if (void 0 === t) return function(e) {
                var t = document.cookie, n = "\\b" + e + "=", a = t.search(n);
                if (a < 0) return "";
                a += n.length - 2;
                var o = t.indexOf(";", a);
                return o < 0 && (o = t.length), t.substring(a, o) || "";
            }(e);
            if ("string" == typeof t || t instanceof String) {
                if (t) return document.cookie = e + "=" + t + ";", t;
                t = {
                    expires: -100
                };
            }
            var o = e + "=" + ((t = t || {}).value || "") + ";";
            delete t.value, void 0 !== t.expires && (n.setTime(a + 864e5 * t.expires), t.expires = n.toGMTString()), 
            o += function(e, t, n) {
                if (!e) return "";
                var a = [];
                for (var o in e) e.hasOwnProperty(o) && a.push(encodeURIComponent(o) + "=" + e[o]);
                return a.join(";");
            }(t), document.cookie = o;
        });
        t.default = o, e.exports = t.default;
    }) ? a.apply(t, o) : a) || (e.exports = i);
}, function(t, n, a) {
    var o, i, r;
    i = [ t, n, a(333) ], void 0 === (r = "function" == typeof (o = function(t, n, a) {
        function o(e, t) {
            var n = /(\?imageView2\/\d\/w\/\d+\/h\/\d+\/q\/\d+\/format\/)(\w+)/, a = void 0;
            if (a = e, n.test(e)) {
                var o = e.match(n)[2];
                t ? "gif" !== o && "webp" !== o && (a = e.replace(n, "$1webp")) : "webp" === o && (a = e.replace(n, "$1jpg"));
            }
            return a;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i, r = (i = a) && i.__esModule ? i : {
            default: i
        }, s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, c = {};
        c.toWebp = function() {
            var e = /\.([^.!]+)!([0-9]{1,4})x([0-9]{1,4})q?([0-9]{0,2}|100)?(\+2x)?\..+/, t = !1;
            try {
                t = "ok" === window.localStorage.getItem("canwebp");
            } catch (e) {}
            return function(n) {
                var a = n, i = 1, r = a.match(e);
                return t ? r && r.length >= 4 ? ("+2x" === r[5] && (i = 2), a = a.replace(e, ".") + r[1] + "?imageView2/2/w/" + parseInt(r[2], 10) * i + "/h/" + parseInt(r[3], 10) * i + "/q/" + (r[4] || 75) + "/format/" + ("gif" === r[1] ? "gif" : "webp")) : a = o(a, !0) : r && r.length >= 4 ? ("+2x" === r[5] && (i = 2), 
                a = a.replace(e, ".") + r[1] + "?imageView2/2/w/" + parseInt(r[2], 10) * i + "/h/" + parseInt(r[3], 10) * i + "/q/" + (r[4] || 75) + "/format/" + ("webp" === r[1] ? "jpg" : r[1])) : a = o(a, !1), 
                a;
            };
        }(), c.checkCanWebp = function() {
            if ("object" === s(window.localStorage)) try {
                var e = localStorage.getItem("canwebp");
                "ok" === e ? (0, r.default)("_canwebp", {
                    value: "1",
                    path: "/",
                    domain: location.hostname,
                    expires: 3650
                }) : "no" !== e && (t = function(e) {
                    localStorage.setItem("canwebp", e ? "ok" : "no"), e && (0, r.default)("_canwebp", {
                        value: "1",
                        path: "/",
                        domain: location.hostname,
                        expires: 3650
                    });
                }, (n = new Image()).onload = n.onerror = function() {
                    t(2 === n.height);
                }, n.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
            } catch (e) {}
            var t, n;
        }, n.default = c, t.exports = n.default;
    }) ? o.apply(n, i) : o) || (t.exports = r);
}, function(e, t, n) {
    var a, o, i;
    o = [ e, t, n(334) ], void 0 === (i = "function" == typeof (a = function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, o = (a = n) && a.__esModule ? a : {
            default: a
        };
        t.default = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (e) {
                if (e.match(/^data:/i)) return e;
                if (!n.imgcdn && !n.imgqn) {
                    var a = window._global && window._global.url || {};
                    n.imgcdn = a.imgqn || a.imgcdn;
                }
                var i = n.imgcdn || n.imgqn || "https://img.yzcdn.cn", r = [ /^(https?:)?\/\/imgqn.koudaitong.com/, /^(https?:)?\/\/kdt-img.koudaitong.com/, /^(https?:)?\/\/img.yzcdn.cn/, /^(https?:)?\/\/dn-kdt-img.qbox.me/ ];
                t = t || "";
                for (var s = 0; s < r.length; s++) e = e.replace(r[s], i);
                if ((e = e.replace("imgqntest.koudaitong.com", "dn-kdt-img-test.qbox.me")).match(/^(https?:)?\/\//i)) {
                    if (!e.match(i) && !e.match("dn-kdt-img-test.qbox.me")) return e;
                    e.match("!") || (e = "" + e + t);
                } else e = i + "/" + e + t;
                return !1 !== n.toWebp && (e = o.default.toWebp(e)), e;
            }
        }, e.exports = t.default;
    }) ? a.apply(t, o) : a) || (e.exports = i);
}, , function(e, t, n) {
    var a = n(12).tryLocation, o = [ "packages/user/integral/index", "packages/trade/order/list/index", "packages/trade/order/result/index", "packages/card/list/index", "packages/trade/buy/paid/index", "pages/usercenter/dashboard/index", "packages/user/coupon/list/index", "packages/user/coupon/qrcode/index", "packages/user/coupon/detail/index", "pages/common/stop-service/index", /pages-youzan\// ], i = [ "packages/shop/multi-store/index/index", "packages/shop/multi-store/search/index", "pages/common/blank-page/index", "packages/ump/carve-coupon/index" ], r = [ "pages/goods/detail/index", "pages/goods/seckill/index", "pages/home/feature/index", "pages/home/tab/one", "pages/home/tab/two", "pages/home/dashboard/index", "pages/goods/cart/index" ];
    e.exports = {
        onLoad: function() {
            var e = getApp();
            e.globalData.fetchedShop && -1 !== r.indexOf(this.route) && e.fetchShopInfo();
        },
        onShow: function() {
            var e = this, t = getApp();
            return this.setPageShop(), this._checkShop(), t.on("app:offlineId:change", this._checkShop), 
            t.on("app:init:nostoreid", this._checkShop), t.on("app:shop:set:finish", function() {
                return e.setPageShop();
            });
        },
        onHide: function() {
            var e = getApp();
            e.off("app:offlineId:change", this._checkShop), e.off("app:init:nostoreid", this._checkShop);
        },
        setPageShop: function() {
            var e = getApp();
            this.setData({
                isMultiStore: e.globalData.shopInfo.isMultiStore || !1,
                soldOutRecommend: e.globalData.shopInfo.soldOutRecommend || !1
            });
            var t, n = e.globalData.shopInfo.base || {}, a = e.globalData.shopInfo.store || {};
            this.setData({
                CURRENT_GLOBAL_SHOP: e.globalData.shopInfo.isMultiStore ? Object.assign({}, n, a) : n
            }), n.service && "SHOP_CLOSE" === n.service.status && !this.pageHasCheck && (t = this.route, 
            o.some(function(e) {
                return e === t || e.test && e.test(t);
            }) || wx.redirectTo({
                url: "/pages/common/stop-service/index"
            }), this.pageHasCheck = !0);
        },
        _checkShop: function() {
            var e = getApp();
            if (-1 === i.indexOf(this.route)) {
                var t = e.globalData.shopInfo, n = t.isMultiStore, o = t.offlineId, r = t.autoEntryStore, s = t.store, c = void 0 === s ? {} : s;
                if (n && !e.__doingSwitchStore) {
                    if (!o && r && !e.doAutoEnterStore) return e.doAutoEnterStore = !0, e.__doingSwitchStore = !0, 
                    a(function(t) {
                        var n = t.lng, a = t.lat;
                        return e.fetchShopInfo({
                            lng: n,
                            lat: a
                        });
                    }, function() {
                        return wx.navigateTo({
                            url: "/packages/shop/multi-store/index/index"
                        });
                    });
                    if (!o) return e.__doingSwitchStore = !0, wx.navigateTo({
                        url: "/packages/shop/multi-store/index/index"
                    });
                    if (+c.id == +o) return;
                    e.getStore().then(function(t) {
                        return e.setShopInfo({
                            store: t
                        });
                    });
                }
            }
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = "";
    t.default = {
        audio__backgroundChanged: !1,
        onShow: function() {
            var e, t, n, o, i, r = (e = getCurrentPages(), t = e[e.length - 1], n = t.route, 
            o = t.options, (i = Object.keys(o).reduce(function(e, t) {
                return e.concat(t + "=" + o[t]);
            }, [])).length ? n + "?" + i.join("&") : n);
            if (a && a !== r) {
                var s = wx.getBackgroundAudioManager();
                s && !s.paused && s.pause(), this.audio__backgroundChanged = !0;
            }
            a = r;
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(3), o = {
        navigate: "navigate",
        redirect: "redirect",
        switch: "switchTab"
    };
    t.default = {
        globalNavigate: function(e) {
            var t = e.currentTarget, n = (void 0 === t ? {} : t).dataset, i = void 0 === n ? {} : n, r = i.type, s = void 0 === r ? "navigate" : r, c = i.url, u = void 0 === c ? "" : c;
            if (u) {
                var l = o[s];
                l && a[l]({
                    url: u
                });
            }
        }
    };
}, function(e, t, n) {
    var a = [ "home", "cart", "usercenter", "activity", "recommendation", "classification", "sale", "preference", "discovery", "popular", "inventory", "brand", "hot", "usercenter1", "cart1", "home1", "free-weapp", "free-mars", "free-shop", "free-usercenter", "free-home", "free-cart" ];
    e.exports = function(e) {
        var t = a.indexOf(e);
        if (t < 0) return {
            selected: {},
            normal: {}
        };
        var n = t % 4, o = (t - n) / 4;
        return {
            selected: {
                left: 24 * n,
                top: 24 * o
            },
            normal: {
                left: 96 + 24 * n,
                top: 24 * o
            }
        };
    };
}, function(e, t, n) {
    function a() {
        var e = this, t = getCurrentPages(), n = t[t.length - 1].route, a = getApp(), i = {
            showStoreTabBar: !1,
            currentStoreTabBar: null,
            storeTabBarConfig: {
                list: []
            }
        };
        return a.globalData.isYouzanApp ? (a.getNavConfig().then(function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
                return e.find(function(e) {
                    var n = e.page_path || "";
                    return !!n && n.split("?")[0] === t;
                });
            })(t.list || [], n) && (t.list = t.list.filter(function(e) {
                return e.icon = r(e.type), !("mars" === e.nav_type && !e.visible);
            }), i.showStoreTabBar = !0, i.currentStoreTabBar = n, i.storeTabBarConfig = t, e.setData({
                "wscpage.tab": o({}, i)
            }));
        }).catch(function(e) {
            return console.info(e);
        }), o({}, i)) : i;
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, i = n(3), r = n(340), s = n(4);
    t.default = {
        onShow: function() {
            this.setData({
                "wscpage.tab": o({}, a.call(this))
            });
        },
        onPullDownRefresh: function() {
            var e = this;
            setTimeout(function() {
                e.setData({
                    "wscpage.tab": o({}, a.call(e))
                });
            }, 100);
        },
        yzweapp__changeStoreTabBar: function(e) {
            var t = e.currentTarget.dataset || {}, n = t.path || "", a = t.navType || "";
            if (n !== (this.data.wscpage || {
                tab: {}
            }).tab.currentStoreTabBar) {
                if ("mars" === a) {
                    s.track({
                        fm: "click",
                        ei: "to_choice_from_shop",
                        en: "点击店铺内精选Tab"
                    });
                    var o = getApp();
                    return o.logger && o.logger.log({
                        fm: "click",
                        ei: "to_choice_from_shop",
                        en: "点击店铺内精选Tab"
                    }), void wx.navigateToMiniProgram({
                        appId: "wxf1fdc416d4ced1b3"
                    });
                }
                var r = "/" === n[0] ? n : "/" + n;
                i.switchTab({
                    url: r
                });
            }
        }
    };
}, function(e, t, n) {
    e.exports = {
        setADids: function(e) {
            e && e.aid && e.traceid && getApp().storage.set("__ZANAD__", {
                aid: e.aid,
                traceid: e.traceid
            }, {
                expire: 30
            });
        },
        getADids: function(e) {
            return getApp().storage.get("__ZANAD__") || {};
        }
    };
}, function(t, n, a) {
    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function i(e) {
        if (!this.__isPageHide) {
            console.log("[ Log Page Hide ] : ", e);
            var t = this.data.id, n = getApp();
            "object" === s(n.logger) && "function" == typeof n.logger.setPageParams && "function" == typeof n.logger.pageHide && (n.logger && n.logger.pageHide({
                id: t
            }), this.__isPageHide = !0);
        }
    }
    function r(e, t, n) {
        var a = getApp();
        u.default.setCurrentSpm(e, t);
        var o = {
            id: t
        };
        n && (o = Object.assign(o, n)), l.default.page.show(o), "object" === s(a.logger) && "function" == typeof a.logger.setPageParams && "function" == typeof a.logger.pageShow && (a.logger.setPageParams({
            spm: u.default.getSpm(),
            buyerId: a.getBuyerId()
        }), a.logger.pageShow({
            id: t
        }));
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, c = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
        }
        return e;
    }, u = o(a(40)), l = o(a(4)), d = [ "pages/home/dashboard/index", "pages/home/tab/one", "pages/home/tab/two", "pages/home/feature/index" ], p = [ "pages/goods/detail/index", "pages/goods/seckill/index" ];
    n.default = {
        onShow: function() {
            console.log("[ Log Page Show ]");
            var e, t = this.data.id, n = getApp(), a = (e = getCurrentPages())[e.length - 1].route;
            d.indexOf(a) >= 0 && !t ? this.once("feature:loaded", function(e) {
                r(a, e);
            }) : p.indexOf(a) >= 0 && !t ? n.once("goodsDetail:loaded", function(e, t) {
                r(a, e, t);
            }) : r(a, this.data.isHomePage ? n.getKdtId() : t), this.__isPageHide = !1;
        },
        onHide: function() {
            i.call(this, "hide");
        },
        onUnload: function() {
            i.call(this, "unload");
        },
        __yzLog__: function(e) {
            var t = getApp();
            t.logger && t.logger.log(c({}, e, {
                si: t.getKdtId()
            }));
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = {
        globalCollectFormId: function(e) {
            var t = e.detail.formId, n = getApp();
            t && n.carmen({
                api: "wsc.weapp.formid/1.0.0/add",
                data: {
                    weapp_type: n.globalData.isYouzanApp ? "yz_public" : "custom",
                    form_id: t
                },
                success: function(e) {
                    return console.log("add formId success", e, t);
                },
                fail: function(e) {
                    return console.log("add formId fail", e, t);
                }
            });
        }
    };
}, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = {
        afterPay: [ "packages/trade/buy/paid/index" ]
    }, o = null, i = {
        onShow: function(e) {
            if (1037 === e.scene) {
                var t = (e.referrerInfo || {}).extraData || {};
                o = t.config || {};
            } else o = null;
        },
        onHide: function() {}
    };
    t.default = {
        onShow: function() {
            var e = this, t = getCurrentPages(), n = t[t.length - 1].route;
            if (o) if (0 !== Object.keys(o).length) {
                var i = o.theme, r = {};
                Object.keys(i).forEach(function(e) {
                    var t = i[e] || {};
                    t.isActive ? r = Object.assign(r, t) : (a[e] || []).indexOf(n) > -1 && (t.isActive = !0, 
                    r = Object.assign(r, t));
                });
                var s = o.page || {};
                s[n] && (r = Object.assign(r, s[n])), this.setData({
                    "wscpage.jumpConfig": r
                }), function() {
                    var e = this, t = getApp();
                    return new Promise(function(n) {
                        t.globalData.nav ? n(t.globalData.nav) : t.once("app:nav:success", function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            n(e.list || []);
                        }, e);
                    });
                }().then(function(t) {
                    var a = t.filter(function(e) {
                        return e.page_path === n;
                    });
                    e.setData({
                        "wscpage.jumpConfig.showReturnBtn": r.showReturn,
                        "wscpage.jumpConfig.inNavPage": a.length > 0
                    });
                }).catch(function() {
                    e.setData({
                        "wscpage.jumpConfig.showReturnBtn": r.showReturn
                    });
                });
            } else this.setData({
                "wscpage.jumpConfig": {
                    isActive: !0,
                    showReturnBtn: !0
                }
            }); else this.setData({
                "wscpage.jumpConfig": {
                    isActive: !1
                }
            });
        },
        wscpage__handleClick: function() {
            wx.navigateBackMiniProgram();
        }
    }, t.appConfig = i;
}, function(e, t, n) {
    e.exports = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.scene;
        return t && "string" == typeof t && (t = (t = decodeURIComponent(t).split("&")).reduce(function(e, t) {
            var n = t.split("=");
            return e[n[0]] = n[1], e;
        }, {}), e = Object.assign(e, t)), e;
    };
} ];
var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./utils/promise-6.1.0")), n = require("npm/@mtfe/mt-weapp-api/dist/index.js"), e = require("./config"), o = require("./utils/util"), i = require("./utils/delay"), a = require("login/index.js"), r = require("./utils/lx.js"), u = require("./utils/cat.js"), l = u.Owl, c = u.app, s = Date.now(), f = s - s % 864e5, g = new l({
    project: "mt-weapp",
    unionId: "",
    env: "pro"
});

a.setAppConfig({
    appName: "group",
    risk_platform: 13,
    risk_partner: 0,
    persistKey: "userInfo"
}), a.config.api = "", a.config.authRoute = "/npm/@mtfe/mt-weapp-authrize", a.config.request = function() {
    return n.request.apply(void 0, arguments).then(function(t) {
        return t.data;
    });
}, a.setSdkRoute("/login"), c({
    bundle: "2018-06-07 11:49:36",
    owl: g,
    loginSdk: a,
    fixShareData: function(t) {
        return Object.assign({
            title: "享美食，爱玩乐，看电影",
            path: "/index/pages/mt/mt"
        }, t);
    },
    onLaunch: function(n) {
        var i = this;
        o.valuesPolyfill(), r.init(e.lxApi, {
            appnm: "group_wxapp",
            category: "group"
        });
        var u = n && "finance/pages/pay/index" === n.path;
        if (this.globalData.isFinance = u, u) {
            if (n && n.query) {
                var l = void 0;
                /\%26env\%3D([^&#]*)/.test(n.query.q) && (l = RegExp.$1), this.globalData.finance_env = l || n.query.env || "prod";
            }
        } else this.getSysInfo(), this._appPv = a.getAuthInfo().then(function(e) {
            return t.default.all([ i.getAuthInfo(e), i.getUUID(), i.getOpenId(function(t) {
                try {
                    i.owl.config.unionId = t, 1037 == n.scene && wx.reportAnalytics("mt_advertising", {
                        openid: t,
                        source: n.from || n.referrerInfo.appId || "",
                        position: n.position || ""
                    });
                } catch (t) {}
            }) ]);
        }).catch(function(t) {
            return console.error(t);
        }).then(function() {
            var t = n || {}, e = t.path, o = t.query, a = t.scene, u = t.shareTicket, l = t.referrerInfo, c = function() {
                return Boolean(i.globalData.openId);
            };
            i.delayCallback(c, function() {
                r.pageView("c_07jlvd7o", {
                    custom: {
                        path: e,
                        query: o,
                        scene: a,
                        shareTicket: u,
                        referrerInfo: l
                    }
                });
            }), i.delayCallback(c, function() {
                r.moduleView("b_j4t50khy", {
                    path: e,
                    query: o,
                    scene: a,
                    shareTicket: u,
                    referrerInfo: l
                });
            });
        });
        this.globalData.coldBoot = !0;
    },
    slientLogin: function() {
        var t = this;
        return this._sLoginProm ? this._sLoginProm : this._sLoginProm = a.wxLogin({
            bind: !1
        }).catch(function(n) {
            console.error(n), t._sLoginProm = null;
        }).then(function(n) {
            return setTimeout(function() {
                t._sLoginProm = null;
            }, 3e3), n;
        });
    },
    getAuthInfo: function(n) {
        var i = this;
        return this._authProm ? this._authProm : this.globalData.token ? t.default.resolve(this.globalData) : (this._authProm = function() {
            if (n) {
                var r = n.token, u = n.uuid, l = n.openId;
                if (Object.assign(i.globalData, {
                    uuid: u,
                    openId: l
                }), r) return o.request(e.userInfoApi, {
                    query: {
                        token: r
                    }
                }).then(function(t) {
                    !t || null == t.data || t.data.error ? a.removeAuthInfo() : i.saveLoginData(n);
                });
            }
            return t.default.resolve();
        }().catch(function(t) {
            console.error(t);
        }).then(function() {
            if (!i.globalData.token) return i.slientLogin().then(function(t) {
                t && !t.error && i.saveLoginData(t);
            });
        }).then(function() {
            return i._authProm = null, i.globalData;
        }), this._authProm);
    },
    onShow: function(t) {
        var n = this;
        t && (t.out_trade_no || t.transaction_id) && (this.globalData.finance_params = t, 
        this.globalData.out_trade_no = t.out_trade_no, this.globalData.transaction_id = t.transaction_id), 
        t && "1011" === t.scene && "finance/pages/pay/index" === t.path || this.getOpenId(function(t) {
            n.lxSetPathEnv({
                openId: t
            }), r.moduleView("b_yb0v9i24");
        });
        var e = t && t.query, o = {
            utm_campaign: "",
            utm_source: "",
            utm_medium: ""
        };
        if (e && e.utm_campaign && (o.utm_campaign = e.utm_campaign), e && e.utm_source && (o.utm_source = e.utm_source), 
        e && e.utm_medium && (o.utm_medium = e.utm_medium), r.setUTM(o), r.start({
            custom: {
                path: t && t.path || "",
                scene: t && t.scene || 0
            }
        }), this.globalData.scene = t && t.scene, 1038 !== this.globalData.scene && 1037 !== this.globalData.scene) {
            var i = t && t.path;
            i && /^pages\/mt\/mt$/.test(i.trim()) && wx.reLaunch({
                url: "/index/pages/mt/mt"
            });
        } else {
            var a = t.referrerInfo && t.referrerInfo.extraData, u = (a = "string" == typeof a ? JSON.parse(a) : a) && (a.tab || a.fromMiniProgram) ? a.tab || a.fromMiniProgram : null;
            this.globalData.tab = u;
        }
    },
    getUUID: function() {
        var t, n = this;
        try {
            t = this.globalData.uuid || wx.getStorageSync("uuid");
        } catch (t) {
            console.warn(t);
        }
        var e = a.utils, o = e.getUUID, i = e.setStorage;
        return t ? (this.globalData.uuid = t, this.globalData.isFirst = !1, a.setAppConfig({
            uuid: t
        }), i("uuid", t).then(function() {
            return t;
        })) : o().then(function(e) {
            return t = e, n.globalData.uuid = t, i("uuid", t).then(function() {
                return t;
            });
        }).catch(function(t) {
            console.error(t);
        });
    },
    getOpenId: function(n) {
        var e = this, i = function(t) {
            if (e.globalData.openId = t, r.set("wxid", t), "function" == typeof n) try {
                n(t);
            } catch (t) {
                console.error("app getOpenId callback: ", t);
            }
            return t;
        };
        if (this._openIdProm) return this._openIdProm.then(i);
        return this._openIdProm = function() {
            var n = e.globalData.openId;
            return n ? t.default.resolve(n) : o.getStorage("openId");
        }().then(function(t) {
            return t ? i(t) : e.slientLogin().then(function(t) {
                var n = t.openId;
                return o.setStorage("openId", n), i(n);
            }).catch(function(t) {
                console.error(t);
            }).then(function(t) {
                return e._openIdProm = null, t;
            });
        }), this._openIdProm;
    },
    getWxUserInfo: function(n) {
        var e = this, i = function(t) {
            return o.setStorage("unionId", t.uniqueid), o.setStorage("wxuser", t), e.globalData.wxUser = t, 
            t;
        }, r = function() {
            return a.updateWxUserInfo().then(i).catch(function(t) {
                return console.error(t);
            });
        };
        return n ? r() : this.globalData.wxUser ? t.default.resolve(this.globalData.wxUser) : o.getStorage("wxuser").then(function(t) {
            return t ? (e.globalData.wxUser = t, t) : e.getOpenId().then(function(t) {
                return a.getWxUserInfo({
                    openId: t
                });
            }).then(i).catch(function() {
                return r();
            });
        });
    },
    onHide: function() {
        r.quit();
    },
    saveLoginData: function(t, n) {
        var e = t.openId, o = t.token, i = t.userId, a = t.code, u = t.uuid;
        r.set("uid", i);
        var l = {
            code: a
        };
        Object.assign(this.globalData, {
            loginInfo: l,
            openId: e,
            token: o,
            userId: i,
            uuid: u
        }), this.$user = Object.assign(this.$user || {}, {
            uuid: u,
            code: a,
            token: o,
            openId: e,
            userId: i,
            isBindMobile: !0,
            timestamp: Date.now()
        }), "function" == typeof n && n(e, l);
    },
    login: function(n, e) {
        var o = this, i = this.globalData;
        return i.token ? "function" == typeof n ? t.default.resolve(n(i.openId, i.loginInfo)) : t.default.resolve() : this.slientLogin().then(function(t) {
            if (t) {
                if (t.error) {
                    r.pageView("c_wbb1658t");
                    var i = a.API_TYPE, u = a.authState.session || a.login.createSession();
                    return u.on(a.SessionEvent.CLICK, function(t) {
                        switch (t) {
                          case i.WX_MOBILE:
                            r.moduleClick("b_vavlaut5");
                            break;

                          case i.WXV2:
                            r.moduleClick("b_40nq94kb");
                        }
                    }), a.cleanLogin(u).then(function(t) {
                        t ? o.saveLoginData(t, n) : e && e();
                    });
                }
                o.saveLoginData(t, n);
            } else e && e();
        });
    },
    getCityInfo: function() {
        var n = this, e = this.globalData.cityInfo;
        return e ? (e.id && r.set("cityid", e.id), t.default.resolve(e)) : new t.default(function(t, e) {
            n.getLocalCity().then(function(e) {
                try {
                    var o = wx.getStorageSync("mt_cityInfo");
                    o && o.value ? (e.id === o.value.id && (o.value.lat = e.lat, o.value.lng = e.lng, 
                    wx.setStorageSync("mt_cityInfo", {
                        value: o.value,
                        timestamp: o.timestamp
                    })), e = o.value) : wx.setStorageSync("mt_cityInfo", {
                        value: e,
                        timestamp: new Date(new Date().toLocaleDateString()).getTime()
                    });
                } catch (t) {
                    console.log(t);
                }
                n.globalData.cityInfo = e, r.set("cityid", e.id), t(e);
            }).catch(function(t) {
                console.log(t), e(new Error("app#getCityInfo fail"));
            });
        });
    },
    getLocalCity: function() {
        var n = this, i = this.globalData.mt_localCity;
        return i ? t.default.resolve(i) : this._cityInfoProm ? this._cityInfoProm : (this._cityInfoProm = new t.default(function(t, i) {
            n.getLocation(function(a) {
                var r = a.latitude, u = a.longitude;
                o.request({
                    url: "" + e.getCityInfoByLocApi + r + "," + u + ".json",
                    data: {
                        isMars: !1
                    }
                }).then(function(e) {
                    n._cityInfoProm = null;
                    var o = e.data.data;
                    o && o.id && (n.globalData.mt_localCity = o, t(o)), i(new Error("app#getCityInfo cityInfo is null"));
                }).catch(function(t) {
                    n._cityInfoProm = null, i(new Error("app#getCityInfo fail"));
                });
            }, function() {
                i(new Error("app#getCityInfo fail")), n._cityInfoProm = null;
            }, !0);
        }), this._cityInfoProm);
    },
    getLoginCode: function(t) {
        var n = this;
        n.globalData.code ? "function" == typeof t && t(n.globalData.code) : a.utils.getLoginCode().then(function(e) {
            n.globalData.code = e, "function" == typeof t && t(n.globalData.code);
        });
    },
    onError: function(t) {
        "request:fail" !== t && o.request(e.errReportApi, {
            method: "POST",
            data: {
                content: t
            }
        });
    },
    getSysInfo: function(n) {
        var e = this;
        return this.globalData.sysInfo ? ("function" == typeof n && n(this.globalData.sysInfo), 
        t.default.resolve(this.globalData.sysInfo)) : new t.default(function(t, o) {
            wx.getSystemInfo({
                success: function(o) {
                    o && o.model && /iphone/i.test(o.model) && (o.os = "iphone"), e.globalData.sysInfo = o, 
                    "function" == typeof n && n(o), t(o);
                },
                fail: function(t) {
                    console.error(t), o(t);
                }
            });
        });
    },
    getNetwork: function() {
        var t = this;
        wx.getNetworkType({
            success: function(n) {
                t.globalData.networkType = n.networkType;
            }
        });
    },
    getLocation2: function() {
        var n = this;
        return new t.default(function(t, e) {
            if (n.globalData.location) return t(n.globalData.location);
            o.getLocation().then(function(e) {
                n.globalData.location = e, t(n.globalData.location);
            }).catch(function(t) {
                console.error("getLocation2 fail", t), wx.redirectTo({
                    url: "/index/pages/nodata/nodata?type=location"
                });
            });
        });
    },
    getLocation: function(t, n, e) {
        this.globalData.location ? "function" == typeof t && t(this.globalData.location) : this._location(t, n, e);
    },
    _location: function(n, e, o) {
        if (this._locProm) return this._locProm.then(function(t) {
            return t ? "function" == typeof n && n(t) : "function" == typeof e && e(t), t;
        });
        var i = this;
        return this._locProm = new t.default(function(t) {
            var a = new Date().getTime();
            wx.getLocation({
                type: "wgs84",
                success: function(e) {
                    i.globalData.location = e, "function" == typeof n && n(e), t(e);
                },
                fail: function() {
                    var n = !1;
                    i.getNetwork(), ("none" == i.globalData.networkType || a - new Date().getTime > 1e4) && (n = !0), 
                    "function" == typeof e && e(n), ("function" != typeof e || o) && wx.redirectTo({
                        url: "/index/pages/nodata/nodata?type=location"
                    }), t(null);
                },
                complete: function() {
                    i._locProm = null;
                }
            });
        }), this._locProm;
    },
    updateLocation: function(t, n) {
        this._location(t, n);
    },
    globalData: {
        loginInfo: null,
        sysInfo: null,
        uuid: null,
        openId: null,
        token: null,
        networkType: null,
        tag: null,
        cityInfo: null,
        mt_localCity: null,
        coldBoot: !1,
        cityId: "1",
        checkInTime: f,
        checkOutTime: f + 864e5,
        hotelPrefix: "/hotel",
        appid: "wxde8ac0a21135c07d",
        appName: "group"
    },
    lxLog: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.event_type, e = t.val_bid, o = t.val_lab, i = t.custom, a = void 0 === i ? {} : i, u = {
            pv: "pageView"
        }[n], l = this.globalData, c = l.checkInTime, s = l.checkOutTime, f = l.cityId, g = l.scene, d = (this.$user || {}).userId, h = void 0 === d ? "" : d, p = this.$location || {}, m = p.latitude, I = void 0 === m ? "" : m, _ = p.longitude, y = void 0 === _ ? "" : _;
        this.getUUID().then(function(t) {
            var n = {
                custom: {
                    checkin_date: c,
                    checkout_date: s,
                    checkin_city_id: f,
                    scene: g,
                    mt_uuid: t,
                    user_id: h,
                    latitude: I,
                    longitude: y
                }
            };
            n.custom = Object.assign(n.custom, a);
            var i = Object.assign(n, o);
            r[u](e, i);
        });
    },
    fetch: function(t, n, e, i, a) {
        t = o.formatUrl(t, n);
        var r = function() {};
        i = i || r, a = a || r, "function" == typeof e && e(), o.request(t, {
            method: "GET"
        }).then(i).catch(a || function(t) {
            console.log(t);
        });
    },
    showToast: function(t, n, e) {
        e = e || 2e3, wx.showToast({
            title: t,
            icon: n,
            duration: e
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    showLoading: function() {
        this.showToast("数据读取中.", "loading", 1e4);
    },
    hideLoading: function() {
        wx.hideToast();
    },
    showErrTip: function(t, n) {
        wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(t) {
                t.confirm && n && n();
            }
        });
    },
    lxSetPathEnv: function(t) {
        var n = t.openId;
        r.get("wxid") || (console.log("lx set wxid for the first time"), r.set("wxid", n));
    },
    lxPvReport: function(t, n) {
        var e = this;
        this.getOpenId().then(function(o) {
            e.lxSetPathEnv({
                openId: o
            }), n ? r.pageView(t, n) : r.pageView(t);
        });
    },
    getOpenIdWithoutLogin: function() {
        var n = this, i = function(t) {
            var e = t.openId, o = t.unionId;
            return n.globalData.openId = e, n.globalData.unionId = o, {
                openId: e,
                unionId: o
            };
        };
        if (this._openIdPromFina) return this._openIdPromFina.then(i);
        return this._openIdPromFina = function() {
            var e = n.globalData.openId, i = n.globalData.unionId;
            return e ? t.default.resolve({
                openId: e,
                unionId: i
            }) : t.default.all([ o.getStorage("openId"), o.getStorage("unionId") ]).then(function(t) {
                return {
                    openId: t && t[0] || "",
                    unionId: t && t[1] || ""
                };
            });
        }().then(function(a) {
            var r = a.openId, u = a.unionId;
            return r ? i({
                openId: r,
                unionId: u
            }) : new t.default(function(t, n) {
                wx.login({
                    success: function(e) {
                        e.code ? t(e.code) : (o.owlErrorReport({
                            key: "mt_openid_nologin_fail",
                            tag: {
                                errorType: "success_cb",
                                errorMsg: e && e.errMsg || "wx.login success but has no code"
                            }
                        }), console.log("登录失败！", e.errMsg), n(""));
                    },
                    fail: function(t) {
                        o.owlErrorReport({
                            key: "mt_openid_nologin_fail",
                            tag: {
                                errorType: "fail_cb",
                                errorMsg: t || "wx.login fail"
                            }
                        }), console.log("wx.login调用失败！", t), n("");
                    }
                });
            }).then(function(t) {
                return o.request({
                    url: e.getOpenId,
                    data: {
                        code: t
                    },
                    fail: function(t) {
                        o.owlErrorReport({
                            key: "mt_openid_nologin_fail",
                            tag: {
                                errorType: "request_fail_cb",
                                errorMsg: t && t.toString && t.toString() || "request_fail"
                            }
                        });
                    }
                });
            }).catch(function(t) {
                o.owlErrorReport({
                    key: "mt_openid_nologin_fail",
                    tag: {
                        errorType: "catch_error",
                        errorMsg: t.toString() || "getOpenIdWithoutLogin err"
                    }
                }), console.error(t);
            }).then(function(t) {
                return n._openIdPromFina = null, i(t && t.data || {});
            });
        }), this._openIdPromFina;
    },
    delayCallback: function(t, n) {
        i.add(t, n);
    },
    delayCallbackEmit: function() {
        i.emit();
    }
});
var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, t = require("../data/statusCodeEnum"), o = require("../vendors/passport/service/login_state"), n = require("../vendors/passport/service/passport_util"), s = n.logout, i = n.passportEvHandle, r = {
    init: function(t) {
        i.on("passport-login-onLoad", function(o) {
            var n = o.info;
            t.storage.setSync("pagetype", ""), t.doLogTrack(e({
                pagePath: "passport",
                pagetype: "passport",
                pageName: "passport",
                refPagePath: t.globalData.currentPageUrl
            }, n));
        }), i.on("passport-login-onUnload", function(e) {
            e.info;
        }), i.on([ "passport-submit-success" ], function(e) {
            t.storage.setSync("login-back", "1");
        }), i.on([ "passport-login-success", "passport-submit-success" ], function(e) {
            t.storage.removeSync("userLogout"), t.eventHandle.emit("passport-login-success"), 
            console.log("passport-login-successpassport-login-successpassport-login-success");
        });
    },
    _userLoginPromise: null,
    userLogin: function() {
        var e = this;
        if (this._userLoginPromise) return this._userLoginPromise;
        var t = this.storage.getSync(this.constData.STORAGE_USER_INFO_KEY);
        return this._userLoginPromise = new Promise(function(o, n) {
            t && t.expireTime && Date.now() < t.expireTime ? (t.thirdKey && (e.globalData.thirdKey = t.thirdKey), 
            console.log("login from cache"), e.eventHandle.emit("login-success", t), o(!0)) : o(!1);
        }).then(function(t) {
            return t ? {} : e.login.getWxLogin.bind(e)(t).then(function(e) {
                return e;
            });
        }).then(function(t) {
            return e._userLoginPromise = null, t;
        }), this._userLoginPromise;
    },
    _getWxLoginPromise: null,
    getWxLogin: function(e) {
        var t = this;
        return this._getWxLoginPromise ? this._getWxLoginPromise : (this._getWxLoginPromise = new Promise(function(e) {
            wx.login({
                success: function(t) {
                    e(t);
                },
                fail: function(t) {
                    e({
                        error: !0,
                        msg: t
                    });
                }
            });
        }).then(function(e) {
            return t.login.autoUserLogin.bind(t)(e);
        }).then(function(e) {
            return t._getWxLoginPromise = null, e;
        }), this._getWxLoginPromise);
    },
    _autoUserLoginPromise: null,
    autoUserLogin: function(e) {
        var t = this;
        if (this._autoUserLoginPromise) return this._autoUserLoginPromise;
        var o = this.getLocation();
        return this._autoUserLoginPromise = this.requestPost(this.pathData.USER_AUTO_LOGIN, {
            jsCode: e.code,
            position: {
                latitude: o && o.value ? o.value.latitude : 0,
                longitude: o && o.value ? o.value.longitude : 0
            }
        }).then(function(e) {
            if (e.error) return {
                error: !0
            };
            var o = e.data || {};
            o.thirdKey && (t.globalData.thirdKey = o.thirdKey, t.globalData.openId = o.openId, 
            t.globalData.unionId = o.unionId), t.storage.setSync(t.constData.STORAGE_USER_INFO_KEY, o);
            var n = t.storage.getSync(t.constData.STORAGE_CITY_KEY);
            if (!n && t.storage.setSync(t.constData.STORAGE_CITY_KEY, {
                cityId: o.cityId,
                cityName: o.cityName,
                dispCityId: o.dispCityId
            }), n || t.eventHandle.emit("location-ok", o), t.eventHandle.emit("login-success", o), 
            o.hasAuth) return {
                code: 0,
                userInfo: o
            };
            t.goto("/pages/authorize/authorize?getUserLogin=yes", !0);
        }).then(function(e) {
            return t._autoUserLoginPromise = null, e;
        }), this._autoUserLoginPromise;
    },
    _getWXUserInfoPromise: null,
    getWxUserInfo: function() {
        var e = this;
        return this.hasUnionId() ? Promise.resolve({}) : this._getWXUserInfoPromise ? this._getWXUserInfoPromise : (this._getWXUserInfoPromise = new Promise(function(t, o) {
            wx.getUserInfo({
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    t({
                        error: !0,
                        data: e
                    });
                },
                complete: function(t) {
                    e.storage.setSync(e.constData.WX_GET_USER_INFO, !0);
                }
            });
        }).then(function(t) {
            return t.error ? t : e.login.getUserLogin.bind(e)(t);
        }).then(function(t) {
            return e._getWXUserInfoPromise = null, t;
        }), this._getWXUserInfoPromise);
    },
    getUserLogin: function(e) {
        var t = this, o = e.encryptedData, n = e.iv;
        return this.requestPost(this.pathData.USER_INFO, {
            thirdKey: this.getThirdKey(),
            encryptedData: o,
            iv: n
        }).then(function(e) {
            if (e.error) return {
                error: !0
            };
            var o = t.getUserThirdKey() || {};
            return o.hasAuth = !0, t.storage.setSync(t.constData.STORAGE_USER_INFO_KEY, o), 
            {
                code: 0,
                userInfo: o
            };
        }).catch(function(e) {
            return {
                error: !0
            };
        });
    },
    _openSettingPromise: null,
    _openSettingTimer: null,
    openSetting: function() {
        var e = this;
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return console.log("open setting  ------1"), this._openSettingPromise ? this._openSettingPromise : (console.log("open setting  ------2"), 
        setTimeout(function() {
            e._openSettingPromise = null;
        }, 3e3), this._openSettingPromise = new Promise(function(t) {
            console.log("open setting ------3"), e._openSettingTimer = setTimeout(function() {
                wx.openSetting({
                    success: function(o) {
                        if (console.log("open setting ------success", o), o.authSetting["scope.userInfo"]) {
                            console.log("openSetting true"), e.storage.removeSync(e.constData.STORAGE_USER_INFO_KEY), 
                            t({});
                            "pages/authorize/authorize" === e.globalData.currentPageUrl ? wx.navigateBack({
                                delta: 1
                            }) : "vendors/im/pages/sessions/sessions" === getCurrentPages()[0].route && (e.eventHandle.emit("init-session-tabbar"), 
                            wx.switchTab({
                                url: "/pages/index/index"
                            })), e.eventHandle.emit("check-login");
                        } else console.log("openSetting false"), t({
                            error: !0
                        });
                    },
                    fail: function(e) {
                        console.log("open setting ------fail"), t({
                            error: !0,
                            msg: e
                        });
                    },
                    complete: function() {
                        console.log("open setting  ------complete"), e._openSettingPromise = null, e.storage.setSync("pagetype", ""), 
                        t({});
                    }
                });
            }, 1e3), e.login.getSetting().then(function(t) {
                void 0 === t["scope.userInfo"] && (e._openSettingPromise = null, e.storage.setSync("pagetype", ""), 
                clearTimeout(e._openSettingTimer), e.goto("/pages/authorize/authorize", !0));
            });
        }).then(function(t) {
            return e._openSettingPromise = null, t;
        }));
    },
    _getSettingPromise: null,
    getSetting: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this._getSettingPromise ? this._getSettingPromise : wx.getSetting ? this._getSettingPromise = new Promise(function(t) {
            wx.getSetting({
                success: function(e) {
                    return t(e.authSetting);
                },
                fail: function(e) {
                    return t({
                        error: !0,
                        msg: msg
                    });
                },
                complete: function(t) {
                    e._getSettingPromise = null;
                }
            });
        }) : (!t.isTipHidden && tip.versionLowTip(), new Promise(function(e) {
            e({
                error: !0,
                msg: "版本过低"
            });
        }));
    },
    logout: function(e) {
        var t = this;
        s(function() {
            t.storage.removeSync(t.constData.PROFILE_KEY), t.storage.removeSync(t.constData.PPU_KEY), 
            e && e();
        });
    },
    _passportUrlRequestPromise: null,
    passportUrlRequest: function(n) {
        var s = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (r = r || "/" + this.getPageRouteWithParams(0), this._passportUrlRequestPromise) return this._passportUrlRequestPromise;
        return setTimeout(function() {
            s._passportUrlRequestPromise = null;
        }, 1e3), this.storage.getSync("userLogout") && !1 === a ? this._passportUrlRequestPromise = new Promise(function(e) {
            o.goLogin({
                source: "58-weapp",
                type: 3,
                path: r,
                opentype: 1
            });
        }) : this._passportUrlRequestPromise = new Promise(function(u, g) {
            s.request(s.pathData.LOGIN_URL, e({
                thirdKey: s.getThirdKey()
            }, n)).then(function(e) {
                e.data.code == t.SUCCEED && (a && e.data.uid > 1 || !1 === a) ? (i.once("passport-login-success", function() {
                    u({});
                }), o.goPassportState({
                    url: e.data.redirectUrl,
                    path: r,
                    source: "58-weapp",
                    callback: function(e) {
                        "11" === e.code.toString() || e.code.toString() == t.SUCCEED.toString() ? (s.eventHandle.emit("user-login-success"), 
                        u({})) : (u({
                            error: !0,
                            msg: e.msg
                        }), s.eventHandle.emit("user-login-error"));
                    },
                    opentype: 1
                })) : u({
                    error: !0
                });
            }).catch(function(e) {
                u({
                    error: !0
                });
            });
        }).then(function(e) {
            return s._passportUrlRequestPromise = null, e;
        });
    },
    passportAutoLogin: function() {
        return this.storage.getSync("userLogout") ? Promise.resolve({}) : this.login.passportUrlRequest.bind(this)({}, null, !0);
    },
    passportLogin: function(e) {
        return this.hasUnionId() ? this.login.passportUrlRequest.bind(this)({}, e) : this.login.openSetting.bind(this)();
    },
    _checkStatusCodeTimeout: null,
    _checkStatusCodeMaxCount: 20,
    _checkStatusCodeCount: 0,
    checkStatusCode: function(e) {
        var o = this;
        return r._checkStatusCodeCount++, clearTimeout(r._checkStatusCodeTimeout), r._checkStatusCodeTimeout = setTimeout(function() {
            r._checkStatusCodeCount = 0;
        }, 5e3), r._checkStatusCodeCount > r._checkStatusCodeMaxCount ? (this.alert("网络状态异常，请退出小程序重试"), 
        Promise.resolve({
            error: !0,
            msg: "\b\b网络状态异常，请退出小程序重试"
        })) : new Promise(function(n, s) {
            switch (e.data.code) {
              case t.SUCCEED:
                n({});
                break;

              case t.INVALID_PPU:
                n(o.login.passportLogin.bind(o)());
                break;

              case t.EMPTY_THIRD_KEY:
              case t.EXPIRED:
                o.storage.removeSync(o.constData.STORAGE_USER_INFO_KEY), n(o.login.userLogin.bind(o)());
                break;

              default:
                n({
                    error: !0
                });
            }
        });
    }
};

module.exports = {
    login: r
};
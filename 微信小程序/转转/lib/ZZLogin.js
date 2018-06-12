function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function t(o, i) {
                try {
                    var a = n[o](i), u = a.value;
                } catch (e) {
                    return void r(e);
                }
                if (!a.done) return Promise.resolve(u).then(function(e) {
                    t("next", e);
                }, function(e) {
                    t("throw", e);
                });
                e(u);
            }
            return t("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _cookie = require("./cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _entryInfo = require("./../store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), ZZLogin = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "_clearLoginInfo",
        value: function() {
            e._zzUserInfo = {}, _cookie2.default.set("uid", ""), _cookie2.default.set("PPU", ""), 
            wx.setStorage({
                key: "userInfo",
                data: ""
            }), wx.setStorage({
                key: "zzUserInfo",
                data: ""
            });
        }
    }, {
        key: "_login",
        value: function() {
            function n() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n() {
                var r, t, o, i, a;
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, e.checkLogin();

                      case 2:
                        if (!n.sent) {
                            n.next = 4;
                            break;
                        }
                        return n.abrupt("return", {
                            code: 0,
                            errMsg: "ok"
                        });

                      case 4:
                        return n.next = 6, new Promise(function(e, n) {
                            wx.login({
                                success: e,
                                fail: e
                            });
                        });

                      case 6:
                        if (r = n.sent, r.errMsg.includes("ok") && r.code) {
                            n.next = 9;
                            break;
                        }
                        return n.abrupt("return", {
                            code: -1,
                            errMsg: "wx.login failed:" + JSON.stringify(r)
                        });

                      case 9:
                        return n.next = 11, e.request({
                            url: "https://app.zhuanzhuan.com/zzopen/wxcommon/mpSilenceLogin",
                            data: {
                                p: JSON.stringify({
                                    code: r.code,
                                    source: e._config.source
                                })
                            },
                            method: "POST"
                        });

                      case 11:
                        if (t = n.sent, o = {}, 0 != t.respCode || 0 != t.respData.status) {
                            n.next = 17;
                            break;
                        }
                        o.userInfo = t.respData, n.next = 46;
                        break;

                      case 17:
                        return n.next = 19, new Promise(function(e, n) {
                            wx.login({
                                success: e,
                                fail: e
                            });
                        });

                      case 19:
                        if (r = n.sent, r.errMsg.includes("ok") && r.code) {
                            n.next = 22;
                            break;
                        }
                        return n.abrupt("return", {
                            code: -1,
                            errMsg: "wx.login failed:" + JSON.stringify(r)
                        });

                      case 22:
                        return n.next = 24, new Promise(function(e, n) {
                            wx.getUserInfo({
                                withCredentials: !0,
                                success: e,
                                fail: e
                            });
                        });

                      case 24:
                        if (o = n.sent, !/deny/.test(o.errMsg)) {
                            n.next = 39;
                            break;
                        }
                        return n.next = 28, new Promise(function(n, r) {
                            wx.showModal({
                                title: "登录失败",
                                content: e._config.denyTip,
                                showCancel: !1,
                                confirmText: "知道了",
                                success: n,
                                fail: r
                            });
                        });

                      case 28:
                        return i = n.sent, n.next = 31, new Promise(function(e, n) {
                            wx.openSetting({
                                fail: e,
                                success: e
                            });
                        });

                      case 31:
                        if (a = n.sent, a.errMsg.includes("ok") && a.authSetting["scope.userInfo"]) {
                            n.next = 36;
                            break;
                        }
                        return n.abrupt("return", {
                            code: -2,
                            errMsg: "wx.openSetting failed or user didn't grant scope.userInfo permission:" + JSON.stringify(a)
                        });

                      case 36:
                        return n.next = 38, new Promise(function(e, n) {
                            wx.getUserInfo({
                                withCredentials: !0,
                                success: e,
                                fail: e
                            });
                        });

                      case 38:
                        o = n.sent;

                      case 39:
                        if (/ok/.test(o.errMsg)) {
                            n.next = 41;
                            break;
                        }
                        return n.abrupt("return", {
                            code: -2,
                            errMsg: "wx.getUserInfo failed:" + JSON.stringify(o)
                        });

                      case 41:
                        return n.next = 43, e.request({
                            url: "https://app.zhuanzhuan.com/zzopen/wxcommon/login",
                            data: {
                                code: r.code,
                                encryptedData: o.encryptedData,
                                iv: o.iv,
                                source: e._config.source,
                                channelId: _entryInfo2.default.channel
                            },
                            method: "POST"
                        });

                      case 43:
                        if (t = n.sent, 0 == t.respCode) {
                            n.next = 46;
                            break;
                        }
                        return n.abrupt("return", {
                            code: -3,
                            errMsg: "zz login api failed:" + JSON.stringify(t),
                            toastMsg: t.respData && t.respData.errMsg
                        });

                      case 46:
                        return Object.assign(e._userInfo, o.userInfo), Object.assign(e._zzUserInfo, t.respData), 
                        wx.setStorage({
                            key: "userInfo",
                            data: JSON.stringify(e._userInfo)
                        }), wx.setStorage({
                            key: "zzUserInfo",
                            data: JSON.stringify(e._zzUserInfo)
                        }), _cookie2.default.set("uid", e._zzUserInfo.uid), _cookie2.default.set("PPU", '"' + e._zzUserInfo.ppu + '"'), 
                        e._zzUserInfo.token && _cookie2.default.set("tk", e._zzUserInfo.token), n.abrupt("return", {
                            code: 0,
                            errMsg: "ok"
                        });

                      case 54:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "_loginWithErrLog",
        value: function() {
            function n() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n() {
                var r;
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return r = {}, n.prev = 1, n.next = 4, e._login();

                      case 4:
                        r = n.sent, r && 0 == r.code || (r = r && r.code ? r : {
                            code: -100,
                            errMsg: "login failed"
                        }, console.error("[login failed]:", r)), n.next = 12;
                        break;

                      case 8:
                        n.prev = 8, n.t0 = n.catch(1), r = {
                            code: -500,
                            errMsg: "internal error"
                        }, console.error("[login failed] uncaught error:", n.t0);

                      case 12:
                        return 0 != r.code && "function" == typeof e._config.loginFailed && e._config.loginFailed(r), 
                        n.abrupt("return", r);

                      case 15:
                      case "end":
                        return n.stop();
                    }
                }, n, this, [ [ 1, 8 ] ]);
            }));
            return n;
        }()
    }, {
        key: "config",
        value: function(n) {
            Object.assign(e._config, n), e._config.t = void 0 == n.t ? n.source : n.t;
        }
    }, {
        key: "install",
        value: function() {
            if (!e._config.source) return void console.error('[ZZLogin install failed] "source" must be provided, shall call ZZLogin.config first');
            _cookie2.default.set("uid", e._zzUserInfo.uid), _cookie2.default.set("PPU", '"' + e._zzUserInfo.ppu + '"'), 
            _cookie2.default.set("t", e._config.t);
            for (var n in e._config.installProps) _wepy2.default.component.prototype[n] = "*this" == e._config.installProps[n] ? e : e[e._config.installProps[n]];
        }
    }, {
        key: "checkLogin",
        value: function() {
            function n() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n() {
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.abrupt("return", !!e._zzUserInfo.ppu);

                      case 1:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "login",
        value: function() {
            function n(e) {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n(r) {
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return e._loginSingleton || (e._loginSingleton = e._loginWithErrLog(), e._loginSingleton.then(function() {
                            e._loginSingleton = null;
                        }).catch(function() {
                            e._loginSingleton = null;
                        })), "function" == typeof r && e._loginSingleton.then(r), n.abrupt("return", e._loginSingleton);

                      case 3:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "logout",
        value: function() {
            function n() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n() {
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return e._clearLoginInfo(), n.abrupt("return", {
                            code: 0
                        });

                      case 2:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "reLogin",
        value: function() {
            function n() {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n() {
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, e.logout();

                      case 2:
                        return n.next = 4, e.login();

                      case 4:
                        return n.abrupt("return", n.sent);

                      case 5:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "request",
        value: function() {
            function n(e) {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n(r) {
                var t = this, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = o.requestDetail, a = void 0 !== i && i;
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return "function" == typeof e._config.beforeRequest && (r = e._config.beforeRequest(r) || r), 
                        n.abrupt("return", new Promise(function(n, o) {
                            r.header || (r.header = {});
                            var i = _cookie2.default.getCookie();
                            i = r.header.cookie ? i + r.header.cookie : i;
                            var u = Object.assign({}, r);
                            u.header.cookie = i, "POST" == u.method && (u.header["content-type"] = "application/x-www-form-urlencoded"), 
                            u.data = u.data || {};
                            for (var s in u.data) "object" === _typeof(u.data[s]) && (u.data[s] = JSON.stringify(u.data[s]));
                            var c = u.success, l = u.fail, f = function(o) {
                                e.tryExecSuccessHandler.call(t, o, c, r, function() {
                                    e.request.call(t, r, a);
                                }) && n(a ? o : o.data);
                            }, p = function(n) {
                                e.tryExecFailHandler.call(t, n, l, r, function() {
                                    e.request.call(t, r, a);
                                }) && o(n);
                            };
                            if ("unknown" == e._wepyPromisify && (e._wepyPromisify = _wepy2.default.getSystemInfo({
                                success: function() {}
                            }) instanceof Promise), e._wepyPromisify) {
                                var g = _wepy2.default.request(Object.assign({}, u, {
                                    success: null,
                                    fail: null,
                                    complete: null
                                }));
                                g.then(f), g.catch(p), u.complete && (g.then(u.complete), g.catch(u.complete));
                            } else _wepy2.default.request(Object.assign({}, u, {
                                success: f,
                                fail: p
                            }));
                        }));

                      case 2:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "requestWithLogin",
        value: function() {
            function n(e) {
                return r.apply(this, arguments);
            }
            var r = _asyncToGenerator(regeneratorRuntime.mark(function n(r) {
                var t, o, i, a, u = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                return regeneratorRuntime.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, e.login();

                      case 2:
                        if (t = n.sent, 0 == t.code) {
                            n.next = 5;
                            break;
                        }
                        throw new Error("login failed, request not sent:" + r.url);

                      case 5:
                        return o = r.success, r.success = null, n.next = 9, e.request(r, {
                            requestDetail: !0
                        });

                      case 9:
                        if (i = n.sent, a = i.data, !e._config.apiAuthFail(a, r)) {
                            n.next = 17;
                            break;
                        }
                        if (e._clearLoginInfo(), !u) {
                            n.next = 17;
                            break;
                        }
                        if ("function" != typeof s) {
                            n.next = 16;
                            break;
                        }
                        return n.abrupt("return", s());

                      case 16:
                        return n.abrupt("return", e.requestWithLogin(r, !1));

                      case 17:
                        return e.execSuccessHandler.call(this, i, o), n.abrupt("return", a);

                      case 19:
                      case "end":
                        return n.stop();
                    }
                }, n, this);
            }));
            return n;
        }()
    }, {
        key: "tryExecSuccessHandler",
        value: function(n, r, t, o) {
            return e.execSuccessHandler(n, r, t), !0;
        }
    }, {
        key: "execSuccessHandler",
        value: function(e, n) {
            if (e.header && e.header["set-cookie"]) {
                var r = Array.isArray(e.header["set-cookie"]) ? e.header["set-cookie"] : [ e.header["set-cookie"] ], t = !0, o = !1, i = void 0;
                try {
                    for (var a, u = r[Symbol.iterator](); !(t = (a = u.next()).done); t = !0) {
                        var s = a.value;
                        _cookie2.default.setCookie(s);
                    }
                } catch (e) {
                    o = !0, i = e;
                } finally {
                    try {
                        !t && u.return && u.return();
                    } finally {
                        if (o) throw i;
                    }
                }
            }
            "function" == typeof n && n(e);
        }
    }, {
        key: "tryExecFailHandler",
        value: function(e, n, r, t) {
            var o = !0, i = this.$root;
            if (i && i.$invoke) try {
                i.$invoke("PageFrame/ErrorTip", "showErrorPage", 1, t || function() {}), o = !1, 
                console.log("tryExecFailHandler", o, r), "function" == typeof n && n(e);
            } catch (r) {
                console.log(r, "error"), "function" == typeof n && n(e);
            } else "function" == typeof n && n(e);
            return o;
        }
    }, {
        key: "userInfo",
        get: function() {
            return e._userInfo;
        }
    }, {
        key: "zzUserInfo",
        get: function() {
            return e._zzUserInfo;
        }
    } ]), e;
}();

ZZLogin._userInfo = JSON.parse(wx.getStorageSync("userInfo") || "{}"), ZZLogin._zzUserInfo = JSON.parse(wx.getStorageSync("zzUserInfo") || "{}"), 
ZZLogin._loginSingleton = null, ZZLogin._wepyPromisify = "unknown", ZZLogin._config = {
    source: "",
    t: "",
    denyTip: "小程序需要您的授权才能提供更好的服务哦~",
    apiAuthFail: function(e, n) {
        return e.errMsg && e.errMsg.includes("请登录") || n.url.includes("/zz/") && -8 == e.respCode || n.url.includes("/zzopen/") && -2 == e.respCode || n.url.includes("/zzopen/") && -5 == e.respCode || n.url.includes("/getNickNameAndPhoto") && -1 == e.respCode || n.url.includes("/zz/transfer/query") && -1 == e.respCode || n.url.includes("grzhuanzhuan") && ("string" == typeof e || 2e5 != e.code) || n.url.includes("/zzczextension/") && -3 == e.respCode;
    },
    installProps: {
        $loginCenter: "*this",
        $login: "login",
        $http: "request",
        $httpWithLogin: "requestWithLogin",
        $logout: "logout",
        $reLogin: "reLogin"
    },
    invalidResp: function(e, n) {
        return (n.url.includes("app.zhuanzhuan.com/zz") || n.url.includes("app.zhuanzhuan.com/zzopen")) && 0 != e.respCode;
    },
    beforeRequest: null,
    loginFailed: function(e) {
        wx.showToast({
            title: e.toastMsg || "登录失败",
            image: "/images/tipfail.png",
            duration: 3e3
        });
    }
}, exports.default = ZZLogin;
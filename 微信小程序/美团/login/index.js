function e(e) {
    return e && "object" == (void 0 === e ? "undefined" : u(e)) && "default" in e ? e.default : e;
}

function t(e, t) {
    function n() {
        this.constructor = e;
    }
    m(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, 
    new n());
}

function n(e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
    }
    return n;
}

function r(e, t, n, r) {
    return new (n || (n = Promise))(function(o, i) {
        function s(e) {
            try {
                u(r.next(e));
            } catch (e) {
                i(e);
            }
        }
        function a(e) {
            try {
                u(r.throw(e));
            } catch (e) {
                i(e);
            }
        }
        function u(e) {
            e.done ? o(e.value) : new n(function(t) {
                t(e.value);
            }).then(s, a);
        }
        u((r = r.apply(e, t || [])).next());
    });
}

function o(e, t) {
    function n(n) {
        return function(s) {
            return function(n) {
                if (r) throw new TypeError("Generator is already executing.");
                for (;a; ) try {
                    if (r = 1, o && (i = o[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(i = i.call(o, n[1])).done) return i;
                    switch (o = 0, i && (n = [ 0, i.value ]), n[0]) {
                      case 0:
                      case 1:
                        i = n;
                        break;

                      case 4:
                        return a.label++, {
                            value: n[1],
                            done: !1
                        };

                      case 5:
                        a.label++, o = n[1], n = [ 0 ];
                        continue;

                      case 7:
                        n = a.ops.pop(), a.trys.pop();
                        continue;

                      default:
                        if (!(i = 0 < (i = a.trys).length && i[i.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            a = 0;
                            continue;
                        }
                        if (3 === n[0] && (!i || n[1] > i[0] && n[1] < i[3])) {
                            a.label = n[1];
                            break;
                        }
                        if (6 === n[0] && a.label < i[1]) {
                            a.label = i[1], i = n;
                            break;
                        }
                        if (i && a.label < i[2]) {
                            a.label = i[2], a.ops.push(n);
                            break;
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    n = t.call(e, a);
                } catch (e) {
                    n = [ 6, e ], o = 0;
                } finally {
                    r = i = 0;
                }
                if (5 & n[0]) throw n[1];
                return {
                    value: n[0] ? n[1] : void 0,
                    done: !0
                };
            }([ n, s ]);
        };
    }
    var r, o, i, s, a = {
        label: 0,
        sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1];
        },
        trys: [],
        ops: []
    };
    return s = {
        next: n(0),
        throw: n(1),
        return: n(2)
    }, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
        return this;
    }), s;
}

function i() {}

function s(e) {
    if (/^[\x00-\x7f]*$/.test(e)) return e;
    for (var t = [], n = e.length, r = 0, o = 0; r < n; ++r, ++o) {
        var i = e.charCodeAt(r);
        if (i < 128) t[o] = e.charAt(r); else if (i < 2048) t[o] = String.fromCharCode(192 | i >> 6, 128 | 63 & i); else if (i < 55296 || 57343 < i) t[o] = String.fromCharCode(224 | i >> 12, 128 | i >> 6 & 63, 128 | 63 & i); else if (r + 1 < n) {
            var s = e.charCodeAt(r + 1);
            if (i < 56320 && 56320 <= s && s <= 57343) {
                var a = 65536 + ((1023 & i) << 10 | 1023 & s);
                t[o] = String.fromCharCode(240 | a >> 18 & 63, 128 | a >> 12 & 63, 128 | a >> 6 & 63, 128 | 63 & a), 
                ++r;
                continue;
            }
        }
    }
    return t.join("");
}

function a(e, t) {
    var n, r = e.length, o = r >> 2;
    0 != (3 & r) && ++o, t ? (n = new Array(o + 1))[o] = r : n = new Array(o);
    for (var i = 0; i < r; ++i) n[i >> 2] |= e.charCodeAt(i) << ((3 & i) << 3);
    return n;
}

var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, c = require("./config.js").promise;

c && (Promise = c);

var d = require("./config.js").promise;

d && (Promise = d), Object.defineProperty(exports, "__esModule", {
    value: !0
});

var l = require("../npm/@mtfe/mt-weapp-url/stringify.js"), f = require("../npm/@mtfe/mt-weapp-authrize/index.js"), p = require("../npm/@mtfe/mt-weapp-authrize/types.js"), h = e(require("../npm/@mtfe/wx-rc-finger/dist/finger.js")), v = e(require("../npm/@mtfe/wxapp-rohr/dist/rohr.js"));

String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
    return this.substr(!t || t < 0 ? 0 : +t, e.length) === e;
});

var g, w, m = Object.setPrototypeOf || {
    __proto__: []
} instanceof Array && function(e, t) {
    e.__proto__ = t;
} || function(e, t) {
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
}, y = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e;
}, I = function(e) {
    function n(t, n) {
        var r = e.call(this, "Wechat API " + t + " get error result: [msg]" + n) || this;
        return r.api = t, r.msg = n, Object.setPrototypeOf(r, _.prototype), r;
    }
    return t(n, e), n;
}(Error), b = function(e) {
    function n(t) {
        var r = e.call(this, "wx.getUserInfo", t) || this;
        return Object.setPrototypeOf(r, n.prototype), r;
    }
    return t(n, e), n;
}(I), x = function(e) {
    function n(t, r, o) {
        void 0 === o && (o = "");
        var i = e.call(this, "Request " + r + " failed: " + t + ". " + o) || this;
        return Object.setPrototypeOf(i, n.prototype), i;
    }
    return t(n, e), n;
}(Error), _ = function(e) {
    function n(t, r) {
        var o = this, i = r || {
            code: 0,
            message: "自定义未知错误，可能是数据返回格式错误"
        }, s = i.code, a = i.message;
        return (o = e.call(this, "API " + t + " return error result: " + a) || this).code = s, 
        o.tip = a, Object.setPrototypeOf(o, n.prototype), o;
    }
    return t(n, e), n;
}(Error), S = function(e) {
    function n(t, r, o) {
        void 0 === o && (o = !0);
        var i = e.call(this, t + (null != r ? "[" + r + "]" : "")) || this;
        return i.show = o, i.code = r, i.tip = t, Object.setPrototypeOf(i, n.prototype), 
        i;
    }
    return t(n, e), n;
}(Error), C = void 0, P = function(e) {
    return r(C, void 0, void 0, function() {
        return o(this, function(t) {
            switch (t.label) {
              case 0:
                return null != e ? [ 3, 2 ] : [ 4, (void 0 === n && (n = {}), new Promise(function(e, t) {
                    wx.login({
                        success: function(n) {
                            n ? e(n.code) : t(new I("wx.login", "null login result"));
                        },
                        fail: function(e) {
                            t(new I("wx.login", "fail to request login"));
                        }
                    });
                })) ];

              case 1:
                return [ 2, g = t.sent() ];

              case 2:
                return [ 2, g = e ];
            }
            var n;
        });
    });
}, D = function() {
    return g;
}, T = function(e) {
    return new Promise(function(t, n) {
        wx.getStorage({
            key: e,
            success: function(e) {
                e && e.data ? t(e.data) : n(new I("getStorage", "null result"));
            },
            fail: function(e) {
                n(new I("getStorage", "fail to request getStorage"));
            }
        });
    });
}, E = function(e, t) {
    return new Promise(function(n, r) {
        wx.setStorage({
            key: e,
            data: t,
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                r(new I("setStorage", "fail to request setStorage"));
            }
        });
    });
}, k = function(e, t) {
    var n = void 0 === t ? {} : t, r = n.title, o = void 0 === r ? "提示" : r, i = n.showCancel, s = void 0 !== i && i, a = n.confirmText, u = void 0 === a ? "确定" : a, c = n.cancelText, d = void 0 === c ? "取消" : c;
    return new Promise(function(t, n) {
        wx.showModal({
            title: o,
            content: e || "",
            showCancel: s,
            confirmText: u,
            cancelText: d,
            success: function(e) {
                t(!s || e && e.confirm);
            },
            fail: function() {
                n();
            }
        });
    });
}, O = function(e, t, n) {
    void 0 === t && (t = "success"), void 0 === n && (n = 2e3), wx.showToast({
        title: e,
        mask: !0,
        icon: t,
        duration: n
    });
}, R = !1, A = function(e, t, n) {
    return void 0 === t && (t = e.replace(/^\/|\?.*$/g, "")), void 0 === n && (n = !1), 
    r(C, void 0, void 0, function() {
        return o(this, function(r) {
            return R ? [ 2 ] : [ 2, new Promise(function(r, o) {
                var i, s, a;
                R = !0, setTimeout(function() {
                    R = !1;
                }, 200), n || (i = t, (a = (s = getCurrentPages())[s.length - 1]) && (a.route || a.__route__) === i) ? wx.redirectTo({
                    url: e,
                    success: r,
                    fail: o
                }) : wx.navigateTo({
                    url: e,
                    success: r,
                    fail: o
                });
            }) ];
        });
    });
}, L = require("./config.js").request || function(e, t) {
    return void 0 === t && (t = {}), new Promise(function(n, r) {
        var o = t.data, i = t.header, s = void 0 === i ? {} : i, a = t.method, u = t.query, c = t.type;
        c && "form" === c.toLocaleLowerCase() && (s["content-type"] = "application/x-www-form-urlencoded"), 
        u && (e += (~e.indexOf("?") ? "&" : "?") + l.stringify(u)), wx.request({
            url: e,
            data: o,
            header: s,
            method: a,
            success: function(t) {
                t && t.data ? n(t.data) : r(new x("No data in response.", e, JSON.stringify(t)));
            },
            fail: function(t) {
                r(new x("May be due to network.", e, JSON.stringify(t)));
            }
        });
    });
}, q = require("./config.js") || {}, U = "unknown", N = {
    env: q ? q.env : ""
}, B = function() {
    return N.env;
}, V = B, j = "https://portal-portm.meituan.com/weapp/loginsdk/api/", K = void 0, M = function(e) {
    return e && "string" == typeof e && 64 === e.length;
}, W = function e(t) {
    return r(K, void 0, void 0, function() {
        var n;
        return o(this, function(r) {
            switch (r.label) {
              case 0:
                return [ 4, L("portm" === q.api ? j + "uuid" : "https://i.meituan.com/uuid/register").catch(function(e) {
                    return console.log(e);
                }) ];

              case 1:
                return n = r.sent(), M(n) ? [ 3, 3 ] : 0 < t ? [ 4, e(t - 1) ] : [ 3, 3 ];

              case 2:
                return [ 2, r.sent() ];

              case 3:
                return [ 2, n || "" ];
            }
        });
    });
}, Y = function(e, t) {
    return void 0 === t && (t = 1), r(K, void 0, void 0, function() {
        var n;
        return o(this, function(r) {
            switch (r.label) {
              case 0:
                return M(e) ? [ 2, w = e ] : M(w) ? [ 2, w ] : [ 4, W(t) ];

              case 1:
                return n = r.sent(), [ 2, w = n ];
            }
        });
    });
}, F = q, H = F.appConfig, X = {
    loginRoute: "",
    bindRoute: "",
    smsVerifyRoute: "",
    _route: "",
    set sdkRoute(e) {
        this._route = e, this.loginRoute = e + "/entry/index", this.bindRoute = e + "/bind/index", 
        this.smsVerifyRoute = e + "/sms-verify/index";
    },
    get sdkRoute() {
        return this._route;
    }
};

X.sdkRoute = F.route;

var G, z, $, Q = F.entryPageOption, J = F.bindPageOption, Z = F.tips;

(z = exports.API_TYPE || (exports.API_TYPE = {})).WX_MOBILE = "wxMobileLogin", z.WXV2 = "wxLogin", 
z.MOBILE = "mobileLogin", z.LOGIN = "login", ($ || ($ = {})).create = "createSession";

var ee, te = function(e) {
    return e && e.iv ? e : null;
}, ne = f.config, re = function(e) {
    return void 0 === e && (e = {}), r(void 0, void 0, void 0, function() {
        var t, n, r;
        return o(this, function(o) {
            switch (o.label) {
              case 0:
                return [ 4, new Promise(function(e, t) {
                    wx.getSetting({
                        success: function(t) {
                            e(t);
                        },
                        fail: function(e) {
                            t(null);
                        }
                    });
                }) ];

              case 1:
                return (t = o.sent().authSetting) && t["scope.userInfo"] ? (!0 === (n = e.withCredentials) && P(D()), 
                [ 4, (i = {
                    withCredentials: n
                }, new Promise(function(e, t) {
                    wx.getUserInfo(y({}, i, {
                        success: function(t) {
                            e(t);
                        },
                        fail: function() {
                            t(null);
                        }
                    }));
                })) ]) : [ 3, 3 ];

              case 2:
                if (r = o.sent(), !n || te(r)) return [ 2, r ];
                o.label = 3;

              case 3:
                return wx.hideToast(), f.config.dirname = q.authRoute || X.sdkRoute + "/authrize", 
                [ 2, f.authrize(p.AUTH_TYPE.userInfo, e).catch(function(e) {
                    throw console.error(e), new Error(Z.refuseUserInfoAuth);
                }) ];
            }
            var i;
        });
    });
};

(ee = exports.SessionState || (exports.SessionState = {})).AUTH = "auth", ee.BINDING = "bind", 
ee.DESTORY = "destory", ee.ABORT = "abort", (exports.SessionEvent || (exports.SessionEvent = {})).CLICK = "click";

var oe, ie = function() {
    function e(e, t, n) {
        void 0 === t && (t = exports.SessionState.AUTH), this._callbacks = {}, this.type = e, 
        this.state = t, n && (this.expire = new Date().getTime() + n);
    }
    return Object.defineProperty(e.prototype, "expired", {
        get: function() {
            return !!this.expire && this.expire < new Date().getTime();
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype._state = function(e, t) {
        this.state = e, t && (this.data = t), this._emit(e, t);
    }, e.prototype._emit = function(e, t) {
        var n = this, r = this._callbacks[e];
        r && r.forEach(function(e) {
            return e.call(n, t);
        });
    }, e.prototype.on = function(e, t) {
        (this._callbacks[e] = this._callbacks[e] || []).push(t);
    }, e.prototype.clean = function() {
        this._callbacks = {}, this.resolve = null;
    }, e.prototype.abort = function() {
        this._state(exports.SessionState.ABORT);
    }, e;
}(), se = {}, ae = {
    get session() {
        return oe;
    },
    set session(e) {
        oe && oe._state(exports.SessionState.DESTORY), oe = e;
    }
}, ue = void 0, ce = [ function(e) {
    if (e instanceof _) return console.log("MtAPIError: " + e.message), k(e.tip);
}, function(e) {
    if (e instanceof x) return console.log(e.message), k(Z.networkTimeout);
}, function(e) {
    if (e instanceof I) return console.log("WxAPIError: " + e.message), k(e instanceof b ? Z.refuseUserInfoAuth : "调用" + e.api + "出错！" + e.msg);
}, function(e) {
    if (e instanceof S) return console.log("SDKError: " + e.message), !e.show || k("" + e.tip);
} ], de = function(e) {
    return r(ue, void 0, void 0, function() {
        var t, n;
        return o(this, function(r) {
            switch (r.label) {
              case 0:
                wx.hideToast(), t = 0, n = ce, r.label = 1;

              case 1:
                return t < n.length ? [ 4, (0, n[t])(e) ] : [ 3, 4 ];

              case 2:
                if (r.sent()) return [ 2 ];
                r.label = 3;

              case 3:
                return t++, [ 3, 1 ];

              case 4:
                return console.error(e.message), [ 4, k(e.message) ];

              case 5:
                return r.sent(), [ 2 ];
            }
        });
    });
}, le = function(e) {
    return r(ue, void 0, void 0, function() {
        return o(this, function(t) {
            switch (t.label) {
              case 0:
                return e && e.token && e.userId ? (ae.authInfo = e, H.persistKey ? [ 4, E(H.persistKey, e).catch(function(e) {
                    console.error(e);
                }) ] : [ 3, 2 ]) : [ 3, 4 ];

              case 1:
                t.sent(), t.label = 2;

              case 2:
                return [ 4, he() ];

              case 3:
                return t.sent(), [ 2, e ];

              case 4:
                throw new S(Z.illegalAuthInfo);
            }
        });
    });
}, fe = function() {
    return r(ue, void 0, void 0, function() {
        var e, t;
        return o(this, function(n) {
            switch (n.label) {
              case 0:
                return (e = ae.authInfo) && e.token ? [ 2, e ] : H.persistKey ? [ 4, T(H.persistKey).catch(function() {
                    return null;
                }) ] : [ 3, 2 ];

              case 1:
                if ((t = n.sent()) && t.token) return [ 2, t ];
                n.label = 2;

              case 2:
                return [ 2, null ];
            }
        });
    });
}, pe = function() {
    return r(ue, void 0, void 0, function() {
        return o(this, function(e) {
            switch (e.label) {
              case 0:
                return ae.authInfo = null, H.persistKey ? [ 4, (t = H.persistKey, new Promise(function(e, n) {
                    wx.removeStorage({
                        key: t,
                        success: function(t) {
                            e(t);
                        },
                        fail: function(e) {
                            n(new I("removeStorage", "fail to request removeStorage"));
                        }
                    });
                })).catch(i) ] : [ 3, 2 ];

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 ];
            }
            var t;
        });
    });
}, he = function(e) {
    return r(ue, void 0, void 0, function() {
        var t, n, r, i;
        return o(this, function(o) {
            switch (o.label) {
              case 0:
                return (t = ae.session) ? (n = t.resolve, r = t.redirectUrl, i = t.waitBack, ae.session = null, 
                i ? [ 4, ve(r) ] : [ 3, 2 ]) : [ 3, 4 ];

              case 1:
                return o.sent(), [ 3, 3 ];

              case 2:
                ve(r), o.label = 3;

              case 3:
                "function" == typeof n && n(e || fe()), o.label = 4;

              case 4:
                return [ 2 ];
            }
        });
    });
}, ve = function(e) {
    return r(ue, void 0, void 0, function() {
        var t, n, r, i, s;
        return o(this, function(o) {
            return t = getCurrentPages(), n = X.sdkRoute.replace(/^\//, ""), r = t[0].route ? "route" : "__route__", 
            i = t.findIndex(function(e) {
                return e[r].startsWith(n);
            }), e ? 0 < i && i === t.length - 1 ? [ 2, A(e, "", !0) ] : [ 2, A(e) ] : -1 === i ? [ 2 ] : 0 < (s = 0 < i ? t.length - i : t.length - i - 1) ? [ 2, new Promise(function(e) {
                wx.navigateBack({
                    delta: s
                });
                var n = t.length - s;
                !function t() {
                    setTimeout(function() {
                        getCurrentPages().length === n ? e() : t();
                    }, 100);
                }();
            }) ] : [ 2 ];
        });
    });
}, ge = function(e, t) {
    return r(ue, void 0, void 0, function() {
        var n;
        return o(this, function(r) {
            switch (r.label) {
              case 0:
                return [ 4, le(Object.assign(e, t)) ];

              case 1:
                return n = r.sent(), O(Z.loginSuccess), [ 2, n ];
            }
        });
    });
}, we = function(e) {
    return r(ue, void 0, void 0, function() {
        return o(this, function(t) {
            switch (t.label) {
              case 0:
                return G ? [ 4, G(e) ] : [ 3, 2 ];

              case 1:
                if (!t.sent()) throw new S("loginCheck failed", 3, !1);
                t.label = 2;

              case 2:
                return [ 2 ];
            }
        });
    });
}, me = function(e, t) {
    var n = ae.session;
    return n && !n.expired ? (n.clean(), n) : ae.session = new ie(e, exports.SessionState.AUTH, t);
}, ye = {
    getLoginCode: P,
    getUserInfo: re,
    authrizeConfig: ne,
    getUUID: Y,
    getStorage: T,
    setStorage: E,
    showTip: k,
    showToast: O,
    request: L,
    stringify: l.stringify,
    navigate: A
}, Ie = function e(t) {
    return r(void 0, void 0, void 0, function() {
        var n, r, i, s;
        return o(this, function(o) {
            switch (o.label) {
              case 0:
                return r = !0, (t = t || {}) instanceof ie ? n = t : (n = t.session || e[$.create](), 
                !1 === t.bind && (r = !1)), n.data = n.data || {}, n.redirectUrl = t.redirectUrl, 
                n.waitBack = t.waitBack, n.data.wxUserInfoData = t.wxUserInfoData, i = X.loginRoute, 
                s = n.type === exports.API_TYPE.LOGIN ? i + "?bind=" + r : i + "?type=" + n.type + "&bind=" + r, 
                t.code && n.data.wxUserInfoData && (s = s + "code=" + t.code), [ 4, A(s, i.substr(1)) ];

              case 1:
                return o.sent(), [ 4, new Promise(function(e, t) {
                    n.resolve = e;
                }) ];

              case 2:
                return [ 2, o.sent() ];
            }
        });
    });
};

Ie[$.create] = function() {
    return me(exports.API_TYPE.LOGIN);
};

var be, xe, _e = function(e) {
    return r(void 0, void 0, void 0, function() {
        var t, n;
        return o(this, function(r) {
            switch (r.label) {
              case 0:
                return t = e || Se[$.create](), n = X.bindRoute, [ 4, A(n, X.bindRoute.substr(1)) ];

              case 1:
                return r.sent(), [ 2, t ];
            }
        });
    });
}, Se = function(e) {
    return r(void 0, void 0, void 0, function() {
        var t;
        return o(this, function(n) {
            switch (n.label) {
              case 0:
                return [ 4, _e(e) ];

              case 1:
                return t = n.sent(), [ 4, new Promise(function(e, n) {
                    t.resolve = e;
                }) ];

              case 2:
                return [ 2, n.sent() ];
            }
        });
    });
};

Se[$.create] = function() {
    return me(exports.API_TYPE.MOBILE);
}, (xe = be || (be = {})).loginApplyUrl = "mobileloginapply", xe.mobileLoginUrl = "mobilelogin", 
xe.verifyloginUrl = "verifylogin", xe.wxMobileLoginApiV2 = "wxmobilelogin", xe.wxLoginApiV2 = "wxlogin", 
xe.wxSlientLoginApiV2 = "wxslientlogin", xe.wxMobileBindApplyApiV2 = "wxbindapply", 
xe.wxMobileBindLoginApiV2 = "wxbind", xe.wxTicketLoginApiV2 = "wxticketlogin", xe.updateWxUserApi = "updatewxuserinfo", 
xe.getWxUserApi = "getwxuserinfo";

var Ce, Pe = function(e) {
    var t = require("./urls.js")[B() || "prod"];
    return ("portm" === q.api ? Object.keys(t).reduce(function(e, t) {
        return e[t] = j + (B() ? B() + "/" : "") + t, e;
    }, {}) : t)[e];
}, De = be.verifyloginUrl, Te = function() {
    return Ce || new Promise(function(e, t) {
        h.g(e);
    }).then(function(e) {
        return Ce = e;
    }).catch(function(e) {
        throw new S("获取指纹信息失败：" + (e && e.message));
    });
}, Ee = function(e, t, n, r, o) {
    var i = n.risk_platform, s = n.risk_partner;
    return L(e, {
        method: "POST",
        query: {
            uuid: t,
            risk_platform: i,
            risk_partner: s,
            sdkVersion: U
        },
        type: "form",
        data: r
    });
}, ke = void 0, Oe = be.wxLoginApiV2, Re = be.wxMobileLoginApiV2, Ae = be.wxMobileBindApplyApiV2, Le = be.wxMobileBindLoginApiV2, qe = be.wxTicketLoginApiV2, Ue = be.wxSlientLoginApiV2, Ne = be.loginApplyUrl, Be = be.mobileLoginUrl, Ve = function(e, t, n, i, s) {
    return void 0 === n && (n = !0), void 0 === i && (i = null), r(void 0, void 0, void 0, function() {
        var a, u, c, d, l, f, p, h, v, g, w;
        return o(this, function(m) {
            switch (m.label) {
              case 0:
                s || me(exports.API_TYPE.WX_MOBILE), m.label = 1;

              case 1:
                return m.trys.push([ 1, 6, , 7 ]), a = H.appName, u = H.risk_partner, c = H.risk_platform, 
                d = H.uuid, "string" == typeof t ? [ 3, 3 ] : [ 4, P() ];

              case 2:
                t = m.sent(), m.label = 3;

              case 3:
                return l = {
                    phoneNumberData: e,
                    uuid: d,
                    appName: a,
                    risk_partner: u,
                    risk_platform: c,
                    loginCode: t,
                    bind: n,
                    wxUserInfoData: te(i)
                }, [ 4, (I = l, r(ke, void 0, void 0, function() {
                    var e, t, n, r, i, s, a, u, c, d, l, f, p, h, v, g, w, m, y, b, x, S, C;
                    return o(this, function(o) {
                        switch (o.label) {
                          case 0:
                            return e = I.appName, n = I.loginCode, r = I.uuid, i = I.bind, s = I.wxUserInfoData, 
                            a = (t = I.phoneNumberData).iv, u = t.encryptedData, [ 4, Promise.all([ Y(r), P(n), Te() ]) ];

                          case 1:
                            return c = o.sent(), d = c[0], l = c[1], f = c[2], p = {
                                appName: e,
                                code: l,
                                iv: a,
                                encryptedData: u,
                                bind: !!i,
                                wechatFingerprint: f
                            }, h = {
                                code: l,
                                uuid: d
                            }, i ? (x = te(s)) ? [ 3, 3 ] : [ 4, re() ] : [ 3, 4 ];

                          case 2:
                            x = o.sent(), o.label = 3;

                          case 3:
                            g = (v = x).userInfo, w = v.rawData, m = v.signature, y = v.iv, b = v.encryptedData, 
                            Object.assign(p, {
                                rawData: w,
                                signature: m,
                                encryptedData2: b,
                                iv2: y
                            }), h.userInfo = g, o.label = 4;

                          case 4:
                            return [ 4, Ee(Pe(Re), d, I, p) ];

                          case 5:
                            if (S = o.sent(), C = S.error) throw new _(Pe(Re), C);
                            return h.loginInfo = S, [ 2, h ];
                        }
                    });
                })) ];

              case 4:
                return f = m.sent(), p = f.loginInfo, h = f.uuid, v = f.code, g = y({
                    type: exports.API_TYPE.WX_MOBILE
                }, p.data, {
                    uuid: h,
                    code: v
                }), n && (g.wxUserInfo = f.userInfo), [ 4, le(g) ];

              case 5:
                return [ 2, m.sent() ];

              case 6:
                return w = m.sent(), [ 2, de(w) ];

              case 7:
                return [ 2 ];
            }
            var I;
        });
    });
}, je = function e(t) {
    return void 0 === t && (t = {}), r(void 0, void 0, void 0, function() {
        var n, i, s, a, u, c, d, f, p, h, v, g, w, m, I, b, x;
        return o(this, function(S) {
            switch (S.label) {
              case 0:
                s = i = !0, t instanceof ie ? n = t : ((n = t.session || e[$.create]()).redirectUrl = t.redirectUrl, 
                n.waitBack = t.waitBack, !1 === t.bind && (i = !1), !1 === t.slient && (s = !1)), 
                S.label = 1;

              case 1:
                return S.trys.push([ 1, 11, , 12 ]), s || O("登录中...", "loading", 5e3), a = H.appName, 
                u = H.risk_partner, c = H.risk_platform, d = H.uuid, (f = n.data) && f.code === D() ? [ 3, 5 ] : s ? [ 4, (T = {
                    appName: a,
                    risk_partner: u,
                    risk_platform: c,
                    uuid: d
                }, r(ke, void 0, void 0, function() {
                    var e, t, n, r, i, s, a, u, c;
                    return o(this, function(o) {
                        switch (o.label) {
                          case 0:
                            return e = T.appName, t = T.uuid, [ 4, P() ];

                          case 1:
                            return n = o.sent(), [ 4, Promise.all([ Y(t), Te() ]) ];

                          case 2:
                            return r = o.sent(), i = r[0], s = r[1], a = {
                                appName: e,
                                code: n,
                                wechatFingerprint: s
                            }, [ 4, Ee(Pe(Ue), i, T, a) ];

                          case 3:
                            if (u = o.sent(), (c = u.error) && 101155 !== c.code) throw new _(Pe(Ue), c);
                            return [ 2, {
                                loginInfo: u,
                                code: n,
                                uuid: i
                            } ];
                        }
                    });
                })) ] : [ 3, 3 ];

              case 2:
                return f = S.sent(), [ 3, 5 ];

              case 3:
                return [ 4, (C = {
                    appName: a,
                    risk_partner: u,
                    risk_platform: c,
                    uuid: d,
                    wxUserInfoData: t.wxUserInfoData
                }, r(ke, void 0, void 0, function() {
                    var e, t, n, r, i, s, a, u, c, d, l, f, p, h, v, g, w;
                    return o(this, function(o) {
                        switch (o.label) {
                          case 0:
                            return e = C.appName, t = C.uuid, n = C.wxUserInfoData, [ 4, P(C.loginCode) ];

                          case 1:
                            return r = o.sent(), (l = te(n)) ? [ 3, 3 ] : [ 4, re({
                                withCredentials: !0
                            }) ];

                          case 2:
                            l = o.sent(), o.label = 3;

                          case 3:
                            return s = (i = l).userInfo, a = i.rawData, u = i.signature, c = i.iv, d = i.encryptedData, 
                            [ 4, Promise.all([ Y(t), Te() ]) ];

                          case 4:
                            return f = o.sent(), p = f[0], h = f[1], v = {
                                appName: e,
                                code: r,
                                iv: c,
                                encryptedData: d,
                                rawData: a,
                                signature: u,
                                wechatFingerprint: h
                            }, [ 4, Ee(Pe(Oe), p, C, v) ];

                          case 5:
                            if (g = o.sent(), (w = g.error) && 101155 !== w.code) throw new _(Pe(Oe), w);
                            return [ 2, {
                                loginInfo: g,
                                userInfo: s,
                                code: r,
                                uuid: p
                            } ];
                        }
                    });
                })) ];

              case 4:
                f = S.sent(), S.label = 5;

              case 5:
                return p = f.loginInfo, h = f.code, v = f.uuid, g = f.userInfo, w = p.openId, m = p.data, 
                I = p.error, b = {
                    code: h,
                    uuid: v,
                    openId: w,
                    wxUserInfo: null
                }, s || (b.wxUserInfo = g), I ? (n._state(exports.SessionState.BINDING, f), i ? [ 4, A(X.bindRoute + "?" + l.stringify({
                    openId: w
                }), X.bindRoute.substr(1)) ] : [ 2, y({}, b, {
                    error: I
                }) ]) : [ 3, 8 ];

              case 6:
                return S.sent(), wx.hideToast(), [ 4, new Promise(function(e, t) {
                    n.on(exports.SessionState.ABORT, function() {
                        e();
                    }), n.resolve = e;
                }) ];

              case 7:
                return [ 2, S.sent() ];

              case 8:
                return wx.hideToast(), m ? [ 4, le(y({}, b, m)) ] : [ 3, 10 ];

              case 9:
                return [ 2, S.sent() ];

              case 10:
                return [ 3, 12 ];

              case 11:
                return x = S.sent(), [ 2, de(x) ];

              case 12:
                return [ 2 ];
            }
            var C, T;
        });
    });
};

je[$.create] = function() {
    var e = me(exports.API_TYPE.WXV2);
    return e.type === exports.API_TYPE.WXV2 && e.state === exports.SessionState.BINDING ? e : ae.session = new ie(exports.API_TYPE.WXV2, exports.SessionState.AUTH, 6e5);
};

var Ke, Me, We, Ye, Fe, He, Xe, Ge = be.updateWxUserApi, ze = be.getWxUserApi, $e = function() {
    function e() {
        var e, t, n, r, o, i;
        this.data = (e = Q.title, t = Q.wxLoginText, n = Q.mobileLoginText, r = Q.imageSrc, 
        o = Q.imageMode, i = Q.imageStyle, {
            API_TYPE: exports.API_TYPE,
            type: exports.API_TYPE.MOBILE,
            title: e,
            wxLoginText: t,
            mobileLoginText: n,
            image: {
                src: r,
                mode: o,
                style: i
            }
        });
    }
    return e.prototype.onLoad = function(e) {
        return r(this, void 0, void 0, function() {
            var t, n;
            return o(this, function(r) {
                switch (r.label) {
                  case 0:
                    return e.type && this.setData({
                        type: e.type
                    }), t = this, (n = e.code) ? [ 3, 2 ] : [ 4, P() ];

                  case 1:
                    n = r.sent(), r.label = 2;

                  case 2:
                    return t.loginCode = n, this.bind = e.bind, [ 2 ];
                }
            });
        });
    }, e.prototype.onReady = function() {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }, e.prototype.getLoginCode = function() {
        return r(this, void 0, void 0, function() {
            var e;
            return o(this, function(t) {
                switch (t.label) {
                  case 0:
                    return e = this, [ 4, P() ];

                  case 1:
                    return e.loginCode = t.sent(), [ 2 ];
                }
            });
        });
    }, e.prototype.wxMobileLoginClick = function(e) {
        return r(this, void 0, void 0, function() {
            var t, n, r, i;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    return ae.session && ae.session._emit(exports.SessionEvent.CLICK, exports.API_TYPE.WX_MOBILE), 
                    null == (t = e.detail).iv ? (k(Z.refusePhoneNumberAuth), [ 2 ]) : [ 4, we("wechat") ];

                  case 1:
                    return o.sent(), O(Z.logining, "loading", 5e3), n = ae.session, r = null, n && n.data && (r = n.data.wxUserInfoData), 
                    [ 4, Ve(t, this.loginCode, this.bind, r, n) ];

                  case 2:
                    return i = o.sent(), wx.hideToast(), i && O(Z.loginSuccess), [ 2 ];
                }
            });
        });
    }, e.prototype.mobileLoginClick = function() {
        ae.session && ae.session._emit(exports.SessionEvent.CLICK, ae.session.type), _e(ae.session);
    }, e.prototype.wxLoginClick = function(e) {
        var t = e.detail;
        if (null != t.iv) {
            var n = ae.session, r = n.resolve || function() {
                return new S("Login session destroyed!");
            };
            je({
                session: n,
                wxUserInfoData: t,
                slient: !1
            }).then(r);
        } else k(Z.refuseUserInfoAuth);
    }, e;
}(), Qe = (Ke = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), 
function(e) {
    var t, n, r, o, i, s, a;
    for (n = r = 0, o = e.length, s = (o -= i = o % 3) / 3 << 2, 0 < i && (s += 4), 
    t = new Array(s); n < o; ) a = e.charCodeAt(n++) << 16 | e.charCodeAt(n++) << 8 | e.charCodeAt(n++), 
    t[r++] = Ke[a >> 18] + Ke[a >> 12 & 63] + Ke[a >> 6 & 63] + Ke[63 & a];
    return 1 == i ? (a = e.charCodeAt(n++), t[r++] = Ke[a >> 2] + Ke[(3 & a) << 4] + "==") : 2 == i && (a = e.charCodeAt(n++) << 8 | e.charCodeAt(n++), 
    t[r++] = Ke[a >> 10] + Ke[a >> 4 & 63] + Ke[(15 & a) << 2] + "="), t.join("");
}), Je = function(e, t) {
    return Qe((r = t, null == (n = e) || 0 === n.length ? n : (n = s(n), r = s(r), function(e, t) {
        for (var n = e.length, r = 0; r < n; r++) e[r] = String.fromCharCode(255 & e[r], e[r] >>> 8 & 255, e[r] >>> 16 & 255, e[r] >>> 24 & 255);
        return e.join("");
    }(function(e, t) {
        var n, r, o, i, s, a, u = e.length, c = u - 1;
        for (r = e[c], a = (o = 0) | Math.floor(6 + 52 / u); 0 < a; --a) {
            for (i = (o = o + 2654435769 & 4294967295) >>> 2 & 3, s = 0; s < c; ++s) n = e[s + 1], 
            r = e[s] = e[s] + ((r >>> 5 ^ n << 2) + (n >>> 3 ^ r << 4) ^ (o ^ n) + (t[3 & s ^ i] ^ r)) & 4294967295;
            n = e[0], r = e[c] = e[c] + ((r >>> 5 ^ n << 2) + (n >>> 3 ^ r << 4) ^ (o ^ n) + (t[3 & c ^ i] ^ r)) & 4294967295;
        }
        return e;
    }(a(n, !0), ((o = a(r, !1)).length < 4 && (o.length = 4), o))))));
    var n, r, o;
}, Ze = function() {
    return "dev" === V() ? "http://verify.inf.dev.meituan.com" : "https://verify.meituan.com";
}, et = function() {
    return Ze() + "/v2/ext_api/page_data";
}, tt = function() {
    function e() {}
    return e.getSystemInfo = function() {
        return wx.getSystemInfoSync();
    }, e.getPageData = function(e) {
        var t = {
            requestCode: e,
            feVersion: "0.1.0",
            source: "13"
        };
        return t._token = v.r(t), new Promise(function(e, n) {
            wx.request({
                url: Ze() + "/v2/ext_api/page_data",
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: t,
                success: function(t) {
                    var n = t.data.data || {};
                    e({
                        action: n.action,
                        id: n.type
                    });
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }, e.verfiySlide = function(e) {
        var t = e.action, n = e.id, r = e.requestCode, o = e.behavior, i = void 0 === o ? null : o, s = e.captchacode, a = void 0 === s ? "" : s, u = {
            id: n,
            request_code: r,
            fingerprint: ""
        };
        return i && (u.behavior = Je(JSON.stringify(i), r)), a && (u.captchacode = a), u._token = v.r(u), 
        new Promise(function(e, r) {
            wx.request({
                url: Ze() + "/v2/ext_api/" + t + "/verify?id=" + n,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: u,
                success: function(t) {
                    var n = t.data, r = n.data, o = n.status, i = n.error;
                    e({
                        status: o,
                        error: i,
                        data: r
                    });
                },
                fail: function(e) {
                    r(e);
                }
            });
        });
    }, e.verfiyCode = function(e) {
        var t = e.action, n = e.id, r = e.requestCode, o = e.captchacode;
        return this.verfiySlide({
            action: t,
            id: n,
            requestCode: r,
            captchacode: o
        });
    }, e;
}(), nt = function() {
    function e(e) {
        var t = e.requestCode, n = e.pageData, r = e.success, o = e.fail, i = (tt.getSystemInfo() || {}).windowWidth, s = void 0 === i ? 375 : i, a = s / 375, u = [ 33 * a, 33 * a ], c = [ 225 * a, 35 * a ], d = [ 50 * a, 50 * a ], l = Date.now(), f = c[0] - u[0];
        Object.assign(this, {
            requestCode: t,
            windowWidth: s,
            zoom: a,
            btn: u,
            initTime: l,
            slideWidth: f,
            isDone: !1,
            zone: c,
            client: d,
            Timestamp: [ l ],
            count: 0,
            timeout: 0,
            points: null,
            trajectory: [],
            pageData: n,
            success: r,
            fail: o
        });
    }
    return e.prototype.sliderTouchStart = function(e) {
        this.Timestamp.push(Date.now()), this.count += 1, this.points = [], this.addPoint(e);
    }, e.prototype.sliderTouchMove = function(e) {
        var t = this.isDone, n = this.slideWidth;
        if (t) return {
            isDone: t,
            deltaX: n,
            slideWidth: n
        };
        var r = this.addPoint(e);
        return this.getPosition(r);
    }, e.prototype.sliderTouchCancel = function(e) {
        this.slidEnd();
    }, e.prototype.sliderTouchEnd = function(e) {}, e.prototype.getPoint = function(e) {
        var t = e.touches[0] || {};
        return [ t.clientX, t.clientY ];
    }, e.prototype.addPoint = function(e) {
        var t = this.points, n = this.initTime, r = this.getPoint(e), o = r[0], i = r[1];
        return this.points = t || [], this.points.push([ 0, o, i, Date.now() - n ]), [ o, i ];
    }, e.prototype.getPosition = function(e) {
        var t = e[0], n = (e[1], this.slideWidth), r = this.points[0], o = this.isDone, i = t - r[1];
        return i < 0 && (i = 0), n <= i && (i = n, this.isDone = !0, this.slidEnd()), {
            deltaX: i,
            slideWidth: n,
            isDone: o
        };
    }, e.prototype.slidEnd = function() {
        var e = this, t = e.trajectory, n = e.points, r = void 0 === n ? [] : n, o = e.Timestamp, i = e.pageData, s = void 0 === i ? {} : i, a = e.requestCode;
        (t = t.slice(-3, t.length)).push({
            point: r,
            vector: {
                orientation: "h"
            }
        }), e.trajectory = t, e.points = null, 3e3 < o[o.length - 1] - o[0] && (e.timeout += 1), 
        e.setData();
        var u = s.action, c = s.id, d = {
            action: u,
            id: c,
            requestCode: a,
            behavior: e.behavior
        };
        tt.verfiySlide(d).then(function(t) {
            var n = getApp().$loginPage, r = n.data.sliderInfo, o = t.data, i = t.status, s = t.error;
            if (1 === i) e.success(o); else if (0 === i && 121048 === s.code) {
                var a = s.request_code;
                Object.assign(r, {
                    codeImage: Ze() + "/v2/captcha?request_code=" + e.requestCode + "&action=" + u,
                    validStep: "code"
                }), n.setData({
                    "sdk.requestCode": a
                });
            } else e.fail();
            n.setData({
                sliderInfo: r
            });
        }).catch(function(t) {
            e.fail(t);
        });
    }, e.prototype.setData = function() {
        var e = this, t = e.zone, n = e.client, r = e.Timestamp, o = e.count, i = e.timeout, s = e.trajectory, a = {
            env: {
                zone: t,
                client: n,
                Timestamp: r.slice(0, 2),
                count: o,
                timeout: i
            },
            trajectory: s
        };
        this.behavior = a;
    }, e;
}(), rt = {
    data: {
        sliderInfo: {}
    },
    initSliderSDK: function(e) {
        var t = this, n = e.success, r = e.fail, o = e.requestCode;
        v.i(100038);
        var i = this;
        i.sliderSuccess = n, i.sliderFail = r, tt.getPageData(o).then(function(e) {
            var n = new nt({
                pageData: e,
                requestCode: o,
                success: i.sliderVerifySuccess,
                fail: function(e) {
                    wx.showToast({
                        title: "验证失败"
                    }), r && r(e);
                }
            });
            getApp().$loginPage = t, i.setData({
                sdk: n,
                sliderInfo: {
                    moveWidth: 0,
                    codeImage: "",
                    requestCode: "",
                    sliderCode: "",
                    show: !0,
                    validStep: "slider",
                    slideStatusClass: "",
                    pageData: e
                }
            });
        }).catch(function(e) {
            r && r(e);
        });
    },
    sliderVerifySuccess: function(e) {
        var t = getApp().$loginPage, n = t.sliderSuccess, r = t.data.sliderInfo;
        r.show = !1, null != e && (r.requestCode = e.response_code), t.setData({
            sliderInfo: r
        }), wx.showToast({
            title: "验证成功"
        }), n && n(e);
    },
    sliderTouchStart: function(e) {
        this.data.sdk.sliderTouchStart(e);
    },
    sliderTouchMove: function(e) {
        var t = this.data, n = t.sdk, r = t.sliderInfo, o = n.sliderTouchMove(e), i = {
            moveWidth: o.deltaX
        };
        o.isDone && (i.slideStatusClass = "slider-boxLoading"), Object.assign(r, i), this.setData({
            sliderInfo: r
        });
    },
    sliderTouchEnd: function(e) {
        var t = this.data, n = t.sdk, r = t.sliderInfo;
        n.isDone ? this.setData({
            slideStatusClass: "slider-boxLoading"
        }) : (n.sliderTouchEnd(e), Object.assign(r, {
            moveWidth: 0
        }), this.setData({
            sliderInfo: r
        }));
    },
    sliderClose: function() {
        var e = this.data.sliderInfo;
        e.show = !1, this.setData({
            sliderInfo: e
        });
    },
    sliderValideCode: function(e) {
        var t = this, n = this.data, r = n.sliderInfo, o = r.sliderCode, i = r.pageData, s = void 0 === i ? {} : i, a = n.sdk.requestCode;
        tt.verfiyCode({
            captchacode: o,
            action: s.action,
            id: 1,
            requestCode: a
        }).then(function(e) {
            var n = e.error, r = e.data;
            r ? t.sliderVerifySuccess(r) : n ? (wx.showToast({
                title: n.message,
                icon: "loading"
            }), t.sliderUpdataCaptch()) : t.sliderVerifySuccess();
        }, function(e) {
            t.sliderFail(e);
        });
    },
    sliderUpdataCaptch: function() {
        var e = this.data, t = e.sdk.requestCode, n = e.sliderInfo.pageData;
        this.setData({
            "sliderInfo.codeImage": Ze() + "/v2/captcha?request_code=" + t + "&action=" + n.action + "&captchaHash=" + Number(new Date())
        });
    },
    sliderValideCodeInput: function(e) {
        var t = e.detail.value, n = this.data.sliderInfo;
        n.sliderCode = t, this.setData({
            sliderInfo: n
        });
    },
    onTapPage: function(e) {
        v.t(e);
    },
    onTouchMovePage: function(e) {
        v.m(e);
    }
}, ot = void 0, it = function(e) {
    if (/^\d{11}$/.test(e)) return e;
    throw new S(Z.illegalPhoneNumber, 1);
}, st = function(e, t) {
    return r(ot, void 0, void 0, function() {
        var r;
        return o(this, function(o) {
            switch (o.label) {
              case 0:
                return s = t, a = (i = e).id, u = i.token, c = n(i, [ "id", "token" ]), r = {
                    type: exports.API_TYPE.MOBILE,
                    userId: a,
                    token: u,
                    mobileUserInfo: c,
                    uuid: s
                }, [ 4, ge(r) ];

              case 1:
                return o.sent(), [ 2 ];
            }
            var i, s, a, u, c;
        });
    });
}, at = H.appName, ut = H.risk_platform, ct = H.risk_partner, dt = function(e, t, n, i) {
    return r(ot, void 0, void 0, function() {
        var s, a, u, c, d, l, f, p, h, v, g;
        return o(this, function(w) {
            switch (w.label) {
              case 0:
                return s = ae.uuid, [ 4, (m = {
                    uuid: s,
                    risk_platform: ut,
                    risk_partner: ct
                }, y = {
                    responseCode: t,
                    requestCode: e,
                    mobile: n,
                    code: i
                }, r(void 0, void 0, void 0, function() {
                    var e, t;
                    return o(this, function(n) {
                        switch (n.label) {
                          case 0:
                            return [ 4, Y((e = m).uuid) ];

                          case 1:
                            return e.uuid = n.sent(), [ 4, L(Pe(Be), {
                                method: "post",
                                type: "form",
                                query: m,
                                data: y
                            }) ];

                          case 2:
                            return t = n.sent(), [ 2, {
                                uuid: m.uuid,
                                loginInfo: t
                            } ];
                        }
                    });
                })) ];

              case 1:
                return a = w.sent(), u = a.uuid, c = a.loginInfo, wx.hideToast(), c.error ? (d = c.error, 
                l = d.code, f = d.data, p = d.message, [ 4, k(p) ]) : [ 3, 3 ];

              case 2:
                return w.sent(), 101157 === l && (h = f.param, v = f.userTicket, g = X.smsVerifyRoute + "?" + h, 
                se.userTicket = v, wx.navigateTo({
                    url: g
                })), [ 3, 5 ];

              case 3:
                return [ 4, st(c.user, u) ];

              case 4:
                w.sent(), w.label = 5;

              case 5:
                return [ 2 ];
            }
            var m, y;
        });
    });
}, lt = function(e, t, i, s, a, u, c) {
    return r(ot, void 0, void 0, function() {
        var s, d, l, f, p, h, v, g, w, m, I, b;
        return o(this, function(x) {
            switch (x.label) {
              case 0:
                return [ 4, (C = {
                    appName: at,
                    risk_platform: ut,
                    risk_partner: ct,
                    requestCode: e,
                    responseCode: t,
                    mobile: i,
                    openId: a,
                    wxUserInfoData: c && c.detail
                }, r(ke, void 0, void 0, function() {
                    var e, t, r, i, s, a, u, c, d, l, f, p, h, v, g, w;
                    return o(this, function(o) {
                        switch (o.label) {
                          case 0:
                            return e = C.uuid, t = C.wxUserInfoData, r = n(C, [ "uuid", "wxUserInfoData" ]), 
                            (l = te(t)) ? [ 3, 2 ] : [ 4, re() ];

                          case 1:
                            l = o.sent(), o.label = 2;

                          case 2:
                            return s = (i = l).userInfo, a = i.rawData, u = i.signature, c = i.iv, d = i.encryptedData, 
                            [ 4, Promise.all([ Y(e), Te() ]) ];

                          case 3:
                            return f = o.sent(), p = f[0], h = f[1], v = y({}, r, {
                                iv: c,
                                encryptedData: d,
                                rawData: a,
                                signature: u,
                                wechatFingerprint: h
                            }), [ 4, Ee(Pe(Le), p, C, v) ];

                          case 4:
                            if (g = o.sent(), (w = g.error) && 101188 !== w.code) throw new _(Pe(Le), w);
                            return [ 2, {
                                loginInfo: g,
                                userInfo: s,
                                uuid: p
                            } ];
                        }
                    });
                })) ];

              case 1:
                return s = x.sent(), d = s.loginInfo, l = s.userInfo, f = s.uuid, p = d.error, h = Object.assign({
                    openId: a,
                    wxUserInfo: l,
                    uuid: f,
                    type: exports.API_TYPE.WXV2
                }, {
                    code: u
                }), p ? (b = p.data, v = b.userInfos, g = v[1], w = g.ticket, m = g.userid, [ 4, (S = {
                    ticket: w,
                    userid: m
                }, r(ke, void 0, void 0, function() {
                    var e, t, n, r;
                    return o(this, function(o) {
                        switch (o.label) {
                          case 0:
                            return [ 4, Y(S.uuid) ];

                          case 1:
                            return e = o.sent(), [ 4, L(Pe(qe), {
                                method: "POST",
                                query: {
                                    uuid: e
                                },
                                type: "form",
                                data: S
                            }) ];

                          case 2:
                            if (t = o.sent(), n = t.error, r = t.data, n) throw new _(Pe(qe), n);
                            if (r) return [ 2, r ];
                            throw new _(Pe(qe));
                        }
                    });
                })) ]) : [ 3, 4 ];

              case 2:
                return I = x.sent(), [ 4, ge(Object.assign(h, I)) ];

              case 3:
                return [ 2, x.sent() ];

              case 4:
                return (b = d.data) ? [ 4, ge(Object.assign(h, b)) ] : [ 3, 6 ];

              case 5:
                return [ 2, x.sent() ];

              case 6:
                return [ 2 ];
            }
            var S, C;
        });
    });
}, ft = rt.data, pt = n(rt, [ "data" ]), ht = H.appName, vt = H.risk_platform, gt = H.risk_partner, wt = H.uuid, mt = {
    risk_platform: vt,
    risk_partner: gt
}, yt = function() {
    function e() {
        var e, t;
        this.data = (e = J.title, t = n(J, [ "title" ]), y({
            title: e
        }, ft, t, {
            mobileCode: "",
            phoneNumber: "",
            countdown: {
                limit: 60,
                hidden: !0
            },
            sendCodeBtn: {
                active: !1
            },
            submitBtn: {
                active: !1
            }
        })), this.initSliderSDK = pt.initSliderSDK, Object.assign(this, pt);
    }
    return e.prototype.sendVerifyCodeHandler = function(e, t, n) {}, e.prototype.loginHandler = function(e, t, n, r) {
        for (var o = [], i = 4; i < arguments.length; i++) o[i - 4] = arguments[i];
    }, e.prototype.onReady = function() {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }, e.prototype.onLoad = function(e) {
        var t, n = ae.session;
        if (n && n.type === exports.API_TYPE.WXV2 && n.state === exports.SessionState.BINDING) {
            var i = n.data;
            this.preData = i;
            var s = this.openId = i.loginInfo.openId;
            this.setData({
                openId: s
            });
        }
        t = e, r(ot, void 0, void 0, function() {
            var e, n, r, i, s, a;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    if (e = se.userTicket, n = t.requestCode, r = t.responseCode, !(e && n && r)) return [ 3, 5 ];
                    o.label = 1;

                  case 1:
                    if (o.trys.push([ 1, 4, , 5 ]), !(i = ae.uuid)) throw new S("uuid is null when invoke verifyPageLogin");
                    return [ 4, (u = {
                        requestCode: n,
                        responseCode: r,
                        userTicket: e
                    }, L(Pe(De), {
                        method: "POST",
                        data: u,
                        type: "form"
                    }).then(function(e) {
                        if (e.error) throw new _(Pe(De), e.error);
                        return e;
                    })) ];

                  case 2:
                    return s = o.sent().user, [ 4, st(s, i) ];

                  case 3:
                    return o.sent(), [ 3, 5 ];

                  case 4:
                    return a = o.sent(), [ 2, de(a) ];

                  case 5:
                    return se.userTicket = "", [ 2 ];
                }
                var u;
            });
        });
    }, e.prototype.phoneInputHandler = function(e) {
        var t = e && e.detail;
        if (t) {
            var n = t.value;
            this.setData({
                phoneNumber: n,
                sendCodeBtn: {
                    active: 11 === n.length
                }
            });
        }
    }, e.prototype.mobileCodeInputHandler = function(e) {
        var t = e && e.detail;
        if (t) {
            var n = t.value;
            this.setData({
                mobileCode: n,
                submitBtn: {
                    active: 11 === this.data.phoneNumber.length && 6 === n.length
                }
            });
        }
    }, e.prototype.sendVerifyCodeClick = function(e) {
        return r(this, void 0, void 0, function() {
            var t, n, r, i;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 3, , 4 ]), t = it(this.data.phoneNumber), r = ae, [ 4, Y(wt) ];

                  case 1:
                    return n = r.uuid = o.sent(), [ 4, this.sendVerifyCodeHandler(t, n, e) ];

                  case 2:
                    return o.sent(), [ 3, 4 ];

                  case 3:
                    return i = o.sent(), [ 2, de(i) ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype.yodaVerifyAndSendCode = function(e, t) {
        return r(this, void 0, void 0, function() {
            var n, r, i, s, a;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    return [ 4, (u = t, L(et(), {
                        method: "POST",
                        data: {
                            requestCode: u
                        },
                        type: "form"
                    }).then(function(e) {
                        var t = e.status, n = e.error;
                        if (0 === t && n) throw new _(et(), n);
                        return e;
                    })) ];

                  case 1:
                    return n = o.sent().data, r = this.pageData = n, i = r.action, s = r.type, a = parseInt(s), 
                    isNaN(a) ? (k(Z.illegalVerifyType + "(" + s + ")"), [ 2 ]) : (this.extInfoParam = {
                        id: a,
                        request_code: t,
                        fingerprint: "",
                        mobile: "" + e
                    }, [ 4, this.requestExtInfo(i, this.extInfoParam) ]);

                  case 2:
                    return o.sent(), [ 2 ];
                }
                var u;
            });
        });
    }, e.prototype.requestExtInfo = function(e, t) {
        return r(this, void 0, void 0, function() {
            var n, r;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    return [ 4, (i = e, s = t, u = Object.assign(s, {
                        _token: v.r(s)
                    }), L((a = i, Ze() + "/v2/ext_api/" + a + "/info"), {
                        method: "POST",
                        data: u,
                        type: "form"
                    })) ];

                  case 1:
                    return 1 !== (n = o.sent()).status ? [ 3, 2 ] : (this.startCountdown(), [ 2 ]);

                  case 2:
                    switch ((r = n.error).code) {
                      case 121048:
                      case 121060:
                        return [ 3, 3 ];
                    }
                    return [ 3, 6 ];

                  case 3:
                    return [ 4, this.initYodaSliderSDK(r.request_code) ];

                  case 4:
                    return o.sent(), [ 4, this.requestExtInfo(e, t) ];

                  case 5:
                    return o.sent(), this.startCountdown(), [ 3, 7 ];

                  case 6:
                    k(r.message), o.label = 7;

                  case 7:
                    return [ 2 ];
                }
                var i, s, a, u;
            });
        });
    }, e.prototype.initYodaSliderSDK = function(e) {
        var t = this;
        return new Promise(function(n, r) {
            t.initSliderSDK({
                requestCode: e,
                success: function() {
                    n();
                },
                fail: function(e) {
                    r(e || new S("yoda slider break"));
                }
            });
        });
    }, e.prototype.loginClick = function(e) {
        return r(this, void 0, void 0, function() {
            var t, n, r, i, s, a;
            return o(this, function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 4, , 5 ]), [ 4, we("mobile") ];

                  case 1:
                    if (o.sent(), t = this.data.phoneNumber, it(t), n = function(e) {
                        if (/^.{6}$/.test(e)) return e;
                        throw new S(Z.illegalSmsCode, 1);
                    }(this.data.mobileCode), !this.extInfoParam || !this.pageData) throw new S(Z.loginParamLoss);
                    return O(Z.logining, "loading", 1e4), [ 4, (u = this.pageData.action, c = y({}, this.extInfoParam, {
                        smscode: n
                    }), l = Object.assign(c, {
                        _token: v.r(c)
                    }), d = u, f = Ze() + "/v2/ext_api/" + d + "/verify", L(f, {
                        method: "POST",
                        data: l,
                        type: "form"
                    }).then(function(e) {
                        var t = e.status, n = e.error;
                        if (0 === t && n) throw new _(f, n);
                        return e;
                    })) ];

                  case 2:
                    return r = o.sent(), i = r.data.response_code, s = this.extInfoParam.request_code, 
                    [ 4, this.loginHandler(s, i, t, n, this.openId, this.preData && this.preData.code, e) ];

                  case 3:
                    return o.sent(), [ 3, 5 ];

                  case 4:
                    return a = o.sent(), wx.hideToast(), [ 2, de(a) ];

                  case 5:
                    return [ 2 ];
                }
                var u, c, d, l, f;
            });
        });
    }, e.prototype.startCountdown = function() {
        var e = this, t = this.data.countdown;
        t.hidden = !1, t.limit = 60;
        var n = function() {
            t.limit--, t.limit < 0 && (t.limit = 60, t.hidden = !0, clearInterval(r)), e.setData({
                countdown: t
            });
        }, r = setInterval(n, 1e3);
        n(), O(Z.smsCodeSent);
    }, e;
}(), It = (Me = (Xe = function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.sendVerifyCodeHandler = function(e, t, n) {
        return r(this, void 0, void 0, function() {
            var i;
            return o(this, function(s) {
                switch (s.label) {
                  case 0:
                    if (!this.openId) throw new S("null openId for wxlogin");
                    return [ 4, (a = y({
                        mobile: e,
                        uuid: t,
                        openId: this.openId,
                        appName: ht,
                        wxUserInfoData: n.detail
                    }, mt), r(ke, void 0, void 0, function() {
                        var e, t, n, r, i, s, u, c, d, l, f, p, h, v, g, w, m;
                        return o(this, function(o) {
                            switch (o.label) {
                              case 0:
                                return e = a.mobile, t = a.openId, n = a.uuid, r = a.wxUserInfoData, (l = te(r)) ? [ 3, 2 ] : [ 4, re({
                                    withCredentials: !0
                                }) ];

                              case 1:
                                l = o.sent(), o.label = 2;

                              case 2:
                                return s = (i = l).rawData, u = i.signature, c = i.iv, d = i.encryptedData, [ 4, Promise.all([ Y(n), Te() ]) ];

                              case 3:
                                return f = o.sent(), p = f[0], h = f[1], v = {
                                    openId: t,
                                    mobile: e,
                                    iv: c,
                                    encryptedData: d,
                                    rawData: s,
                                    signature: u,
                                    wechatFingerprint: h
                                }, [ 4, Ee(Pe(Ae), p, a, v) ];

                              case 4:
                                if (g = o.sent(), w = g.error, m = g.data, w) throw new _(Pe(Ae), w);
                                if (m) return [ 2, m.requestCode ];
                                throw new _(Pe(Ae));
                            }
                        });
                    })) ];

                  case 1:
                    return i = s.sent(), [ 4, this.yodaVerifyAndSendCode(e, i) ];

                  case 2:
                    return s.sent(), [ 2 ];
                }
                var a;
            });
        });
    }, n;
}(yt), Xe.prototype.loginHandler = lt, Xe).prototype, We = (He = function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.sendVerifyCodeHandler = function(e, t) {
        return r(this, void 0, void 0, function() {
            var n;
            return o(this, function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4, (o = y({
                        mobile: e,
                        uuid: t
                    }, mt), i = o.uuid, s = o.risk_platform, a = o.risk_partner, u = o.mobile, c = o.verifyLevel, 
                    d = {
                        uuid: i,
                        risk_platform: s,
                        risk_partner: a
                    }, l = {
                        mobile: u,
                        verifyLevel: void 0 === c ? 2 : c
                    }, L(Pe(Ne), {
                        method: "post",
                        type: "form",
                        query: d,
                        data: l
                    }).then(function(e) {
                        var t = e.error;
                        if (!t) throw new _(Pe(Ne));
                        var n = t.data;
                        if (n) return n.requestCode;
                        throw new _(Pe(Ne), t);
                    })) ];

                  case 1:
                    return n = r.sent(), [ 4, this.yodaVerifyAndSendCode(e, n) ];

                  case 2:
                    return r.sent(), [ 2 ];
                }
                var o, i, s, a, u, c, d, l;
            });
        });
    }, n;
}(yt), He.prototype.loginHandler = dt, He).prototype, Ye = Me.sendVerifyCodeHandler, 
Fe = We.sendVerifyCodeHandler, function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.sendVerifyCodeHandler = function(e, t, n) {
        return r(this, void 0, void 0, function() {
            return o(this, function(r) {
                switch (r.label) {
                  case 0:
                    return this.openId ? [ 4, Ye.call(this, e, t, n) ] : [ 3, 2 ];

                  case 1:
                    return r.sent(), [ 3, 4 ];

                  case 2:
                    return [ 4, Fe.call(this, e, t) ];

                  case 3:
                    r.sent(), r.label = 4;

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, n.prototype.loginHandler = function() {
        return this.openId ? lt.apply(this, arguments) : dt.apply(this, arguments);
    }, n;
}(yt)), bt = {
    slider: "0.1.0",
    sms: "0.1.0",
    image: "0.1.0",
    voice: "0.1.0",
    lbs: "0.1.0",
    buying: "0.1.0"
}, xt = {
    RISK_DEFAULT_ERROR: "121000",
    RISK_GET_VERIFYINFO_LIMIT: "121009",
    RISK_VERIFY_ERROR_TIMES_LIMIT: "121010",
    RISK_USER_RESETPWD_CODE_ERR: "121016",
    RISK_QUICKBANK_INVALID_CELLPHONE: "121033",
    RISK_QUICKBANK_DEFAULT_ERR: "121034",
    RISK_USER_RESETPWD_CODE_EXPIRE: "121036",
    RISK_USER_RESETPWD_CODE_NOT_LOAD: "121037",
    RISK_GET_VERIFY_INFO_ERROR: "121042",
    RISK_AUTHORIZE_CODE_FAIL: "121043",
    RISK_AUTHORIZE_CODE_EXPIRE: "121044",
    RISK_RISK_LEVEL_NOT_VALID: "121045",
    RISK_GET_VERIFY_CODE_CNT_REACH_LIMIT: "121046",
    RISK_LEVEL_DENY: "121051",
    RISK_VERIFY_REQUEST_TIME_OUT: "121052",
    RISK_FAKE_REQUEST: "121053",
    RISK_VOICE_SEND_TIMES_LIMIT_ONE_DAY: "121055",
    RISK_BOOM_PROOF_DENY: "121056",
    RISK_VERIFY_INFO_LOSE_EFFICACY: "121057",
    RISK_SLIDER_VERIFY_FAILED: "121058",
    RISK_VERIFY_PAYPWD_USE_PAY_ERROR_LIMIT: "121064",
    RISK_VERIFY_ERROR_TIMES_LIMIT_ONE_DAY: "121065",
    RISK_KLINGON_OUT_OF_SERVICE: "121066",
    RISK_GET_VERIFY_INFO_ERROR_RETRY: "121067",
    RISK_NO_AUTH: "121999"
}, _t = new function() {
    this.getPageData = function(e, t) {
        var n = {
            requestCode: e,
            feVersion: bt[t] || "0.1.0",
            source: 13
        };
        return n._token = encodeURIComponent(v.r(n)), new Promise(function(e, t) {
            wx.request({
                method: "POST",
                url: Ze() + "/v2/ext_api/page_data",
                data: n,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    var r = n.data, o = r.status, i = r.data, s = r.error;
                    200 === n.statusCode ? e({
                        status: o,
                        data: i,
                        error: s
                    }) : t(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }, this.sendInfo = function(e) {
        var t = void 0 === e ? {} : e, n = t.request_code, r = t.type, o = t.action, i = void 0 === o ? "" : o, s = t.options, a = void 0 === s ? null : s, c = {
            request_code: n
        };
        if (a && "object" == (void 0 === a ? "undefined" : u(a))) for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
        return c._token = encodeURIComponent(v.r(c)), new Promise(function(e, t) {
            wx.request({
                url: Ze() + "/v2/ext_api/" + i + "/info?id=" + r,
                method: "POST",
                data: c,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    var r = n.data, o = r.status, i = r.data, s = r.error;
                    200 === n.statusCode ? e({
                        status: o,
                        data: i,
                        error: s
                    }) : t("");
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }, this.verify = function(e) {
        var t = void 0 === e ? {} : e, n = t.request_code, r = t.type, o = t.action, i = void 0 === o ? "" : o, s = t.options, a = void 0 === s ? null : s, c = {
            request_code: n
        };
        if (a && "object" == (void 0 === a ? "undefined" : u(a))) for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
        return c._token = encodeURIComponent(v.r(c)), new Promise(function(e, t) {
            wx.request({
                url: Ze() + "/v2/ext_api/" + i + "/verify?id=" + r,
                method: "POST",
                data: c,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    var r = n.data, o = r.status, i = r.data, s = r.error;
                    200 === n.statusCode ? e({
                        status: o,
                        data: i,
                        error: s
                    }) : t();
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    };
}(), St = {
    data: {
        smsInfo: {}
    },
    initSmsSDK: function(e) {
        var t = this, n = void 0 === e ? {} : e, r = n.requestCode, o = n.success, i = n.fail, s = n.style, a = void 0 === s ? null : s;
        v.i(100019);
        var u, c, d, l, f, p, h, g, w = this;
        w.callBackSuccess = o, w.callBackFail = i, a && (f = a.mobileInput, p = a.codeInput, 
        h = a.codeButton, g = a.verifyButton, f && (u = f.mobilePlac || "仅支持中国大陆手机号", f.caretColor = f.caretColor || "currentColor"), 
        p && (c = p.mobilePlac || "请输入验证码", p.caretColor = p.caretColor || "currentColor"), 
        h && (d = h.text || "获取验证码", h.color = h.color || "#333", h.borderRadius = h.borderRadius || "3px", 
        h.borderWidth = h.borderWidth || "thin", h.borderColor = h.borderColor || "transparent", 
        h.backgroundColor = h.backgroundColor || "transparent"), g && (l = g.text || "验证", 
        g.color = g.color || "#333", g.borderRadius = g.borderRadius || "3px", g.borderWidth = g.borderWidth || "thin", 
        g.borderColor = g.borderColor || "transparent", g.backgroundColor = g.backgroundColor || "transparent")), 
        _t.getPageData(r).then(function(e) {
            getApp().$loginPage = t;
            var n = e.status, r = e.data;
            e.error, 0 === n && wx.showToast({
                title: "请求异常",
                complete: i()
            }), w.setData({
                smsInfo: {
                    data: r,
                    isMobile: !!r.mobile,
                    isSend: !1,
                    show: !0,
                    mobileLable: "手机号",
                    verifyCodeLable: "验证码",
                    smscode: "",
                    mobilePlac: u || "仅支持中国大陆手机号",
                    codeButText: d,
                    codePlac: c || "请输入验证码",
                    verifyButText: l || "验证",
                    smsButColor: r.mobile ? "#666666" : "#B6B6B6",
                    mobileInput: f,
                    codeInput: p,
                    codeButton: h,
                    verifyButton: g,
                    opacity: .5,
                    sendSmsDisa: !r.mobile,
                    verifyDisa: !0
                }
            });
        }).catch(function(e) {
            i(e);
        });
    },
    tapSeedSmS: function(e) {
        var t = this, n = this, r = this.data, o = r.smsInfo, i = r.smsInfo, s = i.isMobile, a = i.mobile, u = i.data, c = u.action, d = u.request_code, l = u.type;
        u.riskLevel, s && (a = ""), _t.sendInfo({
            request_code: d,
            type: l,
            action: c,
            options: {
                mobile: a,
                moduleEnable: !0
            }
        }).then(function(e) {
            var r = e.status, i = (e.data, e.error);
            1 === r ? (wx.showToast({
                title: "已发送短信"
            }), o.isSend = !0, n.setData({
                smsInfo: o
            }), t.showWaitModal()) : t.handleError(i);
        }).catch(function(e) {
            n.callBackFail();
        });
    },
    bindVerify: function(e) {
        var t = this, n = this.data.smsInfo, r = n.isMobile, o = n.smscode, i = n.mobile, s = n.data, a = s.action, u = s.request_code, c = s.type;
        s.riskLevel, r && (i = ""), _t.verify({
            request_code: u,
            type: c,
            action: a,
            options: {
                smscode: o,
                mobile: i
            }
        }).then(function(e) {
            var n = e.status, r = e.data, o = e.error;
            if (1 === n) {
                var i = r.response_code;
                t.callBackSuccess({
                    requestCode: u,
                    responseCode: i
                });
            } else t.handleError(o);
        }).catch(function(e) {
            t.callBackFail(e);
        });
    },
    handleError: function(e) {
        var t = this, n = this.data.smsInfo, r = e.code || 0, o = e.message || "网络错误";
        for (var i in xt) xt.hasOwnProperty(i) && Number(xt[i]) === r && (r = "jump");
        switch (r) {
          case 121048:
            t.showImgModal(e.request_code);
            break;

          case 121060:
            t.showSliderModal(e.request_code);
            break;

          case 121047:
            wx.showToast({
                title: "请重新发送短信",
                complete: function() {
                    n.smscode = "", n.opacity = .5, n.verifyDisa = !0, t.setData({
                        smsInfo: n
                    });
                }
            });
            break;

          case 121008:
            wx.showToast({
                title: "验证码错误",
                complete: function() {
                    n.smscode = "", n.opacity = .5, n.verifyDisa = !0, t.setData({
                        smsInfo: n
                    });
                }
            });
            break;

          case "jump":
            wx.showToast({
                title: "系统错误",
                complete: t.callBackFail()
            });
            break;

          default:
            wx.showToast({
                title: o,
                complete: t.callBackFail()
            });
        }
    },
    showImgModal: function(e) {},
    showSliderModal: function(e) {
        var t = this, n = getApp().$loginPage;
        Object.keys(rt).forEach(function(e) {
            "data" === e ? Object.assign(n.data, rt.data) : n[e] = rt[e];
        }), n.initSliderSDK({
            requestCode: e,
            success: function(e) {
                t.tapSeedSmS();
            },
            fail: function(e) {
                t.callBackFail();
            }
        });
    },
    showWaitModal: function() {
        var e = this, t = 0, n = e.data.smsInfo, r = n.codeButText, o = n.sendSmsDisa, i = r, s = setInterval(function() {
            var n = e.data.smsInfo;
            r = 60 - (t += 1) + "s后请重试", o = !0, 60 === t && (clearInterval(s), r = i, o = !1), 
            n.sendSmsDisa = o, n.codeButText = r, e.setData({
                smsInfo: n
            });
        }, 1e3);
    },
    bindMobileInput: function(e) {
        var t = e.detail.value.trim(), n = this.data.smsInfo;
        11 !== (n.mobile = t).length || isNaN(Number(t)) ? (n.sendSmsDisa = !0, n.smsButColor = "#B6B6B6") : (n.sendSmsDisa = !1, 
        n.smsButColor = "#666"), this.setData({
            smsInfo: n
        });
    },
    bindSmsCodeInput: function(e) {
        var t = e.detail.value, n = this.data.smsInfo;
        1 < (n.smscode = t).length && !0 === n.isSend ? (n.opacity = 1, n.verifyDisa = !1) : (n.opacity = .5, 
        n.verifyDisa = !0), this.setData({
            smsInfo: n
        });
    },
    onTapPage: function(e) {
        v.t(e);
    },
    onTouchMovePage: function(e) {
        v.m(e);
    }
}, Ct = St.data, Pt = n(St, [ "data" ]), Dt = function() {
    function e() {
        this.data = y({}, Ct), this.initSmsSDK = Pt.initSliderSDK, Object.assign(this, Pt);
    }
    return e.prototype.onLoad = function(e) {
        this.initSmsSDK(y({}, e, {
            success: function(e) {
                wx.redirectTo({
                    url: X.bindRoute + "?" + l.stringify(e)
                });
            },
            fail: function() {
                O(Z.verifyFailed, "none");
            },
            style: this.style || {}
        }));
    }, e;
}();

exports.finger = h, exports.EntryPage = $e, exports.BindPage = It, exports.SmsVerifyPage = Dt, 
exports.setAppConfig = function(e) {
    Object.assign(H, e);
}, exports.setSdkRoute = function(e) {
    e.startsWith("/") || (e = "/" + e), X.sdkRoute = e;
}, exports.setBindPageOption = function(e) {
    Object.assign(J, e);
}, exports.setLoginPageOption = function(e) {
    Object.assign(Q, e);
}, exports.setLoginCheck = function(e) {
    G = e;
}, exports.config = F, exports.mobileLogin = Se, exports.utils = ye, exports.SDKError = S, 
exports.WxAPIError = I, exports.WxRequestError = x, exports.WxUserInfoError = b, 
exports.authState = ae, exports.destroySession = function() {
    ae.session = null;
}, exports.getAuthInfo = fe, exports.removeAuthInfo = pe, exports.version = U, exports.login = Ie, 
exports.cleanLogin = function(e) {
    return pe().then(function() {
        return Ie(e);
    });
}, exports.wxMobileLogin = Ve, exports.wxLogin = je, exports.updateWxUserInfo = function(e) {
    return t = H.appName, n = e || {}, r(void 0, void 0, void 0, function() {
        var e, r, i, s, a, u, c, d, l;
        return o(this, function(o) {
            switch (o.label) {
              case 0:
                return e = n.code, [ 4, P(e) ];

              case 1:
                return r = o.sent(), [ 4, re({
                    withCredentials: !0
                }) ];

              case 2:
                return i = o.sent(), s = i.rawData, a = i.signature, u = i.iv, c = i.encryptedData, 
                d = {
                    appName: t,
                    code: r,
                    iv: u,
                    encryptedData: c,
                    rawData: s,
                    signature: a
                }, [ 4, L(Pe(Ge), {
                    method: "POST",
                    type: "form",
                    data: d
                }) ];

              case 3:
                if ((l = o.sent()).uniqueid) return [ 2, l ];
                throw new _(Pe(Ge));
            }
        });
    });
    var t, n;
}, exports.getWxUserInfo = function(e) {
    return r(void 0, void 0, void 0, function() {
        var t;
        return o(this, function(n) {
            switch (n.label) {
              case 0:
                return [ 4, L(Pe(ze), {
                    method: "GET",
                    data: y({}, e, {
                        thirdType: "weixin"
                    })
                }) ];

              case 1:
                if ((t = n.sent()).uniqueid) return [ 2, t ];
                throw new _(Pe(ze));
            }
        });
    });
}, exports.getSdkEnv = B, exports.setEnv = function(e) {
    N.env = e;
}, exports.getEnv = V;
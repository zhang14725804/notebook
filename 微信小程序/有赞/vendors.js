var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.ids = [ 1 ], exports.modules = {
    130: function(t, n) {
        t.exports = function(t) {
            return null != t && "object" == (void 0 === t ? "undefined" : e(t));
        };
    },
    131: function(e, t) {
        var n = Object.prototype.toString;
        e.exports = function(e) {
            return n.call(e);
        };
    },
    132: function(e, t, n) {
        var o = n(29), r = Object.prototype, i = r.hasOwnProperty, s = r.toString, a = o ? o.toStringTag : void 0;
        e.exports = function(e) {
            var t = i.call(e, a), n = e[a];
            try {
                e[a] = void 0;
                var o = !0;
            } catch (e) {}
            var r = s.call(e);
            return o && (t ? e[a] = n : delete e[a]), r;
        };
    },
    133: function(e, t, n) {
        var o = n(29), r = n(132), i = n(131), s = o ? o.toStringTag : void 0;
        e.exports = function(e) {
            return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : s && s in Object(e) ? r(e) : i(e);
        };
    },
    134: function(t, n, o) {
        var r = o(133), i = o(130);
        t.exports = function(t) {
            return "symbol" == (void 0 === t ? "undefined" : e(t)) || i(t) && "[object Symbol]" == r(t);
        };
    },
    135: function(e, t) {
        var n = Array.isArray;
        e.exports = n;
    },
    136: function(e, t) {
        e.exports = function(e, t) {
            for (var n = -1, o = null == e ? 0 : e.length, r = Array(o); ++n < o; ) r[n] = t(e[n], n, e);
            return r;
        };
    },
    137: function(t, n) {
        var o = "object" == ("undefined" == typeof global ? "undefined" : e(global)) && global && global.Object === Object && global;
        t.exports = o;
    },
    138: function(t, n, o) {
        var r = o(137), i = "object" == ("undefined" == typeof self ? "undefined" : e(self)) && self && self.Object === Object && self, s = r || i || Function("return this")();
        t.exports = s;
    },
    139: function(e, t, n) {
        var o = n(29), r = n(136), i = n(135), s = n(134), a = o ? o.prototype : void 0, u = a ? a.toString : void 0;
        e.exports = function e(t) {
            if ("string" == typeof t) return t;
            if (i(t)) return r(t, e) + "";
            if (s(t)) return u ? u.call(t) : "";
            var n = t + "";
            return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
        };
    },
    140: function(e, t, n) {
        var o = n(139);
        e.exports = function(e) {
            return null == e ? "" : o(e);
        };
    },
    141: function(e, t) {
        e.exports = function(e) {
            return function(t) {
                return null == e ? void 0 : e[t];
            };
        };
    },
    142: function(e, t, n) {
        var o = n(141)({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        });
        e.exports = o;
    },
    143: function(e, t, n) {
        var o = n(142), r = n(140), i = /[&<>"']/g, s = RegExp(i.source);
        e.exports = function(e) {
            return (e = r(e)) && s.test(e) ? e.replace(i, o) : e;
        };
    },
    29: function(e, t, n) {
        var o = n(138).Symbol;
        e.exports = o;
    },
    72: function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), 
            Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l;
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i;
                }
            }), e.webpackPolyfill = 1), e;
        };
    },
    80: function(t, n, o) {
        var r;
        r = function() {
            return function(e) {
                function t(o) {
                    if (n[o]) return n[o].exports;
                    var r = n[o] = {
                        i: o,
                        l: !1,
                        exports: {}
                    };
                    return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
                }
                var n = {};
                return t.m = e, t.c = n, t.d = function(e, n, o) {
                    t.o(e, n) || Object.defineProperty(e, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: o
                    });
                }, t.n = function(e) {
                    var n = e && e.__esModule ? function() {
                        return e.default;
                    } : function() {
                        return e;
                    };
                    return t.d(n, "a", n), n;
                }, t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }, t.p = "", t(t.s = 2);
            }([ function(e, t, n) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.log_seqb = "logv3:yz_log_seqb", t.log_seqn = "logv3:yz_log_seqn", t.log_ftime = "logv3:yz_log_ftime", 
                t.log_uuid = "logv3:yz_log_uuid", t.yztj = "yz_tj_", t.log_rurl = "logv3:yz_log_rurl", 
                t.log_dc_ps = "logv3:dc_ps", t.log_last_session_time = "logv3:yz_log_last_session_time";
            }, function(e, t, n) {
                e.exports = function(e) {
                    return {
                        set: function(t, n, o) {
                            var r = (o = o || {}).expire || 10080;
                            try {
                                wx.setStorageSync(t, {
                                    value: n,
                                    version: e.VERSION,
                                    expire: Date.now() + 60 * r * 1e3
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
            }, function(e, t, n) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o, r = (o = n(3)) && o.__esModule ? o : {
                    default: o
                };
                t.default = r.default;
            }, function(e, t, n) {
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var r = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                    }
                    return e;
                }, i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                            Object.defineProperty(e, o.key, o);
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t;
                    };
                }(), s = n(0), a = o(n(4)), u = o(n(5)), l = n(6), c = n(1), f = n(7), p = n(8), g = n(9), v = c({}), y = {
                    prefix: "__ZANLOG__",
                    apiBase: "https://tj.youzan.com/v3/weapp/log",
                    enterScene: "",
                    enterPage: "",
                    referPage: "",
                    currentPage: "",
                    bizInfo: "",
                    appId: ""
                }, d = function() {
                    var e = getCurrentPages(), t = e[e.length - 1], n = "", o = t.options || {};
                    for (var r in o) {
                        var i = o[r];
                        n = "" === n ? n + "?" + r + "=" + i : n + "&" + r + "=" + i;
                    }
                    return t.route + n;
                }, h = function() {
                    return wx.getStorageSync(s.log_rurl) || "";
                }, _ = function(e) {
                    wx.setStorageSync(s.log_rurl, e);
                }, m = function() {
                    var e = "";
                    try {
                        e = wx.getStorageSync(s.log_uuid);
                    } catch (e) {
                        console.log(e);
                    }
                    if (!e) {
                        var t = new Date().getTime();
                        e = l.makeRandomString(15) + Date.now(), wx.setStorageSync(s.log_uuid, e), wx.setStorageSync(s.log_ftime, t);
                    }
                    return e;
                }, S = function() {
                    function e(t) {
                        !function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        }(this, e), this.options = p(this.defaultOptions, t), this.rurl = "", this.durl = "", 
                        this.enterTime = "", this.leaveTime = "", this.eventFireTime = "", this.pageEvent = {}, 
                        this.sessionContext = {};
                    }
                    return i(e, [ {
                        key: "_init",
                        value: function() {
                            var e = new Date().getTime(), t = wx.getStorageSync(s.log_seqb), n = wx.getStorageSync(s.log_seqn);
                            wx.getStorageSync(s.log_last_session_time) || wx.setStorageSync(s.log_last_session_time, e), 
                            t || wx.setStorageSync(s.log_seqb, e), n || wx.setStorageSync(s.log_seqn, 1), this.pageEvent = g(this.options.event), 
                            this.sessionContext = g(this.options.context), a.default.add(this.sessionContext), 
                            this._installEnv(), this._installUser(), this._installContext();
                        }
                    }, {
                        key: "setBizInfo",
                        value: function(e) {
                            this.setMoblie(e.mobile), this.setLoginSign(e.userId), this.setShopId(e.kdtId), 
                            y.bizInfo = e || {}, y.appid = e.appid;
                        }
                    }, {
                        key: "_installUser",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                            if (this.options.user) if (e) this.options.user = r({}, this.options.user, e); else {
                                var t = "";
                                try {
                                    this.options.user.uuid = m(), t = wx.getStorageSync(s.log_ftime), this.options.user.ftime = t;
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                            return this;
                        }
                    }, {
                        key: "_installEnv",
                        value: function() {
                            var e = this.options.env;
                            if (e) try {
                                var t = wx.getSystemInfoSync();
                                wx.getNetworkType({
                                    success: function(t) {
                                        e.net = t.networkType;
                                    }
                                });
                                var n = t.system || "", o = n.indexOf(" "), r = n.substr(0, o), i = n.substr(o + 1);
                                e.os = r, e.osv = i, e.mmv = t.version, e.dt = t.model, e.brand = t.brand;
                            } catch (e) {}
                            return this;
                        }
                    }, {
                        key: "_installEvent",
                        value: function(e, t) {
                            var n = {
                                params: {}
                            }, o = new Date().getTime(), r = wx.getStorageSync(s.log_seqb) || "", i = parseInt(wx.getStorageSync(s.log_seqn)), u = wx.getStorageSync(s.log_last_session_time) || "";
                            if (void 0 === (n = p(n, t, e)).ts && (n.ts = o), void 0 === n.durl && (n.durl = this.durl), 
                            void 0 === n.params.rurl && (n.params.rurl = this.rurl), o - u < 18e5) {
                                n.seqb = r, n.seqn = i;
                                var l = i + 1;
                                wx.setStorageSync(s.log_seqn, l);
                            } else n.seqb = o, n.seqn = 1, wx.setStorageSync(s.log_seqn, 1), this.sessionContext = a.default.clear(this.sessionContext);
                            return wx.setStorageSync(s.log_last_session_time, o), n;
                        }
                    }, {
                        key: "_installContext",
                        value: function() {
                            var e = this.sessionContext;
                            try {
                                for (var t = wx.getStorageInfoSync(), n = {}, o = 0; o < t.keys.length; o++) {
                                    var r = t.keys[o];
                                    r.substr(0, s.yztj.length) === s.yztj && (n[r] = v.get(r));
                                }
                                for (var i in e) n["" + s.yztj + i] = e[i];
                                for (var a in n) e[a.substr(s.yztj.length)] = n[a];
                            } catch (e) {}
                            return this;
                        }
                    }, {
                        key: "_updateContext",
                        value: function() {
                            try {
                                for (var e = wx.getStorageInfoSync(), t = {}, n = 0; n < e.keys.length; n++) {
                                    var o = e.keys[n], i = o.substr(s.yztj.length);
                                    if (o.substr(0, s.yztj.length) === s.yztj) {
                                        var a = v.get(o);
                                        t[i] = a;
                                    }
                                }
                                return this.sessionContext = r({}, this.sessionContext, t), this;
                            } catch (e) {}
                        }
                    }, {
                        key: "appShow",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e.path && (y.enterPage = e.path), 
                            e.scene && (y.enterScene = e.scene), this._init(), this.enterAppTime = new Date().getTime();
                            var t = {
                                et: "app_display",
                                ei: "enterapp",
                                ts: this.enterAppTime
                            };
                            this.log(t);
                        }
                    }, {
                        key: "appHide",
                        value: function() {
                            var e = new Date().getTime(), t = {
                                et: "app_display",
                                ei: "leaveapp",
                                params: {
                                    enter_time: this.enterAppTime,
                                    leave_time: e
                                }
                            };
                            this.log(t, function() {});
                        }
                    }, {
                        key: "pageShow",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            this.rurl = h(), this.durl = d(), this.enterTime = new Date().getTime(), f.setADids(e), 
                            v.remove(s.log_rurl);
                            var n = {
                                et: "display",
                                ei: "enterpage",
                                ts: this.enterTime || "",
                                durl: this.durl,
                                params: r({
                                    rurl: this.rurl
                                }, t)
                            };
                            this.options.event && this.options.event.params && (delete this.options.event.params.enter_time, 
                            delete this.options.event.params.leave_time), this.log(n);
                        }
                    }, {
                        key: "pageHide",
                        value: function() {
                            this.leaveTime = new Date().getTime(), this.durl = d(), _(this.durl);
                            var e = {
                                et: "display",
                                ei: "leavepage",
                                params: {
                                    rurl: this.rurl,
                                    enter_time: this.enterTime,
                                    leave_time: this.leaveTime
                                }
                            };
                            this.durl && (e.durl = this.durl), this.log(e);
                        }
                    }, {
                        key: "log",
                        value: function(e, t) {
                            new Date().getTime(), this.onceEvent = this._installEvent(e, this.pageEvent), this._updateContext();
                            var n = {
                                plat: this.options.plat,
                                user: this.options.user,
                                context: this.sessionContext,
                                event: this.onceEvent,
                                env: this.options.env
                            };
                            this.options.event = {}, "leavepage" === this.options.event.ei && (this.pageEvent.params = {}), 
                            this.options.debug && console.log(JSON.stringify(n)), this._doLog(n, t);
                        }
                    }, {
                        key: "_doLog",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = y.apiBase;
                            wx.request({
                                url: n,
                                data: e,
                                method: "post",
                                header: {
                                    "content-type": "text/plain;charset=utf-8"
                                },
                                success: function() {
                                    "function" == typeof t && t();
                                }
                            });
                        }
                    }, {
                        key: "setYouzanAppId",
                        value: function(e) {
                            this._installPlat({
                                yai: e
                            });
                        }
                    }, {
                        key: "setLoginSign",
                        value: function(e) {
                            this._installUser({
                                li: e
                            });
                        }
                    }, {
                        key: "setMoblie",
                        value: function(e) {
                            this._installUser({
                                m: e
                            });
                        }
                    }, {
                        key: "addSessionParams",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                            if (t) for (var n in e) {
                                var o = "" + s.yztj + n;
                                v.set(o, e[n], {
                                    expire: t
                                });
                            } else a.default.add(e);
                        }
                    }, {
                        key: "setShopId",
                        value: function(e) {
                            this.pageEvent.si = e;
                        }
                    }, {
                        key: "setPageName",
                        value: function(e) {
                            this.pageEvent.en = e;
                        }
                    }, {
                        key: "setPageType",
                        value: function(e) {
                            this.pageEvent.pt = e;
                        }
                    }, {
                        key: "setPageParams",
                        value: function(e) {
                            this.pageEvent.params = Object.assign({}, this.pageEvent.params, e);
                        }
                    }, {
                        key: "getGlobal",
                        value: function() {
                            return {
                                plat: this.options.plat,
                                user: this.options.user,
                                context: this.sessionContext,
                                env: this.options.env
                            };
                        }
                    }, {
                        key: "defaultOptions",
                        get: function() {
                            return u.default;
                        }
                    } ]), e;
                }();
                e.exports = S;
            }, function(e, t, n) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o, r = (o = n(1)) && o.__esModule ? o : {
                    default: o
                }, i = n(0), s = (0, r.default)({}), a = {
                    set: function(e) {
                        wx.setStorageSync("yztj_session_keys", JSON.stringify(e));
                    },
                    get: function() {
                        var e = wx.getStorageSync("yztj_session_keys") || "[]";
                        try {
                            e = JSON.parse(e);
                        } catch (e) {}
                        return e;
                    },
                    clear: function(e) {
                        var t = wx.getStorageSync("yztj_session_keys") || "[]";
                        try {
                            t = JSON.parse(t);
                        } catch (e) {}
                        for (var n in t) {
                            var o = t[n], r = o.substr(i.yztj.length) || "";
                            r && delete e[r], s.remove(o);
                        }
                        return wx.setStorageSync("yztj_session_keys", []), e;
                    },
                    add: function(e) {
                        var t = this.get();
                        for (var n in e) {
                            var o = "" + i.yztj + n;
                            t.includes(o) || (t.push(o), s.set(o, e[n], {
                                expire: 60
                            }));
                        }
                        a.set(t);
                    }
                };
                t.default = a;
            }, function(e, t, n) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = {
                    rate: .1,
                    baseUrl: "https://tj.youzanyun.com/v3/js/log",
                    debug: !1,
                    autoClick: !0,
                    autoDisplay: !0,
                    autoSpaDisplay: !0,
                    pageTitle: "",
                    autoSpm: !1,
                    installNeeded: !0,
                    plat: {
                        yai: "wsc_c",
                        st: "weapp",
                        sv: "0.1.5"
                    },
                    user: {
                        uuid: "",
                        ftime: "",
                        li: "",
                        m: ""
                    },
                    env: {},
                    context: {},
                    event: {}
                };
            }, function(e, t, n) {
                e.exports = {
                    makeRandomString: function(e) {
                        var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        e = e || 10;
                        for (var o = 0; o < e; o++) t += n.charAt(Math.floor(Math.random() * n.length));
                        return t;
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
            }, function(t, n, o) {
                function r(e, t, n) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e;
                }
                function i(e) {
                    return e && "object" === (void 0 === e ? "undefined" : s(e)) && !Array.isArray(e);
                }
                var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                    return void 0 === t ? "undefined" : e(t);
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
                };
                t.exports = function e(t) {
                    for (var n = arguments.length, o = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) o[s - 1] = arguments[s];
                    if (!o.length) return t;
                    var a = o.shift();
                    if (i(t) && i(a)) for (var u in a) i(a[u]) ? (t[u] || Object.assign(t, r({}, u, {})), 
                    e(t[u], a[u])) : Object.assign(t, r({}, u, a[u]));
                    return e.apply(void 0, [ t ].concat(o));
                };
            }, function(e, t, n) {
                e.exports = function(e) {
                    return JSON.parse(JSON.stringify(e));
                };
            } ]);
        }, t.exports = r();
    },
    86: function(e, t) {
        e.exports = function() {
            var e = Array.prototype.concat.apply([], arguments);
            return e.filter(function(t, n) {
                return n == e.indexOf(t);
            });
        };
    }
};
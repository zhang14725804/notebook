var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t) {
    function e(n) {
        if (o[n]) return o[n].exports;
        var a = global.installedModules[n] = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("commons.js").modules, t), t = Object.assign(require("vendors.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, n) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var o = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(o, "a", o), o;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 88);
}({
    73: function(e, o, n) {
        (function(e) {
            var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
                return void 0 === e ? "undefined" : t(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
            };
            !function(t) {
                function n(t, e, o, n) {
                    var r = e && e.prototype instanceof i ? e : i, s = Object.create(r.prototype), l = new p(n || []);
                    return s._invoke = function(t, e, o) {
                        var n = k;
                        return function(i, r) {
                            if (n === P) throw new Error("Generator is already running");
                            if (n === O) {
                                if ("throw" === i) throw r;
                                return d();
                            }
                            for (o.method = i, o.arg = r; ;) {
                                var s = o.delegate;
                                if (s) {
                                    var l = u(s, o);
                                    if (l) {
                                        if (l === T) continue;
                                        return l;
                                    }
                                }
                                if ("next" === o.method) o.sent = o._sent = o.arg; else if ("throw" === o.method) {
                                    if (n === k) throw n = O, o.arg;
                                    o.dispatchException(o.arg);
                                } else "return" === o.method && o.abrupt("return", o.arg);
                                n = P;
                                var c = a(t, e, o);
                                if ("normal" === c.type) {
                                    if (n = o.done ? O : x, c.arg === T) continue;
                                    return {
                                        value: c.arg,
                                        done: o.done
                                    };
                                }
                                "throw" === c.type && (n = O, o.method = "throw", o.arg = c.arg);
                            }
                        };
                    }(t, o, l), s;
                }
                function a(t, e, o) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, o)
                        };
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        };
                    }
                }
                function i() {}
                function r() {}
                function s() {}
                function l(t) {
                    [ "next", "throw", "return" ].forEach(function(e) {
                        t[e] = function(t) {
                            return this._invoke(e, t);
                        };
                    });
                }
                function c(t) {
                    var e;
                    this._invoke = function(n, i) {
                        function r() {
                            return new Promise(function(e, r) {
                                !function e(n, i, r, s) {
                                    var l = a(t[n], t, i);
                                    if ("throw" !== l.type) {
                                        var c = l.arg, u = c.value;
                                        return u && "object" === (void 0 === u ? "undefined" : o(u)) && b.call(u, "__await") ? Promise.resolve(u.__await).then(function(t) {
                                            e("next", t, r, s);
                                        }, function(t) {
                                            e("throw", t, r, s);
                                        }) : Promise.resolve(u).then(function(t) {
                                            c.value = t, r(c);
                                        }, s);
                                    }
                                    s(l.arg);
                                }(n, i, e, r);
                            });
                        }
                        return e = e ? e.then(r, r) : r();
                    };
                }
                function u(t, e) {
                    var o = t.iterator[e.method];
                    if (o === y) {
                        if (e.delegate = null, "throw" === e.method) {
                            if (t.iterator.return && (e.method = "return", e.arg = y, u(t, e), "throw" === e.method)) return T;
                            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
                        }
                        return T;
                    }
                    var n = a(o, t.iterator, e.arg);
                    if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, 
                    T;
                    var i = n.arg;
                    return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", 
                    e.arg = y), e.delegate = null, T) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), 
                    e.delegate = null, T);
                }
                function f(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
                    this.tryEntries.push(e);
                }
                function h(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e;
                }
                function p(t) {
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], t.forEach(f, this), this.reset(!0);
                }
                function g(t) {
                    if (t) {
                        var e = t[D];
                        if (e) return e.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1, n = function e() {
                                for (;++o < t.length; ) if (b.call(t, o)) return e.value = t[o], e.done = !1, e;
                                return e.value = y, e.done = !0, e;
                            };
                            return n.next = n;
                        }
                    }
                    return {
                        next: d
                    };
                }
                function d() {
                    return {
                        value: y,
                        done: !0
                    };
                }
                var y, m = Object.prototype, b = m.hasOwnProperty, v = "function" == typeof Symbol ? Symbol : {}, D = v.iterator || "@@iterator", I = v.asyncIterator || "@@asyncIterator", w = v.toStringTag || "@@toStringTag", _ = "object" === o(e), S = t.regeneratorRuntime;
                if (S) _ && (e.exports = S); else {
                    (S = t.regeneratorRuntime = _ ? e.exports : {}).wrap = n;
                    var k = "suspendedStart", x = "suspendedYield", P = "executing", O = "completed", T = {}, E = {};
                    E[D] = function() {
                        return this;
                    };
                    var j = Object.getPrototypeOf, A = j && j(j(g([])));
                    A && A !== m && b.call(A, D) && (E = A);
                    var C = s.prototype = i.prototype = Object.create(E);
                    r.prototype = C.constructor = s, s.constructor = r, s[w] = r.displayName = "GeneratorFunction", 
                    S.isGeneratorFunction = function(t) {
                        var e = "function" == typeof t && t.constructor;
                        return !!e && (e === r || "GeneratorFunction" === (e.displayName || e.name));
                    }, S.mark = function(t) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (t.__proto__ = s, w in t || (t[w] = "GeneratorFunction")), 
                        t.prototype = Object.create(C), t;
                    }, S.awrap = function(t) {
                        return {
                            __await: t
                        };
                    }, l(c.prototype), c.prototype[I] = function() {
                        return this;
                    }, S.AsyncIterator = c, S.async = function(t, e, o, a) {
                        var i = new c(n(t, e, o, a));
                        return S.isGeneratorFunction(e) ? i : i.next().then(function(t) {
                            return t.done ? t.value : i.next();
                        });
                    }, l(C), C[w] = "Generator", C[D] = function() {
                        return this;
                    }, C.toString = function() {
                        return "[object Generator]";
                    }, S.keys = function(t) {
                        var e = [];
                        for (var o in t) e.push(o);
                        return e.reverse(), function o() {
                            for (;e.length; ) {
                                var n = e.pop();
                                if (n in t) return o.value = n, o.done = !1, o;
                            }
                            return o.done = !0, o;
                        };
                    }, S.values = g, p.prototype = {
                        constructor: p,
                        reset: function(t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = y, this.done = !1, this.delegate = null, 
                            this.method = "next", this.arg = y, this.tryEntries.forEach(h), !t) for (var e in this) "t" === e.charAt(0) && b.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = y);
                        },
                        stop: function() {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval;
                        },
                        dispatchException: function(t) {
                            function e(e, n) {
                                return i.type = "throw", i.arg = t, o.next = e, n && (o.method = "next", o.arg = y), 
                                !!n;
                            }
                            if (this.done) throw t;
                            for (var o = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                                var a = this.tryEntries[n], i = a.completion;
                                if ("root" === a.tryLoc) return e("end");
                                if (a.tryLoc <= this.prev) {
                                    var r = b.call(a, "catchLoc"), s = b.call(a, "finallyLoc");
                                    if (r && s) {
                                        if (this.prev < a.catchLoc) return e(a.catchLoc, !0);
                                        if (this.prev < a.finallyLoc) return e(a.finallyLoc);
                                    } else if (r) {
                                        if (this.prev < a.catchLoc) return e(a.catchLoc, !0);
                                    } else {
                                        if (!s) throw new Error("try statement without catch or finally");
                                        if (this.prev < a.finallyLoc) return e(a.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function(t, e) {
                            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                                var n = this.tryEntries[o];
                                if (n.tryLoc <= this.prev && b.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                    var a = n;
                                    break;
                                }
                            }
                            a && ("break" === t || "continue" === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
                            var i = a ? a.completion : {};
                            return i.type = t, i.arg = e, a ? (this.method = "next", this.next = a.finallyLoc, 
                            T) : this.complete(i);
                        },
                        complete: function(t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                            this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                            T;
                        },
                        finish: function(t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var o = this.tryEntries[e];
                                if (o.finallyLoc === t) return this.complete(o.completion, o.afterLoc), h(o), T;
                            }
                        },
                        catch: function(t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var o = this.tryEntries[e];
                                if (o.tryLoc === t) {
                                    var n = o.completion;
                                    if ("throw" === n.type) {
                                        var a = n.arg;
                                        h(o);
                                    }
                                    return a;
                                }
                            }
                            throw new Error("illegal catch attempt");
                        },
                        delegateYield: function(t, e, o) {
                            return this.delegate = {
                                iterator: g(t),
                                resultName: e,
                                nextLoc: o
                            }, "next" === this.method && (this.arg = y), T;
                        }
                    };
                }
            }(function() {
                return this;
            }() || Function("return this")());
        }).call(this, n(72)(e));
    },
    74: function(e, o, n) {
        var a, i, r, s, l = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        };
        Object.keys || (Object.keys = (a = Object.prototype.hasOwnProperty, i = !{
            toString: null
        }.propertyIsEnumerable("toString"), s = (r = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ]).length, 
        function(t) {
            if ("object" !== (void 0 === t ? "undefined" : l(t)) && "function" != typeof t || null === t) throw new TypeError("Object.keys called on non-object");
            var e = [];
            for (var o in t) a.call(t, o) && e.push(o);
            if (i) for (var n = 0; n < s; n++) a.call(t, r[n]) && e.push(r[n]);
            return e;
        }));
    },
    75: function(t, e, o) {
        "function" != typeof Object.assign && (Object.assign = function(t) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            t = Object(t);
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                if (null != o) for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
            }
            return t;
        });
    },
    76: function(t, e, o) {
        Array.prototype.findIndex || (Array.prototype.findIndex = function(t) {
            if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
            if ("function" != typeof t) throw new TypeError("predicate must be a function");
            for (var e, o = Object(this), n = o.length >>> 0, a = arguments[1], i = 0; i < n; i++) if (e = o[i], 
            t.call(a, e, i, o)) return i;
            return -1;
        });
    },
    77: function(t, e, o) {
        Array.prototype.find || (Array.prototype.find = function(t) {
            if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
            if ("function" != typeof t) throw new TypeError("predicate must be a function");
            for (var e, o = Object(this), n = o.length >>> 0, a = arguments[1], i = 0; i < n; i++) if (e = o[i], 
            t.call(a, e, i, o)) return e;
        });
    },
    78: function(t, e, o) {
        o(77), o(76), o(75), o(74);
        var n = o(73);
        global.regeneratorRuntime = n;
    },
    79: function(t, e, o) {
        t.exports = {
            0: "default-theme",
            1: "orange-theme",
            2: "pink-theme",
            3: "red-black-theme",
            4: "gold-theme",
            5: "light-green-theme",
            6: "green-black-theme",
            7: "middle-green-theme",
            8: "blue-theme",
            9: "brown-theme",
            10: "black-white-theme",
            11: "fantasy-theme"
        };
    },
    81: function(t, e, o) {
        function n(t) {
            return function(e) {
                var o, n, i = [];
                o = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = {
                        app: t.appName || "TEST_APP",
                        log_index: t.logIndex || "TEST_LOG_INDEX",
                        level: t.level || "info",
                        tag: '<b style="color: red">' + (t.name || "undefined error name") + ": " + (t.message || "undefined error message") + "</b></br></br>"
                    };
                    return t.detail && (e.detail = JSON.stringify(t.detail)), e;
                }(e), n = function(t, e) {
                    i.push(e + "=" + encodeURIComponent(t));
                }, Object.keys(o).forEach(function(t) {
                    a.hasOwnProperty.call(o, t) && n(o[t], t);
                });
                var r, s, l = i.join("&");
                return (r = t, s = l, new Promise(function(t, e) {
                    wx.request({
                        method: "POST",
                        data: s,
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        url: r,
                        success: t,
                        fail: e
                    });
                })).then(function() {}).catch(function() {});
            };
        }
        var a = Object.prototype, i = "https://probe.youzan.com", r = {};
        r.dispatcher = n(i), r.paasLog = r.log = function(t) {
            this.options = this.options || {};
            var e = {
                plat: this.options.plat,
                user: this.options.user,
                context: this.sessionContext,
                event: this.onceEvent,
                env: this.options.env
            };
            t.detail = t.detail || {}, t.detail.local = e, "function" == typeof r.dispatcher && r.dispatcher({
                level: t.alert,
                appName: t.appName || r.appName,
                logIndex: t.logIndex || r.logIndex,
                name: t.name || "error_type",
                message: t.message || "error_message",
                detail: t.detail
            });
        }, r.config = function(t) {
            var e = t || {}, o = e.reportUrl || i;
            r.appName = e.appName, r.logIndex = e.logIndex, r.dispatcher = n(o);
        }, t.exports = r;
    },
    82: function(t, e, o) {
        var n = o(81), a = o(80).default;
        n.config({
            appName: "wsc",
            logIndex: "wsc_weapp_log"
        }), a.prototype.reportor = n.log, t.exports = a;
    },
    83: function(t, e, o) {
        function n() {}
        var a = o(16), i = o(53), r = o(52), s = {
            config: {},
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: n,
            fail: n,
            complete: n
        };
        t.exports = function(t) {
            return function(e) {
                e = a({}, s, e);
                var o = function() {
                    var o = function(t) {
                        console.error("[carmen:fail]", e.api, t), e.fail(t);
                    }, n = {
                        access_token: t.getAccessToken()
                    }, s = {
                        urlData: {
                            origin: "carmen",
                            pathname: "/api/oauthentry/" + e.api,
                            query: a(n, e.query),
                            config: e.config
                        },
                        method: e.method,
                        data: e.data,
                        header: e.header
                    };
                    console.info("[carmen:request]", e.api), i(t, s).then(function(n) {
                        if (n.response) console.info("[carmen:success]", n.response), a = n.response, console.info("[carmen:success]", e.api, a), 
                        e.success(a); else try {
                            if (40010 === n.error_response.code) return console.info("[carmen:40010] AccessToken不存在或已过期, 正在重新登录..."), 
                            t.globalData.hasToken = !1, t.carmen(e), void t.login();
                            n.error_response && n.error_response.code > 1e3 ? r.requestError({
                                message: e.api + " has a bad response",
                                request: {
                                    options: s
                                }
                            }) : r.requestError({
                                alert: "warn",
                                message: e.api + " has a bad response",
                                request: {
                                    options: s
                                }
                            }), o({
                                type: "yz:carmen",
                                msg: n.error_response.msg,
                                code: n.error_response.code
                            });
                        } catch (t) {
                            r.appError({
                                alert: "warn",
                                message: e.api + " try auto call app.login fail",
                                response: n,
                                error: t,
                                request: {
                                    options: s
                                }
                            }), o({
                                type: "yz:carmen",
                                msg: "服务器错误",
                                code: -99999
                            });
                        }
                        var a;
                    }).catch(function(t) {
                        console.log("carmen failed", t, t.message), r.requestError({
                            alert: "warn",
                            response: t,
                            message: e.api + " invoke fail",
                            request: {
                                options: s
                            }
                        }), o({
                            res: t,
                            type: "wx:request",
                            msg: t.errMsg,
                            code: -1
                        });
                    }).then(function() {
                        return e.complete();
                    });
                };
                return t.globalData.hasToken && t.globalData.fetchedShop ? o() : t.globalData.hasToken && e.config && e.config.skipShopInfo ? o() : !t.globalData.hasToken && e.config && e.config.skipShopInfo ? t.once("app:token:success", o) : (t.once("app:fetchshopinfo:success", o), 
                void t.once("app:fetchshopinfo:fail", o));
            };
        };
    },
    84: function(t, e, o) {
        var n = {}, a = 1;
        t.exports = {
            set: function(t) {
                var e = "db_" + a++;
                return n[e] = t, e;
            },
            get: function(t) {
                var e = n[t];
                return delete n[t], e;
            }
        };
    },
    85: function(t, e, o) {
        t.exports = {
            subPackages: [ {
                root: "packages/ump",
                name: "营销插件",
                pages: [ "fission/index", "integral-store/index", "integral-store/coupon/index", "pintuan/detail/index", "pintuan/playingInstruction/playingInstruction" ]
            }, {
                root: "packages/card",
                name: "会员卡",
                pages: [ "list/index", "detail/index", "active/index", "setting/index", "level/index", "result/index" ]
            }, {
                root: "packages/paidcontent",
                name: "知识付费",
                pages: [ "column/index", "content/index", "list/index", "pay/index", "write-comment/index" ]
            } ]
        };
    },
    87: function(e, o, n) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i() {}
        function r(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = !1;
            return (g.subPackages || []).forEach(function(n) {
                (t = t.replace("pages", "packages")).match("membercard") && (t = t.replace("membercard", "card")), 
                t.match(n.root) && (wx.redirectTo({
                    url: y.add("/" === t.split(0, 1) ? t : "/" + t, e)
                }), o = !0);
            }), o;
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var o = [], n = !0, a = !1, i = void 0;
                try {
                    for (var r, s = t[Symbol.iterator](); !(n = (r = s.next()).done) && (o.push(r.value), 
                    !e || o.length !== e); n = !0) ;
                } catch (t) {
                    a = !0, i = t;
                } finally {
                    try {
                        !n && s.return && s.return();
                    } finally {
                        if (a) throw i;
                    }
                }
                return o;
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, l = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, c = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
            }
            return t;
        }, u = a(n(86)), f = n(0), h = a(n(40)), p = a(n(39)), g = n(85), d = n(55), y = n(9), m = n(84), b = n(38), v = n(83), D = n(10), I = n(68), w = n(4), _ = n(82), S = n(79);
        n(78);
        var k = {}, x = {}, P = [ "is_share", "dc_ps", "banner_id", "from_source", "from_params" ], O = p.default.common.yzLogo;
        wx.onPageNotFound && wx.onPageNotFound(function(t) {
            var e = t.path, o = t.query;
            o && (e += "?" + o), r(e) || wx.redirectTo({
                url: "/pages/home/dashboard/index"
            });
        }), o.default = (0, f.extendApp)(d, {
            globalData: {
                isYouzanApp: !1,
                kdtId: 0,
                hasKdtId: !1,
                systemInfo: null,
                userInfo: null,
                userInfoDeny: !1,
                token: {},
                shopInfo: {},
                hasToken: !1,
                copyright: {
                    logo: O,
                    isCustomized: !1
                },
                localDeliverySetting: {},
                logisticsSetting: {},
                serviceRegistry: {},
                is_big_shop: null,
                imData: null,
                shopSetting: null,
                _shopConfigData: null
            },
            checkPathMayExist: r,
            logger: {},
            onLaunch: function(t) {
                var e = this;
                k = this.getExtConfig(), this.globalData.isYouzanApp && (k.themeType = 0), this.themeClass = S[k.themeType || 0], 
                this.isFantasy = "fantasy-theme" === this.themeClass;
                var o = this.getSystemInfoSync().model;
                /iphone x/i.test(o) && (this.deviceType = "iPhone-X"), this.db = m, this.carmen = v(this), 
                this.storage = I(this), this.request = D(this), this.trigger("launch", t), this.on("page:chooseoffline:finish", function(t, o) {
                    t.image = Array.isArray(t.image) ? t.image[0] : t.image;
                    var n = e.globalData.shopInfo || {};
                    e.setShopInfo({
                        store: t,
                        offlineId: t.id || n.offlineId || ""
                    }, o);
                }), this.on("update:youzan:kdtId", function(t) {
                    e.globalData.isYouzanApp && e.updateKdtId(t);
                }), x = t, this.setLogger(x);
            },
            onShow: function(t) {
                this._initKdtId(t), h.default.initSpm(t.path), 1089 === t.scene && delete t.query.offlineId, 
                this.trigger("show", t), w.app.show(t, {
                    biz: "wsc"
                }), this.setLogBizInfo(), this.checkQuery(t.query), t.path && /pages\/common\/blank-page/.test(t.path) || this.checkSession();
            },
            setLogger: function(t) {
                var e = {
                    yai: "wsc_c"
                };
                this.globalData.isYouzanApp && (e.yai = "youzan");
                var o = wx.getExtConfigSync ? wx.getExtConfigSync() : {}, n = {
                    plat: e,
                    user: {},
                    event: {
                        si: this.getKdtId() || ""
                    },
                    context: {
                        weapp_version: o.userVersion
                    }
                };
                this.logger = new _(n);
                var a = t.query || {}, i = Object.keys(a).filter(function(t) {
                    return P.indexOf(t) >= 0;
                });
                i.length && this.logger.addSessionParams(Object.assign({}, n.context, i.reduce(function(t, e) {
                    return t[e] = a[e], "dc_ps" === e && (t.dc_ps_utime = parseInt(Date.now() / 1e3, 10)), 
                    t;
                }, {})), 120), this.logger.addSessionParams({
                    appId: this.getAppId(),
                    scene: t.scene
                }, 5256e3);
            },
            setLogBizInfo: function() {
                var t = {};
                t.biz = this.globalData.isYouzanApp ? "youzan" : "wsc", this.getAppId() && (t.appId = this.getAppId()), 
                this.getKdtId() && (t.kdtId = this.getKdtId()), this.getMobile() && (t.mobile = this.getMobile()), 
                this.getBuyerId() && (t.buyerId = this.getBuyerId()), this.getAccessToken() && (t.token = this.getAccessToken()), 
                this.globalData.token && this.globalData.token.openId && (t.openId = this.globalData.token.openId), 
                this.globalData.token && this.globalData.token.userId && (t.userId = this.globalData.token.userId), 
                w.setBizInfo(t), console.log("setLogBizInfo"), "function" == typeof this.logger.setBizInfo && this.logger.setBizInfo(t), 
                "function" == typeof this.logger.setPageParams && this.logger.setPageParams({
                    buyerId: t.buyerId
                });
            },
            checkSession: function(t) {
                var e = this;
                console.info("[app:wx:checkSession]");
                var o = this.storage.get("app:token");
                wx.checkSession({
                    success: function(n) {
                        console.info("[app:wx:checkSession:success]", n), o && o.accessToken ? e.tokenSuccess() : (console.info("[app:token:not:exist]"), 
                        e.login(t));
                    },
                    fail: function(o) {
                        console.info("[app:wx:checkSession:fail]", o), e.login(t);
                    }
                });
            },
            tokenSuccess: function() {
                var t = this;
                if (console.info("[app:token:success]"), this.globalData.token = this.storage.get("app:token"), 
                this.globalData.hasToken = !0, !this.globalData.hasKdtId) try {
                    var e = wx.getStorageSync("app:kdt_id").current || this.globalData.token.kdtId;
                    e && this.updateKdtId(e);
                } catch (t) {
                    this.globalData.hasKdtId = !1;
                }
                setTimeout(function() {
                    t.trigger("app:token:success", t.globalData.token);
                }, 10), this.logger.appShow(x, {
                    biz: "wsc_c"
                }), this.setLogBizInfo();
            },
            tokenFail: function(t) {
                var e = this;
                console.info("[app:token:fail]"), this.globalData.hasToken = !1, this.globalData.hasKdtId = !1, 
                setTimeout(function() {
                    e.trigger("app:token:fail", t);
                }, 10);
            },
            login: function(t) {
                var e = this;
                console.info("[app:wx:login]"), wx.login({
                    success: function(o) {
                        console.info("[app:wx:login:success]", o), e.fetchToken(o.code, t);
                    },
                    fail: function(o) {
                        console.info("[app:wx:login:fail]", o), e.tokenFail(), e.onError({
                            name: "login-fail-error",
                            message: "wx-login-fail",
                            detail: {
                                error: o
                            }
                        }), t && t();
                    }
                });
            },
            fetchToken: function(t, e) {
                var o = this;
                console.info("[app:fetchToken]"), this.getAppId() && wx.request({
                    url: b({
                        origin: "uic",
                        pathname: "/sso/wx/getThirdAuthSessionKey"
                    }),
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        code: t,
                        appId: this.getAppId(),
                        clientId: this.globalData.clientId,
                        clientSecret: this.globalData.clientSecret,
                        grantType: "yz_union"
                    },
                    success: function(t) {
                        console.info("[app:fetchToken:success]", t);
                        var e = +t.data.code;
                        if (0 === e) {
                            var n = t.data.data;
                            o.globalData.fans_type = n.fans_type, o.storage.set("app:token", {
                                accessToken: n.access_token,
                                refreshToken: n.refresh_token,
                                userId: n.user_id,
                                openId: n.open_id,
                                mobile: n.mobile,
                                buyerId: n.buyer_id,
                                session_id: n.session_id
                            }, {
                                expire: 5
                            }), o.globalData.isYouzanApp || o.updateKdtId(n.kdt_id), o.tokenSuccess();
                        } else 135000025 === e ? (setTimeout(function() {
                            o.login();
                        }, 100), o.onError({
                            name: "login-fail-error",
                            message: "fetch-token-timeout",
                            detail: {
                                response: t
                            }
                        })) : (o.onError({
                            name: "login-fail-error",
                            message: "fetch-token-fail",
                            detail: {
                                response: t
                            }
                        }), o.tokenFail(t.data));
                    },
                    fail: function(t) {
                        o.onError({
                            name: "login-fail-error",
                            message: "wx-request-fail",
                            detail: {
                                error: t
                            }
                        }), console.info("[app:fetchToken:fail]", t), o.tokenFail({
                            msg: t.errMsg,
                            code: -1
                        });
                    },
                    complete: function() {
                        e && e();
                    }
                });
            },
            checkQuery: function(t) {
                t.offlineId && this.setShopInfo({
                    offlineId: t.offlineId
                });
            },
            fetchInitData: function() {
                var t = this;
                return this.initFetchPromise || (this.initFetchPromise = this.request({
                    path: "wscshop/weapp/init.json",
                    config: {
                        skipShopInfo: !0
                    }
                }).then(function(e) {
                    return t.initFetchPromise = null, t.__resolveMultiStoreConfig(e.offline_data), t.__resolveShopInfoData(e.shop_info || {}), 
                    t.__resolveCopyrightData(e.copyright_data), t.__resolveShopNavData(e.shop_nav_data || {}), 
                    t.__resolveShopConfigData(e.mall_shop_config_data), t.__resolveImBusinessData(e.business_data), 
                    t.__resolveHiddenPowerByData(e.is_hide_power_by), t.trigger("app:fetchshopbase:success"), 
                    e;
                }).catch(function(e) {
                    return console.log(e), t.initFetchPromise = null, t.trigger("app:fetchshopbase:fail"), 
                    Promise.reject(e);
                })), this.initFetchPromise;
            },
            fetchShopInfo: function() {
                var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.__fetchingOfflineInfo || (this.globalData.fetchedShop = !1, this.__fetchingOfflineInfo = !0, 
                this.request({
                    path: "wscshop/weapp/store_id.json",
                    data: e,
                    config: {
                        skipShopInfo: !0
                    }
                }).then(function(e) {
                    t.__resolveMultiStoreConfig(e);
                }).catch(function() {
                    t.__resolveMultiStoreConfig();
                }).then(function() {
                    t.__fetchingOfflineInfo = !1;
                }));
            },
            __resolveImBusinessData: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!(t.status < 0)) {
                    var e = {
                        businessId: t.business_id,
                        hasImData: !0
                    };
                    this.globalData.imData = e, this.trigger("app:im:success");
                }
            },
            __resolveShopConfigData: function(t) {
                this.globalData._shopConfigData = t, this.trigger("app:shopconfig:success", t);
            },
            __resolveHiddenPowerByData: function(t) {
                this.globalData.is_big_shop = t;
                var e = {
                    is_big_shop: t
                };
                this.globalData.bigShopData = e, this.trigger("app:power:success", e);
            },
            __resolveShopNavData: function() {
                var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).data;
                this.globalData.nav = t.list || [], this.globalData.allNavData = t, this.trigger("app:nav:success", t);
            },
            __resolveCopyrightData: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.is_logo_customized || 0, o = {
                    logo: e && t.customized_logo || O,
                    isCustomized: e
                };
                this.globalData.copyright = o, this.trigger("app:copyright:success", o);
            },
            __resolveShopInfoData: function(t) {
                t.hasBase = !0, t.base = Object.assign({}, t), t.isServiceDue = t.service && "WEAPP_AVAILABLE" !== t.service.status, 
                this.setShopInfo(t);
            },
            __resolveMultiStoreConfig: function(t) {
                var e = this;
                if (this.globalData.fetchedShop = !0, !t) return this.trigger("app:fetchshopinfo:fail"), 
                void this.trigger("app:fetchedshopinfo");
                var o = t.auto_entry_store, n = t.is_multi_store, a = t.offline_id, i = t.sold_out_recommend, r = {}, s = (this.storage.get("shop:info:kdi_id_" + this.getKdtId()) || {}).offlineId;
                r.isMultiStore = n, r.soldOutRecommend = i, r.offlineId = s || a, r.autoEntryStore = o, 
                this.setShopInfo(r, function() {
                    r.isMultiStore && !e.globalData.shopInfo.offlineId && e.trigger("app:init:nostoreid");
                }), this.trigger("app:fetchshopinfo:success"), this.trigger("app:fetchedshopinfo");
            },
            setShopInfo: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], o = this.globalData.shopInfo || {};
                return this.globalData.shopInfo = Object.assign({}, o, t), this.storage.set("shop:info:kdi_id_" + this.getKdtId(), this.globalData.shopInfo), 
                this.trigger("app:shop:set:finish"), t.offlineId && o && +t.offlineId != +o.offlineId ? (this.globalData.shopInfo.isMultiStore && this.saveOfflineId(), 
                this.__doingSwitchStore = !1, this.trigger("app:offlineId:change", e)) : e && e(), 
                this.globalData.shopInfo;
            },
            saveOfflineId: function() {
                var t = this;
                setTimeout(function() {
                    t.carmen({
                        api: "weapp.multistore.offline/1.0.0/setlastvisitstoreid"
                    });
                }, 1e3);
            },
            getShopInfo: function() {
                var t = this;
                return new Promise(function(e) {
                    if (t.globalData.shopInfo && t.globalData.shopInfo.hasBase) return e(t.globalData.shopInfo);
                    t.once("app:fetchshopbase:success", function() {
                        e(t.globalData.shopInfo);
                    });
                });
            },
            getStore: function() {
                var t = this;
                return new Promise(function(e, o) {
                    t.carmen({
                        api: "weapp.multistore.offline/1.0.0/get",
                        query: {
                            id: t.getOfflineId()
                        },
                        success: function(t) {
                            if (t.image = Array.isArray(t.image) ? t.image[0] : t.image, Array.isArray(t)) return wx.navigateTo({
                                url: "/packages/shop/multi-store/index/index"
                            });
                            e(t);
                        },
                        fail: o
                    });
                });
            },
            getShopCert: function(t) {
                this.globalData.shopCert ? t(this.globalData.shopCert) : this.fetchShopCert(t);
            },
            fetchShopCert: function(t) {
                var e = this;
                this.carmen({
                    api: "weapp.wsc.shop.cert/1.0.0/get",
                    success: function(o) {
                        var n = [];
                        switch (+o.group_cert_type) {
                          case 2:
                            n.push("企业认证");
                            break;

                          case 3:
                          case 4:
                            n.push("个人认证");
                        }
                        1 == o.team_certification && n.push("店铺认证"), 1 == o.is_secured_transactions && n.push("担保交易"), 
                        1 == o.team_physical && n.push("线下门店"), e.globalData.shopCert = n, t && t(n);
                    }
                });
            },
            getShopStatus: function(t) {
                this.globalData.shopStatus ? t(this.globalData.shopStatus) : this.fetchShopStatus(t);
            },
            fetchShopStatus: function(t) {
                var e = this;
                this.carmen({
                    api: "weapp.wsc.shop.status/1.0.0/get",
                    success: function(o) {
                        e.globalData.shopStatus = o, t(o);
                    }
                });
            },
            getHiddenPowerBy: function() {
                var t = this;
                return new Promise(function(e) {
                    var o = t.globalData.bigShopData;
                    if (o) return e(o);
                    t.once("app:power:success", function() {
                        e(t.globalData.bigShopData);
                    });
                });
            },
            getKdtId: function() {
                return this.globalData.hasKdtId ? this.globalData.kdtId : null;
            },
            updateKdtId: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                if (t = +t) {
                    var e = this.globalData.kdtId;
                    try {
                        this.globalData.hasKdtId = !0, this.globalData.kdtId = t;
                        var o = (wx.getStorageSync("app:kdt_id") || {}).history || [];
                        o.unshift(t), wx.setStorage({
                            key: "app:kdt_id",
                            data: {
                                current: t,
                                history: (0, u.default)(o)
                            }
                        });
                    } catch (t) {
                        console.error(t);
                    }
                    this.trigger("app:kdt_id:success", t), t == e && this.globalData.isYouzanApp || (this.logger && this.logger.setShopId && this.logger.setShopId(t), 
                    this.updateShopBaseData());
                }
            },
            updateShopBaseData: function() {
                this.globalData.hasKdtId && (this.globalData.shopInfo = {}, this.globalData.allNavData = null, 
                this.globalData.bigShopData = null, this.globalData.copyright = null, this.globalData.imData = null, 
                this.globalData._shopConfigData = null, this.fetchInitData());
            },
            getBuyerId: function() {
                return this.globalData.hasToken ? this.globalData.token.buyerId : null;
            },
            getMobile: function() {
                return this.globalData.hasToken ? this.globalData.token.mobile : null;
            },
            getExtConfig: function() {
                return wx.getExtConfigSync ? wx.getExtConfigSync() : {};
            },
            getAppId: function() {
                return this.globalData.isYouzanApp ? "wxff6f4f8dbe360cba" : (k.appId || (k = this.getExtConfig()), 
                k.appId || "");
            },
            getShopConfigData: function() {
                var t = this;
                return new Promise(function(e) {
                    if (t.globalData._shopConfigData) return e(t.globalData._shopConfigData);
                    t.once("app:shopconfig:success", function() {
                        e(t.globalData._shopConfigData);
                    });
                });
            },
            getVersion: function() {
                return k.userVersion || (k = this.getExtConfig()), k.userVersion || "";
            },
            getOfflineId: function() {
                return this.globalData.shopInfo ? this.globalData.shopInfo.offlineId || "" : null;
            },
            getFansType: function() {
                return this.globalData.fans_type || 1343;
            },
            getAccessToken: function() {
                return this.globalData.hasToken ? this.globalData.token.accessToken : null;
            },
            getSessionId: function() {
                return this.globalData.hasToken ? this.globalData.token.session_id : null;
            },
            getPoints: function() {
                var t = this;
                return new Promise(function(e, o) {
                    t.request({
                        path: "wscump/integral/user_points.json",
                        success: e,
                        fail: o
                    }).then(function(e) {
                        var o = t.globalData.userInfo || {};
                        return t.globalData.userInfo = c({}, o, {
                            pointsInfo: e
                        }), e;
                    });
                });
            },
            getUserInfo: function(t, e) {
                var o = this, n = this.globalData.userInfo;
                if (t = t || i, e = e || i, n) return t(n);
                wx.getUserInfo({
                    success: function(e) {
                        o.globalData.userInfo = e, t(e);
                    },
                    fail: function(t) {
                        "getUserInfo:fail auth deny" == t.errMsg && (o.globalData.userInfoDeny = !0), e(t);
                    }
                });
            },
            getSystemInfoSync: function() {
                return this.globalData.systemInfo || (this.globalData.systemInfo = wx.getSystemInfoSync()), 
                this.globalData.systemInfo;
            },
            isSwitchTab: function(t) {
                var e = this, o = getCurrentPages() || [ {} ], n = t && "/" === t.slice(0, 1) ? t.slice(1) : o[o.length - 1].route;
                return new Promise(function(t) {
                    if (e.globalData.isYouzanApp) return t(!1);
                    e.getNavConfig().then(function(e) {
                        var o = e.list, a = (void 0 === o ? [] : o).filter(function(t) {
                            return t.page_path === n;
                        }).length > 0;
                        t(a);
                    });
                });
            },
            fetchAreaMapData: function(t, e) {
                var o = this, n = this.storage.get("trade:address:area-map");
                if (n) return t && t(n);
                this.carmen({
                    api: "kdt.address.map/1.0.0/get",
                    success: function(e) {
                        var n = e.data || [], a = {};
                        a.province = n[0].Province, a.city = n[1].Citys, a.county = n[2].County, o.storage.set("trade:address:area-map", a), 
                        t && t(a);
                    },
                    fail: function(t) {
                        e && e(t.msg);
                    }
                });
            },
            getCopyright: function() {
                var t = this;
                return new Promise(function(e) {
                    var o = t.globalData.copyright;
                    if (o) return e(o);
                    t.once("app:copyright:success", function() {
                        e(t.globalData.copyright);
                    });
                });
            },
            getNavConfig: function() {
                var t = this;
                return new Promise(function(e) {
                    t.globalData.allNavData ? e(t.globalData.allNavData) : t.once("app:nav:success", function() {
                        e(t.globalData.allNavData);
                    });
                });
            },
            getLocalDelivery: function() {
                var t = this;
                return new Promise(function(e) {
                    if (t.globalData.localDeliverySetting.timeSpan) e(t.globalData.localDeliverySetting); else {
                        var o = {};
                        (t.globalData.shopInfo || {}).isMultiStore && (o.offline_id = t.getOfflineId()), 
                        t.carmen({
                            api: "logistics.weapp.wsc.local.multiple/1.0.0/get",
                            query: o,
                            success: function(o) {
                                t.globalData.localDeliverySetting = o || {}, e(t.globalData.localDeliverySetting);
                            },
                            fail: function() {
                                e(t.globalData.localDeliverySetting);
                            }
                        });
                    }
                });
            },
            getLogisticsSetting: function() {
                var t = this;
                return new Promise(function(e) {
                    t.globalData.logisticsSetting.kdtId ? e(t.globalData.logisticsSetting) : t.carmen({
                        api: "youzan.webapp.wsc.logistics.setting/3.0.0/get",
                        success: function(o) {
                            t.globalData.logisticsSetting = o || {}, e(t.globalData.logisticsSetting);
                        },
                        fail: function() {
                            e(t.globalData.logisticsSetting);
                        }
                    });
                });
            },
            getImBusinessData: function() {
                var t = this;
                return new Promise(function(e) {
                    if (t.globalData.imData && t.globalData.imData.hasImData) return e(t.globalData.imData);
                    t.once("app:im:success", function() {
                        e(t.globalData.imData);
                    });
                });
            },
            getShopSetting: function() {
                var t = this;
                return new Promise(function(e) {
                    var o = t.globalData.shopSetting || {};
                    if (o.hasSetting) return e(o);
                    t.carmen({
                        api: "wsc.shop.setting/1.0.0/get",
                        success: function(o) {
                            t.globalData.shopSetting = c({
                                hasSetting: !0
                            }, o), e(t.globalData.shopSetting);
                        }
                    });
                });
            },
            onHide: function() {
                h.default.removePageSpm(), this.globalData.shopCert = null, this.globalData.shopStatus = null, 
                "object" === l(this.logger) && "function" == typeof this.logger.appHide && this.logger.appHide(), 
                this.trigger("hide");
            },
            updateYouzanUserInfo: function(t) {
                if (t) {
                    var e = t.nickName, o = t.gender, n = t.avatarUrl, a = this.globalData.token.session_id;
                    wx.request({
                        url: b({
                            origin: "uic",
                            pathname: "/sso/wx/updateUserInfo"
                        }),
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: {
                            sessionId: a,
                            nickName: e,
                            gender: o,
                            avatarUrl: n
                        },
                        success: function() {
                            console.log("success");
                        }
                    });
                }
            },
            _initKdtId: function(t) {
                if (this.globalData.isYouzanApp) {
                    var e = t.query || {};
                    e.kdt_id && this.updateKdtId(e.kdt_id);
                }
            },
            getImData: function() {
                var t = this, e = [ this.getShopSetting() ];
                return this.globalData.isYouzanApp && e.push(this.getImBusinessData()), Promise.all(e).then(function(e) {
                    var o = s(e, 2), n = o[0], a = o[1], i = void 0 === a ? {} : a, r = {};
                    return r.isSetContact = n.isWebIMAvailable, t.globalData.isYouzanApp && (r.businessId = i.businessId, 
                    r.isSetContact = r.isSetContact && i.businessId), Object.assign({}, n, r);
                });
            },
            onError: function(t) {
                t = "string" == typeof t ? {
                    message: t
                } : t;
                try {
                    this.logger && this.logger.reportor && this.logger.reportor(Object.assign({
                        name: "app-error"
                    }, t));
                } catch (t) {
                    console.log(t), console.log("上报数据如果出错了，就不要重复上报了");
                }
            }
        });
    },
    88: function(t, e, o) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var a = n(o(87)), i = n(o(39)).default.weapp_youzan, r = Object.assign({}, a.default), s = a.default.globalData || {};
        s.isYouzanApp = !0, s.clientId = i.clientId, s.clientSecret = i.clientSecret, r.globalData = s, 
        App(r);
    }
});
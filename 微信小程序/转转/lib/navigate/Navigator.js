function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(a, o) {
                try {
                    var i = r[a](o), c = i.value;
                } catch (e) {
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(c).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(c);
            }
            return n("next");
        });
    };
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _applyDecoratedDescriptor(e, r, t, n, a) {
    var o = {};
    return Object.keys(n).forEach(function(e) {
        o[e] = n[e];
    }), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ("value" in o || o.initializer) && (o.writable = !0), 
    o = t.slice().reverse().reduce(function(t, n) {
        return n(e, r, t) || t;
    }, o), a && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(a) : void 0, 
    o.initializer = void 0), void 0 === o.initializer && (Object.defineProperty(e, r, o), 
    o = null), o;
}

function promiseNav(e, r) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n = t.dealFail, a = void 0 !== n && n;
    return new Promise(function(t, n) {
        wx[e](Object.assign({}, r, {
            success: function(e) {
                "function" == typeof r.success && r.success(e), t(e);
            },
            fail: function(e) {
                "function" == typeof r.fail && r.fail(e), a ? t(e) : n(e);
            }
        }));
    });
}

function delay(e) {
    return new Promise(function(r, t) {
        setTimeout(r, e);
    });
}

function appendUrlParam(e, r) {
    if (!r) return e;
    var t = e.split("?"), n = _slicedToArray(t, 2), a = n[0], o = n[1], i = void 0 === o ? "" : o, c = {};
    i.split("&").forEach(function(e) {
        var r = e.split("="), t = _slicedToArray(r, 2), n = t[0], a = t[1];
        n && void 0 !== a && (c[n] = a);
    });
    var s = Object.assign({}, c, r), u = [];
    for (var l in s) u.push(l + "=" + s[l]);
    return u.length > 0 ? a + "?" + u.join("&") : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _slicedToArray = function() {
    function e(e, r) {
        var t = [], n = !0, a = !1, o = void 0;
        try {
            for (var i, c = e[Symbol.iterator](); !(n = (i = c.next()).done) && (t.push(i.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !n && c.return && c.return();
            } finally {
                if (a) throw o;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), _dec, _dec2, _desc, _value, _class, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _History = require("./History.js"), _History2 = _interopRequireDefault(_History), _noConcurrent = require("./../decorator/noConcurrent.js"), _debugKit = require("./../debugKit.js"), MAX_LEVEL = 10, NAV_BUSY_REMAIN = 300, globalStore = {
    env: {
        os: "ios"
    }
};

wx.getSystemInfo({
    success: function(e) {
        globalStore.env.os = e.system.toLowerCase().includes("ios") ? "ios" : "android";
    }
});

var Navigator = (_dec = (0, _noConcurrent.makeMutex)({
    namespace: globalStore,
    mutexId: "navigate"
}), _dec2 = (0, _noConcurrent.makeMutex)({
    namespace: globalStore,
    mutexId: "navigate"
}), _class = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "install",
        value: function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(e._config, r);
            var t = _wepy2.default.page.prototype.onUnload;
            _wepy2.default.page.prototype.onUnload = function() {
                t && t.apply(this, arguments), e.onPageUnload();
            };
        }
    }, {
        key: "navigateTo",
        value: function() {
            function r(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r(t) {
                var n;
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        if (_debugKit.ctxDependConsole.log("[Navigator] navigateTo:", t), e._history.open({
                            url: t.url
                        }), n = getCurrentPages(), !(n.length < MAX_LEVEL - 1)) {
                            r.next = 8;
                            break;
                        }
                        return r.next = 6, e._secretOpen(t);

                      case 6:
                        r.next = 19;
                        break;

                      case 8:
                        if (n.length != MAX_LEVEL - 1) {
                            r.next = 17;
                            break;
                        }
                        return _debugKit.ctxDependConsole.log("[Navigator] replace with curtain", "time:", Date.now(), "getCurrentPages:", getCurrentPages()), 
                        r.next = 12, e._secretReplace({
                            url: e._config.curtainPage
                        });

                      case 12:
                        return _debugKit.ctxDependConsole.log("[Navigator] open from curtain", "time:", Date.now(), "getCurrentPages:", getCurrentPages()), 
                        r.next = 15, e._secretOpen(t);

                      case 15:
                        r.next = 19;
                        break;

                      case 17:
                        return r.next = 19, e._secretReplace(t);

                      case 19:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "redirectTo",
        value: function() {
            function r(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r(t) {
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return _debugKit.ctxDependConsole.log("[Navigator] redirectTo:", t), e._history.replace({
                            url: t.url
                        }), r.next = 4, e._secretReplace(t);

                      case 4:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "navigateBack",
        value: function() {
            function r() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    delta: 1
                };
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return _debugKit.ctxDependConsole.log("[Navigator] navigateBack:", t), r.next = 3, 
                        e._doBack(t, {
                            sysBack: !1
                        });

                      case 3:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "onPageUnload",
        value: function() {
            if (e._activeUnload) return void (e._activeUnload = !1);
            _debugKit.ctxDependConsole.log("[Navigator] sysBack"), e._doBack({
                delta: 1
            }, {
                sysBack: !0
            });
        }
    }, {
        key: "_doBack",
        value: function() {
            function r(e, r) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r(t, n) {
                var a, o, i = n.sysBack;
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        if (a = e._history.back(t), o = getCurrentPages().length - (i ? 1 : 0), _debugKit.ctxDependConsole.log("[Navigator] doBack, hisLength:", e._history.length, "curLen:", o, "targetRoute:", a), 
                        !(e._history.length < o)) {
                            r.next = 11;
                            break;
                        }
                        return r.next = 6, e._secretBack({
                            delta: o - e._history.length
                        });

                      case 6:
                        if (!a.tainted && e._history.length != MAX_LEVEL - 1) {
                            r.next = 9;
                            break;
                        }
                        return r.next = 9, e._secretReplace(a, {
                            extraParams: {
                                _forcedRefresh: !0
                            }
                        });

                      case 9:
                        r.next = 19;
                        break;

                      case 11:
                        if (e._history.length !== o) {
                            r.next = 17;
                            break;
                        }
                        if (i && o != MAX_LEVEL - 1 && !a.tainted) {
                            r.next = 15;
                            break;
                        }
                        return r.next = 15, e._secretReplace(a, {
                            extraParams: {
                                _forcedRefresh: !0
                            }
                        });

                      case 15:
                        r.next = 19;
                        break;

                      case 17:
                        return r.next = 19, i ? e._secretOpen(a, {
                            extraParams: {
                                _forcedRefresh: !0
                            }
                        }) : e._secretReplace(a, {
                            extraParams: {
                                _forcedRefresh: !0
                            }
                        });

                      case 19:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "_secretOpen",
        value: function() {
            function r(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r(t) {
                var n, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = a.retryAfter, i = void 0 === o ? NAV_BUSY_REMAIN : o, c = a.retryTimeout, s = void 0 === c ? 2e3 : c, u = a.extraParams, l = void 0 === u ? null : u;
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return _debugKit.ctxDependConsole.log("[Navigator] _secretOpen", t), r.next = 3, 
                        promiseNav("navigateTo", Object.assign({}, t, {
                            success: null,
                            fail: null,
                            url: appendUrlParam(t.url, l)
                        }), {
                            dealFail: !0
                        });

                      case 3:
                        if (n = r.sent, !n.errMsg.includes("ok")) {
                            r.next = 9;
                            break;
                        }
                        return "function" == typeof t.success && t.success(n), r.next = 8, delay(NAV_BUSY_REMAIN);

                      case 8:
                        return r.abrupt("return");

                      case 9:
                        if (!n.errMsg.includes("limit exceed")) {
                            r.next = 22;
                            break;
                        }
                        if (!(getCurrentPages().length >= MAX_LEVEL)) {
                            r.next = 12;
                            break;
                        }
                        return r.abrupt("return", e._secretReplace(t, {
                            extraParams: l
                        }));

                      case 12:
                        if (!(i < s)) {
                            r.next = 19;
                            break;
                        }
                        return _debugKit.ctxDependConsole.warn("[Navigator] false limit alarm, retry after:", i, "ms", t), 
                        r.next = 16, delay(i);

                      case 16:
                        return r.abrupt("return", e._secretOpen(t, {
                            retryAfter: 2 * i,
                            retryTimeout: s,
                            extraParams: l
                        }));

                      case 19:
                        throw _debugKit.ctxDependConsole.error("[Navigator error] _secretOpen failed, res:", n, "getCurrentPages:", getCurrentPages(), "longest retry interval:", i / 2), 
                        "function" == typeof t.fail && t.fail(n), n;

                      case 22:
                        throw "function" == typeof t.fail && t.fail(n), n;

                      case 24:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "_secretReplace",
        value: function() {
            function r(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = n.extraParams, o = void 0 === a ? null : a;
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return _debugKit.ctxDependConsole.log("[Navigator] _secretReplace", t), e._activeUnload = !0, 
                        r.next = 4, promiseNav("redirectTo", Object.assign({}, t, {
                            url: appendUrlParam(t.url, o)
                        }));

                      case 4:
                        return r.next = 6, delay(NAV_BUSY_REMAIN);

                      case 6:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "_secretBack",
        value: function() {
            function r() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function r() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    delta: 1
                };
                return regeneratorRuntime.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return _debugKit.ctxDependConsole.log("[Navigator] _secretBack", t), e._activeUnload = !0, 
                        r.next = 4, promiseNav("navigateBack", t);

                      case 4:
                        return r.next = 6, delay("ios" == globalStore.env.os ? 3 * NAV_BUSY_REMAIN : NAV_BUSY_REMAIN);

                      case 6:
                      case "end":
                        return r.stop();
                    }
                }, r, this);
            }));
            return r;
        }()
    }, {
        key: "history",
        get: function() {
            return e._history.routes;
        }
    } ]), e;
}(), _applyDecoratedDescriptor(_class, "navigateTo", [ _dec ], Object.getOwnPropertyDescriptor(_class, "navigateTo"), _class), 
_applyDecoratedDescriptor(_class, "navigateBack", [ _dec2 ], Object.getOwnPropertyDescriptor(_class, "navigateBack"), _class), 
_class);

Navigator._config = {
    curtainPage: "/pages/curtain/curtain"
}, Navigator._history = new _History2.default({
    routes: [ {
        url: ""
    } ],
    correctLevel: MAX_LEVEL - 2
}), Navigator._activeUnload = !1, exports.default = Navigator;
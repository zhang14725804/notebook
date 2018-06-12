(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e);
    (function(a) {
        function c() {}
        function d(a, b) {
            return function() {
                a.apply(b, arguments);
            };
        }
        function e(a) {
            if ("object" !== b(this)) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof a) throw new TypeError("not a function");
            this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
            k(a, this);
        }
        function f(a, b) {
            for (;3 === a._state; ) a = a._value;
            return 0 === a._state ? void a._deferreds.push(b) : void (a._handled = !0, e._immediateFn(function() {
                var c = 1 === a._state ? b.onFulfilled : b.onRejected;
                if (null === c) return void (1 === a._state ? g : h)(b.promise, a._value);
                var d;
                try {
                    d = c(a._value);
                } catch (a) {
                    return void h(b.promise, a);
                }
                g(b.promise, d);
            }));
        }
        function g(a, c) {
            try {
                if (c === a) throw new TypeError("A promise cannot be resolved with itself.");
                if (c && ("object" === ("undefined" == typeof c ? "undefined" : b(c)) || "function" == typeof c)) {
                    var f = c.then;
                    if (c instanceof e) return a._state = 3, a._value = c, void i(a);
                    if ("function" == typeof f) return void k(d(f, c), a);
                }
                a._state = 1, a._value = c, i(a);
            } catch (b) {
                h(a, b);
            }
        }
        function h(a, b) {
            a._state = 2, a._value = b, i(a);
        }
        function i(a) {
            2 === a._state && 0 === a._deferreds.length && e._immediateFn(function() {
                a._handled || e._unhandledRejectionFn(a._value);
            });
            for (var b = 0, c = a._deferreds.length; b < c; b++) f(a, a._deferreds[b]);
            a._deferreds = null;
        }
        function j(a, b, c) {
            this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, 
            this.promise = c;
        }
        function k(a, b) {
            var c = !1;
            try {
                a(function(a) {
                    c || (c = !0, g(b, a));
                }, function(a) {
                    c || (c = !0, h(b, a));
                });
            } catch (a) {
                if (c) return;
                c = !0, h(b, a);
            }
        }
        var l = setTimeout;
        e.prototype["catch"] = function(a) {
            return this.then(null, a);
        }, e.prototype.then = function(a, b) {
            var d = new this.constructor(c);
            return f(this, new j(a, b, d)), d;
        }, e.all = function(a) {
            var c = Array.prototype.slice.call(a);
            return new e(function(a, d) {
                function e(g, h) {
                    try {
                        if (h && ("object" === ("undefined" == typeof h ? "undefined" : b(h)) || "function" == typeof h)) {
                            var i = h.then;
                            if ("function" == typeof i) return void i.call(h, function(a) {
                                e(g, a);
                            }, d);
                        }
                        c[g] = h, 0 == --f && a(c);
                    } catch (a) {
                        d(a);
                    }
                }
                if (0 === c.length) return a([]);
                for (var f = c.length, g = 0; g < c.length; g++) e(g, c[g]);
            });
        }, e.resolve = function(a) {
            return a && "object" === ("undefined" == typeof a ? "undefined" : b(a)) && a.constructor === e ? a : new e(function(b) {
                b(a);
            });
        }, e.reject = function(a) {
            return new e(function(b, c) {
                c(a);
            });
        }, e.race = function(a) {
            return new e(function(b, c) {
                for (var d = 0, e = a.length; d < e; d++) a[d].then(b, c);
            });
        }, e._immediateFn = "function" == typeof setImmediate && function(a) {
            setImmediate(a);
        } || function(a) {
            l(a, 0);
        }, e._unhandledRejectionFn = function(a) {
            if (a instanceof Error) throw a; else "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a);
        }, e._setImmediateFn = function(a) {
            e._immediateFn = a;
        }, e._setUnhandledRejectionFn = function(a) {
            e._unhandledRejectionFn = a;
        }, define(function() {
            return e;
        }), "undefined" != typeof module && module.exports ? module.exports = e : !a.Promise && (a.Promise = e);
    })(void 0);
})();
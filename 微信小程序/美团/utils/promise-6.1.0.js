var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function() {
    function e() {}
    function t(n, e) {
        return function() {
            n.apply(e, arguments);
        };
    }
    function o(e) {
        if ("object" !== n(this)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
        l(e, this);
    }
    function i(n, e) {
        for (;3 === n._state; ) n = n._value;
        0 !== n._state ? (n._handled = !0, o._immediateFn(function() {
            var t = 1 === n._state ? e.onFulfilled : e.onRejected;
            if (null !== t) {
                var o;
                try {
                    o = t(n._value);
                } catch (n) {
                    return void u(e.promise, n);
                }
                r(e.promise, o);
            } else (1 === n._state ? r : u)(e.promise, n._value);
        })) : n._deferreds.push(e);
    }
    function r(e, i) {
        try {
            if (i === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (i && ("object" === (void 0 === i ? "undefined" : n(i)) || "function" == typeof i)) {
                var r = i.then;
                if (i instanceof o) return e._state = 3, e._value = i, void f(e);
                if ("function" == typeof r) return void l(t(r, i), e);
            }
            e._state = 1, e._value = i, f(e);
        } catch (n) {
            u(e, n);
        }
    }
    function u(n, e) {
        n._state = 2, n._value = e, f(n);
    }
    function f(n) {
        2 === n._state && 0 === n._deferreds.length && o._immediateFn(function() {
            n._handled || o._unhandledRejectionFn(n._value);
        });
        for (var e = 0, t = n._deferreds.length; e < t; e++) i(n, n._deferreds[e]);
        n._deferreds = null;
    }
    function c(n, e, t) {
        this.onFulfilled = "function" == typeof n ? n : null, this.onRejected = "function" == typeof e ? e : null, 
        this.promise = t;
    }
    function l(n, e) {
        var t = !1;
        try {
            n(function(n) {
                t || (t = !0, r(e, n));
            }, function(n) {
                t || (t = !0, u(e, n));
            });
        } catch (n) {
            if (t) return;
            t = !0, u(e, n);
        }
    }
    var s = setTimeout;
    o.prototype.catch = function(n) {
        return this.then(null, n);
    }, o.prototype.then = function(n, t) {
        var o = new this.constructor(e);
        return i(this, new c(n, t, o)), o;
    }, o.all = function(e) {
        var t = Array.prototype.slice.call(e);
        return new o(function(e, o) {
            function i(u, f) {
                try {
                    if (f && ("object" === (void 0 === f ? "undefined" : n(f)) || "function" == typeof f)) {
                        var c = f.then;
                        if ("function" == typeof c) return void c.call(f, function(n) {
                            i(u, n);
                        }, o);
                    }
                    t[u] = f, 0 == --r && e(t);
                } catch (n) {
                    o(n);
                }
            }
            if (0 === t.length) return e([]);
            for (var r = t.length, u = 0; u < t.length; u++) i(u, t[u]);
        });
    }, o.resolve = function(e) {
        return e && "object" === (void 0 === e ? "undefined" : n(e)) && e.constructor === o ? e : new o(function(n) {
            n(e);
        });
    }, o.reject = function(n) {
        return new o(function(e, t) {
            t(n);
        });
    }, o.race = function(n) {
        return new o(function(e, t) {
            for (var o = 0, i = n.length; o < i; o++) n[o].then(e, t);
        });
    }, o._immediateFn = "function" == typeof setImmediate && function(n) {
        setImmediate(n);
    } || function(n) {
        s(n, 0);
    }, o._unhandledRejectionFn = function(n) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", n);
    }, o._setImmediateFn = function(n) {
        o._immediateFn = n;
    }, o._setUnhandledRejectionFn = function(n) {
        o._unhandledRejectionFn = n;
    }, module.exports = o;
}();
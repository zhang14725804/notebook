var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e) {
    function r(t, e, r, n) {
        var i = e && e.prototype instanceof o ? e : o, a = Object.create(i.prototype), c = new h(n || []);
        return a._invoke = f(t, r, c), a;
    }
    function n(t, e, r) {
        try {
            return {
                type: "normal",
                arg: t.call(e, r)
            };
        } catch (t) {
            return {
                type: "throw",
                arg: t
            };
        }
    }
    function o() {}
    function i() {}
    function a() {}
    function c(t) {
        [ "next", "throw", "return" ].forEach(function(e) {
            t[e] = function(t) {
                return this._invoke(e, t);
            };
        });
    }
    function u(e) {
        function r(o, i, a, c) {
            var u = n(e[o], e, i);
            if ("throw" !== u.type) {
                var f = u.arg, l = f.value;
                return l && "object" === (void 0 === l ? "undefined" : t(l)) && g.call(l, "__await") ? Promise.resolve(l.__await).then(function(t) {
                    r("next", t, a, c);
                }, function(t) {
                    r("throw", t, a, c);
                }) : Promise.resolve(l).then(function(t) {
                    f.value = t, a(f);
                }, c);
            }
            c(u.arg);
        }
        "object" === ("undefined" == typeof process ? "undefined" : t(process)) && process.domain && (r = process.domain.bind(r));
        var o;
        this._invoke = function(t, e) {
            function n() {
                return new Promise(function(n, o) {
                    r(t, e, n, o);
                });
            }
            return o = o ? o.then(n, n) : n();
        };
    }
    function f(t, e, r) {
        var o = E;
        return function(i, a) {
            if (o === _) throw new Error("Generator is already running");
            if (o === O) {
                if ("throw" === i) throw a;
                return y();
            }
            for (;;) {
                var c = r.delegate;
                if (c) {
                    if ("return" === i || "throw" === i && c.iterator[i] === d) {
                        r.delegate = null;
                        var u = c.iterator.return;
                        if (u && "throw" === (f = n(u, c.iterator, a)).type) {
                            i = "throw", a = f.arg;
                            continue;
                        }
                        if ("return" === i) continue;
                    }
                    if ("throw" === (f = n(c.iterator[i], c.iterator, a)).type) {
                        r.delegate = null, i = "throw", a = f.arg;
                        continue;
                    }
                    if (i = "next", a = d, !(l = f.arg).done) return o = j, l;
                    r[c.resultName] = l.value, r.next = c.nextLoc, r.delegate = null;
                }
                if ("next" === i) r.sent = r._sent = a; else if ("throw" === i) {
                    if (o === E) throw o = O, a;
                    r.dispatchException(a) && (i = "next", a = d);
                } else "return" === i && r.abrupt("return", a);
                o = _;
                var f = n(t, e, r);
                if ("normal" === f.type) {
                    o = r.done ? O : j;
                    var l = {
                        value: f.arg,
                        done: r.done
                    };
                    if (f.arg !== S) return l;
                    r.delegate && "next" === i && (a = d);
                } else "throw" === f.type && (o = O, i = "throw", a = f.arg);
            }
        };
    }
    function l(t) {
        var e = {
            tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
        this.tryEntries.push(e);
    }
    function s(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
    }
    function h(t) {
        this.tryEntries = [ {
            tryLoc: "root"
        } ], t.forEach(l, this), this.reset(!0);
    }
    function p(t) {
        if (t) {
            var e = t[m];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var r = -1, n = function e() {
                    for (;++r < t.length; ) if (g.call(t, r)) return e.value = t[r], e.done = !1, e;
                    return e.value = d, e.done = !0, e;
                };
                return n.next = n;
            }
        }
        return {
            next: y
        };
    }
    function y() {
        return {
            value: d,
            done: !0
        };
    }
    var d, v = Object.prototype, g = v.hasOwnProperty, w = "function" == typeof Symbol ? Symbol : {}, m = w.iterator || "@@iterator", b = w.toStringTag || "@@toStringTag", L = "object" === ("undefined" == typeof module ? "undefined" : t(module)), x = e.regeneratorRuntime;
    if (x) L && (module.exports = x); else {
        (x = e.regeneratorRuntime = L ? module.exports : {}).wrap = r;
        var E = "suspendedStart", j = "suspendedYield", _ = "executing", O = "completed", S = {}, k = {};
        k[m] = function() {
            return this;
        };
        var G = Object.getPrototypeOf, N = G && G(G(p([])));
        N && N !== v && g.call(N, m) && (k = N);
        var P = a.prototype = o.prototype = Object.create(k);
        i.prototype = P.constructor = a, a.constructor = i, a[b] = i.displayName = "GeneratorFunction", 
        x.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === i || "GeneratorFunction" === (e.displayName || e.name));
        }, x.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : (t.__proto__ = a, b in t || (t[b] = "GeneratorFunction")), 
            t.prototype = Object.create(P), t;
        }, x.awrap = function(t) {
            return {
                __await: t
            };
        }, c(u.prototype), x.AsyncIterator = u, x.async = function(t, e, n, o) {
            var i = new u(r(t, e, n, o));
            return x.isGeneratorFunction(e) ? i : i.next().then(function(t) {
                return t.done ? t.value : i.next();
            });
        }, c(P), P[b] = "Generator", P.toString = function() {
            return "[object Generator]";
        }, x.keys = function(t) {
            var e = [];
            for (var r in t) e.push(r);
            return e.reverse(), function r() {
                for (;e.length; ) {
                    var n = e.pop();
                    if (n in t) return r.value = n, r.done = !1, r;
                }
                return r.done = !0, r;
            };
        }, x.values = p, h.prototype = {
            constructor: h,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = d, this.done = !1, this.delegate = null, 
                this.tryEntries.forEach(s), !t) for (var e in this) "t" === e.charAt(0) && g.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = d);
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
            },
            dispatchException: function(t) {
                function e(e, n) {
                    return i.type = "throw", i.arg = t, r.next = e, !!n;
                }
                if (this.done) throw t;
                for (var r = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n], i = o.completion;
                    if ("root" === o.tryLoc) return e("end");
                    if (o.tryLoc <= this.prev) {
                        var a = g.call(o, "catchLoc"), c = g.call(o, "finallyLoc");
                        if (a && c) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                        } else if (a) {
                            if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                        } else {
                            if (!c) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var n = this.tryEntries[r];
                    if (n.tryLoc <= this.prev && g.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                        var o = n;
                        break;
                    }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                var i = o ? o.completion : {};
                return i.type = t, i.arg = e, o ? this.next = o.finallyLoc : this.complete(i), S;
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = t.arg, 
                this.next = "end") : "normal" === t.type && e && (this.next = e);
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), s(r), S;
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            s(r);
                        }
                        return o;
                    }
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function(t, e, r) {
                return this.delegate = {
                    iterator: p(t),
                    resultName: e,
                    nextLoc: r
                }, S;
            }
        };
    }
}("object" === ("undefined" == typeof global ? "undefined" : t(global)) ? global : "object" === ("undefined" == typeof window ? "undefined" : t(window)) ? window : "object" === ("undefined" == typeof self ? "undefined" : t(self)) ? self : "object" === t(void 0) ? void 0 : {});
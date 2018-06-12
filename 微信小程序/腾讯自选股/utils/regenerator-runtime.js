(function() {
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    };
    !function(b) {
        "use strict";
        function c(a, b, c, d) {
            var f = b && b.prototype instanceof e ? b : e, g = Object.create(f.prototype), h = new n(d || []);
            return g._invoke = k(a, c, h), g;
        }
        function d(a, b, c) {
            try {
                return {
                    type: "normal",
                    arg: a.call(b, c)
                };
            } catch (a) {
                return {
                    type: "throw",
                    arg: a
                };
            }
        }
        function e() {}
        function f() {}
        function g() {}
        function h(a) {
            [ "next", "throw", "return" ].forEach(function(b) {
                a[b] = function(a) {
                    return this._invoke(b, a);
                };
            });
        }
        function i(a) {
            this.arg = a;
        }
        function j(b) {
            function c(a, e, f, g) {
                var h = d(b[a], b, e);
                if ("throw" === h.type) g(h.arg); else {
                    var j = h.arg, k = j.value;
                    return k instanceof i ? q.resolve(k.arg).then(function(a) {
                        c("next", a, f, g);
                    }, function(a) {
                        c("throw", a, f, g);
                    }) : q.resolve(k).then(function(a) {
                        j.value = a, f(j);
                    }, g);
                }
            }
            "object" === ("undefined" == typeof process ? "undefined" : a(process)) && process.domain && (c = process.domain.bind(c));
            var e;
            this._invoke = function(a, b) {
                function d() {
                    return new q(function(d, e) {
                        c(a, b, d, e);
                    });
                }
                return e = e ? e.then(d, d) : d();
            };
        }
        function k(a, b, c) {
            var e = x;
            return function(f, g) {
                if (e == z) throw new Error("Generator is already running");
                if (e == A) {
                    if ("throw" === f) throw g;
                    return p();
                }
                for (;;) {
                    var h = c.delegate;
                    if (h) {
                        if ("return" === f || "throw" === f && h.iterator[f] === void 0) {
                            c.delegate = null;
                            var i = h.iterator["return"];
                            if (i) {
                                var j = d(i, h.iterator, g);
                                if ("throw" === j.type) {
                                    f = "throw", g = j.arg;
                                    continue;
                                }
                            }
                            if ("return" === f) continue;
                        }
                        var j = d(h.iterator[f], h.iterator, g);
                        if ("throw" === j.type) {
                            c.delegate = null, f = "throw", g = j.arg;
                            continue;
                        }
                        f = "next", g = void 0;
                        var k = j.arg;
                        if (k.done) c[h.resultName] = k.value, c.next = h.nextLoc; else return e = y, k;
                        c.delegate = null;
                    }
                    if ("next" === f) c.sent = c._sent = g; else if ("throw" === f) {
                        if (e == x) throw e = A, g;
                        c.dispatchException(g) && (f = "next", g = void 0);
                    } else "return" === f && c.abrupt("return", g);
                    e = z;
                    var j = d(a, b, c);
                    if ("normal" === j.type) {
                        e = c.done ? A : y;
                        var k = {
                            value: j.arg,
                            done: c.done
                        };
                        if (j.arg === B) c.delegate && "next" === f && (g = void 0); else return k;
                    } else "throw" === j.type && (e = A, f = "throw", g = j.arg);
                }
            };
        }
        function l(a) {
            var b = {
                tryLoc: a[0]
            };
            1 in a && (b.catchLoc = a[1]), 2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]), 
            this.tryEntries.push(b);
        }
        function m(a) {
            var b = a.completion || {};
            b.type = "normal", delete b.arg, a.completion = b;
        }
        function n(a) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], a.forEach(l, this), this.reset(!0);
        }
        function o(a) {
            if (a) {
                var b = a[t];
                if (b) return b.call(a);
                if ("function" == typeof a.next) return a;
                if (!isNaN(a.length)) {
                    var c = -1, d = function b() {
                        for (;++c < a.length; ) if (r.call(a, c)) return b.value = a[c], b.done = !1, b;
                        return b.value = void 0, b.done = !0, b;
                    };
                    return d.next = d;
                }
            }
            return {
                next: p
            };
        }
        function p() {
            return {
                value: void 0,
                done: !0
            };
        }
        var q = b.Promise, r = Object.prototype.hasOwnProperty, s = "function" == typeof Symbol ? Symbol : {}, t = s.iterator || "@@iterator", u = s.toStringTag || "@@toStringTag", v = "object" === ("undefined" == typeof module ? "undefined" : a(module)), w = b.regeneratorRuntime;
        if (w) return void (v && (module.exports = w));
        w = b.regeneratorRuntime = v ? module.exports : {}, w.wrap = c;
        var x = "suspendedStart", y = "suspendedYield", z = "executing", A = "completed", B = {}, C = g.prototype = e.prototype;
        f.prototype = C.constructor = g, g.constructor = f, g[u] = f.displayName = "GeneratorFunction", 
        w.isGeneratorFunction = function(a) {
            var b = "function" == typeof a && a.constructor;
            return !!b && (b === f || "GeneratorFunction" === (b.displayName || b.name));
        }, w.mark = function(a) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(a, g) : (a.__proto__ = g, !(u in a) && (a[u] = "GeneratorFunction")), 
            a.prototype = Object.create(C), a;
        }, w.awrap = function(a) {
            return new i(a);
        }, h(j.prototype), w.async = function(a, b, d, e) {
            var f = new j(c(a, b, d, e));
            return w.isGeneratorFunction(b) ? f : f.next().then(function(a) {
                return a.done ? a.value : f.next();
            });
        }, h(C), C[t] = function() {
            return this;
        }, C[u] = "Generator", C.toString = function() {
            return "[object Generator]";
        }, w.keys = function(a) {
            var b = [];
            for (var c in a) b.push(c);
            return b.reverse(), function c() {
                for (;b.length; ) {
                    var d = b.pop();
                    if (d in a) return c.value = d, c.done = !1, c;
                }
                return c.done = !0, c;
            };
        }, w.values = o, n.prototype = {
            constructor: n,
            reset: function(a) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                this.delegate = null, this.tryEntries.forEach(m), !a) for (var b in this) "t" === b.charAt(0) && r.call(this, b) && !isNaN(+b.slice(1)) && (this[b] = void 0);
            },
            stop: function() {
                this.done = !0;
                var a = this.tryEntries[0], b = a.completion;
                if ("throw" === b.type) throw b.arg;
                return this.rval;
            },
            dispatchException: function(a) {
                function b(b, d) {
                    return f.type = "throw", f.arg = a, c.next = b, !!d;
                }
                if (this.done) throw a;
                for (var c = this, d = this.tryEntries.length - 1; 0 <= d; --d) {
                    var e = this.tryEntries[d], f = e.completion;
                    if ("root" === e.tryLoc) return b("end");
                    if (e.tryLoc <= this.prev) {
                        var g = r.call(e, "catchLoc"), h = r.call(e, "finallyLoc");
                        if (g && h) {
                            if (this.prev < e.catchLoc) return b(e.catchLoc, !0);
                            if (this.prev < e.finallyLoc) return b(e.finallyLoc);
                        } else if (g) {
                            if (this.prev < e.catchLoc) return b(e.catchLoc, !0);
                        } else if (!h) throw new Error("try statement without catch or finally"); else if (this.prev < e.finallyLoc) return b(e.finallyLoc);
                    }
                }
            },
            abrupt: function(a, b) {
                for (var c, d = this.tryEntries.length - 1; 0 <= d; --d) if (c = this.tryEntries[d], 
                c.tryLoc <= this.prev && r.call(c, "finallyLoc") && this.prev < c.finallyLoc) {
                    var e = c;
                    break;
                }
                e && ("break" === a || "continue" === a) && e.tryLoc <= b && b <= e.finallyLoc && (e = null);
                var f = e ? e.completion : {};
                return f.type = a, f.arg = b, e ? this.next = e.finallyLoc : this.complete(f), B;
            },
            complete: function(a, b) {
                if ("throw" === a.type) throw a.arg;
                "break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = a.arg, 
                this.next = "end") : "normal" === a.type && b && (this.next = b);
            },
            finish: function(a) {
                for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], 
                b.finallyLoc === a) return this.complete(b.completion, b.afterLoc), m(b), B;
            },
            catch: function(a) {
                for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], 
                b.tryLoc === a) {
                    var d = b.completion;
                    if ("throw" === d.type) {
                        var e = d.arg;
                        m(b);
                    }
                    return e;
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function(a, b, c) {
                return this.delegate = {
                    iterator: o(a),
                    resultName: b,
                    nextLoc: c
                }, B;
            }
        };
    }("object" === ("undefined" == typeof global ? "undefined" : a(global)) ? global : "object" === ("undefined" == typeof window ? "undefined" : a(window)) ? window : "object" === ("undefined" == typeof self ? "undefined" : a(self)) ? self : void 0);
})();
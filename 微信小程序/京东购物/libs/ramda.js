var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

(function() {
    var t = function(n, t) {
        switch (n) {
          case 0:
            return function() {
                return t.apply(this, arguments);
            };

          case 1:
            return function(n) {
                return t.apply(this, arguments);
            };

          case 2:
            return function(n, r) {
                return t.apply(this, arguments);
            };

          case 3:
            return function(n, r, e) {
                return t.apply(this, arguments);
            };

          case 4:
            return function(n, r, e, u) {
                return t.apply(this, arguments);
            };

          case 5:
            return function(n, r, e, u, o) {
                return t.apply(this, arguments);
            };

          case 6:
            return function(n, r, e, u, o, i) {
                return t.apply(this, arguments);
            };

          case 7:
            return function(n, r, e, u, o, i, c) {
                return t.apply(this, arguments);
            };

          case 8:
            return function(n, r, e, u, o, i, c, f) {
                return t.apply(this, arguments);
            };

          case 9:
            return function(n, r, e, u, o, i, c, f, a) {
                return t.apply(this, arguments);
            };

          case 10:
            return function(n, r, e, u, o, i, c, f, a, l) {
                return t.apply(this, arguments);
            };

          default:
            throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
        }
    }, r = Array.isArray || function(n) {
        return null != n && n.length >= 0 && "[object Array]" === Object.prototype.toString.call(n);
    }, e = function(t) {
        return null != t && "object" === (void 0 === t ? "undefined" : n(t)) && !0 === t["@@functional/placeholder"];
    }, u = function(n) {
        return "[object String]" === Object.prototype.toString.call(n);
    }, o = function(n, t) {
        return function() {
            return t.call(this, n.apply(this, arguments));
        };
    }, i = function() {
        function n(n) {
            this.f = n;
        }
        return n.prototype["@@transducer/init"] = function() {
            throw new Error("init not implemented on XWrap");
        }, n.prototype["@@transducer/result"] = function(n) {
            return n;
        }, n.prototype["@@transducer/step"] = function(n, t) {
            return this.f(n, t);
        }, function(t) {
            return new n(t);
        };
    }(), c = function(n, t) {
        return function() {
            var e = arguments.length;
            if (0 === e) return t();
            var u = arguments[e - 1];
            return r(u) || "function" != typeof u[n] ? t.apply(this, arguments) : u[n].apply(u, Array.prototype.slice.call(arguments, 0, e - 1));
        };
    }, f = function(n) {
        return function t(r) {
            return 0 === arguments.length || e(r) ? t : n.apply(this, arguments);
        };
    }, a = function(n) {
        return function t(r, u) {
            switch (arguments.length) {
              case 0:
                return t;

              case 1:
                return e(r) ? t : f(function(t) {
                    return n(r, t);
                });

              default:
                return e(r) && e(u) ? t : e(r) ? f(function(t) {
                    return n(t, u);
                }) : e(u) ? f(function(t) {
                    return n(r, t);
                }) : n(r, u);
            }
        };
    }, l = function(n) {
        return function t(r, u, o) {
            switch (arguments.length) {
              case 0:
                return t;

              case 1:
                return e(r) ? t : a(function(t, e) {
                    return n(r, t, e);
                });

              case 2:
                return e(r) && e(u) ? t : e(r) ? a(function(t, r) {
                    return n(t, u, r);
                }) : e(u) ? a(function(t, e) {
                    return n(r, t, e);
                }) : f(function(t) {
                    return n(r, u, t);
                });

              default:
                return e(r) && e(u) && e(o) ? t : e(r) && e(u) ? a(function(t, r) {
                    return n(t, r, o);
                }) : e(r) && e(o) ? a(function(t, r) {
                    return n(t, u, r);
                }) : e(u) && e(o) ? a(function(t, e) {
                    return n(r, t, e);
                }) : e(r) ? f(function(t) {
                    return n(t, u, o);
                }) : e(u) ? f(function(t) {
                    return n(r, t, o);
                }) : e(o) ? f(function(t) {
                    return n(r, u, t);
                }) : n(r, u, o);
            }
        };
    }, s = function n(r, u, o) {
        return function() {
            for (var i = [], c = 0, f = r, a = 0; a < u.length || c < arguments.length; ) {
                var l;
                a < u.length && (!e(u[a]) || c >= arguments.length) ? l = u[a] : (l = arguments[c], 
                c += 1), i[a] = l, e(l) || (f -= 1), a += 1;
            }
            return f <= 0 ? o.apply(this, i) : t(f, n(r, i, o));
        };
    }, p = f(function(t) {
        return !!r(t) || !!t && ("object" === (void 0 === t ? "undefined" : n(t)) && (!u(t) && (1 === t.nodeType ? !!t.length : 0 === t.length || t.length > 0 && (t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1)))));
    }), y = a(function(n, r) {
        return t(n.length, function() {
            return n.apply(r, arguments);
        });
    }), h = a(function(n, r) {
        return 1 === n ? f(r) : t(n, s(n, [], r));
    }), d = f(function(n) {
        return u(n) ? n.split("").reverse().join("") : Array.prototype.slice.call(n, 0).reverse();
    }), g = l(c("slice", function(n, t, r) {
        return Array.prototype.slice.call(r, n, t);
    })), b = f(c("tail", g(1, 1 / 0))), m = function() {
        function n(n, t, r) {
            for (var e = 0, u = r.length; e < u; ) {
                if ((t = n["@@transducer/step"](t, r[e])) && t["@@transducer/reduced"]) {
                    t = t["@@transducer/value"];
                    break;
                }
                e += 1;
            }
            return n["@@transducer/result"](t);
        }
        function t(n, t, r) {
            for (var e = r.next(); !e.done; ) {
                if ((t = n["@@transducer/step"](t, e.value)) && t["@@transducer/reduced"]) {
                    t = t["@@transducer/value"];
                    break;
                }
                e = r.next();
            }
            return n["@@transducer/result"](t);
        }
        function r(n, t, r, e) {
            return n["@@transducer/result"](r[e](y(n["@@transducer/step"], n), t));
        }
        var e = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator";
        return function(u, o, c) {
            if ("function" == typeof u && (u = i(u)), p(c)) return n(u, o, c);
            if ("function" == typeof c["fantasy-land/reduce"]) return r(u, o, c, "fantasy-land/reduce");
            if (null != c[e]) return t(u, o, c[e]());
            if ("function" == typeof c.next) return t(u, o, c);
            if ("function" == typeof c.reduce) return r(u, o, c, "reduce");
            throw new TypeError("reduce: list must be array or iterable");
        };
    }(), v = f(function(n) {
        return h(n.length, n);
    }), w = l(m), S = function() {
        if (0 === arguments.length) throw new Error("pipe requires at least one argument");
        return t(arguments[0].length, w(o, arguments[0], b(arguments)));
    }, j = {
        compose: function() {
            if (0 === arguments.length) throw new Error("compose requires at least one argument");
            return S.apply(this, d(arguments));
        },
        curry: v
    };
    "object" === ("undefined" == typeof exports ? "undefined" : n(exports)) ? module.exports = j : "function" == typeof define && define.amd ? define(function() {
        return j;
    }) : this.R = j;
}).call(void 0);
(function() {
    function e(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, a = require("../../utils/ppdog"), n = e(a), d = require("../../utils/regenerator-runtime"), l = e(d);
    (function(e, n) {
        if ("object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" === ("undefined" == typeof module ? "undefined" : t(module))) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
            var d = n();
            for (var a in d) ("object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports : e)[a] = d[a];
        }
    })(void 0, function() {
        var e = Math.min, a = Math.max;
        return function(e) {
            function a(n) {
                if (t[n]) return t[n].exports;
                var d = t[n] = {
                    exports: {},
                    id: n,
                    loaded: !1
                };
                return e[n].call(d.exports, d, d.exports, a), d.loaded = !0, d.exports;
            }
            var t = {};
            return a.m = e, a.c = t, a.p = "", a(0);
        }([ function(e, a, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function d(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            var l = function() {
                function e(e, a) {
                    for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                    t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                }
                return function(a, t, n) {
                    return t && e(a.prototype, t), n && e(a, n), a;
                };
            }(), i = t(1), u = n(i), c = t(8), r = n(c), o = function() {
                function e(a) {
                    d(this, e), this.cfg = a, this._data = new u.default(a), this._calculator = new r.default(a);
                }
                return l(e, [ {
                    key: "getData",
                    value: function() {
                        var e = this._data, a = this._calculator;
                        return e.getData().then(function(e) {
                            return a.initialize({
                                raw_data: e
                            });
                        });
                    }
                }, {
                    key: "getHistoryData",
                    value: function(e) {
                        var a = this, t = this._calculator.data.day_data.data[0][0];
                        return this._data.getData({
                            from_date: e,
                            to_date: t
                        }).then(function(e) {
                            return a._calculator.update({
                                history_data: e
                            });
                        });
                    }
                }, {
                    key: "getLatestData",
                    value: function(e) {
                        var a = this;
                        return this._data.getData({
                            latest_date: e
                        }).then(function(e) {
                            return a._calculator.update({
                                latest_data: e
                            });
                        });
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        return this._calculator.update(e);
                    }
                } ], [ {
                    key: "FetchData",
                    value: function(e) {
                        var a = new u.default(e);
                        return a.getData();
                    }
                }, {
                    key: "Calculate",
                    value: function(e, a) {
                        var t = new r.default(a);
                        return t.initialize({
                            raw_data: e
                        });
                    }
                }, {
                    key: "Data",
                    get: function() {
                        return u.default;
                    }
                }, {
                    key: "Calculator",
                    get: function() {
                        return r.default;
                    }
                } ]), e;
            }();
            e.exports = o;
        }, function(e, a, t) {
            (function(e) {
                "use strict";
                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function d(e, a) {
                    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
                }
                function l(e) {
                    return e.match(/sh|sz|hk|us|nq/) ? p.default : o.default;
                }
                function i(e) {
                    return e.match(/^day|week|month/);
                }
                function u(e) {
                    return e.match(/sh000|sz399|nq899|hkHSI$|hkHSCEI$|hkHSCCI$|hkCES100$|hkCES300$|usDJI$|usIXIC$|usINX$|us\.DJI$|us\.IXIC$|us\.INX$/);
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.StaticData = void 0;
                var c = function() {
                    function e(e, a) {
                        for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                        t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                    }
                    return function(a, t, n) {
                        return t && e(a.prototype, t), n && e(a, n), a;
                    };
                }(), r = t(3), o = n(r), s = t(6), p = n(s), f = t(7), y = n(f), h = t(5), _ = n(h), m = a.StaticData = function() {
                    function a(e) {
                        d(this, a), this.cfg = this.parseCfg(e);
                        var t = this.cfg, n = t.code, i = t.type, u = t.fq;
                        if ("qt" === i) this.Source = y.default; else {
                            var c = n.slice(0, 2);
                            this.Source = l(c);
                        }
                    }
                    return c(a, [ {
                        key: "parseCfg",
                        value: function(a) {
                            if (!e.has(a, "code", "type")) throw new _.default("Missing parameters:code or type", "Params", -100);
                            var t = e.clone(a), n = t.code, d = t.type;
                            return i(d) && e.defaults(t, {
                                fq: "qfq"
                            }), u(n) && e.extend(t, {
                                fq: ""
                            }), t;
                        }
                    }, {
                        key: "getData",
                        value: function(a) {
                            return this.cfg = e.extend({}, this.cfg, a), this.Source.getData(this.cfg);
                        }
                    } ]), a;
                }();
                a.default = m;
            }).call(a, t(2));
        }, function(n, d) {
            var l, i;
            (function() {
                function u(e) {
                    function a(a, t, n, d, l, i) {
                        for (;0 <= l && l < i; l += e) {
                            var u = d ? d[l] : l;
                            n = t(n, a[u], u, a);
                        }
                        return n;
                    }
                    return function(t, n, d, l) {
                        n = _(n, l, 4);
                        var i = !S(t) && I.keys(t), u = (i || t).length, c = 0 < e ? 0 : u - 1;
                        return 3 > arguments.length && (d = t[i ? i[c] : c], c += e), a(t, n, d, i, c, u);
                    };
                }
                function c(e) {
                    return function(a, t, n) {
                        t = q(t, n);
                        for (var d = V(a), l = 0 < e ? 0 : d - 1; 0 <= l && l < d; l += e) if (t(a[l], l, a)) return l;
                        return -1;
                    };
                }
                function r(t, n, d) {
                    return function(l, u, c) {
                        var r = 0, i = V(l);
                        if ("number" == typeof c) 0 < t ? r = 0 <= c ? c : a(c + i, r) : i = 0 <= c ? e(c + 1, i) : c + i + 1; else if (d && c && i) return c = d(l, u), 
                        l[c] === u ? c : -1;
                        if (u !== u) return c = n(k.call(l, r, i), I.isNaN), 0 <= c ? c + r : -1;
                        for (c = 0 < t ? r : i - 1; 0 <= c && c < i; c += t) if (l[c] === u) return c;
                        return -1;
                    };
                }
                function o(e, a) {
                    var t = F.length, n = e.constructor, d = I.isFunction(n) && n.prototype || h, l = "constructor";
                    for (I.has(e, l) && !I.contains(a, l) && a.push(l); t--; ) l = F[t], l in e && e[l] !== d[l] && !I.contains(a, l) && a.push(l);
                }
                var s = Math.floor, p = this, f = p._, y = Array.prototype, h = Object.prototype, m = Function.prototype, g = y.push, k = y.slice, v = h.toString, x = h.hasOwnProperty, b = Array.isArray, D = Object.keys, w = m.bind, A = Object.create, M = function() {}, I = function e(a) {
                    return a instanceof e ? a : this instanceof e ? void (this._wrapped = a) : new e(a);
                };
                "undefined" != typeof n && n.exports && (d = n.exports = I), d._ = I, I.VERSION = "1.8.3";
                var _ = function(e, a, t) {
                    if (void 0 === a) return e;
                    switch (null == t ? 3 : t) {
                      case 1:
                        return function(t) {
                            return e.call(a, t);
                        };

                      case 2:
                        return function(t, n) {
                            return e.call(a, t, n);
                        };

                      case 3:
                        return function(t, n, d) {
                            return e.call(a, t, n, d);
                        };

                      case 4:
                        return function(t, n, d, l) {
                            return e.call(a, t, n, d, l);
                        };
                    }
                    return function() {
                        return e.apply(a, arguments);
                    };
                }, q = function(e, a, t) {
                    return null == e ? I.identity : I.isFunction(e) ? _(e, a, t) : I.isObject(e) ? I.matcher(e) : I.property(e);
                };
                I.iteratee = function(e, a) {
                    return q(e, a, Infinity);
                };
                var E = function(e, a) {
                    return function(t) {
                        var n = arguments.length;
                        if (2 > n || null == t) return t;
                        for (var d = 1; d < n; d++) for (var u, c = arguments[d], r = e(c), o = r.length, l = 0; l < o; l++) u = r[l], 
                        a && void 0 !== t[u] || (t[u] = c[u]);
                        return t;
                    };
                }, j = function(e) {
                    if (!I.isObject(e)) return {};
                    if (A) return A(e);
                    M.prototype = e;
                    var a = new M();
                    return M.prototype = null, a;
                }, L = function(e) {
                    return function(a) {
                        return null == a ? void 0 : a[e];
                    };
                }, V = L("length"), S = function(e) {
                    var a = V(e);
                    return "number" == typeof a && 0 <= a && a <= 9007199254740991;
                };
                I.each = I.forEach = function(e, a, t) {
                    a = _(a, t);
                    var n, d;
                    if (S(e)) for (n = 0, d = e.length; n < d; n++) a(e[n], n, e); else {
                        var l = I.keys(e);
                        for (n = 0, d = l.length; n < d; n++) a(e[l[n]], l[n], e);
                    }
                    return e;
                }, I.map = I.collect = function(e, a, t) {
                    a = q(a, t);
                    for (var n, d = !S(e) && I.keys(e), l = (d || e).length, i = Array(l), u = 0; u < l; u++) n = d ? d[u] : u, 
                    i[u] = a(e[n], n, e);
                    return i;
                }, I.reduce = I.foldl = I.inject = u(1), I.reduceRight = I.foldr = u(-1), I.find = I.detect = function(e, a, t) {
                    var n;
                    if (n = S(e) ? I.findIndex(e, a, t) : I.findKey(e, a, t), void 0 !== n && -1 !== n) return e[n];
                }, I.filter = I.select = function(e, a, t) {
                    var n = [];
                    return a = q(a, t), I.each(e, function(e, t, d) {
                        a(e, t, d) && n.push(e);
                    }), n;
                }, I.reject = function(e, a, t) {
                    return I.filter(e, I.negate(q(a)), t);
                }, I.every = I.all = function(e, a, t) {
                    a = q(a, t);
                    for (var n, d = !S(e) && I.keys(e), l = (d || e).length, i = 0; i < l; i++) if (n = d ? d[i] : i, 
                    !a(e[n], n, e)) return !1;
                    return !0;
                }, I.some = I.any = function(e, a, t) {
                    a = q(a, t);
                    for (var n, d = !S(e) && I.keys(e), l = (d || e).length, i = 0; i < l; i++) if (n = d ? d[i] : i, 
                    a(e[n], n, e)) return !0;
                    return !1;
                }, I.contains = I.includes = I.include = function(e, a, t, n) {
                    return S(e) || (e = I.values(e)), ("number" != typeof t || n) && (t = 0), 0 <= I.indexOf(e, a, t);
                }, I.invoke = function(e, a) {
                    var t = k.call(arguments, 2), n = I.isFunction(a);
                    return I.map(e, function(e) {
                        var d = n ? a : e[a];
                        return null == d ? d : d.apply(e, t);
                    });
                }, I.pluck = function(e, a) {
                    return I.map(e, I.property(a));
                }, I.where = function(e, a) {
                    return I.filter(e, I.matcher(a));
                }, I.findWhere = function(e, a) {
                    return I.find(e, I.matcher(a));
                }, I.max = function(e, a, t) {
                    var n, d, l = -Infinity, u = -Infinity;
                    if (null == a && null != e) {
                        e = S(e) ? e : I.values(e);
                        for (var c = 0, i = e.length; c < i; c++) n = e[c], n > l && (l = n);
                    } else a = q(a, t), I.each(e, function(e, t, n) {
                        d = a(e, t, n), (d > u || d === -Infinity && l == -Infinity) && (l = e, u = d);
                    });
                    return l;
                }, I.min = function(e, a, t) {
                    var n, d, l = Infinity, u = Infinity;
                    if (null == a && null != e) {
                        e = S(e) ? e : I.values(e);
                        for (var c = 0, i = e.length; c < i; c++) n = e[c], n < l && (l = n);
                    } else a = q(a, t), I.each(e, function(e, t, n) {
                        d = a(e, t, n), (d < u || d === Infinity && l == Infinity) && (l = e, u = d);
                    });
                    return l;
                }, I.shuffle = function(e) {
                    for (var a, t = S(e) ? e : I.values(e), n = t.length, d = Array(n), l = 0; l < n; l++) a = I.random(0, l), 
                    a !== l && (d[l] = d[a]), d[a] = t[l];
                    return d;
                }, I.sample = function(e, t, n) {
                    return null == t || n ? (S(e) || (e = I.values(e)), e[I.random(e.length - 1)]) : I.shuffle(e).slice(0, a(0, t));
                }, I.sortBy = function(e, a, t) {
                    return a = q(a, t), I.pluck(I.map(e, function(e, t, n) {
                        return {
                            value: e,
                            index: t,
                            criteria: a(e, t, n)
                        };
                    }).sort(function(e, t) {
                        var n = e.criteria, a = t.criteria;
                        if (n !== a) {
                            if (n > a || void 0 === n) return 1;
                            if (n < a || void 0 === a) return -1;
                        }
                        return e.index - t.index;
                    }), "value");
                };
                var O = function(e) {
                    return function(a, t, n) {
                        var d = {};
                        return t = q(t, n), I.each(a, function(n, l) {
                            var i = t(n, l, a);
                            e(d, n, i);
                        }), d;
                    };
                };
                I.groupBy = O(function(e, a, t) {
                    I.has(e, t) ? e[t].push(a) : e[t] = [ a ];
                }), I.indexBy = O(function(e, a, t) {
                    e[t] = a;
                }), I.countBy = O(function(e, a, t) {
                    I.has(e, t) ? e[t]++ : e[t] = 1;
                }), I.toArray = function(e) {
                    return e ? I.isArray(e) ? k.call(e) : S(e) ? I.map(e, I.identity) : I.values(e) : [];
                }, I.size = function(e) {
                    return null == e ? 0 : S(e) ? e.length : I.keys(e).length;
                }, I.partition = function(e, a, t) {
                    a = q(a, t);
                    var n = [], d = [];
                    return I.each(e, function(e, t, l) {
                        (a(e, t, l) ? n : d).push(e);
                    }), [ n, d ];
                }, I.first = I.head = I.take = function(e, a, t) {
                    return null == e ? void 0 : null == a || t ? e[0] : I.initial(e, e.length - a);
                }, I.initial = function(e, t, n) {
                    return k.call(e, 0, a(0, e.length - (null == t || n ? 1 : t)));
                }, I.last = function(e, t, n) {
                    return null == e ? void 0 : null == t || n ? e[e.length - 1] : I.rest(e, a(0, e.length - t));
                }, I.rest = I.tail = I.drop = function(e, a, t) {
                    return k.call(e, null == a || t ? 1 : a);
                }, I.compact = function(e) {
                    return I.filter(e, I.identity);
                };
                var P = function e(a, t, n, d) {
                    for (var l, u = [], c = 0, r = d || 0, i = V(a); r < i; r++) if (l = a[r], S(l) && (I.isArray(l) || I.isArguments(l))) {
                        t || (l = e(l, t, n));
                        var o = 0, s = l.length;
                        for (u.length += s; o < s; ) u[c++] = l[o++];
                    } else n || (u[c++] = l);
                    return u;
                };
                I.flatten = function(e, a) {
                    return P(e, a, !1);
                }, I.without = function(e) {
                    return I.difference(e, k.call(arguments, 1));
                }, I.uniq = I.unique = function(e, a, t, n) {
                    I.isBoolean(a) || (n = t, t = a, a = !1), null != t && (t = q(t, n));
                    for (var d = [], l = [], u = 0, c = V(e); u < c; u++) {
                        var r = e[u], o = t ? t(r, u, e) : r;
                        a ? ((!u || l !== o) && d.push(r), l = o) : t ? !I.contains(l, o) && (l.push(o), 
                        d.push(r)) : !I.contains(d, r) && d.push(r);
                    }
                    return d;
                }, I.union = function() {
                    return I.uniq(P(arguments, !0, !0));
                }, I.intersection = function(e) {
                    for (var a, t = [], n = arguments.length, d = 0, l = V(e); d < l; d++) if (a = e[d], 
                    !I.contains(t, a)) {
                        for (var i = 1; i < n && !!I.contains(arguments[i], a); i++) ;
                        i === n && t.push(a);
                    }
                    return t;
                }, I.difference = function(e) {
                    var a = P(arguments, !0, !0, 1);
                    return I.filter(e, function(e) {
                        return !I.contains(a, e);
                    });
                }, I.zip = function() {
                    return I.unzip(arguments);
                }, I.unzip = function(e) {
                    for (var a = e && I.max(e, V).length || 0, t = Array(a), n = 0; n < a; n++) t[n] = I.pluck(e, n);
                    return t;
                }, I.object = function(e, a) {
                    for (var t = {}, n = 0, d = V(e); n < d; n++) a ? t[e[n]] = a[n] : t[e[n][0]] = e[n][1];
                    return t;
                }, I.findIndex = c(1), I.findLastIndex = c(-1), I.sortedIndex = function(e, a, t, n) {
                    t = q(t, n, 1);
                    for (var d = t(a), l = 0, i = V(e); l < i; ) {
                        var u = s((l + i) / 2);
                        t(e[u]) < d ? l = u + 1 : i = u;
                    }
                    return l;
                }, I.indexOf = r(1, I.findIndex, I.sortedIndex), I.lastIndexOf = r(-1, I.findLastIndex), 
                I.range = function(e, t, n) {
                    null == t && (t = e || 0, e = 0), n = n || 1;
                    for (var d = a(Math.ceil((t - e) / n), 0), l = Array(d), i = 0; i < d; i++, e += n) l[i] = e;
                    return l;
                };
                var C = function(e, a, t, n, d) {
                    if (!(n instanceof a)) return e.apply(t, d);
                    var l = j(e.prototype), i = e.apply(l, d);
                    return I.isObject(i) ? i : l;
                };
                I.bind = function(e, a) {
                    if (w && e.bind === w) return w.apply(e, k.call(arguments, 1));
                    if (!I.isFunction(e)) throw new TypeError("Bind must be called on a function");
                    var t = k.call(arguments, 2);
                    return function n() {
                        return C(e, n, a, this, t.concat(k.call(arguments)));
                    };
                }, I.partial = function(e) {
                    var a = k.call(arguments, 1);
                    return function t() {
                        for (var n = 0, d = a.length, l = Array(d), u = 0; u < d; u++) l[u] = a[u] === I ? arguments[n++] : a[u];
                        for (;n < arguments.length; ) l.push(arguments[n++]);
                        return C(e, t, this, this, l);
                    };
                }, I.bindAll = function(e) {
                    var a, t, n = arguments.length;
                    if (1 >= n) throw new Error("bindAll must be passed function names");
                    for (a = 1; a < n; a++) t = arguments[a], e[t] = I.bind(e[t], e);
                    return e;
                }, I.memoize = function(e, a) {
                    var t = function t(n) {
                        var d = t.cache, l = "" + (a ? a.apply(this, arguments) : n);
                        return I.has(d, l) || (d[l] = e.apply(this, arguments)), d[l];
                    };
                    return t.cache = {}, t;
                }, I.delay = function(e, a) {
                    var t = k.call(arguments, 2);
                    return setTimeout(function() {
                        return e.apply(null, t);
                    }, a);
                }, I.defer = I.partial(I.delay, I, 1), I.throttle = function(e, a, t) {
                    var n, d, l, i = null, u = 0;
                    t || (t = {});
                    var c = function() {
                        u = !1 === t.leading ? 0 : I.now(), i = null, l = e.apply(n, d), i || (n = d = null);
                    };
                    return function() {
                        var r = I.now();
                        u || !1 !== t.leading || (u = r);
                        var o = a - (r - u);
                        return n = this, d = arguments, 0 >= o || o > a ? (i && (clearTimeout(i), i = null), 
                        u = r, l = e.apply(n, d), !i && (n = d = null)) : !i && !1 !== t.trailing && (i = setTimeout(c, o)), 
                        l;
                    };
                }, I.debounce = function(e, a, t) {
                    var n, d, l, i, u, c = function c() {
                        var r = I.now() - i;
                        r < a && 0 <= r ? n = setTimeout(c, a - r) : (n = null, !t && (u = e.apply(l, d), 
                        !n && (l = d = null)));
                    };
                    return function() {
                        l = this, d = arguments, i = I.now();
                        var r = t && !n;
                        return n || (n = setTimeout(c, a)), r && (u = e.apply(l, d), l = d = null), u;
                    };
                }, I.wrap = function(e, a) {
                    return I.partial(a, e);
                }, I.negate = function(e) {
                    return function() {
                        return !e.apply(this, arguments);
                    };
                }, I.compose = function() {
                    var e = arguments, a = e.length - 1;
                    return function() {
                        for (var t = a, n = e[a].apply(this, arguments); t--; ) n = e[t].call(this, n);
                        return n;
                    };
                }, I.after = function(e, a) {
                    return function() {
                        if (1 > --e) return a.apply(this, arguments);
                    };
                }, I.before = function(e, a) {
                    var t;
                    return function() {
                        return 0 < --e && (t = a.apply(this, arguments)), 1 >= e && (a = null), t;
                    };
                }, I.once = I.partial(I.before, 2);
                var N = !{
                    toString: null
                }.propertyIsEnumerable("toString"), F = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
                I.keys = function(e) {
                    if (!I.isObject(e)) return [];
                    if (D) return D(e);
                    var a = [];
                    for (var t in e) I.has(e, t) && a.push(t);
                    return N && o(e, a), a;
                }, I.allKeys = function(e) {
                    if (!I.isObject(e)) return [];
                    var a = [];
                    for (var t in e) a.push(t);
                    return N && o(e, a), a;
                }, I.values = function(e) {
                    for (var a = I.keys(e), t = a.length, n = Array(t), d = 0; d < t; d++) n[d] = e[a[d]];
                    return n;
                }, I.mapObject = function(e, a, t) {
                    a = q(a, t);
                    for (var n, d = I.keys(e), l = d.length, i = {}, u = 0; u < l; u++) n = d[u], i[n] = a(e[n], n, e);
                    return i;
                }, I.pairs = function(e) {
                    for (var a = I.keys(e), t = a.length, n = Array(t), d = 0; d < t; d++) n[d] = [ a[d], e[a[d]] ];
                    return n;
                }, I.invert = function(e) {
                    for (var a = {}, t = I.keys(e), n = 0, d = t.length; n < d; n++) a[e[t[n]]] = t[n];
                    return a;
                }, I.functions = I.methods = function(e) {
                    var a = [];
                    for (var t in e) I.isFunction(e[t]) && a.push(t);
                    return a.sort();
                }, I.extend = E(I.allKeys), I.extendOwn = I.assign = E(I.keys), I.findKey = function(e, a, t) {
                    a = q(a, t);
                    for (var n, d = I.keys(e), l = 0, i = d.length; l < i; l++) if (n = d[l], a(e[n], n, e)) return n;
                }, I.pick = function(e, a, t) {
                    var n, d, l = {}, u = e;
                    if (null == u) return l;
                    I.isFunction(a) ? (d = I.allKeys(u), n = _(a, t)) : (d = P(arguments, !1, !1, 1), 
                    n = function(e, a, t) {
                        return a in t;
                    }, u = Object(u));
                    for (var c = 0, i = d.length; c < i; c++) {
                        var r = d[c], o = u[r];
                        n(o, r, u) && (l[r] = o);
                    }
                    return l;
                }, I.omit = function(e, a, t) {
                    if (I.isFunction(a)) a = I.negate(a); else {
                        var n = I.map(P(arguments, !1, !1, 1), String);
                        a = function(e, a) {
                            return !I.contains(n, a);
                        };
                    }
                    return I.pick(e, a, t);
                }, I.defaults = E(I.allKeys, !0), I.create = function(e, a) {
                    var t = j(e);
                    return a && I.extendOwn(t, a), t;
                }, I.clone = function(e) {
                    return I.isObject(e) ? I.isArray(e) ? e.slice() : I.extend({}, e) : e;
                }, I.tap = function(e, a) {
                    return a(e), e;
                }, I.isMatch = function(e, a) {
                    var t = I.keys(a), n = t.length;
                    if (null == e) return !n;
                    for (var d, l = Object(e), u = 0; u < n; u++) if (d = t[u], a[d] !== l[d] || !(d in l)) return !1;
                    return !0;
                };
                var B = function e(n, d, l, i) {
                    if (n === d) return 0 !== n || 1 / n == 1 / d;
                    if (null == n || null == d) return n === d;
                    n instanceof I && (n = n._wrapped), d instanceof I && (d = d._wrapped);
                    var u = v.call(n);
                    if (u !== v.call(d)) return !1;
                    switch (u) {
                      case "[object RegExp]":
                      case "[object String]":
                        return "" + n == "" + d;

                      case "[object Number]":
                        return +n == +n ? 0 == +n ? 1 / +n == 1 / d : +n == +d : +d != +d;

                      case "[object Date]":
                      case "[object Boolean]":
                        return +n == +d;
                    }
                    var c = "[object Array]" === u;
                    if (!c) {
                        if ("object" != ("undefined" == typeof n ? "undefined" : t(n)) || "object" != ("undefined" == typeof d ? "undefined" : t(d))) return !1;
                        var r = n.constructor, o = d.constructor;
                        if (r !== o && !(I.isFunction(r) && r instanceof r && I.isFunction(o) && o instanceof o) && "constructor" in n && "constructor" in d) return !1;
                    }
                    l = l || [], i = i || [];
                    for (var s = l.length; s--; ) if (l[s] === n) return i[s] === d;
                    if (l.push(n), i.push(d), c) {
                        if (s = n.length, s !== d.length) return !1;
                        for (;s--; ) if (!e(n[s], d[s], l, i)) return !1;
                    } else {
                        var p, f = I.keys(n);
                        if (s = f.length, I.keys(d).length !== s) return !1;
                        for (;s--; ) if (p = f[s], !(I.has(d, p) && e(n[p], d[p], l, i))) return !1;
                    }
                    return l.pop(), i.pop(), !0;
                };
                I.isEqual = function(e, a) {
                    return B(e, a);
                }, I.isEmpty = function(e) {
                    return !(null != e) || (S(e) && (I.isArray(e) || I.isString(e) || I.isArguments(e)) ? 0 === e.length : 0 === I.keys(e).length);
                }, I.isElement = function(e) {
                    return !!(e && 1 === e.nodeType);
                }, I.isArray = b || function(e) {
                    return "[object Array]" === v.call(e);
                }, I.isObject = function(e) {
                    var a = "undefined" == typeof e ? "undefined" : t(e);
                    return "function" === a || "object" === a && !!e;
                }, I.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(e) {
                    I["is" + e] = function(a) {
                        return v.call(a) === "[object " + e + "]";
                    };
                }), I.isArguments(arguments) || (I.isArguments = function(e) {
                    return I.has(e, "callee");
                }), "function" != typeof /./ && "object" != ("undefined" == typeof Int8Array ? "undefined" : t(Int8Array)) && (I.isFunction = function(e) {
                    return "function" == typeof e || !1;
                }), I.isFinite = function(e) {
                    return isFinite(e) && !isNaN(parseFloat(e));
                }, I.isNaN = function(e) {
                    return I.isNumber(e) && e !== +e;
                }, I.isBoolean = function(e) {
                    return !0 === e || !1 === e || "[object Boolean]" === v.call(e);
                }, I.isNull = function(e) {
                    return null === e;
                }, I.isUndefined = function(e) {
                    return void 0 === e;
                }, I.has = function(e, a) {
                    return null != e && x.call(e, a);
                }, I.noConflict = function() {
                    return p._ = f, this;
                }, I.identity = function(e) {
                    return e;
                }, I.constant = function(e) {
                    return function() {
                        return e;
                    };
                }, I.noop = function() {}, I.property = L, I.propertyOf = function(e) {
                    return null == e ? function() {} : function(a) {
                        return e[a];
                    };
                }, I.matcher = I.matches = function(e) {
                    return e = I.extendOwn({}, e), function(a) {
                        return I.isMatch(a, e);
                    };
                }, I.times = function(e, t, n) {
                    var d = Array(a(0, e));
                    t = _(t, n, 1);
                    for (var l = 0; l < e; l++) d[l] = t(l);
                    return d;
                }, I.random = function(e, a) {
                    return null == a && (a = e, e = 0), e + s(Math.random() * (a - e + 1));
                }, I.now = Date.now || function() {
                    return new Date().getTime();
                };
                var R = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, U = I.invert(R), H = function(e) {
                    var a = function(a) {
                        return e[a];
                    }, t = "(?:" + I.keys(e).join("|") + ")", n = RegExp(t), d = RegExp(t, "g");
                    return function(e) {
                        return e = null == e ? "" : "" + e, n.test(e) ? e.replace(d, a) : e;
                    };
                };
                I.escape = H(R), I.unescape = H(U), I.result = function(e, a, t) {
                    var n = null == e ? void 0 : e[a];
                    return void 0 === n && (n = t), I.isFunction(n) ? n.call(e) : n;
                };
                var T = 0;
                I.uniqueId = function(e) {
                    var a = ++T + "";
                    return e ? e + a : a;
                }, I.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var K = /(.)^/, G = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, z = /\\|'|\r|\n|\u2028|\u2029/g, W = function(e) {
                    return "\\" + G[e];
                };
                I.template = function(e, a, t) {
                    !a && t && (a = t), a = I.defaults({}, a, I.templateSettings);
                    var n = RegExp([ (a.escape || K).source, (a.interpolate || K).source, (a.evaluate || K).source ].join("|") + "|$", "g"), d = 0, l = "__p+='";
                    e.replace(n, function(a, t, n, i, u) {
                        return l += e.slice(d, u).replace(z, W), d = u + a.length, t ? l += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'" : n ? l += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : i && (l += "';\n" + i + "\n__p+='"), 
                        a;
                    }), l += "';\n", a.variable || (l = "with(obj||{}){\n" + l + "}\n"), l = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + l + "return __p;\n";
                    try {
                        var i = new Function(a.variable || "obj", "_", l);
                    } catch (a) {
                        throw a.source = l, a;
                    }
                    var u = function(e) {
                        return i.call(this, e, I);
                    }, c = a.variable || "obj";
                    return u.source = "function(" + c + "){\n" + l + "}", u;
                }, I.chain = function(e) {
                    var a = I(e);
                    return a._chain = !0, a;
                };
                var Q = function(e, a) {
                    return e._chain ? I(a).chain() : a;
                };
                I.mixin = function(e) {
                    I.each(I.functions(e), function(a) {
                        var t = I[a] = e[a];
                        I.prototype[a] = function() {
                            var e = [ this._wrapped ];
                            return g.apply(e, arguments), Q(this, t.apply(I, e));
                        };
                    });
                }, I.mixin(I), I.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
                    var a = y[e];
                    I.prototype[e] = function() {
                        var t = this._wrapped;
                        return a.apply(t, arguments), ("shift" === e || "splice" === e) && 0 === t.length && delete t[0], 
                        Q(this, t);
                    };
                }), I.each([ "concat", "join", "slice" ], function(e) {
                    var a = y[e];
                    I.prototype[e] = function() {
                        return Q(this, a.apply(this._wrapped, arguments));
                    };
                }), I.prototype.value = function() {
                    return this._wrapped;
                }, I.prototype.valueOf = I.prototype.toJSON = I.prototype.value, I.prototype.toString = function() {
                    return "" + this._wrapped;
                }, l = [], i = function() {
                    return I;
                }.apply(d, l), !(i !== void 0 && (n.exports = i));
            }).call(this);
        }, function(e, a, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function d(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            function l(e, a) {
                var t = e.slice(0, 2);
                return "if" === t && (t = "indexfuture"), "minute" === a ? ("wh" === t && (e = e.replace(/wh|USD/g, "")), 
                [ p, t, a, e + ".js" ].join("/")) : "day" === a ? [ p, t, "latest", "daily", e + ".js" ].join("/") + "?r=" + Math.random() : "week" === a || "month" === a ? [ p, t, "latest", a + "ly", e + ".js" ].join("/") + "?r=" + Math.random() : void 0;
            }
            function i(e) {
                var a;
                switch (e) {
                  case "minute":
                    return "min_data";

                  case "day":
                    a = "daily";
                    break;

                  case "week":
                  case "month":
                    a = e + "ly";
                    break;

                  default:
                    throw new s.default("Invalid type ", "Params", -101);
                }
                return [ "latest", a, "data" ].join("_");
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.DATA = void 0;
            var u = function() {
                function e(e, a) {
                    for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                    t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                }
                return function(a, t, n) {
                    return t && e(a.prototype, t), n && e(a, n), a;
                };
            }(), c = t(4), r = n(c), o = t(5), s = n(o), p = "http://data.gtimg.cn/flashdata", f = a.DATA = function() {
                function e() {
                    d(this, e);
                }
                return u(e, null, [ {
                    key: "getData",
                    value: function(e) {
                        var a = e.code, t = e.type, n = i(t), d = l(a, t);
                        return new Promise(function(e, a) {
                            (0, r.default)(n, d, function(t) {
                                t ? e(t) : a(new s.default("Fetch Error: cannot get valid data", "Data", -201));
                            });
                        });
                    }
                } ]), e;
            }();
            a.default = f;
        }, function(e, a) {
            "use strict";
            function t(e, a, t) {
                var n = /loaded|complete|undefined/, d = document.getElementsByTagName("head")[0], l = document.createElement("script");
                l.onload = l.onerror = l.onreadystatechange = function() {
                    n.test(l.readyState) && (l.onload = l.onerror = l.onreadystatechange = null, d.removeChild(l), 
                    l = void 0, window[e] ? (t(window[e]), window[e] = null) : t(void 0));
                }, l.src = a, l.async = !0, l.id = e, d.appendChild(l);
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.get = t;
            a.default = t;
        }, function(e, a) {
            "use strict";
            function t(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            });
            var n = a.AppError = function e(a, n, d) {
                t(this, e), this.message = a || "", this.name = n, this.code = d;
            };
            a.default = n;
        }, function(e, a, n) {
            (function(e) {
                "use strict";
                function d(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function l(e, a, t) {
                    return a in e ? Object.defineProperty(e, a, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[a] = t, e;
                }
                function i(e, a) {
                    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
                }
                function u(e) {
                    var a = e.code, t = e.type, n = e.fq, d = e.handler;
                    n = n || "";
                    var l = "", i = a.slice(0, 2);
                    if (t.match(/minute/)) return l = "minute", "hk" === i ? l = "hkMinute" : "us" === i && (l = "UsMinute"), 
                    [ h, l, "/query?_var=", d, "&code=", a, "&r=", Math.random() ].join("");
                    if (t.match(/fdays/)) return l = "us" === i ? "dayus" : "day", [ h, l, "/query?_var=", d, "&code=", a, "&r=", Math.random() ].join("");
                    if (t.match(/^day|week|month/)) {
                        var u = e.to_date, c = e.latest_date, r = [ a, t, c || "", u || "", y, n ].join(",");
                        return n ? [ h, i.match(/us|hk/) ? i : "", "fqkline/get?_var=", d, "&param=", r, "&r=", Math.random() ].join("") : [ h, "kline/kline?_var=", d, "&param=", r, "&r=", Math.random() ].join("");
                    }
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.IFZQ = void 0;
                var c = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
                    return "undefined" == typeof e ? "undefined" : t(e);
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : "undefined" == typeof e ? "undefined" : t(e);
                }, r = function() {
                    function e(e, a) {
                        for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                        t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                    }
                    return function(a, t, n) {
                        return t && e(a.prototype, t), n && e(a, n), a;
                    };
                }(), o = n(4), s = d(o), p = n(5), f = d(p), y = 320, h = "http://web.ifzq.gtimg.cn/appstock/app/", _ = a.IFZQ = function() {
                    function a() {
                        i(this, a);
                    }
                    return r(a, null, [ {
                        key: "getData",
                        value: function(a) {
                            if (a.to_date) return this.getHistory(a);
                            var t = a.code, n = a.type, d = a.fq, l = a.lastest_date, i = (t + "_" + n + (d || "")).replace(/\./g, ""), c = u(e.extend({}, a, {
                                handler: i
                            }));
                            return new Promise(function(e, a) {
                                (0, s.default)(i, c, function(t) {
                                    t && !t.code ? e(t.data) : t ? a(new f.default("Data Error:" + t.code + "," + t.msg, "Data", -200)) : a(new f.default("Fetch Error: cannot get valid data", "Data", -201));
                                });
                            });
                        }
                    }, {
                        key: "getHistory",
                        value: function(a) {
                            var t = this, n = a.code, d = a.type, i = a.fq, r = a.from_date, o = (n + "_" + d + i).replace(/\./g, ""), p = u(e.extend({}, a, {
                                handler: o
                            }));
                            return new Promise(function(u, h) {
                                (0, s.default)(o, p, function(o) {
                                    if (o && !o.code) {
                                        var s = function() {
                                            o = o.data;
                                            var c = o[n], s = c[d] || c[i + d];
                                            if (s.length < y) c = e.extend(c, {
                                                noMore: !0
                                            }), u(o, l({}, n, c)); else if (!r || s.length && s[0][0] <= r) u(o); else return {
                                                v: t.getHistory(e.extend({}, a, {
                                                    to_date: s[0][0]
                                                })).then(function(a) {
                                                    var t, r = a[n], o = r[d] ? d : i + d, p = r[o], f = p.slice(0, p.length - 1).concat(s);
                                                    c = e.extend(c, (t = {}, l(t, o, f), l(t, "prec", r.prec), t)), u(e.extend(a, l({}, n, c)));
                                                })
                                            };
                                        }();
                                        if ("object" === ("undefined" == typeof s ? "undefined" : c(s))) return s.v;
                                    } else data ? h(new f.default("Data Error:" + data.code + "," + data.msg, "Data", -200)) : h(new f.default("Fetch Error: cannot get valid data", "Data", -201));
                                });
                            });
                        }
                    } ]), a;
                }();
                a.default = _;
            }).call(a, n(2));
        }, function(e, a, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function d(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            function l(e) {
                return s + "q=" + e;
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.QT = void 0;
            var i = function() {
                function e(e, a) {
                    for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                    t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                }
                return function(a, t, n) {
                    return t && e(a.prototype, t), n && e(a, n), a;
                };
            }(), u = t(4), c = n(u), r = t(5), o = n(r), s = "http://web.sqt.gtimg.cn/", p = a.QT = function() {
                function e() {
                    d(this, e);
                }
                return i(e, null, [ {
                    key: "getData",
                    value: function(e) {
                        var a = e.code, t = "v_" + a, n = l(a);
                        return "hk" === a.slice(0, 2) && (t = "v_r_" + a, n = l("r_" + a)), new Promise(function(e, a) {
                            (0, c.default)(t, n, function(t) {
                                t ? e(t) : a(new o.default("Fetch Error: cannot get valid data", "Data", -201));
                            });
                        });
                    }
                } ]), e;
            }();
            a.default = p;
        }, function(e, a, t) {
            (function(e) {
                "use strict";
                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function d(e) {
                    return e.match(/^day|week|month/);
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.default = function(a) {
                    if (!e.has(a, "code", "type")) throw new r.default("Missing parameters:code or type", "Params", -100);
                    switch (d(a.type) && e.defaults(a, {
                        fq: "qfq"
                    }), a.type) {
                      case "day":
                      case "week":
                      case "month":
                        return new i.default(a);

                      case "minute":
                        return new u.Minute(a);

                      case "fdays":
                        return new u.Fdays(a);

                      default:
                        throw new r.default("invalid type", "Params", "300");
                    }
                };
                var l = t(9), i = n(l), u = t(10), c = t(5), r = n(c);
            }).call(a, t(2));
        }, function(n, d, l) {
            (function(n) {
                "use strict";
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function u(e) {
                    if (Array.isArray(e)) {
                        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
                        return t;
                    }
                    return Array.from(e);
                }
                function c(e, a) {
                    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
                }
                function r(e, a, t) {
                    return a in e ? Object.defineProperty(e, a, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[a] = t, e;
                }
                function o(e) {
                    return "string" == typeof e && (e = e.split(" ")), n.chain(e).map(function(e, a) {
                        return a ? +e : e;
                    }).value();
                }
                function s(e, a) {
                    var t = e[2] - e[1];
                    return t ? t : "object" === ("undefined" == typeof a ? "undefined" : L(a)) ? e[2] - a[2] : e[2] - a;
                }
                function p(e, a) {
                    return isNaN(a) ? e : e + a;
                }
                function f(e) {
                    return function(a, t, n) {
                        return t >= e ? (a - n[t - e]) / e : void 0;
                    };
                }
                function y(e) {
                    var a = /ma([0-9]*)/;
                    return function(t, d, l) {
                        return d = d || 0, l = l || t && t.length, n.map(e, function(e) {
                            var i = e.match(a)[1], u = f(i), c = 0 > d - i ? 0 : d - i, r = l;
                            return n.chain(t).filter(function(e, a) {
                                return a >= c && a < r;
                            }).map(u).rest(d - c).value();
                        });
                    };
                }
                function h(e) {
                    var a = e.start, t = e.end;
                    return function e(d) {
                        return "object" === ("undefined" == typeof d ? "undefined" : L(d)) ? n.isArray(d) ? d.slice(a, t) : n.object(n.keys(d), n.map(d, e)) : d;
                    };
                }
                function _(e, a) {
                    var t, n;
                    return a.INTERVAL ? (t = a.INTERVAL.start, n = a.INTERVAL.end) : (t = e - (a.VIEW_LEN || e), 
                    0 > t && (t = 0), n = e), {
                        start: t,
                        end: n
                    };
                }
                function m(e) {
                    var a = "max" === e ? function(e, a) {
                        return e >= a;
                    } : function(e, a) {
                        return e < a;
                    };
                    return function() {
                        for (var e = arguments.length, t = Array(e), d = 0; d < e; d++) t[d] = arguments[d];
                        return n.chain(t).flatten().filter(function(e) {
                            return !isNaN(e);
                        }).reduce(function(e, t) {
                            return a(e, t) ? e : t;
                        }).value();
                    };
                }
                function g(e, a) {
                    var t = e[a.code], d = (0, N.default)(t);
                    return n.extend(e, d, {
                        market_status: e.market_status || e.market
                    });
                }
                function k(e) {
                    return e;
                }
                function v(e, a) {
                    return e.timeStamp > a.timeStamp;
                }
                function x(e, a) {
                    return !e || e < a;
                }
                function b(t, d, l) {
                    var i = d.market_symbol, u = d.date, c = d.open, r = d.close, o = d.price, s = d.high, p = d.low, f = d.volume, y = t.data, h = t.length, _ = t.prev_volume, m = t.prec, g = n.last(y), k = g && g[0].replace(/-| /g, ""), v = u, b = [ v, c, o, s, p, f ];
                    x(k, v) ? (y = y.concat([ b ]), _ = 0) : ("day" !== l && (b = y[h - 1], b[2] = o, 
                    b[3] = a(s, b[3]), b[4] = e(p, b[4])), b[5] = _ + f, y[h - 1] = b), h = y.length;
                    var w = y[h - 2], A = y[h - 1];
                    A = D(A, w, m), y[h - 1] = A;
                    var M = n.zip.apply(n, y), I = j(M, 9), q = I[0], E = I[1], L = I[2], V = I[3], S = I[4], O = I[5], P = I[6], C = I[7], N = I[8];
                    return n.extend({}, t, {
                        data: y,
                        OP: E,
                        CL: L,
                        HIGH: V,
                        LOW: S,
                        VOL: O,
                        DIFF: P,
                        __price_sum: C,
                        __vol_sum: N,
                        length: h
                    });
                }
                function D(e, a, t) {
                    var n = s(e, a || t), d = p(e[2], a && a[7]), l = p(e[5], a && a[8]), i = e[0];
                    return e[0] = i.match(/-/) ? i : [ i.slice(0, 4), i.slice(4, 6), i.slice(6, 8) ].join("-"), 
                    e.slice(0, 6).concat([ n, d, l ]);
                }
                function w(e) {
                    var a, t, d = +(e.prec || e.data.length && e.data[0][1]), l = n.map(e.data, function(e) {
                        var a = o(e);
                        return t = D(a, t, d), t;
                    }), i = n.zip.apply(n, l), u = j(i, 9), c = u[0], s = u[1], p = u[2], f = u[3], y = u[4], h = u[5], _ = u[6], m = u[7], g = u[8];
                    return n.extend(e, (a = {
                        data: l,
                        prec: d,
                        OP: s,
                        CL: p,
                        HIGH: f,
                        LOW: y,
                        VOL: h,
                        DIFF: _,
                        __price_sum: m,
                        __vol_sum: g
                    }, r(a, "prec", d), r(a, "length", l.length), a));
                }
                function A(e) {
                    return m("max")(e);
                }
                function M(e) {
                    return m("min")(e);
                }
                function I(e) {
                    switch (e) {
                      case "macd":
                        return function(e) {
                            var a = e.CL;
                            return B.default.MACD(a);
                        };

                      case "boll":
                        return function(e) {
                            var a = e.CL;
                            return B.default.BOLL(a);
                        };

                      case "dmi":
                        return function(e) {
                            var a = e.CL, t = e.LOW, n = e.HIGH;
                            return B.default.DMI(n, t, a);
                        };

                      case "kdj":
                        return function(e) {
                            var a = e.CL, t = e.LOW, n = e.HIGH;
                            return B.default.KDJ(a, t, n);
                        };

                      case "obv":
                        return function(e) {
                            var a = e.CL, t = e.VOL;
                            return B.default.OBV(a, t);
                        };

                      case "rsi":
                        return function(e) {
                            var a = e.CL;
                            return B.default.RSI(a);
                        };

                      case "wr":
                        return function(e) {
                            var a = e.CL, t = e.LOW, n = e.HIGH;
                            return B.default.WR(a, t, n);
                        };

                      case "sar":
                        return function(e) {
                            var a = e.HIGH, t = e.LOW;
                            return B.default.SAR(a, t);
                        };

                      default:
                        throw new S.default("invalid kline index type", "Params", "400");
                        return {};
                    }
                }
                function q(e, a) {
                    return (!a.code || a.code === e.code) && (!a.type || a.type === e.type) && (!a.fq || a.fq === e.fq);
                }
                Object.defineProperty(d, "__esModule", {
                    value: !0
                });
                var E = function() {
                    function e(e, a) {
                        for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                        t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                    }
                    return function(a, t, n) {
                        return t && e(a.prototype, t), n && e(a, n), a;
                    };
                }(), j = function() {
                    function e(e, a) {
                        var t, n = [], d = !0, l = !1;
                        try {
                            for (var i, u = e[Symbol.iterator](); !(d = (i = u.next()).done) && (n.push(i.value), 
                            !(a && n.length === a)); d = !0) ;
                        } catch (e) {
                            l = !0, t = e;
                        } finally {
                            try {
                                !d && u["return"] && u["return"]();
                            } finally {
                                if (l) throw t;
                            }
                        }
                        return n;
                    }
                    return function(a, t) {
                        if (Array.isArray(a)) return a;
                        if (Symbol.iterator in Object(a)) return e(a, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    };
                }(), L = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
                    return "undefined" == typeof e ? "undefined" : t(e);
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : "undefined" == typeof e ? "undefined" : t(e);
                }, V = l(5), S = i(V), O = l(11), P = i(O), C = l(12), N = i(C), F = l(14), B = i(F), R = function() {
                    function e(a) {
                        c(this, e), this.cfg = a, this.raw_data = a.raw_data;
                    }
                    return E(e, [ {
                        key: "initialize",
                        value: function(e) {
                            if (this.cfg = n.extend(this.cfg, e), this.raw_data = this.cfg.raw_data, !this.raw_data) throw new S.default("No data to calculate", "Params", "101");
                            return this.data = this.calFirstData(this.raw_data), (0, P.default)("first_data", this.data), 
                            this.data;
                        }
                    }, {
                        key: "calFirstData",
                        value: function(e) {
                            var a = this.formatRawData, t = this.calculateBasicData, d = this.calculateIndex, l = this.cutOutViewData, i = n.compose(l, d, t, a);
                            return i.call(this, e);
                        }
                    }, {
                        key: "formatRawData",
                        value: function(e) {
                            e = n.values(e)[0];
                            var a = this.cfg, t = a.type, d = a.fq, l = e, i = l.qt, u = l.prec, c = l.version, r = k(e[t] || e[d + t]), o = g(i, a);
                            return r = {
                                data: r,
                                prec: u
                            }, {
                                day_data: r,
                                qt_data: o,
                                version: c
                            };
                        }
                    }, {
                        key: "calculateBasicData",
                        value: function(e) {
                            var a = e.day_data, t = e.qt_data;
                            a = w(a);
                            var d = a.length ? n.last(a.VOL) - t.volume : 0;
                            return a = n.extend(a, {
                                prev_volume: d
                            }), n.extend(e, {
                                day_data: a
                            });
                        }
                    }, {
                        key: "calculateIndex",
                        value: function(e) {
                            var a = e.day_data, t = this.cfg, d = t.INDEX_CFG, l = n.chain(d).map(I).map(function(e) {
                                return e(a);
                            }).value(), i = n.object(d, l);
                            return a = n.extend(a, {
                                index: i
                            }), n.extend(e, {
                                day_data: a
                            });
                        }
                    }, {
                        key: "calculateUserMa",
                        value: function(e, a) {
                            var t = this.cfg, d = t.MA_CFG;
                            if (!d) return {};
                            var l = a.start, i = a.end, u = e.__price_sum, c = e.__vol_sum, r = n.map(d, function(e) {
                                return "v" + e;
                            }), o = y(d)(u, l, i), s = y(r)(c, l, i), p = n.object(d, o), f = n.object(r, s);
                            return {
                                index_ma: p,
                                index_vma: f
                            };
                        }
                    }, {
                        key: "cutOutViewData",
                        value: function(e) {
                            var a, t, d, l = this.cfg, i = e.day_data, u = _(i.length, l), c = h(u), r = 0 < u.start ? i.CL[u.start - 1] : i.prec, o = this.calculateUserMa(i, u), s = [ "data", "OP", "CL", "HIGH", "LOW", "VOL", "DIFF", "index" ], p = n.chain(i).pick(s).map(c).value(), f = n.object(s, p);
                            if (f = n.extend(f, o), 0 < f.data.length) {
                                var y = f, m = y.HIGH, g = y.LOW, k = y.VOL, v = y.index_ma, x = y.index_vma;
                                a = A(m.concat(n.flatten(n.values(v)))), t = M(g.concat(n.flatten(n.values(v)))), 
                                d = A(k.concat(n.flatten(n.values(x))));
                            }
                            return f = n.extend(f, {
                                INTERVAL: u,
                                max_price: a,
                                min_price: t,
                                max_vol: d,
                                prec: r,
                                length: f.data.length
                            }), n.extend(e, {
                                view_data: f
                            });
                        }
                    }, {
                        key: "checkDiffKeys",
                        value: function(e) {
                            var a = this.cfg, t = e;
                            if (!q(a, t)) throw new S.default("cannot update: data out of date", "unKnown", 401);
                            return n.chain(e).keys().filter(function(e) {
                                return !n.isEqual(a[e], t[e]);
                            }).value();
                        }
                    }, {
                        key: "checkNeedUpdate",
                        value: function(e) {
                            return n.has(e, "data") ? this.updateData : n.has(e, "history_data") ? this.updateHistory : n.has(e, "latest_data") ? this.updateLatest : n.has(e, "INDEX_CFG") ? this.updateIndex : n.has(e, "qt") ? this.updateQT : n.has(e, "INTERVAL") || n.has(e, "VIEW_LEN") || n.has(e, "MA_CFG") ? this.updateViewData : void 0;
                        }
                    }, {
                        key: "update",
                        value: function(e) {
                            var a, t = this.checkDiffKeys(e), d = (a = n).pick.apply(a, [ e ].concat(u(t))), l = this.checkNeedUpdate(d);
                            return l ? (this.cfg = n.extend(this.cfg, e), this.data = l.call(this), (0, P.default)("update_data_" + t.toString(), this.data), 
                            this.data) : this.data;
                        }
                    }, {
                        key: "updateViewData",
                        value: function() {
                            return this.cutOutViewData(this.data);
                        }
                    }, {
                        key: "updateIndex",
                        value: function() {
                            var e = this.calculateIndex, a = this.cutOutViewData, t = n.compose(a, e);
                            return t.call(this, this.data);
                        }
                    }, {
                        key: "updateData",
                        value: function() {
                            var e = this.cfg.data, a = this.concatData(e, this.data);
                            return this.initialize({
                                raw_data: a
                            });
                        }
                    }, {
                        key: "updateHistory",
                        value: function() {
                            var e = this.cfg.history_data;
                            if (!e) return this.data;
                            var a = this.concatData(e, this.data);
                            return this.initialize({
                                raw_data: a
                            });
                        }
                    }, {
                        key: "updateLatest",
                        value: function() {
                            var e = this.cfg.latest_data;
                            if (!e) return this.data;
                            var a = this.concatData(this.data, e);
                            return this.initialize({
                                raw_data: a
                            });
                        }
                    }, {
                        key: "concatData",
                        value: function(e, a) {
                            var t, d = this.cfg, l = d.code, i = d.fq, u = d.type, c = e.day_data ? a : e, o = c[l][u] ? u : i + u, s = c[l][o], p = e.day_data ? e.day_data.data : s, f = a.day_data ? a.day_data.data : s;
                            if (p.length && f.length && p[0][0] > f[0][0]) {
                                var y = p;
                                p = f, f = y, y = e, e = a, a = y;
                            }
                            var h = p.length ? e.day_data ? e.day_data.prec : e[l].prec : a.day_data ? a.day_data.prec : a[l].prec, _ = p.length && f.length ? n.chain(p).pluck(0).indexOf(f[0][0]).value() : p.length, m = p.slice(0, _).concat(f);
                            return c = n.extend(c[l], (t = {}, r(t, o, m), r(t, "prec", h), t)), n.extend({}, r({}, l, c));
                        }
                    }, {
                        key: "updateQT",
                        value: function() {
                            var e = this.updateBasicData, a = this.cutOutViewData, t = this.updateQTData(), d = t.qt_data, l = t.day_data, i = d.hasChange, u = d.status;
                            if (!i || "D" === u) return this.data;
                            var c = n.compose(a, e);
                            return c.call(this);
                        }
                    }, {
                        key: "updateQTData",
                        value: function() {
                            var e = this.data, a = this.cfg, t = e.qt_data, d = a.qt;
                            if (!d) return t = n.extend(t, {
                                hasChange: !1
                            }), n.extend(this.data, {
                                qt_data: t
                            });
                            var l = (0, N.default)(d), i = v(l, e.qt_data);
                            return t = n.extend(t, l, {
                                hasChange: i
                            }), n.extend(e, {
                                qt_data: t
                            });
                        }
                    }, {
                        key: "updateBasicData",
                        value: function() {
                            var e = this.data, a = e.qt_data, t = e.day_data;
                            return t = b(t, a, this.cfg.type), n.extend(e, {
                                day_data: t
                            });
                        }
                    } ]), e;
                }();
                d.default = R;
            }).call(d, l(2));
        }, function(e, a, t) {
            (function(e) {
                "use strict";
                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function d(e) {
                    if (Array.isArray(e)) {
                        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
                        return t;
                    }
                    return Array.from(e);
                }
                function l(e, a) {
                    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
                }
                function i(a) {
                    return "string" == typeof a && (a = a.split(" ")), e.chain(a).map(function(e, a) {
                        return a ? +e : e;
                    }).value();
                }
                function u(a, t) {
                    return a[1] - (e.isArray(t) ? t[1] : t);
                }
                function c(e, a) {
                    return e[2] - (a ? a[2] : 0);
                }
                function r(e, a) {
                    return a && e[2] ? (a[2] * a[5] + e[1] * e[4]) / e[2] : e[1];
                }
                function o(a) {
                    for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), d = 1; d < t; d++) n[d - 1] = arguments[d];
                    return e.chain(a).pick(n).values().value();
                }
                function s(a) {
                    var t = "max" === a ? function(e, a) {
                        return e >= a;
                    } : function(e, a) {
                        return e < a;
                    };
                    return function() {
                        for (var a = arguments.length, n = Array(a), d = 0; d < a; d++) n[d] = arguments[d];
                        return e.chain(n).flatten().filter(function(e) {
                            return !isNaN(e);
                        }).reduce(function(e, a) {
                            return t(e, a) ? e : a;
                        }).value();
                    };
                }
                function p(e) {
                    return s("max")(e);
                }
                function f(e) {
                    return s("min")(e);
                }
                function y(a, t) {
                    var n = a[t.code], d = (0, P.default)(n);
                    return e.extend(a, d, {
                        market_status: a.market_status || a.market
                    });
                }
                function h(e) {
                    return e;
                }
                function _(e) {
                    return e;
                }
                function m(e, a, t) {
                    var n, d = u(e, a || t), l = c(e, a);
                    return e = e.slice(0, 3).concat([ d, l ]), n = r(e, a), e.concat(n);
                }
                function g(a, t) {
                    var n;
                    t = +(a.prec || t), "" === e.last(a.data) && a.data.pop();
                    var d = e.map(a.data, function(e) {
                        var a = i(e);
                        return n = m(a, n, t), n;
                    }), l = e.zip.apply(e, d), u = E(l, 6), c = u[1], r = u[3], o = u[4], s = u[5];
                    return e.extend({}, a, {
                        prec: t,
                        data: d,
                        PRICE: c,
                        DIFF: r,
                        VOL: o,
                        AVG: s,
                        length: d.length
                    });
                }
                function k(e) {
                    return {
                        sh: [ "0930", "1130", "1300", "1500" ],
                        sz: [ "0930", "1130", "1300", "1500" ],
                        nq: [ "0930", "1130", "1300", "1500" ],
                        hk: [ "0930", "1200", "1300", "1600" ],
                        us: [ "0930", "1600" ]
                    }[e];
                }
                function v(a) {
                    var t = a.market_symbol, n = a.time, d = k(t), l = e.last(d);
                    return "hk" === t ? n : n > l ? l : 2 < d.length && n > d[1] && n < d[2] ? d[1] : n;
                }
                function x(e, a, t) {
                    var n = parseInt(e.substr(0, 2), 10), d = parseInt(e.substr(2), 10) + 1;
                    60 <= d && (n++, d %= 60);
                    var l = (10 > n ? "0" : "") + n + (10 > d ? "0" : "") + d;
                    return 4 == a.length && l > a[1] && l < a[2] && t ? a[2] : l;
                }
                function b(e, a) {
                    return e.timeStamp > a.timeStamp;
                }
                function D(a) {
                    var t = a.market_symbol, n = a.time, d = a.price, l = a.open, i = a.close, u = a.date, c = k(t), r = e.first(c);
                    return g({
                        data: [ [ r, d || l || i, 0 ] ],
                        date: u
                    }, i);
                }
                function w(a, t) {
                    var n = t.market_symbol, d = t.date, l = a.date, i = v(t), u = k(n), c = e.first(u), r = e.last(u), o = e.last(a.data)[0];
                    if (i > o && i > c) for (var s = e.last(a.data), p = s[0], f = "hk" !== n || i >= u[2]; p < i && p < r; ) {
                        var y = x(p, u, f), h = s[1], _ = s[2];
                        s = m([ y, h, _ ], s), a.data = a.data.concat([ s ]), p = s[0];
                    }
                    var g = a.data.length, b = a.data[g - 2], D = [ i, t.price || b && b[1] || t.close, t.volume ];
                    D = m(D, b), a.data[g - 1] = D;
                    var w = e.zip.apply(e, a.data), A = E(w, 6), M = A[1], I = A[3], q = A[4], j = A[5];
                    return e.extend({}, a, {
                        PRICE: M,
                        DIFF: I,
                        VOL: q,
                        AVG: j,
                        length: g
                    });
                }
                function A(e, a) {
                    return !e || e < a;
                }
                function M(a, t) {
                    return e.map(a, function(a) {
                        var n = e.filter(a.data, function(e, n) {
                            return !(n % t) || n === a.length - 1;
                        }), d = e.filter(a.PRICE, function(e, n) {
                            return !(n % t) || n === a.length - 1;
                        }), l = e.filter(a.VOL, function(e, n) {
                            return !(n % t) || n === a.length - 1;
                        }), i = e.filter(a.DIFF, function(e, n) {
                            return !(n % t) || n === a.length - 1;
                        }), u = e.filter(a.AVG, function(e, n) {
                            return !(n % t) || n === a.length - 1;
                        }), c = e.extend({}, a, {
                            length: n.length,
                            data: n,
                            PRICE: d,
                            DIFF: i,
                            VOL: l,
                            AVG: u
                        });
                        return c;
                    });
                }
                function I(e, a) {
                    return (!a.code || a.code === e.code) && (!a.type || a.type === e.type) && (!a.fq || a.fq === e.fq);
                }
                Object.defineProperty(a, "__esModule", {
                    value: !0
                }), a.Fdays = a.Minute = void 0;
                var q = function() {
                    function e(e, a) {
                        for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                        t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                    }
                    return function(a, t, n) {
                        return t && e(a.prototype, t), n && e(a, n), a;
                    };
                }(), E = function() {
                    function e(e, a) {
                        var t, n = [], d = !0, l = !1;
                        try {
                            for (var i, u = e[Symbol.iterator](); !(d = (i = u.next()).done) && (n.push(i.value), 
                            !(a && n.length === a)); d = !0) ;
                        } catch (e) {
                            l = !0, t = e;
                        } finally {
                            try {
                                !d && u["return"] && u["return"]();
                            } finally {
                                if (l) throw t;
                            }
                        }
                        return n;
                    }
                    return function(a, t) {
                        if (Array.isArray(a)) return a;
                        if (Symbol.iterator in Object(a)) return e(a, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    };
                }(), j = t(5), L = n(j), V = t(11), S = n(V), O = t(12), P = n(O), C = a.Minute = function() {
                    function a(e) {
                        l(this, a), this.cfg = e, this.raw_data = e.raw_data;
                    }
                    return q(a, [ {
                        key: "initialize",
                        value: function(a) {
                            if (this.cfg = e.extend(this.cfg, a), this.raw_data = this.cfg.raw_data, !this.raw_data) throw new L.default("No data to calculate", "Params", "101");
                            return this.data = this.calculateData(this.raw_data), (0, S.default)("calculate_data", this.data), 
                            this.data;
                        }
                    }, {
                        key: "calculateData",
                        value: function(a) {
                            var t = this.formatRawData, n = this.calculateBasicData, d = this.calculateViewData, l = e.compose(d, n, t);
                            return l.call(this, a);
                        }
                    }, {
                        key: "formatRawData",
                        value: function(a) {
                            a = e.values(a)[0];
                            var t = this.cfg, n = a, d = n.data, l = n.qt, i = h(d), u = y(l, t);
                            return {
                                qt_data: u,
                                minute_data: i
                            };
                        }
                    }, {
                        key: "calculateBasicData",
                        value: function(a) {
                            var t = a.qt_data.close, n = g(a.minute_data, t);
                            return e.extend(a, {
                                minute_data: n
                            });
                        }
                    }, {
                        key: "calculateViewData",
                        value: function(a) {
                            var t = this.cfg, n = a.minute_data, d = p(o(n, "AVG", "PRICE")), l = f(o(n, "AVG", "PRICE")), i = p(o(n, "VOL")), u = e.extend(n, {
                                max_price: d,
                                min_price: l,
                                max_vol: i
                            });
                            return e.extend(a, {
                                view_data: u
                            });
                        }
                    }, {
                        key: "checkDiffKeys",
                        value: function(a) {
                            var t = this.cfg, n = a;
                            if (!I(t, n)) throw new L.default("cannot update: data out of date", "unKnown", 401);
                            return e.chain(a).keys().filter(function(a) {
                                return !e.isEqual(t[a], n[a]);
                            }).value();
                        }
                    }, {
                        key: "checkNeedUpdate",
                        value: function(a) {
                            return e.has(a, "data") ? this.updateData : e.has(a, "qt") ? this.updateQT : void 0;
                        }
                    }, {
                        key: "update",
                        value: function(a) {
                            var t, n = this.checkDiffKeys(a), l = (t = e).pick.apply(t, [ a ].concat(d(n))), i = this.checkNeedUpdate(l);
                            return i ? (this.cfg = e.extend(this.cfg, a), this.data = i.call(this), (0, S.default)("update_data_" + n.toString(), this.data), 
                            this.data) : this.data;
                        }
                    }, {
                        key: "updateData",
                        value: function() {
                            var e = this.cfg.data;
                            return this.initialize({
                                raw_data: e
                            });
                        }
                    }, {
                        key: "updateQT",
                        value: function() {
                            var a = this.updateBasicData, t = this.updateViewData, n = this.updateQTData(), d = n.qt_data, l = n.day_data, i = d.hasChange, u = d.status;
                            if (!i || "D" === u) return this.data;
                            var c = e.compose(t, a);
                            return c.call(this, n);
                        }
                    }, {
                        key: "updateQTData",
                        value: function() {
                            var a = this.data, t = this.cfg, n = a.qt_data, d = t.qt;
                            if (!d) return n = e.extend(n, {
                                hasChange: !1
                            }), e.extend(this.data, {
                                qt_data: n
                            });
                            var l = (0, P.default)(d), i = b(l, a.qt_data);
                            return n = e.extend(n, l, {
                                hasChange: i
                            }), e.extend(this.data, {
                                qt_data: n
                            });
                        }
                    }, {
                        key: "updateBasicData",
                        value: function(a) {
                            var t = a.qt_data, n = a.minute_data, d = t.market_symbol, l = t.date, i = n.date;
                            return n = e.clone(n), A(i, l) && (n = D(t)), n = w(n, t), e.extend(a, {
                                minute_data: n
                            });
                        }
                    }, {
                        key: "updateViewData",
                        value: function(a) {
                            var t = a.qt_data, n = a.minute_data, d = a.view_data, l = n.PRICE, i = n.AVG, u = n.VOL, c = n.max_price, r = n.min_price, o = n.max_vol, s = e.last(l), y = e.last(i), h = e.last(u);
                            return c = p([ s, y, c ]), r = f([ s, y, r ]), o = p([ h, o ]), d = e.extend(n, {
                                max_price: c,
                                min_price: r,
                                max_vol: o
                            }), e.extend(a, {
                                view_data: d
                            });
                        }
                    } ]), a;
                }(), N = a.Fdays = function() {
                    function a(e) {
                        l(this, a), this.cfg = e, this.raw_data = e.raw_data;
                    }
                    return q(a, [ {
                        key: "initialize",
                        value: function(a) {
                            if (this.cfg = e.extend(this.cfg, a), this.raw_data = this.cfg.raw_data, !this.raw_data) throw new L.default("No data to calculate", "Params", "101");
                            return this.data = this.calculateData(this.raw_data), (0, S.default)("calculate_data", this.data), 
                            this.data;
                        }
                    }, {
                        key: "calculateData",
                        value: function(a) {
                            var t = this.formatRawData, n = this.calculateBasicData, d = this.calculateViewData, l = e.compose(d, n, t);
                            return l.call(this, a);
                        }
                    }, {
                        key: "formatRawData",
                        value: function(a) {
                            a = e.values(a)[0];
                            var t = this.cfg, n = a, d = n.data, l = n.qt, i = _(d), u = y(l, t);
                            return {
                                qt_data: u,
                                fdays_data: i
                            };
                        }
                    }, {
                        key: "calculateBasicData",
                        value: function(a) {
                            var t = e.map(a.fdays_data, function(e) {
                                return g(e);
                            });
                            return e.extend(a, {
                                fdays_data: t
                            });
                        }
                    }, {
                        key: "calculateViewData",
                        value: function(a) {
                            var t = this.cfg, n = t.VIEW_DAY, d = t.SAMPLING, l = a.fdays_data.length, i = a.fdays_data.slice(0, n || l);
                            i = d ? M(i, d) : i;
                            var u = p(e.pluck(i, "PRICE", "AVG")), c = f(e.pluck(i, "PRICE", "AVG")), r = p(e.pluck(i, "VOL"));
                            return i = e.extend(i, {
                                max_price: u,
                                min_price: c,
                                max_vol: r,
                                prec: i.length ? e.last(i).prec : 0
                            }), i = i.reverse(), e.extend(a, {
                                view_data: i
                            });
                        }
                    }, {
                        key: "checkDiffKeys",
                        value: function(a) {
                            var t = this.cfg, n = a;
                            if (!I(t, n)) throw new L.default("cannot update: data out of date", "unKnown", 401);
                            return e.chain(a).keys().filter(function(a) {
                                return !e.isEqual(t[a], n[a]);
                            }).value();
                        }
                    }, {
                        key: "checkNeedUpdate",
                        value: function(a) {
                            return e.has(a, "data") ? this.updateData : e.has(a, "qt") ? this.updateQT : e.has(a, "VIEW_DAY") || e.has(a, "SAMPLING") ? this.updateViewData : void 0;
                        }
                    }, {
                        key: "update",
                        value: function(a) {
                            var t, n = this.checkDiffKeys(a), l = (t = e).pick.apply(t, [ a ].concat(d(n))), i = this.checkNeedUpdate(l);
                            return i ? (this.cfg = e.extend(this.cfg, a), this.data = i.call(this), (0, S.default)("update_data_" + n.toString(), this.data), 
                            this.data) : this.data;
                        }
                    }, {
                        key: "updateData",
                        value: function() {
                            var e = this.cfg.data;
                            return this.initialize({
                                raw_data: e
                            });
                        }
                    }, {
                        key: "updateQTData",
                        value: function() {
                            var a = this.data, t = this.cfg, n = a.qt_data, d = t.qt;
                            if (!d) return n = e.extend(n, {
                                hasChange: !1
                            }), e.extend(this.data, {
                                qt_data: n
                            });
                            var l = (0, P.default)(d), i = b(l, a.qt_data);
                            return n = e.extend(n, l, {
                                hasChange: i
                            }), e.extend(this.data, {
                                qt_data: n
                            });
                        }
                    }, {
                        key: "updateBasicData",
                        value: function(a) {
                            var t = a.qt_data, n = a.fdays_data, d = e.first(n), l = d.date, i = t.date, u = e.clone(d);
                            return A(l, i) && (u = D(t)), u = w(u, t), n = A(l, i) ? [ u ].concat(n) : [ u ].concat(e.rest(n)), 
                            e.extend(a, {
                                fdays_data: n
                            });
                        }
                    }, {
                        key: "updateViewData",
                        value: function() {
                            return this.calculateViewData(this.data);
                        }
                    }, {
                        key: "updateQT",
                        value: function() {
                            var a = this.updateBasicData, t = this.cutOutViewData, n = this.updateQTData(), d = n.qt_data, l = n.day_data, i = d.hasChange, u = d.status;
                            if (!i || "D" === u) return this.data;
                            var c = e.compose(updateViewData, a);
                            return c.call(this, n);
                        }
                    } ]), a;
                }();
            }).call(a, t(2));
        }, function(e, a) {
            "use strict";
            function t() {}
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.log = t;
            a.default = t;
        }, function(e, a, n) {
            "use strict";
            function d(e) {
                var a = e.toString(), t = a.indexOf(".");
                return -1 === t ? 0 : a.length - t - 1;
            }
            function l(e) {
                return {
                    1: "sh",
                    51: "sz",
                    61: "nq",
                    100: "hk",
                    200: "us",
                    delay: "us",
                    real: "us"
                }[e];
            }
            function i(e) {
                var a = e[0] || e.Mkt, t = l(a), n = e[1] || e.Name, i = e[2] || e.Symbol, u = 1 * (e[3] || e.Price), c = 1 * (e[4] || e.PrevClose), r = 1 * (e[5] || e.Open), o = 1 * (e[33] || e.High), s = 1 * (e[34] || e.Low), p = 1 * (e[36] || e._Vol || e.Vol), f = e[40] || e.Status, y = (e.TimeStamp || e[30]).replace(/\:| |\/|-/g, ""), h = y.slice(0, 8), _ = y.slice(8, 12), m = d(e[4] || e.PrevClose);
                return {
                    raw: e,
                    market: a,
                    market_symbol: t,
                    name: n,
                    symbol: i,
                    price: u,
                    close: c,
                    open: r,
                    high: o,
                    low: s,
                    volume: p,
                    status: f,
                    timeStamp: y,
                    date: h,
                    time: _,
                    precision: m
                };
            }
            function u(e) {
                switch (e) {
                  case "51":
                  case "1":
                  case "100":
                  case "200":
                  case "us":
                  case "delay":
                  case "us":
                  case "real":
                    return i;

                  default:
                    throw new o.default("Invalid qt market!", "Params", 301);
                }
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            });
            var c = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
                return "undefined" == typeof e ? "undefined" : t(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : "undefined" == typeof e ? "undefined" : t(e);
            };
            a.default = function(e) {
                e = "object" === ("undefined" == typeof e ? "undefined" : c(e)) ? e : e.split("~");
                var a = e[0] || e.Mkt, t = u(a);
                return t(e);
            };
            var r = n(13), o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(r);
        }, function(e, a) {
            "use strict";
            function t(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(a, "__esModule", {
                value: !0
            });
            var n = a.AppError = function e(a, n, d) {
                t(this, e), this.message = a || "", this.name = n, this.code = d;
            };
            a.default = n;
        }, function(t, n) {
            "use strict";
            function d(e, a) {
                if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var l = function() {
                function e(e, a) {
                    for (var t, n = 0; n < a.length; n++) t = a[n], t.enumerable = t.enumerable || !1, 
                    t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
                }
                return function(a, t, n) {
                    return t && e(a.prototype, t), n && e(a, n), a;
                };
            }(), i = function() {
                function t() {
                    d(this, t);
                }
                var n = Math.pow, i = Math.abs;
                return l(t, null, [ {
                    key: "MACD",
                    value: function(e, a, t, n) {
                        var d = this;
                        t = t || 12, a = a || 26, n = n || 9;
                        var l = d.SUB(d.EMA(e, t), d.EMA(e, a)), i = d.EMA(l, n), u = d.MUL(2, d.SUB(l, i));
                        return {
                            DIF: l,
                            DEA: i,
                            MACD: u
                        };
                    }
                }, {
                    key: "RSI",
                    value: function(e, a, t, d) {
                        for (var l, n = this, u = [ a || 6, t || 12, d || 24 ], c = arguments, r = n.REF(e, 1), o = n.SUB(e, r), s = n.MAX(o, 0), p = n.ABS(o), f = {}, y = 0; 3 > y; y++) l = u[y], 
                        f["RSI" + l] = n.MUL(100, n.DIV(n.SMA(s, l, 1), n.SMA(p, l, 1)));
                        return f;
                    }
                }, {
                    key: "KDJ",
                    value: function(e, a, t, n, d, l) {
                        function i(e) {
                            return 0 > e ? 0 : 100 < e ? 100 : e;
                        }
                        var u = this;
                        n = n || 9, d = d || 3, l = l || 3;
                        var c = u.LLV(a, n), r = u.DIV(u.MUL(u.SUB(e, c), 100), u.SUB(u.HHV(t, n), c)), o = u.SMA(r, d, 1), s = u.SMA(o, l, 1), p = u.SUB(u.MUL(3, o), u.MUL(2, s));
                        return {
                            K: u.forEach([ o ], i),
                            D: u.forEach([ s ], i),
                            J: u.forEach([ p ], i)
                        };
                    }
                }, {
                    key: "DMI",
                    value: function(e, t, n, d, l) {
                        var u = this;
                        d = d || 14, l = l || 6;
                        var c = [], r = [], o = [];
                        u.forEach([ e, t ], function(d, s) {
                            var l = this.index, p = l - 1, f = d - e[p], y = t[p] - s, h = n[p];
                            u.isNumber(f) && u.isNumber(y) && (c[l] = 0 < f && f > y ? f : 0, r[l] = 0 < y && y > f ? y : 0), 
                            o[this.index] = a(d - s, i(d - h), i(s - h));
                        });
                        var s = u.SUM(o, d), p = u.SUM(c, d), f = u.SUM(r, d), y = [], h = [], _ = [];
                        u.forEach([ p, f, s ], function(e, a, t) {
                            var n = y[this.index] = t ? 100 * e / t : 0, d = h[this.index] = t ? 100 * a / t : 0;
                            _[this.index] = n + d ? 100 * i(d - n) / (n + d) : 0;
                        });
                        var m = u.MA(_, l), g = u.DIV(u.ADD(m, u.REF(m, l)), 2);
                        return {
                            PDI: y,
                            MDI: h,
                            ADX: m,
                            ADXR: g
                        };
                    }
                }, {
                    key: "WR",
                    value: function(e, a, t, d, l) {
                        for (var u = this, c = [ d || 10, l || 6 ], r = {}, o = 0; 2 > o; o++) {
                            var i = c[o], n = u.HHV(t, i);
                            r["WR" + i] = u.DIV(u.MUL(u.SUB(n, e), 100), u.SUB(n, u.LLV(a, i)));
                        }
                        return r;
                    }
                }, {
                    key: "OBV",
                    value: function(e, a) {
                        for (var t = this, n = [ 0 ], d = 1, l = e.length; d < l; d++) n[d] = e[d] > e[d - 1] ? n[d - 1] + a[d][0] : e[d] < e[d - 1] ? n[d - 1] - a[d][0] : n[d - 1];
                        return {
                            OBV: n
                        };
                    }
                }, {
                    key: "BOLL",
                    value: function(e, a, t) {
                        var n = this;
                        a = a || 20, t = t || 2;
                        var d = n.MA(e, a), l = n.MUL(n.STD(e, a), t), i = n.ADD(d, l), u = n.SUB(d, l);
                        return {
                            UPPER: i,
                            MID: d,
                            LOWER: u
                        };
                    }
                }, {
                    key: "SAR",
                    value: function(t, n, d, l, u) {
                        d = d || 4, l = l || 2, u = u || 20;
                        var c = [], r = [], o = [], s = t.length, p = [], f = function(f) {
                            if (!(f >= s)) if (c[f] = e.apply(null, n.slice(f - d, f)), p[f] = 1, c[f] > n[f]) y(f + 1); else for (o[f] = a.apply(null, t.slice(f - d + 1, f + 1)), 
                            r[f] = l; f < s - 1; ) {
                                if (c[f + 1] = c[f] + r[f] * (o[f] - c[f]) / 100, p[f + 1] = 1, c[f + 1] > n[f + 1]) return void y(f + 2);
                                o[f + 1] = a.apply(null, t.slice(f - d + 2, f + 2)), t[f + 1] > o[f] ? (r[f + 1] = r[f] + l, 
                                r[f + 1] > u && (r[f + 1] = u)) : r[f + 1] = r[f], f++;
                            }
                        }, y = function(y) {
                            if (!(y >= s)) {
                                if (c[y] = a.apply(null, t.slice(y - d, y)), p[y] = -1, c[y] < t[y]) return void f(y + 1);
                                for (o[y] = e.apply(null, n.slice(y - d + 1, y + 1)), r[y] = l; y < s - 1; ) {
                                    if (c[y + 1] = c[y] + r[y] * (o[y] - c[y]) / 100, p[y + 1] = -1, c[y + 1] < t[y + 1]) return void f(y + 2);
                                    o[y + 1] = e.apply(null, n.slice(y - d + 2, y + 2)), n[y + 1] < o[y] ? (r[y + 1] = r[y] + l, 
                                    r[y + 1] > u && (r[y + 1] = u)) : r[y + 1] = r[y], y++;
                                }
                            }
                        };
                        return t[d] > t[0] || n[d] > n[0] ? f(d) : y(d), {
                            data: c,
                            direction: p
                        };
                    }
                }, {
                    key: "ADD",
                    value: function() {
                        for (var e = this, a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                        return this.forEach(t, function() {
                            for (var a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                            return e.reduce(t, function(e, a) {
                                return e + a;
                            }, !0);
                        });
                    }
                }, {
                    key: "SUB",
                    value: function() {
                        for (var e = this, a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                        return this.forEach(t, function() {
                            for (var a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                            return e.reduce(t, function(e, a) {
                                return e - a;
                            }, !0);
                        });
                    }
                }, {
                    key: "MUL",
                    value: function() {
                        for (var e = this, a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                        return this.forEach(t, function() {
                            for (var a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                            return e.reduce(t, function(e, a) {
                                return e * a;
                            }, !0);
                        });
                    }
                }, {
                    key: "DIV",
                    value: function() {
                        for (var e = this, a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                        return this.forEach(t, function() {
                            for (var a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                            return e.reduce(t, function(e, a) {
                                return a ? e / a : 0;
                            }, !0);
                        });
                    }
                }, {
                    key: "POW",
                    value: function() {
                        for (var e = arguments.length, a = Array(e), t = 0; t < e; t++) a[t] = arguments[t];
                        return this.forEach(a, function(e, a) {
                            return n(e, a);
                        });
                    }
                }, {
                    key: "MAX",
                    value: function() {
                        for (var e = this, a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                        return this.forEach(t, function() {
                            for (var a = arguments.length, t = Array(a), n = 0; n < a; n++) t[n] = arguments[n];
                            return e.reduce(t, function(e, a) {
                                return e < a ? a : e;
                            });
                        });
                    }
                }, {
                    key: "ABS",
                    value: function(e) {
                        return this.forEach([ e ], function(e) {
                            return i(e);
                        });
                    }
                }, {
                    key: "REF",
                    value: function(e, a) {
                        return Array(a).concat(e).slice(0, e.length);
                    }
                }, {
                    key: "HHV",
                    value: function(e, a) {
                        return this.hhvllv(e, a, function(e, a) {
                            return e < a ? a : e;
                        });
                    }
                }, {
                    key: "LLV",
                    value: function(e, a) {
                        return this.hhvllv(e, a, function(e, a) {
                            return e > a ? a : e;
                        });
                    }
                }, {
                    key: "SUM",
                    value: function(e, a) {
                        var t = e.length, d = 0, l = 0, i = 0, n = [];
                        if (a > t) return Array(t);
                        if (0 >= a) return this.reduce(e, function(e, a) {
                            return e + a;
                        });
                        if (1 >= a) return e.slice();
                        for (;i < a - 1 && d < t; ) this.isNumber(e[d]) && (l += e[d], i++), d++;
                        for (;d < t; d++) this.isNumber(e[d]) && (this.isNumber(l) ? l += e[d] : l = e[d]), 
                        n[d] = l, this.isNumber(e[d - a + 1]) && (l -= e[d - a + 1]);
                        return n;
                    }
                }, {
                    key: "MA",
                    value: function(e, a) {
                        var d = e.length, l = 0, i = -1, u = 0, n = 0, c = [];
                        if (0 >= a) return n = t.reduce(e, function(e, a) {
                            return e + a;
                        }), n / d;
                        if (1 >= a) return e.slice();
                        if (d < a) return Array(d);
                        for (;l < d && u < a - 1; ) t.isNumber(e[l]) && (n += e[l], u++), l++;
                        for (;l < d; l++, i++) t.isNumber(e[l]) && (n += e[l]), t.isNumber(e[l - a]) && (n -= e[l - a]), 
                        c[l] = n / a;
                        return c;
                    }
                }, {
                    key: "DMA",
                    value: function(e, a, n) {
                        var d = e.length, l = 0, i = 0, u = [], c = t.isArray(a);
                        if (1 < a) return Array(d);
                        if (1 == a) return e.slice();
                        if (t.isArray(a)) {
                            for (;l < d; l++) if (t.isNumber(e[l]) && t.isNumber(a[l])) {
                                u[l] = 1 == n ? 0 : e[l], i = e[l], l++;
                                break;
                            }
                            for (;l < d; l++) t.isNumber(e[l]) && t.isNumber(a[l]) ? i = u[l] = a[l] * e[l] + (1 - a[l]) * i : u[l] = u[l - 1];
                        } else {
                            for (;l < d; l++) if (t.isNumber(e[l])) {
                                u[l] = 1 == n ? 0 : e[l], i = e[l], l++;
                                break;
                            }
                            for (;l < d; l++) t.isNumber(e[l]) ? i = u[l] = a * e[l] + (1 - a) * i : u[l] = u[l - 1];
                        }
                        return u;
                    }
                }, {
                    key: "SMA",
                    value: function(e, a, t) {
                        var n = this;
                        return n.DMA(e, t / a, 1);
                    }
                }, {
                    key: "EMA",
                    value: function(e, a) {
                        return t.DMA(e, 2 / (a + 1));
                    }
                }, {
                    key: "WMA",
                    value: function(e, a) {
                        var n = e.length, d = 0, l = -1, i = [];
                        if (1 >= a) return e.slice();
                        if (n < a) return Array(n);
                        for (var u = a * (a + 1) / 2, c = 0, r = 0; d < a - 1; d++) t.isNumber(e[d]) && (c += e[d], 
                        r += (d + 1) * e[d]);
                        for (;d < n; d++, l++) t.isNumber(e[d]) && (c += e[d], r += e[d] * a), 0 <= l && t.isNumber(e[l]) && (c -= e[l]), 
                        i[d] = r / u, r -= c;
                        return i;
                    }
                }, {
                    key: "STD",
                    value: function(e, a) {
                        for (var d, l = [], u = t.MA(e, a), c = a - 1, i = e.length; c < i; c++) {
                            d = 0;
                            for (var r = c - a + 1; r <= c; r++) d += n(e[r] - u[c], 2);
                            l[c] = Math.sqrt(d / a);
                        }
                        return l;
                    }
                }, {
                    key: "forEach",
                    value: function(e, a) {
                        var t, n, d, l = e.length, u = [], c = -1, r = [];
                        for (n = 0; n < l; n++) u[n] = this.isArray(e[n]) ? e[n].length : -1, u[n] > c && (c = u[n]);
                        for (n = 0; n < c; n++) {
                            for (t = [], d = 0; d < l; d++) t[d] = 0 > u[d] ? e[d] : e[d][n];
                            r[n] = a.apply({
                                index: n
                            }, t);
                        }
                        return r;
                    }
                }, {
                    key: "reduce",
                    value: function(e, t, n, d, a) {
                        var l, u = 0, i = e.length;
                        for ("number" == typeof t && (u = t, i = n, t = d, n = a); u < i; u++) if (n || this.isNumber(e[u])) {
                            l = +e[u];
                            break;
                        }
                        for (u++; u < i; u++) (n || this.isNumber(e[u])) && (l = t(l, +e[u], u));
                        return l;
                    }
                }, {
                    key: "isArray",
                    value: function(e) {
                        return "[object Array]" == {}.toString.call(e);
                    }
                }, {
                    key: "isNumber",
                    value: function(e) {
                        return null !== e && "" !== e && isFinite(e);
                    }
                }, {
                    key: "hhvllv",
                    value: function(e, a, t) {
                        var n = [], d = a - 1, l = e.length;
                        if (a > l) return Array(l);
                        if (0 >= a) return this.reduce(e, t);
                        if (1 >= a) return e.slice();
                        for (;d < l; d++) n[d] = this.reduce(e, d - a + 1, d + 1, t);
                        return n;
                    }
                } ]), t;
            }();
            n.default = i;
        } ]);
    });
})();
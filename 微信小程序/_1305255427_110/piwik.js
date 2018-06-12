var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

"object" !== ("undefined" == typeof JSON2 ? "undefined" : t(JSON2)) && "object" === t(window.JSON) && window.JSON.stringify && window.JSON.parse ? JSON2 = window.JSON : function() {
    var e = {};
    (function() {
        function n(e, i) {
            function o(t) {
                if (o[t] !== m) return o[t];
                var e;
                if ("bug-string-char-index" == t) e = "a" != "a"[0]; else if ("json" == t) e = o("json-stringify") && o("json-parse"); else {
                    var n, r = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == t) {
                        var a = i.stringify, c = "function" == typeof a && b;
                        if (c) {
                            (n = function() {
                                return 1;
                            }).toJSON = n;
                            try {
                                c = "0" === a(0) && "0" === a(new s()) && '""' == a(new u()) && a(N) === m && a(m) === m && a() === m && "1" === a(n) && "[1]" == a([ n ]) && "[null]" == a([ m ]) && "null" == a(null) && "[null,null,null]" == a([ m, N, null ]) && a({
                                    a: [ n, !0, !1, null, "\0\b\n\f\r\t" ]
                                }) == r && "1" === a(null, n) && "[\n 1,\n 2\n]" == a([ 1, 2 ], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new f(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new f(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new f(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new f(-1));
                            } catch (t) {
                                c = !1;
                            }
                        }
                        e = c;
                    }
                    if ("json-parse" == t) {
                        var l = i.parse;
                        if ("function" == typeof l) try {
                            if (0 === l("0") && !l(!1)) {
                                var d = 5 == (n = l(r)).a.length && 1 === n.a[0];
                                if (d) {
                                    try {
                                        d = !l('"\t"');
                                    } catch (t) {}
                                    if (d) try {
                                        d = 1 !== l("01");
                                    } catch (t) {}
                                    if (d) try {
                                        d = 1 !== l("1.");
                                    } catch (t) {}
                                }
                            }
                        } catch (t) {
                            d = !1;
                        }
                        e = d;
                    }
                }
                return o[t] = !!e;
            }
            e || (e = a.Object()), i || (i = a.Object());
            var s = e.Number || a.Number, u = e.String || a.String, c = e.Object || a.Object, f = e.Date || a.Date, l = e.SyntaxError || a.SyntaxError, d = e.TypeError || a.TypeError, h = e.Math || a.Math, g = e.JSON || a.JSON;
            "object" == (void 0 === g ? "undefined" : t(g)) && g && (i.stringify = g.stringify, 
            i.parse = g.parse);
            var p, v, m, T = c.prototype, N = T.toString, b = new f(-0xc782b5b800cec);
            try {
                b = -109252 == b.getUTCFullYear() && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds();
            } catch (t) {}
            if (!o("json")) {
                var C = "[object Function]", w = "[object Number]", y = "[object String]", k = "[object Array]", A = o("bug-string-char-index");
                if (!b) var O = h.floor, _ = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], S = function(t, e) {
                    return _[e] + 365 * (t - 1970) + O((t - 1969 + (e = +(e > 1))) / 4) - O((t - 1901 + e) / 100) + O((t - 1601 + e) / 400);
                };
                if ((p = T.hasOwnProperty) || (p = function(t) {
                    var e, n = {};
                    return (n.__proto__ = null, n.__proto__ = {
                        toString: 1
                    }, n).toString != N ? p = function(t) {
                        var e = this.__proto__, n = t in (this.__proto__ = null, this);
                        return this.__proto__ = e, n;
                    } : (e = n.constructor, p = function(t) {
                        var n = (this.constructor || e).prototype;
                        return t in this && !(t in n && this[t] === n[t]);
                    }), n = null, p.call(this, t);
                }), v = function(e, n) {
                    var i, o, a, s = 0;
                    (i = function() {
                        this.valueOf = 0;
                    }).prototype.valueOf = 0, o = new i();
                    for (a in o) p.call(o, a) && s++;
                    return i = o = null, s ? v = 2 == s ? function(t, e) {
                        var n, i = {}, r = N.call(t) == C;
                        for (n in t) r && "prototype" == n || p.call(i, n) || !(i[n] = 1) || !p.call(t, n) || e(n);
                    } : function(t, e) {
                        var n, i, r = N.call(t) == C;
                        for (n in t) r && "prototype" == n || !p.call(t, n) || (i = "constructor" === n) || e(n);
                        (i || p.call(t, n = "constructor")) && e(n);
                    } : (o = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ], 
                    v = function(e, n) {
                        var i, a, s = N.call(e) == C, u = !s && "function" != typeof e.constructor && r[t(e.hasOwnProperty)] && e.hasOwnProperty || p;
                        for (i in e) s && "prototype" == i || !u.call(e, i) || n(i);
                        for (a = o.length; i = o[--a]; u.call(e, i) && n(i)) ;
                    }), v(e, n);
                }, !o("json-stringify")) {
                    var E = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t"
                    }, I = function(t, e) {
                        return ("000000" + (e || 0)).slice(-t);
                    }, x = function(t) {
                        for (var e = '"', n = 0, i = t.length, r = !A || i > 10, o = r && (A ? t.split("") : t); n < i; n++) {
                            var a = t.charCodeAt(n);
                            switch (a) {
                              case 8:
                              case 9:
                              case 10:
                              case 12:
                              case 13:
                              case 34:
                              case 92:
                                e += E[a];
                                break;

                              default:
                                if (a < 32) {
                                    e += "\\u00" + I(2, a.toString(16));
                                    break;
                                }
                                e += r ? o[n] : t.charAt(n);
                            }
                        }
                        return e + '"';
                    }, P = function e(n, i, r, o, a, s, u) {
                        var c, f, l, h, g, T, b, C, A, _, E, P, R, j, L, V;
                        try {
                            c = i[n];
                        } catch (t) {}
                        if ("object" == (void 0 === c ? "undefined" : t(c)) && c) if ("[object Date]" != (f = N.call(c)) || p.call(c, "toJSON")) "function" == typeof c.toJSON && (f != w && f != y && f != k || p.call(c, "toJSON")) && (c = c.toJSON(n)); else if (c > -1 / 0 && c < 1 / 0) {
                            if (S) {
                                for (g = O(c / 864e5), l = O(g / 365.2425) + 1970 - 1; S(l + 1, 0) <= g; l++) ;
                                for (h = O((g - S(l, 0)) / 30.42); S(l, h + 1) <= g; h++) ;
                                g = 1 + g - S(l, h), b = O((T = (c % 864e5 + 864e5) % 864e5) / 36e5) % 24, C = O(T / 6e4) % 60, 
                                A = O(T / 1e3) % 60, _ = T % 1e3;
                            } else l = c.getUTCFullYear(), h = c.getUTCMonth(), g = c.getUTCDate(), b = c.getUTCHours(), 
                            C = c.getUTCMinutes(), A = c.getUTCSeconds(), _ = c.getUTCMilliseconds();
                            c = (l <= 0 || l >= 1e4 ? (l < 0 ? "-" : "+") + I(6, l < 0 ? -l : l) : I(4, l)) + "-" + I(2, h + 1) + "-" + I(2, g) + "T" + I(2, b) + ":" + I(2, C) + ":" + I(2, A) + "." + I(3, _) + "Z";
                        } else c = null;
                        if (r && (c = r.call(i, n, c)), null === c) return "null";
                        if ("[object Boolean]" == (f = N.call(c))) return "" + c;
                        if (f == w) return c > -1 / 0 && c < 1 / 0 ? "" + c : "null";
                        if (f == y) return x("" + c);
                        if ("object" == (void 0 === c ? "undefined" : t(c))) {
                            for (j = u.length; j--; ) if (u[j] === c) throw d();
                            if (u.push(c), E = [], L = s, s += a, f == k) {
                                for (R = 0, j = c.length; R < j; R++) P = e(R, c, r, o, a, s, u), E.push(P === m ? "null" : P);
                                V = E.length ? a ? "[\n" + s + E.join(",\n" + s) + "\n" + L + "]" : "[" + E.join(",") + "]" : "[]";
                            } else v(o || c, function(t) {
                                var n = e(t, c, r, o, a, s, u);
                                n !== m && E.push(x(t) + ":" + (a ? " " : "") + n);
                            }), V = E.length ? a ? "{\n" + s + E.join(",\n" + s) + "\n" + L + "}" : "{" + E.join(",") + "}" : "{}";
                            return u.pop(), V;
                        }
                    };
                    i.stringify = function(e, n, i) {
                        var o, a, s, u;
                        if (r[void 0 === n ? "undefined" : t(n)] && n) if ((u = N.call(n)) == C) a = n; else if (u == k) {
                            s = {};
                            for (var c, f = 0, l = n.length; f < l; c = n[f++], ((u = N.call(c)) == y || u == w) && (s[c] = 1)) ;
                        }
                        if (i) if ((u = N.call(i)) == w) {
                            if ((i -= i % 1) > 0) for (o = "", i > 10 && (i = 10); o.length < i; o += " ") ;
                        } else u == y && (o = i.length <= 10 ? i : i.slice(0, 10));
                        return P("", (c = {}, c[""] = e, c), a, s, o, "", []);
                    };
                }
                if (!o("json-parse")) {
                    var R, j, L = u.fromCharCode, V = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r"
                    }, U = function() {
                        throw R = j = null, l();
                    }, D = function() {
                        for (var t, e, n, i, r, o = j, a = o.length; R < a; ) switch (r = o.charCodeAt(R)) {
                          case 9:
                          case 10:
                          case 13:
                          case 32:
                            R++;
                            break;

                          case 123:
                          case 125:
                          case 91:
                          case 93:
                          case 58:
                          case 44:
                            return t = A ? o.charAt(R) : o[R], R++, t;

                          case 34:
                            for (t = "@", R++; R < a; ) if ((r = o.charCodeAt(R)) < 32) U(); else if (92 == r) switch (r = o.charCodeAt(++R)) {
                              case 92:
                              case 34:
                              case 47:
                              case 98:
                              case 116:
                              case 110:
                              case 102:
                              case 114:
                                t += V[r], R++;
                                break;

                              case 117:
                                for (e = ++R, n = R + 4; R < n; R++) (r = o.charCodeAt(R)) >= 48 && r <= 57 || r >= 97 && r <= 102 || r >= 65 && r <= 70 || U();
                                t += L("0x" + o.slice(e, R));
                                break;

                              default:
                                U();
                            } else {
                                if (34 == r) break;
                                for (r = o.charCodeAt(R), e = R; r >= 32 && 92 != r && 34 != r; ) r = o.charCodeAt(++R);
                                t += o.slice(e, R);
                            }
                            if (34 == o.charCodeAt(R)) return R++, t;
                            U();

                          default:
                            if (e = R, 45 == r && (i = !0, r = o.charCodeAt(++R)), r >= 48 && r <= 57) {
                                for (48 == r && (r = o.charCodeAt(R + 1)) >= 48 && r <= 57 && U(), i = !1; R < a && (r = o.charCodeAt(R)) >= 48 && r <= 57; R++) ;
                                if (46 == o.charCodeAt(R)) {
                                    for (n = ++R; n < a && (r = o.charCodeAt(n)) >= 48 && r <= 57; n++) ;
                                    n == R && U(), R = n;
                                }
                                if (101 == (r = o.charCodeAt(R)) || 69 == r) {
                                    for (43 != (r = o.charCodeAt(++R)) && 45 != r || R++, n = R; n < a && (r = o.charCodeAt(n)) >= 48 && r <= 57; n++) ;
                                    n == R && U(), R = n;
                                }
                                return +o.slice(e, R);
                            }
                            if (i && U(), "true" == o.slice(R, R + 4)) return R += 4, !0;
                            if ("false" == o.slice(R, R + 5)) return R += 5, !1;
                            if ("null" == o.slice(R, R + 4)) return R += 4, null;
                            U();
                        }
                        return "$";
                    }, F = function t(e) {
                        var n, i;
                        if ("$" == e && U(), "string" == typeof e) {
                            if ("@" == (A ? e.charAt(0) : e[0])) return e.slice(1);
                            if ("[" == e) {
                                for (n = []; "]" != (e = D()); i || (i = !0)) i && ("," == e ? "]" == (e = D()) && U() : U()), 
                                "," == e && U(), n.push(t(e));
                                return n;
                            }
                            if ("{" == e) {
                                for (n = {}; "}" != (e = D()); i || (i = !0)) i && ("," == e ? "}" == (e = D()) && U() : U()), 
                                "," != e && "string" == typeof e && "@" == (A ? e.charAt(0) : e[0]) && ":" == D() || U(), 
                                n[e.slice(1)] = t(D());
                                return n;
                            }
                            U();
                        }
                        return e;
                    }, H = function(t, e, n) {
                        var i = q(t, e, n);
                        i === m ? delete t[e] : t[e] = i;
                    }, q = function(e, n, i) {
                        var r, o = e[n];
                        if ("object" == (void 0 === o ? "undefined" : t(o)) && o) if (N.call(o) == k) for (r = o.length; r--; ) H(o, r, i); else v(o, function(t) {
                            H(o, t, i);
                        });
                        return i.call(e, n, o);
                    };
                    i.parse = function(t, e) {
                        var n, i;
                        return R = 0, j = "" + t, n = F(D()), "$" != D() && U(), R = j = null, e && N.call(e) == C ? q((i = {}, 
                        i[""] = n, i), "", e) : n;
                    };
                }
            }
            return i.runInContext = n, i;
        }
        var i = "function" == typeof define && define.amd, r = {
            function: !0,
            object: !0
        }, o = r[void 0 === e ? "undefined" : t(e)] && e && !e.nodeType && e, a = r["undefined" == typeof window ? "undefined" : t(window)] && window || this, s = o && r["undefined" == typeof module ? "undefined" : t(module)] && module && !module.nodeType && "object" == ("undefined" == typeof global ? "undefined" : t(global)) && global;
        if (!s || s.global !== s && s.window !== s && s.self !== s || (a = s), o && !i) n(a, o); else {
            var u = a.JSON, c = a.JSON3, f = !1, l = n(a, a.JSON3 = {
                noConflict: function() {
                    return f || (f = !0, a.JSON = u, a.JSON3 = c, u = c = null), l;
                }
            });
            a.JSON = {
                parse: l.parse,
                stringify: l.stringify
            };
        }
        i && define(function() {
            return l;
        });
    }).call(this), JSON2 = e;
}(), "object" !== ("undefined" == typeof _paq ? "undefined" : t(_paq)) && (_paq = []), 
"object" !== t(window.Piwik) && (window.Piwik = function() {
    function e(t) {
        try {
            return X(t);
        } catch (e) {
            return unescape(t);
        }
    }
    function n(e) {
        return "undefined" !== (void 0 === e ? "undefined" : t(e));
    }
    function i(t) {
        return "function" == typeof t;
    }
    function r(e) {
        return "object" === (void 0 === e ? "undefined" : t(e));
    }
    function o(t) {
        return "string" == typeof t || t instanceof String;
    }
    function a(t) {
        if (!t) return !0;
        var e, n = !0;
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && (n = !1);
        return n;
    }
    function s(t) {
        void 0 !== console && console && console.error && console.error(t);
    }
    function u() {
        var e, n, i, r, a;
        for (e = 0; e < arguments.length; e += 1) {
            a = null, arguments[e] && arguments[e].slice && (a = arguments[e].slice());
            var u, c;
            if (o(i = (r = arguments[e]).shift()) && i.indexOf("::") > 0) c = (u = i.split("::"))[0], 
            i = u[1], "object" === t(q[c]) && "function" == typeof q[c][i] ? q[c][i].apply(q[c], r) : a && Y.push(a); else for (n = 0; n < K.length; n++) if (o(i)) {
                c = K[n];
                var f = i.indexOf(".") > 0;
                if (f) if (u = i.split("."), c && "object" === t(c[u[0]])) c = c[u[0]], i = u[1]; else if (a) {
                    Y.push(a);
                    break;
                }
                if (c[i]) c[i].apply(c, r); else {
                    var l = "The method '" + i + '\' was not found in "_paq" variable.  Please have a look at the Piwik tracker documentation: http://developer.piwik.org/api-reference/tracking-javascript';
                    if (s(l), !f) throw new TypeError(l);
                }
                if ("addTracker" === i) break;
                if ("setTrackerUrl" === i || "setSiteId" === i) break;
            } else i.apply(K[n], r);
        }
    }
    function c(t, e, n, i) {
        return t.addEventListener ? (t.addEventListener(e, n, i), !0) : t.attachEvent ? t.attachEvent("on" + e, n) : void (t["on" + e] = n);
    }
    function f(t) {
        "complete" === W.readyState ? t() : B.addEventListener ? B.addEventListener("load", t) : B.attachEvent && B.attachEvent("onload", t);
    }
    function l(t) {
        var e = !1;
        if (e = W.attachEvent ? "complete" === W.readyState : "loading" !== W.readyState) t(); else {
            W.addEventListener ? c(W, "DOMContentLoaded", function n() {
                W.removeEventListener("DOMContentLoaded", n, !1), e || (e = !0, t());
            }) : W.attachEvent && (W.attachEvent("onreadystatechange", function n() {
                "complete" === W.readyState && (W.detachEvent("onreadystatechange", n), e || (e = !0, 
                t()));
            }), W.documentElement.doScroll && B === B.top && function n() {
                if (!e) {
                    try {
                        W.documentElement.doScroll("left");
                    } catch (t) {
                        return void setTimeout(n, 0);
                    }
                    e = !0, t();
                }
            }()), c(B, "load", function() {
                e || (e = !0, t());
            }, !1);
        }
    }
    function d(t, e) {
        var n, r, o, a = "";
        for (n in M) Object.prototype.hasOwnProperty.call(M, n) && i(r = M[n][t]) && (o = r(e)) && (a += o);
        return a;
    }
    function h(t, e) {
        var n = W.createElement("script");
        n.type = "text/javascript", n.src = t, n.readyState ? n.onreadystatechange = function() {
            var t = this.readyState;
            "loaded" !== t && "complete" !== t || (n.onreadystatechange = null, e());
        } : n.onload = e, W.getElementsByTagName("head")[0].appendChild(n);
    }
    function g() {
        var t = "";
        try {
            t = B.top.document.referrer;
        } catch (e) {
            if (B.parent) try {
                t = B.parent.document.referrer;
            } catch (e) {
                t = "";
            }
        }
        return "" === t && (t = W.referrer), t;
    }
    function p(t) {
        var e = new RegExp("^([a-z]+):").exec(t);
        return e ? e[1] : null;
    }
    function v(t) {
        var e = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)").exec(t);
        return e ? e[1] : t;
    }
    function m(t, e) {
        var n = "[\\?&#]" + e + "=([^&#]*)", i = new RegExp(n).exec(t);
        return i ? X(i[1]) : "";
    }
    function T(t) {
        return unescape(Z(t));
    }
    function N(t) {
        var e, n, i, r, o, a, s, u, c, f, l = function(t, e) {
            return t << e | t >>> 32 - e;
        }, d = function(t) {
            var e, n = "";
            for (e = 7; e >= 0; e--) n += (t >>> 4 * e & 15).toString(16);
            return n;
        }, h = [], g = 1732584193, p = 4023233417, v = 2562383102, m = 271733878, N = 3285377520, b = [];
        for (f = (t = T(t)).length, n = 0; n < f - 3; n += 4) i = t.charCodeAt(n) << 24 | t.charCodeAt(n + 1) << 16 | t.charCodeAt(n + 2) << 8 | t.charCodeAt(n + 3), 
        b.push(i);
        switch (3 & f) {
          case 0:
            n = 2147483648;
            break;

          case 1:
            n = t.charCodeAt(f - 1) << 24 | 8388608;
            break;

          case 2:
            n = t.charCodeAt(f - 2) << 24 | t.charCodeAt(f - 1) << 16 | 32768;
            break;

          case 3:
            n = t.charCodeAt(f - 3) << 24 | t.charCodeAt(f - 2) << 16 | t.charCodeAt(f - 1) << 8 | 128;
        }
        for (b.push(n); 14 != (15 & b.length); ) b.push(0);
        for (b.push(f >>> 29), b.push(f << 3 & 4294967295), e = 0; e < b.length; e += 16) {
            for (n = 0; n < 16; n++) h[n] = b[e + n];
            for (n = 16; n <= 79; n++) h[n] = l(h[n - 3] ^ h[n - 8] ^ h[n - 14] ^ h[n - 16], 1);
            for (r = g, o = p, a = v, s = m, u = N, n = 0; n <= 19; n++) c = l(r, 5) + (o & a | ~o & s) + u + h[n] + 1518500249 & 4294967295, 
            u = s, s = a, a = l(o, 30), o = r, r = c;
            for (n = 20; n <= 39; n++) c = l(r, 5) + (o ^ a ^ s) + u + h[n] + 1859775393 & 4294967295, 
            u = s, s = a, a = l(o, 30), o = r, r = c;
            for (n = 40; n <= 59; n++) c = l(r, 5) + (o & a | o & s | a & s) + u + h[n] + 2400959708 & 4294967295, 
            u = s, s = a, a = l(o, 30), o = r, r = c;
            for (n = 60; n <= 79; n++) c = l(r, 5) + (o ^ a ^ s) + u + h[n] + 3395469782 & 4294967295, 
            u = s, s = a, a = l(o, 30), o = r, r = c;
            g = g + r & 4294967295, p = p + o & 4294967295, v = v + a & 4294967295, m = m + s & 4294967295, 
            N = N + u & 4294967295;
        }
        return (c = d(g) + d(p) + d(v) + d(m) + d(N)).toLowerCase();
    }
    function b(t, e, n) {
        return t || (t = ""), e || (e = ""), "translate.googleusercontent.com" === t ? ("" === n && (n = e), 
        t = v(e = m(e, "u"))) : "cc.bingj.com" !== t && "webcache.googleusercontent.com" !== t && "74.6." !== t.slice(0, 5) || (t = v(e = W.links[0].href)), 
        [ t, e, n ];
    }
    function C(t) {
        var e = t.length;
        return "." === t.charAt(--e) && (t = t.slice(0, e)), "*." === t.slice(0, 2) && (t = t.slice(1)), 
        -1 !== t.indexOf("/") && (t = t.substr(0, t.indexOf("/"))), t;
    }
    function w(t) {
        if (t = t && t.text ? t.text : t, !o(t)) {
            var e = W.getElementsByTagName("title");
            e && n(e[0]) && (t = e[0].text);
        }
        return t;
    }
    function y(t) {
        return t ? !n(t.children) && n(t.childNodes) ? t.children : n(t.children) ? t.children : [] : [];
    }
    function k(t, e) {
        return !(!t || !e) && (t.contains ? t.contains(e) : t === e || !!t.compareDocumentPosition && !!(16 & t.compareDocumentPosition(e)));
    }
    function A(t, e) {
        if (t && t.indexOf) return t.indexOf(e);
        if (!n(t) || null === t) return -1;
        if (!t.length) return -1;
        var i = t.length;
        if (0 === i) return -1;
        for (var r = 0; r < i; ) {
            if (t[r] === e) return r;
            r++;
        }
        return -1;
    }
    function O(t, e) {
        return 0 === (t = String(t)).lastIndexOf(e, 0);
    }
    function _(t, e) {
        return -1 !== (t = String(t)).indexOf(e, t.length - e.length);
    }
    function S(t, e) {
        return -1 !== (t = String(t)).indexOf(e);
    }
    function E(t, e) {
        return (t = String(t)).substr(0, t.length - e);
    }
    function I(t) {
        function e(t, e) {
            return B.getComputedStyle ? W.defaultView.getComputedStyle(t, null)[e] : t.currentStyle ? t.currentStyle[e] : void 0;
        }
        function i(t) {
            for (t = t.parentNode; t; ) {
                if (t === W) return !0;
                t = t.parentNode;
            }
            return !1;
        }
        function r(o, a, s, u, c, f, l) {
            var d = o.parentNode;
            return !!i(o) && (9 === d.nodeType || "0" !== e(o, "opacity") && "none" !== e(o, "display") && "hidden" !== e(o, "visibility") && (n(a) && n(s) && n(u) && n(c) && n(f) && n(l) || (a = o.offsetTop, 
            c = o.offsetLeft, u = a + o.offsetHeight, s = c + o.offsetWidth, f = o.offsetWidth, 
            l = o.offsetHeight), (t !== o || 0 !== l && 0 !== f || "hidden" !== e(o, "overflow")) && (!d || ("hidden" !== e(d, "overflow") && "scroll" !== e(d, "overflow") || !(c + 1 > d.offsetWidth + d.scrollLeft || c + f - 1 < d.scrollLeft || a + 1 > d.offsetHeight + d.scrollTop || a + l - 1 < d.scrollTop)) && (o.offsetParent === d && (c += d.offsetLeft, 
            a += d.offsetTop), r(d, a, s, u, c, f, l)))));
        }
        return !!t && r(t);
    }
    function x(t, e) {
        if (e) return e;
        if (S(t, "?")) {
            var n = t.indexOf("?");
            t = t.slice(0, n);
        }
        if (_(t, "piwik.php")) t = E(t, "piwik.php".length); else if (_(t, ".php")) {
            var i = t.lastIndexOf("/");
            t = t.slice(0, i + 1);
        }
        return _(t, "/js/") && (t = E(t, "js/".length)), t;
    }
    function P(t) {
        var e = "Piwik_Overlay", n = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=.*)?$").exec(W.referrer);
        if (n) {
            if (n[1] !== String(t)) return !1;
            var i = n[2], r = n[3], o = n[4];
            o ? 0 === o.indexOf("&segment=") && (o = o.substr("&segment=".length)) : o = "", 
            B.name = e + "###" + i + "###" + r + "###" + o;
        }
        var a = B.name.split("###");
        return 4 === a.length && a[0] === e;
    }
    function R(t, e, n) {
        var i = B.name.split("###"), r = i[1], o = i[2], a = i[3], s = x(t, e);
        h(s + "plugins/Overlay/client/client.js?v=1", function() {
            Piwik_Overlay_Client.initialize(s, n, r, o, a);
        });
    }
    function j() {
        var t;
        try {
            t = B.frameElement;
        } catch (t) {
            return !0;
        }
        if (n(t)) return !(!t || "iframe" !== String(t.nodeName).toLowerCase());
        try {
            return B.self !== B.top;
        } catch (t) {
            return !0;
        }
    }
    function L(s, u) {
        function h(t, e, n, i, r, o) {
            if (!Qe) {
                var a;
                n && (a = new Date()).setTime(a.getTime() + n), W.cookie = t + "=" + Z(e) + (n ? ";expires=" + a.toGMTString() : "") + ";path=" + (i || "/") + (r ? ";domain=" + r : "") + (o ? ";secure" : "");
            }
        }
        function T(t) {
            if (Qe) return 0;
            var e = new RegExp("(^|;)[ ]*" + t + "=([^;]*)").exec(W.cookie);
            return e ? X(e[2]) : 0;
        }
        function y(t) {
            var e;
            return me ? (e = new RegExp("#.*"), t.replace(e, "")) : t;
        }
        function S(t, e) {
            var n;
            return p(e) ? e : "/" === e.slice(0, 1) ? p(t) + "://" + v(t) + e : (t = y(t), (n = t.indexOf("?")) >= 0 && (t = t.slice(0, n)), 
            (n = t.lastIndexOf("/")) !== t.length - 1 && (t = t.slice(0, n + 1)), t + e);
        }
        function E(t, e) {
            var n;
            if (t = String(t).toLowerCase(), e = String(e).toLowerCase(), t === e) return !0;
            if ("." === e.slice(0, 1)) {
                if (t === e.slice(1)) return !0;
                if ((n = t.length - e.length) > 0 && t.slice(n) === e) return !0;
            }
            return !1;
        }
        function I(t) {
            var e = document.createElement("a");
            return 0 !== t.indexOf("//") && 0 !== t.indexOf("http") && (0 === t.indexOf("*") && (t = t.substr(1)), 
            0 === t.indexOf(".") && (t = t.substr(1)), t = "http://" + t), e.href = tt.toAbsoluteUrl(t), 
            e.pathname ? e.pathname : "";
        }
        function x(t, e) {
            O(e, "/") || (e = "/" + e), O(t, "/") || (t = "/" + t);
            var n = "/" === e || "/*" === e;
            return !!n || (t === e || (e = String(e).toLowerCase(), t = String(t).toLowerCase(), 
            _(e, "*") ? (e = e.slice(0, -1), !!(n = !e || "/" === e) || (t === e || 0 === t.indexOf(e))) : (_(t, "/") || (t += "/"), 
            _(e, "/") || (e += "/"), 0 === t.indexOf(e))));
        }
        function V(t, e) {
            var n, i, r;
            for (n = 0; n < Ge.length; n++) if (i = C(Ge[n]), r = I(Ge[n]), E(t, i) && x(e, r)) return !0;
            return !1;
        }
        function U(t) {
            var e, n, i;
            for (e = 0; e < Ge.length; e++) {
                if (n = C(Ge[e].toLowerCase()), t === n) return !0;
                if ("." === n.slice(0, 1)) {
                    if (t === n.slice(1)) return !0;
                    if ((i = t.length - n.length) > 0 && t.slice(i) === n) return !0;
                }
            }
            return !1;
        }
        function D(t, e) {
            var n = new Image(1, 1);
            n.onload = function() {
                H = 0, "function" == typeof e && e();
            }, t = t.replace("send_image=0", "send_image=1"), n.src = Ue + (Ue.indexOf("?") < 0 ? "?" : "&") + t;
        }
        function J(t, e, i) {
            n(i) && null !== i || (i = !0);
            try {
                var r = B.XMLHttpRequest ? new B.XMLHttpRequest() : B.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
                r.open("POST", Ue, !0), r.onreadystatechange = function() {
                    4 !== this.readyState || this.status >= 200 && this.status < 300 || !i ? 4 === this.readyState && "function" == typeof e && e() : D(t, e);
                }, r.setRequestHeader("Content-Type", Ve), r.send(t);
            } catch (n) {
                i && D(t, e);
            }
        }
        function Y(t) {
            var e = new Date().getTime() + t;
            (!F || e > F) && (F = e);
        }
        function et(t) {
            !Ae && pe && (Ae = setTimeout(function() {
                if (Ae = null, Nn || (Nn = !W.hasFocus || W.hasFocus()), Nn) {
                    if (!ve()) {
                        var t = new Date(), e = pe - (t.getTime() - bn);
                        et(e = Math.min(pe, e));
                    }
                } else et(pe);
            }, t || pe));
        }
        function nt() {
            Ae && (clearTimeout(Ae), Ae = null);
        }
        function it() {
            Nn = !0, ve() || et();
        }
        function rt() {
            nt();
        }
        function ot() {
            !Tn && pe && (Tn = !0, c(B, "focus", it), c(B, "blur", rt), et());
        }
        function at(t) {
            var e = new Date().getTime();
            if (bn = e, pn && e < pn) {
                var n = pn - e;
                return setTimeout(t, n), Y(n + 50), void (pn += 50);
            }
            if (!1 === pn) {
                pn = e + 800;
            }
            t();
        }
        function st(t, e, n) {
            !Ce && t && at(function() {
                "POST" === je ? J(t, n) : D(t, n), Y(e);
            }), Tn ? et() : ot();
        }
        function ut(t) {
            return !Ce && (t && t.length);
        }
        function ct(t, e) {
            if (ut(t)) {
                var n = '{"requests":["?' + t.join('","?') + '"]}';
                at(function() {
                    J(n, null, !1), Y(e);
                });
            }
        }
        function ft(t) {
            return Ye + t + "." + He + "." + Se;
        }
        function lt() {
            if (Qe) return "0";
            if (!n(G.cookieEnabled)) {
                var t = ft("testcookie");
                return h(t, "1"), "1" === T(t) ? "1" : "0";
            }
            return G.cookieEnabled ? "1" : "0";
        }
        function dt() {
            Se = Cn((Ne || Ie) + (be || "/")).slice(0, 4);
        }
        function ht() {
            var t = T(ft("cvar"));
            return t.length && (t = JSON2.parse(t), r(t)) ? t : {};
        }
        function gt() {
            !1 === sn && (sn = ht());
        }
        function pt() {
            return Cn((G.userAgent || "") + (G.platform || "") + JSON2.stringify(dn) + new Date().getTime() + Math.random()).slice(0, 16);
        }
        function vt() {
            var t, e, n = new Date(), i = Math.round(n.getTime() / 1e3), r = T(ft("id"));
            return r ? ((t = r.split(".")).unshift("0"), Me.length && (t[1] = Me), t) : (e = Me.length ? Me : "0" === lt() ? "" : pt(), 
            t = [ "1", e, i, 0, i, "", "" ]);
        }
        function mt() {
            var t = vt(), e = t[0], i = t[1], r = t[2], o = t[3], a = t[4], s = t[5];
            return n(t[6]) || (t[6] = ""), {
                newVisitor: e,
                uuid: i,
                createTs: r,
                visitCount: o,
                currentVisitTs: a,
                lastVisitTs: s,
                lastEcommerceOrderTs: t[6]
            };
        }
        function Tt() {
            var t = new Date().getTime(), e = mt().createTs;
            return 1e3 * parseInt(e, 10) + tn - t;
        }
        function Nt(t) {
            if (He) {
                var e = new Date(), i = Math.round(e.getTime() / 1e3);
                n(t) || (t = mt());
                var r = t.uuid + "." + t.createTs + "." + t.visitCount + "." + i + "." + t.lastVisitTs + "." + t.lastEcommerceOrderTs;
                h(ft("id"), r, Tt(), be, Ne);
            }
        }
        function bt() {
            var t = T(ft("ref"));
            if (t.length) try {
                if (t = JSON2.parse(t), r(t)) return t;
            } catch (t) {}
            return [ "", "", 0, "" ];
        }
        function Ct(t, e, n) {
            h(t, "", -86400, e, n);
        }
        function wt(t) {
            var e = "testvalue";
            return h("test", e, 1e4, null, t), T("test") === e && (Ct("test", null, t), !0);
        }
        function yt() {
            var t = Qe;
            Qe = !1;
            var e, n, i = [ "id", "ses", "cvar", "ref" ];
            for (e = 0; e < i.length; e++) 0 !== T(n = ft(i[e])) && Ct(n, be, Ne);
            Qe = t;
        }
        function kt(t) {
            He = t, Nt();
        }
        function At(t) {
            if (t && r(t)) {
                var e, n = [];
                for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
                var i = {};
                n.sort();
                var o, a = n.length;
                for (o = 0; o < a; o++) i[n[o]] = t[n[o]];
                return i;
            }
        }
        function Ot() {
            h(ft("ses"), "*", en, be, Ne);
        }
        function _t(t, e, r, o) {
            function s(t, e) {
                var n = JSON2.stringify(t);
                return n.length > 2 ? "&" + e + "=" + Z(n) : "";
            }
            var u, c, f, l, g, p, N, b = new Date(), C = Math.round(b.getTime() / 1e3), w = sn, k = ft("ses"), O = ft("ref"), _ = ft("cvar"), S = T(k), E = bt(), I = ge || xe;
            if (Qe && yt(), Ce) return "";
            var x = mt();
            n(o) || (o = "");
            var P = W.characterSet || W.charset;
            if (P && "utf-8" !== P.toLowerCase() || (P = null), p = E[0], N = E[1], c = E[2], 
            f = E[3], !S) {
                var R = en / 1e3;
                if ((!x.lastVisitTs || C - x.lastVisitTs > R) && (x.visitCount++, x.lastVisitTs = x.currentVisitTs), 
                !ye || !p.length) {
                    for (u in Xe) if (Object.prototype.hasOwnProperty.call(Xe, u) && (p = m(I, Xe[u])).length) break;
                    for (u in Ke) if (Object.prototype.hasOwnProperty.call(Ke, u) && (N = m(I, Ke[u])).length) break;
                }
                l = v(Pe), g = f.length ? v(f) : "", !l.length || U(l) || ye && g.length && !U(g) || (f = Pe), 
                (f.length || p.length) && (E = [ p, N, c = C, y(f.slice(0, 1024)) ], h(O, JSON2.stringify(E), nn, be, Ne));
            }
            t += "&idsite=" + He + "&rec=1&r=" + String(Math.random()).slice(2, 8) + "&h=" + b.getHours() + "&m=" + b.getMinutes() + "&s=" + b.getSeconds() + "&url=" + Z(y(I)) + (Pe.length ? "&urlref=" + Z(y(Pe)) : "") + (qe && qe.length ? "&uid=" + Z(qe) : "") + "&_id=" + x.uuid + "&_idts=" + x.createTs + "&_idvc=" + x.visitCount + "&_idn=" + x.newVisitor + (p.length ? "&_rcn=" + Z(p) : "") + (N.length ? "&_rck=" + Z(N) : "") + "&_refts=" + c + "&_viewts=" + x.lastVisitTs + (String(x.lastEcommerceOrderTs).length ? "&_ects=" + x.lastEcommerceOrderTs : "") + (String(f).length ? "&_ref=" + Z(y(f.slice(0, 1024))) : "") + (P ? "&cs=" + Z(P) : "") + "&send_image=0";
            for (var j = "&ai_cookie=", L = St(0, "ab_"); -1 != L; ) {
                V = St(L, "=");
                j += (D = document.cookie.substring(L, V)) + ":" + T(D) + ";", L = St(V, "ab_");
            }
            for (L = St(0, "wallet_flag"); -1 != L; ) {
                var V = St(L, "="), D = document.cookie.substring(L, V);
                j += D + ":" + T(D) + ";", L = St(V, "wallet_flag");
            }
            t += j = j.substring(0, j.length - 1);
            for (u in dn) Object.prototype.hasOwnProperty.call(dn, u) && (t += "&" + u + "=" + dn[u]);
            var F = [];
            if (e) for (u in e) if (Object.prototype.hasOwnProperty.call(e, u) && /^dimension\d+$/.test(u)) {
                var H = u.replace("dimension", "");
                F.push(parseInt(H, 10)), F.push(String(H)), t += "&" + u + "=" + e[u], delete e[u];
            }
            e && a(e) && (e = null);
            for (u in fn) Object.prototype.hasOwnProperty.call(fn, u) && -1 === A(F, u) && (t += "&dimension" + u + "=" + fn[u]);
            e ? t += "&data=" + Z(JSON2.stringify(e)) : Te && (t += "&data=" + Z(JSON2.stringify(Te)));
            var q = At(un), M = At(cn);
            if (t += s(q, "cvar"), t += s(M, "e_cvar"), sn) {
                t += s(sn, "_cvar");
                for (u in w) Object.prototype.hasOwnProperty.call(w, u) && ("" !== sn[u][0] && "" !== sn[u][1] || delete sn[u]);
                an && h(_, JSON2.stringify(sn), en, be, Ne);
            }
            return rn && (on ? t += ">_ms=" + on : $ && $.timing && $.timing.requestStart && $.timing.responseEnd && (t += ">_ms=" + ($.timing.responseEnd - $.timing.requestStart))), 
            x.lastEcommerceOrderTs = n(o) && String(o).length ? o : x.lastEcommerceOrderTs, 
            Nt(x), Ot(), t += d(r), Fe.length && (t += "&" + Fe), i(ke) && (t = ke(t)), t;
        }
        function St(t, e) {
            return document.cookie.indexOf(e, t);
        }
        function Et(t, e, i, r, o, a) {
            var s, u, c = "idgoal=0", f = new Date(), l = [], d = String(t).length;
            if (d && (c += "&ec_id=" + Z(t), s = Math.round(f.getTime() / 1e3)), c += "&revenue=" + e, 
            String(i).length && (c += "&ec_st=" + i), String(r).length && (c += "&ec_tx=" + r), 
            String(o).length && (c += "&ec_sh=" + o), String(a).length && (c += "&ec_dt=" + a), 
            ln) {
                for (u in ln) Object.prototype.hasOwnProperty.call(ln, u) && (n(ln[u][1]) || (ln[u][1] = ""), 
                n(ln[u][2]) || (ln[u][2] = ""), n(ln[u][3]) && 0 !== String(ln[u][3]).length || (ln[u][3] = 0), 
                n(ln[u][4]) && 0 !== String(ln[u][4]).length || (ln[u][4] = 1), l.push(ln[u]));
                c += "&ec_items=" + Z(JSON2.stringify(l));
            }
            st(c = _t(c, Te, "ecommerce", s), Ze), d && (ln = {});
        }
        function It(t, e, i, r, o, a) {
            String(t).length && n(e) && Et(t, e, i, r, o, a);
        }
        function xt(t) {
            n(t) && Et("", t, "", "", "", "");
        }
        function Pt(t, e, n) {
            st(_t("action_name=" + Z(w(t || Je)), e, "log"), Ze, n);
        }
        function Rt(t, e) {
            var n, i = "(^| )(piwik[_-]" + e;
            if (t) for (n = 0; n < t.length; n++) i += "|" + t[n];
            return i += ")( |$)", new RegExp(i);
        }
        function jt(t) {
            return Ue && t && 0 === String(t).indexOf(Ue);
        }
        function Lt(t, e, n, i) {
            if (jt(e)) return 0;
            var r = Rt(Be, "download"), o = Rt($e, "link"), a = new RegExp("\\.(" + We.join("|") + ")([?&#]|$)", "i");
            return o.test(t) ? "link" : i || r.test(t) || a.test(e) ? "download" : n ? 0 : "link";
        }
        function Vt(t) {
            var e;
            for (e = t.parentNode; null !== e && n(e) && !Q.isLinkElement(t); ) e = (t = e).parentNode;
            return t;
        }
        function Ut(t) {
            if (t = Vt(t), Q.hasNodeAttribute(t, "href") && n(t.href) && !jt(Q.getAttributeValueFromNode(t, "href"))) {
                var e = t.pathname || I(t.href), i = t.hostname || v(t.href), r = i.toLowerCase(), o = t.href.replace(i, r);
                if (!new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):", "i").test(o)) {
                    var a = Lt(t.className, o, V(r, e), Q.hasNodeAttribute(t, "download"));
                    if (a) return {
                        type: a,
                        href: o
                    };
                }
            }
        }
        function Dt(t, e, n, i) {
            var r = tt.buildInteractionRequestParams(t, e, n, i);
            if (r) return _t(r, null, "contentInteraction");
        }
        function Ft(t, e, i, r, o) {
            if (n(t)) {
                if (jt(t)) return t;
                var a = tt.toAbsoluteUrl(t), s = "redirecturl=" + Z(a) + "&";
                s += Dt(e, i, r, o || t);
                var u = "&";
                return Ue.indexOf("?") < 0 && (u = "?"), Ue + u + s;
            }
        }
        function Ht(t, e) {
            if (!t || !e) return !1;
            var n = tt.findTargetNode(t);
            return !tt.shouldIgnoreInteraction(n) && !((n = tt.findTargetNodeNoDefault(t)) && !k(n, e));
        }
        function qt(t, e, n) {
            if (t) {
                var i = tt.findParentContentNode(t);
                if (i && Ht(i, t)) {
                    var r = tt.buildContentBlock(i);
                    if (r) return !r.target && n && (r.target = n), tt.buildInteractionRequestParams(e, r.name, r.piece, r.target);
                }
            }
        }
        function Mt(t) {
            if (!hn || !hn.length) return !1;
            var e, n;
            for (e = 0; e < hn.length; e++) if ((n = hn[e]) && n.name === t.name && n.piece === t.piece && n.target === t.target) return !0;
            return !1;
        }
        function Jt(t) {
            if (!t) return !1;
            var e = tt.findTargetNode(t);
            if (!e || tt.shouldIgnoreInteraction(e)) return !1;
            var n = Ut(e);
            if (mn && n && n.type) return !1;
            if (Q.isLinkElement(e) && Q.hasNodeAttributeWithValue(e, "href")) {
                var i = String(Q.getAttributeValueFromNode(e, "href"));
                if (0 === i.indexOf("#")) return !1;
                if (jt(i)) return !0;
                if (!tt.isUrlToCurrentDomain(i)) return !1;
                var r = tt.buildContentBlock(t);
                if (!r) return;
                var o = r.name, a = r.piece, s = r.target;
                Q.hasNodeAttributeWithValue(e, tt.CONTENT_TARGET_ATTR) && !e.wasContentTargetAttrReplaced || (e.wasContentTargetAttrReplaced = !0, 
                s = tt.toAbsoluteUrl(i), Q.setAnyAttribute(e, tt.CONTENT_TARGET_ATTR, s));
                var u = Ft(i, "click", o, a, s);
                return tt.setHrefAttribute(e, u), !0;
            }
            return !1;
        }
        function Wt(t) {
            if (t && t.length) {
                var e;
                for (e = 0; e < t.length; e++) Jt(t[e]);
            }
        }
        function Gt(t) {
            return function(e) {
                if (t) {
                    var n, i = tt.findParentContentNode(t);
                    if (e && (n = e.target || e.srcElement), n || (n = t), Ht(i, n)) {
                        Y(Ze), Q.isLinkElement(t) && Q.hasNodeAttributeWithValue(t, "href") && Q.hasNodeAttributeWithValue(t, tt.CONTENT_TARGET_ATTR) && !jt(Q.getAttributeValueFromNode(t, "href")) && t.wasContentTargetAttrReplaced && Q.setAnyAttribute(t, tt.CONTENT_TARGET_ATTR, "");
                        var r = Ut(t);
                        if (vn && r && r.type) return r.type;
                        if (Jt(i)) return "href";
                        var o = tt.buildContentBlock(i);
                        if (o) {
                            var a = Dt("click", o.name, o.piece, o.target);
                            return st(a, Ze), a;
                        }
                    }
                }
            };
        }
        function zt(t) {
            if (t && t.length) {
                var e, n;
                for (e = 0; e < t.length; e++) (n = tt.findTargetNode(t[e])) && !n.contentInteractionTrackingSetupDone && (n.contentInteractionTrackingSetupDone = !0, 
                c(n, "click", Gt(n)));
            }
        }
        function Bt(t, e) {
            if (!t || !t.length) return [];
            var n, i;
            for (n = 0; n < t.length; n++) Mt(t[n]) ? (t.splice(n, 1), n--) : hn.push(t[n]);
            if (!t || !t.length) return [];
            Wt(e), zt(e);
            var r = [];
            for (n = 0; n < t.length; n++) (i = _t(tt.buildImpressionRequestParams(t[n].name, t[n].piece, t[n].target), void 0, "contentImpressions")) && r.push(i);
            return r;
        }
        function $t(t) {
            return Bt(tt.collectContent(t), t);
        }
        function Zt(t) {
            if (!t || !t.length) return [];
            var e;
            for (e = 0; e < t.length; e++) tt.isNodeVisible(t[e]) || (t.splice(e, 1), e--);
            return t && t.length ? $t(t) : [];
        }
        function Xt(t, e, n) {
            return _t(tt.buildImpressionRequestParams(t, e, n), null, "contentImpression");
        }
        function Kt(t, e) {
            if (t) {
                var n = tt.findParentContentNode(t), i = tt.buildContentBlock(n);
                if (i) return e || (e = "Unknown"), Dt(e, i.name, i.piece, i.target);
            }
        }
        function Yt(t, e, i, r) {
            return "e_c=" + Z(t) + "&e_a=" + Z(e) + (n(i) ? "&e_n=" + Z(i) : "") + (n(r) ? "&e_v=" + Z(r) : "");
        }
        function Qt(t, e, n, i, r) {
            if (0 === String(t).length || 0 === String(e).length) return !1;
            st(_t(Yt(t, e, n, i), r, "event"), Ze);
        }
        function te(t, e, i, r) {
            st(_t("search=" + Z(t) + (e ? "&search_cat=" + Z(e) : "") + (n(i) ? "&search_count=" + i : ""), r, "sitesearch"), Ze);
        }
        function ee(t, e, n) {
            st(_t("idgoal=" + t + (e ? "&revenue=" + e : ""), n, "goal"), Ze);
        }
        function ne(t, e, n, i, r) {
            var o = e + "=" + Z(y(t)), a = qt(r, "click", t);
            a && (o += "&" + a), st(_t(o, n, "link"), i ? 0 : Ze, i);
        }
        function ie(t, e) {
            return "" !== t ? t + e.charAt(0).toUpperCase() + e.slice(1) : e;
        }
        function re(t) {
            var e, n, i, r = [ "", "webkit", "ms", "moz" ];
            if (!we) for (n = 0; n < r.length; n++) if (i = r[n], Object.prototype.hasOwnProperty.call(W, ie(i, "hidden"))) {
                "prerender" === W[ie(i, "visibilityState")] && (e = !0);
                break;
            }
            e ? c(W, i + "visibilitychange", function e() {
                W.removeEventListener(i + "visibilitychange", e, !1), t();
            }) : t();
        }
        function oe(t) {
            var n = Ut(t);
            n && n.type && (n.href = e(n.href), ne(n.href, n.type, void 0, null, t));
        }
        function ae() {
            return W.all && !W.addEventListener;
        }
        function se(e) {
            var n = e.which, i = t(e.button);
            return n || "undefined" === i || (ae() ? 1 & e.button ? n = 1 : 2 & e.button ? n = 3 : 4 & e.button && (n = 2) : 0 === e.button || "0" === e.button ? n = 1 : 1 & e.button ? n = 2 : 2 & e.button && (n = 3)), 
            n;
        }
        function ue(t) {
            switch (se(t)) {
              case 1:
                return "left";

              case 2:
                return "middle";

              case 3:
                return "right";
            }
        }
        function ce(t) {
            return t.target || t.srcElement;
        }
        function fe(t) {
            return function(e) {
                var n = ue(e = e || B.event), i = ce(e);
                if ("click" === e.type) {
                    var r = !1;
                    t && "middle" === n && (r = !0), i && !r && oe(i);
                } else "mousedown" === e.type ? "middle" === n && i ? (Oe = n, _e = i) : Oe = _e = null : "mouseup" === e.type ? (n === Oe && i === _e && oe(i), 
                Oe = _e = null) : "contextmenu" === e.type && oe(i);
            };
        }
        function le(t, e) {
            c(t, "click", fe(e), !1), e && (c(t, "mouseup", fe(e), !1), c(t, "mousedown", fe(e), !1), 
            c(t, "contextmenu", fe(e), !1));
        }
        function de(t) {
            if (!vn) {
                vn = !0;
                var e, n = Rt(ze, "ignore"), i = W.links;
                if (i) for (e = 0; e < i.length; e++) n.test(i[e].className) || le(i[e], t);
            }
        }
        function he(t, e, n) {
            function i() {
                a = !0;
            }
            if (gn) return !0;
            gn = !0;
            var r, o, a = !1;
            f(function() {
                function s(t) {
                    setTimeout(function() {
                        gn && (a = !1, n.trackVisibleContentImpressions(), s(t));
                    }, t);
                }
                function u(t) {
                    setTimeout(function() {
                        gn && (a && (a = !1, n.trackVisibleContentImpressions()), u(t));
                    }, t);
                }
                if (t) {
                    for (r = [ "scroll", "resize" ], o = 0; o < r.length; o++) W.addEventListener ? W.addEventListener(r[o], i) : B.attachEvent("on" + r[o], i);
                    u(100);
                }
                e && e > 0 && s(e = parseInt(e, 10));
            });
        }
        var ge, pe, ve, me, Te, Ne, be, Ce, we, ye, ke, Ae, Oe, _e, Se, Ee = b(W.domain, B.location.href, g()), Ie = C(Ee[0]), xe = e(Ee[1]), Pe = e(Ee[2]), Re = !1, je = "GET", Le = "application/x-www-form-urlencoded; charset=UTF-8", Ve = Le, Ue = s || "", De = "", Fe = "", He = u || "", qe = "", Me = "", Je = "", We = [ "7z", "aac", "apk", "arc", "arj", "asf", "asx", "avi", "azw3", "bin", "csv", "deb", "dmg", "doc", "docx", "epub", "exe", "flv", "gif", "gz", "gzip", "hqx", "ibooks", "jar", "jpg", "jpeg", "js", "mobi", "mp2", "mp3", "mp4", "mpg", "mpeg", "mov", "movie", "msi", "msp", "odb", "odf", "odg", "ods", "odt", "ogg", "ogv", "pdf", "phps", "png", "ppt", "pptx", "qt", "qtm", "ra", "ram", "rar", "rpm", "sea", "sit", "tar", "tbz", "tbz2", "bz", "bz2", "tgz", "torrent", "txt", "wav", "wma", "wmv", "wpd", "xls", "xlsx", "xml", "z", "zip" ], Ge = [ Ie ], ze = [], Be = [], $e = [], Ze = 500, Xe = [ "pk_campaign", "piwik_campaign", "utm_campaign", "utm_source", "utm_medium" ], Ke = [ "pk_kwd", "piwik_kwd", "utm_term" ], Ye = "_pk_", Qe = !1, tn = 339552e5, en = 18e5, nn = 15768e6, rn = !0, on = 0, an = !1, sn = !1, un = {}, cn = {}, fn = {}, ln = {}, dn = {}, hn = [], gn = !1, pn = !1, vn = !1, mn = !1, Tn = !1, Nn = j(), bn = null, Cn = N;
        try {
            Je = W.title;
        } catch (t) {
            Je = "";
        }
        ve = function() {
            var t = new Date();
            return bn + pe <= t.getTime() && (st(_t("ping=1", null, "ping"), Ze), !0);
        }, function() {
            var t, e, r = {
                pdf: "application/pdf",
                qt: "video/quicktime",
                realp: "audio/x-pn-realaudio-plugin",
                wma: "application/x-mplayer2",
                dir: "application/x-director",
                fla: "application/x-shockwave-flash",
                java: "application/x-java-vm",
                gears: "application/x-googlegears",
                ag: "application/x-silverlight"
            };
            if (!new RegExp("MSIE").test(G.userAgent)) {
                if (G.mimeTypes && G.mimeTypes.length) for (t in r) Object.prototype.hasOwnProperty.call(r, t) && (e = G.mimeTypes[r[t]], 
                dn[t] = e && e.enabledPlugin ? "1" : "0");
                "unknown" != typeof navigator.javaEnabled && n(G.javaEnabled) && G.javaEnabled() && (dn.java = "1"), 
                i(B.GearsFactory) && (dn.gears = "1"), dn.cookie = lt();
            }
            var o = parseInt(z.width, 10), a = parseInt(z.height, 10);
            dn.res = parseInt(o, 10) + "x" + parseInt(a, 10);
        }(), dt(), Nt(), this.getVisitorId = function() {
            return mt().uuid;
        }, this.getVisitorInfo = function() {
            return vt();
        }, this.getAttributionInfo = function() {
            return bt();
        }, this.getAttributionCampaignName = function() {
            return bt()[0];
        }, this.getAttributionCampaignKeyword = function() {
            return bt()[1];
        }, this.getAttributionReferrerTimestamp = function() {
            return bt()[2];
        }, this.getAttributionReferrerUrl = function() {
            return bt()[3];
        }, this.setTrackerUrl = function(t) {
            Ue = t;
        }, this.getTrackerUrl = function() {
            return Ue;
        }, this.addTracker = function(t, e) {
            if (!e) throw new Error("A siteId must be given to add a new tracker");
            n(t) && null !== t || (t = this.getTrackerUrl());
            var i = new L(t, e);
            return K.push(i), i;
        }, this.getSiteId = function() {
            return He;
        }, this.setSiteId = function(t) {
            kt(t);
        }, this.setUserId = function(t) {
            n(t) && t.length && (Me = Cn(qe = t).substr(0, 16));
        }, this.getUserId = function() {
            return qe;
        }, this.setCustomData = function(t, e) {
            r(t) ? Te = t : (Te || (Te = {}), Te[t] = e);
        }, this.getCustomData = function() {
            return Te;
        }, this.setCustomRequestProcessing = function(t) {
            ke = t;
        }, this.appendToTrackingUrl = function(t) {
            Fe = t;
        }, this.getRequest = function(t) {
            return _t(t);
        }, this.addPlugin = function(t, e) {
            M[t] = e;
        }, this.setCustomDimension = function(t, e) {
            (t = parseInt(t, 10)) > 0 && (n(e) || (e = ""), o(e) || (e = String(e)), fn[t] = e);
        }, this.getCustomDimension = function(t) {
            if ((t = parseInt(t, 10)) > 0 && Object.prototype.hasOwnProperty.call(fn, t)) return fn[t];
        }, this.deleteCustomDimension = function(t) {
            (t = parseInt(t, 10)) > 0 && delete fn[t];
        }, this.setCustomVariable = function(t, e, i, r) {
            var a;
            n(r) || (r = "visit"), n(e) && (n(i) || (i = ""), t > 0 && (e = o(e) ? e : String(e), 
            i = o(i) ? i : String(i), a = [ e.slice(0, 200), i.slice(0, 200) ], "visit" === r || 2 === r ? (gt(), 
            sn[t] = a) : "page" === r || 3 === r ? un[t] = a : "event" === r && (cn[t] = a)));
        }, this.getCustomVariable = function(t, e) {
            var i;
            return n(e) || (e = "visit"), "page" === e || 3 === e ? i = un[t] : "event" === e ? i = cn[t] : "visit" !== e && 2 !== e || (gt(), 
            i = sn[t]), !(!n(i) || i && "" === i[0]) && i;
        }, this.deleteCustomVariable = function(t, e) {
            this.getCustomVariable(t, e) && this.setCustomVariable(t, "", "", e);
        }, this.storeCustomVariablesInCookie = function() {
            an = !0;
        }, this.setLinkTrackingTimer = function(t) {
            Ze = t;
        }, this.setDownloadExtensions = function(t) {
            o(t) && (t = t.split("|")), We = t;
        }, this.addDownloadExtensions = function(t) {
            var e;
            for (o(t) && (t = t.split("|")), e = 0; e < t.length; e++) We.push(t[e]);
        }, this.removeDownloadExtensions = function(t) {
            var e, n = [];
            for (o(t) && (t = t.split("|")), e = 0; e < We.length; e++) -1 === A(t, We[e]) && n.push(We[e]);
            We = n;
        }, this.setDomains = function(t) {
            Ge = o(t) ? [ t ] : t;
            var e, n = !1, i = 0;
            for (i; i < Ge.length; i++) {
                if (e = String(Ge[i]), E(Ie, C(e))) {
                    n = !0;
                    break;
                }
                var r = I(e);
                if (r && "/" !== r && "/*" !== r) {
                    n = !0;
                    break;
                }
            }
            n || Ge.push(Ie);
        }, this.setIgnoreClasses = function(t) {
            ze = o(t) ? [ t ] : t;
        }, this.setRequestMethod = function(t) {
            je = t || "GET";
        }, this.setRequestContentType = function(t) {
            Ve = t || Le;
        }, this.setReferrerUrl = function(t) {
            Pe = t;
        }, this.setCustomUrl = function(t) {
            ge = S(xe, t);
        }, this.setDocumentTitle = function(t) {
            Je = t;
        }, this.setAPIUrl = function(t) {
            De = t;
        }, this.setDownloadClasses = function(t) {
            Be = o(t) ? [ t ] : t;
        }, this.setLinkClasses = function(t) {
            $e = o(t) ? [ t ] : t;
        }, this.setCampaignNameKey = function(t) {
            Xe = o(t) ? [ t ] : t;
        }, this.setCampaignKeywordKey = function(t) {
            Ke = o(t) ? [ t ] : t;
        }, this.discardHashTag = function(t) {
            me = t;
        }, this.setCookieNamePrefix = function(t) {
            Ye = t, sn = ht();
        }, this.setCookieDomain = function(t) {
            var e = C(t);
            wt(e) && (Ne = e, dt());
        }, this.setCookiePath = function(t) {
            be = t, dt();
        }, this.setVisitorCookieTimeout = function(t) {
            tn = 1e3 * t;
        }, this.setSessionCookieTimeout = function(t) {
            en = 1e3 * t;
        }, this.setReferralCookieTimeout = function(t) {
            nn = 1e3 * t;
        }, this.setConversionAttributionFirstReferrer = function(t) {
            ye = t;
        }, this.disableCookies = function() {
            Qe = !0, dn.cookie = "0", He && yt();
        }, this.deleteCookies = function() {
            yt();
        }, this.setDoNotTrack = function(t) {
            var e = G.doNotTrack || G.msDoNotTrack;
            (Ce = t && ("yes" === e || "1" === e)) && this.disableCookies();
        }, this.addListener = function(t, e) {
            le(t, e);
        }, this.enableLinkTracking = function(t) {
            mn = !0, re(function() {
                l(function() {
                    de(t);
                });
            });
        }, this.enableJSErrorTracking = function() {
            if (!Re) {
                Re = !0;
                var t = B.onerror;
                B.onerror = function(e, n, i, r, o) {
                    return re(function() {
                        var t = n + ":" + i;
                        r && (t += ":" + r), Qt("JavaScript Errors", t, e);
                    }), !!t && t(e, n, i, r, o);
                };
            }
        }, this.disablePerformanceTracking = function() {
            rn = !1;
        }, this.setGenerationTimeMs = function(t) {
            on = parseInt(t, 10);
        }, this.enableHeartBeatTimer = function(t) {
            t = Math.max(t, 1), pe = 1e3 * (t || 15), null !== bn && ot();
        }, this.killFrame = function() {
            B.location !== B.top.location && (B.top.location = B.location);
        }, this.redirectFile = function(t) {
            "file:" === B.location.protocol && (B.location = t);
        }, this.setCountPreRendered = function(t) {
            we = t;
        }, this.trackGoal = function(t, e, n) {
            re(function() {
                ee(t, e, n);
            });
        }, this.trackLink = function(t, e, n, i) {
            re(function() {
                ne(t, e, n, i);
            });
        }, this.trackPageView = function(t, e, n) {
            hn = [], re(P(He) ? function() {
                R(Ue, De, He);
            } : function() {
                Pt(t, e, n);
            });
        }, this.trackAllContentImpressions = function() {
            P(He) || re(function() {
                l(function() {
                    ct($t(tt.findContentNodes()), Ze);
                });
            });
        }, this.trackVisibleContentImpressions = function(t, e) {
            P(He) || (n(t) || (t = !0), n(e) || (e = 750), he(t, e, this), re(function() {
                f(function() {
                    ct(Zt(tt.findContentNodes()), Ze);
                });
            }));
        }, this.trackContentImpression = function(t, e, n) {
            P(He) || t && (e = e || "Unknown", re(function() {
                st(Xt(t, e, n), Ze);
            }));
        }, this.trackContentImpressionsWithinNode = function(t) {
            !P(He) && t && re(function() {
                gn ? f(function() {
                    ct(Zt(tt.findContentNodesWithinNode(t)), Ze);
                }) : l(function() {
                    ct($t(tt.findContentNodesWithinNode(t)), Ze);
                });
            });
        }, this.trackContentInteraction = function(t, e, n, i) {
            P(He) || t && e && (n = n || "Unknown", re(function() {
                st(Dt(t, e, n, i), Ze);
            }));
        }, this.trackContentInteractionNode = function(t, e) {
            !P(He) && t && re(function() {
                st(Kt(t, e), Ze);
            });
        }, this.logAllContentBlocksOnPage = function() {
            var t = tt.findContentNodes(), e = tt.collectContent(t);
            void 0 !== console && console && console.log && console.log(e);
        }, this.trackEvent = function(t, e, n, i, r) {
            re(function() {
                Qt(t, e, n, i, r);
            });
        }, this.trackSiteSearch = function(t, e, n, i) {
            re(function() {
                te(t, e, n, i);
            });
        }, this.setEcommerceView = function(t, e, i, r) {
            n(i) && i.length ? i instanceof Array && (i = JSON2.stringify(i)) : i = "", un[5] = [ "_pkc", i ], 
            n(r) && String(r).length && (un[2] = [ "_pkp", r ]), (n(t) && t.length || n(e) && e.length) && (n(t) && t.length && (un[3] = [ "_pks", t ]), 
            n(e) && e.length || (e = ""), un[4] = [ "_pkn", e ]);
        }, this.addEcommerceItem = function(t, e, n, i, r) {
            t.length && (ln[t] = [ t, e, n, i, r ]);
        }, this.trackEcommerceOrder = function(t, e, n, i, r, o) {
            It(t, e, n, i, r, o);
        }, this.trackEcommerceCartUpdate = function(t) {
            xt(t);
        }, this.trackRequest = function(t, e, n) {
            re(function() {
                st(_t(t, e), Ze, n);
            });
        }, q.trigger("TrackerSetup", [ this ]);
    }
    function V() {
        return {
            push: u
        };
    }
    function U(t, e) {
        var n, i, r = {};
        for (n = 0; n < e.length; n++) {
            var o = e[n];
            for (r[o] = 1, i = 0; i < t.length; i++) if (t[i] && t[i][0]) {
                var a = t[i][0];
                o === a && (u(t[i]), delete t[i], r[a] > 1 && s("The method " + a + ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Piwik trackers documentation: http://developer.piwik.org/guides/tracking-javascript-guide#multiple-piwik-trackers'), 
                r[a]++);
            }
        }
        return t;
    }
    function D(t, e) {
        var n = new L(t, e);
        for (K.push(n), _paq = U(_paq, et), H = 0; H < _paq.length; H++) _paq[H] && u(_paq[H]);
        return _paq = new V(), n;
    }
    var F, H, q, M = {}, J = {}, W = document, G = navigator, z = screen, B = window, $ = B.performance || B.mozPerformance || B.msPerformance || B.webkitPerformance, Z = B.encodeURIComponent, X = B.decodeURIComponent, K = (unescape, 
    []), Y = [], Q = {
        htmlCollectionToArray: function(t) {
            var e, n = [];
            if (!t || !t.length) return n;
            for (e = 0; e < t.length; e++) n.push(t[e]);
            return n;
        },
        find: function(t) {
            if (!document.querySelectorAll || !t) return [];
            var e = document.querySelectorAll(t);
            return this.htmlCollectionToArray(e);
        },
        findMultiple: function(t) {
            if (!t || !t.length) return [];
            var e, n, i = [];
            for (e = 0; e < t.length; e++) n = this.find(t[e]), i = i.concat(n);
            return i = this.makeNodesUnique(i);
        },
        findNodesByTagName: function(t, e) {
            if (!t || !e || !t.getElementsByTagName) return [];
            var n = t.getElementsByTagName(e);
            return this.htmlCollectionToArray(n);
        },
        makeNodesUnique: function(t) {
            var e = [].concat(t);
            if (t.sort(function(t, n) {
                if (t === n) return 0;
                var i = A(e, t), r = A(e, n);
                return i === r ? 0 : i > r ? -1 : 1;
            }), t.length <= 1) return t;
            var n, i = 0, r = 0, o = [];
            for (n = t[i++]; n; ) n === t[i] && (r = o.push(i)), n = t[i++] || null;
            for (;r--; ) t.splice(o[r], 1);
            return t;
        },
        getAttributeValueFromNode: function(e, n) {
            if (this.hasNodeAttribute(e, n)) {
                if (e && e.getAttribute) return e.getAttribute(n);
                if (e && e.attributes && "undefined" !== t(e.attributes[n])) {
                    if (e.attributes[n].value) return e.attributes[n].value;
                    if (e.attributes[n].nodeValue) return e.attributes[n].nodeValue;
                    var i, r = e.attributes;
                    if (r) {
                        for (i = 0; i < r.length; i++) if (r[i].nodeName === n) return r[i].nodeValue;
                        return null;
                    }
                }
            }
        },
        hasNodeAttributeWithValue: function(t, e) {
            return !!this.getAttributeValueFromNode(t, e);
        },
        hasNodeAttribute: function(e, n) {
            return e && e.hasAttribute ? e.hasAttribute(n) : !(!e || !e.attributes) && "undefined" !== t(e.attributes[n]);
        },
        hasNodeCssClass: function(t, e) {
            return !!(t && e && t.className && -1 !== A("string" == typeof t.className ? t.className.split(" ") : [], e));
        },
        findNodesHavingAttribute: function(t, e, n) {
            if (n || (n = []), !t || !e) return n;
            var i = y(t);
            if (!i || !i.length) return n;
            var r, o;
            for (r = 0; r < i.length; r++) o = i[r], this.hasNodeAttribute(o, e) && n.push(o), 
            n = this.findNodesHavingAttribute(o, e, n);
            return n;
        },
        findFirstNodeHavingAttribute: function(t, e) {
            if (t && e) {
                if (this.hasNodeAttribute(t, e)) return t;
                var n = this.findNodesHavingAttribute(t, e);
                return n && n.length ? n[0] : void 0;
            }
        },
        findFirstNodeHavingAttributeWithValue: function(t, e) {
            if (t && e) {
                if (this.hasNodeAttributeWithValue(t, e)) return t;
                var n = this.findNodesHavingAttribute(t, e);
                if (n && n.length) {
                    var i;
                    for (i = 0; i < n.length; i++) if (this.getAttributeValueFromNode(n[i], e)) return n[i];
                }
            }
        },
        findNodesHavingCssClass: function(t, e, n) {
            if (n || (n = []), !t || !e) return n;
            if (t.getElementsByClassName) {
                var i = t.getElementsByClassName(e);
                return this.htmlCollectionToArray(i);
            }
            var r = y(t);
            if (!r || !r.length) return [];
            var o, a;
            for (o = 0; o < r.length; o++) a = r[o], this.hasNodeCssClass(a, e) && n.push(a), 
            n = this.findNodesHavingCssClass(a, e, n);
            return n;
        },
        findFirstNodeHavingClass: function(t, e) {
            if (t && e) {
                if (this.hasNodeCssClass(t, e)) return t;
                var n = this.findNodesHavingCssClass(t, e);
                return n && n.length ? n[0] : void 0;
            }
        },
        isLinkElement: function(t) {
            return !!t && -1 !== A([ "a", "area" ], String(t.nodeName).toLowerCase());
        },
        setAnyAttribute: function(t, e, n) {
            t && e && (t.setAttribute ? t.setAttribute(e, n) : t[e] = n);
        }
    }, tt = {
        CONTENT_ATTR: "data-track-content",
        CONTENT_CLASS: "piwikTrackContent",
        CONTENT_NAME_ATTR: "data-content-name",
        CONTENT_PIECE_ATTR: "data-content-piece",
        CONTENT_PIECE_CLASS: "piwikContentPiece",
        CONTENT_TARGET_ATTR: "data-content-target",
        CONTENT_TARGET_CLASS: "piwikContentTarget",
        CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
        CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
        location: void 0,
        findContentNodes: function() {
            var t = "." + this.CONTENT_CLASS, e = "[" + this.CONTENT_ATTR + "]";
            return Q.findMultiple([ t, e ]);
        },
        findContentNodesWithinNode: function(t) {
            if (!t) return [];
            var e = Q.findNodesHavingCssClass(t, this.CONTENT_CLASS), n = Q.findNodesHavingAttribute(t, this.CONTENT_ATTR);
            if (n && n.length) {
                var i;
                for (i = 0; i < n.length; i++) e.push(n[i]);
            }
            return Q.hasNodeAttribute(t, this.CONTENT_ATTR) ? e.push(t) : Q.hasNodeCssClass(t, this.CONTENT_CLASS) && e.push(t), 
            e = Q.makeNodesUnique(e);
        },
        findParentContentNode: function(t) {
            if (t) for (var e = t, n = 0; e && e !== W && e.parentNode; ) {
                if (Q.hasNodeAttribute(e, this.CONTENT_ATTR)) return e;
                if (Q.hasNodeCssClass(e, this.CONTENT_CLASS)) return e;
                if (e = e.parentNode, n > 1e3) break;
                n++;
            }
        },
        findPieceNode: function(t) {
            var e;
            return (e = Q.findFirstNodeHavingAttribute(t, this.CONTENT_PIECE_ATTR)) || (e = Q.findFirstNodeHavingClass(t, this.CONTENT_PIECE_CLASS)), 
            e || t;
        },
        findTargetNodeNoDefault: function(t) {
            if (t) {
                var e = Q.findFirstNodeHavingAttributeWithValue(t, this.CONTENT_TARGET_ATTR);
                return e || ((e = Q.findFirstNodeHavingAttribute(t, this.CONTENT_TARGET_ATTR)) ? e : (e = Q.findFirstNodeHavingClass(t, this.CONTENT_TARGET_CLASS)) || void 0);
            }
        },
        findTargetNode: function(t) {
            var e = this.findTargetNodeNoDefault(t);
            return e || t;
        },
        findContentName: function(t) {
            if (t) {
                var e = Q.findFirstNodeHavingAttributeWithValue(t, this.CONTENT_NAME_ATTR);
                if (e) return Q.getAttributeValueFromNode(e, this.CONTENT_NAME_ATTR);
                var n = this.findContentPiece(t);
                if (n) return this.removeDomainIfIsInLink(n);
                if (Q.hasNodeAttributeWithValue(t, "title")) return Q.getAttributeValueFromNode(t, "title");
                var i = this.findPieceNode(t);
                if (Q.hasNodeAttributeWithValue(i, "title")) return Q.getAttributeValueFromNode(i, "title");
                var r = this.findTargetNode(t);
                return Q.hasNodeAttributeWithValue(r, "title") ? Q.getAttributeValueFromNode(r, "title") : void 0;
            }
        },
        findContentPiece: function(t) {
            if (t) {
                var e = Q.findFirstNodeHavingAttributeWithValue(t, this.CONTENT_PIECE_ATTR);
                if (e) return Q.getAttributeValueFromNode(e, this.CONTENT_PIECE_ATTR);
                var n = this.findPieceNode(t), i = this.findMediaUrlInNode(n);
                return i ? this.toAbsoluteUrl(i) : void 0;
            }
        },
        findContentTarget: function(t) {
            if (t) {
                var e = this.findTargetNode(t);
                if (Q.hasNodeAttributeWithValue(e, this.CONTENT_TARGET_ATTR)) return Q.getAttributeValueFromNode(e, this.CONTENT_TARGET_ATTR);
                var n;
                if (Q.hasNodeAttributeWithValue(e, "href")) return n = Q.getAttributeValueFromNode(e, "href"), 
                this.toAbsoluteUrl(n);
                var i = this.findPieceNode(t);
                return Q.hasNodeAttributeWithValue(i, "href") ? (n = Q.getAttributeValueFromNode(i, "href"), 
                this.toAbsoluteUrl(n)) : void 0;
            }
        },
        isSameDomain: function(t) {
            if (!t || !t.indexOf) return !1;
            if (0 === t.indexOf(this.getLocation().origin)) return !0;
            var e = t.indexOf(this.getLocation().host);
            return 8 >= e && 0 <= e;
        },
        removeDomainIfIsInLink: function(t) {
            return t && t.search && -1 !== t.search(new RegExp("^https?://[^/]+")) && this.isSameDomain(t) && ((t = t.replace(new RegExp("^.*//[^/]+"), "")) || (t = "/")), 
            t;
        },
        findMediaUrlInNode: function(t) {
            if (t) {
                var e = [ "img", "embed", "video", "audio" ], n = t.nodeName.toLowerCase();
                if (-1 !== A(e, n) && Q.findFirstNodeHavingAttributeWithValue(t, "src")) {
                    var i = Q.findFirstNodeHavingAttributeWithValue(t, "src");
                    return Q.getAttributeValueFromNode(i, "src");
                }
                if ("object" === n && Q.hasNodeAttributeWithValue(t, "data")) return Q.getAttributeValueFromNode(t, "data");
                if ("object" === n) {
                    var r = Q.findNodesByTagName(t, "param");
                    if (r && r.length) {
                        var o;
                        for (o = 0; o < r.length; o++) if ("movie" === Q.getAttributeValueFromNode(r[o], "name") && Q.hasNodeAttributeWithValue(r[o], "value")) return Q.getAttributeValueFromNode(r[o], "value");
                    }
                    var a = Q.findNodesByTagName(t, "embed");
                    if (a && a.length) return this.findMediaUrlInNode(a[0]);
                }
            }
        },
        trim: function(t) {
            return t && String(t) === t ? t.replace(/^\s+|\s+$/g, "") : t;
        },
        isOrWasNodeInViewport: function(t) {
            if (!t || !t.getBoundingClientRect || 1 !== t.nodeType) return !0;
            var e = t.getBoundingClientRect(), n = W.documentElement || {}, i = e.top < 0;
            i && t.offsetTop && (i = t.offsetTop + e.height > 0);
            var r = n.clientWidth;
            B.innerWidth && r > B.innerWidth && (r = B.innerWidth);
            var o = n.clientHeight;
            return B.innerHeight && o > B.innerHeight && (o = B.innerHeight), (e.bottom > 0 || i) && e.right > 0 && e.left < r && (e.top < o || i);
        },
        isNodeVisible: function(t) {
            var e = I(t), n = this.isOrWasNodeInViewport(t);
            return e && n;
        },
        buildInteractionRequestParams: function(t, e, n, i) {
            var r = "";
            return t && (r += "c_i=" + Z(t)), e && (r && (r += "&"), r += "c_n=" + Z(e)), n && (r && (r += "&"), 
            r += "c_p=" + Z(n)), i && (r && (r += "&"), r += "c_t=" + Z(i)), r;
        },
        buildImpressionRequestParams: function(t, e, n) {
            var i = "c_n=" + Z(t) + "&c_p=" + Z(e);
            return n && (i += "&c_t=" + Z(n)), i;
        },
        buildContentBlock: function(t) {
            if (t) {
                var e = this.findContentName(t), n = this.findContentPiece(t), i = this.findContentTarget(t);
                return e = this.trim(e), n = this.trim(n), i = this.trim(i), {
                    name: e || "Unknown",
                    piece: n || "Unknown",
                    target: i || ""
                };
            }
        },
        collectContent: function(t) {
            if (!t || !t.length) return [];
            var e, i, r = [];
            for (e = 0; e < t.length; e++) n(i = this.buildContentBlock(t[e])) && r.push(i);
            return r;
        },
        setLocation: function(t) {
            this.location = t;
        },
        getLocation: function() {
            var t = this.location || B.location;
            return t.origin || (t.origin = t.protocol + "//" + t.hostname + (t.port ? ":" + t.port : "")), 
            t;
        },
        toAbsoluteUrl: function(t) {
            if ((!t || String(t) !== t) && "" !== t) return t;
            if ("" === t) return this.getLocation().href;
            if (-1 !== t.search(/^\/\//)) return this.getLocation().protocol + t;
            if (-1 !== t.search(/:\/\//)) return t;
            if (0 === t.indexOf("#")) return this.getLocation().origin + this.getLocation().pathname + t;
            if (0 === t.indexOf("?")) return this.getLocation().origin + this.getLocation().pathname + t;
            if (0 === t.search("^[a-zA-Z]{2,11}:")) return t;
            if (-1 !== t.search(/^\//)) return this.getLocation().origin + t;
            return this.getLocation().origin + this.getLocation().pathname.match(new RegExp("(.*/)"))[0] + t;
        },
        isUrlToCurrentDomain: function(t) {
            var e = this.toAbsoluteUrl(t);
            if (!e) return !1;
            var n = this.getLocation().origin;
            return n === e || 0 === String(e).indexOf(n) && ":" !== String(e).substr(n.length, 1);
        },
        setHrefAttribute: function(t, e) {
            t && e && Q.setAnyAttribute(t, "href", e);
        },
        shouldIgnoreInteraction: function(t) {
            var e = Q.hasNodeAttribute(t, this.CONTENT_IGNOREINTERACTION_ATTR), n = Q.hasNodeCssClass(t, this.CONTENT_IGNOREINTERACTION_CLASS);
            return e || n;
        }
    }, et = [ "addTracker", "disableCookies", "setTrackerUrl", "setAPIUrl", "setCookiePath", "setCookieDomain", "setDomains", "setUserId", "setSiteId", "enableLinkTracking" ];
    return c(B, "beforeunload", function() {
        var t;
        if (d("unload"), F) do {
            t = new Date();
        } while (t.getTimeAlias() < F);
    }, !1), Date.prototype.getTimeAlias = Date.prototype.getTime, q = {
        initialized: !1,
        DOM: {
            addEventListener: function(e, n, i, r) {
                "undefined" === (void 0 === r ? "undefined" : t(r)) && (r = !1), c(e, n, i, r);
            },
            onLoad: f,
            onReady: l
        },
        on: function(t, e) {
            J[t] || (J[t] = []), J[t].push(e);
        },
        off: function(t, e) {
            if (J[t]) {
                var n = 0;
                for (n; n < J[t].length; n++) J[t][n] === e && J[t].splice(n, 1);
            }
        },
        trigger: function(t, e, n) {
            if (J[t]) {
                var i = 0;
                for (i; i < J[t].length; i++) J[t][i].apply(n || B, e);
            }
        },
        addPlugin: function(t, e) {
            M[t] = e;
        },
        getTracker: function(t, e) {
            return n(e) || (e = this.getAsyncTracker().getSiteId()), n(t) || (t = this.getAsyncTracker().getTrackerUrl()), 
            new L(t, e);
        },
        getAsyncTrackers: function() {
            return K;
        },
        addTracker: function(t, e) {
            K.length ? K[0].addTracker(t, e) : D(t, e);
        },
        getAsyncTracker: function(t, e) {
            var i;
            if (K && K[0] && (i = K[0]), !e && !t) return i;
            n(e) && null !== e || !i || (e = i.getSiteId()), n(t) && null !== t || !i || (t = i.getTrackerUrl());
            var r, o = 0;
            for (o; o < K.length; o++) if ((r = K[o]) && String(r.getSiteId()) === String(e) && r.getTrackerUrl() === t) return r;
        },
        retryMissedPluginCalls: function() {
            var t = Y;
            Y = [];
            var e = 0;
            for (e; e < t.length; e++) u(t[e]);
        }
    }, "function" == typeof define && define.amd && define("piwik", [], function() {
        return q;
    }), q;
}()), function() {
    if (window && "object" === t(window.piwikPluginAsyncInit) && window.piwikPluginAsyncInit.length) {
        var e = 0;
        for (e; e < window.piwikPluginAsyncInit.length; e++) "function" == typeof window.piwikPluginAsyncInit[e] && window.piwikPluginAsyncInit[e]();
    }
    window.Piwik.addTracker(), window.Piwik.trigger("PiwikInitialized", []), window.Piwik.initialized = !0;
}(), window && window.piwikAsyncInit && window.piwikAsyncInit(), "undefined" === ("undefined" == typeof AnalyticsTracker ? "undefined" : t(AnalyticsTracker)) && (AnalyticsTracker = window.Piwik), 
"function" != typeof piwik_log && (piwik_log = function(t, e, n, i) {
    function r(t) {
        try {
            if (window["piwik_" + t]) return window["piwik_" + t];
        } catch (t) {}
    }
    var o, a = window.Piwik.getTracker(n, e);
    a.setDocumentTitle(t), a.setCustomData(i), (o = r("tracker_pause")) && a.setLinkTrackingTimer(o), 
    (o = r("download_extensions")) && a.setDownloadExtensions(o), (o = r("hosts_alias")) && a.setDomains(o), 
    (o = r("ignore_classes")) && a.setIgnoreClasses(o), a.trackPageView(), r("install_tracker") && (piwik_track = function(t, e, n, i) {
        a.setSiteId(e), a.setTrackerUrl(n), a.trackLink(t, i);
    }, a.enableLinkTracking());
});
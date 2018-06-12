(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    function c(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return b && ("object" == typeof b || "function" == typeof b) ? b : a;
    }
    function d(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
            constructor: {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var e = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), f = require("../../../../utils/ppdog"), g = a(f), h = require("../../../../utils/regenerator-runtime"), i = a(h), j = require("./shape"), k = a(j), l = require("./style"), m = a(l), n = require("../util"), o = a(n), p = require("./TA"), q = a(p), r = require("./IndexBase"), s = a(r), t = function(a) {
        function f(a, d, e, g) {
            return b(this, f), c(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, a, d, e, g));
        }
        return d(f, a), e(f, [ {
            key: "calData",
            value: function() {
                this.macd = q.default.MACD(this.data.CP), this.indexParamsStr = "MACD(12,26,9)", 
                this.color = {
                    MACD: m.default.color.indexPurple,
                    DIF: m.default.color.indexWhite,
                    DEA: m.default.color.indexYellow
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = this.max, e = this.min, f = c.trend_coord, g = f.l, j = f.t, l = f.w, n = f.h, h = this.barNum, o = this.selectedMACD, p = this.selectedDIF, q = this.selectedDEA, r = o.length, s = this.stepX = (l - 1) / h, t = this.barWidth, u = [], v = [], w = [], x = this.calStartX(), y = 0; y < h; y++) if (a = y * s + x + t / 2 + 1, 
                !(a < g)) {
                    if ("undefined" == typeof o[y]) break;
                    u.push([ a, this.T2y(o[y]), o[y] ]), v.push([ a, this.T2y(p[y]) ]), w.push([ a, this.T2y(q[y]) ]);
                }
                var i = {
                    red: m.default.color.red,
                    green: m.default.color.green,
                    barWidth: t
                };
                k.default.macdBar(b, u, f, i), k.default.polyLine(b, v, f, {
                    strokeColor: this.color.DIF
                }), k.default.polyLine(b, w, f, {
                    strokeColor: this.color.DEA
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a = Math.abs, b = this.macd, c = b.MACD, d = b.DIF, e = b.DEA, f = this.getValidInd(), g = f.startInd, h = f.endInd, j = this.selectedMACD = c.slice(g, h), k = this.selectedDIF = d.slice(g, h), l = this.selectedDEA = e.slice(g, h), m = -Infinity, n = Infinity, o = 0, i = j.length; o < i; o++) {
                    var p = j[o], q = k[o], r = l[o];
                    m = m > p ? m : p, m = m > q ? m : q, m = m > r ? m : r, n = n < p ? n : p, n = n < q ? n : q, 
                    n = n < r ? n : r;
                }
                var s = Math.max(a(m), a(n));
                this.data.indexDiff = 2 * s, this.data.indexMaxVal = s, this.selectedLength = this.selectedMACD.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    MACD: this.selectedMACD,
                    DIF: this.selectedDIF,
                    DEA: this.selectedDEA
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.MACD = a.MACD.toFixed(2), a.DEA = a.DEA.toFixed(2), a.DIF = a.DIF.toFixed(2), 
                a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
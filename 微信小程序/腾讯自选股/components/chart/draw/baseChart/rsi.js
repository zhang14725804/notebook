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
                var a = this.data.CP;
                this.rsi = {
                    RSI6: q.default.RSI(a, 6),
                    RSI12: q.default.RSI(a, 12),
                    RSI24: q.default.RSI(a, 24)
                }, this.indexParamsStr = "RSI(6,12,24)", this.color = {
                    S6: m.default.color.indexWhite,
                    S12: m.default.color.indexYellow,
                    S24: m.default.color.indexPurple
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selected6, m = this.selected12, n = this.selected24, o = l.length, p = this.stepX = (g - 1) / h, q = this.barWidth, r = [], s = [], t = [], u = this.calStartX(), v = 0; v < h; v++) if (a = v * p + u + q / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof l[v]) break;
                    r.push([ a, this.T2y(l[v]) ]), s.push([ a, this.T2y(m[v]) ]), t.push([ a, this.T2y(n[v]) ]);
                }
                k.default.polyLine(b, r, d, {
                    strokeColor: this.color.S6
                }), k.default.polyLine(b, s, d, {
                    strokeColor: this.color.S12
                }), k.default.polyLine(b, t, d, {
                    strokeColor: this.color.S24
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a = this.rsi, b = a.RSI6, c = a.RSI12, d = a.RSI24, e = this.getValidInd(), f = e.startInd, g = e.endInd, h = this.selected6 = b.slice(f, g), j = this.selected12 = c.slice(f, g), k = this.selected24 = d.slice(f, g), l = -Infinity, m = Infinity, n = 0, i = h.length; n < i; n++) {
                    var o = h[n], p = j[n], q = k[n];
                    l = l > o ? l : o, l = l > p ? l : p, l = l > q ? l : q, m = m < o ? m : o, m = m < p ? m : p, 
                    m = m < q ? m : q;
                }
                var r = l - m;
                this.data.indexDiff = r, this.data.indexMaxVal = l, this.selectedLength = h.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    S6: this.selected6,
                    S12: this.selected12,
                    S24: this.selected24
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.S6 = a.S6.toFixed(2), a.S12 = a.S12.toFixed(2), a.S24 = a.S24.toFixed(2), 
                a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
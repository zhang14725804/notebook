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
                var a = this.data, b = a.CP, c = a.LP, d = a.HP;
                this.wr = q.default.WR(b, c, d, 10, 6), this.indexParamsStr = "WR(10,6)", this.color = {
                    WR10: m.default.color.indexWhite,
                    WR6: m.default.color.indexYellow
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selectedWR10, m = this.selectedWR6, n = l.length, o = this.stepX = (g - 1) / h, p = this.barWidth, q = [], r = [], s = this.calStartX(), t = 0; t < h; t++) if (a = t * o + s + p / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof m[t]) break;
                    q.push([ a, this.T2y(l[t]) ]), r.push([ a, this.T2y(m[t]) ]);
                }
                k.default.polyLine(b, q, d, {
                    strokeColor: this.color.WR10
                }), k.default.polyLine(b, r, d, {
                    strokeColor: this.color.WR6
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a = this.wr, b = a.WR10, c = a.WR6, d = this.getValidInd(), e = d.startInd, f = d.endInd, g = this.selectedWR10 = b.slice(e, f), h = this.selectedWR6 = c.slice(e, f), j = -Infinity, k = Infinity, l = 0, i = g.length; l < i; l++) {
                    var m = g[l], n = h[l];
                    j = j > m ? j : m, j = j > n ? j : n, k = k < m ? k : m, k = k < n ? k : n;
                }
                var o = j - k;
                this.data.indexDiff = o, this.data.indexMaxVal = j, this.selectedLength = g.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    WR10: this.selectedWR10,
                    WR6: this.selectedWR6
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.WR10 = a.WR10.toFixed(2), a.WR6 = a.WR6.toFixed(2), a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
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
                var a = this.data, b = a.CP, c = a.volume;
                this.obv = q.default.OBV(b, c), this.indexParamsStr = "OBV", this.color = {
                    OBV: m.default.color.indexWhite
                };
            }
        }, {
            key: "drawLabel",
            value: function() {
                var a = this.data, b = this.coord, c = this.ctx, d = b.trend_coord, e = a.precision;
                if (d.label) for (var f = d.l, g = d.t, j = d.w, l = d.h, h = d.Y_SPLIT, n = a.indexDiff / h, p = 1, q = {
                    color: m.default.color.label,
                    size: 12,
                    maxWidth: b.w - j - f - 2 * p
                }, r = 0; r < h + 1; r++) {
                    var i = a.indexMaxVal - r * n, s = o.default.formatVol(i, a.code);
                    k.default.text(c, s.data + s.fmtUnit, {
                        x: f + j + p,
                        y: g + 10 + (l - 10) / h * r
                    }, q);
                }
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selectedOBV, m = l.length, n = this.stepX = (g - 1) / h, o = this.barWidth, p = [], q = this.calStartX(), r = 0; r < h; r++) if (a = r * n + q + o / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof l[r]) break;
                    p.push([ a, this.T2y(l[r]) ]);
                }
                k.default.polyLine(b, p, d, {
                    strokeColor: this.color.OBV
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a, b = this.obv, c = b.OBV, d = this.getValidInd(), e = d.startInd, f = d.endInd, g = this.selectedOBV = c.slice(e, f), h = -Infinity, j = Infinity, k = 0, i = g.length; k < i; k++) a = g[k], 
                h = h > a ? h : a, j = j < a ? j : a;
                var l = h - j;
                this.data.indexDiff = l, this.data.indexMaxVal = h, this.selectedLength = g.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    OBV: this.selectedOBV
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                var b = o.default.formatVol(a.OBV, this.data.code);
                return a.OBV = b.data + b.fmtUnit, a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
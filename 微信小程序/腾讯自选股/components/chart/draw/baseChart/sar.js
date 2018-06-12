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
                var a = this.data, b = a.HP, c = a.LP;
                this.sar = q.default.SAR(b, c, 4, 2, 20), this.indexParamsStr = "SAR(4,2,20)", this.color = {
                    SAR: m.default.color.indexWhite
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selectedSAR, n = this.selectedDIR, o = this.selectedValue, p = this.selectedVolume, q = o.length, r = this.stepX = (g - 1) / h, s = this.barWidth, t = [], u = [], v = this.calStartX(), w = 0; w < h; w++) if (a = w * r + v + s / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof o[w]) break;
                    u.push([ a, this.T2y(l[w]), n[w] ]), t.push([ a, this.T2y(o[w][1]), this.T2y(o[w][2]), this.T2y(o[w][3]), this.T2y(o[w][4]), p[w][1] ]);
                }
                var i = {
                    red: m.default.color.red,
                    green: m.default.color.green,
                    barWidth: s
                };
                k.default.boll(b, t, i), k.default.sar(b, u, {
                    red: m.default.color.red,
                    green: m.default.color.green,
                    r: 1.5 / 72 * j
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                var a = this.sar, b = this.data, c = a.data, d = a.direction, e = b.value, f = b.volume, g = this.getValidInd(), h = g.startInd, j = g.endInd, k = this.selectedSAR = c.slice(h, j), l = this.selectedDIR = d.slice(h, j), m = this.selectedValue = e.slice(h, j);
                this.selectedVolume = f.slice(h, j);
                for (var n = -Infinity, o = Infinity, p = 0, i = m.length; p < i; p++) {
                    var q = k[p], r = m[p][3], s = m[p][4];
                    n = n > q ? n : q, n = n > r ? n : r, o = o < q ? o : q, o = o < s ? o : s;
                }
                var t = n - o;
                this.data.indexMaxVal = n + .1 * t, this.data.indexDiff = 1.2 * t, this.selectedLength = m.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    SAR: this.selectedSAR
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.SAR = a.SAR.toFixed(2), a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
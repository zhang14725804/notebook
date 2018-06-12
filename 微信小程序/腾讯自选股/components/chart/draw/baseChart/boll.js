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
                this.boll = q.default.BOLL(this.data.CP), this.indexParamsStr = "BOLL(20)", this.color = {
                    UPPER: m.default.color.indexWhite,
                    MID: m.default.color.indexYellow,
                    LOWER: m.default.color.indexPurple
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selectedUPPER, n = this.selectedMID, o = this.selectedLOWER, p = this.selectedValue, q = this.selectedVolume, r = l.length, s = this.stepX = (g - 1) / h, t = this.barWidth, u = [], v = [], w = [], x = [], y = this.calStartX(), z = 0; z < h; z++) if (a = z * s + y + t / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof l[z]) break;
                    v.push([ a, this.T2y(l[z]) ]), w.push([ a, this.T2y(n[z]) ]), x.push([ a, this.T2y(o[z]) ]), 
                    u.push([ a, this.T2y(p[z][1]), this.T2y(p[z][2]), this.T2y(p[z][3]), this.T2y(p[z][4]), q[z][1] ]);
                }
                var i = {
                    red: m.default.color.red,
                    green: m.default.color.green,
                    barWidth: t
                };
                k.default.boll(b, u, i), k.default.polyLine(b, v, d, {
                    strokeColor: this.color.UPPER
                }), k.default.polyLine(b, w, d, {
                    strokeColor: this.color.MID
                }), k.default.polyLine(b, x, d, {
                    strokeColor: this.color.LOWER
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                var a = this.boll, b = this.data, c = a.UPPER, d = a.MID, e = a.LOWER, f = b.value, g = b.volume, h = this.getValidInd(), j = h.startInd, k = h.endInd, l = this.selectedUPPER = c.slice(j, k), m = this.selectedMID = d.slice(j, k), n = this.selectedLOWER = e.slice(j, k), o = this.selectedValue = f.slice(j, k);
                this.selectedVolume = g.slice(j, k);
                for (var p = -Infinity, q = Infinity, r = 0, i = l.length; r < i; r++) {
                    var s = l[r], t = m[r], u = n[r], v = o[r][3], w = o[r][4];
                    isNaN(s) || (p = p > s ? p : s, q = q < s ? q : s), isNaN(u) || (p = p > u ? p : u, 
                    q = q < u ? q : u), p = p > v ? p : v, q = q < w ? q : w;
                }
                var x = p - q;
                this.data.indexDiff = x, this.data.indexMaxVal = p, this.selectedLength = l.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    UPPER: this.selectedUPPER,
                    MID: this.selectedMID,
                    LOWER: this.selectedLOWER
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                var b = this.data.precision;
                return a.UPPER = a.UPPER.toFixed(b), a.MID = a.MID.toFixed(b), a.LOWER = a.LOWER.toFixed(b), 
                a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
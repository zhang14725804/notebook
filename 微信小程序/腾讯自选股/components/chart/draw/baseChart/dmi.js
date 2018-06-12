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
                this.dmi = q.default.DMI(d, c, b), this.indexParamsStr = "DMI(14,6)", this.color = {
                    DPI: m.default.color.indexWhite,
                    MDI: m.default.color.indexYellow,
                    ADX: m.default.color.indexPurple,
                    ADXR: m.default.color.indexGreen
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, d = c.trend_coord, e = d.l, f = d.t, g = d.w, j = d.h, h = this.barNum, l = this.selectedPDI, m = this.selectedMDI, n = this.selectedADX, o = this.selectedADXR, p = l.length, q = this.stepX = (g - 1) / h, r = this.barWidth, s = [], t = [], u = [], v = [], w = this.calStartX(), x = 0; x < h; x++) if (a = x * q + w + r / 2 + 1, 
                !(a < e)) {
                    if ("undefined" == typeof l[x]) break;
                    s.push([ a, this.T2y(l[x]) ]), t.push([ a, this.T2y(m[x]) ]), u.push([ a, this.T2y(n[x]) ]), 
                    v.push([ a, this.T2y(o[x]) ]);
                }
                k.default.polyLine(b, s, d, {
                    strokeColor: this.color.DPI
                }), k.default.polyLine(b, t, d, {
                    strokeColor: this.color.MDI
                }), k.default.polyLine(b, u, d, {
                    strokeColor: this.color.ADX
                }), k.default.polyLine(b, v, d, {
                    strokeColor: this.color.ADXR
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a = this.dmi, b = a.PDI, c = a.MDI, d = a.ADX, e = a.ADXR, f = this.getValidInd(), g = f.startInd, h = f.endInd, j = this.selectedPDI = b.slice(g, h), k = this.selectedMDI = c.slice(g, h), l = this.selectedADX = d.slice(g, h), m = this.selectedADXR = e.slice(g, h), n = -Infinity, o = Infinity, p = 0, i = j.length; p < i; p++) {
                    var q = j[p], r = k[p], s = l[p], t = m[p];
                    isNaN(q) || (n = n > q ? n : q, o = o < q ? o : q), isNaN(r) || (n = n > r ? n : r, 
                    o = o < r ? o : r), isNaN(s) || (n = n > s ? n : s, o = o < s ? o : s), isNaN(t) || (n = n > t ? n : t, 
                    o = o < t ? o : t);
                }
                var u = n - o;
                this.data.indexDiff = u, this.data.indexMaxVal = n, this.selectedLength = j.length;
            }
        }, {
            key: "getSceneRes",
            value: function() {
                return {
                    PDI: this.selectedPDI,
                    MDI: this.selectedMDI,
                    ADX: this.selectedADX,
                    ADXR: this.selectedADXR
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.PDI = a.PDI.toFixed(2), a.MDI = a.MDI.toFixed(2), a.ADX = a.ADX.toFixed(2), 
                a.ADXR = a.ADXR.toFixed(2), a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
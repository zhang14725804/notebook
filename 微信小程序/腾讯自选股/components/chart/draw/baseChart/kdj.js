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
    }(), f = require("../../../../utils/ppdog"), g = a(f), h = require("../../../../utils/regenerator-runtime"), i = a(h), j = require("./shape"), m = a(j), k = require("./style"), l = a(k), n = require("../util"), o = a(n), p = require("./TA"), q = a(p), r = require("./IndexBase"), s = a(r), t = function(a) {
        function f(a, d, e, g) {
            return b(this, f), c(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, a, d, e, g));
        }
        return d(f, a), e(f, [ {
            key: "calData",
            value: function() {
                var a = this.data, b = a.CP, c = a.LP, d = a.HP;
                this.kdj = q.default.KDJ(b, c, d, 9, 3, 3), this.indexParamsStr = "KDJ(9,3,3)", 
                this.color = {
                    K: l.default.color.indexWhite,
                    D: l.default.color.indexYellow,
                    J: l.default.color.indexPurple
                };
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a, b = this.ctx, c = this.coord, e = c.trend_coord, f = e.l, g = e.t, l = e.w, n = e.h, h = this.barNum, o = this.selectedK, k = this.selectedD, d = this.selectedJ, j = o.length, p = this.stepX = (l - 1) / h, q = this.barWidth, r = [], s = [], t = [], u = this.calStartX(), v = 0; v < h; v++) if (a = v * p + u + q / 2 + 1, 
                !(a < f)) {
                    if ("undefined" == typeof o[v]) break;
                    r.push([ a, this.T2y(o[v]) ]), s.push([ a, this.T2y(k[v]) ]), t.push([ a, this.T2y(d[v]) ]);
                }
                m.default.polyLine(b, r, e, {
                    strokeColor: this.color.K
                }), m.default.polyLine(b, s, e, {
                    strokeColor: this.color.D
                }), m.default.polyLine(b, t, e, {
                    strokeColor: this.color.J
                });
            }
        }, {
            key: "getSeletedData",
            value: function() {
                for (var a = this.kdj, b = a.K, c = a.D, d = a.J, e = this.getValidInd(), f = e.startInd, g = e.endInd, h = this.selectedK = b.slice(f, g), j = this.selectedD = c.slice(f, g), k = this.selectedJ = d.slice(f, g), l = -Infinity, m = Infinity, n = 0, i = h.length; n < i; n++) {
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
                    K: this.selectedK,
                    D: this.selectedD,
                    J: this.selectedJ
                };
            }
        }, {
            key: "fmtCurValue",
            value: function(a) {
                return a.K = a.K.toFixed(2), a.D = a.D.toFixed(2), a.J = a.J.toFixed(2), a;
            }
        } ]), f;
    }(s.default);
    exports.default = t, module.exports = exports["default"];
})();
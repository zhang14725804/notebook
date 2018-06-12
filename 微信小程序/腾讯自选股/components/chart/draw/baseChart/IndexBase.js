(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var c = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), d = require("../../../../utils/ppdog"), e = a(d), f = require("../../../../utils/regenerator-runtime"), g = a(f), h = require("./style"), j = a(h), i = require("./shape"), k = a(i), l = 6.3, m = j.default.barNum, n = function() {
        function a(c, d, e, f) {
            b(this, a), this.ctx = c, this.data = d, d.value && (this.coord = e, this.startInd = f.startInd, 
            this.endInd = f.endInd, this.barNum = f.barNum || m, this.dragMove = f.dragMove, 
            this.calData(), this.draw());
        }
        return c(a, [ {
            key: "draw",
            value: function() {
                this.getSeletedData(), this.getBarWidth(), this.drawTrend(), this.drawLabel();
            }
        }, {
            key: "dragIndex",
            value: function(a, b, c, d) {
                this.dragMove = a, this.startInd = c, this.endInd = d, this.barNum = b, this.draw();
            }
        }, {
            key: "calStartX",
            value: function() {
                var a = this.coord.trend_coord.l, b = this.startInd, c = this.endInd, d = this.dragMove, e = this.stepX, f = this.data;
                return 0 > b ? -b * e + a : a;
            }
        }, {
            key: "getValidInd",
            value: function() {
                var a = this.data.length;
                "undefined" == typeof this.endInd && (this.endInd = a), "undefined" == typeof this.startInd && (this.startInd = this.endInd - this.barNum, 
                0 > this.startInd && (this.startInd = 0));
                var b = this.startInd, c = this.endInd;
                return b = 0 > b ? 0 : b, c > a ? a : c, {
                    startInd: b,
                    endInd: c
                };
            }
        }, {
            key: "drawLabel",
            value: function() {
                var a = this.data, b = this.coord, c = this.ctx, d = b.trend_coord, e = a.labelPrecision;
                if (d.label) for (var f, g = d.l, l = d.t, m = d.w, n = d.h, h = d.Y_SPLIT, o = a.indexDiff / h, p = 1, q = {
                    color: j.default.color.label,
                    size: j.default.fontSize,
                    maxWidth: b.w - m - g - 2 * p
                }, r = 0; r < h + 1; r++) f = a.indexMaxVal - r * o, k.default.text(c, f.toFixed(e), {
                    x: g + m + p,
                    y: l + 10 + (n - 10) / h * r
                }, q);
            }
        }, {
            key: "drawDecoration",
            value: function(a, b) {
                var c = this.data, d = this.coord, e = d.trend_coord, f = e.l, g = e.w, h = e.r, i = e.t, l = c.value.length;
                b ? (this.touchEventPos = b, this.getTouchedInfo(), this.drawCross(a)) : k.default.text(a, this.indexParamsStr, {
                    x: f + 1,
                    y: i + 10
                }, {
                    color: j.default.color.label,
                    size: j.default.fontSize,
                    background: j.default.color.labelBG
                });
            }
        }, {
            key: "drawCross",
            value: function(a) {
                var c = this.data, d = this.coord, e = this.touchEventPos, f = this.touchedData, g = this.touchedDataPos, i = d.trend_coord, m = i.l, n = i.r, o = i.t, p = i.b, b = i.w, q = i.h, h = e.x, r = e.y, s = r;
                r < o && (s = o), r > p && (s = p), k.default.polyLine(a, [ [ g.x - 1, o ], [ g.x - 1, p ] ], null, {
                    strokeColor: j.default.color.decorationLine
                });
                var t = m + 3;
                if (h < (m + n) / 2) {
                    var u = "";
                    for (var v in f) u += v + ":" + f[v];
                    var w = u.length * l;
                    t = n - w;
                }
                for (var x in f) {
                    var y = x + ":" + f[x], z = y.length * l;
                    k.default.text(a, y, {
                        x: t,
                        y: o + 10
                    }, {
                        color: this.color[x],
                        size: j.default.fontSize,
                        background: j.default.color.labelBG
                    }), t += z;
                }
            }
        }, {
            key: "getTouchedInfo",
            value: function() {
                var a = this.data, b = this.coord, c = this.stepX, d = this.touchEventPos, e = b.trend_coord, f = d.x, g = d.y, j = e.l, k = e.r, l = e.t, m = e.h, h = Math.floor((f - j - this.barWidth / 2 - 1) / c + .5);
                0 > h && (h = 0), h > this.selectedLength - 1 && (h = this.selectedLength - 1), 
                this.touchedDataPos = {
                    x: h * c + j + this.barWidth / 2 + 1
                };
                var i = this.getSceneRes(), n = {};
                for (var o in i) n[o] = isNaN(i[o][h]) ? 0 : i[o][h];
                this.touchedData = this.fmtCurValue(n);
            }
        }, {
            key: "getTouchedData",
            value: function() {
                return this.touchedData;
            }
        }, {
            key: "getBarWidth",
            value: function() {
                this.barWidth = this.coord.trend_coord.w / this.barNum - 1;
            }
        }, {
            key: "T2y",
            value: function(a) {
                if (!("undefined" == typeof a || null === a || isNaN(a))) {
                    var b = this.coord.trend_coord, c = b.t, d = b.h, e = this.data.indexMaxVal, f = this.data.indexDiff;
                    return c + (d - 1) / f * (e - a);
                }
            }
        }, {
            key: "resetGesture",
            value: function(a, b) {
                this.startInd = a, this.endInd = b, this.draw();
            }
        } ]), a;
    }();
    exports.default = n, module.exports = exports["default"];
})();
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
    var c = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, d = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), e = require("../../../../utils/ppdog"), f = a(e), g = require("../../../../utils/regenerator-runtime"), h = a(g), i = require("../style"), j = a(i), k = require("../../../../libs/chart/shape"), m = a(k), l = require("../../../../utils/Tool"), n = a(l), o = {
        sh: 242,
        sz: 242,
        hk: 332,
        us: 391
    }, p = {
        sh: [ "9:30", "11:30/13:00", "15:00" ],
        sz: [ "9:30", "11:30/13:00", "15:00" ],
        hk: [ "9:30", "12:00/13:00", "16:00" ],
        us: [ "9:30", "12:30", "16:00" ]
    }, q = function() {
        function a(c, d, e, f) {
            b(this, a), this.ctx = c, this.data = d, this.coord = e, this.isNarrow = f, this.setCoordinate(), 
            this.draw();
        }
        return d(a, [ {
            key: "setCoordinate",
            value: function() {
                this.t2y = this.setT2y(), this.y2t = this.setY2t(), this.v2y = this.setV2y(), this.y2v = this.setY2v();
            }
        }, {
            key: "draw",
            value: function() {
                this.drawTrend(), this.drawVol(), this.drawLabel();
            }
        }, {
            key: "drawLabel",
            value: function() {
                var a = this.data, b = this.coord, c = this.ctx, d = this.isNarrow, e = b.trend_coord, f = b.vol_coord;
                e.halfLine && m.default.halfLine(c, e, {
                    color: j.default.color.dashLine
                }), e.label && (d ? this.drawNarrowLabel() : this.drawNormalLabel());
            }
        }, {
            key: "drawNarrowLabel",
            value: function() {
                var a = this.data, b = this.ctx, d = this.coord, e = this.diff, f = d.trend_coord, g = f.l, i = f.t, k = f.w, l = f.h, h = f.r, o = a.view_data.prec, p = a.qt_data.precision, q = 3, r = {
                    color: j.default.color.label,
                    size: j.default.fontSize
                }, s = o ? (100 * (e / o)).toFixed(2) + "%" : "1.00%", t = n.default.getProperDecimal(o + e, p, 6), u = n.default.getProperDecimal(o - e, p, 6);
                m.default.label(b, [ "+" + s, "-" + s ], {
                    l: g + q,
                    t: i + 10,
                    h: l - 15
                }, {
                    fontStyle: c({}, r, {
                        align: "left"
                    }),
                    type: "vertical"
                }), m.default.label(b, [ t, u ], {
                    l: h - q,
                    t: i + 10,
                    h: l - 15
                }, {
                    fontStyle: c({}, r, {
                        align: "right"
                    }),
                    type: "vertical"
                });
            }
        }, {
            key: "drawNormalLabel",
            value: function() {
                var a = this.data, b = this.ctx, d = this.coord, e = this.diff, f = a.view_data, g = a.qt_data, k = d.trend_coord, o = d.vol_coord, q = k.l, l = k.t, s = k.w, t = k.h, h = k.r, r = k.Y_SPLIT, u = f.prec, v = f.max_vol, w = g.precision, x = g.market_symbol, y = g.symbol, z = 3, A = d.w - h - 2 * z, B = {
                    color: j.default.color.label,
                    size: j.default.fontSize
                };
                if (k.staticPercent) {
                    var C = u ? (100 * (e / u)).toFixed(2) + "%" : "1.00%";
                    m.default.label(b, [ "+" + C, "-" + C ], {
                        l: q + z,
                        t: l + 10,
                        h: t - 15
                    }, {
                        fontStyle: c({}, B, {
                            align: "left"
                        }),
                        type: "vertical"
                    });
                }
                for (var D, E = [], F = 0; F < r + 1; F++) D = u + (r / 2 - F) * (2 * e / r), E.push(n.default.getProperDecimal(D, w, 6));
                if (m.default.label(b, E, {
                    l: h + z,
                    t: l + 10,
                    h: t - 15
                }, {
                    fontStyle: c({}, B, {
                        align: "left",
                        maxWidth: A
                    }),
                    type: "vertical"
                }), !!o) {
                    var i = p[x], G = i[2];
                    if ("hk" === x) {
                        var H = G.replace(/:/g, ""), I = f.data[f.length - 1], J = I && I[0].replace(/:/g, "");
                        J && J > H && (G = J.slice(0, 2) + ":" + J.slice(2, 4), i = i.slice(0, 2).concat([ G ]));
                    }
                    m.default.label(b, i, {
                        l: q + z,
                        t: o.dateLabel_t,
                        w: s - 2 * z
                    }, {
                        fontStyle: B,
                        type: "horizon"
                    });
                    var K = n.default.fmtVol(v, x + y);
                    m.default.label(b, [ K.data, K.fmtUnit + K.mktUnit ], {
                        l: h + z,
                        t: o.t + 10,
                        h: o.h - 15
                    }, {
                        fontStyle: c({}, B, {
                            align: "left",
                            maxWidth: A
                        }),
                        type: "vertical"
                    });
                }
            }
        }, {
            key: "drawTrend",
            value: function() {
                for (var a = this.data, b = this.coord, c = this.ctx, d = this.t2y, e = b.trend_coord, f = e.l, g = e.t, k = e.w, l = e.h, h = e.r, n = a.view_data, p = a.qt_data, q = n.PRICE, r = n.AVG, s = n.length, t = p.market_symbol, u = this.total = o[t], v = this.stepX = (k - 1) / (u - 1), w = [], x = [], y = 0; y < s; y++) x.push([ y * v + f, d(q[y]) ]), 
                w.push([ y * v + f, d(r[y]) ]);
                this.pricePoints = x;
                var i = {
                    strokeColor: j.default.color.polyline,
                    fillColor: j.default.color.minfill
                }, z = {
                    strokeColor: j.default.color.averageLine
                };
                m.default.polyLine(c, x, e, i), m.default.polyLine(c, w, e, z);
            }
        }, {
            key: "drawVol",
            value: function() {
                var a = this.coord.vol_coord;
                if (a) {
                    for (var b = this.data, c = this.ctx, d = this.v2y, e = this.total, f = this.stepX, g = a.l, k = a.t, l = a.w, n = a.h, h = b.view_data, o = h.VOL, p = h.DIFF, q = h.length, r = [], s = 0; s < q; s++) r.push([ s * f + g + 1, this.v2y(0 > o[s] ? 0 : o[s]), p[s] ]);
                    var i = {
                        red: j.default.color.red,
                        green: j.default.color.green,
                        white: j.default.color.white
                    };
                    m.default.volumeLine(c, r, a, i);
                }
            }
        }, {
            key: "drawDecoration",
            value: function(a, b) {
                if (b) {
                    var c = this.getTouchedInfo(b), d = {
                        x: c.touchedDataPos.x,
                        y: this.mapCross_Y(b)
                    };
                    this.drawTrendCross(a, d), this.drawVolCross(a, d, b);
                }
            }
        }, {
            key: "mapCross_Y",
            value: function(a) {
                var c = this.coord, d = c.trend_coord, e = c.vol_coord, f = d.t, g = d.b, b = a.x, h = a.y, i = h;
                return h < f && (i = f), h > g && !e && (i = g), h > g && e && h < e.t && (i = g - 1), 
                e && h > e.b && (i = e.b), i;
            }
        }, {
            key: "drawTrendCross",
            value: function(a, c) {
                var d = this.coord, e = d.trend_coord, f = e.t, g = e.b, b = c.x, h = c.y;
                m.default.polyLine(a, [ [ b, f ], [ b, g ] ], null, {
                    strokeColor: j.default.color.decorationLine
                });
            }
        }, {
            key: "drawVolCross",
            value: function(a, c, d) {
                var e = this.coord, f = this.touchedData, g = this.data, i = g.qt_data, k = i.precision, o = i.symbol, p = i.market_symbol, q = e.vol_coord, s = q.t, t = q.b, b = q.dateLabel_t, u = q.l, v = q.r, z = q.w, w = q.h, h = c.x, A = c.y, B = j.default.color.decorationLine, C = j.default.color.decorationFont, D = {
                    strokeColor: j.default.color.boxBorder,
                    fillColor: j.default.color.boxColor,
                    r: 3
                };
                if (m.default.polyLine(a, [ [ h, s ], [ h, t ] ], null, {
                    strokeColor: B
                }), A < t && m.default.circle(a, {
                    x: h + 1,
                    y: A
                }, {
                    r: 2.5,
                    strokeColor: B,
                    fillColor: B
                }), !this.isNarrow) {
                    var E = f.time, F = m.default.measureText(E), G = 3, H = h - F / 2 - G;
                    m.default.box(a, {
                        l: 0 > H ? 0 : H,
                        t: e.trend_coord.b,
                        w: F + 2 * G,
                        h: s - e.trend_coord.b
                    }, D), m.default.text(a, E, {
                        x: h,
                        y: b
                    }, {
                        color: C,
                        size: j.default.fontSize,
                        align: "center"
                    });
                }
                var I;
                if (A >= s) {
                    I = this.y2v(A);
                    var J = n.default.fmtVol(I, p + o);
                    I = J.data + J.fmtUnit;
                } else I = this.y2t(A), I = I.toFixed(k);
                var K = m.default.measureText(I), L = 15, M = 3, N = A;
                A > e.trend_coord.b - L / 2 && A < s ? N = e.trend_coord.b - L / 2 : A < e.trend_coord.t + L / 2 ? N = e.trend_coord.t + L / 2 : A > t - L / 2 && (N = t - L / 2), 
                d.x < (u + v) / 2 ? (m.default.polyLine(a, [ [ u, A ], [ v - K - 2 * M, A ] ], null, {
                    strokeColor: B
                }), m.default.box(a, {
                    l: v,
                    t: N - L / 2 - .5,
                    w: -(K + 2 * M),
                    h: L
                }, D), m.default.text(a, I, {
                    x: u + z - K - M,
                    y: N + 3.5
                }, {
                    color: C,
                    size: j.default.fontSize
                })) : (m.default.polyLine(a, [ [ u + K + 2 * M, A ], [ v, A ] ], null, {
                    strokeColor: B
                }), m.default.box(a, {
                    l: u,
                    t: N - L / 2 - .5,
                    w: K + 2 * M,
                    h: L
                }, D), m.default.text(a, I, {
                    x: u + M,
                    y: N + 3.5
                }, {
                    color: j.default.color.decorationFont,
                    size: j.default.fontSize
                }));
            }
        }, {
            key: "getTouchedInfo",
            value: function(a) {
                var b = this.data, c = this.coord, d = this.stepX, e = b.view_data, f = b.qt_data, g = e.PRICE, j = e.AVG, k = e.VOL, m = e.length, o = e.prec, p = f.precision, q = f.symbol, s = f.market_symbol, u = c.trend_coord, v = a.x, w = a.y, x = u.l, l = u.r, r = u.t, t = u.h, h = Math.floor((v - x) / d + .5);
                0 > h && (h = 0), h > m - 1 && (h = m - 1);
                var i = {
                    x: this.pricePoints[h][0],
                    y: this.pricePoints[h][1]
                }, y = e.data[h][0], z = g[h], A = z - o, B = (100 * (A / o)).toFixed(2) + "%", C = j[h], D = C - o, E = k[h];
                0 < A ? (A = A.toFixed(p), A = "+" + A, B = "+" + B) : A = A.toFixed(p);
                var F = n.default.fmtVol(E, s + q);
                return this.touchedData = {
                    time: y.slice(0, 2) + ":" + y.slice(2, 4),
                    price: z.toFixed(p),
                    priceDiff: A,
                    pricePercent: B,
                    volume: F.data + F.fmtUnit + F.mktUnit,
                    average: C.toFixed(p),
                    color: 0 < 1 * A ? "--red" : 0 == 1 * A ? "" : "--green",
                    averageColor: 0 < D ? "--red" : 0 == 1 * D ? "" : "--green",
                    touchedDataPos: i
                }, this.touchedData;
            }
        }, {
            key: "getTouchedData",
            value: function() {
                return this.touchedData;
            }
        }, {
            key: "setT2y",
            value: function() {
                var a = Math.abs, b = this.coord.trend_coord, c = b.t, d = b.h, e = this.data.view_data, f = e.max_price, g = e.min_price, h = e.prec, i = this.diff = 1.15 * Math.max(a(f - h), a(g - h)), j = h + i;
                0 == i && h && (i = this.diff = .01 * h, j = h + i);
                var k = (d - 1) / (2 * i);
                return function(a) {
                    return 0 === j || 0 === a ? c + (d - 1) / 2 : c + k * (j - a);
                };
            }
        }, {
            key: "setY2t",
            value: function() {
                var a = this.coord.trend_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_price, f = d.min_price, g = d.prec, h = this.diff, i = g + h;
                return function(a) {
                    return 0 <= a - b ? i - (a - b) / ((c - 1) / (2 * h)) : i;
                };
            }
        }, {
            key: "setV2y",
            value: function() {
                var a = this.coord.vol_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_vol;
                return function(a) {
                    return b + c / (e || 1) * ((e || 1) - a);
                };
            }
        }, {
            key: "setY2v",
            value: function() {
                var a = this.coord.vol_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_vol;
                return function(a) {
                    return (e || 1) - (a - b) / (c / (e || 1));
                };
            }
        } ]), a;
    }();
    exports.default = q, module.exports = exports["default"];
})();
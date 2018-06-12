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
            var c, d = [], e = !0, f = !1;
            try {
                for (var g, h = a[Symbol.iterator](); !(e = (g = h.next()).done) && (d.push(g.value), 
                !(b && d.length === b)); e = !0) ;
            } catch (a) {
                f = !0, c = a;
            } finally {
                try {
                    !e && h["return"] && h["return"]();
                } finally {
                    if (f) throw c;
                }
            }
            return d;
        }
        return function(b, c) {
            if (Array.isArray(b)) return b;
            if (Symbol.iterator in Object(b)) return a(b, c);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }(), d = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, e = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), f = require("../../../../utils/ppdog"), g = a(f), h = require("../../../../utils/regenerator-runtime"), i = a(h), j = require("../style"), k = a(j), l = require("../../../../libs/chart/shape"), m = a(l), n = require("../../../../utils/Tool"), o = a(n), p = {
        sh: 250,
        sz: 250,
        hk: 340,
        us: 395
    }, q = function() {
        function a(c, d, e) {
            b(this, a), this.ctx = c, this.data = d, this.coord = e, this.setCoordinate(), this.draw();
        }
        return e(a, [ {
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
                var a = this.data, b = this.coord, c = this.ctx, d = b.trend_coord, e = b.vol_coord;
                d.halfLine && m.default.halfLine(c, d, {
                    color: k.default.color.dashLine
                }), d.label && this.drawNormalLabel();
            }
        }, {
            key: "drawNormalLabel",
            value: function() {
                var a = this.data, b = this.ctx, c = this.coord, e = this.diff, f = a.view_data, g = a.qt_data, j = c.trend_coord, n = c.vol_coord, p = j.l, l = j.t, q = j.w, s = j.h, h = j.r, r = j.Y_SPLIT, t = f.prec, u = f.max_vol, v = g.precision, w = g.market_symbol, x = g.symbol, y = 3, z = c.w - h - 2 * y, A = {
                    color: k.default.color.label,
                    size: k.default.fontSize
                };
                if (j.staticPercent) {
                    var B = t ? (100 * (e / t)).toFixed(2) + "%" : "1.00%";
                    m.default.label(b, [ "+" + B, "-" + B ], {
                        l: p + y,
                        t: l + 10,
                        h: s - 15
                    }, {
                        fontStyle: d({}, A, {
                            align: "left"
                        }),
                        type: "vertical"
                    });
                }
                for (var C, D = [], E = 0; E < r + 1; E++) C = t + (r / 2 - E) * (2 * e / r), D.push(o.default.getProperDecimal(C, v, 6));
                if (m.default.label(b, D, {
                    l: h + y,
                    t: l + 10,
                    h: s - 15
                }, {
                    fontStyle: d({}, A, {
                        align: "left",
                        maxWidth: z
                    }),
                    type: "vertical"
                }), !!n) {
                    var i = [];
                    f.forEach(function(a) {
                        var b = a.date.substr(4);
                        i.push(b.slice(0, 2) + "-" + b.slice(2, 4));
                    }), m.default.label(b, i, {
                        l: p + q / 5 / 2,
                        t: n.dateLabel_t,
                        w: 4 * (q / 5)
                    }, {
                        fontStyle: d({}, A, {
                            align: "center"
                        }),
                        type: "horizon"
                    });
                    var F = o.default.fmtVol(u, w + x);
                    m.default.label(b, [ F.data, F.fmtUnit + F.mktUnit ], {
                        l: h + y,
                        t: n.t + 10,
                        h: n.h - 15
                    }, {
                        fontStyle: d({}, A, {
                            align: "left",
                            maxWidth: z
                        }),
                        type: "vertical"
                    });
                }
            }
        }, {
            key: "drawTrend",
            value: function() {
                var a = this.data, b = this.coord, c = this.ctx, d = this.t2y, e = b.trend_coord, f = e.l, g = e.t, j = e.w, l = e.h, i = e.r, n = a.view_data, o = a.qt_data, q = n.PRICE, r = n.AVG, s = n.length, u = o.market_symbol, v = this.total = p[u], w = this.stepX = (j / 5 - 1) / (v / 5 - 1), z = [], A = {
                    strokeColor: k.default.color.polyline,
                    fillColor: k.default.color.minfill
                }, B = {
                    strokeColor: k.default.color.averageLine
                };
                n.forEach(function(a, b) {
                    for (var e = a.PRICE, k = a.AVG, n = a.length, o = [], p = [], q = 0; q < n; q++) {
                        var i = q * w + (j / 5 * b + f), r = d(e[q]);
                        o.push([ i, r ]), z.push([ i, r, b, q ]), p.push([ i, d(k[q]) ]);
                    }
                    var s = {
                        l: j / 5 * b + f,
                        t: g,
                        w: j / 5,
                        h: l
                    };
                    m.default.polyLine(c, o, s, A), m.default.polyLine(c, p, s, B);
                }), this.pricePoints = z;
            }
        }, {
            key: "drawVol",
            value: function() {
                var a = this.coord.vol_coord;
                if (a) {
                    var b = this.data, c = this.ctx, d = this.v2y, e = this.total, f = this.stepX, g = a.l, j = a.t, l = a.w, n = a.h, i = b.view_data, o = {
                        red: k.default.color.red,
                        green: k.default.color.green,
                        white: k.default.color.white
                    };
                    i.forEach(function(a, b) {
                        for (var e = a.VOL, k = a.DIFF, p = a.length, q = [], r = 0; r < p; r++) q.push([ r * f + (l / 5 * b + g), d(0 > e[r] ? 0 : e[r]), k[r] ]);
                        m.default.volumeLine(c, q, {
                            l: l / 5 * b + g,
                            t: j,
                            w: l / 5,
                            h: n
                        }, o);
                    });
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
                    strokeColor: k.default.color.decorationLine
                });
            }
        }, {
            key: "drawVolCross",
            value: function(a, c, d) {
                var e = this.coord, f = this.touchedData, g = this.data, i = g.qt_data, j = i.precision, n = i.symbol, p = i.market_symbol, q = e.vol_coord, s = q.t, t = q.b, b = q.dateLabel_t, u = q.l, v = q.r, z = q.w, w = q.h, h = c.x, x = c.y, A = k.default.color.decorationLine, B = k.default.color.decorationFont, C = {
                    strokeColor: k.default.color.boxBorder,
                    fillColor: k.default.color.boxColor,
                    r: 3
                };
                m.default.polyLine(a, [ [ h, s ], [ h, t ] ], null, {
                    strokeColor: A
                }), x < t && m.default.circle(a, {
                    x: h + 1,
                    y: x
                }, {
                    r: 2.5,
                    strokeColor: A,
                    fillColor: A
                });
                var D = f.time, E = m.default.measureText(D), F = 3, G = h - E / 2 - F;
                m.default.box(a, {
                    l: 0 > G ? 0 : G,
                    t: e.trend_coord.b,
                    w: E + 2 * F,
                    h: s - e.trend_coord.b
                }, C), m.default.text(a, D, {
                    x: h - E / 2 < F ? F + E / 2 : h,
                    y: b
                }, {
                    color: B,
                    size: k.default.fontSize,
                    align: "center"
                });
                var H;
                if (x >= s) {
                    H = this.y2v(x);
                    var I = o.default.fmtVol(H, p + n);
                    H = I.data + I.fmtUnit;
                } else H = this.y2t(x), H = H.toFixed(j);
                var J = m.default.measureText(H), K = 15, L = 3, M = x;
                x > e.trend_coord.b - K / 2 && x < s ? M = e.trend_coord.b - K / 2 : x < e.trend_coord.t + K / 2 ? M = e.trend_coord.t + K / 2 : x > t - K / 2 && (M = t - K / 2), 
                d.x < (u + v) / 2 ? (m.default.polyLine(a, [ [ u, x ], [ v - J - 2 * L, x ] ], null, {
                    strokeColor: A
                }), m.default.box(a, {
                    l: v,
                    t: M - K / 2 - .5,
                    w: -(J + 2 * L),
                    h: K
                }, C), m.default.text(a, H, {
                    x: u + z - J - L,
                    y: M + 3.5
                }, {
                    color: B,
                    size: k.default.fontSize
                })) : (m.default.polyLine(a, [ [ u + J + 2 * L, x ], [ v, x ] ], null, {
                    strokeColor: A
                }), m.default.box(a, {
                    l: u,
                    t: M - K / 2 - .5,
                    w: J + 2 * L,
                    h: K
                }, C), m.default.text(a, H, {
                    x: u + L,
                    y: M + 3.5
                }, {
                    color: B,
                    size: k.default.fontSize
                }));
            }
        }, {
            key: "getTouchedInfo",
            value: function(a) {
                var b = this.data, d = this.coord, e = this.stepX, f = b.view_data, g = b.qt_data, k = f.prec, m = g.precision, n = g.symbol, p = g.market_symbol, q = d.trend_coord, s = a.x, u = a.y, v = q.l, l = q.r, r = q.t, t = q.h, h = Math.floor((s - v) / e + .5);
                0 > h && (h = 0), h > this.pricePoints.length - 1 && (h = this.pricePoints.length - 1);
                var i = c(this.pricePoints[h], 4), w = i[0], x = i[1], y = i[2], z = i[3], j = f[y], A = j.data[z][0], B = j.PRICE[z], C = B - k, D = (100 * (C / k)).toFixed(2) + "%", E = j.VOL[z], F = j.AVG[z], G = F - k;
                0 < C ? (C = C.toFixed(m), C = "+" + C, D = "+" + D) : C = C.toFixed(m);
                var H = o.default.fmtVol(E, p + n);
                return this.touchedData = {
                    time: A.slice(0, 2) + ":" + A.slice(2, 4),
                    price: B.toFixed(m),
                    priceDiff: C,
                    pricePercent: D,
                    volume: H.data + H.fmtUnit + H.mktUnit,
                    average: F.toFixed(m),
                    color: 0 < 1 * C ? "--red" : 0 == 1 * C ? "" : "--green",
                    averageColor: 0 < G ? "--red" : 0 == 1 * G ? "" : "--green",
                    touchedDataPos: {
                        x: w,
                        y: x
                    }
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
            key: "setV2y",
            value: function() {
                var a = this.coord.vol_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_vol;
                return function(a) {
                    return b + c / (e || 1) * ((e || 1) - a);
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
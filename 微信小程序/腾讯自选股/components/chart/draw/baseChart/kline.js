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
        qfq: "前复权",
        no: "不复权",
        hfq: "后复权",
        "": "前复权"
    }, p = function() {
        function a(c, d, e, f) {
            b(this, a), this.ctx = c, this.data = d, this.coord = e, this.settings = f, this.setCoordinate(), 
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
                this.getBarWidth(), this.drawTrend(), this.drawVol(), this.drawLabel();
            }
        }, {
            key: "drawLabel",
            value: function() {
                var a = this.data, b = this.coord, d = this.ctx, e = this.diff, f = this.barNum, g = b.trend_coord, k = b.vol_coord;
                if (g.label) {
                    for (var o, p = a.view_data, q = a.qt_data, s = g.l, l = g.t, t = g.w, u = g.h, h = g.r, r = g.Y_SPLIT, v = p.prec, w = p.max_vol, x = p.min_price, y = p.length, z = q.precision, A = q.market_symbol, B = q.symbol, C = 3, D = b.w - h - 2 * C, E = {
                        color: j.default.color.label,
                        size: j.default.fontSize
                    }, F = [], G = r; 0 <= G; G--) o = x + G * (e / r), F.push(n.default.getProperDecimal(o, z, 6));
                    if (m.default.label(d, F, {
                        l: h + C,
                        t: l + 10,
                        h: u - 15
                    }, {
                        fontStyle: c({}, E, {
                            align: "left",
                            maxWidth: D
                        }),
                        type: "vertical"
                    }), !!k) {
                        var i = p.data[0][0], H = p.data[y - 1][0], I = [ i.slice(0, 7) ];
                        y > f / 2 && I.push(H.slice(0, 7)), m.default.label(d, I, {
                            l: s + C,
                            t: k.dateLabel_t,
                            w: t - 2 * C
                        }, {
                            fontStyle: E,
                            type: "horizon"
                        });
                        var J = n.default.fmtVol(w, A + B);
                        m.default.label(d, [ J.data, J.fmtUnit + J.mktUnit ], {
                            l: h + C,
                            t: k.t + 10,
                            h: k.h - 15
                        }, {
                            fontStyle: c({}, E, {
                                align: "left",
                                maxWidth: D
                            }),
                            type: "vertical"
                        }), this.drawFQTextArea();
                    }
                }
            }
        }, {
            key: "drawFQTextArea",
            value: function() {
                var a = this.data, c = this.coord, d = this.ctx, e = this.settings, f = c.trend_coord, g = c.vol_coord, i = a.view_data, k = a.qt_data, p = f.l, l = f.t, q = f.w, s = f.h, h = f.b, b = f.r, r = f.Y_SPLIT, t = i.prec, u = i.max_vol, v = i.min_price, w = i.length, x = k.precision, y = k.market_symbol, z = k.symbol;
                if (!n.default.isIndex(y + z)) {
                    var A = o[e.fqType], B = 6.3 * (2 * A.length), C = {
                        color: j.default.color.fqLabel,
                        size: 12,
                        align: "center"
                    };
                    m.default.text(d, A, {
                        x: p + q / 2,
                        y: g.dateLabel_t
                    }, C), d.beginPath(), d.moveTo(p + q / 2 + B / 2, g.dateLabel_t), d.lineTo(p + q / 2 + B / 2 + 4, g.dateLabel_t), 
                    d.lineTo(p + q / 2 + B / 2 + 4, g.dateLabel_t - 4), d.lineTo(p + q / 2 + B / 2, g.dateLabel_t), 
                    d.setFillStyle(j.default.color.fqLabel), d.fill(), d.closePath(), this.fqTextArea = {
                        x: p + q / 2 - B / 2 - 5,
                        y: h - 3,
                        w: B + 10,
                        h: g.t - h + 6
                    };
                }
            }
        }, {
            key: "getFQTextArea",
            value: function() {
                return this.fqTextArea;
            }
        }, {
            key: "drawTrend",
            value: function() {
                var a = this.ctx, b = this.coord, d = this.t2y, e = this.data, f = this.barWidth, g = this.barNum, k = this.settings, n = b.trend_coord, o = e.view_data, p = e.qt_data, q = o.data, r = o.index_ma, s = o.DIFF, u = o.length, v = n.l, l = n.t, t = n.w, w = n.h, h = this.stepX = (t - 1) / g, y = [], z = {};
                for (var A in r) z[A] = [];
                for (var B, x, c = 1, C = 0; C < g && (B = C * h + v + f / 2 + 1, !!q[C]); C++) for (var D in x = 0 === s[C] ? c : s[C], 
                y.push([ B, d(q[C][1]), d(q[C][2]), d(q[C][3]), d(q[C][4]), x ]), c = x, r) {
                    var E = r[D][C];
                    z[D].push([ B, d(E) ]);
                }
                this.barPoints = y, m.default.candle(a, y, {
                    red: j.default.color.red,
                    green: j.default.color.green,
                    barWidth: f,
                    barStyle: k.barType
                });
                var F = 0;
                for (var i in r) m.default.polyLine(a, z[i], n, {
                    strokeColor: j.default.color.ma_color[F]
                }), F++;
            }
        }, {
            key: "drawVol",
            value: function() {
                var a = this.coord.vol_coord;
                if (a) {
                    var b = this.ctx, d = this.data, e = this.v2y, f = this.barWidth, g = this.barNum, k = this.stepX, n = this.settings, o = a.l, l = a.t, p = a.w, q = a.h, h = d.view_data, r = d.qt_data, s = h.index_vma, t = h.VOL, u = h.DIFF, v = h.length, w = h.data, y = [], z = {};
                    for (var A in s) z[A] = [];
                    for (var B, x, c = 1, C = 0; C < g && (B = C * k + o + f / 2 + 1, !!w[C]); C++) {
                        for (var D in x = 0 === u[C] ? c : u[C], y.push([ B, e(t[C]), x ]), s) {
                            var E = s[D][C];
                            z[D].push([ B, e(E) ]);
                        }
                        c = x;
                    }
                    m.default.volumeLine(b, y, a, {
                        red: j.default.color.red,
                        green: j.default.color.green,
                        barWidth: f,
                        barStyle: n.barType
                    });
                    var F = 0;
                    for (var i in s) m.default.polyLine(b, z[i], a, {
                        strokeColor: j.default.color.ma_color[F]
                    }), F++;
                }
            }
        }, {
            key: "getBarWidth",
            value: function() {
                var a = this.data.view_data, b = a.length;
                this.barNum = Math.max(b, 55), this.barWidth = this.coord.trend_coord.w / this.barNum - 1;
            }
        }, {
            key: "drawDecoration",
            value: function(a, b) {
                if (b) {
                    var c = this.getTouchedInfo(b), d = {
                        x: c.touchedDataPos.x - 1,
                        y: this.mapCross_Y(b)
                    };
                    this.drawTrendCross(a, d), this.drawDecorationMA(a, d, b), this.drawVolCross(a, d, b);
                }
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
            key: "mapCross_Y",
            value: function(a) {
                var c = this.coord, d = c.trend_coord, e = c.vol_coord, f = d.t, g = d.b, b = a.x, h = a.y, i = h;
                return h < f && (i = f), h > g && !e && (i = g), h > g && e && h < e.t && (i = g - 1), 
                e && h > e.b && (i = e.b), i;
            }
        }, {
            key: "drawVolCross",
            value: function(a, c, d) {
                var e = this.coord, f = this.touchedData, g = this.data, i = g.qt_data, k = i.precision, o = i.symbol, p = i.market_symbol, q = e.vol_coord, s = q.t, t = q.b, b = q.dateLabel_t, u = q.l, v = q.r, z = q.w, w = q.h, h = c.x, x = c.y, A = j.default.color.decorationLine, B = j.default.color.decorationFont, C = {
                    strokeColor: j.default.color.boxBorder,
                    fillColor: j.default.color.boxColor,
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
                var D = f.date, E = m.default.measureText(D), F = 3, G = h - E / 2 - F;
                m.default.box(a, {
                    l: 0 > G ? 0 : G,
                    t: e.trend_coord.b,
                    w: E + 2 * F,
                    h: s - e.trend_coord.b
                }, C), m.default.text(a, D, {
                    x: 0 > G ? F + E / 2 : h,
                    y: b
                }, {
                    color: B,
                    size: j.default.fontSize,
                    align: "center"
                });
                var H;
                if (x >= s) {
                    H = this.y2v(x);
                    var I = n.default.fmtVol(H, p + o);
                    H = I.data + I.fmtUnit;
                } else H = this.y2t(x), H = H.toFixed(k);
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
                    size: j.default.fontSize
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
                    size: j.default.fontSize
                }));
            }
        }, {
            key: "drawDecorationMA",
            value: function(a, c, d) {
                var e = this.coord, f = this.touchedData, g = this.data, k = g.qt_data, n = f.MAData, o = k.precision, p = k.symbol, q = k.market_symbol, s = e.trend_coord, u = s.t, t = s.b, b = s.dateLabel_t, v = s.l, l = s.r, r = s.w, w = s.h, h = c.x, x = c.y, y = 5, z = n.length;
                if (d.x < (v + l) / 2) for (var A = l - 2, B = z - 1; 0 <= B; B--) {
                    var i = n[B], C = i.key + ":" + i.ma;
                    m.default.text(a, C, {
                        x: A,
                        y: u + 10
                    }, {
                        color: j.default.color.ma_color[B],
                        size: j.default.fontSize,
                        background: j.default.color.labelBG,
                        align: "right"
                    }), A = A - m.default.measureText(C) - y;
                } else for (var D = v + 2, E = 0; E < z; E++) {
                    var F = n[E], G = F.key + ":" + F.ma;
                    "" === F.ma || (m.default.text(a, G, {
                        x: D,
                        y: u + 10
                    }, {
                        color: j.default.color.ma_color[E],
                        size: j.default.fontSize,
                        background: j.default.color.labelBG,
                        align: "left"
                    }), D = D + m.default.measureText(G) + y);
                }
            }
        }, {
            key: "getTouchedInfo",
            value: function(a) {
                var b = this.data, c = this.coord, d = this.stepX, e = b.view_data, f = b.qt_data, g = f.precision, j = f.market_symbol, k = f.symbol, m = e.VOL, o = e.index_ma, p = e.prec, q = e.CL, s = c.trend_coord, u = a.x, v = a.y, w = s.l, l = s.r, r = s.t, t = s.h, h = Math.floor((u - w - this.barWidth / 2 - 1) / d + .5);
                0 > h && (h = 0), h > e.length - 1 && (h = e.length - 1);
                var i = {
                    x: this.barPoints[h][0],
                    y: this.barPoints[h][1]
                }, x = e.data[h], y = 0 === h ? p : q[h - 1], z = x[0], A = x[1], B = x[2], C = x[3], D = x[4], E = m[h], F = [];
                for (var G in o) {
                    var H = o[G][h];
                    H = isNaN(H) ? "" : H.toFixed(g), F.push({
                        key: G.toUpperCase(),
                        ma: H
                    });
                }
                var I = B - y, J = (100 * (I / y)).toFixed(2) + "%";
                0 < I ? (I = I.toFixed(g), I = "+" + I, J = "+" + J) : I = I.toFixed(g);
                var K = n.default.fmtVol(E, j + k);
                return this.touchedData = {
                    date: z,
                    open: A.toFixed(g),
                    openColor: this.getTouchedColor(A, y),
                    close: B.toFixed(g),
                    closeColor: this.getTouchedColor(B, y),
                    high: C.toFixed(g),
                    highColor: this.getTouchedColor(C, y),
                    low: D.toFixed(g),
                    lowColor: this.getTouchedColor(D, y),
                    priceDiff: I,
                    pricePercent: J,
                    volume: K.data + K.fmtUnit + K.mktUnit,
                    zf: (100 * ((C - D) / p)).toFixed(2) + "%",
                    MAData: F,
                    touchedDataPos: i
                }, this.touchedData;
            }
        }, {
            key: "getTouchedColor",
            value: function(a, b) {
                return 0 < a - b ? "--red" : 0 > a - b ? "--green" : "";
            }
        }, {
            key: "getTouchedData",
            value: function() {
                return this.touchedData;
            }
        }, {
            key: "setT2y",
            value: function() {
                var a = this.coord.trend_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_price, f = d.min_price, g = d.precision, h = this.diff = e - f;
                0 == h && (h = 1 / Math.pow(10, g), e += 2 * h, this.diff = 4 * h);
                var i = (c - 1) / h;
                return function(a) {
                    return "undefined" == typeof a || null === a ? void 0 : b + i * (e - a);
                };
            }
        }, {
            key: "setY2t",
            value: function() {
                var a = this.data, b = this.coord, c = this.diff, d = a.view_data, e = d.min_price, f = d.precision, g = e + c, i = b.trend_coord, j = i.t, k = i.h;
                return function(a) {
                    return 0 <= a - j ? g - (a - j) / ((k - 1) / c) : g;
                };
            }
        }, {
            key: "setV2y",
            value: function() {
                var a = this.coord.vol_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_vol;
                return function(a) {
                    return "undefined" == typeof a || null === a ? void 0 : b + c / (e || 1) * ((e || 1) - a);
                };
            }
        }, {
            key: "setY2v",
            value: function() {
                var a = this.coord.vol_coord, b = a.t, c = a.h, d = this.data.view_data, e = d.max_vol;
                return function(a) {
                    return e - (a - b) / (c / (e || 1));
                };
            }
        } ]), a;
    }();
    exports.default = p, module.exports = exports["default"];
})();
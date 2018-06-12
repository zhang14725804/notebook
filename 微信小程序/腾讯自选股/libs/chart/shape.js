(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function c(a) {
        return a;
    }
    function d(a) {
        return a;
    }
    function b(a) {
        a = a.toString();
        for (var b = a.length, c = 0, d = a.length; c < d; c++) a[c].match(/[\u4e00-\u9fa5]/) && b++;
        return b;
    }
    var e = Math.PI;
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var f = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, g = require("../../utils/ppdog"), h = a(g), i = require("../../utils/regenerator-runtime"), j = a(i), k = {
        loading: function(a, b, c) {
            var d = b.w, f = b.h;
            a.save(), a.translate(d / 2, f / 2), a.rotate(c);
            for (var g = 0; 8 > g; g++) {
                a.rotate(e / 4);
                var h = 1 / 16 * g;
                k.circle(a, {
                    x: -10,
                    y: 0
                }, {
                    r: 2.5,
                    fillColor: "rgba(255,255,255," + h + ")"
                });
            }
            a.restore(), a.draw();
        },
        label: function(a, b, c, d) {
            var e = d.type, g = d.fontStyle, j = c.l, m = c.t, n = c.w, o = c.h, h = b.length;
            if ("vertical" === e) for (var p, q = 1 === h ? 0 : o / (h - 1), r = 0; r < h; r++) p = b[r], 
            k.text(a, p, {
                x: j,
                y: m + q * r
            }, g); else if ("horizon" === e) for (var i, s = 1 === h ? 0 : n / (h - 1), u = void 0, v = 0; v < h; v++) i = b[v], 
            u = 0 === v ? g.align || "left" : v === h - 1 ? g.align || "right" : g.align || "center", 
            k.text(a, i, {
                x: j + s * v,
                y: m
            }, f({}, g, {
                align: u
            }));
        },
        polyLine: function(a, b, e, f) {
            if (b.length) {
                var g = b[0][0], h = b[0][1], i = !1;
                if (a.setLineJoin("round"), f.fillColor) {
                    a.beginPath(), a.moveTo(d(g), d(h)), b.forEach(function(b) {
                        a.lineTo(d(b[0]) + 1, d(b[1]));
                    });
                    var j = b[b.length - 1][0], k = e.t + e.h;
                    a.lineTo(d(j) + 1, c(k)), a.lineTo(d(g), c(k)), a.lineTo(d(g), d(h)), a.setStrokeStyle("rgba(0,0,0,0)"), 
                    a.setFillStyle(f.fillColor), a.fill();
                }
                a.beginPath(), a.moveTo(d(g), d(h)), b.forEach(function(b) {
                    "undefined" == typeof b[1] ? i = !0 : i ? (a.moveTo(d(b[0]) + 1, d(b[1])), i = !1) : a.lineTo(d(b[0]) + 1, d(b[1]));
                });
                var l = f.lineWidth || 1;
                a.setLineWidth(l), a.setStrokeStyle(f.strokeColor), a.stroke();
            }
        },
        volumeLine: function(a, e, f, g) {
            var i = f.t, j = f.h, h = i + j, b = g.barWidth || 1, k = g.barStyle;
            e.forEach(function(e) {
                if (a.beginPath(), "empty" === k && 0 < e[2]) {
                    var f = d(e[0]) - b / 2, i = d(h - .5), j = c(e[1] - h);
                    a.setLineWidth(1), a.beginPath(), a.rect(f, i, b, j), a.closePath();
                } else a.setLineWidth(b), a.moveTo(d(e[0]), c(h)), a.lineTo(d(e[0]), c(e[1]));
                0 < e[2] ? a.setStrokeStyle(g.red) : 0 > e[2] ? a.setStrokeStyle(g.green) : a.setStrokeStyle(g.white), 
                a.stroke();
            });
        },
        text: function(a, b, c, d) {
            var e = Math.min, f = d.size, g = d.color, h = d.background, i = d.align, j = d.maxWidth, k = c.x, l = c.y, m = this.measureText(b);
            if (d.background) {
                var n = j ? e(j, m) : m;
                a.beginPath(), "right" === i ? a.rect(k, l - 12, -n, 14) : "center" === i ? a.rect(k - n / 2, l - 12, n, 14) : a.rect(k, l - 12, n, 14), 
                a.setFillStyle(h), a.closePath(), a.fill();
            }
            a.setTextAlign ? a.setTextAlign(i || "left") : "right" === i ? k -= e(j || Infinity, m) : "center" === i && (k -= e(j || Infinity, m) / 2);
            var o = 1;
            a.save(), a.setFontSize(f), j && m > j && (o = j / m), a.setFillStyle(g || "#ffffff"), 
            a.translate(k, l - 6 * (1 - o)), a.scale(o, o), a.fillText(b, 0, 0), a.restore();
        },
        box: function(a, b, f) {
            var g = b.w, i = b.h, j = b.l, k = b.t;
            a.beginPath(), a.setStrokeStyle(f.strokeColor);
            var l = f.r || 0;
            0 > g && (g = -g, j -= g), 0 > i && (i = -i, k -= i);
            var m = e;
            a.moveTo(d(j), d(k + l)), a.arc(d(j + l), d(k + l), c(l), m, 1.5 * m), a.lineTo(d(j + g - l), d(k)), 
            a.arc(d(j + g - l), d(k + l), c(l), 1.5 * m, 2 * m), a.lineTo(d(j + g), d(k + i - l)), 
            a.arc(d(j + g - l), d(k + i - l), c(l), 0, .5 * m), a.lineTo(d(j + l), d(k + i)), 
            a.arc(d(j + l), d(k + i - l), c(l), .5 * m, m), a.lineTo(d(j), d(k + l)), a.closePath(), 
            f.fillColor && (a.setFillStyle(f.fillColor), a.fill()), a.setLineWidth(.5), a.stroke();
        },
        grid: function(a, b, e) {
            var f = b.w, g = b.h, h = b.l, j = b.t, k = b.X_SPLIT, l = b.Y_SPLIT, m = e.color;
            a.setLineWidth(.5), a.beginPath(), a.rect(d(h), d(j), c(f), c(g)), a.setStrokeStyle(m), 
            a.stroke(), a.closePath(), a.beginPath();
            for (var n = f / k, o = 1; o < k; o++) a.moveTo(d(h + n * o), d(j)), a.lineTo(d(h + n * o), d(j) + c(g));
            for (var i = g / l, p = 1; p < l; p++) a.moveTo(d(h), d(j + i * p)), a.lineTo(d(h) + c(f), d(j + i * p));
            a.setStrokeStyle(m), a.stroke(), a.closePath();
        },
        halfLine: function(a, b, c) {
            var d = b.t, e = b.l, f = b.w, g = b.h;
            k.dashLine(a, {
                x1: e,
                x2: e + f - 1,
                y1: d + g / 2,
                y2: d + g / 2
            }, 3, c);
        },
        dashLine: function(a, b, c, e) {
            c = c === void 0 ? 5 : c;
            var f = b.x1, g = b.x2, h = b.y1, j = b.y2, k = g - f, l = j - h, m = Math.floor(Math.sqrt(k * k + l * l) / c);
            a.beginPath();
            for (var n = 0; n < m + 1; n++) if (0 == n % 2) a.moveTo(d(f + k / m * n), d(h + l / m * n)); else {
                var i = f + k / m * n, o = h + l / m * n;
                a.lineTo(d(i), d(o));
            }
            a.setStrokeStyle(e.color), a.setLineWidth(e.lineWidth || 1), a.stroke(), a.closePath();
        },
        candle: function(a, b, e) {
            var f = e.barWidth;
            a.setLineJoin("bevel"), b.forEach(function(b) {
                var g = 0 < b[5] ? e.red : e.green;
                if (a.setStrokeStyle(g), a.setLineWidth(1), a.beginPath(), a.moveTo(b[0], b[3]), 
                a.lineTo(b[0], b[4]), a.closePath(), a.stroke(), "empty" === e.barStyle && 0 < b[5]) {
                    var i = d(b[0]) - f / 2, j = d(b[1]), k = f, l = c(b[2] - b[1]);
                    a.clearRect(i, j, k, l), a.beginPath(), a.rect(i, j, k, l), a.closePath(), a.stroke();
                } else a.setLineWidth(f), a.beginPath(), b[1] >= b[2] && 1 > b[1] - b[2] ? b[1] = b[2] + 1 : b[2] >= b[1] && 1 > b[2] - b[1] && (b[2] = b[1] + 1), 
                a.moveTo(d(b[0]), d(b[1])), a.lineTo(d(b[0]), d(b[2])), a.closePath(), a.stroke();
            });
        },
        macdBar: function(a, b, e, f) {
            var g = e.t + e.h / 2;
            a.setLineWidth(f.barWidth), b.forEach(function(b) {
                a.beginPath();
                var e = 0 < b[2] ? f.red : f.green;
                a.setStrokeStyle(e), b[1] >= g && 1 > b[1] - g ? b[1] = g + 1 : b[1] < g && 1 > g - b[1] && (b[1] = g - 1), 
                a.moveTo(d(b[0]), c(b[1])), a.lineTo(d(b[0]), c(g)), a.stroke();
            });
        },
        boll: function(a, b, e) {
            a.setLineWidth(1);
            var f = e.barWidth / 2;
            b.forEach(function(b) {
                var g = 0 < b[5] ? e.red : e.green;
                a.setStrokeStyle(g), a.beginPath(), a.moveTo(d(b[0]), d(b[1])), a.lineTo(d(b[0] - f), d(b[1])), 
                a.stroke(), a.beginPath(), a.moveTo(d(b[0]), d(b[2])), a.lineTo(d(b[0] + f), d(b[2])), 
                a.stroke(), a.beginPath(), a.moveTo(d(b[0]), c(b[3])), a.lineTo(d(b[0]), c(b[4])), 
                a.stroke();
            });
        },
        sar: function(a, b, c) {
            var d = this;
            a.setLineWidth(1);
            var e = c.r;
            b.forEach(function(b) {
                var f = 0 < b[2] ? c.red : c.green;
                d.circle(a, {
                    x: b[0],
                    y: b[1]
                }, {
                    r: e,
                    strokeColor: f,
                    fillColor: f
                });
            });
        },
        circle: function(a, b, c) {
            var d = c.r;
            a.beginPath();
            "undefined" == typeof b.x || "undefined" == typeof b.y || (a.arc(b.x, b.y, d, 0, 2 * e), 
            c.fillColor && (a.setFillStyle(c.fillColor), a.fill()), c.strokeColor && (a.setStrokeStyle(c.strokeColor), 
            a.setLineWidth(c.lineWidth || 1), a.stroke()));
        },
        noDataBox: function(a, b, c) {
            var d = c.l, f = c.t, g = c.w, i = c.h, j = c.borderColor, m = c.fillColor, n = c.textColor, o = c.iconColor;
            this.box(a, {
                l: d,
                t: f,
                w: g,
                h: i
            }, {
                strokeColor: j,
                fillColor: m,
                r: 2.5
            }), this.circle(a, {
                x: d + 30,
                y: f + i / 2
            }, {
                r: 8,
                strokeColor: o,
                lineWidth: 1
            }), a.save(), a.translate(d + 30, f + i / 2), a.rotate(e / 4), a.beginPath(), a.moveTo(0, -8), 
            a.lineTo(0, 8), a.closePath(), a.setStrokeStyle(o), a.setLineWidth(2), a.stroke(), 
            a.restore(), k.text(a, b, {
                x: d + 50,
                y: f + i / 2 + 3
            }, {
                color: n,
                size: 12
            });
        },
        measureText: function(a, c) {
            return c = c || 11, b(a) * 6 * (c / 11);
        }
    };
    exports.default = k, module.exports = exports["default"];
})();
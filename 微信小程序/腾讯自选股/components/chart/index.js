(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = a.screenWidth, c = a.screenHeight, d = a.windowWidth, e = a.windowHeight, f = c ? 1333 : 1255;
        return {
            width_l: 1 * (b || d),
            width_s: 514 / 750 * (b || d),
            height: 578 / f * (c || e)
        };
    }
    function c(a, b, c) {
        return (r.default.isIndex(a) || b.match(/minute|fdays/)) && (c = ""), c ? [ a, b, c ].join("#") : [ a, b ].join("#");
    }
    function d(a, b) {
        if (!(a && b)) return !1;
        var c = b.x, d = b.y;
        return c > a.x && c < a.x + a.w && d > a.y && d < a.y + a.h;
    }
    function e(a, b) {
        var c = a.slice(0, 2), d = b.slice(0, 2), e = a.slice(2, 4), f = b.slice(2, 4);
        if (c === d) return e - f;
        return 60 * (c - d) + 1 * e - f;
    }
    var f, g, h, i, j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, k = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, l = require("../../utils/ppdog"), m = a(l), n = require("../../utils/regenerator-runtime"), o = a(n), p = require("../../utils/RequestApi"), q = require("../../utils/Tool"), r = a(q), s = require("./draw/index"), t = a(s), u = require("../../libs/chart/HqData");
    module.exports = {
        data: {
            type: "minute",
            canvasHidden: !1,
            chartData: [],
            fqType: "qfq",
            touchData: {
                isTouched: !1,
                type: "",
                data: {}
            }
        },
        onLoad: function() {
            var a = getApp(), b = a.Event;
            b.on("qtRawDataUpdate", this, this.updateQtData), this.painter = new t.default("mainChart");
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
            this.Calculator = null, this.stopGetData(), b.remove("qtRawDataUpdate", this), b.remove(this.dataKey, this), 
            this.clearCanvas(), this.painter.destroy();
        },
        init: function(a, c, d) {
            if (this.symbol = c, d = d || this.data.type, console.log("chart init:", a, c, d), 
            d !== this.data.type) {
                var e;
                "minute" === d ? e = "20rpx" : "fdays" === d ? e = "156rpx" : "day" === d ? e = "300rpx" : "week" === d ? e = "440rpx" : "month" === d ? e = "584rpx" : void 0, 
                this.setData({
                    type: d,
                    left: e
                });
            }
            var f = getApp(), g = f.SystemInfo, h = f.settings, i = f.userAction, j = h.colorType, k = i.barType;
            this.canvasSize = b(g), this.setLayout(a), this.setFqType(a), this.painter.init({
                canvas: this.data.canvas,
                colorType: j,
                barType: k,
                fqType: this.data.fqType
            }), this.startGetData();
        },
        checkValidStorage: function() {
            var a = this, b = this.data, c = b.type, d = b.fqType;
            return this.getStorage().then(function(a) {
                return a.data;
            }).then(function(b) {
                return a.isOutOfDate(b, a.qt, c);
            }).then(function(b) {
                if (c.match(/minute|fdays/)) b || a.drawLoading(), a.updateData(b); else if (b) return b.today ? a.updateData(b) : (a.drawLoading(), 
                a.updateData(b, !0)), b;
                return b;
            }).catch(function() {
                return !1;
            });
        },
        hideChart: function() {
            this.setData({
                canvasHidden: !0
            });
        },
        showChart: function() {
            this.setData({
                canvasHidden: !1
            });
        },
        updateQtData: function(a) {
            if (a && a.TimeStamp && (this.qt = a), this.Calculator && "hfq" !== this.data.fqType) {
                var b = this.Calculator.update({
                    qt: a
                });
                this.drawChart(b);
            }
        },
        updateData: function(a, b) {
            console.log("[update Chart Data] =====>", a);
            var c = getApp(), e = c.cachedList, f = c.Event, g = u.Calculator, h = this.data, i = h.type, j = h.fqType, k = this.symbol;
            k.match(/usDJI|usINX$|usIXIC/) && (k = "us." + k.substr(2));
            var l, m = {
                code: k,
                type: i,
                fq: j
            };
            this.Calculator ? (l = this.Calculator.update({
                data: a
            }), a = this.Calculator.raw_data) : (this.Calculator = new g(m), l = this.Calculator.initialize({
                raw_data: a,
                VIEW_LEN: 55,
                SAMPLING: 5,
                MA_CFG: [ "ma5", "ma10", "ma20" ]
            })), b || (this.drawChart(l), this.saveStorage(a));
        },
        methods: {
            bindChartTabBarTap: function(a) {
                var b = a.target.dataset.type, c = getApp(), d = c.Event;
                b && b !== this.data.type && (this.activeAnimation(a), this.clearCanvas(), this.setData({
                    type: b
                }), this.setLayout(), this.Calculator = null, this.parent.getAllData(b, this.data.fqType), 
                this.startGetData());
            },
            bindChartLongTap: function(a) {
                var b = this.painter;
                if (!h && b.hasEvent()) {
                    var c = a.touches.length, d = a.touches[c - 1].x || a.touches[c - 1].clientX, e = a.touches[c - 1].y || a.touches[c - 1].clientY;
                    h = "L", b.drawDecration({
                        x: d,
                        y: e
                    }), this.setData({
                        touchData: {
                            data: b.getTouchedData(),
                            isTouched: !0,
                            type: this.data.type
                        }
                    });
                }
            },
            bindChartTouchStart: function(a) {
                if (this.painter.hasEvent()) {
                    var b = a.touches.length;
                    f = {
                        x: a.touches[b - 1].x,
                        y: a.touches[b - 1].y
                    };
                }
            },
            bindChartTouchMove: function(a) {
                var b = this.painter;
                if (b.hasEvent()) {
                    var c = a.touches.length, d = a.touches[c - 1].x, e = a.touches[c - 1].y;
                    if ("L" === h) {
                        if (!g) {
                            b.drawDecration({
                                x: d,
                                y: e
                            });
                            var f = b.getTouchedData();
                            this.setData({
                                touchData: k({}, this.data.touchData, {
                                    data: f
                                })
                            });
                        }
                        g = setTimeout(function() {
                            g = null;
                        }, 20);
                    }
                }
            },
            bindChartTouchEnd: function() {
                var a = this, b = this.painter;
                if (b.hasEvent()) {
                    g && (clearTimeout(g), g = null), b.clearDecoration(), this.setData({
                        touchData: k({}, this.data.touchData, {
                            isTouched: !1
                        })
                    });
                    var c = b.getFQTextArea();
                    if (d(c, f)) {
                        var e = this.symbol, i = [ "前复权", "不复权", "后复权" ];
                        "us" === e.slice(0, 2) && (i = [ "前复权", "不复权" ]), m.default.wx.showActionSheet({
                            itemList: i
                        }).then(function(b) {
                            var c = [ "qfq", "no", "hfq" ][b.tapIndex];
                            a.setData({
                                fqType: c
                            }), a.drawLoading(), a.listenToData(), a.Calculator = null, a.parent.getAllData(a.data.type, c);
                        });
                    }
                    h = "";
                }
            },
            listenToData: function() {
                var a = getApp(), b = a.Event;
                this.dataKey && b.remove(this.dataKey, this), this.dataKey = [ "setChartData", this.symbol, this.data.type, this.data.fqType ].join("."), 
                b.on(this.dataKey, this, this.updateData);
            },
            setLayout: function(a) {
                var b = this.canvasSize, c = b.width_l, d = b.width_s, e = b.height;
                a = a || this.data.marketTpl;
                var f = "cn" === a && "minute" === this.data.type;
                this.setData({
                    marketTpl: a,
                    canvas: {
                        height: e,
                        width: f ? d : c,
                        isNarrow: f
                    }
                });
            },
            setFqType: function(a) {
                var b = getApp(), c = b.userAction, d = c.fqType || "qfq";
                a.match(/us/) && (d = "hfq" === d ? "qfq" : d), this.setData({
                    fqType: d
                });
            },
            drawLoading: function() {
                this.painter.drawLoading();
            },
            drawChart: function(a) {
                this.painter.hideLoading();
                var b = this.data, c = b.type, d = b.fqType, e = {
                    data: a,
                    type: c,
                    fqType: d,
                    canvas: this.data.canvas
                };
                this.painter.draw(e);
            },
            clearCanvas: function() {
                this.painter.clear();
            },
            getStorage: function() {
                var a = this.data, b = this.symbol, d = a.type, e = a.fqType, f = c(b, d, e);
                return m.default.wx.getStorage({
                    key: f
                });
            },
            saveStorage: function(a) {
                var b = getApp(), d = b.Event, e = this.data, f = e.type, g = e.fqType, h = c(this.symbol, f, g);
                m.default.wx.setStorage({
                    key: h,
                    data: a
                }).then(function() {
                    d.emit("addCachedList", h);
                });
            },
            activeAnimation: function(a) {
                var b = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease"
                });
                b.translate3d(a.target.offsetLeft - 10, 0, 0), b.step(), this.setData({
                    animation: b.export()
                });
            },
            startGetData: function() {
                var a = this;
                this.stopGetData(), this.listenToData(), i = setInterval(function() {
                    a.Calculator = null, a.parent.getAllData(a.data.type, a.data.fqType);
                }, 6e4);
            },
            stopGetData: function() {
                clearInterval(i);
            },
            isOutOfDate: function(a, b, c) {
                if (!(b && b.TimeStamp)) return !1;
                var d = b.TimeStamp, f = b.Market, g = b.Code;
                d = d.replace(/:|\/| |-/g, "");
                var h = d.slice(0, 8), i = d.slice(8, 12), l = a[f + g];
                if (("undefined" == typeof l ? "undefined" : j(l)) === void 0) return !1;
                switch (c) {
                  case "minute":
                    return l.qt.date === h && e(i, l.qt.time) <= 10 && a;

                  case "fdays":
                    return l.qt.date === h && e(i, l.qt.time) <= 60 && a;

                  default:
                    var m = l.qt.date, n = l["qfq" + c] || l[c] || l["hfq" + c];
                    return m = 1 < n.length ? n[n.length - 2][0] : [ m.slice(0, 4), m.slice(4, 6), m.slice(6, 8) ].join("-"), 
                    l.qt.date === h ? k({}, a, {
                        today: !0,
                        from_date: m
                    }) : k({}, a, {
                        from_date: m
                    });
                }
            }
        }
    };
})();
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
    var c, d = Object.assign || function(a) {
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
    }(), f = require("../../../utils/ppdog"), g = a(f), h = require("../../../utils/regenerator-runtime"), i = a(h), j = require("../../../libs/chart/shape"), k = a(j), l = require("./baseChart/index"), m = a(l), n = require("./style"), o = a(n), p = function() {
        function a(c) {
            b(this, a), this.id = c;
        }
        return e(a, [ {
            key: "init",
            value: function(a) {
                return this.opt = a, this.setCoord(), this.decorateLayer = this.decorateLayer ? this.decorateLayer : wx.createCanvasContext(this.id + "D"), 
                this.backLayer = this.backLayer ? this.backLayer : wx.createCanvasContext(this.id + "B"), 
                this.frontLayer = this.frontLayer ? this.frontLayer : wx.createCanvasContext(this.id + "F"), 
                this;
            }
        }, {
            key: "setCoord",
            value: function() {
                var a = this.opt, b = a.canvas;
                this.coord = {
                    x: 0,
                    y: 0,
                    w: b.width,
                    h: b.height
                };
            }
        }, {
            key: "drawLoading",
            value: function() {
                var a = this;
                c && (clearInterval(c), c = null);
                var b = 0, e = this.coord, f = this.decorateLayer, g = getApp(), h = g.SystemInfo, i = h.screenWidth || h.windowWidth, j = d({}, this.coord, {
                    w: i
                });
                k.default.loading(f, j, b), c = setInterval(function() {
                    b += Math.PI / 16, k.default.loading(a.decorateLayer, j, b);
                }, 33);
            }
        }, {
            key: "hideLoading",
            value: function() {
                if (c) {
                    clearInterval(c), c = null;
                    this.coord;
                    this.decorateLayer.draw();
                }
            }
        }, {
            key: "checkTypeChange",
            value: function(a) {
                return a = d({}, this.opt, a), a.type !== this.opt.type;
            }
        }, {
            key: "draw",
            value: function(a) {
                var b = this.checkTypeChange(a);
                return this.opt = d(this.opt, a), b && (this.setCoord(), this._axis(), this.drawBack()), 
                this.hasStatus() ? (this.frontLayer.draw(), void this.drawStatus()) : void this.drawPaper();
            }
        }, {
            key: "hasStatus",
            value: function() {
                var a = this.opt, b = a.data, c = a.type, d = b.qt_data, e = b.minute_data, f = b.day_data, g = b.fdays_data, h = b.view_data, i = d.status;
                return i && i.match(/D|U/) && c.match(/minute|fdays/) || 0 === h.length;
            }
        }, {
            key: "drawStatus",
            value: function() {
                var a, b, c = this.coord, d = this.opt, e = d.data, f = e.qt_data, g = f.status, h = 40;
                "D" === g ? (a = "已退市", b = 110) : (a = "暂时无法获取数据", b = 170);
                var i = this.backLayer;
                k.default.noDataBox(i, a, {
                    l: (c.w - b) / 2,
                    t: (c.h - h) / 2,
                    w: b,
                    h: h,
                    borderColor: o.default.color.warningBorder,
                    fillColor: o.default.color.warningColor,
                    textColor: o.default.color.warningText,
                    iconColor: o.default.color.warningImg
                }), i.draw();
            }
        }, {
            key: "_axis",
            value: function() {
                var a, b = this.opt, c = b.canvas, e = b.type, f = o.default.layout, g = "miniChart" === this.name ? "mini" : "";
                a = c.isNarrow ? f["min" + g].narrow : "minute" === e ? f["min" + g].normal : "fdays" === e ? f["fdays" + g] : f["kline" + g];
                var h = this._calChartCoord(a);
                this.coord = d(this.coord, {
                    chartCoord: h
                });
            }
        }, {
            key: "_calChartCoord",
            value: function(a) {
                var b = d({}, a), c = this.coord, e = c.h, f = c.w;
                for (var g in b) {
                    var h = b[g], i = d({}, h);
                    for (var j in i) "t" == j || "h" == j || "dateLabel_t" == j ? i[j] *= e : ("l" == j || "w" == j) && (i[j] *= f);
                    i.r = i.l + i.w, i.b = i.t + i.h, i.w = i.r - i.l, i.h = i.b - i.t, b[g] = i;
                }
                return b.w = f, b.h = e, b;
            }
        }, {
            key: "drawBack",
            value: function() {
                var a = this.backLayer, b = this.coord.chartCoord, c = o.default.color.grid;
                b.trend_coord && k.default.grid(a, b.trend_coord, {
                    color: c
                }), b.vol_coord && k.default.grid(a, b.vol_coord, {
                    color: c
                }), a.draw();
            }
        }, {
            key: "drawPaper",
            value: function() {
                var a = this.opt, b = this.coord, c = a.data, d = a.type, e = a.fqType, f = a.barType, g = a.colorType, h = a.indexType, i = a.canvas, j = b.chartCoord, k = this.frontLayer;
                o.default.checkColorType(g), "minute" === d ? this.scene = new m.default.Minute(k, c, j, i.isNarrow) : "fdays" === d ? this.scene = new m.default.FDays(k, c, j) : "day" === d || "week" === d || "month" === d ? this.scene = h ? new m.default[h](k, c, j, a) : new m.default.Kline(k, c, j, a) : void 0, 
                k.draw();
            }
        }, {
            key: "hasEvent",
            value: function() {
                return !!this.scene;
            }
        }, {
            key: "getFQTextArea",
            value: function() {
                return this.scene && this.scene.getFQTextArea && this.scene.getFQTextArea();
            }
        }, {
            key: "drawDecration",
            value: function(a) {
                this.scene && this.scene.drawDecoration(this.decorateLayer, a), this.decorateLayer.draw();
            }
        }, {
            key: "clearDecoration",
            value: function() {
                this.decorateLayer.draw();
            }
        }, {
            key: "getTouchedData",
            value: function() {
                return this.scene && this.scene.getTouchedData && this.scene.getTouchedData();
            }
        }, {
            key: "reset",
            value: function() {
                this.scene = null, this.data && this.data.destroy(), this.data = null;
            }
        }, {
            key: "clear",
            value: function() {
                this.backLayer && this.backLayer.draw(), this.frontLayer && this.frontLayer.draw(), 
                this.decorateLayer && this.decorateLayer.draw();
            }
        }, {
            key: "destroy",
            value: function() {
                this.hideLoading(), this.backLayer = null, this.frontLayer = null, this.decorateLayer = null, 
                this.options = null;
            }
        } ]), a;
    }();
    exports.default = p, module.exports = exports["default"];
})();
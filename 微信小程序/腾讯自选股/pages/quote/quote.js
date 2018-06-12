(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b, c) {
        return b in a ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[b] = c, a;
    }
    var c, d, e, f, g, h, i, j = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, k = require("../../utils/ppdog"), l = a(k), m = require("../../utils/regenerator-runtime"), n = a(m), o = require("../../utils/RequestApi"), p = require("../../filter/qtFilter"), q = a(p), r = require("../../filter/qtZsFilter"), s = a(r), t = require("../../filter/qtTmplFilter"), u = a(t), v = require("../../filter/mktStatusFilter"), w = a(v), x = require("../../filter/commentFilter"), y = a(x), z = require("../../libs/sqtRequest"), A = a(z), B = require("../../utils/extend"), C = a(B), D = require("../../utils/widget"), E = a(D);
    Page((c = {
        components: {
            chart: {},
            fivedmx: {},
            newsList: {},
            remindPanel: {},
            failureTip: {}
        },
        data: {
            tmpl: "quotePanel_cn",
            hqbox: !1,
            qtData: {},
            stockAdded: null,
            hasNewComments: !1,
            symbol: "",
            qq: "",
            stopUpdateTitle: !1,
            isIphoneX: !1
        },
        setTitle: function(a, b) {
            if (!this.data.stopUpdateTitle && a) {
                var c = a + "(" + b.substr(2) + ")";
                wx.setNavigationBarTitle({
                    title: c
                });
            }
        },
        onLoad: function(a) {
            var b = this, c = getApp(), d = a.symbol;
            if (g = a.type, i = E.default.getWidgetParam("wxParamData", a), l.default.wx.getSystemInfo().then(function(a) {
                /iphone\sx/i.test(a.model) && b.setData({
                    isIphoneX: !0
                });
            }), "hqlist" == a.source && o.Request.reportData({
                sop: "xcx_stock_detail_from_market",
                stockid: d
            }), i) {
                var j, k, m = i.slot_list;
                m.forEach(function(a) {
                    "stock_code" === a.key && (j = a.value), "stock_market" === a.key && (k = a.value);
                }), k.match(/us/) && (j += k.substring(2), j = j.toUpperCase(), k = "us"), d = k + j, 
                g = "minute";
            }
            var p = this;
            e = d, l.default.wx.getStorage({
                key: "newComment"
            }).then(function(a) {
                var b = a.data;
                b && b[d] ? p.setData({
                    hasNewComments: !0
                }) : r();
            }).catch(function() {
                r();
            });
            var r = function() {
                o.Request.getCommentCon(d, 1, "", "").then(function(a) {
                    return a;
                }).filter(y.default).then(function(a) {
                    var b = a.commentsData, c = b[0] ? b[0].id : "";
                    return "" == c ? void p.setData({
                        hasNewComments: !1
                    }) : void l.default.wx.getStorage({
                        key: "comments_info"
                    }).then(function(a) {
                        var b = a.data, e = b[d] != c;
                        p.setData({
                            hasNewComments: e
                        });
                    }).catch(function() {
                        p.setData({
                            hasNewComments: !0
                        });
                    });
                });
            };
            return l.default.co(n.default.mark(function b() {
                var c;
                return n.default.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return f = a.name ? decodeURIComponent(a.name) : null, p.setTitle(f, e), c = void 0, 
                        b.next = 5, l.default.resolve(e).filter(u.default).then(function(a) {
                            h = a;
                            var b = getApp().settings.colorType;
                            return p.setData({
                                symbol: e,
                                name: f,
                                colorType: b,
                                tmpl: "quotePanel_" + h,
                                qq: getApp().config.qq
                            }), o.Request.getStock(e);
                        }).then(function(b) {
                            var d = {};
                            return d[e] = {}, c = a.stockAdded ? +a.stockAdded : !!b, b ? (d[e] = b.toJS(), 
                            l.default.resolve(d).filter(q.default)) : d;
                        }).then(function(a) {
                            var b = a[e], d = A.default.getEmpty(e), f = {
                                stockAdded: c
                            };
                            p.data && p.data.mktstt || i || (f.qtData = (0, C.default)(!0, d, b)), p.setData(f);
                        });

                      case 5:
                        getApp().Event.on("operateStockNetworkError", p, p.onOperateStockNetworkError);

                      case 6:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
        },
        onReady: function() {
            var a = this.childrens, b = a.chart, c = a.fivedmx, d = a.remindPanel, f = a.newsList;
            b.init(h, e, g), c.init(e, this.data.qtData.fmPostions), this.getAllData(b.data.type, b.data.fqType), 
            d.getRemind(e), f.getRelatedNews(e);
        },
        onHide: function() {
            this.setData({
                stopUpdateTitle: !0
            });
        },
        onUnload: function() {
            if (this.setData({
                stopUpdateTitle: !0
            }), this.data.hasNewComments) {
                var a = {};
                a[this.data.symbol] = !0;
                try {
                    var b = wx.getStorageSync("newComment");
                    b ? wx.setStorage({
                        key: "newComment",
                        data: j({}, b, a)
                    }) : wx.setStorage({
                        key: "newComment",
                        data: a
                    });
                } catch (a) {}
            }
            d && clearInterval(d), getApp().Event.remove("operateStockNetworkError", this, this.onOperateStockNetworkError);
        },
        onShow: function() {
            o.Request.reportData({
                sop: "stock_detail_from_all"
            });
        },
        onOperateStockNetworkError: function() {
            var a = this.childrens.failureTip;
            a.showTip();
        },
        onPullDownRefresh: function() {
            var a = this.childrens.chart, b = a.data, c = b.type, d = b.fqType;
            this.getAllData(c, d, !0), this.childrens.newsList.getRelatedNews(e, f), wx.stopPullDownRefresh();
        }
    }, b(c, "onHide", function() {}), b(c, "onShareAppMessage", function() {
        var a = this.data.qtData;
        return {
            title: a.Name + "(" + a.Code + ")",
            path: "/pages/quote/quote?symbol=" + a.Symbol + "&name=" + a.Name + "&type=" + this.childrens.chart.data.type + "&price=" + a.Price,
            cacheKey: a.Symbol + "_" + this.childrens.chart.data.type
        };
    }), b(c, "getAllData", function(a, b) {
        var c = this, f = 2 < arguments.length && arguments[2] !== void 0 && arguments[2], g = getApp(), h = g.Event, i = g.userAction, k = this.childrens, m = k.chart, n = k.fivedmx, p = e;
        p.match(/usDJI|usINX$|usIXIC/) && (p = "us." + p.substr(2)), l.default.resolve(f).then(function(a) {
            return a ? (m.drawLoading(), null) : m.checkValidStorage(p);
        }).then(function(c) {
            return c || m.drawLoading(), o.Request.getQuote(p, a, b, c && c.from_date);
        }).then(function(c) {
            var d = c[p], f = A.default.qtFmt(p, d.qt[p]), g = d.qt.zhishu, i = d.qt.market[0], j = "北京";
            return "us" === f[p].Market && (j = d.pandata.season), h.emit([ "setChartData", e, a, b ].join("."), c), 
            {
                symbol: p,
                mktstt: i,
                qt: f,
                season: j,
                zsData: g
            };
        }).filter(q.default).filter(s.default).filter(w.default).then(function(a) {
            var b = {};
            j(b, a.qt[p], a.zsData);
            var e = a.qt[p].TimeStamp;
            a.mktstt && 3 < a.mktstt[1].length && (e = e.split(" ")[0]);
            var g = {
                mktstatus: a.mktstt && a.mktstt[1],
                season: a.season,
                TimeStamp: e
            };
            c.setData({
                qtData: a.qt[p],
                zsData: a.zsData || {},
                mktstt: g,
                name: b.Name
            }), a.mktstt && "close" !== a.mktstt[0] && (d && clearInterval(d), d = setInterval(c.getQtData, 5e3));
            c.setTitle(b.Name, b.Symbol), n.switchFdMx(b.fmPostions, f);
        }).catch(function(a) {
            console.log(a);
        });
    }), b(c, "getQtData", function() {
        var a = this, b = getApp(), c = b.Event, d = e;
        /hk/i.test(d) && (d = "r_" + d), A.default.get(d).then(function(a) {
            var b = j({}, a[d]);
            return c.emit("qtRawDataUpdate", b), a;
        }).filter(q.default).then(function(b) {
            var e = b[d], g = {
                qtData: e
            };
            f || (f = e.Name, a.setTitle(f, d), g.name = f), a.childrens.fivedmx.updateFd(e.fmPostions), 
            a.setData(g), c.emit("qtDataUpdate", e);
        });
    }), b(c, "bindQuotePanelHide", function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "ease"
        }), b = wx.createAnimation({
            duration: 200,
            timingFunction: "ease"
        });
        a.rotate(0), b.height(0), a.step(), b.step(), this.childrens.chart.showChart(), 
        this.setData({
            hqbox: !1,
            toggleAnimate: a.export(),
            heightAnimate: b.export()
        });
    }), b(c, "bindQuotePanelToggle", function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "ease"
        }), b = wx.createAnimation({
            duration: 200,
            timingFunction: "ease"
        }), c = 0, d = !1 === this.data.hqbox;
        c = /zs/.test(this.data.tmpl) ? "36rpx" : "hk" == this.data.qtData.Market ? "70rpx" : "us" == this.data.qtData.Market ? "70rpx" : "150rpx", 
        !0 == d ? (a.rotate(180), b.height(c), a.step(), b.step(), this.childrens.chart.hideChart()) : (a.rotate(0), 
        b.height(0), a.step(), b.step(), this.childrens.chart.showChart()), a.step(), b.step(), 
        this.setData({
            hqbox: d,
            toggleAnimate: a.export(),
            heightAnimate: b.export()
        });
    }), b(c, "bindToolsAreaTab", function(a) {
        var b = a.target.dataset.type;
        this.setData({
            "layout.tabbarType": b
        }), "capital" == b && (this.drawPie(), this.drawLines());
    }), b(c, "addStockSuccessFn", function(a) {
        if (a) {
            var b, c = getApp(), d = c.Event, e = this.data.stockAdded;
            e ? (e = !1, b = "delStockResult", this.childrens.remindPanel.removeRemind()) : (l.default.wx.showToast({
                title: "添加成功",
                icon: "success",
                duration: 1e3
            }), e = !0, b = "addStockResult"), this.setData({
                stockAdded: e
            }), d.remove(b, this, this.addStockSuccessFn);
        }
    }), b(c, "actionAddStock", function() {
        var a = this, b = this.data, c = b.name, d = b.stockAdded, f = getApp(), g = f.Event;
        if (d) l.default.wx.showModal({
            title: "",
            content: "确认删除" + c + "?",
            confirmColor: "#3083e3"
        }).then(function(b) {
            if (b.confirm && "false" != b.confirm) {
                g.on("delStockResult", a, a.addStockSuccessFn), g.emit("delStockBySymbol", e);
            }
        }); else {
            g.on("addStockResult", this, this.addStockSuccessFn), g.emit("addStockBySymbol", e);
        }
    }), b(c, "actionAddRemind", function() {
        var a = this.data, b = "symbol=" + e;
        b += "&name=" + a.name, b += "&price=" + a.qtData.Price;
        var c = a.qtData.ChgRatio, d = c.toString().length;
        1 < d && "%" == c[d - 1] && (c = c.substr(0, d - 1)), b += "&chgRatio=" + c;
        var f = this.childrens.remindPanel.data.remindData;
        if (f && f.price) {
            var g = f.price, h = f.exceeded;
            b += "&high=" + g.high, b += "&low=" + g.low, b += "&updown=" + g.updown, b += "&exceeded=" + h;
        }
        var i = "../remind/remind?" + b;
        wx.navigateTo({
            url: i
        });
    }), b(c, "actionComment", function() {
        var a = this.data, b = a.symbol, c = a.name, d = a.qtData;
        o.Request.reportData({
            sop: "xcx_post_click",
            stockid: b
        }), this.setData({
            hasNewComments: !1,
            stopUpdateTitle: !0
        });
        try {
            var e = wx.getStorageSync("newComment");
            e && e[b] && (delete e[b], wx.setStorage({
                key: "newComment",
                data: e
            }));
        } catch (a) {}
        var f = "../comment/comment?symbol=" + b + "&name=" + c + "&price=" + d.Price + "&zdf=" + encodeURIComponent(d.ChgRatio);
        wx.navigateTo({
            url: f
        });
    }), c));
})();
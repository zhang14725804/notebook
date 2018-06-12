(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = require("../../utils/extend"), i = a(h), j = require("../../filter/zsFilter"), k = a(j), l = require("../../filter/stockListSortFilter"), m = a(l), n = require("../../libs/immutable"), o = a(n), p = {
        all: "全部股票",
        "cn-gp": "沪深",
        "hk-gp": "港股",
        "us-gp": "美股"
    }, q = [ "涨跌幅", "涨跌额", "总市值" ], r = null, s = !1, t = !1;
    Page({
        components: {
            failureTip: {}
        },
        data: {
            headMarkTitle: p.all,
            areaTitle: q[0],
            listData: [],
            listDataEmpty: !0,
            settings: {
                colorType: "hzld"
            },
            sortData: {
                type: "",
                updown: "",
                areaSort: "zdf",
                mkSort: "all",
                priceUpdown: "",
                dropUpdown: ""
            },
            mkNum: {},
            limitTip: {
                limitNum: 0,
                show: !1
            },
            bad_version_tip: !1,
            longTapSymbol: "",
            showYantip: !1,
            symbol: "",
            qq: "",
            stopUpdateTitle: !1
        },
        onPullDownRefresh: function() {
            b && (clearTimeout(b), b = null), this.getData(), wx.stopPullDownRefresh();
        },
        onShareAppMessage: function() {
            return {
                title: "自选股",
                desc: "移动智能炒股，首选腾讯自选股",
                imgUrl: "https://mat1.gtimg.com/finance/images/stock/p/financeplus/df1e7ffdff05ed8b.png",
                path: "/pages/index/index"
            };
        },
        onLoad: function() {
            var a = this, b = getApp();
            console.log("onLoad"), this.setData({
                qq: b.config.qq
            }), b.Event.on("delStockResult", this, this.delstockOK), b.Event.on("operateStockNetworkError", this, function() {
                a.childrens.failureTip.showTip();
            });
        },
        onShow: function() {
            var a = this, b = getApp();
            s = !1, this.setData({
                "settings.colorType": getApp().settings.colorType,
                stopUpdateTitle: !1
            }), this.getStorage().complete(function(c) {
                if (c.errMsg) console.error(c.errMsg); else if (o.default.isImmutable(c)) {
                    var d = c.toJS();
                    r = o.default.fromJS({
                        listData: d
                    });
                }
                a.getData().then(function() {
                    b.Event.emit("tapTab", "index");
                });
            });
        },
        syncData: function() {
            g.Request.syncListData();
            o.default.isImmutable(r) && r.get("zsData") && wx.setStorage({
                key: "zsDataStorage",
                data: r.get("zsData").toJS()
            });
        },
        onHide: function() {
            console.log("index onhide"), b && (clearTimeout(b), b = null), this.syncData(), 
            this.stopAnimation(), this.setData({
                stopUpdateTitle: !0
            });
        },
        onUnload: function() {
            this.onHide();
        },
        stopAnimation: function() {
            var a = this.data.listData;
            if (!a || 0 == a.length) return void console.log("stop animation data error", a);
            var b = wx.createAnimation({
                duration: 1,
                timingFunction: "linear"
            });
            a.map(function(a) {
                b.opacity(1), b.step(), a.animationData = b.export();
            }), this.setData({
                listData: a
            });
        },
        getStorage: function() {
            var a = this;
            return d.default.co(f.default.mark(function b() {
                var c, e;
                return f.default.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return b.next = 2, g.Request.getCacheListDataByGid();

                      case 2:
                        if (c = b.sent.get("listData"), b.t0 = r && r.get("zsData"), b.t0) {
                            b.next = 8;
                            break;
                        }
                        return b.next = 7, d.default.wx.getStorage({
                            key: "zsDataStorage"
                        });

                      case 7:
                        b.t0 = b.sent.data;

                      case 8:
                        return e = b.t0, o.default.isImmutable(e) || (e = o.default.fromJS(e)), b.abrupt("return", d.default.resolve(e).filter(k.default).then(function(b) {
                            return a.setData({
                                zsData: b.toJS()
                            }), a.sortData(c);
                        }));

                      case 11:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
        },
        getData: function() {
            var a = this;
            return d.default.co(f.default.mark(function c() {
                var e;
                return f.default.wrap(function(c) {
                    for (;;) switch (c.prev = c.next) {
                      case 0:
                        return c.next = 2, g.Request.getList();

                      case 2:
                        return c.next = 4, g.Request.getListQtData();

                      case 4:
                        return e = c.sent, a.data.stopUpdateTitle || wx.setNavigationBarTitle({
                            title: e.get("name")
                        }), c.next = 8, d.default.resolve(e.get("zsData")).filter(k.default).then(function(b) {
                            a.setData({
                                zsData: b.toJS(),
                                hkys: e.get("hkys")
                            });
                        });

                      case 8:
                        a.sortData(e.get("listData")).then(function() {
                            r = e;
                        }), b && (clearTimeout(b), b = null), b = setInterval(function() {
                            a.getQtData();
                        }, 5e3), a.syncData();

                      case 12:
                      case "end":
                        return c.stop();
                    }
                }, c, this);
            })).catch(function(a) {
                console.log("getData:", a);
            });
        },
        sortData: function(a) {
            var b = this, c = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], e = this.data, f = e.sortData, g = e.showYantip, h = e.hkys;
            return d.default.resolve({
                listData: a,
                sortData: f
            }).filter(m.default).then(function(a) {
                var c = a.listData, d = a.mkNum, e = a.limitTip, i = c.count(function(a) {
                    return !0 === a.get("isShow");
                });
                return g = !/cn|us/i.test(f.mkSort) && h > 20, b.setData({
                    listData: c.toJS(),
                    listDataEmpty: !(0 < i),
                    showYantip: g,
                    limitTip: e,
                    mkNum: d
                }), c;
            });
        },
        animation: function(a) {
            if (!o.default.isImmutable(a)) return a;
            var b = a.map(function(a) {
                var b = r && r.get("listData") && r.get("listData").find(function(b) {
                    return b.get("Symbol") === a.get("Symbol");
                });
                if (b && a.get("Price") != b.get("Price")) {
                    var c = wx.createAnimation({
                        duration: 300,
                        timingFunction: "ease"
                    });
                    return c.opacity(.2), c.step(), c.opacity(1), c.step(), a.set("animationData", c.export());
                }
                var d = wx.createAnimation({
                    duration: 1,
                    timingFunction: "linear"
                });
                return d.opacity(1), d.step(), a.set("animationData", d.export());
            });
            return this.setData({
                listData: b
            }), b;
        },
        getQtData: function() {
            var a = this;
            return g.Request.getListQtData().then(function(b) {
                d.default.resolve(b.get("zsData")).filter(k.default).then(function(b) {
                    a.setData({
                        zsData: b.toJS()
                    });
                });
                var c = b.get("listData");
                a.sortData(c).then(function() {
                    r = r.set("listData", c);
                });
            }).catch(function(a) {
                console.log("getQtData", a);
            });
        },
        bindLongTap: function(a) {
            var b = a.currentTarget.dataset.symbol;
            t = !0, this.setData({
                longTapSymbol: b
            });
        },
        bindStockDel: function(a) {
            var b = a.currentTarget.dataset, c = b.name, e = b.symbol;
            d.default.wx.showModal({
                content: "确认删除" + c + "？",
                confirmColor: "#3083e3"
            }).then(function(a) {
                a.confirm && getApp().Event.emit("delStockBySymbol", e);
            }), this.bindTouchMove();
        },
        delstockOK: function(a) {
            var b = a.listData;
            r && (r = r.set("listData", b)), this.sortData(b);
        },
        bindStockTop: function(a) {
            var b = this, c = a.currentTarget.dataset.symbol;
            this.bindTouchMove(), g.Request.operationSeq({
                code: c,
                act: "sp"
            }).then(function(a) {
                b.sortData(a), wx.showToast({
                    title: "已置顶",
                    icon: "success",
                    duration: 1e3
                });
            });
        },
        bindTouchMove: function() {
            this.setData({
                longTapSymbol: ""
            });
        },
        bindGoQuote: function(a) {
            if (!1 == t && !1 == s) {
                var b = a.currentTarget.dataset, c = b.symbol, d = b.name;
                g.Request.reportData({
                    sop: "xcx_stock_detail_from_zixuan",
                    stockid: c
                }), wx.navigateTo({
                    url: "../quote/quote?symbol=" + c + "&name=" + d
                }), this.bindTouchMove(), s = !0;
            }
            t = !1;
        },
        bindStocklistHeadTapMk: function() {
            var a = [], b = this.data, c = b.mkNum, d = b.sortData, e = b.showYantip;
            for (var f in c) 0 < c[f] && a.push(f);
            var g = a.indexOf(d.mkSort);
            if (-1 !== g) {
                ++g, g >= a.length && (g = 0);
                var h = a[g];
                d.mkSort = h, d.updown = d.dropUpdown || d.priceUpdown, this.setData({
                    headMarkTitle: p[h],
                    sortData: d
                }), this.sortData(r.get("listData"));
            }
        },
        bindStocklistHeadPriceTap: function() {
            var a = this.data.sortData, b = "";
            "" == a.priceUpdown ? b = "down" : "down" == a.priceUpdown ? b = "up" : "up" == a.priceUpdown && (b = ""), 
            a.priceUpdown = b, a.dropUpdown = "", a.type = "zxj", a.updown = b, this.setData({
                sortData: a
            }), this.sortData(r.get("listData"));
        },
        bindStocklistHeadDropTap: function() {
            var a = this.data.sortData, b = "";
            "" == a.dropUpdown ? b = "down" : "down" == a.dropUpdown ? b = "up" : "up" == a.dropUpdown && (b = ""), 
            a.type = a.areaSort, a.updown = b, a.priceUpdown = "", a.dropUpdown = b, this.setData({
                sortData: a
            }), this.sortData(r.get("listData"));
        },
        catchTap: function() {
            var a = this.data.sortData, b = [ "zdf", "zde", "sz" ], c = b.indexOf(a.areaSort);
            ++c, c >= b.length && (c = 0), a.areaSort = b[c], a.type = a.priceUpdown ? "zxj" : "", 
            a.dropUpdown && (a.type = a.areaSort), this.setData({
                sortData: a,
                areaTitle: q[c]
            }), this.sortData(r.get("listData"));
        },
        bindSmartboxTap: function() {
            wx.navigateTo({
                url: "../smartbox/smartbox"
            });
        },
        bindGlistTap: function() {
            wx.navigateTo({
                url: "../group/list/list"
            });
        }
    });
})();
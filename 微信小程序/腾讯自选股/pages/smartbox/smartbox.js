(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("../../utils/RequestApi"), g = require("../../utils/Tool"), h = a(g), i = require("../../libs/ann-log/index"), j = a(i), k = getApp(), l = k.Event, m = null, n = [], o = [], p = [], q = !1;
    Page({
        components: {
            failureTip: {}
        },
        data: {
            searchData: [],
            autoFocus: !0,
            smartboxval: "",
            clearBtnDisplay: !1,
            historyShow: !1,
            modalHidden: !0,
            symbol: "",
            qq: ""
        },
        onLoad: function() {
            var a = this, b = this;
            return this.setData({
                qq: getApp().config.qq
            }), console.log("[smartbox] > 初始化"), l.on("operateStockNetworkError", this, function() {
                a.showTimeoutTip();
            }), l.on("addStockResult", this, function(b) {
                a.addStockResult(b);
            }), l.on("delStockResult", this, function(b) {
                a.delStockResult(b);
            }), c.default.co(e.default.mark(function a() {
                var d;
                return e.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, f.Request.getCacheListDataByGid();

                      case 2:
                        return d = a.sent.get("listData").toJS(), a.next = 5, c.default.wx.getStorage({
                            key: "searchHistory"
                        }).catch(function() {
                            return c.default.resolve({
                                data: []
                            });
                        });

                      case 5:
                        n = a.sent.data, p = d.map(function(a) {
                            return a.Symbol;
                        }), b.setData({
                            historyShow: n && 0 < n.length,
                            searchData: n.map(function(a) {
                                return a.added = 0 <= p.indexOf(a.market + a.code) ? 1 : 0, a;
                            })
                        });

                      case 8:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            })).catch(function(a) {
                console.log(a);
            });
        },
        onReady: function() {
            console.log("[smartbox] > 页面渲染完成"), f.Request.reportData({
                sop: "search_to_page"
            });
        },
        onShow: function() {
            q = !1;
            var a = {};
            !1 === this.data.historyShow ? (a.searchData = o || [], a.clearBtnDisplay = !0) : (a.historyShow = !0, 
            a.searchData = n || []), a.searchData = 0 === a.searchData.length ? [] : a.searchData.map(function(a) {
                return a.added = 0 <= p.indexOf(a.market + a.code) ? 1 : 0, a;
            }), this.setData(a);
        },
        onHide: function() {
            console.log("[smartbox] > show");
        },
        onUnload: function() {
            o = [], l.remove("addStockResult", this), l.remove("delStockResult", this), l.remove("operateStockNetworkError", this), 
            c.default.wx.setStorage({
                key: "searchHistory",
                data: n
            });
        },
        bindGoQuote: function(a) {
            var b = a.currentTarget.dataset, c = b.symbol, d = b.name, e = this.data.searchData, f = p.indexOf(c), g = 0;
            -1 < f && (g = 1);
            var h = n.map(function(a) {
                return a.market + a.code;
            }), i = h.indexOf(c);
            0 <= i ? n = n.splice(i, 1).concat(n) : e.forEach(function(a) {
                a.market + a.code == c && n.unshift(a);
            });
            var j = "../quote/quote?symbol=" + c + "&name=" + d + "&stockAdded=" + g;
            !1 == q && (q = !0, wx.navigateTo({
                url: j
            }));
        },
        catchAddStock: function(a) {
            var b = a.currentTarget.dataset.symbol, c = {};
            if (-1 == p.indexOf(b)) {
                this.data.searchData.forEach(function(a, d) {
                    a.market + a.code == b && (c["searchData[" + d + "].added"] = 1);
                }), this.setData(c), o = this.data.searchData;
                var d = k.Event;
                d.emit("addStockBySymbol", b);
            }
        },
        bindSmartboxChange: function(a) {
            var b = this, d = a.detail.value || "";
            this.setData({
                smartboxval: d
            }), !d || this.setData({
                clearBtnDisplay: !0
            }), m && (clearTimeout(m), m = null), m = setTimeout(function() {
                if (!!!d) b.setData({
                    searchData: n,
                    clearBtnDisplay: !1,
                    historyShow: n && 0 < n.length
                }); else if (f.Request.getSmartbox(d).then(function(a) {
                    a && a.map(function(a) {
                        return a.added = -1 == p.indexOf(a.market + a.code) ? 0 : 1, a.titleSize = 10 <= h.default.strLen(a.name) ? "--small" : "", 
                        a;
                    }), b.setData({
                        searchData: a,
                        historyShow: !1
                    }), o = a;
                }), ":pushlog" === d || "：pushlog" === d) {
                    var a = function() {
                        console.log("开始上传日志");
                        getApp();
                        f.Request.pushLog(j.default.getLogHistory()).then(function(a) {
                            a && (wx.showToast({
                                title: "日志上传成功",
                                icon: "success",
                                duration: 1e3
                            }), b.bindclearsmartbox());
                        });
                    };
                    c.default.wx.showModal({
                        title: "",
                        content: "确认要上传日志吗",
                        confirmColor: "#3083e3"
                    }).then(function(b) {
                        b.confirm && "false" != b.confirm && (console.log("上传日志"), a());
                    });
                }
            }, 100);
        },
        bindclearsmartbox: function() {
            this.setData({
                smartboxval: "",
                searchData: n.map(function(a) {
                    return a.added = 0 <= p.indexOf(a.market + a.code) ? 1 : 0, a;
                }),
                clearBtnDisplay: !1,
                historyShow: !!(0 < n.length)
            });
        },
        bindclearhistory: function() {
            this.setData({
                modalHidden: !1
            });
        },
        bindModalConfirm: function() {
            n = [], this.setData({
                searchData: [],
                historyShow: !1,
                modalHidden: !0
            }), c.default.wx.setStorage({
                key: "searchHistory",
                data: []
            });
        },
        bindModalCancel: function() {
            this.setData({
                modalHidden: !0
            });
        },
        showTimeoutTip: function() {
            var a = this.childrens.failureTip;
            a.showTip();
        },
        addStockResult: function(a) {
            -1 === p.indexOf(a) && p.push(a);
        },
        delStockResult: function(a) {
            p = a.listData.toJS().map(function(a) {
                return a.Symbol;
            }), n.map(function(a) {
                a.added = 0 <= p.indexOf(a.market + a.code) ? 1 : 0;
            });
        }
    });
})();
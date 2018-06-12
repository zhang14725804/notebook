(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d, e = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, f = require("../../utils/ppdog"), g = a(f), h = require("../../utils/regenerator-runtime"), i = a(h), j = require("../../utils/RequestApi"), k = require("../../filter/hqFilter"), l = a(k), m = !0, n = {
        "ranka/chr0": {
            title: "涨幅榜",
            header: "涨幅",
            type: "ranka/chr",
            order: "0",
            mkt: "Hs",
            keyword: "zdf"
        },
        "ranka/chr1": {
            title: "跌幅榜",
            header: "跌幅",
            type: "ranka/chr",
            order: "1",
            mkt: "Hs",
            keyword: "zdf"
        },
        "ranka/trunr": {
            title: "换手率榜",
            header: "换手率",
            type: "ranka/trunr",
            order: "0",
            mkt: "Hs",
            keyword: "hsl"
        },
        "ranka/dtzf": {
            title: "振幅榜",
            header: "振幅",
            type: "ranka/dtzf",
            order: "0",
            mkt: "Hs",
            keyword: "zf"
        },
        main_all0: {
            title: "主板涨幅榜",
            header: "涨幅",
            type: "main_all",
            order: "0",
            mkt: "Hk",
            keyword: "zdf"
        },
        main_all1: {
            title: "主板跌幅榜",
            header: "跌幅",
            type: "main_all",
            order: "1",
            mkt: "Hk",
            keyword: "zdf"
        },
        main_all_amount: {
            title: "主板成交额榜",
            header: "成交额",
            type: "main_all_amount",
            order: "0",
            mkt: "Hk",
            keyword: "cje"
        },
        gem_all0: {
            title: "创业板涨幅榜",
            header: "涨幅",
            type: "gem_all",
            order: "0",
            mkt: "Hk",
            keyword: "zdf"
        },
        gem_all1: {
            title: "创业板跌幅榜",
            header: "跌幅",
            type: "gem_all",
            order: "1",
            mkt: "Hk",
            keyword: "zdf"
        },
        gem_all_amount: {
            title: "创业板成交额榜",
            header: "成交额",
            type: "gem_all_amount",
            order: "0",
            mkt: "Hk",
            keyword: "cje"
        },
        zgg: {
            title: "中概股",
            header: "涨幅",
            type: "zgg",
            order: "0",
            mkt: "Us",
            keyword: "zdf"
        },
        ustec: {
            title: "美股科技股",
            header: "涨幅",
            type: "ustec",
            order: "0",
            mkt: "Us",
            keyword: "zdf"
        },
        remen_Hs: {
            header: "涨跌幅",
            order: "0",
            keyword: "zdf",
            mkt: "Hs"
        },
        remen_Hk: {
            header: "涨跌幅",
            order: "0",
            keyword: "zdf",
            mkt: "Hk"
        }
    };
    Page({
        components: {
            failureTip: {}
        },
        data: {
            selected: [ "selected", "" ],
            scrollHeight: "641px",
            qq: "",
            temp: 1
        },
        onLoad: function(a) {
            console.info("[hqRanking page] 初始化");
            getApp();
            b = null, c = 0, m = !0;
            var e = n[a.type], f = a.bd_name || e.title;
            e.bd_code = a.bd_code || "", e.bd_name = f || "", wx.setNavigationBarTitle({
                title: f
            }), this.setData(e), console.log("rankingla", e), d = e.order;
        },
        onShow: function() {
            console.log("onShow");
            var a = getApp(), b = a.Event;
            this.startLoadingPage();
            var c = getApp().settings.colorType;
            this.data.colorType != c && this.setData({
                colorType: c
            });
        },
        onHide: function() {
            console.log("onHide");
            var a = getApp(), c = a.Event;
            b && clearInterval(b);
        },
        onUnload: function() {
            var a = getApp(), c = a.Event;
            b && clearInterval(b);
        },
        onPullDownRefresh: function() {
            this.startLoadingPage(), wx.stopPullDownRefresh();
        },
        getHeader: function(a) {
            var b = this.data, c = b.header, d = b.keyword;
            if ("涨跌幅" != c) {
                var e = {
                    hsl: "换手率",
                    cje: "成交额",
                    zf: "振幅"
                };
                c = e[d] ? e[d] : "0" == a ? "涨幅" : "跌幅";
            }
            return c;
        },
        onHqRankingUpdate: function(a) {
            var b = a.list, c = a.order, f = this.data.header, g = {
                list: b,
                nodata: !1
            };
            m = !1, this.data.loadingFlag && (f = this.getHeader(c), d = c, g = e(g, {
                order: c,
                header: f,
                loadingFlag: !1
            })), this.setData(g);
        },
        onHqRankingUpdateFail: function() {
            b && clearTimeout(b), m ? this.setData({
                nodata: !0,
                loadingFlag: !1
            }) : (this.showTimeoutTip(), this.setData({
                loadingFlag: !1
            }));
        },
        startLoadingPage: function() {
            var a = this, c = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : d, e = getApp(), f = e.Event, g = this.data, h = g.mkt, i = g.temp, k = g.type, m = g.keyword, n = g.bd_code;
            b && clearTimeout(b);
            (function d() {
                j.Request.getHqRanking({
                    mkt: h,
                    type: k,
                    bd_code: n,
                    order: c
                }).then(function(a) {
                    return {
                        data: a.res,
                        fnName: "hqRanking",
                        keyword: m,
                        temp: i
                    };
                }).filter(l.default).then(function(e) {
                    a.onHqRankingUpdate({
                        list: e.list,
                        order: c
                    }), b && clearTimeout(b), b = setTimeout(d, 5e3);
                }).catch(function(c) {
                    console.log(c), b && clearTimeout(b), a.onHqRankingUpdateFail();
                });
            })();
        },
        showTimeoutTip: function() {
            var a = this.childrens.failureTip;
            a.showTip();
        },
        bindSort: function() {
            var a = this.data, b = a.header, c = a.keyword, e = "0" == d ? "1" : "0";
            this.setData({
                loadingFlag: !0
            }), this.startLoadingPage(e);
        }
    });
})();
(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d, e = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, f = require("../../utils/ppdog"), g = a(f), h = require("../../utils/regenerator-runtime"), i = a(h), j = require("../../utils/RequestApi"), k = require("../../filter/hqFilter"), l = a(k), m = null, n = "0", o = !0, p = !1, q = !1, r = "641px", s = {
        averatio: {
            title: "热门板块",
            header: "概念名称",
            type: "averatio",
            order: "0",
            mkt: "Hs",
            keyword: "zdf",
            temp: 3
        },
        hk_industry_list: {
            title: "热门行业",
            header: "行业名称",
            type: "hk_industry_list",
            order: "0",
            mkt: "Hk",
            keyword: "zdf",
            temp: 2
        }
    };
    Page({
        components: {
            failureTip: {}
        },
        data: {
            selected: [ "selected", "" ],
            scrollHeight: "641px",
            order1: "0",
            order2: "0"
        },
        onLoad: function(a) {
            console.info("[hqRemen page] 初始化");
            getApp();
            n = "0", c = "0", d = "0", b = "0", o = !0, p = !1, q = !1;
            var f = getApp().SystemInfo, g = f.windowHeight, h = f.pixelRatio, i = s[a.type];
            wx.setNavigationBarTitle({
                title: i.title
            }), r = g + "px";
            var j = e({
                scrollHeight: r,
                remenStyle: "height: " + g + "px"
            }, i);
            this.setData(j);
        },
        onShow: function() {
            console.log("onShow");
            var a = getApp(), b = a.Event;
            this.startLoadingPage(!1, 3 == this.data.temp);
            var c = getApp().settings.colorType;
            this.data.colorType != c && this.setData({
                colorType: c
            });
        },
        onHide: function() {
            console.log("onHide");
            var a = getApp(), b = a.Event;
            m && clearInterval(m);
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
            m && clearInterval(m);
        },
        onPullDownRefresh: function() {
            this.startLoadingPage(!1, 3 == this.data.temp), wx.stopPullDownRefresh();
        },
        updateData: function(a) {
            var e = this, f = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : "", g = this.data, h = g.mkt, i = g.temp, k = g.type;
            3 == i && ("hy" == f ? k = "01/" + k : "gn" == f && (k = "02/" + k)), j.Request.getHqRanking({
                mkt: h,
                type: k,
                order: a
            }).then(function(a) {
                return {
                    data: a.res,
                    fnName: "hqRemen",
                    kw: f,
                    mkt: h
                };
            }).filter(l.default).then(function(g) {
                var h = g.rsData, i = {
                    nodata: !1,
                    loadingFlag: !1,
                    scrollHeight: r
                };
                i[f + "list"] = h.list, "hy" == f ? (i.order1 = a, c = a, q = !0) : "gn" == f ? (i.order2 = a, 
                d = a, p = !0) : (i.order = a, b = a, o = !1), e.setData(i);
            }).catch(function() {
                e.onHqRankingUpdateFail();
            });
        },
        startLoadingPage: function() {
            var a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], f = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            if (m && clearTimeout(m), f) 0 == n ? (this.updateData(c, "hy"), m = setTimeout(this.updateData.bind(this, c, "hy"), 5e3)) : (this.updateData(d, "gn"), 
            m = setTimeout(this.updateData.bind(this, d, "gn"), 5e3)); else if (e) this.updateData(c, "hy"), 
            this.updateData(d, "gn"), m = 0 == n ? setTimeout(this.updateData.bind(this, c, "hy"), 5e3) : setTimeout(this.updateData.bind(this, d, "gn"), 5e3); else if (3 != this.data.temp) {
                var g = a ? "0" == b ? "1" : "0" : b;
                this.updateData(g, ""), m = setTimeout(this.updateData.bind(this, g, ""), 5e3);
            } else if (0 == n) {
                var h = a ? "0" == c ? "1" : "0" : c;
                this.updateData(h, "hy"), m = setTimeout(this.updateData.bind(this, h, "hy"), 5e3);
            } else {
                var i = a ? "0" == d ? "1" : "0" : d;
                this.updateData(i, "gn"), m = setTimeout(this.updateData.bind(this, i, "gn"), 5e3);
            }
        },
        bindSort: function() {
            this.setData({
                loadingFlag: !0
            }), this.startLoadingPage(!0);
        },
        onHqRankingUpdateFail: function() {
            console.log("onHqRankingUpdateFail", o), m && clearTimeout(m), o ? this.setData({
                nodata: !0,
                loadingFlag: !1,
                scrollHeight: "100rpx"
            }) : (this.showTimeoutTip(), this.setData({
                loadingFlag: !1
            }));
        },
        bindSwipeChangeTab: function(a) {
            n = +a.detail.current;
            var b = this.data, c = b.selected, d = b.scrollHeight;
            c.forEach(function(a, b, c) {
                c[b] = b == n ? "selected" : "";
            });
            var e = [ q, p ];
            o = !e[n], this.setData({
                selected: c,
                nodata: o,
                curTab: n,
                scrollHeight: o ? "100rpx" : r
            }), this.startLoadingPage(!1, !1, !0);
        },
        bindChangeTab: function(a) {
            var b = this.data.selected;
            n = +a.target.dataset.tab, b.forEach(function(a, b, c) {
                c[b] = b == n ? "selected" : "";
            }), this.setData({
                curTab: n,
                selected: b
            });
        },
        showTimeoutTip: function() {
            var a = this.childrens.failureTip;
            a.showTip();
        }
    });
})();
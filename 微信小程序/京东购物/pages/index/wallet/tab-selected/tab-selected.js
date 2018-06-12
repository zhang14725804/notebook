function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t() {
    var e = [ {
        name: {
            en: "BRAND",
            ch: "优选大牌"
        },
        id: 1605,
        tabId: "BRAND",
        tabRd: "137889.21.1"
    }, {
        name: {
            en: "HOT",
            ch: "优选热销"
        },
        id: 1579,
        tabId: "HOT",
        tabRd: "137889.23.1"
    }, {
        name: {
            en: "GOOD",
            ch: "优选好货"
        },
        id: 1606,
        tabId: "QUALITY",
        tabRd: "137889.22.1"
    } ], t = Math.floor(3 * Math.random());
    return e.forEach(function(e) {
        Object.assign(e, {
            list: [],
            curPage: 0,
            loading: !1,
            hasMore: !0
        });
    }), {
        entries: e,
        curIdx: t,
        tabModifier: "",
        shopInfo: {},
        reviewRate: {},
        feedList: {},
        coupons: {},
        errorMsg: ""
    };
}

var a = require("../../components_618/constant"), i = require("../../../../bases/component.js"), r = require("../common-behavior.js"), s = require("../../model.js"), o = require("../../utils.js"), n = new (require("../../../../common/logger.js"))("HMMMMMMMMM 京东优选 - 优选Tab 列表"), c = [ 10, 20, 50 ];

new i({
    behaviors: [ r ],
    properties: {
        config: Array,
        scrollTop: {
            type: Number,
            observer: function(e, t) {
                this.onScroll(e, t);
            }
        },
        reachBottom: {
            type: Number,
            observer: function() {
                this.loadData();
            }
        }
    },
    data: {},
    ready: function() {
        var e = getApp().systemInfo;
        e && "ios" == e.platform && this.setData({
            tabModifier: "sticky"
        });
    },
    methods: {
        refresh: function() {
            this.setData(t()), this.uniqueSkuList = [], this.loadData();
        },
        loadData: function() {
            var t = this, a = this.data, i = a.entries, r = a.curIdx;
            if (i) {
                var d = i[r];
                if (!(d.loading || !d.hasMore || d.curPage >= c.length)) {
                    var u = 0 == d.curPage;
                    if (this.setData({
                        errorMsg: ""
                    }), u) {
                        i.forEach(function(e) {
                            e.loading = !0;
                        });
                        var g = i.map(function(e) {
                            return e.id;
                        }).join(";"), h = [ c[0], c[0], c[0] ].join(";");
                        n.log("Send request", r, g, "0;0;0", h), s.getSmartData({
                            id: g,
                            offset: "0;0;0",
                            count: h
                        }).then(function(e) {
                            var a = [], r = [], s = [];
                            i.forEach(function(i, o) {
                                var n = t.processSmartData(e[i.id] || [], i.id);
                                switch (i.tabId) {
                                  case "BRAND":
                                    a = a.concat(n.skuIds), s = s.concat(n.venderIds);
                                    break;

                                  case "QUALITY":
                                    r = r.concat(n.skuIds);
                                    break;

                                  case "HOT":
                                    a = a.concat(n.skuIds);
                                }
                                Object.assign(i, {
                                    list: n.list,
                                    curPage: i.curPage + 1,
                                    loading: !1,
                                    hasMore: e[i.id].length >= c[i.curPage] && i.curPage + 1 < c.length,
                                    offset: c[0]
                                });
                            }), t.getShopInfo(s), t.getReviewRate(r), t.getFeedList(r), t.getActiveCoupon(a), 
                            t.setData({
                                entries: i
                            }, function() {
                                t.calcTabRectTop();
                            }), n.log("setData", i), setTimeout(function() {
                                t.triggerEvent("idleTimeArrived");
                            }, 1e3);
                        }).catch(function(e) {
                            var a = e.code, i = e.message;
                            t.setData({
                                "entries[0].loading": !1,
                                "entries[1].loading": !1,
                                "entries[2].loading": !1,
                                errorMsg: o.genErrMsg(i, a)
                            });
                        });
                    } else {
                        d.loading = !0;
                        var f = d.id, l = d.offset, p = c[d.curPage];
                        n.log("Send request", r, f, l, p), s.getSmartData({
                            id: f,
                            offset: l,
                            count: p
                        }).then(function(a) {
                            var i = d, s = t.processSmartData(a[i.id] || [], i.id);
                            switch (i.tabId) {
                              case "BRAND":
                                t.getShopInfo(s.venderIds), t.getActiveCoupon(s.skuIds);
                                break;

                              case "QUALITY":
                                t.getReviewRate(s.skuIds), t.getFeedList(s.skuIds);
                                break;

                              case "HOT":
                                t.getActiveCoupon(s.skuIds);
                            }
                            Object.assign(i, {
                                list: i.list.concat(s.list),
                                curPage: i.curPage + 1,
                                loading: !1,
                                hasMore: a[i.id].length >= c[i.curPage] && i.curPage + 1 < c.length,
                                offset: l + p
                            }), t.setData(e({}, "entries[" + r + "]", i)), n.log("setData", i);
                        }).catch(function(a) {
                            var i, s = a.code, n = a.message;
                            t.setData((i = {}, e(i, "entries[" + r + "].loading", !1), e(i, "errorMsg", o.genErrMsg(n, s)), 
                            i));
                        });
                    }
                }
            }
        },
        processSmartData: function(e, t) {
            var i = this, r = [], s = [], n = [];
            return e.forEach(function(e) {
                var c = t + "_" + e.skuid;
                if (-1 == i.uniqueSkuList.findIndex(function(e) {
                    return e == c;
                })) {
                    i.uniqueSkuList.push(c);
                    var d = void 0, u = void 0, g = void 0, h = void 0;
                    try {
                        (d = JSON.parse(e.promotiondesc))[2] && o.checkTime(d[2].btime, d[2].etime) && (u = d[2].desc), 
                        d[3] && (g = d[3].thirdCategoryName, h = d[3].orderRank);
                    } catch (e) {
                        console.log(e);
                    }
                    var f = void 0;
                    e.refprice - e.price > 0 && (f = ((100 * e.refprice - 100 * e.price) / 100).toFixed(2).replace(/(\.00$)|(0$)/, ""));
                    var l = {
                        uid: c,
                        sku: e.skuid,
                        ziying: 1 == e.itemtype,
                        name: e.fullname,
                        price: e.price,
                        image: i.utils.getImg(e.imgbase, 186),
                        itemUrl: e.url,
                        day: e.dayOflowestprice,
                        catId: e.classid3,
                        catName: g,
                        rank: h,
                        priceOff: f,
                        promotion: u,
                        shopId: e.shopid,
                        venderId: e.venderid,
                        pps: e.pps
                    };
                    o.checkTime(a.SALE_BEGIN, a.SALE_END) && (16384 & e.property) > 0 && (l.has618Logo = !0), 
                    r.push(l), s.push(e.skuid), ~~e.venderid && n.push(e.venderid);
                }
            }), {
                list: r,
                skuIds: s,
                venderIds: n
            };
        },
        switchTab: function(e) {
            var t = e.currentTarget.dataset, a = t.index, i = t.rd;
            this.setData({
                curIdx: a
            }), this.tabRectTop && this.data.scrollTop > this.tabRectTop && wx.pageScrollTo({
                scrollTop: this.tabRectTop
            });
            var r = this.data;
            0 == r.entries[r.curIdx].list.length && this.loadData(), i && o.report(i);
        },
        gotoH5: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        gotoItem: function(e) {
            var t = e.currentTarget.dataset, a = t.index, i = t.rd, r = this.data, s = r.entries[r.curIdx].list[a];
            this.$goto("/pages/item/detail/detail", {
                sku: s.sku,
                name: s.name,
                price: s.price,
                cover: s.image,
                pps: s.pps || "",
                ptag: i
            });
        },
        onScroll: function(e, t) {
            var a = this.data, i = a.scrollTop, r = a.tabModifier;
            if ("sticky" != r) return !this.tabRectTop && r ? this.setData({
                tabModifier: ""
            }) : void (r && i <= this.tabRectTop ? this.setData({
                tabModifier: ""
            }) : !r && i > this.tabRectTop && this.setData({
                tabModifier: "fixed"
            }));
        },
        calcTabRectTop: function() {
            var e = this, t = wx.createSelectorQuery();
            t && (t.selectViewport().scrollOffset(), t.in(this).select("#tab").boundingClientRect(), 
            t.exec(function(t) {
                t && t[0] && t[1] && (e.tabRectTop = t[0].scrollTop + t[1].top, n.log("calcTabRectTop", e.tabRectTop));
            }));
        },
        getShopInfo: function(e) {
            var t = this;
            e.length && s.getShopInfo(e).then(function(e) {
                var a = t.data.shopInfo;
                Object.assign(a, e), t.setData({
                    shopInfo: a
                });
            });
        },
        getReviewRate: function(e) {
            var t = this;
            s.getReviewRate(e).then(function(e) {
                var a = t.data.reviewRate;
                Object.assign(a, e), t.setData({
                    reviewRate: a
                });
            });
        },
        getActiveCoupon: function(e) {
            var t = this;
            s.getActiveCoupon(e).then(function(e) {
                var a = t.data.coupons;
                Object.assign(a, e), t.setData({
                    coupons: a
                });
            });
        },
        getFeedList: function(e) {
            var t = this;
            s.getFeedList(e).then(function(e) {
                var a = t.data.feedList;
                Object.assign(a, e), t.setData({
                    feedList: a
                });
            });
        }
    }
});
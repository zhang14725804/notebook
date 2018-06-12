var e = require("../../../../utils/keplerReport.js").init(), t = getApp();

Component({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(e, a) {
                e >= t.globalData.systemInfo.windowHeight && this.data.showTab ? this.setData({
                    showTab: !1
                }) : e < t.globalData.systemInfo.windowHeight && !this.data.showTab && this.setData({
                    showTab: !0
                });
            }
        },
        shopTabs: {
            type: Array,
            value: [],
            observer: function(e, t) {
                if (e && e.length) {
                    var a = e[0];
                    this.setData({
                        key: a.key
                    });
                    var r = {
                        key: a.key,
                        searchSort: this.data.searchSort
                    };
                    this.triggerEvent("tabevent", r);
                }
            }
        },
        promList: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && e.length && this.setData({
                    promoId: e[0].promoId,
                    promoInfo: e[0]
                });
            }
        },
        tabKey: {
            type: String,
            value: "",
            observer: function(e, t) {
                if (console.log("exchangeTab"), "1001" != e) {
                    this.setData({
                        key: e
                    });
                    this.data.key, this.data.searchSort, this.data.promoInfo;
                }
            }
        },
        exType: {
            type: String,
            value: "",
            observer: function(e, t) {
                if (e) {
                    this.setData({
                        key: e
                    });
                    var a = {
                        key: this.data.key,
                        searchSort: this.data.searchSort,
                        promoInfo: this.data.promoInfo
                    };
                    this.triggerEvent("tabevent", a);
                }
            }
        }
    },
    data: {
        showTab: !0,
        promoId: "",
        promoInfo: {},
        key: "1001",
        subKey: "2001",
        searchSort: 0,
        priceIcon: "http://njst.360buyimg.com/jdreact/program/shop_price_arrow_normal.png",
        tab: [ {
            name: "店铺精选",
            key: "1001"
        }, {
            name: "全部商品",
            key: "1002"
        }, {
            name: "热销",
            key: "1003"
        }, {
            name: "促销",
            key: "1004"
        }, {
            name: "上新",
            key: "1005"
        }, {
            name: "店铺动态",
            key: "1006"
        } ]
    },
    methods: {
        click: function(t) {
            var a = t.currentTarget.dataset.key, r = t.currentTarget.dataset.name;
            if (a !== this.data.key) {
                e.set({
                    pageId: "KeplerMiniAppShopHome",
                    shopid: "9999"
                }), e.click({
                    eid: "KMiniAppShop_TopTab",
                    elevel: "",
                    eparam: r,
                    pname: "/pages/shop/shop",
                    pparam: "",
                    target: "",
                    event: t
                }), this.setData({
                    key: a
                });
                var o = {
                    key: this.data.key,
                    searchSort: this.data.searchSort,
                    promoInfo: this.data.promoInfo
                };
                this.triggerEvent("tabevent", o);
            }
        },
        promClick: function(t) {
            var a = t.currentTarget.dataset.item;
            if (a.promoId !== this.data.promoId) {
                e.set({
                    pageId: "KeplerMiniAppShopHome",
                    shopid: "9999"
                }), e.click({
                    eid: "KMiniAppShop_PromotionTab",
                    elevel: "",
                    eparam: a.name,
                    pname: "/pages/shop/shop",
                    pparam: "",
                    target: "",
                    event: "promClick"
                }), this.setData({
                    promoId: a.promoId,
                    promoInfo: a
                });
                var r = {
                    key: this.data.key,
                    promo: a
                };
                this.triggerEvent("tabevent", r);
            }
        },
        subClick: function(t) {
            var a = t.currentTarget.dataset.key, r = t.currentTarget.dataset.name;
            e.set({
                pageId: "KeplerMiniAppShopHome",
                shopid: "9999"
            }), e.click({
                eid: "KMiniAppShop_AllGoodsTab",
                elevel: "",
                eparam: r,
                pname: "/pages/shop/shop",
                pparam: "",
                target: "",
                event: "subClick"
            });
            var o = "";
            if ("2004" === a) {
                this.data.priceIcon.indexOf("shop_price_arrow_normal") > -1 ? (this.setData({
                    subKey: a,
                    priceIcon: "http://njst.360buyimg.com/jdreact/program/shop_price_arrow_up.png"
                }), o = "3") : this.data.priceIcon.indexOf("shop_price_arrow_up") > -1 ? (this.setData({
                    subKey: a,
                    priceIcon: "http://njst.360buyimg.com/jdreact/program/shop_price_arrow_down.png"
                }), o = "2") : this.data.priceIcon.indexOf("shop_price_arrow_down") > -1 && (this.setData({
                    subKey: a,
                    priceIcon: "http://njst.360buyimg.com/jdreact/program/shop_price_arrow_up.png"
                }), o = "3");
                s = {
                    key: this.data.key,
                    searchSort: o
                };
                return this.setData({
                    searchSort: o
                }), void this.triggerEvent("tabevent", s);
            }
            if ("2003" === a ? o = "5" : "2002" === a ? o = "1" : "2001" === a && (o = "0"), 
            a !== this.data.subKey) {
                this.setData({
                    searchSort: o,
                    subKey: a,
                    priceIcon: "http://njst.360buyimg.com/jdreact/program/shop_price_arrow_normal.png"
                });
                var s = {
                    key: this.data.key,
                    searchSort: o
                };
                this.triggerEvent("tabevent", s);
            }
        }
    }
});
require("../../utils/util.js");

var t = require("../../utils/shop_util.js"), e = require("../../utils/keplerReport.js").init(), a = getApp();

Page({
    data: {
        list: [],
        shopID: "",
        winWidth: 0,
        winHeight: 0,
        winScale: 0,
        platform: "",
        pixelRatio: 0,
        uid: "",
        moduletype: "",
        shopid: "",
        key: "",
        template: "",
        state: 0,
        hasNext: !0
    },
    onLoad: function(e) {
        var a = this, i = t.getShopConfigure().configure.shopID, o = e.shopId, r = e.name, n = e.moduletype;
        r && "undefined" !== r || (r = "商品列表", "PD_PRODUCT" === n && (r = "超值单品")), wx.setNavigationBarTitle({
            title: r
        }), o && (i = o), i || (i = wx.getStorageSync("shopID")), wx.getSystemInfo({
            success: function(t) {
                var o = t.windowWidth / 320, r = (t.platform, t.pixelRatio);
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight,
                    winScale: o,
                    platform: t.platform,
                    pixelRatio: r,
                    shopID: i,
                    uid: e.uid ? e.uid : "",
                    moduletype: e.moduletype,
                    key: e.key,
                    template: e.template
                });
            }
        }), a._searchWare();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    wareClick: function(t) {
        e.click({
            eid: t.currentTarget.dataset.eid,
            elevel: "",
            eparam: t.currentTarget.dataset.eparam + "_" + this.data.shopID,
            pname: "/pages/product/product",
            pparam: "wareId=" + t.currentTarget.dataset.eparam,
            target: "",
            event: t
        });
        var a = t.currentTarget.dataset.eparam;
        1 === getCurrentPages().length ? wx.navigateTo({
            url: "../product/product?wareId=" + a
        }) : wx.redirectTo({
            url: "../product/product?wareId=" + a
        });
    },
    _searchWare: function() {
        this.showToast();
        var t = "getPromotionDetail", e = this.data.key;
        "PD_PRODUCT" === this.data.moduletype && (t = "getRecProduct", e = this.data.shopID + "_" + this.data.uid);
        var i = {
            shopId: this.data.shopID,
            id: e,
            template: this.data.template
        }, o = JSON.stringify(i), r = new Object();
        r.body = o, r.screen = this.data.winWidth * this.data.pixelRatio + "*" + this.data.winHeight * this.data.pixelRatio;
        var n = a.globalRequestUrl + "/shopwechat/shophomesoa/" + t, s = this;
        s.setData({
            state: 1
        }), wx.request({
            url: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: r,
            success: function(t) {
                var e = t.data.code;
                if (0 == parseInt(e)) {
                    var a = t.data.wareList, i = s.data.list;
                    i = a, s.setData({
                        list: s.formatJDPrice(i),
                        hasNext: !1,
                        netError: !1,
                        state: 0
                    });
                } else s.setData({
                    loadingfailed: !0,
                    noData: !1,
                    netError: !1,
                    nextPage: !0,
                    hasNext: !0,
                    state: 0
                });
            },
            fail: function(t) {
                s.setData({
                    state: 3
                }), s.networkFail();
            },
            complete: function(t) {
                s.networkComplete();
            }
        });
    },
    networkFail: function() {
        this.setData({
            list: [],
            netError: !0,
            noData: !1,
            nextPage: 1
        });
    },
    networkComplete: function() {
        wx.hideToast(), this.setData({
            loading: !1
        });
    },
    noData: function() {
        this.setData({
            list: [],
            nextPage: 1,
            noData: !0,
            netError: !1
        });
    },
    resetData: function() {
        this.setData({
            netError: !1,
            noData: !1,
            loading: !0,
            loadingfailed: !1,
            flex: !1
        });
    },
    showToast: function() {
        wx.showToast({
            title: "数据加载中",
            icon: "loading",
            duration: 12e3,
            mask: !0
        });
    },
    formatJDPrice: function(t) {
        function e(t, e) {
            return a(t.jdPrice) ? (t.preJDPrice = t && t.jdPrice && t.jdPrice.toString().split(".")[0], 
            t.sufJDPrice = t && t.jdPrice && t.jdPrice.toString().split(".")[1], t.isJDPrice = t && t.jdPrice && !0) : t.isJDPrice = t && t.jdPrice && !1, 
            t;
        }
        function a(t) {
            return !!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(t);
        }
        if (!t) return !1;
        if (!t.length) return !1;
        var i = [];
        return t.map(function(t, a) {
            i.push(e(t));
        }), i;
    },
    onReload: function() {
        this._searchWare();
    }
});
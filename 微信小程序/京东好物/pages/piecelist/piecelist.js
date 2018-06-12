function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../components/searchBar/searchBar.js"), a = require("../../components/searchTab/searchTab.js"), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../components/toast/toast.js")), s = require("../../utils/util.js"), i = require("../../utils/keplerReport.js").init(), o = require("../../utils/message_push.js"), c = getApp();

Page(Object.assign({}, e.search, a.searchTab, {
    data: {
        soDir: "/kwxso",
        pDir: "/kwxp",
        searchdata: {
            type: 1,
            bable: !0,
            placeholder: "搜索促销商品",
            hasTab: !0
        },
        searchtabdata: {
            tab: {
                list: [ {
                    id: "complex",
                    title: "综合",
                    sort: ""
                }, {
                    id: "sales",
                    title: "销量",
                    sort: "1"
                }, {
                    id: "new",
                    title: "新品",
                    sort: "5"
                }, {
                    id: "price",
                    title: "价格",
                    sort: "",
                    isSwitchIcon: !0,
                    iconName: "price-icon",
                    upSort: "3",
                    downSort: "2"
                } ],
                selectedId: "complex"
            }
        },
        headHeight: 276,
        sort: "",
        page: 1,
        keyword: "",
        isShowTotopBtn: !1,
        up: !1,
        scrollTop: 0,
        itemList: [],
        categoryInfo: {},
        productList: [],
        bgetproduct: !1,
        nomoreProduct: !1,
        promotionFlag: {
            3: "券",
            4: "豆",
            5: "赠",
            55: "",
            100: "plus"
        },
        top: 0,
        detailsTime: new Date().getTime(),
        sortTime: new Date().getTime()
    },
    onLoad: function(e) {
        var a, r = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 8e3
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth, a = t.windowHeight;
                r.setData({
                    scrollHeight: a / parseFloat(e / 750).toFixed(3)
                });
            }
        }), this.setData((a = {
            search: 1
        }, t(a, "searchdata.bfocus", !1), t(a, "activityId", e.activityId), t(a, "skuId", e.skuId), 
        t(a, "promotionTitle", e.promotionTitle), a)), this.searchRequest(), this.getCartPromotionFn(), 
        wx.setNavigationBarTitle({
            title: "凑单页"
        }), i.set({
            urlParam: e,
            title: "凑单页",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        i.pv();
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: c.shareDesc,
            desc: c.shareDesc,
            path: "/pages/piecelist/piecelist?activityId=" + t.data.activityId + "&skuId=" + t.data.skuId + "&promotionTitle=" + t.data.promotionTitle
        };
    },
    requestListData: function(t) {
        var e = this;
        s.request({
            url: t,
            success: e.renderDataList.bind(e),
            complete: function() {
                wx.hideToast();
            },
            fail: function(t) {
                s.reportErr("piecelist cartSearchList.json: " + t.errMsg);
            }
        });
    },
    searchRequest: function() {
        var t = "" + c.globalRequestUrl + this.data.soDir + "/list/cartSearch.action?activityId=" + this.data.activityId + "&skuId=" + this.data.skuId + "&_format_=json&sort=" + this.data.sort + "&page=" + this.data.page + "&sirKey=" + this.data.keyword;
        this.setData({
            productList: []
        }), this.requestListData(t);
    },
    searchListRequest: function() {
        var t = "" + c.globalRequestUrl + this.data.soDir + "/list/cartSearchList.action?activityId=" + this.data.activityId + "&skuId=" + this.data.skuId + "&_format_=json&sort=" + this.data.sort + "&page=" + this.data.page + "&sirKey=" + this.data.keyword;
        this.requestListData(t);
    },
    switchSearchTab: function(t) {
        var e = t.sort, a = t.title;
        this.setData({
            sort: e,
            page: 1,
            scrollTop: .001 * Math.random(),
            bgetproduct: !1
        }), i.click({
            eid: "WShop_TogetherSort",
            elevel: "",
            eparam: a,
            target: "",
            event: t
        }), this.searchRequest();
    },
    renderDataList: function(t) {
        var e = this, a = t.searchDataKwx;
        if (a.wareList && a.wareList.wareList) {
            var r = void 0, s = void 0, i = t.searchDataKwx.wareList.wareList;
            for (var o in i) {
                var c = i[o], n = c.jdPrice;
                if (n) {
                    var d = n.indexOf(".");
                    r = n.substring(0, d), s = n.substring(d), c.bigPrice = r, c.smallPrice = s, c.pageIndex = parseInt(o) + 1 + (this.data.page - 1) * i.length;
                }
                var u = c.promotionFlag;
                for (var l in u) {
                    var h = u[l];
                    e.data.promotionFlag[h] ? u[l] = e.data.promotionFlag[h] : u[l] = "";
                }
            }
            var p = t.searchDataKwx.wareList.wareList;
            p = e.data.productList.concat(t.searchDataKwx.wareList.wareList), e.setData({
                productList: p,
                loading: !1,
                bgetproduct: !0,
                nomoreProduct: !1
            });
        } else if ("number" == typeof a) wx.redirectTo({
            url: "../../pages/product/product?wareId=" + t.searchDataKwx
        }); else {
            var g = e.data.productList;
            e.setData({
                productList: g,
                loading: !1,
                bgetproduct: !0,
                nomoreProduct: !0
            });
        }
    },
    addCartFn: function(t) {
        var e = this, a = this, o = t.target.dataset.wareid, n = t.target.dataset.idx;
        s.request({
            url: "" + c.globalRequestUrl + a.data.pDir + "/cart/add.json?wareId=" + o + "&num=1",
            success: function(t) {
                var s = -1, i = "", o = {};
                t && t.cartJson && (t.cartJson.resultCode && (s = t.cartJson.resultCode), i = t.cartJson.resultMsg ? t.cartJson.resultMsg : "抱歉，加入购物车失败，请再试一下", 
                0 == s ? (o = {
                    icon: r.default.icon.success,
                    message: "加入购物车成功",
                    pageObj: a
                }, e.getCartPromotionFn()) : o = {
                    icon: r.default.icon.error,
                    message: i,
                    pageObj: a
                }, r.default.show(o));
            },
            fail: function(t) {
                s.reportErr("so add.json: " + t.errMsg);
            }
        }), i.click({
            eid: "WShop_TogetherAddCart",
            elevel: "5",
            eparam: n + "_" + o,
            target: "",
            event: t
        });
    },
    getCartPromotionFn: function() {
        var t = this, e = this;
        s.request({
            url: "" + c.globalRequestUrl + e.data.pDir + "/cart/getCartPromotionAmount.json?promotionId=" + e.data.activityId + "&num=1",
            success: function(e) {
                var a = e.cartExt.result.promotionTotalT.split("\n"), r = a[0], s = a[1];
                t.setData({
                    checkedInfoSum: r,
                    checkedInfoTip: s
                });
            },
            fail: function(t) {
                s.reportErr("piecelist getCartPromotionAmount.json: " + t.errMsg);
            }
        });
    },
    goBackCart: function(t) {
        o.messagePush({
            formId: t.detail.formId,
            times: 1,
            type: 10004
        }), i.click({
            eid: "WShop_TogetherGoCart",
            elevel: "",
            eparam: "",
            target: "../cart/cart",
            event: t
        }), wx.switchTab({
            url: "../cart/cart"
        });
    },
    getMore: function(t) {
        var e = this.data.page;
        this.data.loading || this.data.nomoreProduct || (e++, this.setData({
            loading: !0,
            page: e
        }), this.searchListRequest());
    },
    gotoProductDetail: function(t) {
        var e = new Date().getTime();
        if (console.log("time", e - this.data.detailsTime), !(e - this.data.detailsTime < 3e3)) {
            this.setData({
                detailsTime: e
            });
            var a = t.currentTarget.dataset.wareid, r = t.currentTarget.dataset.idx;
            i.click({
                eid: "WShop_TogetherProduct",
                elevel: "4",
                eparam: r + "_" + a,
                target: "../../pages/product/product?wareId=" + a,
                event: t
            }), wx.navigateTo({
                url: "../../pages/product/product?wareId=" + a
            });
        }
    },
    gotoScroll: function(t) {
        var e = this, a = this.data.top - t.detail.scrollTop;
        t.detail.scrollTop > 300 ? this.data.isShowTotopBtn = !0 : this.data.isShowTotopBtn = !1, 
        this.data.up = a > 0, this.setData({
            isShowTotopBtn: e.data.isShowTotopBtn,
            up: e.data.up,
            top: t.detail.scrollTop
        });
    },
    gotop: function() {
        this.setData({
            scrollTop: .001 * Math.random()
        });
    },
    search: function(t) {
        var e = t.text;
        this.setData({
            keyword: e,
            sort: "",
            page: 1,
            bgetproduct: !1,
            scrollTop: .001 * Math.random()
        }), this.searchRequest();
    },
    setFocus: function(t) {
        i.click({
            eid: "WShop_TogetherSearch",
            elevel: "",
            eparam: "",
            target: "",
            event: ""
        });
    }
}));
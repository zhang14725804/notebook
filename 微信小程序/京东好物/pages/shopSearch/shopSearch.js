require("../../utils/util.js");

var e = require("../../utils/shop_util.js"), a = require("../../utils/keplerReport.js").init(), t = require("../shop/shop_utils/request.js"), s = getApp();

Page({
    data: {
        imgUrl: "http://njst.360buyimg.com/jdreact/program/",
        returnpage: "",
        shopID: "",
        winWidth: 0,
        winHeight: 0,
        flex: !1,
        winScale: 0,
        scrollTop: "",
        pageIndex: "",
        nextPage: 0,
        tabIndex: 0,
        sortIndex: 0,
        tabItems: [],
        list: [],
        shopInfo: "",
        height_banner: 0,
        isShowBackTop: !1,
        hasNext: !0,
        loadingfailed: !1,
        status: {
            allProduct: !0,
            goodShop: !0
        },
        select: {
            recommend: !0,
            sale: !1,
            new: !1,
            price: !1
        },
        priceImage: "shop_price_arrow_normal.png",
        priceUp: !0,
        isBanner: !1,
        boolBack: !1,
        netError: !1,
        noData: !1,
        loading: !1,
        promotion: "促销",
        promotionID: 0,
        promotionType: 0,
        selectIndex: 0,
        platform: "",
        selectShopName: [],
        selectShop: [],
        client: "apple",
        clientVersion: "5.7.0",
        isShopPage: !0,
        shareDes: "",
        pixelRatio: "",
        networkType: "",
        bDisplayMask: !1,
        searchText: "",
        bInputText: !1,
        bGoodShop: !1,
        focus: !1,
        isShowTab: !0,
        scrollHeight: 0,
        forceHidden: !1,
        animationData: {},
        cateId: "",
        state: 0,
        requestParam: {
            searchType: 4,
            sort: 0,
            pageIdx: 1,
            pageSize: 20
        },
        logoType: 1
    },
    onLoad: function(t) {
        var s = this, i = e.getShopConfigure().configure.shopID, o = t.shopId;
        o && (i = o), i || (i = wx.getStorageSync("shopID"));
        var r = [], p = [];
        r.map(function(e, a) {
            p.push(e.name);
        });
        s.setData({
            shopID: i,
            selectShop: r,
            searchText: t.keyWord ? t.keyWord : "",
            cateId: t.cateId ? t.cateId : ""
        }), console.log(this.data.searchText), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowWidth / 320, t = 100 * a, i = (e.platform, e.pixelRatio);
                s.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight,
                    height_banner: t,
                    winScale: a,
                    platform: e.platform,
                    pixelRatio: i
                });
            }
        }), wx.getNetworkType({
            success: function(e) {
                var a = e.networkType;
                s.setData({
                    networkType: a
                });
            }
        }), this._getShopHomeData(), this.requestSearchWare(), a.set({
            urlParam: t,
            title: "店铺搜索",
            shopid: this.data.shopID,
            pname: "",
            pparam: this.data.shopID + "",
            pageId: "KeplerMiniAppShopSearch",
            siteId: "WXAPP-JA2016-1"
        });
    },
    onReady: function() {},
    onShow: function() {
        a.pv();
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.data.hasNext && this.requestSearchWare();
    },
    loadLogo: function(e) {
        console.log("图片加载完成"), console.log(e);
        var a = e.detail.width, t = e.detail.height;
        this.setData({
            logoType: a === t ? 1 : 2
        });
    },
    onPageScroll: function(e) {
        var a = e.scrollTop;
        a >= this.data.winHeight && !this.data.isShowBackTop ? this.setData({
            isShowBackTop: !0
        }) : a < this.data.winHeight && this.data.isShowBackTop && this.setData({
            isShowBackTop: !1
        });
    },
    recommend_tap: function() {
        a.click({
            eid: "KMiniAppShop_AllGoodsTab",
            elevel: "",
            eparam: "推荐",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: "subClick"
        }), this.setData({
            priceImage: "shop_price_arrow_normal.png",
            list: [],
            select: {
                recommend: !0,
                sale: !1,
                new: !1,
                price: !1
            },
            hasNext: !0
        }), this.data.requestParam.sort = 0, this.data.requestParam.pageIdx = 1, this.setData({
            requestParam: this.data.requestParam
        }), this.requestSearchWare();
    },
    sale_tap: function() {
        a.click({
            eid: "KMiniAppShop_AllGoodsTab",
            elevel: "",
            eparam: "销量",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: "subClick"
        }), this.setData({
            priceImage: "shop_price_arrow_normal.png",
            list: [],
            select: {
                recommend: !1,
                sale: !0,
                new: !1,
                price: !1
            },
            hasNext: !0
        }), this.data.requestParam.sort = 1, this.data.requestParam.pageIdx = 1, this.setData({
            requestParam: this.data.requestParam
        }), this.requestSearchWare();
    },
    new_tap: function() {
        a.click({
            eid: "KMiniAppShop_AllGoodsTab",
            elevel: "",
            eparam: "新品",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: "subClick"
        }), this.setData({
            select: {
                recommend: !1,
                sale: !1,
                new: !0,
                price: !1
            },
            hasNext: !0,
            priceImage: "shop_price_arrow_normal.png",
            list: []
        }), this.data.requestParam.sort = 5, this.data.requestParam.pageIdx = 1, this.setData({
            requestParam: this.data.requestParam
        }), this.requestSearchWare();
    },
    price_tap: function() {
        a.click({
            eid: "KMiniAppShop_AllGoodsTab",
            elevel: "",
            eparam: "价格",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: "subClick"
        }), this.data.priceUp ? (this.setData({
            select: {
                recommend: !1,
                sale: !1,
                new: !1,
                price: !0
            },
            hasNext: !0,
            priceImage: "shop_price_arrow_up.png",
            priceUp: !1,
            list: []
        }), this.data.requestParam.sort = 3, this.data.requestParam.pageIdx = 1, this.setData({
            requestParam: this.data.requestParam
        }), this.requestSearchWare()) : (this.setData({
            select: {
                recommend: !1,
                sale: !1,
                new: !1,
                price: !0
            },
            hasNext: !0,
            priceImage: "shop_price_arrow_down.png",
            priceUp: !0,
            list: []
        }), this.data.requestParam.sort = 2, this.data.requestParam.pageIdx = 1, this.setData({
            requestParam: this.data.requestParam
        }), this.requestSearchWare());
    },
    backtoTop: function() {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    bindfocus: function(e) {
        a.click({
            eid: "KMiniAppShop_Search",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: e
        }), this.setData({
            bDisplayMask: !0,
            focus: !0
        });
    },
    bindblur: function(e) {
        this.setData({
            bDisplayMask: !1,
            focus: !1
        });
    },
    bindinput: function(e) {
        this.setData({
            searchText: e.detail.value
        });
    },
    deleteClick: function(e) {
        this.setData({
            searchText: "",
            bDisplayMask: !1,
            focus: !1
        });
    },
    clickSearch: function(e) {
        this.data.searchText && this.data.searchText.length && (this.setData({
            hasNext: !0,
            list: []
        }), this.data.requestParam.pageIdx = 1, this.requestSearchWare());
    },
    clickMask: function(e) {
        this.setData({
            bDisplayMask: !1,
            focus: !1,
            searchText: ""
        });
    },
    onReload: function() {
        this.requestSearchWare();
    },
    _getShopHomeData: function() {
        var e = {
            shopId: this.data.shopID
        }, a = JSON.stringify(e), t = new Object();
        t.body = a, t.screen = this.data.winWidth * this.data.pixelRatio + "*" + this.data.winHeight * this.data.pixelRatio;
        var i = s.globalRequestUrl + "/shopwechat/shophomesoa/getShopHomeData", o = this;
        wx.request({
            url: i,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: t,
            success: function(e) {
                var a = e.data.code;
                0 == parseInt(a) && o.setData({
                    shopInfo: e.data.result.shopInfo
                });
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    requestSearchWare: function() {
        var e = this, a = this, s = this.data.requestParam;
        this.data.cateId.length ? s.searchType = "5" : s.searchType = "4", s.keyWord = this.data.searchText, 
        s.cateId = this.data.cateId, a.setData({
            state: 1
        }), t.searchWare(s, function(t, s) {
            if (t) {
                var i = e.data.list.concat(t);
                console.log(i), a.setData({
                    list: i,
                    hasNext: s,
                    state: 0
                }), e.data.requestParam.pageIdx += 1;
            } else a.setData({
                state: 0,
                hasNext: !1
            });
        }, function(t) {
            var s = 2;
            e.data.list && e.data.list.length && (s = 3), a.setData({
                state: s
            });
        });
    }
});
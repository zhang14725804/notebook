var t = require("../../utils/util.js"), e = require("../../utils/shop_util.js"), a = getApp();

Page({
    data: {
        supportedBabelFloorMap: {
            unknow: "error_template_name",
            guanggao_lunbo: "lunbo_template_name",
            shangpin_putong: "pt_template_name",
            hotzone: "hz_template_name"
        },
        activityId: null,
        shopID: "",
        babelHomeData: {},
        shopWareList: [],
        showTolerancePage: !1,
        requestError: !1,
        ptSelectedGroupMap: {},
        babelShareTitle: "",
        networkType: "",
        winWidth: 0,
        winHeight: 0,
        pixelRatio: 0
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight,
                    pixelRatio: t.pixelRatio
                });
            }
        }), wx.getNetworkType({
            success: function(t) {
                var e = t.networkType;
                a.setData({
                    networkType: e
                });
            }
        });
        var o = e.getShopConfigure();
        o.configure.shopID && a.setData({
            shopID: o.configure.shopID
        });
        var i = t.activityId;
        i && a.setData({
            activityId: i
        }), this._getBabelHomeData();
    },
    _reloadCurrentPage: function(t) {
        this._getBabelHomeData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    _parseBabelHomeData: function(t) {
        var e = this, a = new Object();
        a.activityId = t.activityId, a.totalFloorNum = t.totalFloorNum, a.head = t.head;
        var o = new Array(), i = {}, n = 0;
        t.floorList.forEach(function(t, a) {
            var r = t.template;
            if (r && e.data.supportedBabelFloorMap[r]) if ("guanggao_lunbo" === r) o.push(t), 
            n++; else if ("shangpin_putong" === r) {
                t.tabList.length > 0 && (t.tabHeight = t.tabList[0].height / 3);
                var s = /^#[0-9a-fA-F]{6}$/;
                void 0 != t.tabConfig.tabBgColor && 0 != t.tabConfig.tabBgColor.length && null != t.tabConfig.tabBgColor.match(s) || (t.tabConfig.tabBgColor = "#ffffff"), 
                void 0 != t.tabConfig.color && 0 != t.tabConfig.color.length && null != t.tabConfig.color.match(s) || (t.tabConfig.color = "#000000"), 
                void 0 != t.tabConfig.unSelectColor && 0 != t.tabConfig.unSelectColor.length && null != t.tabConfig.unSelectColor.match(s) || (t.tabConfig.unSelectColor = "#000000");
                for (var l = 0, c = [], d = [], u = 0; u < t.tabList.length; u++) {
                    for (var h, g = t.tabList[u], p = g.groupId, f = !0, w = 0; w < t.waresList.length; w++) {
                        var b = t.waresList[w];
                        if (b.groupId === p) {
                            void 0 == b.groupInfoList || b.groupInfoList.length <= 1 ? f = !1 : h = b;
                            break;
                        }
                    }
                    void 0 == g.width && (g.width = ""), g.width.length > 0 && (g.width = Math.ceil(parseInt(g.width) / 3).toString()), 
                    g.width.length > 0 && (l += parseInt(g.width)), g.tabStyle = t.tabStyle, 1 == f && (c.push(g), 
                    d.push(h));
                }
                if (t.tabList = c, t.waresList = d, 0 != l && l < e.data.winWidth ? t.tabSpace = (e.data.winWidth - l) / (t.tabList.length + 1) : t.tabSpace = 0, 
                t.tabList.length > 0) {
                    d = t.waresList[0].groupInfoList;
                    i[n] = {
                        tabIndex: 0,
                        waresList: d
                    }, o.push(t), n++;
                }
            } else o.push(t), n++;
        }), a.floorList = o, console.log(a), this.setData({
            babelHomeData: a,
            ptSelectedGroupMap: i
        }), this._setupNavigationBarStyle(), this._setupShareAppMessage(), this._showTolerancePageIfNeeded();
    },
    _showTolerancePageIfNeeded: function() {
        this.setData({
            showTolerancePage: 0 == this.data.babelHomeData.floorList.length
        }), 1 == this.data.showTolerancePage && this._searchWare();
    },
    _setupShareAppMessage: function(t) {
        var e = this.data.babelHomeData.head.shareInfo;
        e.sharingTitle ? (wx.showShareMenu(), this.setData({
            babelShareTitle: e.sharingTitle
        })) : wx.hideShareMenu();
    },
    _setupNavigationBarStyle: function(t) {
        var e = this.data.babelHomeData.head;
        e.name ? wx.setNavigationBarTitle({
            title: e.name
        }) : wx.setNavigationBarTitle({
            title: "京东"
        });
    },
    _searchWare: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "3", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "0";
        if (0 != this.data.shopID.length) {
            wx.showLoading({
                title: "加载中"
            });
            var i = {
                searchType: String(t),
                shopId: this.data.shopID,
                pageIdx: e,
                pageSize: 50,
                sort: String(o)
            }, n = JSON.stringify(i), r = new Object();
            r.body = n, r.screen = this.data.winWidth * this.data.pixelRatio + "*" + this.data.winHeight * this.data.pixelRatio;
            var s = a.globalRequestUrl + "/shopwechat/shophomesoa/searchWare", l = this;
            wx.request({
                url: s,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: r,
                success: function(t) {
                    var e = t.data.code;
                    if (0 == parseInt(e)) {
                        var a = t.data.result.wareInfo;
                        l.setData({
                            shopWareList: a
                        }), wx.hideLoading();
                    }
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    },
    _getBabelHomeData: function() {
        wx.showLoading({
            title: "加载中"
        });
        var t;
        null == this.data.activityId ? (this.setData({
            activityId: "3BRZshhJxC9G36W2E1PMMJnj2vsh"
        }), t = {
            activityId: "3BRZshhJxC9G36W2E1PMMJnj2vsh"
        }) : t = {
            activityId: this.data.activityId
        }, console.log(t);
        var e = {
            functionId: "h5BabelGenericChannel",
            body: JSON.stringify(t),
            client: "wh5",
            clientVersion: "1.0.0",
            networkType: this.data.networkType
        }, o = a.babelHomeRequestUrl, i = this;
        wx.request({
            url: o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: e,
            success: function(t) {
                console.log(t);
                var e = t.data.code, a = t.data.subCode;
                0 == parseInt(e) && 0 == parseInt(a) ? (i.setData({
                    requestError: !1
                }), i._parseBabelHomeData(t.data)) : i.setData({
                    requestError: !0
                });
            },
            fail: function(t) {
                i.setData({
                    requestError: !0
                });
            },
            complete: function(t) {
                wx.hideLoading();
            }
        });
    },
    noDataAddCart: function(e) {
        var o = this, i = e.currentTarget.dataset.wareid, n = wx.getStorageSync("sid"), r = wx.getStorageSync("USER_FLAG_CHECK");
        t.request({
            url: a.globalRequestUrl + "/p/cart/add.json?wareId=" + i + "&num=1&sid=" + n + "&USER_FLAG_CHECK=" + r,
            selfCookie: o.getSelfCookie(),
            success: function(e) {
                var a = 0, i = {};
                e && e.cartJson && (e.cartJson.resultCode && (a = e.cartJson.resultCode), e.cartJson.resultMsg ? e.cartJson.resultMsg : "加入购物车失败", 
                i = 0 == a ? {
                    iconName: "success-icon",
                    message: "成功加入购物车"
                } : {
                    iconName: "error-icon",
                    message: "加入购物车失败"
                }, t.kwxToast(o, i));
            },
            fail: function(e) {
                t.reportErr("item add.json: " + e.errMsg);
            }
        });
    },
    addCart: function(e) {
        var o = this, i = e.currentTarget.dataset.wareid, n = wx.getStorageSync("sid"), r = wx.getStorageSync("USER_FLAG_CHECK");
        t.request({
            url: a.globalRequestUrl + "/p/cart/add.json?wareId=" + i + "&num=1&sid=" + n + "&USER_FLAG_CHECK=" + r,
            selfCookie: o.getSelfCookie(),
            success: function(e) {
                var a = 0, i = "", n = {};
                e && e.cartJson && (e.cartJson.resultCode && (a = e.cartJson.resultCode), i = e.cartJson.resultMsg ? e.cartJson.resultMsg : "抱歉，加入购物车失败，请再试一下", 
                n = 0 == a ? {
                    iconName: "success-icon",
                    message: "加入购物车成功"
                } : {
                    iconName: "error-icon",
                    message: i
                }, t.kwxToast(o, n));
            },
            fail: function(e) {
                t.reportErr("item add.json: " + e.errMsg);
            }
        });
    },
    getSelfCookie: function() {
        var t = "";
        try {
            var e = wx.getStorageSync("regionAddress");
            e && (t = t + "regionAddress=" + e + ";");
        } catch (t) {}
        return t;
    },
    swiperDidChanged: function(t) {},
    lunbotuDidTap: function(t) {
        var e = t.currentTarget.dataset.jumpInfo;
        this._jumpActionWithModel(e);
    },
    ptShangpinDidTap: function(t) {
        var e = t.currentTarget.dataset.skuid;
        e && wx.navigateTo({
            url: "/pages/product/product?wareId=" + e
        });
    },
    _jumpActionWithModel: function(t) {
        var e = t.des, a = t.params;
        if (e) switch (e) {
          case "m":
            var o = a.url;
            if (o) {
                var i = /active\/(\S*)\//;
                o.replace(i, function(t, e) {
                    e && (console.log(e), wx.navigateTo({
                        url: "/pages/BabelHome/babelJumpChannel?activityId=" + e
                    }));
                });
            }
            break;

          case "skudetail":
            var n = a.skuId;
            n && wx.navigateTo({
                url: "/pages/product/product?wareId=" + n
            }), console.log("跳转商详");
            break;

          case "newgoodshop":
            var r = a.shopId;
            r && wx.navigateTo({
                url: "/pages/shop/shop?shopId=" + r
            }), console.log("跳转店铺");
        }
    },
    ptTabDidClickEvent: function(t) {
        console.log(t);
        var e = this, a = this.data.ptSelectedGroupMap, o = t.currentTarget.dataset.tmpidx, i = t.currentTarget.dataset.tabitem.groupId;
        t.currentTarget.dataset.model.waresList.forEach(function(t, n) {
            if (i === t.groupId) {
                if (n == a[o].tabIndex) return;
                a[o] = {
                    tabIndex: n,
                    waresList: t.groupInfoList
                }, e.setData({
                    ptSelectedGroupMap: a
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: this.data.babelShareTitle,
            path: "/pages/BabelHome/BabelHome?activityId=" + this.data.activityId,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});
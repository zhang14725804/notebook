function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = require("../../utils/util.js"), o = require("../../utils/shop_util.js"), s = require("../../utils/keplerReport.js").init(), i = require("./shop_utils/request.js"), r = require("./shop_utils/jump.js"), n = (require("./model.js"), 
getApp()), p = !0, h = !1, l = !1;

Page((e = {
    data: {
        imgUrl: "http://njst.360buyimg.com/jdreact/program/",
        returnpage: "/pages/shop/shop",
        fromPageType: "switchTab",
        fromPageLevel: 1,
        shopID: "",
        winWidth: 0,
        winHeight: 0,
        scrollTop: 1,
        pageIndex: "",
        nextPage: 0,
        tabIndex: 1,
        sortIndex: 0,
        tabItems: [],
        list: [],
        shopInfo: "",
        isShowBackTop: !1,
        loadingfailed: !1,
        status: {
            allProduct: !1,
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
        netError: !1,
        noData: !1,
        loading: !1,
        promotion: "促销",
        promotionID: 0,
        promotionType: 0,
        selectIndex: 0,
        platform: "",
        client: "apple",
        clientVersion: "5.7.0",
        showMy: !1,
        shareDes: "",
        pixelRatio: "",
        networkType: "",
        bDisplayMask: !1,
        searchText: "",
        bInputText: !1,
        bGoodShop: !0,
        floorData: [],
        floors: [],
        coupons: [],
        couponsCount: 0,
        showToast: {
            processStatus: "",
            desc: ""
        },
        isShowToast: !1,
        isRequestCoupons: !1,
        focus: !1,
        isShowTab: !0,
        scrollHeight: 0,
        forceHidden: !1,
        animationData: {},
        shopCategories: [],
        isShowActivity: !1,
        allGoodList: [],
        hasNext: !0,
        placeHeight: 200,
        state: 0,
        tabKey: "1001",
        switchKey: "",
        promList: [],
        tabs: [],
        promo: {},
        requestParam: {},
        logoType: 1,
        needShieldShopCategory: !1
    },
    onLoad: function(t) {
        if (t.scene) {
            var e = decodeURIComponent(t.scene).split("&");
            if (e[0] ? wx.setStorageSync("customerinfo", e[0]) : wx.removeStorageSync("customerinfo"), 
            e[1]) {
                var a = wx.getStorageSync("wxappStorageName"), r = wx.getStorageSync(a);
                r.unionid = e[1], wx.setStorageSync(a, r);
            }
        }
        var p = wx.getStorageSync("jdlogin_pt_key");
        h = !!p;
        var l = this, d = o.getShopConfigure(), c = d.configure.shopID, u = t.shopId;
        u && (c = u, this.setData({
            fromPageType: "",
            fromPageLevel: 0
        })), c || (c = wx.getStorageSync("shopID")), wx.setStorageSync("shopID", c), wx.setNavigationBarTitle({
            title: d.configure.shopName ? d.configure.shopName : ""
        }), l.setData({
            shopID: c,
            needShieldShopCategory: !(!n.globalConfig || !n.globalConfig.needShieldShopCategory) && n.globalConfig.needShieldShopCategory
        }), wx.getSystemInfo({
            success: function(t) {
                t.platform;
                var e = t.pixelRatio;
                l.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight,
                    platform: t.platform,
                    pixelRatio: e
                });
            }
        }), wx.getNetworkType({
            success: function(t) {
                var e = t.networkType;
                l.setData({
                    networkType: e
                });
            }
        }), i.getShopPromotionTypes(function(t) {
            var e = [];
            (t || []).map(function(t, a) {
                t.type && 6 != t.type && e.push(t);
            }), l.setData({
                promList: e || []
            });
        }, function(t) {}), this.getShopHomeData(), this.isShowActivityIcon(), s.set({
            urlParam: t,
            title: "京东店铺",
            shopid: this.data.shopID + "",
            pname: "",
            pparam: this.data.shopID + "",
            pageId: "KeplerMiniAppShopHome",
            siteId: "WXAPP-JA2016-1"
        });
    },
    onReady: function() {
        this.jdTemplate = this.selectComponent("#jdTemplate");
    },
    onShow: function() {
        var t = o.getShopConfigure();
        wx.setNavigationBarTitle({
            title: t.configure.shopName ? t.configure.shopName : ""
        }), s.pv();
        this.setData({
            showMy: !0,
            isRequestCoupons: !1
        });
        var e = !!wx.getStorageSync("jdlogin_pt_key");
        h ^ e && this.getShopHomeData(), h = e;
    },
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.shopInfo.shopName,
            desc: t.data.shareDes,
            path: "/pages/shop/shop"
        };
    },
    loadLogo: function(t) {
        console.log("图片加载完成"), console.log(t);
        var e = t.detail.width, a = t.detail.height;
        this.setData({
            logoType: e === a ? 1 : 2
        });
    },
    backtoTop: function() {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    floorClick: function(t) {
        var e = t.currentTarget.dataset.uid, a = t.currentTarget.dataset.templateid;
        if (console.log(t.currentTarget.dataset), s.click({
            eid: "WShop_ShopSelectionFloor",
            elevel: "",
            eparam: e,
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: t
        }), 91 === a) {
            var o = t.currentTarget.dataset.configs;
            r.clickActivity(o);
        } else if (17 === a || 18 === a || 84 === a || 11 === a || 82 === a || 83 === a || 16 === a) {
            var i = t.currentTarget.dataset.item;
            r.clickActivity(i);
        } else {
            if (6 === a || 7 === a || 8 === a || 9 === a || 19 === a || 73 === a || 74 === a || 53 === a) {
                var n = t.currentTarget.dataset.wareid;
                return r.jumpToSkuDetail(n), !1;
            }
            if (132 === a) {
                for (var p = t.currentTarget.dataset.configs, h = t.currentTarget.dataset.pix, l = t.detail.x - t.currentTarget.offsetLeft, d = t.detail.y - t.currentTarget.offsetTop, c = 0; c < p.length; c++) {
                    var u = p[c], g = u.coordinate, m = g.x, f = g.x + g.w, v = g.y, D = g.y + g.h;
                    if (l >= m * h && l <= f * h && d >= v * h && d <= D * h) {
                        console.log("中");
                        var y = u && u.configs;
                        r.clickActivity(y);
                    }
                }
                return !1;
            }
        }
    },
    formattedData: function(t) {
        if (!t) return [];
        var e = this, a = [];
        return t.map(function(t, o) {
            if (t.dsConfig.products) {
                var s = t.dsConfig.products;
                t.dsConfig.products = e.formatJDPrice(s);
            } else if (91 === t.templateId) {
                var i = t.dsConfig.configs, r = 0;
                i && i.map(function(t, e) {
                    var a = parseInt(t.y), o = parseInt(t.h);
                    a + o > r && (r = a + o);
                }), t.dsConfig.cellsInHeight = r;
            } else if (132 === t.templateId) {
                var n = t.dsConfig.width, p = t.dsConfig.height, h = parseFloat((e.data.winWidth - 20) / n);
                t.dsConfig.drawWidth = h * n, t.dsConfig.drawHeight = h * p, t.dsConfig.pix = h;
            }
            a.push(t);
        }), a;
    },
    moreNewProduct: function(t) {
        var e = t.currentTarget.dataset.uid, a = t.currentTarget.dataset.moduletype, o = t.currentTarget.dataset.name;
        1 === getCurrentPages().length ? wx.navigateTo({
            url: "../shopRcmd/shopRcmd?uid=" + e + "&moduletype=" + a + "&name=" + o
        }) : wx.redirectTo({
            url: "../shopRcmd/shopRcmd?uid=" + e + "&moduletype=" + a + "&name=" + o
        });
    },
    didClickFloorItem: function(t) {
        r.templateClick(t);
    },
    bindfocus: function(t) {
        l || (s.click({
            eid: "KMiniAppShop_Search",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: t
        }), l = !0), this.setData({
            bDisplayMask: !0,
            focus: !0
        });
    },
    bindblur: function(t) {
        l = !1, this.setData({
            bDisplayMask: !1,
            focus: !1
        });
    },
    bindinput: function(t) {
        this.setData({
            searchText: t.detail.value
        });
    },
    deleteClick: function(t) {
        this.setData({
            searchText: "",
            bDisplayMask: !1,
            focus: !1
        });
    },
    clickSearch: function(t) {
        this.data.searchText ? (s.click({
            eid: "WShop_Search",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: t
        }), 1 === getCurrentPages().length ? wx.navigateTo({
            url: "../../pages/shopSearch/shopSearch?keyWord=" + this.data.searchText
        }) : wx.redirectTo({
            url: "../../pages/shopSearch/shopSearch?keyWord=" + this.data.searchText
        })) : s.click({
            eid: "KMiniAppShop_SearchCancel",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "",
            event: t
        }), this.setData({
            searchText: "",
            bDisplayMask: !1,
            focus: !1
        });
    },
    clickMask: function(t) {
        this.setData({
            bDisplayMask: !1,
            focus: !1,
            searchText: ""
        });
    },
    receiveCoupons: function(t) {
        if (!this.data.isRequestCoupons) {
            this.setData({
                isRequestCoupons: !0
            });
            t.currentTarget.dataset.eid;
            var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.item;
            this.data.shopID, a.couponId;
            s.click({
                eid: "KMiniAppShop_Coupon",
                elevel: "",
                eparam: "",
                pname: "/pages/shop/shop",
                pparam: "",
                target: "",
                event: t
            });
            var o = wx.getStorageSync("jdlogin_pt_key");
            if (!o) return this.toLogin(), !1;
            a.applicability && a.act && a.couponId ? this._getReceiveCoupon(a, e, o) : this.setData({
                isRequestCoupons: !1
            });
        }
    },
    _getReceiveCoupon: function(t, e, a) {
        wx.showToast({
            title: "数据加载中",
            icon: "loading",
            duration: 12e3,
            mask: !0
        });
        var o = {
            shopId: this.data.shopID,
            act: t.act,
            couponId: t.couponId,
            operation: "3"
        }, s = JSON.stringify(o), i = new Object();
        i.body = s, i.pt_key = a, i.source = "jd-jing", i.screen = this.data.winWidth * this.data.pixelRatio + "*" + this.data.winHeight * this.data.pixelRatio;
        var r = n.globalRequestUrl + "/shopwechat/shophomesoa/receiveCoupon", p = this;
        wx.request({
            url: r,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: i,
            success: function(t) {
                var a = t.data.code;
                if (0 == a || "0" == a) {
                    var o = t.data;
                    if ("999" === o.processStatus || 999 === o.processStatus) {
                        var s = p.data.coupons;
                        s[e].applicability = !1, s[e].couponStatus = 1, p.setData({
                            coupons: s
                        });
                    }
                    p.setData({
                        showToast: o
                    });
                } else if (3 == a || "3" == a) p.toLogin(); else {
                    var t = {
                        processStatus: 0,
                        desc: "领取失败"
                    };
                    p.setData({
                        isShowToast: !1,
                        showToast: t
                    });
                }
            },
            fail: function(t) {
                var t = {
                    processStatus: 0,
                    desc: "网络异常"
                };
                p.setData({
                    isShowToast: !1,
                    showToast: t
                });
            },
            complete: function(t) {
                wx.hideToast(), p.setData({
                    isRequestCoupons: !1
                });
                var e = t.data.code;
                !e || 0 !== e && "0" !== e || (setTimeout(function() {
                    p.setData({
                        isShowToast: !0
                    });
                }, 500), setTimeout(function() {
                    p.setData({
                        isShowToast: !1
                    });
                }, 2e3));
            }
        });
    },
    toLogin: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                isRequestCoupons: !1
            });
        }, 3e3), a.globalLoginShow(this);
    },
    shopCategories: function(t) {
        var e = JSON.stringify(this.data.shopCategories);
        e = e.replace(/&/g, ""), s.click({
            eid: "KMiniAppShop_Category",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: "",
            target: "/pages/shop/shopCategories/index?shopCategories=" + e,
            event: t
        }), wx.navigateTo({
            url: "/pages/shop/shopCategories/index?shopCategories=" + e
        });
    },
    couponScroll: function(t) {
        p && (p = !1, s.click({
            eid: "KMiniAppShop_CouponExpo",
            elevel: "",
            eparam: "",
            pname: "/pages/shop/shop",
            pparam: ""
        }), setTimeout(function() {
            p = !0;
        }, 3e3));
    },
    isShowActivityIcon: function() {
        var t = !1;
        35324 !== this.data.shopID && 15706 !== this.data.shopID && 53379 !== this.data.shopID && 609661 !== this.data.shopID && 1000004064 !== this.data.shopID || (t = !0);
        var e = new Date("2018/1/10 00:00:00").getTime(), a = new Date("2018/2/23 00:00:00").getTime(), o = new Date().getTime();
        o >= e && o <= a ? this.setData({
            isShowActivity: t
        }) : this.setData({
            isShowActivity: !1
        });
    },
    onReload: function() {
        this.onReachBottom();
    },
    onTabEvent: function(t) {
        var e = t.detail, a = e.key, o = e.searchSort;
        if (this.setData({
            switchKey: ""
        }), "1001" === a) this.setData({
            requestParam: {},
            tabKey: a,
            placeHeight: 200,
            allGoodList: [],
            hasNext: !0,
            state: 0
        }); else if ("1002" === a) {
            if (this.data.requestParam.sort) this.data.requestParam.sort = o, this.data.requestParam.pageIdx = 1, 
            this.setData({
                allGoodList: [],
                hasNext: !0
            }); else {
                p = {
                    searchType: 3,
                    sort: o,
                    pageIdx: 1,
                    pageSize: 20
                };
                this.setData({
                    tabKey: a,
                    requestParam: p,
                    placeHeight: 280,
                    allGoodList: [],
                    hasNext: !0
                });
            }
            this.requestSearchWare(p);
        } else if ("1003" === a) {
            p = {
                pageIdx: 1,
                pageSize: 20
            };
            this.setData({
                tabKey: a,
                requestParam: p,
                placeHeight: 200,
                allGoodList: [],
                hasNext: !0
            }), this.requestShopHotWares();
        } else if ("1005" === a) {
            p = {
                pageIdx: 1,
                pageSize: 20
            };
            this.setData({
                tabKey: a,
                requestParam: p,
                placeHeight: 200,
                allGoodList: [],
                hasNext: !0
            }), this.requestNewWareList();
        } else if ("1006" === a) {
            p = {
                pageIdx: 1,
                pagesize: 20
            };
            this.setData({
                tabKey: a,
                requestParam: p,
                placeHeight: 200,
                allGoodList: [],
                hasNext: !0
            }), this.getShopActivityPage();
        } else if ("1004" === a) {
            if (e.promo) {
                var s = e.promo;
                s && s.promRule && (s.promRule.indexOf("促销规则") >= 0 ? s.promRule = s.promRule : s.promRule = "促销规则：" + s.promRule, 
                s.promRuleOpen = !1, (r = {}).GetLength = function(t) {
                    return t.replace(/[\u0391-\uFFE5]/g, "aa").length;
                }, s.tipsLength = r.GetLength(s.promRule));
                n = 200;
                this.data.promList && this.data.promList.length && (n = 280), s && (s.promRule || s.promTitle) && (n = 260);
                p = {
                    type: s.type,
                    promoId: s.promoId,
                    pageIdx: 1,
                    pageSize: 20
                };
                this.setData({
                    promo: s,
                    tabKey: a,
                    requestParam: p,
                    placeHeight: n,
                    allGoodList: [],
                    hasNext: !0
                });
            } else {
                var i = {};
                if (this.data.promList && this.data.promList.length && (i = e.promoInfo) && i.promRule) {
                    i.promRule.indexOf("促销规则") >= 0 ? i.promRule = i.promRule : i.promRule = "促销规则：" + i.promRule, 
                    i.promRuleOpen = !1;
                    var r = {};
                    r.GetLength = function(t) {
                        return t.replace(/[\u0391-\uFFE5]/g, "aa").length;
                    }, i.tipsLength = r.GetLength(i.promRule);
                }
                var n = 200;
                this.data.promList && this.data.promList.length && (n = 280), i && (i.promRule || i.promTitle) && (n = 260);
                p = {
                    type: i && i.type,
                    promoId: i && i.promoId,
                    page: 1,
                    pageSize: 20
                };
                this.setData({
                    promo: i,
                    tabKey: a,
                    requestParam: p,
                    placeHeight: n,
                    allGoodList: [],
                    hasNext: !0
                });
            }
            this.getShopPromotionWareList();
        } else if ("1007" === a) {
            var p = {
                shopId: wx.getStorageSync("shopId"),
                pageIdx: 1,
                pagesize: 20
            };
            this.setData({
                tabKey: a,
                requestParam: p,
                placeHeight: 200,
                allGoodList: [],
                hasNext: !0
            }), this.getFightBuyPage();
        } else this.setData({
            placeHeight: 200,
            allGoodList: [],
            hasNext: !0
        });
    },
    getShopPromotionWareList: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.getShopPromotionWareList(a, function(a, o) {
            if (a) {
                var s = t.data.allGoodList.concat(a);
                e.setData({
                    allGoodList: s,
                    hasNext: o,
                    state: 0
                }), t.data.requestParam.page += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    getShopActivityPage: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.getShopActivityPage(a, function(a, o) {
            if (a) {
                a.map(function(t) {
                    t.products && t.products.length > 6 && (t.products = t.products.slice(0, 6));
                });
                var s = t.data.allGoodList.concat(a);
                e.setData({
                    allGoodList: s,
                    hasNext: o,
                    state: 0
                }), t.data.requestParam.pageIdx += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    requestNewWareList: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.newWareList(a, function(a, o) {
            if (a) {
                var s = [];
                if (t.data.allGoodList.length) {
                    var i = t.data.allGoodList[t.data.allGoodList.length - 1], r = a[0];
                    if (i.date === r.date) {
                        var n = i.wareList.concat(r.wareList);
                        i.wareList = n;
                        var p = t.data.allGoodList;
                        p.slice(s.length - 1, 1, i);
                        var h = a;
                        console.log(h), h.splice(0, 1), console.log(h), s = p.concat(h);
                    } else s = t.data.allGoodList.concat(a);
                } else s = a;
                e.setData({
                    allGoodList: s,
                    hasNext: o,
                    state: 0
                }), t.data.requestParam.pageIdx += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    requestShopHotWares: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.getShopHotWares(a, function(a, o) {
            if (a) {
                var s = t.data.allGoodList.concat(a);
                e.setData({
                    allGoodList: s,
                    hasNext: o,
                    state: 0
                }), t.data.requestParam.pageIdx += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    requestSearchWare: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.searchWare(a, function(a, o) {
            if (a) {
                var s = t.data.allGoodList.concat(a);
                e.setData({
                    allGoodList: s,
                    hasNext: o,
                    state: 0
                }), t.data.requestParam.pageIdx += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    getFightBuyPage: function() {
        var t = this, e = this, a = this.data.requestParam;
        e.setData({
            state: 1
        }), i.getFightBuy(a, function(o) {
            if (o) {
                var s = o.pingouList, i = [];
                i = t.data.allGoodList.concat(s);
                var r = a.pageIdx, n = a.pagesize, p = e.data.fightbuyNum || o && o.totalNum;
                e.data.fightbuyNum || e.setData({
                    fightbuyNum: o.totalNum
                });
                h = !0;
                if (r >= Math.ceil(p / n)) var h = !1;
                e.setData({
                    allGoodList: i,
                    hasNext: h,
                    state: 0
                }), t.data.requestParam.pageIdx += 1;
            } else e.setData({
                state: 0,
                hasNext: !1
            });
        }, function(a) {
            var o = 2;
            t.data.allGoodList && t.data.allGoodList.length && (o = 3), e.setData({
                state: o
            });
        });
    },
    getShopHomeData: function() {
        var t = this, e = this;
        wx.showToast({
            title: "数据加载中",
            icon: "loading",
            duration: 12e3,
            mask: !0
        }), i.getShopHomeData(function(a) {
            console.log("首页"), t.setData({
                tabKey: "1001"
            });
            var o = wx.getStorageSync("shopId");
            i.getFightBuy({
                shopId: o
            }, function(t) {
                wx.hideToast(), e.defineTabs(a, t);
            }, function(t) {
                wx.hideToast(), e.defineTabs(a);
            });
        }, function(t) {
            wx.hideToast();
        });
    },
    hasFloor: function() {
        for (var t = !1, e = this.data.floorData, a = 0; a < e.length; a++) {
            var o = e[a];
            if (132 === o.templateId || 73 === o.templateId || 74 === o.templateId || 53 === o.templateId || 91 === o.templateId || 82 === o.templateId || 83 === o.templateId || 17 === o.templateId || 84 === o.templateId || 18 === o.templateId || 16 === o.templateId || 11 === o.templateId || 19 === o.templateId || 6 === o.templateId || 7 === o.templateId || 8 === o.templateId || 9 === o.templateId || "PD_TEMPLATE" === o.moduleType) {
                t = !0;
                break;
            }
        }
        return e && 1 === e.length && (t = !1), t;
    },
    defineTabs: function(t, e) {
        var a = this, o = t.shopInfo, s = t.floors, i = o.hotNum, r = o.newNum, n = o.promotionNum, p = o.totalNum, h = o.shopActivityTotalNum, l = this.data.fightbuyNum || e && e.totalNum;
        this.setData({
            fightbuyNum: e && e.totalNum || 0
        });
        var d = [];
        this.hasFloor(s) && d.push({
            name: "店铺精选",
            key: "1001"
        }), p && 0 != p && d.push({
            name: "全部商品",
            key: "1002",
            num: p
        }), l && 0 != l && d.push({
            name: "拼购商品",
            key: "1007",
            num: l
        }), i && 0 != i && d.push({
            name: "热销",
            key: "1003",
            num: i
        }), n && 0 != n && d.push({
            name: "促销",
            key: "1004",
            num: n
        }), !r || 0 == r || l && 0 != l || d.push({
            name: "上新",
            key: "1005",
            num: r
        }), h && 0 != h && d.push({
            name: "店铺动态",
            key: "1006",
            num: h
        }), d && d.length && this.setData({
            tabKey: d[0].key
        }), (s = a.formattedData(s)).map(function(t, e) {
            "PD_TEMPLATE" === t.moduleType && (t.containerData = [ {
                containerData: t.dsConfig
            } ]);
        });
        var c = this.groupItems(s, 5), u = [];
        c.forEach(function(t, e) {
            0 === e ? u.push(t) : u.push([]);
        }), this.data.floors = c, a.setData({
            shopInfo: o,
            floorData: u,
            coupons: o.coupons || [],
            couponsCount: o && o.coupons ? (o.coupons || []).length : 0,
            shopCategories: t.shopInfo.shopCategories || [],
            tabs: d
        });
    },
    groupItems: function(t, e) {
        var a = [], o = [];
        return t.forEach(function(t) {
            o.length === e ? (a.push(o), o = [ t ]) : o.push(t);
        }), o.length > 0 && a.push(o), a;
    }
}, t(e, "hasFloor", function(t) {
    var e = !1, a = t;
    if (!a) return !1;
    for (var o = 0; o < a.length; o++) {
        var s = a[o];
        if (132 === s.templateId || 73 === s.templateId || 74 === s.templateId || 53 === s.templateId || 91 === s.templateId || 82 === s.templateId || 83 === s.templateId || 17 === s.templateId || 84 === s.templateId || 18 === s.templateId || 16 === s.templateId || 11 === s.templateId || 19 === s.templateId || 6 === s.templateId || 7 === s.templateId || 8 === s.templateId || 9 === s.templateId || "PD_TEMPLATE" === s.moduleType) {
            e = !0;
            break;
        }
    }
    return a && 1 === a.length && (e = !1), e;
}), t(e, "onReachBottom", function() {
    if (this.data.hasNext) if ("1005" === this.data.tabKey) this.requestNewWareList(); else if ("1003" === this.data.tabKey) this.requestShopHotWares(); else if ("1002" === this.data.tabKey) this.requestSearchWare(); else if ("1006" === this.data.tabKey) this.getShopActivityPage(); else if ("1004" === this.data.tabKey) this.getShopPromotionWareList(); else if ("1001" === this.data.tabKey) {
        for (var t = 0; t < this.data.floorData.length; t++) if (0 === this.data.floorData[t].length) {
            var e = {};
            e["floorData[" + t + "]"] = this.data.floors[t], this.setData(e);
            break;
        }
    } else "1007" === this.data.tabKey && this.getFightBuyPage();
}), t(e, "onPageScroll", function(t) {
    var e = t.scrollTop;
    e >= n.globalData.systemInfo.windowHeight && this.data.isShowTab ? this.setData({
        isShowTab: !1,
        scrollTop: e
    }) : e < n.globalData.systemInfo.windowHeight && !this.data.isShowTab && this.setData({
        isShowTab: !0,
        scrollTop: e
    }), e >= this.data.winHeight && !this.data.isShowBackTop ? this.setData({
        isShowBackTop: !0
    }) : e < this.data.winHeight && this.data.isShowBackTop && this.setData({
        isShowBackTop: !1
    });
}), t(e, "jumpAllGoods", function() {
    if (this.data.tabs.length >= 2) {
        var t = this.data.tabs[1].key;
        this.setData({
            switchKey: t
        });
    }
}), t(e, "formatJDPrice", function(t) {
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
    var o = [];
    return t.map(function(t, a) {
        o.push(e(t));
    }), o;
}), e));
function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    var t = P.getCookie("wq_addr"), e = t ? t.split(/\|/) : [], a = [];
    return 4 === (a = e.length ? (e[2].includes("_") ? e[2] : e[3] || e[2]).split("_") : I.getAddress().areaName.split("_")).length ? a[1] + a[2] : a.join("");
}

var a = function() {
    function t(t, e) {
        var a = [], n = !0, o = !1, i = void 0;
        try {
            for (var s, r = t[Symbol.iterator](); !(n = (s = r.next()).done) && (a.push(s.value), 
            !e || a.length !== e); n = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !n && r.return && r.return();
            } finally {
                if (o) throw i;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), o = t(require("../../../api/Ptag/Ptag_utils.js")), i = t(require("../../../api/Ptag/report_manager.js")), s = t(require("memory-paging")), r = require("../../../libs/promise.min.js"), d = require("../../components/pinbind/index"), u = require("../../components/sku_panel/sku_panel.js"), c = require("../../../common/fe_helper.js"), h = require("../../../common/toast/toast.js"), l = require("../../../models/cart/model.js"), f = require("../components/slide_handle/slide_handle.js"), g = require("../../page.js"), p = require("../../../common/biz.js"), m = require("../../../common/login/login.js"), v = new (require("../../../common/logger.js"))("购物车"), I = require("../../../common/user_info.js"), P = require("../../../common/cookie-v2/cookie.js"), C = require("../components/editbar/index"), y = (require("../../../common/localStorage.js"), 
require("../../../common/fe_report/speed")), k = getApp(), _ = k.bRenderCb, w = !1, T = null, S = !1, D = [], x = "top", N = !1, O = 110;

module.exports = {
    init: function() {
        new g({
            components: {
                slideHandle: f,
                pinbind: d,
                skupanel: u,
                editbar: C
            },
            data: {
                scrollIntoView: x,
                viewDidLoad: !1,
                loading: !0,
                MIN_NUM: 1,
                MAX_NUM: 200,
                shouldShowInputMask: !1,
                venders: [],
                summary: {},
                extra: {
                    vendersName: {
                        8888: {
                            name: "京东自营",
                            icon: "type_jd"
                        },
                        8899: {
                            name: "京东全球购自营",
                            icon: "type_jd"
                        }
                    },
                    stock: {},
                    ybServices: {},
                    locShopsName: {}
                },
                showQuickCleanButton: !1,
                addressOpts: {
                    show: !1,
                    list: []
                },
                version: ""
            },
            onNavigate: function(t) {
                t.page, t.url, t.params, S = !0, T = this.loadData();
            },
            onPreLoad: function() {
                this.getHeadData().then(function(t) {
                    w = !0, D = t;
                });
            },
            getHeadData: function() {
                return this.loadData();
            },
            onLoad: function() {
                this.startTime = Date.now(), this.gotoGiftList = c.throttle(this.gotoGiftList, 1e3), 
                this.gotoItemDetail = c.throttle(this.gotoItemDetail, 1e3), this.gotoPay = c.throttle(this.gotoPay, 1e3), 
                this.gotoShopPage = c.throttle(this.gotoShopPage, 1e3), this.onPageScroll = c.throttle(this.onPageScroll, 500), 
                this.on("confirmSkuPanel", this.replaceProduct), this.enablePaging = !0, this.enableNewTheme();
            },
            onPageScroll: function(t) {
                var e = (t.scrollTop || (t.detail ? t.detail.scrollTop : 0)) > (1 * k.systemInfo.screenHeight || 667);
                this.setData({
                    back2topVisabled: e
                });
            },
            back2top: function() {
                this.setData({
                    scrollIntoView: "top"
                }), wx.pageScrollTo({
                    scrollTop: 0
                });
            },
            enableQuickClear: function(t) {
                this.setData({
                    showQuickCleanButton: t >= 10
                }), i.default.addPtagExposure("7014.29.28");
            },
            enableNewTheme: function() {
                var t = this;
                return p.getPPMS(28656).then(function(e) {
                    var a = e.find(function(t) {
                        return "wxapp_cart_theme_abtest" == t.grayName;
                    }) || {}, n = "1" === a.grayIsOpen, o = +a.grayFil || 0, i = P.getCookie("visitkey"), s = P.getCookie("jdpin"), d = i.length;
                    if (!a || !n || !d) return r.resolve(!1);
                    var u = +i.slice(i.length - 2), c = a.grayWhiteName.includes(s), h = 100 === o || o >= u || c;
                    return h && t.setData({
                        version: "abtest"
                    }), r.resolve(h);
                }).catch(function(t) {
                    return v.error(t);
                });
            },
            onHeadScreenShow: function() {
                var t = this;
                if (w) {
                    w = !1;
                    var a = D, n = new s.default({
                        data: a.venders
                    }).group(), o = n.head;
                    n.last, a.venders = o, Object.assign(this.data, a, {
                        viewDidLoad: !0,
                        hasError: !1,
                        loading: !1,
                        address: e()
                    });
                    var i = Date.now();
                    this.setData(this.data, function() {
                        t.spdReport(11, Date.now() - i), v.debug("head render time:", Date.now() - i);
                    });
                }
            },
            onShow: function() {
                var t = this;
                this.onHeadScreenShow(), this.setLoadingState(1), (T || this.loadData()).then(this.render).then(this.loadExtraData).then(this.renderVendersName).catch(function(e) {
                    v.error(e), T = null, t.setLoadingState(0), t.data.viewDidLoad ? h.show({
                        icon: h.ICON.WARNING,
                        content: e.message || "网络繁忙，请稍候再试"
                    }) : t.showPageErrTips();
                });
            },
            getVenderICONCls: function(t) {
                var e = t.isCommonGoodShop, a = t.isCategoryGoodShop;
                return e = 1 == e, a = 1 == a, e && a ? "type_good" : e ? "type_good" : a ? "type_cate_good" : "type_3rd";
            },
            onHide: function() {
                this.setData({
                    coupons: {
                        list: []
                    },
                    promotion: {
                        list: []
                    },
                    switchPriceOpts: {
                        show: !1
                    },
                    addressOpts: {
                        show: !1
                    },
                    quickClearOptions: {
                        show: !1
                    }
                });
            },
            renderVendersName: function() {
                var t = this, e = [], a = this.data.extra, n = a.vendersName, o = a.locShopsName;
                l.getVenders().forEach(function(t) {
                    "type_3rd" == t.icon && !n[t.vid] && e.push(t.vid);
                }), l.getVendersName(e).then(function(e) {
                    var a = e.venInfos, i = e.locShops;
                    a.forEach(function(e) {
                        n[e.vid] = {
                            name: e.shopname,
                            icon: t.getVenderICONCls(e)
                        };
                    }), i.forEach(function(t) {
                        o[t.id] = t.name;
                    }), t.setData({
                        "extra.vendersName": n,
                        "extra.locShopsName": o
                    });
                });
            },
            loadExtraData: function() {
                var t = this;
                return r.all([ l.getStock(), l.getAssist(), l.getYbItems() ]).then(function(e) {
                    var o = a(e, 4), s = o[0], d = o[1], u = o[2];
                    return o[3], Object.assign(t.data.extra, {
                        stock: s.stock,
                        spec: s.spec,
                        margins: d.margin,
                        ybServices: u
                    }), t.setData({
                        extra: t.data.extra,
                        quickClearOptions: {
                            stock: s.stock,
                            reload: !0
                        }
                    }), Object.keys(s.stock).length && i.default.addPtagExposure(n.CART_SIMILAR), Object.keys(u).length && i.default.addPtagExposure(n.CART_SERVICES), 
                    r.resolve();
                }, function(t) {
                    v.debug(t);
                });
            },
            loadData: function() {
                var t = this;
                return m.getLoginPromise().then(function() {
                    var e = Date.now();
                    return l.getCartView().then(function(a) {
                        return S ? t.spdReport(4, Date.now() - e) : t.speedMark(4), !_ && t.speedReport(), 
                        a;
                    });
                });
            },
            render: function(t) {
                var a = this;
                if (T = null, this.enableQuickClear(t.summary.skuNum), this.components.editbar.loadData(Object.assign({}, t)), 
                this.data.editor && this.data.editor.editable && (0 === t.venders.length ? Object.assign(t, {
                    editor: {
                        editable: !1
                    }
                }) : Object.assign(t, {
                    editor: {
                        editable: !0,
                        checked: !1
                    }
                })), this.enablePaging) {
                    var n = new s.default({
                        data: t.venders
                    }).group(), o = n.head, i = (n.last, t.venders);
                    t.venders = o, setTimeout(function() {
                        var e = Date.now();
                        a.renderVendersName(), a.setData({
                            venders: i
                        }, function() {
                            a.showVenderCoupons(), a.speedReport(), a.skuNumReport(t.summary.skuNum, Date.now() - e), 
                            v.debug("second render time:", Date.now() - e);
                        });
                    }, 1e3), this.enablePaging = !1;
                }
                Object.assign(this.data, t, {
                    viewDidLoad: !0,
                    hasError: !1,
                    loading: !1,
                    address: e()
                }), x && "top" !== x && Object.assign(this.data, {
                    scrollIntoView: x
                });
                var d = Date.now();
                return this.setData(this.data, function() {
                    a.reported1st || (a.spdReport(5, Date.now() - d), a.reported1st = !0), v.debug("render time:", Date.now() - d);
                }), this.exReport(t), r.resolve(t);
            },
            spdReport: function(t, e) {
                var a = getCurrentPages().pop(), n = {
                    "pages/cart/cart/index": 600,
                    "pages/cart/cart/cart": 1035
                }[a ? a.route : ""], o = {};
                n && (o["s" + t] = e, y.reportAlone(n, o));
            },
            skuNumReport: function(t, e) {
                function a(t, e, a) {
                    return e <= t && t <= a;
                }
                t <= 0 || (a(t, 1, 3) ? this.spdReport(12, e) : a(t, 4, 5) ? this.spdReport(13, e) : a(t, 6, 10) ? this.spdReport(14, e) : a(t, 11, 20) ? this.spdReport(15, e) : this.spdReport(16, e));
            },
            onExclusivePricePayReport: function() {
                var t = this;
                setTimeout(function() {
                    var e = -1;
                    t.data.venders.every(function(t) {
                        return t.list.every(function(t) {
                            return -1 === (e = t.products.findIndex(function(t) {
                                return 1 == t.checkType && t.isExclusivePrice > 0;
                            }));
                        });
                    }), -1 != e && o.default.addPtag(n.CART_EXCLUSIVE_PRICE_PAY);
                }, 0);
            },
            exReport: function(t) {
                setTimeout(function() {
                    var e = {
                        jgj: 0,
                        mz: 0,
                        mh: 0,
                        gift3c: 0,
                        addonItem: 0,
                        exclusivePrice: 0
                    };
                    0 === t.venders.length ? i.default.addPtagExposure(n.CART_EMPTY_PV) : (i.default.addPtagExposure(n.CART_PV), 
                    t.venders.forEach(function(t) {
                        e.jgj || -1 != t.list.findIndex(function(t) {
                            return 4 == t.polyType && +t.addMoney > 0;
                        }) && (i.default.addPtagExposure(n.CART_JGJ), e.jgj = 1), e.mz || -1 != t.list.findIndex(function(t) {
                            return 4 == t.polyType && 0 == +t.addMoney;
                        }) && (i.default.addPtagExposure(n.CART_MZ), e.mz = 1), e.mh || -1 != t.list.findIndex(function(t) {
                            return 4 == t.polyType && 24 == t.fullType;
                        }) && (i.default.addPtagExposure(n.CART_MH), e.mh = 1), e.gift3c || -1 != t.list.findIndex(function(t) {
                            return -1 != t.products.findIndex(function(t) {
                                return t.gifts && t.gifts.listGiftPools.length;
                            });
                        }) && (i.default.addPtagExposure(n.CART_3C_GIFT), e.gift3c = 1), e.addonItem || -1 != t.list.findIndex(function(t) {
                            return (t.actLineTitle || "").includes("去凑单");
                        }) && (i.default.addPtagExposure(n.CART_ADDON_ITEM), e.addonItem = 1), e.exclusivePrice || -1 != t.list.findIndex(function(t) {
                            return -1 !== t.products.findIndex(function(t) {
                                return t.isExclusivePrice > 0;
                            });
                        }) && (i.default.addPtagExposure(n.CART_EXCLUSIVE_PRICE), e.exclusivePrice = 1);
                    }));
                }, 0);
            },
            refresh: function(t) {
                this.onShow();
            },
            onRecommendAfterAdd2Cart: function(t) {
                var e = t.detail;
                e.success && (x = e.domId, this.refresh());
            },
            onRecommendClick: function(t) {
                !(this.data.venders && this.data.venders.length) && i.default.addPtagExposure("7014.18.42");
            },
            onRecommendReady: function(t) {
                var e = this, a = t.detail, n = setInterval(function() {
                    if (!1 === e.data.loading) {
                        clearInterval(n);
                        var t = e.data.venders && e.data.venders.length, o = a.recList[t ? 1 : 0].recid;
                        o && e.setData({
                            recommendOptions: {
                                recommendId: o,
                                skus: l.getAllSkuId().join(",")
                            }
                        });
                    }
                }, 100);
            },
            onCheck: function(t) {
                var e = this, a = t.currentTarget.dataset, i = a.type, s = a.venderId, r = a.venderIndex, d = a.itemIndex, u = a.itemId, c = a.skuId, f = a.checked, g = a.polyType, p = {
                    type: i,
                    venderId: s,
                    polyType: g
                }, m = f ? "uncheckCmdy" : "checkCmdy";
                o.default.addPtag("all" == i ? n.CART_CHECK_ALL : n.CART_CHECK), this.setLoadingState(1), 
                "all" === i && this.setData({
                    "summary.checked": !f
                }), "shop" === i && Object.assign(p, {
                    venders: e.data.venders
                }), "product" === i && Object.assign(p, 2 == g ? l.findItemById(u) : l.findProductBy(u, c)), 
                this.renderVendersName();
                var I = Date.now();
                l[m](p).then(function(t) {
                    if (v.debug("接口用时：", Date.now() - I), "all" === i) ; else if ("shop" === i) t["venders[" + r + "]"] = t.venders[0], 
                    t["venders[" + r + "].checked"] = t.venders[0].checked, delete t.venders; else {
                        if (!t.venders.length) return void e.setLoadingState(0);
                        t["venders[" + r + "].list[" + d + "]"] = t.venders[0].list[0], t["venders[" + r + "].checked"] = t.venders[0].checked, 
                        delete t.venders;
                    }
                    var a = Date.now();
                    e.setData(t), e.showAddOnItemByVender(), v.debug("setData:", Date.now() - a), e.setLoadingState(0);
                }).catch(function(t) {
                    e.setLoadingState(0), h.show({
                        icon: h.ICON.WARNING,
                        content: t.message
                    });
                });
            },
            onEditChecked: function(t) {
                var e = t.currentTarget.dataset, a = e.type, n = (e.venderIndex, e.checked), o = (e.itemIndex, 
                e.itemId, e.skuId, !n);
                "shop" === a ? this.components.editbar[o ? "select" : "unselect"](C.OP.VENDER, t.currentTarget.dataset) : "product" === a ? this.components.editbar[o ? "select" : "unselect"](C.OP.PRODUCT, t.currentTarget.dataset) : "all" === a && this.components.editbar[o ? "select" : "unselect"](C.OP.ALL, t.currentTarget.dataset);
            },
            onDeleteGift: function(t) {
                var e = this, i = t.currentTarget.dataset.extend.split(","), s = a(i, 4), r = s[0], d = s[1], u = s[2], c = s[3], f = l.findItemById(r);
                v.debug("--mainSku--", r, d, u, c), f.mainSku = {
                    id: d
                }, f.__type = 1;
                var g = this;
                wx.showModal({
                    content: "是否确认删除此商品？",
                    confirmColor: "#E93B3D",
                    success: function(t) {
                        t.confirm && (e.setLoadingState(!0), l.rmvCmdy(f).then(function(t) {
                            var e = {};
                            g.setLoadingState(!1), e["venders[" + u + "].list[" + c + "]"] = t.venders[0].list[0], 
                            e.summary = t.summary, g.setData(e);
                        }).catch(function(t) {
                            g.setLoadingState(0), h.show({
                                icon: h.ICON.WARNING,
                                content: t.toString()
                            });
                        }), o.default.addPtag(n.CART_DELETE));
                    }
                });
            },
            onDelete: function(t) {
                var e = t.currentTarget.dataset, a = e.vid, i = e.extend, s = i.polyType, r = 2 == s || 2 != s && i.vSkuId, d = this;
                wx.showModal({
                    content: "是否确认删除此" + (r ? "套装商品？" : "商品？"),
                    confirmColor: "#E93B3D",
                    success: function(t) {
                        t.confirm && (d.setLoadingState(!0), l.rmvCmdy(i).then(function(t) {
                            d.setLoadingState(!1), t["editor.checked"] = !1, d.components.editbar.loadData(t), 
                            d.setData(t), d.renderVendersName(), l.removeProductsCache({
                                vid: a,
                                itemId: i.itemId,
                                skuId: i.vSkuId || i.mainSku.id
                            }), d.showVenderCoupons();
                        }).catch(function(t) {
                            d.setLoadingState(0), h.show({
                                icon: h.ICON.WARNING,
                                content: t.toString()
                            });
                        }), o.default.addPtag(n.CART_DELETE));
                    }
                });
            },
            onCouponDrawAfter: function(t) {
                var e = t.detail.currentTarget.dataset, a = e.vid, n = e.key, o = this.extraCoupons[a];
                if (o) {
                    var i = o.coupoVo.find(function(t) {
                        return t.encryptedKey === n;
                    });
                    i && (i.couponDo = "2");
                }
            },
            onCouponClose: function(t) {
                this.setData({
                    coupons: {
                        list: []
                    }
                });
            },
            onAddressChange: function(t) {
                var e = this, a = t.detail;
                l.getAddressList().then(function(t) {
                    var n = t.find(function(t) {
                        return t.adid == a;
                    }), o = [ n.provinceId, n.cityId, n.countyId, n.townId ].join("_"), i = [ n.provinceName, n.cityName, n.countyName, n.townName ].join("_"), s = [ a, o, i, n.addrfull, [ n.type, n.longitude, n.latitude ].join(",") ].join("|");
                    e.setData({
                        address: n.addrfull
                    }), I.updateAddress({
                        wq_addr: s
                    }), l.getStock().then(function(t) {
                        e.setData({
                            "extra.stock": t.stock,
                            "quickClearOptions.stock": t.stock
                        });
                    });
                });
            },
            onAddressPanelClose: function(t) {
                this.setData({
                    addressOpts: {
                        show: !1
                    }
                });
            },
            showSwitchPrices: function(t) {
                var e = t.currentTarget.dataset, a = e.itemId, n = e.sku, o = l.findProductBy(a, n);
                o && this.setData({
                    switchPriceOpts: {
                        show: !0,
                        price: o.jdPrice,
                        plus_price: o.showPlusPrice,
                        isPlusPrice: o.isPlusPrice,
                        itemId: a,
                        sku: n
                    }
                });
            },
            onSwitchPricePanelClose: function(t) {
                this.setData({
                    switchPriceOpts: {
                        show: !1
                    }
                });
            },
            onSwitchPriceSelected: function(t) {
                var e = this, a = t.detail.currentTarget.dataset, n = a.itemId, o = a.sku, i = a.name, s = l.findProductBy(n, o), r = "plus" === i;
                if (!s) return this.onSwitchPricePanelClose(t);
                s.beanOrPlusPromoId = r ? -1 : -101, this.onSwitchPricePanelClose(t), this.setLoadingState(1), 
                l.modifyCmdyPromo(s).then(function(t) {
                    Object.assign(t, {
                        loading: 0,
                        scrollIntoView: "sku_" + o + "_" + n
                    }), e.setData(t), e.renderVendersName();
                }).catch(function(t) {
                    e.setLoadingState(0), h.show({
                        icon: h.ICON.WARNING,
                        content: t.message
                    });
                });
            },
            onPromoSelected: function(t) {
                var e = this, a = t.detail.currentTarget.dataset, i = a.itemId, s = a.skuId, r = a.vid, d = a.pid, u = l.findProductBy(i, s), c = this.data.extra.ybServices[s] || [], f = this.data.extra.ybServices[s + "_" + i] || [], g = !1, p = {
                    ybServices: {}
                }, m = ![ "-100", "-300" ].includes(d);
                u ? (o.default.addPtag(m ? n.CART_SWITCH_PROMOTION : n.CART_PROMOTION_OUT), u.pid = d, 
                this.setLoadingState(1), l.modifyCmdyPromo(u).then(function(t) {
                    l.removeProductsCache({
                        vid: r,
                        itemId: i,
                        skuId: s
                    }), e.setLoadingState(0), Object.assign(t, {
                        scrollIntoView: "sku_" + s + "_" + (-1 != [ "-100", "-300" ].indexOf(d) ? s : d)
                    }), c.length ? (p.ybServices[s] = c, g = !0) : f.length && (g = !0, p.ybServices[s + "_" + u.pid] = f), 
                    g && Object.assign(t, {
                        extra: p
                    }), t["editor.checked"] = !1, Object.assign(t, {
                        promotion: {
                            list: []
                        }
                    }), e.setData(t), e.data.scrollIntoView = "", e.renderVendersName(), e.components.editbar.loadData(t);
                }).catch(function(t) {
                    e.setData({
                        loading: 0,
                        promotion: {
                            list: []
                        }
                    }), h.show({
                        icon: h.ICON.WARNING,
                        content: t.message
                    });
                })) : this.setData({
                    promotion: {
                        list: []
                    }
                });
            },
            onUseJDBean: function(t) {
                var e = this, a = t.currentTarget.dataset, i = a.itemId, s = a.skuId, r = l.findProductBy(i, s), d = +l.getBalanceBeans();
                if (r) {
                    var u = 0 == r.isUsedJBeanPromo, c = "";
                    if (r.pid = u ? r.jdBeanPromo.promoId : "0", r.beanOrPlusPromoId = u ? r.jdBeanPromo.promoId : -1, 
                    c = u ? "兑换优惠成功，单个商品已优惠" + r.jdBeanPromo.discount / 100 + "元" : "取消兑换成功，京豆已返还到您的账户上", 
                    u && d < +r.jdBeanPromo.needJdBeanNum) return h.show({
                        icon: h.ICON.ERROR,
                        content: "您的京豆余额不足，无法参加活动"
                    });
                    o.default.addPtag(u ? n.CART_USE_JDBEAN_SUBMIT_CLK : n.CART_USE_JDBEAN_CANCE_CLK), 
                    this.setLoadingState(1), l.modifyCmdyPromo(r).then(function(t) {
                        Object.assign(t, {
                            loading: 0,
                            scrollIntoView: "sku_" + s + "_" + i
                        }), N = u, e.setData(t), e.renderVendersName(), h.show({
                            icon: h.ICON.SUCCESS,
                            content: c
                        });
                    }).catch(function(t) {
                        e.setLoadingState(0), h.show({
                            icon: h.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            },
            tapOnPromotion: function(t) {
                o.default.addPtag(n.CART_CLICK_PROMOTION);
                var e = t.currentTarget.dataset, a = e.itemId, i = e.skuId, s = e.vid, r = l.findProductBy(a, i);
                this.data.extra.ybServices[i], this.data.extra.ybServices[i + "_" + a], r && r.selectPromotion.list.length && this.setData({
                    promotion: {
                        itemId: a,
                        skuId: i,
                        vid: s,
                        list: r.selectPromotion.list
                    }
                });
            },
            showInputMask: function() {
                this.setData({
                    shouldShowInputMask: !0
                });
            },
            hideInputMask: function() {
                this.setData({
                    shouldShowInputMask: !1
                });
            },
            gotoGiftList: function(t) {
                var e = t.currentTarget.dataset, a = e.vid, i = e.cate, s = e.pid, r = e.sku, d = void 0 === r ? "" : r, u = e.itemId, c = e.text, h = void 0 === c ? "" : c, f = e.title, g = void 0 === f ? "" : f, p = e.type, m = e.fulltype, v = l.findItemById(u), I = "", P = v.products.length ? v.products[0] : v.suits.length ? v.suits[0] : {
                    selectPromotion: {
                        value: g
                    }
                };
                if (4 == i && "24" !== m && v ? I = +v.addMoney > 0 ? 2 : 1 : 3 == i && (I = 0), 
                "去凑单" == h || "查看活动" == h) "去凑单" == h && o.default.addPtag(n.CART_ADDON_ITEM_CLK), 
                this.$goto("/pages/search/subPackages/sales/sales", {
                    tips: P.selectPromotion.value,
                    actId: s,
                    promoType: I,
                    type: p,
                    gifts: l.getManGiftSkus(u)
                }); else {
                    if ("24" === m) return o.default.addPtag(n.CART_MH_CLK), this.$goto("../exchange/index", {
                        activityId: s,
                        from: "cart"
                    });
                    if (3 == p ? o.default.addPtag(n.CART_3C_GIFT_CLK) : o.default.addPtag(n.CART_JGJ_CLK), 
                    3 == p) return this.$goto("../gift/gift", {
                        vid: a,
                        cate: i,
                        pid: s,
                        sku: d,
                        type: p,
                        itemId: u
                    });
                    this.$goto("/pages/search/subPackages/sales/sales", {
                        tips: P.selectPromotion.value,
                        actId: s,
                        promoType: I,
                        type: p,
                        sku: d
                    });
                }
            },
            gotoCuoponPromotion: function(t) {
                var e = t.currentTarget.dataset, a = e.batchId, i = e.couponKind, s = 0 == i ? "/pages/cate/cate" : "/pages/search/subPackages/coupon/coupon";
                0 != i && o.default.addPtag(n.CART_COUPON_ADDON_CLK), this.$goto(s, {
                    batch: a
                });
            },
            gotoItemDetail: function(t) {
                if (!this.data.editor || !this.data.editor.editable) {
                    var e = t.currentTarget.dataset, a = e.sku, i = {
                        sku: a,
                        cover: e.cover,
                        name: e.name,
                        price: e.price / 100,
                        cartlocation: e.cartlocation
                    }, s = l.findProductBySkuId(a), r = !!s && 1 == s.mainSku.isPinGouGoods, d = !!s && 1 == s.mainSku.isJdJx;
                    return o.default.addPtag(n.CART_GOTO_DETAIL), r ? this.$goto("/pages/pingou/item/item", i) : d ? this.$goto("/pages/h5/index", {
                        url: "https://wqitem.jd.com/item/view?sku=" + a
                    }, {
                        skipSwitchUrl: !0
                    }) : this.$goto("/pages/item/detail/detail", i);
                }
            },
            gotoGiftDetail: function(t) {
                var e = t.currentTarget.dataset, a = {
                    sku: e.sku,
                    cover: e.cover,
                    name: e.name,
                    price: e.price / 100
                };
                o.default.addPtag(n.CART_GOTO_GIFT_DETAIL), this.$goto("/pages/item/detail/detail", a);
            },
            gotoAttchDetail: function(t) {
                var e = t.currentTarget.dataset, a = {
                    sku: e.sku,
                    cover: e.cover,
                    name: e.name,
                    price: e.price / 100
                };
                o.default.addPtag(n.CART_GOTO_ATTACH_DETAIL), this.$goto("/pages/item/detail/detail", a);
            },
            gotoShopPage: function(t) {
                var e = t.currentTarget.dataset, a = e.type, n = e.vid, o = e.name;
                "type_3rd" == a && o && this.$goto("/pages/store/index/index", {
                    venderId: n,
                    shopName: o
                });
            },
            showSwitchAddressPanel: function(t) {
                var e = this;
                o.default.addPtag(n.CART_ADDR_CLK), this.setLoadingState(1), l.getAddressList().then(function(t) {
                    var a = P.getCookie("wq_addr").split(/\|/), n = a[0], o = a[1];
                    e.setData({
                        addressOpts: {
                            show: !0,
                            list: t,
                            adid: n,
                            areaid: o
                        },
                        loading: 0
                    });
                }).catch(function(t) {
                    v.error(t), e.setLoadingState(0), h.show({
                        icon: h.ICON.ERROR,
                        content: "获取地址数据\b\b失败了，请稍后再试"
                    });
                });
            },
            showQuickClearPanel: function(t) {
                i.default.addPtagExposure("7014.29.13"), this.setData({
                    quickClearOptions: {
                        show: !0
                    }
                });
            },
            onQuickClearPanelClose: function(t) {
                var e = t.detail, a = e.needRefresh, n = e.clearAll;
                this.setData({
                    quickClearOptions: {
                        show: !1
                    },
                    showQuickCleanButton: !n
                }), a && this.refresh();
            },
            doEdit: function(t) {
                var e = t.currentTarget.dataset.editable, a = {};
                a["editor.editable"] = !e, a["editor.checked"] = !1, e ? this.components.editbar.unselect(C.OP.ALL) : this.data.showQuickCleanButton && (i.default.addPtagExposure("7014.29.12"), 
                i.default.addPtagExposure("7014.29.11")), this.setData(a), !e && o.default.addPtag(n.CART_EDIT_CLK);
            },
            onPayCheck: function(t) {
                var e = t.currentTarget.dataset.index;
                this.data.summary.details.forEach(function(t, a) {
                    t.checked = e === a;
                }), this.setData({
                    "summary.details": this.data.summary.details
                });
            },
            hideConfirmPay: function() {
                this.setData({
                    showPay: !1
                });
            },
            showConfirmPay: function() {
                if (this.data.summary.details.length > 1) return this.setData({
                    showPay: !0
                });
                this.gotoPay();
            },
            gotoPay: function() {
                var t = this.data.summary.details.length ? this.data.summary.details.find(function(t) {
                    return !0 === t.checked;
                }) : {
                    category: "other",
                    checkedSkuCount: +this.data.summary.checkedSkuCount
                }, e = {
                    category: t.category,
                    checkedSkuCount: t.checkedSkuCount
                };
                if (this.hideConfirmPay(), o.default.addPtag(n.CART_GOTO_PAY, {
                    num: this.data.summary.checkedNum,
                    price: this.data.summary.price
                }), t.checkedSkuCount > O) return wx.showModal({
                    title: "勾选商品太多啦",
                    content: "单次结算商品不能超过110种，请重新选择结算商品",
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: "#e93b3d"
                });
                if (N && o.default.addPtag(n.CART_USE_JDBEAN_PAY_CLK), this.onExclusivePricePayReport(), 
                "otcdrug" === e.category) {
                    var a = encodeURIComponent(P.getCookie("wq_addr"));
                    return this.$goto("/pages/h5/index", {
                        url: "https://wqs.jd.com/order/s_confirm_otc.shtml?wq_addr=" + a
                    });
                }
                this.$goto("/pages/pay/index/index", e);
            },
            gotoSharePage: function() {
                var t = P.getCookie("nickName");
                this.$goto("/pages/h5/index", {
                    url: "https://wqs.jd.com/my/cart/cart_share_v2.shtml?wxname=" + t
                });
            },
            gotoSimilarPage: function(t) {
                var e = t.currentTarget.dataset.sku;
                o.default.addPtag(n.CART_SIMILAR_CLK), this.$goto("/pages/h5/index", {
                    url: "https://wqs.jd.com/search/searchsimilar.shtml?sceneid=3&sku=" + e + "&ptag=" + n.CART_GOTO_SIMILAR_PAGE
                });
            },
            showPageErrTips: function() {
                this.setData({
                    hasError: !0
                });
            },
            showCouponsPanel: function(t) {
                var e = t.currentTarget.dataset.vid, a = this.extraCoupons[e].coupoVo;
                a.length && this.setData({
                    coupons: {
                        list: a,
                        vid: e
                    }
                });
            },
            showSkuPanel: function(t) {
                var e = t.currentTarget.dataset, a = e.sku, i = e.itemId, s = e.vid, r = l.findProductBy(i, a), d = +r.num || 1, u = r.mainSku;
                this.data.editor && this.data.editor.editable || u && !u.color || (o.default.addPtag(n.CART_SWITCH_SKU), 
                this.components.skupanel.showSkuPanel({
                    sku: a,
                    total: d,
                    price: r.jdPrice,
                    image: u.image,
                    numController: !0,
                    lowNum: u.lowestBuy,
                    others: {
                        originVid: s,
                        originSkuId: a,
                        originItemId: i
                    }
                }));
            },
            replaceProduct: function(t) {
                var e = this, a = t.others, i = a.originVid, s = a.originItemId, r = a.originSkuId;
                if (!a.fromCompGuessYouLike) {
                    o.default.addPtag(n.CART_SWITCH_SKU_SUBMIT);
                    var d = t.info.sku, u = l.findProductBy(s, r);
                    this.setLoadingState(1), l.replaceProduct(u, {
                        itemId: d,
                        polyType: "1",
                        mainSku: {
                            id: d
                        },
                        pid: "0",
                        num: t.num
                    }).then(function(t) {
                        return l.removeProductsCache({
                            vid: i,
                            itemId: s,
                            skuId: r
                        }), e.render(t);
                    }).then(this.loadExtraData).catch(function(t) {
                        e.setLoadingState(0), h.show({
                            icon: h.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            },
            showVenderCoupons: function() {
                var t = this;
                l.queryCoupon().then(function(e) {
                    e.length && (t.extraCoupons = {}, e.forEach(function(e) {
                        t.extraCoupons[e.vid] = e;
                    }), t.showAddOnItemByVender());
                });
            },
            showAddOnItemByVender: function() {
                function t(t, e, a) {
                    return e <= t && t <= a;
                }
                function e(e) {
                    var n = u.find(function(t) {
                        return t.vid == e;
                    }), i = a(e);
                    return n.coupoVo.filter(function(e) {
                        return 2 == e.couponDo && t(Date.now(), +e.beginTime, +e.endTime);
                    }).forEach(function(t) {
                        if ("0" == t.couponKind) t.total = o(i); else {
                            var e = [];
                            t.skuidlist.forEach(function(t) {
                                l.findProductBySkuId(t);
                                var a = i.find(function(e) {
                                    return e.products.find(function(e) {
                                        return 1 == e.checkType && e.mainSku.id == t;
                                    });
                                });
                                a && e.push(a);
                            }), t.total = o(e);
                        }
                    }), n;
                }
                function a(t) {
                    var e = [], a = c.find(function(e) {
                        return e.vid == t;
                    });
                    return u[t], a && (e = a.list.filter(function(t) {
                        return 1 == t.polyType ? 1 == t.products[0].checkType : 1 == t.checkType;
                    })), e;
                }
                function o(t) {
                    var e = 0;
                    return t.forEach(function(t) {
                        if (1 == t.polyType) t = t.products[0], e += t.price * t.num; else {
                            var a = t.num || 1;
                            e += t.promoPrice * a * 1e4 / 100;
                        }
                    }), e;
                }
                function s(t) {
                    t.vid;
                    var e = [], a = [], n = {};
                    if (t.coupoVo.forEach(function(t) {
                        t.total > 0 && (t.total >= t.quota ? e.push(t) : a.push(t));
                    }), e = e.sort(function(t, e) {
                        return e.quota - t.quota;
                    }), a = a.sort(function(t, e) {
                        return t.quota - e.quota;
                    }), e.length) {
                        var o = e[0];
                        n.pid = o.batchId, n.couponKind = o.couponKind, n.showPromotion = !1, n.addOnItemCoupon = "满" + o.quota / 100 + "减" + o.discount / 100, 
                        n.addOnItemText = "券已可用，去结算用券立减" + o.discount / 100 + "元", g = !1;
                    } else if (a.length) {
                        var i = a[0];
                        n.couponKind = i.couponKind, n.pid = i.batchId, n.showPromotion = !0, n.addOnItemCoupon = "满" + i.quota / 100 + "减" + i.discount / 100 + "元", 
                        n.addOnItemText = "还差￥" + (i.quota - i.total) / 100 + "元，该券可用", f = !1;
                    }
                    return n;
                }
                var r = this;
                this.extraCoupons || (this.extraCoupons = {});
                var d = this.extraCoupons, u = [], c = this.data.venders, h = {}, f = !0, g = !0;
                c.forEach(function(t) {
                    d[t.vid] && u.push(d[t.vid]);
                }), u.length && (this.data.extra.coupons = {}, u.forEach(function(t) {
                    var a = {};
                    a = s(t = e(t.vid)), r.data.extra.coupons[t.vid] = a;
                }), !g && i.default.addPtagExposure(n.CART_COUPON_ADDON_SUCCESS), !f && i.default.addPtagExposure(n.CART_COUPON_ADDON), 
                h["extra.coupons"] = this.data.extra.coupons, this.setData(h));
            },
            setLoadingState: function(t) {
                if ((arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    showNavBarLoading: !1
                }).showNavBarLoading && this.data.viewDidLoad) return t ? wx.showNavigationBarLoading() : wx.hideNavigationBarLoading(), 
                void this.setData({
                    loading: 0
                });
                this.setData({
                    loading: !!t
                });
            },
            add: function(t) {
                var e = t.currentTarget.dataset, a = e.venderIndex, n = e.itemIndex, o = e.polyType, i = e.itemId, s = e.skuId, r = Object.assign({
                    venderIndex: a,
                    itemIndex: n
                }, 2 == o ? l.findItemById(i) : l.findProductBy(i, s)), d = +r.num, u = d + 1;
                d < this.data.MAX_NUM && this.doUpdateNum(r, u);
            },
            sub: function(t) {
                var e = t.currentTarget.dataset, a = e.venderIndex, n = e.itemIndex, o = e.polyType, i = e.itemId, s = e.skuId, r = Object.assign({
                    venderIndex: a,
                    itemIndex: n
                }, 2 == o ? l.findItemById(i) : l.findProductBy(i, s)), d = +r.num, u = d - 1;
                d > (r.mainSku ? +r.mainSku.lowestBuy || this.data.MIN_NUM : this.data.MIN_NUM) && this.doUpdateNum(r, u);
            },
            updateNum: function(t) {
                var e = t.currentTarget.dataset, a = e.venderIndex, n = e.itemIndex, o = e.polyType, i = e.itemId, s = e.skuId, r = Object.assign({
                    venderIndex: a,
                    itemIndex: n
                }, 2 == o ? l.findItemById(i) : l.findProductBy(i, s)), d = +r.num, u = String(t.detail.value).trim(), c = u && /^\d*$/.test(u), f = c ? +u : d, g = Math.max(r.mainSku ? +r.mainSku.lowestBuy : this.data.MIN_NUM, this.data.MIN_NUM), p = null;
                if (this.hideInputMask(), !c) {
                    var m = {}, v = l.findItemById(i);
                    return m["venders[" + a + "].list[" + n + "]"] = v, void this.setData(m);
                }
                d !== f && (f < g ? g > 1 ? (p = "该商品最少需购买 " + g + " 件", f = d) : f = 1 : f > this.data.MAX_NUM && (p = "单款最多可买 " + this.data.MAX_NUM + " 件", 
                f = d), p && h.show({
                    icon: h.ICON.WARNING,
                    content: p
                }), this.doUpdateNum(r, f));
            },
            doUpdateNum: function(t, e) {
                var a = this;
                this.setLoadingState(!0);
                var i = Date.now();
                Object.assign(t, {
                    num: e
                }), l.modifyCmdyNum(t).then(function(e) {
                    if (a.setLoadingState(!1), v.debug("接口用时：", Date.now() - i), e.venders.length) {
                        e["venders[" + t.venderIndex + "].list[" + t.itemIndex + "]"] = e.venders[0].list[0], 
                        e["venders[" + t.venderIndex + "].checked"] = e.venders[0].checked, delete e.venders;
                        var n = Date.now();
                        a.setData(e), v.debug("setData:", Date.now() - n), a.showAddOnItemByVender();
                    }
                }).catch(function(t) {
                    v.error(t), a.setLoadingState(!1), h.show({
                        icon: h.ICON.WARNING,
                        content: t.message
                    });
                }), o.default.addPtag(n.CART_EDIT_NUM);
            },
            onSlideGiftStart: function(t) {
                var e = t.currentTarget.dataset, a = e.sku, n = e.tag, o = void 0 === n ? "" : n, i = e.cate, s = void 0 === i ? "" : i, r = this.data.slide;
                if (!("换购商品" != o && "加价购" != o || r.sku && 0 != r.x)) {
                    var d = t.touches[0];
                    this.pageX = d.pageX, this.pageY = d.pageY, r.sku = a, r.tag = o, r.cate = s;
                }
            },
            setOffset: function(t, e) {
                var a = this.data.slide;
                !a.sku || a.x == t && a.animated == e || (a.x = t, a.animated = !!e, this.setData({
                    slide: a
                }));
            },
            cancelBubble: function() {}
        });
    }
};
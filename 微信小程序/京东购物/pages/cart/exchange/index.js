function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    u.show({
        content: t.errMsg || t.errmsg || "网络错误",
        icon: u.ICON.WARNING
    });
}

var i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), o = t(require("../../../api/Ptag/Ptag_utils.js")), a = t(require("../../../api/Ptag/report_manager.js")), c = require("../../page.js"), r = require("../../../models/search/search_coupon.js"), s = require("../../../models/search/search_result.js"), n = require("../../../common/fe_helper.js"), d = require("../../../libs/promise.min.js"), h = require("../../../common/modal/modal"), u = require("../../../common/toast/toast"), f = getApp().debug("满件换购");

new c({
    data: {
        sku: {
            id: 0,
            img: "",
            name: ""
        },
        loading: !0,
        pageCount: 0,
        pageIndex: 1,
        isInCart: !1,
        categoryId: 0,
        itemList: [],
        categoryList: [],
        checkGoodsCount: 0,
        checkGoodsSum: 0,
        checkGoodsList: [],
        showLayer: !1,
        wxSearchFlag: 0
    },
    onLoad: function(t) {
        var e = t.activityId, i = t.from, o = void 0 === i ? "" : i, a = t.name, c = void 0 === a ? "" : a, r = t.img, s = void 0 === r ? "" : r, d = t.skuId, h = void 0 === d ? 0 : d, u = t.wxSearchFlag, f = void 0 === u ? 0 : u;
        this.activityId = e, this.from = o, this.setData({
            sku: {
                name: c,
                img: s,
                id: h
            },
            wxSearchFlag: f
        }), this.init(), n.throttle(this.addToCart.bind(this), 1e3), n.throttle(this.switchCategory.bind(this), 500);
    },
    onShow: function() {
        a.default.addPtagExposure(i.CART_MH_PV);
    },
    fetchCategoryData: function(t) {
        var e = {
            activity_id: t
        };
        return new d(function(t, i) {
            r.getFilterData(e, function(e, o) {
                e ? i(e) : t(o);
            });
        });
    },
    fetchGoodsListData: function(t, e, i, o) {
        var a = {
            activity_id: t,
            page: e,
            catid: {
                id: i
            },
            isFirstLoad: o
        };
        return new d(function(t, e) {
            r.getSearchResult(a, function(i, o) {
                i ? e(i) : t(o);
            });
        });
    },
    popSuccModal: function() {
        var t = this, e = this.data, a = e.isInCart, c = e.checkGoodsCount, r = e.sku, s = e.wxSearchFlag, n = void 0;
        if ("cart" === this.from) return o.default.addPtag(i.CART_MH_SUBMIT), void wx.navigateBack();
        n = a ? 1 == s ? {
            title: "换购成功",
            content: c + "件换购商品已加入购物车",
            showCancel: !1,
            confirmText: "返回商品详情",
            success: function() {
                wx.navigateBack();
            }
        } : {
            title: "换购成功",
            content: c + "件换购商品已加入购物车",
            confirmColor: "#E93B3D",
            confirmText: "去购物车",
            showCancel: !0,
            cancelText: "返回商品详情",
            success: function() {
                t.$goto("/pages/cart/cart/cart");
            },
            fail: function() {
                wx.navigateBack();
            }
        } : 1 == s ? {
            sku: r,
            checkGoodsCount: c,
            title: "换购成功",
            content: "",
            align: "left",
            showCancel: !1,
            confirmText: "返回商品详情",
            success: function() {
                wx.navigateBack();
            }
        } : {
            sku: r,
            checkGoodsCount: c,
            title: "换购成功",
            content: "",
            align: "left",
            confirmColor: "#E93B3D",
            confirmText: "去购物车",
            showCancel: !0,
            cancelText: "返回商品详情",
            success: function() {
                t.$goto("/pages/cart/cart/cart");
            },
            fail: function() {
                wx.navigateBack();
            }
        }, h.show(n);
    },
    addToCart: function() {
        var t = this, e = this.data, i = e.sku, o = e.checkGoodsList, a = [], c = 0 == i.id ? "" : i.id;
        o.forEach(function(t) {
            a.push(t.wareid);
        }), a.length ? r.hgAddCart(c, a, function(e, i) {
            if (e) {
                console.log("err", e);
                var o = e.errMsg ? e.errMsg : "加车失败";
                u.show({
                    icon: u.ICON.WARNING,
                    content: o + "（" + e.errCode + "）",
                    page: t
                });
            } else i && t.popSuccModal();
        }) : u.show({
            icon: u.ICON.WARNING,
            content: "请选择换购商品",
            page: this
        });
    },
    showLayer: function(t) {
        if (t) {
            if (t.currentTarget.dataset.count > 0) {
                var e = this.data.showLayer;
                this.setData({
                    showLayer: !e
                }), o.default.addPtag(i.CART_MH_SELECTION);
            }
        } else {
            var a = this.data.showLayer;
            this.setData({
                showLayer: !a
            });
        }
    },
    init: function(t) {
        var i = this, o = this.data, a = o.pageIndex, c = o.sku, r = this.activityId;
        0 === c.id ? (this.cartView("", r).then(function() {
            i.getGoodsList(a, "", !0, !0);
        }).catch(function(t) {
            e(t);
        }), this.setData({
            isInCart: !0
        })) : this.cartView(c.id, r).then(function() {
            i.getGoodsList(a, "", !0, !0);
        }).catch(function(t) {
            wx.showModal({
                title: "提示",
                content: "对不起，暂无可换购商品",
                showCancel: !1,
                confirmText: "返回",
                confirmColor: "#e93b3d",
                success: function(t) {
                    wx.navigateBack();
                }
            });
        });
    },
    cartView: function(t, e) {
        var i = this;
        return new d(function(o, a) {
            r.getCartview(t, e, function(e, c) {
                if (!e) {
                    var r = !t || c.isInCart, s = c.giftSkus, d = i.data, h = d.checkGoodsList, u = d.checkGoodsSum, f = d.checkGoodsCount;
                    return s.forEach(function(t) {
                        var e = void 0;
                        e = t.promoPrice != t.price, h.push({
                            showDredisprice: e,
                            warename: t.name,
                            imageurl: n.getImg(t.image),
                            wareid: t.id,
                            dredisprice: +t.price / 100,
                            eredisprice: (+t.promoPrice / 100).toFixed(2).split("."),
                            price: (+t.promoPrice / 100).toFixed(2),
                            checked: !0
                        }), u += Number((+t.promoPrice / 100).toFixed(2));
                    }), f = h.length, u = parseFloat(u).toFixed(2), i.setData({
                        isInCart: r,
                        checkGoodsList: h,
                        checkGoodsSum: u,
                        checkGoodsCount: f
                    }), o();
                }
                return a(e);
            });
        });
    },
    checkGift: function(t) {
        var e = this.data.checkGoodsList;
        t.forEach(function(t) {
            e.forEach(function(e) {
                t.wareid === e.wareid && (t.checked = !0);
            });
        });
    },
    getGoodsList: function(t, e, i, o) {
        var a = this, c = this.activityId;
        this.getGoodFlag = !0, this.fetchGoodsListData(c, t, e, o).then(function(e) {
            var o;
            if (f("【满件换购】fetchGoodsListData", e), 1 == t && a.setData({
                loading: !1
            }), a.getGoodFlag = !1, e.cid2List && e.cid2List.length) {
                var c = e.cid2List[0].childs;
                c.unshift({
                    id: 0,
                    name: "全部"
                }), a.categoryList = c, a.setData({
                    categoryList: c
                });
            }
            var r = +e.pageCount, d = [], h = [], u = a.data.itemList;
            i && (u = []), t++, e.itemList.forEach(function(t) {
                h.push(t.wareid);
                var e = void 0;
                t.eredisprice = Number(t.eredisprice || 0).toFixed(2), e = !(t.dredisprice <= t.eredisprice), 
                +t.dredisprice <= 0 && (t.dredisprice = ""), +t.eredisprice <= 0 && (t.eredisprice = "暂无定价"), 
                d.push({
                    showDredisprice: e,
                    warename: t.Content.warename,
                    imageurl: n.getImg(t.Content.imageurl),
                    wareid: t.wareid,
                    dredisprice: t.dredisprice,
                    eredisprice: t.eredisprice.split("."),
                    price: Number(t.eredisprice),
                    checked: !1,
                    stock: !0
                });
            }), a.checkGift(d), (o = u).push.apply(o, d), a.setData({
                itemList: u,
                pageCount: r,
                pageIndex: t
            }), h.length && s.getStock(h, function(t, e) {
                u.forEach(function(t) {
                    "无货" == e[t.wareid] && (t.stock = !1);
                }), a.setData({
                    itemList: u
                });
            }), h.length && a.biz.getSkuPrice(h).then(function(t) {
                u.forEach(function(e) {
                    t[e.wareid] && (e.dredisprice = t[e.wareid].price, e.showDredisprice = e.dredisprice > e.price);
                }), a.setData({
                    itemList: u
                });
            });
        }).catch(function(e) {
            1 == t && a.setData({
                loading: !1
            }), u.show({
                icon: u.ICON.WARNING,
                content: e.errMsg || "网络错误，请稍后重试~"
            }), console.log("【满件换购】fetchGoodsListData", e);
        });
    },
    onScrollBottom: function() {
        var t = this.data, e = t.pageIndex, i = t.pageCount, o = t.categoryId;
        e > i || this.getGoodFlag || this.getGoodsList(e, o);
    },
    switchCategory: function(t) {
        var e = t.currentTarget.dataset.id, a = 0 == e;
        this.setData({
            categoryId: e
        }), this.getGoodsList(1, a ? "" : e, !0, a), o.default.addPtag(i.CART_MH_SWITCH);
    },
    checkGoods: function(t) {
        var e = t.currentTarget.dataset, i = e.checked, o = e.idx;
        if (e.stock) {
            var a = this.data, c = a.itemList, r = a.checkGoodsCount, s = a.checkGoodsSum, n = a.checkGoodsList;
            c[o].checked = !i, s = +s;
            var d = c[o].wareid;
            if (i) {
                r--, s -= c[o].price || 0;
                for (var h = void 0, u = 0, f = n.length; u < f; u++) if (n[u].wareid === d) {
                    h = u;
                    break;
                }
                n.splice(h, 1);
            } else r++, s += c[o].price || 0, n.push(c[o]);
            s = parseFloat(s).toFixed(2), this.setData({
                itemList: c,
                checkGoodsCount: r,
                checkGoodsSum: s,
                checkGoodsList: n
            });
        }
    },
    comfirm: function() {
        this.showLayer();
        var t = this.data.checkGoodsList;
        t = t.filter(function(t) {
            return t.checked;
        }), this.setData({
            checkGoodsList: t
        });
    },
    checkGoodsWithList: function(t) {
        var e = t.currentTarget.dataset.idx, i = this.data, o = i.itemList, a = i.checkGoodsList, c = i.checkGoodsSum, r = i.checkGoodsCount, s = !a[e].checked;
        a[e].checked = s, c = +c;
        var n = a[e].wareid;
        s ? (r++, c += +a[e].price) : (r--, c -= +a[e].price);
        for (var d = 0, h = 0, u = o.length; h < u; h++) if (o[h].wareid === n) {
            d = h;
            break;
        }
        o[d].checked = s, c = parseFloat(c).toFixed(2), this.setData({
            itemList: o,
            checkGoodsCount: r,
            checkGoodsSum: c,
            checkGoodsList: a
        });
    }
});
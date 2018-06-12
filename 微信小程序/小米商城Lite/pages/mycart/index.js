var e = require("../../util/util.js"), t = getApp(), i = function(e, i) {
    t.request("cart/selcart", e, function(e, t) {
        i(e, t);
    });
}, r = function(e, i) {
    t.request("cart/del", e, function(e, t) {
        i(e, t);
    });
}, s = !1, o = 1;

Page({
    data: {
        loaded: !1,
        goods_list: [],
        unpaid_order: 0,
        nowData: parseInt(+new Date() / 1e3),
        totalprice: 0,
        appConfig: "",
        address_type: "",
        total: 0,
        allOfOptionsAreChecked: !0,
        startX: 0,
        delBtnWidth: 100,
        canBeSubmited: !0,
        shopId: "",
        insuranceIsShowing: !1,
        serviceSelected: !1,
        serviceItems: null,
        showService: !0,
        showServiceCart: !0
    },
    isLoading: 0,
    swipeDirection: 0,
    onLoad: function(e) {
        wx.getSystemInfo({
            success: function(e) {
                o = e.pixelRatio;
            }
        });
    },
    init: function() {
        var i = this;
        e.showLoading(), t.request("cart/index", {}, function(t, r) {
            if (e.hideLoading(), r) e.showError(r.desc || "数据加载失败"); else {
                var o = t.data || {}, a = [], n = 0, c = !0;
                (a = o.items.filter(function(e) {
                    return (!e.properties || !e.properties.parent_itemId) && (n++, "0" == e.sel_status);
                })).length == n && (c = !1), i.data.allOfOptionsAreChecked ? a.length && (i.data.allOfOptionsAreChecked = !1) : a.length || (i.data.allOfOptionsAreChecked = !0), 
                i.setData({
                    allOfOptionsAreChecked: i.data.allOfOptionsAreChecked,
                    loaded: !0,
                    goods_list: i.rebuildServiceInfo(i.rebuldGoods(o.items, o.bargains, o.activitys)),
                    totalprice: o.show_price && o.show_price.show_sel_total_price ? o.show_price.show_sel_total_price : o.ActTotalMoney,
                    appConfig: o.appConfig,
                    address_type: o.address_match || "",
                    total: o.totalSelGoods,
                    canBeSubmited: c,
                    nowData: o.nowTime
                }), s = !1;
            }
        });
    },
    rebuldGoods: function(e, t, i) {
        for (var r = [], s = e ? e.length : 0, o = 0, a = 0; a < s; a++) if ((f = e[a]).salePrice = this.formatNumberAsCurrency(f.salePrice), 
        f.show_price && f.show_price.show_sale_price && (f.show_price.show_sale_price = this.formatNumberAsCurrency(f.show_price.show_sale_price)), 
        f.subtotal = this.formatNumberAsCurrency(f.subtotal), f.timeFormatedCartTTL = this.timeFormat(f.cartTTL), 
        !f.properties || !f.properties.parent_itemId) {
            if (f.elementsGoods) {
                var n = {};
                f.elementsGoods.forEach(function(e) {
                    n[e.product_id] ? n[e.product_id].num++ : (e.num = 1, n[e.product_id] = e);
                }), f.elementsGoods = [];
                for (var c in n) f.elementsGoods.push(n[c]);
            }
            if (t) {
                f.bargains = [];
                for (var c in t) {
                    var d = t[c];
                    if (d.checked) delete t[c]; else if (d.parent_itemId == f.itemId) {
                        var u = !1;
                        d.tags.forEach(function(e) {
                            "HIT_SERVICE_INFO" === e && (u = !0);
                        }), u || (f.bargains.push(d), delete t[c]);
                    }
                }
            }
            if (i) {
                if (i.postFrees) for (f.postFrees = [], o = 0; o < i.postFrees.length; o++) {
                    var p = i.postFrees[o];
                    p.parent_itemId == f.itemId && (f.postFrees.push(p), i.postFrees.splice(o, 1), o--);
                }
                if (i.coupons) for (f.coupons = [], o = 0; o < i.coupons.length; o++) {
                    var l = i.coupons[o];
                    l.parent_itemId == f.itemId && (f.coupons.push(l), i.coupons.splice(o, 1), o--);
                }
                if (i.reduction) {
                    f.reductions = [];
                    for (var c in i.reduction) {
                        var h = i.reduction[c];
                        h.parent_itemId == f.itemId && f.reductions.push(h);
                    }
                }
            }
            r.push(f);
        }
        for (a = s - 1; a >= 0; a--) {
            var f = e[a];
            if (f.properties && f.properties.parent_itemId) {
                var _ = function(e) {
                    for (var t = 0, i = r.length; t < i; t++) if (r[t].itemId == e) return t;
                    return -1;
                }(f.properties.parent_itemId);
                _ >= 0 && r.splice(_ + 1, 0, f);
            }
        }
        return r;
    },
    formatNumberAsCurrency: function(e, t, i) {
        if (!e) return "";
        if (-1 == (e += "").indexOf("元")) {
            if (-1 == e.indexOf("-")) {
                if (e = Number(e.replace(/[^\d|\.]/gi, "")), isNaN(e)) return "0";
                e = e.toFixed(2);
            }
            i ? e += "" : e = e && e.replace && e.replace(/\.00/g, "").replace(/(\.\d)0/, "$1"), 
            e += t ? "" : "元";
        }
        return e;
    },
    timeFormat: function(e) {
        var t = new Date(1e3 * parseInt(e));
        return t.getFullYear() + "." + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "." + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " " + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes());
    },
    onShow: function() {
        var e = this, i = wx.getStorageSync("shareObject");
        e.setData({
            shopId: i.shopId ? i.shopId : "",
            nowData: parseInt(+new Date() / 1e3)
        }), t.doLogin().then(function(t) {
            e.init();
        });
    },
    choose: function(t) {
        var r = this, s = t.currentTarget.dataset, o = s.index, a = s.item, n = this.data.allOfOptionsAreChecked, c = [], d = 0, u = !0;
        if (1 == a.sel_status || 0 == a.sel_status) {
            var p = 1 == a.sel_status ? 0 : 1;
            i({
                itemid_list: '["' + a.itemId + '"]',
                status: p
            }, function(t, i) {
                if (i) i.desc && e.showError(i.desc); else {
                    var s = t.data;
                    s.items[o].itemId == a.itemId && (s.items[o].sel_status = p), (c = s.items.filter(function(e) {
                        return (!e.properties || !e.properties.parent_itemId) && (d++, "0" == e.sel_status);
                    })).length == d && (u = !1), n ? c.length && (n = !1) : c.length || (n = !0), r.setData({
                        allOfOptionsAreChecked: n,
                        goods_list: r.rebuildServiceInfo(r.rebuldGoods(s.items, s.bargains, s.activitys)),
                        totalprice: s.show_price && s.show_price.show_sel_total_price ? s.show_price.show_sel_total_price : s.ActTotalMoney,
                        appConfig: s.appConfig,
                        address_type: s.address_match,
                        total: s.totalSelGoods,
                        canBeSubmited: u
                    });
                }
            });
        }
    },
    delCart: function(t) {
        var i = this, o = t.currentTarget.dataset.item.itemId;
        s || (s || (s = !0), r({
            itemId: o
        }, function(t, r) {
            r && r.desc && e.showError(r.desc), i.init();
        }));
    },
    selectBargains: function(i) {
        var r = this, s = i.currentTarget.dataset, o = s.index, a = s.item, n = function(t, i) {
            i && i.desc && e.showError(i.desc), r.init();
        };
        if (a.checked) {
            for (o = 0; o < r.items.length && (-1 == a.goodsId.indexOf("" + this.data.items[o].goodsId) || "buy" === this.data.items[o].showType); o++) ;
            c = {
                product_id: a.product_id,
                itemId: this.data.items[o].itemId
            };
            t.request("cart/del", c, n);
        } else {
            var c = {
                product_id: a.product_id,
                parent_itemId: a.parent_itemId,
                promotion_id: a.actId,
                source: a.source,
                promotion_type: "1"
            };
            t.request("cart/add", c, n);
        }
    },
    buyInsurance: function(e) {
        var i = this, r = i.data.serviceItems, s = null;
        if (i.hideInsuranceModal(), r.forEach(function(e) {
            e.service_info && e.showService && e.service_info.forEach(function(e, t) {
                e.selected && (s = e);
            });
        }), s) {
            var o = {
                product_id: s.service_goods_id || "",
                parent_itemId: s.parent_item_id,
                source: s.source,
                promotion_id: s.act_id || ""
            };
            t.request("cart/add", o, function(e, t) {
                t || i.init();
            });
        }
    },
    buyService: function(i) {
        var r = this, s = i.currentTarget.dataset.item, o = {
            product_id: s && s.service_goods_id || "",
            parent_itemId: s.parent_item_id,
            source: s.source,
            promotion_id: s.act_id
        };
        t.request("cart/add", o, function(t, i) {
            i && i.desc && e.showError(i.desc), r.init();
        });
    },
    showInsuranceModal: function(e) {
        var t = this, i = e.currentTarget.dataset, r = t.getServiceInfo(i.item);
        r && t.setData({
            insuranceIsShowing: !0,
            serviceItems: r.properties.service
        });
    },
    hideInsuranceModal: function() {
        this.setData({
            insuranceIsShowing: !1,
            serviceSelected: !1,
            serviceItems: null
        });
    },
    switchAllOfOptions: function() {
        for (var t = this, r = this.data.goods_list, s = 0, o = "", a = !0, n = 0; n < r.length; n++) r[n].properties && r[n].properties.parent_itemId || (o += '"' + r[n].itemId + '",', 
        "0" == r[n].sel_status && (s = 1));
        s || (a = !1), i({
            itemid_list: "[" + o.replace(/,$/, "") + "]",
            status: s
        }, function(i, r) {
            if (r) r.desc && e.showError(r.desc); else {
                for (var o = i.data, n = 0; n < o.items.length; n++) o.items[n].properties && o.items[n].properties.parent_itemId || (o.items[n].sel_status = s);
                t.setData({
                    allOfOptionsAreChecked: s,
                    goods_list: t.rebuldGoods(o.items, o.bargains, o.activitys),
                    totalprice: o.show_price && o.show_price.show_sel_total_price ? o.show_price.show_sel_total_price : o.ActTotalMoney,
                    appConfig: o.appConfig,
                    address_type: o.address_match,
                    total: o.totalSelGoods,
                    canBeSubmited: a
                });
            }
        });
    },
    touchStart: function(e) {
        1 == e.touches.length && this.setData({
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY
        });
    },
    touchMove: function(e) {
        var t = this;
        if (1 == e.touches.length) {
            var i = e.touches[0].clientX, r = e.touches[0].clientY, s = t.data.startX - i, o = t.data.startY - r;
            t.data.delBtnWidth;
            if (2 === this.swipeDirection) return;
            if (0 === this.swipeDirection && Math.abs(o) > 18 && Math.abs(s) < 50) return void (this.swipeDirection = 2);
            return;
        }
    },
    touchEnd: function(e) {
        var t = this;
        if (1 == e.changedTouches.length) {
            var i = this.swipeDirection;
            this.swipeDirection = 0;
            var r = e.changedTouches[0].clientX, s = t.data.startX - r, o = t.data.delBtnWidth, a = s > o / 2 ? "left:-" + o + "rpx" : "left:0px", n = e.currentTarget.dataset.index, c = t.data.goods_list;
            if (2 === i) return;
            for (var d = 0; d < c.length; d++) if (c[d].txtStyle) {
                c[d].txtStyle = 0;
                break;
            }
            c[n].txtStyle = a, t.setData({
                goods_list: c
            });
        }
    },
    submit: function() {
        var i = this;
        if (this.data.canBeSubmited) {
            if (this.isLoading) return;
            this.isLoading = 1, t.request("order/checkout_v2", {
                is_ajax: 1
            }, function(t, r) {
                var s = [];
                if (r) return r.desc && (r.data && r.data.items ? (s = JSON.parse(r.data.items), 
                "[object Array]" === Object.prototype.toString.call(s[0]) && (s = s[0]), e.showError(r.desc + "：" + s.map(function(e) {
                    return e.short_name + "、";
                }).join("").replace(new RegExp("、$"), ""))) : e.showError(r.desc)), void (i.isLoading = 0);
                wx.navigateTo({
                    url: "/pages/checkout/index"
                }), i.isLoading = 0;
            });
        }
    },
    navigateToCart: function(e) {
        var t = e.currentTarget.dataset.item, i = "";
        "fcode" != t.showType && "qualification" != t.getType && (t.properties && t.properties.service && t.properties.service.forEach(function(e) {
            e.service_info.forEach(function(e, t) {
                i = e.item_id;
            });
        }), wx.navigateTo({
            url: "../cart/index?id=" + t.goodsId + "&item_id=" + t.itemId + "&num=" + t.num + "&insurance_item_id=" + i + "&from=checkout&source=" + t.showType
        }));
    },
    selectService: function(e) {
        var t = this, i = e.currentTarget.dataset.serindex, r = t.data.serviceItems, s = !1;
        r.forEach(function(e) {
            e.service_info && e.showService && e.service_info.forEach(function(e, t) {
                i !== t || e.selected ? e.selected = !1 : (e.selected = !0, s = !0);
            });
        }), t.setData({
            serviceItems: r,
            serviceSelected: s
        });
    },
    rebuildServiceInfo: function(e) {
        var t = !1;
        return e && e.length && e.forEach(function(e) {
            var i = e && e.properties && e.properties.service_info;
            i && i.length && i.forEach(function(e) {
                e.showService = !0, e && e.service_info && e.service_info.length && e.service_info.forEach(function(t, i) {
                    t.goods_id && t.item_id && (t.inCart = !0), t.phone_accidentIns && (e.isPhoneIns = !0), 
                    t.service_price = t.service_price.replace("元", ""), t.service_image_url = t.service_image_url.replace(/^https?:/, "");
                }), e.showService && (t = !0);
            }), e.properties.service = i;
        }), this.setData({
            showServiceCart: t
        }), e;
    },
    getServiceInfo: function(e) {
        var t = e && e.properties && e.properties.service_info, i = !1, r = e, s = !1;
        if (t) return t.length && t.forEach(function(e) {
            e && e.service_info && e.service_info.length && e.service_info.forEach(function(t) {
                t.goods_id && t.item_id && (t.selected = !0, s = !0), t.phone_accidentIns_sku && (e.showService = !0), 
                t.service_price = t.service_price.replace("元", ""), t.service_image_url = t.service_image_url.replace(/^https?:/, "");
            }), e.showService && (i = !0);
        }), r.properties.service = t, this.setData({
            showService: i,
            serviceSelected: s
        }), r;
    }
});
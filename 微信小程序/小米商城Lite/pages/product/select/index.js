var o = require("../../../util/util.js"), t = require("../../../util/tracker.js"), i = getApp();

Page({
    data: {
        loaded: !1,
        position_id: "",
        productInfo: {},
        buyOptions: [],
        curGoodsInfo: {},
        buyNum: 1,
        isQuickOrder: 0,
        isBatched: !1,
        batchInfo: [],
        curBatchInfo: [],
        serviceDesc: "",
        isPhoneService: !1,
        vipPriceCfg: {},
        vipInfo: {},
        serviceGoodsId: ""
    },
    onLoad: function(o) {
        var t = this;
        o.fromshare && t.setData({
            fromshare: 1
        }), t.setData({
            position_id: o.posID || "",
            isQuickOrder: o.quickOrder || 0,
            product_id: o.id || "",
            goodsId: o.goodsId || "",
            frommoney: o.frommoney || "",
            inviteCode: o.inviteCode || ""
        }), i.doLogin().then(function(o) {
            t.getData(t.data.product_id);
        });
    },
    onShow: function() {
        t.push();
    },
    getData: function(t) {
        var e = this, a = i.storageData.userId || 0;
        i.request("product/commodityPage", {
            product_id: t,
            userId: a
        }, function(t, i) {
            i ? o.showError("服务异常请稍后再试,或下载小米商城APP") : t.data.goods_info.length ? (t.data.product_info.is_batched ? (t.data.goods_info[0].activity = e.filterActs(t.data.goods_info[0]), 
            t.data.goods_info[0].vipInfo = e.getVipInfo(t.data.goods_info[0]), t.data.goods_info[0] = e.getServiceInfo(t.data.goods_info[0]), 
            e.setData({
                isBatched: t.data.product_info.is_batched,
                batchInfo: t.data.batch_info,
                curGoodsInfo: t.data.goods_info[0],
                vipPriceCfg: t.data.special_price_cfg || {}
            }), e.bachInit()) : (e.setData({
                buyOptions: t.data.buy_option,
                productInfo: t.data.goods_info,
                vipPriceCfg: t.data.special_price_cfg || {}
            }), e.init()), e.setData({
                loaded: !0
            })) : o.showTips("没有商品数据", "/pages/index/index");
        });
    },
    init: function() {
        var o = this, t = o.data.goodsId || o.data.productInfo[2].goods_id, i = {};
        o.checkFirstStock(o.data.buyOptions, o.data.productInfo), o.data.productInfo.forEach(function(o) {
            o.goods_id == t && (i = o);
        }), i.activity = o.filterActs(i), i.vipInfo = o.getVipInfo(i), i = o.getServiceInfo(i), 
        o.setData({
            curGoodsInfo: i
        }), o.selectProps(i.prop_list[0].prop_cfg_id, i.prop_list[0].prop_value_id, o.data.buyOptions, o.data.productInfo);
    },
    bachInit: function() {
        for (var o = this, t = {}, i = 0; i < o.data.batchInfo.length; i++) (t = o.data.batchInfo[i]).curGoods = t.goods_info[0], 
        t.buy_option.forEach(function(o) {
            o.list.length <= 1 || "通用" === o.name ? o.show = !1 : o.show = !0;
        }), o.checkFirstStock(t.buy_option, t.goods_info), o.selectProps(t.curGoods.prop_list[0].prop_cfg_id, t.curGoods.prop_list[0].prop_value_id, t.buy_option, t.goods_info);
    },
    checkFirstStock: function(o, t) {
        o[0].list.forEach(function(i) {
            var e = 0, a = 0;
            t.forEach(function(t, r) {
                t.prop_list[0].prop_cfg_id === o[0].prop_cfg_id && t.prop_list[0].prop_value_id === i.prop_value_id && (t.is_stock && (e += 1), 
                t.action_button.is_bigtap && (a += 1));
            }), e > 0 && (i.is_stock = !0), a > 0 && (i.is_bigtap = !0);
        });
    },
    tapSelect: function(o) {
        var t = this, i = o.currentTarget.dataset.cfg, e = o.currentTarget.dataset.value;
        if (!o.currentTarget.dataset.on) if (t.data.isBatched) {
            var a = o.currentTarget.dataset.index;
            t.selectProps(i, e, t.data.batchInfo[a].buy_option, t.data.batchInfo[a].goods_info, a);
        } else t.selectProps(i, e, t.data.buyOptions, t.data.productInfo);
    },
    selectProps: function(o, t, i, e, a) {
        var r = this;
        i && e && (r.handleLeaveOn(o, t, i), r.handleBuyOptions(o, t, i, e, a));
    },
    handleLeaveOn: function(o, t, i) {
        i.forEach(function(i, e) {
            o === i.prop_cfg_id && (i.list.forEach(function(o) {
                t === o.prop_value_id ? o.on = !0 : o.on = !1;
            }), 0 === e && i.list.forEach(function(o) {
                o.name && (o.show = !0);
            }));
        });
    },
    handleBuyOptions: function(o, t, i, e, a) {
        function r(o, t) {
            return o.prop_cfg_id === t.prop_cfg_id && o.prop_value_id === t.prop_value_id;
        }
        function n(o) {
            var t = [], i = [], e = o;
            return o.length > 1 && (e = o.slice(0, o.length - 1)), _.forEach(function(o) {
                for (var i = 0, a = 0; a < e.length; a++) !function(a) {
                    o.prop_list.forEach(function(o) {
                        r(o, e[a]) && (i += 1);
                    }), i === e.length && t.push(o);
                }(a);
            }), t.length && t.forEach(function(o) {
                o.prop_list && o.prop_list.forEach(function(o) {
                    return i.push(o);
                });
            }), {
                props: i,
                goods: t
            };
        }
        function c() {
            p.forEach(function(o, t) {
                o.list && o.list.forEach(function(o) {
                    t > 0 && (o.show = !1);
                });
            });
        }
        function d(o) {
            o.forEach(function(o) {
                p.forEach(function(t, i) {
                    t.prop_cfg_id === o.prop_cfg_id && t.list && (!f.data.isBatched && t.list.length <= 1 && "通用" === t.name ? t.show = !1 : f.data.isBatched || (t.show = !0), 
                    t.list.forEach(function(t) {
                        t.prop_value_id === o.prop_value_id && (t.show = !0);
                    }));
                });
            });
        }
        function s(o) {
            o.forEach(function(o) {
                p.forEach(function(t, i) {
                    var e = o.prop_list[i];
                    i === h && t.prop_cfg_id === e.prop_cfg_id && t.list && t.list.forEach(function(t) {
                        t.prop_value_id === e.prop_value_id && (t.is_stock = o.is_stock, t.is_bigtap = o.action_button.is_bigtap);
                    });
                });
            });
        }
        function u() {
            var o = p[h + 1], t = void 0, i = void 0;
            if (o && o.list) f.data.curGoodsInfo && !f.data.isBatched ? (t = (o = f.data.curGoodsInfo.prop_list[h + 1]).prop_cfg_id, 
            i = o.prop_value_id) : (t = o.prop_cfg_id, i = o.list[0].prop_value_id), f.selectProps(t, i, p, _, a); else {
                var e = f.getAllOnProps(p);
                if (f.setData({
                    buyOptions: p
                }), e.length === p.length) {
                    var r = f.getCurGoods(e, _);
                    r.length > 0 && f.setCurProduct(r[0], a);
                } else {
                    if (!(o = p[h])) return;
                    for (var n = 0; n < o.list.length; n++) if (!o.list[n].on && o.list[n].show) {
                        f.selectProps(o.prop_cfg_id, o.list[n].prop_value_id, p, _, a);
                        break;
                    }
                }
            }
        }
        var f = this, p = i, _ = e, l = f.getAllOnProps(i), h = 0;
        h = function(o) {
            var t = 0;
            return p.forEach(function(i, e) {
                i.prop_cfg_id === o && (t = e);
            }), t;
        }(o), function() {
            var o = {};
            c(), o = n(l), h > 0 && (d(o.props), s(o.goods)), u();
        }();
    },
    getAllOnProps: function(o) {
        var t = [];
        return o.forEach(function(o) {
            o.list.forEach(function(i) {
                i.on && i.show && t.push({
                    prop_cfg_id: o.prop_cfg_id,
                    prop_value_id: i.prop_value_id
                });
            });
        }), t;
    },
    getCurGoods: function(o, t) {
        var i = [];
        return t.forEach(function(t) {
            for (var e = 0, a = 0; a < t.prop_list.length; a += 1) t.prop_list[a].prop_cfg_id === o[a].prop_cfg_id && t.prop_list[a].prop_value_id === o[a].prop_value_id && (e += 1);
            e === o.length && i.push(t);
        }), i;
    },
    setCurProduct: function(o, t) {
        var e = this;
        if (e.data.isBatched) {
            void 0 !== t && (e.data.batchInfo[t].curGoods = o), e.setData({
                batchInfo: e.data.batchInfo
            });
        } else {
            o.activity = e.filterActs(o), o.vipInfo = e.getVipInfo(o);
            var a = (o = e.getServiceInfo(o)).goods_gallery_v3 || [];
            e.setData({
                curGoodsInfo: o,
                goodsGallery: a
            }), "booking" === o.action_button.sale_mode && i.request("time/get", {}, function(o, t) {
                var i = o.data || new Date().getTime() / 1e3;
                e.data.curGoodsInfo.action_button.is_bigtap || !(e.data.curGoodsInfo.action_button.booking.pre_end_time <= i) && e.data.curGoodsInfo.is_stock || e.setData({
                    "curGoodsInfo.action_button.booking.finish": !0
                });
            });
        }
    },
    changeNum: function(o) {
        var t = this;
        "sub" === o.currentTarget.dataset.type ? t.data.buyNum > 1 && t.setData({
            buyNum: t.data.buyNum -= 1
        }) : t.data.buyNum < t.data.curGoodsInfo.buy_limit && t.setData({
            buyNum: t.data.buyNum += 1
        });
    },
    selectInsur: function(o) {
        var t = this, i = o.currentTarget.dataset.serindex, e = t.data.curGoodsInfo.service, a = "", r = "";
        e.forEach(function(o) {
            o.service_info && o.showService && o.service_info.forEach(function(o, t) {
                i !== t || o.selected ? o.selected = !1 : (o.selected = !0, a = o.service_goods_id, 
                r = o.service_desc);
            });
        }), t.setData({
            serviceGoodsId: a,
            serviceDesc: r,
            "curGoodsInfo.service": e
        });
    },
    addCart: function(t) {
        var e = this, a = {}, r = e.data, n = "1" === e.data.isQuickOrder ? 1 : 0, c = "";
        e.data.curGoodsInfo.is_stock && (o.showLoading(), e.data.isBatched && e.data.batchInfo.forEach(function(o, t) {
            var i = e.getAllOnProps(o.buy_option), a = e.getCurGoods(i, o.goods_info);
            c += a[0].goods_id, t < e.data.batchInfo.length - 1 && (c += "|");
        }), "booking" === e.data.curGoodsInfo.action_button.sale_mode && (n = 1), a = {
            product_id: r.curGoodsInfo.goods_id,
            sku: r.curGoodsInfo.sku || "",
            insurance_goods_id: r.serviceGoodsId || "",
            consumption: r.buyNum,
            quick_order: n,
            source: r.curGoodsInfo.action_button.sale_mode,
            position_id: r.position_id,
            item_id: c
        }, i.request("cart/add", a, function(t, i) {
            if (o.hideLoading(), i) if (2003009 == i.code) {
                o.showError(i.desc);
                n ? "/pages/checkout/index?quick_order=" + n : "/pages/product/index?id=" + e.data.product_id + "&goodsId=" + r.curGoodsInfo.goods_id + "&frommoney=" + e.data.frommoney + "&inviteCode=" + e.data.inviteCode;
            } else if (10001002 == i.code || 10001008 == i.code) o.showError("网络开小差了了~请稍后再试"); else {
                var a = i.desc || "网络开小差了了~请稍后再试";
                o.showError(a);
            } else if (n) wx.navigateTo({
                url: "/pages/checkout/index?quick_order=" + n
            }); else {
                var c = "/pages/product/index?selectBack=1&id=" + r.product_id + "&goodsId=" + r.curGoodsInfo.goods_id + "&frommoney=" + e.data.frommoney + "&inviteCode=" + e.data.inviteCode;
                wx.navigateTo({
                    url: c,
                    fail: function(o) {
                        wx.redirectTo({
                            url: c
                        });
                    }
                });
            }
        }));
    },
    selectProduct: function() {
        var o = "/pages/product/index?selectBack=1&isBigtap=1&id=" + this.data.product_id + "&goodsId=" + this.data.curGoodsInfo.goods_id + "&num=" + this.data.buyNum + "&frommoney=" + this.data.frommoney + "&inviteCode=" + this.data.inviteCode + "&serviceGoodsId=" + this.data.serviceGoodsId;
        wx.navigateTo({
            url: o,
            fail: function(t) {
                wx.redirectTo({
                    url: o
                });
            }
        });
    },
    onShareAppMessage: function() {
        var o = this, t = "/pages/index/index?fromshare=1";
        return o.data.product_id && (t += "&id=" + o.data.product_id + "&goods_id=" + o.data.curGoodsInfo.goods_id + "&"), 
        {
            title: o.data.curGoodsInfo.name,
            path: t
        };
    },
    filterActs: function(o) {
        var t = [];
        return o && o.activity ? (o.activity.forEach(function(o) {
            "分期" !== o.typeDesc && "券" !== o.typeDesc && o.title && t.push(o);
        }), t) : t;
    },
    getVipInfo: function(o) {
        var t = {
            vip_price: 0,
            end_date: ""
        };
        return o.activity_by_user && o.activity_by_user.canJoinActs && o.activity_by_user.canJoinActs.forEach(function(i) {
            "vip_reduction" === i.type && (t.vip_price = o.vip_price, t.end_date = o.vip_end_date);
        }), t;
    },
    getServiceInfo: function(o) {
        var t = this, i = o.service, e = !1, a = "", r = "";
        return i ? (i.length && i.forEach(function(o) {
            o && o.service_info && o.service_info.length && o.service_info.forEach(function(i) {
                i.phone_accidentIns_sku && (o.showService = !0), i.service_goods_id === t.data.serviceGoodsId ? (i.selected = !0, 
                a = i.service_goods_id, r = i.service_desc) : i.selected = !1, i.service_price = i.service_price.replace("元", "");
            }), o.showService && (e = !0);
        }), o.service = i, t.setData({
            isPhoneService: e,
            serviceGoodsId: a,
            serviceDesc: r
        }), o) : o;
    },
    viewGallery: function(o) {
        var t = this, i = o.currentTarget.dataset.current, e = [];
        t.data.goodsGallery.length && (t.data.goodsGallery.forEach(function(o) {
            e.push(o.img_url);
        }), wx.previewImage({
            current: i,
            urls: e
        }));
    }
});
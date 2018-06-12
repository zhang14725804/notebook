var e = require("../../util/util.js"), t = require("../../util/tracker.js"), a = getApp();

Page({
    data: {
        can_pay: !1,
        can_delivery: !0,
        quick_order: 0,
        submiting: !1,
        loaded: !1,
        goods_list: [],
        sign_key: "",
        onShowed: !1,
        discountMoney: "",
        amount: "",
        couponType: "",
        couponCode: "",
        coupon: {},
        default_coupon: !0,
        giftItemIdMap: {},
        invoiceList: [],
        invoice_type: 4,
        invoice_type_title: "",
        invoice_title: "",
        unpaid_order: 0,
        hasGiftCards: !1,
        ecards: null,
        countOfEcards: 0,
        cardIds: "",
        needToPayAmount: 0,
        prepay: null,
        topBannerText: "",
        tipsIsShow: !1
    },
    onLoad: function(e) {
        this.setData({
            quick_order: e.quick_order || 0,
            salemode: e.salemode || ""
        });
    },
    init: function() {
        var t = this, i = wx.getStorageSync("checkout:couponType"), o = wx.getStorageSync("checkout:couponCode"), c = wx.getStorageSync("checkout:default_coupon"), n = wx.getStorageSync("checkout:cardIds") || this.data.cardIds, d = wx.getStorageSync("checkout:invoice_title_type") || "personal";
        n && wx.removeStorageSync("checkout:cardIds"), i && wx.removeStorageSync("checkout:couponType"), 
        o && wx.removeStorageSync("checkout:couponCode"), "" !== c ? wx.removeStorageSync("checkout:default_coupon") : c = !0;
        var r = wx.getStorageSync("checkout:address"), s = wx.getStorageSync("checkout:deliver"), _ = wx.getStorageSync("checkout:invoice_type"), u = wx.getStorageSync("checkout:invoice_title"), l = wx.getStorageSync("checkout:invoice_company_code"), v = wx.getStorageSync("checkout:invoice_tel"), p = wx.getStorageSync("checkout:invoice_email"), m = "" == u, y = -1;
        _ && wx.removeStorageSync("checkout:invoice_type"), "booking" === t.data.salemode && (c = !1), 
        e.showLoading();
        var g = {
            address_id: r || "",
            quick_order: t.data.quick_order,
            coupon_type: i || "",
            coupon_code: o || "",
            default_coupon: c,
            invoice_type: _ || "",
            invoice_title: u || "",
            ecard: n || "",
            invoice_tel: v || "",
            invoice_email: p || ""
        };
        "company" == d && l && (g.invoice_company_code = l), a.request("order/checkout_v2", g, function(i, o) {
            if (e.hideLoading(), o) if (2004002 == o.code || 3051003 == o.code) t.setData({
                loaded: !0,
                goods_list: [],
                unpaid_order: o.data
            }); else {
                if (2004098 == o.code) return e.showError(o.desc), wx.removeStorageSync("checkout:invoice_company_code"), 
                void t.init();
                e.showError(o.desc || "数据加载失败");
            } else {
                "" != i.error && "success" != i.error && e.showError(i.error);
                var c = i.data.prepay_info || null, r = t.getChecked(i.data.shipmentlist), u = {}, l = i.data.cartlist.activitys ? i.data.cartlist.activitys.gift : null, v = "";
                i.data.cartlist.has && i.data.cartlist.has.includes && i.data.cartlist.has.includes("pop") && (v = "第三方商品的发票由相关企业单独开具");
                for (var p in l) {
                    var g = l[p], h = g.itemId, f = g.actId, k = g.selecInfo;
                    u[h] = {
                        actId: f,
                        select: []
                    };
                    for (var S in k) {
                        var w = k[S];
                        u[h].select.push({
                            goods_id: w.product_id,
                            short_name: w.short_name
                        });
                    }
                }
                var x = i.data.couponList || [];
                for (var p in x) {
                    var T = x[p];
                    T.beginTime && (T.beginTime = e.formatTime(T.beginTime)), T.value = parseFloat(T.value), 
                    T.endTime && (T.endTime = e.formatTime(T.endTime));
                }
                wx.setStorageSync("checkout:couponList", x);
                var b = i.data.invoice || [];
                wx.setStorageSync("checkout:invoiceList", b);
                var I = void 0;
                if (_) {
                    for (var p in b) if (b[p].value == _) {
                        I = b[p], t.setData({
                            invoice_type: I.value,
                            invoice_type_title: I.desc
                        });
                        break;
                    }
                } else for (var p in b) if (4 == b[p].value) {
                    I = b[p], t.setData({
                        invoice_type: I.value,
                        invoice_type_title: I.desc
                    });
                    break;
                }
                void 0 == I && b.length > 0 && (I = b[0], t.setData({
                    invoice_type: I.value,
                    invoice_type_title: I.desc
                })), 1 == b.length && (y = b[0].value);
                var q = m ? i.data.default_invoice_title : i.data.invoice_title, C = i.data.invoice_company_code ? i.data.invoice_company_code : i.data.default_invoice_company_code, L = i.data.invoice_tel ? i.data.invoice_tel : i.data.default_invoice_tel || "", D = i.data.invoice_email ? i.data.invoice_email : i.data.default_invoice_email || "", E = i.data.address, M = i.data.coupon || {}, P = [], O = !1;
                "cash" == M.type ? (M.value = M.value + "元", /元元$/.test(M.value) && (M.value = M.value.replace(/元$/, ""))) : "discount" == M.type && (M.value = (M.value != parseInt(M.value, 10) ? M.value : parseInt(M.value, 10)) + "折", 
                /折折$/.test(M.value) && (M.value = M.value.replace(/折$/, ""))), i.data.booking_info && (i.data.booking_info.finalStartTime = e.formatTime(i.data.booking_info.final_start_time), 
                i.data.booking_info.finalEndTime = e.formatTime(i.data.booking_info.final_end_time)), 
                c && (c.finalStartTime = e.formatTime(c.final_start_time), c.finalEndTime = e.formatTime(c.final_end_time)), 
                1 == E.can_delivery && 1 == E.is_cos && (O = !0), P = i.data.cartlist.items.map(function(t, a) {
                    return t.price = /元$/.test(t.price) ? t.price : t.price + "元", t.salePrice = t.salePrice, 
                    t.insurance && (t.insurance_item_id = t.insurance.itemId), t.outOfStock = 0 == t.can_delivery || t.is_cos, 
                    t.cart_left_time = e.formatLeftTime(i.data.server_time, t.cartTTL), t;
                }), t.setData({
                    cardIds: c ? "" : n,
                    countOfEcards: i.data.ecard_total_count || 0,
                    supportedInvoice: y,
                    needToPayAmount: i.data.need_pay_amount || 0,
                    ecards: i.data.ecards || null,
                    hasGiftCards: i.data.showGiftCard || !1,
                    discountMoney: i.data.discountMoney || "",
                    sign_key: i.data.sign_key,
                    loaded: !0,
                    address_id: E.address_id || "",
                    can_pay: 1 == E.can_delivery && !E.is_cos,
                    can_delivery: E.can_delivery,
                    amount: i.data.amount,
                    product_money: i.data.productMoney,
                    address: E,
                    addressType: i.data.cartlist.address_match,
                    goods_list: P,
                    tipsIsShow: O,
                    prepay: c,
                    shipment: r.amount,
                    deliver: t.getChecked(s || i.data.delivertime),
                    invoice_title: q,
                    invoice_company_code: C,
                    couponCode: c ? "" : i.data.couponCode || "",
                    couponType: c ? "" : i.data.couponType || "",
                    coupon: c ? {} : M,
                    giftItemIdMap: u,
                    booking_info: i.data.booking_info || "",
                    invoice_tel: L,
                    invoice_email: D,
                    invoice_title_type: d,
                    not_show_company_code: i.data.not_show_company_code || "",
                    addressDisabled: !(!i.data.eaddress || !i.data.eaddress.is_event),
                    topBannerText: v
                }), wx.setStorage({
                    key: "checkout:deliver",
                    data: s || i.data.delivertime
                }), wx.setStorage({
                    key: "checkout:invoice_type",
                    data: 4
                }), wx.setStorage({
                    key: "checkout:invoice_title",
                    data: t.data.invoice_title
                }), wx.setStorage({
                    key: "checkout:invoice_company_code",
                    data: t.data.invoice_company_code
                }), wx.setStorage({
                    key: "checkout:invoice_tel",
                    data: t.data.invoice_tel
                }), wx.setStorage({
                    key: "checkout:invoice_email",
                    data: t.data.invoice_email
                }), wx.setStorage({
                    key: "checkout:not_show_company_code",
                    data: t.data.not_show_company_code
                });
                var $ = wx.getStorageSync("shareObject");
                $ && a.request("time/get", {}, function(e, t) {
                    e.data - $.timestamp > 86400 && wx.removeStorageSync("shareObject");
                }), wx.removeStorageSync("shareChannel");
            }
        });
    },
    getChecked: function(e) {
        var t = null;
        return e.forEach(function(e, a) {
            e.checked && (t = e);
        }), t;
    },
    onShow: function() {
        t.push();
        var e = this;
        a.doLogin().then(function(t) {
            e.init();
        });
    },
    tapOrderSubmit: function() {
        var t = this, i = t.data, o = i.address.address_id, c = i.invoice_type, n = i.invoice_title, d = i.invoice_company_code, r = this.data.cardIds, s = i.deliver.value, _ = i.invoice_tel, u = i.invoice_email;
        if (!t.data.submiting) if (o) {
            t.setData({
                submiting: !0
            }), e.showLoading();
            var l = {
                address_id: o,
                ecard: r || "",
                pay_id: 1,
                invoice_type: c,
                invoice_title: n,
                save_submit: 0,
                paymethod: "weixin_little",
                best_time: s,
                quick_order: t.data.quick_order,
                sign: e.makeSign(t.data.sign_key),
                coupon_type: t.data.couponType,
                coupon_code: t.data.couponCode,
                invoice_tel: _,
                invoice_email: u
            };
            "company" == this.data.invoice_title_type && d && (l.invoice_company_code = d), 
            a.request("order/submitPay", l, function(i, o) {
                if (e.hideLoading(), o) return t.setData({
                    submiting: !1
                }), void (o.desc && e.showError(o.desc));
                var c = i.data.order_id;
                "0.00元" != t.data.amount ? (e.showLoading(), a.request("pay/bankgo", {
                    order_id: c,
                    bank: i.data.paymethod,
                    quick_order: t.data.quick_order
                }, function(a, i) {
                    if (e.hideLoading(), t.setData({
                        submiting: !1
                    }), i) return 2018003 == i.code ? void wx.redirectTo({
                        url: "./result/index?order_id=" + c
                    }) : void (i.desc && e.showError(i.desc));
                    wx.requestPayment({
                        timeStamp: a.data.timeStamp + "",
                        nonceStr: a.data.nonceStr,
                        package: a.data.package,
                        signType: "MD5",
                        paySign: a.data.paySign,
                        complete: function(e) {
                            wx.redirectTo({
                                url: "./result/index?order_id=" + c
                            });
                        }
                    });
                })) : wx.redirectTo({
                    url: "./result/index?order_id=" + c
                });
            });
        } else e.showError("请添加收货地址");
    },
    tapGift: function(e) {
        var t = this, a = e.currentTarget.dataset, i = a.iid, o = a.gid, c = t.data.giftItemIdMap[i];
        c && c.select.length > 1 && (wx.setStorageSync("checkout:gift", c), wx.navigateTo({
            url: "../cart/gift/index?gid=" + o
        }));
    },
    tapCloseDeliveryTip: function() {
        this.setData({
            can_delivery: !0
        });
    }
});
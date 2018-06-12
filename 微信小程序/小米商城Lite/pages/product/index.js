function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../util/util.js"), o = require("../../util/conf.js"), n = require("../../util/tracker.js"), i = getApp(), r = require("../../util/bigtap.js")(i), s = require("../../util/user.js")(i);

Page({
    data: (t = {
        name: "",
        desc: "",
        stock: !1,
        gallery_img: [],
        btn: "",
        price: "",
        goods_id: "",
        sale_mode: "",
        is_bigtap: !1,
        hdBtn: "",
        id: 0,
        sku: 0,
        fromshare: 0,
        loaded: !1,
        comments: {},
        batched_id: "",
        batchGoodsIDs: "",
        is_batched: !1,
        market_price: "",
        rec_list: null,
        position_id: "",
        quick_order: 0,
        defaultGoodsId: "",
        shipment_text: "",
        reduce_price: "",
        cartCount: 0,
        applyCoupon: [],
        userCoupon: [],
        couponShow: !1,
        actCoupon: "",
        actCouponSurplus: "",
        productContent: "",
        webview: "",
        aftersale_service: null,
        service_refound_policy: {},
        ypTag: {},
        isRushing: !1,
        vipInfo: {},
        showVipIntro: !1,
        vipPriceCfg: {}
    }, e(t, "showVipIntro", !1), e(t, "addressID", ""), e(t, "address", null), e(t, "layerSellingOut", !1), 
    e(t, "leftTime", 0), e(t, "isMoneyProduct", !1), e(t, "moneyUserInfo", {}), e(t, "moneyRebate", ""), 
    e(t, "fromShareInviteCode", ""), e(t, "moneyShareData", {}), e(t, "moneyUserInfoGeted", !1), 
    e(t, "wxInfo", {}), e(t, "showMoneyBanner", !1), e(t, "showMoneyShare", !1), e(t, "moneyShareTitle", ""), 
    e(t, "showMoneyAgentShareTip", !1), e(t, "moneyAgentShareTip", !1), t),
    storage: 0,
    salt: "",
    hdurl: "",
    openBigTapImmediately: !1,
    numberOfProductsFromBigTap: 1,
    serviceGoodsId: "",
    onShareAppMessage: function(e) {
        var t = this, a = (e && e.target && e.target.dataset.sharetype, "/pages/product/index?fromshare=1"), o = t.data.name, i = t.data.gallery_img[0] || t.data.goodsImg;
        return t.data.id && (a += "&id=" + t.data.id), t.data.goods_id && (a += "&goodsId=" + t.data.goods_id), 
        t.data.isMoneyProduct && (a += "&frommoney=2&inviteCode=" + t.data.moneyUserInfo.invite_code, 
        o = t.data.moneyShareTitle.replace("%s", t.data.name)), n.push({
            analyse: "tap",
            logCode: "wx#bid=3191447.1&page=product"
        }), {
            title: o,
            path: a,
            imageUrl: i
        };
    },
    onLoad: function(e) {
        var t = this;
        if (i.setMasid(e), e.shareChannel && wx.setStorageSync("shareChannel", e.shareChannel), 
        e.scene) {
            var a = decodeURIComponent(e.scene).split("&");
            t.setData({
                id: a[0],
                fromShareInviteCode: a[1] || "",
                frommoney: "2"
            });
        } else t.setData({
            id: e.id || 0,
            position_id: e.posID || "",
            defaultGoodsId: e.goodsId || "",
            fromShareInviteCode: e.inviteCode || "",
            fromshare: e.fromshare || "",
            frommoney: e.frommoney || ""
        }), e.selectBack && (e.isBigtap ? (t.openBigTapImmediately = !0, t.numberOfProductsFromBigTap = e.num || 1, 
        t.serviceGoodsId = e.serviceGoodsId || "") : wx.showToast({
            title: "成功加入购物车",
            icon: "success",
            duration: 2e3
        }));
    },
    onShow: function() {
        var e = this, t = this;
        t.data.is_bigtap && !t.openBigTapImmediately && t.getDeliveryInfo(t.data.goods_id), 
        i.doLogin().then(function(a) {
            e.getCartCount(), wx.getUserInfo({
                success: function(e) {
                    t.setData({
                        wxInfo: e.userInfo
                    });
                }
            }), e.data.loaded || e.init(e.data.id);
        });
    },
    init: function(e) {
        var t = this, o = i.storageData.userId || 0;
        i.request("product/commodityPage", {
            product_id: e,
            userId: o
        }, function(o, r) {
            if (r) return 10011003 == r.code ? void wx.switchTab({
                url: "/pages/index/index"
            }) : void a.showError("服务异常请稍后再试,或下载小米商城APP");
            var s = o.data.goods_info, d = "", u = !1, c = "", l = function() {
                for (var e = 0, a = 0; a < s.length; a++) if (t.data.defaultGoodsId) {
                    if (t.data.defaultGoodsId == s[a].goods_id) {
                        e = s[a];
                        break;
                    }
                } else if (s[a].stock && "standard" === s[a].action_button.sale_mode) {
                    e = s[a];
                    break;
                }
                return e || (e = s[0]), e;
            }() || {}, h = [], g = [], p = 0;
            if (d = l.action_button ? l.action_button.sale_mode : "", u = l.action_button ? l.action_button.is_bigtap : "", 
            c = l.goods_id, o.data.product_info.is_batched && (t.setData({
                batchGoodsIDs: o.data.product_info.batchGoodsIDs || "",
                is_batched: !0
            }), l.sku = ""), l.activity && l.activity.forEach(function(e) {
                "分期" !== e.typeDesc && "券" !== e.typeDesc && e.title && h.push(e);
            }), l.user_coupons && l.user_coupons.length) {
                for (var f = 0; f < l.user_coupons.length; f += 1) if ("cash" === l.user_coupons[f].type && l.user_coupons[f].is_activity) {
                    g.push(l.user_coupons[f]);
                    break;
                }
                g.length && (i.request("time/get", {}, function(e, a) {
                    e && 0 === e.code ? t.countCouponTime(g[0], e.data) : t.countCouponTime(g[0]);
                }), p = t.sub(l.price, g[0].money));
            }
            for (var m = [], _ = l.gallery_v2 || [], v = void 0, y = 0; y < o.data.view_content.length; y += 1) if (v = o.data.view_content[y], 
            0 === _.length && v.gallery_v2_view && v.gallery_v2_view.length && (_ = v.gallery_v2_view), 
            v.show_type = v.desc_tabs_view) {
                m = v.desc_tabs_view;
                break;
            }
            0 === _.length && _.push(l.img_url);
            var w = {
                vip_price: 0,
                end_date: ""
            };
            if (l.activity_by_user && l.activity_by_user.canJoinActs && l.activity_by_user.canJoinActs.forEach(function(e) {
                "vip_reduction" === e.type && (w.vip_price = l.vip_price, w.end_date = l.vip_end_date);
            }), w.vip_price ? n.push({
                extra: {
                    price_type: "1",
                    goods_id: c || ""
                }
            }) : n.push(), u && t.getDeliveryInfo(c), "booking" === d) {
                var b = t.countdown();
                u || i.request("time/get", {}, function(e, a) {
                    var o = e.data || new Date().getTime() / 1e3;
                    l.action_button.booking.pre_end_time <= o || !l.is_stock ? t.setData({
                        "curGoods.action_button.booking.finish": !0
                    }) : b.init(l.action_button.booking.pre_end_time, o, function(e) {
                        t.setData({
                            bookingCdStr: e
                        });
                    }, function() {
                        t.setData({
                            bookingCdStr: "",
                            "curGoods.action_button.booking.finish": !0
                        });
                    });
                }), o.data.booking_rules.rules_detail && (o.data.booking_rules.rules_detail = o.data.booking_rules.rules_detail.split("\n"));
            }
            var I = o.data.product_info.product_desc.match(/<[^]*<\/[^>]+>/g), D = "";
            I && I.length && (D = I[0].replace(/<[^>]+>/g, "")), t.setData({
                loaded: !0,
                id: e,
                sku: l.sku,
                name: o.data.product_info.name,
                desc: t.filterHtml(o.data.product_info.product_desc) || "",
                descExtend: D,
                stock: l.is_stock,
                gallery_img: _,
                show_dot: _.length > 1,
                btn: l.is_stock ? "立即购买" : "暂时缺货",
                goods_id: c,
                activity: h,
                goodsName: l.name,
                goodsImg: l.img_url,
                productContent: m,
                price: parseFloat(l.price),
                marketPrice: l.market_price ? parseFloat(l.market_price) : 0,
                sale_mode: d,
                is_bigtap: u,
                webview: l.action_button,
                reduce_price: l.reduce_price ? l.reduce_price : "",
                shipment_text: l.shipment_text ? l.shipment_text : "",
                applyCoupon: l.apply_coupons ? t.formatCoupon(l.apply_coupons) : [],
                userCoupon: l.user_coupons ? t.formatCoupon(l.user_coupons) : [],
                actCoupon: g.length ? g[0] : "",
                useCouponPrice: p > 0 ? p : 0,
                ypTag: o.data.product_info.price_tips,
                aftersale_service: l.aftersale_service || null,
                service_refound_policy: l.service_refound_policy || "",
                vipInfo: w,
                vipPriceCfg: o.data.special_price_cfg || "",
                curGoods: l,
                booking_rules: o.data.booking_rules,
                moneyRebate: o.data.rebate || ""
            }), o.data.rebate && t.getMoneyUserRole(), t.toggleTabs();
        }), i.request("product/commentList", {
            product_id: e,
            page_size: 1
        }, function(e, a) {
            a || t.setData({
                comments: e.data
            });
        });
        var r = parseInt(e);
        r >= 1 && r <= 9999 && i.request("recommend/product", {
            product_id: e
        }, function(e, a) {
            if (!a) {
                var o = e.data;
                for (var n in o) o[n].img_map || (o[n].img_map = {}), o[n].img_url = o[n].img_map.img_1_1[0] || o[n].img_url;
                t.setData({
                    rec_list: o
                });
            }
        }, !1, !0);
    },
    getDeliveryInfo: function(e) {
        var t = this, a = this, o = "", n = {
            goodsID: e
        };
        (o = wx.getStorageSync("checkout:address")) ? (this.setData({
            addressID: o
        }), n.addressID = o, r.getDeliveryInfo(n).then(function(a) {
            if (!a.storage && !a.address) return wx.removeStorageSync("checkout:address"), void t.getDeliveryInfo(e);
            t.storage = a.storage, t.setData({
                address: a.address
            }), t.getHDInfo(e);
        }).catch(function(e) {
            t.setData({
                hdBtn: "已售罄"
            });
        })) : wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var o = t.latitude, i = t.longitude;
                n.lat = o, n.lng = i, s.convertCoordinateForAMAP(t).then(function(o) {
                    return n.lat = t.latitude, n.lng = t.longitude, n.adcode = o.adcode, new Promise(function(t, o) {
                        r.getDeliveryInfo(n).then(function(t) {
                            a.storage = t.storage, a.setData({
                                address: t.address
                            }), a.getHDInfo(e);
                        }).catch(function(e) {
                            a.setData({
                                hdBtn: "已售罄"
                            });
                        });
                    });
                }).catch(function(e) {
                    a.setData({
                        hdBtn: "已售罄"
                    });
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "请先添加收货地址",
                    success: function(e) {
                        e.confirm && wx.navigateTo({
                            url: "/pages/address/index"
                        });
                    }
                });
            }
        });
    },
    getHDInfo: function(e) {
        var t = this, a = this, o = "";
        this.storage ? r.getHDInfo({
            storage: this.storage,
            goodsID: e,
            source: "booking" === a.data.sale_mode ? "presales_bigtap" : "bigtap"
        }).then(function(n) {
            switch (n.hdstatus) {
              case 1:
                o = "即将开始", t.salt = n.salt, r.countDown({
                    startTime: n.startTime,
                    systemTime: n.systemTime,
                    callback: function(e) {
                        e ? a.setData({
                            leftTime: e
                        }) : a.setData({
                            hdBtn: "立即购买"
                        });
                    }
                });
                break;

              case 2:
                o = "立即购买", t.salt = n.salt, t.openBigTapImmediately && (t.salt ? t.rushForGoods() : t.getHDInfo(e));
                break;

              case 3:
                o = "已售罄";
                break;

              case 4:
                o = "活动结束";
                break;

              default:
                o = "已售罄";
            }
            t.setData({
                hdBtn: o
            });
        }) : this.setData({
            hdBtn: "已售罄"
        });
    },
    rushForGoods: function(e) {
        if (!this.data.isRushing) {
            var t = this, a = e ? e.currentTarget.dataset : {}, o = this.data.goods_id, n = a.type;
            this.setData({
                isRushing: !0
            }), r.rush({
                goodsID: o,
                num: this.numberOfProductsFromBigTap,
                storage: this.storage,
                salt: this.salt,
                source: "booking" === t.data.sale_mode ? "presales_bigtap" : "bigtap"
            }).then(function(e) {
                2 == e.hdstatus ? e.hdurl ? "0" != n && n ? (t.data.quick_order = 1, t.addCard(e.hdurl)) : t.addCard(e.hdurl) : t.setData({
                    hdBtn: "已售罄",
                    isRushing: !1,
                    layerSellingOut: !0
                }) : 3 == e.hdstatus ? t.setData({
                    hdBtn: "已售罄",
                    isRushing: !1,
                    layerSellingOut: !0
                }) : 4 == e.hdstatus && t.setData({
                    hdBtn: "活动结束"
                });
            }).catch(function(e) {
                t.setData({
                    hdBtn: "已售罄",
                    isRushing: !1,
                    layerSellingOut: !0
                });
            });
        }
    },
    stopRushing: function(e) {
        this.setData({
            isRushing: !1
        }), r.stopRushing();
    },
    closeLayerSellingOut: function() {
        this.setData({
            layerSellingOut: !1
        });
    },
    openWebview: function(e) {
        var t = e.currentTarget.dataset.url || "";
        t && wx.navigateTo({
            url: "/pages/webview/index?url=" + encodeURIComponent(t)
        });
    },
    tapAddCart: function(e) {
        var t = this, a = e.currentTarget.dataset.quickOrder, o = {
            analyse: "tap"
        };
        "0" === a ? o.logCode = "wx#bid=3034668.1&page=product" : "1" === a && (o.logCode = "wx#bid=3034668.2&page=product"), 
        t.data.vipInfo.vip_price && (o.extra = {
            price_type: "1",
            goods_id: t.data.goods_id || ""
        }), n.push(o), t.addCartRouter(a);
    },
    sub: function(e, t) {
        var a = void 0, o = void 0, n = void 0;
        try {
            a = e.toString().split(".")[1].length;
        } catch (e) {
            a = 0;
        }
        try {
            o = t.toString().split(".")[1].length;
        } catch (e) {
            o = 0;
        }
        return n = Math.pow(10, Math.max(a, o)), (e * n - t * n) / n;
    },
    addCartRouter: function(e) {
        var t = this, a = 0, o = !1;
        if ("1" === e && (a = 1), t.setData({
            quick_order: a
        }), 1 !== a || t.data.is_batched || "standard" !== t.data.sale_mode && "booking" !== t.data.sale_mode ? 1 === a && t.data.is_batched && t.data.batchGoodsIDs && (o = !0) : o = !0, 
        o) t.addCard(); else {
            var n = "select/index?id=" + t.data.id + "&goodsId=" + t.data.goods_id + "&num=1&from=product&quickOrder=" + a + "&frommoney=" + t.data.frommoney + "&inviteCode=" + t.data.fromShareInviteCode;
            t.data.position_id && (n += "&posID=" + t.data.position_id), wx.navigateTo({
                url: n,
                fail: function(e) {
                    wx.redirectTo({
                        url: n
                    });
                }
            });
        }
    },
    addCard: function(e) {
        var t = this;
        a.showLoading();
        var o = {
            product_id: t.data.goods_id,
            consumption: 1,
            sku: t.data.sku,
            quick_order: t.data.quick_order,
            position_id: t.data.position_id,
            insurance_goods_id: t.serviceGoodsId
        };
        e && (o.token = e, o.source = "bigtap"), t.data.batchGoodsIDs && (o.item_id = t.data.batchGoodsIDs), 
        "booking" === t.data.sale_mode && (o.source = e ? "booking_bigtap" : t.data.curGoods.action_button.source, 
        o.quick_order = 1, t.setData({
            quick_order: 1
        })), i.request("cart/add", o, function(e, o) {
            if (a.hideLoading(), (t.data.isRushing || t.data.layerSellingOut) && t.setData({
                isRushing: !1,
                layerSellingOut: !1
            }), o) if (2003009 == o.code) a.showError(o.desc); else if (10001002 == o.code || 10001008 == o.code) a.showError("网络开小差了了~请稍后再试"); else {
                var n = o.desc || "网络开小差了了~请稍后再试";
                a.showError(n);
            } else t.data.quick_order ? wx.navigateTo({
                url: "../checkout/index?quick_order=" + t.data.quick_order + "&salemode=" + t.data.sale_mode
            }) : wx.switchTab({
                url: "/pages/mycart/index"
            });
        });
    },
    viewImage: function(e) {
        var t = e.currentTarget.dataset, o = t.current, n = t.urls;
        wx.previewImage({
            current: a.formatUrl(o),
            urls: n.map(a.formatUrl)
        });
    },
    showDesc: function() {
        this.setData({
            show_desc: !0,
            show_param: !1
        });
    },
    showParam: function() {
        this.setData({
            show_desc: !1,
            show_param: !0
        });
    },
    getCartCount: function() {
        var e = this;
        i.request("cart/count", {}, function(t, a) {
            if (!a) {
                var o = parseInt(t.data.result);
                o > 0 && e.setData({
                    cartCount: o
                });
            }
        });
    },
    filterHtml: function(e) {
        if (e) return e.replace(/<[^]*<\/[^>]+>/g, "");
    },
    formatCoupon: function(e) {
        if (e && e.length) {
            var t = [];
            return e.forEach(function(e) {
                e.startDate = a.formatTime(e.start_time), e.endDate = a.formatTime(e.end_time), 
                e.moneyNum = parseFloat(e.money) % 1 > 0 ? e.money : parseInt(e.money), t.push(e);
            }), t;
        }
    },
    tapToggleCoupon: function(e) {
        var t = this;
        t.data.couponShow ? t.setData({
            couponShow: !1
        }) : t.setData({
            couponShow: !0
        });
    },
    getCoupon: function(e) {
        var t = this, o = e.currentTarget.dataset.id, n = e.currentTarget.dataset.code;
        !!e.currentTarget.dataset.has || i.request("coupon/draw", {
            act_code: n,
            act_id: o
        }, function(e, n) {
            if (n) a.showError(n.desc); else if (0 === e.code) {
                wx.showToast({
                    title: "领取成功",
                    icon: "success",
                    duration: 2e3,
                    complete: function() {}
                });
                var i = t.data.applyCoupon;
                i.forEach(function(e) {
                    e.event.act_id === o && (e.isHas = !0);
                }), t.setData({
                    applyCoupon: i
                });
            } else a.showError(e.error);
        });
    },
    countCouponTime: function(e, t) {
        var a = this, o = t || new Date().getTime() / 1e3, n = e.end_time - o;
        if (!(n <= 0)) {
            var i = void 0, r = void 0, s = void 0, d = void 0, u = "", c = void 0, l = function(e) {
                return e >= 10 ? e : "0" + e;
            };
            !function e() {
                n > 0 ? (i = Math.floor(n % 60), r = Math.floor(n / 60 % 60), s = Math.floor(n / 3600 % 24), 
                d = Math.floor(n / 86400) > 0 ? Math.ceil(n / 86400) : 0, u = "", d > 0 && (u = d + "天 "), 
                u += l(s) + ":", u += l(r) + ":", u += l(i), a.setData({
                    actCouponSurplus: u
                }), c && clearTimeout(c), c = setTimeout(function() {
                    n -= 1, e();
                }, 1e3)) : c && clearTimeout(c);
            }();
        }
    },
    countdown: function() {
        var e = function() {};
        return e.prototype = {
            init: function(e, t, a, o) {
                var n = t || new Date().getTime() / 1e3, i = (e || 0) - n;
                i <= 0 || (this.countdownTimer = null, this.callback = a, this.timeupCallback = o, 
                this.timer(i));
            },
            numStr: function(e) {
                return e >= 10 ? e : "0" + e;
            },
            timer: function(e) {
                var t = this, a = void 0, o = void 0, n = void 0, i = {};
                e > 0 ? (a = Math.floor(e % 60), o = Math.floor(e / 60 % 60), n = Math.floor(e / 3600 % 24), 
                i = {
                    d: Math.floor(e / 86400) > 0 ? Math.ceil(e / 86400) : 0,
                    h: t.numStr(n),
                    m: t.numStr(o),
                    s: t.numStr(a)
                }, t.callback && t.callback(i), t.countdownTimer && clearTimeout(t.countdownTimer), 
                t.countdownTimer = setTimeout(function() {
                    e -= .1, t.timer(e);
                }, 100)) : (t.countdownTimer && clearTimeout(t.countdownTimer), t.timeupCallback && t.timeupCallback());
            },
            stop: function() {
                this.countdownTimer && clearTimeout(this.countdownTimer);
            }
        }, new e();
    },
    disableBubble: function() {},
    toggleTabs: function(e) {
        var t = this, a = e ? e.currentTarget.dataset.index : 0, o = t.data.productContent;
        o.forEach(function(e, t) {
            e.show = t === a;
        }), t.setData({
            productContent: o
        });
    },
    tapToggleVip: function() {
        var e = this;
        e.data.showVipIntro ? e.setData({
            showVipIntro: !1
        }) : (e.setData({
            showVipIntro: !0
        }), n.push({
            analyse: "tap",
            extra: {
                price_type: "1",
                goods_id: e.data.goods_id || ""
            }
        }));
    },
    tapToggleBooking: function() {
        var e = this;
        e.data.showBookingRules ? e.setData({
            showBookingRules: !1
        }) : e.setData({
            showBookingRules: !0
        });
    },
    getMoneyUserRole: function() {
        var e = this;
        i.request("rebate/userRole", {}, function(t, a) {
            if (!a) {
                var o = t.data.userinfo;
                o.isAgent = "1" === o.role, e.setData({
                    moneyUserInfo: o,
                    moneyShareTitle: t.data.share_product_title || "%s",
                    moneyUserInfoGeted: "1" === o.role
                }), "1" !== o.role ? (e.getMoneyShareInfo(), "3" === e.data.frommoney && t.data.show_product_banner && e.setData({
                    showMoneyBanner: !0
                })) : e.setData({
                    moneyAgentShareTip: !!wx.getStorageSync("showMoneyAgentShareTip")
                }), (o.isAgent || "1" === e.data.frommoney) && e.setData({
                    isMoneyProduct: !0
                }), e.data.fromShareInviteCode && e.reportInviteCode();
            }
        });
    },
    getMoneyShareInfo: function() {
        var e = this;
        i.request("rebate/shareInfo", {}, function(t, a) {
            if (!a) {
                for (var o = 0; o < t.data.invite_need_num; o += 1) t.data.invite_user_list[o] || t.data.invite_user_list.push(0);
                e.setData({
                    moneyUserInfoGeted: !0,
                    "moneyUserInfo.needInviteUser": t.data.invite_need_num - t.data.invite_user_num,
                    moneyShareData: t.data.share,
                    "moneyUserInfo.invite_user_num": t.data.invite_user_num,
                    "moneyUserInfo.invite_need_num": t.data.invite_need_num,
                    "moneyUserInfo.invite_user_list": t.data.invite_user_list,
                    "moneyShareData.pyqImageUrl": ""
                });
            }
        });
    },
    tapShareMoney: function() {
        var e = this;
        e.data.moneyUserInfo.isAgent || "1" === e.data.moneyUserInfo.status ? e.data.moneyAgentShareTip || e.toggleMoneyAgentShareTip() : e.data.moneyUserInfo && e.data.moneyUserInfo.needInviteUser > 0 ? e.setData({
            showMoneyTip: !0
        }) : e.data.moneyUserInfo.isAgent || wx.navigateTo({
            url: "/pages/money/agent/index?code=" + (e.data.fromShareInviteCode === e.data.moneyUserInfo.invite_code ? "" : e.data.fromShareInviteCode)
        });
    },
    tapToggleShareMoneyTip: function() {
        var e = this;
        e.data.showMoneyTip ? e.setData({
            showMoneyTip: !1
        }) : e.setData({
            showMoneyTip: !0
        });
    },
    reportInviteCode: function() {
        var e = this;
        i.request("rebate/clickShare", {
            code: e.data.fromShareInviteCode || ""
        }, function(t, a) {
            a || t.data.is_new_user && t.data.invite_code && !e.data.moneyUserInfo.invite_code && e.setData({
                "moneyUserInfo.invite_code": t.data.invite_code
            });
        });
    },
    getFormId: function(e) {
        var t = e.detail.formId;
        t && i.request("rebate/reportFormId", {
            form_id: t,
            origin: "rebate"
        }, function(e, t) {});
    },
    getMoneyShareImg: function() {
        var e = this;
        a.showLoading(), i.request("rebate/shareImage", {
            goods_id: e.data.goods_id
        }, function(t, o) {
            a.hideLoading(), o || e.setData({
                "moneyShareData.pyqImageUrl": t.data || ""
            }), e.setData({
                showMoneyShare: !0
            });
        });
    },
    closeMoneyShare: function() {
        this.setData({
            showMoneyShare: !1
        });
    },
    shareFriends: function(e) {
        var t = this, a = "client_id=" + o.client_id;
        a += ";channel_id=" + o.channel_id, a += ";serviceToken=" + encodeURIComponent(i.storageData.serviceToken), 
        a += ";xm_open_id=" + i.storageData.xm_open_id, t.setData({
            showMoneyShare: !1
        }), wx.downloadFile({
            url: t.data.moneyShareData.pyqImageUrl,
            header: {
                cookie: a
            },
            success: function(e) {
                var t = e.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(e) {
                        wx.showToast({
                            title: "图片已保存，赶快分享吧",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "保存失败",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "保存失败",
                    icon: "loading",
                    duration: 1e3
                });
            }
        });
    },
    toggleMoneyAgentShareTip: function() {
        var e = this;
        e.data.showMoneyAgentShareTip && wx.setStorageSync("showMoneyAgentShareTip", "1"), 
        e.setData({
            showMoneyAgentShareTip: !e.data.showMoneyAgentShareTip,
            moneyAgentShareTip: !!e.data.showMoneyAgentShareTip
        });
    }
});
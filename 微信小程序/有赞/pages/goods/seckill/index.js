!function(e) {
    function t(s) {
        if (i[s]) return i[s].exports;
        var a = global.installedModules[s] = i[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e), e = Object.assign(require("../../../vendors.js").modules, e);
    var i = {};
    i = global.installedModules = global.installedModules || {}, t.m = e, t.c = i, t.d = function(e, i, s) {
        t.o(e, i) || Object.defineProperty(e, i, {
            configurable: !1,
            enumerable: !0,
            get: s
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var i = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(i, "a", i), i;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 224);
}({
    222: function(e, t, i) {
        function s(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        var a = i(50), o = getApp(), n = i(5), r = i(2), c = i(7), u = i(49).parse, l = null, h = "groupOn", d = "seckill", p = {
            parse: function(e) {
                var t = {}, i = this.parseBrief(e), s = this.parseSku(e), a = e.components[0], c = +a.shipment;
                t.id = i.item_id, t.title = i.title, t.subTitle = a.sub_title, t.hide_stock = 1 == a.hide_stock, 
                t.price = this.parsePrice(e), t.quota = +i.quota, t.quotaUsed = +i.quota_used, t.isDisplay = "1" == i.is_display, 
                t.purchaseLimit = !!i.purchase_limit, t.presale = +i.presale, t.sell_point = i.sell_point;
                var u = i.presale_info;
                t.presale && u && (0 === u.etd_type ? t.presaleDesc = u.etd_start.replace(/-/g, ".") + "开始发货" : 1 === u.etd_type && (t.presaleDesc = "付款" + u.etd_days + "天后发货")), 
                t.pictureRatio = 0, t.picture = [], t.originPicture = [], n(i.picture, function(e) {
                    t.picture.push(r(e.url, "!730x0.jpg")), t.originPicture.push(e.url), t.pictureRatio = Math.max(.5, Math.min(1, Math.max(t.pictureRatio, +e.height / +e.width)));
                }), t.pictureWidth = o.getSystemInfoSync().windowWidth, t.pictureHeight = Math.ceil(t.pictureWidth * t.pictureRatio);
                var l = [], p = e.components[0];
                l.push(p), l.push({
                    type: "rich_text",
                    fullscreen: 0,
                    color: "#f9f9f9",
                    content: p.originContent
                }), l = l.concat(e.components.slice(1)), console.log("==== showcase content ====", l);
                var f = {}, g = e.activity.goods_preference || {};
                if (g.is_started) if (g.type == h) (f = g).description = (g.activity_extra && g.activity_extra.join_num) + "人拼团价"; else if ("timelimitedDiscount" == g.type) f = g; else if (g.type === d) {
                    var m = g.start_time, k = g.remain_time, _ = g.begin_at;
                    f = g, 0 === g.status && (f.is_started = !1);
                    var S = new Date(_);
                    f.seckillNotice = {
                        date: S.getDate(),
                        time: S.toTimeString().replace(/(\d\d:\d\d:\d\d).*/, "$1")
                    }, f.countdownTitle = m > 0 ? "距开始仅剩" : "距结束仅剩", f.remain = Date.now() + 1e3 * (m > 0 ? m : k);
                }
                var v = "string" == typeof e.delivery ? {
                    postage_desc: e.delivery
                } : e.delivery;
                return v.postage_desc = (v.postage_desc || "").replace("~", "-"), v.support = [], 
                v.desc = {}, v.support_express_delivery && (v.support.push("快递"), v.desc["快递发货"] = v.express_desc), 
                v.support_local_delivery && (v.support.push("同城送"), v.desc["同城配送"] = v.local_delivery_desc), 
                v.support_self_fetch && (v.support.push("自提"), v.desc["自提"] = !0), v.length = v.support.length, 
                v.support = v.support.join("、"), {
                    sku: s,
                    goods: t,
                    showcaseContent: l,
                    shipmentType: c,
                    goodsPreference: g,
                    orderPreference: this.parseOrderPreference(e.activity.order_preference),
                    timelimitedDiscount: f,
                    delivery: v,
                    virtualStatus: i.is_virtual,
                    supportShoppingCart: 0 == i.is_virtual
                };
            },
            parseBrief: function(e) {
                var t = e.brief, i = e.sku, s = e.activity.goods_preference;
                return s && s.is_started && i.none_sku && (t.origin = t.price, t.price = s.show_price), 
                t;
            },
            parseSku: function(e) {
                var t = e.sku;
                return t.mapList = {}, n(t.list, function(e) {
                    t.mapList[[ e.s1, e.s2, e.s3 ].join("-")] = e;
                }), t.mapTree = {}, n(t.tree, function(e) {
                    n(e.v, function(e) {
                        t.mapTree[e.id] = e;
                    });
                }), t;
            },
            parsePrice: function(e) {
                var t = {}, i = {
                    desc: e.sku.price,
                    min: e.sku.min_price,
                    deletedPriceDesc: e.brief.origin
                }, s = e.activity.goods_preference, a = s.type === d && 0 === s.status;
                return !s || a ? !e.sku.none_sku && e.sku.origin ? i.desc = e.sku.origin : i.desc = e.brief.origin : s && s.is_started && (e.sku.origin = e.sku.price, 
                e.sku.price = s.show_price, e.sku.min_price = (s.price_range.min || 0) + "", e.sku.max_price = (s.price_range.max || 0) + "", 
                n(e.sku.list, function(e) {
                    s.skus[e.id] && (e.price = s.skus[e.id].price);
                })), (t = e.sku.none_sku || e.sku.min_price == e.sku.max_price ? {
                    desc: e.sku.price,
                    yuan: e.sku.price.split(".")[0],
                    fen: e.sku.price.split(".")[1],
                    isRange: !1
                } : {
                    desc: e.sku.price,
                    isRange: !0,
                    min: {
                        desc: e.sku.min_price,
                        yuan: e.sku.min_price.split(".")[0],
                        fen: e.sku.min_price.split(".")[1]
                    },
                    max: {
                        desc: e.sku.max_price,
                        yuan: e.sku.max_price.split(".")[0],
                        fen: e.sku.max_price.split(".")[1]
                    }
                }).origin = i, t;
            },
            parseOrderPreference: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = [], i = "", s = [];
                e.cashBack = null;
                var a = e.cashBack, o = e.meetReduce, r = !1;
                return a && (t.push("返现"), i = "前" + a.cashback_limit + "笔订单返现；"), o && o.length && (t.push("满减"), 
                n(o, function(e) {
                    var t = [], i = "元";
                    2 == e.meet_type && (i = "件"), e.cash ? t.push("满" + e.meet + i + "减" + e.cash) : e.discount ? t.push("满" + e.meet + i + "打" + e.discount + "折") : t.push("满" + e.meet + i), 
                    e.postage && (t.push("包邮"), r = !0), e.coupon_detail && t.push("送" + e.coupon_detail.value + "元优惠券"), 
                    e.present_detail && t.push("送" + e.present_detail.title + "赠品"), +e.score && t.push("送" + e.score + "积分"), 
                    s.push(t.join("，"));
                })), r && t.push("包邮"), e.labels = t, e.cashBackDesc = i, e.meetReduceDesc = s.join("；"), 
                e;
            },
            generateSkuDesc: function() {
                var e = this.data, t = e.selectedSKU, i = e.sku, s = [];
                if (i.mapList[this.getSelectedSkuKey()]) {
                    s.push("已选:");
                    for (var a = 1; a <= i.tree.length; a++) s.push(i.mapTree[t["s" + a]].name);
                } else {
                    s.push("选择:");
                    for (var o = 1; o <= i.tree.length; o++) 0 == t["s" + o] && s.push(i.tree[o - 1].k);
                }
                this.setData({
                    "sku.desc": s.join(" ")
                });
            },
            getSelectedSkuKey: function() {
                var e = this.data.selectedSKU;
                return [ e.s1, e.s2, e.s3 ].join("-");
            },
            generateRemianTime: function() {
                var e = this.data.timelimitedDiscount;
                if (e && e.is_started) {
                    if (this.assistData.remain = Date.now() + 1e3 * e.end_remain_time, this.data.goodsPreference.type == h) {
                        var t = [];
                        this.data.goodsPreference.activity_extra.ongoing_group.forEach(function(e) {
                            t.push(Date.now() + 1e3 * e.remain_time);
                        }), this.assistData.ongoing_group_remain = t;
                    } else this.data.goodsPreference.type == d && (this.assistData.remain = e.remain);
                    this.countdown();
                }
            },
            countdown: function() {
                if (this.assistData.remain) {
                    var e = this.assistData.remain - Date.now(), t = this.assistData.ongoing_group_remain || [];
                    if (e < 0) return clearTimeout(l), this.assistData.remain = "", "function" == typeof this.refresh && this.refresh();
                    var i = u(e), s = {
                        isStarted: this.data.goodsPreference.start_time <= 0,
                        isEnded: this.data.goodsPreference.remain_time <= 0,
                        type: this.data.goodsPreference.type,
                        name: this.data.goodsPreference.description
                    }, a = [];
                    t.forEach(function(e) {
                        var t = e - Date.now(), i = c.format(t).data;
                        a.push(c.formatDayWithZero(i.hour) + ":" + c.formatDayWithZero(i.minute) + ":" + c.formatDayWithZero(i.second));
                    }), this.setData({
                        countdown: i,
                        ongoing_group: a,
                        activity: s
                    }), l = setTimeout(this.countdown, 1e3);
                }
            },
            onUnload: function() {
                clearTimeout(l);
            },
            handleDetailImageLoad: function(e) {
                var t, i = e.currentTarget.dataset.index, a = o.getSystemInfoSync();
                if (a) {
                    var n = a.windowWidth, r = e.detail.width, c = e.detail.height, u = Math.min(n, r), l = Math.floor(u * c / r);
                    this.setData((s(t = {}, "goods.content[" + i + "].width", u + "px"), s(t, "goods.content[" + i + "].height", l + "px"), 
                    t));
                }
            },
            onDrbarClick: function() {
                this.setData({
                    showPriceIntro: !0
                });
            },
            closePricePopup: function() {
                this.setData({
                    showPriceIntro: !1
                });
            },
            handlePreviewContentImage: function(e) {
                var t = e.currentTarget.dataset.index, i = this.data.goods.content, s = i[t].url, a = i.filter(function(e) {
                    return "image" === e.type;
                }).map(function(e) {
                    return e.url;
                });
                wx.previewImage({
                    current: s,
                    urls: a
                });
            }
        };
        e.exports = Object.assign({}, a, {
            assistData: {
                pictureIndex: 0
            }
        }, p);
    },
    223: function(e, t, i) {
        var s = i(3), a = getApp(), o = {
            goCartPage: function() {
                s.switchTab({
                    url: "/pages/goods/cart/index"
                });
            },
            goHomePage: function() {
                s.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            fetchUserInfo: function() {
                var e = this;
                a.getUserInfo(function(t) {
                    e.setData({
                        userInfoDeny: a.globalData.userInfoDeny,
                        userInfo: t.userInfo
                    }), a.updateYouzanUserInfo(t.userInfo);
                }, function(t) {
                    e.setData({
                        userInfoDeny: a.globalData.userInfoDeny
                    });
                });
            }
        };
        e.exports = Object.assign({}, o);
    },
    224: function(e, t, i) {
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
            }
            return e;
        }, o = s(i(0)), n = s(i(3)), r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t.default = e, t;
        }(i(1)), c = i(14), u = i(223), l = i(222), h = i(8), d = i(12), p = d.tryLocation, f = d.calcDistance, g = d.parseDistance, m = i(20), k = i(4), _ = {
            "店铺认证": "该店铺已通过有赞店铺认证",
            "企业认证": "该店铺已通过有赞企业认证",
            "个人认证": "该店铺已通过有赞个人认证",
            "担保交易": "商家发货后7天或买家确认收货后，支付金额结算到商家",
            "线下门店": "该店铺拥有线下实体门店"
        }, S = getApp(), v = !1;
        (0, o.default)(r.Toast, r.Actionsheet, r.Tab, c, l, u, h, m, {
            originData: {},
            data: {
                themeClass: S.themeClass,
                alias: "",
                height: "750rpx",
                goods: null,
                selectedSKU: {
                    s1: 0,
                    s2: 0,
                    s3: 0,
                    price: null,
                    stockNum: null,
                    skuId: null
                },
                seckillId: "",
                timelimitedDiscount: {},
                countdown: [],
                shopCert: [],
                tradeOrderPaid: !1,
                supportShoppingCart: !1,
                cartCount: 0,
                shipmentType: 0,
                haveLoged: !1,
                page_path: "",
                userInfo: null,
                userInfoDeny: !1,
                shopSetting: {
                    show_soldcount: !0
                },
                goodsPreference: {},
                isSetHome: !1,
                isSetShoppingCart: !0,
                isSetContact: !1,
                isSkStart: !1,
                isSkStock: !0,
                isSkEnd: !1,
                isSkBooked: !0,
                isSkCheckBook: !1,
                bookNum: 0,
                useQuestion: !1,
                useFollow: !1,
                questionId: "",
                isStock: !1,
                isLoading: !0,
                isPopupVisible: !1,
                questionDesc: "",
                questionItemList: [],
                answerKey: "",
                selectedKey: "",
                wrongKey: "",
                isLoadingQuestion: !1,
                isBookLoading: !1,
                bottomInfoText: "",
                showBindPhoneNumber: !1,
                bindTips: "",
                im: {
                    businessId: ""
                },
                actionsheet: {
                    show: !1,
                    cancelText: "取消",
                    closeOnClickOverlay: !0,
                    actions: [ {
                        name: "发送给朋友",
                        openType: "share"
                    }, {
                        name: "分享到朋友圈"
                    } ]
                },
                shareImage: {}
            },
            onShareAppMessage: function() {
                var e = {
                    title: this.data.goods.title,
                    desc: this.data.goods.subTitle,
                    path: "/pages/goods/seckill/index?alias=" + this.data.alias
                }, t = (this.data.goods.picture || [])[0];
                return t && (e.imageUrl = t), e;
            },
            onLoad: function(e) {
                var t = this;
                this.setData({
                    alias: e.alias,
                    aid: e.aid
                }), S.getShopCert(function(e) {
                    e = e.map(function(e) {
                        return {
                            name: e,
                            intro: _[e]
                        };
                    }), t.setData({
                        shopCert: e
                    });
                }), this.setShopStatus(), this.fetchSeckillDetail();
            },
            onShow: function() {
                var e = this;
                this.storeChangeCb = function() {
                    e.fetchSeckillDetail();
                }, S.on("app:offlineId:change", this.storeChangeCb), this.fetchCartCount(), this.fetchContactPermission(), 
                this.fetchShopSetting(), this.setData({
                    copyright: S.globalData.copyright,
                    is_big_shop: S.globalData.is_big_shop
                }), S.getShopInfo().then(function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    t.isJoined = t.security && t.security.joined, e.setData({
                        shop: t
                    });
                }).catch(function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.showZanToast(t.msg || t.message || "获取店铺信息失败");
                });
            },
            fetchShopSetting: function() {
                var e = this;
                S.getShopSetting().then(function(t) {
                    var i = 1 == t.isGoodsOrdersDisplayed;
                    e.setData({
                        shopSetting: {
                            show_soldcount: i
                        }
                    }), i && e.initSaleRecordTab();
                });
            },
            onHide: function() {
                S.off("app:offlineId:change", this.storeChangeCb);
            },
            onDrbarClick: function() {
                this.setData({
                    showPriceIntro: !0
                });
            },
            setShareImageData: function() {
                var e = this.data.goods, t = this.data.goodsPreference, i = e.picture[0];
                i && this.setData({
                    shareImage: {
                        show: !1,
                        goodsImage: i,
                        title: e.title,
                        alias: this.data.alias,
                        goodsPreference: t,
                        type: t.type,
                        price: e.price.desc,
                        originPrice: e.price.origin.desc,
                        joinNum: (t.activity_extra || {}).join_num,
                        showPrice: t.show_price,
                        minPrice: e.price.origin.min
                    }
                });
            },
            closePricePopup: function() {
                this.setData({
                    showPriceIntro: !1
                });
            },
            toggleCertIntroPopup: function() {
                this.setData({
                    showCertIntro: !this.data.showCertIntro
                });
            },
            refresh: function() {
                wx.redirectTo({
                    url: "/pages/goods/seckill/index?alias=" + this.data.alias
                });
            },
            fetchCartCount: function() {
                var e = this;
                S.carmen({
                    api: "kdt.trade.cart/1.0.0/count",
                    success: function(t) {
                        e.setData({
                            cartCount: +t.data
                        });
                    }
                });
            },
            fetchSeckillDetail: function() {
                var e = this;
                wx.showToast({
                    title: "加载中",
                    icon: "loading"
                });
                var t = {
                    alias: this.data.alias
                };
                S.carmen({
                    api: "weapp.wsc.item.seckill/1.0.0/get",
                    query: t,
                    success: function(t) {
                        e.originData = JSON.parse(JSON.stringify(t)), e.setData({
                            isLoading: !1
                        }), e.setSeckillDetailData(t);
                    },
                    fail: function() {
                        wx.redirectTo({
                            url: "/pages/goods/seckill/end"
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            },
            tapExpressPopupOrCell: function() {
                this.data.delivery.length <= 1 || this.setData({
                    showExpressIntroPopup: !this.data.showExpressIntroPopup
                });
            },
            setSeckillDetailData: function(e) {
                var t = this, i = l.parse.call(this, e), s = e.activity.goods_preference || {}, o = e.components[0], n = (i.goods || {}).price || {}, r = "/pages/goods/seckill/index?alias=" + this.data.alias + "&price=" + n.desc;
                this.showShowcaseComponents(i.showcaseContent, 3), this.setData(a({
                    id: i.goods.id
                }, i, {
                    page_path: r,
                    seckillId: s.id || "",
                    sku: a({}, i.sku, {
                        stock_num: s.total_current_stock
                    })
                }), function() {
                    S.trigger("goodsDetail:loaded", i.goods.id);
                }), this.data.isMultiStore && p(function(e) {
                    var i = e.lng, a = e.lat;
                    0 === s.total_current_stock && t.fetchRecommendStores({
                        lng: i,
                        lat: a
                    });
                    var o = f({
                        lng: i,
                        lat: a
                    }, t.data.CURRENT_GLOBAL_SHOP);
                    S.setShopInfo({
                        distance: g(1e3 * o)
                    });
                }, function() {
                    0 === s.total_current_stock && t.fetchRecommendStores();
                }), this.setSeckillStatus(s), this.setOriginStatus(o), l.generateSkuDesc.call(this), 
                0 !== s.status && l.generateRemianTime.call(this), this.setShareImageData();
            },
            setShopStatus: function() {
                var e = this;
                S.getShopStatus(function(t) {
                    e.setData({
                        isSetShoppingCart: t.is_set_shopping_cart
                    });
                });
            },
            fetchRecommendStores: function(e) {
                var t = this;
                S.carmen({
                    api: "weapp.multistore.offline/1.0.0/getgoodssalablestorelist",
                    query: Object.assign({
                        item_id: this.data.goods.id,
                        current_store_id: S.getOfflineId()
                    }, e),
                    success: function(e) {
                        e = e.map(function(e) {
                            return e.distance = e.distance || 0, e.distance > 1e4 ? e.distance = "> 10km" : e.distance > 1e3 ? e.distance = (e.distance / 1e3).toFixed(2) + "km" : e.distance = e.distance.toFixed(2) + "m", 
                            e;
                        }), t.setData({
                            stores: e
                        });
                    },
                    fail: function(e) {
                        t.setData({
                            stores: [ {
                                id: 1
                            } ]
                        }), t.showZanToast(e.msg || "获取推荐网点失败");
                    }
                });
            },
            redrectToStore: function(e) {
                var t = e.target.dataset, i = t.storeId, s = t.index;
                if (i) {
                    var a = this.data.stores[s];
                    a.shop_name = this.data.CURRENT_GLOBAL_SHOP.shop_name, S.setShopInfo({
                        offlineId: a.id,
                        store: a
                    }), this.setData({
                        CURRENT_GLOBAL_SHOP: a,
                        stores: []
                    }), this.fetchSeckillDetail();
                }
            },
            fetchContactPermission: function() {
                var e = this;
                S.getImData().then(function(t) {
                    e.setData({
                        isSetContact: t.isSetContact && t.isWebImInGoods,
                        "im.businessId": t.businessId || ""
                    });
                });
            },
            onHomePageClick: function() {
                n.default.navigate({
                    url: "/pages/home/dashboard/index"
                });
            },
            setOriginStatus: function(e) {
                this.setData({
                    isStock: e.total_stock > 0
                });
            },
            setSeckillStatus: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.status, i = e.is_check_right, s = e.is_pass_check, a = e.total_current_stock, o = e.question_id, n = e.use_question, r = e.use_follow, c = e.booking_num, u = "";
                1 !== t || a || (u = "该商品售罄啦，去看看其他商品吧~"), 1 === t && i && !s && (u = "您未预约此活动，无法参与秒杀。下次记得预约哦~"), 
                0 === t && (u = "秒杀活动已结束，去看看其他商品吧~"), 2 === t && i && s && (u = "您已成功预约，活动暂未开始。土豪也可以原价购买哦~"), 
                this.setData({
                    isSkStart: 1 === t,
                    isSkStock: a > 0,
                    isSkEnd: 0 === t,
                    isSkBooked: s,
                    isSkCheckBook: i,
                    useQuestion: n,
                    useFollow: r,
                    questionId: o,
                    bookNum: +c,
                    bottomInfoText: u
                });
            },
            clickPurchaseBtn: function(e) {
                var t = {};
                e && e.currentTarget && (t = e.currentTarget.dataset || {});
                var i = t.isSeckill;
                this.openSkuDialog(i);
            },
            openSkuDialog: function(e) {
                var t = JSON.parse(JSON.stringify(this.originData)), i = t.activity.goods_preference || {}, s = t.brief || {}, o = t.sku;
                e && (o = a({}, o, {
                    list: this.changeSeckillStock(o.list || [], i.skus || {}),
                    stock_num: i.total_current_stock
                })), c.showComponentSKU.call(this, {
                    alias: this.data.alias,
                    activityAlias: this.data.alias,
                    needFetch: !1,
                    btns: [ "buy" ],
                    goods: {
                        components: t.components,
                        brief: s,
                        sku: o,
                        activity: t.activity,
                        use_ump: e
                    },
                    selectedSKU: this.data.selectedSKU,
                    needClean: !0,
                    use_origin_quota: !e
                });
            },
            toggleGoodsDialog: function() {
                var e = this.data, t = e.isStock, i = e.isSkStock, s = e.isSkStart, a = e.isSkCheckBook, o = e.isSkBooked;
                if (!e.isSkEnd) {
                    var n = i && s && (!a || o);
                    t && !(s && (!a || o)) && this.openSkuDialog(!1), n && this.openSkuDialog(!0);
                }
            },
            changeSeckillStock: function(e, t) {
                var i = [];
                return Object.keys(t).forEach(function(s) {
                    var o = e.findIndex(function(e) {
                        return e.id === +s;
                    });
                    o >= 0 && i.push(a({}, e[o], {
                        stock_num: t[s].current_stock
                    }));
                }), i;
            },
            tapBindZanAccount: function() {
                h.bindZanAccount.call(this);
            },
            onZanAccountBinded: function() {
                this.setData({
                    showBindPhoneNumber: !1,
                    bindTips: ""
                });
            },
            clickBookSeckillBtn: function() {
                var e = this.data, t = e.useQuestion, i = e.useFollow, s = e.questionId;
                return S.getBuyerId() ? t ? (this.setData({
                    isLoadingQuestion: !0
                }), this.getQuestion(s)) : i ? this.showZanToast("需要关注公众号预约秒杀") : void this.bookSeckill() : this.setData({
                    showBindPhoneNumber: !0,
                    bindTips: "绑定手机号方可预约"
                });
            },
            getQuestion: function(e) {
                var t = this, i = {
                    question_id: e
                };
                S.carmen({
                    api: "youzan.ump.seckill.question/1.0.0/get",
                    query: i,
                    success: function(e) {
                        t.setData({
                            questionDesc: e.title,
                            questionItemList: e.options || [],
                            answerKey: e.answer_key,
                            isPopupVisible: !0
                        });
                    },
                    fail: function() {
                        t.showZanToast("获取问题失败");
                    },
                    complete: function() {
                        t.setData({
                            isLoadingQuestion: !1
                        });
                    }
                });
            },
            chooseAnswer: function(e) {
                if (e && e.currentTarget) {
                    var t = e.currentTarget.dataset || {};
                    this.setData({
                        selectedKey: t.key,
                        wrongKey: ""
                    });
                }
            },
            confirmAnswer: function() {
                var e = this.data, t = e.selectedKey, i = e.answerKey;
                if (!t) return this.showZanToast("请选择答案");
                t === i ? this.bookSeckill() : this.setData({
                    wrongKey: t,
                    selectedKey: ""
                });
            },
            closePopup: function() {
                this.setData({
                    isPopupVisible: !1
                }, this.clearQuestion);
            },
            clearQuestion: function() {
                this.setData({
                    questionDesc: "",
                    questionItemList: [],
                    answerKey: "",
                    wrongKey: "",
                    selectedKey: ""
                });
            },
            bookSeckill: function() {
                var e = this;
                this.setData({
                    isBookLoading: !0
                });
                var t = {
                    seckill_id: this.data.seckillId
                };
                S.carmen({
                    api: "youzan.ump.seckill.book/1.0.0/create",
                    query: t,
                    success: function(t) {
                        t && (e.showZanToast("预约成功"), setTimeout(e.refresh, 500));
                    },
                    fail: function() {
                        e.showZanToast("预约失败");
                    },
                    complete: function() {
                        e.setData({
                            isBookLoading: !1
                        });
                    }
                });
            },
            onShareImageFinished: function() {
                v = !1;
            },
            handleShareClick: function() {
                this.setData({
                    "actionsheet.show": !0
                });
            },
            handleZanActionsheetCancel: function() {
                this.closeActionSheet();
            },
            handleZanActionsheetClick: function(e) {
                var t = e.index;
                if (1 === t) {
                    if (v) return;
                    v = !0, this.setData({
                        "shareImage.show": !0
                    });
                }
                k.track({
                    act_name: "share_goods"
                }), "function" == typeof this.__yzLog__ && this.__yzLog__({
                    et: "click",
                    ei: "share_goods",
                    en: "分享商品",
                    params: {
                        share_method: 1 === t ? "card" : "wx_share"
                    }
                });
            },
            closeActionSheet: function() {
                this.setData({
                    "actionsheet.show": !1
                });
            }
        });
    }
});
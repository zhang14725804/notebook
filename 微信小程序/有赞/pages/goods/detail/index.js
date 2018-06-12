!function(e) {
    function t(a) {
        if (i[a]) return i[a].exports;
        var s = global.installedModules[a] = i[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(s.exports, s, s.exports, t), s.l = !0, s.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e), e = Object.assign(require("../../../vendors.js").modules, e);
    var i = {};
    i = global.installedModules = global.installedModules || {}, t.m = e, t.c = i, t.d = function(e, i, a) {
        t.o(e, i) || Object.defineProperty(e, i, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "", t(t.s = 229);
}({
    228: function(e, t, i) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, s = (a = i(3)) && a.__esModule ? a : {
            default: a
        };
        t.default = {
            bottomButton__handleClick: function() {
                s.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            }
        };
    },
    229: function(e, t, i) {
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function s(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        function o(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i;
            }
            return Array.from(e);
        }
        var n = a(i(0)), r = a(i(3)), c = a(i(228)), d = a(i(50)), u = getApp(), l = i(1), h = i(2), p = i(15), f = i(5), g = i(14), m = i(54), _ = i(8), v = i(4), D = i(7), y = i(12), w = y.tryLocation, S = y.parseDistance, k = y.calcDistance, C = i(20), I = !1, b = null, x = null, T = "groupOn", P = {
            "店铺认证": "该店铺已通过有赞店铺认证",
            "企业认证": "该店铺已通过有赞企业认证",
            "个人认证": "该店铺已通过有赞个人认证",
            "担保交易": "商家发货后7天或买家确认收货后，支付金额结算到商家",
            "线下门店": "该店铺拥有线下实体门店"
        }, O = i(49).parse, R = !1;
        (0, n.default)(g, _, l.Tab, l.Actionsheet, m, c.default, d.default, C, {
            originData: {},
            assistData: {
                pictureIndex: 0
            },
            data: {
                themeClass: u.themeClass,
                alias: "",
                isMember: !1,
                height: "750rpx",
                goods: null,
                selectedSKU: {
                    s1: 0,
                    s2: 0,
                    s3: 0,
                    price: null,
                    stockNum: null,
                    skuId: null,
                    points: null
                },
                waitToSoldCountdown: {
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0
                },
                timelimitedDiscount: {},
                countdown: [],
                ongoing_group: [],
                shopCert: [],
                tradeOrderPaid: !1,
                isSetShoppingCart: !0,
                supportShoppingCart: !1,
                cartCount: 0,
                haveLoged: !1,
                page_path: "",
                kdt_id: "",
                isSetHome: !1,
                isSetContact: !1,
                userInfo: null,
                userInfoDeny: !1,
                shopSetting: {
                    show_soldcount: !1
                },
                goodsPreference: {},
                mainVideo: {
                    isVideoFullscreen: !1,
                    showCloseVideoBtn: !1,
                    showVideo: !1
                },
                goodsDetailTab: {
                    list: [],
                    selectedId: "detail"
                },
                saleRecord: {
                    list: [],
                    nextPage: 1,
                    loading: !0,
                    finished: !1,
                    nodata: !1
                },
                traceid: "",
                aid: "",
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
                visitGift: {},
                im: {
                    businessId: ""
                },
                shareIamge: {}
            },
            onLoad: function(e) {
                var t = this;
                this.setData({
                    alias: e.alias,
                    aid: e.aid,
                    traceid: e.traceid,
                    kdt_id: u.getKdtId() || 0,
                    pay_way: ""
                }), this.fetchGoodsDetail(), u.once("trade:order:paid", function() {
                    t.setData({
                        tradeOrderPaid: !0
                    });
                }, this), u.on("component:sku:cart", function(e) {
                    "add" == e.type && (t.setData({
                        cartCount: ++t.data.cartCount
                    }), t.showZanToast("已成功添加到购物车"));
                }, this), u.on("show", function() {
                    t.setShopStatus();
                }, this), u.on("component:sku:change", function(e) {
                    var i = e.selectedSKU || {};
                    t.setData({
                        selectedSKU: i
                    }), t.generateSkuDesc();
                }, this), setTimeout(function() {
                    t.getVisitGift();
                }, 2e3);
            },
            onReady: function() {
                this.goodsVideo = wx.createVideoContext("goods-video");
            },
            onShow: function() {
                var e = this;
                this.storeChangeCb = function() {
                    e.fetchGoodsDetail();
                }, u.on("app:offlineId:change", this.storeChangeCb), this.lastOfflineId && this.lastOfflineId !== +this.data.CURRENT_GLOBAL_SHOP.offlineId && this.fetchGoodsDetail(), 
                this.lastOfflineId = +this.data.CURRENT_GLOBAL_SHOP.offlineId, this.setData({
                    userInfoDeny: u.globalData.userInfoDeny,
                    userInfo: u.globalData.userInfo
                }), this.runCountdown(), this.data.tradeOrderPaid && (this.setData({
                    tradeOrderPaid: !1
                }), r.default.switchTab({
                    url: "/pages/usercenter/dashboard/index"
                })), this.fetchCartCount(), this.fetchShopSetting(), this.fetchContactPermission(), 
                this.fetchBottomBtnConfig(), this.setData({
                    copyright: u.globalData.copyright,
                    is_big_shop: u.globalData.is_big_shop
                }), this.data.haveLoged && u.globalData.hasToken && v.page.show({
                    id: this.data.goods.id,
                    aid: this.data.aid,
                    traceid: this.data.traceid
                }), u.getShopInfo().then(function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    t.isJoined = t.security && t.security.joined, e.setData({
                        shop: t
                    });
                }).catch(function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.showZanToast(t.msg || t.message || "获取店铺信息失败");
                });
            },
            onHide: function() {
                u.off("app:offlineId:change", this.storeChangeCb), clearTimeout(x);
            },
            onUnload: function() {
                clearTimeout(x), u.off("app:offlineId:change", this.storeChangeCb), u.off(null, null, this);
            },
            onShareAppMessage: function() {
                var e = {
                    title: this.data.goods.title,
                    desc: this.data.goods.subTitle,
                    path: "/pages/goods/detail/index?alias=" + this.data.alias
                }, t = (this.data.goods.picture || [])[0];
                return t && (e.imageUrl = t), e;
            },
            refresh: function() {
                wx.redirectTo({
                    url: "/pages/goods/detail/index?alias=" + this.data.alias
                });
            },
            toggleGoodsDialog: function(e) {
                var t = void 0, i = void 0, a = void 0, s = !1, o = !1, n = !1;
                if (e && e.currentTarget) {
                    var r = e.currentTarget.dataset;
                    o = r.haveCart, n = r.haveBuy, i = r.haveBuyPrice, a = r.haveBuyPoints, t = r.createGroupon, 
                    s = r.isGroupon || !1;
                }
                var c = this.data, d = [];
                o && d.push("cart"), n && d.push("buy"), i && d.push("buy", "cart"), a && d.push("buyPoints");
                var u = JSON.parse(JSON.stringify(this.originData));
                this.showComponentSKU({
                    alias: c.alias,
                    needFetch: !1,
                    btns: d,
                    goods: {
                        components: u.components,
                        brief: u.brief,
                        sku: u.sku,
                        activity: u.activity,
                        use_ump: e.currentTarget.dataset.isUmp
                    },
                    selectedSKU: c.selectedSKU,
                    needClean: !0,
                    createGroupon: t,
                    isGroupon: s,
                    use_origin_quota: e.currentTarget.dataset.useOriginQuota
                });
            },
            setShopStatus: function() {
                var e = this;
                u.getShopStatus(function(t) {
                    e.setData({
                        isSetShoppingCart: t.is_set_shopping_cart
                    });
                });
            },
            toggleCertIntroPopup: function() {
                this.setData({
                    showCertIntro: !this.data.showCertIntro
                });
            },
            fetchGoodsDetail: function() {
                var e = this, t = this;
                wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), u.carmen({
                    api: "weapp.wsc.item.detail/1.0.0/get",
                    query: {
                        alias: this.data.alias,
                        fans_type: u.getFansType()
                    },
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(i) {
                        var a = i.brief || {};
                        u.trigger("update:youzan:kdtId", a.kdt_id), i.activity.goods_preference = i.activity.points_goods_preference || i.activity.goods_preference, 
                        i.activity.goods_preference && "pointsGoods" === i.activity.goods_preference.type ? e.setData({
                            pay_way: "integral"
                        }) : e.setData({
                            pay_way: ""
                        }), t.originData = JSON.parse(JSON.stringify(i)), t.setData({
                            haveLoged: !0
                        });
                        var s = i;
                        t.setData(e.parse(s), e.setShareImageData), t.generateSkuDesc(), t.generateRemianTime(), 
                        console.log("format response", s), e.setData({
                            id: e.data.goods.id
                        }, function() {
                            u.trigger("goodsDetail:loaded", e.data.id, {
                                id: t.data.goods.id,
                                aid: t.data.aid,
                                traceid: t.data.traceid
                            });
                        }), e.data.isMultiStore && w(function(t) {
                            var i = t.lng, a = t.lat;
                            0 === e.data.sku.stock_num && e.fetchRecommendStores({
                                lng: i,
                                lat: a
                            });
                            var s = k({
                                lng: i,
                                lat: a
                            }, e.data.CURRENT_GLOBAL_SHOP);
                            u.setShopInfo({
                                distance: S(1e3 * s)
                            });
                        }, function() {
                            0 === e.data.sku.stock_num && e.fetchRecommendStores();
                        }), u.getShopCert(function(t) {
                            t = t.map(function(e) {
                                return {
                                    name: e,
                                    intro: P[e]
                                };
                            }), e.setData({
                                shopCert: t
                            });
                        }), e.setShopStatus();
                    },
                    fail: function(e) {
                        if (160900100 === e.code) return wx.navigateTo({
                            url: "/packages/shop/multi-store/index/index"
                        });
                        wx.showModal({
                            title: "获取商品详情失败",
                            content: e.msg,
                            showCancel: !1,
                            confirmText: "返回",
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            },
            fetchRecommendStores: function(e) {
                var t = this;
                u.carmen({
                    api: "weapp.multistore.offline/1.0.0/getgoodssalablestorelist",
                    query: Object.assign({
                        item_id: this.data.goods.id,
                        current_store_id: u.getOfflineId()
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
                var t = e.target.dataset, i = t.storeId, a = t.index;
                if (i) {
                    var s = this.data.stores[a];
                    u.setShopInfo({
                        offlineId: s.id,
                        store: s
                    }), this.setData({
                        stores: []
                    });
                }
            },
            fetchCartCount: function() {
                var e = this;
                u.carmen({
                    api: "kdt.trade.cart/1.0.0/count",
                    success: function(t) {
                        e.setData({
                            cartCount: +t.data
                        });
                    }
                });
            },
            fetchShopSetting: function() {
                var e = this;
                u.getShopSetting().then(function(t) {
                    var i = 1 == t.isGoodsOrdersDisplayed;
                    e.setData({
                        shopSetting: {
                            show_soldcount: i
                        }
                    }), i && e.initSaleRecordTab();
                });
            },
            handleZanTabChange: function(e) {
                var t = e.selectedId, i = e.componentId;
                "goodsDetailTab" === i ? this.setData({
                    "goodsDetailTab.selectedId": t
                }) : C.handleZanTabChange.call(this, {
                    selectedId: t,
                    componentId: i
                });
            },
            fetchSaleRecord: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.setData({
                    "saleRecord.loading": !0
                }), u.request({
                    path: "v2/trade/order/orderitemlist.json",
                    data: {
                        page: t,
                        alias: this.data.alias,
                        perpage: 10
                    }
                }).then(function(i) {
                    var a = [].concat(o(e.data.saleRecord.list), o(i.list)), s = a.length >= i.total;
                    e.setData({
                        saleRecord: {
                            list: a,
                            finished: s,
                            nextPage: t + 1,
                            loading: !1,
                            nodata: 0 === a.length && s
                        }
                    });
                }).catch(function() {
                    e.setData({
                        "saleRecord.loading": !1,
                        "saleRecord.nodata": !0
                    }), e.showZanToast("获取成交记录失败");
                });
            },
            handleFetchMoreSaleRecord: function() {
                this.fetchSaleRecord(this.data.saleRecord.nextPage);
            },
            initSaleRecordTab: function() {
                this.setData({
                    goodsDetailTab: {
                        list: [ {
                            id: "detail",
                            title: "商品详情"
                        }, {
                            id: "sale",
                            title: "成交记录"
                        } ],
                        selectedId: "detail"
                    }
                }), this.fetchSaleRecord();
            },
            initWaitToSoldCountdown: function(e) {
                var t = this, i = e - Date.now();
                i && new p(i, {
                    onChange: function(e, i) {
                        var a = {
                            day: i.day,
                            hour: i.hour,
                            minute: i.minute,
                            second: i.second
                        };
                        t.setData({
                            waitToSoldCountdown: a
                        });
                    }
                });
            },
            parse: function(e) {
                var t = {}, i = this.parseBrief(e), a = this.parseSku(e), s = e.components[0], o = new Date(s.start_sold_time.replace(/-/g, "/"));
                t.waitToSold = 1 == +s.sold_time && Date.now() < o, t.waitToSold && this.initWaitToSoldCountdown(o), 
                t.id = i.item_id, t.title = i.title, t.subTitle = s.sub_title, t.hide_stock = 1 == s.hide_stock, 
                t.price = this.parsePrice(e), t.quota = +i.quota, t.quotaUsed = +i.quota_used, t.isDisplay = "1" == i.is_display, 
                t.purchaseLimit = !!i.purchase_limit, t.sell_point = i.sell_point, t.presale = +i.presale;
                var n = i.presale_info;
                t.presale && n && (0 === n.etd_type ? t.presaleDesc = n.etd_start.replace(/-/g, ".") + "开始发货" : 1 === n.etd_type && (t.presaleDesc = "付款" + n.etd_days + "天后发货"));
                var r = null, c = e.virtual;
                if (c) {
                    var d = c.item_validity_start, l = c.item_validity_end, p = c.holidays_available, g = c.effective_type, m = c.effective_delay_hours, _ = "永久有效";
                    if (d > 0 && l > 0) {
                        var v = 1e3 * d, y = 1e3 * (l - 86400);
                        _ = v === y ? D.moment(v, "YYYY年MM月DD日") : D.moment(v, "YYYY年MM月DD日") + " - " + D.moment(y, "YYYY年MM月DD日");
                    }
                    r = {
                        validPeriodText: _,
                        tipText: [ "购买后立即可用", "购买" + m + "小时后可用", "购买后次日可用" ][g] + "；" + [ "节假日不可用", "节假日可用" ][p]
                    };
                }
                t.pictureRatio = 0, t.picture = [], t.originPicture = [], f(i.picture, function(e) {
                    t.picture.push(h(e.url, "!730x0.jpg")), t.originPicture.push(e.url), t.pictureRatio = Math.max(.5, Math.min(1, Math.max(t.pictureRatio, +e.height / +e.width)));
                }), t.pictureWidth = u.getSystemInfoSync().windowWidth, t.pictureHeight = Math.ceil(t.pictureWidth * t.pictureRatio);
                var w = e.video_model;
                w && (t.picture.unshift(h(w.cover_url, "!730x0.jpg")), t.videoUrl = w.video_url);
                var S = [], k = e.components[0];
                S.push(k), S.push({
                    type: "rich_text",
                    fullscreen: 0,
                    color: "#f9f9f9",
                    content: k.originContent
                }), S = S.concat(e.components.slice(1)), console.log("==== showcase content ====", S), 
                this.showShowcaseComponents(S, 3);
                var C = {}, I = e.activity.goods_preference || {};
                if (I.is_started) if (I.type == T) (C = I).description = (I.activity_extra && I.activity_extra.join_num) + "人拼团价"; else if ("timelimitedDiscount" == I.type) C = I; else if ("pointsGoods" === I.type) {
                    var b = I.points_price_range, x = b.max, P = b.min, O = function(e) {
                        return (e.price > 0 ? "¥" + e.price + "+" : "") + e.points_price + "积分";
                    };
                    I.points = {
                        desc: x.points_price === P.points_price && x.price === P.price ? O(x) : O(P) + " ~ " + O(x)
                    };
                }
                var R = "string" == typeof e.delivery ? {
                    postage_desc: e.delivery
                } : e.delivery;
                R.postage_desc = (R.postage_desc || "").replace("~", "-"), R.support = [], R.desc = {}, 
                R.support_express_delivery && (R.support.push("快递"), R.desc["快递发货"] = R.express_desc), 
                R.support_local_delivery && (R.support.push("同城送"), R.desc["同城配送"] = R.local_delivery_desc), 
                R.support_self_fetch && (R.support.push("自提"), R.desc["自提"] = !0), R.length = R.support.length, 
                R.support = R.support.join("、");
                var V = t.price || {}, B = V.desc || "", M = (V.origin || {}).desc || "", j = "kdt_id=" + this.data.kdt_id + "&alias=" + this.data.alias + "&price=" + B + "&originPrice=" + M;
                this.setData({
                    page_path: "/pages/goods/detail/index?" + j
                });
                var L = !1;
                try {
                    e.activity.goods_preference && "customerDiscount" === e.activity.goods_preference.type && (L = !0);
                } catch (e) {
                    console.log(e);
                }
                return {
                    sku: a,
                    goods: t,
                    isMember: L,
                    goodsPreference: I,
                    virtual: r,
                    virtualStatus: i.is_virtual,
                    orderPreference: this.parseOrderPreference(e.activity.order_preference),
                    timelimitedDiscount: C,
                    delivery: R,
                    supportShoppingCart: 0 == i.is_virtual
                };
            },
            tapExpressPopupOrCell: function() {
                this.data.delivery.length <= 1 || this.setData({
                    showExpressIntroPopup: !this.data.showExpressIntroPopup
                });
            },
            parseBrief: function(e) {
                var t = e.brief, i = e.sku, a = e.activity.goods_preference;
                return a && a.is_started && i.none_sku && (t.origin = t.price, t.price = a.show_price), 
                t;
            },
            parseSku: function(e) {
                var t = e.sku;
                return t.mapList = {}, f(t.list, function(e) {
                    t.mapList[[ e.s1, e.s2, e.s3 ].join("-")] = e;
                }), t.mapTree = {}, f(t.tree, function(e) {
                    f(e.v, function(e) {
                        t.mapTree[e.id] = e;
                    });
                }), t;
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
            parsePrice: function(e) {
                var t = {}, i = {
                    desc: e.sku.price,
                    min: e.sku.min_price,
                    deletedPriceDesc: e.brief.origin
                }, a = e.activity.goods_preference;
                if (a || (!e.sku.none_sku && e.sku.origin ? i.desc = e.sku.origin : i.desc = e.brief.origin), 
                a && a.is_started && (e.sku.origin = e.sku.price, e.sku.price = a.show_price, e.sku.min_price = (a.price_range.min || 0) + "", 
                e.sku.max_price = (a.price_range.max || 0) + "", f(e.sku.list, function(e) {
                    a.skus[e.id] && (e.price = a.skus[e.id].price);
                })), e.sku.price += "", e.sku.min_price += "", e.sku.max_price += "", e.sku.none_sku || e.sku.min_price == e.sku.max_price) {
                    var s = e.sku.price || "";
                    t = {
                        desc: s,
                        yuan: s.split(".")[0],
                        fen: s.split(".")[1],
                        isRange: !1
                    };
                } else {
                    var o = e.sku.min_price || "", n = e.sku.max_price || "";
                    t = {
                        desc: e.sku.price,
                        isRange: !0,
                        min: {
                            desc: o,
                            yuan: o.split(".")[0],
                            fen: o.split(".")[1]
                        },
                        max: {
                            desc: n,
                            yuan: n.split(".")[0],
                            fen: n.split(".")[1]
                        }
                    };
                }
                return t.origin = i, t;
            },
            parseOrderPreference: function(e) {
                var t = [], i = "", a = [];
                e.cashBack = null;
                var s = e.cashBack, o = e.meetReduce, n = !1;
                return s && (t.push("返现"), i = "前" + s.cashback_limit + "笔订单返现；"), o && o.length && (t.push("满减"), 
                f(o, function(e, t) {
                    var i = [], s = "元", o = 1 == +(e.district || {}).scope;
                    2 == e.meet_type && (s = "件"), e.cash ? i.push("满" + e.meet + s + "减" + e.cash) : e.discount ? i.push("满" + e.meet + s + "打" + e.discount + "折") : i.push("满" + e.meet + s), 
                    e.postage && !o && (i.push("包邮"), n = !0), e.coupon_detail && i.push("送" + e.coupon_detail.value + "元优惠券"), 
                    e.present_detail && i.push("送" + e.present_detail.title + "赠品"), +e.score && i.push("送" + e.score + "积分"), 
                    a.push({
                        index: t,
                        isPartial: o,
                        text: i.join("，"),
                        desc: (e.district || {}).description || ""
                    });
                })), n && t.push("包邮"), e.labels = t, e.cashBackDesc = i, e.meetReduceDesc = [].join("；"), 
                e.meetReduceList = a, e;
            },
            toggleOrderPreferenceDialog: function() {
                this.setData({
                    showOrderPrefernceDialog: !this.data.showOrderPrefernceDialog
                });
            },
            handleSwiperChange: function(e) {
                this.assistData.pictureIndex = e.detail.current;
            },
            handleSwiperImageTap: function() {
                var e = this.data.goods.picture;
                wx.previewImage({
                    current: e[this.assistData.pictureIndex],
                    urls: e
                });
            },
            clearVideoTimer: function(e) {
                var t = this;
                clearTimeout(b), e && (b = setTimeout(function() {
                    t.setData({
                        "mainVideo.showCloseVideoBtn": !1
                    });
                }, 5e3));
            },
            handleVideoPlayClicked: function() {
                var e = this.goodsVideo;
                e && this.setData({
                    "mainVideo.showVideo": !0
                }, function() {
                    e.exitFullScreen(), e.play();
                });
            },
            handleVideoPlay: function() {
                I || (I = !0), this.data.mainVideo.isVideoFullscreen || this.setData({
                    "mainVideo.showCloseVideoBtn": !1
                });
            },
            handleVideoPause: function() {
                I && this.setData({
                    "mainVideo.showCloseVideoBtn": !0
                });
            },
            handleVideoEnded: function() {
                I = !1, this.setData({
                    "mainVideo.showVideo": !1,
                    "mainVideo.showCloseVideoBtn": !1
                });
            },
            handleVideoTap: function() {},
            handleVideoClose: function() {
                var e = this.goodsVideo;
                e && (e.seek(0), e.pause(), this.handleVideoEnded());
            },
            handleFullscreenChange: function(e) {
                var t = e.detail.fullScreen;
                this.setData({
                    "mainVideo.isVideoFullscreen": t,
                    "mainVideo.showCloseVideoBtn": t
                });
            },
            handleDetailImageLoad: function(e) {
                var t, i = e.currentTarget.dataset.index, a = u.getSystemInfoSync();
                if (a) {
                    var o = a.windowWidth, n = e.detail.width, r = e.detail.height, c = Math.min(o, n), d = Math.floor(c * r / n);
                    this.setData((s(t = {}, "goods.content[" + i + "].width", c + "px"), s(t, "goods.content[" + i + "].height", d + "px"), 
                    t));
                }
            },
            handlePreviewContentImage: function(e) {
                var t = e.currentTarget.dataset.index, i = this.data.goods.content, a = i[t].url, s = i.filter(function(e) {
                    return "image" === e.type;
                }).map(function(e) {
                    return e.url;
                });
                wx.previewImage({
                    current: a,
                    urls: s
                });
            },
            handleBack: function() {
                getCurrentPages().length > 1 ? wx.navigateBack() : r.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            jumpToCart: function() {
                r.default.switchTab({
                    url: "/pages/goods/cart/index"
                });
            },
            generateSkuDesc: function() {
                var e = this.data, t = e.selectedSKU, i = e.sku, a = [];
                if (i.mapList[this.getSelectedSkuKey()]) {
                    a.push("已选:");
                    for (var s = 1; s <= i.tree.length; s++) a.push(i.mapTree[t["s" + s]].name);
                } else {
                    a.push("选择:");
                    for (var o = 1; o <= i.tree.length; o++) 0 == t["s" + o] && a.push(i.tree[o - 1].k);
                }
                this.setData({
                    "sku.desc": a.join(" ")
                });
            },
            generateRemianTime: function() {
                var e = this.data.timelimitedDiscount;
                if (e) {
                    if (this.assistData.remain = Date.now() + 1e3 * (e.is_started ? e.end_remain_time : e.start_remain_time), 
                    this.data.goodsPreference.type == T) {
                        var t = [];
                        this.data.goodsPreference.activity_extra.ongoing_group.forEach(function(e) {
                            t.push(Date.now() + 1e3 * e.remain_time);
                        }), this.assistData.ongoing_group_remain = t;
                    }
                    this.runCountdown();
                }
            },
            runCountdown: function() {
                var e = this;
                this.assistData.remain && (this.countdown(), x = setInterval(function() {
                    e.countdown();
                }, 1e3));
            },
            countdown: function() {
                var e = this.assistData.remain - Date.now(), t = this.assistData.ongoing_group_remain || [];
                if (e < 0) return clearInterval(x), this.refresh();
                var i = O(e), a = {
                    isStarted: this.data.goodsPreference.is_started,
                    isEnded: this.data.goodsPreference.end_remain_time <= 0,
                    type: this.data.goodsPreference.type
                };
                a.name = "groupOn" === a.type ? "拼团" : "timelimitedDiscount" == a.type ? this.data.goodsPreference.description : "";
                var s = [];
                t.forEach(function(e) {
                    var t = e - Date.now(), i = D.format(t).data;
                    s.push(D.formatDayWithZero(i.hour) + ":" + D.formatDayWithZero(i.minute) + ":" + D.formatDayWithZero(i.second));
                }), this.setData({
                    countdown: i,
                    ongoing_group: s,
                    activity: a
                });
            },
            getSelectedSkuKey: function() {
                var e = this.data.selectedSKU;
                return [ e.s1, e.s2, e.s3 ].join("-");
            },
            catchTouch: function() {},
            gotoDescDetail: function() {
                r.default.navigate({
                    url: "/packages/ump/pintuan/playingInstruction/playingInstruction"
                });
            },
            gotoCoutuan: function(e) {
                var t = e.currentTarget.dataset.alias;
                r.default.navigate({
                    url: "/packages/ump/pintuan/detail/index?groupAlias=" + t
                });
            },
            gotoMyTuan: function() {
                var e = this.data.goodsPreference.activity_extra.group_alias;
                r.default.navigate({
                    url: "/packages/ump/pintuan/detail/index?groupAlias=" + e
                });
            },
            fetchContactPermission: function() {
                var e = this;
                u.getImData().then(function(t) {
                    e.setData({
                        isSetContact: t.isSetContact && t.isWebImInGoods,
                        "im.businessId": t.businessId || ""
                    });
                });
            },
            fetchBottomBtnConfig: function() {
                var e = this;
                u.getShopConfigData().then(function(t) {
                    e.setData({
                        isSetHome: 1 == +t.show_shop_btn,
                        isSetBuyBtn: 1 == +t.show_buy_btn
                    });
                });
            },
            fetchUserInfo: function() {
                var e = this;
                u.getUserInfo(function(t) {
                    e.setData({
                        userInfoDeny: u.globalData.userInfoDeny,
                        userInfo: t.userInfo
                    }), u.updateYouzanUserInfo(t.userInfo);
                }, function() {
                    e.setData({
                        userInfoDeny: u.globalData.userInfoDeny
                    });
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
                    if (R) return;
                    R = !0, this.setData({
                        "shareImage.show": !0
                    });
                }
                v.track({
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
            onShareImageFinished: function() {
                R = !1;
            },
            onShareImageError: function(e) {
                var t = e.detail;
                console.warn(t);
            },
            closeActionSheet: function() {
                this.setData({
                    "actionsheet.show": !1
                });
            },
            goToExpressDetail: function() {
                var e = u.db.set({
                    list: this.data.orderPreference.meetReduceList || []
                });
                wx.navigateTo({
                    url: "/pages/goods/detail/express/partial?db=" + e
                });
            }
        });
    }
});
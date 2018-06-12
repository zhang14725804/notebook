!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 45 ], {
    280: function(t, e, a) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s = Math.min, o = Math.max, n = i(a(10)), r = i(a(2)), c = i(a(4)), u = a(157), d = i(a(1)), l = getApp(), h = a(6), p = a(11), g = a(3), f = a(40), m = a(69), _ = a(0), v = a(158), w = a(17), D = a(159), k = a(284), S = k.btns_click_define, y = k.func_container, x = a(68), T = a(160), C = a(8), I = a(45), P = a(15), h = a(6), G = a(12), b = a(65), L = a(106), A = a(41), B = a(96), R = null, O = 0, q = {
            groupOn: "groupOn",
            timeLimit: "timelimitedDiscount",
            sharecut: "shareCut"
        };
        (0, d.default)(g({}, m, A, B, y, x, C.Toast, I, {
            originData: {},
            assistData: {
                pictureIndex: 0
            },
            data: {
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
                timelimitedDiscount: null,
                countdown: [],
                ongoing_group: [],
                shopCert: [],
                tradeOrderPaid: !1,
                isSetShoppingCart: !0,
                supportShoppingCart: !1,
                cartCount: 0,
                haveLoged: !1,
                kdtId: "",
                goodsId: "",
                miniCode: "",
                recommendGoods: [],
                msgBtnData: {
                    supportChat: !1,
                    chatBusinessId: "",
                    phoneNum: "0571-89988550"
                },
                discountId: 0,
                isSharecut: !1,
                nameAlias: "dingwentao",
                friendList: [],
                sharecutReached: !1,
                currentPrice: 0,
                perCutPrice: 0,
                minCutPrice: 0,
                sharecutAlreadyBuy: !1,
                logedByScroll: !1,
                showSharecutRules: !0,
                goodsOirginPrice: "",
                query: null,
                shopRecommendGoods: [],
                isMiniScreen: !1,
                isYZGuarantee: 0,
                is_collection: !1
            },
            onLoad: function(t) {
                var e = this, a = t.scene ? w.decode("goods", t.scene) : {};
                this.setData({
                    alias: t.alias || a.alias,
                    fromPintuan: t.fromPintuan || 0,
                    query: t
                });
                var i = wx.getStorageSync("nameAlias") || "";
                this.setData({
                    nameAlias: i
                }), this.fetchGoodsDetail(), this.fetchRecommenedGoods(), l.once("trade:order:paid", function() {
                    e.setData({
                        tradeOrderPaid: !0
                    });
                }, this), l.on("component:sku:cart", function(t) {
                    "add" == t.type && (e.setData({
                        cartCount: ++e.data.cartCount
                    }), e.showZanToast("已成功添加到购物车"));
                }, this), l.on("component:sku:change", function(t) {
                    var a = t.selectedSKU || {};
                    e.setData({
                        selectedSKU: a
                    }), e.generateSkuDesc();
                }, this), S({
                    shareBtn_click: function() {
                        e.onShowShareDialog("goods");
                    }
                }), this.fetchIs11Goods();
                var s = 360 > l.getSystemInfoSync().windowWidth;
                console.log(l.getSystemInfoSync().windowWidth), this.setData({
                    isMiniScreen: s
                });
            },
            onShow: function() {
                if (this.runCountdown(), this.data.tradeOrderPaid && wx.switchTab({
                    url: "/pages/usercenter/dashboard/index"
                }), this.fetchCartCount(), this.setData({
                    copyright: l.globalData.copyright,
                    is_big_shop: l.globalData.is_big_shop
                }), this.data.haveLoged && l.globalData.token) {
                    var t = {
                        id: this.data.goods.id,
                        query: this.data.query
                    };
                    _.page.show(this.getLogData(t));
                }
            },
            setBrower: function(t, e) {
                l.carmen({
                    api: "mars.trade.save.view/1.0.0/records",
                    data: {
                        goods_id: t,
                        kdt_id: e
                    }
                });
            },
            onHide: function() {
                clearTimeout(R);
            },
            onCollection: function() {
                var t = this, e = this.data.is_collection ? "weapp.spotlight.item/1.0.0/uncollection" : "weapp.spotlight.item/1.0.0/collection";
                l.carmen({
                    api: e,
                    method: "POST",
                    data: {
                        goods_id: this.data.goodsId,
                        kdt_id: this.data.kdtId
                    },
                    success: function(a) {
                        a && t.setData({
                            is_collection: !t.data.is_collection
                        }), wx.showToast({
                            title: "weapp.spotlight.item/1.0.0/collection" == e ? "收藏成功" : "取消收藏成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "weapp.spotlight.item/1.0.0/collection" == e ? "收藏失败" : "取消收藏失败",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            },
            onUnload: function() {
                clearTimeout(R), l.off(null, null, this);
            },
            shareTapped: function() {
                this.onShowShareDialog("goods");
            },
            onShareAppMessage: function(t) {
                var e = this;
                if (t) {
                    var a = t.from, i = {
                        menu: "weapp_share",
                        button: "share_button"
                    };
                    _.track(this.getLogData({
                        fm: "share",
                        share_type: i[a]
                    })), l.logger.log({
                        et: "click",
                        ei: "share",
                        en: "分享",
                        params: {
                            share_type: i[a]
                        }
                    });
                    var s = function(t) {
                        return function() {
                            _.track(e.getLogData({
                                fm: "share_result",
                                share_type: i[a],
                                share_result: t
                            })), l.logger.log({
                                et: "click",
                                ei: "share_result",
                                en: "分享结果",
                                params: {
                                    share_type: i[a],
                                    share_result: t
                                }
                            });
                        };
                    };
                    return this.data.isSharecut ? {
                        title: (l.globalData.userInfo ? l.globalData.userInfo.nickName : "我") + "请你帮忙砍价到0元，快帮忙砍一刀>>>",
                        imageUrl: this.data.goods.picture[0],
                        path: "/pages/ump/sharecut/detail/detail?is_share=1&alias=" + this.data.alias + "&fromAlias=" + this.data.nameAlias + "&discountId=" + this.data.discountId + (_.getGlobalData().dc_ps ? "&dc_ps=" + _.getGlobalData().dc_ps : "") + (_.getGlobalData().channel ? "&channel=" + _.getGlobalData().channel : "") + (_.getGlobalData().topic ? "&topic=" + _.getGlobalData().topic : ""),
                        success: s("success"),
                        fail: s("fail")
                    } : {
                        title: this.data.goods.title,
                        path: "/pages/goods/detail/index?is_share=1&alias=" + this.data.alias + (_.getGlobalData().dc_ps ? "&dc_ps=" + _.getGlobalData().dc_ps : "") + (_.getGlobalData().channel ? "&channel=" + _.getGlobalData().channel : "") + (_.getGlobalData().topic ? "&topic=" + _.getGlobalData().topic : ""),
                        success: s("success"),
                        fail: s("fail")
                    };
                }
            },
            refresh: function() {},
            toggleGoodsDialog: function(t) {
                if (3 != O) {
                    var e = this.originData.activity.goods_preference && this.originData.activity.goods_preference.view, a = t.currentTarget.dataset.isUmp, i = this;
                    void 0 != e && "freshman_exclusive" == e && a ? (wx.showToast({
                        title: "加载中",
                        mask: !0,
                        icon: "loading"
                    }), D.checkNewUser(function(e) {
                        return wx.hideToast(), e ? void i.toggleGoodsDialogAfterCheck(t) : void wx.showModal({
                            title: "仅限新用户参加哦",
                            content: "老朋友，去逛逛其他商品吧",
                            cancelText: "取消",
                            confirmText: "进店逛逛",
                            confirmColor: "#FF4444",
                            success: function(t) {
                                t.confirm && i.tapGotoShop();
                            }
                        });
                    }, function() {
                        wx.hideToast(), i.showZanToast("加载失败", 1e3);
                    })) : this.data.goodsPreference && this.data.goodsPreference.view && ("one_cent_lottery" == this.data.goodsPreference.view || "zero_groupon" == this.data.goodsPreference.view) && !l.isBindYouzanAccount() && t.currentTarget.dataset.isUmp ? this.bindZanAccount() : this.toggleGoodsDialogAfterCheck(t);
                } else wx.showToast({
                    title: "小程序目前暂不支持电子卡券类商品购买",
                    icon: ""
                });
            },
            onZanAccountBinded: function() {},
            toggleGoodsDialogAfterCheck: function(t) {
                var e;
                if (t && t.currentTarget) {
                    var a = t.currentTarget.dataset, i = a.haveCart, s = a.haveBuy;
                    e = a.createGroupon;
                }
                var o = this.data, n = [];
                i && n.push("cart"), s && n.push("buy");
                var r = JSON.parse((0, c.default)(this.originData)), u = {
                    item_id: r.id,
                    kdt_id: r.kdt_id,
                    team_name: r.team_name,
                    alias: r.alias,
                    title: r.title,
                    price: r.price,
                    origin: r.origin,
                    wait_to_sold: r.wait_to_sold,
                    is_display: r.is_display,
                    is_virtual: r.is_virtual,
                    picture: r.picture,
                    sold_status: r.sold_status,
                    quota: r.quota,
                    quota_used: r.quota_used
                };
                this.showComponentSKU({
                    alias: o.alias,
                    needFetch: !1,
                    btns: n,
                    goods: {
                        originData: r,
                        brief: u,
                        sku: r.skus,
                        activity: r.activity,
                        use_ump: t.currentTarget.dataset.isUmp
                    },
                    selectedSKU: o.selectedSKU,
                    needClean: !0,
                    createGroupon: e,
                    isGoodsDetail: 1
                });
            },
            fetchIs11Goods: function() {
                var t = this;
                l.carmen({
                    api: "weapp.spotlight.time.type/1.0.0/get",
                    data: {
                        time: 0
                    },
                    success: function(e) {
                        t.setData({
                            venuesType: e.type || "0"
                        });
                    }
                });
            },
            fetchGoodsDetail: function() {
                var t = this, e = this;
                wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), l.carmen({
                    api: "weapp.spotlight.item/1.0.0/get",
                    method: "GET",
                    data: {
                        alias: this.data.alias
                    },
                    success: function(a) {
                        e.originData = JSON.parse((0, c.default)(a)), e.parseShopCert(a), e.setBrower(a.id, a.kdt_id), 
                        e.setData({
                            haveLoged: !0
                        });
                        var i = a;
                        e.setData(t.parse(i)), e.setData({
                            is_collection: i.has_collected,
                            goodsId: i.id,
                            kdtId: i.kdt_id,
                            goodsOirginPrice: i.price
                        }), e.fetchContactSupportStatus(i.kdt_id), e.fetchShopStatus(i.kdt_id), v.setTrackStorage({
                            alias: t.data.alias,
                            title: t.data.goods.title,
                            price: t.data.goods.price,
                            iamgeURL: t.data.goods.picture[0]
                        }), e.generateSkuDesc(), e.generateRemianTime(), t.data.isSharecut || e.fetchWeappCode("/pages/goods/detail/index?" + w.encode("goods", {
                            alias: e.data.alias
                        })), t.trigger("goodsDetail:loaded"), _.page.show(t.getLogData({
                            id: t.data.goods.id,
                            query: t.data.query
                        }));
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "获取商品详情失败",
                            content: t.msg,
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
            fetchRecommenedGoods: function() {
                var t = this;
                if (this.data.alias) {
                    var e = 1, a = "sold_num";
                    l.carmen({
                        api: "weapp.spotlight.shop.goods.recommened/1.0.0/list",
                        method: "GET",
                        data: {
                            alias: this.data.alias,
                            size: 50,
                            type: e,
                            order_by: a
                        },
                        success: function(e) {
                            e.items && 1 < e.items.length && (0 != e.items.length % 2 && e.items.pop(), t.setData({
                                recommendGoods: e.items.map(function(t) {
                                    return t.image_url = h(t.image_url, "!400x400.jpg"), t.price = P(t.price).toYuan(), 
                                    t;
                                })
                            }));
                        },
                        fail: function(t) {
                            console.log("[get recommend goods error]" + t.msg);
                        }
                    }), this.data.isSharecut || (e = 3, a = "num", l.carmen({
                        api: "weapp.spotlight.shop.goods.recommened/1.0.0/list",
                        method: "GET",
                        data: {
                            alias: this.data.alias,
                            size: 50,
                            type: e,
                            order_by: a
                        },
                        success: function(e) {
                            e.items && 1 < e.items.length && (0 != e.items.length % 2 && e.items.pop(), t.setData({
                                shopRecommendGoods: e.items.map(function(t) {
                                    return t.image_url = h(t.image_url, "!400x400.jpg"), t.price = P(t.price).toYuan(), 
                                    t;
                                })
                            }));
                        },
                        fail: function(t) {
                            console.log("[get recommend goods error]" + t.msg);
                        }
                    }));
                }
            },
            fetchContactSupportStatus: function(t) {
                var e = this;
                t && L.fetchChatSupportStatus(t, function(t) {
                    e.setData({
                        msgBtnData: t
                    });
                });
            },
            fetchShopStatus: function(t) {
                var e = this;
                t && l.carmen({
                    api: "weapp.wsc.team.status/1.0.0/getbykeys",
                    method: "GET",
                    data: {
                        kdt_id: t,
                        keys: "is_secured_transactions,is_youzan_secured"
                    },
                    success: function(t) {
                        var a = 0;
                        t.is_secured_transactions && parseInt(t.is_secured_transactions), t.is_youzan_secured && 1 === parseInt(t.is_youzan_secured) && (a = 1), 
                        e.setData({
                            isYZGuarantee: a
                        });
                    },
                    fail: function(t) {
                        console.log("[get shop status error]" + t.msg);
                    }
                });
            },
            handleGuaranteeTap: function() {
                wx.navigateTo({
                    url: "../guaranteeIntro/index"
                });
            },
            onTabPhone: function() {
                wx.makePhoneCall({
                    phoneNumber: this.data.msgBtnData.phoneNum
                });
            },
            onGoodTap: function(t) {
                var e = "/pages/goods/detail/index?alias=" + t.currentTarget.dataset.alias + "&teamName=" + t.currentTarget.dataset.shopname, a = {
                    url: e,
                    act_name: "link",
                    kdt_id: this.data.kdtId
                };
                this.data.isSharecut && (0, r.default)(a, {
                    activity_sign: "sharecut"
                }), _.track(a), l.logger.log({
                    et: "click",
                    ei: "link",
                    en: "点击链接",
                    params: {
                        url: e
                    }
                }), (0, u.navigateTo)({
                    url: e
                });
            },
            fetchCartCount: function() {
                var t = this;
                l.carmen({
                    api: "weapp.spotlight.cart/1.0.0/count",
                    success: function(e) {
                        t.setData({
                            cartCount: +e
                        });
                    }
                });
            },
            parseShopCert: function(t) {
                var e = [], a = parseInt(t.team_cert_type);
                1 === a ? e.push("网店") : 2 === a ? e.push("企业认证") : 3 === a ? e.push("个人认证") : 4 === a ? e.push("个人认证") : 6 === a ? e.push("旗舰店认证") : 7 === a ? e.push("专卖店认证") : 8 === a ? e.push("直营店认证") : 9 === a ? e.push("专营店认证") : 10 === a ? e.push("组织认证") : 11 === a && e.push("普通店认证"), 
                1 === t.is_secured_transactions && e.push("担保交易"), 1 === t.team_physical && e.push("线下门店"), 
                this.setData({
                    shopCert: e
                });
            },
            parse: function(t) {
                var e = {}, a = this.parseBrief(t), i = this.parseSku(t);
                O = t.delivery_template_id, e.id = t.id, e.title = T.strDiscode(t.title), e.subTitle = t.sub_title, 
                e.price = this.parsePrice(t), e.quota = +t.quota, e.quotaUsed = +t.quota_used, e.isDisplay = "1" == t.is_display, 
                e.presale = t.presale;
                var n = t.presale_info;
                e.presale && n && (0 === n.etd_type ? e.presaleDesc = n.etd_start.replace(/-/g, ".") + "开始发货" : 1 === n.etd_type && (e.presaleDesc = "付款" + n.etd_days + "天后发货")), 
                e.pictureRatio = 0, e.picture = [], e.originPicture = [], p(t.picture, function(t) {
                    e.picture.push(h(t.url, "!475x0.jpg")), e.originPicture.push(t.url), 0 == +t.height || 0 == +t.width || (e.pictureRatio = o(.5, s(1, o(e.pictureRatio, +t.height / +t.width))));
                }), e.pictureWidth = l.getSystemInfoSync().windowWidth, e.pictureHeight = Math.ceil(e.pictureWidth * e.pictureRatio), 
                e.content = (t.rich_weapp && t.rich_weapp.rich_info || []).map(function(t) {
                    return "image" == t.type && (t.url = h(t.url), t.width = "750rpx", t.height = "750rpx"), 
                    t;
                });
                var r, c = !1, u = t.activity.goods_preference;
                u && (u.type == q.groupOn ? (!0, r = u, r.description = (u.activity_extra && u.activity_extra.join_num) + "人拼团价") : u.type == q.timeLimit ? (!0, 
                r = u) : u.type === q.sharecut && (!0, c = !0));
                var d = !1;
                return c && (0 == +e.price.desc && (d = !0), e.pvStats = t.pv_stats, e.sharecutCurrentPrice = u.cur_price, 
                console.log("----------"), this.getSponsorList(), e.totalCutPrice = +P(100 * this.originData.price - 100 * e.sharecutCurrentPrice).toYuan()), 
                {
                    view: t.view || "",
                    sku: i,
                    goods: e,
                    goodsPreference: u,
                    orderPreference: this.parseOrderPreference(t.activity.order_preference),
                    timelimitedDiscount: r,
                    delivery: {
                        postage: t.postage,
                        postage_desc: (t.postage_desc || "").replace("~", " - ")
                    },
                    supportShoppingCart: 0 == t.is_virtual,
                    team_name: a.team_name,
                    isSharecut: c,
                    sharecutReached: d,
                    perCutPrice: this._removePriceZero(t.per_cut_price),
                    minCutPrice: this._removePriceZero(t.min_cut_price)
                };
            },
            parseBrief: function(t) {
                var e = {
                    item_id: t.id,
                    kdt_id: t.kdt_id,
                    team_name: t.team_name,
                    alias: t.alias,
                    title: t.title,
                    price: t.price,
                    origin: t.origin,
                    wait_to_sold: t.wait_to_sold,
                    is_display: t.is_display,
                    is_virtual: t.is_virtual,
                    picture: t.picture,
                    sold_status: t.sold_status,
                    quota: t.quota,
                    quota_used: t.quota_used
                }, a = t.skus, i = t.activity.goods_preference;
                return i && a.none_sku && (e.origin = t.price, e.price = i.show_price), e;
            },
            parseSku: function(t) {
                var e = t.skus;
                return e.mapList = {}, p(e.list, function(t) {
                    e.mapList[[ t.s1, t.s2, t.s3 ].join("-")] = t;
                }), e.mapTree = {}, p(e.tree, function(t) {
                    p(t.v, function(t) {
                        e.mapTree[t.id] = t;
                    });
                }), e;
            },
            parsePrice: function(t) {
                var e = {}, a = {
                    desc: t.skus.price,
                    min: t.price
                }, i = t.activity.goods_preference, s = i && "shareCut" === i.type;
                return i && !s && (t.skus.origin = t.skus.price, t.skus.price = i.show_price, t.skus.min_price = i.price_range.min, 
                t.skus.max_price = i.price_range.max, p(t.skus.list, function(t) {
                    t.price = i.skus[t.id].price;
                })), s && (t.skus.origin = t.skus.price + "", t.skus.price = i.cur_price + "", t.skus.min_price = t.skus.max_price = i.cur_price + "", 
                p(t.skus.list, function(t) {
                    t.price = i.cur_price;
                }), wx.hideShareMenu()), e = t.skus.none_sku || t.skus.min_price == t.skus.max_price ? {
                    desc: i && "zero_groupon" == i.view ? "0" : t.skus.price,
                    yuan: t.skus.price.split(".")[0],
                    fen: t.skus.price.split(".")[1],
                    isRange: !1
                } : {
                    desc: t.skus.price,
                    isRange: !0,
                    min: {
                        desc: i && "zero_groupon" == i.view ? "0" : t.skus.min_price,
                        yuan: t.skus.min_price.split(".")[0],
                        fen: t.skus.min_price.split(".")[1]
                    },
                    max: {
                        desc: i && "zero_groupon" == i.view ? "0" : t.skus.max_price,
                        yuan: t.skus.max_price.split(".")[0],
                        fen: t.skus.max_price.split(".")[1]
                    }
                }, e.origin = a, e;
            },
            parseOrderPreference: function(t) {
                var e = [], a = "", i = [], s = [];
                t.cashBack = null;
                var o = t.cash_back, n = t.meet_reduce, r = !1;
                return o && (e.push("返现"), a = "前" + o.cashback_limit + "笔订单返现；"), n && n.length && (e.push("满减"), 
                p(n, function(t) {
                    var e = [], a = "元";
                    2 == t.meet_type && (a = "件"), t.cash ? e.push("满" + t.meet + a + "减" + t.cash) : t.discount ? e.push("满" + t.meet + a + "打" + t.discount + "折") : e.push("满" + t.meet + a), 
                    t.district && t.district.scope ? (e.push({
                        type: "ACTION",
                        title: "部分地区包邮",
                        action: "showFreeShip",
                        payload: t.district.description
                    }), r = !0) : (t.postage || t.district && 0 === t.district.scope) && (e.push("包邮"), 
                    r = !0), t.coupon_detail && e.push("送" + t.coupon_detail.value + "元优惠券"), t.present_detail && e.push("送" + t.present_detail.title + "赠品"), 
                    +t.score && e.push("送" + t.score + "积分"), e = e.map(function(t) {
                        return "string" == typeof t ? {
                            type: "STRING",
                            title: t
                        } : t;
                    }), i.push(e.map(function(t) {
                        return t.title;
                    }).join("，")), s = s.concat(e);
                })), r && e.push("包邮"), t.labels = e, t.cashBackDesc = a, t.meetReduceDesc = i.join("；"), 
                t.meetReduceList = s, t;
            },
            toggleOrderPreferenceDialog: function() {
                this.setData({
                    showOrderPrefernceDialog: !this.data.showOrderPrefernceDialog
                });
            },
            handleActivityIntroAction: function(t) {
                switch (console.log(t.target.dataset.action), t.target.dataset.action) {
                  case "showFreeShip":
                    wx.navigateTo({
                        url: "../../ump/freeShipIntro/index?desc=" + (t.target.dataset.payload || "")
                    });
                }
            },
            handleSwiperChange: function(t) {
                this.assistData.pictureIndex = t.detail.current;
            },
            handleSwiperImageTap: function() {
                var t = this.data.goods.picture;
                wx.previewImage({
                    current: t[this.assistData.pictureIndex],
                    urls: t
                });
            },
            handleDetailImageLoad: function(t) {
                var e, a = t.currentTarget.dataset.index, i = l.getSystemInfoSync();
                if (i) {
                    var o = i.windowWidth, n = t.detail.width, r = t.detail.height, c = s(o, n);
                    this.setData((e = {}, e["goods.content[" + a + "].width"] = c + "px", e["goods.content[" + a + "].height"] = c * r / n + "px", 
                    e));
                }
            },
            handlePreviewContentImage: function(t) {
                var e = t.currentTarget.dataset.index, a = this.data.goods.content, i = a[e].url, s = a.filter(function(t) {
                    return "image" === t.type;
                }).map(function(t) {
                    return t.url;
                });
                wx.previewImage({
                    current: i,
                    urls: s
                });
            },
            getLogData: function(t) {
                var e;
                this.data.isSharecut && (e = "sharecut");
                var a = {
                    kdtId: this.data.kdtId
                };
                return e && (a.activity_sign = e), g(t, a);
            },
            doLog: function() {
                _.track(this.getLogData({
                    act_name: "normal"
                })), l.logger.log({
                    et: "click",
                    ei: "normal",
                    en: "普通点击"
                });
            },
            doLogOnScroll: function(t) {
                if (this.scroll(t), !this.data.logedByScroll) {
                    this.setData({
                        logedByScroll: !0
                    });
                    this.data.isSharecut;
                    var e = {
                        fm: "scroll"
                    };
                    (0, r.default)(e, {
                        activity_sign: void 0
                    }), _.track(this.getLogData(e)), l.logger.log({
                        et: "scroll",
                        ei: "scroll",
                        en: "滚动"
                    });
                }
            },
            goToShopAndLog: function() {
                console.log("jinlai");
                var t = "/pages/usercenter/shopSelection/shopSelection?kdtId=" + this.data.kdtId;
                _.track(this.getLogData({
                    url: t,
                    act_name: "link"
                })), this.tapGotoShop();
            },
            jumpToCart: function() {
                wx.switchTab({
                    url: "/pages/goods/cart/index"
                });
            },
            generateSkuDesc: function() {
                var t = this.data, e = t.selectedSKU, a = t.sku, i = [];
                if (null != a && void 0 != a && a.mapList[this.getSelectedSkuKey()]) {
                    i.push("已选:");
                    for (var s = 1; s <= a.tree.length; s++) i.push(a.mapTree[e["s" + s]].name);
                } else {
                    i.push("选择:");
                    for (var o = 1; o <= a.tree.length; o++) 0 == e["s" + o] && i.push(a.tree[o - 1].k);
                }
                this.setData({
                    "sku.desc": i.join(" ")
                });
            },
            generateRemianTime: function() {
                var t = this.data.timelimitedDiscount;
                if (t) {
                    if (this.assistData.remain = Date.now() + (t.is_started ? t.end_remain_time : t.start_remain_time), 
                    this.data.goodsPreference && this.data.goodsPreference.type == q.groupOn) {
                        var e = [];
                        this.data.goodsPreference.activity_extra.ongoing_group.forEach(function(t) {
                            e.push(Date.now() + 1e3 * t.remain_time);
                        }), this.assistData.ongoing_group_remain = e;
                    }
                    this.runCountdown();
                }
                if (this.data.isSharecut) {
                    var a = new Date(this.data.goodsPreference.end_time.replace(/-/g, "/")).getTime();
                    this.assistData.remain = new Date(a).getTime(), this.runCountdown();
                }
            },
            runCountdown: function() {
                var t = this;
                this.assistData.remain && (this.countdown(), R = setInterval(function() {
                    t.countdown();
                }, 1e3));
            },
            countdown: function() {
                var t = this.assistData.remain - Date.now(), e = this.assistData.ongoing_group_remain || [];
                if (0 > t) return clearInterval(R), this.refresh();
                var a = this.formatCountdown(t, e);
                this.setData({
                    countdown: a[0],
                    ongoing_group: a[1]
                });
            },
            formatCountdown: function(t, e) {
                var a = [], i = {};
                t = o(0, t);
                var s = f.format(t).data, n = function(t) {
                    return t = (10 > t ? "0" : "") + t;
                };
                0 < s.day && (i = {
                    value: s.day,
                    suffix: "天"
                }, a.push(i)), i = {
                    value: s.hour,
                    suffix: "时"
                }, a.push(i), i = {
                    value: s.minute,
                    suffix: "分"
                }, a.push(i), i = {
                    value: s.second,
                    suffix: "秒"
                }, a.push(i), this.data.isSharecut && (p(a, function(t) {
                    t.suffix = ":";
                }), a[a.length - 1].suffix = "");
                var r = [];
                return e.forEach(function(t) {
                    var e = t - Date.now(), a = f.format(e).data;
                    r.push(n(a.hour) + ":" + n(a.minute) + ":" + n(a.second));
                }), [ a.map(function(t) {
                    return t.value = n(t.value), t;
                }), r ];
            },
            getSelectedSkuKey: function() {
                var t = this.data.selectedSKU;
                return [ t.s1, t.s2, t.s3 ].join("-");
            },
            catchTouch: function() {},
            backToPintuan: function() {
                wx.navigateBack();
            },
            gotoDescDetail: function() {
                wx.navigateTo({
                    url: "/pages/ump/pintuan/playingInstruction/playingInstruction"
                });
            },
            gotoCoutuan: function(t) {
                var e = t.currentTarget.dataset.alias;
                wx.navigateTo({
                    url: "/pages/ump/pintuan/detail/index?groupAlias=" + e + "&kdtId=" + this.data.kdtId
                });
            },
            gotoMyTuan: function() {
                var t = this.data.goodsPreference.activity_extra.group_alias;
                (0, u.navigateTo)({
                    url: "/pages/ump/pintuan/detail/index?groupAlias=" + t + "&kdtId=" + this.data.kdtId
                });
            },
            tapGotoShop: function() {
                (0, u.navigateTo)({
                    url: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + this.data.kdtId
                });
            },
            showLinePriceDesc: function() {
                this.setData({
                    showLinePriceDesc: !this.data.showLinePriceDesc
                });
            },
            toggleShowSharecutRules: function() {
                this.setData({
                    showSharecutRules: !this.data.showSharecutRules
                });
            },
            fetchWeappCode: function(t) {
                var e = this, a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100;
                return console.error("sharecard url: " + t), new n.default(function(i, s) {
                    l.carmen({
                        api: "weapp.spotlight.weappcode/1.0.0/get",
                        method: "GET",
                        data: {
                            page: t,
                            width: a,
                            type: 1
                        },
                        success: function(t) {
                            e.setData({
                                miniCode: t
                            }), i();
                        },
                        fail: function(t) {
                            s(t);
                        },
                        complete: function() {}
                    });
                });
            },
            shareCard: function() {
                var t = this;
                this.data.isSharecut && !this.data.miniCode ? this.fetchWeappCode("/pages/ump/sharecut/detail/detail?" + w.encode("sharecut", {
                    alias: this.data.alias,
                    fromAlias: this.data.nameAlias,
                    discountId: this.data.discountId,
                    is_share: 1
                })).then(function() {
                    t.generateShareCard();
                }).catch(function() {
                    t.showZanToast("获取二维码失败, 请重试");
                }) : this.generateShareCard();
            },
            generateShareCard: function() {
                if (this.setData({
                    showShareDialog: !1
                }), b.checkPaintCompatibility()) {
                    this.data.type;
                    this.drawGoodsShareImg();
                } else wx.showModal({
                    title: "生成卡片失败",
                    content: "您当前微信版本过低，无法生成卡片。请将微信升级至6.5.23版本以上",
                    showCancel: !1
                });
            },
            startSharecut: function(t) {
                var e = this;
                if (!this.data.sharecutAlreadyBuy) {
                    var a = t.currentTarget.dataset.position, i = this.data, s = i.kdtId, o = i.alias, n = i.nameAlias, r = wx.getStorageSync("userId");
                    _.track(this.getLogData({
                        fm: "click",
                        act_name: "sharecut_start_" + a
                    }));
                    var u = this;
                    this.data.discountId ? u.onShowShareDialog("sharecut-goods") : l.carmen({
                        api: "weapp.spotlight.goods.share.discount/1.0.0/add",
                        method: "POST",
                        data: {
                            kdt_id: s,
                            alias: o,
                            uid: +r,
                            from_alias: n
                        },
                        success: function(t) {
                            console.log(t), t ? (u.setData({
                                discountId: t.discount_id
                            }), 1 == +t.is_first_share && (_.track(u.getLogData({
                                fm: "sharecut_start"
                            })), l.logger.log({
                                et: "click",
                                ei: "sharecut_start",
                                en: "发起享立减活动"
                            })), e.onShowShareDialog("sharecut-goods")) : u.showZanToast("发起分享失败, 请重试");
                        },
                        fail: function(t) {
                            G("api log: weapp.spotlight.goods.share.discount/1.0.0/add " + (0, c.default)(t));
                        }
                    });
                }
            },
            getSponsorList: function() {
                var t = this, e = this.data, a = e.alias, i = e.nameAlias;
                l.carmen({
                    api: "weapp.spotlight.goods.share.discount/1.0.0/get",
                    method: "GET",
                    data: {
                        alias: a,
                        from_alias: i,
                        discount_id: 0
                    },
                    success: function(e) {
                        var a = [];
                        e.goods_share_list && e.goods_share_list.forEach(function(t) {
                            t.price = +P(t.price).toYuan(), a.push(t);
                        }), t.setData({
                            friendList: a,
                            sharecutAlreadyBuy: 1 == +e.status
                        }), console.log(e.goods_share_list);
                    },
                    fail: function(t) {
                        G("api log: weapp.spotlight.goods.share.discount/1.0.0/get " + (0, c.default)(t));
                    }
                });
            },
            _removePriceZero: function(t) {
                var e = t += "", a = t.split("."), i = a[0];
                return 0 == +a[1] && (e = i), e;
            }
        }));
    }
}, [ 280 ]);
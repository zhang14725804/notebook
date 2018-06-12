!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 23 ], {
    334: function(t, a, o) {
        function e(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s = e(o(4)), i = e(o(10)), n = e(o(1)), r = getApp(), u = o(12), d = o(15), c = o(0), l = o(11), g = o(69), p = o(3), h = o(40), f = o(6), m = o(41), _ = o(17), y = o(96), D = null, v = {
            share: "喊好友帮我砍价",
            buy: "元立即拿下",
            more: "更多好物0元得",
            play: "我也要玩"
        };
        (0, n.default)(p({}, g, m, y, {
            data: {
                goodsAlias: "",
                recommendGoods: [],
                fromAlias: "",
                canCut: !1,
                goodsInfo: {},
                friendList: [],
                isSelf: !1,
                activityStatus: 0,
                alreadyBuy: !1,
                goodsStatus: 0,
                buttonType: "",
                buttonText: "",
                showPopup: !1,
                popStatus: 0,
                originGoodsData: {},
                countdown: "",
                activityRemainTime: "",
                discountId: 0,
                query: null,
                kdtId: "",
                goods: {}
            },
            onLoad: function(t) {
                t = t.alias ? t : _.decode("sharecut", t.scene), this.loadPageAction(t);
            },
            loadPageAction: function(t) {
                var a = this, o = wx.getStorageSync("nameAlias") === t.fromAlias;
                this.setData({
                    goodsAlias: t.alias,
                    fromAlias: t.fromAlias,
                    discountId: t.discountId,
                    query: t,
                    isSelf: o
                }), o ? this.getGoodsData(t.alias, t.discountId).then(function() {
                    var o = a.data, e = o.goodsAlias, s = o.fromAlias;
                    a.getFriendList(e, s, t.discountId);
                }) : this.getGoodsData(t.alias, t.discountId).then(function() {
                    var o = a.data.goodsInfo;
                    o.isSoldOut || o.isClosed ? a.getFriendList(t.goodsAlias, t.fromAlias, t.discountId) : a.startCutPrice().then(function() {
                        a.getFriendList(t.goodsAlias, t.fromAlias, t.discountId);
                    });
                }).catch(function(t) {
                    console.log(t);
                }), this.fetchRecommendGoods();
            },
            onPullDownRefresh: function() {
                this.clearPageData();
                var t = {
                    fromAlias: this.data.fromAlias,
                    alias: this.data.goodsAlias,
                    discountId: this.data.discountId
                };
                this.loadPageAction(t), wx.stopPullDownRefresh();
            },
            clearPageData: function() {
                this.setData({
                    recommendGoods: [],
                    canCut: !1,
                    goodsInfo: {},
                    friendList: [],
                    isSelf: !1,
                    activityStatus: 0,
                    alreadyBuy: !1,
                    goodsStatus: 0,
                    buttonType: "",
                    buttonText: "",
                    showPopup: !1,
                    popStatus: 0,
                    originGoodsData: {},
                    countdown: "",
                    activityRemainTime: "",
                    query: null
                });
            },
            onShow: function() {
                var t = c.getGlobalData().isShare;
                this.data.originGoodsData.id && c.page.show(this.getLogData({
                    query: this.data.query,
                    id: this.data.originGoodsData.id,
                    is_share: t
                })), this.data.isSelf || wx.hideShareMenu(), this.runCountdown();
            },
            onShareAppMessage: function(t) {
                var a = this;
                if (t) {
                    var o = t.from, e = {
                        menu: "weapp_share",
                        button: "share_button"
                    };
                    c.track(this.getLogData({
                        fm: "share",
                        share_type: e[o]
                    })), r.logger.log({
                        et: "click",
                        ei: "share",
                        en: "分享",
                        params: {
                            share_type: e[o]
                        }
                    });
                    var s = function(t) {
                        return function() {
                            c.track(a.getLogData({
                                fm: "share_result",
                                share_type: e[o],
                                share_result: t
                            })), r.logger.log({
                                et: "click",
                                ei: "share_result",
                                en: "分享结果",
                                params: {
                                    share_type: e[o]
                                }
                            });
                        };
                    }, i = r.globalData.userInfo ? r.globalData.userInfo.nickName : "我";
                    return console.log(i, "<<<<<<<<<<<<nickName"), {
                        title: i + "请你帮忙砍价到0元，快帮忙砍一刀>>>",
                        path: "/pages/ump/sharecut/detail/detail?is_share=1&alias=" + this.data.goodsAlias + "&fromAlias=" + this.data.fromAlias + "&discountId=" + this.data.discountId,
                        success: s("success"),
                        fail: s("fail"),
                        imageUrl: "https://img.yzcdn.cn/public_files/2018/02/07/415d948ed1fc8ca837b52bddcea0c217.png"
                    };
                }
            },
            doLog: function() {
                c.track(this.getLogData({
                    act_name: "normal"
                })), r.logger.log({
                    et: "click",
                    ei: "nomal",
                    en: "普通点击"
                });
            },
            getGoodsData: function(t, a) {
                var o = this;
                return new i.default(function(e, i) {
                    r.carmen({
                        api: "weapp.spotlight.items.share/1.0.0/get",
                        data: {
                            alias: t,
                            discount_id: a
                        },
                        success: function(t) {
                            var a = o._formatGoodsData(t);
                            c.page.show(o.getLogData({
                                query: o.data.query,
                                id: t.id,
                                kdtId: t.kdt_id
                            })), o.setData({
                                goodsInfo: a,
                                originGoodsData: t,
                                kdtId: t.kdt_id
                            }), o.data.goods.id = t.id, o.trigger("goodsDetail:loaded"), e();
                        },
                        fail: function(t) {
                            t.msg ? wx.showToast({
                                title: t.msg,
                                icon: "none",
                                duration: 5e3
                            }) : wx.showToast({
                                title: "网络开小差了，下拉刷新试试",
                                icon: "none",
                                duration: 5e3
                            }), u("weapp.spotlight.item/1.0.0/get (sharecut detail)" + (0, s.default)(t)), i(t);
                        }
                    });
                });
            },
            getFriendList: function(t, a, o) {
                var e = this, i = this;
                r.carmen({
                    api: "weapp.spotlight.goods.share.discount/1.0.0/get",
                    data: {
                        alias: t,
                        from_alias: a,
                        discount_id: o
                    },
                    success: function(t) {
                        var a = i.data, o = a.goodsInfo, s = a.isSelf;
                        o.isClosed && !s ? (i.setData({
                            popStatus: 2,
                            canCut: !1
                        }), i.togglePopup()) : o.isSoldOut && !s && i.setData({
                            canCut: !1
                        });
                        var n = [];
                        l(t.goods_share_list, function(t) {
                            t.price = +d(t.price).toYuan(), n.push(t);
                        }), e.setData({
                            friendList: t.goods_share_list,
                            alreadyBuy: 1 === t.status
                        }), e.setGoodsStatus(), e.setActivityStatus();
                    },
                    fail: function(t) {
                        u("weapp.spotlight.goods.share.discount/1.0.0/get (sharecut detail)" + (0, s.default)(t)), 
                        reject(t);
                    }
                });
            },
            setGoodsStatus: function() {
                var t = 0, a = this.data, o = a.goodsInfo;
                a.alreadyBuy ? t = 5 : o.isClosed ? t = 4 : o.isSoldOut ? t = 3 : +o.currentPrice == +o.minCutPrice ? t = 2 : +o.currentPrice && (t = 1), 
                this.setData({
                    goodsStatus: t
                }), console.log(t, 111111111111);
            },
            setActivityStatus: function() {
                var t, a = this.data, o = a.isSelf, e = a.goodsStatus, s = a.friendList, i = a.canCut;
                o ? s.length ? 1 === e ? t = 1 : 2 === e ? t = 2 : 3 === e ? t = 3 : 4 === e ? t = 4 : 5 === e && (t = 5) : 1 === e ? t = 6 : 3 === e ? t = 7 : 4 === e ? t = 8 : 5 === e && (t = 9) : i ? t = 1 : s.length ? 1 === e ? t = 2 : 3 === e ? t = 3 : 4 === e ? t = 4 : 5 === e ? t = 5 : 2 === e && (t = 10) : 1 === e ? t = 6 : 3 === e ? t = 7 : 4 === e ? t = 8 : 5 === e && (t = 9), 
                this.setData({
                    activityStatus: t
                }), this.setButtonType();
            },
            startCutPrice: function() {
                var t = this, a = this.data, o = a.goodsAlias, e = a.fromAlias, n = a.discountId, l = wx.getStorageSync("userInfo"), g = wx.getStorageSync("userId");
                return new i.default(function(a, i) {
                    var p = t;
                    r.carmen({
                        api: "weapp.spotlight.goods.share/1.0.0/add",
                        method: "POST",
                        data: {
                            alias: o,
                            uid: g,
                            from_alias: e,
                            nickname: l.nickName || "",
                            avatar_url: l.avatarUrl,
                            discount_id: n
                        },
                        success: function(o) {
                            var e = t.data.goodsInfo.minCutPrice === t.data.goodsInfo.currentPrice, s = p.data, i = s.goodsInfo;
                            s.isSelf;
                            1 == +o.already_buy ? (t.setData({
                                popStatus: 3,
                                canCut: !1
                            }), t.togglePopup()) : i.isClosed ? (p.setData({
                                popStatus: 2,
                                canCut: !1
                            }), p.togglePopup()) : i.isSoldOut ? p.setData({
                                canCut: !1
                            }) : 1 == +o.is_cur_self ? (t.setData({
                                popStatus: 5,
                                canCut: !1
                            }), t.togglePopup()) : 1 == +o.is_max_cut ? (t.setData({
                                popStatus: 4,
                                canCut: !1
                            }), t.togglePopup()) : 0 == +o.cur_cut_price && e ? (t.setData({
                                canCut: !1,
                                popStatus: 6
                            }), t.togglePopup()) : (c.track(t.getLogData({
                                fm: "sharecut_helpsuccess"
                            })), r.logger.log({
                                et: "click",
                                ei: "sharecut_helpsuccess",
                                en: "砍价成功"
                            }), t.setData({
                                popStatus: 1,
                                canCut: !0,
                                "goodsInfo.currentPrice": +d(100 * t.data.goodsInfo.currentPrice - o.cur_cut_price).toYuan(),
                                "goodsInfo.sharePrice": +d(o.cur_cut_price).toYuan()
                            }, function() {
                                t.setData({
                                    "goodsInfo.totalCutPrice": +d(100 * t.data.goodsInfo.originPrice - 100 * t.data.goodsInfo.currentPrice).toYuan()
                                });
                            }), t.togglePopup()), a();
                        },
                        fail: function(t) {
                            u("weapp.spotlight.goods.share/1.0.0/add (sharecut detail)" + (0, s.default)(t)), 
                            i(t);
                        }
                    });
                });
            },
            fetchRecommendGoods: function() {
                var t = this;
                this.data.goodsAlias && r.carmen({
                    api: "weapp.spotlight.shop.goods.recommened/1.0.0/list",
                    method: "GET",
                    data: {
                        alias: this.data.goodsAlias,
                        order_by: "num",
                        size: 50,
                        type: 2,
                        page: 1
                    },
                    success: function(a) {
                        a.items && 1 < a.items.length && (0 != a.items.length % 2 && a.items.pop(), t.setData({
                            recommendGoods: a.items.map(function(t) {
                                return t.image_url = f(t.image_url, "!400x400.jpg"), t.price = d(t.price).toYuan(), 
                                t;
                            })
                        }));
                    },
                    fail: function(t) {
                        console.log("[get recommend goods error]" + t.msg);
                    }
                });
            },
            onGoodTap: function(t) {
                var a = "/pages/goods/detail/index?alias=" + t.currentTarget.dataset.alias + "&teamName=" + t.currentTarget.dataset.shopname;
                c.track(this.getLogData({
                    url: a,
                    act_name: "link"
                })), wx.navigateTo({
                    url: a
                });
            },
            _formatGoodsData: function(t) {
                var a = t.alias, o = t.teamName, e = t.picture[0].url, s = t.title;
                console.log(t.activity && t.activity.goods_preference);
                var i = 0, n = !1, r = Date.now(), u = !0;
                0 === t.is_pre_act ? (i = +t.activity.goods_preference.cur_price || 0, n = Date.now() > new Date(t.activity.goods_preference.end_time || 0).getTime(), 
                r = t.activity.goods_preference.end_time, r = new Date(r.replace(/-/g, "/")).getTime()) : (n = !0, 
                u = !1, console.log("活动已经结束"), this.data.isSelf && (u = !0, i = +t.pre_price));
                var c = +t.price, l = +d(100 * c - 100 * i).toYuan(), g = +d(100 * c - 100 * i).toYuan(), p = t.pv_stats || 0, h = 0 === t.skus.stock_num;
                return {
                    alias: a,
                    teamName: o,
                    imageUrl: e,
                    title: s,
                    currentPrice: i,
                    totalCutPrice: g,
                    showPrice: u,
                    originPrice: c,
                    minCutPrice: +t.min_cut_price,
                    sharePrice: l,
                    engageNum: p,
                    isSoldOut: h,
                    isClosed: n,
                    endTime: r
                };
            },
            setButtonType: function() {
                var t = this.data, a = t.activityStatus, o = t.isSelf, e = this.data.goodsInfo.isClosed, s = "share";
                s = o ? 6 === a || 1 === a ? "share" : 2 === a ? "buy" : e ? "more" : "play" : e ? "more" : "play", 
                this.setData({
                    buttonType: s,
                    buttonText: v[s]
                }), "buy" == s && this.setData({
                    buttonText: this.data.goodsInfo.currentPrice + v[s]
                });
            },
            onTapShareCutButton: function(t) {
                var a = this.data.buttonType;
                "share" === a ? this.onShareAppMessage() : "buy" === a ? this.showSkuComponent(t) : ("more" === a || "play" === a) && wx.navigateTo({
                    url: "/pages/venues/sharecut/index"
                });
            },
            togglePopup: function() {
                this.setData({
                    showPopup: !this.data.showPopup
                });
            },
            showSkuComponent: function(t) {
                console.log(t);
                var a;
                if (t && t.currentTarget) {
                    var o = t.currentTarget.dataset;
                    console.log(o), a = o.createGroupon;
                }
                var e = this.data, s = this.data.originGoodsData, i = {
                    item_id: s.id,
                    kdt_id: s.kdt_id,
                    team_name: s.team_name,
                    alias: s.alias,
                    title: s.title,
                    price: s.price,
                    origin: s.origin,
                    wait_to_sold: s.wait_to_sold,
                    is_display: s.is_display,
                    is_virtual: s.is_virtual,
                    picture: s.picture,
                    sold_status: s.sold_status,
                    quota: s.quota,
                    quota_used: s.quota_used
                };
                this.showComponentSKU({
                    alias: e.alias,
                    needFetch: !1,
                    btns: [ "buy" ],
                    goods: {
                        originData: s,
                        brief: i,
                        sku: s.skus,
                        activity: s.activity,
                        use_ump: t.currentTarget.dataset.isUmp
                    },
                    selectedSKU: e.selectedSKU,
                    needClean: !0,
                    createGroupon: a,
                    isGoodsDetail: 1
                });
            },
            onHide: function() {
                clearTimeout(D);
            },
            onUnload: function() {
                clearTimeout(D);
            },
            formatCountDown: function(t) {
                var a = h.format(t).data, o = function(t) {
                    return t = (10 > t ? "0" : "") + t;
                }, e = o(a.day), s = o(a.hour), i = o(a.minute), n = o(a.second);
                return 0 == +e ? s + ":" + i + ":" + n : e + ":" + s + ":" + i + ":" + n;
            },
            coutdown: function() {
                var t = this.data.goodsInfo.endTime - Date.now();
                0 > t && clearInterval(D), this.setData({
                    countdown: this.formatCountDown(t)
                });
            },
            runCountdown: function() {
                var t = this;
                0 > this.data.goodsInfo.endTime - Date.now() || (this.coutdown(), D = setInterval(function() {
                    t.coutdown();
                }, 500));
            },
            getLogData: function(t) {
                var a = this.data.originGoodsData ? this.data.originGoodsData.kdt_id : "", o = {
                    activity_sign: "sharecut"
                };
                return a && (o.kdtId = a), p(t, o);
            }
        }));
    }
}, [ 334 ]);
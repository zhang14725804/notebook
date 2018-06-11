function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../configs/app_config.js")), a = e(require("../../configs/api")), i = e(require("../../controller/formid_controller")), o = require("../../common/index"), n = e(require("../../storage/ram_manager")), r = e(require("../../constants/tracking/subjects")), s = e(require("../../common/wx_socket")), c = e(require("../../libs/co/we-index")), l = e(require("../../libs/regenerator-runtime/runtime")), u = e(require("../../common/storage_util")), d = e(require("../../constants/storage_keys")), p = e(require("../../components/resource_place_config/resource_place_config")), g = e(require("../../common/gotop_util")), f = e(require("../../models/format/grid_item_goods")), _ = e(require("../../components/image_map/image_map")), h = e(require("../../controller/config_controller")), m = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, k = o.ImageUtil.getCDNImgURL("base/unlogin_avatar.png"), v = [ {
    type: 1,
    key: "unpaid",
    name: "待付款",
    iconClass: "p-unpaid"
}, {
    type: 5,
    key: "grouping",
    name: "待分享",
    iconClass: "p-grouping"
}, {
    type: 2,
    key: "unshipping",
    name: "待发货",
    iconClass: "p-unreceived"
}, {
    type: 3,
    key: "unreceived",
    name: "待收货",
    iconClass: "p-unshipping"
}, {
    type: 4,
    key: "unrated",
    name: "待评价",
    iconClass: "p-unrated"
} ], y = [ {
    pageName: "coupons",
    name: "我的优惠券",
    iconClass: "p-coupon",
    needLogin: !0
}, {
    pageName: "likes",
    name: "我的收藏",
    iconClass: "p-likes",
    needLogin: !0
}, {
    pageName: "footprint",
    name: "历史浏览",
    iconClass: "p-my-footprint",
    needLogin: !0
}, {
    pageName: "after_sales",
    name: "退款/售后",
    iconClass: "p-sales",
    needLogin: !0
} ], D = [ {
    pageName: "addresses",
    name: "收货地址",
    iconClass: "p-addresses",
    needLogin: !0
}, {
    pageName: "setup",
    name: "设置",
    iconClass: "p-set",
    noSplitLine: !0,
    needLogin: !0
} ], I = {
    isActive: !1,
    firstClickTime: 0,
    clickCount: 0,
    cacheGoodsList: [],
    listId: "xcx_personal_reclist_" + o.DataUtil.getRandomString(6),
    socketText: "关闭socket",
    data: {
        hasTreasure: !0,
        clickEnable: !0,
        ordersCategoryData: v,
        rowOptions: y,
        singleList: D,
        loadingVisible: !0,
        visible: !1,
        avatarUrl: k,
        nickName: "未授权",
        gender: "未知",
        debugNavigationVisible: !1,
        debugWinVisible: !1,
        isUserGuideVisible: !1,
        list: [],
        localGroupsMap: {},
        showError: !1,
        isLoadAll: !1,
        templeName: "gridItemV2",
        goTopClass: !1
    },
    guideShowTimeLength: 0,
    size: 20,
    page: 1,
    navigatePage: function(e) {
        var t = this, a = e.detail.value.url;
        o.Navigation.route("/" + a).then(function() {}, function(e) {
            t.$showToast(e.errMsg);
        });
    },
    cancelNavWindow: function() {
        this.setData({
            debugNavigationVisible: !1
        });
    },
    easterEggClick: function() {
        (this.clickCount > 8 || Date.now() - this.firstClickTime > 8e3) && (this.clickCount = 0, 
        this.firstClickTime = 0), this.firstClickTime || (this.clickCount = 0, this.firstClickTime = Date.now()), 
        ++this.clickCount > 8 && Date.now() - this.firstClickTime <= 8e3 && this.setData({
            debugWinVisible: !0
        });
    },
    confirmDebug: function(e) {
        var a = this, i = e.currentTarget.dataset.openDebug;
        this.setData({
            debugWinVisible: !1
        }), i && wx.showActionSheet({
            itemList: [ t.default.version, "清除缓存", "跳转特定页面", a.socketText, "h5切到tahiti" ],
            success: function(e) {
                switch (e.tapIndex) {
                  case 0:
                    break;

                  case 1:
                    a.clearStorage();
                    break;

                  case 2:
                    a.setData({
                        debugNavigationVisible: !0
                    });
                    break;

                  case 3:
                    n.default.noSocketRequest ? (n.default.noSocketRequest = !1, a.socketText = "关闭socket") : (n.default.noSocketRequest = !0, 
                    a.socketText = "打开socket");
                    break;

                  case 4:
                    n.default.H5UsePreRelease = !0;
                }
            }
        });
    },
    clearStorage: function() {
        try {
            wx.clearStorageSync(), this.$showToast("缓存清理成功");
        } catch (e) {
            this.$showToast("缓存清理失败");
        }
    },
    userInfoTracking: function(e) {
        var t = [ "personal_my_coupons", "personal_my_likes", "personal_my_footprint", "personal_after_sale", "personal_my_address", "custom_service", "setting" ], a = [ 99992, 99991, 99989, 99990, 99985, 99982, 99984 ];
        (0, o.TrackingRecord)({
            op: "click",
            event: "o_icon_clk",
            page_name: "personal",
            page_section: "page_user_info",
            page_element: t[e],
            page_el_sn: a[e]
        });
    },
    clickRowOptionsItem: function(e) {
        var t = this, a = parseInt(e.currentTarget.dataset.index, 10);
        if (!isNaN(a)) {
            var i = y[a].pageName;
            y[a].needLogin ? this.navigateInterceptor(function() {
                "footprint" === i || "likes" === i || "after_sales" === i ? o.Util.toWeb({
                    page_name: i
                }, t) : t.$forward(i);
            }) : this.$forward(i), this.userInfoTracking(a);
        }
        var n = [ "my_coupons_clk", "my_likes_clk", "my_footprint_clk", "my_aftersale_clk" ], r = e.detail.formId, s = n[a];
        this.uploadFormId(r, s, !0), this.setData({
            couponDot: 0
        });
    },
    uploadFormId: function(e, t, a) {
        e && t && i.default.uploadFormIdToSH(e, a);
    },
    clickSingleListItem: function(e) {
        var t = this, a = parseInt(e.currentTarget.dataset.index, 10);
        if (!isNaN(a)) {
            var i = D[a].pageName, n = {};
            "custom_service" == i && (n.mall_id = 606), D[a].needLogin ? this.navigateInterceptor(function() {
                "setup" === i ? o.Util.toWeb({
                    page_name: "setup"
                }, t) : t.$forward(i, n);
            }) : "setup" === i ? o.Util.toWeb({
                page_name: "setup"
            }, this) : this.$forward(i, n), this.userInfoTracking(a + 4);
            var r = [ "my_footprint_clk", "my_freecoupon_clk", "my_address_clk", "my_groups_clk" ];
            if (a < r.length) {
                var s = !0;
                1 == a && (s = !1);
                var c = e.detail.formId;
                this.uploadFormId(c, r[a], s);
            }
        }
    },
    orderTracking: function(e) {
        var t = [ "personal_order_0", "personal_unpaid", "personal_unshipping", "personal_unreceived", "personal_unrated", "personal_grouping" ], a = [ "99994", "99999", "99997", "99996", "99995", "99998" ], i = parseInt(e, 0);
        (0, o.TrackingRecord)({
            op: "click",
            event: "o_icon_clk",
            page_name: "personal",
            page_section: "page_order",
            page_element: t[i],
            page_el_sn: a[i]
        });
    },
    didClickGetUserInfoBtn: function() {
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") ? (0, o.TrackingRecord)(r.default.authPromptParams) : this.$showToast("您的微信版本过低，建议升级微信获得更好体验"), 
        (0, o.TrackingRecord)({
            op: "click",
            page_name: "personal",
            page_section: "header",
            page_element: "wx_data"
        });
    },
    getUserInfoHandler: function(e) {
        var t = this;
        if (e && e.detail && e.detail.userInfo) {
            var a = e.detail.userInfo, i = {
                country: a.country,
                province: a.province,
                city: a.city,
                gender: a.gender,
                avatar: a.avatarUrl,
                nickname: a.nickName
            };
            o.User.uploadUserInfo(i, function(e) {
                e ? (t.setUserInfoData(a), o.User.saveNickNameAndAvatarUrl(a), t.$showToast("资料已更新")) : t.$showToast("更新资料失败");
            }), (0, o.TrackingRecord)(r.default.authApproveParams);
        } else t.$showToast("更新资料失败"), (0, o.TrackingRecord)(r.default.authRefuseParams);
    },
    gotoOrders: function(e) {
        var t = this, a = e.currentTarget.dataset, i = parseInt(a.type, 10);
        this.navigateInterceptor(function() {
            t.$forward("orders", {
                type: i
            });
        });
        var o = [ "order_more_clk", "order_unpaid_clk", "order_unshipping_clk", "order_unreceived_clk", "order_unrated_clk", "order_grouping_clk" ];
        this.orderTracking(i);
        var n = e.detail.formId;
        this.uploadFormId(n, o[i], !1);
    },
    setUserInfoData: function(e) {
        var t = this;
        if (e && null != e.nickName && null != e.avatarUrl) {
            var a = {
                avatarUrl: e.avatarUrl,
                nickName: e.nickName
            };
            e.gender && (a.gender = e.gender), t.setData(a);
        }
    },
    updateUserInfo: function() {
        var e = this;
        o.User.requireLogin(function() {
            e.getCouponState(), o.User.getUserInfo(function(t, a) {
                t ? (e.setUserInfoData(a), o.User.saveNickNameAndAvatarUrl(a)) : e.$showToast("获取用户信息失败");
            });
        });
    },
    fetchDailyDuobaoInfo: function() {
        var e = this, t = h.default.getConfig("daily_raider"), i = new Promise(function(e) {
            var t = u.default.getStorageSync("daily_radier_remain_count_info");
            !t || o.TimeUtil.isNextDay(1e3 * t.server_time) ? o.Request.apiRequest("GET", a.default.remainDailyDuobaoCount, {}, !1, {
                needGZToken: !0,
                forceUseApiGZ: !0
            }).then(function(a) {
                u.default.setStorage("daily_radier_remain_count_info", a), e(t = a);
            }) : e(t);
        });
        Promise.all([ t, i ]).then(function(t) {
            var a = t[0], i = t[1], o = i && i.data && i.data.whitelist_switch_on, r = !1;
            1019 === n.default.sceneId ? r = !0 : o || a ? r = !0 : i && i.data && i.data.participated && (r = !0);
            var s = !0;
            s = !!(i && i.data && i.data.remainder_count > 0), e.setData({
                showDailyDuobao: r,
                hasTreasure: s
            });
        }).catch(function() {});
    },
    onShow: function() {
        this.isActive = !0, this.updateUserInfo(), this.fetchDailyDuobaoInfo(), s.default.getUnreadMsgCount();
    },
    getCouponState: function() {
        var e = this;
        (0, c.default)(l.default.mark(function t() {
            var i, n;
            return l.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, i = o.Request.requestDataWithUrl("GET", a.default.getCouponState, {
                        query_coupon: 1,
                        query_order: 1,
                        show_free_coupon: 1
                    }, !1), t.next = 4, o.Request.runSecondaryRequestForPage(i, e);

                  case 4:
                    (n = t.sent) && e.setData({
                        couponDot: n.coupon_dot,
                        ordersCount: {
                            unpaid: n.un_pay_count,
                            grouping: n.grouping,
                            unshipping: n.un_delivery_count,
                            unreceived: n.un_receive_count,
                            unrated: n.un_comment_count
                        }
                    }), t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(0), console.error(t.t0);

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 8 ] ]);
        }));
    },
    onHide: function() {
        this.isActive = !1;
    },
    onUnload: function() {
        this.isActive = !1;
    },
    navigateInterceptor: function(e) {
        o.User.hasLogin() ? "function" == typeof e && e() : this.updateUserInfo();
    },
    loadUserInfoFromLocal: function() {
        var e = this, t = o.User.getUserLocalInfo() || {}, a = t.nickName, i = t.avatarUrl, n = t.gender;
        a && i && n && e.setUserInfoData({
            nickName: a,
            avatarUrl: i,
            gender: n
        });
    },
    onReachBottom: function() {
        this.requestList();
    },
    requestList: function(e) {
        var t = this, a = this.data, i = this.page, n = this.size, r = this.listId, s = "api/barrow/query?app_name=personal&offset=" + i + "&count=" + n + "&list_id=" + r;
        if (!a.isLoadingMore && !a.isLoadAll) {
            this.setData({
                isLoadingMore: !0
            }), e && this.$showLoading();
            var c = o.Request.requestDataWithUrl("GET", s, null, !0);
            o.Request.runMainRequestForPage(c, this).then(function(e) {
                t.$hideLoading(), t.setData({
                    isLoadingMore: !1
                });
                var a = o.DataUtil.isArray(e.data) ? e.data : [], i = t;
                a.forEach(function(e) {
                    var t = f.default.formatData(e);
                    t.listId = r, i.cacheGoodsList.push(t);
                }), t.cacheGoodsList = o.DataUtil.objectArrayDuplicateRemove(t.cacheGoodsList, "goodsId", function(e) {
                    return 1 == e.isApp;
                });
                var s = _.default.execMix(null, t.cacheGoodsList, [], m, "gridItemV2");
                t.mixGoodsData = _.default.listPositionAdjust(s);
                var c = e && e.data && e.data.length;
                0 == c ? t.setData({
                    isLoadAll: !0,
                    noOrderText: "没有更多的商品了..."
                }) : c < n / 2 ? (t.fillGoodsList(), t.page++, t.onReachBottom()) : (t.fillGoodsList(), 
                t.page++);
            }, function() {
                t.$hideLoading(), t.setData({
                    showError: !0,
                    isLoadingMore: !1
                });
            });
        }
    },
    fillGoodsList: function() {
        var e = this.mixGoodsData || [], t = this.data.list || [], a = t.length;
        if (e.length > a) {
            var i = e.length - a, o = 20;
            i < 20 && i % 2 != 0 && !this.data.isLoadAll && (o = i - 1), t = e.slice(0, t.length + o), 
            this.setData({
                list: t
            });
            var n = t.slice(a);
            this.$requestLocalGroup(n), this.tryInitImprRect();
        }
    },
    getTrackingParams: function(e, t, a) {
        var i = {
            op: e,
            rec_goods_id: a.goodsId,
            idx: t,
            page_sn: "10001",
            page_el_sn: "99084",
            page_element: "goods",
            list_id: a.listId,
            rec_event_type: a.eventType
        };
        return a.transData && (a.transData.ad && (i.ad = JSON.stringify(a.transData.ad)), 
        a.transData.p_rec && (i.p_rec = JSON.stringify(a.transData.p_rec)), a.transData.p_search && (i.p_search = JSON.stringify(a.transData.p_search))), 
        i;
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.goodsId, i = o.DataUtil.checkByKey(this.data.list, a, "goodsId");
        Object.keys(i).length <= 0 && (i = o.DataUtil.checkByKey(this.data.lotteryGoodsList, a, "goodsId"));
        var n = t.index;
        this.transGoodsData = i.transData || {}, this.transGoodsData.preloadImgUrl = i.imgUrl, 
        this.$forward("goods", Object.assign({
            goods_id: a
        }, i.transData));
        var r = this.getTrackingParams("click", n, i);
        "timeLimit" === t.refer ? r.page_section = "time_limit" : r.page_section = "goods_list", 
        (0, o.TrackingRecord)(r), this.$uploadFormId(e);
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var a = t.data.list || [];
            if (e < a.length) {
                var i = a[e] || {}, n = t.getTrackingParams("impr", e, i);
                n.page_section = "goods_list", (0, o.TrackingRecord)(n);
            }
        });
    },
    onPageScroll: function(e) {
        var t = this;
        if (e) {
            var a = parseInt(e.scrollTop);
            g.default.showGoTopBtn(a, this), this.updateScrollTop(a);
        }
        this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300);
    },
    goTop: function() {
        g.default.goTop(!0);
        var e = this.getClickTrackingParams("pop_list", "top_btn");
        (0, o.TrackingRecord)(e);
    },
    onLoad: function() {
        this.pvTracking(), this.requestList(!0), this.loadUserInfoFromLocal(), this.resourcePlaceControl = new p.default({
            page: this,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "little_banner_personal"
        });
        var e = this, t = o.SystemInfo.getSystemInfoSync().platform;
        (0, c.default)(l.default.mark(function a() {
            var i;
            return l.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.prev = 0, a.next = 3, u.default.getStorage(d.default.HAS_SHOW_DESKTOP_ICON_FOR_ANDROID);

                  case 3:
                    i = a.sent, "android" !== t || i || (e.setData({
                        personalShowTipConfig: !0
                    }), setTimeout(function() {
                        e.setData({
                            personalShowTipConfig: !1
                        });
                    }, 6e3), u.default.setStorage(d.default.HAS_SHOW_DESKTOP_ICON_FOR_ANDROID, !0)), 
                    a.next = 10;
                    break;

                  case 7:
                    a.prev = 7, a.t0 = a.catch(0), console.error(a.t0);

                  case 10:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 7 ] ]);
        }));
    },
    didClickDailyDuobaoBtn: function() {
        this.$forward("daily_raider");
        var e = {
            op: "click",
            page_sn: 10001,
            page_section: "main",
            page_element: "seize_treasure",
            refer_xcx_campaign_seize_treasure: "0"
        };
        (0, o.TrackingRecord)(e);
    },
    pvTracking: function() {
        var e = {
            op: "pv",
            page_url: "pages/personal/personal"
        };
        (0, o.TrackingRecord)(e);
    }
};

(0, o.PddPage)(I, {
    pageName: "personal",
    pageSn: 10001,
    notUseCommonPV: !0
});
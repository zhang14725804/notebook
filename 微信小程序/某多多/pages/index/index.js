function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = e(require("../../constants/share_info")), o = e(require("../../libs/es6-promise.min")), n = e(require("../../constants/ui/base64/webp_test")), r = e(require("../../storage/webp_test_storage")), s = e(require("../../components/bubble/bubble")), i = e(require("../../models/format/coupons_format")), u = e(require("../../controller/config_controller")), d = e(require("../../components/resource_place_config/resource_place_config")), c = e(require("./top_banner/top_banner.js")), l = e(require("./category_entrance/category_entrance.js")), h = e(require("./goods_list/goods_list.js")), p = e(require("./unpaid_order/unpaid_order.js")), g = e(require("../../configs/api")), f = e(require("../../components/popup_modal/popup_modal")), _ = e(require("../../libs/co/we-index")), m = e(require("../../libs/regenerator-runtime/runtime")), w = e(require("../../storage/ram_manager")), b = e(require("../../common/scene_route")), D = require("../../common/index"), x = e(require("../../constants/storage_keys")), S = e(require("../../components/segment/segment.js")), C = {
    homeOperations: "10120",
    queryValidityCoupons: "10057"
}, v = {
    pageSize: 20,
    canLoadMore: !0,
    onShareAppMessage: function() {
        return this.$generateShareContent({
            title: a.default.DefaultTitle
        });
    },
    showIndexModal: !1,
    segmentControl: null,
    data: {
        pageName: "index",
        webpTestSrc: n.default,
        loadingMoreText: "正在加载中",
        visible: !1,
        clickEnable: !0,
        curBannerIndex: 0,
        homeOperations: [],
        curTabIndex: 0,
        catgoodsList: [],
        lastSingleGoodsIndex: -1,
        tabStatus: [ {
            canLoadMore: !0,
            recCanLoadMore: !0,
            showNoMoreText: !1,
            showError: !1
        } ],
        bubble: {
            isShow: !0,
            top: "104rpx"
        },
        indexRedDotUrl: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/big_sales/index_reddot.png",
        timeSpikeImg: "http://pinduoduoimg.yangkeduo.com/wxapp/time_spike.git.gif",
        showUnpaidModal: !1,
        bannerAutoPlay: !0,
        goTopClass: !1,
        couponsList: [],
        showCouModal: !1,
        isPageOnShow: !0,
        $tabsData: [],
        entrance_container_step: ""
    },
    authorizeShowCallback: function() {
        this.isAuthorizeShow = !0, this.reDrawShsCtx();
    },
    authorizeHideCallback: function() {
        this.isAuthorizeShow = !1, this.reDrawShsCtx();
    },
    reDrawShsCtx: function() {
        try {
            var e = this.data, t = e.showUnpaidModal, a = e.tabStatus, o = e.curTabIndex;
            0 != o || t || this.showIndexModal || this.isAuthorizeShow || a[o].showError ? this.categoryEntrance.hideShsCtx() : this.categoryEntrance.drawShsCtx();
        } catch (e) {
            console.error(e);
        }
    },
    webpTestImgLoad: function(e) {
        var t = e.detail || {}, a = t.width && t.height;
        r.default.setWebpEnable(a);
    },
    onPageScroll: function(e) {
        var t = this, a = parseInt(e.scrollTop);
        this.updateScrollTop(a), this.categoryEntrance.onPageScroll(e), this.goodsListComponent.onPageScroll(e), 
        this.topBanner.onPageScroll(e), this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300);
    },
    didClickSegmentTab: function(e) {
        var a, o = parseInt(e.currentTarget.dataset.index);
        if (!isNaN(o) && o !== this.data.curTabIndex) {
            var n = this.data.curTabIndex, r = this.data.catgoodsList[n];
            r && (r = this.data.catgoodsList[n].slice(0, 20));
            var s = 0 == o, i = D.ObjectUtil.assign((a = {}, t(a, "catgoodsList[" + n + "]", r), 
            t(a, "curTabIndex", o), t(a, "goTopClass", !1), t(a, "bubble.isShow", s), t(a, "isShowNext", !1), 
            a), this.segmentControl.$data());
            this.setData(i), this.goodsListComponent.loadTargetTabGoodsList(o), this.reDrawShsCtx(), 
            (0, D.TrackingRecord)({
                op: "click",
                event: "opt_entry_clk",
                page_name: "index",
                page_section: "opt_list",
                page_sn: 10002,
                page_el_sn: 99132,
                page_element: "opt",
                element_id: this.data.homeOperations[o].opt_id,
                idx: o
            });
        }
    },
    onReachBottom: function() {
        this.goodsListComponent.onReachBottom();
    },
    reLoad: function() {
        this.startLoadPage();
    },
    onUnload: function() {
        s.default.close(this);
    },
    dealWithHomeOperationsData: function(e) {
        if (!e || 0 == e.length) return {};
        var t = [], a = [];
        return (e = [].concat(e)).unshift({
            opt_name: "热门",
            opt_id: -1,
            children: []
        }), e.forEach(function(e, o) {
            e.children = e.children && e.children.length >= 9 ? e.children.slice(0, 9) : e.children.slice(0, 7), 
            e.children.map(function(e) {
                return e.opt_name = e.opt_name.slice(0, 5), e;
            }), t.push(e), a[o] = {}, 0 == o && (a[o].recCanLoadMore = !0), a[o].canLoadMore = !0, 
            a[o].showNoMoreText = !1, a[o].showError = !1, a[o].flip = "";
        }), {
            homeOperations: t,
            tabStatus: a
        };
    },
    startLoadPage: function() {
        this.windowWidth || (this.windowWidth = D.SystemInfo.getWindowWidthSync()), this.resourcePlaceControl || (this.resourcePlaceControl = new d.default({
            page: this,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "floating_index"
        })), this.topBanner = new c.default(this), this.categoryEntrance = new l.default(this), 
        this.goodsListComponent = new h.default(this), this.unPaidOrderComponent = new p.default(this), 
        this.loadHomeOperations();
    },
    loadHomeOperations: function() {
        var e = this, t = this;
        this.$showLoading();
        var a = (0, _.default)(m.default.mark(function e() {
            var a, o, n, r;
            return m.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, D.StorageUtil.getStorage(x.default.HOME_OPERATIONS);

                  case 2:
                    (a = e.sent) && a.homeOperations && (o = a.homeOperations, n = o.map(function(e) {
                        return {
                            title: e.opt_name
                        };
                    }), t.segmentControl.refreshTabsData(n), r = D.ObjectUtil.assign({
                        scrollContainerWidth: t.windowWidth,
                        homeOperations: o,
                        curBannerIndex: t.data.curBannerIndex || 0,
                        visible: !0
                    }, t.segmentControl.$data()), t.setData(r));

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), n = (0, _.default)(m.default.mark(function e() {
            var a, o, n, r, s, i, u;
            return m.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (0 !== t.data.curTabIndex) {
                        e.next = 7;
                        break;
                    }
                    return a = D.Request.requestDataWithCmd(C.homeOperations), e.next = 4, D.Request.runMainRequestForPage(a, t);

                  case 4:
                    o = e.sent, n = t.dealWithHomeOperationsData(o), Object.keys(n).length > 0 ? (r = n.tabStatus, 
                    s = n.homeOperations, i = s.map(function(e) {
                        return {
                            title: e.opt_name
                        };
                    }), t.segmentControl.refreshTabsData(i), u = D.ObjectUtil.assign({
                        scrollContainerWidth: t.windowWidth,
                        homeOperations: s,
                        tabStatus: r,
                        curBannerIndex: t.data.curBannerIndex || 0,
                        visible: !0
                    }, t.segmentControl.$data()), t.setData(u), wx.setStorage({
                        key: x.default.HOME_OPERATIONS,
                        data: n
                    })) : (t.$showToast("出错啦, 请稍后重试~ "), t.setData({
                        "tabStatus[0].showError": !0
                    }));

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        }));
        o.default.all([ a, n ]).then(function() {
            t.$hideLoading(), e.goodsListComponent.preLoadNextGoodsList();
        }).catch(function() {
            t.$hideLoading();
        });
    },
    onLoad: function(e) {
        var t = this, a = Date.now() + w.default.timeDiff, o = "";
        if (e.widgetData) {
            for (var n = decodeURIComponent(e.widgetData), r = JSON.parse(n).more_result_path || "", s = JSON.parse(decodeURIComponent(e.wxParamData)), i = "", u = 0; u < s.slot_list.length; u++) i += s.slot_list[u].value;
            r ? (r = r.indexOf("?") < 0 ? r + "?target_query=" + i + "&source=wxsearch_result" : r + "&target_query=" + i + "&source=wxsearch_result", 
            wx.redirectTo({
                url: r
            })) : console.error("jump_url error");
        }
        this.pvTracking(), e && e.scene && (this.setData({
            isPageOnShow: !1
        }), b.default.route(e.scene)), a >= 15283872e5 && a <= 1529078399e3 && (o = "entrance_container_618 entrance_container_618_2", 
        this.setData({
            entrance_container_step: o
        }));
        var d = {
            tabsData: this.data.$tabsData,
            alignType: "align-gap",
            setDataFunc: function(e) {
                t.setData(e);
            }
        };
        this.segmentControl = new S.default(d, this), this.popupModal = new f.default({
            page: this,
            ns: "popupModel",
            key: "popup_index",
            autoBegin: !1,
            showFnCallback: function() {
                t.showIndexModal = !0, t.reDrawShsCtx();
            },
            hideFnCallback: function() {
                try {
                    t.showIndexModal = !1, t.reDrawShsCtx();
                } catch (e) {
                    console.error(e);
                }
            }
        }), this.eventQueue = this.popupModal.getEventQueue(), this.startLoadPage();
    },
    onShow: function() {
        var e = this;
        s.default.init(this, !1, "", 1), this.$urlQueryObj && this.$urlQueryObj.scene && !this.$firstShow && this.setData({
            isPageOnShow: !0
        }), this.reDrawShsCtx(), this.setData({
            bannerAutoPlay: !0
        });
        var t = this.eventQueue;
        (0, _.default)(m.default.mark(function a() {
            var o, n, r, s, i, d, c, l, h, p, g, f, _;
            return m.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (o = e.data, n = o.showCouModal, r = o.showUnpaidModal, s = o.showDailyDuobaoModal, 
                    !(r || n || e.showIndexModal || s)) {
                        a.next = 3;
                        break;
                    }
                    return a.abrupt("return");

                  case 3:
                    return a.next = 5, e.popupModal.loadData();

                  case 5:
                    return i = a.sent, a.next = 8, [ e.checkStorage("login_index_time"), e.checkStorage("coupons_modal"), e.checkStorage("daily_duobao_modal") ];

                  case 8:
                    return d = a.sent, c = d[0], l = d[1], h = d[2] && 1019 != w.default.sceneId, e.isUnpaidShow = !1, 
                    e.isCouponShow = !1, e.isDailyDuobaoShow = !1, e.popupIdx = 0, p = [], g = {}, (!i || i.length < 2) && c && (p.push(e.unPaidOrderComponent.getUnpaidOrder()), 
                    g.isUnpaidShow = p.length - 1), a.next = 21, u.default.getConfig("daily_raider");

                  case 21:
                    return f = a.sent, a.next = 24, e.requestRemainDuobaoCount(e);

                  case 24:
                    return h && e.isDuobaoOnline && (f || e.participated) && (e.isDailyDuobaoShow = e.data.remainDuobaoCount > 0), 
                    l && (p.push(e.requestCouponListDetail(e)), g.isCouponShow = p.length - 1), a.next = 28, 
                    p;

                  case 28:
                    _ = a.sent, Object.keys(g).forEach(function(t) {
                        "number" == typeof g[t] && g[t] >= 0 && (e[t] = _[g[t]]);
                    }), e.isUnpaidShow && t.pushHandler("showUnpaidModal", "hideUnpaidModal"), e.isDailyDuobaoShow ? t.pushHandler("showDailyDuobaoModalFn") : e.isCouponShow ? t.pushHandler("showCouponModal") : t.pushHandler("reDrawShsCtx"), 
                    t.triggerHandler();

                  case 33:
                  case "end":
                    return a.stop();
                }
            }, a, this);
        })), w.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    onHide: function() {
        w.default.w_entrance && (w.default.w_entrance = null), s.default.close(this), this.setData({
            bannerAutoPlay: !1
        });
    },
    checkStorage: _.default.wrap(m.default.mark(function e(t) {
        var a, o, n, r;
        return m.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = !1, e.next = 4, D.StorageUtil.getStorage(t);

              case 4:
                return (o = e.sent) ? (n = new Date().setHours(0, 0, 0, 0), r = new Date(n).getTime(), 
                o <= r && (a = !0)) : a = !0, e.abrupt("return", a);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    showUnpaidModal: function() {
        this.setData({
            showUnpaidModal: !0
        }), this.reDrawShsCtx();
    },
    hideUnpaidModal: function() {
        this.setData({
            showUnpaidModal: !1
        }), D.StorageUtil.setStorage("login_index_time", new Date().getTime()), this.reDrawShsCtx();
    },
    showDailyDuobaoModalFn: function() {
        var e = this;
        this.setData({
            showDailyDuobaoModal: !0,
            showUnpaidModal: !1
        }), this.reDrawShsCtx(), D.StorageUtil.setStorage("daily_duobao_modal", new Date().getTime()), 
        setTimeout(function() {
            e.setData({
                showDailyDuobaoModal: !1
            });
        }, 4e3);
        var t = {
            op: "impr",
            page_section: "treasure_bubble",
            refer_xcx_campaign_seize_treasure: 0
        };
        (0, D.TrackingRecord)(t);
    },
    showCouponModal: function() {
        var e = this;
        this.setData({
            showCouModal: !0,
            showUnpaidModal: !1
        }), this.reDrawShsCtx(), D.StorageUtil.setStorage("coupons_modal", new Date().getTime()), 
        setTimeout(function() {
            e.setData({
                showCouModal: !1
            });
        }, 4e3);
    },
    requestRemainDuobaoCount: _.default.wrap(m.default.mark(function e(t) {
        var a, o, n;
        return m.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, (a = D.StorageUtil.getStorageSync("daily_radier_remain_count_info")) && !D.TimeUtil.isNextDay(1e3 * a.server_time)) {
                    e.next = 8;
                    break;
                }
                return e.next = 5, D.Request.apiRequest("GET", g.default.remainDailyDuobaoCount, {}, !1, {
                    needGZToken: !0,
                    forceUseApiGZ: !0
                });

              case 5:
                o = e.sent, D.StorageUtil.setStorage("daily_radier_remain_count_info", o), a = o;

              case 8:
                return n = a && a.data && a.data.remainder_count, t.participated = a && a.data && a.data.participated, 
                t.isDuobaoOnline = a && a.data && a.data.whitelist_switch_on, t.setData({
                    remainDuobaoCount: n
                }), w.default.remainDuobaoCount = n, e.abrupt("return", n);

              case 16:
                e.prev = 16, e.t0 = e.catch(0), console.error(e.t0);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 16 ] ]);
    })),
    requestCouponListDetail: _.default.wrap(m.default.mark(function e(t) {
        var a, o, n, r, s, u, d, c, l, h, p;
        return m.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = 1, o = 60, n = Date.parse(new Date()) / 1e3, r = D.Request.requestDataWithCmd(C.queryValidityCoupons, {
                    params: {
                        page: a,
                        size: o,
                        fc_version: 1,
                        sort_rule: "coupon_end_time"
                    }
                }), e.next = 7, D.Request.runSecondaryRequestForPage(r, t);

              case 7:
                for (s = e.sent, u = s.server_time || parseInt(Date.now() / 1e3, 10), d = (0, i.default)(s.coupons, 0, u) || [], 
                c = 0, l = 0; l < d.length; ++l) h = parseInt(d[l].expiredTime) - 259200, n > h && (p = parseInt(d[l].discount), 
                c += p);
                return t.setData({
                    tobeEndTimeCouponTotal: c
                }), e.abrupt("return", c > 0);

              case 16:
                e.prev = 16, e.t0 = e.catch(0), console.error(e.t0);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 16 ] ]);
    })),
    imprItems: function(e) {
        var t = this, a = t.data.curTabIndex, o = t.data.homeOperations[a] || this.data.catgoodsList[a], n = o.opt_id, r = o.children ? 1 : 2;
        (0, _.default)(m.default.mark(function o() {
            return m.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    e.forEach(function(e) {
                        var o = t.data.curTabIndex || 0, s = t.data.catgoodsList[o] || [];
                        if (e < s.length) {
                            var i = s[e] || {}, u = {
                                op: "impr",
                                page_section: "opt_goods_list",
                                page_element: "goods",
                                page_name: "index",
                                page_sn: 10002,
                                idx: e,
                                goods_id: i.goodsId,
                                rec_goods_id: i.goodsId,
                                opt_type: r,
                                opt_id: n,
                                event_type: i.eventType,
                                page_el_sn: 99740
                            };
                            if (void 0 != i.eventType && (u.rec_event_type = i.eventType, u.event_type = i.eventType), 
                            0 == a) {
                                var d = i.transData.listId, c = d && d.split("_")[2];
                                "wsingle" === c ? (u.page_section = "single_list", u.page_el_sn = 99366) : "goods" === c ? (u.page_section = "rec_list", 
                                u.page_el_sn = 99366) : "single" === c && (u.page_section = "goods_list", u.page_el_sn = 99862);
                            }
                            i.transData && (i.transData.ad && (u.ad = JSON.stringify(i.transData.ad)), i.transData.p_rec && (u.p_rec = JSON.stringify(i.transData.p_rec)), 
                            i.transData.p_search && (u.p_search = JSON.stringify(i.transData.p_search)), u.list_id = i.transData.listId), 
                            (0, D.TrackingRecord)(u);
                        }
                    });

                  case 1:
                  case "end":
                    return o.stop();
                }
            }, o, this);
        }));
    },
    pvTracking: function(e) {
        var t = {
            op: "pv",
            page_name: "index",
            page_sn: 10002
        };
        e && (t.is_back = 1), (0, D.TrackingRecord)(t), this.$firstTimeTrackRecord.pv = !0;
    }
};

(0, D.PddPage)(v, {
    pageName: "index",
    pageSn: 10002,
    notUseCommonPV: !0
});
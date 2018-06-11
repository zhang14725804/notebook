function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var o = e(require("../../controller/goods_bottom_bar")), a = e(require("../../components/goods_bottom_bar/goods_bottom_bar.js")), r = e(require("../../constants/share_info")), s = e(require("./play_rules")), i = e(require("../../constants/groups")), n = e(require("./goods_icons")), c = e(require("../../components/bubble/bubble")), l = e(require("./cache_goods_data")), d = e(require("./goods_util")), u = e(require("../../constants/goods")), p = e(require("../../common/navigation")), g = e(require("../../configs/request_errors")), m = e(require("../../storage/ram_manager")), h = require("../../common/message"), f = e(require("../../common/buy_util")), _ = e(require("../../models/format/luck_draw")), v = e(require("../../models/format/v2_goods_detail")), k = e(require("../../models/format/mall_info")), I = e(require("../../models/group_proxy")), T = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), y = e(require("../../libs/regenerator-runtime/runtime")), D = e(require("../../components/sku_selector/sku_selector_v2")), b = e(require("../../common/gotop_util")), w = e(require("../../components/screen_shot_share/screen_shot_share")), C = e(require("../../controller/formid_controller")), S = e(require("../../models/format/grid_item_goods")), G = e(require("../../common/scene_route")), P = e(require("../../components/share_action_sheet/share_action_sheet")), L = e(require("../../components/popup_modal/popup_modal")), R = e(require("../../components/resource_place_config/resource_place_config")), M = e(require("../../controller/config_controller")), O = require("../../common/index"), x = e(require("../../configs/api")), q = g.default.couponErrorHint, B = {
    takeMerchantCoupon: "10151",
    getMallDetail: "3004",
    getRecommendGoodsDetail: "10170",
    getFreeCouponsDetail: "10413",
    getLotteryDetail: "20009",
    getReviewsDetail: "10148",
    getGoodsDetail: "10052",
    getGoodsInfo: "10430",
    getUserInfo: "10431",
    getGoodsLisbon: "10200",
    checkMerchantCoupon: "10043",
    getLocalGroupsDetail: "10199"
}, U = {
    referPageElement: null,
    cacheBottomId: null,
    maxRecommendGoodsNum: 100,
    goodsBottomBarData: null,
    toast: null,
    dispatchIds: {},
    localGroupModule: null,
    skuSelectorModule: null,
    hasSkuSelector: !1,
    goodsBottomBar: null,
    localGroupCountdown: null,
    current: 0,
    recOffset: 0,
    recCount: 20,
    lowerLock: !1,
    longPressLock: !1,
    mallId: 0,
    recommendGoodsCache: [],
    sourceChannel: "0",
    keyboardHeightStyle: 0,
    onShareAppMessage: function(e) {
        var t = this.data.goodsInfo || {}, o = O.ObjectUtil.assign({}, this.$urlQueryObj, {
            mall_id: null,
            group_order_id: null,
            wt_id: null,
            status: null,
            group_role: null,
            like_flag: null,
            from: null,
            goods_type: t.goodsType,
            event_type: t.eventType,
            goods_price: this.data.minOnsaleGroupPrice
        }), a = "";
        if (e) if ("menu" == e.from) a = "top_forward"; else {
            var s = e.target.dataset.subRefer;
            "goods-share-btn" == s ? a = "goods_detail_share" : "screen-shot" == s ? a = "screen_shot_share" : "actionSheetTap" == s && (a = "pic_clk_share");
        }
        var i = r.default.DefaultTitle;
        return t.groupTypes && (i = (t.useOnSalePrice ? t.minOnsaleGroupPrice : t.minGroupPrice) + "元" + t.goodsName), 
        0 == t.eventType && (i = ((O.User.getUserLocalInfo() || {}).nickName || "您的朋友") + "超值推荐【" + t.goodsName + "】"), 
        this.$generateShareContent({
            title: i,
            imageUrl: this.imageUrl,
            needGetShareImg: this.needGetShareImg,
            shareKey: "eventtype0_share_img1",
            queries: o,
            referStr: a
        });
    },
    clickShareBtn: function() {
        var e = this.getClickTrackingParams("main", "share_btn");
        (0, O.TrackingRecord)(e);
    },
    data: {
        goTopClass: !1,
        pageName: "goods",
        showNormalSalesElement: !1,
        visible: !0,
        goodsIcons: [],
        selectedGroup: null,
        topGalleryIndex: 1,
        mallRecommendList: [],
        recommendList: [],
        loadRecommendComplete: !1,
        loadingMoreVisible: !1,
        loadingMoreText: "正在加载中...",
        mallInfo: null,
        firstEnter: !0,
        bottomBarVisible: !1,
        needLoadBg: !1,
        serviceDetailVisible: !1,
        serviceMainClass: "service-detail-hidden",
        couponsDetailVisible: !1,
        couponsMainClass: "coupons-detail-hidden",
        mallCouponToastData: {
            receiveSuccess: !1,
            toastVisible: !1,
            mainToast: "",
            subToast: ""
        },
        reviews: {},
        goodsInfo: {
            isShowBanner: !0
        },
        groupWindowVisible: !1,
        isShowContent: !1,
        isShowTitle: !0,
        shareIconUrl: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/goods/share_icon_new%402x.png",
        shareMainClass: "screen-share-main screen-share-main-hide",
        canShowShare: !0,
        showError: !1,
        startTimeDesc: "",
        endTimeDesc: "",
        pickNum: "",
        isIpx: O.SystemInfo.getIpxJudgment(),
        clickEnable: !0
    },
    toIndexPage: function(e) {
        this.$switchTab("index");
        var t = this.getClickTrackingParams("bottom_bar", "return_index");
        t.has_local_group = this.data.goodsInfo.hasLocalGroup ? "1" : "0", (0, O.TrackingRecord)(t), 
        this.$uploadFormId(e);
    },
    toLotteryPage: function(e) {
        this.$forward("subject", {
            subject_id: "2742"
        });
        var t = this.getClickTrackingParams("bottom_bar", "return_lottery");
        t.has_local_group = this.data.goodsInfo.hasLocalGroup ? "1" : "0", (0, O.TrackingRecord)(t), 
        this.$uploadFormId(e);
    },
    onCustomServiceClicked: function(e) {
        if (this.mallId) {
            var t = {
                goodsId: this.data.goodsInfo.goodsId,
                goodsName: this.data.goodsInfo.goodsName,
                customerNum: this.data.goodsInfo.groupTypes[1].requireNum,
                src: this.data.goodsInfo.thumbUrl,
                groupPrice: this.data.goodsInfo.minOnsaleGroupPrice
            }, o = "/package_a/custom_service/custom_service?mall_id=" + this.mallId;
            o = o + "&" + O.UrlUtil.buildQuery(t), p.default.forward(o);
            var a = this.getClickTrackingParams("bottom_bar", "customer_service");
            a.has_local_group = this.data.goodsInfo.hasLocalGroup, (0, O.TrackingRecord)(a);
        }
        this.$uploadFormId(e, !1);
    },
    shopAround: function(e) {
        this.$uploadFormId(e);
    },
    defaultClick: function() {},
    pvTracking: function(e) {
        var t = {
            op: "pv",
            page_name: "goods_detail",
            goods_id: this.$urlQueryObj.goods_id
        };
        e && (t.is_back = 1), this.$urlQueryObj.event_type && (t.event_type = this.$urlQueryObj.event_type), 
        (0, O.TrackingRecord)(t), this.$firstTimeTrackRecord.pv = !0, this.$urlQueryObj.refer_xcx_campaign_get_redpocket && (this.referXcxCampaignGetRedpocket = 1, 
        delete this.$urlQueryObj.refer_xcx_campaign_get_redpocket);
    },
    getImprTrackingParams: function(e) {
        var t = this.data.goodsInfo;
        if (t) return {
            op: "impr",
            page_name: "goods_detail",
            page_section: e,
            goods_id: t.goodsId,
            event_type: t.eventType
        };
    },
    getClickTrackingParams: function(e, t) {
        var o = {
            op: "click",
            page_name: "goods_detail",
            page_sn: 10014,
            page_section: e,
            goods_id: this.$urlQueryObj.goods_id,
            page_element: t
        }, a = this.data.goodsInfo || {};
        return o.event_type = a.eventType, a.skus && (o.sku_num = a.skus.length), "top_banner" === o.page_element && (o.page_el_sn = 98776), 
        "ser_promise_bt" === o.page_element && (o.page_el_sn = 98775), "coupon" === o.page_element && (o.page_el_sn = 98182), 
        "comment_btn" === o.page_element && (o.page_el_sn = 98777), "more" === o.page_element && (o.page_el_sn = 99806), 
        "local_group" === o.page_section && "join_btn" === o.page_element && (o.page_el_sn = 99807), 
        "local_group_popup" === o.page_section && "join_btn" === o.page_element && (o.page_el_sn = 99805), 
        "go_mall_btn" === o.page_element && (o.page_el_sn = 98780), "mall_rec_list" === o.page_section && "goods" === o.page_element && (o.page_el_sn = 98784), 
        "rec_list" === o.page_section && "goods" === o.page_element && (o.page_el_sn = 99084), 
        "return_index" === o.page_element && (o.page_el_sn = 99810), "spike_remind" === o.page_element && (o.page_el_sn = 99925), 
        "customer_service" === o.page_element && (o.page_el_sn = 99813), "like_btn" === o.page_element && (o.page_el_sn = 99812), 
        "screen_shot_popup" === o.page_section && "invent_btn" === o.page_element && (o.page_el_sn = 99067), 
        o;
    },
    imprTracking: function() {
        if (!m.default.isFromAppOnShow && !this.$firstTimeTrackRecord.impr) {
            var e = this.data.goodsInfo;
            (0, O.TrackingRecord)({
                op: "impr",
                page_section: "main",
                page_name: "goods_detail",
                page_sn: 10014,
                goods_id: e.goodsId,
                goods_type: e.goodsType,
                event_type: e.eventType,
                goods_price: this.data.minOnsaleGroupPrice,
                has_local_group: e.hasLocalGroup ? "1" : "0"
            }), this.$firstTimeTrackRecord.impr = !0;
        }
    },
    showGroupModel: function() {
        this.setData({
            groupWindowVisible: !0
        });
        var e = this.getClickTrackingParams("local_group", "more");
        (0, O.TrackingRecord)(e);
    },
    hideGroupModule: function() {
        this.setData({
            groupWindowVisible: !1
        });
    },
    preLoadGoodsPage: function() {
        var e = this, t = getCurrentPages(), o = void 0;
        t.length > 1 && (o = t[t.length - 2]);
        var a = function(t) {
            if (t && t.goodsId == e.$urlQueryObj.goods_id) {
                var o = "--";
                t.preMarketPrice && t.preGroupPrice && (o = O.StdFormat.price(t.preMarketPrice - t.preGroupPrice, 100));
                var a = null != t.preGroupPrice ? O.StdFormat.price(t.preGroupPrice, 100) : "--.--", r = null != t.preSinglePrice ? O.StdFormat.price(t.preSinglePrice, 100) : "--.--", s = null != t.preMarketPrice ? O.StdFormat.price(t.preMarketPrice, 100) : "--.--";
                e.setData({
                    visible: !0,
                    needLoadBg: !0,
                    preloadImgUrl: t.preloadImgUrl || "",
                    preloadImg: !!t.preloadImgUrl,
                    goodsInfo: {
                        preGroupPrice: a,
                        preSinglePrice: r,
                        preMarketPrice: s,
                        goodsName: t.goodsName || "",
                        customerNum: t.customerNum || "--",
                        deltaPrice: o,
                        isShowBanner: !0,
                        bannerHeight: 375,
                        topGallery: [ {} ]
                    }
                });
            }
        };
        o && o.transGoodsData ? a(o.transGoodsData) : this.$urlQueryObj.goodsId && a(this.$urlQueryObj || {});
    },
    onPageScroll: function(e) {
        var t = this;
        e && (this.scrollTop = parseInt(e.scrollTop), b.default.showGoTopBtn(this.scrollTop, this), 
        this.updateScrollTop(this.scrollTop), this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300));
    },
    goTop: function() {
        b.default.goTop(!0);
        var e = this.getClickTrackingParams("pop_list", "top_btn");
        (0, O.TrackingRecord)(e);
    },
    imprItems: function(e) {
        var t = this, o = this.data.recommendList, a = t.data.goodsInfo;
        e.forEach(function(e) {
            if (e < o.length) {
                var t = o[e] || {}, r = {
                    op: "impr",
                    page_name: "goods_detail",
                    page_sn: 10014,
                    page_section: "rec_list",
                    page_element: "goods",
                    goods_id: a.goodsId,
                    event_type: a.eventType,
                    idx: e,
                    rec_goods_id: t.goodsId,
                    rec_event_type: t.eventType,
                    list_id: t.listId
                };
                t.transData && (t.transData.ad && (r.ad = JSON.stringify(t.transData.ad)), t.transData.p_rec && (r.p_rec = JSON.stringify(t.transData.p_rec)), 
                t.transData.p_search && (r.p_search = JSON.stringify(t.transData.p_search))), (0, 
                O.TrackingRecord)(r);
            }
        });
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset;
        if (t) {
            var o = t.goodsId;
            if (o) {
                var a = t.isMallRec, r = parseInt(t.index, 0), s = this.data.recommendList[r] || {};
                a && (s = this.data.mallRecommendList[r] || {}), this.transGoodsData = s.transData || {};
                var i = a ? "mall_rec_list" : "rec_list", n = this.getClickTrackingParams(i, "goods");
                n.idx = r, n.rec_goods_id = o, n.rec_event_type = t.eventType, n.list_id = s.listId, 
                n.xcx_list_id = "10014", s.transData && (this.transGoodsData = s.transData || {}, 
                s.transData.ad && (n.ad = JSON.stringify(s.transData.ad)), s.transData.p_rec && (n.p_rec = JSON.stringify(s.transData.p_rec)), 
                s.transData.p_search && (n.p_search = JSON.stringify(s.transData.p_search))), this.$forward("goods", {
                    goods_id: o
                }), (0, O.TrackingRecord)(n);
            }
        }
        this.$uploadFormId(e);
    },
    navigationToMallPage: function() {
        if (this.data.mallInfo.mallId) {
            var e = this.data.mallInfo.mallId;
            this.data.mallInfo && (this.transGoodsData = this.data.mallInfo, this.$forward("mall_page", {
                mall_id: e
            }));
        }
        var t = this.getClickTrackingParams("mall", "go_mall_btn");
        (0, O.TrackingRecord)(t);
    },
    navigationToGoodsComments: function(e) {
        var t = this.$urlQueryObj.goods_id;
        l.default.clearCacheData(), this.cacheBottomId = l.default.setDataToCache(t, {
            bottomBarData: this.data.bottomBarData,
            barDataNeededFromPage: d.default.getBarDataNeededFromPage()
        });
        var o = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : -1, a = this.data.goodsInfo;
        if (this.data.goodsInfo.goodsId) {
            var r = this.data.goodsInfo.goodsId;
            this.$forward("goods_comments", {
                goods_id: r,
                tap_id: o,
                group_order_id: this.$urlQueryObj.group_order_id,
                cache_bottom_id: this.cacheBottomId,
                mall_id: this.mallId,
                cat_id_1: a.catId1,
                cat_id_2: a.catId2,
                cat_id_3: a.catId3
            });
            var s = this.getClickTrackingParams("comment", "comment_btn");
            s.has_local_group = a.hasLocalGroup, (0, O.TrackingRecord)(s);
        }
        e && e.detail && e.detail.formId && C.default.uploadFormIdToSH(e.detail.formId, !0);
    },
    initPageData: function() {
        this.initialDataObj ? this.setData(this.initialDataObj) : this.initialDataObj = JSON.parse(JSON.stringify(this.data)), 
        this.recOffset = 0, this.lowerLock = !1;
    },
    topGalleryChange: function(e) {
        var t = e.detail.current;
        this.setData({
            topGalleryIndex: parseInt(t) + 1
        });
    },
    getGoodsShareInfo: function(e, t, o, a) {
        var r = this;
        (0, T.default)(y.default.mark(function s() {
            var i, n, c;
            return y.default.wrap(function(s) {
                for (;;) switch (s.prev = s.next) {
                  case 0:
                    return s.prev = 0, i = {
                        goods_id: e,
                        goods_img: t,
                        normal_price: o,
                        price: a
                    }, s.next = 4, M.default.getConfig("eventtype0_share_img1");

                  case 4:
                    if (!(n = s.sent)) {
                        s.next = 11;
                        break;
                    }
                    return r.needGetShareImg = !0, s.next = 9, O.Request.apiRequest("GET", x.default.getGoodsShareImg, i, !1, {
                        needGZToken: !0,
                        forceUseApiGZ: !0
                    });

                  case 9:
                    (c = s.sent) && c.data && c.data.image_url && (r.imageUrl = c.data.image_url);

                  case 11:
                    s.next = 16;
                    break;

                  case 13:
                    s.prev = 13, s.t0 = s.catch(0), console.error(s.t0);

                  case 16:
                  case "end":
                    return s.stop();
                }
            }, s, this, [ [ 0, 13 ] ]);
        }));
    },
    processGoodsDetail: function(e, o) {
        wx.stopPullDownRefresh();
        var a = this;
        if (e) if (e.errorCode) this.$showToast(e.errorMsg); else {
            if (!e.groupTypes || e.groupTypes.length < 2) return this.$showToast("活动已经结束了"), 
            void setTimeout(function() {
                a.$back();
            }, 1e3);
            if (0 == o.event_type) {
                var r = O.DataUtil.accMul(e.useOnSalePrice ? e.minOnsaleGroupPrice : e.minGroupPrice, 100), i = O.DataUtil.accMul(e.marketPrice || e.preMarketPrice, 100);
                this.getGoodsShareInfo(e.goodsId, e.hdThumbUrl, i, r);
            }
            1 === o.is_app && this.$showToast("该商品在拼多多app中才能购买");
            var c = this.$urlQueryObj.is_from_like || "0";
            c && "1" === c ? this.hasSkuSelector = !1 : o.sku && o.sku.length > 1 && (this.hasSkuSelector = !0);
            var l = n.default.getGoodsIconsData(e), d = s.default.getPlayRules(e);
            this.$hideLoading(), this.data.goodsInfo && (e = O.ObjectUtil.assign(this.data.goodsInfo, e)), 
            this.setData({
                minOnsaleGroupPrice: o.min_on_sale_group_price,
                goodsInfo: e,
                playRulesData: d,
                goodsIcons: l,
                visible: !0,
                showNormalSalesElement: e.isOnSale && !e.isLottery && !e.isFreeTrial && !e.isDepositeGroup && !e.isCapitalGift && !e.isCapitalGiftLottery
            });
            var u = !0;
            e.luckyId && (e.isLottery || e.isFreeTrial || e.isCapitalGiftLottery) && (u = !1), 
            e.isGroupFree && O.User.hasLogin() && (u = !1), u && a.setBottomBar(o), e.spikeLeftTime > 0 && e.spikeStart && !e.spikeOver && (this.spikeLeftTimeInterval && clearInterval(this.spikeLeftTimeInterval), 
            this.spikeLeftTimeInterval = setInterval(function() {
                a.data.goodsInfo.spikeLeftTime -= 1e3;
                var e = a.data.goodsInfo.spikeLeftTime > 0 ? O.TimeUtil.getPackagedTimeFromTimeBucket(a.data.goodsInfo.spikeLeftTime, "HMS") : null;
                a.setData(t({}, "goodsInfo.spikePackagedTime", e));
            }, 1e3));
        }
    },
    showServiceDetail: function() {
        var e = this;
        this.setData({
            serviceDetailVisible: !0
        }), setTimeout(function() {
            e.setData({
                serviceMainClass: "service-detail-show"
            });
        }, 0);
        var t = this.getClickTrackingParams("main", "ser_promise_bt");
        (0, O.TrackingRecord)(t);
    },
    hideServiceDetail: function() {
        var e = this;
        this.setData({
            serviceMainClass: "service-detail-hidden"
        }), setTimeout(function() {
            e.setData({
                serviceDetailVisible: !1
            });
        }, 200);
    },
    showCouponsDetail: function(e) {
        var t = this;
        this.setData({
            couponsDetailVisible: !0
        }), setTimeout(function() {
            t.setData({
                couponsMainClass: "coupons-detail-show"
            });
        }, 100), this.$uploadFormId(e, !1);
        var o = this.data.goodsInfo, a = {
            page_name: "goods_detail",
            page_sn: "10014",
            op: "click",
            page_section: "main",
            page_element: "coupon",
            page_el_sn: "97703",
            goods_id: o.goodsId,
            event_type: o.eventType
        }, r = {
            page_name: "goods_detail",
            page_sn: "10014",
            op: "impr",
            page_section: "coupon_popup",
            page_el_sn: "98182",
            goods_id: o.goodsId,
            event_type: o.eventType
        };
        (0, O.TrackingRecord)(a), (0, O.TrackingRecord)(r);
    },
    hideCouponsDetail: function() {
        var e = this;
        this.setData({
            couponsMainClass: "coupons-detail-hidden"
        }), setTimeout(function() {
            e.setData({
                couponsDetailVisible: !1
            });
        }, 200);
    },
    couponTostShow: function(e, t) {
        var o = this, a = {};
        a.single = !t, a.toastVisible = !0, a.mainToast = e, a.subToast = t, this.setData({
            mallCouponToastData: a
        }), setTimeout(function() {
            o.setData({
                "mallCouponToastData.toastVisible": !1
            });
        }, 1500);
    },
    getCouponTracking: function(e, t, o) {
        var a = this.getClickTrackingParams("coupon_popup", "coupon");
        a.batch_id = o, a.idx = e, a.is_success = t, (0, O.TrackingRecord)(a);
    },
    getCoupon: function(e) {
        var t = e.detail.target.dataset || {}, o = t.item, a = t.index;
        if (o.receiveBtnEnable && !this.gettingCoupon) {
            var r = this, s = {
                mall_id: o.mallId,
                batch_id: o.batchId
            }, i = o.startTime + "-" + o.endTime + "可用";
            this.gettingCoupon = !0, (0, T.default)(y.default.mark(function e() {
                var t, n;
                return y.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, t = O.Request.requestDataWithCmd(B.takeMerchantCoupon, {
                            params: s
                        }), e.next = 4, O.Request.runMainRequestForPage(t, this);

                      case 4:
                        (n = e.sent) && n.error_code ? (r.handleGetCouponError(r, n, o, a), r.getCouponTracking(a, 0, o.batchId)) : (r.couponTostShow(q.success, i), 
                        r.getCouponTracking(a, 1, o.batchId)), r.gettingCoupon = !1, e.next = 14;
                        break;

                      case 9:
                        e.prev = 9, e.t0 = e.catch(0), console.error(e.t0), e.t0 && e.t0.error_code && (r.handleGetCouponError(r, e.t0, o, a), 
                        r.getCouponTracking(a, 0, o.batchId)), r.gettingCoupon = !1;

                      case 14:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 9 ] ]);
            }));
        } else this.getCouponTracking(a, 0, o.batchId);
        this.$uploadFormId(e, !1);
    },
    handleGetCouponError: function(e, t, o, a) {
        var r = void 0;
        if (t && (r = q[t.error_code]), r) {
            var s = r.split("，");
            s.length > 1 ? e.couponTostShow(s[0], s[1]) : e.couponTostShow(r);
        } else e.couponTostShow(q.fail);
        var i = e.data.mallCoupons;
        i[a].receiveBtnEnable = !1, t && 44025 === t.error_code ? i[a].receiveBtnText = "已领取" : t && t.error_code === g.default.CouponTakenOut.code && (i[a].receiveBtnText = "已抢光"), 
        e.setData({
            mallCoupons: i
        });
    },
    checkMerchantCoupon: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (t) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return");

              case 2:
                return e.prev = 2, a = O.Request.requestDataWithCmd(B.checkMerchantCoupon, {
                    params: {
                        mall_id: t,
                        check_merchant_coupon: "no"
                    }
                }), e.next = 6, O.Request.runSecondaryRequestForPage(a, o);

              case 6:
                return r = e.sent, this.processMerchantCoupon(r), e.abrupt("return", r);

              case 11:
                e.prev = 11, e.t0 = e.catch(2), console.error(e.t0);

              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 2, 11 ] ]);
    })),
    processMerchantCoupon: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = k.default.formatMallCouponData(t);
        o.forEach(function(t) {
            t.canTakenCount > 0 ? (t.receiveBtnEnable = !0, t.receiveBtnText = "领取") : (t.receiveBtnEnable = !1, 
            t.receiveBtnText = "已领取"), t.takenOut || (e.showCouponArea = !0);
        });
        var a = o.slice(0, 3);
        if (this.setData({
            mallCoupons: o,
            displayMallCoupons: a,
            showCouponArea: !!this.showCouponArea
        }), 0 !== this.data.mallCoupons.length) {
            var r = this.data.goodsInfo, s = {
                page_name: "goods_detail",
                page_sn: "10014",
                op: "impr",
                page_section: "main",
                page_element: "coupon",
                page_el_sn: "97703",
                goods_id: r.goodsId,
                event_type: r.eventType
            };
            (0, O.TrackingRecord)(s);
        }
    },
    getMallDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i, n;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = o.data.goodsInfo, o.mallId = t, 1 !== (r = parseInt(a.eventType, 10)) && 7 !== r) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return");

              case 6:
                return s = O.Request.requestDataWithCmd(B.getMallDetail, {
                    params: {
                        check_merchant_coupon: "no"
                    },
                    restfulParam: t
                }), e.next = 9, O.Request.runSecondaryRequestForPage(s, o);

              case 9:
                return i = e.sent, n = k.default.formatData(i), e.abrupt("return", n);

              case 14:
                e.prev = 14, e.t0 = e.catch(0), console.error(e.t0);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 14 ] ]);
    })),
    getLocalGroupsDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = t.groupTypes.length, 2 != t.groupTypes[a - 1].requireNum || !t.isOnSale || (t.isSpike || t.isSuperSpike) && t.eventComing) {
                    e.next = 12;
                    break;
                }
                return r = O.Request.requestDataWithCmd(B.getLocalGroupsDetail, {
                    params: {
                        goods_id: t.goodsId
                    }
                }), e.next = 6, O.Request.runSecondaryRequestForPage(r, o);

              case 6:
                return s = e.sent, i = I.default.receiveLocalGroupData(s.local_group, s.server_time, s.total), 
                o.imprTracking(), e.abrupt("return", i);

              case 12:
                o.imprTracking();

              case 13:
                e.next = 18;
                break;

              case 15:
                e.prev = 15, e.t0 = e.catch(0), console.error(e.t0);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 15 ] ]);
    })),
    processLocalGroupInfo: function(e) {
        if (e) if (e.errorCode) this.$showToast(e.errorMsg); else {
            var t = void 0, o = this.data.goodsInfo;
            if (o && o.groupTypes && (t = parseInt(o.groupTypes[1].requireNum)), !(isNaN(t) || !o.isOnSale || e.localGroups.length <= 0)) {
                var a = parseInt(o.catId1, 10), r = parseInt(o.catId2, 10), s = parseInt(o.catId3, 10);
                1715 !== a && (2 !== a || 64 !== r || 40 !== s && 116 !== s && 117 !== s && 120 !== s) || e.localGroups.map(function(e) {
                    e.nickname = O.Util.formatUserName(e.nickname);
                }), this.setData({
                    "goodsInfo.hasLocalGroup": e.localGroups && e.localGroups.length > 0,
                    localGroups: e.localGroups || [],
                    requireNum: t,
                    serverTime: e.serverTime || 0,
                    totalNum: e.total || 0
                }), this.setupLocalGroup();
            }
        }
    },
    showDesc: function() {
        this.setData({
            isShowTitle: !1,
            isShowContent: !0
        });
    },
    onReachBottom: function() {},
    getRecommendGoodsDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i, n, c;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = t.goodsId, r = o.$urlQueryObj.hide_rec, !o.lowerLock && a && "true" != r) {
                    e.next = 5;
                    break;
                }
                return e.abrupt("return");

              case 5:
                return o.setData({
                    loadingMoreVisible: !0
                }), o.lowerLock = !0, s = {
                    showMallRecommend: t.showMallRecommend,
                    deleteAllGoods: 0 === o.recOffset
                }, null === (i = {
                    goods_id: a,
                    referrer: "goods",
                    with_mall_rec: t.showMallRecommend ? "1" : null,
                    offset: o.recOffset || 0,
                    count: o.recCount || 20,
                    list_id: o.listId
                }).with_mall_rec && delete i.with_mall_rec, n = O.Request.requestDataWithCmd(B.getRecommendGoodsDetail, {
                    params: i
                }), e.next = 13, O.Request.runSecondaryRequestForPage(n, o);

              case 13:
                c = e.sent, o.processRecommendGoods(c, s), e.next = 20;
                break;

              case 17:
                e.prev = 17, e.t0 = e.catch(0), console.error(e.t0);

              case 20:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 17 ] ]);
    })),
    processRecommendGoods: function(e, t) {
        var o = this, a = this;
        if (this.lowerLock = !1, e) if (e.errorCode) this.$showToast(e.errorMsg); else if (!this.data.showError) {
            var r = Array.isArray(e.list) ? e.list : [];
            t.deleteAllGoods && (this.recommendGoodsCache = []), r.forEach(function(e) {
                var t = S.default.formatData(e);
                t.listId = o.listId, a.recommendGoodsCache.push(t);
            });
            var s = this.recommendGoodsCache, i = [], n = [];
            t.showMallRecommend ? (i = s.slice(0, 3), n = s.slice(3)) : n = s, n = (n = O.DataUtil.objectArrayDuplicateRemove(n, "goodsId", function(e) {
                return 1 == e.isApp;
            })).slice(0, this.maxRecommendGoodsNum), 0 === this.recOffset && i.length > 0 ? this.setData({
                loadRecommendComplete: !0,
                mallRecommendList: i,
                recommendList: n
            }) : this.setData({
                loadRecommendComplete: !0,
                recommendList: n
            }), this.recOffset += this.recCount, this.tryInitImprRect(this.scrollTop);
        }
    },
    setupLocalGroup: function() {
        var e = this, t = function(t) {
            var o = [], a = null, r = e.data.localGroups || [];
            r.map(function(r) {
                null == r.deltaMillisecond && (r.deltaMillisecond = Math.max(1e3 * (parseInt(r.expireTime) - e.data.serverTime), 0)), 
                !t && r.deltaMillisecond >= 1e3 && (r.deltaMillisecond -= 1e3);
                var s = O.TimeUtil.transferToTime(r.deltaMillisecond);
                return r.leftTimeStr = "", parseInt(s.days) > 0 && (r.leftTimeStr = s.days + "天:"), 
                r.leftTimeStr = s, r.deltaMillisecond > 0 && r.deltaMillisecond <= 216e5 && (e.data.minLeftTimeLocalGroup && r.groupOrderId == e.data.minLeftTimeLocalGroup.groupOrderId && (a = r), 
                o.push(r)), r;
            });
            var s = [];
            if (1 == r.length) s = [ [ r[0] ] ]; else if (r.length > 0 && r.length < 6) s.push([ r[0], r[1] ]); else for (var i = 0; i < Math.floor(r.length / 2); i++) {
                var n = [];
                n.push(r[2 * i]), n.push(r[2 * i + 1]), s.push(n);
            }
            if (!a && o.length > 0 && (o.length > 5 ? a = o[Math.floor(Math.random() * o.length)] : (o.sort(function(e, t) {
                return e.deltaMillisecond && t.deltaMillisecond ? e.deltaMillisecond - t.deltaMillisecond : 0;
            }), a = o[0])), a && !e.data.minLeftTimeLocalGroup) {
                var c = e.data.goodsInfo;
                (0, O.TrackingRecord)({
                    op: "impr",
                    page_name: "goods_detail",
                    page_section: "expiring_group_prompt",
                    goods_id: c.goodsId,
                    event_type: c.eventType,
                    group_order_id: e.$urlQueryObj.group_order_id,
                    page_el_sn: 99503,
                    page_sn: 10014
                });
            }
            e.setData({
                localGroups: r,
                localGroupsSwiperItems: s || [],
                minLeftTimeLocalGroup: a,
                refreshCountDown: !e.data.refreshCountDown
            }), (1 == s.length && (-1 != e.data.transitionIndex || 0 != e.data.swiperCurrent) || e.current >= s.length) && (e.setData({
                transitionIndex: -1,
                swiperCurrent: 0
            }), e.current = 0);
        };
        t(!0), null != this.localGroupCountdown && clearTimeout(this.localGroupCountdown);
        !function o() {
            e.localGroupCountdown = setTimeout(function() {
                t(), o();
            }, 1e3);
        }();
    },
    localGroupClick: function(e) {
        var t = e.currentTarget.dataset, o = void 0, a = this.$urlQueryObj.goods_id;
        if (l.default.clearCacheData(), this.cacheBottomId = l.default.setDataToCache(a, {
            bottomBarData: this.data.bottomBarData,
            barDataNeededFromPage: d.default.getBarDataNeededFromPage()
        }), t && t.groupOrderId) o = t.groupOrderId; else if (t && this.data.localGroupsSwiperItems && this.data.localGroupsSwiperItems[this.current]) {
            var r = t.index;
            o = this.data.localGroupsSwiperItems[this.current][r].groupOrderId;
        }
        var s = this.data.goodsInfo;
        if (o) {
            this.hideGroupModule(), this.setData({
                selectedGroup: s.groupTypes[1],
                selectedLocalGroupOrderId: o
            }), this.sourceChannel = u.default.SourceChannel.GOODS_DETAIL_LOCAL_GROUP, this.hasSkuSelector ? this.showSkuSelector() : D.default.confirmOrder();
            var i = void 0;
            "bottom" === t.refer ? ((i = this.getClickTrackingParams("expiring_group_prompt", null)).page_el_sn = 99503, 
            i.page_sn = 10014) : i = "list" === t.refer ? this.getClickTrackingParams("local_group_popup", "join_btn") : this.getClickTrackingParams("local_group", "join_btn"), 
            i.group_order_id = o, (0, O.TrackingRecord)(i);
        }
    },
    swiperChange: function(e) {
        if (e.detail) {
            this.current = e.detail.current;
            var t = this.current > 0 ? this.current - 1 : this.data.localGroupsSwiperItems.length - 1;
            this.setData({
                transitionIndex: t
            });
        }
    },
    processMallInfo: function(e) {
        e && (e.errorCode ? this.$showToast(e.errorMsg) : this.setData({
            mallInfo: e
        }));
    },
    getFreeCouponsDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = t.goodsId, !t.isGroupFree || !O.User.hasLogin()) {
                    e.next = 11;
                    break;
                }
                return r = O.Request.requestDataWithCmd(B.getFreeCouponsDetail, {
                    restfulParam: a
                }), e.next = 6, O.Request.runSecondaryRequestForPage(r, o);

              case 6:
                return s = e.sent, i = s.free_coupon || [], e.abrupt("return", i);

              case 11:
                return e.abrupt("return", {});

              case 12:
                e.next = 17;
                break;

              case 14:
                e.prev = 14, e.t0 = e.catch(0), console.error(e.t0);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 14 ] ]);
    })),
    processFreeCouponsInfo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.errorCode && this.$showToast(e.errorMsg), !e.errorCode && e.length > 0 && this.setData({
            "goodsInfo.freeCoupon": e
        }), this.setBottomBar();
    },
    goLotteryList: function() {
        d.default.goLotteryList();
    },
    goDrawLuckyList: function(e) {
        if (d.default.goDrawLuckyList(), "overdue_popup" == e.from) {
            var t = this.getClickTrackingParams("overdue_popup", "going_draw");
            (0, O.TrackingRecord)(t);
        } else {
            var o = this.getClickTrackingParams("icon_list", "going_draw");
            (0, O.TrackingRecord)(o);
        }
        e && e.detail && e.detail.formId && this.$uploadFormId(e);
    },
    clickOverDuePopConfirm: function() {
        this.goDrawLuckyList({
            from: "overdue_popup"
        });
    },
    selectSpec: D.default.selectSpec,
    preloadSkuImgLoaded: D.default.preloadSkuImgLoaded,
    updateGoodsNumber: D.default.updateGoodsNumber,
    goodsNumberFocus: D.default.goodsNumberFocus,
    goodsNumberBlur: D.default.goodsNumberBlur,
    goodsNumberChange: D.default.goodsNumberChange,
    hideSkuSelector: D.default.hideSkuSelector,
    skuContainerDefaultClick: D.default.skuContainerDefaultClick,
    viewSkuImage: D.default.viewSkuImage,
    confirmSku: D.default.confirmSku,
    getPriceRange: f.default.getPriceRange,
    showSkuSelector: f.default.showSkuSelector,
    groupBuy: f.default.groupBuy,
    singleBuy: f.default.singleBuy,
    groupBuyOrPromptShare: f.default.groupBuyOrPromptShare,
    spikeRemind: function(e) {
        var t = this.getClickTrackingParams("bottom_bar", "spike_remind");
        t.has_local_group = this.data.goodsInfo.hasLocalGroup ? "1" : "0", (0, O.TrackingRecord)(t);
        var o = this;
        if (o.data.goodsInfo.reminded) o.$showToast("已设提醒，开抢前3分钟自动提醒，请您留意微信消息。邀请好友一起抢购，更快成团哦"); else if (!o.uploading && e && e.detail && e.detail.formId) {
            var a = 0;
            this.data.goodsInfo && this.data.goodsInfo.groupTypes && this.data.goodsInfo.groupTypes[1] && (a = this.data.goodsInfo.groupTypes[1].startTime);
            var r = (O.User.getUserLocalInfo() || {}).nickName, s = {
                scene: C.default.scene.spikeRemind,
                form_id: e.detail.formId,
                template_info: {
                    nick_name: r,
                    goods_id: this.data.goodsInfo.goodsId,
                    goods_name: this.data.goodsInfo.goodsName,
                    original_price: O.DataUtil.accMul(this.data.goodsInfo.marketPrice, 100),
                    discount_price: O.DataUtil.accMul(this.data.goodsInfo.minGroupPrice, 100),
                    start_time: O.DataUtil.accMul(a, 1e3)
                }
            };
            o.uploading = !0, C.default.upload(s, function(e) {
                o.uploading = !1, !0 === e.data || !0 === e.success ? (o.$showToast("已设提醒，开抢前3分钟自动提醒，请您留意微信消息。邀请好友一起抢购，更快成团哦"), 
                o.setReminded(o), h.Message.emit(h.KEYS.WAIT_FOR_SPIKE_SHOW, o.data.goodsInfo.goodsId)) : o.$showToast("设置失败，请稍后重试");
            }, function() {
                o.uploading = !1, o.$showToast("设置失败，请稍后重试");
            });
        }
    },
    setReminded: function(e) {
        e.data.goodsInfo.reminded = !0;
        var t = (0, o.default)(e.data.goodsInfo, e.$urlQueryObj);
        t.hasLiked = m.default.likeGoodsIds[e.$urlQueryObj.goods_id], e.goodsBottomBarData = t, 
        e.goodsBottomBar.load(t, e.data.goodsInfo, e), m.default.spikeRemindGoodsIds.push(e.data.goodsInfo.goodsId.toString());
    },
    confirmClose: function() {
        var e = this.getClickTrackingParams("overdue_popup", "close_btn");
        (0, O.TrackingRecord)(e);
    },
    setBottomBar: function(e) {
        var t = this;
        this.data.goodsInfo.reminded = -1 != m.default.spikeRemindGoodsIds.indexOf(this.$urlQueryObj.goods_id);
        var r = (0, o.default)(this.data.goodsInfo, this.$urlQueryObj);
        this.goodsBottomBarData = r;
        var s = this.data.goodsInfo;
        if (!this.goodsBottomBar) {
            this.goodsBottomBar = new a.default({
                showToast: this.$showToast,
                goodsId: this.$urlQueryObj.goods_id,
                setDataFunc: function(e) {
                    var o = t.data.bottomBarData || {}, a = 0;
                    for (var r in e) e.hasOwnProperty(r) && (o[r] = e[r]), ++a;
                    if (1 == a && e.hasOwnProperty("hasLiked")) {
                        var i = t.getClickTrackingParams("bottom_bar", "like_btn");
                        i.is_like = e.hasLiked ? 1 : 0, i.has_local_group = s.hasLocalGroup ? "1" : "0", 
                        (0, O.TrackingRecord)(i);
                    }
                    t.setData({
                        bottomBarData: o
                    });
                },
                addRootFunc: O.Util.bind(t.componentsAddRootFunc, t)
            });
            try {
                if (s.isLottery || s.isFreeTrial) {
                    var i = 1e3 * t.data.goodsInfo.luckyEndTime - Date.now() - m.default.timeDiff, n = O.TimeUtil.transferToTime(i, {
                        onlyHour: !0
                    });
                    if (i > 864e5) t.setData({
                        showFreeTips: !0
                    }); else if (i > 0) {
                        var c = 1;
                        n > 1 && (c = n), t.setData({
                            lotteryTipsHours: c,
                            showLotteryTips: !0
                        });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        if (this.goodsBottomBar && (r.hasLiked = m.default.likeGoodsIds[this.$urlQueryObj.goods_id], 
        this.goodsBottomBar.load(r, this.data.goodsInfo, this), this.setData({
            bottomBarVisible: !0
        })), r.showSkuSelector && (this.data.goodsInfo.groupTypes && this.data.goodsInfo.groupTypes[1] && this.setData({
            selectedGroup: this.data.goodsInfo.groupTypes[1]
        }), e && this.setSkus(this.data.goodsInfo, e, this), this.hasSkuSelector && !this.$urlQueryObj.isShowSku && this.showSkuSelector()), 
        "on" == r.resultOn) {
            var l = this.getImprTrackingParams("overdue_popup");
            (0, O.TrackingRecord)(l);
        }
    },
    getLotteryDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, n, c, l;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = parseInt(t.eventType, 10), r = t.goodsId, !t.luckyId || !(t.isLottery || t.isFreeTrial || t.isCapitalGiftLottery)) {
                    e.next = 11;
                    break;
                }
                return s = {
                    goodsId: r,
                    rulesKey: a === i.default.EventType.LUCKY_DRAW ? "LuckyDraw" : "FreeTrial"
                }, n = O.Request.requestDataWithCmd(B.getLotteryDetail, {
                    restfulParam: r
                }), e.next = 8, O.Request.runSecondaryRequestForPage(n, o);

              case 8:
                return c = e.sent, l = _.default.formatData(c, s), e.abrupt("return", l);

              case 11:
                e.next = 16;
                break;

              case 13:
                e.prev = 13, e.t0 = e.catch(0), console.error(e.t0);

              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 13 ] ]);
    })),
    processLotteryData: function(e) {
        if (e) {
            if (e.errorCode) return this.$showToast(e.errorMsg), void this.setBottomBar();
            var t = this.data.goodsInfo;
            e.info && (t.luckyId = e.info.luckyId || t.luckyId, t.luckyStatus = e.info.luckyStatus || t.luckyStatus, 
            t.luckyStartTime = e.info.luckyStartTime || t.luckyStartTime, t.luckyEndTime = e.info.luckyEndTime || t.luckyEndTime), 
            t.eventComing = t.luckyStartTime > t.serverTime, this.setData({
                lotteryRules: e.rules,
                goodsInfo: t
            }), this.setBottomBar();
        }
    },
    getReviewsDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !t.rv) {
                    e.next = 8;
                    break;
                }
                return a = {
                    page: 1,
                    size: 2,
                    label: 1
                }, r = O.Request.requestDataWithCmd(B.getReviewsDetail, {
                    params: a,
                    restfulParam: t.goodsId
                }), e.next = 6, O.Request.runSecondaryRequestForPage(r, o);

              case 6:
                return s = e.sent, e.abrupt("return", s);

              case 8:
                e.next = 13;
                break;

              case 10:
                e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })),
    processReviews: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (e && e.labels) {
            var t = {};
            t.number = e.number, t.tagList = e.labels;
            var o = 0, a = !1, r = this.data.goodsInfo, s = parseInt(r.catId1, 10), i = parseInt(r.catId2, 10), n = parseInt(r.catId3, 10);
            t.detailList = e.data.map(function(e) {
                return e.time = O.TimeUtil.formatTime(e.time, "yyyy.MM.dd"), e.specs = O.DataUtil.formatSpecs(e.specs), 
                1715 !== s && (2 !== s || 64 !== i || 40 !== n && 116 !== n && 117 !== n && 120 !== n) || (e.name = O.Util.formatUserName(e.name)), 
                e;
            }), t.tagList.forEach(function(e) {
                e.positive && o++;
            }), o >= 3 && (a = !0), t.isShow = a, this.setData({
                reviews: t
            });
        }
    },
    dealGoodsData: function(e) {
        var t = e[0] || {}, o = e[1] || {};
        return Object.keys(o).forEach(function(e) {
            t[e] = "service_promise" === e ? o[e].concat(t[e]) : o[e];
        }), t.spike_dynamic && t.spike_dynamic.hasOwnProperty("start_time") && t.group && t.group.forEach(function(e) {
            e.start_time = t.spike_dynamic.start_time;
        }), t.spike_dynamic && t.spike_dynamic.hasOwnProperty("is_onsale") && (t.is_onsale = t.spike_dynamic.is_onsale), 
        t;
    },
    getGoodsDetail: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i, n;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = O.Request.requestDataWithCmd(B.getGoodsInfo, {
                    params: {
                        goods_id: t
                    },
                    restfulParam: t
                }), r = O.Request.requestDataWithCmd(B.getUserInfo, {
                    params: {
                        goods_id: t
                    },
                    restfulParam: t
                }), e.next = 5, [ O.Request.runMainRequestForPage(a, o), O.Request.runMainRequestForPage(r, o) ];

              case 5:
                if (s = e.sent, i = this.dealGoodsData(s), !("1014" == m.default.sceneId && [ 1, 7 ].indexOf(i.event_type) >= 0 && i.lucky_end_time && i.lucky_end_time < i.server_time)) {
                    e.next = 10;
                    break;
                }
                return p.default.redirectForward("/pages/subject/subject?subject_id=2742"), e.abrupt("return");

              case 10:
                return n = v.default.formatData(i), this.processGoodsDetail(n, i), e.abrupt("return", [ n, i ]);

              case 15:
                e.prev = 15, e.t0 = e.catch(0), console.error(e.t0), o.showError(e.t0);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 15 ] ]);
    })),
    reLoad: function() {
        this.$showLoading(), this.setData({
            showError: !1
        });
        var e = this.$urlQueryObj.goods_id;
        this.getGoodsDetail(e, this);
    },
    loadPage: function() {
        var e = this;
        this.initPageData(), (0, T.default)(y.default.mark(function t() {
            var o, a, r, s, i;
            return y.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, o = e.$urlQueryObj.goods_id, a = void 0, r = void 0, t.next = 4, 
                    e.getGoodsDetail(o, e);

                  case 4:
                    return s = t.sent, a = s[0], r = s[1], t.next = 9, [ e.getGoodsLisbon(r, e), e.checkMerchantCoupon(a.mallId, e), e.getMallDetail(a.mallId, e), e.getLocalGroupsDetail(a, e), e.getReviewsDetail(a, e), e.getLotteryDetail(a, e), e.getFreeCouponsDetail(a, e), e.setSkus(a, r, e), e.getLotteryGuide(a, e) ];

                  case 9:
                    i = t.sent, e.processLisbonData(i[0]), e.processLocalGroupInfo(i[3]), e.processReviews(i[4]), 
                    e.processMallInfo(i[2]), e.processLotteryData(i[5]), e.processFreeCouponsInfo(i[6]), 
                    e.setData({
                        showGoodsDetails: !0
                    }), e.getRecommendGoodsDetail(a, e), t.next = 23;
                    break;

                  case 20:
                    t.prev = 20, t.t0 = t.catch(0), e.$hideLoading();

                  case 23:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 20 ] ]);
        }));
    },
    getLotteryGuide: T.default.wrap(y.default.mark(function e(t, o) {
        var a;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, t.eventType != i.default.EventType.LUCKY_DRAW) {
                    e.next = 6;
                    break;
                }
                return e.next = 4, M.default.getConfig("lottery_group_inspire");

              case 4:
                (a = e.sent) && o.setData({
                    showGroupGuide: a
                });

              case 6:
                e.next = 11;
                break;

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    setSkus: T.default.wrap(y.default.mark(function e(t, o, a) {
        var r;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                t && o && !t.skus && (r = v.default.getSkus(o.sku, o.thumb_url, o.thumb_wm), a.setData({
                    "goodsInfo.skus": r
                }));

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })),
    getGoodsLisbon: T.default.wrap(y.default.mark(function e(t, o) {
        var a, r, s, i, n;
        return y.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a = t.event_type, r = {
                    app: 0,
                    goods_id: t.goods_id,
                    goods_type: t.goods_type,
                    event_type: t.event_type,
                    mall_id: t.mall_id,
                    min_sku_price: t.min_on_sale_group_price,
                    max_sku_price: t.max_on_sale_group_price,
                    old_min_sku_price: t.old_min_on_sale_group_price,
                    has_promotion: !!t.has_promotion,
                    cat_id: t.cat_id_1,
                    cat_id_1: t.cat_id_1,
                    cat_id_2: t.cat_id_2,
                    cat_id_3: t.cat_id_3
                }, 12 !== parseInt(a) && 13 !== parseInt(a) && 16 !== parseInt(a) && 18 !== parseInt(a) && !t.has_promotion) {
                    e.next = 11;
                    break;
                }
                return s = O.Request.requestDataWithCmd(B.getGoodsLisbon, {
                    params: r
                }), e.next = 7, O.Request.runSecondaryRequestForPage(s, o);

              case 7:
                return i = e.sent, n = i.events || {}, o.setData({
                    superpositionCoupon: n.superposition_coupon || {}
                }), e.abrupt("return", i);

              case 11:
                e.next = 16;
                break;

              case 13:
                e.prev = 13, e.t0 = e.catch(0), console.error(e.t0);

              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 13 ] ]);
    })),
    processLisbonData: function(e) {
        var t = this;
        if (e && e.events.limited_free_order && e.events.limited_free_order.start_time && e.events.limited_free_order.end_time) {
            var o = e.events.limited_free_order, a = o.start_time, r = o.end_time, s = o.pick_num, i = O.TimeUtil.formatTime(a, "MM月dd日hh:mm"), n = O.TimeUtil.formatTime(r, "MM月dd日hh:mm"), c = Math.round(parseInt(O.DataUtil.accDiv(new Date().getTime(), 1e3), 10));
            this.setData({
                startTimeDesc: i,
                endTimeDesc: n,
                pickNum: s,
                showActive: c > parseInt(a, 10) && c < parseInt(r, 10)
            });
        }
        if (e && e.events.promotion_event_list) {
            var l = e.events.promotion_event_list.event_list[0], d = l.promotion_event_type;
            if (d == u.default.PromotionEventType.LIMIT_TIME_DISCOUNT || d == u.default.PromotionEventType.LIMIT_COUNT_DISCOUNT) {
                var p = l.end_time - e.server_time, g = l.event_items[0].discount_param;
                if (p > 0 && g > 0 && g < 100) {
                    var m = O.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * p, "HMS"), h = 0;
                    d == u.default.PromotionEventType.LIMIT_TIME_DISCOUNT ? h = p >= 86400 ? m.days + "天" + m.hours + "小时后恢复" : m.hours + ":" + m.minutes + ":" + m.seconds + "后恢复" : d == u.default.PromotionEventType.LIMIT_COUNT_DISCOUNT && (h = "再售" + l.remain_quantity + "件后恢复");
                    var f = (this.data.goodsInfo.useOnSalePrice ? this.data.goodsInfo.minOnsaleGroupPrice : this.data.goodsInfo.minGroupPrice) || this.data.goodsInfo.preGroupPrice;
                    f = O.DataUtil.accDiv(Math.floor(O.DataUtil.accMul(f, g)), 100);
                    var _ = O.DataUtil.accDiv(Math.floor(O.DataUtil.accMul(this.data.goodsInfo.minOnsaleNormalPrice, g)), 100), v = "¥  " + O.DataUtil.accDiv(Math.floor(O.DataUtil.accMul(this.data.goodsInfo.minOnsaleGroupPrice, g)), 100);
                    this.setData({
                        "bottomBarData.discountGroupPrice": v,
                        "bottomBarData.discountSinglePrice": _,
                        discountPrice: f,
                        "goodsInfo.discount": g,
                        "goodsInfo.discountLeftTime": h
                    }), this.discountLeftTimeInterval && clearInterval(this.discountLeftTimeInterval);
                    var k = this;
                    this.discountLeftTimeInterval = setInterval(function() {
                        p > 0 ? --p < 86400 && (m = O.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * p, "HMS"), 
                        d == u.default.PromotionEventType.LIMIT_TIME_DISCOUNT ? h = m.hours + ":" + m.minutes + ":" + m.seconds + "后恢复" : d == u.default.PromotionEventType.LIMIT_COUNT_DISCOUNT && (h = "再售" + l.remain_quantity + "件后恢复"), 
                        t.setData({
                            "bottomBarData.discountGroupPrice": v,
                            "bottomBarData.discountSinglePrice": _,
                            discountPrice: f,
                            "goodsInfo.discount": g,
                            "goodsInfo.discountLeftTime": h
                        })) : (clearInterval(k.discountLeftTimeInterval), t.setData({
                            "goodsInfo.discount": 0,
                            "goodsInfo.discountLeftTime": 0,
                            "bottomBarData.discountSinglePrice": 0,
                            "bottomBarData.discountGroupPrice": 0
                        }));
                    }, 1e3);
                }
            }
        }
        if (e && e.events.multi_goods_event) {
            var I = e.events.multi_goods_event.display;
            this.setData({
                "goodsInfo.multiDiscount": I
            });
        }
        if (e && e.events.promotion_price_activity) {
            var T = e.events.promotion_price_activity.promotion_activity_type;
            if (6 != T && 7 != T) return;
            var y = e.events.promotion_price_activity, D = y.end_time - e.server_time, b = O.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * D, "HMS"), w = "", C = "", S = "", G = y.copy_writing.sku_copy_writings;
            S = D < 86400 ? b.hours + ":" + b.minutes + ":" + b.seconds : b.days + "天" + b.hours + "小时", 
            w = y.copy_writing.activity_copy_writing.replace("#time#", S), C = y.copy_writing.copy_writing_without_price.replace("#time#", S), 
            this.setData({
                "goodsInfo.multiDiscount": w,
                "goodsInfo.skuDisplayTitle": C,
                "goodsInfo.skuNoFormatTitle": y.copy_writing.copy_writing_without_price,
                "goodsInfo.skuDefaultTitle": y.copy_writing.copy_writing_without_price,
                "goodsInfo.skuCopyWritings": G,
                "goodsInfo.activityTime": D
            }), this.activityLeftTimeInterval && clearInterval(this.activityLeftTimeInterval);
            var P = this;
            this.activityLeftTimeInterval = setInterval(function() {
                D > 0 ? (D--, b = O.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * D, "HMS"), S = D < 86400 ? b.hours + ":" + b.minutes + ":" + b.seconds : b.days + "天" + b.hours + "小时", 
                w = y.copy_writing.activity_copy_writing.replace("#time#", S), C = t.data.goodsInfo.skuNoFormatTitle.replace("#time#", S), 
                t.setData({
                    "goodsInfo.multiDiscount": w,
                    "goodsInfo.skuDisplayTitle": C,
                    "goodsInfo.activityTime": D
                })) : (clearInterval(P.activityLeftTimeInterval), t.loadPage());
            }, 1e3);
        }
    },
    showError: function() {
        this.$showToast("网络出错"), this.$hideLoading(), this.setData({
            showError: !0
        });
    },
    onShow: function() {
        var e = this;
        if (this.data.firstEnter) this.data.firstEnter = !1; else {
            var t = this.data.goodsInfo;
            t && t.goodsId && (0, T.default)(y.default.mark(function o() {
                return y.default.wrap(function(o) {
                    for (;;) switch (o.prev = o.next) {
                      case 0:
                        return o.prev = 0, o.next = 3, [ e.getLocalGroupsDetail(t, e), e.getFreeCouponsDetail(t, e) ];

                      case 3:
                        o.next = 8;
                        break;

                      case 5:
                        o.prev = 5, o.t0 = o.catch(0), console.error(o.t0);

                      case 8:
                      case "end":
                        return o.stop();
                    }
                }, o, this, [ [ 0, 5 ] ]);
            }));
        }
        var o = getCurrentPages(), a = o[o.length - 1].__route__;
        a += "?" + O.UrlUtil.buildQuery(this.$urlQueryObj), c.default.init(this, !0, a, 1);
        var r = this.$urlQueryObj.goods_id, s = this.data.bottomBarData;
        if (s) {
            var i = !!m.default.likeGoodsIds[r];
            i != !!s.hasLiked && this.setData({
                "bottomBarData.hasLiked": i
            });
        }
        wx.onUserCaptureScreen && wx.onUserCaptureScreen(function() {
            var t = e.getImprTrackingParams("screen_shot_popup");
            (0, O.TrackingRecord)(t), w.default.listenScreenShot(e);
        }), (this.$urlQueryObj.refer_xcx_campaign_get_redpocket || this.referXcxCampaignGetRedpocket) && (m.default.readActivityPages.get_redpocket = !0), 
        m.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    onHide: function() {
        m.default.isLastPagePayPage = !1, m.default.hasPaySucess = !1, m.default.isOrderForbidden = !1, 
        m.default.isLastPageGroupPage = !1, c.default.close(this);
    },
    onUnload: function() {
        null != this.localGroupCountdown && clearTimeout(this.localGroupCountdown), this.discountLeftTimeInterval && clearInterval(this.discountLeftTimeInterval), 
        this.spikeLeftTimeInterval && clearInterval(this.spikeLeftTimeInterval), c.default.close(this), 
        this.goodsBottomBar && this.goodsBottomBar.unload();
    },
    clickTopGallery: function(e) {
        if (!this.longPressLock) {
            var t = e.target.dataset, o = void 0;
            t && (o = t.url);
            var a = [];
            if (t.type && "clickBottomImg" === t.type ? this.data.goodsInfo.detailGallery.forEach(function(e) {
                a.push(e.url);
            }) : this.data.goodsInfo.topGallery.forEach(function(e) {
                a.push(e.url);
            }), o && this.previewImage(o, a), !t.type) {
                var r = this.getClickTrackingParams("main", "top_banner");
                (0, O.TrackingRecord)(r);
            }
        }
    },
    longTapImage: function(e) {
        var t = e.target.dataset, o = void 0;
        if (t) {
            o = t.downloadUrl, this.actionSheet.show(o), this.longPressLock = !0;
            var a = this.getImprTrackingParams("save_pic_popup");
            (0, O.TrackingRecord)(a);
        }
    },
    previewImage: function(e, t) {
        t = t || [ e ], wx.previewImage({
            current: e,
            urls: t
        });
    },
    resetTouchHandler: function() {
        this.touchStartHandler && (clearTimeout(this.touchStartHandler), this.touchStartHandler = null);
    },
    touchStart: function(e) {
        var t = this;
        this.touchStartHandler = setTimeout(function() {
            t.touchStartHandler = null, t.longTapImage(e);
        }, 350);
    },
    touchMove: function() {
        this.resetTouchHandler();
    },
    touchEnd: function() {
        this.resetTouchHandler();
    },
    componentsAddRootFunc: function(e, t) {
        var o = this;
        e && "function" == typeof t && (this[e] = "goodsLike" == e ? function(e) {
            t(e, !1), o.$uploadFormId(e);
        } : t);
    },
    closeShare: function() {
        this.setData({
            shareMainClass: "screen-share-main screen-share-main-hide",
            canShowShare: !0
        });
        var e = this.getClickTrackingParams("screen_shot_popup", "close_btn");
        (0, O.TrackingRecord)(e);
    },
    screenShare: function() {
        var e = this.getClickTrackingParams("screen_shot_popup", "invent_btn");
        (0, O.TrackingRecord)(e);
    },
    onLoad: function(e) {
        this.pvTracking(), this.$showLoading(), this.$urlQueryObj.source_channel && (this.sourceChannel = this.$urlQueryObj.source_channel), 
        this.listId = "xcx_goods_detail_rec_list_" + O.DataUtil.getRandomString(6), this.preLoadGoodsPage(), 
        this.scrollContainerHeight = O.SystemInfo.getWindowHeightSync();
        var t = O.ObjectUtil.assign(D.default.initSkuStatus, {
            scrollContainerWidth: O.SystemInfo.getWindowWidthSync(),
            hideMinLeftTimeLocalGroup: !!this.$urlQueryObj.hideMinLeftTimeLocalGroup
        });
        this.setData(t), e.scene && (e = O.ObjectUtil.assign(e, G.default.sceneMap(e.scene))), 
        this.loadPage();
        var o = this;
        this.actionSheet = new P.default({
            page: o,
            ns: "actionSheet",
            goosId: e.goods_id,
            complete: function(e) {
                o.longPressLock = !1;
                var t = [ "share_btn", "save_pic_btn", "cancel" ], a = o.getClickTrackingParams("save_pic_popup", t[e]);
                (0, O.TrackingRecord)(a);
            }
        }), this.popupModel = new L.default({
            page: o,
            ns: "popupModel",
            key: "popup_goods_detail"
        }), this.resourcePlaceControl = new R.default({
            page: o,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "floating_goods_detail"
        }), this.$decodeAlias();
    },
    stopDetailMove: function() {},
    galleryImageLoad: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                preloadImg: !1
            });
        }, 50);
    }
};

(0, O.PddPage)(U, {
    pageName: "goods",
    pageSn: 10014,
    notUseCommonPV: !0
});
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/es6-promise.min"));

var t = e(require("../../libs/co/we-index")), a = e(require("../../libs/regenerator-runtime/runtime")), o = e(require("../../common/gotop_util")), s = e(require("../../components/bubble/bubble")), r = require("../../common/index"), i = e(require("../../models/format/grid_item_goods")), n = e(require("../../components/image_map/image_map")), c = e(require("../../controller/config_controller")), l = e(require("../../components/resource_place_config/resource_place_config")), d = e(require("../../components/new_arrival_templ/new_arrival")), g = e(require("../../storage/ram_manager")), u = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, h = "pages/new_arrivals/new_arrivals", m = {
    cacheGoodsList: [],
    listId: "xcx_goods_" + r.DataUtil.getRandomString(6),
    onShareAppMessage: function() {
        if (!this.showRecommend) return this.$generateShareContent({
            title: "新品尝鲜"
        });
    },
    data: {
        list: [],
        localGroupsMap: {},
        showError: !1,
        isLoadAll: !1,
        templeName: "gridItemV2",
        count: 20,
        goTopClass: !1,
        canshowRec: !1,
        clickEnable: !0
    },
    offset: 0,
    onLoad: function() {
        var e = this;
        (0, t.default)(a.default.mark(function t() {
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, c.default.getConfig("new_to_rec");

                  case 3:
                    if (e.showRecommend = t.sent, e.showRecommend) {
                        t.next = 15;
                        break;
                    }
                    return e.pvTracking(!1, "shangxin", h, "10017"), e.newArrival = new d.default({
                        page: e,
                        ns: "newArrival"
                    }), e.$showLoading(), e.newArrival.getListId(), t.next = 11, [ e.newArrival.getLotterySubjectGoods(e), e.newArrival.getSubSubjectImg(e) ];

                  case 11:
                    e.newArrival.requestList(!0), e.resourcePlaceControl = new l.default({
                        page: e,
                        ns: "resourcePlaceConfig",
                        resourcePlaceKey: "floating_shangxin"
                    }), t.next = 19;
                    break;

                  case 15:
                    e.setData({
                        canshowRec: !0
                    }), e.pvTracking(!1, "recommended", "pages/recommended/recommended", "10272"), e.requestList(!0), 
                    e.resourcePlaceControl = new l.default({
                        page: e,
                        ns: "resourcePlaceConfig",
                        resourcePlaceKey: "floating_recommend"
                    });

                  case 19:
                    t.next = 24;
                    break;

                  case 21:
                    t.prev = 21, t.t0 = t.catch(0), console.log(t.t0);

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 21 ] ]);
        }));
    },
    onUnload: function() {
        this.showRecommend || s.default.close(this);
    },
    onShow: function() {
        var e = this;
        (0, t.default)(a.default.mark(function t() {
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    try {
                        e.showRecommend || s.default.init(e, !1, "", 1), g.default.isFromAppOnShow || e.$firstTimeTrackRecord.pv || e.showRecommend ? g.default.isFromAppOnShow || e.$firstTimeTrackRecord.pv || !e.showRecommend || e.pvTracking(!0, "recommended", "pages/recommended/recommended", "10272") : e.pvTracking(!0, "shangxin", h, "10017");
                    } catch (e) {
                        console.log(e);
                    }

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
    },
    onHide: function() {
        this.showRecommend || s.default.close(this);
    },
    reLoad: function() {
        this.showRecommend || (this.newArrival.naCacheGoodsList = [], this.setData({
            page: 1,
            noOrderText: "",
            list: [],
            showError: !1,
            isLoadAll: !1
        }), this.newArrival.getLotterySubjectGoods(this), this.newArrival.requestList(!0));
    },
    onReachBottom: function() {
        this.showRecommend ? this.requestList() : this.newArrival.requestList();
    },
    requestList: function(e) {
        var t = this, a = this.data, o = this.offset, s = a.count, c = this.listId, l = "api/barrow/query?app_name=rectab_gyl&offset=" + o + "&count=" + s + "&list_id=" + c;
        if (!a.isLoadingMore && !a.isLoadAll) {
            this.setData({
                isLoadingMore: !0
            }), e && this.$showLoading();
            var d = r.Request.requestDataWithUrl("GET", l, null, !0);
            r.Request.runMainRequestForPage(d, this).then(function(e) {
                t.$hideLoading(), t.setData({
                    isLoadingMore: !1
                });
                var a = r.DataUtil.isArray(e.data) ? e.data : [], l = t.cacheGoodsList;
                a.forEach(function(e) {
                    var t = i.default.formatData(e);
                    t.listId = c, l.push(t);
                }), t.cacheGoodsList = [].concat(l), t.cacheGoodsList = r.DataUtil.objectArrayDuplicateRemove(t.cacheGoodsList, "goodsId", function(e) {
                    return 1 == e.isApp;
                });
                var d = n.default.execMix(null, t.cacheGoodsList, [], u, "gridItemV2");
                t.mixGoodsData = n.default.listPositionAdjust(d);
                var g = e && e.data && e.data.length;
                0 == g ? t.setData({
                    isLoadAll: !0,
                    noOrderText: "没有更多的商品了..."
                }) : g > 0 && g <= s / 2 ? (t.fillGoodsList(), t.offset = o + s, t.requestList()) : (t.fillGoodsList(), 
                t.offset = o + s);
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
            var o = e.length - a, s = 20;
            o < 20 && o % 2 != 0 && !this.data.isLoadAll && (s = o - 1), t = e.slice(0, t.length + s), 
            this.setData({
                list: t
            });
            var r = t.slice(a);
            this.$requestLocalGroup(r), this.tryInitImprRect();
        }
    },
    getTrackingParams: function(e, t, a) {
        var o = {};
        return o = this.showRecommend ? {
            op: e,
            rec_goods_id: a.goodsId,
            idx: t,
            page_element: "goods",
            page_section: "rec_list",
            list_id: a.listId,
            rec_event_type: a.eventType
        } : {
            op: e,
            page_name: "shangxin",
            goods_id: a.goodsId,
            idx: t,
            page_element: "goods",
            list_id: a.listId
        }, a.transData && (a.transData.ad && (o.ad = JSON.stringify(a.transData.ad)), a.transData.p_rec && (o.p_rec = JSON.stringify(a.transData.p_rec)), 
        a.transData.p_search && (o.p_search = JSON.stringify(a.transData.p_search))), o;
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.goodsId, o = t.index;
        if (this.showRecommend) {
            var s = r.DataUtil.checkByKey(this.data.list, a, "goodsId"), i = this.getTrackingParams("click", o, s);
            i.page_el_sn = "97812", i.page_sn = "10272", (0, r.TrackingRecord)(i), this.transGoodsData = s.transData || {}, 
            this.transGoodsData.preloadImgUrl = s.imgUrl, this.$forward("goods", Object.assign({
                goods_id: a
            }, s.transData));
        } else {
            var n = r.DataUtil.checkByKey(this.newArrival.data.naList, a, "goodsId");
            Object.keys(n).length <= 0 && (n = r.DataUtil.checkByKey(this.newArrival.data.lotteryGoodsList, a, "goodsId"));
            var c = void 0, l = this.getTrackingParams("click", o, n);
            "timeLimit" === t.refer ? (l.page_section = "time_limit", c = 99409) : (l.page_section = "goods_list", 
            c = 98978), l.page_el_sn = c, l.page_sn = "10017", (0, r.TrackingRecord)(l), this.transGoodsData = n.transData || {}, 
            this.transGoodsData.preloadImgUrl = n.imgUrl, this.$forward("goods", Object.assign({
                goods_id: a,
                refer_page_el_sn: c
            }, n.transData));
        }
        this.$uploadFormId(e);
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var a = [];
            if (a = t.showRecommend ? t.data.list || [] : t.newArrival.data.naList || [], e < a.length) {
                var o = a[e] || {}, s = t.getTrackingParams("impr", e, o);
                t.showRecommend ? (s.page_el_sn = "97813", s.page_sn = "10272") : (s.page_el_sn = "98978", 
                s.page_sn = "10017"), (0, r.TrackingRecord)(s);
            }
        });
    },
    onPageScroll: function(e) {
        var t = this;
        if (e) {
            var a = parseInt(e.scrollTop);
            o.default.showGoTopBtn(a, this), this.updateScrollTop(a);
        }
        this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            }), t.$requestLocalGroup();
        }, 300);
    },
    goTop: function() {
        o.default.goTop(!0);
        var e = this.getClickTrackingParams("pop_list", "top_btn");
        (0, r.TrackingRecord)(e);
    },
    toNewArrivals: function() {
        this.$forward("new_arrivals"), (0, r.TrackingRecord)({
            op: "click",
            page_section: "main",
            page_element: "xinpin_btn",
            page_el_sn: "97817",
            page_sn: "10272"
        });
    },
    pvTracking: function(e, t, a, o) {
        var s = {
            op: "pv",
            page_name: t,
            page_url: a,
            page_sn: o
        };
        e && (s.is_back = 1), (0, r.TrackingRecord)(s), this.$firstTimeTrackRecord.pv = !0;
    }
};

(0, r.PddPage)(m, {
    pageName: "recommended",
    notUseCommonPV: !0
});
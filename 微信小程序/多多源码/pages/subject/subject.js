function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/request")), a = e(require("../../common/std_format")), r = e(require("../../components/bubble/bubble")), i = e(require("../../common/gotop_util")), s = require("../../common/index"), o = e(require("../../storage/ram_manager")), n = e(require("../../configs/api")), c = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), u = e(require("../../libs/regenerator-runtime/runtime")), d = e(require("../../components/image_map/image_map")), l = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), p = e(require("../../components/resource_place_config/resource_place_config")), m = e(require("../../components/service_notice_land_page/service_notice_land_page")), g = [ "1243", "2742" ], h = {
    desc: "拼多多",
    columnNum: "2"
}, _ = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, f = {
    tyrionQuery: 10274,
    subjectGood: 10421,
    rollMessage: 10301,
    subejctPush: 10419,
    subejctLucky: 10420
}, b = {
    scrollTopValue: 0,
    notMixGoods: [],
    winHeight: 0,
    listId: null,
    onShareAppMessage: function(e) {
        var t = {
            subject_id: this.$urlQueryObj.subject_id,
            is_push: this.$urlQueryObj.is_push
        }, a = "";
        e && ("menu" == e.from ? a = "top_forward" : "subject-share-btn" == e.target.dataset.subRefer && (a = "subject_share")), 
        this.data.isComeFromAd && (t = this.$urlQueryObj);
        var r = {
            title: this.data.desc,
            queries: t,
            referStr: a
        };
        if ("2742" == this.$urlQueryObj.subject_id) {
            var i = [ "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/share/subjectid2742_close.png", "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/share/subjectid2742_iPhone.png", "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/share/subjectid2742_paper.png" ], s = Math.floor(Math.random() * i.length);
            r.imageUrl = i[s];
        }
        return this.$generateShareContent(r);
    },
    share: function() {
        (0, s.TrackingRecord)({
            op: "click",
            page_name: "subject",
            page_sn: "10026",
            event: "share_btn_clk",
            page_element: "share_btn",
            subject_id: this.data.subjectId
        });
    },
    data: {
        pageName: "subject",
        size: 20,
        page: 1,
        scrollTop: 0,
        subjectId: "",
        banner: "",
        topCls: "",
        toTopCls: "",
        noOrderText: "",
        isLoadingMore: !1,
        list: [],
        localGroups: null,
        columnNum: "0",
        cacheScrollTop: 0,
        isFirstEnter: !0,
        goTopClass: !1,
        showError: !1,
        bannerHidden: !0,
        bannerHeight: "410rpx",
        isComeFromAd: !1,
        templeName: "gridItemV1",
        btnText: "去开团",
        showShareBtn: !1,
        randomLuckyUserData: [],
        showluckyUserSwiper: !1,
        clickEnable: !0
    },
    componentsAddRootFunc: function(e, t) {
        e && "function" == typeof t && (this[e] = t);
    },
    onLoad: function(e) {
        this.$showLoading();
        var t = this;
        e && this.setData({
            subjectId: this.$urlQueryObj.subject_id,
            withCid: !!e.cid
        }), "2742" == this.$urlQueryObj.subject_id && (this.getRandomLuckyUserData(), this.setData({
            lotterySubject: !0
        }), o.default.lotteyTest = "1"), e.goods_id && e.goods_id.length > 0 ? (this.$pageName = "commercial_middle", 
        this.pageSn = 10085, wx.setNavigationBarTitle({
            title: "拼多多"
        }), this.setData({
            adGoodsId: e.goods_id,
            isComeFromAd: !0,
            bannerHidden: !0,
            desc: h.desc,
            columnNum: h.columnNum,
            templeName: "gridItemV2",
            bannerHeight: "0px",
            isShowBanner: !0
        }), t.bannerTimeOut && clearTimeout(t.bannerTimeOut), t.bannerTimeOut = setTimeout(function() {
            t.imprBanner();
        }, 100), this.requestAdGoods(e.goods_id)) : "tyrionQuery" == this.$urlQueryObj.recommend_type ? this.loadTyrionQuery() : (this.loadSubjectGoods(!0), 
        this.winWidth = s.SystemInfo.getWindowWidthSync()), this.winHeight = s.SystemInfo.getWindowHeightSync(), 
        t.quickEntryControl = new l.default({
            page: t,
            ns: "quickEntryControl"
        }), t.resourcePlaceControl = new p.default({
            page: t,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "floating_subject"
        }), this.pvTracking(), void 0 !== e.is_show_tip && (t.serviceNoticeControl = new m.default({
            page: t,
            ns: "serviceNoticeLandPage",
            opts: e
        }));
    },
    loadTyrionQuery: function() {
        var e = this;
        (0, c.default)(u.default.mark(function t() {
            return u.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, e.requestList(!0, e);

                  case 3:
                    e.setData({
                        list: e.notMixGoods
                    }), e.setData({
                        noOrderText: "没有更多的商品了..."
                    }), t.next = 11;
                    break;

                  case 7:
                    t.prev = 7, t.t0 = t.catch(0), console.error(t.t0), e.$hideLoading();

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 7 ] ]);
        }));
    },
    loadSubjectGoods: function(e) {
        var t = this;
        (0, c.default)(u.default.mark(function a() {
            var r, i, s, o, n, c;
            return u.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (a.prev = 0, !e) {
                        a.next = 6;
                        break;
                    }
                    return a.next = 4, [ t.requestHeadIcon(t), t.requestList(!0, t) ];

                  case 4:
                    a.next = 8;
                    break;

                  case 6:
                    return a.next = 8, t.requestList(!1, t);

                  case 8:
                    for (r = t.notMixGoods, i = d.default.execMix(null, r, t.mixInfos, _, t.data.templeName), 
                    i = d.default.listPositionAdjust(i), s = 0; s < i.length; ++s) "image-map" === i[s].itemName && t.insertHotRect(i[s]);
                    0 === t.notMixGoods.length && 1 === t.data.page ? (o = t.data.templeName, n = d.default.filterMixGoods(t.mixInfos, o, _), 
                    t.setData({
                        list: n
                    })) : t.setData({
                        list: i
                    }), 0 == (c = t.currentList.length) || 0 === t.notMixGoods.length && 1 === t.data.page ? t.setData({
                        noOrderText: "没有更多的商品了..."
                    }) : (t.setData({
                        page: t.data.page + 1
                    }), c > 0 && c <= t.data.size / 2 && t.onReachBottom()), t.tryInitImprRect(), a.next = 22;
                    break;

                  case 18:
                    a.prev = 18, a.t0 = a.catch(0), console.error(a.t0), t.$hideLoading();

                  case 22:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 18 ] ]);
        }));
    },
    onUnload: function() {
        r.default.close(this);
    },
    onShow: function() {
        var e = this;
        this.data.isFirstEnter && this.setData({
            isFirstEnter: !1
        }), r.default.init(this, !1, "", 1), o.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0), 
        e.setData({
            showShareBtn: !0
        });
    },
    initRemaindTime: function() {
        this.data.list.forEach(function(e) {
            e.remaindTime = 1e3 * e.luckyEndTime - Date.parse(new Date());
        });
    },
    onHide: function() {
        r.default.close(this);
    },
    reLoad: function() {
        this.setData({
            showError: !1,
            page: 1,
            noOrderText: ""
        }), this.data.list = [], this.notMixGoods = [], this.data.isComeFromAd ? this.requestAdGoods(this.data.adGoodsId) : this.loadSubjectGoods(!0), 
        "2742" == this.$urlQueryObj.subject_id && this.getRandomLuckyUserData();
    },
    onPageScroll: function(e) {
        var t = this, a = parseInt(e.scrollTop);
        this.scrollTopValue = a, i.default.showGoTopBtn(a, this), this.updateScrollTop(a);
        var r = this;
        r.bannerTimeOut && clearTimeout(r.bannerTimeOut), r.bannerTimeOut = setTimeout(function() {
            r.imprBanner();
        }, 100), this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300), this.$requestLocalGroup();
    },
    imprBanner: function() {
        if (wx.createSelectorQuery) {
            var e = wx.createSelectorQuery();
            e.select("#goodsId-banner").boundingClientRect(), e.selectViewport().scrollOffset(), 
            e.exec(function(e) {
                if (e && e[0] && e[1]) {
                    var t = e[0].height;
                    if (e[1].scrollTop <= t / 3) {
                        var a = {
                            op: "impr",
                            page_name: "subject",
                            page_sn: "10085",
                            page_el_sn: "98963",
                            to_url: encodeURIComponent("pages/spike/spike")
                        };
                        (0, s.TrackingRecord)(a);
                    }
                }
            });
        }
    },
    forwardSpike: function() {
        (0, s.TrackingRecord)({
            op: "click",
            page_name: this.$pageName,
            page_sn: "10085",
            page_el_sn: "98963",
            to_url: encodeURIComponent("pages/spike/spike")
        }), this.$forward("spike");
    },
    onReachBottom: function() {
        this.data.isComeFromAd || this.data.noOrderText || this.loadSubjectGoods(!1);
    },
    clickBanner: function() {},
    requestHeadIcon: c.default.wrap(u.default.mark(function e(a) {
        var r, i, s, o, n, c, l;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, r = t.default.requestDataWithCmd(f.rollMessage, {
                    params: {
                        roll_message: 0
                    },
                    restfulParam: a.data.subjectId
                }), e.next = 4, t.default.runMainRequestForPage(r, a);

              case 4:
                if (!(i = e.sent).error_code) {
                    e.next = 9;
                    break;
                }
                return a.mixInfos = [], a.setData({
                    banner: "",
                    showError: !0
                }), e.abrupt("return");

              case 9:
                s = parseInt(i.banner_width_2), o = parseInt(i.banner_height_2), n = o / s, c = Math.floor(n * a.winWidth), 
                !isNaN(c) && isFinite(c) || (c = 140), "2742" === a.data.subjectId ? (a.$setTitle("1分抽大奖"), 
                i.desc = "限量一分抽豪礼，百分百有奖", a.data.templeName = "subjectItem") : (a.$setTitle(i.subject || "拼多多"), 
                a.data.templeName = i.column_num + "" == "1" ? "SingleListItemV2" : "gridItemV1"), 
                a.mixInfos = d.default.formatMixInfo(i.mix) || [], l = i.mix && i.mix.length > 0 && 0 == i.mix[0].position && 99 == i.mix[0].type, 
                a.setData({
                    banner: i.banner_2,
                    bannerHidden: !i.banner_2 || 0 == i.banner_2.length || l,
                    subject: i.subject,
                    desc: i.desc,
                    columnNum: i.column_num + "",
                    templeName: a.data.templeName,
                    bannerHeight: c + "px"
                }), e.next = 22;
                break;

              case 17:
                e.prev = 17, e.t0 = e.catch(0), a.mixInfos = [], a.setData({
                    banner: "",
                    showError: !0
                }), console.error(e.t0);

              case 22:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 17 ] ]);
    })),
    onReady: function() {
        this.setData({
            windowHeight: s.SystemInfo.getWindowHeightSync()
        }), "2742" == this.$urlQueryObj.subject_id && "lottery_share" == this.$urlQueryObj.lottery_share && this.$showToast("拼团成功即送88元现金券，快来开团赢好礼吧");
    },
    getListId: function() {
        var e = this;
        e.listId || (e.listId = "xcx_subject_goods_" + s.DataUtil.getRandomString(6));
    },
    requestList: c.default.wrap(u.default.mark(function e(a, r) {
        var i, o, n, c, d, l, p, m, g;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, i = r.data, o = i.page, n = i.size, c = i.subjectId, d = void 0, 
                l = {
                    params: {
                        page: o,
                        size: n
                    }
                }, !i.isLoadingMore) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return");

              case 9:
                if ("tyrion" != r.$urlQueryObj.recommend_type) {
                    e.next = 17;
                    break;
                }
                r.getListId(), l.params.app_name = "dacu_gyl", l.params.list_id = r.listId, 1 == r.$urlQueryObj.is_push && (l.params.is_push = 1, 
                r.$urlQueryObj.trans_info && (l.params.trans_info = r.$urlQueryObj.trans_info)), 
                d = t.default.requestDataWithCmd(f.tyrionQuery, {
                    params: l.params
                }), e.next = 22;
                break;

              case 17:
                return e.next = 19, s.User.getUserProvinceId(r);

              case 19:
                l.params.province_id = e.sent, l.params.subject_id = c, 1 == r.$urlQueryObj.is_lottery || "2742" == r.$urlQueryObj.subject_id ? d = t.default.requestDataWithCmd(f.subejctLucky, {
                    params: l.params
                }) : 1 == r.$urlQueryObj.is_push ? (r.getListId(), p = r.listId, l.params.is_push = 1, 
                l.params.list_id = p, r.$urlQueryObj.trans_info && (l.params.trans_info = r.$urlQueryObj.trans_info), 
                d = t.default.requestDataWithCmd(f.subejctPush, {
                    params: l.params
                })) : d = t.default.requestDataWithCmd(f.subjectGood, {
                    params: l.params
                });

              case 22:
                return r.setData({
                    isLoadingMore: !0
                }), a && r.$showLoading(), e.next = 26, t.default.runMainRequestForPage(d, r);

              case 26:
                if ((m = e.sent) && !m.error_code) {
                    e.next = 31;
                    break;
                }
                return r.$hideLoading(), r.setData({
                    isLoadingMore: !1,
                    showError: !0
                }), e.abrupt("return");

              case 31:
                r.formatListData(m), g = r.notMixGoods, r.notMixGoods = s.DataUtil.objectArrayDuplicateRemove(g, "goodsId", function(e) {
                    return 1 == e.isApp;
                }), r.$hideLoading(), r.currentList = m.goods_list || [], r.setData({
                    isLoadingMore: !1
                }), e.next = 44;
                break;

              case 39:
                e.prev = 39, e.t0 = e.catch(0), r.$hideLoading(), r.setData({
                    isLoadingMore: !1,
                    showError: !0
                }), console.error(e.t0);

              case 44:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 39 ] ]);
    })),
    getRandomLuckyUserData: c.default.wrap(u.default.mark(function e() {
        var a, r;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, t.default.apiRequest("GET", n.default.getRandomLuckyUser, {}, !1, {
                    needGZToken: !0,
                    forceUseApiGZ: !0
                });

              case 3:
                a = e.sent, (r = a.data).map(function(e) {
                    e.image_url || (e.image_url = "https://xcximgcdn.yangkeduo.com/idiom/profile_image/default_avatar.png");
                }), this.setData({
                    randomLuckyUserData: r,
                    showluckyUserSwiper: !0
                }), e.next = 12;
                break;

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    gotoShareOrderEvaluation: function() {
        s.Util.toWeb({
            page_name: "reward_user_comments"
        }, this), (0, s.TrackingRecord)({
            op: "click",
            page_section: "scroll_bar",
            page_element: "tips",
            page_name: "subject",
            subject_id: 2742
        });
    },
    formatListData: function(e) {
        if (e && Array.isArray(e.goods_list)) {
            var t = this, r = [], i = this.data.subjectId;
            return e.goods_list.forEach(function(i) {
                var o = {};
                o.ad = i.ad, o.goodsId = i.goods_id, o.isApp = i.is_app, o.goodsName = i.goods_name.trim(), 
                o.imgUrl = i.hd_thumb_url ? s.ImageUtil.cdnCompress(i.hd_thumb_url, i.hd_thumb_wm) : s.ImageUtil.cdnCompress(i.thumb_url, i.thumb_wm), 
                o.price = a.default.price(i.price || i.group.price, 100), o.original_price = i.price || i.group.price, 
                o.normal_price = i.normal_price, o.market_price = i.market_price, o.marketPrice = a.default.price(i.market_price, 100), 
                o.discount = a.default.price((i.market_price || i.normal_price) - (i.price || i.group.price), 100), 
                o.itemName = t.data.templeName, void 0 != i.cnt && (o.soldQuantity = a.default.sales(i.cnt)), 
                void 0 != i.sales && (o.soldQuantity = a.default.sales(i.sales)), o.timeSpanDesc = a.default.timeSpan(i.time, e.server_time) + "前", 
                o.countGroup = i.customer_num || i.group.customer_num, o.trackLogFields = i.track_log_fields || null, 
                o.p_rec = i.p_rec || null, o.p_search = i.p_search || null, o.eventType = i.event_type, 
                "0" === o.price ? o.isFreeTrial = !0 : o.isFreeTrial = !1, "2742" === t.data.subjectId && (o.luckyEndTime = 1 * i.lucky_end_time, 
                o.remaindTime = 1e3 * i.lucky_end_time - Date.parse(new Date()), t.renderCountDown(o)), 
                r.push(o);
            }), this.notMixGoods = this.notMixGoods.concat(r), (1 == this.data.columnNum && -1 === g.indexOf(i) || this.data.isComeFromAd) && this.$requestLocalGroup(r), 
            this.tryInitImprRect(), r;
        }
    },
    requestAdGoods: function(e) {
        var a = s.DataUtil.formatByPos(n.default.getAdSubject, e), r = this;
        this.$showLoading();
        var i = t.default.requestDataWithUrl("GET", a, null, !0);
        t.default.runMainRequestForPage(i, r).then(function(e) {
            var t = r.formatListData(e) || [];
            t = r.data.list.concat(t), t = s.DataUtil.objectArrayDuplicateRemove(t, "goodsId", function(e) {
                return 1 == e.isApp;
            }), r.setData({
                list: t
            }), r.$hideLoading(), r.setData({
                noOrderText: "没有更多的商品了..."
            });
        }, function() {
            r.$hideLoading(), r.setData({
                showError: !0
            });
        });
    },
    pvTracking: function(e) {
        var t = {
            op: "pv",
            page_name: "subject",
            page_sn: "10026",
            subject_id: this.$urlQueryObj.subject_id,
            page_url: "pages/subject/subject"
        };
        e && (t.is_back = 1), (0, s.TrackingRecord)(t), this.$firstTimeTrackRecord.pv = !0;
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.goodsId, r = s.DataUtil.checkByKey(this.data.list, a, "goodsId"), i = parseInt(t.index), o = this;
        this.transGoodsData = {
            goodsId: a,
            preGroupPrice: r.original_price,
            preSinglePrice: r.normal_price,
            preMarketPrice: r.market_price,
            goodsName: r.goodsName,
            customerNum: r.countGroup,
            preloadImgUrl: r.imgUrl
        };
        var n = 98978, c = {
            event: "subject_goods_clk",
            goods_id: a,
            idx: i,
            op: "click",
            page_section: "goods_list",
            subject_id: this.$urlQueryObj.subject_id,
            page_element: "goods",
            page_el_sn: n,
            page_sn: "10026",
            page_name: "subject",
            event_type: r.eventType
        };
        "commercial_middle" === o.$pageName && (n = 99413, c.page_sn = "10085", c.page_el_sn = "99413"), 
        o.listId && (c.list_id = o.listId, c.is_push = 1), r.trackLogFields && (c.ad = JSON.stringify(r.trackLogFields)), 
        r.p_rec && (c.p_rec = JSON.stringify(r.p_rec)), r.p_search && (c.p_search = JSON.stringify(r.p_search)), 
        this.$uploadFormId(e), (0, s.TrackingRecord)(c, function() {
            var e = "/pages/goods/goods?goods_id=" + a + "&subject_id=" + o.$urlQueryObj.subject_id + "&refer_page_el_sn=" + n;
            o.forward(e);
        });
    },
    mapClick: function(e) {
        d.default.mapClick(e, this);
    },
    gotoSubject: function(e) {
        var t = e.currentTarget.dataset.subjectId;
        t && s.Navigation.forward("/pages/subject/subject?subject_id=" + t);
    },
    forward: function(e) {
        e.indexOf("/pages/goods/goods") >= 0 && (e.indexOf("?") >= 0 ? e += "&" : e += "?", 
        e += s.UrlUtil.buildQuery({
            et: this.$urlQueryObj.et,
            src: this.$urlQueryObj.src,
            cid: this.$urlQueryObj.cid,
            campaign: this.$urlQueryObj.campaign,
            subject_id: this.$urlQueryObj.subject_id
        })), s.Navigation.forward(e);
    },
    renderCountDown: function(e) {
        e.remaindTime = e.remaindTime - 1e3;
        var t = s.TimeUtil.getPackagedTimeFromTimeBucket(e.remaindTime);
        if (e.remaindTime <= 0 && (e.timeOut = !0, t = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }), !(e.timeOut && e.remaindTime < 0 && e.hadDraw)) {
            var a = "";
            e.timeOut && e.remaindTime < 0 ? a = "活动结束" : t.days > 1 ? a = "仅剩" + t.days + "天" + (t.hours > 0 ? t.hours + "小时" : "") : t.days > 0 ? a = "最后" + t.days + "天" : t.hours > 0 ? a = "最后" + t.hours + "小时" : t.minutes > 0 ? a = "最后" + t.minutes + "分钟" : t.seconds > 0 && (a = "最后1分钟"), 
            e.drawText = a;
        }
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var a = t.data.list || [];
            if (e < a.length) {
                var r = a[e] || {}, i = void 0;
                "image-map" === r.itemName ? i = {
                    op: "impr",
                    page_el_sn: "98953",
                    page_sn: "10026",
                    page_name: "subject"
                } : (i = {
                    op: "impr",
                    page_section: "goods_list",
                    page_element: "goods",
                    idx: e,
                    goods_id: r.goodsId,
                    page_el_sn: "98978",
                    page_sn: "10026",
                    page_name: "subject",
                    event_type: r.eventType
                }, "commercial_middle" === t.$pageName && (i.page_sn = "10085", i.page_el_sn = "99413", 
                r.trackLogFields && (i.ad = JSON.stringify(r.trackLogFields)), r.p_rec && (i.p_rec = JSON.stringify(r.p_rec)), 
                r.p_search && (i.p_search = JSON.stringify(r.p_search))), t.listId && (i.list_id = t.listId, 
                i.is_push = 1, r.trackLogFields && (i.ad = JSON.stringify(r.trackLogFields)), r.ad && (i.ad = JSON.stringify(r.ad)), 
                r.p_rec && (i.p_rec = JSON.stringify(r.p_rec)), r.p_search && (i.p_search = JSON.stringify(r.p_search)))), 
                (0, s.TrackingRecord)(i);
            }
        });
    }
};

(0, s.PddPage)(b, {
    pageName: "subject",
    pageSn: 10026,
    notUseCommonPV: !0
});
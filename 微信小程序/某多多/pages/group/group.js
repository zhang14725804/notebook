function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var r = require("../../common/index"), a = require("../../constants/event_constant"), o = e(require("../../constants/groups")), s = e(require("../../constants/goods")), i = e(require("./group_user_data")), n = e(require("../../components/bubble/bubble")), u = e(require("../../storage/user_storage")), d = e(require("../../configs/api")), c = e(require("../../common/gotop_util")), l = e(require("../goods/cache_goods_data")), p = e(require("../../models/group_proxy")), g = e(require("../../models/format/luck_draw")), h = e(require("../../models/format/v2_goods_detail")), f = e(require("../../storage/ram_manager")), m = e(require("../../common/buy_util")), _ = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), v = e(require("../../libs/regenerator-runtime/runtime")), I = e(require("../../components/sku_selector/sku_selector_v2")), T = e(require("../../common/std_format")), y = e(require("../../components/screen_shot_share/screen_shot_share")), w = e(require("../../components/popup_modal/popup_modal")), b = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), k = e(require("../../controller/config_controller")), S = e(require("../../components/resource_place_config/resource_place_config")), x = e(require("../../components/segment/segment.js")), D = e(require("../../constants/storage_keys")), P = e(require("../../controller/formid_controller")), L = require("../../constants/category_sort"), R = e(require("../../controller/public")), G = {
    common: "common",
    lottery: "lottery",
    pink: "pink"
}, O = {
    getGroupOrderDetail: "10045",
    getBlackList: "10218",
    getSubscribeInfo: "10208",
    getLotteryInfo: "20009",
    getGoodsDetail: "10052",
    localGroup: "10347",
    luckyDraw: "20009",
    operationGroups: "10037",
    homeOperations: "10074",
    recommendation: "10170",
    lotteryList: "10420"
}, U = {
    groupOrderId: null,
    localGroupDeltaTime: 0,
    shareImageUrl: "",
    lotteryInfo: {},
    minOnsaleGroupPrice: null,
    isFirstEnter: !0,
    serverTime: 0,
    segmentControl: null,
    tabsReqRunningArr: [],
    catgoodsStorage: [],
    pageIndex: 1,
    recPageIndex: 1,
    lotPageIndex: 1,
    pageSize: 20,
    shareBtnIdx: 0,
    goodsInfo: {},
    catchTapPage: function() {
        this.setData({
            showOvershadow: !1
        });
    },
    onShareAppMessage: function(e) {
        this.userId || (this.userId = u.default.getUserId());
        var t = this.data.goodsInfo || {}, r = {
            group_order_id: this.groupOrderId,
            wt_id: this.$urlQueryObj.wt_id,
            uid: this.userId,
            _wv: 1,
            goods_price: this.minOnsaleGroupPrice,
            goods_id: t.goodsId,
            event_type: t.eventType
        }, a = {
            group_status: this.data.groupState,
            group_role: this.data.groupRole,
            sold_out: this.data.soldOutStr
        };
        this.$urlQueryObj.is_from_deposit && (r.is_from_deposit = !0);
        var o = "";
        if (e) if ("menu" == e.from) o = "top_forward"; else {
            var s = e.target.dataset.subRefer;
            "group-share-btn" == s ? o = "group_detail_share" : "screen-shot" == s && (o = "screen_shot_share");
        }
        return "scan_code" == this.$urlQueryObj.share_form && (r.share_form = this.$urlQueryObj.share_form, 
        o = "share_btn"), this.useShareImage && (r.share_form = this.useShareImage), this.setShareTitle(), 
        this.$generateShareContent({
            title: this.data.shareInfo.shareTitle,
            imageUrl: this.shareImageUrl ? this.shareImageUrl : "",
            queries: r,
            referStr: o,
            trackingParams: a,
            successCallback: function() {
                f.default.hadGroupShareArray.push(f.default.lastGroupOrderId);
            }
        });
    },
    data: {
        serviceDetailVisible: !1,
        serviceMainClass: "service-detail-hidden",
        shareInfo: {},
        shareLotteryInfoList: [],
        shareHintMaskVisible: !wx.canIUse || !wx.canIUse("button.open-type.share"),
        shareHintText: "点右上角 ...可以转发给微信群或好友",
        users: [],
        currentUser: {},
        currentUserJoinTimeStr: "",
        leftUserNum: 0,
        userListPopupVisible: !1,
        expireTime: 0,
        groupState: 0,
        successTime: 0,
        groupRole: 0,
        groupStatusTips: "",
        groupButtonText: "",
        groupsStatusClass: "group-detail-buy",
        showOvershadow: !1,
        showJoinedView: !1,
        showNormalView: !1,
        showSuccessView: !1,
        showNoStoreView: !1,
        successViceDesc: "商家正在努力发货，请耐心等待！",
        curUserAddress: "",
        successTimeStr: "",
        groupNoticePopupVisible: !1,
        showError: !1,
        canEnvokeShare: wx.canIUse && wx.canIUse("button.open-type.share"),
        lotteryRulesPopupVisible: !1,
        eventType: "0",
        isNewBuyer: !1,
        shareMainClass: "screen-share-main screen-share-main-hide",
        canShowShare: !0,
        showShareModal: !1,
        lotteryRulesDetail: null,
        isLotteryOrFreeTrial: null,
        isPreparingStatus: !0,
        joinGroupStyle: "",
        joinGroupUseNewStyle: null,
        showBtnTimerText: !1,
        isBlackList: !1,
        isFreeGroup: null,
        hideHintToast: !0,
        showNormalInfo: !1,
        isSubscribed: !0,
        showDealModal: !1,
        navDataConfig: [ {
            pageElement: "index",
            route: "index",
            class: "index",
            desc: "首页逛逛"
        }, {
            pageElement: "lottery",
            route: "subject",
            paramId: "2742",
            class: "lucky_draw_icon",
            desc: "一分抽奖"
        }, {
            pageElement: "time_spike",
            route: "spike",
            class: "spike",
            desc: "限时秒杀"
        }, {
            pageElement: "bargain",
            route: "subjects",
            paramId: "12",
            class: "hot",
            desc: "9块9特卖"
        } ],
        $tabsData: [],
        homeOperations: [],
        curTabIndex: 0,
        catgoodsList: [],
        lastSingleGoodsIndex: -1,
        groupNav: !0,
        tabStatus: [ {
            canLoadMore: !0,
            recCanLoadMore: !0,
            lotCanLoadMore: !0,
            showNoMoreText: !1,
            showError: !1
        } ],
        showImgSign: !0,
        imgSignUrl: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/open_envelope/open_env_goods_icon.png",
        showPaySuccessStyle: !1,
        showSaveImgSuccess: !1,
        showSaveImgModal: !1,
        clickEnable: !0,
        isWEntrance: !1
    },
    clickGroupNotice: function(e) {
        this.setData({
            groupNoticePopupVisible: !0
        }), this.$uploadFormId(e);
    },
    hideGroupNoticePopup: function() {
        this.setData({
            groupNoticePopupVisible: !1
        });
    },
    showShareHintMaskButton: function(e) {
        if (e && e.detail && e.detail.formId) {
            var t = {
                form_id: e.detail.formId
            };
            this.data.eventType == o.default.EventType.LUCKY_DRAW ? t.market = !1 : t.market = !0, 
            this.$uploadFormId(e, t.market);
        }
        var a = this.getTrackingParams("click", "main", "invite_btn");
        a = this.countShareBtn(a), (0, r.TrackingRecord)(a);
    },
    showShareHintMask: function(e) {
        this.$showToast(this.data.shareHintText), this.$uploadFormId(e);
        var t = this.getTrackingParams("click", "invite_popup", "invent_btn");
        t = this.countShareBtn(t), (0, r.TrackingRecord)(t);
    },
    countShareBtn: function(e) {
        if (e.idx = this.shareBtnIdx, ++this.shareBtnIdx >= 3) {
            var t = this;
            this.data.groupCodePic ? t.proceessSaveImg() : (0, _.default)(v.default.mark(function e() {
                var a, o;
                return v.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, t.userId || (t.userId = u.default.getUserId()), t.shareId || (t.shareId = r.DataUtil.getRandomString()), 
                        a = d.default.getGroupShareCodePic, e.next = 6, r.Request.apiRequest("POST", a, {
                            group_order_id: t.groupOrderId,
                            share_uid: t.userId,
                            share_id: t.shareId
                        }, !1, {
                            needGZToken: !0,
                            forceUseApiGZ: !0
                        });

                      case 6:
                        o = e.sent, t.proceessSaveImg(o), e.next = 14;
                        break;

                      case 10:
                        e.prev = 10, e.t0 = e.catch(0), t.proceessSaveImg(e.t0), console.error(e.t0);

                      case 14:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 10 ] ]);
            }));
        }
        return e;
    },
    proceessSaveImg: function(e) {
        this.setData({
            showSaveImgModal: !0,
            groupCodePic: e && e.data && e.data.comments_share_code_url ? e.data.comments_share_code_url : this.data.groupCodePic ? this.data.groupCodePic : ""
        });
        var t = this.getTrackingParams("impr", "save_popup", null);
        (0, r.TrackingRecord)(t);
    },
    saveShareImg: function(e) {
        var t = this;
        t.setData({
            showSaveImgModal: !1
        }), (0, _.default)(v.default.mark(function e() {
            var a, o, s, i, n;
            return v.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, r.User.authorize("scope.writePhotosAlbum", function() {
                        var e = {
                            page_el_sn: "99615",
                            refer_page_element: "save_btn"
                        }, a = t.getTrackingParams("impr", "auth_prompt", null, e);
                        (0, r.TrackingRecord)(a);
                    });

                  case 3:
                    (a = e.sent) ? (t.getSaveSharePic(), o = {
                        page_el_sn: "99899"
                    }, s = t.getTrackingParams("click", "auth_prompt", "approve", o), (0, r.TrackingRecord)(s)) : (r.User.showAuthorizeModelDialog("scope.writePhotosAlbum", function() {
                        t.getSaveSharePic();
                    }), i = {
                        page_el_sn: "99898"
                    }, n = t.getTrackingParams("click", "auth_prompt", "refuse", i), (0, r.TrackingRecord)(n)), 
                    e.next = 10;
                    break;

                  case 7:
                    e.prev = 7, e.t0 = e.catch(0), console.error(e.t0);

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 7 ] ]);
        }));
        var a = this.getTrackingParams("click", "save_popup", "save_btn");
        (0, r.TrackingRecord)(a), this.$uploadFormId(e, !1);
    },
    getSaveSharePic: function() {
        var e = this;
        e.$showLoading(), e.$showToast("生成拼团图片中"), (0, _.default)(v.default.mark(function t() {
            var a, o, s, i;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, e.userId || (e.userId = u.default.getUserId()), e.shareId || (e.shareId = r.DataUtil.getRandomString()), 
                    a = e.data.goodsInfo, o = a.groupTypes && a.groupTypes[1] ? a.groupTypes[1] : {}, 
                    s = {
                        group_order_id: e.groupOrderId,
                        share_uid: e.userId,
                        share_id: e.shareId,
                        customer_num: o.requireNum,
                        order_list: e.data.users,
                        thumb_url: a.hdThumbUrl,
                        goods_name: a.goodsName,
                        price: e.data.groupPice
                    }, t.next = 8, r.Request.apiRequest("POST", d.default.getGroupShareImg, s, !1, {
                        needGZToken: !0,
                        forceUseApiGZ: !0
                    });

                  case 8:
                    i = t.sent, e.processSaveShareImg(i), t.next = 17;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(0), e.$showToast("生成图片失败"), e.$hideLoading(), console.error(t.t0);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 12 ] ]);
        }));
    },
    processSaveShareImg: function(e) {
        if (e && e.data && e.data.comments_share_url) {
            this.commentsShareUrl = e.data.comments_share_url;
            var t = this;
            (0, _.default)(v.default.mark(function a() {
                var o, s;
                return v.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, r.Util.downloadFile(e.data.comments_share_url);

                      case 2:
                        return o = a.sent, a.next = 5, r.User.saveImageToPhotosAlbum(o);

                      case 5:
                        t.setData({
                            showSaveImgSuccess: !0
                        }), t.$hideLoading(), s = t.getTrackingParams("impr", "success_prompt", null), (0, 
                        r.TrackingRecord)(s);

                      case 9:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
        } else this.$hideLoading(), this.$showToast("生成图片失败");
    },
    closeSaveImgModal: function() {
        this.setData({
            showSaveImgModal: !1
        });
    },
    closeSaveImgSucModal: function() {
        this.setData({
            showSaveImgSuccess: !1
        });
    },
    showServiceDetail: function(e) {
        var t = this;
        this.setData({
            serviceDetailVisible: !0
        }), setTimeout(function() {
            t.setData({
                serviceMainClass: "service-detail-show"
            });
        }, 100), this.$uploadFormId(e);
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
    showUserListPop: function() {
        this.setData({
            userListPopVisible: !0
        });
    },
    hideUserListPop: function() {
        this.setData({
            userListPopVisible: !1
        });
    },
    clickUser: function() {
        this.showUserListPopup();
    },
    getLotteryShareInfoList: function() {
        var e = this;
        (0, _.default)(v.default.mark(function t() {
            var r;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, R.default.getOMSConfig("lottery_group_share");

                  case 3:
                    r = t.sent, e.lotteryShareInfoList = r, t.next = 10;
                    break;

                  case 7:
                    t.prev = 7, t.t0 = t.catch(0), console.log(t.t0);

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 7 ] ]);
        }));
    },
    getGoodsDetail: _.default.wrap(v.default.mark(function e(t, a) {
        var o, s, i;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, o = r.Request.requestDataWithCmd(O.getGoodsDetail, {
                    restfulParam: t
                }), e.next = 4, r.Request.runSecondaryRequestForPage(o, a);

              case 4:
                return s = e.sent, i = h.default.formatData(s), a.minOnsaleGroupPrice = s.max_on_sale_group_price, 
                e.abrupt("return", [ i, s ]);

              case 10:
                e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })),
    reLoad: function() {
        this.setData({
            showError: !1
        }), this.loadPage();
    },
    loadPage: function() {
        var e = this, t = this.groupOrderId;
        this.$showLoading(), this.initPageData(), (0, _.default)(v.default.mark(function a() {
            var o;
            return v.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.prev = 0, a.next = 3, [ e.getGroupOrderDetail(t, e), e.getBlackList(t, e), e.getSubscribeInfo(e), e.decodeAlias() ];

                  case 3:
                    if (o = a.sent, e.groupInfo = o[0], e.groupInfo) {
                        a.next = 7;
                        break;
                    }
                    return a.abrupt("return");

                  case 7:
                    e.$urlQueryObj.from_custom_service_mall_id && setTimeout(function() {
                        e.$forward("custom_service", {
                            mall_id: e.$urlQueryObj.from_custom_service_mall_id
                        });
                    }, 2e3), e.anomalousResourcePlace || (e.anomalousResourcePlace = new S.default({
                        page: e,
                        ns: "anomalousGroupData",
                        resourcePlaceKey: "anomalous_group",
                        top: 0
                    })), wx.onUserCaptureScreen && wx.onUserCaptureScreen(function() {
                        var a = {
                            op: "impr",
                            event: "screen_shot_popup_impr",
                            page_name: "group_detail",
                            page_sn: "10024",
                            page_section: "screen_shot_popup",
                            group_order_id: t
                        };
                        (0, r.TrackingRecord)(a), y.default.listenScreenShot(e);
                    }), a.next = 15;
                    break;

                  case 12:
                    a.prev = 12, a.t0 = a.catch(0), console.error(a.t0);

                  case 15:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 12 ] ]);
        }));
    },
    decodeAlias: function() {
        var e = this;
        e.$decodeAlias().then(function() {
            e.hasGotDecodeAlias = !0, e.imprTracking();
        }).catch(function(t) {
            console.error(t), e.hasGotDecodeAlias = !0, e.imprTracking();
        });
    },
    getIndexReqGoodsList: _.default.wrap(v.default.mark(function e(t, a, o, s) {
        var i, n, u, d;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!s.isReqRunning(t, a)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", null);

              case 2:
                return s.addReqFlag(t, a), e.prev = 3, i = r.Request.requestDataWithCmd(O.recommendation, {
                    params: o
                }), e.next = 7, r.Request.runMainRequestForPage(i, s);

              case 7:
                return n = e.sent, u = n.goods_list || n.list || [], d = n.goods_list || n.list || [], 
                d = s.filterIndexReqGoods(d) || [], s.processGoodsList({
                    rootOptId: t,
                    pageIndex: a,
                    curRawPageSize: u.length,
                    goodsList: d
                }), e.abrupt("return", d);

              case 15:
                e.prev = 15, e.t0 = e.catch(3), console.error(e.t0), s.requestTagGoodsError({
                    resIndex: 0,
                    rootOptId: t,
                    pageIndex: a
                });

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 15 ] ]);
    })),
    setSkus: _.default.wrap(v.default.mark(function e(t, r, a) {
        var o;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                t.skus || (o = h.default.getSkus(r.sku, r.thumb_url, r.thumb_wm), a.setData({
                    "goodsInfo.skus": o
                }));

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })),
    preSetView: function(e) {
        var t = e.goodsInfo, r = {
            isPreparingStatus: !1
        };
        1 === t.eventType || 7 === t.eventType ? (r.joinGroupStyle = G.lottery, r.showBtnTimerText = !0, 
        r.isLotteryOrFreeTrial = !0) : t.eventType == o.default.EventType.FREE_GROUP ? (r.joinGroupStyle = G.lottery, 
        r.showBtnTimerText = !0, r.isFreeGroup = !0) : (r.showBtnTimerText = !0, r.joinGroupStyle = G.pink), 
        this.setData(r);
    },
    getBlackList: _.default.wrap(v.default.mark(function e(t, a) {
        var o, s;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return o = r.Request.requestDataWithCmd(O.getBlackList, {
                    params: {
                        group_order_id: t
                    }
                }), e.next = 3, r.Request.runMainRequestForPage(o, a);

              case 3:
                (s = e.sent).egrp <= 3 && a.setData({
                    isBlackList: !0
                });

              case 5:
              case "end":
                return e.stop();
            }
        }, e, this);
    })),
    getLotteryInfo: _.default.wrap(v.default.mark(function e(t, a) {
        var s, i, n, u, d;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (1 !== t.eventType && 7 !== t.eventType) {
                    e.next = 11;
                    break;
                }
                return s = {
                    goodsId: t.goodsId,
                    rulesKey: t.eventType === o.default.EventType.LUCKY_DRAW ? "LuckyDraw" : "FreeTrial"
                }, i = r.Request.requestDataWithCmd(O.getLotteryInfo, {
                    restfulParam: t.goodsId
                }), e.next = 5, r.Request.runMainRequestForPage(i, a);

              case 5:
                n = e.sent, u = !1, n.server_time >= n.end_time && (u = !0), d = g.default.formatData(n, s), 
                a.lotteryInfo = d.info, a.setData({
                    lotteryRulesDetail: d.rules,
                    drawIsOver: u
                });

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })),
    processGroupView: function() {
        this.data.showJoinedView && this.joinedViewDataProcess(), this.data.showNormalView ? this.normalViewDataProcess() : this.imprTracking(), 
        this.data.showSuccessView && this.successViewDataProcess(), this.data.showNoStoreView && this.noStoreViewDataProcess(), 
        this.data.lotteryRuleTitle && this.loadLotteryRule();
    },
    closeShare: function() {
        this.setData({
            shareMainClass: "screen-share-main screen-share-main-hide",
            canShowShare: !0
        });
        var e = {
            op: "click",
            event: "close_btn_clk",
            page_name: "group_detail",
            page_sn: "10024",
            page_section: "screen_shot_popup",
            page_element: "close_btn",
            group_order_id: this.groupOrderId
        };
        (0, r.TrackingRecord)(e);
    },
    onShow: function() {
        var e = this, t = this.groupOrderId, a = this.data.goodsInfo;
        this.isFirstEnter || (0, _.default)(v.default.mark(function s() {
            return v.default.wrap(function(s) {
                for (;;) switch (s.prev = s.next) {
                  case 0:
                    return s.prev = 0, s.next = 3, e.getGroupOrderDetail(t, e);

                  case 3:
                    if (e.groupInfo = s.sent, e.groupInfo) {
                        s.next = 6;
                        break;
                    }
                    return s.abrupt("return");

                  case 6:
                    a.eventType == o.default.EventType.FREE_GROUP && e.setData({
                        isFreeGroup: !0,
                        isPreparingStatus: !1,
                        joinGroupStyle: G.lottery,
                        isLotteryOrFreeTrial: !0,
                        groupTopImage: r.ImageUtil.cdnCompress(a.hdThumbUrl),
                        groupPice: a.maxOnsaleGroupPrice
                    }), s.next = 12;
                    break;

                  case 9:
                    s.prev = 9, s.t0 = s.catch(0), console.error(s.t0);

                  case 12:
                  case "end":
                    return s.stop();
                }
            }, s, this, [ [ 0, 9 ] ]);
        }));
        var s = getCurrentPages(), i = s[s.length - 1].__route__;
        i += "?" + r.UrlUtil.buildQuery(this.$urlQueryObj), n.default.init(this, !0, i, 1), 
        f.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    getGroupOrderDetail: _.default.wrap(v.default.mark(function e(t, a) {
        var o, s, i;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, o = r.Request.requestDataWithCmd(O.getGroupOrderDetail, {
                    params: {
                        need_white: !0
                    },
                    restfulParam: t
                }), e.next = 4, r.Request.runMainRequestForPage(o, a);

              case 4:
                return s = e.sent, a.catId1 = parseInt(s.goods_info.cat_id_1, 10), a.catId2 = parseInt(s.goods_info.cat_id_2, 10), 
                a.catId3 = parseInt(s.goods_info.cat_id_3, 10), i = p.default.receiveGroupOrderData(s), 
                a.processGroupOrderInfo(i), e.abrupt("return", s);

              case 13:
                e.prev = 13, e.t0 = e.catch(0), a.$hideLoading(), a.setData({
                    showError: !0
                });

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 13 ] ]);
    })),
    getSubscribeInfo: _.default.wrap(v.default.mark(function e(t) {
        var a, o;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = r.Request.requestDataWithCmd(O.getSubscribeInfo, {
                    opts: {
                        forceUseApiV2: !0
                    }
                }), e.next = 4, r.Request.runSecondaryRequestForPage(a, t);

              case 4:
                return o = e.sent, t.setData({
                    isSubscribed: !!o && o.is_subscribed
                }), e.abrupt("return", o);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    getScaleShareImage: _.default.wrap(v.default.mark(function e(t, a) {
        var o, s, i, n, u, d, c, l, p;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, k.default.getConfig("lottery_group_sharecard");

              case 3:
                o = e.sent, s = t.goodsInfo, i = [];
                for (n in t.users) i.push({
                    avatar: t.users[n].avatar
                });
                if (u = {
                    goods_price: s.originPrice,
                    market_price: t.marketPrice,
                    group_left: t.leftUserNum,
                    group_list: i,
                    goods_pic: s.thumbUrl,
                    group_num: t.customerNum,
                    group_id: t.groupId,
                    group_order_id: t.groupOrderId
                }, !o) {
                    e.next = 16;
                    break;
                }
                return u.event_type = s.eventType, e.next = 12, r.Request.apiRequest("POST", "backend/group/share", u, !1, {
                    forceUseApiGZ: !0,
                    needGZToken: !0
                });

              case 12:
                (d = e.sent) && d.data && (a.shareImageUrl = d.data, a.useShareImage = "key_card_1"), 
                e.next = 24;
                break;

              case 16:
                return u.template_id = "lottery_draw_B", u.goods_id = s.goodsId, c = "https://wxapp.yangkeduo.com/access/Image/GetCustomImage", 
                l = r.Request.requestDataWithUrl("POST", c, u, !0), e.next = 22, r.Request.runSecondaryRequestForPage(l, a);

              case 22:
                (p = e.sent).result && p.result.custom_pic_url && p.result.custom_pic_url.length > 0 && (a.shareImageUrl = p.result.custom_pic_url, 
                a.useShareImage = "key_card_2");

              case 24:
                return e.abrupt("return");

              case 27:
                e.prev = 27, e.t0 = e.catch(0), console.error(e.t0);

              case 30:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 27 ] ]);
    })),
    onPageScroll: function(e) {
        var t = this;
        e && (this.scrollTop = parseInt(e.scrollTop), c.default.showGoTopBtn(this.scrollTop, this), 
        this.updateScrollTop(this.scrollTop)), this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300);
    },
    closeNewUserAlert: function() {
        this.setData({
            newUserAlertVisible: !1
        });
    },
    clickGroupBtn: function(e) {
        if (this.sourceChannel = s.default.SourceChannel.GROUP_DETAIL_BUY, this.data.groupState === o.default.GroupStatus.OnGoing ? this.joinGroup() : this.createGroup(), 
        e && e.detail && e.detail.formId) {
            var t = {
                form_id: e.detail.formId
            };
            this.data.goodsInfo.eventType === o.default.EventType.LUCKY_DRAW ? t.market = !1 : t.market = !0, 
            this.$uploadFormId(e, t.market);
        }
    },
    joinLocalGroup: function(e) {
        var t = void 0;
        e && e.detail && e.detail.target && e.detail.target.dataset && e.detail.target.dataset.groupOrderId && (t = e.detail.target.dataset.groupOrderId) && this.justProcessJoinGroup(t);
        var a = {
            click_group_order_id: t
        }, o = this.getTrackingParams("click", "local_group", "join_btn", a);
        (0, r.TrackingRecord)(o), this.$uploadFormId(e, !1);
    },
    justProcessJoinGroup: function(e) {
        var t = this.data || {}, r = this.data.goodsInfo;
        if (e = e || t.groupOrderId, t.isNewUserGroup && !t.isNewBuyer) return this.setData({
            newUserAlertVisible: !0
        }), void (f.default.newUserAlertVisible = !0);
        if ("1" !== t.goExclusiveGroup) {
            var a = void 0, o = void 0;
            if (r && r.isOnSale) if (!this.$urlQueryObj.is_from_deposit || this.$urlQueryObj.mobile) if (r.isOnSale && r.skus && r.skus.length > 1 && !this.$urlQueryObj.sku_id) this.data.selectedLocalGroupOrderId = e, 
            this.openNewGroup = !1, this.showSkuSelector(); else {
                var i = this.data.goodsInfo, n = i && i.groupTypes && i.groupTypes[1] ? i.groupTypes[1] : {};
                a = "order_checkout", o = {
                    sku_id: this.$urlQueryObj.sku_id || t.skuId,
                    goods_id: this.$urlQueryObj.goods_id || r.goodsId,
                    group_id: this.$urlQueryObj.group_id || t.groupId,
                    group_order_id: e,
                    showwxpaytitle: "1",
                    group_num: n.requireNum,
                    source_channel: s.default.SourceChannel.GROUP_DETAIL_BUY,
                    mobile: this.$urlQueryObj.mobile
                }, this.$urlQueryObj.is_from_deposit && (o.is_from_deposit = !0), "scan_code" == this.$urlQueryObj.share_form && (o.share_form = this.$urlQueryObj.share_form), 
                this.$forward(a, o);
            } else this.setData({
                showTelPopup: !0,
                clickGroupOrderId: e,
                telFocus: !0
            }); else this.$showToast("商品已售罄");
        } else this.$showToast("该商品是APP专享团商品，请在APP中购买和参团。");
    },
    getPriceRange: m.default.getPriceRange,
    showSkuSelector: m.default.showSkuSelector,
    selectSpec: I.default.selectSpec,
    preloadSkuImgLoaded: I.default.preloadSkuImgLoaded,
    updateGoodsNumber: I.default.updateGoodsNumber,
    goodsNumberFocus: I.default.goodsNumberFocus,
    goodsNumberBlur: I.default.goodsNumberBlur,
    goodsNumberChange: I.default.goodsNumberChange,
    hideSkuSelector: I.default.hideSkuSelector,
    skuContainerDefaultClick: I.default.skuContainerDefaultClick,
    viewSkuImage: I.default.viewSkuImage,
    confirmSku: I.default.confirmSku,
    joinGroup: function() {
        this.justProcessJoinGroup();
        var e = this.getTrackingParams("click", "main", "join_btn");
        (0, r.TrackingRecord)(e);
    },
    createGroup: function() {
        var e = this, t = this.data || {}, a = t.goodsInfo || {};
        if (!a.isOnSale || "1" === t.soldOutStr) return this.$showToast("商品已售罄"), void setTimeout(function() {
            e.goLotteryPage();
        }, 2e3);
        if (!this.$urlQueryObj.is_from_deposit || this.$urlQueryObj.mobile) {
            e.openNewGroup = !0;
            var o = void 0, i = void 0;
            if (a.isOnSale && a.skus && a.skus.length > 1 && !this.$urlQueryObj.sku_id) this.showSkuSelector(); else {
                o = "order_checkout";
                var n = this.data.goodsInfo, u = n.groupTypes && n.groupTypes[1] ? n.groupTypes[1] : {};
                i = {
                    sku_id: this.$urlQueryObj.sku_id || t.skuId,
                    goods_id: this.$urlQueryObj.goods_id || a.goodsId,
                    group_id: this.$urlQueryObj.group_id || t.groupId,
                    showwxpaytitle: "1",
                    group_num: u.requireNum,
                    source_channel: s.default.SourceChannel.GROUP_DETAIL_BUY,
                    mobile: this.$urlQueryObj.mobile
                }, this.$urlQueryObj.is_from_deposit && (i.is_from_deposit = !0);
            }
            o && i && this.$forward(o, i);
            var d = this.getTrackingParams("click", "main", "open_btn");
            (0, r.TrackingRecord)(d);
        } else this.setData({
            showTelPopup: !0,
            clickGroupOrderId: "",
            telFocus: !0
        });
    },
    submitTel: function(e) {
        var t = this, r = e.detail.value && e.detail.value.telValue;
        if (r = r.replace(/\s+/g, ""), this.setData({
            showTelPopup: !1
        }), r || this.$showToast("请填写要充值的号码", {
            hideToastFunc: function() {
                t.setData({
                    showTelPopup: !0,
                    inpuTelValue: "",
                    telFocus: !0
                });
            }
        }), r) if (/^1[34578]\d{9}$/.test(r)) {
            var a = this.data.goodsInfo;
            this.requestChargeRouter(r, a.price, this);
        } else this.$showToast("请输入正确的充值号码", {
            hideToastFunc: function() {
                t.setData({
                    showTelPopup: !0,
                    inpuTelValue: "",
                    telFocus: !0
                });
            }
        });
        var o = e.detail.formId;
        o && P.default.uploadFormIdToSH(o, !0);
    },
    requestChargeRouter: _.default.wrap(v.default.mark(function e(t, a, o) {
        var i, n, u, d, c, l, p, g;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return o.$showLoading(), e.prev = 1, i = {
                    charge_type: 0,
                    mobile: t
                }, n = r.Request.requestDataWithCmd("10427", {
                    params: i
                }), e.next = 6, r.Request.runMainRequestForPage(n, o);

              case 6:
                if (u = e.sent, o.setData({
                    showTelPopup: !1,
                    inpuTelValue: ""
                }), o.$hideLoading(), !u.error_code) {
                    e.next = 12;
                    break;
                }
                return u.error_msg && o.$showToast(u.error_msg), e.abrupt("return");

              case 12:
                u.routers.length > 0 && (d = 9999, c = {}, u.routers.forEach(function(e) {
                    Math.abs(T.default.price(e.par_price, 100) - a) <= d && (d = Math.abs(T.default.price(e.par_price, 100) - a), 
                    c = e);
                }), l = o.data.goodsInfo, p = l.groupTypes && l.groupTypes[1] ? l.groupTypes[1] : {}, 
                g = {
                    sku_id: c.sku.sku_id,
                    goods_id: c.goods_id || l.goodsId,
                    group_id: c.groups[1].id || o.data.groupId,
                    showwxpaytitle: "1",
                    group_num: p.requireNum,
                    source_channel: s.default.SourceChannel.GROUP_DETAIL_BUY,
                    mobile: t
                }, o.$urlQueryObj.is_from_deposit && (g.is_from_deposit = !0), o.data.clickGroupOrderId ? g.group_order_id = o.data.clickGroupOrderId : o.openNewGroup = !0, 
                o.$forward("order_checkout", g)), e.next = 19;
                break;

              case 15:
                e.prev = 15, e.t0 = e.catch(1), o.$hideLoading(), console.error(e.t0);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 1, 15 ] ]);
    })),
    closeTelModal: function() {
        this.setData({
            showTelPopup: !1,
            inpuTelValue: ""
        });
    },
    loadRecommendGoodsList: function(e) {
        var t = this, r = t.data.curTabIndex || 0;
        (0, _.default)(v.default.mark(function a() {
            var o, s, i;
            return v.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (a.prev = 0, t.data.isWEntrance || 0 !== r) {
                        a.next = 9;
                        break;
                    }
                    return a.next = 4, [ t.getHomeOperationsDetail(t) ];

                  case 4:
                    o = a.sent, t.renderFirstScreenData(o[0]), t.loadLotteryList(-2, t.lotPageIndex), 
                    a.next = 21;
                    break;

                  case 9:
                    if (!(t.data.isWEntrance && 0 === r || !t.data.isWEntrance && 1 === r)) {
                        a.next = 19;
                        break;
                    }
                    if (!t.data.isWEntrance || 0 !== r) {
                        a.next = 15;
                        break;
                    }
                    return a.next = 13, [ t.getHomeOperationsDetail(t) ];

                  case 13:
                    s = a.sent, t.renderFirstScreenData(s[0]);

                  case 15:
                    i = {
                        goods_id: t.goodsId ? t.goodsId : 0,
                        group_order_id: t.groupOrderId,
                        referrer: "group_order",
                        page_type: 0,
                        offset: parseInt((t.recPageIndex - 1) * t.pageSize),
                        count: t.pageSize,
                        list_id: t.listId,
                        group_role: e.groupRole,
                        group_status: e.status
                    }, t.getIndexReqGoodsList(-1, t.recPageIndex, i, t), a.next = 21;
                    break;

                  case 19:
                    return a.next = 21, t.getTabReqGoodsList(r, t);

                  case 21:
                    a.next = 26;
                    break;

                  case 23:
                    a.prev = 23, a.t0 = a.catch(0), console.error(a.t0);

                  case 26:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 23 ] ]);
        }));
    },
    loadLotteryList: function(e, t) {
        var a = this;
        if (a.isReqRunning(e, t)) return null;
        a.addReqFlag(e, t), (0, _.default)(v.default.mark(function o() {
            var s, i, n, u, d, c;
            return v.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    return o.prev = 0, o.next = 3, r.User.getUserProvinceId(a);

                  case 3:
                    return s = o.sent, i = {
                        subject_id: 2742,
                        page: t,
                        size: a.pageSize,
                        list_id: a.listId,
                        province_id: s
                    }, n = r.Request.requestDataWithCmd(O.lotteryList, {
                        params: i
                    }), o.next = 8, r.Request.runMainRequestForPage(n, a);

                  case 8:
                    return u = o.sent, d = u.goods_list || u.list || [], c = u.goods_list || u.list || [], 
                    c = c.map(function(e) {
                        return a.formatTagGoodsData(e);
                    }), a.processGoodsList({
                        rootOptId: e,
                        pageIndex: t,
                        curRawPageSize: d.length,
                        goodsList: c
                    }), o.abrupt("return", c);

                  case 16:
                    o.prev = 16, o.t0 = o.catch(0), console.error(o.t0);

                  case 19:
                  case "end":
                    return o.stop();
                }
            }, o, this, [ [ 0, 16 ] ]);
        }));
    },
    processGroupOrderInfo: function(e) {
        var t = this;
        (0, _.default)(v.default.mark(function a() {
            var s, n, u, d, c, l, p, g, h, m, _, I, y, w, b, k;
            return v.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (a.prev = 0, t.goodsId || (t.goodsId = e.goodsInfo.goodsId), t.loadRecommendGoodsList(e), 
                    t.serverTime = e.serverTime, t.preSetView(e), t.goodsInfo = e.goodsInfo, t.isFirstEnter && (t.getLotteryInfo(e.goodsInfo, t), 
                    t.dealGoodsInfo(e, t)), !e.goodsInfo || e.goodsInfo.eventType != o.default.EventType.LUCKY_DRAW) {
                        a.next = 10;
                        break;
                    }
                    return a.next = 10, t.getLotteryGuide(e, t);

                  case 10:
                    if (!e.goodsInfo || e.goodsInfo.eventType != o.default.EventType.LUCKY_DRAW && e.goodsInfo.eventType != o.default.EventType.FREE_TRIAL) {
                        a.next = 13;
                        break;
                    }
                    return a.next = 13, t.getScaleShareImage(e, t);

                  case 13:
                    if (e.groupOrderId == t.groupOrderId) {
                        a.next = 17;
                        break;
                    }
                    return t.setData({
                        showError: !0
                    }), t.$hideLoading(), a.abrupt("return");

                  case 17:
                    if (s = e.users || [], n = e.selfOrderInfo || {}, u = n.receive_name) for (n.receiveNameSec = u.slice(0, 1), 
                    d = 0; d < u.length - 1; d++) n.receiveNameSec += "*";
                    if ((c = n.mobile) && (n.mobileSec = c.slice(0, 3) + "****" + c.slice(7, 12)), s.map(function(e) {
                        return e.formatJoinTimeStr = r.TimeUtil.formatTime(new Date(1e3 * e.joinTime)), 
                        n && n.uid === e.uid && t.setData({
                            currentUserJoinTimeStr: e.formatJoinTimeStr
                        }), e.isLeader ? e.formatJoinTimeStr += "开团" : e.formatJoinTimeStr += "参团", 1715 !== t.catId1 && (2 !== t.catId1 || 64 !== t.catId2 || 40 !== t.catId3 && 116 !== t.catId3 && 117 !== t.catId3 && 120 !== t.catId3) || (e.nickname = r.Util.formatUserName(e.nickname)), 
                        e;
                    }), l = s[0], p = t.data.showOvershadow, t.isFirstEnter && e.groupRole === o.default.GroupRole.Lead && e.status === o.default.GroupStatus.OnGoing && (p = !0), 
                    g = {
                        isNewBuyer: e.isNewBuyer,
                        isNewUser: e.isNewBuyer,
                        lotteryRuleTitle: e.lotteryRuleTitle,
                        groupNoticeBarText: e.groupNoticeBarText,
                        isLottery: e.isLottery,
                        isFreeTrial: e.isFreeTrial,
                        users: s,
                        leader: l,
                        groupState: e.status,
                        groupRole: e.groupRole,
                        leftUserNum: e.leftUserNum,
                        currentUser: n,
                        expireTime: e.expireTime,
                        skuNum: parseInt(e.skuNum, 10),
                        skuId: e.skuId,
                        groupId: e.groupId,
                        groupOrderId: e.groupOrderId,
                        soldOutStr: e.soldOutStr,
                        hasLotteryRule: e.hasLotteryRule,
                        successTime: e.successTime,
                        shareInfo: e.shareInfo,
                        joinNum: e.joinNum,
                        isNewUserGroup: e.isNewUserGroup,
                        goExclusiveGroup: e.goExclusiveGroup,
                        status: e.status,
                        sales: parseInt(e.goodsInfo.sales, 10),
                        eventType: (e.goodsInfo || {}).eventType,
                        groupPice: (e.goodsInfo || {}).price,
                        originGroupPrice: (e.goodsInfo || {}).originPrice,
                        groupTopImage: r.ImageUtil.cdnCompress((t.data.goodsInfo || {}).hdThumbUrl),
                        marketPrice: e.marketPrice ? T.default.price(e.marketPrice, 100) : "",
                        maxOnsalePrice: e.maxOnsalePrice ? T.default.price(e.maxOnsalePrice, 100) : "",
                        showPaySuccessStyle: "pay_success" == t.$urlQueryObj.from
                    }, e.isNewBuyer && (g.newUserAlertVisible = !1), h = 100 - 100 * r.DataUtil.accDiv(g.maxOnsalePrice, g.marketPrice), 
                    h = h < 1 ? h.toString().slice(0, 3) : Math.floor(h), g.goodsDiscount = h + "%", 
                    m = t.data.goodsInfo, t.isFirstEnter ? g.goodsInfo = m ? r.ObjectUtil.assign(m, e.goodsInfo) : e.goodsInfo : (m.requireNum = e.goodsInfo.requireNum, 
                    g.goodsInfo = m), (_ = e.promotions) && _.events && _.events.promotion_price_activity && _.events.promotion_price_activity.copy_writing && (t.promotions = _), 
                    I = !1, y = !1, w = !1, b = !1, f.default.isLastGroupNotEnough = !1, "1" !== e.soldOutStr || e.groupRole !== o.default.GroupRole.NotInGroup) {
                        a.next = 45;
                        break;
                    }
                    b = !0, a.next = 54;
                    break;

                  case 45:
                    a.t0 = e.status, a.next = a.t0 === o.default.GroupStatus.OnGoing ? 48 : a.t0 === o.default.GroupStatus.Success ? 50 : a.t0 === o.default.GroupStatus.Failed ? 52 : 54;
                    break;

                  case 48:
                    return e.groupRole > o.default.GroupRole.NotInGroup ? (f.default.isLastGroupNotEnough = !0, 
                    I = !0) : y = !0, a.abrupt("break", 54);

                  case 50:
                    return e.groupRole > o.default.GroupRole.NotInGroup ? (w = !0, (e.goodsInfo || {}).eventType != o.default.EventType.LUCKY_DRAW && (e.goodsInfo || {}).eventType != o.default.EventType.FREE_TRIAL || (t.openNewGroup = !0)) : y = !0, 
                    a.abrupt("break", 54);

                  case 52:
                    return y = !0, a.abrupt("break", 54);

                  case 54:
                    I && t.data.shareHintMaskVisible && t.$showToast(t.data.shareHintText), k = i.default.getUsersTemplateData(e, {
                        dontShowleftUserIcon: !!b
                    }), t.$hideLoading(), t.setData(r.ObjectUtil.assign(g, {
                        showOvershadow: p,
                        showJoinedView: I,
                        showNormalView: y,
                        showSuccessView: w,
                        showNoStoreView: b
                    }, k)), t.hasGotGroupInfo = !0, t.processGroupView(), t.$setTrackingKeyParams({
                        group_order_id: e.groupOrderId,
                        goods_id: (e.goodsInfo || {}).goodsId,
                        event_type: (e.goodsInfo || {}).eventType
                    }), wx.stopPullDownRefresh(), t.isFirstEnter = !1, a.next = 68;
                    break;

                  case 65:
                    a.prev = 65, a.t1 = a.catch(0), console.error(a.t1);

                  case 68:
                  case "end":
                    return a.stop();
                }
            }, a, this, [ [ 0, 65 ] ]);
        }));
    },
    getLotteryGuide: _.default.wrap(v.default.mark(function e(t, r) {
        var a, s, i, n, u, d;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, t.groupRole == o.default.GroupRole.Lead) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                if (t.status == o.default.GroupStatus.OnGoing) {
                    e.next = 10;
                    break;
                }
                if (a = t.expireTime, (s = new Date()).setFullYear(2018, 4, 10), s.setHours(0, 0, 0, 0), 
                !(s.getTime() / 1e3 >= a)) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return");

              case 10:
                return i = void 0, n = void 0, u = function() {
                    var e = t.successTime;
                    r.serverTime - e >= 10800 ? (i = "guide_group_got", n = [ "1分拼单", "邀请好友", "红包已到账", "中奖发货" ]) : (i = "guide_group_check", 
                    n = [ "1分拼单", "邀请好友", "成团送钱", "系统审核", "中奖发货" ]);
                }, e.next = 15, k.default.getConfig("lottery_group_inspire");

              case 15:
                if (!(d = e.sent)) {
                    e.next = 30;
                    break;
                }
                e.t0 = t.status, e.next = 0 === e.t0 ? 20 : 1 === e.t0 ? 23 : 2 === e.t0 ? 25 : 28;
                break;

              case 20:
                return i = "guide_group_going", n = [ "1分拼单", "邀请好友", "成团送钱", "中奖发货" ], e.abrupt("break", 29);

              case 23:
                return u(), e.abrupt("break", 29);

              case 25:
                return i = "guide_group_fail", n = [ "1分拼单", "邀请好友", "领取失败", "中奖发货" ], e.abrupt("break", 29);

              case 28:
                return e.abrupt("break", 29);

              case 29:
                r.setData({
                    guideStatus: i,
                    guideDescList: n,
                    showGroupGuide: d
                });

              case 30:
                e.next = 35;
                break;

              case 32:
                e.prev = 32, e.t1 = e.catch(0), console.error(e.t1);

              case 35:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 32 ] ]);
    })),
    dealGoodsInfo: function(e, t) {
        (0, _.default)(v.default.mark(function e() {
            var a, s, i, n, u, d, c, p, g, h;
            return v.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, a = t.$urlQueryObj.goods_id, s = t.$urlQueryObj.cache_bottom_id, 
                    i = void 0, n = void 0, u = void 0, void 0 !== s && void 0 !== a) {
                        e.next = 14;
                        break;
                    }
                    return u = t.goodsId, e.next = 10, t.getGoodsDetail(u, t);

                  case 10:
                    i = e.sent, n = i[0], e.next = 25;
                    break;

                  case 14:
                    if (!((d = l.default.getDataFromCache(s)) && d.barDataNeededFromPage && d.barDataNeededFromPage.goods)) {
                        e.next = 21;
                        break;
                    }
                    n = d.barDataNeededFromPage.goods, c = d.barDataNeededFromPage.goods, t.minOnsaleGroupPrice = 100 * parseFloat(c.minOnsaleGroupPrice), 
                    e.next = 25;
                    break;

                  case 21:
                    return e.next = 23, t.getGoodsDetail(u, t);

                  case 23:
                    i = e.sent, n = i[0];

                  case 25:
                    n && n.goodsId && (f.default.lastOrderGoodsId = n.goodsId), i && i[1] ? n.isOnSale && i[1].sku && i[1].sku.length > 1 && (t.hasSkuSelector = !0) : n.skus && n.isOnSale && n.skus && n.skus.length > 1 && (t.hasSkuSelector = !0), 
                    p = n.eventType, g = void 0, g = t.data.goodsInfo ? r.ObjectUtil.assign(t.data.goodsInfo, n) : n, 
                    t.goodsInfo = g, h = {
                        goodsInfo: g,
                        eventType: p,
                        groupTopBanner: n.hdThumbUrl,
                        groupTopImage: r.ImageUtil.cdnCompress(n.hdThumbUrl),
                        groupPice: n.maxOnsaleGroupPrice
                    }, p == o.default.EventType.FREE_GROUP && (h.isFreeGroup = !0, h.isPreparingStatus = !1, 
                    h.isLotteryOrFreeTrial = !0), t.setData(h), i && i[1] && t.setSkus(n, i[1], t), 
                    e.next = 40;
                    break;

                  case 37:
                    e.prev = 37, e.t0 = e.catch(0), console.error(e.t0);

                  case 40:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 37 ] ]);
        }));
    },
    goToOrderDetail: function() {
        var e = this.data.currentUser.order_sn;
        this.$forward("order", {
            ordersn: e
        });
    },
    joinedViewDataProcess: function() {
        this.setCountDownTime();
    },
    setCountDownTime: function() {
        var e = this, t = {};
        if (parseInt(this.data.status, 10) == o.default.GroupStatus.OnGoing && (this.groupLeftTime = this.data.expireTime - this.serverTime, 
        t.groupLeftTransferedTime = r.TimeUtil.transferToTime(1e3 * e.groupLeftTime), t.groupLeftTimeObj = r.TimeUtil.transferToTime(1e3 * e.groupLeftTime, {
            needObj: !0
        }), t.groupLeftTime = this.groupLeftTime), this.localGroups && this.localGroups.length > 0 && (this.setLocalGroupLeftTime(), 
        t.localGroups = this.localGroups), t.refreshCountDown = !this.data.refreshCountDown, 
        this.promotions) {
            this.setPromotionsLeftTime(), t.promotions = this.promotions;
            var a = this.promotions.events.promotion_price_activity.copy_writing;
            t[[ "goodsInfo.skuDisplayTitle" ]] = a.copy_writing_without_priced, t[[ "goodsInfo.skuNoFormatTitle" ]] = a.copy_writing_without_price, 
            t[[ "goodsInfo.skuDefaultTitle" ]] = a.copy_writing_without_price, t[[ "goodsInfo.skuCopyWritings" ]] = a.sku_copy_writings, 
            t[[ "goodsInfo.activityTime" ]] = this.promotionLeftTime ? this.promotionLeftTime : this.promotions.events.promotion_price_activity.end_time - this.serverTime;
        }
        this.setData(t), e.setIntervalFun();
    },
    setPromotionsLeftTime: function() {
        var e = this.promotions;
        if (e && e.events && e.events.promotion_price_activity && e.events.promotion_price_activity.copy_writing.activity_copy_writing) {
            var t = e.events.promotion_price_activity.copy_writing;
            if (6 == e.events.promotion_price_activity.promotion_activity_type) {
                var a = t.activity_copy_writing, o = e.events.promotion_price_activity.end_time - this.serverTime, s = r.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * o, "H"), i = void 0;
                s.days > 0 ? (i = s.days + "天" + s.hours + "小时", t.activity_copy_writing_title = i + "恢复原价", 
                t.copy_writing_without_priced = t.copy_writing_without_price.replace("#time#", i)) : (i = r.TimeUtil.transferToTime(1e3 * o), 
                t.activity_copy_writing_title = i + "恢复原价", t.activity_copy_writing_origin = a, 
                this.promotionLeftTime = o);
            } else t.activity_copy_writing_title = t.activity_copy_writing.split("恢复")[0] + "恢复原价", 
            t.copy_writing_without_priced = t.copy_writing_without_price;
        }
    },
    setLocalGroupLeftTime: function() {
        var e = this;
        e.localGroups.map(function(t) {
            if (t.expireTime) {
                t.localGroupLeftTime || 0 == t.localGroupLeftTime ? t.localGroupLeftTime > 0 && (t.localGroupLeftTime -= 1) : t.localGroupLeftTime = t.expireTime - e.serverTime;
                var a = r.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * t.localGroupLeftTime, "HMS");
                return parseInt(a.days) > 0 ? t.leftTimeStr = a.days + "天:" : t.leftTimeStr = a.hours + ":" + a.minutes + ":" + a.seconds, 
                t;
            }
        });
    },
    setIntervalFun: function() {
        var e = this, t = this;
        t.intervalInfo && clearInterval(t.intervalInfo), t.intervalInfo = setInterval(function() {
            var a = {};
            if (parseInt(t.data.status, 10) == o.default.GroupStatus.OnGoing && t.groupLeftTime > 0 && (t.groupLeftTime -= 1, 
            a.groupLeftTransferedTime = r.TimeUtil.transferToTime(1e3 * t.groupLeftTime), a.groupLeftTimeObj = r.TimeUtil.transferToTime(1e3 * t.groupLeftTime, {
                needObj: !0
            }), a.groupLeftTime = t.groupLeftTime), e.localGroups && e.localGroups.length > 0 && (e.setLocalGroupLeftTime(), 
            a.localGroups = e.localGroups), a.refreshCountDown = !t.data.refreshCountDown, e.promotions && (0 == t.promotionLeftTime || t.promotionLeftTime)) if (t.promotionLeftTime >= 1) {
                t.promotionLeftTime -= 1;
                var s = r.TimeUtil.transferToTime(1e3 * t.promotionLeftTime), i = t.promotions, n = i.events.promotion_price_activity.copy_writing;
                n.activity_copy_writing_title = s + "恢复原价", n.copy_writing_without_priced = n.copy_writing_without_price.replace("#time#", s), 
                a.promotions = i, a["goodsInfo.skuDisplayTitle"] = t.data.goodsInfo.skuNoFormatTitle.replace("#time#", s), 
                a["goodsInfo.activityTime"] = t.promotionLeftTime;
            } else t.reLoad();
            t.setData(a);
        }, 1e3);
    },
    setShareTitle: function() {
        var e = this.data.leftUserNum, a = this.data.goodsInfo;
        if (a && a.minGroupPrice && a.goodsName) if (this.lotteryInfo && this.lotteryInfo.luckyEndTime) {
            var s = this.lotteryInfo.luckyEndTime - this.serverTime;
            if (s <= 0) return;
            var i = r.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * s), n = "";
            if (i.days > 1) {
                if (this.lotteryShareInfoList && this.lotteryShareInfoList.length) {
                    n = this.lotteryShareInfoList[Math.floor(Math.random() * this.lotteryShareInfoList.length)];
                    var u = (r.User.getUserLocalInfo() || {}).nickName || "您的朋友", d = a.goodsName;
                    return n = n.replace("{nickName}", u), n = n.replace("{goodsName}", d), void this.setData(t({}, "shareInfo.shareTitle", n));
                }
            } else i.days > 0 ? n = "【最后" + i.days + "天】" : i.hours > 0 ? n = "【最后" + i.hours + "小时】" : i.minutes > 0 ? n = "【最后" + i.minutes + "分钟】" : s > 0 && (n = "【最后1分钟】");
            this.setData(t({}, "shareInfo.shareTitle", n + (n ? "" : "【即将结束】") + "快来" + a.minGroupPrice + "元拼" + a.goodsName));
        } else a && a.eventType === o.default.EventType.FREE_GROUP && e > 0 ? this.setData(t({}, "shareInfo.shareTitle", "【仅剩" + e + "名】快来" + a.minGroupPrice + "元拼" + a.goodsName)) : a && this.setData(t({}, "shareInfo.shareTitle", "快来" + a.minGroupPrice + "元拼" + a.goodsName)); else this.setData(t({}, "shareInfo.shareTitle", "【拼多多】快来一起超低价拼！"));
    },
    normalViewDataProcess: function() {
        this.processGroupStatusHint(), this.setCountDownTime(), this.processLocalGroupData();
    },
    processLocalGroupData: function() {
        var e = this, t = e.data, a = t.goodsInfo || {};
        parseInt(t.status, 10) === o.default.GroupStatus.Success && t.groupRole <= o.default.GroupRole.NotInGroup && "local_group" !== e.$urlQueryObj.refer_page_element && a.isOnSale || parseInt(t.status, 10) === o.default.GroupStatus.Failed && a.isOnSale ? (0, 
        _.default)(v.default.mark(function t() {
            var o, s, i, n;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, o = r.Request.requestDataWithCmd(O.localGroup, {
                        restfulParam: a.goodsId
                    }), t.next = 4, r.Request.runSecondaryRequestForPage(o, e);

                  case 4:
                    (s = t.sent).local_group && r.DataUtil.isArray(s.local_group) && (i = s.local_group, 
                    n = [], i.forEach(function(t) {
                        (t = JSON.parse(t)).nickname && (1715 !== e.catId1 && (2 !== e.catId1 || 64 !== e.catId2 || 40 !== e.catId3 && 116 !== e.catId3 && 117 !== e.catId3 && 120 !== e.catId3) || (t.nickname = r.Util.formatUserName(t.nickname)));
                        var o = {
                            expireTime: parseInt(t.expire_time, 10),
                            nickname: t.nickname || "游客",
                            avatar: t.avatar || r.ImageUtil.getCDNImgURL("base/logo.jpg"),
                            groupOrderId: t.group_order_id,
                            usersNum: parseInt(t.users_num, 10) || 1,
                            requireNum: a.requireNum || a.groupTypes[1].requireNum
                        };
                        o.remaindNum = o.requireNum - o.usersNum, n.push(o);
                    }), e.localGroups = n), e.imprTracking(), t.next = 13;
                    break;

                  case 9:
                    t.prev = 9, t.t0 = t.catch(0), console.error(t.t0), e.imprTracking();

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 9 ] ]);
        })) : e.imprTracking();
    },
    successViewDataProcess: function() {
        var e = "", t = this.data.successViceDesc;
        e = r.TimeUtil.formatTime(new Date(1e3 * this.data.successTime), "yyyy-MM-dd hh:mm"), 
        (this.data.hasLotteryRule || this.data.goodsInfo.eventType === o.default.EventType.CAPITAL_GIFT) && (t = e + "凑足" + this.data.joinNum + "人", 
        this.data.currentUser.uid === this.data.leader.uid && this.data.goodsInfo.eventType === o.default.EventType.CAPITAL_GIFT && (t = "商家将尽快发货给好友，请耐心等待"));
        var a = "", s = "";
        this.data.currentUser && (a = [ this.data.currentUser.province_name, this.data.currentUser.city_name, this.data.currentUser.district_name, this.data.currentUser.shipping_address ].join(""), 
        s = [ this.data.currentUser.province_name, this.data.currentUser.city_name, this.data.currentUser.district_name, "..." ].join("")), 
        this.setData({
            successViceDesc: t,
            curUserAddress: a,
            curUserAddressSec: s,
            successTimeStr: e
        });
    },
    noStoreViewDataProcess: function() {
        var e = "他们拼团成功了，将安排发货", t = "";
        switch (this.data.groupState) {
          case o.default.GroupStatus.OnGoing:
            e = "别人拼团中", t = "拼团中";
            break;

          case o.default.GroupStatus.Success:
            t = "团已满";
            break;

          case o.default.GroupStatus.Failed:
            e = "别人拼团失败";
        }
        this.setData({
            noStoreGroupStatusTip: e,
            groupStatusTips: t
        });
    },
    hideLotteryRulesPopup: function() {
        this.setData({
            lotteryRulesPopupVisible: !1
        });
    },
    showLotteryRule: function() {
        this.data.lotteryRule ? this.setData({
            lotteryRulesPopupVisible: !0
        }) : this.loadLotteryRule(!0);
    },
    setupLotteryRuleData: function(e, t, a) {
        var o = r.ActivityUtils.getLotteryRules(e, t);
        this.setData({
            lotteryRule: o,
            lotteryRulesPopupVisible: !!a
        });
    },
    loadLotteryRule: function(e) {
        var t = this, o = t.data.goodsInfo || {};
        e && t.$showLoading(), (0, _.default)(v.default.mark(function s() {
            var i, n, u;
            return v.default.wrap(function(s) {
                for (;;) switch (s.prev = s.next) {
                  case 0:
                    return s.prev = 0, i = r.Request.requestDataWithCmd(O.luckyDraw, {
                        restfulParam: o.goodsId
                    }), s.next = 4, r.Request.runSecondaryRequestForPage(i, t);

                  case 4:
                    n = s.sent, e && t.$hideLoading(), n.name && (u = void 0, t.data.isFreeTrial && (u = a.Rules.FreeTrial), 
                    u && (u = r.ObjectUtil.assign({}, u)), n.rule = u, t.setupLotteryRuleData(n, u, e)), 
                    s.next = 13;
                    break;

                  case 9:
                    s.prev = 9, s.t0 = s.catch(0), console.error(s.t0), e && t.$hideLoading();

                  case 13:
                  case "end":
                    return s.stop();
                }
            }, s, this, [ [ 0, 9 ] ]);
        }));
    },
    goHomePage: function(e) {
        this.$switchTab("index"), (0, r.TrackingRecord)({
            op: "impr",
            event: "group_success_btn_clk",
            page_name: "group_detail",
            page_sn: "10024",
            page_element: "return_index"
        }), this.$uploadFormId(e);
    },
    goLotteryPage: function(e) {
        this.$forward("subject", {
            subject_id: "2742"
        }), this.$uploadFormId(e);
        var t = this.getTrackingParams("click", "main", "going_draw");
        (0, r.TrackingRecord)(t);
    },
    goSpikePage: function() {
        this.$forward("spike");
    },
    viewGoodsDetail: function() {
        if (!this.data.showNoStoreView) {
            var e = this.data, t = e.goodsInfo, a = e.isNewUserGroup, i = e.isNewUser, n = void 0;
            if (this.$deleteShareInfo(), parseInt(e.status, 10) !== o.default.GroupStatus.OnGoing || a && !i) n = a && !i ? {
                goods_id: t.goodsId
            } : {
                goods_id: t.goodsId,
                status: e.status,
                group_role: e.groupRole
            }; else {
                var u = this.$urlQueryObj || {}, d = {
                    goods_id: t.goodsId,
                    status: e.status,
                    group_role: e.groupRole,
                    group_order_id: e.groupOrderId
                };
                n = u = r.ObjectUtil.assign(u, d);
            }
            n && (this.data.groupState == o.default.GroupStatus.OnGoing && (n.source_channel = s.default.SourceChannel.GROUP_DETAIL_TO_GOODS_DETAIL), 
            this.$forward("goods", n));
            var c = this.getTrackingParams("click", "main", "goods");
            (0, r.TrackingRecord)(c);
        }
    },
    processGroupStatusHint: function() {
        var e = "", t = "", r = !1, a = this.data.groupsStatusClass;
        switch (this.data.groupState) {
          case o.default.GroupStatus.OnGoing:
            t = "一键参团", this.data.goodsInfo.eventType !== o.default.EventType.LUCKY_DRAW && this.data.goodsInfo.eventType !== o.default.EventType.FREE_TRIAL || (t = "参与活动"), 
            this.data.goodsInfo.eventType === o.default.EventType.CAPITAL_GIFT && (t = "立即领取"), 
            6 == this.data.eventType && (t = "新人一键参团"), a = this.data.groupsStatusClass + " ongoing", 
            r = !0;
            break;

          case o.default.GroupStatus.Success:
            e = "团已满", t = "我来开这个团", this.openNewGroup = !0, this.data.goodsInfo.eventType !== o.default.EventType.LUCKY_DRAW && this.data.goodsInfo.eventType !== o.default.EventType.CAPITAL_GIFT || (e = ""), 
            a = this.data.groupsStatusClass + " success";
            break;

          case o.default.GroupStatus.Failed:
            this.openNewGroup = !0, e = "拼团不成功，款项将原路返还", this.data.goodsInfo.eventType != o.default.EventType.LUCKY_DRAW && this.data.goodsInfo.eventType != o.default.EventType.FREE_TRIAL && (t = this.data.groupRole === o.default.GroupRole.NotInGroup ? "我来开这个团" : "再次一键开团"), 
            this.data.isFreeTrial && (e = "拼团不成功"), a = this.data.groupsStatusClass + " failed";
        }
        this.setData({
            showLeftUserTips: r,
            groupButtonText: t,
            groupStatusTips: e,
            groupsStatusClass: a
        });
    },
    initPageData: function() {
        this.initalDataObj ? this.setData(this.initalDataObj) : this.initalDataObj = JSON.parse(JSON.stringify(this.data));
    },
    onHide: function() {
        n.default.close(this), this.clearIntervalFun();
    },
    clearIntervalFun: function() {
        this.intervalInfo && clearInterval(this.intervalInfo);
    },
    onUnload: function() {
        f.default.isLastPagePayPage = !1, f.default.showNotEnoughGroupDialog = !0, f.default.isLastPageGroupPage = !0, 
        n.default.close(this), this.clearIntervalFun();
    },
    pvTracking: function(e) {
        var t = {
            op: "pv",
            page_name: "group_detail",
            page_sn: "10024",
            group_order_id: this.$urlQueryObj.group_order_id || this.$urlQueryObj.g,
            goods_id: this.$urlQueryObj.goods_id,
            event_type: this.$urlQueryObj.event_type
        };
        e && (t.is_back = 1), (0, r.TrackingRecord)(t), this.$firstTimeTrackRecord.pv = !0;
    },
    getTrackingParams: function(e, t, a, o) {
        var s = this.goodsInfo, i = {
            op: e,
            page_name: "group_detail",
            page_sn: "10024",
            page_section: t,
            page_element: a,
            goods_id: s.goodsId,
            event_type: s.eventType
        };
        return o && (i = r.ObjectUtil.assign(i, o)), i = r.ObjectUtil.assign(i, this.getCommonTrackingParam());
    },
    imprTracking: function() {
        if ((!f.default.isFromAppOnShow || !this.$firstTimeTrackRecord.impr) && this.hasGotDecodeAlias && this.hasGotGroupInfo) {
            var e = this.goodsInfo, t = {
                has_local_group: this.localGroups && this.localGroups.length > 0 ? 1 : 0,
                has_audio: this.data.audioInfo ? "1" : "0",
                goods_type: e.goodsType
            }, a = this.getTrackingParams("impr", "main", null, t);
            (0, r.TrackingRecord)(a), this.$firstTimeTrackRecord.impr = !0;
        }
    },
    groupDetailNavClickRecord: function(e) {
        var t = e.detail.target.dataset;
        if (t) {
            var a = t.pageElement, o = t.route, s = t.paramId;
            switch (o) {
              case "index":
                this.$switchTab("index");
                break;

              case "subject":
                this.$forward("subject", {
                    subject_id: s
                });
                break;

              case "subjects":
                this.$forward("subjects", {
                    subjects_id: s
                });
                break;

              default:
                this.$forward(o);
            }
            var i = this.getTrackingParams("click", "icon_list", a);
            (0, r.TrackingRecord)(i);
        }
        this.$uploadFormId(e);
    },
    componentsAddRootFunc: function(e, t) {
        e && "function" == typeof t && (this[e] = t);
    },
    onLoad: function(e) {
        this.getLotteryShareInfoList(), this.pvTracking(), e && (this.$urlQueryObj.goods_id && (f.default.lastOrderGoodsId = this.$urlQueryObj.goods_id), 
        (this.$urlQueryObj.group_order_id || this.$urlQueryObj.g) && (f.default.lastGroupOrderId = this.$urlQueryObj.group_order_id || this.$urlQueryObj.g, 
        this.groupOrderId = this.$urlQueryObj.group_order_id || this.$urlQueryObj.g)), "1019" == f.default.sceneId && this.setData({
            isWEntrance: !0
        });
        var t = this;
        this.popupModel = new w.default({
            page: t,
            ns: "popupModel",
            key: "popup_group_detail"
        }), t.quickEntryControl = new b.default({
            page: t,
            ns: "quickEntryControl"
        }), this.resourcePlaceControl = new S.default({
            page: t,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "floating_group_detail"
        }), this.loadPage();
        var a = {
            tabsData: this.data.$tabsData,
            alignType: "align-gap",
            setDataFunc: function(e) {
                t.setData(e);
            },
            gap: 29,
            scrollLeftGap: 116
        };
        this.segmentControl = new x.default(a, this);
        var o = wx.createCanvasContext("scrollHorizontalScrollbar");
        this.shsCtx = o, this.loadLocalStorageData(), this.setData(I.default.initSkuStatus), 
        this.data.shareHintMaskVisible && this.$showToast(this.data.shareHintText), this.listId = "xcx_group_detail_rec_list_" + r.DataUtil.getRandomString(6);
    },
    showHintToast: function() {
        var e = this;
        wx.setClipboardData && wx.getClipboardData && wx.setClipboardData({
            data: "拼多多",
            success: function() {
                e.setData({
                    hideHintToast: !1
                }), setTimeout(function() {
                    e.setData({
                        hideHintToast: !0
                    });
                }, 3e3);
            }
        });
    },
    stopDetailMove: function() {},
    subscribeBtnClick: function(e) {
        this.setData({
            showSubscribeModal: !0
        }), this.$uploadFormId(e, !0);
    },
    hideSubscribeModal: function() {
        this.setData({
            showSubscribeModal: !1
        });
    },
    hideSubscribeModalBtn: function(e) {
        this.setData({
            showSubscribeModal: !1
        }), this.$uploadFormId(e, !0);
    },
    hideDealModal: function() {
        this.setData({
            showDealModal: !1
        });
    },
    showDealModalClick: function() {
        this.setData({
            showDealModal: !0
        });
    },
    renderFirstScreenData: function(e) {
        var t = this, a = this, o = null;
        if (e && !r.DataUtil.detectReqDataIsError(e, this.$showToast)) {
            if (Array.isArray(e) && e.length <= 0) try {
                if (!(o = r.StorageUtil.getStorageSync(D.default.HOME_OPERATIONS))) return void this.setData({
                    "tabStatus[0].showError": !0
                });
            } catch (e) {
                console.log(e);
            }
            o || (o = this.dealWithHomeOperationsData(e) || {});
            var s = o.tabStatus, i = o.homeOperations, n = i.map(function(e) {
                return {
                    title: e.opt_name
                };
            });
            this.segmentControl.refreshTabsData(n);
            var u = r.ObjectUtil.assign({
                scrollContainerWidth: this.windowWidth,
                homeOperations: i,
                tabStatus: s,
                notFirstEnterPage: !0,
                curBannerIndex: this.data.curBannerIndex || 0,
                visible: !0
            }, this.segmentControl.$data());
            this.setData(u), wx.setStorage({
                key: D.default.HOME_OPERATIONS,
                data: o
            }), a.getIndexReqGoodsList(-1, a.recPageIndex, a.getRecommendParams(), a);
            for (var d = 1; d <= 4; d++) !function(e) {
                (!t.data.catgoodsList[e] || t.data.catgoodsList[e].length <= 0) && (0, _.default)(v.default.mark(function t() {
                    return v.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.prev = 0, t.next = 3, a.getTabReqGoodsList(e, a);

                          case 3:
                            t.next = 8;
                            break;

                          case 5:
                            t.prev = 5, t.t0 = t.catch(0), console.error(t.t0);

                          case 8:
                          case "end":
                            return t.stop();
                        }
                    }, t, this, [ [ 0, 5 ] ]);
                }));
            }(d);
        } else this.setData({
            "tabStatus[0].showError": !0
        });
    },
    getTabReqGoodsList: _.default.wrap(v.default.mark(function e(t, a) {
        var o, s, i, n, u, d, c, l, p, g, h, f;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (o = a.data.homeOperations || [], s = o[t] || {}, i = s.opt_id, n = a.data.tabStatus[t] || {}, 
                u = n.offset || 0, d = 0 == u ? 20 : 50, c = 0, l = 1, null != i && -1 != i && -2 != i) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return", null);

              case 3:
                if (!a.isReqRunning(i, u)) {
                    e.next = 5;
                    break;
                }
                return e.abrupt("return", null);

              case 5:
                return a.addReqFlag(i, u), p = r.Request.requestDataWithCmd(O.operationGroups, {
                    params: {
                        opt_type: l,
                        offset: u,
                        size: d,
                        sort_type: L.CategorySortTypes[c].api
                    },
                    restfulParam: i
                }), e.prev = 7, e.next = 10, r.Request.runSecondaryRequestForPage(p, a);

              case 10:
                g = e.sent, h = g.goods_list || [], f = g.opt_infos || [], h = h.map(function(e) {
                    return a.formatTagGoodsData(e);
                }), f = f.map(function(e) {
                    return {
                        key: "optinfo-" + e.id,
                        optId: parseInt(e.id, 10) || 0,
                        optType: parseInt(l, 10) + 1,
                        optName: e.opt_name,
                        priority: e.priority
                    };
                }), a.processGoodsList({
                    goodsList: h,
                    optInfos: f,
                    rootOptType: l,
                    rootOptId: i,
                    offset: u,
                    curRawGoodsListSize: h.length
                }), e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(7), console.error(e.t0), a.requestTagGoodsError({
                    resIndex: t,
                    rootOptId: i,
                    pageIndex: null,
                    offset: u
                });

              case 22:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 7, 18 ] ]);
    })),
    processGoodsList: function(e) {
        this.$hideLoading(), this.removeReqFlag(e.rootOptId, null == e.pageIndex ? e.offset : e.pageIndex);
        var t = this.getIndexByOptId(e.rootOptId);
        Array.isArray(this.catgoodsStorage[t]) || (this.catgoodsStorage[t] = []), this.catgoodsStorage[t] = this.catgoodsStorage[t].concat(e.goodsList), 
        this.catgoodsStorage[t] = r.DataUtil.objectArrayDuplicateRemove(this.catgoodsStorage[t], "goodsId", function(e) {
            return 1 == e.isApp;
        });
        var a = (this.data.tabStatus ? this.data.tabStatus[t] : {}) || {};
        if (!0 !== a.showError && (a.loadMoreVisible = !0, a.showError = !1), e.goodsList.length > 0 && (a.showError = !1), 
        this.data.isWEntrance && 0 === t || !this.data.isWEntrance && (0 === t || 1 === t)) a.canLoadMore = e.curRawPageSize > 0, 
        a.recCanLoadMore = -1 === e.rootOptId ? e.curRawPageSize > 0 : a.recCanLoadMore, 
        a.lotCanLoadMore = -2 === e.rootOptId ? e.curRawPageSize > 0 : a.lotCanLoadMore, 
        this.fillCatgoodsListData(t, a, 0 === this.pageIndex), this.pageIndex = -1 === e.rootOptId || -2 === e.rootOptId ? this.pageIndex + 1 : this.pageIndex, 
        this.recPageIndex = -1 === e.rootOptId ? this.recPageIndex + 1 : this.recPageIndex, 
        this.lotPageIndex = -2 === e.rootOptId ? this.lotPageIndex + 1 : this.lotPageIndex; else {
            a.canLoadMore = e.curRawGoodsListSize > 0, a.offset = a.offset || 0;
            var o = a.offset;
            a.offset += 0 == a.offset ? 20 : 50, this.fillCatgoodsListData(t, a, 0 === o);
        }
    },
    fillCatgoodsListData: function(e, a, o) {
        var s = this;
        this.scrollToLowerlock = !1;
        var i = this.catgoodsStorage[e], n = this.data.catgoodsList[e] || [];
        o && (n = []);
        var u = n.length;
        if (i && i.length > u) {
            var d = void 0;
            if (d = 0 === u ? 8 : n.length + 20, n = i.slice(0, d), this.data.isWEntrance && 0 == e && o) this.pageData["catgoodsList[" + e + "]"] = n; else if (this.data.isWEntrance || 0 != e && 1 != e || !o) {
                var c = {};
                if (c["catgoodsList[" + e + "]"] = n, a) {
                    var l = this.data.tabStatus[e] || {};
                    l = r.ObjectUtil.assign(l, a), c["tabStatus[" + e + "]"] = l;
                }
                this.setData(c), e > 1 && this.clearLastImprList();
            } else this.pageData["catgoodsList[" + e + "]"] = n;
        } else {
            var p = this.data.tabStatus[e] || {};
            p.canLoadMore ? (0, _.default)(v.default.mark(function t() {
                return v.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.prev = 0, s.data.isWEntrance || 0 !== e) {
                            t.next = 5;
                            break;
                        }
                        s.loadLotteryList(-2, s.lotPageIndex), t.next = 11;
                        break;

                      case 5:
                        if (!(s.data.isWEntrance && 0 === e || !s.data.isWEntrance && 1 === e)) {
                            t.next = 9;
                            break;
                        }
                        s.getIndexReqGoodsList(-1, s.recPageIndex, s.getRecommendParams(), s), t.next = 11;
                        break;

                      case 9:
                        return t.next = 11, s.getTabReqGoodsList(e, s);

                      case 11:
                        t.next = 16;
                        break;

                      case 13:
                        t.prev = 13, t.t0 = t.catch(0), console.error(t.t0);

                      case 16:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 13 ] ]);
            })) : (!this.data.isWEntrance && 0 === e && p.lotCanLoadMore && s.loadLotteryList(-2, s.lotPageIndex), 
            (this.data.isWEntrance && 0 === e || !this.data.isWEntrance && 1 === e) && p.recCanLoadMore ? s.getIndexReqGoodsList(-1, this.recPageIndex, s.getRecommendParams(), s) : (p.showNoMoreText = !0, 
            this.setData(t({}, "tabStatus[" + e + "]", p))));
        }
        this.tryInitImprRect();
    },
    getRecommendParams: function() {
        var e = {
            goods_id: this.goodsId ? this.goodsId : 0,
            group_order_id: this.groupOrderId,
            referrer: "group_order",
            page_type: 0,
            offset: parseInt((this.recPageIndex - 1) * this.pageSize),
            count: this.pageSize,
            list_id: this.listId,
            group_role: this.data.groupRole,
            group_status: this.data.groupState
        };
        return e;
    },
    requestTagGoodsError: function(e) {
        this.removeReqFlag(e.rootOptId, null == e.pageIndex ? e.offset : e.pageIndex);
        var r = e.resIndex;
        this.$showToast("网络出错"), this.$hideLoading();
        var a = !1;
        null == e.pageIndex ? 0 === e.offset && (a = !0) : 1 === e.pageIndex && (a = !0), 
        a && this.setData(t({}, "tabStatus[" + r + "].showError", !0));
    },
    getIndexByOptId: function(e) {
        if (this.data.isWEntrance && -1 == e) return 0;
        if (!this.data.isWEntrance && -2 == e) return 0;
        if (!this.data.isWEntrance && -1 == e) return 1;
        for (var t = null, r = this.data.homeOperations || [], a = 0, o = r.length; a < o; a++) if (r[a].opt_id == e) {
            t = a;
            break;
        }
        return t;
    },
    isReqRunning: function(e, t) {
        var r = this.generateReqFlag(e, t);
        return this.tabsReqRunningArr.indexOf(r) >= 0;
    },
    generateReqFlag: function(e, t) {
        return [ "req", e, t ].join("#");
    },
    removeReqFlag: function(e, t) {
        var r = this.generateReqFlag(e, t), a = this.tabsReqRunningArr.indexOf(r);
        a >= 0 && this.tabsReqRunningArr.splice(a, 1);
    },
    addReqFlag: function(e, t) {
        var r = this.generateReqFlag(e, t);
        this.tabsReqRunningArr.push(r);
    },
    formatTagGoodsData: function(e) {
        var t = e.group || {}, a = parseInt(t.customer_num || e.customer_num || 0), o = t.price || e.price, s = {
            key: "goods-" + e.goods_id,
            goodsId: e.goods_id,
            imgUrl: r.ImageUtil.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
            goodsName: e.goods_name,
            groupDesc: a + "人团",
            price: T.default.price(o, 100),
            marketPrice: T.default.price(e.market_price, 100),
            soldQuantity: T.default.sales(e.sales || e.cnt),
            customerNum: parseInt(a, 10),
            nationalFlag: e.country ? r.ImageUtil.getCDNImgURL("nation/rect/" + e.country + ".png") : "",
            tag: parseInt(e.tag, 10),
            eventType: e.event_type
        }, i = [ "spike", "economical-brand", "go-shopping", "good-fruit", "brand-clean" ];
        return !isNaN(s.tag) && s.tag >= 0 && s.tag < i.length && (s.activityFlagClass = "activity-flag activity-flag-gap activity-flag-" + i[s.tag]), 
        s.allowance = this.getDiscount(s.price, s.marketPrice), s.transData = {
            goodsId: s.goodsId,
            preGroupPrice: parseInt(o, 10),
            preSinglePrice: parseInt(e.normal_price, 10),
            preMarketPrice: parseInt(e.market_price, 10),
            goodsName: s.goodsName,
            customerNum: s.customerNum,
            ad: e.ad,
            p_rec: e.p_rec,
            p_search: e.p_search,
            eventType: e.event_type
        }, s;
    },
    getDiscount: function(e, t) {
        if (!e || !t) return 0;
        var r = Math.floor(e / t * 100) / 10;
        return r % 1 == 0 && 0 !== r && (r = r.toFixed(1)), r;
    },
    dealWithHomeOperationsData: function(e) {
        var t = this, r = [], a = [], o = [ {
            opt_name: "抽奖",
            opt_id: -2,
            children: []
        } ], s = [ {
            opt_name: "推荐",
            opt_id: -1,
            children: []
        } ];
        return (e = this.data.isWEntrance ? s.concat(e) : o.concat(s).concat(e)).forEach(function(e, o) {
            e.children = e.children.slice(0, 7), e.children.map(function(e) {
                return e.opt_name = e.opt_name.slice(0, 5), e;
            }), r.push(e), a[o] = {}, t.data.isWEntrance && 0 == o && (a[o].recCanLoadMore = !0), 
            t.data.isWEntrance || 0 != o || (a[o].lotCanLoadMore = !0), t.data.isWEntrance || 1 != o || (a[o].recCanLoadMore = !0), 
            a[o].canLoadMore = !0, a[o].showNoMoreText = !1, a[o].showError = !1;
        }), {
            homeOperations: r,
            tabStatus: a
        };
    },
    loadLocalStorageData: function() {
        var e = this;
        (0, _.default)(v.default.mark(function t() {
            var a;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, [ r.StorageUtil.getStorage(D.default.HOME_OPERATIONS) ];

                  case 3:
                    a = t.sent, e.renderLocalStorageData(a[0]), t.next = 10;
                    break;

                  case 7:
                    t.prev = 7, t.t0 = t.catch(0), console.error(t.t0);

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 7 ] ]);
        }));
    },
    renderLocalStorageData: function(e) {
        if (!this.data.homeOperations || !this.data.homeOperations[0]) if (this.windowWidth || (this.windowWidth = r.SystemInfo.getWindowWidthSync()), 
        e && e.homeOperations) {
            var t = e.homeOperations, a = t.map(function(e) {
                return {
                    title: e.opt_name
                };
            });
            this.segmentControl.refreshTabsData(a);
            var o = r.ObjectUtil.assign({
                scrollContainerWidth: this.windowWidth,
                homeOperations: t,
                notFirstEnterPage: !0,
                curBannerIndex: this.data.curBannerIndex || 0,
                visible: !0
            }, this.segmentControl.$data());
            this.setData(o);
        } else this.setData({
            scrollContainerWidth: this.windowWidth,
            notFirstEnterPage: !0,
            curBannerIndex: this.data.curBannerIndex || 0,
            visible: !0
        });
    },
    didClickSegmentTab: function(e) {
        var t = parseInt(e.currentTarget.dataset.index);
        isNaN(t) || (this.changeCurTabIndex(t, !1, !0), (0, r.TrackingRecord)({
            op: "click",
            event: "opt_entry_clk",
            page_name: "group_detail",
            page_sn: "10024",
            page_section: "opt_list",
            page_element: "opt",
            element_id: this.data.homeOperations[t].opt_id,
            idx: t
        }));
    },
    changeCurTabIndex: function(e, a) {
        var o = this;
        if (e !== this.data.curTabIndex || a) {
            this.$showLoading();
            var s = this.data.homeOperations || [], i = this.data.curTabIndex, n = this.data.catgoodsList[e], u = 0 == e, d = r.ObjectUtil.assign({
                curTabIndex: e,
                goTopClass: !1,
                "bubble.isShow": u
            }, this.segmentControl.$data());
            this.setData(d);
            var c = function(r) {
                if (r > 1 && r < s.length) {
                    var a = o.data.tabStatus;
                    a[r] && a[r].offset ? (o.$hideLoading(), setTimeout(function() {
                        o.setData(t({}, "catgoodsList[" + e + "]", n));
                    }, 100)) : (0, _.default)(v.default.mark(function e() {
                        return v.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (e.prev = 0, o.data.isWEntrance || 0 !== r) {
                                    e.next = 5;
                                    break;
                                }
                                o.loadLotteryList(-2, o.lotPageIndex), e.next = 11;
                                break;

                              case 5:
                                if (!(!o.data.isWEntrance && 1 === r || o.data.isWEntrance && 0 === r)) {
                                    e.next = 9;
                                    break;
                                }
                                o.getIndexReqGoodsList(-1, o.recPageIndex, o.getRecommendParams(), o), e.next = 11;
                                break;

                              case 9:
                                return e.next = 11, o.getTabReqGoodsList(r, o);

                              case 11:
                                o.$hideLoading(), e.next = 18;
                                break;

                              case 14:
                                e.prev = 14, e.t0 = e.catch(0), o.$hideLoading(), console.error(e.t0);

                              case 18:
                              case "end":
                                return e.stop();
                            }
                        }, e, this, [ [ 0, 14 ] ]);
                    }));
                } else o.$hideLoading();
            };
            c(e), c(e - 1), c(e + 1), (0 === e && i > 0 || e > 0 && 0 === i) && this.resetInitRect(), 
            this.tryInitImprRect(), this.curImprIndex = 0 === e ? -1 : e;
        }
    },
    getHomeOperationsDetail: _.default.wrap(v.default.mark(function e(t) {
        var a, o;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, this.rawHomeOperations = null, a = r.Request.requestDataWithCmd(O.homeOperations, {}), 
                e.next = 5, r.Request.runMainRequestForPage(a, t);

              case 5:
                return o = e.sent, e.abrupt("return", o);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0), t.setData({
                    "tabStatus[0].showError": !0
                });

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    filterIndexReqGoods: function(e) {
        var t = this;
        if (!e) return [];
        var a = [ o.default.EventType.DEFAULT, o.default.EventType.FREE_GROUP, o.default.EventType.SPIKE, o.default.EventType.SUPER_SPIKE ], s = [];
        return e.forEach(function(e) {
            var i = !0;
            if (a.indexOf(parseInt(e.event_type, 10)) >= 0 && 1 != e.is_app) {
                var n = t.formatIndexGoodsData(e);
                r.User.getShowPortalFreeTrialGoods() || n.eventType !== o.default.EventType.FREE_TRIAL || (i = !1), 
                i && (n.transData = {
                    goodsId: n.goodsId,
                    eventType: n.eventType,
                    preGroupPrice: n.preGroupPrice,
                    preSinglePrice: n.preSinglePrice,
                    preMarketPrice: n.preMarketPrice,
                    goodsName: n.goodsName,
                    customerNum: n.customerNum,
                    ad: n.ad,
                    p_rec: n.p_rec,
                    p_search: n.p_search,
                    listId: "xcx_index_goods_" + t.randomStr
                }, s.push(n));
            }
        }), s;
    },
    formatIndexGoodsData: function(e) {
        var t = {};
        return t.goodsId = e.goods_id, t.normalPrice = T.default.price(parseInt(e.normal_price || 0), 100), 
        t.shortName = e.short_name || "", t.eventType = parseInt(e.event_type), t.isApp = parseInt(e.is_app || "0"), 
        t.goodsName = e.goods_name || "", t.imgUrl = r.ImageUtil.cdnCompress(e.hd_thumb_url), 
        t.customerNum = e.group ? e.group.customer_num : e.customer_num, t.price = T.default.price(parseInt((e.group ? e.group.price : e.price) || 0), 100), 
        t.isFreeTrial = t.eventType === o.default.EventType.FREE_TRIAL, t.soldQuantity = T.default.sales(parseInt(e.cnt || 0)), 
        t.isCompleteLottery = [ o.default.EventType.LUCKY_DRAW, o.default.EventType.FREE_TRIAL, o.default.EventType.CAPITAL_GIFT_LOTTERY, o.default.EventType.DEPOSITE_GROUP ].indexOf(t.eventType) >= 0, 
        t.nationalFlag = e.country ? r.ImageUtil.getCDNImgURL("nation/rect/" + e.country + ".png") : "", 
        t.visibleWidth = e.country ? this.data.visibleWidth - r.Util.rpxToPx(42) : this.data.visibleWidth, 
        t.preMarketPrice = parseInt(e.market_price || 0, 10), t.preGroupPrice = parseInt((e.group ? e.group.price : e.price) || 0, 10), 
        t.preSinglePrice = parseInt(e.normal_price || 0, 10), t.hasMallCoupon = parseInt(e.has_mall_coupon || 0, 10), 
        t.ad = e.ad, t.p_rec = e.p_rec, t;
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset.refer;
        1 !== this.data.curTabIndex || t ? this.forwardGoodDetail(e, "main") : this.forwardGoodDetail(e, "rec"), 
        this.$uploadFormId(e);
    },
    getNavGoodsListTrackingParam: function(e, t, a, o, s, i) {
        var n = this.data.curTabIndex, u = {
            op: e,
            page_element: "goods",
            idx: o
        };
        if ("rec" == s) u.rec_goods_id = t, u.rec_event_type = i, u.page_section = "rec_list", 
        u.page_el_sn = "99085", u.list_id = this.listId; else if ("main" == s && (u.goods_id = t, 
        u.page_section = "opt_goods_list", u.page_el_sn = "98841", u.rec_event_type = i, 
        n > 0)) {
            var d = this.data.homeOperations[n];
            u.opt_id = d.opt_id;
        }
        return a && (a.ad && (u.ad = JSON.stringify(a.ad)), a.p_rec && (u.p_rec = JSON.stringify(a.p_rec)), 
        a.p_search && (u.p_search = JSON.stringify(a.p_search))), u = r.ObjectUtil.assign(u, this.getCommonTrackingParam());
    },
    forwardGoodDetail: function(e, t) {
        var a = e.currentTarget.dataset, o = a.goodsId, s = a.goodsItem, i = a.eventType, n = a.index;
        if (null != o) {
            var u = this.data.catgoodsList[this.data.curTabIndex][n] || {};
            this.transGoodsData = u, this.transGoodsData.preloadImgUrl = u.imgUrl, this.$forward("goods", {
                goods_id: o
            });
        }
        var d = this.getNavGoodsListTrackingParam("click", o, s, n, t, i);
        (0, r.TrackingRecord)(d);
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var a = t.data.curTabIndex || 0, o = t.data.catgoodsList[a] || [];
            if (e < o.length) {
                var s = o[e] || {}, i = void 0;
                i = 1 === t.data.curTabIndex ? "rec" : "main";
                var n = t.getNavGoodsListTrackingParam("impr", s.goodsId, s.transData, e, i, s.eventType);
                (0, r.TrackingRecord)(n);
            }
        });
    },
    delayScrollTop: function(e) {
        setTimeout(function() {
            c.default.goTop(!0);
        }, e);
    },
    onReachBottom: function() {
        if (!this.scrollToLowerlock) {
            this.scrollToLowerlock = !0;
            var e = this.data.curTabIndex;
            this.fillCatgoodsListData(e);
        }
    },
    getCommonTrackingParam: function() {
        var e = {
            page_name: "group_detail",
            page_sn: "10024",
            group_status: this.data.groupState,
            group_role: this.data.groupRole,
            sold_out: this.data.soldOutStr,
            group_order_id: this.groupOrderId
        };
        return this.data.originGroupPrice && (e.goods_price = this.data.originGroupPrice), 
        this.goodsInfo && (e.goods_type = this.goodsInfo.goodsType), e;
    }
};

(0, r.PddPage)(U, {
    pageName: "group",
    pageSn: 10024,
    notUseCommonPV: !0
});
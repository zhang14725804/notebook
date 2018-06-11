function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./util")), a = e(require("./url_util")), i = e(require("./object_util")), r = e(require("./data_util")), s = e(require("./logger_util")), o = e(require("./gotop_util")), n = e(require("./navigation")), u = require("./message"), l = e(require("../configs/page_configs")), d = e(require("../components/toast/toast.js")), c = e(require("../components/modal_dialog/modal_dialog.js")), h = e(require("../components/user_authorize_modal/user_authorize_modal.js")), f = e(require("../components/loading/loading.js")), _ = e(require("../constants/share_info")), g = require("../constants/share"), p = e(require("./logger")), m = e(require("./share")), $ = e(require("./page_util")), v = e(require("../storage/ram_manager")), T = e(require("./request")), b = e(require("../configs/api")), I = e(require("../libs/co/we-index")), y = e(require("../libs/es6-promise.min")), w = e(require("../libs/regenerator-runtime/runtime")), P = e(require("../controller/group")), S = e(require("../constants/tracking/subjects")), k = e(require("../common/system_info")), x = e(require("../controller/formid_controller")), R = e(require("../common/scene_route")), L = e(require("./visitor_logger")), O = function(e, t) {
    p.default.send(e, t);
}, q = function(e) {
    p.default.sendMonitor(e);
}, C = {};

exports.default = function(e, D) {
    var z = (D = D || {}).pageName;
    if (e.notUseCommonPV = D.notUseCommonPV, e.pageSn = D.pageSn, !z) throw new Error("[#[Register]page name(" + z + ") is invalid!]");
    return e.$pageName = z, e.$urlQueryObj = {}, e.$urlQueryStr = "", e.$pageId = 0, 
    e.$firstTimeTrackRecord = {
        pv: !1,
        impr: !1
    }, e.$onInitTime = 0, e.$onLoadTime = 0, e.$onShowTime = 0, e.$onReadyTime = 0, 
    e.$isRecord = !1, e.$carryRefer = !0, e.$referPageName = "", e.$referPageId = "", 
    e.$cacheTitle = "", e.hotRectList = [], e.isActive = !0, e.startTime = 0, e.onShow = t.default.wrapFunc(e.onShow, function() {
        this.startTime = new Date().getTime(), this.$cacheTitle && (wx.setNavigationBarTitle({
            title: this.$cacheTitle
        }), this.$cacheTitle = ""), this.$onShowTime = new Date().getTime(), this.initRectHandler = null, 
        this.isActive = !0;
        var e = this;
        if (v.default.CPSetData = function(t, a) {
            e.setData(t, a);
        }, v.default.CPData = this.data, v.default.CPPage = this, this.checkStayHintModal(), 
        setTimeout(function() {
            e.setData({
                isLoadingImgLoaded: !0
            });
        }, 100), v.default.inTransitionPage.indexOf(z) < 0 ? setTimeout(function() {
            v.default.inTransitionPage = "", v.default.transitionStartTime = 0;
        }, 300) : this.$onInitTime = v.default.transitionStartTime, !this.$isRecord) {
            var t = this.$onInitTime;
            this.$onInitTime || (t = this.$onLoadTime);
            var a = this.$onShowTime - t, i = {
                record_type: "PAGE_INIT_TIME",
                page_name: z,
                begin_time: t,
                end_time: this.$onShowTime,
                response_time: a,
                status: "SUCCESS"
            };
            q(i), this.$isRecord = !0;
        }
        v.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.basePvTracking(!0), 
        v.default.referPageName || (this.$referPageName = "", this.$referPageId = "");
    }), e.basePvTracking = function(t, a) {
        if (!e.notUseCommonPV) {
            var i = {
                op: "pv"
            };
            t && (i.is_back = 1), a && a.refer_page_el_sn && (i.refer_page_el_sn = a.refer_page_el_sn), 
            O(i), this.$firstTimeTrackRecord.pv = !0;
        }
    }, e.onReady = t.default.wrapFunc(e.onReady, function() {
        this.$onReadyTime = Date.now(), v.default.inTransitionPage.indexOf(z) >= 0 && setTimeout(function() {
            v.default.inTransitionPage = "", v.default.transitionStartTime = 0;
        }, 600);
    }), e.onLoad = t.default.wrapFunc(e.onLoad, function(e) {
        if (e.target_page) {
            var t = decodeURIComponent(e.target_page);
            n.default.route(t);
        }
        e._x_zyw && (v.default.elSnArray = e._x_zyw.split("_")), e.scene && (e = i.default.assign(e, R.default.sceneMap(e.scene))), 
        v.default.referPageName && (this.$referPageName = v.default.referPageName, this.$referPageId = v.default.referPageId), 
        this.$pageId = v.default.globalPageId++, this.$onLoadTime = Date.now(), e && (this.$urlQueryObj = a.default.parseQuery(e), 
        this.$urlQueryStr = a.default.buildQuery(this.$urlQueryObj));
        var s = this;
        this.$user_authorize_modal = null, v.default.CPSetData = function(e) {
            s.setData(e);
        }, v.default.CPData = this.data, v.default.CPPage = this, this.$firstShow = !0;
        var o = z;
        this.pageId = [ o || "", Date.now(), r.default.getRandomString(10) ].join("_"), 
        this.basePvTracking(!1, e), this.$requestFinishHandler || (this.$requestFinishHandler = function(e) {
            if (e.pageId === s.$pageId) {
                var t = s.$onInitTime;
                s.$onInitTime || (t = s.$onLoadTime);
                var a = Date.now();
                q({
                    record_type: "PAGE_FINISH_RENDING_TIME",
                    page_name: z,
                    begin_time: t,
                    end_time: a,
                    response_time: a - t,
                    status: "SUCCESS"
                });
            }
        }), u.Message.on(u.KEYS.PAGE_MAIN_REQUEST_FINISHED, this.$requestFinishHandler, !0);
    }), e.$deleteShareInfo = function() {
        for (var e in this.$urlQueryObj) (e.indexOf("share_id") >= 0 || e.indexOf("share_uid") >= 0 || e.indexOf("share_channel") >= 0 || e.indexOf("share_form") >= 0 || e.indexOf("share_btn") >= 0 || e.indexOf("share_cid") >= 0) && delete this.$urlQueryObj[e];
    }, e.$doPageOnExit = function(e) {
        if (this.$deleteShareInfo(), this.$hideUserAuthorizeModal(), this.$firstTimeTrackRecord.pv = !1, 
        this.$firstTimeTrackRecord.impr = !1, v.default.isFromAppOnShow = !1, this.isActive = !1, 
        p.default.triggerSendMutiLog(), !v.default.isFromShare) {
            var t = new Date().getTime() - this.startTime, a = l.default.getUrlMap()[this.$pageName] || {}, r = void 0;
            r = a.path ? a.path : [ "pages", this.$pageName, this.$pageName ].join("/");
            var s = {
                op: "epv",
                sub_op: e ? "leave" : "back",
                page_duration: t,
                page_url: r
            };
            this.$leaveTrackingParams && (s = i.default.assign(s, this.$leaveTrackingParams)), 
            this.getLeaveTrackingParams && (s = i.default.assign(s, this.getLeaveTrackingParams())), 
            O(s);
        }
    }, e.onUnload = t.default.wrapFunc(e.onUnload, function() {
        var e = D.pageName;
        T.default.abortRequestInPage(this, !0, !0), "string" != typeof this.route && "string" != typeof this.__route__ && "string" != typeof e || (this.route || (this.route = this.__route__), 
        this.route || (this.route = "/" + e + "/"), this.route.match(/\/group\//) || this.route.match(/\/order_checkout\//) || (v.default.isLastPagePayPage = !1, 
        v.default.hasPaySucess = !1, v.default.isOrderForbidden = !1, v.default.isLastPageGroupPage = !1)), 
        this.$onInitTime = 0, this.$onLoadTime = 0, this.$onReadyTime = 0, this.$onShowTime = 0, 
        this.$isRecord = !1, u.Message.off(u.KEYS.PAGE_MAIN_REQUEST_FINISHED, this.$requestFinishHandler), 
        this.$requestFinishHandler = null, this.$doPageOnExit(!1);
    }), e.onHide = t.default.wrapFunc(e.onHide, function() {
        this.$firstShow = !1, this.$doPageOnExit(!0), v.default.referPageName = $.default.getCurPageName(), 
        v.default.referPageId = this.pageId, this.$carryRefer = !1, v.default.w_entrance && (v.default.w_entrance = null), 
        e.pageSn ? v.default.referPageSn = e.pageSn : v.default.referPageSn = null;
    }), e.$generateShareContent = function(e) {
        e = e || {};
        var t = this, o = r.default.getRandomString(), n = e.title || _.default.DefaultTitle, l = e.imageUrl || "", d = e.queries || {}, c = e.successCallback, h = e.failCallback, f = e.completeCallback, p = e.path || $.default.getCurPageRoute() || _.default.IndexPageUrl, y = e.referStr || "top_forward", P = e.imageUrl ? "custom_card" : "card";
        e.needGetShareImg && (P = e.shareKey + "_card"), d.share_form && (P = d.share_form), 
        d.refer_share_page = this.$pageName, d.share_form = P, d.refer_share_btn = y, d.share_tips = e.shareIndex;
        var S = L.default.getVisitorLocalInfo();
        S && (d.share_trace_id = S.xcxTraceId), v.default.rpTest && (d.gs_share_test = v.default.rpTest), 
        d.x_scene = v.default.sceneId, this.$urlQueryObj.cid && (d.share_cid = this.$urlQueryObj.cid);
        var k = void 0;
        if (e.target_page) {
            var x = e.target_page + "?" + a.default.buildQuery(m.default.dealWithSharePathQueries(d, {
                shareId: o
            }));
            k = p + "?" + a.default.buildQuery(m.default.dealWithSharePathQueries(Object.assign({}, d, {
                target_page: x,
                target_url: e.target_page
            }), {
                shareId: o
            }));
        } else k = p + "?" + a.default.buildQuery(m.default.dealWithSharePathQueries(d, {
            shareId: o
        }));
        var R = function() {
            var t = {};
            (t = s.default.getData(t)).withoutCompleteOpts = !0;
            var a = {
                op: "event",
                sub_op: "share",
                event: "share_result",
                share_id: o,
                share_channel: g.ShareChannel.AppMessage,
                share_form: P,
                refer_share_btn: y,
                share_url: k
            };
            return null != d.goods_type && (a.goods_type = d.goods_type), null != d.event_type && (a.event_type = d.event_type), 
            null != d.order_sn && (a.order_sn = d.order_sn), null != d.group_order_id && (a.group_order_id = d.group_order_id), 
            null != d.goods_price && (a.goods_price = d.goods_price), null != d.goods_id && (a.goods_id = d.goods_id), 
            null != v.default.rpTest && (a.gs_share_test = v.default.rpTest), null != e.pageSn && (a.page_sn = e.pageSn), 
            null != e.subjectId && (a.subject_id = e.subjectId), null != e.card_id && (a.card_id = e.card_id), 
            null != e.refer_xcx_campaign_newyear && (a.refer_xcx_campaign_newyear = e.refer_xcx_campaign_newyear), 
            null != e.refer_xcx_campaign_red3 && (a.refer_xcx_campaign_red3 = e.refer_xcx_campaign_red3), 
            e.has_answer && (a.has_answer = e.has_answer), e.refer_xcx_campaign_ny_card && (a.refer_xcx_campaign_ny_card = "1"), 
            e.refer_xcx_campaign_crazy_phrase && (a.refer_xcx_campaign_crazy_phrase = "1"), 
            e.refer_xcx_campaign_phone_num && (a.refer_xcx_campaign_phone_num = "1"), e.refer_xcx_campaign_seize_treasure && (a.refer_xcx_campaign_seize_treasure = "1"), 
            null != e.exceeds_limit && (a.exceeds_limit = e.exceeds_limit), null != e.group_full && (a.group_full = e.group_full), 
            null != e.group_overdue && (a.group_overdue = e.group_overdue), null != e.is_helped_this_captain && (a.is_helped_this_captain = e.is_helped_this_captain), 
            a.share_tips = e.shareIndex, t = i.default.assign(t, a);
        }();
        return e.trackingParams && (R = i.default.assign(R, e.trackingParams)), O(R), v.default.isFromShare = !0, 
        {
            title: n,
            path: k,
            imageUrl: l,
            success: function(a) {
                var i = (0, g.getShareResultByErrMsg)(a.errMsg);
                R.share_result = i, R.sub_op = "share_result", wx.login({
                    success: function(t) {
                        wx.getShareInfo && a && a.shareTickets && a.shareTickets[0] ? (e.successCallBack && "function" == typeof e.successCallBack && e.successCallBack(), 
                        wx.getShareInfo({
                            shareTicket: a.shareTickets[0],
                            success: function(e) {
                                var a = {
                                    code: t.code,
                                    iv: e.iv,
                                    encrypted_data: e.encryptedData
                                };
                                (0, I.default)(w.default.mark(function e() {
                                    var t;
                                    return w.default.wrap(function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            return e.prev = 0, e.next = 3, T.default.apiRequest("POST", b.default.getOpenGid, a, !1);

                                          case 3:
                                            t = e.sent, R.open_gid = t.open_gid, "open_envelope" === D.pageName && u.Message.emit(u.KEYS.OPEN_ENVELOPE_GET_OPEN_GID, R.open_gid), 
                                            "group_red_envelope" === D.pageName && u.Message.emit(u.KEYS.GROUP_SIGN_IN_FROM_SHARE_BTN, R.open_gid), 
                                            "red_envelope_help" === D.pageName && u.Message.emit(u.KEYS.RED_ENVELOPE_HELP_FROM_SHARE_BTN, R.open_gid), 
                                            O(R), e.next = 14;
                                            break;

                                          case 11:
                                            e.prev = 11, e.t0 = e.catch(0), console.error(e.t0);

                                          case 14:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e, this, [ [ 0, 11 ] ]);
                                }));
                            },
                            fail: function() {
                                e.failCallBack && "function" == typeof e.failCallBack && e.failCallBack(), O(R);
                            }
                        })) : (e.failCallBack && "function" == typeof e.failCallBack && e.failCallBack(), 
                        O(R));
                    },
                    fail: function() {
                        O(R);
                    }
                }), "function" == typeof c && c.call(t, {
                    res: a,
                    shareResult: i
                });
            },
            fail: function(e) {
                "function" == typeof h && h.call(t, e);
            },
            complete: function(e) {
                "function" == typeof f && f.call(t, {
                    res: e
                });
            }
        };
    }, e.$gbSet = function(e, t) {
        return C[e] = t, this;
    }, e.$gbGet = function(e, t) {
        var a = C[e];
        return t || delete C[e], a;
    }, e.$createPageCacheKey = function(e) {
        return [ e, r.default.getRandomString(10) ].join("-");
    }, e.$forward = function(e, t, a) {
        return this.$route("forward", e, t, a);
    }, e.$redirect = function(e, t, a) {
        return this.$route("redirect", e, t, a);
    }, e.$back = function(e) {
        e = e || 1, this.$route("back", e);
    }, e.$switchTab = function(e, t, a) {
        return this.$route("switchTab", e, t, a);
    }, e.$route = function(e, t, i) {
        switch (e = e || "forward") {
          case "back":
            n.default.route(null, "back", {
                backNum: t || 1
            });
            break;

          default:
            if (!t) throw new Error("[#[route]page name(" + t + ") is invalid!]");
            var r = l.default.getUrlMap()[t] || {}, s = void 0;
            if (s = r.path ? "/" + r.path : "/" + [ "pages", t, t ].join("/"), r.withTabbar && (e = "switchTab"), 
            i) {
                var o = a.default.buildQuery(i);
                o.length > 0 && (s += "?" + o);
            }
            return n.default.route(s, e);
        }
    }, e.$showToast = function(e, t) {
        if (!this.$toast) {
            var a = this;
            this.$toast = new d.default({
                setDataFunc: function(e) {
                    a.setData({
                        $toastData: e
                    });
                }
            });
        }
        e && this.$toast.setText(e).show(t);
    }, e.$showModal = function(e) {
        if (!this.$modalDialog) {
            var t = this;
            this.$modalDialog = new c.default({
                setDataFunc: function(e) {
                    t.setData({
                        $modalData: e
                    });
                }
            });
        }
        e && this.$modalDialog.show(e);
    }, e.$showLoading = function() {
        if (!this.$loading) {
            var e = this;
            this.$loading = new f.default({
                setDataFunc: function(t) {
                    e.setData({
                        $loadingData: t
                    });
                }
            });
        }
        this.$loading.show();
    }, e.$hideLoading = function() {
        this.$loading && this.$loading.hide();
    }, e.$goToTop = function(e) {
        e.currentTarget.dataset.diy ? this.goTop() : o.default.goTop(!1);
    }, e.$componentsAddRootFunc = function(e, t) {
        e && "function" == typeof t && (this[e] = t);
    }, e.preventTouchMove = function() {}, e.$showUserAuthorizeModal = function(e, t) {
        var a = this;
        this.$user_authorize_modal || (this.$user_authorize_modal = new h.default({
            setDataFunc: function(e) {
                a.setData({
                    $userAuthorizeModalData: e
                });
            }
        })), this.$user_authorize_modal.show(), this.user_authorize_success_cb = e, this.user_authorize_fail_cb = t, 
        O(S.default.authRecallImprParams), this.authorizeShowCallback && this.authorizeShowCallback();
    }, e.$hideUserAuthorizeModal = function() {
        this.$user_authorize_modal && this.$user_authorize_modal.isAuthorizeModalVisible() && (this.$user_authorize_modal.hide(), 
        this.authorizeHideCallback && this.authorizeHideCallback(), "function" == typeof this.user_authorize_fail_cb && this.user_authorize_fail_cb());
    }, e.$userAuthorizeModelCancelClicked = function() {
        this.$user_authorize_modal && (this.$user_authorize_modal.hide(), this.authorizeHideCallback && this.authorizeHideCallback()), 
        "function" == typeof this.user_authorize_fail_cb && this.user_authorize_fail_cb(), 
        O(S.default.authRecallRefuseParams);
    }, e.$userAuthorizeModelOkClicked = function() {
        this.$user_authorize_modal && (this.$user_authorize_modal.hide(), this.authorizeHideCallback && this.authorizeHideCallback()), 
        O(S.default.authRecallApproveParams);
        var e = i.default.assign({}, S.default.authPromptParams, {
            refer_page_element: "approve"
        });
        O(e);
    }, e.$userAuthorizeModelConfirmClicked = function(e) {
        if (this.$user_authorize_modal && this.$user_authorize_modal.hide(), e.detail.userInfo) {
            "function" == typeof this.user_authorize_success_cb && this.user_authorize_success_cb(e.detail);
            var t = i.default.assign({}, S.default.authApproveParams, {
                refer_page_element: "approve"
            });
            O(t);
        } else {
            "function" == typeof this.user_authorize_fail_cb && this.user_authorize_fail_cb({
                wx_deny: !0
            });
            var a = i.default.assign({}, S.default.authRefuseParams, {
                refer_page_element: "approve"
            });
            O(a);
        }
    }, e.$uploadFormId = function(e, t) {
        if (e && e.detail && e.detail.formId) {
            var a = void 0 === t || t;
            e.detail.target.dataset && e.detail.target.dataset.noMarket && (a = !1), x.default.uploadFormIdToSH(e.detail.formId, a);
        }
    }, e.$setTrackingKeyParams = function(e) {
        for (var t in e) e.hasOwnProperty(t) && null == e[t] && delete e[t];
        this.$trackingKeyParams = this.$trackingKeyParams || {}, this.$trackingKeyParams = i.default.assign(this.$trackingKeyParams, e);
    }, e.checkStayHintModal = function() {
        var e = v.default.showUnpaidOrderDialog, t = v.default.isLastPagePayPage, a = v.default.hasPaySucess, i = v.default.isOrderForbidden, r = v.default.isLastPageGroupPage, s = v.default.lastGroupOrderId, o = v.default.lastOrderGoodsId, n = v.default.isLastGroupNotEnough, u = v.default.showNotEnoughGroupDialog, l = v.default.hadGroupShareArray, d = v.default.lastOrderSn, c = this, h = this.$urlQueryObj.goods_id, f = this.$urlQueryObj.is_from_deposit;
        !h && this.data.goodsInfo && this.data.goodsInfo.goodsId && (h = this.data.goodsInfo.goodsId), 
        !e || !t || a || i || h != v.default.lastPayGoodsId || f || (this.$showModal({
            title: "确定要放弃付款吗？",
            content: "你尚未完成支付，喜欢的商品可能会被抢空哦~",
            cancelText: "暂时放弃",
            confirmText: "继续支付",
            reportFormId: !0,
            success: function(e) {
                if (e.confirm) {
                    v.default.showUnpaidOrderDialog = !1;
                    var t = v.default.hasCreatedOrder, a = v.default.lastOrderSn, i = v.default.lastOrderCheckoutOptions;
                    t && a.length > 0 ? c.$forward("order", {
                        ordersn: a
                    }) : c.$forward("order_checkout", i), O({
                        op: "click",
                        event: "paying_btn_click",
                        page_name: "goods" == z ? "goods_detail" : z,
                        page_element: "paying_btn",
                        page_section: "unpaid_popup",
                        goods_id: h,
                        page_el_sn: 99891,
                        order_sn: a || ""
                    });
                } else e.cancel && (v.default.showUnpaidOrderDialog = !1, O({
                    op: "click",
                    event: "give_up_btn_click",
                    page_name: "goods" == z ? "goods_detail" : z,
                    page_element: "give_up_btn",
                    page_section: "unpaid_popup",
                    goods_id: h,
                    page_el_sn: 99893,
                    order_sn: d || ""
                }));
            }
        }), O({
            op: "impr",
            page_section: "unpaid_popup",
            goods_id: h,
            order_sn: d || ""
        })), "goods" === z && r && n && u && -1 === l.indexOf(s) && h == o && (this.$showModal({
            title: "",
            content: "您有一个未成团的商品，邀请好友参团才能大大提高成团率哦~",
            cancelText: "关闭",
            confirmText: "去邀请好友",
            reportFormId: !0,
            success: function(e) {
                e.confirm ? (v.default.showNotEnoughGroupDialog = !1, c.$forward("group", {
                    group_order_id: s
                }), O({
                    op: "click",
                    event: "invite_popup_click",
                    page_section: "invite_popup",
                    page_name: "goods_detail",
                    page_element: "invent_btn",
                    goods_id: h
                })) : e.cancel && (v.default.showNotEnoughGroupDialog = !1, O({
                    op: "click",
                    event: "invite_popup_click",
                    page_section: "invite_popup",
                    page_name: "goods_detail",
                    page_element: "close_btn",
                    goods_id: h
                }));
            }
        }), O({
            op: "impr",
            page_name: "goods_detail",
            page_section: "invite_popup",
            goods_id: h
        }));
    }, e.isOverTime = function(e) {
        var t = new Date().getTime();
        if (this.imprList[e]) {
            var a = this.imprList[e];
            return Math.abs(parseInt(t) - parseInt(a)) > 300 && (this.imprList[e] = t, !0);
        }
        return this.imprList[e] = t, !0;
    }, e.calcItems = function(e) {
        if (this.isInit) {
            for (var t = k.default.getWindowHeightSync(), a = this, i = new Array(), r = 0, s = 1, o = this.top, n = e, u = e + t; ;) {
                var l = function(e) {
                    for (var t = 0; t < a.hotRectList.length; ++t) if (a.hotRectList[t].position === e) return a.hotRectList[t];
                    return null;
                }(r);
                if (l) o += l.height, s = 1; else {
                    if (o > n) if (o + this.itemHeight < u) this.isOverTime(r) && i.push(r); else {
                        if (o > u) break;
                        if (!(Math.abs(o - u) / this.itemHeight >= .75)) break;
                        this.isOverTime(r) && i.push(r);
                    } else o + this.itemHeight > n && Math.abs(o - n) / this.itemHeight <= .25 && this.isOverTime(r) && i.push(r);
                    s === this.columns ? (s = 1, o += this.itemHeight) : s += 1;
                }
                r += 1;
            }
            if (i.length > 0) {
                for (var d = new Array(), c = 0; c < i.length; ++c) (function(e, t) {
                    for (var a = 0; a < e.length; ++a) if (e[a] === t) return !0;
                    return !1;
                })(this.lastImprList, i[c]) || d.push(i[c]);
                this.lastImprList = i, "function" == typeof this.callback && d.length > 0 && this.callback(d);
            }
        }
    }, e.isInitRect = function() {
        return this.isInit;
    }, e.resetInitRect = function() {
        this.initRectHandler && (clearTimeout(this.initRectHandler), this.initRectHandler = null), 
        this.isInit = !1, this.lastImprList = [], this.hotRectList = [];
    }, e.clearLastImprList = function() {
        this.lastImprList = [];
    }, e.tryInitImprRect = function(e) {
        var t = this;
        this.isInit || this.initRectHandler || (this.initRectHandler = setTimeout(function() {
            wx.canIUse && wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().selectAll("#impr-id").boundingClientRect(function(a) {
                a.length > 0 ? (t.initRect(a, function(e) {
                    t.isActive && t.imprItems(e);
                }, e), t.initRectHandler = null) : t.tryInitImprRect();
            }).exec();
        }, 500));
    }, e.insertHotRect = function(e) {
        for (var t = 0; t < this.hotRectList.length; ++t) if (this.hotRectList[t].position === e.position) return;
        this.hotRectList.push(e), this.isInit && this.initHotRect();
    }, e.initHotRect = function() {
        for (var e = this, t = 0, a = 0; a < this.hotRectList.length; ++a) {
            var i = this.hotRectList[a], r = i.position, s = function(e) {
                for (var t = 0, a = 0; a < e.picture_layers.length; ++a) t += e.picture_layers[a].imgHeight;
                return t;
            }(i);
            i.height = s, i.oriTop = function(t, a, i, r) {
                var s = 0;
                return 0 === a ? (s = 0, e.top = e.oriTop - r) : s = (a - i) / e.columns * e.itemHeight + t, 
                s;
            }(t, r, a, s), t += s;
        }
    }, e.initRect = function(e, t, a) {
        if (e && 0 != e.length && !this.isInit) {
            var i = e[0], r = i.height || 0, s = i.top;
            if (0 !== r) {
                for (var o = 1, n = 1; n < e.length && e[n].top === s; ++n) o += 1;
                this.top = s, this.oriTop = s, this.itemHeight = r, this.columns = o, this.callback = t, 
                this.isInit = !0, this.imprList = {}, this.lastImprList = [], a && (this.top += a), 
                this.initHotRect(), this.calcItems(0);
            }
        }
    }, e.updateScrollTop = function(e) {
        if (this.isInit) {
            this.timeOut && clearTimeout(this.timeOut);
            var t = this;
            this.timeOut = setTimeout(function() {
                t.calcItems(e);
            }, 100);
        }
    }, e.$onBubbleClicked = function(e) {
        var t = e.currentTarget.dataset;
        t && O({
            op: "click",
            event: "bubble_clk",
            page_element: "bubble",
            bubble_id: t.groupOrderId
        });
    }, e.$subjectBtnShowHide = function(e) {
        var t = (e.currentTarget.dataset || {}).setStatus, a = this;
        this.sucjectBtnLock || (this.sucjectBtnLock = !0, setTimeout(function() {
            a.sucjectBtnLock = !1;
        }, 1e3), "hide" === t ? this.setData({
            subjectShareBtnStatus: "show"
        }) : this.setData({
            subjectShareBtnStatus: "hide"
        }));
    }, e.$onLoadingImgLoaded = function() {
        this.setData({
            isLoadingImgLoaded: !0
        });
    }, e.$setTitle = function(e) {
        v.default.CPPage == this ? wx.setNavigationBarTitle({
            title: e
        }) : this.$cacheTitle = e;
    }, e.$encodeAlias = function(e) {
        var t = T.default.requestDataWithUrl("GET", b.default.encodeAlias, e, !0, {
            forceUseApiGZ: !0
        });
        return T.default.runSecondaryRequestForPage(t, this);
    }, e.$decodeAlias = function() {
        var e = this;
        return new y.default(function(t, r) {
            var s = e.$urlQueryObj, o = s._p || s.p || s.__p;
            if (o) {
                var n = {
                    alias: o
                }, u = T.default.requestDataWithUrl("GET", b.default.decodeAlias, n, !0, {
                    forceUseApiGZ: !0
                });
                T.default.runSecondaryRequestForPage(u, e).then(function(r) {
                    var s = r ? a.default.parseUrlQueryStr(r) : {};
                    e.$urlQueryObj = i.default.assign(e.$urlQueryObj, s), t(r);
                }).catch(function() {
                    r();
                });
            } else t("");
        });
    }, e.$requestLocalGroup = function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r = this;
        this.reqGoodsList || (this.reqGoodsList = []), t.length > 0 && (this.reqGoodsList = this.reqGoodsList.concat(t)), 
        0 != this.reqGoodsList.length && (this.localGroupHanler || (this.localGroupHanler = setInterval(function() {
            if (e.data.clickEnable) {
                var t = [], s = void 0;
                s = e.reqGoodsList.length > 20 ? e.reqGoodsList.splice(e.reqGoodsList.length - 20, 20) : e.reqGoodsList.splice(0, e.reqGoodsList.length), 
                0 == e.reqGoodsList.length && (clearInterval(e.localGroupHanler), e.localGroupHanler = null), 
                s.forEach(function(e) {
                    t.push(e.goodsId);
                }), (0, I.default)(w.default.mark(function e() {
                    var s;
                    return w.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, P.default.loadLocalGroups(t, {}, r);

                          case 2:
                            s = e.sent, s = i.default.assign(s, r.data.localGroupsMap || {}), a ? r.setData({
                                localGroupsMap: s
                            }) : r.data.localGroupsMap = s;

                          case 5:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
            }
        }, 50)));
    }, Page(e), e;
};
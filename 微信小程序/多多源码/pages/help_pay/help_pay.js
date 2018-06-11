function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/url_util")), r = e(require("../../common/std_format")), a = require("../../common/index"), s = e(require("../../configs/api")), o = e(require("../../common/request")), i = e(require("../../models/format/grid_item_goods")), n = e(require("../../storage/user_storage")), d = e(require("../../storage/ram_manager")), c = e(require("../../libs/co/we-index")), u = e(require("../../libs/regenerator-runtime/runtime")), l = e(require("../../common/payment")), p = e(require("../../constants/payment")), g = e(require("../../common/gotop_util")), h = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), f = e(require("../../configs/request_errors")), m = {
    isOrderOwner: {
        waitePay: {
            statusDesc: "我在拼多多上找到了很赞的商品，快来帮我付款吧~",
            btnText: "",
            bottomDesc: "如果订单发生退款，已支付金额将原路退还好友"
        },
        payed: {
            statusDesc: "我在拼多多上找到了很赞的商品，快来帮我付款吧~",
            btnText: ""
        },
        canceled: {
            statusDesc: "我在拼多多上找到了很赞的商品，快来帮我付款吧~",
            btnText: ""
        }
    },
    isNotOrderOwner: {
        waitePay: {
            statusDesc: "我在拼多多上找到了很赞的商品，快来帮我付款吧~",
            btnText: "立即支付"
        },
        payed: {
            statusDesc: "订单已经支付了，去试试0.01元抢好货吧~",
            btnText: "¥  0.01  抢好货",
            bottomDesc: "记得提醒好友，成团后才会发货哦~"
        },
        canceled: {
            statusDesc: "来晚啦，订单已经取消，先去试试0.01元抢好货吧~",
            btnText: "¥  0.01  抢好货"
        }
    }
};

(0, a.PddPage)({
    urlParams: {},
    requestingSubjectLock: !1,
    subjectReqData: {
        app_name: "friend_pay",
        page: 1,
        count: 20,
        list_id: "xcx_fp_list_" + a.DataUtil.getRandomString(6)
    },
    isFirstLoad: !0,
    allGoodsListCache: [],
    data: {
        isLoadingMore: !1,
        list: [],
        size: 20,
        page: 1,
        hidePage: !0,
        showSendEnvelope: !1,
        showRuleModal: !1,
        showShareModal: !1,
        showInvite: !1,
        showConfirmModal: !1,
        goodsList: [],
        canGoodsLoadMore: !0,
        statusSeal: null,
        showOrderInfo: !1
    },
    onShareAppMessage: function(e) {
        var t = this.data.orderInfo || {}, r = {
            order_sn: this.orderSn,
            uid: this.data.orderInfo.uid,
            goods_id: t.goodsId,
            event_type: t.eventType,
            group_order_id: t.groupOrderId
        }, s = this, o = "top_forward";
        e && "menu" != e.from && (o = "share_btn");
        var i = {
            title: "考验我们感情的时候到了，帮我付个款吧~",
            referStr: o,
            queries: r,
            successCallback: function() {
                s.$showToast("转发成功，可继续发送给其他好友");
            }
        };
        t.isOrderOwner || 1 != t.groupStatus || (i.path = "pages/order/order?friend_pay=true&group_status=" + t.groupStatus + "&ordersn=" + t.orderSn, 
        i.title = "团已满，赶紧重开新团，我来买单！");
        var n = e && e.target && e.target.dataset || {}, d = this.getTrackingParams("click", "main", n.from);
        return (0, a.TrackingRecord)(d), this.$generateShareContent(i);
    },
    onLoad: function(e) {
        var r = this, a = {};
        e && (a = t.default.parseQuery(e)), r.orderSn = a.order_sn, r.pvTracking(), r.loadPage(), 
        r.$showLoading(), r.quickEntryControl = new h.default({
            page: r,
            ns: "quickEntryControl"
        });
    },
    loadPage: function() {
        this.getOrderInfo(), this.fillListData();
    },
    onShow: function() {
        var e = this;
        e.isFirstLoad || e.getOrderInfo(), d.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    getOrderInfo: function() {
        var e = this;
        (0, c.default)(u.default.mark(function t() {
            var r;
            return u.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, e.getOrderInfoData(e);

                  case 3:
                    r = t.sent, e.processOrderInfo(r), t.next = 10;
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
    expire: function() {
        var e = this;
        if (e.expireTime >= 0) {
            var t = a.TimeUtil.transferToTime(1e3 * e.expireTime).split(":");
            e.setData({
                expireTimeList: t
            }), 0 == e.expireTime && (clearInterval(e.countExpire), e.getOrderInfo());
        } else clearInterval(e.countExpire);
    },
    onHide: function() {
        this.countExpire && clearInterval(this.countExpire);
    },
    onUnload: function() {
        this.countExpire && clearInterval(this.countExpire);
    },
    processOrderInfo: function(e) {
        if (e) {
            var t = {
                goodsId: e.goods_id,
                eventType: e.event_type,
                avatar: e.avatar,
                gender: e.gender,
                goodsName: e.goods_name,
                groupStatus: e.group_status,
                nickname: e.nickname,
                orderAmount: r.default.price(e.order_amount, 100),
                orderSn: e.order_sn,
                serverTime: e.server_time,
                status: e.status,
                thumbUrl: e.thumb_url,
                uid: e.uid,
                groupOrderId: e.group_order_id,
                orderTime: e.order_time
            };
            if (0 == t.status && 0 == t.groupStatus && (this.expireTime = t.orderTime + 86400 - t.serverTime, 
            this.expireTime > 0)) {
                this.expire();
                var a = this;
                a.countExpire && (clearInterval(a.countExpire), a.countExpire = null), a.countExpire = setInterval(function() {
                    a.expireTime--, a.expire();
                }, 1e3);
            }
            if (this.userId || (this.userId = n.default.getUserId()), this.userId == t.uid) t.isOrderOwner = !0; else {
                t.isOrderOwner = !1;
                var s = n.default.getUserLocalInfo();
                s && s.nickName && (this.friendName = s.nickName);
            }
            var o = void 0, i = "", d = "", c = "", u = "", l = "", p = !1;
            if (t.isOrderOwner) {
                var g = m.isOrderOwner;
                0 == t.status ? (i = g.waitePay.statusDesc, c = g.waitePay.bottomDesc, 1 == t.groupStatus && (o = "seal_full", 
                u = "price_cancel", c = "该团已满，无法支付，请重新开团购买商品", d = "重新开团")) : t.status >= 1 && t.status <= 6 ? (o = "seal_success", 
                i = g.payed.statusDesc, l = "好友已帮您代付成功！成团后才会发货哦~", d = "查看拼团详情", c = g.waitePay.bottomDesc) : 7 == t.status && (o = "seal_cancel", 
                i = g.canceled.statusDesc, u = "price_cancel", p = !0, l = "您已取消订单，或者超时未支付");
            } else {
                var h = m.isNotOrderOwner, f = this.friendName ? this.friendName + "，" : "";
                p = !0, 0 == t.status ? (i = f + h.waitePay.statusDesc, d = h.waitePay.btnText, 
                c = "showPayBottomDesc", 1 == t.groupStatus && (i = f + "我正在拼多多拼这个商品，帮我付款吧~如果团满了，记得通知我重新开团哦", 
                o = "seal_full", d = h.payed.btnText, c = null, u = "price_cancel", l = "该团已满，无法支付，请通知好友重新开团")) : t.status >= 1 && t.status <= 6 ? (o = "seal_success", 
                i = f + h.payed.statusDesc, d = h.payed.btnText, c = h.payed.bottomDesc) : 7 == t.status && (o = "seal_cancel", 
                i = f + h.canceled.statusDesc, d = h.canceled.btnText, u = "price_cancel", l = "好友已取消订单，或者超时未支付");
            }
            t.statusDesc = i, t.btnText = d, t.bottomDesc = c, t.priceColor = u, t.middleDesc = l, 
            this.$hideLoading(), this.setData({
                orderInfo: t,
                showOrderInfo: !0,
                statusSeal: o,
                showRecGoodsList: p,
                expireTimeList: this.expireTimeList
            }), this.userHandleLock = !1, this.isFirstLoad = !1;
        }
    },
    btnClick: function(e) {
        var t = this.data.orderInfo, r = void 0, s = {};
        if (0 == t.status) if (0 == t.groupStatus) {
            var o = this;
            s.market = !0, a.User.requireLogin(function() {
                o.doPay();
            }, function() {}), r = this.getTrackingParams("click", "main", "pay_btn");
        } else 1 == t.groupStatus && (this.$forward("order", {
            ordersn: t.orderSn,
            friend_pay: !0,
            group_status: t.groupStatus
        }), s.market = !1, r = this.getTrackingParams("click", "main", "open_btn")); else t.isOrderOwner && (t.status >= 1 || t.status <= 6) ? (this.$forward("group", {
            group_order_id: t.groupOrderId
        }), s.market = !0, r = this.getTrackingParams("click", "main", "group_detail")) : (this.$forward("subject", {
            subject_id: "2742"
        }), s.market = !0, r = this.getTrackingParams("click", "main", "going_draw"));
        (0, a.TrackingRecord)(r), this.$uploadFormId(e, s.market);
    },
    btnClickSubmit: function(e) {
        var t = {}, r = this.data.orderInfo;
        r.isOrderOwner && 0 == r.status && 0 == r.groupStatus ? t.market = !1 : r.isOrderOwner || 0 != r.status || 1 != r.groupStatus || (t.market = !0), 
        this.$uploadFormId(e, t.market);
    },
    doPay: function() {
        var e = this;
        e.userHandleLock || (e.userHandleLock = !0, l.default.pay(e.orderSn, function() {
            var t = s.default.orderPayCheck + "?order_sn=" + e.orderSn;
            o.default.apiRequest("GET", t), e.getOrderInfo();
            var r = {
                sub_op: "pay_order",
                friend_pay: !0
            }, i = e.getTrackingParams("event", null, null, r);
            delete i.pay_status, (0, a.TrackingRecord)(i);
        }, function() {
            e.getOrderInfo();
        }, function(t) {
            p.default.isCancelPay(t.errMsg) && e.getOrderInfo(), e.userHandleLock = !1;
        }));
    },
    getOrderInfoData: c.default.wrap(u.default.mark(function e(t) {
        var r, i, n;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, r = a.DataUtil.formatByPos(s.default.getFriendPayOrderInfo, t.orderSn), 
                i = o.default.requestDataWithUrl("GET", r, null, !1), e.next = 5, o.default.runMainRequestForPage(i, this);

              case 5:
                return n = e.sent, e.abrupt("return", n);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), e.t0.error_code && (t.$showToast(f.default.errors[e.t0.error_code]), 
                t.$hideLoading());

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    getSubjectGoodsData: c.default.wrap(u.default.mark(function e(t) {
        var r, a, n, d, c, l;
        return u.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !t.requestingSubjectLock && t.data.canGoodsLoadMore) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                return t.requestingSubjectLock = !0, r = t.subjectReqData, a = {
                    list_id: r.list_id,
                    app_name: r.app_name,
                    offset: (r.page - 1) * r.count,
                    count: r.count
                }, e.next = 8, o.default.apiRequest("GET", s.default.tesla, a, !0);

              case 8:
                n = e.sent, d = n.data || [], c = d.length <= 0, l = d.map(function(e) {
                    return i.default.formatData(e);
                }), t.processSubjectsGoods({
                    goodsList: l,
                    isLoadAll: c,
                    page: r.page
                }), e.next = 17;
                break;

              case 14:
                e.prev = 14, e.t0 = e.catch(0), console.error(e.t0);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 14 ] ]);
    })),
    processSubjectsGoods: function(e) {
        this.requestingSubjectLock = !1, this.allGoodsListCache = Array.isArray(this.allGoodsListCache) ? this.allGoodsListCache : [], 
        this.allGoodsListCache = Array.isArray(e.goodsList) ? this.allGoodsListCache.concat(e.goodsList) : this.allGoodsListCache, 
        this.allGoodsListCache = a.DataUtil.objectArrayDuplicateRemove(this.allGoodsListCache, "goodsId", function(e) {
            return 1 == e.isApp;
        }) || [], this.fillListData(1 === e.page), this.subjectReqData.page++, this.setData({
            loadMoreVisible: !0,
            canGoodsLoadMore: !e.isLoadAll
        });
    },
    onReachBottom: function() {
        !1 !== this.data.canGoodsLoadMore && this.fillListData();
    },
    fillListData: function(e) {
        var t = this.allGoodsListCache || [], r = this.data.goodsList || [];
        e && (r = []);
        var a = r.length;
        t.length > a ? (this.renderListDataFn(a, r, t), this.tryInitImprRect(this.scrollTop)) : this.getSubjectGoodsData(this);
    },
    renderListDataFn: function(e, t, r) {
        var a = t.length + (0 === e ? 6 : 20);
        t = r.slice(0, a), this.setData({
            goodsList: t
        });
    },
    gotoGoodsDetail: function(e) {
        var t = e.currentTarget.dataset, r = t.index, s = t.eventType, o = t.goodsId;
        this.$forward("goods", {
            goods_id: o
        });
        var i = {
            rec_goods_id: o,
            rec_event_type: s,
            idx: r
        }, n = this.getTrackingParams("click", "rec_list", "goods", i);
        (0, a.TrackingRecord)(n), this.$uploadFormId(e);
    },
    onPageScroll: function(e) {
        var t = parseInt(e.scrollTop);
        this.scrollTop = t, g.default.showGoTopBtn(t, this), this.updateScrollTop(this.scrollTop);
    },
    imprItems: function(e) {
        var t = this;
        e.forEach(function(e) {
            var r = t.data.goodsList[e] || {}, s = {
                rec_goods_id: r.goodsId,
                rec_event_type: r.eventType,
                idx: e
            }, o = t.getTrackingParams("impr", "rec_list", "goods", s);
            (0, a.TrackingRecord)(o);
        });
    },
    getTrackingParams: function(e, t, r, s) {
        var o = this.data.orderInfo || {}, i = {
            op: e,
            page_section: t,
            page_element: r,
            goods_id: o.goodsId,
            event_type: o.eventType,
            order_sn: this.orderSn,
            group_order_id: o.groupOrderId,
            group_status: o.groupStatus,
            order_amount: 100 * o.orderAmount,
            pay_status: o.status
        };
        if ("rec_list" == t) {
            i.list_id = this.subjectReqData.list_id, i.page_el_sn = "99084";
            var n = s.idx, d = this.data.goodsList[n] || {};
            d.transData && (d.transData.ad && (i.ad = JSON.stringify(d.transData.ad)), d.transData.p_rec && (i.p_rec = JSON.stringify(d.transData.p_rec)));
        }
        return s && (i = a.ObjectUtil.assign(i, s)), i = a.ObjectUtil.assign(i, this.getCommonTrackingParam());
    },
    pvTracking: function(e) {
        var t = {
            op: "pv",
            order_sn: this.$urlQueryObj.order_sn,
            group_order_id: this.$urlQueryObj.group_order_id,
            page_url: "pages/help_pay/help_pay"
        };
        e && (t.is_back = 1), (0, a.TrackingRecord)(a.ObjectUtil.assign(t, this.getCommonTrackingParam())), 
        this.$firstTimeTrackRecord.pv = !0;
    },
    getCommonTrackingParam: function() {
        return {
            page_name: "help_pay",
            page_sn: "10126"
        };
    }
}, {
    pageName: "help_pay",
    pageSn: 10126,
    notUseCommonPV: !0
});
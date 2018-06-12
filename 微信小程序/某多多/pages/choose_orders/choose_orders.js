function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = require("../../common/index"), t = e(require("../../configs/api")), s = require("../../controller/custom_service"), a = e(require("../../common/navigation")), o = e(require("../../common/gotop_util")), n = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), i = e(require("../../libs/regenerator-runtime/runtime")), d = {
    page: 1,
    nextOffset: 0,
    inRequest: {},
    data: {
        ordersList: [],
        canLoadMore: null,
        goTopClass: !1
    },
    onLoad: function(e) {
        var r = this, t = "自助服务";
        this.$showLoading(), t = "refund_goods" == e.operate ? "请选择要退货退款的订单" : "refund_money" == e.operate ? "请选择要退款的订单" : "请选择要催发货的订单", 
        r.operate = e.operate, wx.setNavigationBarTitle({
            title: t
        }), this.operate = e.operate, this.requestOrders();
    },
    requestOrders: function() {
        var e = this, a = r.DataUtil.formatByPos(t.default.selfServiceOrders, this.operate, "606", this.page, 20, this.nextOffset);
        (0, n.default)(i.default.mark(function r() {
            var t;
            return i.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return r.prev = 0, r.next = 3, s.SelfService.requestOrders(a);

                  case 3:
                    (t = r.sent) && e.processOrdersList({
                        that: e,
                        reqFlag: a,
                        ordersList: t.formatData,
                        ordersListInfo: t.data,
                        loadAll: t.formatData.length < 20
                    }), r.next = 10;
                    break;

                  case 7:
                    r.prev = 7, r.t0 = r.catch(0), console.error(r.t0);

                  case 10:
                  case "end":
                    return r.stop();
                }
            }, r, this, [ [ 0, 7 ] ]);
        }));
    },
    processOrdersList: function(e) {
        var r = e.that;
        if (r.inRequest[e.reqFlag] = !1, r.$hideLoading(), e.ordersListInfo.errorCode) r.$showToast(e.ordersListInfo.errorMsg); else {
            r.nowPage = e.reqFlag;
            var t = r.data.ordersList || [];
            if (e.ordersList.length > 0) r.nextOffset = e.ordersListInfo.next_offset || 0, r.page = e.loadAll ? r.page : r.page + 1, 
            r.setData({
                ordersList: t.concat(e.ordersList || []),
                canLoadMore: !e.loadAll
            }); else if (r.setData({
                canLoadMore: !1
            }), t.length <= 0) {
                var s = "您暂无此类订单";
                s = "refund_goods" == r.operate ? "当前暂无可退货退款订单" : "refund_money" == r.operate ? "当前暂无可退款订单" : "当前暂无待发货订单", 
                r.$showToast(s);
            }
        }
    },
    notFundOrders: function() {
        r.Util.toWeb({
            page_name: "qa_detail",
            id: 89
        }, this);
    },
    requestOrderInfo: n.default.wrap(i.default.mark(function e(t, s) {
        var a, o;
        return i.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = "order/" + s, e.next = 4, r.Request.apiRequest("GET", a);

              case 4:
                return o = e.sent, e.abrupt("return", o);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    clickOrders: function(e) {
        this.clickOrdersSku(e);
    },
    requestServiceTicket: n.default.wrap(i.default.mark(function e(s) {
        var a, o;
        return i.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = t.default.selfServiceTicket, e.next = 4, r.Request.apiRequest("POST", a, {
                    order_sn: s
                });

              case 4:
                return o = e.sent, e.abrupt("return", o);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    clickOrdersSku: function(e) {
        var t = this, s = e.currentTarget.dataset;
        if (s) {
            var o = s.index, d = this.data.ordersList[o], u = d.order_sn;
            if (null == u || u.length <= 0) return;
            (0, n.default)(i.default.mark(function e() {
                var s, o, n, c, l, f, p, g;
                return i.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, t.requestServiceTicket(u);

                      case 3:
                        if (!(s = e.sent).ticket_id) {
                            e.next = 8;
                            break;
                        }
                        t.$showModal({
                            title: "",
                            content: "您对该订单申请过自助服务，是否查看？",
                            cancelText: "取消",
                            confirmText: "查看",
                            success: function(e) {
                                e.confirm && t.$forward("selfMessageProgress_detail", {
                                    ticketId: s.ticket_id
                                });
                            }
                        }), e.next = 23;
                        break;

                      case 8:
                        if ("push_delivery" != t.operate) {
                            e.next = 14;
                            break;
                        }
                        o = r.UrlUtil.buildQuery({
                            order_sn: u,
                            tel: d.mobile,
                            type_id: 48
                        }), n = "/pages/self_message/self_message?" + o, a.default.forward(n), e.next = 23;
                        break;

                      case 14:
                        if ("退款处理中" != d.order_status_desc) {
                            e.next = 19;
                            break;
                        }
                        "refund_goods" == t.operate && (c = r.UrlUtil.buildQuery({
                            order_sn: u,
                            tel: d.mobile,
                            type_id: 46
                        }), l = "/pages/self_message/self_message?" + c, a.default.forward(l)), "refund_money" == t.operate && (f = r.UrlUtil.buildQuery({
                            order_sn: u,
                            tel: d.mobile,
                            type_id: 47
                        }), p = "/pages/self_message/self_message?" + f, a.default.forward(p)), e.next = 23;
                        break;

                      case 19:
                        return e.next = 21, t.requestOrderInfo(t, u);

                      case 21:
                        g = e.sent, r.Util.toWeb({
                            page_name: "refund_money",
                            order_sn: u,
                            after_sales_trigger: g.after_sales_trigger,
                            after_sales_type: "apply"
                        }, t);

                      case 23:
                        e.next = 28;
                        break;

                      case 25:
                        e.prev = 25, e.t0 = e.catch(0), console.error(e.t0);

                      case 28:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 25 ] ]);
            }));
        }
    },
    loadMoreList: function() {
        this.data.canLoadMore && this.requestOrders();
    },
    onReachBottom: function() {
        this.loadMoreList();
    },
    onPageScroll: function(e) {
        var r = parseInt(e.scrollTop, 10);
        o.default.showGoTopBtn(r, this);
    }
};

(0, r.PddPage)(d, {
    pageName: "choose_orders",
    pageSn: 10171
});
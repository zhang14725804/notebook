function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = require("../../common/index"), t = require("../../controller/custom_service"), s = e(require("../../configs/api")), a = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), o = e(require("../../libs/regenerator-runtime/runtime")), i = {
    page: 1,
    nextOffset: 0,
    inRequest: {},
    data: {
        selfServiceList: [ {
            url: "http://imsproduction.oss-cn-shanghai.aliyuncs.com/0b5eda377e471b76d95a2423b234ceb1.png",
            desc: "我要退货退款"
        }, {
            url: "http://imsproduction.oss-cn-shanghai.aliyuncs.com/ed5841b2b391b5fe25bfb2309bd8b346.png",
            desc: "我要退款"
        }, {
            url: "http://imsproduction.oss-cn-shanghai.aliyuncs.com/8179e24edbce8a8feaeca5b8e6cd5cb9.png",
            desc: "我要催发货"
        } ],
        sortedList: [],
        ordersList: [],
        canLoadMore: null
    },
    requestHotProblems: a.default.wrap(o.default.mark(function e(t) {
        var s, a, i, n;
        return o.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, s = "api/colombo/problem/list?is_home=1", e.next = 4, r.Request.apiRequest("GET", s);

              case 4:
                if (a = e.sent, t.$hideLoading(), !a.errorCode) {
                    e.next = 9;
                    break;
                }
                return t.$showToast(a.errorMsg), e.abrupt("return");

              case 9:
                return i = a.problem_list, n = [ [ i[12], i[14], i[17], i[21], i[23], i[25], i[34] ] ], 
                t.setData({
                    sortedList: n
                }), e.abrupt("return");

              case 15:
                e.prev = 15, e.t0 = e.catch(0), console.error(e.t0);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 15 ] ]);
    })),
    viewFAQ: function(e) {
        var t = e.currentTarget.dataset.listItem;
        if (0 == t.parent_id) {
            var s = {
                page_name: "common_qa",
                type_desc: t.type_desc,
                id: t.id
            };
            r.Util.toWeb(s, this);
        } else r.Util.toWeb({
            page_name: "qa_detail",
            id: t.id
        }, this);
    },
    toAllQuestions: function() {
        var e = {
            page_name: "common_qa"
        };
        r.Util.toWeb(e, this);
    },
    clickSelfServiceList: function(e) {
        var i = this;
        i.$showLoading(), i.data.ordersList = [];
        var n = e.currentTarget.dataset.index, c = "";
        c = 0 === n ? "refund_goods" : 1 === n ? "refund_money" : "push_delivery";
        var d = r.DataUtil.formatByPos(s.default.selfServiceOrders, c, 606, this.page, 20, this.nextOffset);
        (0, a.default)(o.default.mark(function e() {
            var r;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, t.SelfService.requestOrders(d);

                  case 3:
                    (r = e.sent) && i.processOrdersList({
                        that: i,
                        reqFlag: d,
                        ordersList: r.formatData,
                        ordersListInfo: r.data,
                        operate: c,
                        loadAll: r.formatData.length < 20
                    }), e.next = 10;
                    break;

                  case 7:
                    e.prev = 7, e.t0 = e.catch(0), console.error(e.t0);

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 7 ] ]);
        }));
    },
    processOrdersList: function(e) {
        var r = e.that;
        if (r.inRequest[e.reqFlag] = !1, r.$hideLoading(), e.ordersListInfo.errorCode) r.$showToast(e.ordersListInfo.errorMsg); else if (e.ordersList.length > 0) r.$forward("choose_orders", {
            operate: e.operate
        }); else {
            var t = "您暂无此类订单";
            t = "refund_goods" == e.operate ? "当前暂无可退货退款订单" : "refund_money" == e.operate ? "当前暂无可退款订单" : "当前暂无待发货订单", 
            r.$showToast(t);
        }
    },
    onLoad: function() {
        var e = this;
        e.$showLoading(), e.requestHotProblems(e);
    }
};

(0, r.PddPage)(i, {
    pageName: "self-service",
    pageSn: 10016
});
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SelfService = exports.CustomServiceController = void 0;

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var s = t[r];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, r, s) {
        return r && e(t.prototype, r), s && e(t, s), t;
    };
}(), s = e(require("../common/order_utils")), a = e(require("../pages/order/complaint_const")), n = require("../common/index"), u = e(require("../libs/co/we-index")), o = e(require("../libs/regenerator-runtime/runtime")), i = a.default.flowType, l = function() {
    function e() {
        t(this, e), this.mallInfoList = {}, this.requestMallIds = [];
    }
    return r(e, [ {
        key: "getMallInfos",
        value: function(e, t, r) {
            var s = this;
            this.requestMallIds = e;
            for (var a = [], i = 0; i < e.length; ++i) this.mallInfoList[e[i]] || a.push(e[i]);
            if (a.length > 0) (0, u.default)(o.default.mark(function e() {
                var u, i, l;
                return o.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, u = "malls?mall_ids[]=" + a.map(function(e) {
                            return e;
                        }).join("&mall_ids[]="), e.next = 4, n.Request.apiRequest("GET", u, null, !0);

                      case 4:
                        i = e.sent, s.cacheMallInfo(i), "function" == typeof t && (l = s.getCacheMallInfos(s.requestMallIds), 
                        "function" == typeof t && t(l)), e.next = 12;
                        break;

                      case 9:
                        e.prev = 9, e.t0 = e.catch(0), "function" == typeof r && r();

                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 9 ] ]);
            })); else {
                var l = this.getCacheMallInfos(e);
                "function" == typeof t && t(l);
            }
        }
    }, {
        key: "cacheMallInfo",
        value: function(e) {
            for (var t = 0; t < e.length; ++t) {
                var r = e[t].mall_id;
                this.mallInfoList[r] = e[t];
            }
        }
    }, {
        key: "getMallInfo",
        value: function(e) {
            return this.mallInfoList[e];
        }
    }, {
        key: "getCacheMallInfos",
        value: function(e) {
            for (var t = [], r = 0; r < e.length; ++r) {
                var s = this.getMallInfo(e[r]);
                s && t.push(s);
            }
            return t;
        }
    } ]), e;
}(), c = {
    inRequest: [],
    requestOrders: u.default.wrap(o.default.mark(function e(t) {
        var r, s, a;
        return o.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !this.inRequest[t]) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                return this.inRequest[t] = !0, e.next = 6, n.Request.apiRequest("GET", t);

              case 6:
                return r = e.sent, s = c.formatordersList(r), delete this.inRequest[t], a = {
                    data: r,
                    formatData: s
                }, e.abrupt("return", a);

              case 13:
                return e.prev = 13, e.t0 = e.catch(0), delete this.inRequest[t], console.error(e.t0), 
                e.abrupt("return", null);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 13 ] ]);
    })),
    formatordersList: function(e) {
        if (e.total <= 0) return [];
        var t = [];
        return e.orders.forEach(function(e) {
            var r = e.order_status, a = e.pay_status, u = e.event_type, o = e.shipping_status, i = e.lucky_status >= 0 ? e.lucky_status : null, l = 1 == e.lucky_result, _ = s.default.getOrderCombinedStatus(r, a, o, i, {
                eventType: u
            });
            e.order_status_desc = s.default.getOrderCombinedStatusDescription(_, i, l, e.rate_status), 
            e.goods_price = n.StdFormat.price(e.goods_price, 100), e.hasOwnProperty("after_sales_status") && (e.complaintStatus = c.getComplaintStatus(e), 
            3 == e.complaintStatus ? e.order_status_desc = "退款成功" : 4 == e.complaintStatus || 5 == e.complaintStatus ? e.order_status_desc = "退款关闭" : 0 == e.complaintStatus ? e.order_status_desc = "退款处理中" : 1 == e.complaintStatus && (e.order_status_desc = "退款中")), 
            t.push(e);
        }), t;
    },
    getComplaintStatus: function(e) {
        switch (e.after_sales_status) {
          case i.COMPLAINT_NULL_M1:
            return -1;

          case i.COMPLAINT_INIT_0:
          case i.COMPLAINT_SALES_DEALING_1:
          case i.COMPLAINT_SERVICE_INIT_2:
          case i.COMPLAINT_SERVICE_DEALING_3:
          case i.COMPLAINT_WAIT_SALES_SEND_COMFIRM_11:
            return 0;

          case i.COMPLAINT_REFUNDING_4:
            return 1;

          case i.COMPLAINT_REFUNDED_SUCC_5:
            return 3;

          case i.COMPLAINT_CANCELED_6:
          case i.COMPLAINT_FAILED_7:
          case i.COMPLAINT_FAIL_EXPIRE_13:
            return 4;

          case i.COMPLAINT_END_8:
            return 2;

          case i.COMPLAINT_WAIT_USER_DEAL_9:
          case i.COMPLAINT_WAIT_USER_SEND_10:
            return 0;

          case i.COMPLAINT_FAIL_12:
            return 5;
        }
        return 2;
    }
}, _ = new l();

exports.CustomServiceController = _, exports.SelfService = c;
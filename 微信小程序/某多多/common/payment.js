function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = e(require("../configs/app_config")), o = e(require("./request")), n = e(require("../constants/payment")), a = e(require("../storage/ram_manager")), i = e(require("../libs/co/we-index")), s = e(require("../libs/regenerator-runtime/runtime")), u = {
    orderPrepay: "10285"
}, c = {
    onSuccess: null,
    onFail: null,
    onComplete: null,
    handlePayError: function(e) {
        var r = e.err_code || e.error_code || -1, t = e.err_desc || e.errMsg || e.error_msg;
        "47001" == r && (t = "支付失败，限时折扣活动已结束"), "function" == typeof this.onFail && this.onFail({
            errorCode: r,
            errorMsg: t
        }), "function" == typeof this.onComplete && this.onComplete({
            errorCode: r,
            errorMsg: t
        });
    },
    pay: function(e, r, c, p) {
        this.onSuccess = r, this.onFail = c, this.onComplete = p;
        var l = t.default.payAppId, f = this;
        (0, i.default)(s.default.mark(function r() {
            var t, i;
            return s.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return r.prev = 0, t = o.default.requestDataWithCmd(u.orderPrepay, {
                        params: {
                            order_sn: e,
                            app_id: l,
                            version: 1
                        }
                    }), r.next = 4, o.default.runSecondaryRequestForPage(t, a.default.CPPage);

                  case 4:
                    i = r.sent;
                    try {
                        a.default.isFromShare = !0, wx.requestPayment({
                            timeStamp: i.timeStamp.toString(),
                            nonceStr: i.nonceStr,
                            package: i.package,
                            signType: i.signType,
                            paySign: i.paySign,
                            complete: function(r) {
                                n.default.isCancelPay(r.errMsg) ? f.onComplete(r) : ("function" == typeof f.onComplete && f.onComplete(r), 
                                f.afterPay(e, r)), a.default.isFromShare = !1;
                            }
                        });
                    } catch (r) {
                        "function" == typeof f.onComplete && f.onComplete({
                            errMsg: "wx.requestPayment try-catch exception",
                            orderSn: e
                        });
                    }
                    r.next = 11;
                    break;

                  case 8:
                    r.prev = 8, r.t0 = r.catch(0), f.handlePayError(r.t0);

                  case 11:
                  case "end":
                    return r.stop();
                }
            }, r, this, [ [ 0, 8 ] ]);
        }));
    },
    afterPay: function(e, t) {
        !function(e) {
            return "object" == (void 0 === e ? "undefined" : r(e)) && e.errMsg == n.default.WECHAT_PAY_SUCCESS_MSG;
        }(t) ? this.handlePayError(t) : "function" == typeof this.onSuccess && this.onSuccess();
    }
};

exports.default = c;
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

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function i(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), a = e(require("../index_component.js")), u = e(require("../../../libs/co/we-index")), s = e(require("../../../libs/regenerator-runtime/runtime")), d = e(require("../../../common/request.js")), c = e(require("../../../common/util.js")), p = require("../../../common/index"), l = {
    unpaidOrder: "10245"
}, f = function(e) {
    function f(e) {
        r(this, f);
        var t = n(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, e));
        return t.updateSecondTimer = null, t.page.onCancel = c.default.bind(t.onCancel, t), 
        t.page.onConfirm = c.default.bind(t.onConfirm, t), t;
    }
    return i(f, a.default), o(f, [ {
        key: "onCancel",
        value: function() {
            var e = {
                op: "click",
                page_el_sn: 99025,
                order_sn: this.data.unpaidOrderInfo && this.data.unpaidOrderInfo.order_sn
            };
            this.page.hideUnpaidModal(), this.data.unpaidOrderInfo = {}, (0, p.TrackingRecord)(e);
        }
    }, {
        key: "onConfirm",
        value: function() {
            var e = {
                op: "click",
                page_el_sn: 99024,
                order_sn: this.data.unpaidOrderInfo && this.data.unpaidOrderInfo.order_sn
            };
            this.page.hideUnpaidModal(), this.page.$forward("orders", {
                type: 1
            }), this.data.unpaidOrderInfo = {}, (0, p.TrackingRecord)(e);
        }
    }, {
        key: "getUnpaidOrder",
        value: function() {
            var e = this;
            return (0, u.default)(s.default.mark(function t() {
                var r, n, i, o;
                return s.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, r = d.default.requestDataWithCmd(l.unpaidOrder), t.next = 4, 
                        d.default.runSecondaryRequestForPage(r, e.page);

                      case 4:
                        if (!(n = t.sent) || !n.error_code) {
                            t.next = 7;
                            break;
                        }
                        return t.abrupt("return");

                      case 7:
                        return (i = Object.keys(n).length > 1) && (n.title = 1 == n.popup_type ? "你的拼单还未支付，请尽快支付" : "还在等你拼单，赶紧去支付吧", 
                        n.timerNumObj = p.TimeUtil.transferToTime(1e3 * (n.expire_time - n.server_time), {
                            needObj: !0
                        }), e.setData({
                            unpaidOrderInfo: n
                        }), o = {
                            op: "impr",
                            page_el_sn: 99026,
                            order_sn: n.order_sn
                        }, (0, p.TrackingRecord)(o), e.initTimer()), t.abrupt("return", i);

                      case 12:
                        t.prev = 12, t.t0 = t.catch(0), console.error(t.t0);

                      case 15:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 12 ] ]);
            }));
        }
    }, {
        key: "initTimer",
        value: function() {
            var e = this;
            null === this.updateSecondTimer && (this.updateMinutesHours(), this.updateSecondTimer = setInterval(function() {
                e.updateMinutesHours();
            }, 1e3));
        }
    }, {
        key: "updateMinutesHours",
        value: function() {
            var e = this.data.unpaidOrderInfo.timerNumObj;
            (!(e = this.timerUpdateUtil(e)) || e.intHours < 0) && (clearInterval(this.updateSecondTimer), 
            this.updateSecondTimer = null), this.setData(t({}, "unpaidOrderInfo.timerNumObj", e));
        }
    }, {
        key: "timerUpdateUtil",
        value: function(e) {
            if (e && e.minutes) {
                if (e.intSeconds--, e.intSeconds < 0) {
                    if (e.intSeconds = 59, e.intMinutes--, e.intMinutes < 0) {
                        e.intMinutes = 59, e.intHours--;
                        var t = e.intHours;
                        if (t < 0) return e;
                        t < 10 && (t = "0" + t), e.hours = t;
                    }
                    var r = e.intMinutes;
                    r < 10 && (r = "0" + r), e.minutes = r;
                }
                var n = e.intSeconds;
                n < 10 && (n = "0" + n), e.seconds = n;
            }
            return e;
        }
    } ]), f;
}();

exports.default = f;
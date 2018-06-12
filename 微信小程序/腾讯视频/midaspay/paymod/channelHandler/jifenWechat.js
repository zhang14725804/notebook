function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), c = require("../../global/context"), a = require("../../global/errorCode"), u = require("../../libs/util"), i = require("./baseChannel"), l = function(o) {
    function l() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments[1];
        e(this, l);
        var r = t(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, n, o));
        return r.buy(r.params), r;
    }
    return n(l, i), r(l, [ {
        key: "buy",
        value: function(e) {
            var t = this, n = {
                wx_direct_pay: 0,
                wx_publice_pay: 1,
                wx_order_interface: 1,
                pay_type: 1,
                pay_method: "wechat"
            };
            e = u.fn.extend({}, n, e), this.context.getPayMod().save(e, function(n) {
                return t.handlerBuy(n, e);
            });
        }
    }, {
        key: "getChannelName",
        value: function() {
            return "wechat";
        }
    }, {
        key: "handlerBuy",
        value: function(e, t) {
            var n = this;
            ~~e.ret ? this.callback.call(null, this.constructResult(e)) : function() {
                var t = e, o = decodeURIComponent(t.wx_time), r = decodeURIComponent(t.wx_nonce_num), u = decodeURIComponent(t.wx_package), i = decodeURIComponent(t.wx_sign_type) || "SHA1", l = decodeURIComponent(t.wx_sign), s = !1;
                wx.requestPayment({
                    timeStamp: o,
                    nonceStr: r,
                    package: u,
                    signType: i,
                    paySign: l,
                    complete: function() {
                        c.getContext().report("paystatus." + (s ? "success" : "fail"), {
                            channel: n.getChannelName()
                        });
                        var e = s ? a.code.SUCCESS : a.code.FAIL, t = a.msg[e];
                        n.callback.call(null, n.constructResult({
                            ret: e,
                            msg: t
                        }));
                    },
                    success: function(e) {
                        s = !0;
                    },
                    fail: function(e) {
                        s = !1;
                    }
                });
            }();
        }
    } ]), l;
}();

module.exports = l;
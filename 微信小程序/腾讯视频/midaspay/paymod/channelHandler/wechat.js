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
}(), i = require("../../global/context"), u = require("../../global/errorCode"), a = require("../../libs/util"), c = require("./baseChannel"), l = function(o) {
    function l() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments[1];
        e(this, l);
        var r = t(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, n, o));
        return r.buy(r.params), r;
    }
    return n(l, c), r(l, [ {
        key: "buy",
        value: function(e) {
            var t = this, n = {
                biz_appid: this.context.getBizAppid(),
                wx_direct_pay: 0,
                wx_publice_pay: 1,
                pay_method: "wechat"
            };
            e = a.fn.extend({}, n, e), this.context.getPayMod().save(e, function(n) {
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
                var t = e.wx_info, o = (t.wx_sign_url, t.wx_appid, t.wx_time), r = t.wx_noncenum, a = t.wx_package, c = t.wx_signtype || "SHA1", l = t.wx_sign, s = !1;
                wx.requestPayment({
                    timeStamp: o,
                    nonceStr: r,
                    package: a,
                    signType: c,
                    paySign: l,
                    complete: function() {
                        i.getContext().report("paystatus." + (s ? "success" : "fail"), {
                            channel: n.getChannelName()
                        });
                        var e = s ? u.code.SUCCESS : u.code.FAIL, t = u.msg[e];
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
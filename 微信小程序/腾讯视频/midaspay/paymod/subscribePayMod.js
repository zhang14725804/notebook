function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != (void 0 === t ? "undefined" : n(t)) && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : n(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var o, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), a = require("../libs/util"), u = require("./base"), c = require("../global/context"), s = function(e) {
    e.prototype.checkSubscribeParams = function() {
        var e = this, t = {
            status: !0,
            msg: ""
        }, r = this.checkPublicParams();
        return r.status ? (a.fn.each([ "pf", "service_code" ], function(r) {
            if (!e.params[r]) return t.status = !1, t.msg = r + "错误", !1;
        }), t) : r;
    };
}(o = function(o) {
    function n(r) {
        e(this, n);
        var o = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, r)), i = [];
        return o.params.aid && i.push("aid=" + o.params.aid), o.params.appremark = encodeURIComponent(i.join("&")), 
        o.account = o.params.account || "wechat", o.initCgi(), o;
    }
    return r(n, u), i(n, [ {
        key: "getProvideNoType",
        value: function() {
            return "wechat" == this.account ? "wechatid" : "qq" == this.account ? "uin" : void 0;
        }
    }, {
        key: "getMonthInfo",
        value: function() {
            return {};
        }
    }, {
        key: "save",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = {
                buy_quantity: e.buy_quantity || this.params.buy_quantity || 1,
                service_code: this.params.service_code,
                product_id: e.product_id || this.params.product_id,
                appremark: this.params.appremark || "",
                provide_no_type: this.getProvideNoType(),
                service_name: this.params.service_name || ""
            };
            a.fn.extend(r, this.getSavePublicParams()), a.fn.extend(r, e), c.getContext().report("startsave.pv", {
                serviceCode: r.service_code,
                productId: r.product_id
            }), this.cgi.mobileSaveMonth(r, function(e) {
                c.getContext().report("savestatus", {
                    resultCode: e.ret,
                    resultMsg: e.msg
                }), t(e);
            });
        }
    } ]), n;
}()) || o;

module.exports = s;
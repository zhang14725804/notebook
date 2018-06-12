function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != (void 0 === e ? "undefined" : o(e)) && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : o(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), i = require("../libs/util"), a = require("./base"), u = function(o) {
    function u(n) {
        t(this, u);
        var o = e(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, n));
        return o.account = o.params.account || "wechat", o.initCgi({
            domain: "https://m.jifen.qq.com"
        }), o;
    }
    return n(u, a), r(u, [ {
        key: "getProvideNoType",
        value: function() {
            return "wechat" == this.account ? "wechatid" : "qq" == this.account ? "uin" : void 0;
        }
    }, {
        key: "getMonthInfo",
        value: function() {}
    }, {
        key: "save",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], n = {
                pay_item: encodeURIComponent(this.params.goodsId + "*" + this.params.buy_quantity),
                openid: this.params.openid,
                provide_uin: this.params.provide_uin,
                md: this.params.md || "yd.xp",
                openkey: this.params.openkey || "",
                id: this.params.addressId || ""
            };
            i.fn.extend(n, this.getSavePublicParams()), i.fn.extend(n, t), this.cgi.jifenPayGoods(n, function(t) {
                e(t) || t.ret;
            });
        }
    }, {
        key: "checkJifenParams",
        value: function() {
            var t = this, e = {
                status: !0,
                msg: ""
            }, n = this.checkPublicParams();
            return n.status ? (i.fn.each([ "pf", "pay_method", "buy_quantity", "goodsId", "addressId" ], function(n) {
                if (!t.params[n]) return e.status = !1, e.msg = n + "错误", !1;
            }), e) : n;
        }
    } ]), u;
}();

module.exports = u;
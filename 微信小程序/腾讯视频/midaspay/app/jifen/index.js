function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != (void 0 === t ? "undefined" : r(t)) && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : r(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var r = t[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, o, r) {
        return o && e(t.prototype, o), r && e(t, r), t;
    };
}(), i = function e(t, o, r) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, o);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, o, r);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    return void 0 !== a ? a.call(r) : void 0;
}, a = require("../../paymod/jifenPayMod"), u = require("../baseApp"), c = require("../../global/resultAdapter"), l = require("../../global/errorCode"), f = function(r) {
    function f(o) {
        var r = o.params, n = void 0 === r ? {} : r, i = o.callback, u = void 0 === i ? function() {} : i, p = o.opt, s = void 0 === p ? {} : p;
        e(this, f);
        var y = t(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, {
            params: n,
            callback: u,
            opt: s
        }));
        y.IFORMAT_PREFIX = "midaswechatpay.jifen", y.reportObj.setIformatPrefix(y.IFORMAT_PREFIX), 
        y.payMod = new a(n);
        var b = y.payMod.checkJifenParams();
        return b.status ? y.directPay() : setTimeout(function() {
            y.callback(new c({
                ret: l.code.PARAMS_ERROR,
                msg: b.msg || l.msg[l.code.FAIL]
            }).getResult());
        }, 0), y;
    }
    return o(f, u), n(f, [ {
        key: "destroy",
        value: function() {
            i(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "destroy", this).call(this);
        }
    } ]), f;
}();

module.exports = f;
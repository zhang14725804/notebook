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
}(), i = function t(e, n, o) {
    null === e && (e = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, n, o);
    }
    if ("value" in r) return r.value;
    var u = r.get;
    return void 0 !== u ? u.call(o) : void 0;
}, u = require("./basemod"), c = require("../app/subscribe/index"), a = function(o) {
    function a() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return t(this, a), e(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, n));
    }
    return n(a, u), r(a, [ {
        key: "launchPay",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            i(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "launchPay", this).call(this, t, e), 
            this.app = new c({
                params: t,
                opt: this.opt,
                callback: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.opt.autoDestroy && (a.instance.destroy(), a.instance = null), e(t);
                }.bind(this)
            });
        }
    } ]), a;
}();

a.instance = null, module.exports = {
    init: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return null != a.instance ? a.instance : a.instance = new a(t);
    },
    get: function() {
        if (!a.instance) throw Error("subscribe not initalize");
        return a.instance;
    },
    destroy: function() {
        a.instance.destroy(), a.instance = null;
    }
};
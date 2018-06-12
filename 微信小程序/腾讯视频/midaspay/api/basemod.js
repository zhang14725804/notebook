function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function t(t, n) {
        for (var a = 0; a < n.length; a++) {
            var e = n[a];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(n, a, e) {
        return a && t(n.prototype, a), e && t(n, e), n;
    };
}(), a = require("../libs/util"), e = function() {
    function e() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e), this.opt = n, this.params = null, this.callback = null, this.app = null;
    }
    return n(e, [ {
        key: "launchPay",
        value: function(t, n) {
            if (this.params = t, !a.lang.isFunction(n)) throw Error("callback must be a function");
            this.callback = n;
        }
    }, {
        key: "destroy",
        value: function() {
            try {
                this.app && this.app.destroy && (this.app.destroy(), this.app = null);
            } catch (t) {}
        }
    } ]), e;
}();

module.exports = e;
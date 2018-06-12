function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("../../global/context"), r = require("../../libs/util"), a = require("../../global/resultAdapter"), u = function() {
    function u() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments[1];
        if (e(this, u), this.params = t, this.callback = a, !r.lang.isFunction(this.callback)) throw new Error("callback must be a function");
        this.context = n.getContext();
    }
    return t(u, [ {
        key: "buy",
        value: function(e) {}
    }, {
        key: "handlerBuy",
        value: function(e) {}
    }, {
        key: "getChannelName",
        value: function() {
            return "";
        }
    }, {
        key: "constructResult",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = new a(e);
            return r.fn.extend(t, {
                channel: this.getChannelName()
            }), n.setExtra(t), n.result;
        }
    } ]), u;
}();

u.ResultAdapter = a, module.exports = u;
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
}(), n = require("../libs/util"), r = function() {
    function r(t) {
        var n = t.ret, u = t.msg;
        e(this, r), this.result = {
            resultCode: n,
            resultMsg: u
        };
    }
    return t(r, [ {
        key: "setExtra",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            n.fn.extend(this.result, e);
        }
    }, {
        key: "getResult",
        value: function() {
            return this.result;
        }
    } ]), r;
}();

module.exports = r;
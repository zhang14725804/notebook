function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.page = t;
    }
    return t(n, [ {
        key: "setData",
        value: function(e) {
            this.page.setData(e);
        }
    }, {
        key: "data",
        get: function() {
            return this.page.data || {};
        },
        set: function(e) {
            this.setData(e);
        }
    } ]), n;
}();

exports.default = n;
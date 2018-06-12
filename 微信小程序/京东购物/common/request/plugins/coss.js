function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var o = function() {
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
}(), n = require("./plugin.js"), u = require("../../recovery/coss.js"), c = function(c) {
    function i() {
        return e(this, i), t(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
    }
    return r(i, n), o(i, null, [ {
        key: "request",
        value: function(e, t) {
            if ("GET" == e.method && !e.cached) {
                var r = {};
                try {
                    r = u.getCossRecovery(e.url);
                } catch (e) {
                    console.error("coss.getCossRecovery error! ", e);
                }
                r.didRecover && (e.url = r.url, delete e.expire);
            }
            t();
        }
    } ]), i;
}();

module.exports = c;
function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e, r) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !r || "object" != typeof r && "function" != typeof r ? e : r;
}

function t(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}

var o = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), n = require("./plugin.js"), i = require("../../cookie-v2/cookie.js"), u = [ "plogin_guid", "plogin_lsid" ], a = u.length, c = function(c) {
    function f() {
        return e(this, f), r(this, (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments));
    }
    return t(f, n), o(f, null, [ {
        key: "response",
        value: function(e, r) {
            if (r(), e.resHeader) {
                var t = e.resHeader["set-cookie"] || e.resHeader["Set-Cookie"] || [];
                Array.isArray(t) || (t = [ t ]);
                var o = t.filter(function(e) {
                    for (var r = 0, t = a; r < t; r++) if (~e.indexOf(u[r])) return !0;
                    return !1;
                });
                e.resHeader["set-cookie"] = o;
            }
            i.setCookieInHeader({
                header: e.resHeader
            });
        }
    } ]), f;
}();

module.exports = c;
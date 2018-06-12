var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function(e) {
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports;
    }
    var t = {};
    return r.m = e, r.c = t, r.p = "", r(0);
}([ function(e, r, t) {
    r.decode = r.parse = t(1), r.encode = r.stringify = t(2);
}, function(e, r) {
    function t(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
    }
    e.exports = function(e, r, o, u) {
        r = r || "&", o = o || "=";
        var c = {};
        if ("string" != typeof e || 0 === e.length) return c;
        var i = /\+/g;
        e = e.split(r);
        var a = 1e3;
        u && "number" == typeof u.maxKeys && (a = u.maxKeys);
        var p = e.length;
        a > 0 && p > a && (p = a);
        for (var f = 0; p > f; ++f) {
            var s, y, l, d, m = e[f].replace(i, "%20"), b = m.indexOf(o);
            b >= 0 ? (s = m.substr(0, b), y = m.substr(b + 1)) : (s = m, y = ""), l = decodeURIComponent(s), 
            d = decodeURIComponent(y), t(c, l) ? n(c[l]) ? c[l].push(d) : c[l] = [ c[l], d ] : c[l] = d;
        }
        return c;
    };
    var n = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
}, function(r, t) {
    function n(e, r) {
        if (e.map) return e.map(r);
        for (var t = [], n = 0; n < e.length; n++) t.push(r(e[n], n));
        return t;
    }
    var o = function(r) {
        switch (void 0 === r ? "undefined" : e(r)) {
          case "string":
            return r;

          case "boolean":
            return r ? "true" : "false";

          case "number":
            return isFinite(r) ? r : "";

          default:
            return "";
        }
    };
    r.exports = function(r, t, i, a) {
        return t = t || "&", i = i || "=", null === r && (r = void 0), "object" == (void 0 === r ? "undefined" : e(r)) ? n(c(r), function(e) {
            var c = encodeURIComponent(o(e)) + i;
            return u(r[e]) ? n(r[e], function(e) {
                return c + encodeURIComponent(o(e));
            }).join(t) : c + encodeURIComponent(o(r[e]));
        }).join(t) : a ? encodeURIComponent(o(a)) + i + encodeURIComponent(o(r)) : "";
    };
    var u = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }, c = Object.keys || function(e) {
        var r = [];
        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.push(t);
        return r;
    };
} ]);

module.exports = r;
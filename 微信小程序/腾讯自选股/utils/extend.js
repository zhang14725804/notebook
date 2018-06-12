(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, c = require("./ppdog"), d = a(c), e = require("./regenerator-runtime"), f = a(e);
    var g = require("./is");
    module.exports = function a() {
        var c, d, e, f, h, j, k = arguments[0] || {}, l = 1, i = arguments.length, m = !1;
        for ("boolean" == typeof k && (m = k, k = arguments[1] || {}, l = 2), "object" === ("undefined" == typeof k ? "undefined" : b(k)) || g.fn(k) || (k = {}); l < i; l++) if (c = arguments[l], 
        null != c) for (d in "string" == typeof c && (c = c.split("")), c) (e = k[d], f = c[d], 
        k !== f) && (m && f && (g.hash(f) || (h = g.array(f))) ? (h ? (h = !1, j = e && g.array(e) ? e : []) : j = e && g.hash(e) ? e : {}, 
        k[d] = a(m, j, f)) : "undefined" != typeof f && (k[d] = f));
        return k;
    };
})();
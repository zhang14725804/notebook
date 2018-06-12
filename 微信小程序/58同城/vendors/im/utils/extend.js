var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = function() {
    for (var o = {}, t = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), n = 0; n < t.length; n++) !function(t, n) {
        o["[object " + n + "]"] = n.toLowerCase();
    }(0, t[n]);
    return o;
}(), n = function(n) {
    return null == n ? n + "" : "object" === (void 0 === n ? "undefined" : o(n)) || "function" == typeof n ? t[toString.call(n)] || "object" : void 0 === n ? "undefined" : o(n);
}, r = function(o) {
    return null != o && o == o.window;
}, e = Array.isArray || function(o) {
    return "array" === n(o);
}, u = function(o) {
    return "function" === n(o);
}, i = function(o) {
    var t;
    if (!o || "object" !== n(o) || o.nodeType || r(o)) return !1;
    try {
        if (o.constructor && !hasOwn.call(o, "constructor") && !hasOwn.call(o.constructor.prototype, "isPrototypeOf")) return !1;
    } catch (o) {
        return !1;
    }
    if (!support.ownFirst) for (t in o) return hasOwn.call(o, t);
    for (t in o) ;
    return void 0 === t || hasOwn.call(o, t);
};

module.exports = function t() {
    var n, r, c, f, l, a, y = arguments[0] || {}, s = 1, p = arguments.length, b = !1;
    for ("boolean" == typeof y && (b = y, y = arguments[s] || {}, s++), "object" === (void 0 === y ? "undefined" : o(y)) || u(y) || (y = {}), 
    s === p && (y = this, s--); s < p; s++) if (null != (l = arguments[s])) for (f in l) n = y[f], 
    y !== (c = l[f]) && (b && c && (i(c) || (r = e(c))) ? (r ? (r = !1, a = n && e(n) ? n : []) : a = n && i(n) ? n : {}, 
    y[f] = t(b, a, c)) : void 0 !== c && (y[f] = c));
    return y;
};
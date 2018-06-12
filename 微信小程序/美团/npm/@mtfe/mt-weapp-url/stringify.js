function e(e) {
    return "string" == typeof e ? e : "number" == typeof e && isFinite(e) ? "" + e : "boolean" == typeof e ? e ? "true" : "false" : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.stringify = function(t, r) {
    var n = r || {}, i = n.sep, f = void 0 === i ? "&" : i, y = n.eq, u = void 0 === y ? "=" : y, l = n.encode, s = void 0 === l ? encodeURIComponent : l;
    if (null !== t && "object" === (void 0 === t ? "undefined" : o(t))) {
        for (var p = Object.keys(t), c = p.length, b = c - 1, a = "", d = 0; d < c; ++d) {
            var v = p[d], m = t[v], S = s(e(v)) + u;
            if (Array.isArray(m)) {
                for (var g = m.length, j = g - 1, h = 0; h < g; ++h) a += S + s(e(m[h])), h < j && (a += f);
                g && d < b && (a += f);
            } else a += S + s(e(m)), d < b && (a += f);
        }
        return a;
    }
    return "";
};
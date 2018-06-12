function t(t, r, e) {
    for (var n = t.toString(), o = "", i = n.length; i > 0; i -= e) {
        var u = i - e < 0 ? 0 : i - e;
        o = r + n.slice(u, i) + o;
    }
    return o.substring(1);
}

function r(t, r) {
    var e = {};
    return "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(t, r) {
        e["[object " + t + "]"] = t.toLowerCase();
    }), Object.prototype.toString.call(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isArray = function(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
}, exports.isFunction = function(t) {
    return "[object Function]" === Object.prototype.toString.call(t);
}, exports.isObject = function(t) {
    return "[object Object]" === Object.prototype.toString.call(t);
}, exports.escapeSymbol = function(t) {
    return String(t).replace(/[#%&+=\/\\\ \u3000\f\r\n\t]/g, function(t) {
        return "%" + (256 + t.charCodeAt()).toString(16).substring(1).toUpperCase();
    });
}, exports.numToChinaNum = function(r) {
    return !r || r <= 0 ? 0 : r < 1e5 ? t(r, ",", 3) : r < 1e6 ? (r / 1e4).toFixed(1) + "万" : r < 1e8 ? (r / 1e4).toFixed(0) + "万" : (r / 1e8).toFixed(1) + "亿";
}, exports.paopaoFormatCount = function(t, r) {
    return t > 1e4 && (t = (t / 1e4).toFixed(r) + "万"), t;
}, exports.getBirth = function(t) {
    return t ? [ t.substring(0, 4), t.substring(4, 6), t.substring(6, 8) ].join("-") : "";
}, exports.formatYearALL = function(t) {
    return ("" + t).replace(/(\d{4})(\d{2})(\d{2})/g, function(t, r, e, n) {
        return [ r, e, n ].join("-");
    });
}, exports.formatYear = function(t) {
    return ("" + t).replace(/(\d{4})(\d{2})(\d{2})/g, function(t, r, e, n) {
        return [ e, n ].join("-");
    });
}, exports.typeSort = function(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [];
    if (!1 === n) return r(t, e);
    if (o.length != i.length) return !1;
    var u = null, c = null;
    return void 0 === o.forEach(function(e, n) {
        return u = t[i[n]], c = r(u, e), t = u, !1 === c;
    });
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(r) {
    for (var t, n, u, i, o = r.substr(r.lastIndexOf("?") + 1).split("&"), s = o.length, f = {}, a = 0; a < s; a++) o[a] && (t = (i = o[a].split("=")).shift(), 
    n = i.join("="), void 0 === (u = f[t]) ? f[t] = n : e.isArray(u) ? u.push(n) : f[t] = [ u, n ]);
    return f;
}, exports.stringify = function() {
    var r, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = [], u = arguments[1] || function(r) {
        return e.escapeSymbol(r);
    };
    for (var i in t) {
        var o = t[i];
        if (e.isArray(o)) for (r = o.length; r--; ) n.push(i + "=" + u(o[r], i)); else n.push(i + "=" + u(o, i));
    }
    return n.join("&");
}, exports.addQueryParam = function(r, e, t) {
    if (e) return r + (-1 !== r.indexOf("?") ? "&" : "?") + e + "=" + t;
}, exports.getSign = function(e) {
    var t = Object.keys(e).sort().map(function(r) {
        return r + "=" + e[r];
    }).join("|") + "|uF86eIvX2muRWNJdqovb";
    return (0, r.default)(t);
};

var r = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("md5")), e = require("object");
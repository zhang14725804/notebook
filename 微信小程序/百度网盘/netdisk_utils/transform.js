Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.toFriendlyQuotaSize = exports.dataTransform = exports.msToMin = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./calculate.js")), r = null, t = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (r.length <= 0) return [];
    var t = [];
    return r.map(function(r) {
        for (var o in r) "local_ctime" !== o && "local_mtime" !== o && "server_ctime" !== o && "server_mtime" !== o || (r[o] = e.default.formatTime(new Date(1e3 * r[o])));
        t.push(r);
    }), t;
}, o = (exports.msToMin = function(e) {
    var r = Math.floor(e / 60);
    r < 10 && (r = "0" + r);
    var t = Math.floor(e % 60);
    return t < 10 && (t = "0" + t), r + ":" + t;
}, function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (e.length <= 0) return [];
    var r = [];
    return e.map(function(e) {
        for (var t in e) "size" === t && (e.originSize = e[t], e[t] = n(e[t]));
        r.push(e);
    }), r;
}), n = (exports.dataTransform = function(e) {
    var n = t(e), i = o(n);
    return r = i;
}, exports.toFriendlyQuotaSize = function(e, r) {
    return r && "number" == typeof e && (e /= 8), "number" == typeof e || "string" == typeof e && /^[\d\.]+$/.test(e) ? e < 1024 ? Math.round(e) + "B" : e < 1048576 && e >= 1024 ? Math.round(e / 1024) + "KB" : e < 1073741824 && e >= 1048576 ? 10 * (e / 1024 / 1024).toFixed(1) / 10 + "M" : 100 * (e / 1024 / 1024 / 1024).toFixed(2) / 100 + "G" : "-";
});
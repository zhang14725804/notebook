Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.slice = function(e, i, t, n) {
    return e ? n ? e.split(n).slice(i, t).join(n) : e.slice(i, t) : e;
}, exports.schemaStr = function(i, t, n) {
    var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], r = "";
    if (e.default.isAndroid) {
        var o = 1 == s ? encodeURIComponent(encodeURIComponent(JSON.stringify(i))) : encodeURIComponent(JSON.stringify(i)), u = "player" == t ? "iqiyi://mobile/" + t + "?" : "iqiyi://mobile/register_business/" + t + "?";
        r = "player" == t ? u + "ftype=27&subtype=" + n + "&" + i : u + "ftype=27&subtype=" + n + "&pluginParams=" + o;
    } else e.default.isIOS && (r = JSON.stringify(Object.assign({}, i, {
        init_type: "27",
        init_sub_type: n
    })));
    return r;
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("os"));
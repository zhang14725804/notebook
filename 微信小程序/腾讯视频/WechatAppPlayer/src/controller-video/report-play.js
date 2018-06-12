var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("./../module/reporter/report-queue"), o = wx.getSystemInfoSync();

module.exports = function(n) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, p = arguments[2], i = arguments[3];
    p(function(p, l) {
        p && (l = {}), delete l.val1, delete l.val2, delete l.val3, "object" == e(l[n]) && ([ "val1", "val2", "val3" ].forEach(function(e) {
            l[e] = l[n][e];
        }), delete l[n]);
        var a = getCurrentPages().slice(0), c = a.pop(), u = a.pop();
        wx.getNetworkType({
            success: function(e) {
                var p = {
                    BossId: 4327,
                    Pwd: 944465292,
                    app_version: "",
                    platform: o.platform,
                    client_model: o.model,
                    wx_version: o.version,
                    network: e && e.networkType ? e.networkType : "",
                    step: n,
                    page_url: c && c.$name || "",
                    page_query: c && c.$query || "",
                    page_ref: u && u.$name || ""
                };
                [ "hc_openid", "hc_appid", "ptag", "iformat", "duration", "defn", "tpay", "adid", "playtime", "page_url", "page_query", "page_ref", "cid", "vid", "isvip", "val1", "val2", "val3", "appname", "nick", "rmd", "scene", "additional", "videourl" ].forEach(function(e) {
                    e in r && (p[e] = r[e]), e in l && (p[e] = l[e]), void 0 == p[e] && (p[e] = "");
                }), i && "function" == typeof i ? i(null, {
                    reportUrl: "https://btrace.qq.com/kvcollect?" + Object.keys(p).map(function(e) {
                        return e in p ? e + "=" + encodeURIComponent(p[e]) : "";
                    }).filter(function(e) {
                        return e;
                    }).join("&")
                }) : t.push({
                    reportUrl: "https://btrace.qq.com/kvcollect?" + Object.keys(p).map(function(e) {
                        return e in p ? e + "=" + encodeURIComponent(p[e]) : "";
                    }).filter(function(e) {
                        return e;
                    }).join("&")
                });
            }
        });
    });
};
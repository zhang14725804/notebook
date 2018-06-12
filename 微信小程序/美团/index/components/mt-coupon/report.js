function e(e, i) {
    if (e) {
        var n = i || {};
        wx.reportAnalytics ? wx.reportAnalytics(e, n) : (n.key = e, o.moduleClick("noReportAnalytics", n));
    }
}

var o = require("../../../utils/lx"), i = getApp();

module.exports = {
    wxReport: e,
    report: function(n, r, t) {
        if (n) {
            n = n.toLowerCase();
            var s = {}, a = i.globalData, l = a.openId, d = void 0 === l ? "" : l, p = a.unionId, u = void 0 === p ? "" : p;
            Object.assign(s, {
                openid: d,
                unionid: u
            }, r), e(n, s), o && i.getSysInfo && i.getSysInfo(function(e) {
                if (s.sdk_version = e.SDKVersion || "", s.platform = e.platform || "", s.system = e.system || "", 
                s.version = e.version || "", s.language = e.language || "", s.model = e.model || "", 
                s.brand = e.brand || "", "view" === t) {
                    var i = n;
                    o.pageView(i, s);
                } else o.moduleClick(n, s);
            });
        }
    }
};
function t(t) {
    return (t = parseInt(t)) < 10 ? "0" + t : t;
}

function n(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function e(t, n) {
    var e = n - t, r = Math.random();
    return t + Math.round(r * e);
}

var r = require("xxtea.js");

module.exports = {
    formatTime: function(t) {
        var e = new Date(1e3 * t), r = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate(), i = e.getHours(), u = e.getMinutes();
        return [ r, a, o ].map(n).join(".") + " " + [ i, u ].map(n).join(":");
    },
    format2mdHi: function(n) {
        var e = new Date(1e3 * parseInt(n));
        return e.getMonth() + 1 + "." + e.getDate() + " " + t(e.getHours()) + ":" + t(e.getMinutes());
    },
    formatUrl: function(t) {
        return t.startsWith("//") ? "http:" + t : t.startsWith("/") ? "http:/" + t : t;
    },
    formatMoney: function(t) {
        return (t = parseFloat(t)) + "元";
    },
    formatLeftTime: function(t, n) {
        if (t = parseInt(t), (n = parseInt(n)) <= t) return "0分";
        var e = n - t, r = parseInt(e / 86400);
        e -= 86400 * r;
        var a = parseInt(e / 3600);
        e -= 3600 * a;
        var o = parseInt(e / 60), i = "";
        return r > 0 && (i += r + "天"), a > 0 && (i += a + "小时"), o > 0 && (i += o + "分"), 
        i;
    },
    showTips: function(t, n) {
        wx.showModal({
            title: "温馨提示",
            content: t,
            showCancel: !1,
            complete: function(t) {
                wx.navigateTo({
                    url: n
                });
            }
        });
    },
    showTipsSwitchTab: function(t, n) {
        wx.showModal({
            title: "温馨提示",
            content: t,
            complete: function(t) {
                wx.switchTab({
                    url: n
                });
            }
        });
    },
    showError: function(t) {
        t = t || "操作失败，请稍后再试", wx.showModal({
            title: "温馨提示",
            content: t,
            showCancel: !1
        });
    },
    showTipsRedirect: function(t, n) {
        wx.showModal({
            title: "温馨提示",
            content: t,
            showCancel: !1,
            complete: function(t) {
                wx.redirectTo({
                    url: n
                });
            }
        });
    },
    showLoading: function() {
        wx.showToast({
            title: "请等待",
            icon: "loading",
            duration: 1e4
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    makeSign: function(t) {
        for (var n = "", a = 0; 3 != a; a++) for (var o = 3 * (2 - a) + 1, i = o + 2, u = 0; 3 != u; u++) n += e(o, i).toString();
        return r.encryptToBase64(n, t);
    },
    gcjTobd: function(t, n) {
        var e = new Object(), r = 52.35987755982988, a = new Number(n), o = new Number(t), i = Math.sqrt(a * a + o * o) + 2e-5 * Math.sin(o * r), u = Math.atan2(o, a) + 3e-6 * Math.cos(a * r), s = i * Math.cos(u) + .0065, c = i * Math.sin(u) + .006;
        return e.lng = s, e.lat = c, e;
    },
    bdTogcj: function(t, n) {
        var e = new Object(), r = 52.35987755982988, a = new Number(n - .0065), o = new Number(t - .006), i = Math.sqrt(a * a + o * o) - 2e-5 * Math.sin(o * r), u = Math.atan2(o, a) - 3e-6 * Math.cos(a * r), s = i * Math.cos(u), c = i * Math.sin(u);
        return e.lng = s, e.lat = c, e;
    },
    getCurrentPageUrl: function() {
        var t = getCurrentPages();
        return t[t.length - 1].route;
    },
    getCurrentPageUrlWithArgs: function() {
        var t = getCurrentPages(), n = t[t.length - 1], e = n.route, r = n.options, a = e + "?";
        for (var o in r) a += o + "=" + r[o] + "&";
        return a = a.substring(0, a.length - 1);
    },
    getBannerUrl: function(t) {
        if (t && t.path) return Number(t.path) ? "product" === t.type ? "/pages/product/index?id=" + t.path : "cate" === t.type ? "/pages/cate/list/index?id=" + t.path : "channel" === t.type ? "/pages/channel/index?page_id=" + t.path : t.path : t.path;
    }
};
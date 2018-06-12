function e(e) {
    var t = e.split(".");
    return 1e4 * t[0] + 100 * t[1] + 1 * t[2];
}

function t() {
    var e = "/pages/common/update/index?sdkVersion=" + n;
    try {
        wx.reLaunch({
            url: e
        });
    } catch (t) {
        wx.redirectTo({
            url: e
        });
    }
}

var r = void 0, n = "";

module.exports = function() {
    if (r) return t();
    !1 !== r && wx.getSystemInfo({
        success: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            n = o.SDKVersion || "", /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(n) && (e(n) < e("1.6.4") ? (r = !0, 
            t()) : r = !1);
        }
    });
};
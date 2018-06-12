var t = require("./store"), e = {
    fingerprint: !1,
    getNetworkType: !1,
    getLocation: !1
};

module.exports = function(n) {
    function i() {
        e.fingerprint && e.getNetworkType && e.getLocation ? o() : setTimeout(function() {
            i();
        }, 100);
    }
    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a;
        wx.request({
            url: t,
            data: e,
            dataType: c,
            method: g,
            header: s,
            success: function(t) {
                i(null, t);
            },
            fail: function(t) {
                i(t);
            }
        });
    }
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments[2], p = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, g = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "GET", c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "json", s = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    if ("https://passport.58.com/fingerprint" != n) {
        var f = t.getSync("fingerprint");
        f ? (e.fingerprint = !0, s.fingerprint = f) : o("https://passport.58.com/fingerprint", {}, function(n, i) {
            i && 0 == (i = i.data).code && (t.setSync("fingerprint", i.data.fingerprint), s.fingerprint = i.data.fingerprint, 
            e.fingerprint = !0);
        });
    } else e.fingerprint = !0;
    for (var l in p) s[l] = p[l];
    var u = wx.getSystemInfoSync();
    s.model = u.model, s.pixelRatio = u.pixelRatio, s.language = u.language, s.version = u.version, 
    s.system = u.system, s.platform = u.platform, s.pixelRatio = u.pixelRatio, wx.getNetworkType({
        success: function(t) {
            s.networkType = t.networkType, e.getNetworkType = !0;
        },
        fail: function() {
            e.getNetworkType = !0;
        }
    }), wx.getLocation({
        type: "wgs84",
        success: function(t) {
            s.latitude = t.latitude, s.longitude = t.longitude, s.speed = t.speed, s.accuracy = t.accuracy, 
            e.getLocation = !0;
        },
        fail: function() {
            e.getLocation = !0;
        }
    }), i();
};
var e = require("../util/fetch"), o = require("../util/store"), a = require("../config/config").config, t = require("../util/passport_evHandle"), p = require("../util/common_param"), n = {
    goPassportState: function(n) {
        var r = n.url || "", i = decodeURIComponent(n.path) || "", c = n.callback || function() {}, l = n.source || "", s = n.opentype || 1, u = (n.closepage, 
        n.showType || "3"), d = n.bindType || "2", m = a.URL_PATH || "";
        if (n.imCallback && p.set({
            imCallback: n.imCallback
        }), r) {
            var y = o.getSync("ppu") ? {
                ppu: o.getSync("ppu")
            } : {};
            e(r, {}, function(e, a) {
                if (a) if (0 == (a = a.data).code) o.setSync("ppu", a.data.ppu), t.emit("passport-login-success", a); else if (1538 == a.code) {
                    var p = m + "/passport/passport?type=" + u + "&bindType=" + d + "&url_bind=" + encodeURIComponent(a.data.url) + "&source=" + l + "&path=" + encodeURIComponent(i) + "&opentype=" + s;
                    1 == s || 3 == s ? wx.navigateTo({
                        url: p
                    }) : wx.redirectTo({
                        url: p
                    });
                } else if (1537 == a.code) {
                    var n = m + "/passport/passport?type=4&vcodekey=" + a.data.vcodekey + "&name=" + a.data.name + "&source=" + l + "&opentype=" + s + "&path=" + encodeURIComponent(i) + "&url=" + encodeURIComponent(a.data.url);
                    1 == s || 3 == s ? wx.navigateTo({
                        url: n
                    }) : wx.redirectTo({
                        url: n
                    });
                } else if (2 == a.code) {
                    var r = a.data.mobile || "", y = m + "/passport/passport?type=5&warnkey=" + a.data.warnkey + "&mobile=" + r + "&source=" + l + "&opentype=" + s + "&path=" + encodeURIComponent(i) + "&warnurl=" + encodeURIComponent(a.data.warnurl);
                    1 == s || 3 == s ? wx.navigateTo({
                        url: y
                    }) : wx.redirectTo({
                        url: y
                    });
                } else c(a);
            }, y);
        }
    },
    goLogin: function(e) {
        var o = e.opentype || 1, t = e.loginType || 2, n = e.showType || "1", r = e.source || "", i = e.path || "", c = (a.URL_PATH || "") + "/passport/login/login?opentype=" + o + "&type=" + n + "&loginType=" + t + "&source=" + r + "&path=" + encodeURIComponent(i);
        e.imCallback && p.set({
            imCallback: e.imCallback
        }), 1 == o || 3 == o ? wx.navigateTo({
            url: c
        }) : wx.redirectTo({
            url: c
        });
    }
};

module.exports = n;
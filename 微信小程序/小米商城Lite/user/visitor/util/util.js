var n = 8, r = function(n, r) {
    n[r >> 5] |= 128 << 24 - r % 32, n[15 + (r + 64 >> 9 << 4)] = r;
    var u, c, f = Array(80), a = 1732584193, s = -271733879, l = -1732584194, v = 271733878, g = -1009589776;
    for (u = 0; u < n.length; u += 16) {
        var h = a, d = s, x = l, p = v, w = g;
        for (c = 0; c < 80; c += 1) {
            f[c] = c < 16 ? n[u + c] : i(f[c - 3] ^ f[c - 8] ^ f[c - 14] ^ f[c - 16], 1);
            var m = o(o(i(a, 5), t(c, s, l, v)), o(o(g, f[c]), e(c)));
            g = v, v = l, l = i(s, 30), s = a, a = m;
        }
        a = o(a, h), s = o(s, d), l = o(l, x), v = o(v, p), g = o(g, w);
    }
    return Array(a, s, l, v, g);
}, t = function(n, r, t, e) {
    return n < 20 ? r & t | ~r & e : n < 40 ? r ^ t ^ e : n < 60 ? r & t | r & e | t & e : r ^ t ^ e;
}, e = function(n) {
    return n < 20 ? 1518500249 : n < 40 ? 1859775393 : n < 60 ? -1894007588 : -899497514;
}, o = function(n, r) {
    var t = (65535 & n) + (65535 & r);
    return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
}, i = function(n, r) {
    return n << r | n >>> 32 - r;
}, u = function(r) {
    var t, e = [], o = (1 << n) - 1;
    for (t = 0; t < r.length * n; t += n) e[t >> 5] |= (r.charCodeAt(t / n) & o) << 32 - n - t % 32;
    return e;
}, c = function(n) {
    var r, t, e = "";
    for (r = 0; r < 4 * n.length; r += 3) {
        var o = (n[r >> 2] >> 8 * (3 - r % 4) & 255) << 16 | (n[r + 1 >> 2] >> 8 * (3 - (r + 1) % 4) & 255) << 8 | n[r + 2 >> 2] >> 8 * (3 - (r + 2) % 4) & 255;
        for (t = 0; t < 4; t += 1) 8 * r + 6 * t > 32 * n.length ? e += "=" : e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >> 6 * (3 - t) & 63);
    }
    return e;
};

module.exports = {
    hash: function(t) {
        return c(r(u(t), t.length * n));
    },
    getWXUserInfo: function(n) {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(r) {
                "function" == typeof n && n(r, null);
            },
            fail: function(n) {
                wx.navigateTo({
                    url: "/pages/common/authorize/index"
                });
            }
        });
    },
    getWXCode: function(n) {
        wx.login({
            success: function(r) {
                if (r.code) "function" == typeof n && n(r.code, null); else if (!r.code) return void util.showTipsSwitchTab("用户授权失败", "/pages/index/index");
            },
            fail: function(n) {
                wx.navigateTo({
                    url: "/pages/common/authorize/index"
                });
            }
        });
    },
    extend: function(n, r) {
        var t = {};
        for (var e in r) e in t || (n[e] = r[e]);
        return n;
    },
    concatCookie: function(n) {
        var r = "";
        for (var t in n) r += t + "=" + n[t] + ";";
        return r;
    }
};
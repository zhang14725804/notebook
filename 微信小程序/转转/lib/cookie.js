Object.defineProperty(exports, "__esModule", {
    value: !0
});

var cookie = {
    cookieStorageName: "zz_wa_cookie",
    get: function(e) {
        for (var t = wx.getStorageSync(this.cookieStorageName), r = t.split(";"), i = 0; i < r.length; i++) if (0 === r[i].indexOf(e + "=")) {
            var o = r[i].indexOf("="), a = r[i].substring(o + 1);
            return a;
        }
        return "";
    },
    set: function(e, t) {
        t = String(t), "PPU" == e && '"' != t[0] && "" !== t && (t = '"' + t + '"');
        for (var r = wx.getStorageSync(this.cookieStorageName), i = r.split(";"), o = 0; o < i.length; o++) if (0 === i[o].indexOf(e + "=")) {
            var a = this.get(e);
            r = r.replace(e + "=" + a + ";", "");
            break;
        }
        r += e + "=" + t + ";", wx.setStorageSync(this.cookieStorageName, r);
    },
    setCookie: function(e) {
        e = Array.isArray(e) ? e[0] : e;
        for (var t = e.split(";"), r = 0; r < t.length; r++) {
            var i = t[r].trim();
            if (!/^(expires\=|domain\=|path\=|secure|Max-Age=|Version=)/i.test(i)) {
                var o = i.indexOf("="), a = i.substring(0, o), n = i.substring(o + 1);
                this.set(a, n);
            }
        }
    },
    getCookie: function() {
        return wx.getStorageSync(this.cookieStorageName);
    }
};

exports.default = cookie;
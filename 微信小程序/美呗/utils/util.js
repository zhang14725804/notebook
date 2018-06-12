var e = {
    set: function(e, t) {
        return new Promise(function(n, r) {
            wx.setStorage({
                key: e,
                data: t,
                success: function() {
                    n();
                },
                fail: function() {
                    r();
                }
            });
        });
    },
    get: function(e) {
        return new Promise(function(t, n) {
            wx.getStorage({
                key: e,
                success: function(e) {
                    if ("" == e.data || null == e.data) return n();
                    t(e.data);
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    remove: function(e) {
        return new Promise(function(t, n) {
            wx.removeStorage({
                key: e,
                success: function(e) {
                    t(e.data);
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    clear: function() {
        return wx.clearStorage();
    }
}, t = {
    preview: function(e, t) {
        wx.previewImage({
            current: e,
            urls: t
        });
    },
    choose: function(e) {
        return new Promise(function(t, n) {
            wx.chooseImage({
                count: e,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    t(e.tempFilePaths);
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    upload: function(e, t, n) {
        return new Promise(function(r, o) {
            wx.uploadFile({
                url: "https://up.qbox.me",
                filePath: e,
                name: "file",
                formData: {
                    key: n,
                    token: t
                },
                success: function(e) {
                    var t = JSON.parse(e.data);
                    r("https://cdn-ssl.meb.com/" + t.key);
                },
                fail: function(e) {
                    o();
                }
            });
        });
    }
}, n = function(e) {
    var t = new Date(1e3 * e), n = new Date(), o = Math.floor((n.getTime() - t.getTime()) / 1e3), a = o / 86400;
    if (1 == a) return "今天";
    if (a < 1) {
        if (o < 300) return "刚刚";
        if (o >= 300 && o < 3600) return Math.floor(o / 60) + "分钟前";
        if (o >= 3600 && o < 7200) return "1小时前";
    }
    return t.getFullYear() + "/" + r(t.getMonth() + 1) + "/" + r(t.getDate());
}, r = function(e) {
    var t = e < 10 ? "0" + e : e;
    return "00" == t ? "01" : t;
};

module.exports = {
    storage: e,
    images: t,
    calcDate: function(e) {
        var t = "number" == typeof e ? new Date(e) : new Date((e || "").replace(/-/g, "/")), n = new Date().getTime() - t.getTime(), r = Math.floor(n / 864e5);
        if (r > 0) return r + "天";
        var o = n % 864e5, a = Math.floor(o / 36e5);
        if (a <= 0) {
            var u = o % 36e5, i = Math.floor(u / 6e4);
            if (i <= 0) {
                var f = u % 6e4, c = Math.round(f / 1e3);
                return (c = c <= 0 ? c = 1 : c) + "秒";
            }
            return i + "分钟";
        }
        return a + "小时";
    },
    makePhone: function(e) {
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    formatDateLoc: function(e) {
        var t = e.split(" ")[0].split("-"), n = new Date(t[0], t[1] - 1, t[2]);
        return n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日";
    },
    formatDateZerofill: function(e) {
        if ("number" == typeof e) return n(e);
        var t = e.split(" ")[0].split("-"), o = new Date(t[0], t[1] - 1, t[2]);
        return o.getFullYear() + "/" + r(o.getMonth() + 1) + "/" + r(o.getDate());
    }
};
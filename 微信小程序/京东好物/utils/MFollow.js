function e(e, t) {
    if (!t || t == {}) return console.log("Data request can not be executed without data."), 
    !1;
    var a = n.Mmd5(), o = t.unionId ? t.unionId : "", u = t.url ? t.url : "", r = t.sku ? t.sku : "", l = a.hex_md5(r + "!@#$unionId~");
    wx.request({
        url: t.that.globalRequestUrl + "/kwxhome/union/getUnpl.json?unionId=" + o + "&url=" + u + "&sku=" + r + "&jda=" + e + "&sign=" + l,
        header: {
            "Content-Type": "application/json"
        },
        method: "GET",
        success: function(e) {
            wx.setStorage({
                key: "unpl",
                data: e.data.unpl
            });
        },
        fail: function(e) {
            console.log(e);
        }
    });
}

var n = require("Mmd5.js");

module.exports = {
    generateClickLog: function(n) {
        var t = null, a = wx.getStorageSync("__jda");
        if (a) e(a, n); else {
            clearInterval(t);
            var o = 100;
            t = setInterval(function() {
                o += 100, ((a = wx.getStorageSync("__jda")) || o > 5e3) && (clearInterval(t), e(a, n));
            }, 100);
        }
    }
};
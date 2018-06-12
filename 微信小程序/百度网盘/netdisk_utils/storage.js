Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.setCookieToStorage = function(e, o) {
    var t = e["Set-Cookie"];
    o.map(function(e) {
        var o = new RegExp("(" + e + "=)(\\S*)(;|$)"), r = t.match(o), c = r ? r[2] : null;
        try {
            wx.setStorageSync(e, c);
        } catch (e) {
            console.log("cookie-storage set error: ", e);
        }
    });
};
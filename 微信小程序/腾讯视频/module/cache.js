function e() {}

var t = require("./fns"), n = +new Date();

console.log("[Session ID]", n);

var a = {
    session: {
        set: function(e, t, r) {
            return a.set("session_" + e, t, -1 * n, r);
        },
        get: function(e, t) {
            return a.get("session_" + e, t);
        }
    },
    set: function(n, a, r, o) {
        "function" == t.type(r) ? (o = r, r = 0) : o && "function" != t.type(o) && (o = e), 
        (r = r || 0) > 0 && (r += +new Date());
        var c = {
            expr: +r,
            data: a
        };
        o ? wx.setStorage({
            key: "_cache_" + n,
            data: c,
            success: function() {
                o();
            },
            fail: function(e) {
                o(e || 'set "' + n + '" fail');
            }
        }) : wx.setStorageSync("_cache_" + n, c);
    },
    get: function(a, r) {
        function o(e) {
            return e ? e.expr ? e.date ? new Date() - (e.date + e.expr) < 0 ? e.data : (wx.removeStorage({
                key: a
            }), null) : e.expr < 0 && -1 * e.expr == n ? e.data : e.expr > 0 && new Date() < e.expr ? e.data : (wx.removeStorage({
                key: a
            }), null) : e.data : null;
        }
        if (!r) return o(wx.getStorageSync("_cache_" + a));
        "function" != t.type(r) && (r = e);
        var c = 'get "' + a + '" fail';
        wx.getStorage({
            key: "_cache_" + a,
            success: function(e) {
                e && e.data ? r(null, o(e.data)) : r(e ? e.errMsg || c : c);
            },
            fail: function(e) {
                r(e || c);
            }
        });
    }
};

module.exports = a;
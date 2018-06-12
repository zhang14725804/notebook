module.exports = {
    set: function(e, t, a) {
        wx.setStorageSync("_cache_" + e, {
            expr: a || 0,
            date: +new Date(),
            data: t
        });
    },
    get: function(e) {
        e = "_cache_" + e;
        var t = wx.getStorageSync(e);
        return t ? t.expr && t.expr ? new Date() - (t.date + t.expr) < 0 ? t.data : (wx.removeStorageSync(e), 
        null) : t.data : null;
    },
    del: function(e) {
        e = "_cache_" + e, wx.removeStorageSync(e);
    }
};
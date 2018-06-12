var e = {
    set: function(e, t) {
        wx.setStorage({
            key: e,
            data: t
        });
    },
    setSync: function(e, t) {
        wx.setStorageSync(e, t);
    },
    get: function(t) {
        return e.getSync(t);
    },
    getSync: function(e) {
        return wx.getStorageSync(e);
    },
    setExpire: function(t, n, r) {
        e.set(t, {
            value: n,
            expire: r,
            nowtime: Date.parse(new Date()) / 1e3
        });
    },
    setExpireSync: function(t, n, r) {
        e.setSync(t, {
            value: n,
            expire: r,
            nowtime: Date.parse(new Date()) / 1e3
        });
    },
    getExpire: function(t) {
        var n = e.get(t);
        if (n && n.expire) {
            if (Date.parse(new Date()) / 1e3 - n.nowtime > n.expire) return;
            return n.value;
        }
    },
    getExpireSync: function(t) {
        var n = e.getSync(t);
        if (n && n.expire) {
            if (Date.parse(new Date()) / 1e3 - n.nowtime > n.expire) return;
            return n.value;
        }
    },
    remove: function(e) {
        wx.removeStorage({
            key: e,
            success: function(e) {}
        });
    },
    removeSync: function(e) {
        wx.removeStorageSync(e);
    },
    clear: function() {
        wx.clearStorage();
    },
    clearSync: function() {
        wx.clearStorageSync();
    }
};

module.exports = e;
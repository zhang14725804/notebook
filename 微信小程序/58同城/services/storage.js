var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = {
    storage: {
        set: function(e, t, n) {
            return t = this._resetValue(t, n), new Promise(function(n) {
                wx.setStorage({
                    key: e,
                    data: t,
                    success: n
                });
            });
        },
        setSync: function(e, t, n) {
            t = this._resetValue(t, n), wx.setStorageSync(e, t);
        },
        _resetValue: function(e, t) {
            return t && (t = !0 === t ? 72e5 : t, e = {
                value: e,
                expire: Date.now() + t
            }), e;
        },
        get: function(e) {
            var t = this;
            return new Promise(function(t) {
                wx.getStorage({
                    key: e,
                    success: t,
                    fail: function() {
                        t({
                            data: null
                        });
                    }
                });
            }).then(function(n) {
                return t._expireCompare(e, n.data);
            });
        },
        _expireCompare: function(t, n) {
            if (n && "object" === (void 0 === n ? "undefined" : e(n)) && n.expire) {
                Date.now();
                return n.expire < Date.now() ? void this.clear(t) : n.value;
            }
            return n;
        },
        getSync: function(e) {
            var t = void 0;
            try {
                t = wx.getStorageSync(e);
            } catch (t) {
                console.error("storage getSync fail key:" + e);
            }
            return this._expireCompare(e, t);
        },
        remove: function(e) {
            return new Promise(function(t) {
                wx.removeStorage({
                    key: e,
                    success: t
                });
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
    }
};
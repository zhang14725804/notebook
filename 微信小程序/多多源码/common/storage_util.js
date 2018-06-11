Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../libs/es6-promise.min")), t = require("./message"), r = {
    getStorage: function(t) {
        return new e.default(function(e) {
            wx.getStorage({
                key: t,
                success: function(t) {
                    e(t.data);
                },
                fail: function() {
                    e(!1);
                }
            });
        });
    },
    setStorage: function(t, r) {
        return new e.default(function(e) {
            wx.setStorage({
                key: t,
                data: r,
                success: e,
                fail: e
            });
        });
    },
    removeStorage: function(t) {
        return new e.default(function(e) {
            wx.removeStorage({
                key: t,
                success: e,
                fail: e
            });
        });
    },
    getStorageSync: function(e) {
        try {
            return wx.getStorageSync(e);
        } catch (r) {
            console.error(r), t.Message.emit(t.KEYS.STORAGE_FAIL, {
                storage_key: e,
                func_name: "getStorageSync"
            });
        }
    },
    setStorageSync: function(e, r) {
        try {
            wx.setStorageSync(e, r);
        } catch (n) {
            console.error(n), t.Message.emit(t.KEYS.STORAGE_FAIL, {
                storage_key: e,
                func_name: "setStorageSync",
                data: JSON.stringify(r)
            });
        }
    }
};

exports.default = r;
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../constants/storage_keys")), r = require("../common/index");

exports.default = {
    saveSearchValue: function(r) {
        r = (r || "").trim();
        var t = this.getSearchValueArray() || [];
        if (r) {
            t.unshift(r.toString());
            var a = {}, u = [];
            return t.forEach(function(e) {
                a[e] || (u.push(e), a[e] = !0);
            }), u = u.slice(0, 10), wx.setStorageSync(e.default.SEARCH_HISTORY, u), u;
        }
        return t;
    },
    getSearchValueArray: function() {
        return r.StorageUtil.getStorageSync(e.default.SEARCH_HISTORY);
    },
    removeSearchValueArray: function() {
        wx.removeStorageSync(e.default.SEARCH_HISTORY);
    }
};
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../constants/storage_keys")), a = e(require("../common/storage_util"));

exports.default = {
    isEnable: null,
    setWebpEnable: function(e) {
        this.isEnable = e, e ? wx.setStorage({
            key: t.default.WEBP_ENABLE,
            data: 1
        }) : wx.setStorage({
            key: t.default.WEBP_ENABLE,
            data: 0
        });
    },
    isWebpEnable: function() {
        if (null === this.isEnable) {
            var e = !!a.default.getStorageSync(t.default.WEBP_ENABLE);
            return this.isEnable = e, e;
        }
        return this.isEnable;
    }
};
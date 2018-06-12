Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    return new e.default(function(e, o) {
        wx.request({
            url: "https://search.video.iqiyi.com/o",
            data: t || {},
            method: "GET",
            success: function(t) {
                e(t.data);
            },
            fail: o
        });
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/polyfill/promise"));
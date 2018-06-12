Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.getDocumentUr = function(e) {
    return new Promise(function(t, r) {
        wx.request({
            url: e,
            success: t,
            fail: r
        });
    });
};
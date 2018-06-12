Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLiveVideoPage = function(t) {
    return new e.default(function(e, i) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/live/" + t + "/",
            method: "GET",
            success: function(t) {
                if ("200" == t.statusCode) {
                    var u = t.data;
                    u ? e(u) : i(t);
                } else i(t);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));
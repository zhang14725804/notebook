Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));

exports.default = {
    getHotDanceInfo: function() {
        return new e.default(function(e, t) {
            wx.request({
                url: "https://pub.m.iqiyi.com/h5/qipu/resources/3446475212/",
                method: "GET",
                success: function(u) {
                    var r = u.data;
                    if (r && r.items.length > 0) {
                        var o = r.items;
                        e(o[0].kvs);
                    } else t(u);
                },
                fail: t
            });
        });
    }
};
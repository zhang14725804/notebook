function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.loadSpecialPage = function() {
    return new t.default(function(e, t) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/subject/jiewu/",
            method: "GET",
            success: function(i) {
                var o = u.default.isObject(i.data) ? i.data : {};
                o && "A00000" == o.code ? e(o) : t(o);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
};

var t = e(require("../../../common/polyfill/promise")), u = e(require("../../../common/utils/util"));
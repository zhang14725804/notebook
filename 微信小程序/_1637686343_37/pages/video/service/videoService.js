Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoInfo = function(i) {
    var u = i.qipuId, o = i.vid, r = i.rate;
    return u ? e.getVideoSource({
        qipuId: u,
        vid: o,
        rate: r
    }) : t.default.resolve();
}, exports.getVideoPage = function(e) {
    return new t.default(function(t, i) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/" + e + "/",
            method: "GET",
            success: function(e) {
                "200" == e.statusCode && e.data.data ? t(e.data) : i(e);
            },
            fail: i
        });
    });
}, exports.getVideoList = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return new t.default(function(t, u) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/avlist/" + i + "/" + e + "/",
            method: "GET",
            success: function(e) {
                t(e.data);
            },
            fail: u
        });
    });
}, exports.getSourceVideoList = function(e, i, u) {
    return new t.default(function(t, o) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/sdvlist/" + e + "/" + i + "/" + u + "/",
            method: "GET",
            success: function(e) {
                t((e.data || {}).data);
            },
            fail: o
        });
    });
};

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../../common/source/qiyiVideoSource")), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));
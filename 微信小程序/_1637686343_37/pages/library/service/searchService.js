function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoList = function(e) {
    return new t.default(function(t, o) {
        wx.request({
            url: "https://search.video.iqiyi.com/o",
            data: e || {},
            method: "GET",
            success: function(e) {
                var a = e.data;
                if ("A00000" == a.code) {
                    var i = r.default.getFormatData(a.data);
                    t(i);
                } else o(e);
            },
            fail: o
        });
    });
};

var t = e(require("../../../common/polyfill/promise")), r = (e(require("../common/config")), 
e(require("../../../common/search/searchInterface")));
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    return new t.default(function(o, t) {
        wx.request({
            url: u,
            data: e,
            success: function(e) {
                o(e);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
};

var o = e(require("../../../common/login/config")), t = e(require("../../../common/polyfill/promise")), u = o.default.host + "/apis/user/info.action";
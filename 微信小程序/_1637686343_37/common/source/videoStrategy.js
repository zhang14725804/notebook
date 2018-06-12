function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return new t.default(function(t, u) {
        var i = r[e];
        i ? t(i) : wx.request({
            url: "https://m.iqiyi.com/api/cloud/code",
            data: {
                _tv_id_: e,
                vfm: n
            },
            method: "GET",
            success: function(n) {
                if ("200" == n.statusCode) {
                    var i = n.data ? n.data.strategy : "";
                    t(i), r[e] = i;
                } else u();
            },
            fail: u
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.validPlatform = function(r, u) {
    return e(r, u).then(function(e) {
        return new t.default(function(t, r) {
            e === n ? r() : t(e);
        });
    });
};

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../polyfill/promise")), n = "3", r = {};
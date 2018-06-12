function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a, o) {
    return {
        type: "SET",
        info: e,
        index: t,
        records: a,
        isLogin: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../../../components/load/loadActions")), o = e(require("../../../components/searchLayout/searchLayoutAction"));

exports.default = Object.assign({
    setData: t,
    switchFocus: function(e, t, a, o) {
        return {
            type: "SWITCH_FOCUS",
            bgImageUrl: t,
            qipuId: e,
            customType: a,
            customLink: o
        };
    },
    getIndexData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return function(r) {
            wx.request({
                url: "https://pub.m.iqiyi.com/h5/mina/index/",
                method: "GET",
                success: function(n) {
                    var u = n.data;
                    u && u.data ? (u.data.tags = u.data.tags || [], r(t(u.data, 0, e, o)), r(a.default.completeLoad())) : r(a.default.errorLoad());
                },
                fail: function() {
                    return r(a.default.errorLoad());
                }
            });
        };
    },
    removePlayRecord: function(e) {
        return {
            type: "REMOVE_PLAY_RECORD",
            rightTime: e
        };
    }
}, a.default, o.default);
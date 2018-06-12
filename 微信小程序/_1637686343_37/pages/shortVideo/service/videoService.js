function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoInfo = function(e) {
    var r = e.qipuId, u = e.vid, i = e.rate;
    return r ? t.getVideoSource({
        qipuId: r,
        vid: u,
        rate: i
    }) : o.default.resolve();
}, exports.getVideoPage = function(e) {
    var r = e.channelId, t = e.action || 1, u = {
        uid: e.uid,
        ppuid: e.ppuid
    };
    return new o.default(function(e, o) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/hot/" + r + "/" + t + "/",
            method: "GET",
            data: u,
            success: function(r) {
                var t = r.data;
                "A00000" == t.code ? e(t) : o(t);
            },
            fail: o
        });
    });
}, exports.agreeOrCancel = function(e) {
    var r = Object.assign({}, {
        agenttype: n.default.agenttype,
        proxyUri: a.AGREE
    }, e);
    return u.commonPostRequest({
        url: "" + i.default.OUTERHOST.PUB + a.PROXY,
        reqParams: r
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return o.default.reject(e);
    });
};

var t = r(require("../../../common/source/qiyiVideoSource")), o = e(require("../../../common/polyfill/promise")), u = r(require("../../../common/serviceApi/serviceApi")), i = e(require("../../../common/utils/util")), n = e(require("../../../common/login/constant")), a = {
    AGREE: "feed/agree",
    PROXY: "/h5/mina/proxy/feed/"
};
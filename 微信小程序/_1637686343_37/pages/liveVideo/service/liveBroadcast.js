function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return new o.default(function(t, r) {
        var u;
        u = a.default.getAuthcookie() && a.default.isVip() ? 1 : 0;
        var n = d.cmd5xlive(), o = {
            lc: e.lc,
            lp: e.lp,
            src: c.default.ptidAndroid,
            uid: a.default.getUid(),
            k_uid: a.default.getAnonymousUid(),
            v: u,
            rateVers: "H5_QIYI"
        };
        Object.assign(o, n);
        var l = "/live?" + i(o), f = d.cmd5x(l);
        Object.assign(o, {
            vf: f
        }), wx.request({
            url: s + "/live",
            data: o,
            method: "GET",
            success: function(e) {
                var i = e.data;
                i && "A00000" == i.code ? t(i) : r(i);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}

function i(e) {
    var t = Object.keys(e), i = "";
    for (var r in t) {
        var u = t[r];
        "string" == typeof u && (i += "&" + u + "=" + e[u]);
    }
    return i = i.substring(1);
}

function r(e, t) {
    return new o.default(function(i, r) {
        var o = e.url, d = new Date().getTime(), l = "afbe8fd3d73448c9", s = n.default.md5(t + "_" + l + "_" + d + "_2391461978"), v = "mobile-wx_" + a.default.getDynamicUuid(), m = {
            qpid: t,
            cid: l,
            ut: d,
            uuid: a.default.getAnonymousUid(),
            uid: a.default.getUid() || 0,
            platform: c.default.bossPlatform,
            P00001: a.default.getAuthcookie(),
            v: s,
            version: "4.0",
            filename: e.streamName,
            qd_uid: u(o, "qd_uid"),
            qd_vip: u(o, "qd_vip"),
            qd_vipres: u(o, "qd_vipres"),
            qd_src: u(o, "qd_src"),
            qd_tm: u(o, "qd_tm"),
            qd_ip: u(o, "qd_ip"),
            qd_sc: u(o, "qd_sc"),
            qd_tvid: u(o, "qd_tvid"),
            qd_scc: u(o, "qd_scc"),
            appName: "mobile-wx",
            messageId: v
        };
        wx.request({
            url: f + "/services/ckLiveN.action",
            data: m,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data;
                t && "A00000" == t.code ? i(e) : r(t);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}

function u(e, t) {
    var i, r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)");
    return (i = e.match(r)) ? i[2] : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLiveSource = function(e) {
    return t(e).then(function(e) {
        return (0, l.liveSuccessHandler)(e);
    }).catch(function(e) {
        return (0, l.liveFailureHandler)(e);
    });
}, exports.getLiveAuthSource = function(e, t) {
    return r(e, t).then(function(e) {
        return (0, l.liveSuccessHandler)(e);
    }).catch(function(e) {
        return (0, l.liveFailureHandler)(e);
    });
}, exports.getPayToken = r;

var n = e(require("../../../common/utils/util")), o = e(require("../../../common/polyfill/promise")), d = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../../common/utils/vf")), c = e(require("../../../common/login/constant")), a = e(require("../../../common/user/user")), l = require("../../../common/source/qiyiVideoSource"), s = "https://live.video.iqiyi.com", f = "https://api.vip.iqiyi.com";
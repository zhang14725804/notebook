function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i(e) {
    var i = {};
    return i.vfrm = e.vfrm || "", i.aid = e.aid, i.vid = "5179d51af88ca6cd0eb3eec0c2c36b4d", 
    i.player = e.player, i.qipuId = e.qipuId, i.publicLevel = e.publicLevel, i.rate = e.rate, 
    i;
}

function t(e) {
    var i = e.qipuId, t = e.vid, n = e.rate || 2;
    return (0, p.auth)(i, t, n, 0).then(function(i) {
        return o(i, e);
    }, function(i) {
        return a(i, e);
    });
}

function n(e, i, t) {
    var n = {};
    return n.src = e.src, n.pubLevel = t.pubLevel, n.info = i, n.rate = t.rate || 1, 
    n.qipuId = t.qipuId, n.vid = t.vid, n.duration = i.duration, n.prv = "1" === i.prv, 
    n.previewType = "2" === i.previewType ? "whole" : "6min", n.formatType = s.default.videoFormat(), 
    n;
}

function r(e, i, t, n) {
    return {
        content: e,
        msg: i,
        videos: t,
        info: n || {}
    };
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments[1], t = e.data || {};
    return new v.default(function(o, a) {
        var f = u(t) || d(t);
        f && a(f);
        var l = n(e, t, i);
        "A00000" === e.status || e.status, "A00012" === e.status && (console.log("tmts接口调用完毕，需要请求广告sdk"), 
        l.isPlayAD = !0), e.src || "A00012" === e.status ? (console.log("tmts接口调用成功"), o(l)) : (console.log("tmts接口调用失败!"), 
        a(r("noSrc")));
    });
}

function a() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = (arguments[1], 
    e.data || {});
    return new v.default(function(t, n) {
        n(u(i) || d(i) || f(e));
    });
}

function u(e) {
    if (e && e.pano && e.pano.type && 1 != e.pano.type) return r("isPanoSource");
}

function d(e) {
    if (e.vipInfo) {
        var i = e.vipInfo, t = i.status;
        if ("A10001" === t) return r("concurrentTip", {
            param: i.keepalive,
            text: i.text
        });
        if ("A10002" === t) return r("forbidTip", {
            param: i.unfeeze_times,
            text: i.text
        });
    }
}

function f(e) {
    var i = {
        A00001: "noSrc",
        A00002: "noSrc",
        A00003: "noSrc",
        A00004: function(e) {
            return "1" !== (e.data || {}).prv ? "offline" : "preNotSrc";
        },
        A00011: "vipckfail",
        A00013: "oversea",
        Q00201: "offline",
        Q00202: "offline",
        Q00203: "offline",
        A00101: "mtexpire",
        A00110: "platformLimit",
        A00111: function(e) {
            return e.ctl && 301 == e.ctl.area ? "oversea" : "domestic";
        },
        A00113: "ugcUnpass",
        A00114: "playerForbidden",
        A00115: "playerForbidden",
        A00301: "private",
        A00302: "private",
        A00116: "drmLimit",
        A00117: "drmLimit",
        A02602: function() {
            return m.default.isLogin() ? m.default.isLogin() && !m.default.isVip() ? "vipckfail" : void 0 : "anonymousLayer";
        },
        A02503: function() {
            return m.default.isLogin() ? m.default.isLogin() && !m.default.isVip() ? "vipckfail" : void 0 : "anonymousLayer";
        }
    }[e.code];
    return i = i && c.default.isFunction(i) ? i(e) : i, i = i || "defaultTmtsErr", r(i, {
        code: e.code
    }, {}, e.data);
}

function l(e) {
    var i = {
        A00111: "domestic",
        A00110: "miniLimit",
        A00119: "miniLimit",
        A00120: "miniLimit",
        Q00304: function() {
            return m.default.isLogin() ? m.default.isLogin() && m.default.isExpiredVip() ? "vipfrozen" : void 0 : "anonymousLayer";
        },
        Q00310: "vipckfail",
        Q00311: "vipfrozen",
        Q00312: "vipfrozen",
        A02602: function() {
            return m.default.isLogin() ? m.default.isLogin() && !m.default.isVip() ? "vipckfail" : void 0 : "anonymousLayer";
        },
        A02503: function() {
            return m.default.isLogin() ? m.default.isLogin() && !m.default.isVip() ? "vipckfail" : void 0 : "anonymousLayer";
        }
    }[e.code];
    return i = i && c.default.isFunction(i) ? i(e) : i, i = i || "defaultLiveErr", r(i, {
        code: e.code
    }, {}, e.data);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoSource = function(e) {
    return e = i(e), t(e);
}, exports.message = r, exports.liveFailureHandler = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = (arguments[1], 
    e.data || {});
    return new v.default(function(t, n) {
        n({
            errorMessage: u(i, "miniLimit") || l(e),
            data: e
        });
    });
}, exports.liveSuccessHandler = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = (arguments[1], 
    e.data || {});
    return new v.default(function(t, n) {
        i.data && i.data.prv && "1" == i.data.prv && n(e);
        var r = u(i, "miniLimit") || d(i);
        r ? n(r) : t(e);
    });
};

var c = e(require("../utils/util")), s = e(require("videoUtil")), p = require("sourceAuth"), v = e(require("../polyfill/promise")), m = e(require("../user/user"));
function e(e) {
    return e.prv && "6min" === e.previewType || "1" === e.prv && "2" !== e.previewType;
}

function r(e) {
    return e >= 0 && e < 1e4 ? e : e >= 1e4 && e < 1e8 ? (e / 1e4).toFixed(1) + "万" : e >= 1e8 ? (e / 1e8).toFixed(1) + "亿" : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.is6minVideo = e, exports.getError = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = void 0;
    return t.errorConfig.forEach(function(r) {
        r.type === e.content && ((o = r).code = e.msg ? e.msg.code : "");
    }), Object.assign({}, o, r);
}, exports.upvoteHandle = r;

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/util")), t = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}(require("videoConfig")), i = {
    ALBUM: "album",
    SOURCE: "source",
    MOVIE: "movie",
    SHORT: "short",
    LIVE: "live"
};

exports.default = {
    videoFormat: function() {
        return -1 !== wx.getSystemInfoSync().system.indexOf("Android") ? "mp4" : "m3u8";
    },
    error: function(e) {
        console.error(e);
    },
    log: function(e) {
        console.log(e);
    },
    getVideoTemplate: function(e) {
        var r = e.isSolo, o = e.isSource, t = e.channelId, n = e.cid, u = e.isLive, s = e.isPaidLive, c = i;
        return (n = n || t || "") && 1 == n ? c.MOVIE : !o && r ? c.SHORT : o || r || s || u ? o || r || !s && !u ? c.SOURCE : c.LIVE : c.ALBUM;
    },
    getLrCorner: function(e, r, t, n, u, s) {
        var c = "", l = i;
        return e === l.MOVIE ? (r && (r = r.toFixed(1)), c = r) : c = e === l.ALBUM ? 1 === t ? n + "集全" : "更新至" + n + "集" : e === l.SOURCE ? u && 8 === u.length ? u.slice(0, 4) + "-" + u.slice(4, 6) + "-" + u.slice(6, 8) + "期" : "" : o.default.time.formatSecondOmit(s), 
        c;
    },
    is6minVideo: e,
    upvoteHandle: r
};
function t(t, i) {
    var r = i.qipuId, u = i.share, o = i.bestView, s = i.animation, a = n(u);
    return Object.assign({
        height: a,
        animation: s,
        scrollTop: e(r, o)
    }, o);
}

function e(t, e) {
    var n = (e.videos || []).reduce(function(e, n, i) {
        return e >= 0 ? e : n.qipuId === t ? i : e;
    }, -1);
    return n >= 0 ? n * a.default.getPxByRpx(184) : 0;
}

function n(t) {
    return wx.getSystemInfoSync().windowHeight - a.default.getPxByRpx(422, 120, t ? 96 : 0);
}

function i(t, e) {
    return Object.assign({}, t, {
        animation: e.animation
    });
}

function r() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    if (t.scrollLeft = void 0, "INIT" === e.type) {
        var n = o(e.bestViews || [], e.playInfo);
        return {
            more: !0,
            title: u(e.playInfo.period) + " 看点",
            videos: n
        };
    }
    if ("BEST_VIEW_SCROLL_LEFT" === e.type) {
        var i = (t.videos || []).reduce(function(t, n, i) {
            return t >= 0 ? t : n.qipuId === e.qipuId ? i : t;
        }, -1);
        return Object.assign({}, t, {
            scrollLeft: i * a.default.getPxByRpx(260, 30)
        });
    }
    return t;
}

function u(t) {
    return t && 8 === t.length ? t.slice(0, 4) + "-" + t.slice(4, 6) + "-" + t.slice(6, 8) + "期" : "";
}

function o(t, e) {
    return t.map(function(t) {
        return Object.assign({}, t, {
            qipuId: t.tvId || t.tvQipuId,
            shortTitle: t.shortTitle || t.vn,
            pageUrl: t.vUrl,
            tags: t.tags,
            updateStrategy: "",
            vt: t.tvFocus,
            imageUrl: s(t.tvPicUrl) || s(t.vpic),
            playCountCN: a.default.numToChinaNum(t.disCnt),
            showContent: a.default.time.formatSecondOmit(t.timeLength),
            cid: e.cid
        });
    });
}

function s(t) {
    return t ? t.replace(/(.jpg|bmp|gif)$/, "_284_160$1") : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sourceBestView = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
    switch (e.scrollTop = void 0, n.type) {
      case "INIT":
        return r(e, n);

      case "SHOW_SOURCE_BEST_VIEW":
        return t(0, n);

      case "HIDE_SOURCE_BEST_VIEW":
        return i(e, n);

      default:
        return e;
    }
}, exports.bestView = r;

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/utils/util"));
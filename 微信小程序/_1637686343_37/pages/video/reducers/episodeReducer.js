function e(e, t) {
    var n = t.episode, r = Object.assign({}, e);
    return n && n.scrollTop ? r.scrollTop = n.scrollTop : delete r.scrollTop, r;
}

function t(e, t) {
    var o = t.pd, i = t.share, a = t.videoList, c = t.animation, d = n(o), f = s(a), p = f.tabs, v = f.videos;
    return {
        height: l(p.length > 1 ? 100 : 0, i),
        scrollTop: u(o, v[d], r()),
        tabs: p,
        tabSize: p.length,
        videos: v,
        selectedTabIndex: d,
        animation: c,
        isshow: !0
    };
}

function n(e) {
    return Math.floor((e - 1) / 50);
}

function r() {
    return d.default.getPxByRpx(110, 30);
}

function o(e) {
    var t = Math.ceil(e.total / 50);
    return function(e) {
        for (var n = 0; n < t; n++) e(n, t);
    };
}

function i(e, t) {
    var n = s(t.videoList), r = n.tabs, o = n.videos;
    return {
        height: e.height,
        tabs: r,
        tabSize: r.length,
        videos: o,
        selectedTabIndex: t.index
    };
}

function u(e, t, n) {
    var r = t.reduce(function(t, n) {
        return n.pd <= e ? ++t : t;
    }, 0);
    return (Math.ceil(r / 5) - 1) * n;
}

function s(e) {
    var t = [], n = [];
    return o(e)(function(r, o) {
        t.push(a(r, o, e.total)), n.push(c(e, r));
    }), {
        tabs: t,
        videos: n
    };
}

function a(e, t, n) {
    return 50 * e + 1 + "-" + (e == t - 1 ? n : 50 * (e + 1));
}

function c(e, t) {
    var n = 50 * t, r = 50 * (t + 1);
    return e.videos.filter(function(e) {
        return e.pd > n && e.pd <= r;
    });
}

function l(e, t) {
    return wx.getSystemInfoSync().windowHeight - d.default.getPxByRpx(422, 120, e, t ? 96 : 0);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
    switch (n = e(n, r), r.type) {
      case "SHOW_EPISODE":
        return t(0, r);

      case "SWITCH_TAB":
        return i(n, r);

      case "EDIT_EPISODE":
        return Object.assign({}, n, r.episode);

      case "SET_EPISODE":
        return r.episode;

      default:
        return n;
    }
};

var d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));
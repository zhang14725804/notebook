function e(e, t) {
    var a = t.qipuId, d = t.share, f = t.videoList, l = t.animation, h = {
        videoTag: n(e, f),
        months: o(f.summary)
    }, m = u(a, h.videoTag), y = m.currentKey, g = m.index;
    return h.height = s(0, d), h.currentYear = c(y), h.animation = l, h.videos = r(h.months, h.videoTag), 
    h.selectedTabIndex = i(y, h.months), h.scrollTop = g * v.default.getPxByRpx(184), 
    h.scrollLeft = h.selectedTabIndex * v.default.getPxByRpx(120), h;
}

function r(e, r) {
    var n = [], t = !0, u = !1, i = void 0;
    try {
        for (var o, a = e[Symbol.iterator](); !(t = (o = a.next()).done); t = !0) {
            var c = r[o.value.id] || [];
            n.push(c);
        }
    } catch (e) {
        u = !0, i = e;
    } finally {
        try {
            !t && a.return && a.return();
        } finally {
            if (u) throw i;
        }
    }
    return n;
}

function n(e, r) {
    if (e.videoTag) return e.videoTag;
    var n = r.videos, u = r.currentYear, i = r.currentMonth;
    return n.reduce(function(e, r) {
        var n = t(r.period);
        n.year === u && n.month === i || (u = n.year, i = n.month);
        var o = a(u, i), c = e[o] || [];
        return c.push(r), e[o] = c, e;
    }, {});
}

function t(e) {
    return e && 8 === e.length ? {
        year: e.slice(0, 4),
        month: e.slice(4, 6)
    } : null;
}

function u(e, r) {
    var n, t = 0;
    for (var u in r) n || (n = u), r[u].some(function(r, n) {
        return r.qipuId === e && (t = n, !0);
    }) && (n = u);
    return {
        currentKey: n,
        index: t
    };
}

function i(e, r) {
    return r.reduce(function(r, n, t) {
        return r >= 0 ? r : n.id === e ? t : r;
    }, -1);
}

function o(e) {
    return e.reduce(function(e, r) {
        var n = r.year, t = r.monthList.map(function(e) {
            return {
                id: a(n, e),
                text: e + "月"
            };
        });
        return e.concat(t);
    }, []);
}

function a(e, r) {
    return e + "-" + r;
}

function c(e) {
    return e.substring(0, e.indexOf("-"));
}

function s(e, r) {
    return wx.getSystemInfoSync().windowHeight - v.default.getPxByRpx(422, 120, 68, r ? 96 : 0);
}

function d(e, r) {
    return Object.assign({}, e, {
        animation: r.animation
    });
}

function f(e, n) {
    if (!n.year || !n.month) return e;
    var t = a(n.year, n.month);
    e.videoTag[t] = n.videos;
    var u = i(t, e.months);
    return Object.assign({}, e, {
        currentYear: n.year,
        selectedTabIndex: u,
        videos: r(e.months, e.videoTag),
        scrollLeft: void 0
    });
}

function l(e, r) {
    return Object.assign({}, e, {
        currentYear: r.currentYear,
        scrollLeft: void 0
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1], t = Object.assign({}, r);
    switch (delete t.scrollTop, n.type) {
      case "SHOW_SOURCE_EPISODE":
        return e(t, n);

      case "HIDE_SOURCE_EPISODE":
        return d(t, n);

      case "ADD_SOURCE_VIDEO":
      case "SET_SOURCE_TAG":
        return f(t, n);

      case "EDIT_CURRENT_YEAR":
        return l(t, n);

      default:
        return t;
    }
};

var v = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));
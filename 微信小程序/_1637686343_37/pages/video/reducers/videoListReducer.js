function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments[1], n = arguments[2];
    return n.videos ? n : ("source" === r && e && (t(e.videos || []), e.title = "选集", 
    e.more = !0, e.icon = !0), e);
}

function t(e) {
    e.forEach(function(e) {
        e.icon = r(e), e.showContent = n(e.period), e.playCountCN = c.default.numToChinaNum(e.playCount);
    });
}

function r(e) {
    e.payMark;
    return e.payMark >= 4 && e.payMark <= 6 ? {
        isTennisVip: !0
    } : {
        isVip: 0 !== e.payMark
    };
}

function n(e) {
    return e && 8 === e.length ? e.slice(0, 4) + "-" + e.slice(4, 6) + "-" + e.slice(6, 8) + "期" : "";
}

function o(e, t) {
    var r = t.pb, n = c.default.getPxByRpx(110) + c.default.getPxByRpx(20), o = n * (r - 1) - (wx.getSystemInfoSync().windowWidth - n) / 2;
    return Object.assign({}, e, {
        scrollLeft: o
    });
}

function a(e, r) {
    return t(r.videos), Object.assign({}, e, {
        videos: u(r),
        page: r.page
    });
}

function i(e, t) {
    return Object.assign({}, e, {
        videos: e.videos.concat(t.videos),
        page: t.page
    });
}

function u(e) {
    function t(e) {
        var t = e.split("-");
        return {
            year: t[0],
            month: t[1]
        };
    }
    var r = [];
    e.videoTag[e.year + "-" + e.month] = e.videos;
    var n = [];
    for (var o in e.videoTag) n.push(o);
    for (var a = 0; a < n.length; a++) for (var i = a; i < n.length; i++) if (function(e, r) {
        var n = t(e), o = n.year, a = n.month, i = t(r), u = i.year, s = i.month;
        return u > o || o === u && s > a;
    }(n[a], n[i])) {
        var u = n[a];
        n[a] = n[i], n[i] = u;
    }
    var s = !0, c = !1, l = void 0;
    try {
        for (var f, d = n[Symbol.iterator](); !(s = (f = d.next()).done); s = !0) {
            var v = f.value;
            r = r.concat(e.videoTag[v]);
        }
    } catch (e) {
        c = !0, l = e;
    } finally {
        try {
            !s && d.return && d.return();
        } finally {
            if (c) throw l;
        }
    }
    return r;
}

function s(e, t) {
    var r = e.videos.reduce(function(e, r, n) {
        return e >= 0 ? e : r.qipuId === t.qipuId ? n : e;
    }, -1);
    return Object.assign({}, e, {
        scrollLeft: r * c.default.getPxByRpx(290)
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1], n = r.videoList, u = Object.assign({}, t);
    switch (n && n.scrollLeft ? u.scrollLeft = n.scrollLeft : delete u.scrollLeft, r.type) {
      case "INIT":
        return e(n, r.playInfo.subType, u) || u;

      case "SET_VIDEO_LIST":
        return n;

      case "EDIT_VIDEO_LIST":
        return Object.assign({}, u, n);

      case "PB_SCROLL_LEFT":
        return o(t, r);

      case "ADD_VIDEO":
        return i(t, r);

      case "ADD_SOURCE_VIDEO":
        return a(t, r);

      case "SOURCE_SCROLL_LEFT":
        return s(t, r);

      default:
        return u;
    }
};

var c = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));
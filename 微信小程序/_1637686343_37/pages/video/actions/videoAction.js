function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function r(e) {
    var t = e.videoList, r = e.playInfo, n = !t || !t.videos || t.videos.length <= 0;
    if (t.currentYear && t.currentMonth && n) return a.getSourceVideoList(r.sourceId, t.currentYear, t.currentMonth).then(function(t) {
        if (t) {
            var o = [];
            t.videos.forEach(function(e) {
                e && e.qipuId && (delete e.books, delete e.comicbooks, delete e.tickets, delete e.games, 
                e.aid = r.sourceId || ""), o.push(e);
            }), e.videoList.videos = o;
        }
        return e;
    });
    if (t && !r.sourceId) return o(t, r).then(function(o) {
        var n = [];
        return o.forEach(function(e, t) {
            e && e.qipuId && (delete e.vpic, delete e.imageUrl, delete e.vurl, delete e.pageUrl, 
            delete e.books, delete e.comicbooks, delete e.tickets, delete e.games, delete e.qualityImageUrl, 
            delete e.period, e.aid = r.aid || "", n.push(e));
        }), t.videos = n, t.page = t.totalPages, s.default.storage.handleStorageMuti("set", "CUR_VIDEOLIST_VIDEOS", n), 
        e;
    });
    if (r && "album" == r.subType && t && t.videos && t.videos.length) {
        var i = [];
        t.videos.forEach(function(e, t) {
            e && e.qipuId && (delete e.vpic, delete e.imageUrl, delete e.vurl, delete e.pageUrl, 
            delete e.books, delete e.comicbooks, delete e.tickets, delete e.games, delete e.qualityImageUrl, 
            delete e.period, e.aid = r.aid || "", i.push(e));
        }), s.default.storage.handleStorageMuti("set", "CUR_VIDEOLIST_VIDEOS", i);
    }
    return l.default.resolve(e);
}

function o(e, t) {
    var r = e.totalPages, o = e.videos, i = e.pageSize;
    return o.length > (r - 1) * i ? l.default.resolve(e.videos) : n(t.aid, 2, e.totalPages, e.videos);
}

function n(e, t, r, o) {
    if (t > r) return l.default.resolve(o);
    for (var i = [], u = 1; t <= r && u <= 4; ) {
        var d = a.getVideoList(e, t);
        u++, t++, i.push(d);
    }
    return l.default.all(i).then(function(e) {
        o = e.reduce(function(e, t) {
            return e.concat(t.data.videoList.videos);
        }, o);
    }).then(function() {
        return n(e, t, r, o);
    });
}

function i(e) {
    return Object.assign({
        type: "INIT"
    }, e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = t(require("../service/videoService")), u = t(require("../../../components/paopao/paopaoService")), l = e(require("../../../common/polyfill/promise")), d = require("../../../components/paopao/paopao"), s = e(require("../../../common/utils/util"));

exports.default = {
    loadVideoPage: function(e, t) {
        return function(t) {
            return a.getVideoPage(e).then(function(e) {
                var t = e.data;
                return t.originPlayInfo = t.playInfo, r(t);
            }).then(function(e) {
                var t = e.playInfo && e.playInfo.maCircleIds || [];
                return t.length > 2 ? u.getPaopaoList().then(function(r) {
                    var o = t.toString(), n = r.atoken;
                    return u.getPaopaoBaseInfo(n, o).then(function(t) {
                        return e.starUp = (0, d.filterPaopaoStar)(t), e;
                    }, function() {
                        return e;
                    });
                }).catch(function(t) {
                    return e;
                }) : e;
            }).then(function(e) {
                return t(i(e)), e.playInfo;
            });
        };
    },
    init: i,
    setUrl: function(e) {
        return {
            type: "SET_URL",
            url: e
        };
    }
};
function e() {
    var t = e.animation;
    return t || (t = e.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
    })), t;
}

function t(e, i, o) {
    return function(u, a) {
        if (!t.begin) {
            t.begin = !0;
            var s = a().sourceEpisode, c = s.videoTag[i + "-" + o];
            return (c ? r.default.resolve({
                type: "SET_SOURCE_TAG",
                videos: c,
                year: i,
                month: o
            }).then(u) : n.getSourceVideoList(e, i, o).then(function(e) {
                e && u({
                    type: "ADD_SOURCE_VIDEO",
                    videos: e.videos,
                    videoTag: s.videoTag,
                    year: i,
                    month: o
                });
            })).then(function() {
                t.begin = !1;
            }, function() {
                t.begin = !1;
            });
        }
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../service/videoService")), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));

exports.default = {
    showSourceEpisode: function(t, n, r) {
        var i = e();
        return i.translate3d(0, 0, 0).step(), {
            type: "SHOW_SOURCE_EPISODE",
            qipuId: t,
            share: n,
            videoList: r,
            animation: i.export()
        };
    },
    hideSourceEpisode: function() {
        var t = e();
        return t.translate3d(0, "100%", 0).step(), {
            type: "HIDE_SOURCE_EPISODE",
            animation: t.export()
        };
    },
    setSourceTag: t,
    editCurrentYear: function(e) {
        return {
            type: "EDIT_CURRENT_YEAR",
            currentYear: e
        };
    }
};
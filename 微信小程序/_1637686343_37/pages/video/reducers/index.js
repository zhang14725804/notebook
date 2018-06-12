function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    return e.map(function(e) {
        return Object.assign({}, e, {
            qipuId: e.tvQipuId,
            shortTitle: e.vn || e.shortTitle,
            pageUrl: e.vurl,
            updateStrategy: "",
            vt: "",
            imageUrl: r(e.vpic) || r(e.tvPicUrl),
            showContent: i.default.time.formatSecondOmit(e.timeLength),
            cid: t.cid
        });
    });
}

function r(e) {
    return e ? e.replace(/(.jpg|bmp|gif)$/, "_284_160$1") : "";
}

function o(e) {
    return e.map(function(e) {
        return Object.assign({}, e, {
            aid: e.albumId,
            shortTitle: e.mainTitle || e.shortTitle,
            pageUrl: e.pageUrl,
            tags: e.tags,
            updateStrategy: "",
            vt: e.focus,
            playCountCN: i.default.numToChinaNum(e.count)
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../../../common/utils/util")), n = e(require("../../../components/load/loadReducers")), u = e(require("../../../components/videoLayout/videoLayoutReducer")), a = e(require("../../../components/comment/commentReducer")), l = e(require("../../../components/floatLayer/floatLayerReducer")), d = e(require("../common/config")), c = e(require("episodeReducer")), s = e(require("videoListReducer")), f = e(require("videoControlReducer")), p = e(require("playInfoReducer")), v = e(require("sourceEpisodeReducer")), g = require("sourceBestViewReducer"), m = e(require("tmtsInfoReducer")), I = require("../../../components/paopao/paopaoReducer"), y = e(require("descReducer")), h = e(require("hotDanceReducer"));

exports.default = {
    video: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        return "SET_URL" === t.type ? Object.assign({}, e, {
            url: t.url
        }) : e;
    },
    videoLayout: u.default,
    playInfo: p.default,
    episode: c.default,
    videoList: s.default,
    share: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments[1];
        return t.share ? t.share : e;
    },
    scrollBodyHeight: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1];
        if ("INIT" === t.type && 0 === e) {
            var r = wx.getSystemInfoSync().windowHeight, o = d.default.videoHeightRpx;
            return o += t.share ? d.default.sharePpx : 0, r - i.default.getPxByRpx(o);
        }
        return e;
    },
    originPlayInfo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        switch (t.type) {
          case "INIT":
            return t.originPlayInfo || e;

          case "SET_ORIGIN_PLAY_INFO":
            return t.originPlayInfo;

          default:
            return e;
        }
    },
    desc: y.default,
    videoControl: f.default,
    load: n.default,
    rbVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        if ("INIT" === r.type) {
            var i = [ {
                callback: t,
                title: "精彩看点",
                videos: r.bestViews || []
            }, {
                callback: o,
                title: "周边视频",
                videos: r.recommendVideos || []
            } ];
            return "movie" == r.playInfo.subType ? i[0].title = "精彩片花" : "single" == r.playInfo.subType && (i[0].title = "播放列表", 
            i[1].title = "播放列表"), i.reduce(function(e, t) {
                if (e || !t.callback) return e;
                var o = t.callback(t.videos, r.playInfo);
                return o.length >= 3 ? {
                    title: t.title,
                    videos: o
                } : e;
            }, null);
        }
        return e;
    },
    sourceEpisode: v.default,
    bestView: g.bestView,
    tmtsInfo: m.default,
    sourceBestView: g.sourceBestView,
    ifCanIUse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {};
        return "INIT" === arguments[1].type ? wx.canIUse ? Object.assign(t, {
            shareBtn: wx.canIUse("button.open-type.share"),
            toMiniProgram: wx.canIUse("navigateToMiniProgram")
        }) : t : e;
    },
    wallBaseInfo: I.wallBaseInfo,
    videoComment: a.default,
    floatLayerAni: l.default,
    hotDanceInfo: h.default
};
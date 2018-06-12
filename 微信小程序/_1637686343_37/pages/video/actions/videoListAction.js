Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../service/videoService"));

exports.default = {
    videoList: function(e) {
        return {
            type: "SET_VIDEO_LIST",
            videoList: e
        };
    },
    editVideoList: function(e) {
        return {
            type: "EDIT_VIDEO_LIST",
            videoList: e
        };
    },
    pbScrollLeft: function(e) {
        return {
            type: "PB_SCROLL_LEFT",
            pb: e
        };
    },
    addVideo: function(t, r) {
        return function(i) {
            return e.getVideoList(t, r).then(function(e) {
                try {
                    return (e = e.data).videoList && i({
                        type: "ADD_VIDEO",
                        videos: e.videoList.videos,
                        page: r
                    }), Promise.resolve();
                } catch (e) {
                    return Promise.reject();
                }
            });
        };
    },
    sourceScrollLeft: function(e) {
        return {
            type: "SOURCE_SCROLL_LEFT",
            qipuId: e
        };
    }
};
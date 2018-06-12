function e() {
    return {
        type: "SHOW_SHORT_VIDEO_PIC"
    };
}

function t() {
    return {
        type: "SHOW_LOADING"
    };
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return function(t, o) {
        return new n.default(function(n, i) {
            wx.getNetworkType({
                success: function(i) {
                    var r = i.networkType;
                    t({
                        type: "SET_VIDEO_MODEL",
                        networkType: r,
                        videoLoading: e
                    });
                    var u = o().videoLayout.canPlay;
                    n(u);
                },
                fail: function(e) {
                    i();
                }
            });
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/polyfill/promise"));

exports.default = {
    initVideoLayout: function(e) {
        return function(t, n) {
            if (!e) return t({
                type: "SHOW_LOADING"
            }), o(!0)(t, n);
            t({
                type: "SHOW_SHORT_VIDEO_PIC"
            });
        };
    },
    setVideoModel: o,
    showBackImage: function(e, t) {
        return {
            type: "SHOW_BACK_IMAGE",
            imageUrl: e,
            duration: t
        };
    },
    showVideo: function() {
        return {
            type: "SHOW_VIDEO",
            showVideo: !0
        };
    },
    showLimitVideo: function() {
        return {
            type: "SHOW_LIMIT_VIDEO"
        };
    },
    showLimit: function() {
        return {
            type: "SHOW_LIMIT"
        };
    },
    showLoading: t,
    showError: function(e) {
        return {
            type: "SHOW_ERROR",
            content: e,
            error: !0,
            flag: arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
        };
    },
    videoLayout: function(e) {
        return {
            type: "SET_VIDEO_LAYOUT",
            videoLayout: e
        };
    },
    editVideoLayout: function(e) {
        return {
            type: "EDIT_VIDEO_LAYOUT",
            videoLayout: e
        };
    },
    hideFlowPlay: function() {
        return {
            type: "HIDE_FLOW_PLAY"
        };
    },
    showShotVideoPic: e,
    hideShotVideoPic: function() {
        return {
            type: "HIDE_SHORT_VIDEO_PIC"
        };
    },
    showLiveLayer: function(e) {
        return {
            type: "SHOW_LIVE_LAYER",
            videoLayout: e
        };
    },
    hideVideo: function() {
        return {
            type: "HIDE_VIDEO",
            showVideo: !1
        };
    },
    showBeforePlayPic: function() {
        return {
            type: "SHOW_BEFORE_PLAY_PIC",
            coverImage: !0
        };
    },
    hideBeforePlayPic: function() {
        return {
            type: "HIDE_BEFORE_PLAY_PIC",
            coverImage: !1
        };
    },
    setSubjectVideoModel: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return function(o, i) {
            return new n.default(function(n, r) {
                wx.getNetworkType({
                    success: function(r) {
                        var u = r.networkType;
                        o({
                            type: "SET_SUB_VIDEO_MODEL",
                            networkType: u,
                            dialogFlag: e,
                            videoLoading: t
                        });
                        var c = i().videoLayout.canPlay;
                        n(c);
                    },
                    fail: function(e) {
                        r();
                    }
                });
            });
        };
    }
};
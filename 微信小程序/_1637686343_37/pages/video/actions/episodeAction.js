function e(e) {
    return {
        type: "EDIT_EPISODE",
        episode: e
    };
}

function t() {
    var e = t.animation;
    return e || (e = t.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
    })), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    showEpisode: function(e, i, n) {
        var o = t();
        return o.translate3d(0, 0, 0).step(), {
            type: "SHOW_EPISODE",
            pd: e,
            share: i,
            videoList: n,
            animation: o.export(),
            isshow: !0
        };
    },
    episode: function(e) {
        return {
            type: "SET_EPISODE",
            episode: e
        };
    },
    editEpisode: e,
    switchTab: function(e, t) {
        return {
            type: "SWITCH_TAB",
            index: e,
            videoList: t
        };
    },
    closeEpisode: function() {
        var i = t();
        return i.translate3d(0, "100%", 0).step(), e({
            animation: i.export(),
            isshow: !1
        });
    }
};
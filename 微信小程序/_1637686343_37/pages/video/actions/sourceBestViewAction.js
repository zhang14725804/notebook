function e() {
    var t = e.animation;
    return t || (t = e.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
    })), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    showSourceBestView: function(t, n, i) {
        var r = e();
        return r.translate3d(0, 0, 0).step(), {
            qipuId: t,
            share: n,
            bestView: i,
            type: "SHOW_SOURCE_BEST_VIEW",
            animation: r.export()
        };
    },
    hideSourceBestView: function() {
        var t = e();
        return t.translate3d(0, "100%", 0).step(), {
            type: "HIDE_SOURCE_BEST_VIEW",
            animation: t.export()
        };
    },
    bestViewScrollLeft: function(e) {
        return {
            type: "BEST_VIEW_SCROLL_LEFT",
            qipuId: e
        };
    }
};
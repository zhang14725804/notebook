Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../actions/index"));

exports.default = {
    playSourceBestView: function(e) {
        var t = this.store.getState(), i = e.currentTarget.dataset.qipuId, s = t.bestView.videos.filter(function(e) {
            return e.qipuId === i;
        })[0];
        this.switchPlayVideo(s);
    },
    showSourceBestView: function() {
        var t = this.store.getState();
        this.store.dispatch(e.default.showSourceBestView(t.playInfo.qipuId, t.share, t.bestView));
    },
    hideSourceBestView: function() {
        var t = this.store.getState();
        this.store.dispatch(e.default.hideSourceBestView()), this.store.dispatch(e.default.bestViewScrollLeft(t.playInfo.qipuId));
    }
};
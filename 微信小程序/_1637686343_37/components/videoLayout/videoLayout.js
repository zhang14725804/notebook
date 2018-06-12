function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    var i = o.default.storage.handleStorageMuti("get", "VIDEO_PLAYER_INFO") || {};
    i[t] = e, o.default.storage.handleStorageMuti("set", "VIDEO_PLAYER_INFO", i);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("./videoLayoutAction")), o = t(require("../../common/utils/util"));

exports.default = {
    flowPlay: function() {
        this.store.getState().videoLayout.videoErrorContent ? this.store.dispatch(i.default.hideFlowPlay()) : this.play(), 
        e("flowPlayTime", new Date().getTime());
    },
    onErrorTap: function() {
        this.store.getState().videoLayout.error.buttonclick.bind(this)();
    },
    onPlay: function() {
        this.play();
    },
    onLimitPlay: function() {
        var t = this;
        this.store.dispatch(i.default.showLimitVideo()), setTimeout(function() {
            t.player.play();
        }, 1e3);
    },
    play: function() {
        var t = this;
        this.store.dispatch(i.default.showVideo()), setTimeout(function() {
            t.player.play();
        }, 1e3);
    },
    canPlay: function() {
        return this.store.getState().videoLayout.canPlay;
    },
    manualPlay: function() {
        this.store.dispatch(i.default.hideBeforePlayPic()), this.player.play();
    }
};
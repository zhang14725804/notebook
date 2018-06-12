function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../common/utils/util")), i = t(require("../actions/index")), o = t(require("../../../common/polyfill/promise"));

exports.default = {
    playVideoEpisode: function(t) {
        var i = this.store.getState(), o = t.currentTarget.dataset.qipuId, s = i.originPlayInfo.subType, a = i.videoList.videos;
        i.playInfo;
        "album" == s && (a = e.default.storage.handleStorageMuti("get", "CUR_VIDEOLIST_VIDEOS") || i.videoList.videos);
        var d = a.filter(function(t) {
            return t.qipuId === o;
        })[0];
        d.playCountCN = e.default.numToChinaNum(d.playCount), this.switchPlayVideo(Object.assign({}, i.originPlayInfo, d));
    },
    openEpisode: function() {
        var t = this.store.getState();
        this.store.dispatch(i.default.showEpisode(t.playInfo.pd || 1, t.share, t.videoList));
    },
    closeEpisode: function() {
        this.store.getState().playInfo;
        this.store.dispatch(i.default.closeEpisode());
        var t = this.getactualPb();
        this.store.dispatch(i.default.pbScrollLeft(t));
    },
    videoListRight: function() {
        var t = this;
        if (this.videoListRight.loading) return o.default.resolve();
        var e = this.store.getState(), s = e.videoList, a = s.videos, d = s.total, r = a.length;
        return d <= r ? o.default.resolve() : (this.videoListRight.loading = !0, this.store.dispatch(i.default.addVideo(e.playInfo.aid, Math.ceil(r / 50) + 1)).then(function() {
            t.videoListRight.loading = !1;
        }, function() {
            return t.videoListRight.loading = !1, o.default.reject();
        }));
    },
    switchEpisodeTab: function(t) {
        var e = this.store.getState(), o = t.detail.current;
        o = void 0 === o ? t.currentTarget.dataset.tab : o, e.episode.selectedTabIndex !== o && (this.store.dispatch(i.default.editEpisode({
            selectedTabIndex: o,
            isshow: !0
        })), this.switchEpisode(o));
    },
    switchEpisode: function(t) {
        var e = this;
        return this.getMoreVideoList(t).then(function() {
            var o = e.store.getState();
            e.store.dispatch(i.default.switchTab(t, o.videoList));
        });
    },
    getMoreVideoList: function(t) {
        var e = this, i = this.store.getState().videoList, s = i.videos, a = i.page;
        return (void 0 === a ? 1 : a) < t + 1 ? this.videoListRight().then(function() {
            return e.getMoreVideoList(t);
        }) : o.default.resolve(s);
    }
};
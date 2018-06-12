function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../actions/index")), i = t(require("../../../common/utils/util")), o = i.default.getPxByRpx(120);

exports.default = {
    playSourceVideoEpisode: function(t) {
        var e = this.store.getState(), o = t.currentTarget.dataset.qipuId, r = e.videoList.videos.filter(function(t) {
            return t.qipuId === o;
        })[0];
        r.playCountCN = i.default.numToChinaNum(r.playCount), this.loadVideo(r.qipuId), 
        this.switchPlayVideo(Object.assign({}, e.originPlayInfo, r));
    },
    openSourceEpisode: function() {
        var t = this.store.getState();
        this.store.dispatch(e.default.showSourceEpisode(t.playInfo.qipuId, t.share, t.videoList));
    },
    hideSourceEpisode: function() {
        var t = this.store.getState();
        this.store.dispatch(e.default.hideSourceEpisode()), this.store.dispatch(e.default.sourceScrollLeft(t.playInfo.qipuId));
    },
    switchSourceTap: function(t) {
        var e = t.detail.current;
        e = void 0 === e ? t.currentTarget.dataset.index : e, this.switchSource(e);
    },
    switchSource: function(t, o) {
        var r = this.store.getState(), s = r.sourceEpisode.months[t];
        if (s) {
            var u = i.default.isObject(s) && "string" == typeof s.id ? s.id.split("-") : [], a = u[0], d = u[1];
            return this.store.dispatch(e.default.setSourceTag(r.playInfo.sourceId, a, d, o));
        }
    },
    bindSourceVideoTagScroll: function(t) {
        var r = this;
        clearTimeout(this.bindSourceVideoTagScroll.time), this.bindSourceVideoTagScroll.time = setTimeout(function() {
            var s = t.detail.scrollLeft, u = r.store.getState(), a = u.sourceEpisode.months[Math.floor(s / o)];
            if (a || !u.bestView.currentYear) {
                var d = i.default.isObject(a) && "string" == typeof a.id ? a.id.split("-")[0] : "";
                r.store.dispatch(e.default.editCurrentYear(d));
            }
        }, 200);
    }
};
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("bindBase")), i = e(require("bindUtil"));

e(require("../searchBind")).default.component("movie", {
    template: "#movieTpl",
    condition: function(e) {
        return 1 == e.videoDocType && !e.series;
    },
    bindCallBack: function(e, a) {
        var r = (0, t.default)(e, a);
        return {
            movie: Object.assign({
                year: e.releaseDate.substring(0, 4),
                apic: r.isSiteOut ? e.albumImg : i.default.editePic(e.albumImg, "_180_236"),
                threeCategory: e.threeCategory,
                stag: i.default.getTags(e).length,
                tagList: i.default.getTags(e),
                score: e.score ? e.score.toFixed(1) : ""
            }, r),
            is_from_intent: e.is_from_intent,
            clickPingback: i.default.getClickPingback(r, e)
        };
    }
});
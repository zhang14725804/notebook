function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("bindBase")), i = e(require("bindUtil")), r = e(require("../searchBind")), s = e(require("../../../common/utils/util"));

r.default.component("series", {
    template: "#seriesTpl",
    condition: function(e) {
        return 1 == e.videoDocType && !e.album_type && e.series;
    },
    bindCallBack: function(e, r) {
        var a = this, u = (0, t.default)(e, r);
        e.tvsets = e.video_lib_meta && e.video_lib_meta.total_video_count || e.itemTotalNumber, 
        e.updateTo = e.newest_item_number, e.updateTo === e.tvsets ? u.sets = e.tvsets : u.updateTo = e.updateTo;
        var l = e.circle_summaries || [];
        return u.bubble = l.filter(function(e) {
            return e.circle_user_count = s.default.numToChinaNum(e.circle_user_count), e.ptype = "0" == e.circle_type ? "1-9-1-5" : "1-9-1-1", 
            e.isStar = "0" == e.circle_type, e.title && e.image_url;
        }).slice(0, 10), {
            series: Object.assign({
                year: e.releaseDate.substring(0, 4),
                apic: u.isSiteOut ? e.albumImg : i.default.editePic(e.albumImg, "_180_236"),
                isSiteOut: "iqiyi" !== e.siteId,
                threeCategory: e.threeCategory,
                stag: i.default.getTags(e).length,
                tagList: i.default.getTags(e),
                tvList: i.default.getTvList(e, r.vfrm),
                director: e.director || "",
                directorList: e.director && e.director.split(";"),
                star: e.star || "",
                actorList: e.star && e.star.split(";"),
                bkt: a.bkt,
                isBubble: e.circle_summaries && e.circle_summaries.length > 1
            }, u),
            is_from_intent: e.is_from_intent,
            clickPingback: i.default.getClickPingback(u, e)
        };
    }
});
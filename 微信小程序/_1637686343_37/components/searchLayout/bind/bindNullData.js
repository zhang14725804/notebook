function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("bindBase")), i = e(require("bindUtil")), n = e(require("../searchBind")), l = e(require("../../../common/utils/util"));

n.default.component("nullData", {
    template: "#nullDataPageTpl",
    condition: function(e) {
        return 8 == e.videoDocType;
    },
    bindCallBack: function(e, n) {
        function a(e) {
            return e.map(function(e) {
                return e.itemHImage = i.default.editePic(e.itemHImage, "_180_101"), e;
            });
        }
        var r = (0, t.default)(e, n), u = e.video_lib_meta, d = e.prevues || [];
        r.new_prevues = a(d), r.new_prevues.length > 0 ? r.hasNewPrevues = "true" : r.showMovielibBtn = "true";
        var s = e.related_videos || [];
        return r.new_related_videos = a(s), r.new_related_videos.length > 0 && (r.hasNewRelated = "true"), 
        r.publishDate = l.default.getBirth(e.video_lib_meta.china_publish_date), 0 != r.new_related_videos.length || 0 != r.new_prevues.length || e.albumLink || (r.hideItem = "true"), 
        r.tabControllerIndex = e.index, {
            nullData: Object.assign({
                movieId: u.entity_id,
                ticket: e.ticket,
                channelId: e.channel.split(",")[1],
                apic: i.default.editePic(u.poster, "_180_236"),
                title: u.title,
                albumLink: u.link,
                firstAlbumLink: e.prevues ? e.prevues[0].itemLink : ""
            }, r),
            is_from_intent: e.is_from_intent,
            clickPingback: i.default.getClickPingback(r, e)
        };
    }
});
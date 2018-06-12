function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("bindBase")), t = e(require("bindUtil")), a = e(require("../searchBind")), r = e(require("../../../common/utils/util"));

a.default.component("source", {
    template: "#sourceTpl",
    condition: function(e) {
        return 1 == e.videoDocType && 1 == e.album_type || 6 == e.videoDocType;
    },
    bindCallBack: function(e, a) {
        var s = (0, i.default)(e, a);
        6 == s.channelId && (s.categoryType = "variety");
        var o = e.videoinfos[0].year;
        s.follow = o ? r.default.formatYear(o) : "", 6 === e.videoDocType && (s.sets = s.follow, 
        s.follow = null);
        for (var l = [], u = 0; u < 2 && u < e.videoinfos.length; u++) {
            var p = e.videoinfos[u], n = 6 == e.videoDocType ? "" : 0 == p.year ? "" : p.year, y = p.subTitle ? p.subTitle : p.itemTitle;
            (void 0 == y || "" == y || y && "undefined" == y.trim()) && (y = "暂无");
            var d = n + " " + y;
            l.push({
                isSiteOut: "iqiyi" !== e.siteId,
                tvid: p.tvId,
                vid: p.vid,
                title: d,
                ptype: (3 == s.sourceType ? "1-14-1-" : "1-1-5-") + (u + 1),
                isNew: p.is_new,
                isVip: (e.paymark && 1 == e.paymark || !e.paymark) && p.is_vip,
                isBill: 2 == e.paymark && p.is_vip,
                isPaid: 3 == e.paymark && p.is_vip
            });
        }
        return s.latestList = l, s.isVip = 1 == e.paymark && e.is_vip, s.isBill = 2 == e.paymark && e.is_vip, 
        s.isPaid = 3 == e.paymark && e.is_vip, {
            source: Object.assign({
                apic: s.isSiteOut ? e.albumImg : t.default.editePic(e.albumImg, "_180_236"),
                year: (1 * e.videoinfos[0].year || e.releaseDate).toString().substring(0, 4),
                posterPtype: 3 == s.sourceType ? "1-14-1" : "1-1-1",
                tittlePtype: 3 == s.sourceType ? "1-14-1" : "1-1-2",
                playPtype: 3 == s.sourceType ? "1-14-2" : "1-1-4",
                morePtype: 3 == s.sourceType ? "1-14-4" : "1-1-4",
                threeCategory: e.threeCategory,
                stag: t.default.getTags(e).length,
                tagList: t.default.getTags(e),
                star: e.star || "",
                stragyTime: e.stragyTime || ""
            }, s),
            is_from_intent: e.is_from_intent,
            clickPingback: t.default.getClickPingback(s, e)
        };
    }
});
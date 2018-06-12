function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, a) {
    e.playCount = e.playCount ? e.playCount.toString() : "";
    var o = (e.videoinfos || [])[0] || {}, r = e.video_lib_meta;
    e.channel && -1 != e.channel.indexOf(",") ? (e.category = e.channel && e.channel.split(",")[0], 
    e.categoryId = e.channel && e.channel.split(",")[1]) : (e.category = "", e.categoryId = ""), 
    e.categoryId || (e.category = null);
    var l = e.siteId && e.siteId.replace(/pps/, "iqiyi"), n = {
        albumId: e.albumId || "",
        categoryName: e.category || "",
        channelId: e.categoryId || "",
        title: t.default.highLight(e.title, a.keyword),
        tvid: o.tvId,
        vid: o.vid,
        isVip: 1 == e.paymark,
        isBill: 2 == e.paymark,
        isPaid: "iqiyi" == l && 3 == e.paymark || "iqiyi" !== l && 2 == e.isPurchase,
        is_exclusive: e.is_exclusive,
        sd: o.is1080p,
        is_qiyi_produced: e.is_qiyi_produced,
        playCount: t.default.formatPlayCount(e.playCount),
        siteId: l,
        siteName: e.siteName,
        isSiteOut: "iqiyi" !== l,
        docId: e.doc_id,
        sourceType: e.source_type || 1,
        playSource: l,
        type: !(!r || !r.category) || null,
        typeList: r && r.category ? r.category : null,
        isPaike: !!e.special_content_type,
        region: "iqiyi" == l ? e.region : r.region ? r.region[0] : "",
        language: e.language || (r.language ? r.language[0] : ""),
        directorList: e.directorList,
        directorShow: e.directorShow,
        actorShow: e.actorShow,
        actorList: e.actorList,
        playTime: i.default.time.formatSecondOmit(o.timeLength),
        eventId: e.eventId
    };
    return n.typeList && n.typeList.length ? (n.typeList = n.typeList.splice(0, 6), 
    n.typeListShow = n.typeList.join(" ")) : n.typeListShow = "", n;
};

var t = e(require("bindUtil")), i = e(require("../../../common/utils/util"));
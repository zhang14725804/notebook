function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("bindBase")), t = e(require("bindUtil")), a = e(require("../searchBind")), n = e(require("../../../common/utils/util"));

a.default.component("single", {
    template: "#singleTpl",
    condition: function(e) {
        return 2 == e.videoDocType;
    },
    bindCallBack: function(e, a) {
        var r = (0, i.default)(e, a), u = e.videoinfos[0] || "";
        return {
            single: Object.assign({
                year: e.releaseDate.substring(0, 4),
                apic: r.isSiteOut ? e.albumImg : t.default.editePic(e.albumImg, "_160_90"),
                siteName: r.isSiteOut ? r.siteName : "",
                isSiteOut: r.isSiteOut,
                releaseDate: 0 == u.year ? u.initialIssueTime.substring(0, 10) : n.default.formatYearALL(u.year),
                uploader_name: e.videoinfos[0].uploader_name || ""
            }, r),
            is_from_intent: e.is_from_intent,
            clickPingback: t.default.getClickPingback(r, e)
        };
    }
});
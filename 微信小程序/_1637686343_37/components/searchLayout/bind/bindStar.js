function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var i = {
        DIAN_YING: [],
        ZONG_YI: [],
        YIN_YUE: [],
        DIAN_SHI_JU: []
    }, n = {
        1: "DIAN_YING",
        6: "ZONG_YI",
        5: "YIN_YUE",
        2: "DIAN_SHI_JU"
    };
    e.forEach(function(e, t) {
        var u = e.subChannel && e.subChannel.split(",")[1];
        if (e.timeLength = r.default.time.formatSecondOmit(e.timeLength) || 0, e.year = r.default.getBirth(e.year.toString()), 
        2 == u) {
            var l = e.playedNumber, s = e.availableNumber;
            s == l ? e.sets = l : e.updateTo = s;
        }
        e.playVideoId = e.latest_video ? e.latest_video.qipu_id : e.qipu_id, e.itemVImage = e.itemVImage ? a.default.editePic(e.itemVImage, "_180_236") : "/resource/images/itemVImage.png";
        for (var c in i) if (c == n[u] && i[c].length < 3 && e.site && "iqiyi" == e.site.site_id && "14" != e.qipu_id.toString().substr(-2) && e.itemVImage && e.itemTitle) return void i[c].push(e);
    });
    for (var u in i) 0 == i[u].length && (delete i[u], t = t.filter(function(e, t) {
        return e.cid != u;
    }));
    return [ i, t ];
}

var i = e(require("bindBase")), a = e(require("bindUtil")), n = e(require("../searchBind")), r = e(require("../../../common/utils/util"));

n.default.component("star", {
    template: "#starTpl",
    condition: function(e) {
        return 3 == e.videoDocType;
    },
    bindCallBack: function(e, n) {
        if (!e.albumImg || !e.albumTitle) return {};
        var u = this, l = (0, i.default)(e, n), s = [ {
            cid: "DIAN_YING",
            cname: "电影",
            channelId: 1
        }, {
            cid: "ZONG_YI",
            cname: "参加综艺",
            channelId: 6
        }, {
            cid: "YIN_YUE",
            cname: "音乐",
            channelId: 5
        }, {
            cid: "DIAN_SHI_JU",
            cname: "电视剧",
            channelId: 2
        } ];
        e.updateTo = e.newest_item_number, e.updateTo === e.tvsets ? l.sets = e.tvsets : l.updateTo = e.updateTo;
        var c = e.circle_summaries || [];
        l.bubble = c.map(function(e) {
            return e.circle_user_count = r.default.numToChinaNum(e.circle_user_count), e.ptype = "0" == e.circle_type ? "1-9-1-5" : "1-9-1-1", 
            e.isStar = "0" == e.circle_type, e;
        });
        var d = t(e.videoinfos, s);
        return {
            star: Object.assign({
                releaseDate: e.releaseDate ? r.default.getBirth(e.releaseDate) : "",
                apic: a.default.editePic(e.albumImg, "_128_128"),
                starRegion: e.region ? e.region.substr(0, 4) : "",
                albumTitle: e.albumTitle,
                stag: a.default.getTags(e).length,
                tagList: a.default.getTags(e),
                tvList: a.default.getTvList(e, n.vfrm),
                bkt: u.bkt,
                isBubble: e.circle_summaries && e.circle_summaries.length > 0,
                categoryVideos: d[0],
                channelTabs: d[1],
                channelTabIndex: 0
            }, l),
            is_from_intent: e.is_from_intent,
            clickPingback: a.default.getClickPingback(l, e)
        };
    }
});
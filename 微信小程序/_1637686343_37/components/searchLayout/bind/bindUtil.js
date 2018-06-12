function e(e, t) {
    return (e = e || []).map(function(e, i) {
        return Object.assign(e, {
            type: t,
            ptype: "1-1-5-" + e.itemNumber
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(e) {
    e && e.__esModule;
}(require("../../../common/utils/util"));

exports.default = {
    formatPlayCount: function(e) {
        if (e.length < 3) return e;
        for (var t = []; e.length > 3; ) {
            var i = e.substring(e.length - 3, e.length);
            e = e.substr(0, e.length - 3), t.push(i);
        }
        return t.push(e), t.reverse(), t.join(",");
    },
    getTags: function(e) {
        var t = [];
        if (e.threeCategory) for (var i = e.threeCategory.split(","), r = 0; r < i.length; r++) isNaN(i[r]) && "电影" !== i[r] && "电视剧" !== i[r] && t.push(i[r].replace(/\d+\s+/, ""));
        return t;
    },
    transformList: e,
    isNewTV: function(e) {
        if (!e) return !1;
        e = e.replace(/-/g, "/");
        return Date.now() - new Date(e).getTime() <= 6048e5;
    },
    getTvList: function(t, i) {
        var r = e(t.videoinfos, "video"), n = e(t.prevues, "prevue");
        n.reverse();
        var s = n.length > 0 ? n.length - 1 : 0;
        Array.prototype.splice.apply(n, [ s, 0 ].concat(r));
        for (var p = [], u = 0; ++u <= 5; ) {
            var a = n.pop();
            if (!a) break;
            if ("prevue" === a.type) p.push(a); else if (4 === u) {
                var o = n[n.length - 2];
                if (o && "video" === o.type) {
                    p.unshift({
                        type: "more"
                    }), p.unshift(r[0]);
                    break;
                }
                p.unshift(a);
            } else p.unshift(a);
        }
        return p.map(function(e) {
            var i = {
                tvid: e.tvId,
                vid: e.vid,
                txt: e.itemNumber,
                isSiteOut: "iqiyi" !== t.siteId,
                ptype: e.ptype
            };
            return "video" === e.type ? (i.isNew = e.is_new, i.isVip = (t.paymark && 1 == t.paymark || !t.paymark) && e.is_vip, 
            i.isBill = 2 == t.paymark && e.is_vip, i.isPaid = 3 == t.paymark && e.is_vip) : "prevue" === e.type ? i.isPre = !0 : (i.txt = "...", 
            i.ptype = "1-1-14"), i;
        });
    },
    editePic: function(e, t) {
        return e.replace(/(_\d{2,3}_\d{2,3})?\.jpg$/, t + ".jpg");
    },
    getClickPingback: function(e, t) {
        var i = {};
        return i[e.docId || t.doc_id] = {
            s_site: e.siteId || "iqiyi",
            c1: e.channelId || "",
            s_page: t.page_num || 1,
            s_e: t.eventId,
            s_qr: t.s_qr,
            s_itype: t.is_from_intent ? 1 : 0
        }, i;
    },
    highLight: function(e, t) {
        return e;
    }
};
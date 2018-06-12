function e(e, t) {
    var r = {}, s = {}, u = t.term_query;
    if (u) {
        for (var _ = 0, l = u.length; _ < l; _++) s[u[_].field_name] = u[_].term;
        e.length > 6 && (r.showAllBtn = !0, i.intent = {
            s_site: "iqiyi",
            c1: "",
            s_page: 1,
            s_e: t.eventId,
            s_itype: 1,
            s_qr: 10
        }), s.mode = t.scoring_mode;
    }
    return {
        intent: Object.assign({
            albums: n(e),
            intent_result_num: t.intent_result_num,
            real_query: t.real_query
        }, r),
        clickPingback: i
    };
}

function n(e) {
    var n = [];
    return e && e.forEach(function(e) {
        if (e) for (var t in e) if ("clickPingback" != t && n.length < 6) {
            var r = e[t];
            i[r.docId] = {
                s_site: r.siteId || "iqiyi",
                c1: r.channelId || "",
                s_page: 1,
                s_e: r.eventId,
                s_itype: 1,
                s_qr: 10
            }, n.push(e[t]);
        }
    }), n;
}

var t = [], i = {};

(function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
})(require("../searchBind")).default.component("intent", {
    template: "#intentTpl",
    afterBindCallBack: function(e) {
        return e.is_from_intent ? (t.push(e), delete e.is_from_intent, null) : (delete e.is_from_intent, 
        e);
    },
    create: function() {
        t = [];
    },
    end: function(n) {
        if (0 != t.length) return e(t, n);
    }
});
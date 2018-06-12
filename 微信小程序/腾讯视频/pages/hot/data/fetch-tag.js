var e = require("../../../module/request/request"), t = require("../modules/format").feeds;

module.exports = {
    get: function(o, r) {
        var a = (o = o || {}).pageContext || "", n = o.datakey || "", s = {}, c = [];
        e.vaccess("sec_videoline", {
            pageContext: a,
            type: "pioneer_tag",
            dataKey: n
        }).then(function(e) {
            e && 0 === e.errCode ? (c = t(e.data), s = {
                loading: !1,
                ret: 0
            }) : s = {
                loading: !1,
                ret: "B." + e.errCode
            };
            var o = {
                response: s,
                content: c,
                pageContext: e.hasOwnProperty("pageContext") ? e.pageContext : a,
                refreshContext: "",
                hasNextPage: e.hasOwnProperty("isHaveNextPage") ? e.isHaveNextPage : 1
            };
            r && (r.suc && r.suc(o), r.complete && r.complete(o));
        }, function(e) {
            var t = {
                response: {
                    loading: !1,
                    ret: e && e.code || "无"
                },
                content: [],
                pageContext: a,
                refreshContext: "",
                hasNextPage: 1
            };
            r && (r.fail && r.fail(t), r.complete && r.complete(t)), console.log("sec_videoline from hot page, request reject");
        }).catch(function(e) {
            console.log("sec_videoline error:", e);
        });
    }
};
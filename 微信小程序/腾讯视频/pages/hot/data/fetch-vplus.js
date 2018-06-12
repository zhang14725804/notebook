var e = require("../../../module/request/request"), t = require("../modules/format").feeds;

module.exports = {
    get: function(o, r) {
        var s = (o = o || {}).pageContext || "", a = o.qq || "", n = {}, l = [];
        e.vaccess("vplus_list", {
            pageContext: s,
            qq: a
        }).then(function(e) {
            e && 0 === e.errCode ? (l = t(e.data), n = {
                loading: !1,
                ret: 0
            }) : n = {
                loading: !1,
                ret: "B." + e.errCode
            };
            var o = {
                response: n,
                content: l,
                pageContext: e.hasOwnProperty("pageContext") ? e.pageContext : s,
                refreshContext: "",
                hasNextPage: e.hasOwnProperty("hasNextPage") ? e.hasNextPage : 1
            };
            r && (r.suc && r.suc(o), r.complete && r.complete(o));
        }, function(e) {
            var t = {
                response: {
                    loading: !1,
                    ret: e && e.code || "无"
                },
                content: [],
                pageContext: s,
                refreshContext: "",
                hasNextPage: 1
            };
            r && (r.fail && r.fail(t), r.complete && r.complete(t)), console.log("vplus_list from hot page, request reject");
        }).catch(function(e) {
            console.log("vplus_list error:", e);
        });
    }
};
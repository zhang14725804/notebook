var e = require("../../../module/request/request"), t = require("../modules/format"), o = require("../../../module/guid"), n = o.getGuid(), a = {};

module.exports = {
    feeds: function(o, n) {
        var r = (o = o || {}).pageContext || "", s = o.refreshContext || "", c = {}, l = [];
        e.vaccess("hot_videoline", {
            channelItemId: o.channelId,
            pageContext: r,
            refreshContext: s,
            refreshType: o.refreshType
        }).then(function(e) {
            e && 0 === e.errCode ? (l = t.feeds(e.data), c = {
                loading: !1,
                ret: 0
            }, l.length ? !a[o.channelId] && (a[o.channelId] = l) : l = a[o.channelId]) : c = {
                loading: !1,
                ret: "B." + e.errCode
            };
            var h = {
                response: c,
                content: l,
                pageContext: e.hasOwnProperty("pageContext") ? e.pageContext : r,
                refreshContext: e.hasOwnProperty("refreshContext") ? e.refreshContext : s,
                hasNextPage: e.hasOwnProperty("hasNextPage") ? e.hasNextPage : 1
            };
            n && (n.suc && n.suc(h), n.complete && n.complete(h));
        }, function(e) {
            var t = {
                response: {
                    loading: !1,
                    ret: e && e.code || "无"
                },
                content: [],
                pageContext: r,
                refreshContext: s,
                hasNextPage: 1
            };
            n && (n.fail && n.fail(t), n.complete && n.complete(t)), console.log("hot_data from hot page, request reject from feeds");
        }).catch(function(e) {
            console.log("hot_data error:", e);
        });
    },
    channel: function(a, r) {
        var s = {}, c = [], l = a.pageContext || "";
        e.vaccess("channel_data", {
            seqNum: n + "_" + +new Date() + "_" + o.s4(),
            channelId: a.channelId,
            modNum: 10,
            pageContext: l
        }).then(function(e) {
            if (0 === e.status) {
                e.modList = e.modList || [];
                var o = !(e.modList.length < 10);
                c = t.channel(e.modList), s = {
                    loading: !1,
                    ret: 0
                };
            } else s = {
                loading: !1,
                ret: "B." + e.status
            };
            var n = {
                response: s,
                content: c,
                pageContext: e.hasOwnProperty("pageContext") ? e.pageContext : l,
                hasNextPage: o
            };
            r && (r.suc && r.suc(n), r.complete && r.complete(n));
        }, function(e) {
            var t = {
                response: {
                    loading: !1,
                    ret: e && e.code || "无"
                },
                content: [],
                pageContext: l,
                hasNextPage: 1
            };
            r && (r.fail && r.fail(t), r.complete && r.complete(t)), console.log("hot_data from hot page, request reject from channel");
        }).catch(function(e) {
            console.log("hot_data error:", e);
        });
    }
};
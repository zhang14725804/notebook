function t(t, e) {
    var r = o.TimeUtil.formatTime(t, "yyyy-MM-dd").replace(/-/g, "/"), a = new Date(r).getTime() / 1e3;
    return e >= a - 86400 && e < a;
}

function e(t, e) {
    var r = o.TimeUtil.formatTime(t, "yyyy-MM-dd").replace(/-/g, "/"), a = new Date(r).getTime() / 1e3, i = a + 86400;
    return e >= a && e < i;
}

function r(t, e) {
    var r = o.TimeUtil.formatTime(t, "yyyy-MM-dd").replace(/-/g, "/"), a = new Date(r).getTime() / 1e3, i = a + 172800;
    return e >= a + 86400 && e < i;
}

function a(t, e) {
    var r = o.TimeUtil.formatTime(t, "yyyy-MM-dd").replace(/-/g, "/");
    return e > new Date(r).getTime() / 1e3 + 172800;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = require("../../common/index"), i = {
    yesterday: "昨日",
    today: "今日",
    tomorrow: "明日",
    afterTomorrow: "后天"
}, s = {
    sellOut: "已抢光",
    notSellOut: "仅剩{0}件",
    waittingDesc: "{0}开抢"
}, m = {
    getSpikeGoodsData: function(t, e) {
        var r = this;
        t && "function" == typeof e && o.Request.apiRequest("GET", t, null, !0).then(function(t) {
            e(r.formatData(t));
        }, function() {
            e(null);
        });
    },
    formatData: function(m, n) {
        var u = m.goods || [], d = m.server_time || Math.floor(Date.now() / 1e3);
        d = parseInt(d, 10);
        var c = [], l = {}, y = [], T = [];
        (u = o.DataUtil.objectArrayDuplicateRemove(u, "goods_id", function(t) {
            return 1 == t.is_app;
        })).forEach(function(e, m) {
            var n = {
                goodsId: e.goods_id,
                goodsName: e.short_name || e.goods_name || "",
                startTime: parseInt(e.start_time, 10) || 0,
                thumbUrl: o.ImageUtil.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
                price: o.StdFormat.price(e.price, 100),
                marketPrice: o.StdFormat.price(e.market_price, 100),
                quantity: parseInt(e.quantity, 10) || 0,
                soldQuantity: parseInt(e.sold_quantity, 10) || 0,
                isLineLast: !1
            };
            e.ad && (n.transData = {
                ad: e.ad,
                p_rec: e.p_rec,
                p_search: e.p_search
            });
            var u = o.TimeUtil.formatTime(n.startTime, "hh:mm"), T = a(d, n.startTime) ? i.afterTomorrow + u : r(d, n.startTime) ? i.tomorrow + u : t(d, n.startTime) ? i.yesterday + u : i.today + u;
            n.goodsTimeDesc = T, n.isSoldOut = n.quantity <= 0, n.duringSpike = d >= n.startTime, 
            n.duringSpike ? n.countDesc = n.isSoldOut ? o.DataUtil.formatByPos(s.sellOut, n.soldQuantity) : o.DataUtil.formatByPos(s.notSellOut, n.quantity) : n.countDesc = o.DataUtil.formatByPos(s.waittingDesc, u), 
            l[n.startTime] ? l[n.startTime].push(m) : (l[n.startTime] = [], l[n.startTime].push(m), 
            c = c.concat(y), y = []), n.isSoldOut ? y.push(n) : c.push(n);
        }), c = c.concat(y);
        for (var p in l) if (l.hasOwnProperty(p)) {
            var f = l[p] || [];
            c[f[f.length - 1]].isLineLast = !0;
            var h = f[f.length - 1];
            h < c.length - 1 && (c[h].nextGoodsTimeDesc = c[h + 1].goodsTimeDesc);
            var g = o.TimeUtil.formatTime(p, "hh:mm"), D = a(d, p) ? i.afterTomorrow + g + (n && p > d ? "开抢" : "") : r(d, p) ? i.tomorrow + g + (n && p > d ? "开抢" : "") : t(d, p) ? i.yesterday + g : i.today + g + (n && p > d ? "开抢" : ""), _ = {
                time: p,
                startTime17Desc: a(d, p) ? i.afterTomorrow + "预告" : e(d, p) ? i.today + "试吃" : t(d, p) ? i.yesterday + "试吃" : i.tomorrow + "预告",
                startTimeDesc: D,
                firstItemIndex: f[0],
                len: f.length
            };
            T.push(_);
        }
        return {
            goodsList: c,
            timelineList: T
        };
    }
};

exports.default = m;
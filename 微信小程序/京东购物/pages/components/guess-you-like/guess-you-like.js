function e(e, i, t) {
    var s = t || e, o = new RegExp("[$]" + i + "=([^$|&]*)"), r = s.substr(s.indexOf("?") + 1).match(o);
    return null != r ? r[1] : "";
}

var i = require("../../../bases/component"), t = require("../../item/detail/detail_api"), s = require("../../../common/fe_helper"), o = require("../../../common/cookie-v2/cookie"), r = require("../../../api/Ptag/report_manager");

new i({
    properties: {
        skuId: String,
        category: Array,
        isZiying: Boolean,
        price: String
    },
    data: {
        guessYouLike: {
            list: [],
            current: 0,
            style: 1,
            impr: ""
        }
    },
    ready: function() {
        var e = this, i = this.data, s = i.skuId, o = i.category, r = i.isZiying;
        t.guessYouLike(s, !r, o).then(function(i) {
            e.setData({
                "guessYouLike.list": i.list,
                "guessYouLike.style": i.style,
                "guessYouLike.impr": i.impr
            });
            var t = [];
            i.list.forEach(function(e) {
                e.forEach(function(e) {
                    e.forEach(function(e) {
                        t.push(e.source);
                    });
                });
            }), t = t.join(","), e.report({
                source: t
            }, {
                action: 0
            });
        }).catch(function(e) {});
    },
    methods: {
        report: function(i) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            t.action ? t.action = 1 : t.action = 0;
            var n = 1 == t.action, u = this.data.guessYouLike.impr, a = s.getUrlParam("t", u), c = n ? i.clk : "", g = {
                source: i.source || "",
                pin: o.getCookie("pin"),
                visitkey: o.getCookie("visitkey"),
                t: a,
                action: 1 == t.action ? "1" : "0",
                sku: e(u, "sku"),
                skus: e(u, "skus"),
                csku: n ? i.sku : "",
                cskus: e(u, "csku"),
                index: void 0 !== t.index ? "" + t.index : "",
                expid: e(u, "expid"),
                reqsig: e(u, "reqsig"),
                clk: c
            };
            if (1 == t.action && 1 == i.source) {
                g.operation = this.data.isZiying ? "10250" : "10251";
            }
            r.guessyouLikeReport(g);
        },
        guessYouLikeGotoDetail: function(e) {
            r.setChangeRef(!0);
            var i = e.currentTarget.dataset, t = i.sku, s = i.price, o = i.name, n = i.cover, u = i.pps, a = i.i, c = i.idx, g = i.index, k = i.isPingou, p = this.data.guessYouLike.list[a][c][g], d = 6 * a + 3 * c + g;
            this.report(p, {
                action: 1,
                index: d
            }), this.$gotoItem({
                sku: t,
                price: s,
                name: o,
                cover: n,
                pps: u
            }, {
                isPingou: k
            });
        },
        guessYouLikeloadMore: function() {
            r.setChangeRef(!0);
            var e = this.data, i = e.skuId, t = e.category, s = e.price, o = e.isZiying ? "1742" : "1877", n = "https://wqs.jd.com/item/recommend_more.shtml" + [ "?sku=" + i, "category=" + t.join("_"), "price=" + s, "adids=" + o, "scene=4" ].join("&");
            this.$goto("/pages/h5/index", {
                url: n
            });
        },
        swiperGuessYouLike: function(e) {
            var i = e.detail.current;
            this.setData({
                "guessYouLike.current": i
            });
        }
    }
});
var e = require("../../../../bases/component.js"), t = require("../../../../libs/promise.min.js"), n = require("../../../../common/fe_helper.js"), o = require("../common-behavior.js"), i = require("../../model.js");

require("../../utils.js");

new e({
    behaviors: [ o ],
    properties: {
        seckillConfig: {
            type: "Object",
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        seckillBeginTime: null,
        seckillGoods: [],
        countdownHour: null,
        countdownMinute: null,
        countdownSecond: null,
        recommendDesc: null,
        recommendGood: {},
        welfare: {}
    },
    methods: {
        refresh: function() {
            var e = this;
            this.timer && clearTimeout(this.timer), t.all([ this.initSeckill(), this.initRecommend(), this.getRecommendText(), this.initWelfare() ]).then(function() {
                return e.triggerEvent("componentLoad", e.is);
            }).catch(function(t) {
                return e.triggerEvent("componentLoad", e.is);
            });
        },
        initSeckill: function() {
            var e = this;
            return i.getSeckillGoods(114271).then(function(o) {
                var i = o.list.map(function(t) {
                    return {
                        stock: t.dwStockState,
                        image: e.utils.getImg(t.sImg200x200),
                        price: 0 == t.dwStockState ? t.dwQuotePrice : t.dwChPrice,
                        oldPrice: t.dwPCPrice,
                        skuId: t.sSkuId,
                        pps: t.pps
                    };
                }).filter(function(e) {
                    var t = parseInt(e.stock);
                    if (!isNaN(t) && t > 0) return !0;
                }).slice(0, 2);
                if (!i.length) return t.reject("no seckill goods");
                for (var r = [ 0, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 ], s = n.getServerTime(), c = new Date(s).getHours(), a = void 0, u = void 0, l = 0; l < r.length - 1; l++) if (c >= r[l] && c < r[l + 1]) {
                    a = r[l], (u = new Date(s)).setHours(r[l + 1]), u.setMinutes(0), u.setSeconds(0);
                    break;
                }
                var d = Math.floor((u.getTime() - s) / 1e3), h = Math.floor(d / 60 / 60), m = Math.floor(d % 3600 / 60), f = d % 60;
                e.setData({
                    seckillBeginTime: a + "",
                    seckillGoods: i,
                    countdownHour: h < 10 ? "0" + h : "" + h,
                    countdownMinute: m < 10 ? "0" + m : "" + m,
                    countdownSecond: f < 10 ? "0" + f : "" + f
                }), setTimeout(function() {
                    return e.setCountDown(d - 1);
                }, 1e3);
            }).catch(function(e) {
                return console.log(e);
            });
        },
        setCountDown: function(e) {
            var t = this;
            if (e < 0) return this.initSeckill();
            var n = Math.floor(e / 60 / 60), o = Math.floor(e % 3600 / 60), i = e % 60;
            this.setData({
                countdownHour: n < 10 ? "0" + n : "" + n,
                countdownMinute: o < 10 ? "0" + o : "" + o,
                countdownSecond: i < 10 ? "0" + i : "" + i
            }), this.timer = setTimeout(function() {
                return t.setCountDown(e - 1);
            }, 1e3);
        },
        tapSeckill: function(e) {
            var t = e.currentTarget.dataset, n = t.sku, o = t.pps;
            this.$goto("/pages/seckill/index/index", {
                sku: n,
                pps: o,
                ptag: "138067.11.3"
            });
        },
        initRecommend: function() {
            var e = this;
            return i.getRecommendList().then(function(n) {
                if (!n || !n.skuinfo) return t.reject("get recommend list error");
                var o = {
                    image: e.utils.getImg(n.skuinfo.skupicurl),
                    shareID: n.shareid,
                    pps: n.pps
                };
                e.setData({
                    recommendGood: o
                });
            }).catch(function(e) {
                return console.log(e);
            });
        },
        getRecommendText: function() {
            var e = this;
            return this.getPPMSData().then(function(t) {
                e.setData({
                    recommendDesc: t.recommendDesc || ""
                });
            }).catch(function(e) {
                return console.log(e);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new t(function(t) {
                e.getPPMSDataResolve = t;
            });
        },
        tapRecommend: function(e) {
            var t = e.currentTarget.dataset, n = "https://wqs.jd.com/haohuo/index.shtml?ptag=138067.11.4&shareid=" + t.shareid + "&pps=" + t.pps;
            this.$goto("/pages/h5/index", {
                url: n
            });
        },
        initWelfare: function() {
            var e = this;
            return i.getWelfare().then(function(n) {
                if (!n || !n.active_list || !n.active_list.length) return t.reject("getWelfare error");
                var o = n.participation, i = n.active_list[0], r = {
                    image: e.utils.getImg(i.prize_pic_url),
                    desc: i.index_text,
                    url: "https://wqs.jd.com/social_cube_centralization/index.html?ptag=138067.11.5"
                };
                if (o && o >= 1e4) {
                    var s = Math.floor(o / 1e4);
                    r.participation = s < 1e3 ? s + "万" : s >= 1e3 && s < 1e4 ? Math.floor(s / 1e3) + "千万" : Math.floor(s / 1e4) + "亿";
                } else r.participation = Math.floor(51 * Math.random() + 30) + "万";
                e.setData({
                    welfare: r
                });
            }).catch(function(e) {
                return console.log("cjj", e);
            });
        },
        tapWelfare: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});
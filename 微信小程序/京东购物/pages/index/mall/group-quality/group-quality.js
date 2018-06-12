var t = require("../../../../bases/component.js"), e = require("../../../../libs/promise.min.js"), r = require("../common-behavior.js"), a = require("../../model.js"), n = require("../../../../common/cookie-v2/cookie").getCookie;

new t({
    behaviors: [ r ],
    data: {
        entries: []
    },
    methods: {
        refresh: function() {
            this.loadEntryData();
        },
        loadEntryData: function() {
            var t = this;
            e.all([ a.getEntryData(296, 5), a.getCsortData(178, 1) ]).then(function(r) {
                var i = r[0], o = r[1], s = [], l = [ "138067.20.1", "138067.20.2", "138067.20.3", "138067.20.4", "138067.20.6" ];
                i.forEach(function(e, r) {
                    e.images = [], e.list.forEach(function(a) {
                        e.images.push({
                            cover: t.utils.getImg(a.img, 1 == r ? 174 : 148),
                            url: a.url + "&ptag=" + l[r]
                        });
                    }), s.push({
                        title: e.martname,
                        des: e.list[0].content,
                        images: e.images
                    });
                });
                var c = n("wq_addr") || "_|19_1601|广东", u = (c = c.split("|"))[2].split("_")[0], g = c[1].split("_")[0], m = c[1].split("_")[1];
                s.splice(4, 0, {
                    title: "排行榜",
                    des: u + "热卖榜",
                    images: [ {
                        cover: "",
                        url: "https://wqs.jd.com/portal/wx/jdrank_v2/hot.shtml?area=" + g + "_" + m + "_" + encodeURIComponent(u) + "&ptag=138067.20.5"
                    } ]
                }), s.forEach(function(r, n) {
                    if (1 == n) {
                        var i = t.utils.getUrlParam("sku", r.images[0].url);
                        r.des = "", a.getBrandData(118, i, 1).then(function(a) {
                            if (!a.detailItems || !a.detailItems.length) return e.reject({
                                message: "get brand data error!"
                            });
                            r.des = a.detailItems[0].sUserData4 || "大牌精选特卖打折", r.logo = t.utils.getImg(a.detailItems[0].sMaterialUrl2, 120, 60), 
                            r.url = r.images[0].url + "&topsid=" + a.detailItems[0].dwSid, t.setData({
                                entries: s
                            });
                        }).catch(function(t) {
                            return console.log("getBrandData error", t);
                        });
                    } else if (4 == n) {
                        var l = o[0].c2[0].c3[0].c3item;
                        a.getRankInfoData(l, g, m).then(function(a) {
                            if (!a.rankInfo || !a.rankInfo.length) return e.reject("get rankinfo error");
                            var n = a.rankInfo[0].imgPath;
                            r.images[0].cover = t.utils.getImg(n, 148), t.setData({
                                entries: s
                            });
                        }).catch(function(t) {
                            return console.log("getRankInfoData error", t);
                        });
                    }
                }), t.setData({
                    entries: s
                });
            }).catch(function(t) {
                return console.log("quality error", t);
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});
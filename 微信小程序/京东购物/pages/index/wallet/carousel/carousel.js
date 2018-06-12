function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = require("../../../../bases/component.js"), r = require("../common-behavior.js"), n = require("../../../../libs/promise.min.js"), i = require("../../model.js"), a = require("../../../../common/img_loader/img_loader.js"), o = require("../../../../common/localStorage.js");

new t({
    behaviors: [ r ],
    properties: {
        birthConfig: {
            type: Object,
            observer: function(e) {
                var t = this;
                if (!e.bannerImg) return this.getBirthBannerResolve({});
                o.get("index_birth_banner_decorated", null).then(function(r) {
                    t.getBirthBannerResolve && (r ? t.getBirthBannerResolve({}) : t.getBirthBannerResolve(e));
                });
            }
        }
    },
    data: {
        swiperIdx: 0,
        entries: []
    },
    methods: {
        refresh: function() {
            this.loadBannerData();
        },
        loadBannerData: function() {
            var t = this;
            n.all([ this.getCpcData(), this.getWeatherLocation(), this.getBirthBanner() ]).then(function(r) {
                var i = r[0], a = r[1], s = r[2], u = i.entries.filter(function(e) {
                    return !!e;
                });
                s.bannerImg && (i.shuffle = !0, u.splice(0, 0, {
                    image: t.utils.getImg(s.bannerImg, 750),
                    url: s.bannerUrl
                }), o.set("index_birth_banner_decorated", "true", {
                    expire: "1d"
                }));
                var c = i.shuffle, h = [].concat(e(u), e(a));
                return h.length ? {
                    entries: h,
                    shuffle: c
                } : n.reject({
                    message: "Data error!"
                });
            }).then(function(e) {
                var r = e.entries;
                e.shuffle ? r = [ r[0] ].concat(r.slice(1).sort(function() {
                    return Math.random() > .5;
                })) : r.sort(function() {
                    return Math.random() > .5;
                }), t.setData({
                    entries: [ Object.assign({}, r[0], {
                        image: t.utils.getImg(r[0].image, 150)
                    }) ]
                }, function() {
                    return t.triggerEvent("componentLoad", t.is);
                }), t.imgLoader = new a(t), t.imgLoader.load(r[0].image, function(e, n) {
                    t.setData({
                        entries: r,
                        swiperCurrent: 0,
                        swiperIdx: 0
                    });
                });
            }).catch(function(e) {
                t.triggerEvent("componentLoad", t.is);
            });
        },
        getCpcData: function() {
            var e = this, t = [ 9816 ], r = [ 25527, 25528, 25529, 25530, 25531, 25452 ];
            return i.getCpcData(t, r, {}, new Date()).then(function(i) {
                var a = !1, o = i[t[0]];
                return o ? {
                    entries: r.map(function(t, r) {
                        var n = o[t] && o[t][0];
                        return n ? (0 == r && (a = !0), {
                            image: e.utils.getImg(n.material, 750),
                            url: n.sUrl
                        }) : null;
                    }),
                    shuffle: a
                } : n.reject({
                    message: "Fetch cpc data error!"
                });
            });
        },
        getBirthBanner: function() {
            var e = this;
            return new n(function(t) {
                e.getBirthBannerResolve = t;
            });
        },
        getWeatherLocation: function() {
            var e = this;
            return n.all([ i.getWeatherLocation(), this.getWeatherPPMS() ]).then(function(t) {
                if (!t[0] || !t[1]) return n.reject();
                var r = [], i = t[0].province, a = t[0].weather, o = t[1];
                return a <= 0 || a > 5 ? r : (o.some(function(t) {
                    if (t.provinceid == i) {
                        var n = !0, o = !1, s = void 0;
                        try {
                            for (var u, c = t.conditions[Symbol.iterator](); !(n = (u = c.next()).done); n = !0) {
                                var h = u.value;
                                h.weatherType == a && (h.image = e.utils.getImg(h.img, 750), h.url = h.marketUrl, 
                                r.push(h));
                            }
                        } catch (e) {
                            o = !0, s = e;
                        } finally {
                            try {
                                !n && c.return && c.return();
                            } finally {
                                if (o) throw s;
                            }
                        }
                        return !0;
                    }
                }), r);
            }).catch(function(e) {
                return [];
            });
        },
        getWeatherPPMS: function() {
            return this.biz.getPPMS(33208);
        },
        onSwiperChange: function(e) {
            this.setData({
                swiperIdx: e.detail.current
            });
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});
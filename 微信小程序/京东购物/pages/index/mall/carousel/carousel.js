function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = require("../../../../bases/component.js"), r = require("../../../../common/img_loader/img_loader.js"), n = require("../../../../libs/promise.min.js"), a = require("../common-behavior.js"), i = require("../../model.js"), o = require("../../utils.js");

new t({
    behaviors: [ a ],
    properties: {
        carouselConfig: {
            type: "Object",
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
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
            this.getPPMSData().then(function(a) {
                var i = a.focusVKRange, o = a.adVKRange, s = a.fixed;
                return n.all([ t.getCpcData(i), t.getAdvData(o), n.resolve(s) ]).then(function(t) {
                    var r = t[0] || [], a = t[1] || [], i = [];
                    if (r.length) {
                        var o = s ? 0 : Math.floor(Math.random() * r.length);
                        i.push(r[o]), r.splice(o, 1);
                    }
                    return (i = [].concat(e(i), e(a), e(r))).length ? i : n.reject({
                        message: "Data error!"
                    });
                }).then(function(e) {
                    t.setData({
                        entries: [ Object.assign({}, e[0], {
                            image: t.utils.getImg(e[0].image, 150)
                        }) ]
                    }, function() {
                        return t.triggerEvent("componentLoad", t.is);
                    }), t.imgLoader = new r(t), t.imgLoader.load(e[0].image, function(r, n) {
                        t.setData({
                            entries: e,
                            swiperCurrent: 0,
                            swiperIdx: 0
                        });
                    });
                }).catch(function(e) {
                    t.triggerEvent("componentLoad", t.is);
                });
            });
        },
        getCpcData: function(e) {
            var t = this;
            if (!o.vkGreyScale(e)) return n.resolve([]);
            var r = [ 9231 ], a = [];
            return i.getCpcData(r, a, {}, new Date(), {
                raw: !0
            }).then(function(e) {
                var a = void 0;
                if (e.some(function(e) {
                    if (e.groupid == r[0]) return a = e.locations || [], !0;
                }), !a || !a.length) return n.reject({
                    message: "Fetch cpc data error!"
                });
                var i = [];
                return a.forEach(function(e) {
                    if (e.plans && e.plans.length) {
                        var r = e.plans[0];
                        i.push({
                            image: t.utils.getImg(r.material, 750),
                            url: r.sUrl
                        });
                    }
                }), i;
            });
        },
        getAdvData: function(e) {
            return n.resolve([]);
        },
        getPPMSData: function() {
            var e = this, t = {
                focusVKRange: "0-99",
                adVKRange: "0-99",
                fixed: !1
            };
            return new n(function(t) {
                e.getPPMSDataResolve = t;
            }).then(function(e) {
                return e ? {
                    focusVKRange: e.focusVKRange || "0-99",
                    adVKRange: e.adVKRange || "0-99",
                    fixed: e.themeConfig && "1" === e.themeConfig.bannerFirst
                } : t;
            }).catch(function(e) {
                return t;
            });
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
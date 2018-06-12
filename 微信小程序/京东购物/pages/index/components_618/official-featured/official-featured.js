function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t = require("../constant"), r = require("../../../../bases/component.js"), i = require("../../../../libs/promise.min.js"), n = require("../../../../api/Ptag/report_manager.js"), a = require("../../mall/common-behavior.js"), o = require("../../model.js"), c = require("../../utils.js");

new r({
    behaviors: [ a ],
    properties: {
        officialConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        entries1: [],
        entries2: [],
        entries3: [],
        config: {},
        hideModule: !1
    },
    methods: {
        refresh: function() {
            if (!c.checkTime(t.CATEGORY_BEGIN, t.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.init();
        },
        init: function() {
            var t = this;
            this.getPPMSData().then(function(e) {
                if (!e.data) return i.reject("feature get ppms data error");
                var r = e.data, n = void 0, a = void 0;
                return r.feature.some(function(e) {
                    if (c.checkTime(e.beginTime, e.endTime)) return n = e, !0;
                }), r.featureParam.some(function(e) {
                    if (c.checkTime(e.beginTime, e.endTime)) return a = e, !0;
                }), n && a ? {
                    config: {
                        title: n.featureTitle,
                        mainBg: "background-image: url(" + t.utils.getImg(n.mainbg) + ")",
                        linkBg: "background-image: -webkit-linear-gradient(left, " + n.colorleft + ", " + n.colorright + ");",
                        linkText: n.navtitle,
                        linkUrl: n.navlink
                    },
                    param: a
                } : i.reject("There is no config");
            }).then(function(r) {
                var a = r.config, c = r.param;
                i.all([ t.getEntryData(c.proid, 4, c.interval), t.getEntryData(321, 6) ]).then(function(r) {
                    if (!r[0] || !r[1]) return i.reject("official-featured getEntryData error");
                    var c = r[0].entries, u = r[1].entries, s = [], l = [], g = [], f = [ 10613 ], m = [ 28039, 28040, 28041 ], h = {};
                    if ((s = s.concat(c)).length < 4) {
                        var d = 4 - s.length;
                        m.unshift("28038"), h = e({}, "28038", d);
                    }
                    o.getCpcData(f, m, h, Date.now()).then(function(e) {
                        if (!e) return i.reject("official-featured getCpcData error");
                        var r = [], o = [];
                        for (var c in e[f]) "28038" == c || "28041" == c ? e[f][c].forEach(function(e) {
                            r.push({
                                title: e.materialname,
                                des: e.materialdesc,
                                image: t.utils.getImg(e.material, 140),
                                url: e.sUrl
                            });
                        }) : e[f][c].forEach(function(e) {
                            o.push({
                                title: e.materialname,
                                des: e.materialdesc,
                                url: e.sUrl
                            });
                        });
                        s = s.concat(r), l = s.splice(1, 2, []), g = g.concat(u, o), t.setData({
                            config: a,
                            entries1: s,
                            entries2: l,
                            entries3: g
                        }, function() {
                            return t.triggerEvent("componentLoad", t.is);
                        }), s.concat(l, g).forEach(function(e) {
                            if (e.url) {
                                var r = t.utils.getUrlParam("ptag", e.url);
                                n.addPtagExposure(r);
                            }
                        });
                    }).catch(function(e) {
                        t.setData({
                            hideModule: !0
                        }), t.triggerEvent("componentLoad", t.is);
                    });
                }).catch(function(e) {
                    t.setData({
                        hideModule: !0
                    }), t.triggerEvent("componentLoad", t.is);
                });
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getEntryData: function(e, t, r) {
            var i = this, n = [];
            return o.getEntryData(e, t, {
                interval: r
            }).then(function(e) {
                return e.forEach(function(e) {
                    var t = e.list && e.list[0];
                    t && n.push({
                        title: e.martname,
                        des: t.content,
                        image: i.utils.getImg(t.img, 160),
                        url: t.url + "&ptag=" + e.ext1
                    });
                }), {
                    entries: n
                };
            });
        },
        getPPMSData: function() {
            var e = this;
            return new i(function(t, r) {
                e.getPPMSDataResolve = t;
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});
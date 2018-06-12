var e = function() {
    function e(e, t) {
        var r = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (a) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("../constant"), r = require("../../../../bases/component.js"), n = require("../../../../libs/promise.min.js"), a = require("../../../../api/Ptag/report_manager.js"), i = require("../../mall/common-behavior.js"), o = require("../../utils.js"), s = require("../../model.js");

new r({
    behaviors: [ i ],
    properties: {
        freshmenData: {
            type: Object,
            observer: function(e) {
                var t = void 0;
                1 == e.isnew && (t = !0), 0 == e.isnew && (t = !1), this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        banner: {},
        goods: [],
        freshmen: {},
        hideModule: !1,
        showFreshmen: !1
    },
    methods: {
        refresh: function() {
            if (!o.checkTime(t.CATEGORY_BEGIN, t.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void (this.data.hideModule || this.setData({
                hideModule: !0
            }));
            this.init();
        },
        init: function() {
            var t = this;
            n.all([ this.getFreshmenData(), this.getPPMSData() ]).then(function(r) {
                var i = e(r, 2), u = i[0], h = i[1];
                if (!h.data) return n.reject("freshmen banner get ppms data error");
                if (u) {
                    var l = void 0;
                    if (h.data.banner_freshmen.some(function(e) {
                        if (o.checkTime(e.beginTime, e.endTime)) return l = e, !0;
                    }), !l) return n.reject("There is no config");
                    var c = l, g = c.link, m = c.mall_ptag, d = c.wallet_ptag, f = "wallet" === h.indexName ? d : m, v = {
                        image: t.utils.getImg(l.image),
                        url: g + "?ptag=" + f
                    };
                    t.setData({
                        freshmen: v,
                        showFreshmen: !0
                    }, function() {
                        return t.triggerEvent("componentLoad", t.is);
                    }), a.addPtagExposure(f);
                } else {
                    var p = [ 10660 ], D = [ 28175 ];
                    n.all([ s.getCpcData(p, D, {}, Date.now()), s.getEntryicon(3604, 3) ]).then(function(e) {
                        if (!e[0] || !e[1].length) return n.reject("freshmen banner get data error");
                        var r = e[0][p][D][0], i = e[1][0].list, o = [], s = {
                            image: "background-image: url(" + t.utils.getImg(r.material, 750, 260) + ");",
                            text: r.materialdesc
                        }, u = "wallet" === h.indexName ? "137889.57.1" : "138067.57.1";
                        i.forEach(function(e) {
                            e.imgurl && e.clickurl && o.push({
                                image: t.utils.getImg(e.imgurl, 120),
                                url: e.clickurl + "&ptag=" + u
                            });
                        }), t.setData({
                            banner: s,
                            goods: o,
                            showFreshmen: !1
                        }, function() {
                            return t.triggerEvent("componentLoad", t.is);
                        }), a.addPtagExposure(u);
                    }).catch(function(e) {
                        t.setData({
                            hideModule: !0
                        }), t.triggerEvent("componentLoad", t.is);
                    });
                }
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new n(function(t, r) {
                e.getPPMSDataResolve = t;
            });
        },
        getFreshmenData: function() {
            var e = this;
            return new n(function(t) {
                e.getFreshmenDataResolve = t;
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        onTap: function(e) {
            var t = this.data, r = t.goods, n = t.current, a = void 0 === n ? 0 : n;
            if (r.length) {
                var i = this.data.goods[a].url;
                this.$goto("/pages/h5/index", {
                    url: i
                });
            }
        },
        onSwiperChange: function(e) {
            this.setData({
                current: e.detail.current
            });
        }
    }
});
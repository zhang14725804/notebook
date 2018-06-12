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
}(), t = require("../constant"), r = require("../../../../bases/component.js"), n = require("../../../../libs/promise.min.js"), a = require("../../../../api/Ptag/report_manager.js"), i = require("../../mall/common-behavior.js"), o = require("../../utils.js");

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
        banner: [],
        hideModule: !1,
        showImage: !1
    },
    methods: {
        refresh: function() {
            if (!o.checkTime(t.PREHEAT_BEGIN, t.PREHEAT_END)) return this.triggerEvent("componentLoad", this.is), 
            void (this.data.hideModule || this.setData({
                hideModule: !0
            }));
            this.init();
        },
        init: function() {
            var t = this;
            n.all([ this.getFreshmenData(), this.getPPMSData() ]).then(function(t) {
                var r = e(t, 2), a = r[0], i = r[1];
                if (!i.data) return n.reject("Banner small get ppms data error");
                var o = void 0;
                return o = a ? i.data.banner_freshmen : i.data.banner_guide, {
                    data: o,
                    indexName: i.indexName
                };
            }).then(function(e) {
                if (!e.data) return n.reject("Banner small get ppms data error");
                var r = e.data, i = e.indexName, s = void 0;
                if (r.some(function(e) {
                    if (o.checkTime(e.beginTime, e.endTime)) return s = e, !0;
                }), !s) return n.reject("There is no config");
                var u = t.utils.getImg(s.image), h = s, c = h.link, l = h.mall_ptag, d = h.wallet_ptag, m = "wallet" === i ? d : l, g = c + "?ptag=" + m;
                t.setData({
                    image: u,
                    url: g
                }, function() {
                    return t.triggerEvent("componentLoad", t.is);
                }), a.addPtagExposure(m);
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
        onTap: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        onImgLoad: function(e) {
            this.setData({
                showImage: !0
            });
        }
    }
});
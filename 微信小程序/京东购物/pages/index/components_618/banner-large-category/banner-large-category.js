var e = require("../constant"), t = require("../../../../bases/component.js"), r = require("../../../../libs/promise.min.js"), a = require("../../../../api/Ptag/report_manager.js"), i = require("../../../../common/cookie-v2/cookie.js").getCookie, n = require("../../../../common/utils.js").querystr, o = require("../../mall/common-behavior.js"), s = require("../../utils.js"), u = require("../../model.js");

new t({
    behaviors: [ o ],
    properties: {
        officialConfig: {
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
            if (!s.checkTime(e.CATEGORY_BEGIN, e.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void (this.data.hideModule || this.setData({
                hideModule: !0
            }));
            this.init();
        },
        init: function() {
            var e = this;
            this.getPPMSData().then(function(e) {
                var t = {
                    indexName: e.indexName
                };
                if (!e || !e.data || !e.data.mainFeature) return t;
                var r = e.data.mainFeature.find(function(e) {
                    return s.checkTime(e.beginTime, e.endTime);
                });
                return r && (t.config = r), t;
            }).then(function(t) {
                var a = t.indexName, n = !1;
                if (t.hasOwnProperty("config")) {
                    var o = t.config.fluxVal;
                    if (o) {
                        var s = i("visitkey"), u = parseInt(s.slice(-2)) + 1, c = parseInt(o);
                        (100 === c || c > 0 && c <= 100 && u <= c) && (n = !0);
                    }
                }
                var d = void 0;
                if ("mall" === a) d = n ? 28037 : 27997, e.setData({
                    indexName: a
                }); else {
                    if ("wallet" !== a) return r.reject("get index name error");
                    d = n ? 28054 : 27998;
                }
                return d;
            }).then(function(t) {
                return u.getCpcData([ 10597 ], [ t ], {}, new Date()).then(function(e) {
                    return e && e[10597] && e[10597][t] && e[10597][t][0] ? e[10597][t][0] : r.reject("get cpc data error");
                }).then(function(t) {
                    var r = t.sUrl, i = t.pps, o = t.material, s = t.materialdesc, u = t.promotion, c = t.userdata1, d = t.userdata2, m = t.userdata3, l = e.utils.getImg(o), g = (c.includes("?") ? c : c + "?") + "&pps=" + i, h = (d.includes("?") ? d : d + "?") + "&pps=" + i, f = (m.includes("?") ? m : m + "?") + "&pps=" + i, p = [ r, g, h ], v = s.split("|"), P = {
                        title: v[0] || "",
                        text: v[1] || "",
                        url: f || "",
                        bg: u || "transparent"
                    };
                    e.setData({
                        image: l,
                        banner: p,
                        calendar: P
                    }, function() {
                        return e.triggerEvent("componentLoad", e.is);
                    });
                    var D = [].concat(p, [ f ]).reduce(function(e, t, r) {
                        var a = t.split("?")[1], i = a ? n(a).query : {}, o = i.ptag || i.PTAG, s = e;
                        return o && (s += 0 === r ? o : "_" + o), s;
                    }, "");
                    a.addPtagExposure(D);
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new r(function(t) {
                e.getPPMSDataResolve = t;
            });
        },
        tapOnItem: function(e) {
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
var e = require("../constant"), t = require("../../../../bases/component.js"), i = require("../../../../libs/promise.min.js"), r = require("../../mall/common-behavior.js"), a = require("../../../../api/Ptag/report_manager.js"), n = require("../../model.js"), o = require("../../utils.js");

new t({
    behaviors: [ r ],
    properties: {
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        entries: [],
        hideModule: !1,
        config: {}
    },
    methods: {
        refresh: function() {
            if (!o.checkTime(e.CATEGORY_BEGIN, e.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.init();
        },
        init: function() {
            var e = this;
            this.getPPMSData().then(function(t) {
                if (!t.data) return i.reject("wallet-feature get ppms data error");
                var r = void 0;
                if (t.data.wallet_feature.some(function(e) {
                    if (o.checkTime(e.beginTime, e.endTime)) return r = e, !0;
                }), !r) return i.reject("There is no config");
                var l = {
                    title: r.title,
                    mainBg: "background-image: url(" + e.utils.getImg(r.mainBg) + ")",
                    infoBg: "background-image: url(" + e.utils.getImg(r.infoBg) + ")",
                    linkBg: "background-image: -webkit-linear-gradient(left, " + r.linkColorLeft + ", " + r.linkColorRight + ");",
                    linkText: r.link,
                    linkUrl: r.linkUrl
                };
                i.all([ n.getEntryData(316, 8, {
                    interval: r.interval
                }), n.getCpcData([ 10613 ], [ 28056 ], {}, Date.now()) ]).then(function(t) {
                    var r = t[0], n = t[1][10613][28056];
                    if (!r.length || !n) return i.reject("wallet-feature get data error");
                    var o = [];
                    if (r.forEach(function(t) {
                        t.martname && t.list.length && o.push({
                            title: t.martname,
                            des: t.list[0].content,
                            image: e.utils.getImg(t.list[0].img, 177),
                            url: t.list[0].url + "&ptag=" + t.ext1
                        });
                    }), o.push({
                        title: n[0].materialname,
                        des: n[0].materialdesc,
                        image: e.utils.getImg(n[0].material, 177),
                        url: n[0].sUrl
                    }), o.forEach(function(t) {
                        if (t.url) {
                            var i = e.utils.getUrlParam("ptag", t.url);
                            a.addPtagExposure(i);
                        }
                    }), o.length < 9) return i.reject("entries < 9");
                    e.setData({
                        config: l,
                        entries: o
                    }, function() {
                        return e.triggerEvent("componentLoad", e.is);
                    });
                }).catch(function(t) {
                    e.setData({
                        hideModule: !0
                    }), e.triggerEvent("componentLoad", e.is);
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new i(function(t, i) {
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
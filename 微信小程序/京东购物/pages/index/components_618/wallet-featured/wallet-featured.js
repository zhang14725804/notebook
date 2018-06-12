var e = require("../constant"), t = require("../../../../bases/component.js"), i = require("../../../../libs/promise.min.js"), n = require("../../mall/common-behavior.js"), r = require("../../model.js"), a = require("../../utils.js");

new t({
    behaviors: [ n ],
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
            if (!a.checkTime(e.PREHEAT_BEGIN, e.PREHEAT_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.init();
        },
        init: function() {
            var e = this;
            this.getPPMSData().then(function(t) {
                if (!t.data) return i.reject("wallet-feature get ppms data error");
                var n = {};
                if (t.data.wallet_feature.some(function(e) {
                    if (a.checkTime(e.beginTime, e.endTime)) return n = e, !0;
                }), !n) return i.reject("There is no config");
                var o = {
                    title: n.title,
                    mainBg: "background-image: url(" + e.utils.getImg(n.mainBg) + ")",
                    infoBg: "background-image: url(" + e.utils.getImg(n.infoBg) + ")",
                    linkBg: "background-image: -webkit-linear-gradient(left, " + n.linkColorLeft + ", " + n.linkColorRight + ");",
                    linkText: n.link,
                    linkUrl: n.linkUrl
                };
                r.getEntryData(316, 9, {
                    interval: n.interval
                }).then(function(t) {
                    var i = [];
                    t.forEach(function(t) {
                        t.martname && t.list.length && i.push({
                            title: t.martname,
                            des: t.list[0].content,
                            image: e.utils.getImg(t.list[0].img, 177),
                            url: t.list[0].url + "&ptag=" + t.ext1
                        });
                    }), e.setData({
                        config: o,
                        entries: i
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
var e = require("../constant"), t = require("../../../../bases/component.js"), i = require("../../../../libs/promise.min.js"), n = require("../../mall/common-behavior.js"), r = require("../../model.js"), a = require("../../utils.js");

new t({
    behaviors: [ n ],
    properties: {
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        showTime: {
            type: Number,
            observer: function(e) {
                this.onShow();
            }
        },
        hideTime: {
            type: Number,
            observer: function(e) {
                this.onHide();
            }
        }
    },
    data: {
        entries: [],
        config: {},
        hideModule: !1,
        featuredAnimation: !1
    },
    methods: {
        refresh: function() {
            if (!a.checkTime(e.PREHEAT_BEGIN, e.PREHEAT_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.setData({
                featuredAnimation: !0
            }), this.init();
        },
        onShow: function() {
            this.setData({
                featuredAnimation: !0
            });
        },
        onHide: function() {
            this.setData({
                featuredAnimation: !1
            });
        },
        init: function() {
            var e = this;
            this.getPPMSData().then(function(t) {
                if (!t.data) return i.reject("feature get ppms data error");
                var n = void 0;
                if (t.data.feature.some(function(e) {
                    if (a.checkTime(e.beginTime, e.endTime)) return n = e, !0;
                }), !n) return i.reject("There is no config");
                var o = {
                    title: n.featureTitle,
                    mainBg: "background-image: url(" + e.utils.getImg(n.mainbg) + ")",
                    infoBg: "background-image: url(" + e.utils.getImg(n.littlebg) + ")",
                    linkBg: "background-image: -webkit-linear-gradient(left, " + n.colorleft + ", " + n.colorright + ");",
                    linkText: n.navtitle,
                    linkUrl: n.navlink,
                    desBg: "background-color: " + n.skubgcolor + ";"
                };
                r.getEntryData(312, 4, {
                    interval: 3
                }).then(function(t) {
                    var i = [];
                    t.forEach(function(t) {
                        t.martname && t.list.length && i.push({
                            title: t.martname,
                            des: t.list[0].content,
                            cover: e.utils.getImg(t.list[0].brandimg, 165, 192),
                            image: e.utils.getImg(t.list[0].img, 145, 169),
                            url: t.list[0].url + "&ptag=" + t.ext1
                        });
                    }), e.setData({
                        entries: i,
                        config: o
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
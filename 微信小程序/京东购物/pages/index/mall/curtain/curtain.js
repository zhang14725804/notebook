var t = require("../../../../bases/component.js"), e = require("../../model.js"), i = require("../../utils.js"), a = require("../../../../common/localStorage.js"), s = require("../../../../libs/promise.min.js"), n = require("../../../../api/Ptag/report_manager.js");

new t({
    properties: {
        freshmenData: {
            type: Object,
            observer: function(t) {
                this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        },
        showTime: {
            type: Number,
            observer: function() {
                this.triggerCurtainFinishDelay && (this.triggerCurtainFinishDelay = !1, this.triggerEvent("curtainFinish"));
            }
        },
        saleConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        special: !1,
        showModule: !1,
        url: "",
        image: "",
        transparent: !1,
        countdown: 5,
        hideSpecail: !1,
        hideCountdown: !1,
        saleCountdown: 3,
        hideSale: !1,
        hideSaleCountdown: !1
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var t = this;
            s.all([ this.getFreshmenData(), this.loadCurtainData(), this.getCurtainExpire(), this.getPPMSData(), a.get("saleCurtain_hide_util", null) ]).then(function(e) {
                var a = e[0], s = e[1], r = e[2][0], o = e[2][1], u = e[2][2];
                if (s) {
                    var l = s.freshmenGiftData, h = s.freshmenActivitiesData, c = s.activitiesData, g = s.atmosphereData, m = !1;
                    if (1 == a.isnew && (3 == a.newgift ? (m = t.curtainExistsThenShow(h, "freshmen", r)) && (n.addPtagExposure("138067.1.3"), 
                    t.closePtag = "138067.1.24") : (m = t.curtainExistsThenShow(l, "freshmen", r)) && (n.addPtagExposure("138067.1.2"), 
                    t.closePtag = "138067.1.23")), !m) {
                        var d = e[3] && e[3].data && e[3].data.baping || [], f = e[4], p = {};
                        d.some(function(t) {
                            if (i.checkTime(t.beginTime, t.endTime)) return p = t, p.sUrl = p.link, p.material = p.wxapp_dynamicimg, 
                            !0;
                        }), !t.curtainExistsThenShow(p, "sale", f) && !t.curtainExistsThenShow(g, "special", u) && !t.curtainExistsThenShow(c, "normal", o) && t.triggerEvent("curtainFinish");
                    }
                } else t.triggerEvent("curtainFinish");
            });
        },
        curtainExistsThenShow: function(t, e, i) {
            var s = this, r = t.sUrl, o = t.material;
            if (i && Date.now() < i) return !1;
            if (r && o) {
                if ("sale" === e) {
                    var u = {
                        sale: !0,
                        url: r + "?ptag=" + t.mall_ptag,
                        image: this.utils.getImg(o)
                    };
                    t.wxapp_staticimg && (u.preImage = this.utils.getImg(t.wxapp_staticimg)), this.setData(u), 
                    a.set("saleCurtain_hide_util", new Date().setHours(24, 0, 0, 0)), n.addPtagExposure(t.mall_ptag), 
                    this.closePtag = "138067.53.2";
                } else "special" === e ? (this.setData({
                    special: !0,
                    showModule: !0,
                    url: r,
                    image: this.utils.getImg(o)
                }), setTimeout(function() {
                    return s.count();
                }, 1e3), a.set("mall_" + e + "Curtain_hide_util", new Date().setHours(24, 0, 0, 0)), 
                n.addPtagExposure("138067.1.4"), this.closePtag = "138067.1.25") : (this.setData({
                    showModule: !0,
                    url: r,
                    image: this.utils.getImg(o)
                }), a.set("mall_" + e + "Curtain_hide_util", new Date().setHours(24, 0, 0, 0)), 
                setTimeout(function() {
                    return s.close();
                }, 5e3), "normal" === e && (n.addPtagExposure("138067.1.1"), this.closePtag = "138067.1.22"));
                return !0;
            }
            return !1;
        },
        getFreshmenData: function() {
            var t = this;
            return new s(function(e) {
                t.getFreshmenDataResolve = e;
            });
        },
        loadCurtainData: function() {
            var t = [ 10420 ], i = [ 27383, 27384, 27382, 27385 ];
            return e.getCpcData(t, i, {}, Date.now()).then(function(e) {
                var a = e[t[0]];
                if (a) return {
                    freshmenGiftData: a[i[0]][0] || {},
                    freshmenActivitiesData: a[i[1]][0] || {},
                    activitiesData: a[i[2]][0] || {},
                    atmosphereData: a[i[3]][0] || {}
                };
            }).catch(function(t) {
                var e = t.code, i = t.message;
                console.error(e, i);
            });
        },
        getCurtainExpire: function() {
            return s.all([ a.get("mall_freshmenCurtain_hide_util", null), a.get("mall_normalCurtain_hide_util", null), a.get("mall_specialCurtain_hide_util", null) ]);
        },
        close: function(t) {
            var e = this;
            this.data.showModule && (t && this.closePtag && i.report(this.closePtag), this.setData({
                transparent: !0
            }), setTimeout(function() {
                return e.setData({
                    showModule: !1
                }, function() {
                    !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
                });
            }, 400));
        },
        count: function() {
            var t = this, e = this.data.countdown;
            1 !== e ? (this.setData({
                countdown: e - 1
            }), this.Timer = setTimeout(function() {
                return t.count();
            }, 1e3)) : this.closeSpecial();
        },
        closeSpecial: function(t) {
            var e = this;
            this.data.hideSpecial || (this.Timer && clearTimeout(this.Timer), this.Timer = null, 
            t && this.closePtag && i.report(this.closePtag), this.setData({
                hideSpecial: !0,
                hideCountdown: !0
            }), setTimeout(function() {
                e.setData({
                    showModule: !1
                }), !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
            }, 1e3));
        },
        navigate: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.triggerCurtainFinishDelay = !0;
        },
        getPPMSData: function() {
            var t = this;
            return new s(function(e, i) {
                t.getPPMSDataResolve = e;
            });
        },
        saleCount: function() {
            var t = this, e = this.data.saleCountdown;
            1 !== e ? (this.setData({
                saleCountdown: e - 1
            }), this.saleTimer = setTimeout(function() {
                return t.saleCount();
            }, 1e3)) : this.closeSale();
        },
        closeSale: function(t) {
            var e = this;
            this.data.hideSale || (this.saleTimer && clearTimeout(this.saleTimer), this.saleTimer = null, 
            t && this.closePtag && i.report(this.closePtag), this.setData({
                hideSale: !0,
                hideSaleCountdown: !0
            }, function() {
                !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
            }));
        },
        saleImageLoaded: function(t) {
            var e = this;
            setTimeout(function() {
                return e.saleCount();
            }, 1e3);
        },
        preventSaleMove: function() {}
    }
});
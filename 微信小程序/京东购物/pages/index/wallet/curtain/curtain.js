function t(t) {
    var e = t.split("?")[1], i = e ? u(e).query : {}, n = i.ptag || i.PTAG;
    n && s.addPtagExposure(n);
}

var e = require("../../../../bases/component.js"), i = require("../../model.js"), n = require("../../utils.js"), a = require("../../../../common/localStorage.js"), r = require("../../../../libs/promise.min.js"), s = require("../../../../api/Ptag/report_manager.js"), u = require("../../../../common/utils.js").querystr;

new e({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.triggerCurtainFinishDelay && (this.triggerCurtainFinishDelay = !1, this.triggerEvent("curtainFinish"));
            }
        },
        freshmenData: {
            type: Object,
            observer: function(t) {
                this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        },
        curtainConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        showModule: !1,
        url: "",
        image: "",
        transparent: !1,
        saleCountdown: 3,
        hideSale: !1,
        hideSaleCountdown: !1
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var e = this;
            r.all([ this.loadFreshmenData(), this.loadCurtainData(), this.getPPMSData(), this.getCurtainExpire(), a.get("saleCurtain_hide_util", null) ]).then(function(i) {
                var a = i[0], u = i[1], o = i[2] && i[2].curtainCaptain && n.getActiveConfig(i[2].curtainCaptain), h = i[3][0], l = i[3][1], c = i[3][2], g = i[2] && i[2].baping || [], f = i[4];
                if (a && u && o) {
                    var m = u.freshmenGiftData, v = u.freshmenActivitiesData, d = u.activitiesData;
                    return r.resolve().then(function() {
                        if (!a) return !1;
                        var i = a.isnew, n = a.newgift;
                        return 1 == i && (3 == n ? e.curtainExistsThenShow(v, "freshmen", h).then(function(e) {
                            return e && t(v.sUrl), e;
                        }) : e.curtainExistsThenShow(m, "freshmen", h).then(function(e) {
                            return e && t(m.sUrl), e;
                        }));
                    }).then(function(t) {
                        if (t) return t;
                        var i = n.getActiveConfig(g);
                        return i.link && (i.sUrl = i.link), i.wxapp_dynamicimg && (i.material = i.wxapp_dynamicimg), 
                        e.curtainExistsThenShow(i, "sale", f).then(function(t) {
                            return t && s.addPtagExposure(i.wallet_ptag), t;
                        });
                    }).then(function(i) {
                        if (i) return i;
                        var n = o.actives, a = o.material, r = o.sUrl;
                        return !(!(n && a && r) || c && Date.now() < c) && e.captainQuali(n).then(function(t) {
                            return !!t && e.curtainExistsThenShow(o, "captain");
                        }).then(function(e) {
                            return e && t(r), e;
                        });
                    }).then(function(i) {
                        return i || e.curtainExistsThenShow(d, "normal", l).then(function(e) {
                            return e && t(d.sUrl), e;
                        });
                    }).then(function(t) {
                        !t && e.triggerEvent("curtainFinish");
                    });
                }
                e.triggerEvent("curtainFinish");
            });
        },
        curtainExistsThenShow: function(t, e, i) {
            var n = this, s = t.sUrl, u = t.material;
            if (i && Date.now() < i) return r.resolve(!1);
            if (s && u) {
                if ("sale" === e) {
                    var o = {
                        sale: !0,
                        url: s + "?ptag=" + t.wallet_ptag,
                        image: this.utils.getImg(u)
                    };
                    t.wxapp_staticimg && (o.preImage = this.utils.getImg(t.wxapp_staticimg)), this.setData(o, function() {
                        return setTimeout(function() {
                            return n.saleCount();
                        }, 1e3);
                    }), a.set("saleCurtain_hide_util", new Date().setHours(24, 0, 0, 0));
                } else this.setData({
                    showModule: !0,
                    url: s,
                    image: this.utils.getImg(u)
                }), a.set("index_" + e + "Curtain_hide_util", new Date().setHours(24, 0, 0, 0)), 
                setTimeout(function() {
                    return n.close();
                }, 5e3);
                return r.resolve(!0);
            }
            return r.resolve(!1);
        },
        loadFreshmenData: function() {
            var t = this;
            return new r(function(e) {
                t.getFreshmenDataResolve = e;
            });
        },
        loadCurtainData: function() {
            var t = [ 9191 ], e = [ 23594, 23595, 27169 ];
            return i.getCpcData(t, e).then(function(i) {
                var n = i[t[0]];
                if (n) return {
                    freshmenGiftData: n[e[0]][0] || {},
                    freshmenActivitiesData: n[e[1]][0] || {},
                    activitiesData: n[e[2]][0] || {}
                };
            }).catch(function(t) {});
        },
        getCurtainExpire: function() {
            return r.all([ a.get("index_freshmenCurtain_hide_util", null), a.get("index_normalCurtain_hide_util", null), a.get("index_captainCurtain_hide_util", null) ]);
        },
        captainQuali: function(t) {
            return i.getCaptainQuali(t).then(function(t) {
                return t && +t > 0;
            }).catch(function(t) {
                return !1;
            });
        },
        close: function(t) {
            var e = this;
            if (this.data.showModule) {
                if (t) {
                    var i = t.currentTarget.dataset.rd;
                    i && n.report(i);
                }
                this.setData({
                    transparent: !0
                }), setTimeout(function() {
                    return e.setData({
                        showModule: !1
                    }, function() {
                        !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
                    });
                }, 400);
            }
        },
        navigate: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.triggerCurtainFinishDelay = !0;
        },
        getPPMSData: function() {
            var t = this;
            return new r(function(e, i) {
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
            t && this.closePtag && n.report(this.closePtag), this.setData({
                hideSale: !0,
                hideSaleCountdown: !0
            }, function() {
                !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
            }));
        },
        preventSaleMove: function() {}
    }
});
var e = require("../constant"), t = require("../../../../bases/component.js"), i = require("../../../../libs/promise.min.js"), n = require("../../../../common/localStorage.js"), a = require("../../../../api/Ptag/report_manager.js"), s = require("../../utils.js");

new t({
    properties: {
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        curtainFinish: {
            type: Boolean,
            observer: function(e) {
                e && this.waitCurtainFinishResolve && this.waitCurtainFinishResolve();
            }
        }
    },
    data: {
        showModule: !1,
        image: ""
    },
    attached: function() {
        s.checkTime(e.SALE_BEGIN, e.SALE_END) ? this.init() : this.triggerEvent("shakeAnimLoaded", {
            showEntrance: !1
        });
    },
    methods: {
        init: function() {
            var e = this;
            i.all([ this.getPPMSData(), this.getShakeAnimExpire(), this.waitCurtainFinish() ]).then(function(t) {
                var n = t[0].data, a = t[1];
                if (!n || !n.shake || !n.shake.length) return i.reject("shake:get ppms data error");
                var r = void 0;
                if (n.shake.some(function(e) {
                    if (s.checkTime(e.begin, e.end)) return r = e, !0;
                }), !r) return i.reject("shake:no shake config");
                "1" != r.usingShake || a && Date.now() < a ? e.triggerEvent("shakeAnimLoaded", {
                    config: r,
                    showEntrance: !0
                }) : (e.config = r, e.indexName = t[0].indexName, e.setData({
                    image: e.utils.getImg(r.bigImg)
                }));
            }).catch(function(t) {
                e.triggerEvent("shakeAnimLoaded", {
                    showEntrance: !1
                });
            });
        },
        onImgLoaded: function(e) {
            this.showAnim(this.config);
        },
        showAnim: function(e) {
            var t = this, i = void 0;
            "mall" === this.indexName ? i = "138067.54.1" : "wallet" === this.indexName && (i = "137889.54.1"), 
            i && a.addPtagExposure(i), n.set("shakeAnim_hide_util", new Date().setHours(24, 0, 0, 0)), 
            this.setData({
                showModule: !0
            }), setTimeout(function() {
                t.setData({
                    showModule: !1
                }, function() {
                    return t.triggerEvent("shakeAnimLoaded", {
                        config: e,
                        showEntrance: !0
                    });
                });
            }, 2600);
        },
        getPPMSData: function() {
            var e = this;
            return new i(function(t, i) {
                e.getPPMSDataResolve = t;
            });
        },
        getShakeAnimExpire: function() {
            return n.get("shakeAnim_hide_util", null);
        },
        waitCurtainFinish: function() {
            var e = this;
            return new i(function(t, i) {
                e.waitCurtainFinishResolve = t;
            });
        }
    }
});
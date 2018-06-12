var e = require("../../../../bases/component.js"), t = require("../../../../libs/promise.min.js"), i = require("../../../cate/model.js"), n = require("../../model.js"), a = require("../../utils.js");

new e({
    behaviors: [ require("../../page-behavior.js") ],
    data: {
        itemConfig: [],
        scrollTop: 0,
        reachBottom: 0,
        refreshTime: 0,
        showTime: 0,
        hideTime: 0
    },
    methods: {
        onLoad: function() {
            this.refresh();
        },
        onShow: function() {
            this.shake && this.shake.start(), this.setData({
                showTime: Date.now()
            });
        },
        onHide: function() {
            this.shake && this.shake.stop(), this.setData({
                hideTime: Date.now()
            });
        },
        refresh: function() {
            var e = this;
            this.shake && this.shake.stop(), wx.showNavigationBarLoading(), this.priorCount = 0, 
            this.getUserBirthday(), this.ppmsConfigPromise = this.getPPMSConfigPromise(), this.getPageConfig(), 
            this.getFreshmenData(), this.setData({
                refreshTime: Date.now(),
                loadOthers: !1
            }), setTimeout(function() {
                e.data.loadOthers || e.setData({
                    loadOthers: !0
                }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            }, 5e3);
        },
        onComponentLoad: function(e) {
            console.log("京东优选 onComponentLoad", this.priorCount, e.detail), 9 == ++this.priorCount && (this.setData({
                loadOthers: !0
            }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading()), 9 == this.priorCount && this.triggerEvent("firstScreenLoaded", 5);
        },
        onCurtainFinish: function(e) {
            this.setData({
                curtainFinish: !0
            });
        },
        getUserBirthday: function() {
            var e = this;
            this.getUserBirthdayTimer = setTimeout(function() {
                e.getUserBirthdayTimeout = !0, e.setData({
                    birthConfig: {}
                });
            }, 5e3), n.getUserBirthday().then(function(t) {
                if (!e.getUserBirthdayTimeout) {
                    if (clearTimeout(e.getUserBirthdayTimer), t) return e.ppmsConfigPromise.then(function(t) {
                        var i = void 0;
                        t.birthdayDecorate && t.birthdayDecorate.some(function(e) {
                            if (a.checkTime(e.beginTime, e.endTime)) return i = e, !0;
                        }), e.setData({
                            birthConfig: i || {}
                        });
                    }).catch(function(e) {
                        return console.log(e);
                    });
                    e.setData({
                        birthConfig: {}
                    });
                }
            }).catch(function(e) {
                return console.log(e);
            });
        },
        getPPMSConfigPromise: function() {
            var e = this;
            return new t(function(t) {
                e.getPPMSConfigResolve = t;
            });
        },
        getPageConfig: function() {
            var e = this, t = {
                channelConfig: {},
                floatingConfig: {},
                itemConfig: {},
                bannerConfig: {
                    firstBanner: [],
                    secondBanner: []
                },
                gridSelectedConfig: {},
                saleConfig: {},
                officialConfig: {}
            };
            this.biz.getMultiPPMS([ 33326, 34258, 34414 ]).then(function(i) {
                var n = i[33326] && i[33326][0] ? i[33326][0] : {};
                e.getPPMSConfigResolve(n);
                var o = a.getActiveConfig(n.channelConfig), s = a.getActiveConfig(n.floatingConfig), r = {
                    curtainCaptain: n.curtainCaptain || []
                }, h = i[34258] && i[34258][0] ? i[34258][0] : {}, g = i[34414] && i[34414][0] ? i[34414][0] : {};
                r.baping = h.baping, e.setData({
                    channelConfig: o,
                    floatingConfig: s,
                    itemConfig: n.itemConfig || {},
                    bannerConfig: n.bannerConfig[0] || t.bannerConfig,
                    gridSelectedConfig: n.gridSelectedConfig[0] || t.gridSelectedConfig,
                    curtainConfig: r,
                    saleConfig: {
                        data: h,
                        indexName: "wallet"
                    },
                    officialConfig: {
                        data: g,
                        indexName: "wallet"
                    }
                }), e.initShake(h.shake);
            }).catch(function(i) {
                return e.setData(t);
            });
        },
        getFreshmenData: function() {
            var e = this;
            n.getFreshmenData().then(function(t) {
                return e.setData({
                    freshmenData: t
                });
            }).catch(function(t) {
                return e.setData({
                    freshmenData: {}
                });
            });
        },
        onIdle: function() {
            i.getCateData(), this.$preload("pages/cart/cart/index");
        },
        onShowToast: function(e) {},
        initShake: function(e) {
            var t = this;
            if (e && e.length) {
                var i = void 0;
                if (e.some(function(e) {
                    if (a.checkTime(e.begin, e.end)) return i = e, !0;
                }), i && "1" == i.usingShake) {
                    this.shake = a.Shake.init();
                    var n = i.link + "?ptag=" + i.wallet_ptag;
                    this.shake.on(function() {
                        t.shake.stop(), t.$goto("/pages/h5/index", {
                            url: n
                        });
                    });
                }
            }
        },
        onShakeAnimLoaded: function(e) {
            this.setData({
                shakePayload: e.detail
            });
        }
    }
});
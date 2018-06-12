var e = require("../../../../bases/component.js"), t = require("../../../cate/model.js"), o = require("../../page-behavior.js"), n = require("../../model.js"), i = require("../../utils.js"), a = require("../banner.js");

new e({
    behaviors: [ o ],
    data: {
        scrollTop: 0,
        reachBottom: 0,
        refreshTime: 0,
        showTime: 0,
        hideTime: 0,
        bannerData: {}
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
        detached: function() {},
        refresh: function() {
            var e = this;
            this.shake && this.shake.stop(), this.startTime = Date.now(), wx.showNavigationBarLoading(), 
            this.priorCount = 0, this.getFreshmenData(), this.getPPMSData(), this.setData({
                refreshTime: Date.now(),
                loadOthers: !1
            }), setTimeout(function() {
                e.data.loadOthers || e.setData({
                    loadOthers: !0
                }, function() {
                    e.getBannerData(e.data.carouselConfig || {});
                }), e.triggerEvent("firstScreenLoaded"), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            }, 5e3);
        },
        onComponentLoad: function(e) {
            var t = this;
            console.log("个性化首页 onComponentLoad", this.priorCount, e.detail), 11 == ++this.priorCount && (console.log("speed point: First screen modules loaded: ", Date.now() - this.startTime), 
            this.triggerEvent("firstScreenLoaded", 6)), 11 == this.priorCount && (this.setData({
                loadOthers: !0
            }, function() {
                t.getBannerData(t.data.carouselConfig || {});
            }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), setTimeout(function() {
                t.onIdle();
            }, 2e3));
        },
        onCurtainFinish: function(e) {
            this.setData({
                curtainFinish: !0
            });
        },
        getPPMSData: function() {
            var e = this, t = {
                carouselConfig: {},
                iconConfig: {},
                floatingConfig: [],
                pingouConfig: {
                    useTuanHead: "0"
                },
                seckillConfig: {
                    recommendDesc: ""
                },
                videoConfig: {
                    title: "京东小视频",
                    moreDesc: "更多精彩小视频",
                    moreUrl: "",
                    showCount: !1
                },
                reviewsConfig: {
                    moreDesc: "更多专业评测",
                    moreUrl: ""
                },
                saleConfig: {},
                officialConfig: {}
            };
            console.log("speed point: Start to loadPPMS config loaded: ", Date.now() - this.startTime), 
            this.biz.getMultiPPMS([ 31542, 33866, 33870, 34242, 31550, 34258, 34414 ]).then(function(t) {
                var o = {}, n = {}, a = void 0, s = [];
                t[31542] && t[31542].length && (o = t[31542][0]), t[33866] && t[33866].length && (n = t[33866][0]), 
                t[33870] && t[33870].length && (a = t[33870][0]), t[31550] && (s = t[31550]);
                var r = {}, h = {}, c = {};
                t[34258] && t[34258].length && (h = t[34258][0]), t[34414] && t[34414].length && (c = t[34414][0]), 
                r.saleConfig = {
                    data: h,
                    indexName: "mall"
                }, r.officialConfig = {
                    data: c,
                    indexName: "mall"
                }, e.initShake(h.shake), r.carouselConfig = o || {}, r.iconConfig = n || {}, r.carouselConfig.themeConfig = {}, 
                r.iconConfig.themeConfig = {}, s.some(function(e) {
                    if (i.checkTime(e.begin, e.end)) return r.carouselConfig.themeConfig = e, r.iconConfig.themeConfig = e, 
                    !0;
                }), a ? (r.floatingConfig = a.floating || [], r.pingouConfig = {
                    useTuanHead: a.useTuanHead || "0"
                }, r.seckillConfig = {
                    recommendDesc: a.recommendDesc || ""
                }, r.videoConfig = {
                    title: a.vedioTitle || "",
                    moreDesc: a.vedioMoreDesc || "",
                    moreUrl: a.vedioMoreUrl || "",
                    showCount: "1" === a.videoShowCount
                }, r.reviewsConfig = {
                    moreDesc: a.goodsEvaluateMoreDesc,
                    moreUrl: a.goodsEvaluateMoreUrl
                }) : (r.floatingConfig = [], r.pingouConfig = {
                    useTuanHead: "0"
                }, r.seckillConfig = {
                    recommendDesc: ""
                }, r.videoConfig = {
                    title: "京东小视频",
                    moreDesc: "更多精彩小视频",
                    moreUrl: "",
                    showCount: !1
                }, r.reviewsConfig = {
                    moreDesc: "更多专业评测",
                    moreUrl: ""
                }), console.log("speed point: PPMS config loaded: ", Date.now() - e.startTime), 
                e.setData(r);
            }).catch(function(o) {
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
        getBannerData: function(e) {
            var t = this;
            a.getBannerData(e).then(function(e) {
                t.setData({
                    bannerData: {
                        first: e.firstData,
                        featured: e.featuredData,
                        selected: e.selectedData
                    }
                });
            }).catch(function(e) {
                return t.setData({
                    bannerData: {}
                });
            });
        },
        initShake: function(e) {
            var t = this;
            if (e && e.length) {
                var o = void 0;
                if (e.some(function(e) {
                    if (i.checkTime(e.begin, e.end)) return o = e, !0;
                }), o && "1" == o.usingShake) {
                    this.shake = i.Shake.init();
                    var n = o.link + "?ptag=" + o.mall_ptag;
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
        },
        onIdle: function() {
            t.getCateData(), this.$preload("pages/cart/cart/index");
        }
    }
});
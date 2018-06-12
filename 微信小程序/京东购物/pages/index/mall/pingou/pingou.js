function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var t = require("../../../../bases/component.js"), n = require("../common-behavior.js"), i = require("../../../../libs/promise.min.js"), o = require("../../model.js");

new t({
    behaviors: [ n ],
    properties: {
        pingouConfig: {
            type: "String",
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
        goods: [],
        tuanNews: null,
        tuanNewsHide: !1,
        hideModule: !1
    },
    ready: function() {},
    attached: function() {
        this.firstLoad = !0;
    },
    methods: {
        refresh: function() {
            this.init();
        },
        onShow: function() {},
        onHide: function() {},
        init: function() {
            var e = this;
            o.getPingouGoods("02921541", 20).then(function(t) {
                if (!t.list || !t.list.length) return i.reject("get pingou goods error");
                var n = t.list, o = {};
                return n = (n = n.map(function(t) {
                    return {
                        sSkuId: t.ddwSkuId,
                        dwChPrice: t.dwRealTimePrice,
                        dwPCPrice: t.dwRefPrice,
                        image: e.utils.getImg(t.sPicturesUrl, 148),
                        rd: "138067.11.2",
                        pps: t.pps,
                        showImage: !e.firstLoad
                    };
                })).filter(function(e) {
                    if (!o[e.sSkuId]) return o[e.sSkuId] = !0, !0;
                }), n = n.slice(0, 15), e.firstLoad = !1, e.setData({
                    goods: n,
                    hideModule: !1
                }, function() {
                    return e.triggerEvent("componentLoad", e.is);
                }), n;
            }).then(function(t) {
                var n = t.map(function(e) {
                    return e.sSkuId;
                }), i = new Map();
                return o.getTuanMemberCount(n).then(function(n) {
                    n.forEach(function(e) {
                        return i.set(e.sku_id, e.tuan_member_count);
                    }), t.forEach(function(e) {
                        e.tuanMemberCount = i.get(e.sSkuId);
                    }), e.setData({
                        goods: t
                    });
                }).catch(function(e) {
                    return console.log(e);
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new i(function(t) {
                e.getPPMSDataResolve = t;
            });
        },
        getTuanNews: function() {
            var e = this;
            o.getTuanNews().then(function(t) {
                e.setData({
                    tuanNews: {
                        name: t.nickname,
                        image: e.utils.getImg(t.url)
                    },
                    tuanNewsHide: !1
                }, function() {
                    return e.loopTuanNews();
                });
            }).catch(function(e) {
                return console.log(e);
            });
        },
        loopTuanNews: function() {
            var e = this;
            o.getTuanNews().then(function(t) {
                return t.nickname === e.data.tuanNews.name ? o.getTuanNews() : t;
            }).then(function(t) {
                e.next = t, e.waitForTuanNews && (e.waitForTuanNews = !1, e.tuanNewsHandler());
            }).catch(function(e) {
                return console.log(e);
            }), this.loopTuanNewsTimer = setTimeout(function() {
                e.next ? e.tuanNewsHandler() : e.waitForTuanNews = !0;
            }, 3e3);
        },
        tuanNewsHandler: function() {
            var e = this;
            this.stopFetchingTuanNews || (this.setData({
                tuanNewsHide: !0
            }), this.tuanNewsHandlerTimer = setTimeout(function() {
                if (e.next) {
                    var t = e.next;
                    e.next = null, e.setData({
                        tuanNews: {
                            name: t.nickname,
                            image: e.utils.getImg(t.url)
                        },
                        tuanNewsHide: !1
                    }, function() {
                        return e.loopTuanNews();
                    });
                }
            }, 500));
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset, n = t.skuId, i = t.rd, o = t.pps, u = {};
            n && (u.todaytopsku = n), o && (u.pps = o), i && (u.ptag = i), this.$goto("/pages/pingou/index/index", u);
        },
        onImgLoad: function(t) {
            var n = t.currentTarget.dataset.index;
            if (!(n >= 5)) {
                var i = "goods[" + n + "].showImage";
                this.setData(e({}, i, !0));
            }
        }
    }
});
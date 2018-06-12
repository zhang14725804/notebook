function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = require("../../../bases/component"), i = require("../../item/api");

new e({
    properties: {
        skuId: {
            type: String,
            observer: "init"
        },
        skuType: String,
        slideImages: Array,
        category: String,
        globalType: String,
        description: String,
        infoVideo: Object,
        isZiying: Boolean
    },
    data: {
        isBookOrDisk: !1,
        tab: {
            index: 0,
            intro: {
                tips: "努力加载中...",
                contents: [],
                notices: [],
                images: []
            },
            specs: {
                tips: "努力加载中...",
                packInfo: "",
                specific: []
            },
            service: {
                content: ""
            },
            minHeight: 0
        }
    },
    ready: function() {
        var t = this;
        this.init(), wx.getSystemInfo({
            success: function(e) {
                e.windowHeight && t.setData({
                    "tab.minHeight": e.windowHeight - 60 + "px"
                });
            }
        }), this.imageSizeInfo = {};
    },
    methods: {
        init: function() {
            var t = this.data, e = t.skuId, i = t.skuType, a = t.slideImages, n = t.category, r = t.globalType, s = t.description;
            this.renderSpecific(e, i), this.renderDetailContent({
                skuId: e,
                skuType: i,
                slideImages: a,
                category: n,
                globalType: r,
                description: s
            });
        },
        switchTab: function(t) {
            var e = t.currentTarget.dataset.tab;
            switch (e) {
              case 0:
                this.$report("DETAIL_TAB_INTRO");
                break;

              case 1:
                this.$report("DETAIL_TAB_SPECS");
                break;

              case 2:
                this.$report("DETAIL_TAB_AFTER_SALE");
            }
            this.setData({
                "tab.index": e
            });
        },
        renderSpecific: function(t, e) {
            var a = this;
            i.getSpec(t, e, function(e, i) {
                console.log(">>>>>> 商详 - getSpec 包装清单、商品参数接口调用完成", e, JSON.parse(JSON.stringify(i))), 
                e ? console.log("^^^^^^ 商详-包装清单、商品参数拉取失败", e) : a.setData({
                    "tab.specs.packInfo": i.packInfo,
                    "tab.specs.specific": i.specific.slice(),
                    "tab.service.content": i.afterSale
                });
                var n = a.data.tab.specs.specific;
                n.push({
                    title: n.length ? "其他" : "",
                    content: [ [ "商品编号", t ] ]
                }), a.setData({
                    "tab.specs.specific": n,
                    "tab.specs.tips": ""
                });
            });
        },
        renderDetailContent: function(t) {
            var e = this, a = t.skuId, n = t.skuType, r = t.slideImages, s = t.category, o = t.globalType, c = t.description;
            s && o && i.getGlobalNotice(s, o).then(function(t) {
                var i = [];
                t.forEach(function(t) {
                    t.forEach(function(t) {
                        t = e.helper.getImg(t), i.push(t);
                    });
                }), i = i.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                }), e.setData({
                    "tab.intro.notices": i
                });
            }).catch(function(t) {}), i.getInfo(a, n, c).then(function(t) {
                e.setData({
                    isBookOrDisk: "2" == n || "3" == n
                });
                var i = [];
                t && t.length ? e.data.isBookOrDisk ? (t.forEach(function(t) {
                    t.content.forEach(function(t) {
                        "image" == t.type && (i.push(t.value), t.imgIdx = i.length - 1);
                    });
                }), e.setData({
                    "tab.intro.contents": t
                })) : i = t : i = r.slice(), i = i.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                }), e.setData({
                    "tab.intro.images": i,
                    "tab.intro.tips": ""
                });
            }).catch(function(t) {
                var i = r.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                });
                e.setData({
                    "tab.intro.images": i,
                    "tab.intro.tips": ""
                });
            });
        },
        imageDidLoad: function(e) {
            var i = e.target.dataset.idx, a = e.target.dataset.src, n = e.target.dataset.type, r = e.detail.width, s = e.detail.height;
            if (r > 400) {
                var o;
                this.imageSizeInfo[a] = {
                    width: 750,
                    height: Math.round(750 * s / r)
                }, this.setData((o = {}, t(o, "tab.intro." + n + "[" + i + "].url", a), t(o, "tab.intro." + n + "[" + i + "].width", this.imageSizeInfo[a].width + "rpx"), 
                t(o, "tab.intro." + n + "[" + i + "].height", this.imageSizeInfo[a].height + "rpx"), 
                o));
            }
        }
    }
});
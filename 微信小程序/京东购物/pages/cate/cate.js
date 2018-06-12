var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}(require("../../api/Ptag/Ptag_constants")), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../api/Ptag/Ptag_utils.js")), r = require("../../libs/promise.min.js"), a = require("../../bases/page.js"), n = require("./model.js"), o = void 0;

new a({
    data: {
        loading: !0,
        entries: [],
        curIdx: 0,
        st1: 0,
        st2: 0,
        swiperIdx: 0,
        errMsg: "",
        ptag: "138043.1.2"
    },
    onLoad: function(t) {
        this.gotoSearchList = this.utils.throttle(this.gotoSearchList, 1e3), this.gotoMarketingUrl = this.utils.throttle(this.gotoMarketingUrl, 1e3), 
        this.gotoPromoteUrl = this.utils.throttle(this.gotoPromoteUrl, 1e3), this.gotoBannerUrl = this.utils.throttle(this.gotoBannerUrl, 1e3), 
        !o && wx.getSystemInfo({
            success: function(t) {
                var e = t && t.windowHeight;
                e && (o = e - 20 - 44 - 50);
            }
        });
    },
    onShow: function() {
        this.data.entries.length || this.loadData();
    },
    onShareAppMessage: function() {
        return {
            title: "京东购物，多·快·好·省",
            path: "/pages/cate/cate"
        };
    },
    loadData: function() {
        var e = this;
        this.setData({
            loading: !0
        }), r.all([ n.getCateData(), n.getBlockConfig() ]).then(function(r) {
            var a = r[0], o = r[1];
            e.speedMark(4);
            var s = [];
            a.forEach(function(r, a) {
                r.level1words_1 = [], r.level1words_2 = [], r.ptag = t.CATE_TAB.replace("x", 1 + ~~a), 
                new RegExp("\\b" + r.areaId + "\\b").test(o.areaId) || (r.level1words = r.level1words.filter(function(r, n) {
                    return r.ptag = t.CATE_ITEM.replace(/\..*/, "." + (1 + ~~a + 10) + "." + (1 + ~~n)), 
                    r.level2words || (r.level2words = []), r.level2words = r.level2words.filter(function(t) {
                        if (new RegExp("\\b" + t.keywordId + "\\b").test(o.keywordId)) return !1;
                        if (t.url) {
                            var r = t.url.match(/key=([^=&]+)/);
                            if (r) try {
                                /catid_str,,/.test(r[1]) ? t.key = t.keyword : t.key = decodeURIComponent(r[1]);
                            } catch (t) {
                                console.warn("decodeURIComponent error");
                            }
                            return t.key = t.key || t.keyword, t.imageUrl = e.utils.getImg(t.imageUrl, 140), 
                            t.url = t.url, !0;
                        }
                        return !1;
                    }), r.level2words.length > 0;
                }), r.level1words.forEach(function(t) {
                    if (4 == t.pattern) {
                        var e = String(+new Date());
                        (e = e.substring(0, e.length - 3)) >= t.patternStartTime && e < t.patternEndTime && r.level1words_2.push(t);
                    } else r.level1words_1.push(t);
                }), r.extInfo2 && (r.extInfo2 = r.extInfo2.split("|"), r.extInfo2[2] && (r.extInfo2 = {
                    name: r.extInfo2[0],
                    ptag: r.extInfo2[1],
                    url: r.extInfo2[2]
                }), r.extInfo2.url = e.addPtag(r.extInfo2.url, r.extInfo2.ptag)), r.extInfo1 && (r.extInfo1 = r.extInfo1.split("|"), 
                r.extInfo1[0] && (r.groupId = r.extInfo1[0], s.push(r.groupId)), r.banners = {
                    ptag: r.extInfo1[1],
                    list: []
                }));
            }), e.wholeEntries = a.filter(function(t) {
                return t.level1words_1.length + t.level1words_2.length > 0 && "1923" != t.areaId;
            }), e.setData({
                entries: e.minifyEntries()
            }, function() {
                e.speedMark(5).speedReport();
            }), n.getCpcData(s, []).then(function(t) {
                for (var r in t) !function(r) {
                    e.wholeEntries.forEach(function(a) {
                        if (r == a.groupId) {
                            var n = t[r], o = [];
                            for (var s in n) o = o.concat(n[s]);
                            o.forEach(function(t, r) {
                                a.banners.list.push({
                                    image: e.utils.getImg(t.material, 670),
                                    url: t.sUrl
                                }), a.banners.list[r].url = e.addPtag(a.banners.list[r].url, a.banners.ptag);
                            });
                        }
                    });
                }(r);
                e.setData({
                    entries: e.minifyEntries()
                });
            }).catch(function(t) {
                console.warn("分类页焦点数据拉取失败！", t);
            });
        }).catch(function(t) {
            e.setData({
                errMsg: t.message || t
            });
        }).then(function() {
            e.setData({
                loading: !1
            });
        });
    },
    minifyEntries: function(t) {
        return void 0 === t && (t = this.data.curIdx), this.wholeEntries.map(function(e, r) {
            var a = e.areaId, n = e.areaName, o = e.level1words_1, s = e.level1words_2;
            return {
                areaId: a,
                areaName: n,
                extInfo2: e.extInfo2,
                banners: e.banners,
                level1words_1: r == t ? o : [],
                level1words_2: r == t ? s : []
            };
        });
    },
    switchTab: function(t) {
        var r = t.currentTarget.dataset.index;
        r != this.data.curIdx && (this.setData({
            curIdx: r,
            st2: 0,
            entries: this.minifyEntries(r)
        }), this.scrollIntoViewForTabItem(r), e.default.addPtag(this.wholeEntries[r].ptag));
    },
    scrollIntoViewForTabItem: function(t) {
        o && this.setData({
            st1: 50 * t - (o - 50) / 2
        });
    },
    addPtag: function(t, e) {
        var r = String(t);
        return e && (/ptag/i.test(r) || (/\?\w+/.test(r) ? r += "&ptag=" + e : r += "?ptag=" + e)), 
        r;
    },
    tapOnSearchBar: function() {
        this.$goto("/pages/search/list/list"), e.default.addPtag(t.CATE_SEARCH_BAR);
    },
    gotoSearchList: function(t) {
        var r = t.currentTarget.dataset, a = r.key, n = r.cateIdx, o = r.url, s = this.data, i = s.curIdx, l = s.entries;
        /key=([^=&]+)/.test(o) ? this.$goto("/pages/search/list/list", {
            key: a
        }) : this.$goto(o), e.default.addPtag(l[i].level1words_1[n].ptag);
    },
    gotoMarketingUrl: function(t) {
        var e = t.currentTarget.dataset, r = e.key, a = e.url;
        /\/\//.test(a) && !/key=([^=&]+)/.test(a) ? this.$goto(a) : this.$goto("/pages/search/list/list", {
            key: r
        });
    },
    gotoPromoteUrl: function(t) {
        var e = t.currentTarget.dataset.url;
        this.$goto(e);
    },
    gotoBannerUrl: function(t) {
        var e = t.currentTarget.dataset.url;
        this.$goto(e);
    },
    onSwiperChange: function(t) {
        this.setData({
            swiperIdx: t.detail.current
        });
    }
});
var e, t = getApp();

require("../../utils/mfw_stat.js");

Page({
    data: {
        keyword: "",
        recommends: {
            list: [],
            page: {}
        },
        searchFocus: !1,
        page: {},
        list: []
    },
    onLoad: function(t) {
        (e = this).getRecommends(1), e.getPageData(1);
    },
    onShow: function() {},
    getRecommends: function(o) {
        e.currRecommendNo !== o && (t.log("get recommend " + o + " start"), t.request({
            url: "/gonglve/recommend/?jsondata=" + JSON.stringify({
                page: {
                    no: o,
                    num: 10
                }
            }),
            success: function(o) {
                t.log("get recommend success"), e.setData({
                    recommends: {
                        page: o.page,
                        list: e.data.recommends.list.concat(o.list)
                    }
                });
            },
            fail: function() {
                t.log("get recommend error");
            },
            complete: function() {
                t.log("get recommend complete"), e.currRecommendNo = void 0;
            }
        }));
    },
    bindrecommendscroll: function() {
        e.data.recommends.page.next && (t.log("recommend scroll to right"), e.getRecommends(e.data.recommends.page.no + 1));
    },
    getPageData: function(o) {
        e.currNo !== o && (t.log("get list " + o + " start"), e.currNo = o, o > 1 && e.setData({
            loadingmore: !0
        }), setTimeout(function() {
            t.request({
                url: "/gonglve/list/?jsondata=" + JSON.stringify({
                    filter: {
                        img: {
                            w: 380,
                            h: 236
                        }
                    },
                    page: {
                        no: o,
                        num: 5
                    }
                }),
                success: function(o) {
                    t.log("get list success"), e.setData({
                        page: o.page,
                        list: e.data.list.concat(o.list)
                    });
                },
                fail: function() {
                    t.log("get list error");
                },
                complete: function() {
                    t.log("get list complete"), e.setData({
                        loadingmore: !1
                    }), e.currNo = void 0;
                }
            });
        }, 300));
    },
    onReachBottom: function() {
        e.data.page && e.data.page.next && e.getPageData(e.data.page.no + 1);
    },
    onPullDownRefresh: function() {
        t.log("pull down refresh");
    },
    bindshowmore: function(e) {
        var t = "mdd?mddid=" + e.currentTarget.dataset.mddid;
        wx.navigateTo({
            url: t
        });
    },
    bindSearchFocus: function(e) {
        wx.navigateTo({
            url: "search"
        });
    },
    glClick: function(e) {
        var t = "detail?id=" + e.currentTarget.dataset.id;
        wx.navigateTo({
            url: t
        });
    },
    recGlClick: function(e) {
        var t = "detail?id=" + e.currentTarget.dataset.id;
        wx.navigateTo({
            url: t
        });
    },
    onShareAppMessage: function() {
        return {
            title: "全球旅游消费指南",
            path: e.__route__,
            desc: "快来看，这里有全世界最新最潮的旅游攻略"
        };
    }
});
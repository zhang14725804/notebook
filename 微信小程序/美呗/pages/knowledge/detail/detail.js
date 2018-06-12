var e = require("../../../api/knowledge.js"), t = require("../../../wxParse/wxParse.js");

Page(function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}({
    data: {
        Article: {},
        RelateArticle: []
    },
    onLoad: function(n) {
        var i = this;
        console.log(n), wx.showLoading({
            title: "内容加载中"
        }), e.getDetail(n.id).then(function(e) {
            t.wxParse("Content", "html", e.data.Article.Content, i, 0), wx.setNavigationBarTitle({
                title: e.data.Article.Title
            }), i.setData({
                Article: e.data.Article,
                RelateArticle: e.data.RelateArticle,
                id: n.id
            }), wx.hideLoading();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onHomeClick: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    onItemClick: function(e) {
        var t = e.currentTarget.dataset;
        wx.navigateTo({
            url: "../../knowledge/detail/detail?id=" + t.id
        });
    },
    moreClick: function() {
        wx.redirectTo({
            url: "../../search/knowList/knowList?keyword=" + this.data.Article.SecondProjectName
        });
    }
}, "onShareAppMessage", function(e) {
    return {
        title: "美呗",
        path: "/pages/knowledge/detail/detail?id=" + this.data.id
    };
}));
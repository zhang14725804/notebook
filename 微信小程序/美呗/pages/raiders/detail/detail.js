var t = require("../../../api/raiders.js"), a = require("../../../wxParse/wxParse.js");

Page(function(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}({
    data: {
        data: {},
        contentData: [],
        startContent: {},
        endContent: {},
        relativeQuestion: []
    },
    onLoad: function(t) {
        console.log(t), this.requestData(t.id), wx.showLoading({
            title: "内容加载中"
        });
    },
    requestData: function(e) {
        var n = this;
        t.getDetail(e).then(function(t) {
            var i = n;
            a.wxParse("start", "html", t.data.StartContent.Content, i);
            for (var o = 0; o < t.data.ContentData.length; o++) a.wxParse("content" + o, "html", t.data.ContentData[o].Content, i), 
            o === t.data.ContentData.length - 1 && a.wxParseTemArray("contentTemArray", "content", t.data.ContentData.length, i);
            wx.setNavigationBarTitle({
                title: t.data.DetailData.Title
            }), n.setData({
                data: t.data.DetailData,
                contentData: t.data.ContentData,
                startContent: t.data.StartContent,
                endContent: t.data.EndContent,
                relativeQuestion: t.data.RelativeQuestion,
                id: e
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
    onItemClick: function(t) {
        var a = t.currentTarget.dataset;
        wx.redirectTo({
            url: "../../raiders/detail/detail?id=" + a.id
        });
    },
    onHomeClick: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    moreClick: function() {
        wx.redirectTo({
            url: "../../search/raidersList/raidersList?keyword=" + this.data.data.SecondProjectName
        });
    }
}, "onShareAppMessage", function(t) {
    return {
        title: "美呗",
        path: "/pages/raiders/detail/detail?id=" + this.data.id
    };
}));
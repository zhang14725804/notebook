getApp();

var t = require("../../../api/index.js");

Page({
    data: {
        filters: {
            keyword: "",
            active: 1,
            size: 7
        },
        list: void 0,
        hasMore: !1
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中.."
        });
        var a = this.data.filters;
        a.keyword = t.keyword, this.setData({
            filters: a
        }), this.getList();
    },
    getList: function() {
        var a = this;
        t.search.knowList(this.data.filters).then(function(t) {
            var e = a.data.list;
            e = 1 == a.data.filters.active ? t.data.Data : e.concat(t.data.Data), a.setData({
                hasMore: t.data.HasMore,
                list: e
            }), wx.hideLoading();
        });
    },
    onReachBottom: function() {
        if (this.data.hasMore) {
            var t = this.data.filters;
            t.active++, this.setData({
                filters: t
            }), this.getList();
        }
    },
    onTapKnow: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../../knowledge/detail/detail?id=" + a.id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/search/knowList/knowList?keyword=" + this.data.filters.keyword
        };
    }
});
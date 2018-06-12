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
        t.search.hospitalList(this.data.filters).then(function(t) {
            var i = a.data.list;
            i = 1 == a.data.filters.active ? t.data.Data : i.concat(t.data.Data), a.setData({
                hasMore: t.data.HasMore,
                list: i
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
    onTapHosipital: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../../hospital/detail/detail?id=" + a.data.Id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/search/hospitalList/hospitalList?keyword=" + this.data.filters.keyword
        };
    }
});
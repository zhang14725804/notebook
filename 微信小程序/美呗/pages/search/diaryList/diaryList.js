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
    onReachBottom: function() {
        if (this.data.hasMore) {
            var t = this.data.filters;
            t.active++, this.setData({
                filters: t
            }), this.getList();
        }
    },
    getList: function() {
        var a = this;
        t.search.diaryList(this.data.filters).then(function(t) {
            var i = a.data.list;
            i = 1 == a.data.filters.active ? t.data.Data : i.concat(t.data.Data), a.setData({
                hasMore: t.data.HasMore,
                list: i
            }), wx.hideLoading();
        });
    },
    onTapDiary: function(t) {
        wx.navigateTo({
            url: "../../diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/search/diaryList/diaryList?keyword=" + this.data.filters.keyword
        };
    }
});
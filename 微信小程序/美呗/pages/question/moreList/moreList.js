getApp();

var t = require("../../../api/index.js");

Page({
    data: {
        filters: {
            active: 1,
            size: 20,
            parm: "",
            sname: "all"
        },
        list: void 0,
        hasMore: !1
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中.."
        });
        var a = this.data.filters;
        a.sname = t.sname, this.setData({
            filters: a
        }), this.getList();
    },
    getList: function() {
        var a = this;
        t.qa.getQaList(this.data.filters).then(function(t) {
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
    onTapqa: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../detail/detail?id=" + a.id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/QA/moreList/moreList?sname=" + this.data.filters.sname
        };
    }
});
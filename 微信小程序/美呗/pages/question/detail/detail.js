var t = require("../../../api/index.js");

Page({
    data: {
        id: null,
        qaDetail: null
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getQaDetail();
    },
    onReady: function() {},
    getQaDetail: function() {
        var e = this;
        wx.showLoading({
            title: "内容加载中"
        }), t.qa.getQaDetail(this.data.id).then(function(t) {
            wx.setNavigationBarTitle({
                title: t.data.Question.Title
            }), e.setData({
                qaDetail: t.data
            });
        }), wx.hideLoading();
    },
    onHomeClick: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    onQaRelevantClick: function(t) {
        var e = t.currentTarget.dataset;
        wx.redirectTo({
            url: "detail?id=" + e.id
        });
    },
    onRelevantMoreClick: function() {
        wx.redirectTo({
            url: "../moreList/moreList?sname=" + this.data.qaDetail.Question.SecondProjectSpellName
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/QA/detail/detail?id=" + this.data.id
        };
    }
});
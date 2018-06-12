var t = require("../../../api/index.js");

Page({
    data: {
        qaList: void 0,
        filters: {
            active: 1,
            size: 20,
            parm: "",
            sname: "all"
        },
        hasmore: !0,
        projects: null,
        projectFilterName: "全部项目",
        projectFilterVisiable: !1,
        questionSortName: "全部问答",
        questionSortVisiable: !1,
        sortData: [ {
            id: "all",
            name: "全部问答"
        }, {
            id: "time",
            name: "最新问答"
        }, {
            id: "hot",
            name: "最热问答"
        } ]
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "内容加载中"
        }), this.getQaList(), this.getProject(), wx.hideLoading();
    },
    onReachBottom: function() {
        this.onLoadmore();
    },
    getQaList: function() {
        var a = this;
        t.qa.getQaList(this.data.filters).then(function(t) {
            var e = a.data.qaList;
            e = 1 == a.data.filters.active ? t.data.Data : e.concat(t.data.Data), a.setData({
                hasMore: t.data.HasMore,
                qaList: e
            });
        });
    },
    getProject: function() {
        var a = this;
        t.filters.getProject().then(function(t) {
            a.setData({
                projects: t.data
            });
        });
    },
    onLoadmore: function() {
        if (this.data.hasmore) {
            var t = this.data.filters;
            t.active += 1, this.setData({
                filters: t
            }), this.getQaList();
        }
    },
    jumpDetailEvent: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../detail/detail?id=" + a.id
        });
    },
    projectFliterClick: function() {
        this.setData({
            projectFilterVisiable: !0
        });
    },
    questionSortClick: function() {
        this.setData({
            questionSortVisiable: !0
        });
    },
    selectedEvent: function(t) {
        var a = t.detail, e = this.data.filters;
        e.active = 1, e.parm = a.id, this.setData({
            filters: e,
            questionSortName: a.name,
            questionSortVisiable: !1
        }), this.getQaList(), wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    onChangeProject: function(t) {
        var a = t.detail, e = this.data.filters;
        e.active = 1, e.sname = a.SpellName, this.setData({
            filters: e,
            projectFilterName: a.name,
            projectFilterVisiable: !1
        }), this.getQaList(), wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/QA/list/list"
        };
    }
});
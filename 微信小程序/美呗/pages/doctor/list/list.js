getApp();

var t = require("../../../api/doctor.js");

Page({
    data: {
        imageBaseUri: "https://cdn-ssl.meb.com/wxa/v1/",
        filterMenuModalView: {
            cityViewHident: !0,
            projectViewHident: !0,
            sortViewHident: !0,
            cityName: "全国",
            projectName: "全部项目",
            sortName: "智能排序"
        },
        filterList: {
            Active: 1,
            Sort: 0,
            Size: 20,
            AreaId: "",
            ProjectId: ""
        },
        inited: !1,
        doctorList: [],
        citys: null,
        projects: null,
        sorts: [ {
            id: 0,
            name: "智能排序"
        }, {
            id: 6,
            name: "离我最近"
        }, {
            id: 2,
            name: "案例最多"
        }, {
            id: 7,
            name: "评分最高"
        } ],
        HasMore: !1,
        fullWidth: !1
    },
    onLoad: function(e) {
        var i = this;
        wx.showLoading({
            title: "内容加载中"
        }), this.getCity(), t.filters.getProject().then(function(t) {
            i.setData({
                projects: t.data
            });
        });
    },
    getDoctorList: function() {
        var e = this;
        t.getDoctorList(this.data.filterList).then(function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh();
            var i = t.data.Data;
            e.data.filterList.Active > 1 && (i = e.data.doctorList.concat(i)), e.setData({
                doctorList: i,
                HasMore: t.data.HasMore,
                inited: !0
            });
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    getCity: function() {
        var e = this;
        t.filters.getCity().then(function(t) {
            var i = e.data.filterList;
            t.data.IsLocation && (i.AreaId = t.data.HotCity[0].Id);
            var a = e.data.filterMenuModalView;
            t.data.IsLocation && (a.cityName = t.data.HotCity[0].Name), e.setData({
                filterMenuModalView: a,
                filterList: i,
                citys: t.data
            }), e.getDoctorList();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    onPullDownRefresh: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), this.setData({
            "filterList.Active": 1
        }), this.getDoctorList();
    },
    onTapMenu: function(t) {
        var e = this.data.filterMenuModalView;
        switch (t.currentTarget.dataset.type) {
          case "city":
            e.cityViewHident = !e.cityViewHident, e.projectViewHident = !0, e.sortViewHident = !0;
            break;

          case "project":
            e.cityViewHident = !0, e.projectViewHident = !e.projectViewHident, e.sortViewHident = !0;
            break;

          case "sort":
            e.cityViewHident = !0, e.projectViewHident = !0, e.sortViewHident = !e.sortViewHident;
        }
        this.setData({
            filterMenuModalView: e
        });
    },
    changeCity: function(t) {
        var e = t.detail;
        this.setData({
            "filterList.AreaId": e.data.Id || "",
            "filterMenuModalView.cityName": e.data.Name || "全国",
            "filterMenuModalView.cityViewHident": !0
        }), wx.showLoading({
            title: "切换地区中"
        }), this.onPullDownRefresh();
    },
    closeCity: function() {
        this.setData({
            "filterMenuModalView.cityViewHident": !0
        });
    },
    changeProject: function(t) {
        var e = t.detail.id, i = t.detail.name;
        this.setData({
            "filterList.ProjectId": e || "",
            "filterMenuModalView.projectName": i || "全部项目"
        }), this.onPullDownRefresh();
    },
    closeProject: function() {
        this.setData({
            "filterMenuModalView.projectViewHident": !0
        });
    },
    changeSort: function(t) {
        this.setData({
            "filterList.Sort": t.detail.id || 0,
            "filterMenuModalView.sortName": t.detail.name || "智能排序"
        }), this.onPullDownRefresh();
    },
    closeSort: function() {
        this.setData({
            "filterMenuModalView.sortViewHident": !0
        });
    },
    onReachBottom: function() {
        this.data.HasMore && (this.setData({
            "filterList.Active": ++this.data.filterList.Active
        }), this.getDoctorList());
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/doctor/list/list"
        };
    }
});
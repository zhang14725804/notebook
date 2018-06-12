getApp();

var t = require("../../../api/index.js");

Page({
    data: {
        resData: {
            Data: [],
            HasMore: !1
        },
        filterMenuModalView: {
            cityViewHident: !0,
            projectViewHident: !0,
            sortViewHident: !0,
            cityName: "全国",
            projectName: "全部项目",
            sortName: "智能排序"
        },
        citys: null,
        projects: null,
        sortData: [ {
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
        filters: {
            AreaId: "",
            ProjectId: "",
            Sort: 0,
            Active: 1,
            Size: 20
        }
    },
    onLoad: function() {
        wx.showLoading({
            title: "内容加载中"
        }), this.getCity(), this.getProject();
    },
    getHospitalListData: function() {
        var e = this, i = this;
        t.hospital.getHospitalList(this.data.filters).then(function(t) {
            wx.stopPullDownRefresh(), wx.hideLoading();
            var a = t.data.Data;
            if (200 === t.statusCode) {
                var o = {};
                i.data.filters.Active > 1 ? o.Data = e.data.resData.Data.concat(a) : o.Data = a, 
                o.HasMore = t.data.HasMore, i.setData({
                    resData: o
                });
            }
            wx.hideLoading();
        });
    },
    onPullDownRefresh: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), this.setData({
            "filters.Active": 1
        }), this.getHospitalListData();
    },
    onReachBottom: function() {
        this.data.resData.HasMore && (this.setData({
            "filters.Active": ++this.data.filters.Active
        }), this.getHospitalListData());
    },
    didSelectCell: function(t) {
        var e = t.currentTarget.id, i = this.data.resData.Data[e].Id;
        if (i) {
            var a = "../detail/detail?id=" + i;
            wx.navigateTo({
                url: a
            });
        }
    },
    getCity: function() {
        var e = this, i = this;
        t.filters.getCity().then(function(t) {
            var a = i.data.filters;
            t.data.IsLocation && (a.AreaId = t.data.HotCity[0].Id);
            var o = i.data.filterMenuModalView;
            t.data.IsLocation && (o.cityName = t.data.HotCity[0].Name), i.setData({
                filterMenuModalView: o,
                filters: a,
                citys: t.data
            }), e.getHospitalListData();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    getProject: function() {
        var e = this;
        t.filters.getProject().then(function(t) {
            e.setData({
                projects: t.data
            });
        });
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
    onChangeCity: function(t) {
        var e = t.detail;
        this.setData({
            "filters.AreaId": e.data.Id || "",
            "filterMenuModalView.cityName": e.data.Name || "全国",
            "filterMenuModalView.cityViewHident": !0
        }), wx.showLoading({
            title: "切换地区中"
        }), this.onPullDownRefresh();
    },
    onCloseCityView: function() {
        this.setData({
            "filterMenuModalView.cityViewHident": !0
        });
    },
    onChangeProject: function(t) {
        var e = t.detail.id, i = t.detail.name;
        this.setData({
            "filters.ProjectId": e || "",
            "filterMenuModalView.projectName": i || "全部项目",
            "filterMenuModalView.projectViewHident": !0
        }), wx.showLoading({
            title: "切换项目中"
        }), this.onPullDownRefresh();
    },
    onCloseProjectView: function() {
        this.setData({
            "filterMenuModalView.projectViewHident": !0
        });
    },
    onChangeSort: function(t) {
        this.setData({
            "filters.Sort": t.detail.id || 0,
            "filterMenuModalView.sortName": t.detail.name || "智能排序",
            "filterMenuModalView.projectViewHident": !0
        }), wx.showLoading({
            title: "切换排序中"
        }), this.onPullDownRefresh();
    },
    onCloseSortView: function() {
        this.setData({
            "filterMenuModalView.sortViewHident": !0
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/hospital/list/list"
        };
    }
});
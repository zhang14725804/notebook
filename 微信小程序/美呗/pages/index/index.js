var t = getApp(), a = require("../../api/index.js");

Page({
    data: {
        scroll: 0,
        scrollTop: 0,
        modal: {
            cityVisible: !1,
            pjVisible: !1
        },
        activePj: "",
        filters: {
            active: 1,
            size: 10
        },
        hasMore: !1,
        diarys: void 0,
        citys: void 0,
        projects: void 0,
        cityName: "",
        pjs: void 0
    },
    onLoad: function() {
        var i = this;
        t.globalData.authToken && this.getProject(), a.home.getProject().then(function(t) {
            i.setData({
                projects: t.data,
                activePj: t.data[0].Name
            });
        });
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                t.globalData.location.longitude = a.longitude, t.globalData.location.latitude = a.latitude, 
                e.getCity();
            },
            fail: function() {
                console.log("拒绝定位"), e.getCity();
            },
            complete: function(t) {
                wx.showLoading({
                    title: "内容加载中"
                });
            }
        });
    },
    getProject: function() {
        var t = this;
        a.filters.getPjGroup().then(function(a) {
            var i = a.data, e = !0, o = !1, n = void 0;
            try {
                for (var r, s = i[Symbol.iterator](); !(e = (r = s.next()).done); e = !0) {
                    var l = r.value;
                    l.input = [];
                    var c = !0, d = !1, u = void 0;
                    try {
                        for (var h, f = l.ChildProject[Symbol.iterator](); !(c = (h = f.next()).done); c = !0) {
                            var v = h.value;
                            v.IsEnable && l.input.push(v);
                        }
                    } catch (t) {
                        d = !0, u = t;
                    } finally {
                        try {
                            !c && f.return && f.return();
                        } finally {
                            if (d) throw u;
                        }
                    }
                }
            } catch (t) {
                o = !0, n = t;
            } finally {
                try {
                    !e && s.return && s.return();
                } finally {
                    if (o) throw n;
                }
            }
            t.setData({
                pjs: i
            });
        });
    },
    onScroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    getCity: function() {
        var i = this;
        a.filters.getCity().then(function(a) {
            var e = a.data.HotCity[0].Name, o = i.data.filters;
            o.CityId = a.data.HotCity[0].Id, t.globalData.location.longitude || (o.CityId = "", 
            e = "全国"), i.setData({
                citys: a.data,
                filters: o,
                cityName: e
            }), i.getDiary();
        });
    },
    getDiary: function() {
        var t = this;
        return a.home.getDiary(this.data.filters).then(function(a) {
            var i = t.data.diarys;
            i = 1 == t.data.filters.active ? a.data.Data : i.concat(a.data.Data), t.setData({
                hasMore: a.data.HasMore,
                diarys: i
            }), wx.hideLoading();
        });
    },
    onRefresh: function() {
        var t = this;
        wx.startPullDownRefresh({
            success: function() {
                t.data.filters.active = 1, t.getDiary().then(function() {
                    wx.stopPullDownRefresh(), wx.showToast({
                        title: "刷新成功",
                        icon: "success",
                        duration: 1500
                    });
                });
            }
        });
    },
    onLoadmore: function() {
        if (this.data.hasMore) {
            var t = this.data.filters;
            t.active++, this.setData({
                filters: t
            }), this.getDiary();
        }
    },
    onTapPj: function(t) {
        var a = t.currentTarget.dataset.data, i = this.data.filters;
        i.active = 1, i.projectId = a.Id, this.setData({
            activePj: a.Name,
            filters: i,
            scroll: 0
        }), wx.showLoading({
            title: "内容加载中"
        }), this.getDiary();
    },
    onSelectCity: function() {
        var t = this.data.modal;
        t.cityVisible = !0, t.pjVisible = !1, this.setData({
            modal: t
        });
    },
    onTapPjAll: function() {
        if (t.globalData.authToken && "" != t.globalData.authToken) {
            this.data.pjs || this.getProject();
            var a = this.data.modal;
            a.pjVisible = !0, a.cityVisible = !1, this.setData({
                modal: a
            });
        } else wx.navigateTo({
            url: "../signIn/index"
        });
    },
    onTapMenu: function(t) {
        var a = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../" + a + "/list/list"
        });
    },
    toCener: function() {
        wx.navigateTo({
            url: "../center/center"
        });
    },
    onChangeCity: function(t) {
        var a = t.detail, i = this.data.filters, e = void 0;
        i.active = 1, a.hasId ? (i.CityId = a.data.Id, e = a.data.Name) : (i.CityId = "", 
        e = "全国"), this.setData({
            filters: i,
            cityName: e
        }), wx.showLoading({
            title: "切换地区中"
        }), this.getDiary();
    },
    onChangeProject: function(t) {
        var i = this, e = t.detail;
        a.filters.saveProject(e).then(function(t) {
            if (0 == t.data.messageId) {
                var a = i.data.filters;
                a.projectId = i.data.projects[0].Id, a.active = 1, i.setData({
                    activePj: i.data.projects[0].Name,
                    filters: a,
                    scroll: 0
                }), i.getDiary();
            }
        });
    },
    onTapSearch: function() {
        wx.navigateTo({
            url: "../search/index"
        });
    },
    onTapDiary: function(t) {
        wx.navigateTo({
            url: "../diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/index/index"
        };
    }
});
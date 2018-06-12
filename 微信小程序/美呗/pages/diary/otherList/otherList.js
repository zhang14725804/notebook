getApp();

var t = require("../../../api/index.js");

Page({
    data: {
        filters: {
            type: 0,
            id: "",
            active: 1,
            size: 10
        },
        list: void 0,
        hasMore: !1
    },
    onLoad: function(t) {
        console.log(t), wx.showLoading({
            title: "加载中.."
        });
        var a = this.data.filters;
        a.type = t.type, a.id = t.id, this.setData({
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
        if (0 == this.data.filters.type) {
            var i = {
                DoctorId: this.data.filters.id,
                Active: this.data.filters.active,
                Size: this.data.filters.size
            };
            t.diary.getDoctorDiaries(i).then(function(t) {
                var e = a.data.list;
                e = 1 == i.Active ? t.data.Data : e.concat(t.data.Data), a.setData({
                    hasMore: t.data.HasMore,
                    list: e
                }), wx.hideLoading();
            });
        } else if (1 == this.data.filters.type) {
            var e = {
                HospitalId: this.data.filters.id,
                Active: this.data.filters.active,
                Size: this.data.filters.size
            };
            t.diary.getHospitalDiaries(e).then(function(t) {
                var i = a.data.list;
                i = 1 == e.Active ? t.data.Data : i.concat(t.data.Data), a.setData({
                    hasMore: t.data.HasMore,
                    list: i
                }), wx.hideLoading();
            });
        }
    },
    onTapDiary: function(t) {
        wx.navigateTo({
            url: "../../diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/diary/otherList/otherList?type=" + this.data.filters.type + "&id=" + this.data.filters.id
        };
    }
});
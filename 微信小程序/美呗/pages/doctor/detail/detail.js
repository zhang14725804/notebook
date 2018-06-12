var t = require("../../../api/doctor.js");

require("../../../api/doctor.js");

Page({
    data: {
        imageBaseUri: "https://cdn-ssl.meb.com/wxa/v1/",
        filters: {
            DoctorId: 0,
            Active: 1,
            Size: 10
        },
        HasMore: !1,
        doctor: {},
        diarys: [],
        doctorLis: []
    },
    onLoad: function(i) {
        var a = this, o = i.id;
        wx.showLoading({
            title: "内容加载中"
        }), t.getDoctorDetail(o).then(function(i) {
            wx.hideLoading();
            var e = i.data, r = e.Doctor.Description;
            e.Hospital[0] && (e.Hospital[0].DutyName = e.Hospital[0].DutyName.substring(0, 6)), 
            r.length > 256 && (e.Doctor.Description = r.substr(0, 256) + "..."), a.setData({
                doctor: e,
                doctorId: o,
                "filters.DoctorId": o
            }), wx.setNavigationBarTitle({
                title: e.Doctor.Name + "医生怎么样_简介_案例_美呗网"
            }), e.DiariesCount && t.getDoctorDiaries({
                DoctorId: o,
                Active: 1
            }).then(function(t) {
                var i = t.data.Data.slice(0, 2) || [];
                a.setData({
                    diarys: i
                }), wx.hideLoading();
            }), a.getDoctorList();
        });
    },
    getDoctorList: function() {
        var i = this;
        t.otherDoctor(this.data.filters).then(function(t) {
            var a = t.data.Data;
            i.data.filters.Active > 1 && (a = i.data.doctorList.concat(a)), i.setData({
                doctorList: a,
                HasMore: t.data.HasMore
            });
        });
    },
    onTapDiary: function(t) {
        wx.redirectTo({
            url: "/pages/diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id
        });
    },
    onReachBottom: function() {
        this.data.HasMore && (this.setData({
            "filters.Active": ++this.data.filters.Active
        }), this.getDoctorList());
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/doctor/detail/detail?id=" + this.data.doctorId
        };
    },
    goHomeAction: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    }
});
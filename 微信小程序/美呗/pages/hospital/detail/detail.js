getApp();

var t = require("../../../api/index.js");

Page({
    data: {
        bannerData: null,
        resData: null,
        id: null,
        page: 1,
        size: 20,
        imageBaseUri: "https://cdn-ssl.meb.com/wxa/v1/",
        hospitalListResData: null
    },
    onLoad: function(t) {
        t.id && (this.setData({
            id: t.id
        }), this.getHospitalDetailData());
    },
    onShow: function() {},
    getHospitalDetailData: function() {
        wx.showLoading({
            title: "内容加载中"
        });
        var a = this;
        t.hospital.getHospitalDetail(this.data.id).then(function(t) {
            if (wx.hideLoading(), wx.stopPullDownRefresh(), 200 == t.statusCode) {
                t.data.Hospital.Description = t.data.Hospital.Description.substr(0, 256) + "...", 
                wx.setNavigationBarTitle({
                    title: t.data.Hospital.Name + "怎么样_好不好_案例_价格_地址_美呗网"
                });
                for (var i = [], e = 0; e < t.data.Activity.length; e++) i.push(t.data.Activity[e].Picture);
                a.setData({
                    resData: t.data,
                    bannerData: i
                }), a.getHospitalListData();
            }
        }).catch(function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh(), wx.showModal({
                title: "错误",
                content: "数据请求失败。"
            });
        });
    },
    getHospitalListData: function() {
        var a = this, i = {
            HospitalId: a.data.id,
            Active: a.data.page,
            Size: a.data.size
        };
        t.hospital.getHospitalOtherList(i).then(function(t) {
            if (200 == t.statusCode) {
                var i = {};
                a.data.page <= 1 ? i = t.data : ((i = a.data.hospitalListResData).Data = i.Data.concat(t.data.Data), 
                i.HasMore = t.data.HasMore), a.setData({
                    hospitalListResData: i
                });
            }
        }).catch(function(t) {
            wx.stopPullDownRefresh(), wx.showModal({
                title: "错误",
                content: "数据请求失败。"
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }), this.getHospitalDetailData();
    },
    onReachBottom: function() {
        this.data.hospitalListResData.HasMore && (this.setData({
            page: ++this.data.page
        }), this.getHospitalListData());
    },
    didSelectImageAction: function(t) {
        var a = t.target.dataset.current, i = t.target.dataset.urls;
        wx.previewImage({
            current: a,
            urls: i
        });
    },
    didSelectAddressAction: function(t) {},
    didSelectDoctorCell: function(t) {
        var a = "../otherList/otherList?id=" + this.data.id;
        wx.navigateTo({
            url: a
        });
    },
    didSelectDiaryCell: function(t) {
        var a = "../../diary/otherList/otherList?type=1&id=" + this.data.id;
        wx.navigateTo({
            url: a
        });
    },
    onTapDiary: function(t) {
        var a = "/pages/diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id;
        wx.redirectTo({
            url: a
        });
    },
    didSelectHospitalCell: function(t) {
        var a = t.currentTarget.id;
        if (a) {
            var i = "./detail?id=" + this.data.hospitalListResData.Data[a].Id;
            wx.redirectTo({
                url: i
            });
        }
    },
    goHomeAction: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/hospital/detail/detail?id=" + this.data.id
        };
    }
});
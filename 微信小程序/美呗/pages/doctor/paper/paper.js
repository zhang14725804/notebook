var e = require("../../../utils/util.js"), t = require("../../../api/index.js");

Page({
    data: {
        Id: "",
        BeautyCareerCertificate: "",
        BeautyCareerCertificatePicture: "",
        CareerCertificate: "",
        CareerCertificatePicture: "",
        ForeignCountryLicenseId: "",
        ForeignCountryLicensePicture: "",
        QualificationsCertificate: "",
        QualificationsCertificatePicture: ""
    },
    onLoad: function(e) {
        e.id && (this.setData({
            Id: e.id
        }), this.getDoctorLicense());
    },
    getDoctorLicense: function() {
        wx.showLoading({
            title: "内容加载中"
        });
        var e = this;
        t.doctor.getDoctorLicense(this.data.Id).then(function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh(), 200 == t.statusCode && e.setData({
                QualificationsCertificate: t.data.QualificationsCertificate,
                QualificationsCertificatePicture: t.data.QualificationsCertificatePicture,
                CareerCertificate: t.data.CareerCertificate,
                CareerCertificatePicture: t.data.CareerCertificatePicture,
                BeautyCareerCertificate: t.data.BeautyCareerCertificate,
                BeautyCareerCertificatePicture: t.data.BeautyCareerCertificatePicture,
                ForeignCountryLicenseId: t.data.ForeignCountryLicenseId,
                ForeignCountryLicensePicture: t.data.ForeignCountryLicensePicture
            });
        }).catch(function(e) {
            wx.hideLoading(), wx.stopPullDownRefresh(), wx.showModal({
                title: "错误",
                content: "数据请求失败。"
            });
        });
    },
    imagePreview: function(t) {
        var i = t.currentTarget.dataset, a = new Array();
        a.push(i.index), e.images.preview(i.index, a);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
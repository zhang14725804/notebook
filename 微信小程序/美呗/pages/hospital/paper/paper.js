var e = require("../../../utils/util.js"), i = require("../../../api/index.js");

Page({
    data: {
        Id: null,
        BusinessLicenseFiles: "",
        BusinessLicenseId: "",
        MedicalLicenseFiles: "",
        MedicalLicenseId: "",
        BusinessLicenseFilesArr: [],
        MedicalLicenseFilesArr: []
    },
    onLoad: function(e) {
        e.id && (this.setData({
            Id: e.id
        }), this.getHospitalLicense());
    },
    getHospitalLicense: function() {
        wx.showLoading({
            title: "内容加载中"
        });
        var e = this;
        i.hospital.getHospitalLicense(this.data.Id).then(function(i) {
            if (wx.hideLoading(), wx.stopPullDownRefresh(), 200 == i.statusCode) {
                e.setData({
                    BusinessLicenseFiles: i.data.BusinessLicenseFiles,
                    BusinessLicenseId: i.data.BusinessLicenseId,
                    MedicalLicenseFiles: i.data.MedicalLicenseFiles,
                    MedicalLicenseId: i.data.MedicalLicenseId,
                    Id: i.data.Id
                });
                var s = new Array(), n = new Array();
                s.push(e.data.BusinessLicenseFiles), n.push(e.data.MedicalLicenseFiles), e.setData({
                    BusinessLicenseFilesArr: s,
                    MedicalLicenseFilesArr: n
                });
            }
        }).catch(function(e) {
            wx.hideLoading(), wx.stopPullDownRefresh(), wx.showModal({
                title: "错误",
                content: "数据请求失败。"
            });
        });
    },
    imagePreview: function(i) {
        var s = i.currentTarget.dataset;
        e.images.preview(s.index, s.urls);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
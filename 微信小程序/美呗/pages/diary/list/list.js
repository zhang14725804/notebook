var a = require("../../../utils/util.js"), t = require("../../../api/index.js");

Page({
    data: {
        content: {},
        currentdiaryid: null,
        diarybaseid: null
    },
    onLoad: function(e) {
        var i = this;
        this.setData({
            currentdiaryid: e.id,
            diarybaseid: e.baseid
        }), wx.showLoading({
            title: "内容加载中"
        }), t.diary.getBaseDiary(this.data.diarybaseid).then(function(t) {
            var e = t.data;
            e.BaseData.SurgeryTime = a.formatDateLoc(e.BaseData.SurgeryTime);
            for (var r = 0; r < e.BeforePictures.length; r++) {
                var d = e.BeforePictures[r].split("-");
                e.BeforePictures[r] = d[0] + "-o";
            }
            i.setData({
                content: e
            }), wx.hideLoading();
        });
    },
    imagePreview: function(t) {
        var e = t.currentTarget.dataset;
        a.images.preview(e.index, e.urls);
    },
    jumpDiaryDetail: function(a) {
        var t = a.currentTarget.dataset;
        wx.navigateTo({
            url: "../detail/detail?id=" + t.id
        });
    },
    jumpDoctoryDetail: function(a) {
        var t = a.currentTarget.dataset;
        wx.navigateTo({
            url: "../../doctor/detail/detail?id=" + t.id
        });
    },
    jumpHospitalDetail: function(a) {
        var t = a.currentTarget.dataset;
        wx.navigateTo({
            url: "../../hospital/detail/detail?id=" + t.id
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "美呗",
            path: "/pages/diary/list/list?id=" + this.data.currentdiaryid + "&baseid=" + this.data.diarybaseid
        };
    }
});
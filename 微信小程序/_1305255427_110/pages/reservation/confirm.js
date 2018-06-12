var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api.js")), e = getApp();

Page({
    data: {
        reservationInfo: {},
        shopList: [],
        showInput: !1
    },
    onLoad: function(t) {
        var o = e.globalData, i = o.reservationInfo, n = o.nowCityStore;
        this.setData({
            reservationInfo: i,
            shopList: n
        });
    },
    showInput: function() {
        this._piwik("miniapp/storeappointPage", "changephone"), this.setData({
            showInput: !0
        });
    },
    clearAll: function() {
        this.setData({
            "reservationInfo.mobile": ""
        });
    },
    PhoneNumberInput: function(t) {
        var e = t.detail.value;
        this.setData({
            "reservationInfo.mobile": e
        });
    },
    handleSubmit: function(o) {
        var i = this.data, n = i.shopList, a = i.reservationInfo, s = a.mobile, r = a.selectShopIndex, l = a.time, u = i.reservationInfo, d = /^1\d{10}$/;
        s && d.test(s) ? (e.globalData.reservationInfo = u, console.log(o.detail.formId, "的说法是否"), 
        e.post(t.default.submitReservation, {
            contactMobile: s,
            shopId: n[r].id,
            startTime: l.startTime,
            endTime: l.endTime,
            formId: o.detail.formId
        }, function(t, e, o) {
            0 == e.code ? wx.redirectTo({
                url: "./success?id=" + e.data
            }) : wx.showToast({
                title: e.message,
                icon: "none",
                duration: 700
            });
        })) : wx.showToast({
            title: "手机号输入不正确",
            icon: "none",
            duration: 700
        });
    }
});
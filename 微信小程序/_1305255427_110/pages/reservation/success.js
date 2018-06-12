var e = require("../../utils/util.js"), t = (function(e) {
    e && e.__esModule;
}(require("../../utils/api.js")), getApp());

Page({
    data: {
        reservationInfo: {},
        shopList: []
    },
    onLoad: function(e) {
        var a = t.globalData, n = a.reservationInfo, o = a.nowCityStore;
        this.setData({
            reservationInfo: n,
            shopList: o
        });
    },
    handleBack: function() {
        wx.navigateBack({
            delta: 3
        });
    },
    handleClickPhone: function(e) {
        var t = this.data, a = t.reservationInfo, n = t.shopList[a.selectShopIndex].mobile;
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    handleClickMap: function(t) {
        var a = this.data, n = a.reservationInfo, o = a.shopList[n.selectShopIndex], i = (0, 
        e.bd09togcj02)(o.latitude, o.longitude);
        wx.openLocation({
            latitude: i[0],
            longitude: i[1],
            scale: 28,
            name: o.name,
            address: o.address
        });
    },
    onReady: function() {},
    onShow: function() {}
});
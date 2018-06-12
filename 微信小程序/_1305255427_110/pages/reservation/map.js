var e = require("../../utils/util.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api.js")), a = getApp();

Page({
    data: {
        hasEnter: !1,
        shop: {}
    },
    onLoad: function(e) {
        var n = this, o = e.shopId;
        a.fetch(t.default.getSingleShopInfo, {
            id: o
        }, function(e, t, a) {
            0 == t.code && t.data && n.setData({
                shop: t.data
            });
        });
    },
    handleBack: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    handleClickPhone: function(e) {
        var t = this.data.shop.mobile;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    handleClickMap: function(t) {
        var a = this.data.shop, n = (0, e.bd09togcj02)(a.latitude, a.longitude);
        wx.openLocation({
            latitude: n[0],
            longitude: n[1],
            name: a.name,
            address: a.address
        });
    },
    onShow: function() {}
});
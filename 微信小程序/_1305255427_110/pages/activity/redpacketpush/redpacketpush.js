function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/api.js")), e(require("../../../libs/lodash.core.min.js")), 
e(require("../../../libs/es6-promise.min")), getApp();

Page({
    data: {
        userInfo: {
            openId: ""
        }
    },
    onLoad: function(e) {
        var t = this, i = wx.getStorageSync("userInfo");
        "" != i && t.setData({
            "userInfo.openId": i.code
        }), wx.setNavigationBarTitle({
            title: ""
        });
    },
    onShow: function(e) {
        wx.setNavigationBarTitle({
            title: ""
        });
    }
});
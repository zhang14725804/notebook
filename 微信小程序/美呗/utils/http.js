var e = getApp();

module.exports = {
    request: function(a, t, o) {
        return new Promise(function(n, i) {
            wx.request({
                url: "https://quick.meb.com/" + t,
                data: o || {},
                method: a,
                header: {
                    userToken: e.globalData.authToken,
                    DeviceBrand: e.globalData.SystemInfo.brand || "",
                    DevicePlatform: e.globalData.SystemInfo.platform || "",
                    DeviceModel: e.globalData.SystemInfo.model || "",
                    DeviceVersion: e.globalData.SystemInfo.version || "",
                    UserLongitude: e.globalData.location.longitude || "",
                    UserLatitude: e.globalData.location.latitude || "",
                    mebdeviceid: e.globalData.uuid,
                    mebversion: "1",
                    MebChannel: "xcx-GW-0001",
                    MebAppName: "wxapp"
                },
                success: function(e) {
                    401 == e.statusCode ? (wx.navigateTo({
                        url: "/pages/signIn/index"
                    }), i("请登录")) : n(e), 401 != e.statusCode && 200 != e.statusCode && (wx.hideLoading(), 
                    wx.showToast({
                        title: "获取异常",
                        icon: "none",
                        duration: 2e3
                    }));
                },
                fail: function(e) {
                    i(e);
                }
            });
        });
    }
};
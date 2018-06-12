App({
    onLaunch: function() {
        var a = wx.getStorageSync("uuid");
        if (!a || "" == a) {
            for (var o = [], t = 0; t < 36; t++) o[t] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
            o[14] = "4", o[19] = "0123456789abcdef".substr(3 & o[19] | 8, 1), o[8] = o[13] = o[18] = o[23] = "-", 
            a = o.join(""), wx.setStorageSync("uuid", a);
        }
        this.globalData.uuid = a, this.globalData.authToken = wx.getStorageSync("token"), 
        this.globalData.userInfo = wx.getStorageSync("userinfo"), this.globalData.SystemInfo = wx.getSystemInfoSync();
    },
    globalData: {
        authToken: void 0,
        SystemInfo: {},
        location: {},
        uuid: void 0,
        userInfo: {
            headImage: void 0,
            nickname: void 0,
            userId: void 0
        }
    }
});
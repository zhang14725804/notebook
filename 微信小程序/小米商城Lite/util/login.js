module.exports = {
    setLoginStat: function(e) {
        e.serviceToken && wx.setStorageSync("serviceToken", e.serviceToken), e.xm_open_id && wx.setStorageSync("xm_open_id", e.xm_open_id), 
        e.visitorPassToken && wx.setStorageSync("visitorPassToken", e.visitorPassToken), 
        e.visitorId && wx.setStorageSync("visitorId", e.visitorId), e.userId && wx.setStorageSync("userId", e.userId);
    },
    getLoginStat: function() {
        return {
            serviceToken: wx.getStorageSync("serviceToken") || "",
            xm_open_id: wx.getStorageSync("xm_open_id") || "",
            visitorPassToken: wx.getStorageSync("visitorPassToken") || "",
            visitorId: wx.getStorageSync("visitorId") || "",
            userId: wx.getStorageSync("userId") || ""
        };
    },
    getUid: function() {
        var e = wx.getStorageSync("visitorId") || "";
        return wx.getStorageSync("userId") || "" || e;
    },
    setSystemInfo: function() {
        "" == (wx.getStorageSync("model") || "") && wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("model", e.model), wx.setStorageSync("platform", e.platform), 
                wx.setStorageSync("version", e.version), wx.setStorageSync("system", e.system), 
                wx.setStorageSync("SDKVersion", e.SDKVersion);
            }
        });
    }
};
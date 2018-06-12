var e = require("conf.js"), o = null;

module.exports = {
    save: function(e) {
        var o = wx.getStorageSync("logJson") || [];
        e && (e.time = new Date(), o.push(e), wx.setStorageSync("logJson", o));
    },
    send: function() {
        var t = wx.getStorageSync("logJson") || [];
        if (o || (o = getApp()), 0 != t.length) {
            var a = wx.getStorageSync("lat") || "", n = wx.getStorageSync("lng") || "", r = o ? encodeURIComponent(o.storageData.userInfo ? o.storageData.userInfo.nickName : "") : "", s = o.storageData.platform || "", g = o.storageData.model || "", i = o.storageData.version || "", c = o.storageData.system || "", l = o.storageData.SDKVersion || "", d = "client_id=" + e.client_id;
            d += ";channel_id=" + e.channel_id, d += ";serviceToken=" + encodeURIComponent(o.storageData.serviceToken), 
            d += ";xm_open_id=" + o.storageData.xm_open_id, d += ";nickName=" + r, d += ";lat=" + a, 
            d += ";lng=" + n, d += ";platform=" + s, d += ";model=" + g, d += ";version=" + i, 
            d += ";system=" + c, d += ";SDKVersion=" + l, wx.request({
                url: e.apiUrl + "log/log",
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: d
                },
                data: {
                    log: JSON.stringify(t)
                },
                success: function(e) {
                    200 == e.statusCode && wx.removeStorageSync("logJson");
                }
            });
        }
    }
};
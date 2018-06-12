var e = require("./util.js");

module.exports = {
    getExtConfig: function() {
        if (wx.getExtConfigSync) {
            var e = wx.getExtConfigSync();
            return console.log(e), e.shopId && (e.shopID = e.shopId, delete e.shopId), e;
        }
        wx.redirectTo({
            url: "pages/upgrade/upgrade"
        });
    },
    getActivityId: function() {
        var e = wx.getStorageSync("activityId");
        if (e) return e;
        var t = wx.getExtConfigSync();
        return t && t.activityId ? (wx.setStorageSync("activityId", t.activityId), t.activityId) : null;
    },
    getShopId: function() {
        var e = wx.getStorageSync("shopId");
        if (e) return e;
        var t = wx.getExtConfigSync();
        return t && t.shopID ? (wx.setStorageSync("shopId", t.shopID), t.shopID) : null;
    },
    setStorageAll: function(e, t) {
        var o = wx.getStorageSync("wxappStorageName");
        if (t && wx.setStorageSync("shopConfigInfo", t), t && t.shopID && wx.setStorageSync("shopId", t.shopID), 
        t && t.activityUrl) {
            var i = t.activityUrl.indexOf("?"), r = "wxAppName=Kepler&wxAppId=" + t.appid + "&siteId=WXAPP-JA2016-1", n = "";
            n = i >= 0 ? t.activityUrl + "&" + r : t.activityUrl + "?" + r, wx.setStorageSync("activityUrl", n);
        } else wx.removeStorageSync("activityUrl");
        t && t.activityId && wx.setStorageSync("activityId", t.activityId), t && t.wxVersion && (e.unionId ? wx.setStorageSync(o, {
            unionid: e.unionId,
            wxversion: t.wxVersion
        }) : wx.setStorageSync(o, {
            unionid: t.unionid,
            wxversion: t.wxVersion
        })), t && t.appid && wx.setStorageSync("appid", t.appid), e && e.customerinfo && wx.setStorageSync("customerinfo", e.customerinfo);
    },
    getSellerInfo: function(t, o, i) {
        var r = o && o.shopID, n = t.pin;
        (0, e.request)({
            url: i.globalRequestUrl + "/kwxitem/wxappshare/getSellerInfo.json?pin=" + n + "&shopid=" + r,
            success: function(e) {
                console.log("获取了"), console.log(e), e.value && e.value.sellerid && wx.setStorageSync("extuserid", e.value.sellerid);
            },
            fail: function(t) {
                (0, e.reportErr)("getSellerInfo.json fail: " + t.errMsg);
            }
        });
    }
};
var e = require("/utils/onLaunch.js"), t = require("utils/keplerReport.js"), a = require("utils/Ad.js");

App({
    globalWxclient: "tempwx",
    onLaunch: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.globalData.systemInfo = e;
            }
        }), "tempwx" != this.globalWxclient || e.query && e.query.customerinfo || wx.removeStorageSync("customerinfo");
    },
    onShow: function(s) {
        var l = s.query;
        if (t.setAppData({
            abtest: 1
        }), wx.setStorageSync("wxappStorageName", "jdwcx"), "tempwx" == this.globalWxclient) {
            var o = e.getExtConfig();
            e.setStorageAll(l, o), l.pin && e.getSellerInfo(l, o, this);
        }
        a.__isAdsURL(l.gdt_vid, l.platform) ? this.globalData.__ad__ = new a(s.path, l) : this.globalData.__ad__ && delete this.globalData.__ad__;
    },
    globalData: {
        userId: "未取到唯一标识",
        globalLoginFlag: 0,
        systemInfo: {},
        kxcxtype: "1"
    },
    globalConfig: {
        isTriTemplate: !0,
        needDocumentary: !0,
        isMessagePush: !1
    },
    globalRequestUrl: "https://wxapp.m.jd.com",
    messagePushRequestUrl: "https://push.k.jd.com",
    shareDesc: "值得您一看的京东好物",
    babelHomeRequestUrl: "https://api.m.jd.com/client.action?"
});
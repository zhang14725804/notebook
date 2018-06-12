var t = require("../../utils/keplerReport.js").init();

getApp();

Page({
    data: {
        updateItem: {
            msg: "升级之后，享受更多优质服务哟!"
        }
    },
    onLoad: function(e) {
        wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), t.set({
            urlParam: e,
            title: "微信升级",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        t.pv();
    }
});
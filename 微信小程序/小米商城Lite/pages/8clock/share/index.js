var e = require("../../../util/tracker.js"), i = (require("../../../util/util.js"), 
require("../../../util/conf.js")), t = getApp();

Page({
    data: {
        shareData: {
            poster: "http://i8.mifile.cn/webfile/h5/weixin/0524/81527229268_.pic_hd.jpg",
            title: "小米8点档，逛嘿店赢惊喜好礼",
            imageUrl: "http://i8.mifile.cn/webfile/h5/weixin/0525/611527241581_.pic_hd.jpg"
        }
    },
    onShow: function() {
        e.push();
    },
    onShareAppMessage: function() {
        var e = this;
        return {
            title: e.data.shareData.title,
            imageUrl: e.data.shareData.imageUrl,
            path: "/pages/8clock/index"
        };
    },
    saveImg: function() {
        var e = this, a = "client_id=" + i.client_id;
        a += ";channel_id=" + i.channel_id, a += ";serviceToken=" + encodeURIComponent(t.storageData.serviceToken), 
        a += ";xm_open_id=" + t.storageData.xm_open_id;
        var n = function(e) {
            e ? wx.showToast({
                title: "图片已保存，赶快分享吧",
                icon: "none",
                duration: 2e3
            }) : wx.showToast({
                title: "保存失败",
                icon: "none",
                duration: 1e3
            });
        };
        wx.downloadFile({
            url: e.data.shareData.poster,
            header: {
                cookie: a
            },
            success: function(e) {
                var i = e.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: i,
                    success: function(e) {
                        n(!0);
                    },
                    fail: function(e) {
                        n();
                    }
                });
            },
            fail: function(e) {
                n();
            }
        });
    }
});
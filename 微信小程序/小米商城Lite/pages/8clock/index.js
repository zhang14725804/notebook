var i = require("../../util/tracker.js"), e = require("../../util/util.js"), t = getApp();

Page({
    data: {
        shareData: {
            poster: "http://i8.mifile.cn/webfile/h5/weixin/0524/81527229268_.pic_hd.jpg",
            title: "小米8点档，逛嘿店赢惊喜好礼",
            imageUrl: "http://i8.mifile.cn/webfile/h5/weixin/0525/611527241581_.pic_hd.jpg"
        },
        webViewUrl: ""
    },
    onShow: function() {
        i.push();
    },
    onLoad: function(i) {
        function a() {
            e.showLoading(), t.ssoLogin(!0, function() {
                e.hideLoading();
            });
        }
        var n = this, o = t.storageData.vid || "";
        t.doLogin().then(function(i) {
            o ? a() : t.loginProxy({
                url: "https://s1.mi.com/pages/33853141e0873909be88f5c3e6144cc6/index.html",
                login: "m.mi.com"
            }, function(i, t) {
                t ? e.showError("服务异常，请稍后再试～") : i && i.location && n.setData({
                    webViewUrl: i.location
                });
            });
        });
    },
    onShareAppMessage: function() {
        var i = this;
        return {
            title: i.data.shareData.title,
            imageUrl: i.data.shareData.imageUrl,
            path: "/pages/8clock/index"
        };
    }
});
var t = require("../../bases/page.js"), a = require("../../common/h5jump.js");

new t({
    data: {
        url: "https://wqs.jd.com/shoppingv3/index.shtml?xcx=1",
        ptag: "138043.1.3"
    },
    onLoad: function(t) {
        this.setData({
            url: a.addParamsToH5Url(this.data.url)
        }), console.log("购物圈 webview.src: ", this.data.url);
    },
    onReady: function() {},
    onShareAppMessage: function(t) {
        return {
            title: "京东微信购物圈"
        };
    }
});
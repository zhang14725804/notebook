Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.getVcodeImg = function(e) {
    wx.request({
        url: e.data.imgurl,
        data: {},
        method: "GET",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function() {
            e.setData({
                imgurl: e.data.imgHost + e.data.vcodestr + "&v=" + new Date().getTime()
            });
        },
        fail: function() {
            e.setData({
                imgurl: e.data.imgHost + e.data.vcodestr + "&v=" + new Date().getTime()
            });
        }
    });
};
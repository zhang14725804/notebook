function e(e) {
    var o = [];
    for (var n in e) o.push(encodeURIComponent(n) + ":" + encodeURIComponent(e[n]));
    return {
        contents: o.join("|")
    };
}

var o = "https://wq.jd.com/webmonitor/collect/device.json";

module.exports = function() {
    wx.getSystemInfo({
        success: function(n) {
            wx.getNetworkType({
                success: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    n.networkType = t.networkType, delete n.errMsg, wx.$.request.post({
                        url: o,
                        data: e(n),
                        priority: "REPORT"
                    }).then(function(e) {
                        return console.log("上报设备信息成功");
                    }).catch(function(e) {
                        return console.error("上报设备信息失败");
                    });
                },
                fail: function(e) {
                    console.error("wx.getNetworkType fail: ", e);
                }
            });
        },
        fail: function(e) {
            console.error("wx.getSystemInfo fail: ", e);
        }
    });
};
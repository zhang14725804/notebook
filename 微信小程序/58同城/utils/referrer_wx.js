module.exports = {
    sendTrackLog: function(e, r, o) {
        if (r) {
            var c = "https://tracklog.58.com/wx/track/empty.js.gif?wxid=" + (e || "") + "&uid=" + r + "&trackURL=" + (o || "") + "&v=1.0.0&rand_id=" + Math.random();
            wx.request({
                url: c,
                success: function(e) {}
            });
        } else console.error("sendTrackLog 方法 openid参数为空，请求被拒绝");
    },
    sendClickLog: function(e, r, o, c) {
        if (r) {
            var s = "https://tracklog.58.com/wx/click/empty.js.gif?wxid=" + (e || "") + "&uid=" + r + "&from=" + (c || "default") + "&trackURL=" + (o || "") + "&v=1.0.0&rand_id=" + Math.random();
            wx.request({
                url: s,
                success: function(e) {}
            });
        } else console.error("sendClickLog 方法 openid参数为空，请求被拒绝");
    }
};
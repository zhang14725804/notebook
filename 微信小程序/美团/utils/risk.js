var t = require("./util").getUserInfo;

module.exports = {
    getRiskParams: function(e, n, o) {
        var i = getApp(), c = {};
        try {
            wx.onAccelerometerChange(function(t) {
                c.x = t.x, c.y = t.y, c.z = t.z;
            });
        } catch (t) {}
        try {
            wx.onCompassChange(function(t) {
                c.direction = t.direction;
            });
        } catch (t) {}
        try {
            wx.getNetworkType({
                success: function(t) {
                    c.networkType = t.networkType;
                }
            });
        } catch (t) {}
        if ("review" !== o && i.getLocation(function(t) {
            c.latitude = t.latitude, c.longitude = t.longitude;
        }), i.getSysInfo(function(t) {
            c.model = t.model, c.pixelRatio = t.pixelRatio, c.windowWidth = t.windowWidth, c.windowHeight = t.windowHeight, 
            c.language = t.language, c.version = t.version, c.system = t.system, c.platform = t.platform;
        }), "review" !== o && (i.getOpenId(function() {
            c.openid = i.globalData.openId;
        }), wx.getSetting && wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && t().then(function(t) {
                    c.nickName = t.nickName, c.gender = t.gender, c.city = t.city, c.province = t.province, 
                    c.country = t.country, c.avatarUrl = t.avatarUrl;
                });
            }
        })), c.app_name = "group", c.user_type = "wx", e) {
            var a = void 0;
            try {
                a = e.detail.x + "," + e.detail.y;
            } catch (t) {}
            try {
                a = a || e.touches[0].pageX + "," + e.touches[0].pageY;
            } catch (t) {}
            try {
                a = a || e.touches[0].x + "," + e.touches[0].y;
            } catch (t) {}
            null == a && (a = "string" == typeof e ? e : JSON.stringify(e)), a && (c.touchPoint = a);
        }
        setTimeout(function() {
            "function" == typeof n && (n(c), n = null);
        }, 500);
    }
};
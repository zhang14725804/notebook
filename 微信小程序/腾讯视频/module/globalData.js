var a = require("./fns"), e = !1;

module.exports = {
    init: function(e) {
        var t = wx.getStorageSync("global_data");
        t && (t.ptag = null, a.extend(e, t));
    },
    set: function(a, e) {
        var t = getApp().global;
        t[a] = e, wx.setStorage({
            key: "global_data",
            data: t,
            complete: function(a) {
                a && a.errMsg;
            }
        });
    },
    get: function(a) {
        var e = getApp();
        if (e && e.global) return e.global[a];
    },
    getWxUserInfo: function(a) {
        var t = this;
        e ? a({
            nickName: t.get("nickName"),
            avatarUrl: t.get("avatarUrl")
        }) : wx.getUserInfo({
            complete: function(r) {
                e = !0, r.userInfo && r.userInfo.nickName ? (t.set("nickName", r.userInfo.nickName), 
                t.set("avatarUrl", r.userInfo.avatarUrl), a({
                    nickName: r.userInfo.nickName,
                    avatarUrl: r.userInfo.avatarUrl
                })) : a({
                    nickName: t.get("nickName"),
                    avatarUrl: t.get("avatarUrl")
                });
            }
        });
    }
};
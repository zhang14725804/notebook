var e = require("../../../module/request/request"), t = "hot:channel:nav";

module.exports = {
    get: function(o, r) {
        e.vaccess("hot_video_nav", {}).then(function(e) {
            e && 0 === e.errCode && e.scheduleList.length ? (r(null, e.scheduleList), wx.setStorage({
                key: t,
                data: e.scheduleList
            })) : (console.log("fetch nav from hot page, errCode:" + e.errCode + ", 启用缓存"), 
            r(e.errCode, wx.getStorageSync(t)));
        }, function(e) {
            r(e, wx.getStorageSync(t)), console.log("fetch nav from hot page, request reject");
        }).catch(function(e) {
            r(e, wx.getStorageSync(t)), console.log("fetch nav error:", e);
        });
    }
};
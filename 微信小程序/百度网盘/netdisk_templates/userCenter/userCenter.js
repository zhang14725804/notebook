Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setUserCenterInfo = void 0;

var e = require("../../netdiisk_requestapi/getUserCenterInfo.js"), t = require("../../netdisk_utils/transform.js");

exports.setUserCenterInfo = function(r, a) {
    e.userCenter.getUserQuota().then(function(e) {
        var r = (0, t.toFriendlyQuotaSize)(e.data.used), s = (0, t.toFriendlyQuotaSize)(e.data.total), n = (e.data.used / e.data.total * 100).toFixed(2);
        a.setData({
            "userCenter.quotaSize": {
                usedQuota: r,
                totalQuota: s
            },
            "userCenter.quotaUsageRate": n >= 100 ? 100 : n
        });
    }), e.userCenter.getUserBaseInfo().then(function(e) {
        var t = e.data, r = t.uk, s = t.avatar_url, n = t.displayname, u = t.is_vip;
        wx.setStorageSync("uk", r), a.setData({
            "userCenter.avatar": s,
            "userCenter.name": n,
            "userCenter.memberType": u,
            "userCenter.uk": r
        });
    });
};
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../utils/util")), u = e(require("../user/user")), a = e(require("session"));

exports.default = {
    send: function(e) {
        var a = {
            rpage: e.rpage || "category_home.8196",
            block: e.block || "O: 0281960010",
            c1: e.c1 || "8196",
            p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
            u: u.default.getAnonymousUid(),
            pu: u.default.getUid(),
            rn: new Date().getTime(),
            hu: u.default.getVipType(),
            t: e.t || 20,
            br: 0
        };
        e.rtime && (delete a.block, delete a.c1, Object.assign(a, {
            ce: u.default.getWeid(),
            as: u.default.getAS()
        })), wx.request({
            url: "https://msg.iqiyi.com/v5/alt/act",
            method: "GET",
            data: Object.assign(a, e || {})
        });
    },
    enterPage: function() {
        var e = new Date().getTime();
        a.default.Session.set(a.default.SESSION_SHORT_TIME_KEY, e);
    },
    leavePage: function() {
        var e = new Date().getTime(), t = a.default.Session.get(a.default.SESSION_SHORT_TIME_KEY, e);
        return a.default.Session.clear(), e - t;
    }
};
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../utils/util")), u = e(require("../user/user"));

exports.default = {
    send: function(e) {
        var r = void 0 !== e.vfm ? {
            vfm: e.vfm
        } : {};
        wx.request({
            url: "https://msg.iqiyi.com/v5/alt/act",
            method: "GET",
            data: Object.assign({
                rpage: e.rpage,
                p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
                u: u.default.getAnonymousUid(),
                pu: u.default.getUid(),
                nu: u.default.checkNewUser() ? 1 : 0,
                rn: new Date().getTime(),
                ce: u.default.getWeid(),
                as: u.default.getAS(),
                t: 22,
                br: 0
            }, r)
        });
    }
};
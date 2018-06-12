function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../utils/util")), r = e(require("../user/user"));

exports.default = {
    send: function(e) {
        var u = {
            rpage: e.rpage,
            p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
            u: r.default.getAnonymousUid(),
            pu: r.default.getUid(),
            nu: r.default.checkNewUser() ? 1 : 0,
            rn: new Date().getTime(),
            t: e.type || 20,
            block: e.block || "",
            rseat: e.rseat || "",
            br: 0
        };
        21 == u.t && delete u.rseat, wx.request({
            url: "https://msg.iqiyi.com/v5/alt/act",
            method: "GET",
            data: u
        });
    }
};
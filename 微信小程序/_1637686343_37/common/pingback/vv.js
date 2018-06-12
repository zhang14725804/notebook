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
        wx.request({
            url: "https://msg.iqiyi.com/v5/h5ply/vdo",
            method: "GET",
            data: Object.assign({
                purl: "",
                p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
                u: "",
                pu: "",
                nu: r.default.checkNewUser() ? 1 : 0,
                t: "",
                tm: "",
                as: "",
                c1: "",
                ht: "",
                hu: -1,
                plyrtp: 0,
                r: "",
                ra: "",
                rn: new Date().getTime(),
                mod: "",
                rfr: "",
                ve: "",
                vfrm: "0-0-0-0",
                br: 0
            }, e || {})
        });
    }
};
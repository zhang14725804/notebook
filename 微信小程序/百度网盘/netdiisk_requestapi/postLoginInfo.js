Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.postLoginInfo = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.postLoginInfo = function(t) {
    var o = getApp().globalData.userWxInfo, r = o.nickName, a = o.avatarUrl;
    return (0, e.wxReq)("api/wechat/login", {
        wcode: t,
        wname: r,
        wurl: a
    }, "POST");
};
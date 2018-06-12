Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.updateUserInfo = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.updateUserInfo = function() {
    var t = getApp().globalData.userWxInfo, r = t.nickName, a = t.avatarUrl;
    return (0, e.wxReq)("api/wechat/update", {
        wname: r,
        wurl: a
    }, "POST");
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.decodeEncryptedData = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.decodeEncryptedData = function(t, r) {
    return (0, e.wxReq)("api/wechat/decode", {
        iv: t,
        encryptedData: r
    }, "POST");
};
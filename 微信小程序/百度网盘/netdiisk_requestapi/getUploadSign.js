Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getUploadSign = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getUploadSign = function(t, i) {
    return (0, e.wxReq)("api/wechat/upload?dir=" + encodeURIComponent(t) + "&filename=" + i);
};
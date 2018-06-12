Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getFileList = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getFileList = function(t, i, s) {
    return (0, e.wxReq)("api/list", {
        dir: t,
        start: i,
        limit: s
    }, "POST");
};
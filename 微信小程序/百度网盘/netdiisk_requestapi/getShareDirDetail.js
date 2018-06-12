Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getShareDirDetail = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getShareDirDetail = function(r) {
    return (0, e.wxReq)("sharedir/wx/dirdetail", r, "GET");
};
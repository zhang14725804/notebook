Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getShareList = void 0;

var e = require("../netdisk_utils/wxRequestApi.js");

exports.getShareList = function(t, r) {
    return (0, e.wxReq)("sharedir/wx/list?start=" + (t || 0) + "&limit=" + (r || 0), {}, "GET");
};